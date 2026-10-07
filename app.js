/* ════════════════════════════════════════════════════════════════
   Friends League · eFootball 2027 Mobile  (หน้าตาสไตล์ eFootball 2022)
   ⚠️ ห้ามใส่ import / export ในไฟล์นี้เด็ดขาด
      Babel standalone (preset react) แปลงแค่ JSX ไม่แปลง ES Module
      React / ReactDOM มาจาก CDN เป็น global อยู่แล้ว
   สี: ใช้ชื่อ token (bg-surface, text-ink, text-accent …) ที่ประกาศใน index.html/style.css
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
  eye:'<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:'<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/>',
  key:'<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  userPlus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  shirt:'<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  cloud:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
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

const blankSquad = teamId => DEFAULT_POS.map((pos, i) => ({ id: teamId + "-" + (i + 1), name: "", pos, starter: i < STARTERS }));
// ข้อมูลเก่า/ไฟล์ import ที่ไม่มีนักเตะ หรือจำนวนไม่ครบ → เติมช่องว่างให้ครบ 23
function withSquad(team) {
  const base = Array.isArray(team.players) ? team.players.slice(0, SQUAD_SIZE) : [];
  if (base.length === SQUAD_SIZE) return team;
  const fill = blankSquad(team.id).filter(b => !base.some(p => p.id === b.id)).slice(0, SQUAD_SIZE - base.length);
  return { ...team, players: base.concat(fill) };
}
const namedPlayers = t => (t && t.players ? t.players : []).filter(p => (p.name || "").trim());
const newPlayerId = teamId => teamId + "-" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
// id ตัวเลขที่ไม่ชนกันแม้หลายเครื่องสร้างพร้อมกัน (ข้อมูลซิงก์ผ่าน Google Drive)
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
].map(t => ({ ...t, players: seedSquad(t.id) }));

// ผลงานตัวอย่าง: ตัวจริงลงเล่นครบ คะแนน = 6 + ประตู + ½·แอสซิสต์ ± ผลแพ้ชนะ · MOTM = คะแนนสูงสุด
function seedPerf(m) {
  if (m.status !== "done") return m;
  const perf = {};
  let best = null;
  [m.home, m.away].forEach(tid => {
    const team = SEED_TEAMS.find(t => t.id === tid);
    const res = Math.sign(tid === m.home ? m.hs - m.as : m.as - m.hs);
    perf[tid] = {};
    team.players.filter(p => p.starter).forEach((p, i) => {
      const g = m.events.filter(e => e.type === "goal" && e.teamId === tid && e.player === p.name).length;
      const a = m.events.filter(e => e.type === "goal" && e.teamId === tid && e.assist === p.name).length;
      const jitter = ((m.id * 7 + i * 3) % 5 - 2) * 0.25;
      const r = Math.max(4.5, Math.min(10, Math.round((6 + g + a * 0.5 + res * 0.5 + jitter) * 2) / 2));
      perf[tid][p.id] = { r, n: p.name };
      if (!best || r > best.r) best = { teamId: tid, playerId: p.id, n: p.name, r };
    });
  });
  return { ...m, perf, motm: { teamId: best.teamId, playerId: best.playerId, n: best.n } };
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
   - match.perf[teamId][playerId] = { r: คะแนน|null, n: ชื่อ }  → ลงเล่น + คะแนน
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
    if (!stats[key]) stats[key] = { key, teamId: tid, playerId: pid || "", name: name || "", apps: 0, G: 0, A: 0, Y: 0, R: 0, rSum: 0, rN: 0, motm: 0 };
    if (name && !stats[key].name) stats[key].name = name;
    return stats[key];
  };

  matches.filter(m => m.status === "done").forEach(m => {
    const seen = new Set();
    const appear = s => { if (!seen.has(s.key)) { seen.add(s.key); s.apps++; } };
    Object.entries(m.perf || {}).forEach(([tid, ps]) => Object.entries(ps || {}).forEach(([pid, v]) => {
      const s = get(+tid, pid, v && v.n);
      appear(s);
      if (v && typeof v.r === "number") { s.rSum += v.r; s.rN++; }
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
             former: !!s.playerId && !live, avg: s.rN ? s.rSum / s.rN : null };
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

/* ══════════════════════════ GOOGLE DRIVE (ข้อมูลร่วมกันทุกเครื่อง) ══════════════════════════
   ทั้งลีกเก็บเป็นไฟล์ JSON ไฟล์เดียวใน Drive ของแอดมิน แล้วแชร์ให้เพื่อนแบบแก้ไขได้
   - สิทธิ์ drive.file: แอปเห็นเฉพาะไฟล์ที่แอปสร้าง หรือไฟล์ที่ผู้ใช้เลือกเองผ่าน Google Picker
   - ทุกคนที่มีไฟล์แก้ได้ทุกอย่างในไฟล์ (รวมรายชื่อบัญชี) → เหมาะกับกลุ่มเพื่อนที่ไว้ใจกัน
   - ตั้งค่า Client ID / API key / Project number ใน config.js                                  */
const cfg = () => window.FL_CONFIG || {};
const driveReady = () => { const c = cfg(); return !!(c.googleClientId && c.googleApiKey && c.googleAppId); };
const DRIVE_FILE_NAME = "Friends League.json";
const DRIVE_API = "https://www.googleapis.com";
const DOC_APP = "friends-league";

function loadScript(src) {
  return new Promise((res, rej) => {
    const old = document.querySelector('script[src="' + src + '"]');
    if (old) return old.dataset.ready ? res() : old.addEventListener("load", () => res());
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = () => { s.dataset.ready = "1"; res(); };
    s.onerror = () => rej(Object.assign(new Error("โหลดสคริปต์ Google ไม่ได้"), { net: true }));
    document.head.appendChild(s);
  });
}

