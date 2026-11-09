import * as THREE from "./vendor/three.module.js";

const GRAVITY = -32;
const RUN = 7;
const JUMP_V = 11;
const H = 1.62;
const HW = 0.32;
const HD = 0.24;
const view = document.querySelector("#view");
const hud = document.querySelector("#hud");
const coinCountEl = document.querySelector("#coin-count");
const gemCountEl = document.querySelector("#gem-count");
const coinsEl = document.querySelector("#coins");
const gemsEl = document.querySelector("#gems");
const hintEl = document.querySelector("#hint");
const toastEl = document.querySelector("#toast");
const homeEl = document.querySelector("#home");
const dresserEl = document.querySelector("#dresser");
const shopEl = document.querySelector("#shop");
const shopNote = document.querySelector("#shop-note");
const catalogEl = document.querySelector("#catalog");
const gamesEl = document.querySelector("#games");
const winCard = document.querySelector("#win");
const winTitle = document.querySelector("#win-title");
const winText = document.querySelector("#win-text");
const dressBtn = document.querySelector("#dress");
const shopOpenBtn = document.querySelector("#shop-open");
const dressedBtn = document.querySelector("#dressed");
const shopCloseBtn = document.querySelector("#shop-close");
const replayBtn = document.querySelector("#replay");
const resetBtn = document.querySelector("#reset");
const casaBtn = document.querySelector("#casa");
const winHomeBtn = document.querySelector("#win-home");
const muteBtn = document.querySelector("#mute");

const SAVE_KEY = "brunux-save-v1";
const DEFAULT_LOOK = {
  skin: "#f6c7a8",
  shirt: "#ff6b4a",
  pants: "#3e4c8a",
  shoes: "#ffb703",
  hair: "#4a2c24",
  eyes: "#1aa894",
  hairStyle: "rizos",
};
const CATALOG = [
  { slot: "hat", id: "flor", name: "Flor", price: 5, pay: "coins" },
  { slot: "hat", id: "helice", name: "Hélice", price: 8, pay: "coins" },
  { slot: "hat", id: "corona", name: "Corona", price: 12, pay: "coins" },
  { slot: "trail", id: "estrellas", name: "Estrellas", price: 6, pay: "coins" },
  { slot: "trail", id: "hojas", name: "Hojas", price: 10, pay: "coins" },
  { slot: "pet", id: "pajaro", name: "Pájaro", price: 2, pay: "gems" },
  { slot: "pet", id: "nube", name: "Nube", price: 3, pay: "gems" },
  { slot: "pet", id: "ranita", name: "Ranita", price: 4, pay: "gems" },
];
const SLOT_LABEL = { hat: "Sombreros", trail: "Rastros", pet: "Mascotas" };

const COURSES = [
  {
    id: "cuesta",
    name: "La cuesta",
    winTitle: "¡Piscina de bolas!",
    ending: "balls",
    tint: "#ff6b4a",
    shade: "#d84d32",
    hill: 0x8ed48a,
    wall: 0xe0b15a,
    steps: [
      { id: "start", x: 0, z: 4, d: 8, top: 6, w: 8, color: 0x67c587 },
      { id: "a", x: 0, z: -6.45, d: 6.5, top: 5.5, w: 7, color: 0xf2c14e },
      { id: "b", x: 0, z: -16.15, d: 6.5, top: 5.1, w: 7, color: 0x7ec8e3, belt: 2 },
      { id: "c", x: 0, z: -25.35, d: 5.5, top: 6.2, w: 6, color: 0xf7a1c4 },
      { id: "d", x: 0, z: -34.55, d: 6.5, top: 5.0, w: 7, color: 0xb497f0 },
      { id: "e", x: 0, z: -43.5, d: 5, top: 6.1, w: 5.2, color: 0xff8c6a },
      { id: "f", x: 0, z: -52.45, d: 6.5, top: 4.8, w: 7, color: 0x7ed6a5 },
      { id: "g", x: 0, z: -61.9, d: 6, top: 4.4, w: 6, color: 0xf2c14e },
      { id: "finish", x: 0, z: -73.6, d: 11, top: 3.6, w: 10, color: 0xf2d36b },
    ],
    coins: [
      { x: 0, y: 6.4, z: -6.45 },
      { x: 0, y: 6.0, z: -16.15 },
      { x: 0, y: 7.1, z: -25.35 },
      { x: 0, y: 5.9, z: -34.55 },
      { x: 0, y: 7.0, z: -43.5 },
      { x: 0, y: 5.3, z: -61.9 },
    ],
    gems: [
      { x: 1.8, y: 7.05, z: -25.35 },
      { x: -1.4, y: 6.95, z: -43.5 },
    ],
    hills: [[-16, -20, 10], [18, -48, 13], [-14, -90, 11]],
    mushrooms: [[-3.1, 6, 5.2], [3.1, 5.5, -6.45]],
    trees: [[-4.6, 6, 6.2], [4.4, 4.8, -52.45]],
  },
  {
    id: "puente",
    name: "El puente",
    winTitle: "¡El cofre!",
    ending: "chest",
    tint: "#3d7ec9",
    shade: "#2a629e",
    hill: 0x8ed48a,
    wall: 0xc4894a,
    steps: [
      { id: "start", x: 0, z: 4, d: 8, top: 6, w: 7.2, color: 0xd7a85a },
      { id: "a", x: 2.45, z: -5.8, d: 5.2, top: 5.5, w: 4.2, color: 0xc4894a },
      { id: "b", x: -2.45, z: -14.15, d: 5, top: 5.1, w: 4.2, color: 0xe7c98a },
      { id: "c", x: 2.4, z: -22.3, d: 4.6, top: 6.2, w: 4, color: 0xc46b4a, slide: { axis: "x", amp: 0.75, period: 3.2 } },
      { id: "d", x: -2.2, z: -30.4, d: 5.2, top: 5.25, w: 4.2, color: 0xd7a85a },
      { id: "e", x: 2.1, z: -38.6, d: 4.4, top: 6.45, w: 3.8, color: 0xf0d7a2 },
      { id: "finish", x: 0, z: -47.05, d: 6, top: 4.6, w: 6.5, color: 0xc4894a },
    ],
    coins: [
      { x: 2.45, y: 6.4, z: -5.8 },
      { x: -2.45, y: 6.0, z: -14.15 },
      { x: 2.4, y: 7.1, z: -22.3 },
      { x: -2.2, y: 6.15, z: -30.4 },
      { x: 2.1, y: 7.35, z: -38.6 },
    ],
    gems: [
      { x: -3.3, y: 6.0, z: -14.15 },
      { x: -1.15, y: 6.15, z: -30.4 },
    ],
    hills: [[-14, -8, 9], [16, -28, 12], [-12, -58, 10]],
    mushrooms: [[-2.3, 6, 6.2], [2.3, 6, 6.4]],
    trees: [[-5.4, 6, 3.2], [5.2, 5.1, -14.15]],
  },
  {
    id: "nubes",
    name: "Las nubes",
    winTitle: "¡La estrella!",
    ending: "star",
    tint: "#7c5cbf",
    shade: "#5d4496",
    hill: 0xc5e6f5,
    wall: 0xfff6ea,
    steps: [
      { id: "start", x: 0, z: 4, d: 7.5, top: 7, w: 7, color: 0xfff6ea },
      { id: "a", x: 0, z: -5.7, d: 5.4, top: 6.15, w: 5.6, color: 0xd7ecff },
      { id: "b", x: 1.15, z: -14.15, d: 4.6, top: 7.45, w: 5, color: 0xffffff },
      { id: "c", x: -1.2, z: -22.25, d: 4.6, top: 6.2, w: 4.8, color: 0xcdb4ff },
      { id: "d", x: 0.2, z: -30.35, d: 4.8, top: 7.5, w: 4.4, color: 0xfff6ea },
      { id: "e", x: 1.35, z: -38.5, d: 4.4, top: 6.3, w: 5, color: 0xb7d4ff, blink: { on: 2.6, off: 0.75 } },
      { id: "f", x: -0.8, z: -46.4, d: 4.8, top: 7.5, w: 4.2, color: 0xffffff },
      { id: "finish", x: 0, z: -55.3, d: 6.5, top: 8.3, w: 7, color: 0xfff3b0 },
    ],
    coins: [
      { x: 0, y: 7.05, z: -5.7 },
      { x: 1.15, y: 8.35, z: -14.15 },
      { x: -1.2, y: 7.1, z: -22.25 },
      { x: 0.2, y: 8.4, z: -30.35 },
      { x: 1.35, y: 7.2, z: -38.5 },
      { x: -0.8, y: 8.4, z: -46.4 },
    ],
    gems: [
      { x: -2.3, y: 7.05, z: -22.25 },
      { x: 2.5, y: 7.15, z: -38.5 },
    ],
    hills: [[-15, -6, 9], [16, -30, 11], [-13, -66, 10]],
    mushrooms: [[-2.2, 7, 6.1], [2.2, 7, 6.3]],
    trees: [[-5.2, 7, 3.4], [5.4, 6.15, -5.7]],
  },
];

