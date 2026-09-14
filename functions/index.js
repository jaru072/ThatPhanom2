"use strict";

const {randomUUID} = require("node:crypto");
const {pipeline} = require("node:stream/promises");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue, Timestamp} = require("firebase-admin/firestore");
const {getStorage, getDownloadURL} = require("firebase-admin/storage");
const {logger} = require("firebase-functions");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {requiresAPI} = require("firebase-functions/v2");
const {google} = require("googleapis");
const {
  FOLDER_MAPPINGS,
  driveDocumentId,
  driveFingerprint,
  indexFieldsChanged,
  isSupportedDriveFile,
  mediaTypeForMime,
  orderForDriveFile,
  sortDriveFiles,
  storagePathForDriveFile,
  titleFromDriveName,
} = require("./media-utils");

requiresAPI("drive.googleapis.com", "อ่านสื่อจากโฟลเดอร์ Google Drive ของโครงการ");

const ADMIN_EMAIL = "jaru072@gmail.com";
const PROJECT_KEY = "world-heritage";
const STORAGE_BUCKET = "that-phanom.firebasestorage.app";
const DRIVE_ROOT_ID = "1VfRsm1PV2GppZE4n3TA7MR0fwALVxrNR";
const MAX_IMAGE_BYTES = 30 * 1024 * 1024;
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const LEASE_MS = 35 * 60 * 1000;
const REGION = "asia-southeast1";
const MEDIA_COLLECTION_PATH = "projects/" + PROJECT_KEY + "/media";
const STATUS_DOCUMENT_PATH = "projects/" + PROJECT_KEY + "/settings/driveMediaSync";
const FUNCTION_OPTIONS = {
  region: REGION,
  memory: "1GiB",
  timeoutSeconds: 1800,
  maxInstances: 1,
  concurrency: 1,
};

const app = initializeApp({storageBucket: STORAGE_BUCKET});
const db = getFirestore(app);
const bucket = getStorage(app).bucket();
let drivePromise;

class SyncAlreadyRunningError extends Error {
  constructor() {
    super("A Drive media sync is already running.");
    this.name = "SyncAlreadyRunningError";
  }
}

function getDrive() {
  if (!drivePromise) {
    drivePromise = (async () => {
      const auth = new google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      });
      return google.drive({version: "v3", auth: await auth.getClient()});
    })();
  }
  return drivePromise;
}

async function listFolderFiles(drive, mapping) {
  const files = [];
  let pageToken;
  do {
    const response = await drive.files.list({
      q: "'" + mapping.id + "' in parents and trashed = false",
      spaces: "drive",
      pageSize: 1000,
      pageToken,
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      fields: "nextPageToken,files(id,name,mimeType,modifiedTime,createdTime,md5Checksum,size,version,webViewLink,trashed)",
    });
    files.push(...(response.data.files || []));
    pageToken = response.data.nextPageToken || undefined;
  } while (pageToken);
  return files;
}

function fileSizeAllowed(file, type) {
  const bytes = Number(file.size || 0);
  return bytes > 0 && bytes <= (type === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES);
}

async function mirrorDriveFile(drive, mapping, file) {
  const storagePath = storagePathForDriveFile(mapping.key, file);
  const destination = bucket.file(storagePath);
  const downloadToken = randomUUID();
  const response = await drive.files.get(
    {fileId: file.id, alt: "media", supportsAllDrives: true},
    {responseType: "stream"}
  );
  const upload = destination.createWriteStream({
    resumable: false,
    validation: "crc32c",
    metadata: {
      contentType: file.mimeType,
      cacheControl: "public,max-age=3600",
      metadata: {
        firebaseStorageDownloadTokens: downloadToken,
        source: "google-drive",
        driveFileId: file.id,
        driveFolderId: mapping.id,
      },
    },
  });
  await pipeline(response.data, upload);
  return {
    storagePath,
    url: await getDownloadURL(destination),
  };
}