const Drive = {
  token: "", exp: 0,
  restore() {
    try { const t = JSON.parse(sessionStorage.getItem("fl_gtoken") || "null"); if (t && t.exp > Date.now()) { this.token = t.token; this.exp = t.exp; } } catch (e) {}
  },
  valid() { return !!this.token && Date.now() < this.exp; },
  forget() { this.token = ""; this.exp = 0; try { sessionStorage.removeItem("fl_gtoken"); } catch (e) {} },
  // ต้องเรียกจากการกดปุ่ม (เบราว์เซอร์บล็อกป๊อปอัปที่ไม่ได้มาจากการกด)
  async signIn() {
    await loadScript("https://accounts.google.com/gsi/client");
    await new Promise((res, rej) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: cfg().googleClientId,
        scope: "https://www.googleapis.com/auth/drive.file",
        callback: r => {
          if (r.error) return rej(Object.assign(new Error(r.error), { auth: true }));
          this.token = r.access_token;
          this.exp = Date.now() + (Number(r.expires_in || 3600) - 60) * 1000;
          try { sessionStorage.setItem("fl_gtoken", JSON.stringify({ token: this.token, exp: this.exp })); } catch (e) {}
          res();
        },
        error_callback: e => rej(Object.assign(new Error((e && e.type) || "popup_closed"), { popup: true })),
      });
      client.requestAccessToken({ prompt: "" });
    });
  },
  async call(path, opts = {}) {
    if (!this.valid()) throw Object.assign(new Error("auth"), { auth: true });
    let r;
    try { r = await fetch(DRIVE_API + path, { ...opts, headers: { ...(opts.headers || {}), Authorization: "Bearer " + this.token } }); }
    catch (e) { throw Object.assign(new Error("network"), { net: true }); }
    if (r.status === 401) { this.forget(); throw Object.assign(new Error("auth"), { auth: true }); }
    if (!r.ok) throw Object.assign(new Error("drive " + r.status), { status: r.status });
    return r.json();
  },
  meta(id)  { return this.call("/drive/v3/files/" + id + "?fields=id,name,version,modifiedTime,webViewLink,capabilities/canEdit,owners/displayName"); },
  read(id)  { return this.call("/drive/v3/files/" + id + "?alt=media"); },
  write(id, doc) {
    return this.call("/upload/drive/v3/files/" + id + "?uploadType=media&fields=id,version",
      { method: "PATCH", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify(doc) });
  },
  create(doc) {
    const b = "fl" + Date.now();
    const body = "--" + b + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify({ name: DRIVE_FILE_NAME, mimeType: "application/json" }) +
      "\r\n--" + b + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(doc) + "\r\n--" + b + "--";
    return this.call("/upload/drive/v3/files?uploadType=multipart&fields=id,version", { method: "POST", headers: { "Content-Type": "multipart/related; boundary=" + b }, body });
  },
  // แชร์แบบแก้ไขได้ · Google ส่งอีเมลแจ้งเพื่อนให้เอง
  share(id, email) {
    return this.call("/drive/v3/files/" + id + "/permissions?sendNotificationEmail=true&fields=id",
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: "writer", type: "user", emailAddress: email }) });
  },
  // หน้าต่าง Google Picker ให้เพื่อนเลือกไฟล์ลีกที่ถูกแชร์มา (ทำให้แอปได้สิทธิ์อ่าน/เขียนไฟล์นั้น)
  async pick() {
    await loadScript("https://apis.google.com/js/api.js");
    await new Promise(res => gapi.load("picker", res));
    return new Promise(res => {
      const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
        .setMimeTypes("application/json").setMode(google.picker.DocsViewMode.LIST).setQuery("Friends League");
      new google.picker.PickerBuilder()
        .setAppId(cfg().googleAppId).setDeveloperKey(cfg().googleApiKey).setOAuthToken(this.token)
        .addView(view).setTitle("เลือกไฟล์ลีก (" + DRIVE_FILE_NAME + ")")
        .setCallback(d => {
          if (d.action === google.picker.Action.PICKED) res(d.docs[0].id);
          else if (d.action === google.picker.Action.CANCEL) res(null);
        })
        .build().setVisible(true);
    });
  },
};
Drive.restore();

const makeDoc = (data, by) => ({ app: DOC_APP, schema: 1, savedAt: new Date().toISOString(), savedBy: by || "", ...data });
const validDoc = d => !!d && d.app === DOC_APP && Array.isArray(d.teams) && Array.isArray(d.matches);
const docData = d => ({ teams: d.teams.map(withSquad), matches: d.matches, users: Array.isArray(d.users) ? d.users : [] });
const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* รวมการแก้ไขสองฝั่งแบบ 3 ทาง (base = ข้อมูลตอนซิงก์ครั้งก่อน) ทีละรายการตาม id
   - แก้ฝั่งเดียว → เอาฝั่งที่แก้ · แก้ทั้งสองฝั่ง → เอาของเครื่องนี้
   - เพิ่มใหม่ฝั่งไหนก็เก็บ · ลบฝั่งหนึ่งแต่อีกฝั่งไม่ได้แก้ → ลบ */
function merge3(base, local, remote) {
  const map = arr => new Map((arr || []).map(x => [x.id, x]));
  const B = map(base), L = map(local), R = map(remote);
  const ids = [...L.keys()].concat([...R.keys()].filter(id => !L.has(id)));
  const out = [];
  ids.forEach(id => {
    const b = B.get(id), l = L.get(id), r = R.get(id);
    if (l && r) out.push(b && sameJson(l, b) ? r : l);
    else if (l) { if (!b || !sameJson(l, b)) out.push(l); }
    else if (r) { if (!b || !sameJson(r, b)) out.push(r); }
  });
  return out;
}
const mergeData = (base, local, remote) => ({
  teams:   merge3(base.teams, local.teams, remote.teams),
  matches: merge3(base.matches, local.matches, remote.matches),
  users:   merge3(base.users, local.users, remote.users),
});

