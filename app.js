/* ════════════════════════════════════════════════════════════════
   Friends League · eFootball 2027 Mobile
   ⚠️ ห้ามใส่ import / export ในไฟล์นี้เด็ดขาด
      Babel standalone (preset react) แปลงแค่ JSX ไม่แปลง ES Module
      React / ReactDOM มาจาก CDN เป็น global อยู่แล้ว
   สี: ใช้ชื่อ token (bg-surface, text-ink, text-accent …) ที่ประกาศใน index.html/style.css
       ห้ามใส่ hex ตรง ๆ ในคลาส ไม่งั้นสลับธีมสว่าง/มืดไม่ได้
   ════════════════════════════════════════════════════════════════ */

const { useState, useMemo, useEffect, useRef } = React;

/* ══════════════════════════ ICONS (SVG เขียนเอง ไม่ใช้ lucide) ══════════════════════════ */
const P = {
  trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  table:'<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  plus:'<path d="M5 12h14M12 5v14"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  crown:'<path d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.51.29l4.28-3.66a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52L7.1 9.16a1 1 0 0 0 1.51-.29z"/><path d="M5 21h14"/>',
  calendar:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  pencil:'<path d="M21.17 6.81a1 1 0 0 0-3.98-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.63l4.36-1.32a2 2 0 0 0 .83-.5z"/>',
  sparkles:'<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  trash:'<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  wand:'<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/>',
  key:'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  userPlus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>'
};

const Ic = ({ n, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    className={className} dangerouslySetInnerHTML={{ __html: P[n] || "" }} />
);

/* ══════════════════════════ STORAGE ══════════════════════════ */
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
};
const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
};

/* ══════════════════════════ SEED DATA ══════════════════════════ */
const SEED_TEAMS = [
  { id:1, name:"NONT FC",      owner:"นนท์",  club:"Manchester City", num:10, kit:"#6CC0E5" },
  { id:2, name:"BEAM UNITED",  owner:"บีม",   club:"Real Madrid",     num:7,  kit:"#E7E7EA" },
  { id:3, name:"GOLF SQUAD",   owner:"กอล์ฟ", club:"Inter Milan",     num:9,  kit:"#3B6FD4" },
  { id:4, name:"PAT ATHLETIC", owner:"แพท",   club:"Liverpool",       num:11, kit:"#D94A4A" },
  { id:5, name:"TON CITY",     owner:"ต้น",   club:"Barcelona",       num:8,  kit:"#9B2B57" },
  { id:6, name:"MHOO FC",      owner:"หมู",   club:"Bayern Munich",   num:4,  kit:"#C8452F" },
];

const SEED_MATCHES = [
  { id:1, round:1, home:1, away:2, hs:3, as:1, status:"done", date:"2026-08-20", events:[
    { type:"goal", teamId:1, player:"Haaland", assist:"Foden" },
    { type:"goal", teamId:1, player:"Haaland", assist:"" },
    { type:"goal", teamId:1, player:"Foden",   assist:"Silva" },
    { type:"goal", teamId:2, player:"Mbappé",  assist:"Vinícius" },
    { type:"yellow", teamId:2, player:"Rüdiger" } ]},
  { id:2, round:1, home:3, away:4, hs:2, as:2, status:"done", date:"2026-08-20", events:[
    { type:"goal", teamId:3, player:"Lautaro", assist:"Barella" },
    { type:"goal", teamId:3, player:"Thuram",  assist:"" },
    { type:"goal", teamId:4, player:"Salah",   assist:"Szoboszlai" },
    { type:"goal", teamId:4, player:"Salah",   assist:"" },
    { type:"red", teamId:3, player:"Bastoni" } ]},
  { id:3, round:1, home:5, away:6, hs:1, as:4, status:"done", date:"2026-08-21", events:[
    { type:"goal", teamId:5, player:"Lewandowski", assist:"" },
    { type:"goal", teamId:6, player:"Kane",    assist:"Musiala" },
    { type:"goal", teamId:6, player:"Kane",    assist:"" },
    { type:"goal", teamId:6, player:"Kane",    assist:"Sané" },
    { type:"goal", teamId:6, player:"Musiala", assist:"Kane" } ]},
  { id:4, round:2, home:2, away:3, hs:2, as:0, status:"done", date:"2026-08-27", events:[
    { type:"goal", teamId:2, player:"Mbappé",     assist:"Bellingham" },
    { type:"goal", teamId:2, player:"Bellingham", assist:"" } ]},
  { id:5, round:2, home:4, away:5, hs:null, as:null, status:"scheduled", date:"2026-09-03", events:[] },
  { id:6, round:2, home:6, away:1, hs:null, as:null, status:"scheduled", date:"2026-09-03", events:[] },
];

/* ══════════════════════════ HELPERS: วันเวลา / motion / สี ══════════════════════════ */
// เครื่องที่ตั้ง "ลดการเคลื่อนไหว" → ไม่เอียงการ์ด ไม่นับเลข
const REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

const pad2 = n => String(n).padStart(2, "0");
const isoDate = d => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
// match.time เป็นฟิลด์ใหม่ (ไม่บังคับ) — ข้อมูลเก่าที่ไม่มีจะถือว่าเตะ 20:00
const timeOf  = m => m.time || "20:00";
const kickoff = m => new Date((m.date || "2100-01-01") + "T" + timeOf(m));
const fmtDay  = m => kickoff(m).toLocaleDateString("th-TH", { weekday:"short", day:"numeric", month:"short" });
const byPlayOrder = (a, b) => a.round - b.round || (a.date || "").localeCompare(b.date || "") || a.id - b.id;
// สีชุดแบบโปร่งใส (#rrggbb + alpha) — สีที่ไม่ใช่รูปแบบนี้ได้โปร่งใสไปเลย กันพื้นหลังพัง
const tint = (hex, a) => /^#[0-9a-f]{6}$/i.test(hex || "") ? hex + a : "transparent";

/* ══════════════════════════ LOGIC ══════════════════════════ */
function computeStandings(teams, matches) {
  const rows = {};
  teams.forEach(t => rows[t.id] = { team:t, P:0, W:0, D:0, L:0, GF:0, GA:0, PTS:0, form:[] });

  // เรียงตามสัปดาห์ก่อน ฟอร์มจะได้เรียงเก่า → ใหม่ถูกต้อง
  matches.filter(m => m.status === "done").sort(byPlayOrder).forEach(m => {
    const h = rows[m.home], a = rows[m.away];
    if (!h || !a) return;
    h.P++; a.P++;
    h.GF += m.hs; h.GA += m.as;
    a.GF += m.as; a.GA += m.hs;
    if (m.hs > m.as)      { h.W++; a.L++; h.PTS += 3; h.form.push("W"); a.form.push("L"); }
    else if (m.hs < m.as) { a.W++; h.L++; a.PTS += 3; a.form.push("W"); h.form.push("L"); }
    else                  { h.D++; a.D++; h.PTS++; a.PTS++; h.form.push("D"); a.form.push("D"); }
  });

  return Object.values(rows)
    .map(r => ({ ...r, GD: r.GF - r.GA }))
    .sort((x, y) => y.PTS - x.PTS || y.GD - x.GD || y.GF - x.GF || x.team.name.localeCompare(y.team.name));
}

// อันดับขยับเท่าไรเทียบกับก่อนสัปดาห์ล่าสุดที่มีผล → { teamId: +ขึ้น / -ลง }
function computeMovement(teams, matches) {
  const done = matches.filter(m => m.status === "done");
  if (!done.length) return {};
  const last = Math.max(...done.map(m => m.round));
  const before = done.filter(m => m.round < last);
  if (!before.length) return {};
  const prev = {};
  computeStandings(teams, before).forEach((r, i) => prev[r.team.id] = i);
  const move = {};
  computeStandings(teams, done).forEach((r, i) => move[r.team.id] = prev[r.team.id] - i);
  return move;
}

function computeScorers(matches, teams) {
  const map = {};
  const touch = (player, teamId) => {
    const k = player + "|" + teamId;
    if (!map[k]) map[k] = { player, teamId, G:0, A:0, Y:0, R:0 };
    return map[k];
  };

  matches.filter(m => m.status === "done").forEach(m =>
    (m.events || []).forEach(e => {
      if (!e.player) return;
      if (e.type === "goal") {
        touch(e.player, e.teamId).G++;
        if (e.assist) touch(e.assist, e.teamId).A++;
      }
      if (e.type === "yellow") touch(e.player, e.teamId).Y++;
      if (e.type === "red")    touch(e.player, e.teamId).R++;
    })
  );

  return Object.values(map)
    .map(r => ({ ...r, team: teams.find(t => t.id === r.teamId) }))
    .sort((a, b) => b.G - a.G || b.A - a.A || a.player.localeCompare(b.player));
}

// "Kane ×3, Musiala" — คนยิงของทีมหนึ่งในนัดเดียว
function scorerLine(m, teamId) {
  const c = {};
  (m.events || []).forEach(e => {
    if (e.type === "goal" && e.teamId === teamId && e.player) c[e.player] = (c[e.player] || 0) + 1;
  });
  return Object.entries(c).sort((a, b) => b[1] - a[1])
    .map(([p, n]) => n > 1 ? p + " ×" + n : p).join(", ");
}

// พบกันหมด: วางทีมเป็นวงกลม m ทีม (m คี่) สัปดาห์ r จับคู่ r+k กับ r−k
// ทีมคู่ → ทีมสุดท้ายอยู่ตรงกลาง เจอทีม r ที่ว่างในสัปดาห์นั้น · ทีมคี่ → ทีม r ได้พัก
// เจ้าบ้าน = ฝั่งที่อีกทีมอยู่ "ข้างหน้า" 1..(m−1)/2 ช่อง → ทุกทีมได้เหย้าเท่ากัน (ต่างกันไม่เกิน 1)
function roundRobin(ids, double) {
  const n = ids.length;
  if (n < 2) return [];
  const odd = n % 2 === 1, m = odd ? n : n - 1, rounds = [];
  for (let r = 0; r < m; r++) {
    const pairs = [];
    if (!odd) pairs.push(r % 2 ? [ids[r], ids[n - 1]] : [ids[n - 1], ids[r]]);
    for (let k = 1; k <= (m - 1) / 2; k++) {
      const x = (r + k) % m, y = (r - k + m) % m;
      pairs.push((2 * k) % m <= (m - 1) / 2 ? [ids[y], ids[x]] : [ids[x], ids[y]]);
    }
    rounds.push(pairs);
  }
  return double ? rounds.concat(rounds.map(ps => ps.map(([h, w]) => [w, h]))) : rounds;
}

