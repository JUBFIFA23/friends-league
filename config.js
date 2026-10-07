/* ════════════════════════════════════════════════════════════════
   ตั้งค่า Google Drive (ดูวิธีสร้างทีละขั้นใน README › Google Drive)
   ค่าเหล่านี้ "ไม่ใช่รหัสลับ" — เป็นค่าสาธารณะที่ Google ออกให้เว็บฝั่งเบราว์เซอร์
   ความปลอดภัยมาจากการจำกัดโดเมนใน Google Cloud Console:
     - OAuth Client ID → Authorized JavaScript origins
     - API key        → Application restrictions: Websites + API restrictions: Google Picker API
   ปล่อยว่างไว้ = ปิดฟีเจอร์ Google Drive (แอปยังใช้งานได้ปกติ เก็บข้อมูลในเครื่อง)
   ════════════════════════════════════════════════════════════════ */
window.FL_CONFIG = {
  googleClientId: "",   // OAuth 2.0 Client ID ชนิด Web application เช่น 1234567890-abc.apps.googleusercontent.com
  googleApiKey: "",     // API key สำหรับ Google Picker (หน้าต่างเลือกไฟล์)
  googleAppId: "",      // Project number ของ Google Cloud project (ตัวเลขล้วน)
};