function emptyBadges() {
  return Object.fromEntries(COURSES.map((c) => [c.id, false]));
}
function knownIds(slot) {
  return new Set(CATALOG.filter((item) => item.slot === slot).map((item) => item.id));
}
function loadSave() {
  const badges = emptyBadges();
  const owned = { hat: [], pet: [], trail: [] };
  const gear = { hat: null, pet: null, trail: null };
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    const look = { ...DEFAULT_LOOK, ...(raw.look || {}) };
    let coins = Math.max(0, Number(raw.coins) || 0);
    const gems = Math.max(0, Number(raw.gems) || 0);
    if (raw.coins == null && raw.ribbons != null) {
      if (typeof raw.ribbons === "object") {
        coins = Object.values(raw.ribbons).reduce((sum, n) => sum + (Number(n) || 0), 0);
      } else {
        coins = Math.max(0, Number(raw.ribbons) || 0);
      }
    }
    if (raw.badges) {
      for (const id of Object.keys(badges)) badges[id] = !!raw.badges[id];
    }
    for (const slot of Object.keys(owned)) {
      const ids = knownIds(slot);
      const list = Array.isArray(raw.owned?.[slot]) ? raw.owned[slot] : [];
      owned[slot] = list.filter((id) => ids.has(id));
      if (ids.has(raw.gear?.[slot]) && owned[slot].includes(raw.gear[slot])) gear[slot] = raw.gear[slot];
    }
    return { look, coins, gems, badges, owned, gear };
  } catch {
    return { look: { ...DEFAULT_LOOK }, coins: 0, gems: 0, badges, owned, gear };
  }
}
const saved = loadSave();
let avatar = saved.look;
const wallet = { coins: saved.coins, gems: saved.gems };
const badges = saved.badges;
const owned = saved.owned;
const gear = saved.gear;
let course = null;

function persist() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ look: avatar, coins: wallet.coins, gems: wallet.gems, badges, owned, gear }));
}

function showProgress() {
  coinsEl.textContent = `🪙 ${wallet.coins}`;
  gemsEl.textContent = `💎 ${wallet.gems}`;
  for (const btn of gamesEl.querySelectorAll("button")) {
    const mark = btn.querySelector("small");
    if (mark) mark.textContent = badges[btn.dataset.course] ? "★ Insignia" : "☆";
  }
  for (const [id, star] of Object.entries(portalStars)) star.visible = !!badges[id];
}

function scanSpots() {
  if (!player.onGround) return;
  const here = spots.find((s) => player.pos.x > s.minX && player.pos.x < s.maxX && player.pos.z > s.minZ && player.pos.z < s.maxZ);
  if (!here) {
    armedSpot = null;
    return;
  }
  if (here.id === armedSpot) return;
  armedSpot = here.id;
  if (here.kind === "portal") startGame(here.course);
  else if (here.kind === "shop") openShop();
  else openDress();
}

const keys = new Set();
const touch = { left: false, right: false, forward: false, back: false };
let jumpEdge = false;
let muted = false;

const renderer = new THREE.WebGLRenderer({ antialias: true });
if (!renderer.getContext()) {
  document.body.insertAdjacentHTML(
    "beforeend",
    '<p class="err">Este navegador no ha podido abrir el juego.</p>'
  );
  throw new Error("WebGL no disponible");
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
view.append(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9dbff);
scene.fog = new THREE.Fog(0xa9dbff, 28, 78);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 10, 12);

scene.add(new THREE.HemisphereLight(0xfff4df, 0x7eb8e8, 1.15));
const sun = new THREE.DirectionalLight(0xfff7ec, 1.35);
sun.position.set(14, 24, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -30;
sun.shadow.camera.right = 30;
sun.shadow.camera.top = 30;
sun.shadow.camera.bottom = -30;
scene.add(sun);

const sunBall = new THREE.Mesh(
  new THREE.SphereGeometry(2.2, 20, 16),
  new THREE.MeshBasicMaterial({ color: 0xffe38a })
);
sunBall.position.set(18, 22, -20);
scene.add(sunBall);

const courseRoot = new THREE.Group();
const plazaRoot = new THREE.Group();
scene.add(courseRoot, plazaRoot);

const solids = [];
const lobbySolids = [];
const pads = [];
const pickups = [];
const signs = [];
let stopZone = null;

function lighten(hex) {
  return new THREE.Color(hex).lerp(new THREE.Color(0xffffff), 0.32);
}

function groundSolids() {
  return state === "home" ? lobbySolids : solids;
}

function addSolid(spec) {
  const { x, top, z, w, d, h = 1.4, color, cp = null, low = false, id = "", lobby = false, belt = 0, slide = null, blink = null } = spec;
  const solid = {
    id,
    low,
    cp,
    w,
    h,
    d,
    belt,
    slide,
    blink,
    skip: false,
    warn: false,
    ride: null,
    base: { x, top, z },
    mats: [],
    group: null,
    stripes: [],
    beltOff: 0,
    minX: x - w / 2,
    maxX: x + w / 2,
    minY: top - h,
    maxY: top,
    minZ: z - d / 2,
    maxZ: z + d / 2,
    cx: x,
    cy: top,
    cz: z,
  };
  (lobby ? lobbySolids : solids).push(solid);
  if (color != null) {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.78 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    const capMat = new THREE.MeshStandardMaterial({ color: lighten(color), roughness: 0.62 });
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.96, 0.14, d * 0.96), capMat);
    cap.position.set(0, h / 2 - 0.07, 0);
    cap.receiveShadow = true;
    group.add(body, cap);
    group.position.set(x, top - h / 2, z);
    solid.group = group;
    solid.mats = [bodyMat, capMat];
    if (blink) {
      bodyMat.emissive.set(0xff6b4a);
      capMat.emissive.set(0xff6b4a);
      bodyMat.emissiveIntensity = 0;
      capMat.emissiveIntensity = 0;
    }
    (lobby ? plazaRoot : courseRoot).add(group);
    if (belt) addBeltStripes(solid);
  }
  return solid;
}

function addBeltStripes(solid) {
  const yellow = new THREE.MeshStandardMaterial({ color: 0xf2c14e, roughness: 0.45, emissive: 0xf2c14e, emissiveIntensity: 0.12 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.5 });
  const arrowMat = new THREE.MeshStandardMaterial({ color: 0xff6b4a, emissive: 0xff6b4a, emissiveIntensity: 0.25, roughness: 0.4 });
  solid.mats.push(yellow, cream, arrowMat);
  const gap = 1.05;
  const n = Math.ceil(solid.w / gap) + 1;
  for (let i = 0; i < n; i++) {
    const home = -solid.w / 2 + i * gap;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, solid.d * 0.86), i % 2 ? yellow : cream);
    stripe.position.set(home, solid.h / 2 + 0.03, 0);
    stripe.userData.home = home;
    solid.group.add(stripe);
    solid.stripes.push(stripe);
  }
  for (let i = 0; i < 3; i++) {
    const home = -solid.w / 2 + (i + 0.5) * (solid.w / 3);
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 8), arrowMat);
    arrow.rotation.z = -Math.PI / 2;
    arrow.position.set(home, solid.h / 2 + 0.14, 0);
    arrow.userData.home = home;
    solid.group.add(arrow);
    solid.stripes.push(arrow);
  }
}

function moveSolid(solid, x, top, z) {
  solid.minX = x - solid.w / 2;
  solid.maxX = x + solid.w / 2;
  solid.minY = top - solid.h;
  solid.maxY = top;
  solid.minZ = z - solid.d / 2;
  solid.maxZ = z + solid.d / 2;
  solid.cx = x;
  solid.cy = top;
  solid.cz = z;
  if (solid.cp) {
    solid.cp.x = x;
    solid.cp.y = top;
    solid.cp.z = z;
  }
  if (solid.group) solid.group.position.set(x, top - solid.h / 2, z);
}

function tickMovers(dt, time) {
  for (const s of solids) {
    s.ride = null;
    if (s.slide) {
      const prevX = s.cx;
      const prevY = s.maxY;
      const prevZ = s.cz;
      const along = Math.sin((time / s.slide.period) * Math.PI * 2) * s.slide.amp;
      const x = s.base.x + (s.slide.axis === "x" ? along : 0);
      const z = s.base.z + (s.slide.axis === "z" ? along : 0);
      moveSolid(s, x, s.base.top, z);
      s.ride = { x: s.cx - prevX, y: s.maxY - prevY, z: s.cz - prevZ };
    }
    if (s.blink) {
      const period = s.blink.on + s.blink.off;
      const phase = ((time % period) + period) % period;
      const gone = phase >= s.blink.on;
      s.skip = gone;
      s.warn = !gone && phase > s.blink.on - 0.7;
      if (s.group) {
        s.group.visible = !gone;
        const pulse = s.warn ? 0.25 + Math.abs(Math.sin(time * 16)) * 0.75 : 0;
        for (const mat of s.mats) mat.emissiveIntensity = pulse;
      }
    }
    if (s.belt && s.stripes.length) {
      s.beltOff += s.belt * dt;
      const half = s.w / 2 + 0.5;
      const span = s.w + 1;
      for (const stripe of s.stripes) {
        let x = stripe.userData.home + s.beltOff;
        while (x > half) x -= span;
        while (x < -half) x += span;
        stripe.position.x = x;
      }
    }
    if (s.slide && s.cp && checkpoint.id === s.id) {
      checkpoint.x = s.cp.x;
      checkpoint.y = s.cp.y;
      checkpoint.z = s.cp.z;
    }
  }
  for (const pick of pickups) {
    if (!pick.follow) continue;
    pick.mesh.position.x = pick.follow.cx;
    pick.mesh.position.z = pick.follow.cz;
    pick.mesh.visible = !pick.got && !pick.follow.skip;
  }
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function makeSign(text, bg) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = bg;
  roundRect(g, 12, 16, 488, 224, 48);
  g.fill();
  g.fillStyle = "#3a2a22";
  g.font = "700 64px Fredoka, Trebuchet MS, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 256, 138);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 1.15),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true })
  );
  signs.push(mesh);
  return mesh;
}