const driveError = e =>
  e.auth ? "ต้องเชื่อมต่อ Google อีกครั้ง (สิทธิ์หมดอายุทุก 1 ชั่วโมง)" :
  e.popup ? "หน้าต่างล็อกอิน Google ถูกปิดหรือถูกบล็อก — อนุญาตป๊อปอัปแล้วลองใหม่" :
  e.readonly ? "ไฟล์นี้คุณมีสิทธิ์ดูอย่างเดียว — ให้แอดมินแชร์แบบแก้ไขได้" :
  e.badFile ? "ไฟล์นี้ไม่ใช่ไฟล์ลีก Friends League" :
  e.status === 404 ? "หาไฟล์ไม่เจอ หรือบัญชี Google นี้ไม่มีสิทธิ์เข้าถึง" :
  e.status === 403 ? "Google ไม่อนุญาต (ตรวจการตั้งค่า API / สิทธิ์ไฟล์)" :
  e.net ? "เชื่อมต่อไม่ได้ ตรวจอินเทอร์เน็ต" : "ซิงก์ไม่สำเร็จ (" + e.message + ")";

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
const EfhubLink = ({ url, name }) => url ? (
  <a href={url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
    aria-label={"ดูการ์ด " + name + " ใน EFHUB"} title="ดูการ์ดใน EFHUB" className="inline-grid shrink-0 place-items-center text-link hover:text-accent">
    <Ic n="external" size={12} />
  </a>
) : null;

const SectionTitle = ({ icon, kicker, title, action }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
        <Ic n={icon} size={13} /> {kicker}
      </div>
      <h2 className="ef-title font-display text-3xl font-bold italic text-ink">{title}</h2>
    </div>
    {action}
  </div>
);

const SubHead = ({ children, link, onLink }) => (
  <div className="mb-3 flex items-center justify-between">
    <span className="font-display text-base font-semibold italic text-ink">{children}</span>
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

const Modal = ({ children, onClose, className = "max-w-md" }) => {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fl-scrim fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <Card className={"fl-enter max-h-[90vh] w-full overflow-y-auto rounded-2xl p-6 " + className}>{children}</Card>
    </div>
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
          <span className="truncate pt-0.5 text-right text-[11px] text-muted">{t.club}</span>
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
            {isAdmin && !done && <button onClick={() => onSchedule(m)} className="text-muted hover:text-ink hover:underline">เลื่อนวัน</button>}
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
        <div className={"mt-2 flex h-5 gap-1 " + (right ? "justify-end" : "")}>
          {form(t.id).map((f, k) => <FormPill key={k} r={f} />)}
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

// สถานะแก้ไขผลงาน: ทุกคนที่มีชื่อในทีม → { on: ลงเล่นไหม, r: คะแนน (string ในช่องกรอก), n: ชื่อ }
function initPerf(match, teams) {
  const out = {};
  teams.forEach(t => {
    if (!t) return;
    const saved = (match.perf || {})[t.id];
    out[t.id] = {};
    namedPlayers(t).forEach(p => {
      const s = saved && saved[p.id];
      out[t.id][p.id] = { on: saved ? !!s : p.starter, r: s && typeof s.r === "number" ? String(s.r) : "", n: p.name };
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
        if (!v.on) return;
        const r = parseFloat(v.r);
        outPerf[tid][pid] = { r: isNaN(r) ? null : Math.max(0, Math.min(10, Math.round(r * 2) / 2)), n: v.n };
      });
    });
    let best = null;
    if (motm) {
      const cut = motm.indexOf("|"), tid = motm.slice(0, cut), pid = motm.slice(cut + 1);
      const e = outPerf[tid] && outPerf[tid][pid];
      if (e) best = { teamId: +tid, playerId: pid, n: e.n };
    }
    const cleanEvents = events.filter(e => (e.player || "").trim()).map(e => ({ ...e, player: e.player.trim(), assist: (e.assist || "").trim() }));
    onSave(match.id, hs, as, cleanEvents, outPerf, best);
  };

  const SCORE = "h-12 w-12 rounded-lg bg-sunken text-center font-display text-2xl font-bold italic text-accent ring-1 ring-line/25 outline-none focus:ring-2 focus:ring-accent/70 sm:h-14 sm:w-14 sm:text-3xl";

  const perfBlock = t => {
    if (!t) return null;
    const rows = namedPlayers(t), ps = perf[t.id] || {};
    const played = Object.values(ps).filter(v => v.on).length;
    const row = p => {
      const v = ps[p.id], key = t.id + "|" + p.id, star = motm === key;
      return (
        <div key={p.id} className="grid grid-cols-[22px_38px_1fr_64px_30px] items-center gap-2 py-1.5">
          <input type="checkbox" checked={v.on} onChange={e => { setP(t.id, p.id, { on: e.target.checked }); if (!e.target.checked && star) setMotm(""); }}
            aria-label={"ลงเล่น: " + p.name} className="h-4 w-4 accent-[#FFDE2E]" />
          <PosBadge pos={p.pos} />
          <span className={"truncate text-sm " + (v.on ? "text-ink" : "text-faint")}>{p.name}</span>
          <input type="number" step="0.5" min="0" max="10" value={v.r} disabled={!v.on} placeholder="—"
            onChange={e => setP(t.id, p.id, { r: e.target.value })} aria-label={"คะแนนของ " + p.name}
            className={INPUT + " px-2 py-1 text-center"} />
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
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <input type="number" min="0" value={hs} onChange={e => setHs(+e.target.value)} aria-label="ประตูทีมเหย้า" className={SCORE} />
          <span className="text-faint">-</span>
          <input type="number" min="0" value={as} onChange={e => setAs(+e.target.value)} aria-label="ประตูทีมเยือน" className={SCORE} />
        </div>
        <div className="min-w-0">
          <div className="break-words font-display text-base font-bold italic leading-tight text-ink sm:text-lg">{away && away.name}</div>
          <div className="truncate text-xs text-muted">{away && away.club}</div>
        </div>
      </div>

      <Segmented value={tab} onChange={setTab} items={[["events", "ประตู / ใบเหลือง-แดง"], ["perf", "ผลงานนักเตะ"]]} />

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
          <p className="mb-3 text-xs leading-relaxed text-muted">ติ๊กคนที่ลงเล่น · ใส่คะแนน 0–10 (เว้นว่างได้) · กด ★ เลือกผู้เล่นยอดเยี่ยม (MOTM) 1 คน · ประตู/แอสซิสต์/ใบ นับจากแท็บแรกให้อัตโนมัติ</p>
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
    onSave({ ...f, name: f.name.trim().slice(0, 24) }, mgr ? +mgr : null);
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
  const [msg, setMsg] = useState(null);
  const [bulk, setBulk] = useState("");
  useEffect(() => { setList(fresh()); setMsg(null); }, [team.id]);
  const upd = (id, patch) => { setList(list.map(p => p.id === id ? { ...p, ...patch } : p)); setMsg(null); };

  const starters = list.filter(p => p.starter), subs = list.filter(p => !p.starter);
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
  ].filter(Boolean);

  const applyBulk = () => {
    if (!bulk) return;
    setList(list.map(p => p.name.trim() && !p.card ? { ...p, card: bulk } : p));
    setMsg(null);
  };
  const submit = e => {
    e.preventDefault();
    if (problems.length) return;
    onSave(list.map(p => ({ ...p, name: p.name.trim(), efhub: (p.efhub || "").trim(), ovr: p.ovr === "" ? "" : +p.ovr })));
    setMsg("บันทึกรายชื่อนักเตะแล้ว");
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
              <button type="button" onClick={() => { if (confirm("แทนที่ " + p.name + " ด้วยนักเตะคนใหม่? (ผลงานเดิมยังอยู่ในประวัติ แต่ไม่นับให้คนใหม่)")) upd(p.id, { id: newPlayerId(team.id), name: "", card: "", ovr: "", efhub: "" }); }}
                aria-label={"แทนที่ " + p.name + " ด้วยคนใหม่"} title="แทนที่ด้วยนักเตะคนใหม่"
                className="grid h-7 w-7 place-items-center rounded text-muted hover:text-ink"><Ic n="refresh" size={13} /></button>
            ) : <span className="w-7" />}
          </div>
        </div>
        {/* บรรทัดที่ 2: การ์ด · OVR · ลิงก์ EFHUB · ค้นหา (มือถือ: ลิงก์ขึ้นบรรทัดใหม่) */}
        <div className="mt-1.5 grid grid-cols-[1fr_64px_36px] gap-2 pl-7 sm:grid-cols-[132px_64px_1fr_36px]">
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
          <select value={bulk} onChange={e => setBulk(e.target.value)} aria-label="ประเภทการ์ดสำหรับทุกคนที่ยังไม่เลือก" className={INPUT + " w-auto px-2 py-1 text-xs"}>
            <option value="">— เลือก —</option>
            {CARD_TYPES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
          <Btn onClick={applyBulk} disabled={!bulk} className="px-4 py-1 text-xs">ใช้กับทุกคน</Btn>
        </div>
      )}
      <div className="mb-1 font-display text-sm font-semibold italic text-accent">ตัวจริง</div>
      <div className="space-y-1.5">{starters.map(row)}</div>
      <div className="mb-1 mt-5 font-display text-sm font-semibold italic text-soft">สำรอง</div>
      <div className="space-y-1.5">{subs.map(row)}</div>
      <div className="mt-4 space-y-2">
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
      <SquadEditor team={team} onSave={onSave} />
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
        <div className="-mr-2 -mt-2 flex justify-end"><CloseBtn onClose={onClose} /></div>
        <div className="mb-6 text-center">
          <div className="ef-btn ef-brand mx-auto mb-4 grid h-12 w-14 place-items-center">
            <Ic n={setup ? "crown" : "lock"} size={20} />
          </div>
          <h3 className="font-display text-2xl font-bold italic text-ink">{setup ? "ตั้งค่าแอดมินคนแรก" : "เข้าสู่ระบบ"}</h3>
          <p className="mt-1 text-sm text-muted">
            {setup ? "ยังไม่มีบัญชีในเครื่องนี้ สร้างบัญชีแอดมินเพื่อเริ่มจัดการลีก" : "แอดมิน · กรรมการ · ผู้จัดการทีม"}
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
          <p className="mt-2 rounded-lg bg-sunken p-3 text-xs leading-relaxed text-muted">
            กรรมการ/ผู้จัดการทีมลืมรหัส → ให้แอดมินกด “ตั้งรหัสใหม่” ในเมนูบัญชี › จัดการผู้ใช้<br />
            แอดมินลืมรหัสเอง → ต้องล้างข้อมูลเว็บไซต์นี้ในเบราว์เซอร์ ข้อมูลลีกในเครื่องนี้จะหายด้วย (กด Export JSON เก็บไว้ก่อน)
          </p>
        )}
        <button type="button" onClick={onClose} className="mt-4 w-full text-center text-xs text-muted hover:text-ink">
          ดูแบบผู้ชม (ไม่ต้องล็อกอิน)
        </button>
        <p className="mt-4 border-t border-line/15 pt-3 text-center text-[11px] leading-relaxed text-muted">
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

function UserManager({ me, users, teams, onAdd, onUpdate, onReset, onDelete }) {
  const blank = { name: "", username: "", password: "", role: "manager", teamId: null };
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState(null);
  const [resetId, setResetId] = useState(null);
  const [resetPw, setResetPw] = useState("");
  const admins = users.filter(u => u.role === "admin").length;
  const set = (k, v) => { setF({ ...f, [k]: v }); setMsg(null); };
  const teamName = id => { const t = teams.find(x => x.id === id); return t ? t.name : ""; };

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
      <div className="divide-y divide-line/10 rounded-xl bg-sunken ring-1 ring-line/15">
        {users.map(u => {
          const self = u.id === me.id, lastAdmin = u.role === "admin" && admins <= 1;
          return (
            <div key={u.id} className="px-3 py-3">
              <div className="flex items-center gap-3">
                <Avatar u={u} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{u.name}{self && <span className="font-normal text-muted"> (คุณ)</span>}</div>
                  <div className="truncate text-xs text-muted">@{u.username}{u.role === "manager" && " · " + (teamName(u.teamId) || "ยังไม่มีทีม")}</div>
                </div>
                <select value={u.role} disabled={self || lastAdmin} onChange={e => onUpdate(u.id, { role: e.target.value })}
                  aria-label={"สิทธิ์ของ " + u.name} className={INPUT + " w-auto py-1.5"}>
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
        <div className="flex justify-end"><Btn type="submit" variant="primary"><Ic n="userPlus" size={14} /> เพิ่มผู้ใช้</Btn></div>
      </form>
    </div>
  );
}

function AccountModal({ user, users, teams, onClose, onLogout, onChangePassword, onAddUser, onUpdateUser, onResetPassword, onDeleteUser, onMyTeam }) {
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
        ? <UserManager me={user} users={users} teams={teams} onAdd={onAddUser} onUpdate={onUpdateUser} onReset={onResetPassword} onDelete={onDeleteUser} />
        : <ChangePassword username={user.username} onSubmit={onChangePassword} />}
    </Modal>
  );
}

/* ══════════════════════════ PITCH (ตัวจริง 11 คนบนสนาม) ══════════════════════════ */
function Pitch({ players }) {
  const starters = players.filter(p => p.starter);
  const rows = ["FW", "MF", "DF", "GK"].map(g => starters.filter(p => posGroup(p.pos) === g)
    .sort((a, b) => (POS_SIDE[a.pos] ?? 1) - (POS_SIDE[b.pos] ?? 1)));
  return (
    <div className="ef-pitch aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-line/20">
      <div className="ef-pitch-circle" />
      <div className="relative grid h-full grid-rows-4 px-3 py-5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-around gap-1">
            {row.map(p => (
              <div key={p.id} className="flex min-w-0 max-w-[25%] flex-col items-center gap-1">
                <span className="flex items-center gap-1">
                  <span className={"ef-pos ef-pos-" + posGroup(p.pos) + " shadow-[0_4px_10px_rgba(0,0,0,0.4)]"}>{p.pos}</span>
                  {p.ovr !== "" && p.ovr != null && <span className="font-display text-xs font-bold italic text-white drop-shadow">{p.ovr}</span>}
                </span>
                <span className="max-w-full truncate rounded bg-black/45 px-1.5 py-0.5 text-[11px] font-medium text-white">{p.name || "—"}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════ TEAM PROFILE ══════════════════════════ */
const fmtAvg = v => v == null ? "–" : v.toFixed(1);

function TeamProfile({ team, rank, row, matches, teams, statsByKey, canEditTeam, canEditSquad, onEdit, onSquad, onClose }) {
  const tier = tierOf(rank, row);
  const r = row || { P:0, W:0, D:0, L:0, GF:0, GA:0, GD:0, PTS:0, form:[] };
  const squad = withSquad(team).players;
  const mine = matches.filter(m => m.home === team.id || m.away === team.id).sort(byPlayOrder);
  const nameOf = id => { const t = teams.find(x => x.id === id); return t ? t.name : "—"; };
  const record = [["แข่ง", r.P], ["ชนะ", r.W], ["เสมอ", r.D], ["แพ้", r.L], ["ได้", r.GF], ["เสีย", r.GA], ["ผลต่าง", r.GD], ["แต้ม", r.PTS]];
  const tone = (l, v) => l === "แต้ม" ? "text-accent" : l !== "ผลต่าง" ? "text-ink" : v > 0 ? "text-win" : v < 0 ? "text-loss" : "text-ink";
  const st = p => statsByKey[team.id + "|" + p.id];
  const playerRow = p => {
    const s = st(p);
    return (
      <div key={p.id} className="grid grid-cols-[38px_1fr_28px_repeat(4,30px)] items-center gap-1.5 px-3 py-1.5 text-sm tabular-nums">
        <PosBadge pos={p.pos} />
        <span className="flex min-w-0 items-center gap-1.5">
          <span className={"truncate " + (p.name ? "text-ink" : "text-faint")}>{p.name || "ยังไม่ใส่ชื่อ"}</span>
          <CardBadge card={p.name ? p.card : ""} />
          <EfhubLink url={p.name ? p.efhub : ""} name={p.name} />
        </span>
        <span className="text-center font-display text-xs font-bold italic text-ink">{p.ovr === "" || p.ovr == null ? "–" : p.ovr}</span>
        <span className="text-center text-xs text-soft">{s ? s.apps : 0}</span>
        <span className="text-center text-xs font-semibold text-accent">{s ? s.G : 0}</span>
        <span className="text-center text-xs text-soft">{s ? s.A : 0}</span>
        <span className="text-center text-xs text-soft">{fmtAvg(s && s.avg)}</span>
      </div>
    );
  };
  const head = (
    <div className="grid grid-cols-[38px_1fr_28px_repeat(4,30px)] gap-1.5 px-3 pb-1 pt-2 text-[10px] text-muted">
      <span /><span /><span className="text-center">OVR</span><span className="text-center">นัด</span><span className="text-center">ประตู</span><span className="text-center">แอส</span><span className="text-center">เฉลี่ย</span>
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

      <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,300px)_1fr]">
        <div>
          <SubHead>ตัวจริง 11 คน</SubHead>
          <Pitch players={squad} />
        </div>
        <div>
          <SubHead>รายชื่อนักเตะ ({namedPlayers(team).length}/23)</SubHead>
          <div className="rounded-xl bg-sunken ring-1 ring-line/15">
            {head}
            <div className="px-3 pt-1 text-[11px] font-semibold text-accent">ตัวจริง</div>
            {squad.filter(p => p.starter).map(playerRow)}
            <div className="mt-1 border-t border-line/10 px-3 pt-2 text-[11px] font-semibold text-soft">สำรอง</div>
            {squad.filter(p => !p.starter).map(playerRow)}
            <div className="h-2" />
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

/* ══════════════════════════ SCHEDULE MODAL (เลื่อนวัน) ══════════════════════════ */
function ScheduleModal({ match, teams, onClose, onSave }) {
  const [date, setDate] = useState(match.date || isoDate(new Date()));
  const [time, setTime] = useState(timeOf(match));
  const h = teams.find(t => t.id === match.home), a = teams.find(t => t.id === match.away);
  return (
    <Modal onClose={onClose}>
      <ModalHead kicker={"สัปดาห์ที่ " + match.round} title="เลื่อนวัน / เวลาแข่ง" onClose={onClose} />
      <div className="mb-5 truncate text-center font-display font-semibold italic text-ink">
        {h && h.name} <span className="text-accent">VS</span> {a && a.name}
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

/* ══════════════════════════ DRIVE PANEL ══════════════════════════ */
const SYNC_TEXT = { off: "ยังไม่ได้เชื่อม", auth: "ต้องเชื่อมต่อ Google อีกครั้ง", busy: "กำลังซิงก์…", ok: "ซิงก์แล้ว", error: "ซิงก์ไม่สำเร็จ" };

function DrivePanel({ ready, drive, sync, isAdmin, onClose, onConnect, onCreate, onOpen, onSync, onShare, onDisconnect }) {
  const [email, setEmail] = useState("");
  const [shareMsg, setShareMsg] = useState(null);
  const [copied, setCopied] = useState(false);
  const appUrl = location.origin + location.pathname.replace(/index\.html$/, "");
  const share = async e => {
    e.preventDefault();
    const to = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return setShareMsg({ kind: "error", text: "อีเมลไม่ถูกต้อง" });
    setShareMsg(null);
    try {
      await onShare(to);
      setShareMsg({ kind: "ok", text: "แชร์ให้ " + to + " แล้ว · Google ส่งอีเมลแจ้งให้ · อย่าลืมส่งลิงก์แอปให้เพื่อนด้วย" });
      setEmail("");
    } catch (err) { setShareMsg({ kind: "error", text: driveError(err) }); }
  };
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(appUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {});
  };
  const box = "rounded-xl bg-sunken p-4 ring-1 ring-line/15";

  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ModalHead kicker="ข้อมูลร่วมกันทุกเครื่อง" title="Google Drive" onClose={onClose} />
      {sync.s === "error" && sync.msg && <div className="mb-4"><Note>{sync.msg}</Note></div>}

      {!ready ? (
        <Note kind="warn">ยังไม่ได้ตั้งค่า Google Drive — แอดมินต้องใส่ Client ID, API key และ Project number ในไฟล์ config.js ก่อน (ดูขั้นตอนใน README หัวข้อ Google Drive)</Note>
      ) : !drive ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-soft">ตอนนี้ข้อมูลอยู่ในเครื่องนี้เครื่องเดียว เชื่อม Google Drive เพื่อให้ทุกคนเห็นตารางคะแนน นักเตะ และใช้บัญชีเดียวกันจากทุกเครื่อง</p>
          <div className={box}>
            <div className="font-display font-semibold italic text-ink">มีคนแชร์ไฟล์ลีกมาให้แล้ว</div>
            <p className="mt-1 text-xs leading-relaxed text-muted">ล็อกอิน Google แล้วเลือกไฟล์ “{DRIVE_FILE_NAME}” · ข้อมูลในเครื่องนี้จะถูกแทนที่ด้วยข้อมูลในไฟล์</p>
            <Btn variant="primary" className="mt-3" onClick={onOpen}><Ic n="cloud" size={14} /> เปิดไฟล์ลีกจาก Drive</Btn>
          </div>
          {isAdmin ? (
            <div className={box}>
              <div className="font-display font-semibold italic text-ink">เริ่มลีกบน Drive (แอดมิน)</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">สร้างไฟล์ใหม่ใน Drive ของคุณจากข้อมูลในเครื่องนี้ (ทีม นักเตะ ผลการแข่ง และบัญชีผู้ใช้) แล้วแชร์ให้เพื่อน</p>
              <Btn className="mt-3" onClick={onCreate}><Ic n="plus" size={14} /> สร้างไฟล์ลีกใหม่</Btn>
            </div>
          ) : <p className="text-xs text-muted">ยังไม่มีไฟล์ลีก? ให้แอดมินล็อกอินในแอปแล้วกด “สร้างไฟล์ลีกใหม่” ก่อน</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <div className={box}>
            <div className="flex items-center gap-2">
              <Ic n="cloud" size={16} className="shrink-0 text-link" />
              <span className="min-w-0 flex-1 truncate font-medium text-ink">{drive.name || DRIVE_FILE_NAME}</span>
              {drive.link && <a href={drive.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs text-link hover:underline">เปิดใน Drive ↗</a>}
            </div>
            <div className="mt-1 text-xs text-muted">
              {drive.owner ? "เจ้าของ: " + drive.owner + " · " : ""}{SYNC_TEXT[sync.s]}
              {sync.at ? " · " + new Date(sync.at).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น." : ""}
            </div>
            <div className="mt-3">
              {sync.s === "auth"
                ? <Btn variant="primary" onClick={onConnect}><Ic n="login" size={14} /> เชื่อมต่อ Google</Btn>
                : <Btn onClick={onSync} disabled={sync.s === "busy"}><Ic n="refresh" size={14} /> ซิงก์ตอนนี้</Btn>}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted">ซิงก์อัตโนมัติทุกครั้งที่แก้ไข และเช็กของใหม่ทุก 20 วินาที · ถ้าสองเครื่องแก้คนละเรื่องพร้อมกัน จะรวมให้ทั้งคู่ · ถ้าแก้เรื่องเดียวกัน เครื่องที่ซิงก์ทีหลังชนะ</p>
          </div>
          {isAdmin && (
            <form onSubmit={share} noValidate className={box}>
              <div className="font-display font-semibold italic text-ink">แชร์ให้เพื่อน</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">ใส่ Gmail ของเพื่อน → เพื่อนได้สิทธิ์แก้ไขไฟล์ แล้วส่งลิงก์แอปให้เพื่อนเปิด › Google Drive › เปิดไฟล์ลีก</p>
              <div className="mt-3 flex gap-2">
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setShareMsg(null); }} placeholder="friend@gmail.com" aria-label="อีเมลเพื่อน" className={INPUT} />
                <Btn type="submit" variant="primary" disabled={sync.s === "auth"} className="shrink-0"><Ic n="mail" size={14} /> แชร์</Btn>
              </div>
              {shareMsg && <div className="mt-2"><Note kind={shareMsg.kind}>{shareMsg.text}</Note></div>}
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-page/60 px-3 py-2 text-xs ring-1 ring-line/15">
                <span className="min-w-0 flex-1 truncate text-soft">{appUrl}</span>
                <button type="button" onClick={copy} className="flex shrink-0 items-center gap-1 text-link hover:text-accent">
                  <Ic n="copy" size={12} /> {copied ? "คัดลอกแล้ว" : "คัดลอกลิงก์แอป"}
                </button>
              </div>
            </form>
          )}
          <button type="button" onClick={onDisconnect} className="w-full text-center text-xs text-muted hover:text-loss">
            ยกเลิกการเชื่อม Drive ในเครื่องนี้ (ข้อมูลในเครื่องยังอยู่)
          </button>
        </div>
      )}
      <p className="mt-5 border-t border-line/15 pt-3 text-[11px] leading-relaxed text-muted">
        ทุกคนที่ได้รับแชร์ไฟล์ แก้ข้อมูลในไฟล์ได้โดยตรง (รวมรายชื่อบัญชี) — แชร์เฉพาะเพื่อนที่ไว้ใจ · รหัสผ่านในไฟล์ถูกเข้ารหัส ไม่เก็บตัวจริง
      </p>
    </Modal>
  );
}

/* ══════════════════════════ PLAYER STATS TAB ══════════════════════════ */
const PLAYER_SORTS = {
  G:    { label: "ดาวซัลโว",    fn: (a, b) => b.G - a.G || b.A - a.A || a.name.localeCompare(b.name), keep: s => s.G > 0 },
  A:    { label: "แอสซิสต์",    fn: (a, b) => b.A - a.A || b.G - a.G || a.name.localeCompare(b.name), keep: s => s.A > 0 },
  avg:  { label: "คะแนนเฉลี่ย", fn: (a, b) => b.avg - a.avg || b.rN - a.rN || a.name.localeCompare(b.name), keep: s => s.avg != null },
  motm: { label: "MOTM",       fn: (a, b) => b.motm - a.motm || (b.avg || 0) - (a.avg || 0), keep: s => s.motm > 0 },
};

function PlayersTab({ stats }) {
  const [sort, setSort] = useState("G");
  const rows = useMemo(() => stats.filter(PLAYER_SORTS[sort].keep).sort(PLAYER_SORTS[sort].fn), [stats, sort]);
  const hi = k => k === sort ? "text-accent" : "";
  return (
    <div className="fl-enter">
      <SectionTitle icon="target" kicker="Player Stats" title="สถิตินักเตะ" />
      <Segmented value={sort} onChange={setSort} items={Object.entries(PLAYER_SORTS).map(([k, v]) => [k, v.label])} />
      <Card className="overflow-x-auto">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-[40px_1fr_repeat(7,44px)] gap-2 border-b border-line/15 px-4 py-3 text-[11px] font-semibold text-muted">
            <div>#</div><div>นักเตะ</div>
            <div className="text-center">นัด</div>
            <div className={"text-center " + hi("G")}>G</div>
            <div className={"text-center " + hi("A")}>A</div>
            <div className={"text-center " + hi("avg")}>เฉลี่ย</div>
            <div className={"text-center " + hi("motm")}>MOTM</div>
            <div className="text-center">🟨</div>
            <div className="text-center">🟥</div>
          </div>
          {rows.length === 0 && <div className="py-12 text-center text-sm text-muted">ยังไม่มีข้อมูล</div>}
          {rows.map((s, i) => (
            <div key={s.key} className={"grid grid-cols-[40px_1fr_repeat(7,44px)] items-center gap-2 px-4 py-3 text-sm tabular-nums transition hover:bg-line/[0.05] " + (i < rows.length - 1 ? "border-b border-line/10" : "")}>
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
              <div className="text-center text-soft">{fmtAvg(s.avg)}</div>
              <div className="text-center text-soft">{s.motm || "–"}</div>
              <div className="text-center text-muted">{s.Y || "–"}</div>
              <div className="text-center text-muted">{s.R || "–"}</div>
            </div>
          ))}
        </div>
      </Card>
      <p className="mt-3 text-xs text-muted">นัด = ลงเล่น · เฉลี่ย = คะแนนเฉลี่ยจากนัดที่แอดมิน/กรรมการให้คะแนน · MOTM = ผู้เล่นยอดเยี่ยมประจำนัด</p>
    </div>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════ */
function FriendsLeague() {
  const [teams, setTeams]     = useState(() => load("fl_teams", SEED_TEAMS).map(withSquad));
  const [matches, setMatches] = useState(() => load("fl_matches", SEED_MATCHES));
  const [users, setUsers]     = useState(() => load("fl_users", []));
  const [session, setSession] = useState(() => { const s = load("fl_session", null); return s && s.exp > Date.now() ? s : null; });
  const [tab, setTab]         = useState("home");
  const [showLogin, setShowLogin]     = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [editMatch, setEditMatch]     = useState(null);
  const [teamModal, setTeamModal]     = useState(null);
  const [squadTeamId, setSquadTeamId] = useState(null);
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
  const user    = (session && users.find(u => u.id === session.uid)) || null;
  const canEdit = !!user && (user.role === "admin" || user.role === "referee");
  const isAdmin = !!user && user.role === "admin";
  const myTeam  = user && user.role === "manager" ? teams.find(t => t.id === user.teamId) : null;
  const canEditSquad = t => isAdmin || (!!myTeam && myTeam.id === t.id);
  const rankOf  = id => standings.findIndex(r => r.team.id === id) + 1;
  const rowOf   = id => standings.find(r => r.team.id === id);
  const openProfile = t => setProfileId(t.id);
  const profileTeam = teams.find(t => t.id === profileId);
  const squadTeam   = teams.find(t => t.id === squadTeamId);

  // แท็บ "ทีมของฉัน" หายเมื่อออกจากระบบ → กลับหน้าแรก
  useEffect(() => { if (tab === "myteam" && !(user && user.role === "manager")) setTab("home"); }, [user, tab]);

  /* ── Google Drive sync ──
     base = ข้อมูล + version ตอนซิงก์ครั้งล่าสุด (เก็บในเครื่อง ไว้รวมการแก้ไขแบบ 3 ทางหลังรีโหลด) */
  const [drive, setDrive]   = useState(() => load("fl_drive", null));     // { fileId, name, owner, link }
  const [sync, setSync]     = useState(() => ({ s: load("fl_drive", null) ? (Drive.valid() ? "ok" : "auth") : "off", at: 0, msg: "" }));
  const [showDrive, setShowDrive] = useState(false);
  const baseRef  = useRef(load("fl_drive_base", null));
  const dataRef  = useRef(null);
  const driveRef = useRef(drive);
  const meRef    = useRef("");
  const skipPush = useRef(false);
  const queue    = useRef(Promise.resolve());
  dataRef.current = { teams, matches, users };
  driveRef.current = drive;
  meRef.current = user ? user.name : "";

  useEffect(() => {
    if (drive) save("fl_drive", drive);
    else try { localStorage.removeItem("fl_drive"); } catch (e) {}
  }, [drive]);
  const setBase = b => {
    baseRef.current = b;
    if (b) save("fl_drive_base", b);
    else try { localStorage.removeItem("fl_drive_base"); } catch (e) {}
  };
  // ข้อมูลที่มาจาก Drive → ใส่ state โดยไม่ส่งกลับขึ้น Drive ซ้ำ
  const applyData = d => { skipPush.current = true; dataRef.current = d; setTeams(d.teams); setMatches(d.matches); setUsers(d.users); };

  // ซิงก์ทีละงาน (ต่อคิว) กันสองงานเขียนทับกัน
  const syncNow = () => {
    const job = async () => {
      const d = driveRef.current;
      if (!d) return;
      if (!Drive.valid()) { setSync(s => ({ ...s, s: "auth" })); return; }
      setSync(s => ({ ...s, s: "busy" }));
      try {
        const local = dataRef.current, base = baseRef.current;
        const meta = await Drive.meta(d.fileId);
        let next = local;
        if (!base || String(meta.version) !== String(base.version)) {
          const raw = await Drive.read(d.fileId);
          if (!validDoc(raw)) throw Object.assign(new Error("bad"), { badFile: true });
          const remote = docData(raw);
          next = base ? mergeData(base.data, local, remote) : remote;
          if (!sameJson(next, local)) applyData(next);
          if (sameJson(next, remote)) { setBase({ version: String(meta.version), data: next }); setSync({ s: "ok", at: Date.now(), msg: "" }); return; }
        } else if (sameJson(local, base.data)) { setSync({ s: "ok", at: Date.now(), msg: "" }); return; }
        if (meta.capabilities && meta.capabilities.canEdit === false) throw Object.assign(new Error("ro"), { readonly: true });
        const res = await Drive.write(d.fileId, makeDoc(next, meRef.current));
        setBase({ version: String(res.version), data: next });
        setSync({ s: "ok", at: Date.now(), msg: "" });
      } catch (e) {
        setSync({ s: e.auth ? "auth" : "error", at: Date.now(), msg: driveError(e) });
      }
    };
    queue.current = queue.current.then(job, job);
    return queue.current;
  };

  // แก้อะไรในเครื่อง → รอ 1.2 วิแล้วซิงก์ (รวมหลายการแก้เป็นครั้งเดียว)
  useEffect(() => {
    if (skipPush.current) { skipPush.current = false; return; }
    if (!driveRef.current) return;
    if (!Drive.valid()) { setSync(s => s.s === "auth" ? s : { ...s, s: "auth" }); return; }
    const t = setTimeout(syncNow, 1200);
    return () => clearTimeout(t);
  }, [teams, matches, users]);

  // เช็กของใหม่จากเพื่อนทุก 20 วิ (เฉพาะตอนเปิดหน้านี้อยู่)
  useEffect(() => {
    if (!drive) return;
    const t = setInterval(() => { if (document.visibilityState === "visible" && Drive.valid()) syncNow(); }, 20000);
    return () => clearInterval(t);
  }, [drive && drive.fileId]);

  const driveInfo = (id, meta) => ({ fileId: id, name: meta.name || DRIVE_FILE_NAME, link: meta.webViewLink || "",
    owner: (meta.owners && meta.owners[0] && meta.owners[0].displayName) || "" });
  const withGoogle = async fn => {
    try { if (!Drive.valid()) await Drive.signIn(); await fn(); }
    catch (e) { setSync(s => ({ ...s, s: e.auth ? "auth" : "error", at: Date.now(), msg: driveError(e) })); }
  };
  const connectDrive = () => withGoogle(() => syncNow());
  const createDrive = () => withGoogle(async () => {
    const data = dataRef.current;
    const f = await Drive.create(makeDoc(data, meRef.current));
    const meta = await Drive.meta(f.id);
    setBase({ version: String(meta.version), data });
    setDrive(driveInfo(f.id, meta));
    setSync({ s: "ok", at: Date.now(), msg: "" });
  });
  const openDrive = () => withGoogle(async () => {
    const id = await Drive.pick();
    if (!id) return;
    const [meta, raw] = await Promise.all([Drive.meta(id), Drive.read(id)]);
    if (!validDoc(raw)) throw Object.assign(new Error("bad"), { badFile: true });
    if (!confirm("ข้อมูลในเครื่องนี้ (ทีม นักเตะ ผลการแข่ง บัญชี) จะถูกแทนที่ด้วยข้อมูลจากไฟล์ใน Drive · ดำเนินการต่อ?")) return;
    const data = docData(raw);
    applyData(data);
    setBase({ version: String(meta.version), data });
    setDrive(driveInfo(id, meta));
    setSync({ s: "ok", at: Date.now(), msg: "" });
  });
  const disconnectDrive = () => {
    if (!confirm("หยุดซิงก์กับ Google Drive ในเครื่องนี้? ข้อมูลในเครื่องยังอยู่ แต่จะไม่อัปเดตกับเพื่อนอีก")) return;
    setDrive(null); setBase(null); setSync({ s: "off", at: 0, msg: "" });
  };
  const shareDrive = email => Drive.share(drive.fileId, email);
  const PILL = {
    ok:    ["ซิงก์แล้ว",   "bg-win/10 text-win ring-win/30"],
    busy:  ["กำลังซิงก์",  "bg-link/10 text-link ring-link/30"],
    auth:  ["เชื่อม Drive", "bg-accent/15 text-accent ring-accent/40"],
    error: ["ซิงก์ไม่ได้",  "bg-loss/10 text-loss ring-loss/30"],
  }[sync.s] || ["Drive", "bg-line/10 text-soft ring-line/20"];

  /* ── auth ── */
  const login = u => { setSession(newSession(u)); setShowLogin(false); if (u.role === "manager") setTab("myteam"); };
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
    const nu = makeUser(f, users);
    setUsers(nu.teamId ? assignTeam([...users, nu], nu.id, nu.teamId) : [...users, nu]);
    return "";
  };
  const adminCount = users.filter(u => u.role === "admin").length;
  const updateUser = (id, patch) => {
    const target = users.find(u => u.id === id);
    if (!target || id === user.id) return;
    if (patch.role && target.role === "admin" && patch.role !== "admin" && adminCount <= 1) return;   // ต้องเหลือแอดมินอย่างน้อย 1
    if ("teamId" in patch) return setUsers(assignTeam(users, id, patch.teamId));
    setUsers(users.map(u => u.id === id ? { ...u, ...patch, teamId: (patch.role || u.role) === "manager" ? u.teamId : null } : u));
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
  const saveResult = (id, hs, as, events, perf, motm) => {
    setMatches(matches.map(m => m.id === id ? { ...m, hs, as, events, perf, motm, status:"done" } : m));
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

  // แอดมิน: สร้าง/แก้ทีม + ผูกบัญชีผู้จัดการทีม
  const saveTeam = (f, managerId) => {
    const id = f.id || uniqueId();
    const team = withSquad({ ...f, id });
    setTeams(f.id ? teams.map(t => t.id === id ? team : t) : [...teams, team]);
    const current = users.find(u => u.role === "manager" && u.teamId === id);
    if (managerId) setUsers(assignTeam(users, managerId, id));
    else if (current) setUsers(users.map(u => u.id === current.id ? { ...u, teamId: null } : u));
    setTeamModal(null);
  };

  const deleteTeam = id => {
    const t = teams.find(x => x.id === id);
    if (!confirm("ลบทีม " + (t ? t.name : "") + " พร้อมนัดแข่งของทีมนี้ทั้งหมด?")) return;
    setTeams(teams.filter(x => x.id !== id));
    setMatches(matches.filter(m => m.home !== id && m.away !== id));
    setUsers(users.map(u => u.teamId === id ? { ...u, teamId: null } : u));
    setTeamModal(null);
  };

  // ผู้จัดการทีมแก้ได้แค่ชื่อ/สีของทีมตัวเอง · แอดมินแก้ได้ทุกทีม
  const saveIdentity = (id, patch) => {
    if (!(isAdmin || (myTeam && myTeam.id === id))) return;
    setTeams(teams.map(t => t.id === id ? { ...t, name: patch.name, kit: patch.kit } : t));
  };
  const saveSquad = (id, players) => {
    const t = teams.find(x => x.id === id);
    if (!t || !canEditSquad(t)) return;
    setTeams(teams.map(x => x.id === id ? { ...x, players } : x));
  };

  // ล้างแค่ข้อมูลลีก (ทีม/นัด) — บัญชีผู้ใช้ยังอยู่
  const resetAll = () => {
    if (!confirm("ล้างทีม นักเตะ และผลการแข่งทั้งหมด แล้วกลับไปใช้ข้อมูลตัวอย่าง? (บัญชีผู้ใช้ไม่ถูกลบ)" +
      (drive ? "\n\n⚠️ เชื่อม Google Drive อยู่ — ข้อมูลของทุกคนในไฟล์ลีกจะถูกรีเซ็ตด้วย" : ""))) return;
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
      setShareBlob(await renderStandingsPng(standings, sub));
    } catch (e) { alert("สร้างรูปไม่สำเร็จ"); }
    finally { setSharing(false); }
  };

  /* ── Export / Import JSON (ทีม นักเตะ นัด — ไม่รวมบัญชีผู้ใช้) ── */
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
        if (Array.isArray(d.teams))   setTeams(d.teams.map(withSquad));
        if (Array.isArray(d.matches)) setMatches(d.matches);
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
      onResult={setEditMatch} onSchedule={setScheduleMatch} />
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
          {drive && (
            <button onClick={() => sync.s === "auth" ? connectDrive() : setShowDrive(true)}
              aria-label={"Google Drive: " + SYNC_TEXT[sync.s]} title={"Google Drive: " + SYNC_TEXT[sync.s]}
              className={"flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 transition hover:brightness-125 " + PILL[1]}>
              <Ic n="cloud" size={15} />
              <span className="hidden sm:inline">{PILL[0]}</span>
              {sync.s === "busy" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
            </button>
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
          ) : (
            <Btn variant="primary" onClick={() => setShowLogin(true)} className="shrink-0">
              <Ic n="login" size={14} /> {users.length ? "เข้าสู่ระบบ" : "ตั้งค่าแอดมิน"}
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
                  <p className="-mt-1 mb-4 text-xs leading-relaxed text-muted">ตัวจริงต้องมี 11 คน สำรอง 12 คน · กดปุ่ม “ตัวจริง/สำรอง” เพื่อสลับ · เลือกตำแหน่งได้ที่ป้ายสีด้านหน้า · ผลงานของนักเตะแต่ละคน แอดมินจะบันทึกให้หลังจบแต่ละนัด</p>
                  <SquadEditor team={myTeam} onSave={players => saveSquad(myTeam.id, players)} />
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
            <p className="mt-3 text-xs text-muted">▲▼ = อันดับที่ขยับจากก่อนสัปดาห์ล่าสุด · กดที่ทีมเพื่อดูโปรไฟล์และรายชื่อนักเตะ</p>
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
                  <div className="mb-3 flex items-baseline gap-2">
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
        {tab === "players" && <PlayersTab stats={pstats} />}

        {/* ═══ TEAMS ═══ */}
        {tab === "teams" && (
          <div className="fl-enter">
            <SectionTitle icon="users" kicker="Squad Collection" title="ทีมทั้งหมด"
              action={isAdmin ? <Btn variant="primary" onClick={() => setTeamModal({})}><Ic n="plus" size={15} /> สร้างทีมใหม่</Btn> : null} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {teams.map(teamCard)}
            </div>
          </div>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative border-t border-line/10 py-7 text-center text-xs text-muted">
        <div>Friends League · eFootball 2027 Mobile · บันทึกผลด้วยมือ (ไม่เชื่อมต่อ Konami API)</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Btn onClick={() => setShowDrive(true)}><Ic n="cloud" size={13} /> Google Drive</Btn>
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

      {showLogin && <LoginModal users={users} onClose={() => setShowLogin(false)} onLogin={login} onSetup={setupAdmin} />}
      {showAccount && user && (
        <AccountModal user={user} users={users} teams={teams} onClose={() => setShowAccount(false)} onLogout={logout}
          onChangePassword={changePassword} onAddUser={addUser} onUpdateUser={updateUser}
          onResetPassword={resetPassword} onDeleteUser={deleteUser}
          onMyTeam={() => { setShowAccount(false); setTab("myteam"); }} />
      )}
      {editMatch && <ResultModal match={editMatch} teams={teams} onClose={() => setEditMatch(null)} onSave={saveResult} />}
      {teamModal && (
        <TeamModal team={teamModal.id ? teamModal : null} users={users} onClose={() => setTeamModal(null)} onSave={saveTeam} onDelete={deleteTeam}
          onSquad={t => { setTeamModal(null); setSquadTeamId(t.id); }} />
      )}
      {squadTeam && <SquadModal team={squadTeam} onClose={() => setSquadTeamId(null)} onSave={players => saveSquad(squadTeam.id, players)} />}
      {profileTeam && (
        <TeamProfile team={profileTeam} rank={rankOf(profileTeam.id)} row={rowOf(profileTeam.id)}
          matches={matches} teams={teams} statsByKey={statsByKey}
          canEditTeam={isAdmin} canEditSquad={canEditSquad(profileTeam)}
          onEdit={t => { setProfileId(null); setTeamModal(t); }}
          onSquad={t => { setProfileId(null); if (isAdmin) setSquadTeamId(t.id); else setTab("myteam"); }}
          onClose={() => setProfileId(null)} />
      )}
      {scheduleMatch && <ScheduleModal match={scheduleMatch} teams={teams} onClose={() => setScheduleMatch(null)} onSave={saveSchedule} />}
      {fixtureOpen && (
        <FixtureModal teams={teams} matchCount={matches.length} doneCount={done.length}
          onClose={() => setFixtureOpen(false)} onCreate={createFixtures} />
      )}
      {shareBlob && <ShareModal blob={shareBlob} onClose={() => setShareBlob(null)} />}
      {showDrive && (
        <DrivePanel ready={driveReady()} drive={drive} sync={sync} isAdmin={isAdmin} onClose={() => setShowDrive(false)}
          onConnect={connectDrive} onCreate={createDrive} onOpen={openDrive} onSync={() => syncNow()}
          onShare={shareDrive} onDisconnect={disconnectDrive} />
      )}
    </div>
  );
}

/* ══════════════════════════ MOUNT ══════════════════════════ */
ReactDOM.createRoot(document.getElementById("root")).render(<FriendsLeague />);