function buildFixtures(teams, o) {
  const [y, mo, d] = o.start.split("-").map(Number);
  let id = 0;
  return roundRobin(teams.map(t => t.id), o.double).flatMap((pairs, r) =>
    pairs.map(([home, away]) => ({
      id: ++id, round: r + 1, home, away, hs: null, as: null, status: "scheduled", events: [],
      date: isoDate(new Date(y, mo - 1, d + r * o.gap)), time: o.time,
    })));
}

/* ══════════════════════════ AUTH (บัญชีเก็บในเบราว์เซอร์เครื่องนี้) ══════════════════════════
   ไม่มีเซิร์ฟเวอร์ → กันคนที่ยืมเครื่องไปแก้ผลได้ แต่ไม่ใช่ความปลอดภัยระดับเซิร์ฟเวอร์
   รหัสผ่านไม่เก็บตรง ๆ: เก็บแค่ salt + SHA-256 วนซ้ำ (เขียนเองเพราะ crypto.subtle ใช้ไม่ได้
   เมื่อเปิดผ่าน http://IP-ในวง-LAN จากมือถือ) · ห้ามใส่รหัสผ่านตั้งต้นในโค้ดนี้           */
const SHA_K = (() => {
  const k = [];
  for (let n = 2; k.length < 64; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
    if (prime) k.push(((Math.cbrt(n) % 1) * 4294967296) | 0);
  }
  return k;
})();

function sha256(text) {
  const bytes = new TextEncoder().encode(text), l = bytes.length;
  const words = new Uint32Array(((l + 9 + 63) >> 6) << 4);
  for (let i = 0; i < l; i++) words[i >> 2] |= bytes[i] << (24 - (i % 4) * 8);
  words[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
  words[words.length - 1] = l * 8;
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const w = new Uint32Array(64);
  for (let i = 0; i < words.length; i += 16) {
    for (let t = 0; t < 64; t++) {
      if (t < 16) { w[t] = words[i + t]; continue; }
      const a = w[t - 15], b = w[t - 2];
      w[t] = w[t - 16] + (rotr(a, 7) ^ rotr(a, 18) ^ (a >>> 3)) + w[t - 7] + (rotr(b, 17) ^ rotr(b, 19) ^ (b >>> 10));
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + SHA_K[t] + w[t]) | 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H = [a, b, c, d, e, f, g, h].map((v, k) => (H[k] + v) | 0);
  }
  return H.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}

const PW_ROUNDS = 2000;
function hashPassword(password, salt) {
  let h = sha256(salt + "|" + password);
  for (let i = 0; i < PW_ROUNDS; i++) h = sha256(h + salt);
  return h;
}
const randomHex = bytes => Array.from(crypto.getRandomValues(new Uint8Array(bytes)), b => b.toString(16).padStart(2, "0")).join("");
const normUser = s => (s || "").trim().toLowerCase();
const checkPassword = (u, pw) => !!u && hashPassword(pw, u.salt) === u.hash;
const withPassword = (u, pw) => { const salt = randomHex(16); return { ...u, salt, hash: hashPassword(pw, salt) }; };
const newSession = u => ({ uid: u.id, exp: Date.now() + 30 * 864e5 });   // จำการล็อกอิน 30 วัน
const ROLE_LABEL = { admin: "แอดมิน", referee: "กรรมการ" };

// คืนข้อความผิดพลาด (ภาษาไทย) หรือ "" ถ้าผ่าน
function validateAccount(f, users, { needName = true, needConfirm = false } = {}) {
  if (needName && !(f.name || "").trim()) return "กรอกชื่อที่แสดง";
  if (!/^[a-z0-9_.-]{3,20}$/.test(normUser(f.username))) return "ชื่อผู้ใช้ต้องยาว 3–20 ตัว ใช้ได้แค่ a–z 0–9 _ . -";
  if (users.some(u => u.username === normUser(f.username))) return "ชื่อผู้ใช้นี้มีคนใช้แล้ว";
  return validatePassword(f.password, needConfirm ? f.confirm : f.password);
}
function validatePassword(pw, confirm) {
  if ((pw || "").length < 6) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัว";
  if (pw !== confirm) return "รหัสผ่านทั้งสองช่องไม่ตรงกัน";
  return "";
}
function makeUser(f, users) {
  return withPassword({
    id: Math.max(0, ...users.map(u => u.id)) + 1,
    name: f.name.trim(), username: normUser(f.username), role: f.role, created: Date.now(),
  }, f.password);
}

/* ══════════════════════════ SHARE IMAGE (วาดเองด้วย canvas) ══════════════════════════ */
const SHARE_PALETTE = {
  light: { page:"#EEF2F8", top:"#FFFFFF", bottom:"#F7F9FC", stroke:"rgba(15,23,42,0.08)", brand:"#4F46E5", ink:"#0F172A",
           muted:"#56657C", faint:"#94A3B8", divider:"rgba(15,23,42,0.07)", num:"#334155", win:"#147A3A", loss:"#B91C1C",
           medal:["#8C5D00", "#56657C", "#A4470A"], pts:["#6366F1", "#4338CA"] },
  dark:  { page:"#07070A", top:"#18181F", bottom:"#111116", stroke:"rgba(255,255,255,0.09)", brand:"#E8C468", ink:"#FFFFFF",
           muted:"#8A8A96", faint:"#55555F", divider:"rgba(255,255,255,0.06)", num:"#B5B5BE", win:"#34D399", loss:"#F87171",
           medal:["#E8C468", "#D4D7DD", "#D9A37A"], pts:["#F7E3A1", "#B8912F"] },
};
const rrect = (g, x, y, w, h, r) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);         g.arcTo(x, y, x + w, y, r);
  g.closePath();
};
const clip = (g, s, max) => {
  if (g.measureText(s).width <= max) return s;
  while (s.length > 1 && g.measureText(s + "…").width > max) s = s.slice(0, -1);
  return s + "…";
};

async function renderStandingsPng(standings, subtitle, theme) {
  const C = SHARE_PALETTE[theme] || SHARE_PALETTE.light;
  const TH = '"Noto Sans Thai", sans-serif', KN = 'Kanit, "Noto Sans Thai", sans-serif';
  // โหลดฟอนต์ไทย+ละตินให้ครบก่อนวาด ไม่งั้น canvas จะใช้ฟอนต์สำรอง
  try {
    await Promise.all([["400", TH], ["600", TH], ["600", KN]].map(([w, f]) => document.fonts.load(w + " 30px " + f, "ตารางคะแนน ABC 123")));
  } catch (e) {}

  const W = 1080, X = 72, ROW = 96, TOP = 300, H = TOP + standings.length * ROW + 150;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");
  const grad = ([a, b], y0, y1) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };

  g.fillStyle = C.page; g.fillRect(0, 0, W, H);
  rrect(g, 36, 36, W - 72, H - 72, 40);
  g.fillStyle = grad([C.top, C.bottom], 36, H - 36); g.fill();
  g.strokeStyle = C.stroke; g.lineWidth = 2; g.stroke();

  g.fillStyle = C.brand; g.font = "600 22px " + TH;
  if ("letterSpacing" in g) g.letterSpacing = "5px";
  g.fillText("FRIENDS LEAGUE · EFOOTBALL 2027 MOBILE", X, 120);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  g.fillStyle = C.ink; g.font = "600 64px " + KN; g.fillText("ตารางคะแนน", X, 200);
  g.fillStyle = C.muted; g.font = "400 26px " + TH; g.fillText(subtitle, X, 245);

  const cols = [600, 668, 736, 804, 880], PTS_X = W - X - 32;
  g.textAlign = "center"; g.font = "600 20px " + TH; g.fillStyle = C.muted;
  ["P", "W", "D", "L", "GD"].forEach((l, k) => g.fillText(l, cols[k], TOP - 18));
  g.fillStyle = C.brand; g.fillText("PTS", PTS_X, TOP - 18);

  standings.forEach((r, i) => {
    const y = TOP + i * ROW, mid = y + ROW / 2;
    g.fillStyle = C.divider; g.fillRect(X, y, W - 2 * X, 1);

    g.textAlign = "center"; g.font = "600 36px " + KN;
    g.fillStyle = r.P > 0 && i < 3 ? C.medal[i] : C.faint;
    g.fillText(String(i + 1), X + 22, mid + 12);

    rrect(g, X + 62, mid - 26, 8, 52, 4); g.fillStyle = tint(r.team.kit, "") === "transparent" ? C.faint : r.team.kit; g.fill();

    g.textAlign = "left";
    g.fillStyle = C.ink; g.font = "600 32px " + TH;
    g.fillText(clip(g, r.team.name, 400), X + 92, mid - 2);
    g.fillStyle = C.muted; g.font = "400 22px " + TH;
    g.fillText(clip(g, r.team.club + " · " + r.team.owner, 400), X + 92, mid + 30);

    g.textAlign = "center"; g.font = "400 30px " + TH; g.fillStyle = C.num;
    [r.P, r.W, r.D, r.L].forEach((v, k) => g.fillText(String(v), cols[k], mid + 11));
    g.fillStyle = r.GD > 0 ? C.win : r.GD < 0 ? C.loss : C.muted;
    g.fillText((r.GD > 0 ? "+" : "") + r.GD, cols[4], mid + 11);
    g.font = "600 42px " + KN; g.fillStyle = grad(C.pts, mid - 22, mid + 14);
    g.fillText(String(r.PTS), PTS_X, mid + 14);
  });

  g.textAlign = "center"; g.fillStyle = C.faint; g.font = "400 22px " + TH;
  g.fillText("Friends League · บันทึกผลด้วยมือ", W / 2, H - 82);

  return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("toBlob")), "image/png"));
}

/* ══════════════════════════ UI ATOMS ══════════════════════════ */
// ป้ายภาษาไทย: ห้ามใส่ uppercase/tracking กว้าง ไม่งั้นสระกับวรรณยุกต์แยกออกจากตัวอักษร
const LABEL = "text-xs text-muted";
const INPUT = "w-full rounded-xl bg-sunken px-3 py-2.5 text-sm text-ink ring-1 ring-line/10 outline-none transition focus:ring-2 focus:ring-accent/60 placeholder:text-faint disabled:opacity-50";

// ตัวเลขเด่น: ธีมสว่าง = ไล่สีคราม · ธีมมืด = ไล่สีทอง
const Hl = ({ children, className = "" }) => <span className={"fl-hl " + className}>{children}</span>;

const Card = ({ children, className = "", ...p }) => (
  <div {...p} className={"fl-surface rounded-2xl ring-1 ring-line/[0.07] " + className}>{children}</div>
);