function addArrow(x, y, z, color) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.2,
    roughness: 0.4,
  });
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.45, 10), mat);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.28, 12), mat);
  head.position.y = 0.36;
  g.add(shaft, head);
  g.position.set(x, y, z);
  scene.add(g);
  return g;
}

const bobbers = [];

function clearCourse() {
  const geos = new Set();
  const mats = new Set();
  courseRoot.traverse((obj) => {
    if (obj.geometry) geos.add(obj.geometry);
    if (obj.material) {
      const list = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of list) mats.add(mat);
    }
  });
  for (const geo of geos) geo.dispose();
  for (const mat of mats) {
    if (mat.map) mat.map.dispose();
    mat.dispose();
  }
  courseRoot.clear();
  solids.length = 0;
  pickups.length = 0;
  ballBase.length = 0;
  ballMesh = null;
}

const spots = [];
const portalStars = {};
const buddies = [];
const SPAWN = { x: 0, y: 6, z: 102 };
let armedSpot = null;

function buildPlaza() {
  addSolid({ lobby: true, id: "plaza", x: 0, top: 6, z: 94, w: 28, d: 24, h: 1.6, color: 0x7dcc8a, cp: null });
  const path = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.06, 16),
    new THREE.MeshStandardMaterial({ color: 0xf2e2c4, roughness: 0.85 })
  );
  path.position.set(0, 6.04, 94);
  path.receiveShadow = true;
  plazaRoot.add(path);

  const portals = [
    { course: "cuesta", x: -7 },
    { course: "puente", x: 0 },
    { course: "nubes", x: 7 },
  ];
  for (const portal of portals) {
    const def = COURSES.find((item) => item.id === portal.course);
    buildPortal(def, portal.x, 86);
    spots.push({ id: def.id, kind: "portal", course: def.id, minX: portal.x - 1.1, maxX: portal.x + 1.1, minZ: 85.1, maxZ: 87.1 });
  }
  buildStall(-10, 99, "Tienda", "#ffd23f");
  buildMirror(10, 99);
  spots.push({ id: "shop", kind: "shop", minX: -11.2, maxX: -8.8, minZ: 97.8, maxZ: 100.2 });
  spots.push({ id: "dress", kind: "dress", minX: 8.8, maxX: 11.2, minZ: 97.8, maxZ: 100.2 });

  for (const [x, z] of [[-12, 104], [12, 104], [-12.4, 86], [12.4, 86]]) treeOn(plazaRoot, x, 6, z);
  for (const [x, z, color] of [[-2.2, 96, 0xff7ab6], [2.4, 93, 0xffd23f], [-5, 90, 0xff6b4a], [5.2, 100, 0x7ec8e3]]) {
    flowerAt(plazaRoot, x, 6, z, color);
  }

  const folks = [
    { x: -4.2, z: 95, yaw: 0.4, skin: "#e0ac8a", shirt: "#3aaa62", pants: "#2f6b4f", hair: "#4a2c24" },
    { x: 3.6, z: 97.5, yaw: -0.8, skin: "#c68642", shirt: "#ffd23f", pants: "#3e4c8a", hair: "#1a1a1a" },
    { x: -3.2, z: 100.5, yaw: 1.2, skin: "#f6c7a8", shirt: "#7c5cbf", pants: "#f4e1c1", hair: "#e6b15a" },
  ];
  for (const folk of folks) {
    const buddy = makeBuddy(folk);
    buddy.position.set(folk.x, 6, folk.z);
    buddy.rotation.y = folk.yaw;
    buddy.userData.baseYaw = folk.yaw;
    buddy.userData.sway = folk.x;
    plazaRoot.add(buddy);
    buddies.push(buddy);
  }
}

function buildPortal(def, x, z) {
  const color = new THREE.Color(def.tint);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
  const glow = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35, roughness: 0.4 });
  for (const side of [-1.15, 1.15]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 2.5, 10), mat);
    post.position.set(x + side, 7.25, z);
    post.castShadow = true;
    plazaRoot.add(post);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.28, 0.28), mat);
  beam.position.set(x, 8.45, z);
  plazaRoot.add(beam);
  const pad = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 2.1), glow);
  pad.position.set(x, 6.05, z);
  plazaRoot.add(pad);
  const sign = makeSign(def.name, def.tint);
  sign.position.set(x, 9.15, z);
  plazaRoot.add(sign);
  const star = starMesh();
  star.scale.setScalar(0.35);
  star.position.set(x, 9.9, z);
  star.visible = !!badges[def.id];
  plazaRoot.add(star);
  portalStars[def.id] = star;
}

function buildStall(x, z, label, bg) {
  const wood = new THREE.MeshStandardMaterial({ color: 0xc4894a, roughness: 0.7 });
  const roof = new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.55 });
  for (const [dx, dz] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.2, 8), wood);
    post.position.set(x + dx, 7.1, z + dz);
    plazaRoot.add(post);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 2.1), roof);
  top.position.set(x, 8.2, z);
  const counter = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 0.5), wood);
  counter.position.set(x, 6.45, z - 0.5);
  plazaRoot.add(top, counter);
  const sign = makeSign(label, bg);
  sign.position.set(x, 8.9, z);
  plazaRoot.add(sign);
}

function buildMirror(x, z) {
  const frame = new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.6 });
  const glass = new THREE.MeshStandardMaterial({ color: 0xc5e6f5, roughness: 0.15, metalness: 0.15 });
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.12), frame);
  postL.position.set(x - 0.55, 6.9, z);
  const postR = postL.clone();
  postR.position.x = x + 0.55;
  const glassMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.45), glass);
  glassMesh.position.set(x, 7.05, z);
  plazaRoot.add(postL, postR, glassMesh);
  const sign = makeSign("Muñeco", "#fff6ea");
  sign.position.set(x + 1.35, 7.95, z);
  plazaRoot.add(sign);
}

function makeBuddy(folk) {
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: folk.skin, roughness: 0.62 });
  const shirt = new THREE.MeshStandardMaterial({ color: folk.shirt, roughness: 0.55 });
  const pants = new THREE.MeshStandardMaterial({ color: folk.pants, roughness: 0.6 });
  const hair = new THREE.MeshStandardMaterial({ color: folk.hair, roughness: 0.8 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), skin);
  head.position.y = 1.18;
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.26, 4, 8), shirt);
  body.position.y = 0.72;
  const legMat = pants;
  const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.18, 3, 6), legMat);
  legL.position.set(-0.12, 0.28, 0);
  const legR = legL.clone();
  legR.position.x = 0.12;
  const mop = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), hair);
  mop.position.set(0, 1.4, -0.02);
  g.add(head, body, legL, legR, mop);
  g.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  return g;
}

function treeOn(parent, x, top, z) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 1.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.8 })
  );
  trunk.position.y = 0.55;
  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 14, 12),
    new THREE.MeshStandardMaterial({ color: 0x3aaa62, roughness: 0.75 })
  );
  leaf.position.y = 1.35;
  g.add(trunk, leaf);
  g.position.set(x, top, z);
  parent.add(g);
}

function flowerAt(parent, x, top, z, color) {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.28, 5),
    new THREE.MeshStandardMaterial({ color: 0x3aaa62 })
  );
  stem.position.y = 0.14;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshStandardMaterial({ color }));
  head.position.y = 0.32;
  g.add(stem, head);
  g.position.set(x, top, z);
  parent.add(g);
}

function buildCourse(def) {
  clearCourse();
  for (const s of def.steps) {
    const solid = addSolid({
      id: s.id,
      x: s.x,
      top: s.top,
      z: s.z,
      w: s.w,
      d: s.d,
      color: s.color,
      cp: s.blink ? null : { x: s.x, y: s.top, z: s.z },
      belt: s.belt || 0,
      slide: s.slide || null,
      blink: s.blink || null,
    });
    if (s.belt) placeSign("Cinta", "#f2c14e", s.x - s.w / 2 - 1.55, s.top + 1.4, s.z);
    if (s.slide && solid.group) {
      const tag = makeSign("Tabla", "#c46b4a");
      tag.position.set(s.w / 2 + 1.55, solid.h / 2 + 1.55, 0);
      solid.group.add(tag);
    }
    if (s.blink) placeSign("Puf", "#fff6ea", s.x - s.w / 2 - 1.55, s.top + 1.55, s.z);
  }
  const fin = def.steps.find((s) => s.id === "finish");
  if (def.ending === "balls") {
    const side = fin.w / 2 + 0.6;
    const wallTop = fin.top + 1.2;
    addSolid({ x: fin.x - side, top: wallTop, z: fin.z, w: 0.7, d: fin.d, h: 1.3, color: def.wall });
    addSolid({ x: fin.x + side, top: wallTop, z: fin.z, w: 0.7, d: fin.d, h: 1.3, color: def.wall });
    addSolid({
      x: fin.x,
      top: wallTop,
      z: fin.z - fin.d / 2,
      w: fin.w + 1.2,
      d: 0.7,
      h: 1.3,
      color: def.wall,
    });
    buildBalls(fin);
  } else if (def.ending === "chest") {
    buildChest(fin);
  } else {
    buildStar(fin);
  }
  for (const coin of def.coins) addPickup("coin", coin.x, coin.y, coin.z);
  for (const gem of def.gems) addPickup("gem", gem.x, gem.y, gem.z);
  for (const pick of pickups) {
    const host = solids.find((s) => (s.slide || s.blink) && Math.hypot(s.base.x - pick.mesh.position.x, s.base.z - pick.mesh.position.z) < 0.45);
    if (host) pick.follow = host;
  }
  const hillMat = new THREE.MeshStandardMaterial({ color: def.hill, roughness: 0.9 });
  for (const [x, z, r] of def.hills) {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), hillMat);
    hill.position.set(x, -r + 1.2, z);
    courseRoot.add(hill);
  }
  for (const [x, top, z] of def.mushrooms) mushroom(x, top, z);
  for (const [x, top, z] of def.trees) tree(x, top, z);
  dressPlace(def);
}

