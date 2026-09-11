# การตั้งค่า Firebase สำหรับพระธาตุพนม

โปรเจ็กต์นี้ใช้ Firebase Project ที่หลวงพี่สร้างใหม่ และใช้ Cloud Firestore
ฐาน `(default)` เพียงฐานเดียว บัญชีผู้ใช้อยู่ใน `users` ส่วนกลาง ส่วนข้อมูลเว็บไซต์นี้อยู่ใต้
`projects/world-heritage` เพื่อให้โครงการอื่นของวัดใช้บัญชีร่วมกันและแยกข้อมูลเป็นสัดส่วนได้

## 1. ลงทะเบียน Web app และใส่ค่าการเชื่อมต่อ

1. เปิด Firebase Console → Project settings → General
2. ที่หัวข้อ Your apps กดไอคอน Web (`</>`)
3. ตั้งชื่อแอป เช่น `Phra That Phanom Heritage Web`
4. ไม่ต้องเลือก Firebase Hosting เพราะเว็บไซต์เผยแพร่ด้วย ChatGPT Sites
5. กด Register app แล้วคัดลอกค่าภายใน `firebaseConfig`
6. นำค่าทั้งหกช่องไปแทนที่ใน `dist/firebase-config.js`

ค่าที่ต้องใช้คือ `apiKey`, `authDomain`, `projectId`, `storageBucket`,
`messagingSenderId` และ `appId` ค่าชุดนี้เป็นข้อมูลตั้งค่าเว็บ ไม่ใช่รหัสผ่าน

## 2. เปิด Google Sign-in

1. Authentication → Sign-in method → Google → Enable
2. เลือก Project support email แล้วกด Save
3. Authentication → Settings → Authorized domains
4. เพิ่ม `that-phanom.jaru072.chatgpt.site`
5. เพิ่ม `thatphanom.org` และ `www.thatphanom.org`
6. เพิ่มโดเมนรุ่นทดลองส่วนตัวที่ได้รับจาก ChatGPT Sites ก่อนเข้าสู่ระบบทดสอบ

## 3. Firestore และ Storage

- Firestore ใช้ฐาน `(default)` ที่สร้างแบบ Test Mode ไว้ก่อน
- เปิด Storage และสร้าง bucket สำหรับรูปภาพหรือวิดีโอ
- ช่วง Test Mode ห้ามเก็บข้อมูลสำคัญและยังไม่ควรเปิดฟังก์ชันเขียนข้อมูลต่อสาธารณะ

## 4. เปลี่ยนเป็น Custom Rules ก่อนใช้งานจริง

Firebase Console:

- Firestore Database → Rules → วางเนื้อหาจาก `firestore.rules` → Publish
- Storage → Rules → วางเนื้อหาจาก `storage.rules` → Publish

หรือใช้ Firebase CLI จากโฟลเดอร์โปรเจ็กต์:

`firebase deploy --only firestore,storage --project <FIREBASE_PROJECT_ID>`

หาก Firebase ขออนุญาตให้ Storage Rules อ่านข้อมูล Firestore ให้กดยืนยัน Enable

## โครงสร้างข้อมูล

- `users/{uid}` — โปรไฟล์ผู้ใช้ส่วนกลาง
- `projects/world-heritage/members/{uid}` — บทบาทของผู้ใช้ในโครงการนี้
- `projects/world-heritage/media/{mediaId}` — รูปภาพคุณภาพสูงไฟล์เดียว วิดีโอ และลำดับสไลด์
- `projects/world-heritage/comments/{commentId}` — ความคิดเห็น
- `projects/world-heritage/chatThreads/{uid}/messages/{messageId}` — แชท
- `projects/world-heritage/settings/content` — การตั้งค่าเนื้อหา
- `projects/world-heritage/siteNodes/{nodeId}` — ผังโครงการและโหนดย่อย (Admin เท่านั้น)
- Storage: `projects/world-heritage/media/{uid}/{fileName}`

## สิทธิ์

- Admin เริ่มต้น: `jaru072@gmail.com`
- Admin: เพิ่ม แก้ไข ลบสื่อ จัดการสิทธิ์ผู้ใช้ จัดผังโครงการ ลบความคิดเห็น และตอบแชท
- Manager: ดูสื่อและตอบแชท แต่ไม่สามารถเพิ่ม แก้ไข หรือลบสื่อ
- User: แสดงความคิดเห็นและแชทกับผู้ดูแล
- บุคคลทั่วไป: อ่านเนื้อหา ดูสื่อ และอ่านความคิดเห็นได้โดยไม่ต้องเข้าสู่ระบบ

Security Rules เป็นผู้บังคับสิทธิ์จริง โค้ดหน้าจอมีหน้าที่ซ่อนหรือแสดงปุ่มให้เหมาะกับบทบาทเท่านั้น

## ระบบซิงก์สื่อจาก Google Drive

Cloud Functions ในโฟลเดอร์ functions อ่านไฟล์ด้วยบัญชีบริการของ runtime และสิทธิ์
Google Drive แบบอ่านอย่างเดียว จึงไม่มี service-account key หรือ OAuth token อยู่ในหน้าเว็บ

- โฟลเดอร์หลัก: พระธาตุพนม สู่มรดกโลก
- บัญชีบริการ runtime: 1003681232767-compute@developer.gserviceaccount.com
- แชร์โฟลเดอร์หลักให้บัญชีบริการเป็น Viewer เท่านั้น
- งาน syncDriveMedia ทำงานทุก 5 นาที
- งาน syncDriveMediaNow เรียกจากปุ่มซิงก์ทันทีและอนุญาตเฉพาะ Admin
- สถานะล่าสุด: projects/world-heritage/settings/driveMediaSync
- Media Index: projects/world-heritage/media
- สำเนาสำหรับหน้าเว็บ: projects/world-heritage/media/drive

การจับคู่โฟลเดอร์:

- Hero → สไลด์ภาพหลัก
- เรื่องราวแห่งศรัทธา → สไลด์ในหัวข้อเรื่องราว
- คุณค่าโดดเด่นเป็นสากล → สไลด์ในหัวข้อคุณค่า
- โครงการบูรณะสระมุจลินท์ → ภาพนำของพื้นที่โครงการสนับสนุน
- Videos → คลังวิดีโอ

ชื่อไฟล์ที่ขึ้นต้นด้วยตัวเลข เช่น 01- หรือ 02- ใช้กำหนดลำดับแสดงผล เมื่อเพิ่ม ลบ
เปลี่ยนชื่อ หรือแทนที่เนื้อหาไฟล์ ระบบจะปรับ Media Index ในรอบซิงก์ถัดไป

เผยแพร่ backend และ rules ด้วย Firebase CLI จากโฟลเดอร์ราก โดยเลือก functions,
firestore และ storage ส่วนหน้าเว็บเผยแพร่ผ่าน ChatGPT Sites ตามขั้นตอนของโครงการ