async function isAdminCaller(auth) {
  if (!auth || !auth.uid) return false;
  const email = String(auth.token && auth.token.email || "").toLowerCase();
  if (email === ADMIN_EMAIL && auth.token.email_verified === true) return true;
  const [userSnap, memberSnap] = await Promise.all([
    db.doc("users/" + auth.uid).get(),
    db.doc("projects/" + PROJECT_KEY + "/members/" + auth.uid).get(),
  ]);
  return userSnap.data()?.globalRole === "admin" || memberSnap.data()?.role === "admin";
}

async function acquireLease(trigger) {
  const ref = db.doc(STATUS_DOCUMENT_PATH);
  const leaseToken = randomUUID();
  const now = Timestamp.now();
  const lockUntil = Timestamp.fromMillis(now.toMillis() + LEASE_MS);
  await db.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);
    const currentLock = snap.data()?.lockUntil;
    if (currentLock && typeof currentLock.toMillis === "function" && currentLock.toMillis() > now.toMillis()) {
      throw new SyncAlreadyRunningError();
    }
    transaction.set(ref, {
      status: "running",
      trigger,
      driveRootId: DRIVE_ROOT_ID,
      folderCount: FOLDER_MAPPINGS.length,
      leaseToken,
      lockUntil,
      startedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, {merge: true});
  });
  return leaseToken;
}

