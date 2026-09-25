"use strict";

const FOLDER_MAPPINGS = Object.freeze([
  Object.freeze({
    key: "hero",
    name: "Hero",
    id: "1c_IMxFaTEhYbjVC7e33Wy_2oIOWZis9J",
    section: "story",
    placement: "hero",
    mediaTypes: Object.freeze(["image", "video"]),
  }),
  Object.freeze({
    key: "story",
    name: "เรื่องราวแห่งศรัทธา",
    id: "1HpJVmXZN7CivrWfD1KfSNu_4wLhgWYZc",
    section: "story",
    placement: "",
    mediaTypes: Object.freeze(["image", "video"]),
  }),
  Object.freeze({
    key: "criteria",
    name: "คุณค่าโดดเด่นเป็นสากล",
    id: "1sbmDLydOosmOsFRf_Hj-CN5-ypOey14e",
    section: "criteria",
    placement: "",
    mediaTypes: Object.freeze(["image", "video"]),
  }),
  Object.freeze({
    key: "muchalinda",
    name: "โครงการบูรณะสระมุจลินท์",
    id: "1GNmlzvw4LOnykU28T6x7TkxKUNKR-07N",
    section: "muchalinda",
    placement: "hero",
    mediaTypes: Object.freeze(["image", "video"]),
  }),
  Object.freeze({
    key: "muchalindaAlbum",
    name: "อัลบั้มรูปภาพผู้ร่วมบุญ",
    id: "1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU",
    parentFolderId: "1GNmlzvw4LOnykU28T6x7TkxKUNKR-07N",
    folderName: "อัลบั้มรูปภาพผู้ร่วมบุญ",
    section: "muchalinda",
    placement: "album",
    mediaTypes: Object.freeze(["image"]),
  }),
  Object.freeze({
    key: "videos",
    name: "Videos",
    id: "1rcscJ3isoYDk5V15oj-T9UzTdV45S0Tf",
    section: "videos",
    placement: "",
    mediaTypes: Object.freeze(["video"]),
  }),
]);

const MIME_EXTENSIONS = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
});

function mediaTypeForMime(mimeType) {
  if (String(mimeType || "").startsWith("image/")) return "image";
  if (String(mimeType || "").startsWith("video/")) return "video";
  return "";
}

function isSupportedDriveFile(file, mapping) {
  const type = mediaTypeForMime(file && file.mimeType);
  return Boolean(
    file &&
    file.id &&
    MIME_EXTENSIONS[file.mimeType] &&
    mapping &&
    mapping.mediaTypes.includes(type)
  );
}

function titleFromDriveName(name) {
  return String(name || "")
    .replace(/\.[^.]+$/, "")
    .replace(/^\s*\d{1,6}(?:[\s._-]+)+/, "")
    .trim()
    .slice(0, 160) || "สื่อพระธาตุพนม";
}

function explicitOrder(name) {
  const match = String(name || "").match(/^\s*(\d{1,6})(?:[\s._-]+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function sortDriveFiles(files) {
  return [...files].sort((left, right) => {
    const byPrefix = explicitOrder(left.name) - explicitOrder(right.name);
    if (Number.isFinite(byPrefix) && byPrefix !== 0) return byPrefix;
    if (Number.isFinite(explicitOrder(left.name)) && !Number.isFinite(explicitOrder(right.name))) return -1;
    if (!Number.isFinite(explicitOrder(left.name)) && Number.isFinite(explicitOrder(right.name))) return 1;
    return String(left.name || "").localeCompare(String(right.name || ""), "th", {
      numeric: true,
      sensitivity: "base",
    });
  });
}

function orderForDriveFile(_file, index) {
  return (index + 1) * 10;
}

function driveDocumentId(fileId) {
  return "drive_" + String(fileId || "").replace(/\//g, "_");
}

function storagePathForDriveFile(folderKey, file) {
  const extension = MIME_EXTENSIONS[file.mimeType];
  return [
    "projects",
    "world-heritage",
    "media",
    "drive",
    String(folderKey).replace(/[^a-z0-9_-]/gi, "_") + "_" +
      String(file.id).replace(/[^a-z0-9_-]/gi, "_") + "." + extension,
  ].join("/");
}

function driveFingerprint(file) {
  const contentMarker = file.md5Checksum ||
    [file.modifiedTime || "", file.size || "", file.version || ""].join(":");
  return [file.id, file.mimeType, file.size || "", contentMarker].join("|");
}

function indexFieldsChanged(current, next) {
  if (!current) return true;
  const fields = [
    "source",
    "driveFileId",
    "driveFolderId",
    "driveFolderKey",
    "driveFolderName",
    "driveName",
    "driveModifiedTime",
    "driveMd5Checksum",
    "driveFingerprint",
    "driveWebViewLink",
    "mimeType",
    "bytes",
    "storagePath",
    "url",
    "section",
    "placement",
    "type",
    "title",
    "description",
    "order",
    "enabled",
    "published",
  ];
  return fields.some((field) => (current[field] ?? "") !== (next[field] ?? ""));
}

module.exports = {
  FOLDER_MAPPINGS,
  MIME_EXTENSIONS,
  driveDocumentId,
  driveFingerprint,
  explicitOrder,
  indexFieldsChanged,
  isSupportedDriveFile,
  mediaTypeForMime,
  orderForDriveFile,
  sortDriveFiles,
  storagePathForDriveFile,
  titleFromDriveName,
};
