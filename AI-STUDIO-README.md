# Google AI Studio Preview - That Phanom v32

This package keeps the current production-style website unchanged in `dist/` and adds only a thin Vite wrapper so Google AI Studio can launch Preview with `npm run dev`.

## Important
- Edit the real website files in `dist/`.
- `index.html` at the project root is an exact copy of `dist/index.html` for Vite Preview compatibility.
- If `dist/index.html` is edited, copy it to root `index.html` before preview/export.
- Google Drive Auto Sync code is intentionally retained but should remain parked unless explicitly re-enabled.
- Firebase project: `that-phanom`.

## Preview
`npm run dev`

## Structure
- `dist/` current website source/assets used by the existing deployment workflow
- `functions/` Firebase Functions
- `firestore.rules`, `storage.rules`, `firebase.json`, `.firebaserc` existing Firebase config
- `package.json`, `vite.config.ts`, `metadata.json`, `firebase-applet-config.json` AI Studio compatibility wrapper
