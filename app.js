/* ════════════════════════════════════════════════════════════════
   Friends League · eFootball 2027 Mobile  (หน้าตาสไตล์ eFootball 2022)
   ⚠️ ห้ามใส่ import / export ในไฟล์นี้เด็ดขาด
      Babel standalone (preset react) แปลงแค่ JSX ไม่แปลง ES Module
      React / ReactDOM มาจาก CDN เป็น global อยู่แล้ว
   สี: ใช้ชื่อ token (bg-surface, text-ink, text-accent …) ที่ประกาศใน index.html/style.css
   ════════════════════════════════════════════════════════════════ */

const { useState, useMemo, useEffect, useRef, useContext } = React;

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
  eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/>',
  key:'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  userPlus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  image:'<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
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

/* ══════════════════════════ SQUAD (นักเตะ 23 คน: ตัวจริง 11 + สำรอง 12) ══════════════════════════ */
const SQUAD_SIZE = 23, STARTERS = 11;
// ตำแหน่งแบบ eFootball
const POSITIONS = ["GK", "CB", "LB", "RB", "DMF", "CMF", "AMF", "LMF", "RMF", "LWF", "RWF", "SS", "CF"];
const posGroup = p => p === "GK" ? "GK" : ["CB", "LB", "RB"].includes(p) ? "DF" : ["DMF", "CMF", "AMF", "LMF", "RMF"].includes(p) ? "MF" : "FW";
const POS_SIDE = { LB: 0, LMF: 0, LWF: 0, RB: 2, RMF: 2, RWF: 2 };   // ที่เหลืออยู่กลาง (1)
const DEFAULT_POS = ["GK", "LB", "CB", "CB", "RB", "DMF", "CMF", "CMF", "LWF", "CF", "RWF",
                     "GK", "CB", "CB", "LB", "RB", "DMF", "CMF", "AMF", "LWF", "RWF", "CF", "SS"];

/* ══════════════════════════ FORMATIONS (แผนการเล่น) ══════════════════════════
   แต่ละแผนมี 11 ช่อง: ตำแหน่ง + พิกัดบนสนาม (x: 0 ซ้าย → 100 ขวา · y: 0 ฝั่งบุก → 100 ประตูตัวเอง)
   team.formation = ชื่อแผน · team.lineup = id ตัวจริง 11 คนเรียงตามช่องของแผน */
const slot = (pos, x, y) => ({ pos, x, y });
const GK_SLOT = slot("GK", 50, 92);
const BACK3 = [slot("CB", 25, 74), slot("CB", 50, 76), slot("CB", 75, 74)];
const BACK4 = [slot("LB", 11, 69), slot("CB", 36, 75), slot("CB", 64, 75), slot("RB", 89, 69)];
const BACK5 = [slot("LB", 8, 63), slot("CB", 29, 74), slot("CB", 50, 76), slot("CB", 71, 74), slot("RB", 92, 63)];
const FORMATIONS = {
  "4-4-2":   [GK_SLOT, ...BACK4, slot("LMF", 12, 46), slot("CMF", 37, 50), slot("CMF", 63, 50), slot("RMF", 88, 46), slot("CF", 37, 15), slot("CF", 63, 15)],
  "4-3-3":   [GK_SLOT, ...BACK4, slot("CMF", 22, 50), slot("CMF", 50, 54), slot("CMF", 78, 50), slot("LWF", 16, 20), slot("CF", 50, 14), slot("RWF", 84, 20)],
  "4-3-2-1": [GK_SLOT, ...BACK4, slot("CMF", 22, 54), slot("CMF", 50, 57), slot("CMF", 78, 54), slot("AMF", 32, 33), slot("AMF", 68, 33), slot("CF", 50, 13)],
  "4-3-1-2": [GK_SLOT, ...BACK4, slot("CMF", 22, 54), slot("DMF", 50, 60), slot("CMF", 78, 54), slot("AMF", 50, 36), slot("CF", 35, 14), slot("CF", 65, 14)],
  "4-2-3-1": [GK_SLOT, ...BACK4, slot("DMF", 36, 60), slot("DMF", 64, 60), slot("LMF", 14, 38), slot("AMF", 50, 36), slot("RMF", 86, 38), slot("CF", 50, 13)],
  "4-2-1-3": [GK_SLOT, ...BACK4, slot("CMF", 36, 56), slot("CMF", 64, 56), slot("AMF", 50, 38), slot("LWF", 16, 19), slot("CF", 50, 13), slot("RWF", 84, 19)],
  "4-1-4-1": [GK_SLOT, ...BACK4, slot("DMF", 50, 59), slot("LMF", 12, 41), slot("CMF", 36, 43), slot("CMF", 64, 43), slot("RMF", 88, 41), slot("CF", 50, 13)],
  "4-1-2-3": [GK_SLOT, ...BACK4, slot("DMF", 50, 59), slot("CMF", 32, 46), slot("CMF", 68, 46), slot("LWF", 16, 20), slot("CF", 50, 14), slot("RWF", 84, 20)],
  "3-4-3":   [GK_SLOT, ...BACK3, slot("LMF", 12, 48), slot("CMF", 37, 52), slot("CMF", 63, 52), slot("RMF", 88, 48), slot("LWF", 18, 20), slot("CF", 50, 14), slot("RWF", 82, 20)],
  "3-2-4-1": [GK_SLOT, ...BACK3, slot("DMF", 36, 58), slot("DMF", 64, 58), slot("LMF", 10, 38), slot("AMF", 36, 34), slot("AMF", 64, 34), slot("RMF", 90, 38), slot("CF", 50, 13)],
  "3-2-3-2": [GK_SLOT, ...BACK3, slot("DMF", 36, 58), slot("DMF", 64, 58), slot("LMF", 12, 40), slot("AMF", 50, 36), slot("RMF", 88, 40), slot("CF", 35, 14), slot("CF", 65, 14)],
  "3-1-4-2": [GK_SLOT, ...BACK3, slot("DMF", 50, 61), slot("LMF", 10, 44), slot("CMF", 36, 45), slot("CMF", 64, 45), slot("RMF", 90, 44), slot("CF", 35, 14), slot("CF", 65, 14)],
  "5-3-2":   [GK_SLOT, ...BACK5, slot("CMF", 25, 50), slot("DMF", 50, 55), slot("CMF", 75, 50), slot("CF", 35, 15), slot("CF", 65, 15)],
  "5-2-2-1": [GK_SLOT, ...BACK5, slot("CMF", 36, 54), slot("CMF", 64, 54), slot("SS", 30, 31), slot("SS", 70, 31), slot("CF", 50, 13)],
  "5-2-1-2": [GK_SLOT, ...BACK5, slot("CMF", 36, 54), slot("CMF", 64, 54), slot("AMF", 50, 36), slot("CF", 35, 14), slot("CF", 65, 14)],
};
const FORMATION_KEYS = Object.keys(FORMATIONS);

// นักเตะตำแหน่ง a ยืนช่องตำแหน่ง b เหมาะแค่ไหน: 10 ตรงตำแหน่ง · 7/5 สายเดียวกัน · 3/2 สายติดกัน · 1 คนละสาย · 0 สลับกับ GK
const LINE_ORDER = { DF: 0, MF: 1, FW: 2 };
function posFit(a, b) {
  if (a === b) return 10;
  const ga = posGroup(a), gb = posGroup(b);
  if (ga === "GK" || gb === "GK") return 0;
  const sameSide = (POS_SIDE[a] ?? 1) === (POS_SIDE[b] ?? 1);
  if (ga === gb) return sameSide ? 7 : 5;
  return Math.abs(LINE_ORDER[ga] - LINE_ORDER[gb]) === 1 ? (sameSide ? 3 : 2) : 1;
}
const offPosition = (playerPos, slotPos) => posFit(playerPos, slotPos) <= 2;   // ขึ้นสีแดงว่า "เล่นนอกตำแหน่ง"

// จัดตัวจริงลงช่องของแผน: เก็บคนเดิมไว้ช่องเดิม (keep) แล้วเติมช่องว่างด้วยคู่ "คน–ช่อง" ที่เหมาะที่สุดทีละคู่
function fixLineup(formation, starters, keep) {
  const slots = FORMATIONS[formation], ids = new Set(starters.map(p => p.id)), used = new Set();
  const lineup = slots.map((_, i) => {
    const id = keep && keep[i];
    if (id && ids.has(id) && !used.has(id)) { used.add(id); return id; }
    return null;
  });
  const pool = starters.filter(p => !used.has(p.id));
  while (pool.length && lineup.includes(null)) {
    let best = null;
    lineup.forEach((v, i) => {
      if (v !== null) return;
      pool.forEach(p => { const s = posFit(p.pos, slots[i].pos); if (!best || s > best.s) best = { i, p, s }; });
    });
    lineup[best.i] = best.p.id;
    pool.splice(pool.indexOf(best.p), 1);
  }
  return lineup;
}
const lineupScore = (formation, starters, lineup) => lineup.reduce((sum, id, i) => {
  const p = starters.find(x => x.id === id);
  return sum + (p ? posFit(p.pos, FORMATIONS[formation][i].pos) : 0);
}, 0);
// ทีมเก่าที่ยังไม่มีแผน → เลือกแผนที่เข้ากับตำแหน่งตัวจริงมากที่สุด
const guessFormation = starters => FORMATION_KEYS.reduce((best, k) => {
  const score = lineupScore(k, starters, fixLineup(k, starters, []));
  return !best || score > best.score ? { k, score } : best;
}, null).k;

function withFormation(team) {
  const starters = team.players.filter(p => p.starter);
  const formation = FORMATIONS[team.formation] ? team.formation : guessFormation(starters);
  const lineup = fixLineup(formation, starters, formation === team.formation ? team.lineup : []);
  const same = Array.isArray(team.lineup) && team.lineup.length === lineup.length && lineup.every((id, i) => id === team.lineup[i]);
  return formation === team.formation && same ? team : { ...team, formation, lineup };
}

const blankSquad = teamId => DEFAULT_POS.map((pos, i) => ({ id: teamId + "-" + (i + 1), name: "", pos, starter: i < STARTERS }));
// ข้อมูลเก่า/ไฟล์ import ที่ไม่มีนักเตะ หรือจำนวนไม่ครบ → เติมช่องว่างให้ครบ 23 แล้วเติมแผนการเล่นถ้ายังไม่มี
function withSquad(team) {
  const players = Array.isArray(team.players) ? team.players : [];
  const base = players.slice(0, SQUAD_SIZE);
  const fill = base.length === SQUAD_SIZE ? [] : blankSquad(team.id).filter(b => !base.some(p => p.id === b.id)).slice(0, SQUAD_SIZE - base.length);
  return withFormation(players.length === SQUAD_SIZE ? team : { ...team, players: base.concat(fill) });
}
const namedPlayers = t => (t && t.players ? t.players : []).filter(p => (p.name || "").trim());
const newPlayerId = teamId => teamId + "-" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
// id ตัวเลขที่ไม่ชนกันแม้หลายเครื่องสร้างพร้อมกัน (ข้อมูลออนไลน์ใช้ร่วมกันหลายเครื่อง)
let lastId = 0;
const uniqueId = () => (lastId = Math.max(lastId + 1, Date.now() * 100 + Math.floor(Math.random() * 100)));

// ประเภทการ์ดแบบ eFootball — ลีกนี้ไม่ใช้การ์ด Standard
const CARD_TYPES = [
  { key: "epic",      label: "Epic" },
  { key: "bigtime",   label: "Big Time" },
  { key: "showtime",  label: "Show Time" },
  { key: "highlight", label: "Highlight" },
  { key: "featured",  label: "Featured" },
  { key: "potw",      label: "POTW" },
  { key: "legendary", label: "Legendary" },
];
const cardLabel = k => (CARD_TYPES.find(c => c.key === k) || {}).label || "";
const OVR_MIN = 40, OVR_MAX = 120;
const ovrOk = v => v === "" || v == null || (Number.isInteger(+v) && +v >= OVR_MIN && +v <= OVR_MAX);

// EFHUB ไม่มี API สาธารณะ → เก็บแค่ลิงก์การ์ด (efhub.com/players/<id>) + ปุ่มค้นหาผ่าน Google
const EFHUB_RE = /^https:\/\/(?:www\.)?efhub\.com\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?players\/\d+\/?(?:[?#].*)?$/;
const efhubOk = url => !url || EFHUB_RE.test(url.trim());
// ลิงก์ที่ให้กดได้ต้องเป็นหน้าการ์ด EFHUB จริงเท่านั้น (ข้อมูลออนไลน์ / Import อาจถูกแก้มา เช่น javascript:)
const efhubHref = url => url && EFHUB_RE.test(url.trim()) ? url.trim() : "";
const efhubSearch = name => "https://www.google.com/search?q=" + encodeURIComponent("site:efhub.com/players " + name);

/* ══════════════════════════ SEED DATA (ตัวอย่างตอนเปิดครั้งแรก) ══════════════════════════ */
// "ชื่อ:ตำแหน่ง" — 11 คนแรก (ก่อน |) คือตัวจริง ที่เหลือ 12 คนคือสำรอง
const SEED_SQUADS = {
  1: "Donnarumma:GK,Nunes:RB,Dias:CB,Gvardiol:CB,O'Reilly:LB,Rodri:DMF,Reijnders:CMF,Silva:CMF,Doku:LWF,Haaland:CF,Foden:RWF|Trafford:GK,Stones:CB,Aké:CB,Aït-Nouri:LB,Lewis:RB,González:DMF,Kovačić:CMF,Cherki:AMF,Savinho:RWF,Bobb:LWF,Marmoush:CF,Khusanov:CB",
  2: "Courtois:GK,Carvajal:RB,Militão:CB,Rüdiger:CB,Carreras:LB,Tchouaméni:DMF,Valverde:CMF,Bellingham:AMF,Vinícius:LWF,Mbappé:CF,Rodrygo:RWF|Lunin:GK,Huijsen:CB,Asencio:CB,Mendy:LB,Alexander-Arnold:RB,Camavinga:DMF,Ceballos:CMF,Güler:AMF,Brahim:RWF,Mastantuono:RWF,Endrick:CF,Gonzalo:CF",
  3: "Sommer:GK,Dimarco:LB,Bastoni:CB,Acerbi:CB,Bisseck:CB,Dumfries:RB,Çalhanoğlu:DMF,Barella:CMF,Mkhitaryan:CMF,Lautaro:CF,Thuram:CF|Martínez:GK,De Vrij:CB,Akanji:CB,Carlos Augusto:LB,Darmian:RB,Frattesi:CMF,Zieliński:CMF,Sučić:CMF,Luis Henrique:RMF,Diouf:LMF,Bonny:CF,Esposito:CF",
  4: "Alisson:GK,Frimpong:RB,Konaté:CB,Van Dijk:CB,Kerkez:LB,Gravenberch:DMF,Szoboszlai:CMF,Wirtz:AMF,Gakpo:LWF,Isak:CF,Salah:RWF|Mamardashvili:GK,Gomez:CB,Leoni:CB,Robertson:LB,Bradley:RB,Endo:DMF,Mac Allister:CMF,Jones:CMF,Nyoni:CMF,Chiesa:RWF,Ngumoha:LWF,Ekitiké:CF",
  5: "García:GK,Koundé:RB,Cubarsí:CB,Araujo:CB,Baldé:LB,De Jong:DMF,Pedri:CMF,Olmo:AMF,Raphinha:LWF,Lewandowski:CF,Yamal:RWF|Szczęsny:GK,Christensen:CB,E. García:CB,Martín:LB,Fort:RB,Casadó:DMF,Bernal:DMF,Gavi:CMF,Fermín:AMF,Rashford:LWF,Bardghji:RWF,Torres:CF",
  6: "Neuer:GK,Laimer:RB,Upamecano:CB,Tah:CB,Davies:LB,Kimmich:DMF,Pavlović:DMF,Musiala:AMF,Díaz:LWF,Kane:CF,Olise:RWF|Urbig:GK,Ulreich:GK,Kim:CB,Ito:CB,Stanišić:RB,Guerreiro:LB,Boey:RB,Goretzka:CMF,Bischof:CMF,Karl:AMF,Gnabry:RWF,Jackson:CF",
};
// ประเภทการ์ดในข้อมูลตัวอย่าง: วนให้ดูหลากหลาย (ค่าพลัง OVR เว้นว่าง ให้ผู้จัดการทีมกรอกเอง)
const SEED_CARDS = ["showtime", "bigtime", "epic", "highlight", "potw", "featured"];
const SEED_FORMATION = { 1: "4-1-2-3", 2: "4-2-1-3", 3: "5-3-2", 4: "4-2-3-1", 5: "4-3-3", 6: "4-2-3-1" };
const seedSquad = id => SEED_SQUADS[id].split("|").flatMap(part => part.split(",")).map((item, i) => {
  const [name, pos] = item.split(":");
  return { id: id + "-" + (i + 1), name, pos, starter: i < STARTERS, card: SEED_CARDS[(i + id) % SEED_CARDS.length], ovr: "", efhub: "" };
});

const SEED_TEAMS = [
  { id:1, name:"NONT FC",      owner:"นนท์",  club:"Manchester City", kit:"#6CC0E5" },
  { id:2, name:"BEAM UNITED",  owner:"บีม",   club:"Real Madrid",     kit:"#E7E7EA" },
  { id:3, name:"GOLF SQUAD",   owner:"กอล์ฟ", club:"Inter Milan",     kit:"#3B6FD4" },
  { id:4, name:"PAT ATHLETIC", owner:"แพท",   club:"Liverpool",       kit:"#D94A4A" },
  { id:5, name:"TON CITY",     owner:"ต้น",   club:"Barcelona",       kit:"#9B2B57" },
  { id:6, name:"MHOO FC",      owner:"หมู",   club:"Bayern Munich",   kit:"#C8452F" },
].map(t => withSquad({ ...t, players: seedSquad(t.id), formation: SEED_FORMATION[t.id] }));

// ผลงานตัวอย่าง: ตัวจริงลงเล่นครบ · MOTM = คนที่ยิง/แอสซิสต์มากสุด (ทีมที่ชนะได้เปรียบ)
function seedPerf(m) {
  if (m.status !== "done") return m;
  const perf = {};
  let best = null;
  [m.home, m.away].forEach(tid => {
    const team = SEED_TEAMS.find(t => t.id === tid);
    const res = Math.sign(tid === m.home ? m.hs - m.as : m.as - m.hs);
    perf[tid] = {};
    team.players.filter(p => p.starter).forEach(p => {
      const g = m.events.filter(e => e.type === "goal" && e.teamId === tid && e.player === p.name).length;
      const a = m.events.filter(e => e.type === "goal" && e.teamId === tid && e.assist === p.name).length;
      const score = g * 2 + a + (res > 0 ? 0.5 : 0);
      perf[tid][p.id] = { n: p.name };
      if (!best || score > best.score) best = { teamId: tid, playerId: p.id, n: p.name, score };
    });
  });
  const formOf = tid => SEED_TEAMS.find(t => t.id === tid).formation;
  return { ...m, perf, motm: { teamId: best.teamId, playerId: best.playerId, n: best.n },
           formations: { [m.home]: formOf(m.home), [m.away]: formOf(m.away) } };
}

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
    { type:"goal", teamId:6, player:"Kane",    assist:"Olise" },
    { type:"goal", teamId:6, player:"Musiala", assist:"Kane" } ]},
  { id:4, round:2, home:2, away:3, hs:2, as:0, status:"done", date:"2026-08-27", events:[
    { type:"goal", teamId:2, player:"Mbappé",     assist:"Bellingham" },
    { type:"goal", teamId:2, player:"Bellingham", assist:"" } ]},
  { id:5, round:2, home:4, away:5, hs:null, as:null, status:"scheduled", date:"2026-09-03", events:[] },
  { id:6, round:2, home:6, away:1, hs:null, as:null, status:"scheduled", date:"2026-09-03", events:[] },
].map(seedPerf);

/* ══════════════════════════ HELPERS: วันเวลา / motion / สี ══════════════════════════ */
// เครื่องที่ตั้ง "ลดการเคลื่อนไหว" → ไม่เอียงการ์ด ไม่นับเลข
const REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

const pad2 = n => String(n).padStart(2, "0");
const isoDate = d => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
// match.time ไม่บังคับ — ข้อมูลเก่าที่ไม่มีจะถือว่าเตะ 20:00
const timeOf  = m => m.time || "20:00";
const kickoff = m => new Date((m.date || "2100-01-01") + "T" + timeOf(m));
const fmtDay  = m => kickoff(m).toLocaleDateString("th-TH", { weekday:"short", day:"numeric", month:"short" });
const byPlayOrder = (a, b) => a.round - b.round || (a.date || "").localeCompare(b.date || "") || a.id - b.id;
const hexOk = hex => /^#[0-9a-f]{6}$/i.test(hex || "");
// สีชุดแบบโปร่งใส (#rrggbb + alpha) — สีที่ไม่ใช่รูปแบบนี้ได้โปร่งใสไปเลย กันพื้นหลังพัง
const tint = (hex, a) => hexOk(hex) ? hex + a : "transparent";
const isLight = hex => {
  if (!hexOk(hex)) return false;
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 165;
};
// อักษรย่อทีม: ตัวแรกของ 2 คำแรก (ข้ามสระนำหน้าภาษาไทย เช่น เ แ โ)
const LETTER = /[A-Za-z0-9ก-ฮ]/;
const initials = name => {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  const first = w => [...w].find(ch => LETTER.test(ch)) || "";
  const s = words.length > 1 ? first(words[0]) + first(words[1]) : [...words[0]].filter(ch => LETTER.test(ch)).slice(0, 2).join("");
  return s.toUpperCase() || "?";
};

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

/* ผลงานนักเตะรายคน จากทุกนัดที่จบแล้ว
   - match.perf[teamId][playerId] = { n: ชื่อ }  → ลงเล่น (ข้อมูลเก่าอาจมี r = คะแนน แต่ไม่ใช้แล้ว)
   - match.events (ประตู/แอสซิสต์/ใบ) ผูกด้วย playerId · ข้อมูลเก่าที่มีแค่ชื่อ → จับคู่ชื่อในทีม
   - match.motm = { teamId, playerId, n }
   นักเตะที่ถูกเปลี่ยนตัวออกจากทีมแล้วยังเห็นผลงานเดิมได้ (ขึ้นว่า "อดีต") */
