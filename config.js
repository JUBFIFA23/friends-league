/* ════════════════════════════════════════════════════════════════
   ตั้งค่า Firebase (ดูวิธีสร้างทีละขั้นใน README › ข้อมูลออนไลน์ (Firebase))
   คัดลอกจาก Firebase console › Project settings › Your apps › firebaseConfig
   ค่าเหล่านี้ "ไม่ใช่รหัสลับ" — ทุกเว็บที่ใช้ Firebase แสดงค่านี้ในหน้าเว็บอยู่แล้ว
   ความปลอดภัยมาจาก:
     - กฎในไฟล์ firestore.rules (วางใน Firestore Database › Rules)
     - Authentication › Settings › Authorized domains (โดเมนที่ล็อกอินได้)
   ปล่อยว่างไว้ = โหมดเครื่องเดียว (ข้อมูลอยู่ในเบราว์เซอร์นั้น ไม่แชร์กับเครื่องอื่น)
   ════════════════════════════════════════════════════════════════ */
window.FL_CONFIG = {
  firebase: {
    apiKey: "AIzaSyC3lzgxRLXXP_JlkoHAU4pJaUEtvwXMPY4",
    authDomain: "friends-league-a626c.firebaseapp.com",
    projectId: "friends-league-a626c",
    storageBucket: "friends-league-a626c.firebasestorage.app",
    messagingSenderId: "75355140625",
    appId: "1:75355140625:web:1ac54a921e6a34eed9b7b0",
  },
};
