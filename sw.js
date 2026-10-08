/* Friends League — service worker (แอปบนมือถือ / PWA)
   ติดตั้งเป็นแอปได้ · เปิดเร็วขึ้น · เปิดดูข้อมูลล่าสุดได้ตอนเน็ตหลุด
   - ไฟล์ของเว็บเอง (หน้าเว็บ app.js style.css config.js ไอคอน): ขอจากเน็ตก่อน = ได้โค้ดล่าสุดเสมอ · เน็ตหลุด/ช้าเกิน 4 วิ → ใช้ที่เก็บไว้
   - ไลบรารีที่ล็อกเวอร์ชัน (React, Babel, Firebase SDK, ไฟล์ฟอนต์): ใช้ที่เก็บไว้ได้เลย (ไฟล์ไม่เปลี่ยนแล้ว)
   - Tailwind และ CSS ฟอนต์ (ไม่ล็อกเวอร์ชัน): ใช้ที่เก็บไว้ทันที แล้วอัปเดตเบื้องหลัง
   - ข้อมูลลีก / ล็อกอิน (Firestore, Firebase Auth) ไม่ผ่านตรงนี้ — Firebase เก็บแคชของมันเอง
   เปลี่ยนเวอร์ชันไลบรารีใน index.html / app.js → แก้รายการ PRECACHE ด้านล่าง แล้วเปลี่ยนเลข CACHE */
const CACHE = "fl-v1";
const PRECACHE = [
  "./", "index.html", "app.js", "style.css", "config.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/apple-touch-icon.png", "icons/favicon-32.png",
  "https://cdn.tailwindcss.com/",
  "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Noto+Sans+Thai:wght@400;500;600&display=swap",
  "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js",
  "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js",
  "https://cdn.jsdelivr.net/npm/@babel/standalone@7.25.6/babel.min.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js",
];
const PINNED  = [/^https:\/\/cdn\.jsdelivr\.net\/npm\/.+@\d/, /^https:\/\/www\.gstatic\.com\/firebasejs\/\d/, /^https:\/\/fonts\.gstatic\.com\//];
const FRESHEN = [/^https:\/\/cdn\.tailwindcss\.com\//, /^https:\/\/fonts\.googleapis\.com\//];
const SHELL   = /\.(html|js|css|png|svg|ico|webmanifest|json)$/;
const scoped  = path => new URL(path, self.registration.scope).href;

// เก็บไฟล์ลงที่เก็บ: ลองแบบ CORS ก่อน (เว็บที่ไม่รองรับ → no-cors) · ไม่สำเร็จก็ข้าม ไม่ให้การติดตั้งพัง
const grab = (cache, url) => fetch(url, { mode: "cors", credentials: "omit", cache: "no-cache" })
  .catch(() => fetch(url, { mode: "no-cors", cache: "no-cache" }))
  .then(res => res.ok || res.type === "opaque" ? cache.put(url, res) : null)
  .catch(() => {});

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(PRECACHE.map(u => grab(c, scoped(u)))))
    .then(() => self.skipWaiting()));
});

// เวอร์ชันใหม่ทำงานทันที + ลบที่เก็บของเวอร์ชันเก่า
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("fl-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const keep = (req, res) => {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
  }
  return res;
};
const stored = req => caches.match(req, { ignoreVary: true });

// ขอจากเน็ตก่อน · เน็ตหลุด หรือช้าเกิน 4 วิ → ใช้ที่เก็บไว้ (หน้าเว็บที่ไม่เคยเก็บ → ใช้หน้าแรกแทน)
function networkFirst(req) {
  return new Promise(resolve => {
    let sent = false;
    const send = r => { if (!sent && r) { sent = true; resolve(r); } return sent; };
    const backup = () => stored(req).then(hit => hit || (req.mode === "navigate" ? stored(scoped("./")) : null));
    const timer = setTimeout(() => backup().then(send), 4000);
    fetch(req)
      .then(res => { clearTimeout(timer); send(keep(req, res)); })
      .catch(() => { clearTimeout(timer); backup().then(hit => { if (!send(hit)) send(Response.error()); }); });
  });
}
const cacheFirst = req => stored(req).then(hit => hit || fetch(req).then(res => keep(req, res)));
function freshen(e, req) {
  const net = fetch(req).then(res => keep(req, res));
  e.waitUntil(net.catch(() => {}));
  return stored(req).then(hit => hit || net);
}

self.addEventListener("fetch", e => {
  const req = e.request, url = req.url;
  if (req.method !== "GET" || (req.cache === "only-if-cached" && req.mode !== "same-origin")) return;
  if (url.startsWith(self.registration.scope)) {
    if (req.mode === "navigate" || SHELL.test(new URL(url).pathname)) e.respondWith(networkFirst(req));
    return;
  }
  if (PINNED.some(r => r.test(url))) return e.respondWith(cacheFirst(req));
  if (FRESHEN.some(r => r.test(url))) return e.respondWith(freshen(e, req));
});