function computePlayerStats(teams, matches) {
  const teamById = {};
  teams.forEach(t => teamById[t.id] = t);
  const idByName = (tid, name) => {
    const t = teamById[tid], k = (name || "").trim().toLowerCase();
    const p = t && k ? (t.players || []).find(x => (x.name || "").trim().toLowerCase() === k) : null;
    return p ? p.id : "";
  };
  const stats = {};
  const get = (tid, pid, name) => {
    const key = tid + "|" + (pid || "n:" + (name || "").trim().toLowerCase());
    if (!stats[key]) stats[key] = { key, teamId: tid, playerId: pid || "", name: name || "", apps: 0, G: 0, A: 0, Y: 0, R: 0, motm: 0 };
    if (name && !stats[key].name) stats[key].name = name;
    return stats[key];
  };

  matches.filter(m => m.status === "done").forEach(m => {
    const seen = new Set();
    const appear = s => { if (!seen.has(s.key)) { seen.add(s.key); s.apps++; } };
    Object.entries(m.perf || {}).forEach(([tid, ps]) => Object.entries(ps || {}).forEach(([pid, v]) => {
      appear(get(+tid, pid, v && v.n));
    }));
    (m.events || []).forEach(e => {
      if (!e.player && !e.playerId) return;
      const s = get(e.teamId, e.playerId || idByName(e.teamId, e.player), e.player);
      appear(s);
      if (e.type === "goal") {
        s.G++;
        if (e.assist || e.assistId) { const a = get(e.teamId, e.assistId || idByName(e.teamId, e.assist), e.assist); appear(a); a.A++; }
      }
      if (e.type === "yellow") s.Y++;
      if (e.type === "red")    s.R++;
    });
    if (m.motm && (m.motm.playerId || m.motm.n)) get(m.motm.teamId, m.motm.playerId, m.motm.n).motm++;
  });

  return Object.values(stats).map(s => {
    const t = teamById[s.teamId];
    const p = t && s.playerId ? (t.players || []).find(x => x.id === s.playerId) : null;
    const live = p && (p.name || "").trim();
    return { ...s, team: t, name: live || s.name || "—", pos: p ? p.pos : "", card: p ? p.card || "" : "", ovr: p ? p.ovr : "", efhub: p ? p.efhub || "" : "",
             former: !!s.playerId && !live };
  });
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

/* ══════════════════════════ AUTH (โหมดเครื่องเดียว: บัญชีเก็บในเบราว์เซอร์เครื่องนี้) ══════════════════════════
   โหมดออนไลน์ใช้ Firebase Authentication แทน (ดู CLOUD) · ส่วนนี้กันคนที่ยืมเครื่องไปแก้ผลได้ แต่ไม่ใช่ความปลอดภัยระดับเซิร์ฟเวอร์
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
// manager = ผู้จัดการทีม (User): แก้ชื่อทีม สีทีม และรายชื่อนักเตะของทีมตัวเอง
const ROLE_LABEL = { admin: "แอดมิน", referee: "กรรมการ", manager: "ผู้จัดการทีม" };

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
    id: uniqueId(),
    name: f.name.trim(), username: normUser(f.username), role: f.role,
    teamId: f.role === "manager" && f.teamId ? +f.teamId : null, created: Date.now(),
  }, f.password);
}
// ทีมหนึ่งมีผู้จัดการได้คนเดียว → ผูกทีมให้คนนี้ แล้วปลดออกจากคนอื่น
const assignTeam = (users, userId, teamId) => users.map(u =>
  u.id === userId ? { ...u, teamId } : (teamId && u.teamId === teamId ? { ...u, teamId: null } : u));

/* ══════════════════════════ CLOUD (Firebase: ข้อมูลกลางของทุกเครื่อง) ══════════════════════════
   ใส่ค่า firebase ใน config.js → ทั้งลีกเก็บบน Cloud Firestore · ล็อกอินด้วย Firebase Authentication
   - ทุกคนดูข้อมูลได้โดยไม่ต้องล็อกอิน · การเขียนทุกครั้งถูกตรวจสิทธิ์ที่เซิร์ฟเวอร์ (ไฟล์ firestore.rules)
   - Firebase ล็อกอินด้วยอีเมล → แปลงชื่อผู้ใช้เป็นอีเมลภายใน (ชื่อ@LOGIN_DOMAIN) ไม่มีการส่งอีเมลจริง
   - ไม่ใส่ค่า firebase → ใช้แบบเครื่องเดียว (เก็บในเบราว์เซอร์) เหมือนเดิม                              */
const cfg = () => window.FL_CONFIG || {};
const cloudConfig = () => { const f = cfg().firebase; return f && f.apiKey && f.projectId && f.appId ? f : null; };
const CLOUD = !!cloudConfig();
const FIREBASE_SDK = "https://www.gstatic.com/firebasejs/12.19.0/";
const LOGIN_DOMAIN = "friends-league.example.com";   // example.com สงวนไว้สำหรับทดสอบ → ไม่มีกล่องอีเมลจริง

function loadScript(src) {
  return new Promise((res, rej) => {
    const old = document.querySelector('script[src="' + src + '"]');
    if (old) return old.dataset.ready ? res() : old.addEventListener("load", () => res());
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = () => { s.dataset.ready = "1"; res(); };
    s.onerror = () => rej(Object.assign(new Error("โหลดสคริปต์ไม่ได้"), { net: true }));
    document.head.appendChild(s);
  });
}

const Cloud = {
  app: null, auth: null, db: null, booting: null,
  // โหลด Firebase (ครั้งเดียว) → เปิดแคชในเครื่อง: เปิดแอปเร็วขึ้น และแก้ไขตอนเน็ตหลุดได้ (ส่งขึ้นเมื่อกลับมาออนไลน์)
  init() {
    if (!this.booting) this.booting = (async () => {
      if (!window.firebase) {
        await loadScript(FIREBASE_SDK + "firebase-app-compat.js");
        await Promise.all(["auth", "firestore"].map(n => loadScript(FIREBASE_SDK + "firebase-" + n + "-compat.js")));
      }
      this.app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cloudConfig());
      this.auth = this.app.auth();
      this.db = this.app.firestore();
      try { await this.db.enablePersistence({ synchronizeTabs: true }); } catch (e) {}
      return this;
    })();
    return this.booting;
  },
  email: username => normUser(username) + "@" + LOGIN_DOMAIN,
  // แอดมินสร้างบัญชีให้เพื่อนผ่าน Firebase app ตัวที่สอง → แอดมินไม่หลุดจากระบบ
  // writeDoc(uid) ไม่ผ่าน → ลบบัญชีที่เพิ่งสร้างทิ้ง (ไม่ทิ้งบัญชีค้าง)
  async addAccount(username, password, writeDoc) {
    const second = firebase.initializeApp(cloudConfig(), "add-" + Date.now());
    try {
      await second.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const cred = await second.auth().createUserWithEmailAndPassword(this.email(username), password);
      try { await writeDoc(cred.user.uid); }
      catch (e) { await cred.user.delete().catch(() => {}); throw e; }
      return cred.user.uid;
    } finally { second.delete().catch(() => {}); }
  },
};

const CLOUD_ERRORS = {
  "auth/invalid-credential": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  "auth/invalid-login-credentials": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  "auth/wrong-password": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  "auth/user-not-found": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  "auth/invalid-email": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  "auth/too-many-requests": "ลองผิดหลายครั้งเกินไป รอสักครู่แล้วลองใหม่",
  "auth/email-already-in-use": "ชื่อผู้ใช้นี้มีคนใช้แล้ว",
  "auth/weak-password": "รหัสผ่านต้องมีอย่างน้อย 6 ตัว",
  "auth/requires-recent-login": "ล็อกอินใหม่อีกครั้งก่อนเปลี่ยนรหัสผ่าน",
  "auth/network-request-failed": "เชื่อมต่อไม่ได้ ตรวจอินเทอร์เน็ต",
  "auth/operation-not-allowed": "ยังไม่ได้เปิดล็อกอินแบบ Email/Password ใน Firebase (ดู README)",
  "auth/unauthorized-domain": "เว็บนี้ยังไม่อยู่ใน Authorized domains ของ Firebase (ดู README)",
  "auth/admin-restricted-operation": "Firebase ปิดการสร้างบัญชีไว้ — เปิด “Enable create (sign-up)” ใน Authentication › Settings",
  "permission-denied": "ไม่มีสิทธิ์ทำรายการนี้",
  "unavailable": "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจอินเทอร์เน็ต",
};
const cloudError = e => (e && CLOUD_ERRORS[e.code]) ||
  (e && e.net ? "โหลดระบบออนไลน์ไม่ได้ ตรวจอินเทอร์เน็ตแล้วรีเฟรช" : "เกิดข้อผิดพลาด" + (e && (e.code || e.message) ? " (" + (e.code || e.message) + ")" : ""));

// เทียบข้อมูลแบบไม่สนลำดับ key (Firestore คืน object ที่เรียง key ไม่เหมือนในแอป)
const stable = v => JSON.stringify(v, (k, x) => x && typeof x === "object" && !Array.isArray(x)
  ? Object.keys(x).sort().reduce((o, key) => { o[key] = x[key]; return o; }, {}) : x);
// Firestore ไม่รับ undefined → แปลงผ่าน JSON ก่อนบันทึก
const plain = v => JSON.parse(JSON.stringify(v));

/* ══════════════════════════ CARD IMAGES (รูปการ์ดนักเตะ) ══════════════════════════
   localStorage จุแค่ ~5MB → รูปเก็บใน IndexedDB ของเบราว์เซอร์แทน
   นักเตะเก็บแค่ player.img = id ของรูป (มาจาก hash ของเนื้อรูป → รูปเดียวกันได้ id เดียวกัน)
   ย่อเหลือกว้าง 200px แบบ JPEG (~20–30KB ต่อใบ) · ออนไลน์เก็บที่ images/{id} · Export JSON แนบรูปไปด้วย */
const CARD_W = 200, CARD_H_MAX = 300;
const IMG_DATA_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const IMG_ID_RE = /^c[0-9a-f]{24}$/;
const ImgContext = React.createContext({ images: {}, putImage: async () => "" });

const ImgDB = {
  db: null,
  open() {
    if (!this.db) this.db = new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error("no-idb"));
      setTimeout(() => rej(new Error("idb-timeout")), 5000);   // บางเบราว์เซอร์เปิดค้างไม่ตอบ → ทำงานต่อแบบไม่มี IndexedDB
      const r = indexedDB.open("friends-league", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("cards");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error || new Error("idb"));
    });
    return this.db;
  },
  async run(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const t = db.transaction("cards", mode), out = fn(t.objectStore("cards"));
      t.oncomplete = () => res(out);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error || new Error("idb-abort"));
    });
  },
  async all() {
    const r = await this.run("readonly", s => ({ keys: s.getAllKeys(), vals: s.getAll() }));
    const m = {};
    r.keys.result.forEach((k, i) => { m[k] = r.vals.result[i]; });
    return m;
  },
  put(id, data) { return this.run("readwrite", s => { s.put(data, id); }); },
  del(ids) { return this.run("readwrite", s => { ids.forEach(id => s.delete(id)); }); },
};

// ย่อรูปที่อัปโหลด → dataURL (JPEG ไม่มีความโปร่งใส → เติมพื้นสีน้ำเงินเข้มก่อน)
async function makeCardImage(file) {
  if (!file || !/^image\//.test(file.type)) throw new Error("ไฟล์นี้ไม่ใช่รูปภาพ");
  if (file.size > 20 * 1024 * 1024) throw new Error("รูปใหญ่เกิน 20MB");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("เปิดรูปนี้ไม่ได้"));
      i.src = url;
    });
    const scale = Math.min(1, CARD_W / img.naturalWidth, CARD_H_MAX / img.naturalHeight);
    const w = Math.max(1, Math.round(img.naturalWidth * scale)), h = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d");
    g.fillStyle = "#0B1C4A"; g.fillRect(0, 0, w, h);
    g.drawImage(img, 0, 0, w, h);
    return c.toDataURL("image/jpeg", 0.75);
  } finally { URL.revokeObjectURL(url); }
}
const imageId = data => "c" + sha256(data).slice(0, 24);

/* ══════════════════════════ SHARE IMAGE (วาดเองด้วย canvas) ══════════════════════════ */
const SHARE = { page:"#060E2A", top:"#112A6B", bottom:"#0B1C4A", stroke:"rgba(150,180,255,0.22)", brand:"#FFDE2E", ink:"#FFFFFF",
                muted:"#96A8D6", faint:"#54689C", divider:"rgba(150,180,255,0.12)", num:"#D6E1FA", win:"#34E3A0", loss:"#FF6B85",
                medal:["#FFD54A", "#D3DCEB", "#F0A36B"], pts:["#FFF07A", "#FFC400"] };
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

async function renderStandingsPng(standings, subtitle) {
  const C = SHARE;
  const TH = '"Noto Sans Thai", sans-serif', KN = 'Kanit, "Noto Sans Thai", sans-serif';
  // โหลดฟอนต์ไทย+ละตินให้ครบก่อนวาด ไม่งั้น canvas จะใช้ฟอนต์สำรอง
  try {
    await Promise.all(["400 30px " + TH, "600 30px " + TH, "italic 700 30px " + KN, "600 30px " + KN]
      .map(f => document.fonts.load(f, "ตารางคะแนน ABC 123")));
  } catch (e) {}

  const W = 1080, X = 72, ROW = 96, TOP = 300, H = TOP + standings.length * ROW + 150;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");
  const grad = ([a, b], y0, y1) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };

  g.fillStyle = C.page; g.fillRect(0, 0, W, H);
  rrect(g, 36, 36, W - 72, H - 72, 24);
  g.fillStyle = grad([C.top, C.bottom], 36, H - 36); g.fill();
  g.strokeStyle = C.stroke; g.lineWidth = 2; g.stroke();

  // แถบเหลืองเอียงหน้าหัวข้อ
  g.save(); g.translate(X + 6, 150); g.transform(1, 0, -0.25, 1, 0, 0);
  g.fillStyle = grad(C.pts, 0, 60); g.fillRect(0, 0, 10, 60); g.restore();

  g.fillStyle = C.brand; g.font = "600 22px " + TH;
  if ("letterSpacing" in g) g.letterSpacing = "5px";
  g.fillText("FRIENDS LEAGUE · EFOOTBALL 2027 MOBILE", X, 120);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  g.fillStyle = C.ink; g.font = "italic 700 64px " + KN; g.fillText("ตารางคะแนน", X + 32, 200);
  g.fillStyle = C.muted; g.font = "400 26px " + TH; g.fillText(subtitle, X + 32, 245);

  const cols = [600, 668, 736, 804, 880], PTS_X = W - X - 32;
  g.textAlign = "center"; g.font = "600 20px " + TH; g.fillStyle = C.muted;
  ["P", "W", "D", "L", "GD"].forEach((l, k) => g.fillText(l, cols[k], TOP - 18));
  g.fillStyle = C.brand; g.fillText("PTS", PTS_X, TOP - 18);

  standings.forEach((r, i) => {
    const y = TOP + i * ROW, mid = y + ROW / 2;
    g.fillStyle = C.divider; g.fillRect(X, y, W - 2 * X, 1);

    g.textAlign = "center"; g.font = "italic 700 38px " + KN;
    g.fillStyle = r.P > 0 && i < 3 ? C.medal[i] : C.faint;
    g.fillText(String(i + 1), X + 22, mid + 13);

    rrect(g, X + 62, mid - 26, 8, 52, 4); g.fillStyle = hexOk(r.team.kit) ? r.team.kit : C.faint; g.fill();

    g.textAlign = "left";
    g.fillStyle = C.ink; g.font = "600 32px " + TH;
    g.fillText(clip(g, r.team.name, 400), X + 92, mid - 2);
    g.fillStyle = C.muted; g.font = "400 22px " + TH;
    g.fillText(clip(g, r.team.club + " · " + r.team.owner, 400), X + 92, mid + 30);

    g.textAlign = "center"; g.font = "400 30px " + TH; g.fillStyle = C.num;
    [r.P, r.W, r.D, r.L].forEach((v, k) => g.fillText(String(v), cols[k], mid + 11));
    g.fillStyle = r.GD > 0 ? C.win : r.GD < 0 ? C.loss : C.muted;
    g.fillText((r.GD > 0 ? "+" : "") + r.GD, cols[4], mid + 11);
    g.font = "italic 700 44px " + KN; g.fillStyle = grad(C.pts, mid - 22, mid + 14);
    g.fillText(String(r.PTS), PTS_X, mid + 15);
  });

  g.textAlign = "center"; g.fillStyle = C.faint; g.font = "400 22px " + TH;
  g.fillText("Friends League · บันทึกผลด้วยมือ", W / 2, H - 82);

  return new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("toBlob")), "image/png"));
}

/* ══════════════════════════ UI ATOMS ══════════════════════════ */
// ป้ายภาษาไทย: ห้ามใส่ uppercase/tracking กว้าง ไม่งั้นสระกับวรรณยุกต์แยกออกจากตัวอักษร
const LABEL = "text-xs text-muted";
const INPUT = "w-full rounded-lg bg-sunken px-3 py-2.5 text-sm text-ink ring-1 ring-line/20 outline-none transition focus:ring-2 focus:ring-accent/70 placeholder:text-faint disabled:opacity-50";
// ช่องเลือกแบบกว้างเท่าเนื้อหา (w-full ใน INPUT ชนะ w-auto เสมอ เลยต้องแยก)
const INPUT_FIT = INPUT.replace("w-full", "w-auto");

// ตัวเลขเด่น (แต้ม/สถิติ) = ไล่สีเหลือง
const Hl = ({ children, className = "" }) => <span className={"fl-hl " + className}>{children}</span>;

const Card = ({ children, className = "", ...p }) => (
  <div {...p} className={"fl-surface rounded-xl ring-1 ring-line/[0.16] " + className}>{children}</div>
);

// ปุ่มเฉียงแบบเมนูเกม (พื้นหลังอยู่ใน ::before ดู style.css)
const Btn = ({ children, variant = "ghost", className = "", type = "button", ...p }) => (
  <button type={type} {...p} className={"ef-btn ef-btn-" + variant + " inline-flex items-center gap-2 px-5 py-2 text-sm transition-transform active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 " + className}>
    {children}
  </button>
);

const FormPill = ({ r }) => {
  const c = {
    W: "bg-win/15 text-win ring-win/30",
    D: "bg-line/10 text-muted ring-line/20",
    L: "bg-loss/15 text-loss ring-loss/30",
  }[r];
  return <span className={"grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold ring-1 " + c}>{r}</span>;
};

const PosBadge = ({ pos }) => pos ? <span className={"ef-pos ef-pos-" + posGroup(pos)}>{pos}</span> : null;
const CardBadge = ({ card }) => card ? <span className={"ef-card ef-card-" + card}>{cardLabel(card)}</span> : null;
// ลิงก์ไปหน้าการ์ดใน EFHUB (เปิดแท็บใหม่)
const EfhubLink = ({ url, name }) => efhubHref(url) ? (
  <a href={efhubHref(url)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
    aria-label={"ดูการ์ด " + name + " ใน EFHUB"} title="ดูการ์ดใน EFHUB" className="inline-grid shrink-0 place-items-center text-link hover:text-accent">
    <Ic n="external" size={12} />
  </a>
) : null;

const SectionTitle = ({ icon, kicker, title, action }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="ef-halo mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
        <Ic n={icon} size={13} /> {kicker}
      </div>
      <h2 className="ef-title ef-halo font-display text-3xl font-bold italic text-ink">{title}</h2>
    </div>
    {action}
  </div>
);

const SubHead = ({ children, link, onLink }) => (
  <div className="mb-3 flex items-center justify-between">
    <span className="ef-halo font-display text-base font-semibold italic text-ink">{children}</span>
    {link && <button onClick={onLink} className="rounded-full bg-page/80 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/30 transition hover:bg-page hover:ring-accent/60">{link} →</button>}
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
    className={"rounded-lg px-3 py-2 text-sm ring-1 " + (kind === "error" ? "bg-loss/10 text-loss ring-loss/30" : kind === "warn" ? "bg-accent/10 text-accent ring-accent/25" : "bg-win/10 text-win ring-win/30")}>
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

const AVATAR_COLORS = ["#2563EB", "#0369A1", "#047857", "#B45309", "#B91C1C", "#BE185D", "#6D28D9", "#0F766E"];
const Avatar = ({ u, size = "md" }) => {
  const k = [...(u.username || "")].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  return (
    <span className={"grid shrink-0 place-items-center rounded-full font-display font-semibold text-white ring-2 ring-white/15 " + (size === "lg" ? "h-12 w-12 text-lg" : "h-8 w-8 text-sm")}
      style={{ background: AVATAR_COLORS[k % AVATAR_COLORS.length] }} aria-hidden="true">
      {[...(u.name || "?").trim()][0] || "?"}
    </span>
  );
};

const RoleChip = ({ role }) => (
  <span className={"inline-block rounded px-2 py-0.5 text-[11px] font-medium ring-1 " +
    (role === "admin" ? "bg-accent/15 text-accent ring-accent/30" : role === "manager" ? "bg-win/15 text-win ring-win/30" : "bg-link/15 text-link ring-link/30")}>
    {ROLE_LABEL[role] || role}
  </span>
);

const Segmented = ({ value, onChange, items }) => (
  <div className="mb-5 flex flex-wrap gap-1 rounded-lg bg-sunken p-1 ring-1 ring-line/15">
    {items.map(([k, label]) => (
      <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
        className={"ef-btn ef-tab flex-1 whitespace-nowrap px-3 py-1.5 text-sm " + (value === k ? "ef-tab-on" : "")}>
        {label}
      </button>
    ))}
  </div>
);

// หน้าต่างที่เปิดซ้อนกัน: Esc ปิดแค่ใบบนสุด
const MODAL_STACK = [];
const Modal = ({ children, onClose, className = "max-w-md" }) => {
  const id = useRef({}).current;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    MODAL_STACK.push(id);
    const onKey = e => { if (e.key === "Escape" && MODAL_STACK[MODAL_STACK.length - 1] === id) closeRef.current(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); MODAL_STACK.splice(MODAL_STACK.indexOf(id), 1); };
  }, []);
  return (
    // portal ไปที่ body: หน้าต่างซ้อนกันได้ (เช่น ดูการ์ดบนโปรไฟล์ทีม) ไม่โดนกรอบ/transform ของหน้าต่างแม่บัง
    ReactDOM.createPortal(
      <div className="fl-scrim fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
        <Card className={"fl-enter max-h-[90vh] w-full overflow-y-auto rounded-2xl p-6 " + className}>{children}</Card>
      </div>,
      document.body)
  );
};

const CloseBtn = ({ onClose }) => (
  <button type="button" onClick={onClose} aria-label="ปิด" className="shrink-0 rounded-lg p-2 text-muted hover:bg-line/10 hover:text-ink">
    <Ic n="x" size={18} />
  </button>
);

const ModalHead = ({ kicker, title, onClose }) => (
  <div className="mb-6 flex items-start justify-between gap-3">
    <div className="min-w-0">
      {kicker && <div className={LABEL + " truncate"}>{kicker}</div>}
      <h3 className="truncate font-display text-2xl font-bold italic text-ink">{title}</h3>
    </div>
    <CloseBtn onClose={onClose} />
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
  const chip = "rounded px-3 py-1 font-semibold ring-1 tabular-nums ";
  let s = Math.floor((target - now) / 1000);
  if (s <= 0) return <span className={chip + "bg-line/10 text-soft ring-line/20"}>ถึงเวลาแข่งแล้ว · รอกรอกผล</span>;
  const d = Math.floor(s / 86400); s %= 86400;
  return (
    <span className={chip + "bg-accent/15 text-accent ring-accent/30"}>
      อีก {d > 0 ? d + " วัน " : ""}{pad2(Math.floor(s / 3600))}:{pad2(Math.floor(s % 3600 / 60))}:{pad2(s % 60)}
    </span>
  );
}

// ▲ ขึ้น / ▼ ลง / — เท่าเดิม
const Move = ({ d }) => {
  if (!d) return <span className="text-[11px] text-faint">—</span>;
  return d > 0
    ? <span title={"ขึ้น " + d + " อันดับจากสัปดาห์ก่อน"} className="text-[11px] font-semibold text-win">▲{d}</span>
    : <span title={"ลง " + -d + " อันดับจากสัปดาห์ก่อน"} className="text-[11px] font-semibold text-loss">▼{-d}</span>;
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
      <div className="fl-sheen pointer-events-none absolute inset-0 rounded-xl" />
    </div>
  );
}

// ตราทีม: โล่สีทีม + อักษรย่อ (แทนเลขเสื้อ)
function Crest({ team, className = "" }) {
  const gid = useMemo(() => "cg" + Math.random().toString(36).slice(2, 9), []);
  const kit = hexOk(team.kit) ? team.kit : "#2F78FF";
  const ink = isLight(kit) ? "#0B1C4A" : "#FFFFFF";
  const text = initials(team.name);
  return (
    <svg viewBox="0 0 100 116" className={className} role="img" aria-label={"ตราทีม " + team.name}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={kit} />
          <stop offset="1" stopColor={kit} stopOpacity=".72" />
        </linearGradient>
      </defs>
      <path d="M50 3 L94 16 V54 C94 82 74 102 50 113 C26 102 6 82 6 54 V16 Z" fill={"url(#" + gid + ")"} stroke="rgba(255,255,255,.6)" strokeWidth="3" />
      <path d="M50 13 L85 23 V54 C85 76 70 92 50 102 C30 92 15 76 15 54 V23 Z" fill="none" stroke={isLight(kit) ? "rgba(11,28,74,.25)" : "rgba(255,255,255,.28)"} strokeWidth="1.5" />
      <text x="50" y="68" textAnchor="middle" fontFamily="Kanit, 'Noto Sans Thai', sans-serif" fontWeight="700" fontStyle="italic"
        fontSize={text.length > 1 ? 34 : 42} fill={ink}>{text}</text>
    </svg>
  );
}

/* ══════════════════════════ TEAM CARD (การ์ดสะสม) ══════════════════════════ */
// กรอบตามอันดับ: 1 ทอง · 2 เงิน · 3 ทองแดง (ต้องแข่งแล้วอย่างน้อย 1 นัด) · 0 ธรรมดา — สีอยู่ใน style.css
const tierOf = (rank, row) => row && row.P > 0 && rank >= 1 && rank <= 3 ? rank : 0;
const cardBg = kit => ({ background: `linear-gradient(180deg, ${tint(kit, "33")} 0%, transparent 50%), var(--card-inner)` });

const TeamCard = ({ t, rank, row, onOpen, onEdit, canEdit }) => {
  const tier = tierOf(rank, row);
  const r = row || { P:0, GD:0, PTS:0 };
  const filled = namedPlayers(t).length;
  return (
    <Tilt role="button" tabIndex={0} aria-label={"ดูโปรไฟล์ " + t.name}
      onClick={() => onOpen(t)}
      onKeyDown={e => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(t); } }}
      className={"fl-frame fl-tier-" + tier + " group aspect-[5/7] cursor-pointer rounded-xl p-[2px] shadow-[0_16px_36px_-20px_rgb(0_0_0/0.85)] outline-none focus-visible:ring-2 focus-visible:ring-accent sm:aspect-[3/4]"}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[10px] p-3 sm:p-4" style={cardBg(t.kit)}>
        <div className="flex items-start justify-between gap-2">
          <div className="leading-none">
            <div className="fl-tier-label font-display text-2xl font-bold italic sm:text-3xl">{r.P > 0 ? rank : "–"}</div>
            <div className="mt-1 text-[10px] text-muted">อันดับ</div>
          </div>
          <div className="min-w-0 pt-0.5 text-right leading-tight">
            <div className="truncate text-[11px] text-muted">{t.club}</div>
            {t.formation && <div className="font-display text-xs font-bold italic text-accent">{t.formation}</div>}
          </div>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center py-1">
          <Crest team={t} className="h-full max-h-[150px] w-auto max-w-[80%] drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" />
        </div>
        <div className="truncate font-display text-base font-bold italic text-ink sm:text-lg">{t.name}</div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted">โดย {t.owner || "—"}</span>
          {canEdit && (
            <button onClick={e => { e.stopPropagation(); onEdit(t); }} aria-label={"แก้ไขทีม " + t.name}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100">
              <Ic n="pencil" size={11} /> แก้ไข
            </button>
          )}
        </div>
        <div className="mt-2.5 grid grid-cols-4 border-t border-line/[0.16] pt-2.5 text-center text-[11px] tabular-nums">
          <div><div className="text-muted">P</div><div className="font-semibold text-ink">{r.P}</div></div>
          <div><div className="text-muted">GD</div>
            <div className={"font-semibold " + (r.GD > 0 ? "text-win" : r.GD < 0 ? "text-loss" : "text-soft")}>{r.GD > 0 ? "+" : ""}{r.GD}</div></div>
          <div><div className="text-muted">PTS</div><div className="font-bold text-accent">{r.PTS}</div></div>
          <div title="นักเตะที่ใส่ชื่อแล้ว"><div className="text-muted"><Ic n="shirt" size={10} className="inline" /></div>
            <div className={"font-semibold " + (filled === SQUAD_SIZE ? "text-win" : "text-soft")}>{filled}</div></div>
        </div>
      </div>
    </Tilt>
  );
};