async function finishLease(leaseToken, fields) {
  const ref = db.doc(STATUS_DOCUMENT_PATH);
  await db.runTransaction(async (transaction) => {
    const snap = await transaction.get(ref);
    if (snap.data()?.leaseToken !== leaseToken) return;
    transaction.set(ref, {
      ...fields,
      leaseToken: FieldValue.delete(),
      lockUntil: FieldValue.delete(),
      finishedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, {merge: true});
  });
}

async function commitOperations(operations) {
  for (let start = 0; start < operations.length; start += 400) {
    const batch = db.batch();
    for (const operation of operations.slice(start, start + 400)) {
      if (operation.kind === "set") batch.set(operation.ref, operation.data, {merge: true});
      else batch.delete(operation.ref);
    }
    await batch.commit();
  }
}

async function deleteStoragePaths(paths) {
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  await Promise.allSettled(uniquePaths.map(async (path) => {
    try {
      await bucket.file(path).delete({ignoreNotFound: true});
    } catch (error) {
      logger.warn("Unable to delete stale mirrored media.", {
        storagePath: path,
        code: error.code,
      });
    }
  }));
}

async function synchronizeDriveMedia(trigger) {
  let leaseToken;
  try {
    leaseToken = await acquireLease(trigger);
  } catch (error) {
    if (error instanceof SyncAlreadyRunningError) {
      return {status: "running", skipped: true};
    }
    throw error;
  }

  const counts = {
    discovered: 0,
    created: 0,
    updated: 0,
    unchanged: 0,
    deleted: 0,
    unsupported: 0,
    oversized: 0,
  };

  try {
    const drive = await getDrive();
    const listings = await Promise.all(FOLDER_MAPPINGS.map(async (mapping) => ({
      mapping,
      files: await listFolderFiles(drive, mapping),
    })));
    counts.discovered = listings.reduce((total, entry) => total + entry.files.length, 0);

    const existingSnap = await db.collection(MEDIA_COLLECTION_PATH)
      .where("source", "==", "google-drive")
      .get();
    const existingByDriveId = new Map();
    existingSnap.docs.forEach((document) => {
      const data = document.data();
      if (data.driveFileId) existingByDriveId.set(data.driveFileId, {ref: document.ref, data});
    });

    const seenDriveIds = new Set();
    const operations = [];
    const staleStoragePaths = [];

    for (const {mapping, files} of listings) {
      const supported = [];
      for (const file of files) {
        if (!isSupportedDriveFile(file, mapping)) {
          counts.unsupported += 1;
          continue;
        }
        const type = mediaTypeForMime(file.mimeType);
        if (!fileSizeAllowed(file, type)) {
          counts.oversized += 1;
          continue;
        }
        supported.push(file);
      }

      const sorted = sortDriveFiles(supported);
      for (let index = 0; index < sorted.length; index += 1) {
        const file = sorted[index];
        const type = mediaTypeForMime(file.mimeType);
        const documentId = driveDocumentId(file.id);
        const ref = db.collection(MEDIA_COLLECTION_PATH).doc(documentId);
        const existing = existingByDriveId.get(file.id)?.data || null;
        const fingerprint = driveFingerprint(file);
        const desiredStoragePath = storagePathForDriveFile(mapping.key, file);
        const contentChanged = !existing ||
          existing.driveFingerprint !== fingerprint ||
          existing.storagePath !== desiredStoragePath ||
          !existing.url;

        let mirrored = {
          storagePath: existing?.storagePath || desiredStoragePath,
          url: existing?.url || "",
        };
        if (contentChanged) {
          mirrored = await mirrorDriveFile(drive, mapping, file);
          if (existing?.storagePath && existing.storagePath !== mirrored.storagePath) {
            staleStoragePaths.push(existing.storagePath);
          }
        }

        const next = {
          source: "google-drive",
          driveFileId: file.id,
          driveFolderId: mapping.id,
          driveFolderKey: mapping.key,
          driveFolderName: mapping.name,
          driveName: file.name,
          driveModifiedTime: file.modifiedTime || "",
          driveMd5Checksum: file.md5Checksum || "",
          driveFingerprint: fingerprint,
          driveWebViewLink: file.webViewLink || "",
          mimeType: file.mimeType,
          bytes: Number(file.size || 0),
          storagePath: mirrored.storagePath,
          url: mirrored.url,
          section: mapping.section,
          placement: mapping.placement,
          type,
          title: titleFromDriveName(file.name),
          description: "",
          order: orderForDriveFile(file, index),
          enabled: true,
          published: true,
        };

        seenDriveIds.add(file.id);
        if (contentChanged || indexFieldsChanged(existing, next)) {
          operations.push({
            kind: "set",
            ref,
            data: {
              ...next,
              syncedAt: FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
              updatedBy: "google-drive-sync",
              ...(existing ? {} : {
                createdAt: FieldValue.serverTimestamp(),
                createdBy: "google-drive-sync",
              }),
            },
          });
          if (existing) counts.updated += 1;
          else counts.created += 1;
        } else {
          counts.unchanged += 1;
        }
      }
    }

    existingSnap.docs.forEach((document) => {
      const data = document.data();
      if (!seenDriveIds.has(data.driveFileId)) {
        operations.push({kind: "delete", ref: document.ref});
        staleStoragePaths.push(data.storagePath);
        counts.deleted += 1;
      }
    });

    await commitOperations(operations);
    await deleteStoragePaths(staleStoragePaths);
    const result = {
      status: "success",
      trigger,
      counts,
      folders: FOLDER_MAPPINGS.map(({key, name, id}) => ({key, name, id})),
    };
    await finishLease(leaseToken, {
      ...result,
      lastSuccessAt: FieldValue.serverTimestamp(),
      lastError: FieldValue.delete(),
    });
    logger.info("Google Drive media sync completed.", result);
    return result;
  } catch (error) {
    logger.error("Google Drive media sync failed.", {
      trigger,
      code: error.code,
      message: error.message,
    });
    await finishLease(leaseToken, {
      status: "error",
      trigger,
      counts,
      lastError: "ซิงก์ไม่สำเร็จ กรุณาตรวจสิทธิ์โฟลเดอร์ Drive และบันทึกของฟังก์ชัน",
    });
    throw error;
  }
}

exports.syncDriveMedia = onSchedule({
  ...FUNCTION_OPTIONS,
  schedule: "every 20 minutes",
  timeZone: "Asia/Bangkok",
  retryCount: 1,
}, async () => {
  await synchronizeDriveMedia("schedule");
});

exports.syncDriveMediaNow = onCall(FUNCTION_OPTIONS, async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "กรุณาเข้าสู่ระบบก่อนสั่งซิงก์");
  }
  if (!await isAdminCaller(request.auth)) {
    throw new HttpsError("permission-denied", "เฉพาะผู้ดูแลระบบเท่านั้น");
  }
  try {
    return await synchronizeDriveMedia("manual");
  } catch (error) {
    logger.error("Manual Drive sync failed.", {code: error.code, message: error.message});
    throw new HttpsError("internal", "ซิงก์ Google Drive ไม่สำเร็จ");
  }
});

exports._test = {
  listFolderFiles,
  synchronizeDriveMedia,
};