function dressPlace(def) {
  const steps = def.steps.filter((s) => s.id !== "finish");
  const fin = def.steps.find((s) => s.id === "finish");
  if (def.ending === "balls") {
    steps.forEach((s, i) => {
      if (i % 2 === 0) house(s.x + s.w / 2 + 1.35, s.top, s.z, 0xfff6ea, 0xff6b4a);
      else bush(s.x - s.w / 2 - 0.95, s.top, s.z);
      if (i % 2 === 1) flowerAt(courseRoot, s.x + 1.3, s.top, s.z + 0.7, 0xff7ab6);
    });
    const sign = makeSign("Piscina", "#f2d36b");
    sign.position.set(fin.x, fin.top + 3.4, fin.z + 2);
    courseRoot.add(sign);
  } else if (def.ending === "chest") {
    steps.forEach((s, i) => {
      if (s.slide) return;
      barrel(s.x + (i % 2 ? 1 : -1) * (s.w / 2 + 0.75), s.top, s.z);
      if (i === 2) boat(s.x - s.w / 2 - 2.1, s.top - 0.2, s.z);
    });
  } else {
    steps.forEach((s, i) => {
      cloudPuff(s.x + s.w / 2 + 1.15, s.top + 0.55, s.z, 0.62 + (i % 3) * 0.12);
      cloudPuff(s.x - s.w / 2 - 1.05, s.top + 0.3, s.z + 0.4, 0.5);
    });
  }
}

function house(x, top, z, wall, roof) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.05, 1.15),
    new THREE.MeshStandardMaterial({ color: wall, roughness: 0.75 })
  );
  body.position.y = 0.62;
  const hat = new THREE.Mesh(
    new THREE.ConeGeometry(1.05, 0.7, 4),
    new THREE.MeshStandardMaterial({ color: roof, roughness: 0.6 })
  );
  hat.position.y = 1.4;
  hat.rotation.y = Math.PI / 4;
  g.add(body, hat);
  g.position.set(x, top, z);
  g.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  courseRoot.add(g);
}

function bush(x, top, z) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0x3aaa62, roughness: 0.8 })
  );
  mesh.position.set(x, top + 0.35, z);
  mesh.castShadow = true;
  courseRoot.add(mesh);
}

function barrel(x, top, z) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.32, 0.55, 10),
    new THREE.MeshStandardMaterial({ color: 0xc4894a, roughness: 0.7 })
  );
  mesh.position.set(x, top + 0.28, z);
  mesh.castShadow = true;
  courseRoot.add(mesh);
}

function boat(x, top, z) {
  const g = new THREE.Group();
  const hull = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.32, 2.1),
    new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.7 })
  );
  hull.position.y = 0.18;
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 1.35, 6),
    new THREE.MeshStandardMaterial({ color: 0xf4e1c1 })
  );
  mast.position.y = 0.95;
  const sail = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xfff6ea, side: THREE.DoubleSide })
  );
  sail.position.set(0.28, 1.02, 0);
  g.add(hull, mast, sail);
  g.position.set(x, top, z);
  courseRoot.add(g);
}

function cloudPuff(x, y, z, s) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
  for (const [dx, dy, sc] of [[0, 0, 1], [-0.55, -0.08, 0.72], [0.5, -0.04, 0.66]]) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(s * sc, 12, 10), mat);
    puff.position.set(dx * s, dy * s, 0);
    g.add(puff);
  }
  g.position.set(x, y, z);
  courseRoot.add(g);
}

function buildClouds() {
  for (let i = 0; i < 7; i++) {
    const cloud = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
    for (let k = 0; k < 3; k++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.7 + Math.random() * 0.4, 12, 10), mat);
      p.position.set(k * 0.8, Math.random() * 0.2, 0);
      cloud.add(p);
    }
    cloud.position.set(-18 + i * 7, 14 + (i % 3), -10 - i * 12);
    cloud.userData.speed = 0.25 + i * 0.04;
    scene.add(cloud);
    bobbers.push(cloud);
  }
}

function arch(z) {
  const mat = new THREE.MeshStandardMaterial({ color: 0x6d5cae, roughness: 0.55 });
  for (const x of [-3.15, 3.15]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 1.7, 12), mat);
    post.position.set(x, 5.85, z);
    post.castShadow = true;
    scene.add(post);
  }
}

function placeSign(text, bg, x, y, z) {
  const mesh = makeSign(text, bg);
  mesh.position.set(x, y, z);
  courseRoot.add(mesh);
}

function addPickup(kind, x, y, z) {
  const mesh = kind === "gem" ? makeGem() : makeCoin();
  mesh.position.set(x, y, z);
  courseRoot.add(mesh);
  pickups.push({ mesh, kind, got: false, baseY: y });
}

function makeCoin() {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.07, 16),
    new THREE.MeshStandardMaterial({ color: 0xffd23f, metalness: 0.4, roughness: 0.28 })
  );
  mesh.castShadow = true;
  return mesh;
}

function makeGem() {
  const mesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.26, 0),
    new THREE.MeshStandardMaterial({ color: 0x3ddec8, emissive: 0x1aa894, emissiveIntensity: 0.35, roughness: 0.22 })
  );
  mesh.castShadow = true;
  return mesh;
}

function buildChest(fin) {
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.72 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffd23f, metalness: 0.45, roughness: 0.32 });
  const cloth = new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.55, side: THREE.DoubleSide });
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.62, 0.78), wood);
  box.position.y = 0.42;
  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.22, 0.82), wood);
  lid.position.set(0, 0.78, -0.28);
  lid.rotation.x = -0.7;
  const strap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.66, 0.82), gold);
  strap.position.y = 0.44;
  const jewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), gold);
  jewel.position.set(0, 1.02, 0.08);
  g.add(box, lid, strap, jewel);
  g.scale.setScalar(1.55);
  g.position.set(fin.x + 0.4, fin.top, fin.z - 0.2);
  g.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 4.4, 8), wood);
  mast.position.set(fin.x - 1.6, fin.top + 2.2, fin.z + 0.8);
  mast.castShadow = true;
  const sail = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.15), cloth);
  sail.position.set(fin.x - 0.65, fin.top + 3.5, fin.z + 0.8);
  courseRoot.add(g, mast, sail);
}

function starMesh() {
  const shape = new THREE.Shape();
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 0.95 : 0.4;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const mesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 }),
    new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0xffb703, emissiveIntensity: 0.45, roughness: 0.32 })
  );
  mesh.castShadow = true;
  return mesh;
}

function buildStar(fin) {
  const star = starMesh();
  star.position.set(fin.x, fin.top + 1.45, fin.z);
  courseRoot.add(star);
  const colors = [0xff6b4a, 0xffd23f, 0x7ed6a5, 0x7ec8e3, 0xcdb4ff];
  colors.forEach((color, i) => {
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(1.5 + i * 0.28, 0.07, 8, 18, Math.PI),
      new THREE.MeshStandardMaterial({ color, roughness: 0.4 })
    );
    arc.position.set(fin.x, fin.top + 0.05, fin.z - 0.3);
    courseRoot.add(arc);
  });
}

function makeBow(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.42 });
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), mat);
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.2), mat);
  left.position.set(-0.14, -0.12, 0);
  left.rotation.z = 0.45;
  const right = left.clone();
  right.position.x = 0.14;
  right.rotation.z = -0.45;
  g.add(knot, left, right);
  return g;
}

let ballMesh;
const ballBase = [];

function buildBalls(pit) {
  const geo = new THREE.SphereGeometry(0.26, 14, 12);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.38 });
  ballMesh = new THREE.InstancedMesh(geo, mat, 72);
  ballMesh.castShadow = true;
  const dummy = new THREE.Object3D();
  const colors = [0xff6b4a, 0xffd23f, 0x7ec8e3, 0xff7ab6, 0xcdb4ff, 0x7ed6a5, 0xffffff];
  for (let i = 0; i < 72; i++) {
    const x = pit.x + (Math.random() - 0.5) * (pit.w - 2.6);
    const z = pit.z + (Math.random() - 0.5) * (pit.d - 3);
    const y = pit.top + 0.25 + Math.random() * 0.7;
    ballBase.push({ x, y, z, p: Math.random() * 6 });
    dummy.position.set(x, y, z);
    dummy.updateMatrix();
    ballMesh.setMatrixAt(i, dummy.matrix);
    const c = new THREE.Color(colors[i % colors.length]);
    ballMesh.setColorAt(i, c);
  }
  courseRoot.add(ballMesh);
}

function mushroom(x, top, z) {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 0.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.7 })
  );
  stem.position.y = 0.2;
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 14, 10),
    new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.5 })
  );
  cap.position.y = 0.42;
  cap.scale.y = 0.7;
  g.add(stem, cap);
  g.position.set(x, top, z);
  courseRoot.add(g);
}

function tree(x, top, z) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.22, 1.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.8 })
  );
  trunk.position.y = 0.55;
  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 14, 12),
    new THREE.MeshStandardMaterial({ color: 0x3aaa62, roughness: 0.75 })
  );
  leaf.position.y = 1.35;
  g.add(trunk, leaf);
  g.position.set(x, top, z);
  courseRoot.add(g);
}