/* ══════════════════════════ MATCH ROW ══════════════════════════ */
const MatchRow = ({ m, teams, canEdit, isAdmin, onResult, onSchedule }) => {
  const h = teams.find(t => t.id === m.home), a = teams.find(t => t.id === m.away);
  const done = m.status === "done";
  const side = (t, mine, other, right) => {
    const line = done && t ? scorerLine(m, t.id) : "";
    return (
      <div className={"flex min-w-0 items-center gap-2.5 " + (right ? "flex-row-reverse text-right" : "")}>
        {t && <Crest team={t} className="hidden h-9 w-auto shrink-0 sm:block" />}
        <div className="min-w-0">
          <div className={"truncate font-display font-semibold italic " + (!done || mine >= other ? "text-ink" : "text-muted")}>{t ? t.name : "—"}</div>
          <div className="truncate text-[11px] text-muted">{line || (t && t.club)}</div>
        </div>
      </div>
    );
  };
  return (
    <Card className="fl-lift relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 overflow-hidden p-3.5 sm:gap-4">
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: h ? h.kit : "transparent" }} />
      <span className="absolute inset-y-0 right-0 w-1" style={{ background: a ? a.kit : "transparent" }} />
      {side(h, m.hs, m.as, true)}
      <div className="text-center">
        {done ? (
          <div className="rounded-md bg-sunken px-3 py-1 font-display text-2xl font-bold italic text-ink ring-1 ring-line/20">
            {m.hs}<span className="mx-1.5 text-faint">-</span>{m.as}
          </div>
        ) : (
          <div className="rounded-md bg-sunken px-3 py-1.5 text-xs leading-snug text-soft ring-1 ring-line/20 tabular-nums">
            <div>{fmtDay(m)}</div><div className="text-muted">{timeOf(m)} น.</div>
          </div>
        )}
        {(canEdit || (isAdmin && !done)) && (
          <div className="mt-1.5 flex justify-center gap-3 text-[11px]">
            {canEdit && <button onClick={() => onResult(m)} className="font-semibold text-accent hover:underline">{done ? "แก้ไขผล" : "กรอกผล"}</button>}
            {isAdmin && !done && <button onClick={() => onSchedule(m)} aria-label={"แก้นัด " + (h ? h.name : "") + " พบ " + (a ? a.name : "")} className="text-muted hover:text-ink hover:underline">แก้นัด</button>}
          </div>
        )}
      </div>
      {side(a, m.as, m.hs, false)}
    </Card>
  );
};