const Btn = ({ children, variant = "ghost", className = "", type = "button", ...p }) => {
  const styles = {
    primary: "fl-btn-primary font-semibold hover:brightness-110",
    ghost:   "bg-surface text-soft ring-1 ring-line/10 hover:text-ink hover:ring-line/20 dark:bg-white/[0.04]",
    danger:  "bg-loss/10 text-loss ring-1 ring-loss/25 hover:bg-loss/15",
  }[variant];
  return (
    <button type={type} {...p} className={"inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 " + styles + " " + className}>
      {children}
    </button>
  );
};

const FormPill = ({ r }) => {
  const c = {
    W: "bg-win/10 text-win ring-win/25",
    D: "bg-line/[0.05] text-muted ring-line/10",
    L: "bg-loss/10 text-loss ring-loss/25",
  }[r];
  return <span className={"grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-bold ring-1 " + c}>{r}</span>;
};

const SectionTitle = ({ icon, kicker, title, action }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        <Ic n={icon} size={13} className="text-accent" /> {kicker}
      </div>
      <h2 className="font-display text-3xl font-semibold text-ink">{title}</h2>
    </div>
    {action}
  </div>
);

const SubHead = ({ children, link, onLink }) => (
  <div className="mb-3 flex items-center justify-between">
    <span className="text-sm font-medium text-soft">{children}</span>
    {link && <button onClick={onLink} className="text-xs font-medium text-accent hover:underline">{link} →</button>}
  </div>
);

const Field = ({ label, hint, children }) => (
  <label className="block">
    <span className={LABEL + " mb-1.5 block"}>{label}</span>
    {children}
    {hint && <span className="mt-1 block text-[11px] text-muted">{hint}</span>}
  </label>
);

const Note = ({ kind = "error", children }) => (
  <div role={kind === "error" ? "alert" : "status"}
    className={"rounded-xl px-3 py-2 text-sm ring-1 " + (kind === "error" ? "bg-loss/10 text-loss ring-loss/20" : "bg-win/10 text-win ring-win/20")}>
    {children}
  </div>
);

function PasswordInput({ value, onChange, placeholder = "", autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete} className={INPUT + " pr-10"} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted hover:text-ink">
        <Ic n={show ? "eyeOff" : "eye"} size={16} />
      </button>
    </div>
  );
}

const AVATAR_COLORS = ["#4F46E5", "#0369A1", "#047857", "#B45309", "#B91C1C", "#BE185D", "#6D28D9", "#0F766E"];
const Avatar = ({ u, size = "md" }) => {
  const k = [...(u.username || "")].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  return (
    <span className={"grid shrink-0 place-items-center rounded-full font-display font-semibold text-white " + (size === "lg" ? "h-12 w-12 text-lg" : "h-8 w-8 text-sm")}
      style={{ background: AVATAR_COLORS[k % AVATAR_COLORS.length] }} aria-hidden="true">
      {[...(u.name || "?").trim()][0] || "?"}
    </span>
  );
};

const RoleChip = ({ role }) => (
  <span className={"inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 " +
    (role === "admin" ? "bg-accent/10 text-accent ring-accent/20" : "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300")}>
    {ROLE_LABEL[role] || role}
  </span>
);

const Segmented = ({ value, onChange, items }) => (
  <div className="mb-5 flex gap-1 rounded-xl bg-sunken p-1 ring-1 ring-line/[0.05]">
    {items.map(([k, label]) => (
      <button key={k} type="button" onClick={() => onChange(k)}
        className={"flex-1 rounded-lg px-3 py-1.5 text-sm transition " +
          (value === k ? "bg-surface font-medium text-ink shadow-sm ring-1 ring-line/[0.06] dark:bg-white/[0.08]" : "text-muted hover:text-ink")}>
        {label}
      </button>
    ))}
  </div>
);

const Modal = ({ children, onClose, className = "max-w-md" }) => {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fl-scrim fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <Card className={"fl-enter max-h-[88vh] w-full overflow-y-auto rounded-3xl p-6 " + className}>{children}</Card>
    </div>
  );
};

const ModalHead = ({ kicker, title, onClose }) => (
  <div className="mb-6 flex items-start justify-between gap-3">
    <div className="min-w-0">
      {kicker && <div className={LABEL + " truncate"}>{kicker}</div>}
      <h3 className="truncate font-display text-xl font-semibold text-ink">{title}</h3>
    </div>
    <button type="button" onClick={onClose} aria-label="ปิด" className="shrink-0 rounded-lg p-2 text-muted hover:bg-line/[0.05] hover:text-ink">
      <Ic n="x" size={18} />
    </button>
  </div>
);

// ตัวเลขวิ่งจากค่าเดิมไปค่าใหม่ (ease-out ~0.7 วิ)
function CountUp({ value, ms = 700 }) {
  const [v, setV] = useState(REDUCED ? value : 0);
  const from = useRef(REDUCED ? value : 0);
  useEffect(() => {
    if (REDUCED) { setV(value); from.current = value; return; }
    const start = from.current;
    let raf, t0;
    const step = t => {
      if (t0 == null) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      const now = Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3)));
      from.current = now;
      setV(now);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // กันเลขค้างกลางทาง ถ้าเบราว์เซอร์ไม่วาดเฟรม (เช่นแท็บถูกพับ)
    const settle = setTimeout(() => { cancelAnimationFrame(raf); from.current = value; setV(value); }, ms + 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); };
  }, [value]);
  return v;
}

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const chip = "rounded-full px-3 py-1 font-medium ring-1 tabular-nums ";
  let s = Math.floor((target - now) / 1000);
  if (s <= 0) return <span className={chip + "bg-line/[0.05] text-soft ring-line/10"}>ถึงเวลาแข่งแล้ว · รอกรอกผล</span>;
  const d = Math.floor(s / 86400); s %= 86400;
  return (
    <span className={chip + "bg-accent/10 text-accent ring-accent/25"}>
      อีก {d > 0 ? d + " วัน " : ""}{pad2(Math.floor(s / 3600))}:{pad2(Math.floor(s % 3600 / 60))}:{pad2(s % 60)}
    </span>
  );
}

// ▲ ขึ้น / ▼ ลง / — เท่าเดิม
const Move = ({ d }) => {
  if (!d) return <span className="text-[11px] text-faint">—</span>;
  return d > 0
    ? <span title={"ขึ้น " + d + " อันดับจากสัปดาห์ก่อน"} className="text-[11px] font-medium text-win">▲{d}</span>
    : <span title={"ลง " + -d + " อันดับจากสัปดาห์ก่อน"} className="text-[11px] font-medium text-loss">▼{-d}</span>;
};

// การ์ดเอียงตามเมาส์ + แสงวาบ (มือถือ/ลดการเคลื่อนไหว → ไม่เอียง)
function Tilt({ children, className = "", ...p }) {
  const ref = useRef(null);
  const move = e => {
    if (REDUCED || e.pointerType !== "mouse") return;
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={reset} className={"fl-tilt relative " + className} {...p}>
      {children}
      <div className="fl-sheen pointer-events-none absolute inset-0 rounded-[22px]" />
    </div>
  );
}

/* ══════════════════════════ TEAM CARD (การ์ดสะสม) ══════════════════════════ */
// กรอบตามอันดับ: 1 ทอง · 2 เงิน · 3 ทองแดง (ต้องแข่งแล้วอย่างน้อย 1 นัด) · 0 ธรรมดา — สีอยู่ใน style.css
const tierOf = (rank, row) => row && row.P > 0 && rank >= 1 && rank <= 3 ? rank : 0;
const cardBg = kit => ({ background: `linear-gradient(180deg, ${tint(kit, "1f")} 0%, transparent 45%), var(--card-inner)` });

const TeamCard = ({ t, rank, row, onOpen, onEdit, canEdit }) => {
  const tier = tierOf(rank, row);
  const r = row || { P:0, GD:0, PTS:0 };
  return (
    <Tilt role="button" tabIndex={0} aria-label={"ดูโปรไฟล์ " + t.name}
      onClick={() => onOpen(t)}
      onKeyDown={e => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(t); } }}
      className={"fl-card fl-frame fl-tier-" + tier + " group aspect-[5/7] cursor-pointer rounded-[22px] p-[1.5px] shadow-[0_14px_34px_-20px_rgb(15_23_42/0.35)] outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:aspect-[3/4]"}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[21px] p-4 sm:p-5" style={cardBg(t.kit)}>
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="fl-tier-label shrink-0 font-medium">{r.P > 0 ? "อันดับ " + rank : "ยังไม่ได้แข่ง"}</span>
          <span className="truncate text-muted">{t.club}</span>
        </div>
        <div className="mt-2 h-[3px] w-10 rounded-full ring-1 ring-line/10" style={{ background: t.kit }} />
        <div className="grid min-h-0 flex-1 place-items-center">
          <div className="fl-num fl-card-num font-display font-bold leading-none">{t.num}</div>
        </div>
        <div className="truncate font-display text-lg font-semibold text-ink sm:text-xl">{t.name}</div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted">โดย {t.owner}</span>
          {canEdit && (
            <button onClick={e => { e.stopPropagation(); onEdit(t); }}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-opacity md:opacity-0 md:group-hover:opacity-100">
              <Ic n="pencil" size={11} /> แก้ไข
            </button>
          )}
        </div>
        <div className="mt-3 grid grid-cols-3 border-t border-line/[0.08] pt-3 text-center text-[11px] tabular-nums">
          <div><div className="text-muted">P</div><div className="font-medium text-ink">{r.P}</div></div>
          <div><div className="text-muted">GD</div>
            <div className={"font-medium " + (r.GD > 0 ? "text-win" : r.GD < 0 ? "text-loss" : "text-soft")}>{r.GD > 0 ? "+" : ""}{r.GD}</div></div>
          <div><div className="text-muted">PTS</div><div className="font-semibold text-accent">{r.PTS}</div></div>
        </div>
      </div>
    </Tilt>
  );
};

/* ══════════════════════════ MATCH ROW ══════════════════════════ */
const MatchRow = ({ m, teams, canEdit, isAdmin, onResult, onSchedule }) => {
  const h = teams.find(t => t.id === m.home), a = teams.find(t => t.id === m.away);
  const done = m.status === "done";
  const side = (t, mine, other) => {
    const line = done && t ? scorerLine(m, t.id) : "";
    return (
      <>
        <div className={"truncate font-medium " + (!done || mine >= other ? "text-ink" : "text-muted")}>{t ? t.name : "—"}</div>
        <div className="truncate text-[11px] text-muted">{line || (t && t.club)}</div>
      </>
    );
  };
  return (
    <Card className="fl-lift relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 overflow-hidden p-4">
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: h ? h.kit : "transparent" }} />
      <span className="absolute inset-y-0 right-0 w-1" style={{ background: a ? a.kit : "transparent" }} />
      <div className="min-w-0 text-right">{side(h, m.hs, m.as)}</div>
      <div className="text-center">
        {done ? (
          <div className="font-display text-2xl font-semibold text-ink">{m.hs} <span className="text-faint">–</span> {m.as}</div>
        ) : (
          <div className="rounded-lg bg-sunken px-3 py-1.5 text-xs leading-snug text-soft ring-1 ring-line/[0.08] tabular-nums">
            <div>{fmtDay(m)}</div><div className="text-muted">{timeOf(m)} น.</div>
          </div>
        )}
        {(canEdit || (isAdmin && !done)) && (
          <div className="mt-1.5 flex justify-center gap-3 text-[11px]">
            {canEdit && <button onClick={() => onResult(m)} className="font-medium text-accent hover:underline">{done ? "แก้ไขผล" : "กรอกผล"}</button>}
            {isAdmin && !done && <button onClick={() => onSchedule(m)} className="text-muted hover:text-ink hover:underline">เลื่อนวัน</button>}
          </div>
        )}
      </div>
      <div className="min-w-0">{side(a, m.as, m.hs)}</div>
    </Card>
  );
};

