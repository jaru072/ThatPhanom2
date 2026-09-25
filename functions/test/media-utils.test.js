"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  FOLDER_MAPPINGS,
  driveDocumentId,
  driveFingerprint,
  indexFieldsChanged,
  isSupportedDriveFile,
  sortDriveFiles,
  storagePathForDriveFile,
  titleFromDriveName,
} = require("../media-utils");

test("all Drive folders map to the requested website areas", () => {
  assert.deepEqual(
    FOLDER_MAPPINGS.map(({key, section, placement}) => ({key, section, placement})),
    [
      {key: "hero", section: "story", placement: "hero"},
      {key: "story", section: "story", placement: ""},
      {key: "criteria", section: "criteria", placement: ""},
      {key: "muchalinda", section: "muchalinda", placement: "hero"},
      {key: "muchalindaAlbum", section: "muchalinda", placement: "album"},
      {key: "videos", section: "videos", placement: ""},
    ]
  );
});

test("Drive filename becomes a stable title and document id", () => {
  assert.equal(titleFromDriveName("001-ภาพองค์พระธาตุพนม.JPG"), "ภาพองค์พระธาตุพนม");
  assert.equal(driveDocumentId("abc-123"), "drive_abc-123");
});

test("numeric filename prefixes control natural order", () => {
  const sorted = sortDriveFiles([
    {name: "10-final.jpg"},
    {name: "2-second.jpg"},
    {name: "first.jpg"},
  ]);
  assert.deepEqual(sorted.map((file) => file.name), [
    "2-second.jpg",
    "10-final.jpg",
    "first.jpg",
  ]);
});

test("Videos folder accepts videos and rejects images", () => {
  const mapping = FOLDER_MAPPINGS.find(({key}) => key === "videos");
  assert.equal(isSupportedDriveFile({id: "1", mimeType: "video/mp4"}, mapping), true);
  assert.equal(isSupportedDriveFile({id: "2", mimeType: "image/jpeg"}, mapping), false);
});

test("renaming a Drive file keeps its mirrored storage path", () => {
  const before = {id: "abc", name: "before.jpg", mimeType: "image/jpeg"};
  const after = {...before, name: "after.jpg"};
  assert.equal(
    storagePathForDriveFile("hero", before),
    storagePathForDriveFile("hero", after)
  );
});

test("content fingerprint ignores a rename but metadata comparison catches it", () => {
  const before = {
    id: "abc",
    name: "before.jpg",
    mimeType: "image/jpeg",
    size: "42",
    md5Checksum: "checksum",
  };
  const after = {...before, name: "after.jpg"};
  assert.equal(driveFingerprint(before), driveFingerprint(after));
  assert.equal(indexFieldsChanged(
    {source: "google-drive", driveName: before.name},
    {source: "google-drive", driveName: after.name}
  ), true);
});