/* ══════════════════════════ NEXT MATCH ══════════════════════════ */
function NextMatch({ m, teams, standings, canEdit, onResult, onOpen }) {
  const h = teams.find(t => t.id === m.home), a = teams.find(t => t.id === m.away);
  if (!h || !a) return null;
  const form = id => { const r = standings.find(x => x.team.id === id); return r ? r.form.slice(-3) : []; };
  const side = (t, right) => (
    <button onClick={() => onOpen(t)} className={"group flex min-w-0 items-center gap-3 " + (right ? "flex-row-reverse text-right" : "text-left")}>
      <Crest team={t} className="h-14 w-auto shrink-0 sm:h-20" />
      <div className="min-w-0">
        <div className="truncate font-display text-lg font-bold italic text-ink transition group-hover:text-accent sm:text-3xl">{t.name}</div>
        <div className="mt-0.5 truncate text-xs text-muted">{t.club} · {t.owner}</div>
        {/* ชื่อแผนอยู่ฝั่งที่ติดกับ VS · ฟอร์มเรียงเก่า → ใหม่เสมอ */}
        <div className={"mt-2 flex h-5 items-center gap-1 " + (right ? "justify-end" : "")}>
          {!right && t.formation && <span className="mr-1 font-display text-xs font-bold italic text-accent">{t.formation}</span>}
          {form(t.id).map((f, k) => <FormPill key={k} r={f} />)}
          {right && t.formation && <span className="ml-1 font-display text-xs font-bold italic text-accent">{t.formation}</span>}
        </div>
      </div>
    </button>
  );
  return (
    <Card className="relative mb-8 overflow-hidden">
      {/* สีชุดสองทีมจาง ๆ ซ้าย–ขวา */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(90deg, ${tint(h.kit, "40")}, transparent 40%, transparent 60%, ${tint(a.kit, "40")})` }} />
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: h.kit }} />
      <span className="absolute inset-y-0 right-0 w-1.5" style={{ background: a.kit }} />
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-5 pt-4 text-xs sm:px-6">
        <span className="flex items-center gap-1.5 font-semibold uppercase tracking-[0.18em] text-accent"><Ic n="clock" size={13} /> Next Match</span>
        <span className="text-muted">สัปดาห์ที่ {m.round} · {fmtDay(m)} {timeOf(m)} น.</span>
      </div>
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pb-4 pt-4 sm:gap-8 sm:px-6">
        {side(h, true)}
        <div className="font-display text-2xl font-bold italic text-accent sm:text-3xl">VS</div>
        {side(a, false)}
      </div>
      <div className="relative flex flex-wrap items-center justify-center gap-3 pb-5">
        <Countdown target={kickoff(m).getTime()} />
        {canEdit && <Btn variant="primary" onClick={() => onResult(m)}><Ic n="pencil" size={13} /> กรอกผล</Btn>}
      </div>
    </Card>
  );
}

/* ══════════════════════════ RESULT MODAL ══════════════════════════ */
// เลือกนักเตะจากรายชื่อทีม (ตัวจริงก่อน) หรือพิมพ์ชื่อเองถ้าไม่มีในรายชื่อ
function PlayerPick({ team, id, name, onChange, placeholder, disabled }) {
  const named = namedPlayers(team);
  const byName = name ? named.find(p => p.name.trim().toLowerCase() === name.trim().toLowerCase()) : null;
  const resolved = (id && named.some(p => p.id === id)) ? id : byName ? byName.id : "";
  const [custom, setCustom] = useState(!resolved && !!name);
  if (disabled) return <input disabled placeholder="—" aria-label={placeholder} className={INPUT} />;
  if (!named.length || custom) {
    return (
      <div className="flex gap-1">
        <input value={name || ""} onChange={e => onChange("", e.target.value)} placeholder={placeholder} aria-label={placeholder} className={INPUT + " min-w-0"} />
        {named.length > 0 && (
          <button type="button" onClick={() => { setCustom(false); onChange("", ""); }} title="เลือกจากรายชื่อ" aria-label="เลือกจากรายชื่อทีม"
            className="shrink-0 rounded-lg px-2 text-muted ring-1 ring-line/20 hover:text-ink"><Ic n="users" size={14} /></button>
        )}
      </div>
    );
  }
  const opt = p => <option key={p.id} value={p.id}>{p.pos} · {p.name}</option>;
  return (
    <select value={resolved} aria-label={placeholder} className={INPUT}
      onChange={e => {
        const v = e.target.value;
        if (v === "__custom") { setCustom(true); onChange("", ""); return; }
        const p = named.find(x => x.id === v);
        onChange(p ? p.id : "", p ? p.name : "");
      }}>
      <option value="">{placeholder}</option>
      <optgroup label="ตัวจริง">{named.filter(p => p.starter).map(opt)}</optgroup>
      <optgroup label="สำรอง">{named.filter(p => !p.starter).map(opt)}</optgroup>
      <option value="__custom">✎ พิมพ์ชื่อเอง</option>
    </select>
  );
}

// สถานะแก้ไขผู้ลงเล่น: ทุกคนที่มีชื่อในทีม → { on: ลงเล่นไหม, n: ชื่อ }
function initPerf(match, teams) {
  const out = {};
  teams.forEach(t => {
    if (!t) return;
    const saved = (match.perf || {})[t.id];
    out[t.id] = {};
    namedPlayers(t).forEach(p => {
      const s = saved && saved[p.id];
      out[t.id][p.id] = { on: saved ? !!s : p.starter, n: p.name };
    });
  });
  return out;
}

function ResultModal({ match, teams, onClose, onSave }) {
  const home = teams.find(t => t.id === match.home);
  const away = teams.find(t => t.id === match.away);
  const [hs, setHs] = useState(match.hs == null ? 0 : match.hs);
  const [as, setAs] = useState(match.as == null ? 0 : match.as);
  const [events, setEvents] = useState(match.events && match.events.length ? match.events.map(e => ({ ...e })) : []);
  const [perf, setPerf] = useState(() => initPerf(match, [home, away]));
  const [motm, setMotm] = useState(match.motm && match.motm.playerId ? match.motm.teamId + "|" + match.motm.playerId : "");
  const [tab, setTab] = useState("events");
  // แผนที่ใช้จริงในนัดนี้ (ค่าเริ่มต้น = แผนปัจจุบันของทีม)
  const [forms, setForms] = useState(() => {
    const saved = match.formations || {}, f = t => t ? saved[t.id] || withSquad(t).formation : "";
    return { [match.home]: f(home), [match.away]: f(away) };
  });
  const formSelect = (t, right) => t && (
    <select value={forms[t.id] || ""} onChange={e => setForms({ ...forms, [t.id]: e.target.value })} aria-label={"แผนที่ " + t.name + " ใช้ในนัดนี้"}
      className={"mt-1 rounded bg-surface px-1.5 py-0.5 font-display text-xs font-bold italic text-accent ring-1 ring-line/25 outline-none focus:ring-accent/70 " + (right ? "ml-auto" : "")}>
      {FORMATION_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
    </select>
  );
  const teamOf = id => id === match.home ? home : away;

  const addEvent = () => setEvents([...events, { type:"goal", teamId:match.home, playerId:"", player:"", assistId:"", assist:"" }]);
  const upd = (i, patch) => setEvents(events.map((e, idx) => idx === i ? { ...e, ...patch } : e));
  const del = i => setEvents(events.filter((_, idx) => idx !== i));
  const autoScore = () => {
    setHs(events.filter(e => e.type === "goal" && e.teamId === match.home).length);
    setAs(events.filter(e => e.type === "goal" && e.teamId === match.away).length);
  };
  const setP = (tid, pid, patch) => setPerf({ ...perf, [tid]: { ...perf[tid], [pid]: { ...perf[tid][pid], ...patch } } });

  const submit = () => {
    const outPerf = {};
    Object.entries(perf).forEach(([tid, ps]) => {
      // ผลงานของคนที่ไม่อยู่ในรายชื่อแล้ว (ถูกเปลี่ยนตัว) เก็บไว้ตามเดิม ไม่ให้หาย
      const saved = (match.perf || {})[tid] || {};
      outPerf[tid] = {};
      Object.keys(saved).forEach(pid => { if (!(pid in ps)) outPerf[tid][pid] = saved[pid]; });
      Object.entries(ps).forEach(([pid, v]) => {
        if (v.on) outPerf[tid][pid] = { n: v.n };
      });
    });
    let best = null;
    if (motm) {
      const cut = motm.indexOf("|"), tid = motm.slice(0, cut), pid = motm.slice(cut + 1);
      const e = outPerf[tid] && outPerf[tid][pid];
      if (e) best = { teamId: +tid, playerId: pid, n: e.n };
    }
    const cleanEvents = events.filter(e => (e.player || "").trim()).map(e => ({ ...e, player: e.player.trim(), assist: (e.assist || "").trim() }));
    onSave(match.id, hs, as, cleanEvents, outPerf, best, forms);
  };

  const SCORE = "h-12 w-12 rounded-lg bg-sunken text-center font-display text-2xl font-bold italic text-accent ring-1 ring-line/25 outline-none focus:ring-2 focus:ring-accent/70 sm:h-14 sm:w-14 sm:text-3xl";

  const perfBlock = t => {
    if (!t) return null;
    const rows = namedPlayers(t), ps = perf[t.id] || {};
    const played = Object.values(ps).filter(v => v.on).length;
    const row = p => {
      const v = ps[p.id], key = t.id + "|" + p.id, star = motm === key;
      return (
        <div key={p.id} className="grid grid-cols-[22px_38px_1fr_30px] items-center gap-2 py-1.5">
          <input type="checkbox" checked={v.on} onChange={e => { setP(t.id, p.id, { on: e.target.checked }); if (!e.target.checked && star) setMotm(""); }}
            aria-label={"ลงเล่น: " + p.name} className="h-4 w-4 accent-[#FFDE2E]" />
          <PosBadge pos={p.pos} />
          <span className={"truncate text-sm " + (v.on ? "text-ink" : "text-faint")}>{p.name}</span>
          <button type="button" disabled={!v.on} onClick={() => setMotm(star ? "" : key)} aria-pressed={star}
            aria-label={"ผู้เล่นยอดเยี่ยม: " + p.name} title="ผู้เล่นยอดเยี่ยม (MOTM)"
            className={"grid h-7 w-7 place-items-center rounded-md transition disabled:opacity-30 " + (star ? "bg-accent text-on-accent" : "text-muted hover:text-accent")}>
            <Ic n="star" size={14} />
          </button>
        </div>
      );
    };
    return (
      <div className="rounded-xl bg-sunken p-3 ring-1 ring-line/15">
        <div className="mb-2 flex items-center gap-2">
          <Crest team={t} className="h-7 w-auto" />
          <span className="min-w-0 flex-1 truncate font-display font-semibold italic text-ink">{t.name}</span>
          <span className="text-xs text-muted">ลงเล่น {played}</span>
        </div>
        {rows.length === 0 ? <div className="py-4 text-center text-sm text-muted">ทีมนี้ยังไม่มีรายชื่อนักเตะ</div> : (
          <>
            <div className="text-[11px] text-muted">ตัวจริง</div>
            {rows.filter(p => p.starter).map(row)}
            <div className="mt-2 border-t border-line/15 pt-2 text-[11px] text-muted">สำรอง</div>
            {rows.filter(p => !p.starter).map(row)}
          </>
        )}
      </div>
    );
  };

  return (
    <Modal onClose={onClose} className="max-w-3xl">
      <ModalHead kicker={"สัปดาห์ที่ " + match.round} title="บันทึกผลการแข่งขัน" onClose={onClose} />

      {/* มือถือ: ช่องสกอร์เล็กลง + ชื่อทีมขึ้นบรรทัดใหม่ได้ ไม่โดนตัดเหลือ "NO…" */}
      <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl bg-sunken p-4 ring-1 ring-line/15 sm:gap-4 sm:p-5">
        <div className="min-w-0 text-right">
          <div className="break-words font-display text-base font-bold italic leading-tight text-ink sm:text-lg">{home && home.name}</div>
          <div className="truncate text-xs text-muted">{home && home.club}</div>
          <div className="flex">{formSelect(home, true)}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <input type="number" min="0" value={hs} onChange={e => setHs(+e.target.value)} aria-label="ประตูทีมเหย้า" className={SCORE} />
          <span className="text-faint">-</span>
          <input type="number" min="0" value={as} onChange={e => setAs(+e.target.value)} aria-label="ประตูทีมเยือน" className={SCORE} />
        </div>
        <div className="min-w-0">
          <div className="break-words font-display text-base font-bold italic leading-tight text-ink sm:text-lg">{away && away.name}</div>
          <div className="truncate text-xs text-muted">{away && away.club}</div>
          <div className="flex">{formSelect(away, false)}</div>
        </div>
      </div>

      <Segmented value={tab} onChange={setTab} items={[["events", "ประตู / ใบเหลือง-แดง"], ["perf", "ผู้ลงเล่น / MOTM"]]} />

      {tab === "events" ? (
        <>
          <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
            <Btn onClick={autoScore}><Ic n="sparkles" size={13} /> คิดสกอร์ให้</Btn>
            <Btn onClick={addEvent}><Ic n="plus" size={14} /> เพิ่ม</Btn>
          </div>
          <div className="space-y-2">
            {events.length === 0 && (
              <div className="rounded-xl border border-dashed border-line/25 py-8 text-center text-sm text-muted">
                ยังไม่มีเหตุการณ์ — กด “เพิ่ม” เพื่อบันทึกผู้ทำประตู
              </div>
            )}
            {/* มือถือ: 2 แถว (ประเภท/ทีม/ลบ → นักเตะ/แอสซิสต์) · จอใหญ่: แถวเดียว */}
            {events.map((e, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_34px] gap-2 rounded-xl bg-sunken p-2 ring-1 ring-line/15 sm:grid-cols-[104px_130px_1fr_1fr_34px]">
                <select value={e.type} onChange={ev => upd(i, { type: ev.target.value })} aria-label="ประเภทเหตุการณ์" className={INPUT}>
                  <option value="goal">⚽ ประตู</option>
                  <option value="yellow">🟨 เหลือง</option>
                  <option value="red">🟥 แดง</option>
                </select>
                <select value={e.teamId} aria-label="ทีม" className={INPUT}
                  onChange={ev => upd(i, { teamId: +ev.target.value, playerId: "", player: "", assistId: "", assist: "" })}>
                  <option value={match.home}>{home && home.name}</option>
                  <option value={match.away}>{away && away.name}</option>
                </select>
                <button onClick={() => del(i)} aria-label="ลบเหตุการณ์"
                  className="grid place-items-center rounded-lg text-muted hover:bg-loss/10 hover:text-loss sm:order-last">
                  <Ic n="x" size={15} />
                </button>
                <PlayerPick key={"p" + i + "-" + e.teamId} team={teamOf(e.teamId)} id={e.playerId} name={e.player} placeholder="ชื่อนักเตะ"
                  onChange={(pid, n) => upd(i, { playerId: pid, player: n })} />
                <PlayerPick key={"a" + i + "-" + e.teamId + e.type} team={teamOf(e.teamId)} id={e.assistId} name={e.assist} placeholder="แอสซิสต์"
                  disabled={e.type !== "goal"} onChange={(pid, n) => upd(i, { assistId: pid, assist: n })} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 text-xs leading-relaxed text-muted">ติ๊กคนที่ลงเล่น (ติ๊กตัวจริงไว้ให้แล้ว) · กด ★ เลือกผู้เล่นยอดเยี่ยม (MOTM) 1 คน · ประตู/แอสซิสต์/ใบ นับจากแท็บแรกให้อัตโนมัติ</p>
          <div className="grid gap-3 md:grid-cols-2">{perfBlock(home)}{perfBlock(away)}</div>
        </>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Btn onClick={onClose}>ยกเลิก</Btn>
        <Btn variant="primary" onClick={submit}><Ic n="check" size={15} /> ยืนยันผล</Btn>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ TEAM MODAL (แอดมิน: สร้าง/แก้ทีม) ══════════════════════════ */
function TeamModal({ team, users, onClose, onSave, onDelete, onSquad }) {
  const [f, setF] = useState(team || { name:"", owner:"", club:"", kit:"#2F78FF" });
  const managers = users.filter(u => u.role === "manager");
  const current = team ? managers.find(u => u.teamId === team.id) : null;
  const [mgr, setMgr] = useState(current ? String(current.id) : "");
  const [err, setErr] = useState("");
  const set = (k, v) => { setF({ ...f, [k]: v }); setErr(""); };
  const submit = () => {
    if (!(f.name || "").trim()) return setErr("กรอกชื่อทีม");
    const m = managers.find(u => String(u.id) === mgr);
    onSave({ ...f, name: f.name.trim().slice(0, 24) }, m ? m.id : null);
  };

  return (
    <Modal onClose={onClose}>
      <ModalHead kicker="แอดมิน" title={team ? "แก้ไขทีม" : "สร้างทีมใหม่"} onClose={onClose} />
      <div className="mb-4 flex justify-center"><Crest team={{ ...f, name: f.name || "?" }} className="h-24 w-auto" /></div>
      <div className="space-y-3">
        <Field label="ชื่อทีม"><input value={f.name} onChange={e => set("name", e.target.value)} placeholder="เช่น NONT FC" maxLength={24} className={INPUT} /></Field>
        <div className="grid grid-cols-[1fr_96px] gap-3">
          <Field label="สโมสรที่ใช้ในเกม"><input value={f.club} onChange={e => set("club", e.target.value)} placeholder="เช่น Manchester City" className={INPUT} /></Field>
          <Field label="สีทีม"><input type="color" value={hexOk(f.kit) ? f.kit : "#2F78FF"} onChange={e => set("kit", e.target.value)} className="h-[42px] w-full rounded-lg" /></Field>
        </div>
        <Field label="ชื่อเจ้าของทีม (แสดงบนการ์ด)"><input value={f.owner} onChange={e => set("owner", e.target.value)} placeholder="เช่น นนท์" className={INPUT} /></Field>
        <Field label="บัญชีผู้จัดการทีม (User)" hint="ผู้จัดการแก้ชื่อทีม สีทีม และรายชื่อนักเตะได้เอง · สร้างบัญชีได้ที่เมนูบัญชี › จัดการผู้ใช้">
          <select value={mgr} onChange={e => setMgr(e.target.value)} className={INPUT}>
            <option value="">— ไม่มี —</option>
            {managers.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} (@{u.username}){u.teamId && (!team || u.teamId !== team.id) ? " · ย้ายจากทีมอื่น" : ""}
              </option>
            ))}
          </select>
        </Field>
        {err && <Note>{err}</Note>}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {team && <Btn variant="danger" onClick={() => onDelete(team.id)}><Ic n="trash" size={14} /> ลบ</Btn>}
          {team && <Btn onClick={() => onSquad(team)}><Ic n="shirt" size={14} /> นักเตะ</Btn>}
        </div>
        <div className="flex gap-2">
          <Btn onClick={onClose}>ยกเลิก</Btn>
          <Btn variant="primary" onClick={submit}><Ic n="check" size={15} /> บันทึก</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ TEAM IDENTITY (ผู้จัดการ: ชื่อทีม + สีทีม) ══════════════════════════ */
function TeamIdentity({ team, onSave }) {
  const [name, setName] = useState(team.name);
  const [kit, setKit] = useState(hexOk(team.kit) ? team.kit : "#2F78FF");
  const [msg, setMsg] = useState(null);
  useEffect(() => { setName(team.name); setKit(hexOk(team.kit) ? team.kit : "#2F78FF"); }, [team.id]);
  const submit = e => {
    e.preventDefault();
    if (!name.trim()) return setMsg({ kind: "error", text: "กรอกชื่อทีม" });
    onSave({ name: name.trim().slice(0, 24), kit });
    setMsg({ kind: "ok", text: "บันทึกชื่อและสีทีมแล้ว" });
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className="flex justify-center pb-1"><Crest team={{ ...team, name: name || "?", kit }} className="h-28 w-auto drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]" /></div>
      <Field label="ชื่อทีม"><input value={name} onChange={e => { setName(e.target.value); setMsg(null); }} maxLength={24} className={INPUT} /></Field>
      <Field label="สีทีม"><input type="color" value={kit} onChange={e => { setKit(e.target.value); setMsg(null); }} className="h-[42px] w-full rounded-lg" /></Field>
      <p className="text-xs leading-relaxed text-muted">สโมสรในเกม: <span className="text-soft">{team.club || "—"}</span> · แอดมินเป็นคนตั้ง</p>
      {msg && <Note kind={msg.kind}>{msg.text}</Note>}
      <Btn type="submit" variant="primary" className="w-full justify-center"><Ic n="check" size={15} /> บันทึกชื่อและสี</Btn>
    </form>
  );
}

/* ══════════════════════════ SQUAD EDITOR (23 คน: ตัวจริง 11 + สำรอง 12) ══════════════════════════ */
// แต่ละคน: ตำแหน่ง · ชื่อ · ตัวจริง/สำรอง · ประเภทการ์ด (ห้าม Standard) · ค่าพลัง OVR · ลิงก์การ์ด EFHUB
function SquadEditor({ team, onSave }) {
  const fresh = () => withSquad(team).players.map(p => ({ card: "", ovr: "", efhub: "", ...p, ovr: p.ovr == null ? "" : String(p.ovr) }));
  const [list, setList] = useState(fresh);
  const [formation, setFormation] = useState(() => withSquad(team).formation);
  const [lineup, setLineup] = useState(() => withSquad(team).lineup);
  const [msg, setMsg] = useState(null);
  const [bulk, setBulk] = useState("");
  useEffect(() => {
    const t = withSquad(team);
    setList(fresh()); setFormation(t.formation); setLineup(t.lineup); setMsg(null);
  }, [team.id]);
  // รูปการ์ดที่เปลี่ยนจากที่อื่นระหว่างเปิดหน้านี้ (แตะนักเตะในโปรไฟล์ / เครื่องอื่นแก้) → ใส่เข้าแบบร่างด้วย
  // ไม่งั้นกด "บันทึกรายชื่อ" แล้วรูปใหม่โดนค่าเก่าทับ (ยกเว้นคนที่เปลี่ยนรูปในหน้านี้เองแล้ว)
  const imgKey = (team.players || []).map(p => p.id + "=" + (p.img || "")).join(",");
  const lastImgs = useRef(null);
  useEffect(() => {
    const now = {};
    (team.players || []).forEach(p => { now[p.id] = p.img || ""; });
    const before = lastImgs.current;
    lastImgs.current = now;
    if (!before) return;
    setList(prev => prev.map(p => p.id in now && now[p.id] !== (before[p.id] || "") && (p.img || "") === (before[p.id] || "") ? { ...p, img: now[p.id] } : p));
  }, [imgKey]);
  // อัปเดตแบบ functional: การอัปโหลดรูปทำงานแบบ async ห้ามทับการแก้อื่นที่เกิดระหว่างรอ
  const upd = (id, patch) => { setList(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p)); setMsg(null); };
  const { images, putImage } = useContext(ImgContext);
  const [imgErr, setImgErr] = useState("");
  const [busyImg, setBusyImg] = useState(null);
  const upload = async (p, file) => {
    setImgErr(""); setBusyImg(p.id);
    try { upd(p.id, { img: await putImage(await makeCardImage(file)) }); }
    catch (e) { setImgErr((p.name.trim() || "นักเตะ") + ": " + (e.message || "อัปโหลดรูปไม่สำเร็จ")); }
    finally { setBusyImg(null); }
  };

  const starters = list.filter(p => p.starter), subs = list.filter(p => !p.starter);
  // ตัวจริงที่เปลี่ยน (สลับกับสำรอง / แทนที่คนใหม่) → คนเดิมอยู่ช่องเดิม ช่องที่ว่างเติมให้อัตโนมัติ
  const lineupView = fixLineup(formation, starters, lineup);
  const pickFormation = k => { setFormation(k); setLineup(fixLineup(k, starters, [])); setMsg(null); };
  const autoArrange = () => { setLineup(fixLineup(formation, starters, [])); setMsg(null); };
  const assign = (i, id) => {
    const next = lineupView.slice(), j = next.indexOf(id);
    if (j >= 0) next[j] = next[i];          // คนนี้อยู่ช่องอื่น → สลับกัน
    next[i] = id;
    setLineup(next); setMsg(null);
  };
  const offs = FORMATIONS[formation].map((s, i) => {
    const p = list.find(x => x.id === lineupView[i]);
    return p && offPosition(p.pos, s.pos) ? p : null;
  }).filter(Boolean);
  const named = list.filter(p => p.name.trim());
  const lower = named.map(p => p.name.trim().toLowerCase());
  const dup = lower.find((n, i) => lower.indexOf(n) !== i);
  const gk = starters.filter(p => p.pos === "GK").length;
  const noCard = named.filter(p => !p.card);
  const badOvr = list.filter(p => !ovrOk(p.ovr));
  const badLink = list.filter(p => !efhubOk(p.efhub));
  const who = ps => ps.slice(0, 4).map(p => p.name.trim() || "คนที่ไม่มีชื่อ").join(", ") + (ps.length > 4 ? " …" : "");
  const problems = [
    starters.length !== STARTERS && "ตัวจริงต้องมี 11 คนพอดี (ตอนนี้ " + starters.length + " คน) · สำรองต้องมี 12 คน (ตอนนี้ " + subs.length + " คน)",
    dup && "มีชื่อนักเตะซ้ำกัน: " + named.find(p => p.name.trim().toLowerCase() === dup).name.trim(),
    noCard.length && "ต้องเลือกประเภทการ์ดให้นักเตะที่ใส่ชื่อแล้ว (ลีกนี้ไม่ใช้การ์ด Standard) — ยังขาด " + noCard.length + " คน: " + who(noCard),
    badOvr.length && "ค่าพลัง OVR ต้องเป็นตัวเลข " + OVR_MIN + "–" + OVR_MAX + ": " + who(badOvr),
    badLink.length && "ลิงก์ EFHUB ต้องเป็นหน้าการ์ด เช่น https://efhub.com/players/12345 : " + who(badLink),
  ].filter(Boolean);
  const warns = [
    named.length < SQUAD_SIZE && "ยังไม่ได้ใส่ชื่อ " + (SQUAD_SIZE - named.length) + " คน (บันทึกไว้ก่อนได้)",
    starters.length === STARTERS && gk !== 1 && "ตัวจริงควรมีผู้รักษาประตู (GK) 1 คน — ตอนนี้ " + gk + " คน",
    offs.length > 0 && "เล่นนอกตำแหน่งในแผน " + formation + " " + offs.length + " คน: " + who(offs),
  ].filter(Boolean);

  const applyBulk = () => {
    if (!bulk) return;
    setList(list.map(p => p.name.trim() && !p.card ? { ...p, card: bulk } : p));
    setMsg(null);
  };
  const submit = e => {
    e.preventDefault();
    if (problems.length) return;
    onSave(list.map(p => ({ ...p, name: p.name.trim(), efhub: (p.efhub || "").trim(), ovr: p.ovr === "" ? "" : +p.ovr })), formation, lineupView);
    setMsg("บันทึกรายชื่อนักเตะและแผน " + formation + " แล้ว");
  };

  const row = (p, i) => {
    const label = p.name.trim() || (p.starter ? "ตัวจริง" : "สำรอง") + " คนที่ " + (i + 1);
    return (
      <div key={p.id} className="rounded-lg bg-sunken/70 px-2 py-2 ring-1 ring-line/10">
        <div className="grid grid-cols-[20px_64px_1fr_auto] items-center gap-2">
          <span className="text-right text-[11px] tabular-nums text-faint">{i + 1}</span>
          <select value={p.pos} onChange={e => upd(p.id, { pos: e.target.value })} aria-label={"ตำแหน่ง " + label}
            className={"ef-pos-select ef-pos-" + posGroup(p.pos)}>
            {POSITIONS.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
          <input value={p.name} onChange={e => upd(p.id, { name: e.target.value })} maxLength={24}
            placeholder={(p.starter ? "ตัวจริง" : "สำรอง") + " คนที่ " + (i + 1)} aria-label={"ชื่อ" + (p.starter ? "ตัวจริง" : "สำรอง") + " คนที่ " + (i + 1)}
            className={INPUT + " py-1.5"} />
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => upd(p.id, { starter: !p.starter })} aria-pressed={p.starter}
              title={p.starter ? "ย้ายไปสำรอง" : "ย้ายไปตัวจริง"} aria-label={(p.starter ? "ย้ายไปสำรอง: " : "ย้ายไปตัวจริง: ") + label}
              className={"w-[52px] rounded px-1.5 py-1 text-[11px] font-semibold ring-1 transition " + (p.starter ? "bg-accent/15 text-accent ring-accent/35" : "bg-line/10 text-muted ring-line/20 hover:text-ink")}>
              {p.starter ? "ตัวจริง" : "สำรอง"}
            </button>
            {p.name.trim() ? (
              <button type="button" onClick={() => { if (confirm("แทนที่ " + p.name + " ด้วยนักเตะคนใหม่? (ผลงานเดิมยังอยู่ในประวัติ แต่ไม่นับให้คนใหม่)")) upd(p.id, { id: newPlayerId(team.id), name: "", card: "", ovr: "", efhub: "", img: "" }); }}
                aria-label={"แทนที่ " + p.name + " ด้วยคนใหม่"} title="แทนที่ด้วยนักเตะคนใหม่"
                className="grid h-7 w-7 place-items-center rounded text-muted hover:text-ink"><Ic n="refresh" size={13} /></button>
            ) : <span className="w-7" />}
          </div>
        </div>
        {/* บรรทัดที่ 2: รูปการ์ด · ประเภทการ์ด · OVR · ลิงก์ EFHUB · ค้นหา (มือถือ: รูปสูง 2 แถว ลิงก์ขึ้นแถวใหม่) */}
        <div className="mt-1.5 grid grid-cols-[36px_1fr_64px_36px] items-center gap-2 pl-7 sm:grid-cols-[32px_132px_64px_1fr_36px]">
          <div className="relative row-span-2 h-full min-h-[44px] w-9 sm:row-span-1 sm:h-11 sm:w-8">
            <label title={p.img ? "เปลี่ยนรูปการ์ด" : "อัปโหลดรูปการ์ด"}
              className={"grid h-full w-full cursor-pointer place-items-center overflow-hidden rounded-md transition " +
                (p.img && images[p.img] ? "ring-1 ring-white/30" : "border border-dashed border-line/35 text-muted hover:border-accent/60 hover:text-accent")}>
              {busyImg === p.id ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-line/30 border-t-accent" />
                : p.img && images[p.img] ? <img src={images[p.img]} alt="" className="h-full w-full object-cover object-top" />
                : <span className="flex flex-col items-center gap-0.5"><Ic n="image" size={14} /><span className="text-[10px] leading-none">รูป</span></span>}
              <input type="file" accept="image/*" className="sr-only" aria-label={"รูปการ์ด " + label}
                onChange={e => { const f = e.target.files && e.target.files[0]; e.target.value = ""; if (f) upload(p, f); }} />
            </label>
            {p.img && (
              <button type="button" onClick={() => upd(p.id, { img: "" })} aria-label={"ลบรูปการ์ด " + label} title="ลบรูปการ์ด"
                className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-loss text-white shadow">
                <Ic n="x" size={10} />
              </button>
            )}
          </div>
          <select value={p.card || ""} onChange={e => upd(p.id, { card: e.target.value })} aria-label={"ประเภทการ์ด " + label}
            className={INPUT + " px-2 py-1.5 text-xs sm:order-1 " + (p.name.trim() && !p.card ? "ring-loss/60" : "")}>
            <option value="">— ประเภทการ์ด —</option>
            {CARD_TYPES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <input type="number" inputMode="numeric" min={OVR_MIN} max={OVR_MAX} value={p.ovr} placeholder="OVR"
            onChange={e => upd(p.id, { ovr: e.target.value })} aria-label={"ค่าพลัง OVR " + label}
            className={INPUT + " px-2 py-1.5 text-center text-xs sm:order-2 " + (ovrOk(p.ovr) ? "" : "ring-loss/60")} />
          <a href={efhubSearch(p.name.trim() || "")} target="_blank" rel="noopener noreferrer"
            aria-label={"ค้นการ์ด " + label + " ใน EFHUB"} title="ค้นการ์ดใน EFHUB (เปิดแท็บใหม่)"
            className={"grid place-items-center rounded-lg text-link ring-1 ring-line/20 hover:text-accent sm:order-4 " + (p.name.trim() ? "" : "pointer-events-none opacity-40")}>
            <Ic n="search" size={14} />
          </a>
          <input value={p.efhub || ""} onChange={e => upd(p.id, { efhub: e.target.value })} inputMode="url" spellCheck={false}
            placeholder="วางลิงก์การ์ดจาก EFHUB (ไม่บังคับ)" aria-label={"ลิงก์ EFHUB " + label}
            className={INPUT + " col-span-3 px-2 py-1.5 text-xs sm:order-3 sm:col-span-1 " + (efhubOk(p.efhub) ? "" : "ring-loss/60")} />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className={"rounded px-2 py-1 font-semibold ring-1 " + (starters.length === STARTERS ? "bg-win/15 text-win ring-win/30" : "bg-loss/15 text-loss ring-loss/30")}>ตัวจริง {starters.length}/11</span>
        <span className={"rounded px-2 py-1 font-semibold ring-1 " + (subs.length === SQUAD_SIZE - STARTERS ? "bg-win/15 text-win ring-win/30" : "bg-loss/15 text-loss ring-loss/30")}>สำรอง {subs.length}/12</span>
        <span className="rounded bg-line/10 px-2 py-1 text-soft ring-1 ring-line/20">ใส่ชื่อแล้ว {named.length}/23</span>
        <span className={"rounded px-2 py-1 ring-1 " + (noCard.length ? "bg-loss/15 text-loss ring-loss/30" : "bg-line/10 text-soft ring-line/20")}>เลือกการ์ดแล้ว {named.length - noCard.length}/{named.length}</span>
      </div>
      {noCard.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg bg-accent/10 p-2.5 text-xs ring-1 ring-accent/25">
          <span className="text-ink">ตั้งการ์ดให้ {noCard.length} คนที่ยังไม่เลือก:</span>
          <select value={bulk} onChange={e => setBulk(e.target.value)} aria-label="ประเภทการ์ดสำหรับทุกคนที่ยังไม่เลือก" className={INPUT_FIT + " px-2 py-1 text-xs"}>
            <option value="">— เลือก —</option>
            {CARD_TYPES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <Btn onClick={applyBulk} disabled={!bulk} className="px-4 py-1 text-xs">ใช้กับทุกคน</Btn>
        </div>
      )}
      {/* ═══ แผนการเล่น: เลือกแผน + จัดตัวจริงลง 11 ช่อง ═══ */}
      <div className="mb-5 rounded-xl bg-sunken/70 p-3 ring-1 ring-line/15">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-display text-sm font-semibold italic text-accent">แผนการเล่น</span>
          <select value={formation} onChange={e => pickFormation(e.target.value)} aria-label="แผนการเล่น"
            className={INPUT_FIT + " py-1.5 font-display font-bold italic text-accent"}>
            {FORMATION_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <Btn onClick={autoArrange} className="px-4 py-1 text-xs"><Ic n="wand" size={12} /> จัดตำแหน่งอัตโนมัติ</Btn>
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,240px)_1fr]">
          <Pitch team={{ ...team, players: list, formation, lineup: lineupView }} />
          <div>
            {starters.length !== STARTERS && <p className="mb-2 text-xs text-loss">ตัวจริงต้องครบ 11 คนก่อน ถึงจะจัดลงแผนได้ครบทุกช่อง</p>}
            <div className="grid gap-1.5 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {FORMATIONS[formation].map((s, i) => {
                const p = list.find(x => x.id === lineupView[i]);
                const off = p && offPosition(p.pos, s.pos);
                return (
                  <div key={i} className="grid grid-cols-[40px_1fr] items-center gap-2">
                    <span className={"ef-pos ef-pos-" + posGroup(s.pos)}>{s.pos}</span>
                    <select value={lineupView[i] || ""} onChange={e => assign(i, e.target.value)}
                      aria-label={"ช่อง " + (i + 1) + " ตำแหน่ง " + s.pos}
                      className={INPUT + " px-2 py-1 text-xs " + (off ? "text-loss ring-loss/60" : "")}>
                      {!lineupView[i] && <option value="">— ว่าง —</option>}
                      {starters.map(sp => <option key={sp.id} value={sp.id}>{sp.pos} · {sp.name.trim() || "(ยังไม่ใส่ชื่อ)"}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">เลือกนักเตะลงแต่ละช่อง ถ้าคนนั้นอยู่ช่องอื่นอยู่แล้วจะสลับกันให้ · กรอบแดง = เล่นนอกตำแหน่ง · ตัวจริง/สำรองเปลี่ยนได้ที่รายชื่อด้านล่าง</p>
          </div>
        </div>
      </div>

      <div className="mb-1 font-display text-sm font-semibold italic text-accent">ตัวจริง</div>
      <div className="space-y-1.5">{starters.map(row)}</div>
      <div className="mb-1 mt-5 font-display text-sm font-semibold italic text-soft">สำรอง</div>
      <div className="space-y-1.5">{subs.map(row)}</div>
      <div className="mt-4 space-y-2">
        {imgErr && <Note>{imgErr}</Note>}
        {problems.map(t => <Note key={t}>{t}</Note>)}
        {!problems.length && warns.map(t => <Note key={t} kind="warn">{t}</Note>)}
        {msg && !problems.length && <Note kind="ok">{msg}</Note>}
      </div>
      <div className="mt-4 flex justify-end">
        <Btn type="submit" variant="primary" disabled={problems.length > 0}><Ic n="check" size={15} /> บันทึกรายชื่อ</Btn>
      </div>
    </form>
  );
}

function SquadModal({ team, onClose, onSave }) {
  return (
    <Modal onClose={onClose} className="max-w-4xl">
      <ModalHead kicker={"รายชื่อนักเตะ · " + (team.club || "")} title={team.name} onClose={onClose} />
      <p className="-mt-1 mb-4 text-xs leading-relaxed text-muted">ใส่รูปการ์ด: กดช่อง “รูป” ในแถวของนักเตะแต่ละคน แล้วกดบันทึกรายชื่อ · ตัวจริง 11 คนจะโชว์เป็นการ์ดในโปรไฟล์ทีม</p>
      <SquadEditor team={team} onSave={onSave} />
    </Modal>
  );
}

/* ══════════════════════════ LOGIN / SETUP MODAL ══════════════════════════ */
// ใส่รหัสผิด 5 ครั้ง → ชื่อผู้ใช้นั้นพัก 30 วิ (นับต่อแม้ปิด/เปิดหน้าต่างใหม่ · รีเซ็ตเมื่อรีโหลดหน้า)
const LOGIN_GUARD = {};

// setup = ยังไม่มีแอดมิน → สร้างแอดมินคนแรก · ไม่งั้นล็อกอิน
// cloud: ตรวจรหัสที่ Firebase (onLogin/onSetup คืน Promise ของข้อความผิดพลาด "" = สำเร็จ)
// onSignup = แอดมินเปิดรับสมัคร → มีปุ่มไปหน้าสมัครผู้จัดการทีม (null = ปิดรับสมัคร)
function LoginModal({ users, setup, cloud, onClose, onLogin, onSetup, onSignup }) {
  const [f, setF] = useState({ name: "", username: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [help, setHelp] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => { setF({ ...f, [k]: v }); setErr(""); };
  const run = async job => { setBusy(true); const msg = await job; setBusy(false); if (msg) setErr(msg); };

  const submit = e => {
    e.preventDefault();
    if (busy) return;
    if (setup) {
      const msg = validateAccount(f, users, { needConfirm: true });
      return msg ? setErr(msg) : run(onSetup(f));
    }
    if (cloud) {
      if (!normUser(f.username) || !f.password) return setErr("กรอกชื่อผู้ใช้และรหัสผ่าน");
      return run(onLogin(f));
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
        <div className="-mr-2 -mt-2 flex justify-end"><CloseBtn onClose={onClose} /></div>
        <div className="mb-6 text-center">
          <div className="ef-btn ef-brand mx-auto mb-4 grid h-12 w-14 place-items-center">
            <Ic n={setup ? "crown" : "lock"} size={20} />
          </div>
          <h3 className="font-display text-2xl font-bold italic text-ink">{setup ? "ตั้งค่าแอดมินคนแรก" : "เข้าสู่ระบบ"}</h3>
          <p className="mt-1 text-sm text-muted">
            {!setup ? "แอดมิน · กรรมการ · ผู้จัดการทีม"
              : cloud ? "ลีกนี้ยังไม่มีแอดมิน · คนแรกที่สร้างจะเป็นเจ้าของลีก (ทำได้ครั้งเดียว)"
              : "ยังไม่มีบัญชีในเครื่องนี้ สร้างบัญชีแอดมินเพื่อเริ่มจัดการลีก"}
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

        <Btn type="submit" variant="primary" disabled={busy} className="mt-5 w-full justify-center py-2.5">
          <Ic n={setup ? "check" : "login"} size={15} />
          {busy ? (setup ? "กำลังสร้างบัญชี…" : "กำลังเข้าสู่ระบบ…") : setup ? "สร้างบัญชีแอดมิน" : "เข้าสู่ระบบ"}
        </Btn>
        {!setup && onSignup && (
          <Btn onClick={onSignup} className="mt-3 w-full justify-center py-2.5">
            <Ic n="userPlus" size={15} /> ยังไม่มีบัญชี? สมัครผู้จัดการทีม
          </Btn>
        )}

        {!setup && (
          <button type="button" onClick={() => setHelp(!help)} className="mt-3 w-full text-center text-xs text-muted hover:text-ink">
            ลืมรหัสผ่าน?
          </button>
        )}
        {help && (
          <p className="mt-2 rounded-lg bg-sunken p-3 text-xs leading-relaxed text-muted">
            {cloud ? (
              <>กรรมการ/ผู้จัดการทีมลืมรหัส → ให้แอดมินลบบัญชีเดิม แล้วสร้างบัญชีใหม่ให้ (ต้องใช้ชื่อผู้ใช้ใหม่)<br />
                แอดมินลืมรหัสเอง → ดูวิธีกู้คืนใน README หัวข้อ Firebase</>
            ) : (
              <>กรรมการ/ผู้จัดการทีมลืมรหัส → ให้แอดมินกด “ตั้งรหัสใหม่” ในเมนูบัญชี › จัดการผู้ใช้<br />
                แอดมินลืมรหัสเอง → ต้องล้างข้อมูลเว็บไซต์นี้ในเบราว์เซอร์ ข้อมูลลีกในเครื่องนี้จะหายด้วย (กด Export JSON เก็บไว้ก่อน)</>
            )}
          </p>
        )}
        <button type="button" onClick={onClose} className="mt-4 w-full text-center text-xs text-muted hover:text-ink">
          ดูแบบผู้ชม (ไม่ต้องล็อกอิน)
        </button>
        <p className="mt-4 border-t border-line/15 pt-3 text-center text-[11px] leading-relaxed text-muted">
          {cloud ? "บัญชีเก็บบนเซิร์ฟเวอร์ Firebase · ใช้ได้ทุกเครื่อง · ไม่มีใครเห็นรหัสผ่านของคุณ"
            : "บัญชีเก็บในเบราว์เซอร์เครื่องนี้เท่านั้น · รหัสผ่านถูกเข้ารหัส ไม่เก็บตัวจริง"}
        </p>
      </form>
    </Modal>
  );
}

/* ══════════════════════════ SIGN-UP (ผู้จัดการทีมสมัครเอง + สร้างทีมของตัวเอง) ══════════════════════════ */
// ชื่อทีมว่าง / ซ้ำกับทีมที่มีอยู่ → ข้อความผิดพลาด ("" = ผ่าน)
const teamNameError = (name, teams) => {
  const k = (name || "").trim().toLowerCase();
  if (!k) return "กรอกชื่อทีม";
  return teams.some(t => (t.name || "").trim().toLowerCase() === k) ? "มีทีมชื่อนี้ในลีกแล้ว ตั้งชื่ออื่น" : "";
};
// ทีมใหม่ของคนที่สมัคร: ชื่อ/สโมสร/สีที่กรอก + ช่องนักเตะว่าง 23 ช่อง · เจ้าของทีม = ชื่อที่แสดงของคนสมัคร
const newTeamFrom = (f, id) => withSquad({ id, name: f.team.trim().slice(0, 24), owner: f.name.trim().slice(0, 40),
  club: (f.club || "").trim().slice(0, 40), kit: hexOk(f.kit) ? f.kit : "#2F78FF" });

// เปิดตอนแอดมินเปิดรับสมัคร · onSignup(f) คืนข้อความผิดพลาด ("" = สำเร็จ → ล็อกอินเป็นผู้จัดการของทีมใหม่ให้เลย)
function SignupModal({ users, teams, onClose, onSignup, onLogin }) {
  const [f, setF] = useState({ name: "", username: "", password: "", confirm: "", team: "", club: "", kit: "#2F78FF" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k, v) => { setF({ ...f, [k]: v }); setErr(""); };
  const submit = async e => {
    e.preventDefault();
    if (busy) return;
    const msg = validateAccount(f, users, { needConfirm: true }) || teamNameError(f.team, teams);
    if (msg) return setErr(msg);
    setBusy(true);
    const res = await onSignup(f);
    setBusy(false);
    if (res) setErr(res);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="-mr-2 -mt-2 flex justify-end"><CloseBtn onClose={onClose} /></div>
        <div className="mb-5 text-center">
          <div className="ef-btn ef-brand mx-auto mb-4 grid h-12 w-14 place-items-center"><Ic n="userPlus" size={20} /></div>
          <h3 className="font-display text-2xl font-bold italic text-ink">สมัครผู้จัดการทีม</h3>
          <p className="mt-1 text-sm text-muted">สร้างบัญชีของคุณ + ทีมของคุณเองในขั้นตอนเดียว</p>
        </div>

        <SubHead>บัญชีของคุณ</SubHead>
        <div className="space-y-3">
          <Field label="ชื่อที่แสดง">
            <input value={f.name} onChange={e => set("name", e.target.value)} placeholder="เช่น นนท์" autoComplete="nickname" maxLength={40} className={INPUT} />
          </Field>
          <Field label="ชื่อผู้ใช้" hint="a–z 0–9 _ . - ยาว 3–20 ตัว (ใช้ตอนล็อกอิน)">
            <input value={f.username} onChange={e => set("username", e.target.value)} placeholder="เช่น nont"
              autoComplete="username" autoCapitalize="none" spellCheck={false} className={INPUT} />
          </Field>
          <Field label="รหัสผ่าน" hint="อย่างน้อย 6 ตัว">
            <PasswordInput value={f.password} onChange={v => set("password", v)} autoComplete="new-password" />
          </Field>
          <Field label="ยืนยันรหัสผ่าน">
            <PasswordInput value={f.confirm} onChange={v => set("confirm", v)} autoComplete="new-password" />
          </Field>
        </div>

        <div className="mt-6"><SubHead>ทีมของคุณ</SubHead></div>
        <div className="mb-3 flex justify-center"><Crest team={{ name: f.team || "?", kit: f.kit }} className="h-20 w-auto" /></div>
        <div className="space-y-3">
          <Field label="ชื่อทีม">
            <input value={f.team} onChange={e => set("team", e.target.value)} placeholder="เช่น NONT FC" maxLength={24} className={INPUT} />
          </Field>
          <div className="grid grid-cols-[1fr_96px] gap-3">
            <Field label="สโมสรที่ใช้ในเกม">
              <input value={f.club} onChange={e => set("club", e.target.value)} placeholder="เช่น Manchester City" maxLength={40} className={INPUT} />
            </Field>
            <Field label="สีทีม"><input type="color" value={f.kit} onChange={e => set("kit", e.target.value)} className="h-[42px] w-full rounded-lg" /></Field>
          </div>
          {err && <Note>{err}</Note>}
        </div>

        <Btn type="submit" variant="primary" disabled={busy} className="mt-5 w-full justify-center py-2.5">
          <Ic n="check" size={15} /> {busy ? "กำลังสมัคร…" : "สมัครและสร้างทีม"}
        </Btn>
        <button type="button" onClick={onLogin} className="mt-3 w-full text-center text-xs text-muted hover:text-ink">
          มีบัญชีแล้ว? เข้าสู่ระบบ
        </button>
        <p className="mt-4 border-t border-line/15 pt-3 text-center text-[11px] leading-relaxed text-muted">
          สมัครแล้วเป็นผู้จัดการทีมนี้ทันที · ใส่รายชื่อนักเตะได้ที่แท็บ “ทีมของฉัน” · แอดมินแก้หรือลบทีมได้
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
  const [busy, setBusy] = useState(false);
  const set = (k, v) => { setF({ ...f, [k]: v }); setMsg(null); };
  const submit = async e => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const err = await onSubmit(f);
    setBusy(false);
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
      <div className="flex justify-end"><Btn type="submit" variant="primary" disabled={busy}><Ic n="key" size={14} /> {busy ? "กำลังบันทึก…" : "บันทึกรหัสใหม่"}</Btn></div>
    </form>
  );
}

function TeamSelect({ value, onChange, teams, users, selfId, label }) {
  return (
    <select value={value || ""} onChange={e => onChange(e.target.value ? +e.target.value : null)} aria-label={label} className={INPUT + " py-1.5"}>
      <option value="">— ยังไม่กำหนดทีม —</option>
      {teams.map(t => {
        const owner = users.find(u => u.role === "manager" && u.teamId === t.id && u.id !== selfId);
        return <option key={t.id} value={t.id}>{t.name}{owner ? " · (ย้ายจาก " + owner.name + ")" : ""}</option>;
      })}
    </select>
  );
}

// ownerId = เจ้าของลีก (ออนไลน์) → ลดสิทธิ์/ลบไม่ได้ · onReset = null → ตั้งรหัสแทนคนอื่นไม่ได้ (ออนไลน์)
// signup = เปิดให้ผู้จัดการทีมสมัครเองอยู่ไหม (null = ยังเปิดไม่ได้ เพราะกฎ Firebase ยังเป็นรุ่นเก่า)
function UserManager({ me, users, teams, ownerId, signup, onSignupToggle, onAdd, onUpdate, onReset, onDelete }) {
  const blank = { name: "", username: "", password: "", role: "manager", teamId: null };
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [resetId, setResetId] = useState(null);
  const [resetPw, setResetPw] = useState("");
  const admins = users.filter(u => u.role === "admin").length;
  const set = (k, v) => { setF({ ...f, [k]: v }); setMsg(null); };
  const teamName = id => { const t = teams.find(x => x.id === id); return t ? t.name : ""; };

  const add = async e => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const err = await onAdd(f);
    setBusy(false);
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
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-sunken p-3 ring-1 ring-line/15">
        <div className="min-w-[180px] flex-1">
          <div className="text-sm font-medium text-ink">ให้ผู้จัดการทีมสมัครเอง: {signup ? <span className="text-win">เปิดอยู่</span> : <span className="text-muted">ปิดอยู่</span>}</div>
          <div className="mt-0.5 text-xs leading-relaxed text-muted">
            {signup === null ? "ยังเปิดไม่ได้ — วางกฎใหม่จากไฟล์ firestore.rules ใน Firebase ก่อน (ดู README)"
              : signup ? "เพื่อนกด “สมัครผู้จัดการทีม” ที่หน้าเข้าสู่ระบบ แล้วสร้างทีมของตัวเองได้ · ทีมครบแล้วกดปิด กันคนนอกสมัครเพิ่ม"
              : "ตอนนี้มีแต่แอดมินที่เพิ่มบัญชีและทีมได้"}
          </div>
        </div>
        <Btn variant={signup ? "ghost" : "primary"} disabled={signup === null} onClick={() => onSignupToggle(!signup)}>
          {signup ? "ปิดรับสมัคร" : "เปิดรับสมัคร"}
        </Btn>
      </div>
      {msg && <div className="mb-3"><Note kind={msg.kind}>{msg.text}</Note></div>}
      <div className="divide-y divide-line/10 rounded-xl bg-sunken ring-1 ring-line/15">
        {users.map(u => {
          const self = u.id === me.id, lastAdmin = u.role === "admin" && admins <= 1, isOwner = u.id === ownerId;
          return (
            <div key={u.id} className="px-3 py-3">
              <div className="flex items-center gap-3">
                <Avatar u={u} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{u.name}{self && <span className="font-normal text-muted"> (คุณ)</span>}{isOwner && <span className="font-normal text-accent"> · เจ้าของลีก</span>}</div>
                  <div className="truncate text-xs text-muted">@{u.username}{u.role === "manager" && " · " + (teamName(u.teamId) || "ยังไม่มีทีม")}</div>
                </div>
                <select value={u.role} disabled={self || lastAdmin || isOwner} onChange={e => onUpdate(u.id, { role: e.target.value })}
                  aria-label={"สิทธิ์ของ " + u.name} className={INPUT_FIT + " py-1.5"}>
                  <option value="admin">แอดมิน</option>
                  <option value="referee">กรรมการ</option>
                  <option value="manager">ผู้จัดการทีม</option>
                </select>
              </div>
              {u.role === "manager" && (
                <div className="mt-2 pl-11">
                  <TeamSelect value={u.teamId} onChange={tid => onUpdate(u.id, { teamId: tid })} teams={teams} users={users} selfId={u.id} label={"ทีมของ " + u.name} />
                </div>
              )}
              <div className="mt-2 flex justify-end gap-4 text-xs">
                {onReset && (
                  <button type="button" onClick={() => { setResetId(resetId === u.id ? null : u.id); setResetPw(""); setMsg(null); }}
                    aria-label={"ตั้งรหัสใหม่ให้ " + u.name} className="font-medium text-accent hover:underline">ตั้งรหัสใหม่</button>
                )}
                {!self && !isOwner && (
                  <button type="button" disabled={lastAdmin}
                    onClick={() => { if (confirm("ลบผู้ใช้ " + u.name + "?" + (onReset ? "" : "\n\nชื่อผู้ใช้ @" + u.username + " จะใช้สร้างบัญชีใหม่อีกไม่ได้"))) onDelete(u.id); }}
                    aria-label={"ลบผู้ใช้ " + u.name} className="font-medium text-loss hover:underline disabled:opacity-40">ลบ</button>
                )}
              </div>
              {onReset && resetId === u.id && (
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
              <option value="manager">ผู้จัดการทีม — แก้ทีมตัวเอง + นักเตะ</option>
              <option value="referee">กรรมการ — กรอกผล</option>
              <option value="admin">แอดมิน — จัดการทุกอย่าง</option>
            </select>
          </Field>
          {f.role === "manager" && (
            <div className="sm:col-span-2">
              <span className={LABEL + " mb-1.5 block"}>ทีมที่ดูแล</span>
              <TeamSelect value={f.teamId} onChange={tid => set("teamId", tid)} teams={teams} users={users} label="ทีมที่ดูแล" />
            </div>
          )}
        </div>
        <div className="flex justify-end"><Btn type="submit" variant="primary" disabled={busy}><Ic n="userPlus" size={14} /> {busy ? "กำลังสร้างบัญชี…" : "เพิ่มผู้ใช้"}</Btn></div>
        {!onReset && <p className="text-xs leading-relaxed text-muted">ลืมรหัสผ่าน: ลบบัญชีเดิมแล้วสร้างใหม่ด้วยชื่อผู้ใช้ใหม่ (ระบบออนไลน์ไม่ให้แอดมินตั้งรหัสแทนคนอื่น)</p>}
      </form>
    </div>
  );
}

function AccountModal({ user, users, teams, ownerId, signup, onSignupToggle, onClose, onLogout, onChangePassword, onAddUser, onUpdateUser, onResetPassword, onDeleteUser, onMyTeam }) {
  const isAdmin = user.role === "admin";
  const [tab, setTab] = useState("password");
  const myTeam = user.role === "manager" ? teams.find(t => t.id === user.teamId) : null;
  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ModalHead kicker="บัญชีของฉัน" title={user.name} onClose={onClose} />
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-sunken p-3 ring-1 ring-line/15">
        <Avatar u={user} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-soft">@{user.username}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <RoleChip role={user.role} />
            {user.role === "manager" && <span className="truncate text-xs text-muted">{myTeam ? myTeam.name : "ยังไม่มีทีม"}</span>}
          </div>
        </div>
        <Btn onClick={onLogout}><Ic n="logout" size={14} /> ออกจากระบบ</Btn>
      </div>
      {myTeam && (
        <button onClick={onMyTeam} className="mb-5 flex w-full items-center gap-3 rounded-xl bg-accent/10 p-3 text-left ring-1 ring-accent/25 transition hover:bg-accent/15">
          <Crest team={myTeam} className="h-10 w-auto" />
          <span className="flex-1 text-sm text-ink">ไปที่ <b className="font-display italic">ทีมของฉัน</b> · แก้ชื่อทีม สีทีม และรายชื่อนักเตะ</span>
          <span className="text-accent">→</span>
        </button>
      )}
      {isAdmin
        ? <Segmented value={tab} onChange={setTab} items={[["password", "เปลี่ยนรหัสผ่าน"], ["users", "จัดการผู้ใช้ (" + users.length + ")"]]} />
        : <SubHead>เปลี่ยนรหัสผ่าน</SubHead>}
      {tab === "users" && isAdmin
        ? <UserManager me={user} users={users} teams={teams} ownerId={ownerId} signup={signup} onSignupToggle={onSignupToggle}
            onAdd={onAddUser} onUpdate={onUpdateUser} onReset={onResetPassword} onDelete={onDeleteUser} />
        : <ChangePassword username={user.username} onSubmit={onChangePassword} />}
    </Modal>
  );
}

/* ══════════════════════════ PITCH (ตัวจริง 11 คนตามแผนการเล่น) ══════════════════════════ */
// การ์ดแทนคนที่ยังไม่มีรูป: สีทีม + ตำแหน่ง + OVR + ชื่อ
const PlaceholderCard = ({ p, pos, kit }) => (
  <div className="flex h-full w-full flex-col items-center justify-between px-[6%] py-[8%] text-white"
    style={{ background: `linear-gradient(165deg, ${tint(kit, "e6")} 0%, #163478 55%, #0B1C4A 100%)` }}>
    <span className={"ef-pos ef-pos-" + posGroup(pos)} style={{ minWidth: 0 }}>{pos}</span>
    <span className="font-display text-base font-bold italic leading-none drop-shadow">{p && p.ovr !== "" && p.ovr != null ? p.ovr : ""}</span>
    <span className="w-full truncate text-center text-[9px] font-semibold leading-tight drop-shadow">{p ? p.name || "—" : "ว่าง"}</span>
  </div>
);

// การ์ดใบเดียว: รูปที่อัปโหลด หรือการ์ดแทน · กรอบแดง = เล่นนอกตำแหน่ง
function PlayerCard({ p, pos, kit, off, className = "" }) {
  const { images } = useContext(ImgContext);
  const src = p && p.img && images[p.img];
  return (
    <div className={"relative aspect-[0.707] overflow-hidden rounded-[7%] shadow-[0_6px_14px_rgba(0,0,0,0.55)] " + (off ? "ring-2 ring-loss " : "ring-1 ring-white/25 ") + className}>
      {src ? <img src={src} alt="" draggable={false} className="h-full w-full object-cover object-top" /> : <PlaceholderCard p={p} pos={pos} kit={kit} />}
    </div>
  );
}

// cards = แสดงเป็นการ์ด (สนามทรงสูง 2:3, การ์ดกว้าง 15% — คำนวณแล้วไม่ทับกันทุกแผน) · ไม่งั้นเป็นป้ายตำแหน่ง + ชื่อ
// ป้ายบนสนาม = ตำแหน่งของช่องในแผน (แบบในเกม) · ชื่อพื้นแดง/กรอบแดง = เล่นนอกตำแหน่งจริงของนักเตะ
function Pitch({ team, cards = false, onCard }) {
  const t = withSquad(team);
  const byId = id => t.players.find(p => p.id === id);
  return (
    <div className={"ef-pitch overflow-hidden rounded-xl ring-1 ring-line/20 " + (cards ? "aspect-[2/3]" : "aspect-[4/5]")}>
      <div className="ef-pitch-circle" />
      <span className="absolute bottom-3 left-3 z-10 rounded bg-black/50 px-2 py-0.5 font-display text-sm font-bold italic text-accent">{t.formation}</span>
      {FORMATIONS[t.formation].map((s, i) => {
        const p = byId(t.lineup[i]);
        const off = p && offPosition(p.pos, s.pos);
        if (cards) return (
          <button key={i} type="button" disabled={!p} onClick={() => p && onCard && onCard(p, s.pos)}
            aria-label={p ? "ดูการ์ด " + (p.name || s.pos) + " (" + s.pos + ")" : "ช่อง " + s.pos + " ว่าง"}
            title={p ? (p.name || "—") + " · " + s.pos + (off ? " · นอกตำแหน่ง (จริง " + p.pos + ")" : "") : undefined}
            className="absolute w-[15%] -translate-x-1/2 -translate-y-1/2 rounded-[7%] outline-none transition-transform hover:z-10 hover:scale-110 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent"
            style={{ left: Math.min(92, Math.max(8, s.x)) + "%", top: Math.min(92, Math.max(8, s.y)) + "%" }}>
            <PlayerCard p={p} pos={s.pos} kit={t.kit} off={off} />
          </button>
        );
        const chip = (
          <>
            <span className="flex items-center gap-1">
              <span className={"ef-pos ef-pos-" + posGroup(s.pos) + " shadow-[0_4px_10px_rgba(0,0,0,0.4)]"}>{s.pos}</span>
              {p && p.ovr !== "" && p.ovr != null && <span className="font-display text-xs font-bold italic text-white drop-shadow">{p.ovr}</span>}
            </span>
            <span title={off ? "เล่นนอกตำแหน่ง (ตำแหน่งจริง " + p.pos + ")" : undefined}
              className={"max-w-full truncate rounded px-1.5 py-0.5 text-[11px] font-medium text-white " + (off ? "bg-loss/80" : "bg-black/50")}>
              {p ? p.name || "—" : "—"}
            </span>
          </>
        );
        const at = { left: Math.min(89, Math.max(11, s.x)) + "%", top: s.y + "%" };
        // มี onCard (โปรไฟล์ทีม) → แตะป้ายเพื่อดูการ์ด/ใส่รูปได้เหมือนโหมดการ์ด
        if (onCard && p) return (
          <button key={i} type="button" onClick={() => onCard(p, s.pos)} aria-label={"ดูการ์ด " + (p.name || s.pos) + " (" + s.pos + ")"}
            className="absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 rounded outline-none transition-transform hover:z-10 hover:scale-105 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent"
            style={at}>{chip}</button>
        );
        return <div key={i} className="absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5" style={at}>{chip}</div>;
      })}
    </div>
  );
}

/* ══════════════════════════ PLAYER VIEWER (แตะนักเตะ → การ์ดใบใหญ่ + สถิติ + ผลงานรายนัด) ══════════════════════════ */
// ตำแหน่งในแผนที่นักเตะยืนอยู่ (ตัวจริงเท่านั้น · สำรอง = null)
const slotOf = (team, pid) => { const t = withSquad(team); const i = t.lineup.indexOf(pid); return i >= 0 ? FORMATIONS[t.formation][i].pos : null; };

// ผลงานรายนัดของนักเตะ 1 คน ใหม่สุดก่อน · นับว่า "ลงเล่น" แบบเดียวกับ computePlayerStats
// (มีชื่อในผลงานนักเตะ หรือในประตู/แอสซิสต์/ใบ · ข้อมูลเก่าที่ไม่มี id เทียบด้วยชื่อ)
function playerLog(teamId, player, matches, teams) {
  const nm = (player.name || "").trim().toLowerCase();
  const isMe = (pid, name) => pid ? pid === player.id : !!nm && (name || "").trim().toLowerCase() === nm;
  const nameOf = id => { const t = teams.find(x => x.id === id); return t ? t.name : "—"; };
  return matches.filter(m => m.status === "done" && (m.home === teamId || m.away === teamId)).sort(byPlayOrder).reverse()
    .map(m => {
      const ev = (m.events || []).filter(e => String(e.teamId) === String(teamId));
      const count = type => ev.filter(e => e.type === type && isMe(e.playerId, e.player)).length;
      const G = count("goal"), Y = count("yellow"), R = count("red");
      const A = ev.filter(e => e.type === "goal" && (e.assistId || e.assist) && isMe(e.assistId, e.assist)).length;
      const pt = m.perf && m.perf[teamId];
      const played = !!pt && typeof pt === "object" && Object.prototype.hasOwnProperty.call(pt, player.id);
      if (!played && !G && !A && !Y && !R) return null;
      const home = m.home === teamId, gf = home ? m.hs : m.as, ga = home ? m.as : m.hs;
      return { m, home, gf, ga, opp: nameOf(home ? m.away : m.home), G, A, Y, R,
               motm: !!m.motm && String(m.motm.teamId) === String(teamId) && isMe(m.motm.playerId, m.motm.n) };
    }).filter(Boolean);
}

// onSetImage (เฉพาะแอดมิน/ผู้จัดการทีมนั้น) → ใส่/เปลี่ยน/ลบรูปการ์ดได้ตรงนี้เลย บันทึกทันที
function CardViewer({ p, team, slotPos, stats, matches, teams, onClose, onSetImage }) {
  const { images, putImage } = useContext(ImgContext);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const has = !!(p.img && images[p.img]);
  const who = p.name || slotPos || p.pos;
  const upload = async file => {
    setErr(""); setBusy(true);
    try { onSetImage(p.id, await putImage(await makeCardImage(file))); }
    catch (e) { setErr(e.message || "อัปโหลดรูปไม่สำเร็จ"); }
    finally { setBusy(false); }
  };
  const log = useMemo(() => playerLog(team.id, p, matches || [], teams || []), [team.id, p, matches, teams]);
  const s = stats || {};
  const G = s.G || 0, A = s.A || 0;
  // [ชื่อ, ค่า, เน้นสี]
  const facts = [["นัดที่ลงเล่น", s.apps || 0], ["ประตู", G, true], ["แอสซิสต์", A],
                 ["ยิง+แอส", G + A], ["MOTM", s.motm || 0], ["ใบเหลือง / แดง", (s.Y || 0) + " / " + (s.R || 0)]];
  const role = p.former ? "อดีตนักเตะ" : p.starter ? "ตัวจริง" + (slotPos ? " · ยืน " + slotPos : "") : p.starter === false ? "สำรอง" : "";
  const box = "rounded-lg bg-sunken px-2 py-2 text-center ring-1 ring-line/15";
  return (
    <Modal onClose={onClose} className="max-w-2xl">
      <ModalHead kicker={team.name + (role ? " · " + role : "")} title={p.name || "—"} onClose={onClose} />
      <div className="grid gap-5 sm:grid-cols-[192px_minmax(0,1fr)]">
        <div>
          <PlayerCard p={p} pos={slotPos || p.pos} kit={team.kit} className="mx-auto w-48" />
          {onSetImage && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <label className={"ef-btn ef-btn-primary inline-flex cursor-pointer items-center gap-2 px-4 py-1.5 text-xs " + (busy ? "pointer-events-none opacity-60" : "")}>
                <Ic n="image" size={13} /> {busy ? "กำลังใส่รูป…" : has ? "เปลี่ยนรูปการ์ด" : "ใส่รูปการ์ด"}
                <input type="file" accept="image/*" className="sr-only" disabled={busy} aria-label={(has ? "เปลี่ยนรูปการ์ด " : "ใส่รูปการ์ด ") + who}
                  onChange={e => { const f = e.target.files && e.target.files[0]; e.target.value = ""; if (f) upload(f); }} />
              </label>
              {has && !busy && (
                <button type="button" onClick={() => onSetImage(p.id, "")} aria-label={"ลบรูปการ์ด " + who}
                  className="ef-btn ef-btn-danger inline-flex items-center gap-2 px-4 py-1.5 text-xs transition-transform active:scale-[0.97]">
                  <Ic n="trash" size={12} /> ลบรูป
                </button>
              )}
            </div>
          )}
          {err && <div className="mt-2"><Note>{err}</Note></div>}
        </div>

        <div className="min-w-0">
          {/* ระดับการ์ด · OVR · ตำแหน่ง */}
          <div className="grid grid-cols-3 gap-2">
            <div className={box}>
              <div className="text-[10px] text-muted">ระดับการ์ด</div>
              <div className="mt-1.5 flex justify-center">{p.card ? <CardBadge card={p.card} /> : <span className="text-sm text-muted">–</span>}</div>
            </div>
            <div className={box}>
              <div className="text-[10px] text-muted">OVR</div>
              <div className="font-display text-2xl font-bold italic leading-tight text-accent">{p.ovr !== "" && p.ovr != null ? p.ovr : "–"}</div>
            </div>
            <div className={box}>
              <div className="text-[10px] text-muted">ตำแหน่ง</div>
              <div className="mt-1.5 flex justify-center">{p.pos ? <PosBadge pos={p.pos} /> : <span className="text-sm text-muted">–</span>}</div>
            </div>
          </div>
          {slotPos && p.pos && offPosition(p.pos, slotPos) && <p className="mt-2 text-center text-xs text-loss">เล่นนอกตำแหน่ง: ตำแหน่งจริง {p.pos} แต่ยืน {slotPos}</p>}

          {/* สถิติรวมทั้งฤดูกาล */}
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {facts.map(([l, v, hot]) => (
              <div key={l} className={box + " px-1"}>
                <div className="text-[10px] text-muted">{l}</div>
                <div className={"font-display text-lg font-bold italic " + (hot ? "text-accent" : "text-ink")}>{v}</div>
              </div>
            ))}
          </div>

          {/* ผลงานรายนัด (ใหม่สุดก่อน) */}
          <div className="mt-4">
            <div className={LABEL + " mb-1.5"}>ผลงานรายนัด</div>
            {log.length === 0 ? (
              <div className="rounded-lg bg-sunken px-3 py-3 text-center text-xs text-muted ring-1 ring-line/15">ยังไม่ได้ลงเล่น</div>
            ) : (
              <div className="divide-y divide-line/10 rounded-lg bg-sunken ring-1 ring-line/15">
                {log.map(x => (
                  <div key={x.m.id} className="flex items-center gap-2 px-3 py-1.5 text-xs tabular-nums">
                    <div className="min-w-0 flex-1 leading-tight">
                      <div className="truncate text-ink">{x.opp}</div>
                      <div className="text-[10px] text-muted">สัปดาห์ {x.m.round} · {x.home ? "เหย้า" : "เยือน"}</div>
                    </div>
                    <span className="shrink-0 font-display font-bold italic text-ink">{x.gf}-{x.ga}</span>
                    <FormPill r={x.gf > x.ga ? "W" : x.gf < x.ga ? "L" : "D"} />
                    <span className="flex min-w-[2.5rem] shrink-0 items-center justify-end gap-1 text-[11px]">
                      {x.G > 0 && <span title={"ยิง " + x.G + " ประตู"}>⚽{x.G > 1 ? x.G : ""}</span>}
                      {x.A > 0 && <span title={"แอสซิสต์ " + x.A} className="font-semibold text-link">A{x.A > 1 ? x.A : ""}</span>}
                      {x.Y > 0 && <span title="ใบเหลือง">🟨</span>}
                      {x.R > 0 && <span title="ใบแดง">🟥</span>}
                      {x.motm && <span title="ผู้เล่นยอดเยี่ยม (MOTM)" className="text-accent">★</span>}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {efhubHref(p.efhub) && (
            <a href={efhubHref(p.efhub)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-link hover:underline">ดูการ์ดใน EFHUB ↗</a>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════ TEAM PROFILE ══════════════════════════ */

function TeamProfile({ team, rank, row, matches, teams, statsByKey, canEditTeam, canEditSquad, onEdit, onSquad, onSetImage, onClose }) {
  const tier = tierOf(rank, row);
  const r = row || { P:0, W:0, D:0, L:0, GF:0, GA:0, GD:0, PTS:0, form:[] };
  const squad = withSquad(team).players;
  const mine = matches.filter(m => m.home === team.id || m.away === team.id).sort(byPlayOrder);
  const nameOf = id => { const t = teams.find(x => x.id === id); return t ? t.name : "—"; };
  // ผลงานแยกตามแผนที่ใช้จริงในแต่ละนัด (บันทึกตอนกรอกผล)
  const formStats = {};
  mine.forEach(m => {
    const k = m.status === "done" && m.formations && m.formations[team.id];
    if (!k) return;
    const home = m.home === team.id, gf = home ? m.hs : m.as, ga = home ? m.as : m.hs;
    const s = formStats[k] || (formStats[k] = { P: 0, W: 0, D: 0, L: 0 });
    s.P++; if (gf > ga) s.W++; else if (gf < ga) s.L++; else s.D++;
  });
  const record = [["แข่ง", r.P], ["ชนะ", r.W], ["เสมอ", r.D], ["แพ้", r.L], ["ได้", r.GF], ["เสีย", r.GA], ["ผลต่าง", r.GD], ["แต้ม", r.PTS]];
  const tone = (l, v) => l === "แต้ม" ? "text-accent" : l !== "ผลต่าง" ? "text-ink" : v > 0 ? "text-win" : v < 0 ? "text-loss" : "text-ink";
  const st = p => statsByKey[team.id + "|" + p.id];
  // ตัวจริงแสดงเป็นการ์ดเมื่อมีรูปอย่างน้อย 1 ใบ (กดสลับเป็นรายชื่อได้)
  const { images } = useContext(ImgContext);
  const t = withSquad(team);
  const withImg = t.lineup.filter(id => { const p = t.players.find(x => x.id === id); return p && p.img && images[p.img]; }).length;
  const hasCards = withImg > 0;
  const [view, setView] = useState(null);
  const shown = view || (hasCards ? "cards" : "names");
  // เก็บแค่ id → หน้าดูการ์ดใช้ข้อมูลล่าสุดเสมอ (ใส่รูปแล้วเห็นทันที)
  const [viewing, setViewing] = useState(null);
  const vp = viewing && t.players.find(x => x.id === viewing.id);
  const openPlayer = p => setViewing({ id: p.id, pos: slotOf(team, p.id) });
  // แถวนักเตะที่มีชื่อ → กดเพื่อดูการ์ด + สถิติ + ผลงานรายนัด
  // จอแคบ (มือถือ): ตารางปัดซ้าย-ขวาได้ โดยช่องนักเตะ (PIN) ค้างอยู่ทางซ้าย · จอกว้างเห็นครบไม่ต้องปัด
  // ป้ายประเภทการ์ดอยู่บรรทัดล่างใต้ชื่อ → ไม่ล้นไปทับช่อง OVR
  const ROW = "grid grid-cols-[minmax(186px,1fr)_36px_repeat(3,34px)] items-center gap-1.5 pr-3";
  const PIN = "sticky left-0 z-[1] border-r border-line/10 bg-sunken sm:border-r-0";
  const anyImg = squad.some(p => p.img && images[p.img]);
  const playerRow = p => {
    const s = st(p);
    const tap = p.name ? { role: "button", tabIndex: 0, "aria-label": "ดูข้อมูลนักเตะ " + p.name, onClick: () => openPlayer(p),
      onKeyDown: e => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPlayer(p); } } } : {};
    return (
      <div key={p.id} {...tap} className={ROW + " group py-1 text-sm tabular-nums " +
        (p.name ? "cursor-pointer outline-none transition hover:bg-line/[0.07] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" : "")}>
        <span className={PIN + " flex min-w-0 items-center gap-2 self-stretch py-0.5 pl-3 transition " +
          (p.name ? "group-hover:shadow-[inset_0_0_0_999px_rgb(var(--line)/0.07)]" : "")}>
          <PosBadge pos={p.pos} />
          {p.img && images[p.img]
            ? <img src={images[p.img]} alt="" className="h-9 w-[26px] shrink-0 rounded-sm object-cover object-top ring-1 ring-white/20" />
            : anyImg && <span className="w-[26px] shrink-0" />}
          <span className="min-w-0">
            <span className={"block truncate leading-tight " + (p.name ? "text-ink" : "text-faint")}>{p.name || "ยังไม่ใส่ชื่อ"}</span>
            {p.name && (p.card || efhubHref(p.efhub)) && (
              <span className="mt-1 flex items-center gap-1.5">
                <CardBadge card={p.card} />
                <EfhubLink url={p.efhub} name={p.name} />
              </span>
            )}
          </span>
        </span>
        <span className="text-center font-display text-xs font-bold italic text-ink">{p.ovr === "" || p.ovr == null ? "–" : p.ovr}</span>
        <span className="text-center text-xs text-soft">{s ? s.apps : 0}</span>
        <span className="text-center text-xs font-semibold text-accent">{s ? s.G : 0}</span>
        <span className="text-center text-xs text-soft">{s ? s.A : 0}</span>
      </div>
    );
  };
  const head = (
    <div className={ROW + " pb-1 pt-2 text-[10px] text-muted"}>
      <span className={PIN + " self-stretch"} /><span className="text-center">OVR</span><span className="text-center">นัด</span><span className="text-center">ประตู</span><span className="text-center">แอส</span>
    </div>
  );

  return (
    <Modal onClose={onClose} className="max-w-4xl">
      <ModalHead kicker={team.club + " · โดย " + (team.owner || "—")} title={team.name} onClose={onClose} />

      <div className="grid gap-5 sm:grid-cols-[168px_1fr]">
        <div className={"fl-frame fl-tier-" + tier + " mx-auto w-36 rounded-xl p-[2px] sm:mx-0 sm:w-full"}>
          <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-[10px]" style={cardBg(team.kit)}>
            <Crest team={team} className="h-24 w-auto drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]" />
            <div className="fl-tier-label font-display text-sm font-bold italic">{r.P ? "อันดับ " + rank : "ยังไม่ได้แข่ง"}</div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-2">
            {record.map(([l, v]) => (
              <div key={l} className="rounded-lg bg-sunken px-3 py-2.5 ring-1 ring-line/15">
                <div className={LABEL}>{l}</div>
                <div className={"font-display text-xl font-bold italic " + tone(l, v)}>{l === "ผลต่าง" && v > 0 ? "+" : ""}<CountUp value={v} /></div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={LABEL}>ฟอร์ม 5 นัดล่าสุด</span>
            <div className="flex gap-1">
              {r.form.length ? r.form.slice(-5).map((f, k) => <FormPill key={k} r={f} />) : <span className="text-xs text-muted">—</span>}
            </div>
          </div>
          {(canEditTeam || canEditSquad) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {canEditSquad && <Btn variant="primary" onClick={() => onSquad(team)}><Ic n="shirt" size={14} /> แก้รายชื่อนักเตะ</Btn>}
              {canEditTeam && <Btn onClick={() => onEdit(team)}><Ic n="pencil" size={13} /> แก้ทีม</Btn>}
            </div>
          )}
        </div>
      </div>

      {/* ═══ ตัวจริง 11 คน: การ์ด / รายชื่อ ═══ */}
      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-base font-semibold italic text-ink">ตัวจริง 11 คน · แผน {t.formation}</span>
          <div className="flex gap-1 rounded-lg bg-sunken p-1 ring-1 ring-line/15" role="group" aria-label="รูปแบบการแสดงตัวจริง">
            {[["cards", "การ์ด"], ["names", "รายชื่อ"]].map(([k, l]) => (
              <button key={k} type="button" onClick={() => setView(k)} aria-pressed={shown === k}
                className={"ef-btn ef-tab px-3 py-1 text-xs " + (shown === k ? "ef-tab-on" : "")}>{l}</button>
            ))}
          </div>
        </div>
        <div className={"mx-auto " + (shown === "cards" ? "max-w-[520px]" : "max-w-[380px]")}>
          <Pitch team={team} cards={shown === "cards"} onCard={(p, pos) => setViewing({ id: p.id, pos })} />
          {onSetImage ? (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-accent">
              <Ic n="image" size={13} /> แตะนักเตะบนสนามเพื่อใส่รูปการ์ด · มีรูปแล้ว {withImg}/11
            </p>
          ) : shown === "cards" && !hasCards && (
            <p className="mt-2 text-center text-xs text-muted">ยังไม่มีรูปการ์ด</p>
          )}
          {Object.keys(formStats).length > 0 && (
            <div className="mt-3 rounded-xl bg-sunken p-3 ring-1 ring-line/15">
              <div className={LABEL + " mb-2"}>ผลงานตามแผนที่ใช้</div>
              <div className="space-y-1.5">
                {Object.entries(formStats).sort((a, b) => b[1].P - a[1].P).map(([k, s]) => (
                  <div key={k} className="flex items-center gap-2 text-xs tabular-nums">
                    <span className="w-16 shrink-0 font-display text-sm font-bold italic text-accent">{k}</span>
                    <span className="text-soft">{s.P} นัด</span>
                    <span className="ml-auto text-win">ชนะ {s.W}</span>
                    <span className="text-muted">เสมอ {s.D}</span>
                    <span className="text-loss">แพ้ {s.L}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {vp && (
        <CardViewer p={vp} team={team} slotPos={viewing.pos} stats={statsByKey[team.id + "|" + vp.id]}
          matches={matches} teams={teams} onSetImage={onSetImage} onClose={() => setViewing(null)} />
      )}

      <div className="mt-6">
        <div>
          <SubHead>รายชื่อนักเตะ ({namedPlayers(team).length}/23)</SubHead>
          <p className="-mt-2 mb-2 text-xs text-muted">กดที่นักเตะเพื่อดูการ์ด สถิติ และผลงานรายนัด<span className="sm:hidden"> · ปัดตารางซ้าย-ขวาเพื่อดูตัวเลข</span></p>
          <div className="overflow-x-auto rounded-xl bg-sunken ring-1 ring-line/15">
            <div className="min-w-[366px]">
              {head}
              <div className="sticky left-0 w-fit px-3 pt-1 text-[11px] font-semibold text-accent">ตัวจริง</div>
              {squad.filter(p => p.starter).map(playerRow)}
              <div className="mt-1 border-t border-line/10 pt-2">
                <div className="sticky left-0 w-fit px-3 text-[11px] font-semibold text-soft">สำรอง</div>
              </div>
              {squad.filter(p => !p.starter).map(playerRow)}
              <div className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SubHead>โปรแกรมและผล</SubHead>
        {mine.length === 0 ? <div className="text-sm text-muted">ยังไม่มีโปรแกรม</div> : (
          <div className="divide-y divide-line/10 rounded-xl bg-sunken ring-1 ring-line/15">
            {mine.map(m => {
              const home = m.home === team.id, done = m.status === "done";
              const gf = home ? m.hs : m.as, ga = home ? m.as : m.hs;
              return (
                <div key={m.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="w-16 shrink-0 text-[11px] text-muted">สัปดาห์ {m.round}</span>
                  <span className="w-9 shrink-0 text-[11px] text-muted">{home ? "เหย้า" : "เยือน"}</span>
                  <span className="min-w-0 flex-1 truncate text-ink">{nameOf(home ? m.away : m.home)}</span>
                  {done && m.formations && m.formations[team.id] && (
                    <span className="hidden shrink-0 font-display text-[11px] font-bold italic text-accent sm:inline">{m.formations[team.id]}</span>
                  )}
                  {done ? (
                    <>
                      <span className="font-display font-bold italic text-ink">{gf}-{ga}</span>
                      <FormPill r={gf > ga ? "W" : gf < ga ? "L" : "D"} />
                    </>
                  ) : <span className="shrink-0 text-xs text-muted">{fmtDay(m)}</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ══════════════════════════ MATCH MODAL (แอดมิน: เพิ่มนัดเอง / แก้นัดที่ยังไม่แข่ง) ══════════════════════════ */
// เลือกคู่แข่งเองได้ (ไม่สุ่ม) · เตือนถ้าทีมมีนัดในสัปดาห์นั้นแล้ว หรือคู่นี้เคยจัดไว้แล้ว (ยังบันทึกได้ เช่น นัดเหย้า-เยือน)
function MatchModal({ match, teams, matches, onClose, onSave, onDelete }) {
  const isNew = !match.id;
  const others = matches.filter(m => m.id !== match.id);
  const inRound = r => others.filter(m => m.round === r);
  const [f, setF] = useState(() => {
    const r = match.round || (matches.length ? Math.max(...matches.map(m => m.round)) : 1);
    const ref = inRound(r)[0];
    return { round: r, home: match.home || "", away: match.away || "",
             date: match.date || (ref && ref.date) || isoDate(new Date()),
             time: match.time ? timeOf(match) : ref ? timeOf(ref) : "20:00" };
  });
  const set = (k, v) => setF({ ...f, [k]: v });
  const nameOf = id => { const t = teams.find(x => x.id === id); return t ? t.name : ""; };
  const busy = id => !!id && inRound(f.round).some(m => m.home === id || m.away === id);
  const dup = f.home && f.away ? others.filter(m => (m.home === f.home && m.away === f.away) || (m.home === f.away && m.away === f.home)).length : 0;
  const err = !f.home || !f.away ? "เลือกทีมเหย้าและทีมเยือน"
    : f.home === f.away ? "ทีมเหย้ากับทีมเยือนต้องเป็นคนละทีม"
    : !f.date || !f.time ? "ใส่วันที่และเวลาเตะ" : "";
  const warns = [
    busy(f.home) && nameOf(f.home) + " มีนัดในสัปดาห์ที่ " + f.round + " แล้ว",
    busy(f.away) && nameOf(f.away) + " มีนัดในสัปดาห์ที่ " + f.round + " แล้ว",
    dup > 0 && "สองทีมนี้เจอกันในโปรแกรมแล้ว " + dup + " นัด",
  ].filter(Boolean);
  const teamSelect = (k, label) => (
    <Field label={label}>
      <select value={f[k] || ""} onChange={e => set(k, e.target.value ? +e.target.value : "")} aria-label={label} className={INPUT}>
        <option value="">— เลือกทีม —</option>
        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    </Field>
  );
  return (
    <Modal onClose={onClose}>
      <ModalHead kicker={isNew ? "แอดมิน · เลือกคู่เอง" : "สัปดาห์ที่ " + match.round} title={isNew ? "เพิ่มนัดแข่ง" : "แก้นัดแข่ง"} onClose={onClose} />
      {f.home && f.away && f.home !== f.away && (
        <div className="mb-4 truncate text-center font-display font-semibold italic text-ink">
          {nameOf(f.home)} <span className="text-accent">VS</span> {nameOf(f.away)}
        </div>
      )}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {teamSelect("home", "ทีมเหย้า")}
          {teamSelect("away", "ทีมเยือน")}
        </div>
        <div className="grid grid-cols-[84px_1fr_1fr] gap-3">
          <Field label="สัปดาห์ที่">
            <input type="number" min="1" max="99" value={f.round} aria-label="สัปดาห์ที่"
              onChange={e => set("round", Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1)))} className={INPUT} />
          </Field>
          <Field label="วันที่"><input type="date" value={f.date} onChange={e => set("date", e.target.value)} aria-label="วันที่" className={INPUT} /></Field>
          <Field label="เวลาเตะ"><input type="time" value={f.time} onChange={e => set("time", e.target.value)} aria-label="เวลาเตะ" className={INPUT} /></Field>
        </div>
        {warns.map(w => <Note key={w} kind="warn">{w}</Note>)}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>{!isNew && <Btn variant="danger" onClick={() => onDelete(match.id)}><Ic n="trash" size={14} /> ลบนัดนี้</Btn>}</div>
        <div className="flex gap-2">
          <Btn onClick={onClose}>ยกเลิก</Btn>
          <Btn variant="primary" disabled={!!err} title={err || undefined}
            onClick={() => onSave({ id: match.id, round: f.round, home: f.home, away: f.away, date: f.date, time: f.time })}>
            <Ic n="check" size={15} /> {isNew ? "เพิ่มนัด" : "บันทึก"}
          </Btn>
        </div>
      </div>
      {err && (f.home || f.away) && <p className="mt-2 text-right text-xs text-muted">{err}</p>}
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
        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-sunken p-3 ring-1 ring-line/15">
          <input type="checkbox" checked={o.double} onChange={e => set("double", e.target.checked)} className="h-4 w-4 accent-[#FFDE2E]" />
          <span className="text-sm text-ink">เหย้า–เยือน <span className="text-muted">(เจอกัน 2 รอบ)</span></span>
        </label>
      </div>

      <div className="mt-5 rounded-lg bg-accent/10 p-4 text-sm ring-1 ring-accent/25">
        {n < 2 ? <span className="text-soft">ต้องมีอย่างน้อย 2 ทีม</span> : (
          <>
            <span className="font-medium text-ink">{n} ทีม</span> <span className="text-muted">→</span>{" "}
            <span className="font-semibold text-accent">{rounds} สัปดาห์ · {games} นัด</span>
            {n % 2 === 1 && <div className="mt-1 text-xs text-muted">จำนวนทีมเป็นเลขคี่ แต่ละสัปดาห์จะมี 1 ทีมได้พัก</div>}
          </>
        )}
      </div>
      {matchCount > 0 && (
        <div className="mt-3 rounded-lg bg-loss/10 p-3 text-xs leading-relaxed text-loss ring-1 ring-loss/30">
          โปรแกรมเดิม {matchCount} นัด{doneCount ? " (มีผลแล้ว " + doneCount + " นัด)" : ""} จะถูกแทนที่ทั้งหมด รวมผลงานนักเตะในนัดเหล่านั้น · อยากเก็บไว้ก่อน กด Export JSON ที่ท้ายหน้า
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
      <img src={url} alt="ภาพตารางคะแนน" className="w-full rounded-xl ring-1 ring-line/20" />
      <div className="mt-5 flex justify-end gap-3">
        <Btn onClick={download}><Ic n="download" size={14} /> บันทึกรูป</Btn>
        {canShare && <Btn variant="primary" onClick={share}><Ic n="share" size={14} /> แชร์</Btn>}
      </div>
    </Modal>
  );
}

/* ══════════════════════════ PLAYER STATS TAB ══════════════════════════ */
const PLAYER_SORTS = {
  G:    { label: "ดาวซัลโว",    fn: (a, b) => b.G - a.G || b.A - a.A || a.name.localeCompare(b.name), keep: s => s.G > 0 },
  A:    { label: "แอสซิสต์",    fn: (a, b) => b.A - a.A || b.G - a.G || a.name.localeCompare(b.name), keep: s => s.A > 0 },
  motm: { label: "MOTM",       fn: (a, b) => b.motm - a.motm || b.apps - a.apps || a.name.localeCompare(b.name), keep: s => s.motm > 0 },
};

// imageSetter(team) → ฟังก์ชันใส่รูปการ์ด ถ้าคนที่ล็อกอินแก้ทีมนั้นได้ (ไม่งั้น null)
function PlayersTab({ stats, matches, teams, imageSetter }) {
  const [sort, setSort] = useState("G");
  const rows = useMemo(() => stats.filter(PLAYER_SORTS[sort].keep).sort(PLAYER_SORTS[sort].fn), [stats, sort]);
  const hi = k => k === sort ? "text-accent" : "";
  // กดแถว → หน้าข้อมูลนักเตะ (หาจาก stats ทุกครั้ง → ข้อมูลล่าสุดเสมอ)
  // อดีตนักเตะ / ข้อมูลเก่าที่มีแค่ชื่อ → ใช้ข้อมูลจากสถิติแทน (ใส่รูปไม่ได้)
  const [openKey, setOpenKey] = useState(null);
  const cur = openKey && stats.find(s => s.key === openKey);
  const live = cur && cur.team && !cur.former && cur.playerId ? (cur.team.players || []).find(p => p.id === cur.playerId) : null;
  const curP = live || (cur && { id: cur.playerId || cur.key, name: cur.name, pos: cur.pos, card: cur.card, ovr: cur.ovr, efhub: cur.efhub, img: "", former: cur.former });
  const open = s => setOpenKey(s.key);
  return (
    <div className="fl-enter">
      <SectionTitle icon="target" kicker="Player Stats" title="สถิตินักเตะ" />
      <Segmented value={sort} onChange={setSort} items={Object.entries(PLAYER_SORTS).map(([k, v]) => [k, v.label])} />
      <Card className="overflow-x-auto">
        <div className="min-w-[576px]">
          <div className="grid grid-cols-[40px_1fr_repeat(6,44px)] gap-2 border-b border-line/15 px-4 py-3 text-[11px] font-semibold text-muted">
            <div>#</div><div>นักเตะ</div>
            <div className="text-center">นัด</div>
            <div className={"text-center " + hi("G")}>G</div>
            <div className={"text-center " + hi("A")}>A</div>
            <div className={"text-center " + hi("motm")}>MOTM</div>
            <div className="text-center">🟨</div>
            <div className="text-center">🟥</div>
          </div>
          {rows.length === 0 && <div className="py-12 text-center text-sm text-muted">ยังไม่มีข้อมูล</div>}
          {rows.map((s, i) => (
            <div key={s.key} role="button" tabIndex={0} aria-label={"ดูข้อมูลนักเตะ " + s.name} onClick={() => open(s)}
              onKeyDown={e => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(s); } }}
              className={"grid cursor-pointer grid-cols-[40px_1fr_repeat(6,44px)] items-center gap-2 px-4 py-3 text-sm tabular-nums outline-none transition hover:bg-line/[0.05] focus-visible:bg-line/[0.08] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent " + (i < rows.length - 1 ? "border-b border-line/10" : "")}>
              <div className={"font-display text-base font-bold italic " + (i === 0 ? "text-accent" : "text-faint")}>{i === 0 ? "★" : i + 1}</div>
              <div className="flex min-w-0 items-center gap-2.5">
                {s.pos ? <PosBadge pos={s.pos} /> : <span className="ef-pos bg-line/15 text-muted">—</span>}
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate font-medium text-ink">{s.name}{s.former && <span className="text-xs font-normal text-muted"> (อดีต)</span>}</span>
                    {!s.former && <CardBadge card={s.card} />}
                    {!s.former && <EfhubLink url={s.efhub} name={s.name} />}
                  </div>
                  <div className="truncate text-[11px] text-muted">{s.team ? s.team.name : "—"}{!s.former && s.ovr !== "" && s.ovr != null ? " · OVR " + s.ovr : ""}</div>
                </div>
              </div>
              <div className="text-center text-soft">{s.apps}</div>
              <div className="text-center font-display text-lg font-bold italic"><Hl>{s.G}</Hl></div>
              <div className="text-center text-soft">{s.A}</div>
              <div className="text-center text-soft">{s.motm || "–"}</div>
              <div className="text-center text-muted">{s.Y || "–"}</div>
              <div className="text-center text-muted">{s.R || "–"}</div>
            </div>
          ))}
        </div>
      </Card>
      <p className="ef-halo mt-3 text-xs text-muted">กดที่นักเตะเพื่อดูการ์ดและผลงานรายนัด · นัด = ลงเล่น · MOTM = ผู้เล่นยอดเยี่ยมประจำนัด</p>
      {cur && cur.team && (
        <CardViewer p={curP} team={cur.team} slotPos={live ? slotOf(cur.team, live.id) : null} stats={cur} matches={matches} teams={teams}
          onSetImage={live && imageSetter ? imageSetter(cur.team) : null} onClose={() => setOpenKey(null)} />
      )}
    </div>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════ */
function FriendsLeague() {
  // CLOUD: ข้อมูลมาจาก Firestore (เริ่มว่าง รอโหลด) · ไม่งั้นเก็บในเบราว์เซอร์ (ครั้งแรก = ข้อมูลตัวอย่าง)
  const [teams, setTeams]     = useState(() => CLOUD ? [] : load("fl_teams", SEED_TEAMS).map(withSquad));
  const [matches, setMatches] = useState(() => CLOUD ? [] : load("fl_matches", SEED_MATCHES));
  const [users, setUsers]     = useState(() => CLOUD ? [] : load("fl_users", []));
  const [session, setSession] = useState(() => { if (CLOUD) return null; const s = load("fl_session", null); return s && s.exp > Date.now() ? s : null; });
  const [tab, setTab]         = useState("home");
  const [showLogin, setShowLogin]     = useState(false);
  const [showSignup, setShowSignup]   = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [editMatch, setEditMatch]     = useState(null);
  const [teamModal, setTeamModal]     = useState(null);
  const [squadTeamId, setSquadTeamId] = useState(null);
  const [profileId, setProfileId]     = useState(null);
  const [matchEdit, setMatchEdit]     = useState(null);   // {} = เพิ่มนัดใหม่ · match = แก้นัด
  const [fixtureOpen, setFixtureOpen]     = useState(false);
  const [shareBlob, setShareBlob]   = useState(null);
  const [sharing, setSharing]       = useState(false);

  /* ── รูปการ์ดนักเตะ: แคชใน IndexedDB · CLOUD เก็บตัวจริงที่ images/{id} บน Firestore ── */
  const [images, setImages] = useState({});
  const imagesRef = useRef(images);
  imagesRef.current = images;
  // เปิดแอป: โหลดรูปที่เก็บไว้ในเครื่อง · โหมดเครื่องเดียว: ลบรูปที่ไม่มีนักเตะคนไหนใช้แล้ว (เช่น อัปโหลดแล้วไม่ได้กดบันทึก)
  // (CLOUD ไม่ลบ เพราะตอนเปิดแอปยังไม่รู้ว่าทีมใช้รูปไหน — รูปในเครื่องเป็นแค่แคช)
  const imgBoot = useRef(null);
  useEffect(() => {
    imgBoot.current = ImgDB.all().then(m => {
      if (!CLOUD) {
        const used = new Set();
        teams.forEach(t => (t.players || []).forEach(p => { if (p.img) used.add(p.img); }));
        const orphan = Object.keys(m).filter(id => !used.has(id));
        if (orphan.length) ImgDB.del(orphan).catch(() => {});
        orphan.forEach(id => { delete m[id]; });
      }
      imagesRef.current = { ...m, ...imagesRef.current };
      setImages(prev => ({ ...m, ...prev }));
    }).catch(() => {});
  }, []);
  // รับเฉพาะ data:image ที่ถูกรูปแบบ ไม่เกิน 400KB ต่อใบ (มาจากไฟล์ import / Firestore)
  const okImage = (id, data) => IMG_ID_RE.test(id) && typeof data === "string" && data.length < 400000 && IMG_DATA_RE.test(data);
  const absorbImages = map => {
    if (!map || typeof map !== "object") return;
    const add = {};
    Object.entries(map).forEach(([id, data]) => { if (okImage(id, data) && !imagesRef.current[id]) add[id] = data; });
    if (!Object.keys(add).length) return;
    Object.entries(add).forEach(([id, data]) => ImgDB.put(id, data).catch(() => {}));
    imagesRef.current = { ...imagesRef.current, ...add };
    setImages(prev => ({ ...prev, ...add }));
  };
  // CLOUD: ส่งรูปขึ้น Firestore · มีรูปนี้อยู่แล้วก็ข้าม (id มาจาก hash ของรูป = รูปเดียวกัน · กฎไม่ให้เขียนทับ)
  // เช็กก่อนส่ง → ถ้าส่งไม่ผ่านจริงจะแจ้งเตือน (ไม่เงียบหาย)
  const uploadImages = map => {
    if (!CLOUD || !Cloud.db || !map) return;
    Object.entries(map).forEach(([id, data]) => {
      if (!okImage(id, data)) return;
      const ref = Cloud.db.collection("images").doc(id);
      ref.get().catch(() => null).then(s => {
        if (s && s.exists) return;
        return ref.set({ data, at: Date.now() }).catch(failed);
      });
    });
  };
  const putImage = async data => {
    const id = imageId(data);
    try { await ImgDB.put(id, data); } catch (e) {}   // ไม่มี IndexedDB → ใช้ได้จนกว่าจะรีโหลด
    imagesRef.current = { ...imagesRef.current, [id]: data };
    setImages(prev => prev[id] ? prev : { ...prev, [id]: data });
    uploadImages({ [id]: data });
    return id;
  };
  // รูปที่นักเตะในข้อมูลชุดนี้ใช้อยู่ → แนบไปกับไฟล์ Export
  const usedImages = teamList => {
    const out = {};
    teamList.forEach(t => (t.players || []).forEach(p => { if (p.img && imagesRef.current[p.img]) out[p.img] = imagesRef.current[p.img]; }));
    return out;
  };
  // CLOUD: ทีมอ้างรูปที่เครื่องนี้ยังไม่มี → ดึงจาก Firestore ทีละรูป (ครั้งเดียว แล้วเก็บแคชไว้ในเครื่อง)
  const askedImg = useRef(new Set());
  useEffect(() => {
    if (!CLOUD || !Cloud.db || !imgBoot.current) return;
    imgBoot.current.then(() => teams.forEach(t => (t.players || []).forEach(p => {
      const id = p.img;
      if (!id || imagesRef.current[id] || askedImg.current.has(id) || !IMG_ID_RE.test(id)) return;
      askedImg.current.add(id);
      Cloud.db.collection("images").doc(id).get()
        .then(s => { if (s.exists) absorbImages({ [id]: (s.data() || {}).data }); })
        .catch(() => askedImg.current.delete(id));
    })));
  }, [teams]);

  useEffect(() => { if (!CLOUD) save("fl_teams", teams); }, [teams]);
  useEffect(() => { if (!CLOUD) save("fl_matches", matches); }, [matches]);
  useEffect(() => { if (!CLOUD) save("fl_users", users); }, [users]);
  useEffect(() => {
    if (CLOUD) return;
    if (session) save("fl_session", session);
    else try { localStorage.removeItem("fl_session"); } catch (e) {}
  }, [session]);

  /* ── CLOUD: Firestore → state (อัปเดตสด) ──
     server = ข้อมูลล่าสุดจากเซิร์ฟเวอร์ ไว้เทียบว่าเครื่องนี้แก้อะไร · null = ยังไม่ได้โหลด → ห้ามเขียน */
  const [authUid, setAuthUid]   = useState(null);
  const [owner, setOwner]       = useState(undefined);   // undefined = ยังไม่รู้ · null = ยังไม่มีแอดมิน · { uid }
  const [cloudOk, setCloudOk]   = useState({ teams: !CLOUD, matches: !CLOUD });
  const [cloudErr, setCloudErr] = useState("");
  const [noRole, setNoRole]     = useState(false);       // ล็อกอินแล้ว แต่ไม่มีบัญชีในลีก (ถูกลบ / ยังไม่ได้เพิ่ม)
  const [online, setOnline]     = useState(() => navigator.onLine !== false);
  // เปิดให้ผู้จัดการทีมสมัครเองไหม (แอดมินเปิด/ปิด) · CLOUD: meta/settings · null = ยังไม่รู้ / อ่านไม่ได้ (กฎ Firebase รุ่นเก่า)
  const [signup, setSignup]     = useState(() => CLOUD ? null : load("fl_settings", {}).signup !== false);
  useEffect(() => { if (!CLOUD) save("fl_settings", { signup }); }, [signup]);
  const server     = useRef({ teams: null, matches: null, users: null });
  const ownerRef   = useRef(owner);
  const settingUp  = useRef(false);
  const afterLogin = useRef(false);
  ownerRef.current = owner;
  const failed = e => setCloudErr(cloudError(e));
  // อ่านข้อมูลลีกไม่ได้เลย (เช่น ยังไม่ได้วางกฎ firestore.rules / เน็ตหลุดตอนโหลด) → ค้างข้อความไว้บนหน้า
  const [bootErr, setBootErr] = useState("");
  const bootFail = e => setBootErr(e && e.code === "permission-denied"
    ? "อ่านข้อมูลลีกไม่ได้ — ตรวจว่าวางกฎจากไฟล์ firestore.rules ใน Firebase แล้ว (ดู README)" : cloudError(e));

  useEffect(() => {
    if (!CLOUD) return;
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    let alive = true;
    const stops = [];
    Cloud.init().then(() => {
      if (!alive) return;
      const db = Cloud.db, meta = { includeMetadataChanges: true };
      stops.push(db.doc("meta/owner").onSnapshot(meta, s => {
        if (!s.exists && s.metadata.fromCache) return;   // แคชยังไม่มี ≠ ไม่มีแอดมิน → รอคำตอบจากเซิร์ฟเวอร์
        setOwner(s.exists ? s.data() : null);
      }, bootFail));
      // ยังไม่เคยตั้ง = เปิดรับสมัคร · อ่านไม่ได้ = ยังไม่ได้วางกฎ firestore.rules รุ่นใหม่ → ซ่อนปุ่มสมัคร
      stops.push(db.doc("meta/settings").onSnapshot(meta, s => {
        if (!s.exists && s.metadata.fromCache) return;
        setSignup(s.exists ? (s.data() || {}).signup !== false : true);
      }, () => setSignup(null)));
      const watch = (name, set) => db.collection(name).onSnapshot(meta, s => {
        if (s.empty && s.metadata.fromCache) return;
        let list = s.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
        if (name === "teams") list = list.map(withSquad);
        server.current[name] = new Map(list.map(x => [String(x.id), x]));
        set(list);
        setCloudOk(r => r[name] ? r : { ...r, [name]: true });
      }, bootFail);
      stops.push(watch("teams", setTeams), watch("matches", setMatches));
      stops.push(Cloud.auth.onAuthStateChanged(u => setAuthUid(u ? u.uid : null)));
    }).catch(e => alive && bootFail(e));
    return () => { alive = false; stops.forEach(f => f()); window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // บัญชีของฉัน (users/{uid}) → แอดมินฟังรายชื่อบัญชีทั้งหมดต่อ · คนอื่นเห็นแค่บัญชีตัวเอง (กฎให้อ่านเท่านี้)
  useEffect(() => {
    if (!CLOUD) return;
    let stopList = null;
    const clear = () => { if (stopList) { stopList(); stopList = null; } server.current.users = null; setUsers([]); };
    if (!authUid) { clear(); setNoRole(false); return; }
    const db = Cloud.db;
    // ออกจากระบบแล้ว (ตัวฟังยังไม่ทันปิด) → อ่านไม่ผ่านเป็นเรื่องปกติ ไม่ต้องเตือน
    const mine = e => { const cur = Cloud.auth.currentUser; if (cur && cur.uid === authUid) failed(e); };
    const stopMe = db.doc("users/" + authUid).onSnapshot({ includeMetadataChanges: true }, s => {
      if (!s.exists && s.metadata.fromCache) return;
      if (!s.exists) {
        clear();
        if (settingUp.current) return;
        // เจ้าของลีกที่ตั้งค่าค้างกลางทาง (เน็ตหลุดหลังสร้างบัญชี) → สร้างข้อมูลบัญชีแอดมินต่อให้
        const me = Cloud.auth.currentUser, own = ownerRef.current;
        if (me && own && own.uid === authUid) {
          const name = (me.email || "").split("@")[0];
          db.doc("users/" + authUid).set({ name, username: name, role: "admin", teamId: null, at: Date.now() }).catch(failed);
        } else setNoRole(true);
        return;
      }
      setNoRole(false);
      const me = { ...s.data(), id: s.id }, admin = me.role === "admin";
      if (!admin && stopList) { stopList(); stopList = null; }
      if (!stopList) {   // ยังไม่ได้ฟังรายชื่อทั้งหมด → เห็นบัญชีตัวเองไปก่อน
        server.current.users = new Map([[me.id, me]]);
        setUsers(prev => prev.length === 1 && stable(prev[0]) === stable(me) ? prev : [me]);
      }
      // แอดมิน: รอเซิร์ฟเวอร์บันทึกบัญชีนี้ก่อน (เพิ่งตั้งค่าแอดมิน) ไม่งั้นกฎยังไม่รู้ว่าเป็นแอดมิน → อ่านรายชื่อไม่ผ่าน
      if (!admin || stopList || s.metadata.hasPendingWrites) return;
      stopList = db.collection("users").onSnapshot(q => {
        const list = q.docs.map(d => ({ ...d.data(), id: d.id })).sort((a, b) => (a.at || 0) - (b.at || 0));
        server.current.users = new Map(list.map(u => [u.id, u]));
        setUsers(list);
      }, mine);
    }, mine);
    return () => { stopMe(); clear(); };
  }, [authUid]);

  /* ── CLOUD: state → Firestore ──
     ส่งเฉพาะเอกสาร/ช่องที่เครื่องนี้แก้ (เทียบกับ server) · เขียนไม่ผ่านกฎ → Firestore ย้อนกลับเอง + แจ้งเตือน
     ผู้ชมที่ไม่ได้ล็อกอินไม่เขียนอะไรเลย */
  const uid  = CLOUD ? authUid : session && session.uid;
  const user = (uid && users.find(u => u.id === uid)) || null;
  const pushChanges = (name, list, keyOf, toDoc) => {
    const prev = server.current[name];
    if (!CLOUD || !prev || !user) return;
    const col = Cloud.db.collection(name), seen = new Set();
    list.forEach(item => {
      const id = keyOf(item), data = plain(toDoc(item)), old = prev.get(id);
      seen.add(id);
      if (!old) { prev.set(id, item); col.doc(id).set(data).catch(failed); return; }
      const before = plain(toDoc(old)), patch = {};
      Object.keys(data).forEach(k => { if (stable(data[k]) !== stable(before[k])) patch[k] = data[k]; });
      Object.keys(before).forEach(k => { if (!(k in data)) patch[k] = firebase.firestore.FieldValue.delete(); });
      if (Object.keys(patch).length) { prev.set(id, item); col.doc(id).update(patch).catch(failed); }
    });
    [...prev.keys()].forEach(id => { if (!seen.has(id)) { prev.delete(id); col.doc(id).delete().catch(failed); } });
  };
  const withoutId = ({ id, ...rest }) => rest;
  useEffect(() => { pushChanges("teams", teams, t => String(t.id), t => t); }, [teams]);
  useEffect(() => { pushChanges("matches", matches, m => String(m.id), m => m); }, [matches]);
  useEffect(() => { pushChanges("users", users, u => u.id, withoutId); }, [users]);
  // แจ้งเตือนปัญหาแล้วซ่อนเองใน 8 วิ
  useEffect(() => { if (!cloudErr) return; const t = setTimeout(() => setCloudErr(""), 8000); return () => clearTimeout(t); }, [cloudErr]);

  // CLOUD: ข้อมูลที่เคยกรอกในเบราว์เซอร์นี้ (ตอนยังเป็นแบบเครื่องเดียว) → แอดมินกดย้ายขึ้นออนไลน์ได้
  const localLeague = useMemo(() => {
    if (!CLOUD) return null;
    const t = load("fl_teams", null), m = load("fl_matches", null);
    return Array.isArray(t) && t.length ? { teams: t.map(withSquad), matches: Array.isArray(m) ? m : [] } : null;
  }, []);
  // ย้ายแล้ว → ซ่อนปุ่มท้ายหน้าถาวร (กันเผลอเอาข้อมูลเก่าในเครื่องไปทับผลล่าสุดบนออนไลน์)
  const [moved, setMoved] = useState(() => !!load("fl_cloud_moved", false));

  const standings = useMemo(() => computeStandings(teams, matches), [teams, matches]);
  const pstats    = useMemo(() => computePlayerStats(teams, matches), [teams, matches]);
  const statsByKey = useMemo(() => { const o = {}; pstats.forEach(s => o[s.key] = s); return o; }, [pstats]);
  const movement  = useMemo(() => computeMovement(teams, matches), [teams, matches]);
  const done      = useMemo(() => matches.filter(m => m.status === "done").sort(byPlayOrder), [matches]);
  const nextMatch = useMemo(() => matches.filter(m => m.status !== "done")
    .sort((a, b) => kickoff(a) - kickoff(b) || byPlayOrder(a, b))[0], [matches]);
  const recent    = done.slice(-3).reverse();
  const lastRound = done.reduce((mx, m) => Math.max(mx, m.round), 0);
  const goals     = matches.reduce((s, m) => s + (m.hs || 0) + (m.as || 0), 0);
  const topScorer = pstats.filter(s => s.G > 0).sort(PLAYER_SORTS.G.fn)[0];

  // ผู้ใช้ที่ล็อกอินอยู่ (ถ้าบัญชีถูกลบ → หลุดเป็นผู้ชมเอง)
  const canEdit = !!user && (user.role === "admin" || user.role === "referee");
  const isAdmin = !!user && user.role === "admin";
  const myTeam  = user && user.role === "manager" ? teams.find(t => t.id === user.teamId) : null;
  const canEditSquad = t => isAdmin || (!!myTeam && myTeam.id === t.id);
  const rankOf  = id => standings.findIndex(r => r.team.id === id) + 1;
  const rowOf   = id => standings.find(r => r.team.id === id);
  const openProfile = t => setProfileId(t.id);
  const profileTeam = teams.find(t => t.id === profileId);
  const squadTeam   = teams.find(t => t.id === squadTeamId);
  const ownerId     = CLOUD && owner ? owner.uid : null;
  const loading     = CLOUD && !(cloudOk.teams && cloudOk.matches);
  // โหลดนานเกิน 15 วิ (เน็ตหลุด / ยังไม่ได้สร้าง Firestore Database) → บอกวิธีแก้แทนการหมุนค้าง
  const [slow, setSlow] = useState(false);
  useEffect(() => { if (!loading) return; const t = setTimeout(() => setSlow(true), 15000); return () => clearTimeout(t); }, [loading]);
  const needSetup   = CLOUD ? owner === null : users.length === 0;

  // แท็บ "ทีมของฉัน" หายเมื่อออกจากระบบ → กลับหน้าแรก
  useEffect(() => { if (tab === "myteam" && !(user && user.role === "manager")) setTab("home"); }, [user, tab]);
  // CLOUD: ล็อกอินเสร็จ (โหลดบัญชีแล้ว) → ผู้จัดการทีมไปหน้า "ทีมของฉัน"
  useEffect(() => { if (afterLogin.current && user) { afterLogin.current = false; if (user.role === "manager") setTab("myteam"); } }, [user]);

  /* ── auth ── */
  const login = u => { setSession(newSession(u)); setShowLogin(false); if (u.role === "manager") setTab("myteam"); };
  const cloudLogin = async f => {
    afterLogin.current = true;
    try { await Cloud.auth.signInWithEmailAndPassword(Cloud.email(f.username), f.password); setShowLogin(false); return ""; }
    catch (e) { afterLogin.current = false; return cloudError(e); }
  };
  const setupAdmin = f => {
    const admin = makeUser({ ...f, role: "admin" }, []);
    setUsers([admin]);
    login(admin);
  };
  // CLOUD: แอดมินคนแรก = เจ้าของลีก · ตั้งได้ครั้งเดียว (กฎบนเซิร์ฟเวอร์กันคนอื่นตั้งซ้ำ)
  const cloudSetup = async f => {
    settingUp.current = true;
    try {
      const cred = await Cloud.auth.createUserWithEmailAndPassword(Cloud.email(f.username), f.password);
      const id = cred.user.uid, db = Cloud.db;
      try { await db.doc("meta/owner").set({ uid: id, at: Date.now() }); }
      catch (e) {
        await cred.user.delete().catch(() => {});
        return e && e.code === "permission-denied" ? "ลีกนี้มีแอดมินแล้ว — ให้แอดมินสร้างบัญชีให้แทน" : cloudError(e);
      }
      await db.doc("users/" + id).set({ name: f.name.trim(), username: normUser(f.username), role: "admin", teamId: null, at: Date.now() });
      setShowLogin(false);
      return "";
    } catch (e) { return cloudError(e); }
    finally { settingUp.current = false; }
  };
  // ผู้จัดการทีมสมัครเอง (ตอนแอดมินเปิดรับสมัคร): สร้างบัญชี + ทีมใหม่ของตัวเอง แล้วล็อกอินเป็นผู้จัดการทีมนั้นทันที
  const signupOpen = signup === true && !needSetup;
  const canSignup  = signupOpen && !user && !(CLOUD && authUid);   // ปุ่มสมัคร: เฉพาะคนที่ยังไม่ได้ล็อกอิน
  const SIGNUP_CLOSED = "ลีกนี้ปิดรับสมัครแล้ว — ติดต่อแอดมิน";
  const signupLocal = f => {
    if (!signupOpen) return SIGNUP_CLOSED;
    const id = uniqueId();
    const nu = makeUser({ ...f, name: f.name.slice(0, 40), role: "manager", teamId: id }, users);
    setTeams(ts => [...ts, newTeamFrom(f, id)]);
    setUsers(us => [...us, nu]);
    setShowSignup(false);
    login(nu);
    return "";
  };
  // CLOUD: บัญชีกับทีมบันทึกพร้อมกันในชุดเดียว (กฎตรวจว่าเป็นทีมใหม่ของบัญชีใหม่) · ไม่ผ่าน → ลบบัญชีที่เพิ่งสร้างทิ้ง
  const cloudSignup = async f => {
    if (!signupOpen) return SIGNUP_CLOSED;
    settingUp.current = true;
    afterLogin.current = true;
    let cred = null;
    try {
      cred = await Cloud.auth.createUserWithEmailAndPassword(Cloud.email(f.username), f.password);
      const id = uniqueId(), db = Cloud.db, batch = db.batch();
      batch.set(db.doc("teams/" + id), plain(newTeamFrom(f, id)));
      batch.set(db.doc("users/" + cred.user.uid), { name: f.name.trim().slice(0, 40), username: normUser(f.username), role: "manager", teamId: id, at: Date.now() });
      await batch.commit();
      setShowSignup(false);
      return "";
    } catch (e) {
      afterLogin.current = false;
      if (cred) await cred.user.delete().catch(() => {});
      return e && e.code === "permission-denied" ? SIGNUP_CLOSED
        : e && e.code === "auth/invalid-email" ? "ชื่อผู้ใช้นี้ใช้ไม่ได้ ลองชื่ออื่น" : cloudError(e);
    } finally { settingUp.current = false; }
  };
  const setSignupOpen = open => {
    if (!isAdmin) return;
    if (!CLOUD) return setSignup(open);
    Cloud.db.doc("meta/settings").set({ signup: open }).catch(failed);
  };
  const logout = () => {
    if (CLOUD) Cloud.auth.signOut().catch(failed); else setSession(null);
    setShowAccount(false);
  };
  const changePassword = async f => {
    if (CLOUD) {
      const err = validatePassword(f.password, f.confirm);
      if (err) return err;
      const me = Cloud.auth.currentUser;
      if (!me) return "ยังไม่ได้ล็อกอิน";
      try {
        await me.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(me.email, f.current));
        await me.updatePassword(f.password);
        return "";
      } catch (e) { return /credential|wrong-password/.test((e && e.code) || "") ? "รหัสผ่านปัจจุบันไม่ถูกต้อง" : cloudError(e); }
    }
    if (!checkPassword(user, f.current)) return "รหัสผ่านปัจจุบันไม่ถูกต้อง";
    const err = validatePassword(f.password, f.confirm);
    if (err) return err;
    setUsers(us => us.map(u => u.id === user.id ? withPassword(u, f.password) : u));
    return "";
  };
  const addUser = async f => {
    const err = validateAccount(f, users);
    if (err) return err;
    const teamId = f.role === "manager" && f.teamId ? +f.teamId : null;
    if (!CLOUD) {
      const nu = makeUser(f, users);
      setUsers(us => nu.teamId ? assignTeam([...us, nu], nu.id, nu.teamId) : [...us, nu]);
      return "";
    }
    try {
      const id = await Cloud.addAccount(f.username, f.password, newId => Cloud.db.doc("users/" + newId)
        .set({ name: f.name.trim(), username: normUser(f.username), role: f.role, teamId, at: Date.now() }));
      if (teamId) setUsers(us => us.map(u => u.id !== id && u.teamId === teamId ? { ...u, teamId: null } : u));   // ทีมหนึ่งมีผู้จัดการคนเดียว
      return "";
    } catch (e) { return cloudError(e); }
  };
  const adminCount = users.filter(u => u.role === "admin").length;
  const updateUser = (id, patch) => {
    const target = users.find(u => u.id === id);
    if (!target || id === user.id || id === ownerId) return;
    if (patch.role && target.role === "admin" && patch.role !== "admin" && adminCount <= 1) return;   // ต้องเหลือแอดมินอย่างน้อย 1
    if ("teamId" in patch) return setUsers(us => assignTeam(us, id, patch.teamId));
    setUsers(us => us.map(u => u.id === id ? { ...u, ...patch, teamId: (patch.role || u.role) === "manager" ? u.teamId : null } : u));
  };
  const resetPassword = (id, pw) => {
    const err = validatePassword(pw, pw);
    if (err) return err;
    setUsers(us => us.map(u => u.id === id ? withPassword(u, pw) : u));
    return "";
  };
  const deleteUser = id => {
    const target = users.find(u => u.id === id);
    if (!target || id === user.id || id === ownerId || (target.role === "admin" && adminCount <= 1)) return;
    setUsers(us => us.filter(u => u.id !== id));
  };

  /* ── league data ──
     แก้ state แบบ functional เสมอ (ใช้ข้อมูลล่าสุด) → CLOUD ไม่เผลอส่งข้อมูลเก่าทับสิ่งที่เครื่องอื่นเพิ่งแก้ */
  const saveResult = (id, hs, as, events, perf, motm, formations) => {
    setMatches(ms => ms.map(m => m.id === id ? { ...m, hs, as, events, perf, motm, formations, status:"done" } : m));
    setEditMatch(null);
  };

  // แอดมิน: เพิ่มนัดเอง (เลือกคู่เอง ไม่สุ่ม) / แก้ทีม สัปดาห์ วันเวลา ของนัดที่ยังไม่แข่ง
  const saveMatch = f => {
    const info = { round: f.round, home: f.home, away: f.away, date: f.date, time: f.time };
    setMatches(ms => f.id ? ms.map(m => m.id === f.id ? { ...m, ...info } : m)
      : [...ms, { id: uniqueId(), ...info, hs: null, as: null, status: "scheduled", events: [] }]);
    setMatchEdit(null);
  };
  const deleteMatch = id => {
    if (!confirm("ลบนัดนี้ออกจากโปรแกรม?")) return;
    setMatches(ms => ms.filter(m => m.id !== id));
    setMatchEdit(null);
  };

  const createFixtures = o => {
    setMatches(buildFixtures(teams, o));
    setFixtureOpen(false);
    setTab("matches");
  };

  // แอดมิน: สร้าง/แก้ทีม (ชื่อ เจ้าของ สโมสร สี) + ผูกบัญชีผู้จัดการทีม
  const saveTeam = (f, managerId) => {
    const id = f.id || uniqueId();
    const info = { name: f.name, owner: f.owner, club: f.club, kit: f.kit };
    setTeams(ts => f.id ? ts.map(t => t.id === id ? withSquad({ ...t, ...info }) : t) : [...ts, withSquad({ ...info, id })]);
    setUsers(us => managerId ? assignTeam(us, managerId, id)
      : us.map(u => u.role === "manager" && u.teamId === id ? { ...u, teamId: null } : u));
    setTeamModal(null);
  };

  const deleteTeam = id => {
    const t = teams.find(x => x.id === id);
    if (!confirm("ลบทีม " + (t ? t.name : "") + " พร้อมนัดแข่งของทีมนี้ทั้งหมด?")) return;
    setTeams(ts => ts.filter(x => x.id !== id));
    setMatches(ms => ms.filter(m => m.home !== id && m.away !== id));
    setUsers(us => us.map(u => u.teamId === id ? { ...u, teamId: null } : u));
    setTeamModal(null);
  };

  // ผู้จัดการทีมแก้ได้แค่ชื่อ/สีของทีมตัวเอง · แอดมินแก้ได้ทุกทีม
  const saveIdentity = (id, patch) => {
    if (!(isAdmin || (myTeam && myTeam.id === id))) return;
    setTeams(ts => ts.map(t => t.id === id ? { ...t, name: patch.name, kit: patch.kit } : t));
  };
  // รายชื่อ + แผนการเล่น + ตำแหน่งตัวจริงในแผน (ผู้จัดการทีมของทีมนี้ หรือแอดมิน)
  const saveSquad = (id, players, formation, lineup) => {
    const t = teams.find(x => x.id === id);
    if (!t || !canEditSquad(t)) return;
    setTeams(ts => ts.map(x => x.id === id ? withSquad({ ...x, players, formation, lineup }) : x));
  };
  // รูปการ์ดจากหน้าดูการ์ด (แตะนักเตะบนสนามในโปรไฟล์) → บันทึกทันที
  const setPlayerImage = (teamId, playerId, img) => {
    const t = teams.find(x => x.id === teamId);
    if (!t || !canEditSquad(t)) return;
    setTeams(ts => ts.map(x => x.id !== teamId ? x : { ...x, players: x.players.map(p => p.id === playerId ? { ...p, img } : p) }));
  };

  // ล้างแค่ข้อมูลลีก (ทีม/นัด) — บัญชีผู้ใช้ยังอยู่
  const resetAll = () => {
    if (!confirm("ล้างทีม นักเตะ และผลการแข่งทั้งหมด แล้วกลับไปใช้ข้อมูลตัวอย่าง? (บัญชีผู้ใช้ไม่ถูกลบ)" +
      (CLOUD ? "\n\n⚠️ เป็นข้อมูลออนไลน์ — ทุกคนจะเห็นข้อมูลที่รีเซ็ตแล้ว" : ""))) return;
    if (!CLOUD) { localStorage.removeItem("fl_teams"); localStorage.removeItem("fl_matches"); }
    setTeams(SEED_TEAMS);
    setMatches(SEED_MATCHES);
  };

  // CLOUD: ย้ายข้อมูลที่กรอกไว้ในเบราว์เซอร์นี้ (ทีม นักเตะ นัด รูปการ์ด) ขึ้นออนไลน์ — แทนที่ข้อมูลออนไลน์เดิม
  const moveLocalUp = async () => {
    if (!localLeague || !isAdmin) return;
    if (teams.length && !confirm("แทนที่ข้อมูลออนไลน์ทั้งหมด (" + teams.length + " ทีม · " + matches.length + " นัด) ด้วยข้อมูลจากเครื่องนี้ ("
      + localLeague.teams.length + " ทีม · " + localLeague.matches.length + " นัด)?")) return;
    const all = await ImgDB.all().catch(() => ({}));
    const used = {};
    localLeague.teams.forEach(t => t.players.forEach(p => { if (p.img && all[p.img]) used[p.img] = all[p.img]; }));
    absorbImages(used);
    uploadImages(used);
    setTeams(localLeague.teams);
    setMatches(localLeague.matches);
    save("fl_cloud_moved", Date.now());
    setMoved(true);
  };
  const useSample = () => { setTeams(SEED_TEAMS); setMatches(SEED_MATCHES); };

  const shareImage = async () => {
    setSharing(true);
    try {
      const sub = lastRound
        ? "หลังสัปดาห์ที่ " + lastRound + " · " + new Date().toLocaleDateString("th-TH", { day:"numeric", month:"long", year:"numeric" })
        : "ยังไม่เริ่มแข่ง";
      setShareBlob(await renderStandingsPng(standings, sub));
    } catch (e) { alert("สร้างรูปไม่สำเร็จ"); }
    finally { setSharing(false); }
  };

  /* ── Export / Import JSON (ทีม นักเตะ นัด รูปการ์ด — ไม่รวมบัญชีผู้ใช้) ── */
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ teams, matches, images: usedImages(teams) }, null, 2)], { type: "application/json" });
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
        if (Array.isArray(d.teams))   setTeams(d.teams.map(withSquad));
        if (Array.isArray(d.matches)) setMatches(d.matches);
        absorbImages(d.images);
        uploadImages(d.images);
      } catch (e) { alert("ไฟล์ไม่ถูกต้อง"); }
    };
    reader.readAsText(file);
    ev.target.value = "";
  };

  const TABS = [
    { key:"home",      label:"หน้าแรก",    icon:"home" },
    ...(user && user.role === "manager" ? [{ key:"myteam", label:"ทีมของฉัน", icon:"shield" }] : []),
    { key:"standings", label:"ตารางคะแนน", icon:"table" },
    { key:"matches",   label:"โปรแกรม/ผล", icon:"calendar" },
    { key:"players",   label:"นักเตะ",     icon:"target" },
    { key:"teams",     label:"ทีมทั้งหมด", icon:"users" },
  ];
  const rounds = [...new Set(matches.map(m => m.round))].sort((a, b) => a - b);
  const matchRow = m => (
    <MatchRow key={m.id} m={m} teams={teams} canEdit={canEdit} isAdmin={isAdmin}
      onResult={setEditMatch} onSchedule={setMatchEdit} />
  );
  const teamCard = t => (
    <TeamCard key={t.id} t={t} rank={rankOf(t.id)} row={rowOf(t.id)}
      canEdit={isAdmin} onOpen={openProfile} onEdit={tm => setTeamModal(tm)} />
  );
  const STATS = [
    { l:"ทีมทั้งหมด", v: teams.length, icon:"users" },
    { l:"แข่งไปแล้ว", v: done.length,  icon:"calendar" },
    { l:"ประตูรวม",  v: goals,        icon:"target" },
    { l:"ดาวซัลโว",  v: topScorer ? topScorer.name + " · " + topScorer.G : "-", icon:"crown" },
  ];

  return (
    <ImgContext.Provider value={{ images, putImage }}>
    <div className="relative min-h-screen text-soft antialiased">

      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-40 bg-page/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="ef-btn ef-brand grid h-10 w-12 shrink-0 place-items-center">
              <Ic n="trophy" size={19} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-xl font-bold italic leading-tight text-ink">Friends League</div>
              <div className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">eFootball 2027 Mobile</div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
          {CLOUD && (
            <span role="status" aria-label={online ? "สถานะ: ออนไลน์" : "สถานะ: ออฟไลน์"}
              title={online ? "ข้อมูลออนไลน์ · ทุกเครื่องเห็นข้อมูลเดียวกัน" : "ออฟไลน์ · สิ่งที่แก้จะส่งขึ้นเมื่อกลับมาออนไลน์"}
              className={"flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 " + (online ? "bg-win/10 text-win ring-win/30" : "bg-accent/15 text-accent ring-accent/40")}>
              <Ic n="cloud" size={15} />
              <span className="hidden sm:inline">{online ? "ออนไลน์" : "ออฟไลน์"}</span>
            </span>
          )}
          {user ? (
            <button onClick={() => setShowAccount(true)} aria-label="บัญชีของฉัน"
              className="flex shrink-0 items-center gap-2.5 rounded-full bg-sunken py-1 pl-1 pr-1 ring-1 ring-line/20 transition hover:ring-accent/50 sm:pr-3.5">
              <Avatar u={user} />
              <span className="hidden text-left sm:block">
                <span className="block max-w-[140px] truncate text-sm font-medium leading-tight text-ink">{user.name}</span>
                <span className="block max-w-[140px] truncate text-[11px] leading-tight text-muted">{ROLE_LABEL[user.role]}{myTeam ? " · " + myTeam.name : ""}</span>
              </span>
            </button>
          ) : CLOUD && authUid ? (
            noRole
              ? <Btn onClick={logout} className="shrink-0"><Ic n="logout" size={14} /> ออกจากระบบ</Btn>
              : <span className="shrink-0 px-2 text-xs text-muted">กำลังโหลดบัญชี…</span>
          ) : (
            <Btn variant="primary" onClick={() => setShowLogin(true)} className="shrink-0">
              <Ic n="login" size={14} /> {needSetup ? "ตั้งค่าแอดมิน" : "เข้าสู่ระบบ"}
            </Btn>
          )}
          </div>
        </div>

        <nav className="mx-auto max-w-6xl px-5 pb-2.5" aria-label="เมนูหลัก">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 py-0.5">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} aria-current={tab === t.key ? "page" : undefined}
                className={"ef-btn ef-tab flex shrink-0 items-center gap-2 px-4 py-2 text-sm " + (tab === t.key ? "ef-tab-on" : "")}>
                <Ic n={t.icon} size={15} /> {t.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="ef-rule" />
      </header>

      <main className="relative mx-auto max-w-6xl px-5 py-8">
        {noRole && (
          <div className="mb-6"><Note kind="warn">บัญชีนี้ไม่มีสิทธิ์ในลีก (แอดมินอาจลบบัญชีนี้ หรือยังไม่ได้เพิ่มให้) — กด “ออกจากระบบ” แล้วติดต่อแอดมิน</Note></div>
        )}
        {loading ? (
          <Card className="mx-auto max-w-md px-6 py-14 text-center">
            {bootErr ? (
              <>
                <div className="font-display text-lg font-bold italic text-ink">โหลดข้อมูลลีกไม่ได้</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{bootErr}</p>
                <Btn variant="primary" className="mt-5" onClick={() => location.reload()}><Ic n="refresh" size={14} /> ลองใหม่</Btn>
              </>
            ) : (
              <>
                <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-line/25 border-t-accent" />
                <div className="mt-4 text-sm text-soft">กำลังโหลดข้อมูลลีก…</div>
                {slow && (
                  <>
                    <p className="mt-3 text-xs leading-relaxed text-muted">ใช้เวลานานกว่าปกติ — ตรวจอินเทอร์เน็ต แล้วลองใหม่ · ถ้าเป็นเจ้าของลีก ตรวจว่าสร้าง Firestore Database และวางกฎ firestore.rules ใน Firebase แล้ว (ดู README)</p>
                    <Btn className="mt-4" onClick={() => location.reload()}><Ic n="refresh" size={14} /> ลองใหม่</Btn>
                  </>
                )}
              </>
            )}
          </Card>
        ) : (<>

        {/* ═══ HOME ═══ */}
        {tab === "home" && (
          <div className="fl-enter">
            <SectionTitle icon="sparkles" kicker="Season 1 · Overview" title="ภาพรวมลีก" />

            {CLOUD && teams.length === 0 && (
              <Card className="mb-8 p-6 text-center">
                <div className="font-display text-lg font-bold italic text-ink">ลีกออนไลน์ยังไม่มีข้อมูล</div>
                {isAdmin ? (
                  <>
                    <p className="mt-2 text-sm leading-relaxed text-muted">เริ่มจากข้อมูลที่เคยกรอกไว้ในเครื่องนี้ ใช้ข้อมูลตัวอย่าง หรือสร้างทีมเองที่แท็บ “ทีมทั้งหมด”</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {localLeague && (
                        <Btn variant="primary" onClick={moveLocalUp}>
                          <Ic n="upload" size={14} /> ย้ายข้อมูลจากเครื่องนี้ขึ้นออนไลน์ ({localLeague.teams.length} ทีม · {localLeague.matches.length} นัด)
                        </Btn>
                      )}
                      <Btn onClick={useSample}><Ic n="sparkles" size={14} /> ใช้ข้อมูลตัวอย่าง</Btn>
                    </div>
                    <p className="mt-3 text-xs text-muted">ผู้จัดการทีมสมัครเองได้ (เปิด/ปิดที่เมนูบัญชี › จัดการผู้ใช้) · บัญชีกรรมการสร้างที่เมนูเดียวกัน</p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-muted">
                      {needSetup ? "ยังไม่ได้ตั้งค่าแอดมิน — เจ้าของลีกกด “ตั้งค่าแอดมิน” มุมขวาบนเพื่อเริ่ม"
                        : canSignup ? "ยังไม่มีทีม — สมัครเป็นผู้จัดการทีมแล้วส่งทีมของคุณเข้าลีกได้เลย" : "รอแอดมินเพิ่มทีมและโปรแกรมการแข่ง"}
                    </p>
                    {canSignup && <Btn variant="primary" className="mt-4" onClick={() => setShowSignup(true)}><Ic n="userPlus" size={14} /> สมัคร + สร้างทีมของคุณ</Btn>}
                  </>
                )}
              </Card>
            )}

            {nextMatch && (
              <NextMatch m={nextMatch} teams={teams} standings={standings} canEdit={canEdit}
                onResult={setEditMatch} onOpen={openProfile} />
            )}

            {standings.length > 0 && (
              <>
                <SubHead link="ตารางเต็ม" onLink={() => setTab("standings")}>4 อันดับแรก</SubHead>
                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {standings.slice(0, 4).map(r => teamCard(r.team))}
                </div>
              </>
            )}

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map(s => (
                <Card key={s.l} className="flex items-center gap-3 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/25"><Ic n={s.icon} size={18} /></span>
                  <div className="min-w-0">
                    <div className={LABEL}>{s.l}</div>
                    <div className="truncate font-display text-2xl font-bold italic leading-tight text-ink">
                      {typeof s.v === "number" ? <CountUp value={s.v} /> : <Hl className="text-lg sm:text-xl">{s.v}</Hl>}
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

        {/* ═══ MY TEAM (ผู้จัดการทีม) ═══ */}
        {tab === "myteam" && user && user.role === "manager" && (
          <div className="fl-enter">
            <SectionTitle icon="shield" kicker="My Team" title="ทีมของฉัน"
              action={myTeam ? <Btn onClick={() => openProfile(myTeam)}><Ic n="eye" size={14} /> ดูโปรไฟล์ทีม</Btn> : null} />
            {!myTeam ? (
              <Card className="py-12 text-center text-sm text-muted">แอดมินยังไม่ได้กำหนดทีมให้บัญชีนี้ — แจ้งแอดมินให้ผูกทีมให้ในเมนูจัดการผู้ใช้</Card>
            ) : (
              <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
                <Card className="h-fit p-5">
                  <SubHead>ชื่อและสีทีม</SubHead>
                  <TeamIdentity team={myTeam} onSave={patch => saveIdentity(myTeam.id, patch)} />
                </Card>
                <Card className="p-5">
                  <SubHead>รายชื่อนักเตะ 23 คน</SubHead>
                  <p className="-mt-1 mb-4 text-xs leading-relaxed text-muted">ตัวจริงต้องมี 11 คน สำรอง 12 คน · กดปุ่ม “ตัวจริง/สำรอง” เพื่อสลับ · เลือกตำแหน่งได้ที่ป้ายสีด้านหน้า · กดช่อง “รูป” ในแถวของแต่ละคนเพื่อใส่รูปการ์ด (โชว์บนสนามตัวจริงในโปรไฟล์ทีม) · ผลงานของนักเตะแต่ละคน แอดมินจะบันทึกให้หลังจบแต่ละนัด</p>
                  <SquadEditor team={myTeam} onSave={(players, formation, lineup) => saveSquad(myTeam.id, players, formation, lineup)} />
                </Card>
              </div>
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
                <div className="grid grid-cols-[28px_30px_1fr_repeat(6,34px)_92px] gap-2 border-b border-line/15 px-4 py-3 text-[11px] font-semibold text-muted">
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
                      className={"grid cursor-pointer grid-cols-[28px_30px_1fr_repeat(6,34px)_92px] items-center gap-2 px-4 py-3 text-sm tabular-nums transition hover:bg-line/[0.06] " +
                        (i < standings.length - 1 ? "border-b border-line/10" : "")}>
                      <div className={"font-display text-lg font-bold italic " + (tier ? "fl-tier-label fl-tier-" + tier : "text-faint")}>{i + 1}</div>
                      <div><Move d={movement[r.team.id]} /></div>
                      <div className="flex min-w-0 items-center gap-3">
                        <Crest team={r.team} className="h-8 w-auto shrink-0" />
                        <div className="min-w-0">
                          <div className="truncate font-display font-semibold italic text-ink">{r.team.name}</div>
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
                      <div className="text-center font-display text-xl font-bold italic"><Hl>{r.PTS}</Hl></div>
                      <div className="flex justify-center gap-1">
                        {r.form.slice(-3).map((f, k) => <FormPill key={k} r={f} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <p className="ef-halo mt-3 text-xs text-muted">▲▼ = อันดับที่ขยับจากก่อนสัปดาห์ล่าสุด · กดที่ทีมเพื่อดูโปรไฟล์และรายชื่อนักเตะ</p>
          </div>
        )}

        {/* ═══ MATCHES ═══ */}
        {tab === "matches" && (
          <div className="fl-enter">
            <SectionTitle icon="calendar" kicker="Fixtures & Results" title="โปรแกรมการแข่งขัน"
              action={isAdmin ? (
                <div className="flex flex-wrap gap-2">
                  <Btn variant="primary" onClick={() => setMatchEdit({})}><Ic n="plus" size={14} /> เพิ่มนัดเอง</Btn>
                  <Btn onClick={() => setFixtureOpen(true)}><Ic n="wand" size={14} /> จัดโปรแกรมอัตโนมัติ</Btn>
                </div>
              ) : null} />

            {matches.length === 0 && (
              <Card className="py-12 text-center text-sm text-muted">
                ยังไม่มีโปรแกรมแข่ง{isAdmin ? " — กด “เพิ่มนัดเอง” เพื่อเลือกคู่เอง หรือ “จัดโปรแกรมอัตโนมัติ”" : " — รอแอดมินจัดโปรแกรม"}
              </Card>
            )}

            {rounds.map(round => {
              const list = matches.filter(m => m.round === round).sort(byPlayOrder);
              return (
                <div key={round} className="mb-7">
                  <div className="ef-halo mb-3 flex items-baseline gap-2">
                    <span className="font-display text-base font-bold italic text-ink">สัปดาห์ที่ {round}</span>
                    <span className="text-xs text-muted">{fmtDay(list[0])}</span>
                  </div>
                  <div className="space-y-2.5">{list.map(matchRow)}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ PLAYERS ═══ */}
        {tab === "players" && (
          <PlayersTab stats={pstats} matches={matches} teams={teams}
            imageSetter={t => canEditSquad(t) ? (pid, img) => setPlayerImage(t.id, pid, img) : null} />
        )}

        {/* ═══ TEAMS ═══ */}
        {tab === "teams" && (
          <div className="fl-enter">
            <SectionTitle icon="users" kicker="Squad Collection" title="ทีมทั้งหมด"
              action={isAdmin ? <Btn variant="primary" onClick={() => setTeamModal({})}><Ic n="plus" size={15} /> สร้างทีมใหม่</Btn>
                : canSignup ? <Btn variant="primary" onClick={() => setShowSignup(true)}><Ic n="userPlus" size={15} /> สมัคร + สร้างทีมของคุณ</Btn>
                : null} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {teams.map(teamCard)}
            </div>
          </div>
        )}
        </>)}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="ef-halo relative border-t border-line/10 px-5 py-7 text-center text-xs text-muted">
        <div>Friends League · eFootball 2027 Mobile · บันทึกผลด้วยมือ (ไม่เชื่อมต่อ Konami API)</div>
        <div className="mt-1">{CLOUD ? "ข้อมูลออนไลน์ · ทุกเครื่องเห็นข้อมูลเดียวกัน" : "โหมดเครื่องเดียว · ข้อมูลอยู่ในเบราว์เซอร์นี้เท่านั้น (ตั้งค่า Firebase เพื่อใช้ร่วมกันทุกเครื่อง)"}</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {CLOUD && isAdmin && localLeague && !moved && teams.length > 0 && (
            <Btn onClick={moveLocalUp}><Ic n="upload" size={13} /> ย้ายข้อมูลจากเครื่องนี้ขึ้นออนไลน์</Btn>
          )}
          <Btn onClick={exportData}><Ic n="download" size={13} /> Export JSON</Btn>
          {isAdmin && (
            <label className="ef-btn ef-btn-ghost inline-flex cursor-pointer items-center gap-2 px-5 py-2 text-sm">
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

      {showLogin && (
        <LoginModal users={users} setup={needSetup} cloud={CLOUD} onClose={() => setShowLogin(false)}
          onLogin={CLOUD ? cloudLogin : login} onSetup={CLOUD ? cloudSetup : setupAdmin}
          onSignup={signupOpen ? () => { setShowLogin(false); setShowSignup(true); } : null} />
      )}
      {showSignup && (
        <SignupModal users={users} teams={teams} onClose={() => setShowSignup(false)}
          onSignup={CLOUD ? cloudSignup : signupLocal} onLogin={() => { setShowSignup(false); setShowLogin(true); }} />
      )}
      {showAccount && user && (
        <AccountModal user={user} users={users} teams={teams} onClose={() => setShowAccount(false)} onLogout={logout}
          signup={signup} onSignupToggle={setSignupOpen}
          onChangePassword={changePassword} onAddUser={addUser} onUpdateUser={updateUser} ownerId={ownerId}
          onResetPassword={CLOUD ? null : resetPassword} onDeleteUser={deleteUser}
          onMyTeam={() => { setShowAccount(false); setTab("myteam"); }} />
      )}
      {editMatch && <ResultModal match={editMatch} teams={teams} onClose={() => setEditMatch(null)} onSave={saveResult} />}
      {teamModal && (
        <TeamModal team={teamModal.id ? teamModal : null} users={users} onClose={() => setTeamModal(null)} onSave={saveTeam} onDelete={deleteTeam}
          onSquad={t => { setTeamModal(null); setSquadTeamId(t.id); }} />
      )}
      {squadTeam && <SquadModal team={squadTeam} onClose={() => setSquadTeamId(null)} onSave={(players, formation, lineup) => saveSquad(squadTeam.id, players, formation, lineup)} />}
      {profileTeam && (
        <TeamProfile team={profileTeam} rank={rankOf(profileTeam.id)} row={rowOf(profileTeam.id)}
          matches={matches} teams={teams} statsByKey={statsByKey}
          canEditTeam={isAdmin} canEditSquad={canEditSquad(profileTeam)}
          onEdit={t => { setProfileId(null); setTeamModal(t); }}
          onSquad={t => { setProfileId(null); if (isAdmin) setSquadTeamId(t.id); else setTab("myteam"); }}
          onSetImage={canEditSquad(profileTeam) ? (pid, img) => setPlayerImage(profileTeam.id, pid, img) : null}
          onClose={() => setProfileId(null)} />
      )}
      {matchEdit && (
        <MatchModal match={matchEdit} teams={teams} matches={matches} onClose={() => setMatchEdit(null)} onSave={saveMatch} onDelete={deleteMatch} />
      )}
      {fixtureOpen && (
        <FixtureModal teams={teams} matchCount={matches.length} doneCount={done.length}
          onClose={() => setFixtureOpen(false)} onCreate={createFixtures} />
      )}
      {shareBlob && <ShareModal blob={shareBlob} onClose={() => setShareBlob(null)} />}
      {cloudErr && (
        <div role="alert" className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-md items-start gap-2 rounded-xl bg-surface px-4 py-3 text-sm text-loss shadow-2xl ring-1 ring-loss/40">
          <span className="min-w-0 flex-1">{cloudErr}</span>
          <button onClick={() => setCloudErr("")} aria-label="ปิดข้อความ" className="shrink-0 text-muted hover:text-ink"><Ic n="x" size={14} /></button>
        </div>
      )}
    </div>
    </ImgContext.Provider>
  );
}

/* ══════════════════════════ MOUNT ══════════════════════════ */
ReactDOM.createRoot(document.getElementById("root")).render(<FriendsLeague />);