/* ══════════════════════════ NEXT MATCH ══════════════════════════ */
function NextMatch({ m, teams, standings, canEdit, onResult, onOpen }) {
  const h = teams.find(t => t.id === m.home), a = teams.find(t => t.id === m.away);
  if (!h || !a) return null;
  const form = id => { const r = standings.find(x => x.team.id === id); return r ? r.form.slice(-3) : []; };
  const side = (t, right) => (
    <button onClick={() => onOpen(t)} className={"group min-w-0 " + (right ? "text-right" : "text-left")}>
      <div className="truncate font-display text-xl font-semibold text-ink transition group-hover:text-accent sm:text-3xl">{t.name}</div>
      <div className="mt-1 truncate text-xs text-muted">{t.club} · {t.owner}</div>
      <div className={"mt-2 flex h-5 gap-1 " + (right ? "justify-end" : "")}>
        {form(t.id).map((f, k) => <FormPill key={k} r={f} />)}
      </div>
    </button>
  );
  return (
    <Card className="relative mb-8 overflow-hidden rounded-3xl">
      {/* สีชุดสองทีมจาง ๆ ซ้าย–ขวา */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(90deg, ${tint(h.kit, "24")}, transparent 42%, transparent 58%, ${tint(a.kit, "24")})` }} />
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: h.kit }} />
      <span className="absolute inset-y-0 right-0 w-1.5" style={{ background: a.kit }} />
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-6 pt-5 text-xs">
        <span className="flex items-center gap-1.5 text-muted"><Ic n="clock" size={13} className="text-accent" /> นัดถัดไป · สัปดาห์ที่ {m.round} · {fmtDay(m)} {timeOf(m)} น.</span>
        <Countdown target={kickoff(m).getTime()} />
      </div>
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 pb-6 pt-4 sm:gap-8">
        {side(h, true)}
        <div className="rounded-full bg-surface px-3 py-1 font-display text-sm font-semibold text-muted ring-1 ring-line/[0.08]">VS</div>
        {side(a, false)}
      </div>
      {canEdit && (
        <div className="relative -mt-1 flex justify-center pb-6">
          <Btn variant="primary" onClick={() => onResult(m)}><Ic n="pencil" size={13} /> กรอกผล</Btn>
        </div>
      )}
    </Card>
  );
}

/* ══════════════════════════ RESULT MODAL ══════════════════════════ */
function ResultModal({ match, teams, onClose, onSave }) {
  const [hs, setHs] = useState(match.hs == null ? 0 : match.hs);
  const [as, setAs] = useState(match.as == null ? 0 : match.as);
  const [events, setEvents] = useState(match.events && match.events.length ? match.events : []);
  const home = teams.find(t => t.id === match.home);
  const away = teams.find(t => t.id === match.away);

  const addEvent = () => setEvents([...events, { type:"goal", teamId:match.home, player:"", assist:"" }]);
  const upd = (i, k, v) => setEvents(events.map((e, idx) => idx === i ? { ...e, [k]: v } : e));
  const del = i => setEvents(events.filter((_, idx) => idx !== i));
  const autoScore = () => {
    setHs(events.filter(e => e.type === "goal" && e.teamId === match.home).length);
    setAs(events.filter(e => e.type === "goal" && e.teamId === match.away).length);
  };
  const SCORE = "h-12 w-12 rounded-xl bg-surface text-center font-display text-xl font-semibold text-accent ring-1 ring-line/10 outline-none focus:ring-2 focus:ring-accent/60 sm:h-14 sm:w-14 sm:text-2xl";

  return (
    <Modal onClose={onClose} className="max-w-2xl">
      <ModalHead kicker={"สัปดาห์ที่ " + match.round} title="บันทึกผลการแข่งขัน" onClose={onClose} />

      {/* มือถือ: ช่องสกอร์เล็กลง + ชื่อทีมขึ้นบรรทัดใหม่ได้ ไม่โดนตัดเหลือ "NO…" */}
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl bg-sunken p-4 ring-1 ring-line/[0.06] sm:gap-4 sm:p-5">
        <div className="min-w-0 text-right">
          <div className="break-words font-display text-base font-semibold leading-tight text-ink sm:text-lg">{home && home.name}</div>
          <div className="truncate text-xs text-muted">{home && home.club}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <input type="number" min="0" value={hs} onChange={e => setHs(+e.target.value)} aria-label="ประตูทีมเหย้า" className={SCORE} />
          <span className="text-faint">:</span>
          <input type="number" min="0" value={as} onChange={e => setAs(+e.target.value)} aria-label="ประตูทีมเยือน" className={SCORE} />
        </div>
        <div className="min-w-0">
          <div className="break-words font-display text-base font-semibold leading-tight text-ink sm:text-lg">{away && away.name}</div>
          <div className="truncate text-xs text-muted">{away && away.club}</div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-soft">เหตุการณ์ในนัด</span>
        <div className="flex gap-2">
          <Btn onClick={autoScore}><Ic n="sparkles" size={13} /> คิดสกอร์ให้</Btn>
          <Btn onClick={addEvent}><Ic n="plus" size={14} /> เพิ่ม</Btn>
        </div>
      </div>

      <div className="space-y-2">
        {events.length === 0 && (
          <div className="rounded-xl border border-dashed border-line/15 py-8 text-center text-sm text-muted">
            ยังไม่มีเหตุการณ์ — กด “เพิ่ม” เพื่อบันทึกผู้ทำประตู
          </div>
        )}
        {/* มือถือ: 2 แถว (ประเภท/ทีม/ลบ → นักเตะ/แอสซิสต์) · จอใหญ่: แถวเดียว */}
        {events.map((e, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_34px] gap-2 rounded-xl bg-sunken p-2 ring-1 ring-line/[0.06] sm:grid-cols-[104px_124px_1fr_1fr_34px]">
            <select value={e.type} onChange={ev => upd(i, "type", ev.target.value)} className={INPUT + " bg-surface"}>
              <option value="goal">⚽ ประตู</option>
              <option value="yellow">🟨 เหลือง</option>
              <option value="red">🟥 แดง</option>
            </select>
            <select value={e.teamId} onChange={ev => upd(i, "teamId", +ev.target.value)} className={INPUT + " bg-surface"}>
              <option value={match.home}>{home && home.name}</option>
              <option value={match.away}>{away && away.name}</option>
            </select>
            <button onClick={() => del(i)} aria-label="ลบเหตุการณ์"
              className="grid place-items-center rounded-lg text-muted hover:bg-loss/10 hover:text-loss sm:order-last">
              <Ic n="x" size={15} />
            </button>
            <input value={e.player} onChange={ev => upd(i, "player", ev.target.value)}
              placeholder="ชื่อนักเตะ" className={INPUT + " bg-surface"} />
            <input value={e.assist || ""} onChange={ev => upd(i, "assist", ev.target.value)}
              placeholder={e.type === "goal" ? "แอสซิสต์" : "—"} disabled={e.type !== "goal"}
              className={INPUT + " bg-surface"} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Btn onClick={onClose}>ยกเลิก</Btn>
        <Btn variant="primary" onClick={() => onSave(match.id, hs, as, events)}>
          <Ic n="check" size={15} /> ยืนยันผล
        </Btn>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ TEAM MODAL ══════════════════════════ */
function TeamModal({ team, onClose, onSave, onDelete }) {
  const [f, setF] = useState(team || { name:"", owner:"", club:"", num:9, kit:"#4F46E5" });
  const set = (k, v) => setF({ ...f, [k]: v });

  return (
    <Modal onClose={onClose}>
      <ModalHead title={team ? "แก้ไขทีม" : "เพิ่มทีมใหม่"} onClose={onClose} />

      <div className="space-y-3">
        <Field label="ชื่อทีม"><input value={f.name} onChange={e => set("name", e.target.value)} placeholder="เช่น NONT FC" className={INPUT} /></Field>
        <Field label="ชื่อผู้เล่น"><input value={f.owner} onChange={e => set("owner", e.target.value)} placeholder="เช่น นนท์" className={INPUT} /></Field>
        <Field label="สโมสรที่ใช้ในเกม"><input value={f.club} onChange={e => set("club", e.target.value)} placeholder="เช่น Manchester City" className={INPUT} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="เลขเสื้อ"><input type="number" min="1" max="99" value={f.num} onChange={e => set("num", +e.target.value)} className={INPUT} /></Field>
          <Field label="สีชุด"><input type="color" value={f.kit} onChange={e => set("kit", e.target.value)} className="h-[42px] w-full rounded-xl" /></Field>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {team
          ? <Btn variant="danger" onClick={() => onDelete(team.id)}><Ic n="trash" size={14} /> ลบ</Btn>
          : <span />}
        <div className="flex gap-3">
          <Btn onClick={onClose}>ยกเลิก</Btn>
          <Btn variant="primary" onClick={() => f.name && onSave(f)}><Ic n="check" size={15} /> บันทึก</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ LOGIN / SETUP MODAL ══════════════════════════ */
// ใส่รหัสผิด 5 ครั้ง → ชื่อผู้ใช้นั้นพัก 30 วิ (นับต่อแม้ปิด/เปิดหน้าต่างใหม่ · รีเซ็ตเมื่อรีโหลดหน้า)
const LOGIN_GUARD = {};

// ยังไม่มีบัญชีเลย → สร้างแอดมินคนแรก · มีแล้ว → ล็อกอิน
function LoginModal({ users, onClose, onLogin, onSetup }) {
  const setup = users.length === 0;
  const [f, setF] = useState({ name: "", username: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [help, setHelp] = useState(false);
  const set = (k, v) => { setF({ ...f, [k]: v }); setErr(""); };

  const submit = e => {
    e.preventDefault();
    if (setup) {
      const msg = validateAccount(f, users, { needConfirm: true });
      return msg ? setErr(msg) : onSetup(f);
    }
    const name = normUser(f.username);
    const g = LOGIN_GUARD[name] || (LOGIN_GUARD[name] = { fails: 0, until: 0 });
    const wait = Math.ceil((g.until - Date.now()) / 1000);
    if (wait > 0) return setErr("ใส่ผิดหลายครั้ง รออีก " + wait + " วินาทีแล้วลองใหม่");
    const u = users.find(x => x.username === name);
    if (!checkPassword(u, f.password)) {
      if (++g.fails >= 5) { g.until = Date.now() + 30000; g.fails = 0; }
      return setErr("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
    g.fails = 0;
    onLogin(u);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="-mr-2 -mt-2 flex justify-end">
          <button type="button" onClick={onClose} aria-label="ปิด" className="rounded-lg p-2 text-muted hover:bg-line/[0.05] hover:text-ink">
            <Ic n="x" size={18} />
          </button>
        </div>
        <div className="mb-6 text-center">
          <div className="fl-brand mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl">
            <Ic n={setup ? "crown" : "lock"} size={20} />
          </div>
          <h3 className="font-display text-2xl font-semibold text-ink">{setup ? "ตั้งค่าแอดมินคนแรก" : "เข้าสู่ระบบ"}</h3>
          <p className="mt-1 text-sm text-muted">
            {setup ? "ยังไม่มีบัญชีในเครื่องนี้ สร้างบัญชีแอดมินเพื่อเริ่มจัดการลีก" : "สำหรับแอดมินและกรรมการ"}
          </p>
        </div>

        <div className="space-y-3">
          {setup && (
            <Field label="ชื่อที่แสดง">
              <input value={f.name} onChange={e => set("name", e.target.value)} placeholder="เช่น นนท์" autoComplete="name" className={INPUT} />
            </Field>
          )}
          <Field label="ชื่อผู้ใช้" hint={setup ? "a–z 0–9 _ . - ยาว 3–20 ตัว (ใช้ตอนล็อกอิน)" : null}>
            <input value={f.username} onChange={e => set("username", e.target.value)} placeholder="เช่น nont"
              autoComplete="username" autoCapitalize="none" spellCheck={false} className={INPUT} />
          </Field>
          <Field label="รหัสผ่าน" hint={setup ? "อย่างน้อย 6 ตัว" : null}>
            <PasswordInput value={f.password} onChange={v => set("password", v)} autoComplete={setup ? "new-password" : "current-password"} />
          </Field>
          {setup && (
            <Field label="ยืนยันรหัสผ่าน">
              <PasswordInput value={f.confirm} onChange={v => set("confirm", v)} autoComplete="new-password" />
            </Field>
          )}
          {err && <Note>{err}</Note>}
        </div>

        <Btn type="submit" variant="primary" className="mt-5 w-full justify-center py-2.5">
          <Ic n={setup ? "check" : "login"} size={15} /> {setup ? "สร้างบัญชีแอดมิน" : "เข้าสู่ระบบ"}
        </Btn>

        {!setup && (
          <button type="button" onClick={() => setHelp(!help)} className="mt-3 w-full text-center text-xs text-muted hover:text-ink">
            ลืมรหัสผ่าน?
          </button>
        )}
        {help && (
          <p className="mt-2 rounded-xl bg-sunken p-3 text-xs leading-relaxed text-muted">
            กรรมการลืมรหัส → ให้แอดมินกด “ตั้งรหัสใหม่” ในเมนูบัญชี › จัดการผู้ใช้<br />
            แอดมินลืมรหัสเอง → ต้องล้างข้อมูลเว็บไซต์นี้ในเบราว์เซอร์ ข้อมูลลีกในเครื่องนี้จะหายด้วย (กด Export JSON เก็บไว้ก่อน)
          </p>
        )}
        <button type="button" onClick={onClose} className="mt-4 w-full text-center text-xs text-muted hover:text-ink">
          ดูแบบผู้ชม (ไม่ต้องล็อกอิน)
        </button>
        <p className="mt-4 border-t border-line/[0.07] pt-3 text-center text-[11px] leading-relaxed text-muted">
          บัญชีเก็บในเบราว์เซอร์เครื่องนี้เท่านั้น · รหัสผ่านถูกเข้ารหัส ไม่เก็บตัวจริง
        </p>
      </form>
    </Modal>
  );
}

/* ══════════════════════════ ACCOUNT MODAL ══════════════════════════ */
function ChangePassword({ username, onSubmit }) {
  const blank = { current: "", password: "", confirm: "" };
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState(null);
  const set = (k, v) => { setF({ ...f, [k]: v }); setMsg(null); };
  const submit = e => {
    e.preventDefault();
    const err = onSubmit(f);
    if (err) return setMsg({ kind: "error", text: err });
    setF(blank);
    setMsg({ kind: "ok", text: "เปลี่ยนรหัสผ่านเรียบร้อย" });
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      {/* ช่องชื่อผู้ใช้ซ่อนไว้ให้ตัวจัดการรหัสผ่านของเบราว์เซอร์รู้ว่าเป็นบัญชีไหน */}
      <input type="text" name="username" autoComplete="username" value={username} readOnly hidden />
      <Field label="รหัสผ่านปัจจุบัน"><PasswordInput value={f.current} onChange={v => set("current", v)} autoComplete="current-password" /></Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="รหัสผ่านใหม่" hint="อย่างน้อย 6 ตัว"><PasswordInput value={f.password} onChange={v => set("password", v)} autoComplete="new-password" /></Field>
        <Field label="ยืนยันรหัสผ่านใหม่"><PasswordInput value={f.confirm} onChange={v => set("confirm", v)} autoComplete="new-password" /></Field>
      </div>
      {msg && <Note kind={msg.kind}>{msg.text}</Note>}
      <div className="flex justify-end"><Btn type="submit" variant="primary"><Ic n="key" size={14} /> บันทึกรหัสใหม่</Btn></div>
    </form>
  );
}

function UserManager({ me, users, onAdd, onUpdate, onReset, onDelete }) {
  const blank = { name: "", username: "", password: "", role: "referee" };
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [resetId, setResetId] = useState(null);
  const [resetPw, setResetPw] = useState("");
  const admins = users.filter(u => u.role === "admin").length;
  const set = (k, v) => { setF({ ...f, [k]: v }); setMsg(null); };

  const add = e => {
    e.preventDefault();
    const err = onAdd(f);
    if (err) return setMsg({ kind: "error", text: err });
    setMsg({ kind: "ok", text: "เพิ่ม " + f.name.trim() + " แล้ว · บอกชื่อผู้ใช้กับรหัสผ่านให้เจ้าตัว" });
    setF(blank);
  };
  const reset = (e, u) => {
    e.preventDefault();
    const err = onReset(u.id, resetPw);
    if (err) return setMsg({ kind: "error", text: err });
    setResetId(null);
    setMsg({ kind: "ok", text: "ตั้งรหัสใหม่ให้ " + u.name + " แล้ว" });
  };

  return (
    <div>
      {msg && <div className="mb-3"><Note kind={msg.kind}>{msg.text}</Note></div>}
      <div className="divide-y divide-line/[0.06] rounded-2xl bg-sunken ring-1 ring-line/[0.06]">
        {users.map(u => {
          const self = u.id === me.id, lastAdmin = u.role === "admin" && admins <= 1;
          return (
            <div key={u.id} className="px-3 py-3">
              <div className="flex items-center gap-3">
                <Avatar u={u} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{u.name}{self && <span className="font-normal text-muted"> (คุณ)</span>}</div>
                  <div className="truncate text-xs text-muted">@{u.username}</div>
                </div>
                <select value={u.role} disabled={self || lastAdmin} onChange={e => onUpdate(u.id, { role: e.target.value })}
                  aria-label={"สิทธิ์ของ " + u.name} className={INPUT + " w-auto bg-surface py-1.5"}>
                  <option value="admin">แอดมิน</option>
                  <option value="referee">กรรมการ</option>
                </select>
              </div>
              <div className="mt-2 flex justify-end gap-4 text-xs">
                <button type="button" onClick={() => { setResetId(resetId === u.id ? null : u.id); setResetPw(""); setMsg(null); }}
                  aria-label={"ตั้งรหัสใหม่ให้ " + u.name} className="font-medium text-accent hover:underline">ตั้งรหัสใหม่</button>
                {!self && (
                  <button type="button" disabled={lastAdmin} onClick={() => { if (confirm("ลบผู้ใช้ " + u.name + "?")) onDelete(u.id); }}
                    aria-label={"ลบผู้ใช้ " + u.name} className="font-medium text-loss hover:underline disabled:opacity-40">ลบ</button>
                )}
              </div>
              {resetId === u.id && (
                <form onSubmit={e => reset(e, u)} noValidate className="mt-2 flex gap-2">
                  <input type="text" name="username" autoComplete="username" value={u.username} readOnly hidden />
                  <div className="flex-1"><PasswordInput value={resetPw} onChange={setResetPw} placeholder="รหัสใหม่ อย่างน้อย 6 ตัว" autoComplete="new-password" /></div>
                  <Btn type="submit" variant="primary">บันทึก</Btn>
                </form>
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={add} noValidate className="mt-6 space-y-3">
        <SubHead>เพิ่มผู้ใช้</SubHead>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="ชื่อที่แสดง"><input value={f.name} onChange={e => set("name", e.target.value)} placeholder="เช่น บีม" className={INPUT} /></Field>
          <Field label="ชื่อผู้ใช้"><input value={f.username} onChange={e => set("username", e.target.value)} placeholder="เช่น beam"
            autoCapitalize="none" spellCheck={false} autoComplete="off" className={INPUT} /></Field>
          <Field label="รหัสผ่านเริ่มต้น"><PasswordInput value={f.password} onChange={v => set("password", v)} autoComplete="new-password" /></Field>
          <Field label="สิทธิ์">
            <select value={f.role} onChange={e => set("role", e.target.value)} className={INPUT}>
              <option value="referee">กรรมการ — กรอกผล</option>
              <option value="admin">แอดมิน — จัดการทุกอย่าง</option>
            </select>
          </Field>
        </div>
        <div className="flex justify-end"><Btn type="submit" variant="primary"><Ic n="userPlus" size={14} /> เพิ่มผู้ใช้</Btn></div>
      </form>
    </div>
  );
}

function AccountModal({ user, users, onClose, onLogout, onChangePassword, onAddUser, onUpdateUser, onResetPassword, onDeleteUser }) {
  const isAdmin = user.role === "admin";
  const [tab, setTab] = useState("password");
  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ModalHead kicker="บัญชีของฉัน" title={user.name} onClose={onClose} />
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-sunken p-3 ring-1 ring-line/[0.06]">
        <Avatar u={user} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-soft">@{user.username}</div>
          <div className="mt-1"><RoleChip role={user.role} /></div>
        </div>
        <Btn onClick={onLogout}><Ic n="logout" size={14} /> ออกจากระบบ</Btn>
      </div>
      {isAdmin
        ? <Segmented value={tab} onChange={setTab} items={[["password", "เปลี่ยนรหัสผ่าน"], ["users", "จัดการผู้ใช้ (" + users.length + ")"]]} />
        : <SubHead>เปลี่ยนรหัสผ่าน</SubHead>}
      {tab === "users" && isAdmin
        ? <UserManager me={user} users={users} onAdd={onAddUser} onUpdate={onUpdateUser} onReset={onResetPassword} onDelete={onDeleteUser} />
        : <ChangePassword username={user.username} onSubmit={onChangePassword} />}
    </Modal>
  );
}

/* ══════════════════════════ TEAM PROFILE ══════════════════════════ */
function TeamProfile({ team, rank, row, matches, teams, scorers, canEdit, onEdit, onClose }) {
  const tier = tierOf(rank, row);
  const r = row || { P:0, W:0, D:0, L:0, GF:0, GA:0, GD:0, PTS:0, form:[] };
  const mine = matches.filter(m => m.home === team.id || m.away === team.id).sort(byPlayOrder);
  const top = scorers.filter(s => s.teamId === team.id && (s.G || s.A)).slice(0, 5);
  const nameOf = id => { const t = teams.find(x => x.id === id); return t ? t.name : "—"; };
  const record = [["แข่ง", r.P], ["ชนะ", r.W], ["เสมอ", r.D], ["แพ้", r.L], ["ได้", r.GF], ["เสีย", r.GA], ["ผลต่าง", r.GD], ["แต้ม", r.PTS]];
  const tone = (l, v) => l === "แต้ม" ? "text-accent" : l !== "ผลต่าง" ? "text-ink" : v > 0 ? "text-win" : v < 0 ? "text-loss" : "text-ink";

  return (
    <Modal onClose={onClose} className="max-w-2xl">
      <ModalHead kicker={team.club + " · โดย " + team.owner} title={team.name} onClose={onClose} />

      <div className="grid gap-5 sm:grid-cols-[168px_1fr]">
        <div className={"fl-frame fl-tier-" + tier + " mx-auto w-36 rounded-[20px] p-[1.5px] sm:mx-0 sm:w-full"}>
          <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-[19px]" style={cardBg(team.kit)}>
            <span className="h-[3px] w-10 rounded-full ring-1 ring-line/10" style={{ background: team.kit }} />
            <div className="fl-num font-display text-7xl font-bold leading-none">{team.num}</div>
            <div className="fl-tier-label text-xs font-medium">{r.P ? "อันดับ " + rank : "ยังไม่ได้แข่ง"}</div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-2">
            {record.map(([l, v]) => (
              <div key={l} className="rounded-xl bg-sunken px-3 py-2.5 ring-1 ring-line/[0.06]">
                <div className={LABEL}>{l}</div>
                <div className={"font-display text-xl font-semibold " + tone(l, v)}>{l === "ผลต่าง" && v > 0 ? "+" : ""}<CountUp value={v} /></div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className={LABEL}>ฟอร์ม 5 นัดล่าสุด</span>
            <div className="flex gap-1">
              {r.form.length ? r.form.slice(-5).map((f, k) => <FormPill key={k} r={f} />) : <span className="text-xs text-muted">—</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <SubHead>คนยิงของทีม</SubHead>
          {top.length === 0 ? <div className="text-sm text-muted">ยังไม่มี</div> : (
            <div className="divide-y divide-line/[0.06] rounded-xl bg-sunken ring-1 ring-line/[0.06]">
              {top.map(s => (
                <div key={s.player} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                  <span className="truncate text-ink">{s.player}</span>
                  <span className="shrink-0 text-xs text-muted"><span className="font-semibold text-accent">{s.G}</span> ประตู · {s.A} แอสซิสต์</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <SubHead>โปรแกรมและผล</SubHead>
          {mine.length === 0 ? <div className="text-sm text-muted">ยังไม่มีโปรแกรม</div> : (
            <div className="divide-y divide-line/[0.06] rounded-xl bg-sunken ring-1 ring-line/[0.06]">
              {mine.map(m => {
                const home = m.home === team.id, done = m.status === "done";
                const gf = home ? m.hs : m.as, ga = home ? m.as : m.hs;
                return (
                  <div key={m.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span className="w-9 shrink-0 text-[11px] text-muted">{home ? "เหย้า" : "เยือน"}</span>
                    <span className="min-w-0 flex-1 truncate text-ink">{nameOf(home ? m.away : m.home)}</span>
                    {done ? (
                      <>
                        <span className="font-display font-semibold text-ink">{gf}–{ga}</span>
                        <FormPill r={gf > ga ? "W" : gf < ga ? "L" : "D"} />
                      </>
                    ) : <span className="shrink-0 text-xs text-muted">{fmtDay(m)}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {canEdit && (
        <div className="mt-6 flex justify-end">
          <Btn onClick={() => onEdit(team)}><Ic n="pencil" size={13} /> แก้ไขทีม</Btn>
        </div>
      )}
    </Modal>
  );
}

/* ══════════════════════════ SCHEDULE MODAL (เลื่อนวัน) ══════════════════════════ */
function ScheduleModal({ match, teams, onClose, onSave }) {
  const [date, setDate] = useState(match.date || isoDate(new Date()));
  const [time, setTime] = useState(timeOf(match));
  const h = teams.find(t => t.id === match.home), a = teams.find(t => t.id === match.away);
  return (
    <Modal onClose={onClose}>
      <ModalHead kicker={"สัปดาห์ที่ " + match.round} title="เลื่อนวัน / เวลาแข่ง" onClose={onClose} />
      <div className="mb-5 truncate text-center text-sm font-medium text-ink">
        {h && h.name} <span className="font-normal text-muted">vs</span> {a && a.name}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="วันที่"><input type="date" value={date} onChange={e => setDate(e.target.value)} className={INPUT} /></Field>
        <Field label="เวลาเตะ"><input type="time" value={time} onChange={e => setTime(e.target.value)} className={INPUT} /></Field>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Btn onClick={onClose}>ยกเลิก</Btn>
        <Btn variant="primary" disabled={!date || !time} onClick={() => onSave(match.id, date, time)}><Ic n="check" size={15} /> บันทึก</Btn>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ FIXTURE MODAL (จัดโปรแกรมอัตโนมัติ) ══════════════════════════ */
function FixtureModal({ teams, matchCount, doneCount, onClose, onCreate }) {
  const [o, setO] = useState({ start: isoDate(new Date()), time: "20:00", gap: 7, double: false });
  const set = (k, v) => setO({ ...o, [k]: v });
  const n = teams.length, legs = o.double ? 2 : 1;
  const rounds = (n % 2 ? n : n - 1) * legs, games = n * (n - 1) / 2 * legs;
  const create = () => {
    if (doneCount && !confirm("ผลที่บันทึกไว้ " + doneCount + " นัดจะถูกลบ ยืนยันสร้างโปรแกรมใหม่?")) return;
    onCreate(o);
  };

  return (
    <Modal onClose={onClose}>
      <ModalHead kicker="แอดมิน" title="จัดโปรแกรมอัตโนมัติ" onClose={onClose} />
      <p className="-mt-3 mb-5 text-sm leading-relaxed text-muted">แบบพบกันหมด ทุกทีมเจอกันครบ สัปดาห์ละ 1 นัดต่อทีม</p>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="วันแข่งสัปดาห์แรก"><input type="date" value={o.start} onChange={e => set("start", e.target.value)} className={INPUT} /></Field>
          <Field label="เวลาเตะ"><input type="time" value={o.time} onChange={e => set("time", e.target.value)} className={INPUT} /></Field>
        </div>
        <Field label="แต่ละสัปดาห์ห่างกัน (วัน)">
          <input type="number" min="1" max="60" value={o.gap} onChange={e => set("gap", Math.max(1, Math.min(60, +e.target.value || 1)))} className={INPUT} />
        </Field>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-sunken p-3 ring-1 ring-line/[0.07]">
          <input type="checkbox" checked={o.double} onChange={e => set("double", e.target.checked)} className="h-4 w-4 accent-indigo-600 dark:accent-amber-300" />
          <span className="text-sm text-ink">เหย้า–เยือน <span className="text-muted">(เจอกัน 2 รอบ)</span></span>
        </label>
      </div>

      <div className="mt-5 rounded-xl bg-accent/[0.07] p-4 text-sm ring-1 ring-accent/15">
        {n < 2 ? <span className="text-soft">ต้องมีอย่างน้อย 2 ทีม</span> : (
          <>
            <span className="font-medium text-ink">{n} ทีม</span> <span className="text-muted">→</span>{" "}
            <span className="font-semibold text-accent">{rounds} สัปดาห์ · {games} นัด</span>
            {n % 2 === 1 && <div className="mt-1 text-xs text-muted">จำนวนทีมเป็นเลขคี่ แต่ละสัปดาห์จะมี 1 ทีมได้พัก</div>}
          </>
        )}
      </div>
      {matchCount > 0 && (
        <div className="mt-3 rounded-xl bg-loss/10 p-3 text-xs leading-relaxed text-loss ring-1 ring-loss/20">
          โปรแกรมเดิม {matchCount} นัด{doneCount ? " (มีผลแล้ว " + doneCount + " นัด)" : ""} จะถูกแทนที่ทั้งหมด · อยากเก็บไว้ก่อน กด Export JSON ที่ท้ายหน้า
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Btn onClick={onClose}>ยกเลิก</Btn>
        <Btn variant="primary" disabled={n < 2 || !o.start || !o.time} onClick={create}><Ic n="wand" size={14} /> สร้างโปรแกรม</Btn>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ SHARE MODAL ══════════════════════════ */
function ShareModal({ blob, onClose }) {
  const url = useMemo(() => URL.createObjectURL(blob), [blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  const file = useMemo(() => new File([blob], "friends-league-standings.png", { type: "image/png" }), [blob]);
  // แชร์ตรงเข้าแอป (เช่น LINE) ได้เฉพาะเบราว์เซอร์ที่รองรับ — ที่เหลือใช้บันทึกรูป
  const canShare = !!(navigator.canShare && navigator.canShare({ files: [file] }));
  const download = () => { const a = document.createElement("a"); a.href = url; a.download = file.name; a.click(); };
  const share = () => navigator.share({ files: [file], title: "ตารางคะแนน Friends League" }).catch(() => {});

  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ModalHead title="แชร์ตารางคะแนน" onClose={onClose} />
      <img src={url} alt="ภาพตารางคะแนน" className="w-full rounded-2xl ring-1 ring-line/10" />
      <div className="mt-5 flex justify-end gap-3">
        <Btn onClick={download}><Ic n="download" size={14} /> บันทึกรูป</Btn>
        {canShare && <Btn variant="primary" onClick={share}><Ic n="share" size={14} /> แชร์</Btn>}
      </div>
    </Modal>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════ */
function FriendsLeague() {
  const [teams, setTeams]     = useState(() => load("fl_teams", SEED_TEAMS));
  const [matches, setMatches] = useState(() => load("fl_matches", SEED_MATCHES));
  const [users, setUsers]     = useState(() => load("fl_users", []));
  const [session, setSession] = useState(() => { const s = load("fl_session", null); return s && s.exp > Date.now() ? s : null; });
  const [theme, setTheme]     = useState(() => load("fl_theme", "light") === "dark" ? "dark" : "light");
  const [tab, setTab]         = useState("home");
  const [showLogin, setShowLogin]     = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [editMatch, setEditMatch]     = useState(null);
  const [teamModal, setTeamModal]     = useState(null);
  const [profileId, setProfileId]     = useState(null);
  const [scheduleMatch, setScheduleMatch] = useState(null);
  const [fixtureOpen, setFixtureOpen]     = useState(false);
  const [shareBlob, setShareBlob]   = useState(null);
  const [sharing, setSharing]       = useState(false);

  useEffect(() => save("fl_teams", teams), [teams]);
  useEffect(() => save("fl_matches", matches), [matches]);
  useEffect(() => save("fl_users", users), [users]);
  useEffect(() => {
    if (session) save("fl_session", session);
    else try { localStorage.removeItem("fl_session"); } catch (e) {}
  }, [session]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#07070A" : "#EEF2F8");
    save("fl_theme", theme);
  }, [theme]);

  const standings = useMemo(() => computeStandings(teams, matches), [teams, matches]);
  const scorers   = useMemo(() => computeScorers(matches, teams), [matches, teams]);
  const movement  = useMemo(() => computeMovement(teams, matches), [teams, matches]);
  const done      = useMemo(() => matches.filter(m => m.status === "done").sort(byPlayOrder), [matches]);
  const nextMatch = useMemo(() => matches.filter(m => m.status !== "done")
    .sort((a, b) => kickoff(a) - kickoff(b) || byPlayOrder(a, b))[0], [matches]);
  const recent    = done.slice(-3).reverse();
  const lastRound = done.reduce((mx, m) => Math.max(mx, m.round), 0);
  const goals     = matches.reduce((s, m) => s + (m.hs || 0) + (m.as || 0), 0);

  // ผู้ใช้ที่ล็อกอินอยู่ (ถ้าบัญชีถูกลบ → หลุดเป็นผู้ชมเอง)
  const user    = (session && users.find(u => u.id === session.uid)) || null;
  const canEdit = !!user && (user.role === "admin" || user.role === "referee");
  const isAdmin = !!user && user.role === "admin";
  const rankOf  = id => standings.findIndex(r => r.team.id === id) + 1;
  const rowOf   = id => standings.find(r => r.team.id === id);
  const openProfile = t => setProfileId(t.id);
  const profileTeam = teams.find(t => t.id === profileId);

  /* ── auth ── */
  const login = u => { setSession(newSession(u)); setShowLogin(false); };
  const setupAdmin = f => {
    const admin = makeUser({ ...f, role: "admin" }, []);
    setUsers([admin]);
    login(admin);
  };
  const logout = () => { setSession(null); setShowAccount(false); };
  const changePassword = f => {
    if (!checkPassword(user, f.current)) return "รหัสผ่านปัจจุบันไม่ถูกต้อง";
    const err = validatePassword(f.password, f.confirm);
    if (err) return err;
    setUsers(users.map(u => u.id === user.id ? withPassword(u, f.password) : u));
    return "";
  };
  const addUser = f => {
    const err = validateAccount(f, users);
    if (err) return err;
    setUsers([...users, makeUser(f, users)]);
    return "";
  };
  const adminCount = users.filter(u => u.role === "admin").length;
  const updateUser = (id, patch) => {
    const target = users.find(u => u.id === id);
    if (!target || id === user.id) return;
    if (target.role === "admin" && patch.role !== "admin" && adminCount <= 1) return;   // ต้องเหลือแอดมินอย่างน้อย 1
    setUsers(users.map(u => u.id === id ? { ...u, ...patch } : u));
  };
  const resetPassword = (id, pw) => {
    const err = validatePassword(pw, pw);
    if (err) return err;
    setUsers(users.map(u => u.id === id ? withPassword(u, pw) : u));
    return "";
  };
  const deleteUser = id => {
    const target = users.find(u => u.id === id);
    if (!target || id === user.id || (target.role === "admin" && adminCount <= 1)) return;
    setUsers(users.filter(u => u.id !== id));
  };

  /* ── league data ── */
  const saveResult = (id, hs, as, events) => {
    setMatches(matches.map(m => m.id === id ? { ...m, hs, as, events, status:"done" } : m));
    setEditMatch(null);
  };

  const saveSchedule = (id, date, time) => {
    setMatches(matches.map(m => m.id === id ? { ...m, date, time } : m));
    setScheduleMatch(null);
  };

  const createFixtures = o => {
    setMatches(buildFixtures(teams, o));
    setFixtureOpen(false);
    setTab("matches");
  };

  const saveTeam = f => {
    setTeams(f.id
      ? teams.map(t => t.id === f.id ? f : t)
      : [...teams, { ...f, id: Math.max(0, ...teams.map(t => t.id)) + 1 }]);
    setTeamModal(null);
  };

  const deleteTeam = id => {
    setTeams(teams.filter(t => t.id !== id));
    setMatches(matches.filter(m => m.home !== id && m.away !== id));
    setTeamModal(null);
  };

  // ล้างแค่ข้อมูลลีก (ทีม/นัด) — บัญชีผู้ใช้ยังอยู่
  const resetAll = () => {
    if (!confirm("ล้างทีมและผลการแข่งทั้งหมด แล้วกลับไปใช้ข้อมูลตัวอย่าง? (บัญชีผู้ใช้ไม่ถูกลบ)")) return;
    localStorage.removeItem("fl_teams");
    localStorage.removeItem("fl_matches");
    setTeams(SEED_TEAMS);
    setMatches(SEED_MATCHES);
  };

  const shareImage = async () => {
    setSharing(true);
    try {
      const sub = lastRound
        ? "หลังสัปดาห์ที่ " + lastRound + " · " + new Date().toLocaleDateString("th-TH", { day:"numeric", month:"long", year:"numeric" })
        : "ยังไม่เริ่มแข่ง";
      setShareBlob(await renderStandingsPng(standings, sub, theme));
    } catch (e) { alert("สร้างรูปไม่สำเร็จ"); }
    finally { setSharing(false); }
  };

  /* ── Export / Import JSON (เฉพาะทีม/นัด ไม่รวมบัญชีผู้ใช้) ── */
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ teams, matches }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "friends-league.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importData = ev => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const d = JSON.parse(reader.result);
        if (d.teams)   setTeams(d.teams);
        if (d.matches) setMatches(d.matches);
      } catch (e) { alert("ไฟล์ไม่ถูกต้อง"); }
    };
    reader.readAsText(file);
    ev.target.value = "";
  };

  const TABS = [
    { key:"home",      label:"หน้าแรก",    icon:"home" },
    { key:"standings", label:"ตารางคะแนน", icon:"table" },
    { key:"matches",   label:"โปรแกรม/ผล", icon:"calendar" },
    { key:"scorers",   label:"ดาวซัลโว",   icon:"target" },
    { key:"teams",     label:"ทีมทั้งหมด", icon:"users" },
  ];
  const rounds = [...new Set(matches.map(m => m.round))].sort((a, b) => a - b);
  const matchRow = m => (
    <MatchRow key={m.id} m={m} teams={teams} canEdit={canEdit} isAdmin={isAdmin}
      onResult={setEditMatch} onSchedule={setScheduleMatch} />
  );
  const teamCard = t => (
    <TeamCard key={t.id} t={t} rank={rankOf(t.id)} row={rowOf(t.id)}
      canEdit={isAdmin} onOpen={openProfile} onEdit={tm => setTeamModal(tm)} />
  );
  const STATS = [
    { l:"ทีมทั้งหมด", v: teams.length, icon:"users",    c:"bg-indigo-500/10 text-indigo-600 dark:text-indigo-300" },
    { l:"แข่งไปแล้ว", v: done.length,  icon:"calendar", c:"bg-sky-500/10 text-sky-600 dark:text-sky-300" },
    { l:"ประตูรวม",  v: goals,        icon:"target",   c:"bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" },
    { l:"จ่าฝูง",    v: (done.length && standings[0] && standings[0].team.name.split(" ")[0]) || "-", icon:"crown", c:"bg-amber-500/15 text-amber-600 dark:text-amber-300" },
  ];

  return (
    <div className="relative min-h-screen bg-page text-soft antialiased">
      {/* แถบสีจาง ๆ ด้านบน ให้หน้าดูสดขึ้น */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/[0.08] to-transparent" />

      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-40 border-b border-line/[0.06] bg-page/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="fl-brand grid h-10 w-10 shrink-0 place-items-center rounded-xl shadow-sm">
              <Ic n="trophy" size={19} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-lg font-semibold leading-tight text-ink">Friends League</div>
              <div className="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-muted">eFootball 2027 Mobile</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "เปลี่ยนเป็นธีมสว่าง" : "เปลี่ยนเป็นธีมมืด"} title={theme === "dark" ? "ธีมสว่าง" : "ธีมมืด"}
              className="grid h-10 w-10 place-items-center rounded-full bg-surface text-soft ring-1 ring-line/[0.08] transition hover:text-accent dark:bg-white/[0.04]">
              <Ic n={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>
            {user ? (
              <button onClick={() => setShowAccount(true)} aria-label="บัญชีของฉัน"
                className="flex items-center gap-2.5 rounded-full bg-surface py-1 pl-1 pr-1 ring-1 ring-line/[0.08] transition hover:ring-accent/40 sm:pr-3.5 dark:bg-white/[0.04]">
                <Avatar u={user} />
                <span className="hidden text-left sm:block">
                  <span className="block max-w-[120px] truncate text-sm font-medium leading-tight text-ink">{user.name}</span>
                  <span className="block text-[11px] leading-tight text-muted">{ROLE_LABEL[user.role]}</span>
                </span>
              </button>
            ) : (
              <Btn variant="primary" onClick={() => setShowLogin(true)}>
                <Ic n="login" size={14} /> {users.length ? "เข้าสู่ระบบ" : "ตั้งค่าแอดมิน"}
              </Btn>
            )}
          </div>
        </div>

        <nav className="mx-auto max-w-6xl px-5 pb-3" aria-label="เมนูหลัก">
          <div className="flex gap-1 overflow-x-auto rounded-2xl bg-sunken p-1 ring-1 ring-line/[0.05] sm:inline-flex">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} aria-current={tab === t.key ? "page" : undefined}
                className={"flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition " +
                  (tab === t.key ? "bg-surface font-medium text-ink shadow-sm ring-1 ring-line/[0.06] dark:bg-white/[0.08]" : "text-muted hover:text-ink")}>
                <Ic n={t.icon} size={15} className={tab === t.key ? "text-accent" : ""} /> {t.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-5 py-8">

        {/* ═══ HOME ═══ */}
        {tab === "home" && (
          <div className="fl-enter">
            <SectionTitle icon="sparkles" kicker="Season 1 · Overview" title="ภาพรวมลีก" />

            {nextMatch && (
              <NextMatch m={nextMatch} teams={teams} standings={standings} canEdit={canEdit}
                onResult={setEditMatch} onOpen={openProfile} />
            )}

            <SubHead link="ตารางเต็ม" onLink={() => setTab("standings")}>4 อันดับแรก</SubHead>
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {standings.slice(0, 4).map(r => teamCard(r.team))}
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map(s => (
                <Card key={s.l} className="flex items-center gap-3 p-4">
                  <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-xl " + s.c}><Ic n={s.icon} size={18} /></span>
                  <div className="min-w-0">
                    <div className={LABEL}>{s.l}</div>
                    <div className="truncate font-display text-2xl font-semibold leading-tight text-ink">
                      {typeof s.v === "number" ? <CountUp value={s.v} /> : <Hl>{s.v}</Hl>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {recent.length > 0 && (
              <>
                <SubHead link="ดูทั้งหมด" onLink={() => setTab("matches")}>ผลล่าสุด</SubHead>
                <div className="space-y-2.5">{recent.map(matchRow)}</div>
              </>
            )}
          </div>
        )}

        {/* ═══ STANDINGS ═══ */}
        {tab === "standings" && (
          <div className="fl-enter">
            <SectionTitle icon="table" kicker="Season 1 · Round Robin" title="ตารางคะแนน"
              action={<Btn onClick={shareImage} disabled={sharing}><Ic n="share" size={14} /> {sharing ? "กำลังสร้างรูป…" : "แชร์เป็นรูป"}</Btn>} />

            <Card className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[28px_30px_1fr_repeat(6,34px)_92px] gap-2 border-b border-line/[0.07] px-4 py-3 text-[11px] font-medium text-muted">
                  <div>#</div><div /><div>ทีม</div>
                  <div className="text-center">P</div>
                  <div className="text-center">W</div>
                  <div className="text-center">D</div>
                  <div className="text-center">L</div>
                  <div className="text-center">GD</div>
                  <div className="text-center text-accent">PTS</div>
                  <div className="text-center">ฟอร์ม</div>
                </div>

                {standings.map((r, i) => {
                  const tier = tierOf(i + 1, r);
                  return (
                    <div key={r.team.id} onClick={() => openProfile(r.team)}
                      className={"grid cursor-pointer grid-cols-[28px_30px_1fr_repeat(6,34px)_92px] items-center gap-2 px-4 py-3.5 text-sm tabular-nums transition hover:bg-accent/[0.04] " +
                        (i < standings.length - 1 ? "border-b border-line/[0.05]" : "")}>
                      <div className={"font-display text-base font-semibold " + (tier ? "fl-tier-label fl-tier-" + tier : "text-faint")}>{i + 1}</div>
                      <div><Move d={movement[r.team.id]} /></div>
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="h-7 w-1 shrink-0 rounded-full ring-1 ring-line/10" style={{ background: r.team.kit }} />
                        <div className="min-w-0">
                          <div className="truncate font-medium text-ink">{r.team.name}</div>
                          <div className="truncate text-[11px] text-muted">{r.team.club}</div>
                        </div>
                      </div>
                      <div className="text-center text-soft">{r.P}</div>
                      <div className="text-center text-soft">{r.W}</div>
                      <div className="text-center text-soft">{r.D}</div>
                      <div className="text-center text-soft">{r.L}</div>
                      <div className={"text-center " + (r.GD > 0 ? "text-win" : r.GD < 0 ? "text-loss" : "text-muted")}>
                        {r.GD > 0 ? "+" : ""}{r.GD}
                      </div>
                      <div className="text-center font-display text-lg font-semibold"><Hl>{r.PTS}</Hl></div>
                      <div className="flex justify-center gap-1">
                        {r.form.slice(-3).map((f, k) => <FormPill key={k} r={f} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <p className="mt-3 text-xs text-muted">▲▼ = อันดับที่ขยับจากก่อนสัปดาห์ล่าสุด · กดที่ทีมเพื่อดูโปรไฟล์</p>
          </div>
        )}

        {/* ═══ MATCHES ═══ */}
        {tab === "matches" && (
          <div className="fl-enter">
            <SectionTitle icon="calendar" kicker="Fixtures & Results" title="โปรแกรมการแข่งขัน"
              action={isAdmin ? <Btn variant="primary" onClick={() => setFixtureOpen(true)}><Ic n="wand" size={14} /> จัดโปรแกรมอัตโนมัติ</Btn> : null} />

            {matches.length === 0 && (
              <Card className="py-12 text-center text-sm text-muted">
                ยังไม่มีโปรแกรมแข่ง{isAdmin ? " — กด “จัดโปรแกรมอัตโนมัติ” เพื่อเริ่ม" : " — รอแอดมินจัดโปรแกรม"}
              </Card>
            )}

            {rounds.map(round => {
              const list = matches.filter(m => m.round === round).sort(byPlayOrder);
              return (
                <div key={round} className="mb-7">
                  <div className="mb-3 text-sm font-medium text-soft">สัปดาห์ที่ {round} <span className="font-normal text-muted">· {fmtDay(list[0])}</span></div>
                  <div className="space-y-2.5">{list.map(matchRow)}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ SCORERS ═══ */}
        {tab === "scorers" && (
          <div className="fl-enter">
            <SectionTitle icon="target" kicker="Golden Boot Race" title="ดาวซัลโว" />
            <Card className="overflow-hidden">
              <div className="grid grid-cols-[44px_1fr_repeat(4,44px)] gap-2 border-b border-line/[0.07] px-4 py-3 text-[11px] font-medium text-muted">
                <div>#</div><div>นักเตะ</div>
                <div className="text-center text-accent">G</div>
                <div className="text-center">A</div>
                <div className="text-center">🟨</div>
                <div className="text-center">🟥</div>
              </div>

              {scorers.length === 0 && (
                <div className="py-12 text-center text-sm text-muted">ยังไม่มีข้อมูลผู้ทำประตู</div>
              )}

              {scorers.map((s, i) => (
                <div key={s.player + "-" + s.teamId}
                  className={"grid grid-cols-[44px_1fr_repeat(4,44px)] items-center gap-2 px-4 py-3.5 text-sm tabular-nums transition hover:bg-accent/[0.04] " +
                    (i < scorers.length - 1 ? "border-b border-line/[0.05]" : "")}>
                  <div className={"font-display text-base font-semibold " + (i === 0 ? "text-accent" : "text-faint")}>
                    {i === 0 ? "★" : i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-ink">{s.player}</div>
                    <div className="truncate text-[11px] text-muted">{s.team && s.team.name}</div>
                  </div>
                  <div className="text-center font-display text-lg font-semibold"><Hl>{s.G}</Hl></div>
                  <div className="text-center text-soft">{s.A}</div>
                  <div className="text-center text-muted">{s.Y || "–"}</div>
                  <div className="text-center text-muted">{s.R || "–"}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ═══ TEAMS ═══ */}
        {tab === "teams" && (
          <div className="fl-enter">
            <SectionTitle icon="users" kicker="Squad Collection" title="ทีมทั้งหมด"
              action={isAdmin ? <Btn variant="primary" onClick={() => setTeamModal({})}><Ic n="plus" size={15} /> เพิ่มทีมใหม่</Btn> : null} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {teams.map(teamCard)}
            </div>
          </div>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative border-t border-line/[0.06] py-7 text-center text-xs text-muted">
        <div>Friends League · eFootball 2027 Mobile · บันทึกผลด้วยมือ (ไม่เชื่อมต่อ Konami API)</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Btn onClick={exportData}><Ic n="download" size={13} /> Export JSON</Btn>
          {isAdmin && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-surface px-4 py-2 text-sm text-soft ring-1 ring-line/10 transition hover:text-ink hover:ring-line/20 dark:bg-white/[0.04]">
              <Ic n="upload" size={13} /> Import JSON
              <input type="file" accept="application/json" onChange={importData} className="hidden" />
            </label>
          )}
        </div>
        {isAdmin && (
          <button onClick={resetAll} className="mt-3 text-[11px] text-muted hover:text-loss">
            รีเซ็ตข้อมูลลีกทั้งหมด
          </button>
        )}
      </footer>

      {showLogin && <LoginModal users={users} onClose={() => setShowLogin(false)} onLogin={login} onSetup={setupAdmin} />}
      {showAccount && user && (
        <AccountModal user={user} users={users} onClose={() => setShowAccount(false)} onLogout={logout}
          onChangePassword={changePassword} onAddUser={addUser} onUpdateUser={updateUser}
          onResetPassword={resetPassword} onDeleteUser={deleteUser} />
      )}
      {editMatch && <ResultModal match={editMatch} teams={teams} onClose={() => setEditMatch(null)} onSave={saveResult} />}
      {teamModal && <TeamModal team={teamModal.id ? teamModal : null} onClose={() => setTeamModal(null)} onSave={saveTeam} onDelete={deleteTeam} />}
      {profileTeam && (
        <TeamProfile team={profileTeam} rank={rankOf(profileTeam.id)} row={rowOf(profileTeam.id)}
          matches={matches} teams={teams} scorers={scorers} canEdit={isAdmin}
          onEdit={t => { setProfileId(null); setTeamModal(t); }} onClose={() => setProfileId(null)} />
      )}
      {scheduleMatch && <ScheduleModal match={scheduleMatch} teams={teams} onClose={() => setScheduleMatch(null)} onSave={saveSchedule} />}
      {fixtureOpen && (
        <FixtureModal teams={teams} matchCount={matches.length} doneCount={done.length}
          onClose={() => setFixtureOpen(false)} onCreate={createFixtures} />
      )}
      {shareBlob && <ShareModal blob={shareBlob} onClose={() => setShareBlob(null)} />}
    </div>
  );
}

/* ══════════════════════════ MOUNT ══════════════════════════ */
ReactDOM.createRoot(document.getElementById("root")).render(<FriendsLeague />);