function makeKid() {
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: avatar.skin, roughness: 0.62 });
  const shirt = new THREE.MeshStandardMaterial({ color: avatar.shirt, roughness: 0.55 });
  const band = new THREE.MeshStandardMaterial({ color: 0xfff6ee, roughness: 0.5 });
  const pants = new THREE.MeshStandardMaterial({ color: avatar.pants, roughness: 0.6 });
  const shoe = new THREE.MeshStandardMaterial({ color: avatar.shoes, roughness: 0.42 });
  const hair = new THREE.MeshStandardMaterial({ color: avatar.hair, roughness: 0.8 });
  const white = new THREE.MeshStandardMaterial({ color: 0xfffdf8, roughness: 0.3 });
  const iris = new THREE.MeshStandardMaterial({ color: avatar.eyes, roughness: 0.35 });
  const pupil = new THREE.MeshStandardMaterial({ color: 0x2a211c, roughness: 0.4 });
  const blush = new THREE.MeshStandardMaterial({ color: 0xff8b9a, roughness: 0.55 });
  const mouth = new THREE.MeshStandardMaterial({ color: 0xc45b58, roughness: 0.5 });

  function limb(mat, y) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.22, 4, 8), mat);
    m.position.y = y;
    m.castShadow = true;
    return m;
  }

  const legL = new THREE.Group();
  legL.position.set(-0.14, 0.42, 0);
  legL.add(limb(pants, -0.12));
  const shoeL = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), shoe);
  shoeL.scale.set(1, 0.7, 1.3);
  shoeL.position.set(0, -0.32, 0.04);
  legL.add(shoeL);

  const legR = legL.clone();
  legR.position.x = 0.14;

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.28, 6, 12), shirt);
  body.position.y = 0.78;
  body.castShadow = true;
  const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.1, 16), band);
  stripe.position.y = 0.7;

  const armL = new THREE.Group();
  armL.position.set(-0.38, 0.92, 0);
  armL.add(limb(shirt, -0.16));
  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), skin);
  handL.position.y = -0.36;
  armL.add(handL);
  const armR = armL.clone();
  armR.position.x = 0.38;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 16), skin);
  head.position.y = 1.24;
  head.castShadow = true;
  const earL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), skin);
  earL.position.set(-0.34, 1.22, 0);
  const earR = earL.clone();
  earR.position.x = 0.34;

  const curls = new THREE.Group();
  for (const [x, y, z, s] of [
    [0, 0.28, -0.02, 0.22],
    [-0.18, 0.2, 0.06, 0.16],
    [0.18, 0.18, 0.08, 0.16],
    [-0.12, 0.16, 0.2, 0.12],
    [0.14, 0.14, 0.2, 0.12],
  ]) {
    const curl = new THREE.Mesh(new THREE.SphereGeometry(s, 10, 8), hair);
    curl.position.set(x, y, z);
    curls.add(curl);
  }
  curls.position.y = 1.24;

  function eye(x) {
    const e = new THREE.Group();
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), white);
    const color = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), iris);
    color.position.z = 0.05;
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), pupil);
    dot.position.z = 0.085;
    const catchlight = new THREE.Mesh(
      new THREE.SphereGeometry(0.016, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    catchlight.position.set(0.02, 0.02, 0.1);
    e.add(ball, color, dot, catchlight);
    e.position.set(x, 1.28, 0.28);
    return e;
  }
  const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), blush);
  cheekL.position.set(-0.16, 1.16, 0.28);
  cheekL.scale.z = 0.4;
  const cheekR = cheekL.clone();
  cheekR.position.x = 0.16;
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 8, 14, Math.PI), mouth);
  smile.position.set(0, 1.12, 0.32);
  smile.rotation.z = Math.PI;
  smile.rotation.x = 0.2;

  const cap = new THREE.Group();
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), hair);
  crown.scale.set(1, 0.62, 1);
  crown.position.set(0, 0.22, -0.02);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.06, 18), hair);
  brim.position.set(0, 0.08, 0.08);
  cap.add(crown, brim);
  cap.position.y = 1.46;
  cap.visible = false;

  g.add(legL, legR, body, stripe, armL, armR, head, earL, earR, curls, cap, eye(-0.12), eye(0.12), cheekL, cheekR, smile);
  g.userData.parts = { legL, legR, armL, armR };
  g.userData.mats = { skin, shirt, pants, shoes: shoe, hair, eyes: iris };
  g.userData.curls = curls;
  g.userData.cap = cap;
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}

function makePompom() {
  const root = new THREE.Group();
  const fluff = new THREE.Group();
  const lilac = new THREE.MeshStandardMaterial({ color: 0xcdb4ff, roughness: 0.72 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xfff4e4, roughness: 0.72 });
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.72, 18, 14), lilac);
  core.castShadow = true;
  fluff.add(core);
  const n = 28;
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.36, 10, 8), i % 2 ? cream : lilac);
    puff.position.set(Math.cos(theta) * radius * 0.82, y * 0.82, Math.sin(theta) * radius * 0.82);
    puff.castShadow = true;
    fluff.add(puff);
  }
  const face = new THREE.Group();
  const lid = new THREE.MeshStandardMaterial({ color: 0x3a2a22, roughness: 0.5 });
  const white = new THREE.MeshStandardMaterial({ color: 0xfffdf8, roughness: 0.35 });
  const cheek = new THREE.MeshStandardMaterial({ color: 0xff8b9a, roughness: 0.55 });
  function sleepyEye(x) {
    const e = new THREE.Group();
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), white);
    ball.scale.y = 0.55;
    const slit = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.12, 3, 6), lid);
    slit.rotation.z = Math.PI / 2;
    slit.position.set(0, 0.06, 0.08);
    e.add(ball, slit);
    e.position.set(x, 0.22, -0.95);
    return e;
  }
  const cL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), cheek);
  cL.scale.z = 0.45;
  cL.position.set(-0.32, -0.02, -0.9);
  const cR = cL.clone();
  cR.position.x = 0.32;
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x5c4038, roughness: 0.5 });
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), mouthMat);
  mouth.position.set(0, -0.12, -1.02);
  mouth.scale.set(1.1, 0.7, 0.5);
  face.add(sleepyEye(-0.28), sleepyEye(0.28), cL, cR, mouth);
  root.add(fluff, face);
  root.userData.fluff = fluff;
  root.userData.mouth = mouth;
  return root;
}

function paintKid() {
  const mats = kid.userData.mats;
  mats.skin.color.set(avatar.skin);
  mats.shirt.color.set(avatar.shirt);
  mats.pants.color.set(avatar.pants);
  mats.shoes.color.set(avatar.shoes);
  mats.hair.color.set(avatar.hair);
  mats.eyes.color.set(avatar.eyes);
  const curls = kid.userData.curls;
  const cap = kid.userData.cap;
  cap.visible = avatar.hairStyle === "gorra";
  curls.visible = avatar.hairStyle !== "gorra";
  if (avatar.hairStyle === "corto") {
    curls.scale.set(0.75, 0.5, 0.75);
    curls.position.y = 1.36;
  } else {
    curls.scale.set(1, 1, 1);
    curls.position.y = 1.24;
  }
}

buildPlaza();
buildClouds();
const kid = makeKid();
paintKid();
kid.rotation.y = 0;
const achoo = makePompom();
scene.add(kid, achoo);
achoo.visible = false;
const hatAnchor = new THREE.Group();
hatAnchor.position.y = 1.7;
kid.add(hatAnchor);
const petRoot = new THREE.Group();
scene.add(petRoot);
const sparks = [];
for (let i = 0; i < 18; i++) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xffd23f })
  );
  mesh.visible = false;
  scene.add(mesh);
  sparks.push({ mesh, life: 0 });
}
let sparkT = 0;

const shadowTex = (() => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 4, 32, 32, 32);
  grd.addColorStop(0, "rgba(40, 50, 70, 0.35)");
  grd.addColorStop(1, "rgba(40, 50, 70, 0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  return t;
})();
const blob = new THREE.Mesh(
  new THREE.PlaneGeometry(1.1, 1.1),
  new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
);
blob.rotation.x = -Math.PI / 2;
scene.add(blob);

const puffGeo = new THREE.SphereGeometry(0.18, 8, 6);
const puffMat = new THREE.MeshBasicMaterial({ color: 0xfffaf2 });
const puffs = [];
for (let i = 0; i < 22; i++) {
  const m = new THREE.Mesh(puffGeo, puffMat);
  m.visible = false;
  scene.add(m);
  puffs.push({ mesh: m, v: new THREE.Vector3(), life: 0 });
}

const player = {
  pos: new THREE.Vector3(SPAWN.x, SPAWN.y, SPAWN.z),
  vel: new THREE.Vector3(),
  onGround: false,
  floor: null,
  scale: 1,
  shrinkT: 0,
  runCoins: 0,
  runGems: 0,
};
let checkpoint = { id: "start", x: 0, y: 6, z: 4 };
const visited = new Set();

let state = "home";
let snapCam = true;
let control = false;
let pendingIntro = false;
let introTimer = 0;
let carry = false;
let carryZ = 0;
let boostAge = 0;
let cooldown = 0;
let coyote = 0;
let jumpBuffer = 0;
let squash = 0;
let shake = 0;
let didJump = false;
let wins = 0;
let finishT = 0;
let achooHome = new THREE.Vector3(2.3, 6.2, 5.4);

function resetRun(fromWin) {
  if (fromWin) wins += 1;
  const start = course.steps[0];
  player.pos.set(start.x, start.top, start.z);
  player.vel.set(0, 0, 0);
  player.scale = 1;
  player.shrinkT = 0;
  player.runCoins = 0;
  player.runGems = 0;
  carry = false;
  control = true;
  pendingIntro = false;
  introTimer = 0;
  cooldown = 0;
  didJump = false;
  visited.clear();
  checkpoint = { id: "start", x: start.x, y: start.top, z: start.z };
  kid.rotation.y = Math.PI;
  for (const pick of pickups) {
    pick.got = false;
    pick.mesh.visible = true;
  }
  updateHud();
  winCard.hidden = true;
  hintEl.hidden = true;
}

