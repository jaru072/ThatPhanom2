# พระธาตุพนม สู่มรดกโลก — Handoff สำหรับ Google AI Studio

ฐานซอร์ส: `that-phanom-current-source-v32`

## เป้าหมายหลัก
ให้ Google Drive เป็นแหล่งสื่อหลักของเว็บไซต์ ไม่ใช่เพียงที่อัปโหลดไฟล์ โดย Cloud Functions อ่านรายการไฟล์จากโฟลเดอร์ Drive แล้วสร้าง/อัปเดต Media Index ใน Firestore จากนั้นหน้าเว็บอ่าน metadata จาก Firestore เพื่อแสดงสื่ออัตโนมัติ

## Mapping โฟลเดอร์ Google Drive
- Hero → Hero slideshow
- เรื่องราวแห่งศรัทธา → slideshow ของ section
- คุณค่าโดดเด่นเป็นสากล → slideshow ของ section
- โครงการบูรณะสระมุจลินท์ → สื่อพื้นที่โครงการสนับสนุน
- Videos → video gallery

## โครงสร้างสำคัญ
- `dist/` หน้าเว็บที่ deploy
- `functions/` Cloud Functions สำหรับ Drive Media Sync
- `firebase.json` การตั้งค่า Firebase deploy
- `firestore.rules` และ `storage.rules` กฎสิทธิ์
- `FIREBASE-SETUP.md` ขั้นตอนตั้งค่า Firebase/Drive และรายละเอียด collection

## พฤติกรรม Drive Sync ที่ต้องรักษา
- อ่าน Drive ด้วย credential ฝั่ง backend/runtime เท่านั้น ห้ามฝัง credential สำคัญใน frontend
- sync ตามกำหนดเวลาและมี callable/manual sync สำหรับ Admin
- เพิ่ม/ลบ/เปลี่ยนชื่อ/แทนที่ไฟล์ใน Drive ต้องสะท้อน Media Index ในรอบ sync ถัดไป
- ชื่อไฟล์ขึ้นต้นด้วยเลข เช่น `01-`, `02-` ใช้กำหนดลำดับ
- รักษาฟังก์ชันเดิมของเว็บไซต์ทั้งหมด

## นโยบายโครงการ
เมื่อแก้ไขเสร็จ ให้เผยแพร่ตาม workflow เดิม เว้นแต่มีคำสั่งว่า “ยังไม่ต้องเผยแพร่”

## หมายเหตุสำหรับการแก้ต่อ
อย่าลบรูปใน `dist/assets/` เพียงเพราะมีไฟล์ใหญ่ เนื่องจากไฟล์เหล่านี้ยังถูกอ้างอิงโดย `dist/index.html`, `dist/cms.js`, `dist/portal.js` หรือ CSS