function boxAt(pos, scale) {
  const hw = HW * scale;
  const hd = HD * scale;
  const h = H * scale;
  return {
    minX: pos.x - hw,
    maxX: pos.x + hw,
    minY: pos.y,
    maxY: pos.y + h,
    minZ: pos.z - hd,
    maxZ: pos.z + hd,
  };
}

function overlaps(a, b) {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY && a.minZ < b.maxZ && a.maxZ > b.minZ;
}

function moveAxis(axis, delta, scale) {
  if (!delta) return;
  player.pos[axis] += delta;
  const hw = HW * scale;
  const hd = HD * scale;
  const height = H * scale;
  for (let iter = 0; iter < 3; iter++) {
    const box = boxAt(player.pos, scale);
    let hit = null;
    for (const s of groundSolids()) {
      if (s.skip) continue;
      if (overlaps(box, s)) {
        hit = s;
        break;
      }
    }
    if (!hit) return;
    if (hit.low) player.squish = true;
    if (axis === "y") {
      if (delta < 0) {
        player.pos.y = hit.maxY;
        if (player.vel.y < 0) player.vel.y = 0;
        player.onGround = true;
        player.floor = hit;
      } else {
        player.pos.y = hit.minY - height;
        if (player.vel.y > 0) player.vel.y = 0;
      }
    } else if (axis === "x") {
      player.pos.x = delta > 0 ? hit.minX - hw : hit.maxX + hw;
      player.vel.x = 0;
    } else {
      player.pos.z = delta > 0 ? hit.minZ - hd : hit.maxZ + hd;
      if (delta < 0) player.blocked = true;
    }
  }
}

function boost(vy, vz) {
  player.vel.y = vy;
  carry = true;
  carryZ = vz;
  boostAge = 0;
  player.onGround = false;
}

function burst(x, y, z) {
  for (const p of puffs) {
    if (p.life > 0) continue;
    p.life = 0.55 + Math.random() * 0.2;
    p.mesh.visible = true;
    p.mesh.position.set(x, y, z);
    p.v.set((Math.random() - 0.5) * 4, 1 + Math.random() * 3, -6 - Math.random() * 8);
    p.mesh.scale.setScalar(0.6 + Math.random() * 0.8);
  }
}

function sneeze() {
  boost(11, -18);
  cooldown = 1.15;
  squash = 1;
  shake = 0.18;
  achoo.position.z = player.pos.z + 6.2;
  burst(achoo.position.x, achoo.position.y + 0.4, achoo.position.z - 0.8);
  const mouth = achoo.userData.mouth;
  mouth.scale.set(1.4, 1.5, 0.7);
  showToast("¡ACHÚS!");
  sneezeSound();
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.remove("show");
  void toastEl.offsetWidth;
  toastEl.classList.add("show");
}

function updateHud() {
  coinCountEl.textContent = `🪙 ${wallet.coins}`;
  gemCountEl.textContent = `💎 ${wallet.gems}`;
}

function respawn() {
  player.pos.set(checkpoint.x, checkpoint.y, checkpoint.z);
  player.vel.set(0, 0, 0);
  carry = false;
  player.shrinkT = 0;
  fallSound();
}

function wearingCount() {
  return kid.children.filter((c) => c.userData.worn).length;
}

let actx = null;
function audio() {
  if (muted) return null;
  if (!actx) actx = new AudioContext();
  if (actx.state === "suspended") actx.resume();
  return actx;
}
function tone(freq, dur, type, gainValue, delay = 0) {
  const ctx = audio();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gainValue, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}
function noiseBurst() {
  const ctx = audio();
  if (!ctx) return;
  const length = Math.floor(ctx.sampleRate * 0.18);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.18, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
  src.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  src.start();
}
function sneezeSound() {
  noiseBurst();
  tone(420, 0.22, "triangle", 0.08);
  tone(180, 0.28, "sine", 0.07, 0.05);
}
function jumpSound() {
  tone(520, 0.09, "square", 0.05);
  tone(760, 0.1, "square", 0.04, 0.04);
}
function collectSound() {
  tone(880, 0.08, "sine", 0.07);
  tone(1320, 0.12, "sine", 0.05, 0.06);
}
function fallSound() {
  tone(200, 0.16, "sine", 0.05);
}
function winSound() {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.2, "triangle", 0.07, i * 0.09));
}

function padHit(p, box) {
  return box.minX < p.x + p.w / 2 && box.maxX > p.x - p.w / 2 && box.minZ < p.z + p.d / 2 && box.maxZ > p.z - p.d / 2 && box.minY < p.top + 1.25 && box.maxY > p.top;
}

function inStopZone(pos) {
  return pos.x > stopZone.minX && pos.x < stopZone.maxX && pos.z > stopZone.minZ && pos.z < stopZone.maxZ && Math.abs(pos.y - stopZone.top) < 0.35;
}

function step(dt, time) {
  tickMovers(dt, time || 0);
  const pressed = {
    left: keys.has("arrowleft") || keys.has("a") || touch.left,
    right: keys.has("arrowright") || keys.has("d") || touch.right,
    forward: keys.has("arrowup") || keys.has("w") || touch.forward,
    back: keys.has("arrowdown") || keys.has("s") || touch.back,
  };
  if (jumpEdge) jumpBuffer = 0.14;
  jumpEdge = false;

  cooldown = Math.max(0, cooldown - dt);
  player.shrinkT = Math.max(0, player.shrinkT - dt);
  if (player.squish) player.shrinkT = Math.max(player.shrinkT, 4);

  const targetScale = player.shrinkT > 0 ? 0.5 : 1;
  const grown = THREE.MathUtils.damp(player.scale, targetScale, 10, dt);
  if (grown > player.scale + 0.001 && blocksScale(grown)) {
    player.shrinkT = Math.max(player.shrinkT, 1.2);
  } else {
    player.scale = grown;
  }

  if (state === "finish") {
    finishT += dt;
    if (finishT > 1.15) {
      state = "win";
      const fresh = !badges[course.id];
      if (fresh) badges[course.id] = true;
      persist();
      showProgress();
      winTitle.textContent = course.winTitle;
      winText.textContent = fresh
        ? `Insignia nueva. Llevas ${wallet.coins} monedas y ${wallet.gems} gemas.`
        : `Llevas ${wallet.coins} monedas y ${wallet.gems} gemas.`;
      winCard.hidden = false;
      hintEl.hidden = true;
      winSound();
    }
    return;
  }
  if (player.onGround && player.floor && player.floor.ride && !player.floor.skip) {
    player.pos.x += player.floor.ride.x;
    player.pos.z += player.floor.ride.z;
    player.pos.y = player.floor.maxY;
  }
  player.vel.x = 0;
  player.vel.z = 0;
  if (pressed.left) player.vel.x -= RUN;
  if (pressed.right) player.vel.x += RUN;
  if (pressed.forward) player.vel.z -= RUN;
  if (pressed.back) player.vel.z += RUN;

  if (player.onGround) coyote = 0.12;
  else coyote = Math.max(0, coyote - dt);
  jumpBuffer = Math.max(0, jumpBuffer - dt);
  if (jumpBuffer > 0 && coyote > 0) {
    player.vel.y = JUMP_V;
    player.onGround = false;
    coyote = 0;
    jumpBuffer = 0;
    didJump = true;
    squash = 0.45;
    jumpSound();
  }

  player.vel.y += GRAVITY * dt;
  if (player.vel.y < -28) player.vel.y = -28;

  player.onGround = false;
  player.floor = null;
  player.blocked = false;
  player.squish = false;
  const scale = player.scale;
  moveAxis("x", player.vel.x * dt, scale);
  moveAxis("z", player.vel.z * dt, scale);
  moveAxis("y", player.vel.y * dt, scale);

  if (state !== "home" && player.onGround && player.floor && player.floor.belt) {
    const belt = player.floor;
    const inset = 1.25;
    if (player.pos.x > belt.minX + inset && player.pos.x < belt.maxX - inset) player.pos.x += belt.belt * dt;
  }

  if (state === "home") {
    if (player.pos.y < 1.2) {
      player.pos.set(SPAWN.x, SPAWN.y, SPAWN.z);
      player.vel.set(0, 0, 0);
    }
    scanSpots();
    return;
  }

  boostAge += dt;
  if (carry && player.onGround && boostAge > 0.2) {
    carry = false;
    squash = 0.7;
  }

  if (player.floor && player.floor.cp && !visited.has(player.floor.id)) {
    visited.add(player.floor.id);
    checkpoint = {
      id: player.floor.id,
      x: player.floor.cp.x,
      y: player.floor.cp.y,
      z: player.floor.cp.z,
    };
  }

  if (player.pos.y < 1.2) respawn();

  const mid = player.pos.clone();
  mid.y += H * player.scale * 0.55;
  for (const pick of pickups) {
    if (pick.got) continue;
    const flat = Math.hypot(player.pos.x - pick.mesh.position.x, player.pos.z - pick.mesh.position.z);
    const above = pick.mesh.position.y - player.pos.y;
    if (pick.follow && pick.follow.skip) continue;
    if (flat < 1.2 && above > -2.2 && above < H * scale + 0.8) {
      pick.got = true;
      pick.mesh.visible = false;
      if (pick.kind === "gem") {
        wallet.gems += 1;
        player.runGems += 1;
      } else {
        wallet.coins += 1;
        player.runCoins += 1;
      }
      persist();
      showProgress();
      updateHud();
      collectSound();
    }
  }

  if (state === "play" && player.onGround && player.floor && player.floor.id === "finish") {
    state = "finish";
    finishT = 0;
    player.vel.set(0, 0, 0);
    hintEl.hidden = true;
  }
}

function blocksScale(scale) {
  const box = boxAt(player.pos, scale);
  box.minY += 0.15;
  return groundSolids().some((s) => !s.skip && overlaps(box, s));
}

function pose(dt, time) {
  const moving = Math.abs(player.vel.z) > 0.4 || Math.abs(player.vel.x) > 0.4;
  const swing = Math.sin(time * (moving ? 11 : 2)) * (moving ? 0.55 : 0.06);
  const parts = kid.userData.parts;
  parts.legL.rotation.x = swing;
  parts.legR.rotation.x = -swing;
  parts.armL.rotation.x = -swing * 0.8;
  parts.armR.rotation.x = swing * 0.8;
  const yaw = Math.atan2(player.vel.x, player.vel.z || -0.001);
  if (moving) kid.rotation.y = yaw;
  squash = Math.max(0, squash - dt * 2.2);
  const s = player.scale;
  kid.scale.set(s * (1 + squash * 0.18), s * (1 - squash * 0.22), s * (1 + squash * 0.08));
  kid.position.copy(player.pos);
  for (const buddy of buddies) {
    buddy.rotation.y = buddy.userData.baseYaw + Math.sin(time * 1.3 + buddy.userData.sway) * 0.35;
  }

  achoo.userData.fluff.rotation.x -= dt * 2.4;
  const mouth = achoo.userData.mouth;
  mouth.scale.y += (0.7 - mouth.scale.y) * Math.min(1, dt * 4);
  const bob = Math.sin(time * 3) * 0.08;
  achoo.position.y += bob * 0;

  for (const pick of pickups) {
    if (!pick.got) {
      pick.mesh.rotation.y += dt * (pick.kind === "gem" ? 2.2 : 1.6);
      pick.mesh.position.y = pick.baseY + Math.sin(time * 3 + pick.baseY) * 0.1;
    }
  }
  const rotor = hatAnchor.getObjectByName("rotor");
  if (rotor) rotor.rotation.y += dt * 8;
  if (petRoot.visible) {
    const goal = new THREE.Vector3(kid.position.x + 0.72, kid.position.y + 0.85 + Math.sin(time * 3) * 0.06, kid.position.z + 0.15);
    petRoot.position.lerp(goal, 1 - Math.pow(0.02, dt));
    petRoot.lookAt(kid.position.x, petRoot.position.y, kid.position.z);
  }
  dropTrail(dt, moving);
  for (const b of bobbers) {
    if (b.userData.speed) b.position.x += b.userData.speed * dt;
    else b.position.y += Math.sin(time * 4 + b.position.x) * dt * 0.15;
  }
  for (const p of puffs) {
    if (p.life <= 0) continue;
    p.life -= dt;
    p.v.y -= 8 * dt;
    p.mesh.position.addScaledVector(p.v, dt);
    p.mesh.scale.multiplyScalar(0.98);
    if (p.life <= 0) p.mesh.visible = false;
  }
  if (ballMesh) {
    const dummy = new THREE.Object3D();
    ballBase.forEach((b, i) => {
      dummy.position.set(b.x, b.y + Math.sin(time * 2 + b.p) * 0.08, b.z);
      dummy.updateMatrix();
      ballMesh.setMatrixAt(i, dummy.matrix);
    });
    ballMesh.instanceMatrix.needsUpdate = true;
  }

  const under = floorUnder(player.pos.x, player.pos.z, player.pos.y + 0.4);
  blob.visible = under != null;
  if (under != null) {
    blob.position.set(player.pos.x, under + 0.06, player.pos.z);
    blob.scale.setScalar(player.scale);
  }
}

function floorUnder(x, z, maxY) {
  let y = null;
  for (const s of groundSolids()) {
    if (s.skip) continue;
    if (x < s.minX || x > s.maxX || z < s.minZ || z > s.maxZ) continue;
    if (s.maxY <= maxY && (y == null || s.maxY > y)) y = s.maxY;
  }
  return y;
}

function dropTrail(dt, moving) {
  sparkT += dt;
  for (const spark of sparks) {
    if (spark.life <= 0) continue;
    spark.life -= dt;
    spark.mesh.position.y += dt * 0.35;
    spark.mesh.scale.setScalar(Math.max(0.15, spark.life));
    if (spark.life <= 0) spark.mesh.visible = false;
  }
  if (!gear.trail || !moving || sparkT < 0.08) return;
  sparkT = 0;
  const spark = sparks.find((item) => item.life <= 0);
  if (!spark) return;
  spark.life = 0.65;
  spark.mesh.visible = true;
  spark.mesh.material.color.set(gear.trail === "hojas" ? 0x3aaa62 : 0xffd23f);
  spark.mesh.position.set(kid.position.x, kid.position.y + 0.32, kid.position.z + 0.28);
  spark.mesh.scale.setScalar(1);
}

function updateHint() {
  if (state === "home") {
    hintEl.hidden = false;
    hintEl.textContent = "Camina hacia un portal";
    return;
  }
  if (state !== "play") return;
  const floor = player.floor;
  const text = floor && floor.belt
    ? "La cinta empuja"
    : floor && floor.slide
      ? "La tabla se mueve"
      : floor && floor.blink && floor.warn
        ? "¡Se esfuma!"
        : floor && floor.id === "start" && !didJump
          ? "Espacio para saltar"
          : "";
  hintEl.hidden = !text;
  hintEl.textContent = text;
}

function look(dt) {
  shake *= Math.pow(0.04, dt);
  const dressing = state === "dress" || state === "shop";
  const goal = dressing
    ? new THREE.Vector3(player.pos.x - 5.8, player.pos.y + 1.2, player.pos.z + 7.4)
    : state === "home"
      ? new THREE.Vector3(player.pos.x, player.pos.y + 3.3 + shake, player.pos.z + 8.2)
      : new THREE.Vector3(player.pos.x * 0.45, player.pos.y + 3.3 + shake, player.pos.z + 8.2);
  const at = dressing
    ? new THREE.Vector3(player.pos.x - 1.2, player.pos.y - 1.85, player.pos.z)
    : state === "home"
      ? new THREE.Vector3(player.pos.x, player.pos.y + 1.15, player.pos.z - 3)
      : new THREE.Vector3(player.pos.x * 0.25, player.pos.y + 1.15, player.pos.z - 3);
  camera.position.lerp(goal, snapCam ? 1 : 1 - Math.pow(0.0008, dt));
  camera.lookAt(at);
  snapCam = false;
}

const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.033);
  const time = clock.elapsedTime;
  if (state === "play" || state === "finish" || state === "home") {
    const sub = 2;
    for (let i = 0; i < sub; i++) step(dt / sub, time - dt + (dt / sub) * (i + 1));
  } else if (state === "dress" || state === "shop") {
    player.vel.set(0, 0, 0);
  }
  pose(dt, time);
  updateHint();
  document.body.classList.toggle("playing", state === "play" || state === "win" || state === "finish" || state === "home");
  look(dt);
  if (state === "dress" || state === "shop") {
    const dx = camera.position.x - kid.position.x;
    const dz = camera.position.z - kid.position.z;
    kid.rotation.y = Math.atan2(-dx, -dz) + Math.PI + Math.sin(time * 0.6) * 0.18;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

function goHome() {
  const fromCourse = state === "play" || state === "finish" || state === "win";
  keys.clear();
  state = "home";
  snapCam = true;
  homeEl.hidden = true;
  dresserEl.hidden = true;
  shopEl.hidden = true;
  hud.hidden = false;
  winCard.hidden = true;
  resetBtn.hidden = true;
  casaBtn.hidden = true;
  if (fromCourse) {
    player.pos.set(SPAWN.x, SPAWN.y, SPAWN.z);
    player.vel.set(0, 0, 0);
    kid.rotation.y = Math.PI;
    armedSpot = null;
  }
  showProgress();
}

function startGame(id) {
  audio();
  course = COURSES.find((item) => item.id === id);
  buildCourse(course);
  homeEl.hidden = true;
  dresserEl.hidden = true;
  shopEl.hidden = true;
  hud.hidden = false;
  resetBtn.hidden = false;
  casaBtn.hidden = false;
  snapCam = true;
  resetRun(false);
  state = "play";
}

function openDress() {
  state = "dress";
  snapCam = true;
  homeEl.hidden = true;
  shopEl.hidden = true;
  dresserEl.hidden = false;
}

function openShop() {
  state = "shop";
  snapCam = true;
  homeEl.hidden = true;
  dresserEl.hidden = true;
  shopEl.hidden = false;
  shopNote.textContent = "Las monedas compran cosas. Las gemas, mascotas.";
  renderShop();
}

function chooseLook(key, value) {
  avatar = { ...avatar, [key]: value };
  persist();
  paintKid();
  markSwatches();
}

for (const item of COURSES) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "game";
  btn.dataset.course = item.id;
  btn.style.setProperty("--tint", item.tint);
  btn.style.setProperty("--shade", item.shade);
  const name = document.createElement("span");
  name.textContent = item.name;
  const count = document.createElement("small");
  btn.append(name, count);
  btn.addEventListener("click", () => {
    btn.blur();
    startGame(item.id);
  });
  gamesEl.append(btn);
}
dressBtn.addEventListener("click", () => {
  dressBtn.blur();
  openDress();
});
shopOpenBtn.addEventListener("click", () => {
  shopOpenBtn.blur();
  openShop();
});
shopCloseBtn.addEventListener("click", () => {
  shopCloseBtn.blur();
  goHome();
});
dressedBtn.addEventListener("click", () => {
  dressedBtn.blur();
  goHome();
});
casaBtn.addEventListener("click", () => {
  casaBtn.blur();
  goHome();
});
winHomeBtn.addEventListener("click", () => {
  winHomeBtn.blur();
  goHome();
});
replayBtn.addEventListener("click", () => {
  replayBtn.blur();
  resetRun(true);
  state = "play";
});
resetBtn.addEventListener("click", () => {
  resetBtn.blur();
  if (state === "home" || state === "dress" || state === "shop") return;
  resetRun(false);
  state = "play";
});
muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.textContent = muted ? "🔇" : "♪";
  muteBtn.setAttribute("aria-label", muted ? "Activar sonido" : "Silenciar");
  if (!muted) audio();
});

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  keys.add(e.key.toLowerCase());
  if (e.code === "Space") jumpEdge = true;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
  if (e.code === "Space" && (state === "home" || state === "dress" || state === "shop")) e.preventDefault();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());

document.querySelectorAll("#touch [data-hold]").forEach((btn) => {
  const name = btn.dataset.hold;
  const down = (e) => {
    touch[name] = true;
    btn.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const up = () => {
    touch[name] = false;
  };
  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointercancel", up);
});
document.querySelector("#jump").addEventListener("pointerdown", (e) => {
  jumpEdge = true;
  e.preventDefault();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const ROWS = [
  ["skin", "Piel", ["#f6c7a8", "#e0ac8a", "#c68642", "#8d5524"]],
  ["shirt", "Camiseta", ["#ff6b4a", "#3d7ec9", "#3aaa62", "#7c5cbf", "#ffd23f"]],
  ["pants", "Pantalón", ["#3e4c8a", "#2f6b4f", "#c45b58", "#2a211c", "#f4e1c1"]],
  ["shoes", "Zapatos", ["#ffb703", "#fffdf8", "#3a2a22", "#7ec8e3", "#ff6b4a"]],
  ["hair", "Pelo", ["#4a2c24", "#1a1a1a", "#e6b15a", "#e07090", "#7c5cbf"]],
  ["eyes", "Ojos", ["#1aa894", "#3d7ec9", "#6b4a2a", "#7c5cbf"]],
];
const STYLES = [
  ["rizos", "Rizos"],
  ["corto", "Corto"],
  ["gorra", "Gorra"],
];
const swatchRoot = document.querySelector("#swatches");
const styleRoot = document.querySelector("#styles");

function markSwatches() {
  swatchRoot.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle("on", avatar[dot.dataset.key] === dot.dataset.value);
  });
  styleRoot.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("on", avatar.hairStyle === btn.dataset.value);
  });
}

for (const [key, label, colors] of ROWS) {
  const row = document.createElement("div");
  row.className = "row";
  const name = document.createElement("span");
  name.textContent = label;
  const dots = document.createElement("div");
  dots.className = "dots";
  for (const color of colors) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.style.background = color;
    dot.dataset.key = key;
    dot.dataset.value = color;
    dot.setAttribute("aria-label", label);
    dot.addEventListener("click", () => chooseLook(key, color));
    dots.append(dot);
  }
  row.append(name, dots);
  swatchRoot.append(row);
}
for (const [value, label] of STYLES) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.dataset.value = value;
  btn.addEventListener("click", () => chooseLook("hairStyle", value));
  styleRoot.append(btn);
}
function makeHat(id) {
  const g = new THREE.Group();
  if (id === "flor") {
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd23f })
    );
    g.add(center);
    const petalMat = new THREE.MeshStandardMaterial({ color: 0xff7ab6 });
    for (let i = 0; i < 6; i++) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), petalMat);
      const a = (i / 6) * Math.PI * 2;
      petal.position.set(Math.cos(a) * 0.14, 0.02, Math.sin(a) * 0.14);
      petal.scale.set(1, 0.55, 1);
      g.add(petal);
    }
  } else if (id === "helice") {
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 8),
      new THREE.MeshStandardMaterial({ color: 0x7ec8e3 })
    );
    cap.scale.y = 0.55;
    const rotor = new THREE.Group();
    rotor.name = "rotor";
    rotor.position.y = 0.16;
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xff6b4a });
    for (const rot of [0, Math.PI / 2]) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.08), bladeMat);
      blade.rotation.y = rot;
      rotor.add(blade);
    }
    g.add(cap, rotor);
  } else {
    const gold = new THREE.MeshStandardMaterial({ color: 0xffd23f, metalness: 0.45, roughness: 0.3 });
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.045, 8, 16), gold);
    band.rotation.x = Math.PI / 2;
    g.add(band);
    for (let i = 0; i < 5; i++) {
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 6), gold);
      const a = (i / 5) * Math.PI * 2;
      tip.position.set(Math.cos(a) * 0.16, 0.08, Math.sin(a) * 0.16);
      g.add(tip);
    }
  }
  return g;
}

function makePet(id) {
  const g = new THREE.Group();
  if (id === "pajaro") {
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 14, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd23f, roughness: 0.5 })
    );
    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.05, 0.12, 8),
      new THREE.MeshStandardMaterial({ color: 0xff6b4a })
    );
    beak.rotation.x = Math.PI / 2;
    beak.position.z = 0.2;
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xffb703 });
    const wingL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), wingMat);
    wingL.position.set(-0.18, 0.02, 0);
    wingL.scale.set(0.45, 1, 1.15);
    const wingR = wingL.clone();
    wingR.position.x = 0.18;
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x2a211c });
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), eyeMat);
    eyeL.position.set(-0.07, 0.06, 0.18);
    const eyeR = eyeL.clone();
    eyeR.position.x = 0.07;
    g.add(body, beak, wingL, wingR, eyeL, eyeR);
  } else if (id === "nube") {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const a = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mat);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), mat);
    b.position.set(-0.16, -0.04, 0);
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), mat);
    c.position.set(0.15, -0.02, 0);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x2a211c });
    const e1 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), eyeMat);
    e1.position.set(-0.06, 0.02, 0.16);
    const e2 = e1.clone();
    e2.position.x = 0.06;
    g.add(a, b, c, e1, e2);
  } else {
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 14, 12),
      new THREE.MeshStandardMaterial({ color: 0x3aaa62, roughness: 0.55 })
    );
    const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xfffdf8 });
    const pupil = new THREE.MeshStandardMaterial({ color: 0x2a211c });
    g.add(body);
    for (const x of [-0.08, 0.08]) {
      const white = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), eyeWhite);
      white.position.set(x, 0.16, 0.04);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), pupil);
      dot.position.set(x, 0.18, 0.09);
      g.add(white, dot);
    }
  }
  return g;
}

function emptyGroup(group) {
  const geos = new Set();
  const mats = new Set();
  group.traverse((obj) => {
    if (obj.geometry) geos.add(obj.geometry);
    if (obj.material) {
      const list = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of list) mats.add(mat);
    }
  });
  group.clear();
  for (const geo of geos) geo.dispose();
  for (const mat of mats) mat.dispose();
}

function applyGear() {
  emptyGroup(hatAnchor);
  if (gear.hat) hatAnchor.add(makeHat(gear.hat));
  emptyGroup(petRoot);
  petRoot.visible = !!gear.pet;
  if (gear.pet) petRoot.add(makePet(gear.pet));
}

function priceLabel(item) {
  if (item.pay === "gems") return item.price === 1 ? "1 gema" : `${item.price} gemas`;
  return item.price === 1 ? "1 moneda" : `${item.price} monedas`;
}

function renderShop() {
  catalogEl.replaceChildren();
  for (const slot of ["hat", "trail", "pet"]) {
    const row = document.createElement("div");
    row.className = "shop-row";
    const title = document.createElement("h3");
    title.textContent = SLOT_LABEL[slot];
    row.append(title);
    for (const item of CATALOG.filter((entry) => entry.slot === slot)) {
      const btn = document.createElement("button");
      btn.type = "button";
      const has = owned[slot].includes(item.id);
      const worn = gear[slot] === item.id;
      btn.classList.toggle("on", worn);
      btn.textContent = has ? `${item.name} · ${worn ? "Puesto" : "Poner"}` : `${item.name} · ${priceLabel(item)}`;
      btn.addEventListener("click", () => buyOrWear(item));
      row.append(btn);
    }
    catalogEl.append(row);
  }
}

function buyOrWear(item) {
  let note = "";
  const has = owned[item.slot].includes(item.id);
  if (has) {
    gear[item.slot] = gear[item.slot] === item.id ? null : item.id;
    note = gear[item.slot] ? "Puesto." : "Guardado.";
  } else if (wallet[item.pay] < item.price) {
    shopNote.textContent = item.pay === "gems" ? "Te faltan gemas." : "Te faltan monedas.";
    return;
  } else {
    wallet[item.pay] -= item.price;
    owned[item.slot].push(item.id);
    gear[item.slot] = item.id;
    note = "¡Comprado!";
    showProgress();
    updateHud();
  }
  persist();
  applyGear();
  renderShop();
  shopNote.textContent = note;
}

markSwatches();
applyGear();
showProgress();

if (location.protocol === "file:") {
  homeEl.insertAdjacentHTML("beforeend", "<p>Abre este juego con un servidor local, no como archivo suelto.</p>");
}

homeEl.hidden = true;
hud.hidden = false;
kid.rotation.y = Math.PI;
kid.position.copy(player.pos);
achoo.position.copy(achooHome);
updateHud();
frame();
