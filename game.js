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
const gateEl = document.querySelector("#gate");
const boardEl = document.querySelector("#board-card");
const boardList = document.querySelector("#board-list");
const boardBackBtn = document.querySelector("#board-back");
const gateArt = document.querySelector("#gate-art");
const gateTitle = document.querySelector("#gate-title");
const gateBadge = document.querySelector("#gate-badge");
const gatePlayBtn = document.querySelector("#gate-play");
const gateLanes = document.querySelector("#gate-lanes");
const gateBackBtn = document.querySelector("#gate-back");
const danceBtn = document.querySelector("#dance");
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
  face: "sonrisa",
  glasses: "no",
  pack: "no",
  shirtArt: "lisa",
};
const HAIR_IDS = ["rizos", "corto", "gorra"];
const FACE_IDS = ["sonrisa", "abierta", "lengua"];
const GLASSES_IDS = ["no", "redondas", "sol"];
const PACK_IDS = ["no", "mochila"];
const ART_IDS = ["lisa", "estrella", "sol", "corazon"];
const CATALOG = [
  { slot: "ropa", id: "cam-roja", name: "Camiseta roja", price: 4, pay: "coins", look: { shirt: "#ff6b4a" }, swatch: "#ff6b4a", kind: "camiseta" },
  { slot: "ropa", id: "cam-azul", name: "Camiseta azul", price: 4, pay: "coins", look: { shirt: "#3d7ec9" }, swatch: "#3d7ec9", kind: "camiseta" },
  { slot: "ropa", id: "cam-verde", name: "Camiseta verde", price: 4, pay: "coins", look: { shirt: "#3aaa62" }, swatch: "#3aaa62", kind: "camiseta" },
  { slot: "ropa", id: "cam-lila", name: "Camiseta lila", price: 5, pay: "coins", look: { shirt: "#7c5cbf" }, swatch: "#7c5cbf", kind: "camiseta" },
  { slot: "ropa", id: "cam-amarilla", name: "Camiseta amarilla", price: 4, pay: "coins", look: { shirt: "#ffd23f" }, swatch: "#ffd23f", kind: "camiseta" },
  { slot: "ropa", id: "pant-azul", name: "Pantalón azul", price: 4, pay: "coins", look: { pants: "#3e4c8a" }, swatch: "#3e4c8a", kind: "pantalon" },
  { slot: "ropa", id: "pant-verde", name: "Pantalón verde", price: 4, pay: "coins", look: { pants: "#2f6b4f" }, swatch: "#2f6b4f", kind: "pantalon" },
  { slot: "ropa", id: "pant-rojo", name: "Pantalón rojo", price: 5, pay: "coins", look: { pants: "#c45b58" }, swatch: "#c45b58", kind: "pantalon" },
  { slot: "ropa", id: "zap-amarillos", name: "Zapatos amarillos", price: 3, pay: "coins", look: { shoes: "#ffb703" }, swatch: "#ffb703", kind: "zapatos" },
  { slot: "ropa", id: "zap-blancos", name: "Zapatos blancos", price: 3, pay: "coins", look: { shoes: "#fffdf8" }, swatch: "#fffdf8", kind: "zapatos" },
  { slot: "ropa", id: "zap-rojos", name: "Zapatos rojos", price: 4, pay: "coins", look: { shoes: "#ff6b4a" }, swatch: "#ff6b4a", kind: "zapatos" },
  { slot: "accesorio", id: "gafas-redondas", name: "Gafas redondas", price: 6, pay: "coins", look: { glasses: "redondas" }, kind: "gafas" },
  { slot: "accesorio", id: "gafas-sol", name: "Gafas de sol", price: 7, pay: "coins", look: { glasses: "sol" }, kind: "gafas-sol" },
  { slot: "accesorio", id: "mochila", name: "Mochila", price: 8, pay: "coins", look: { pack: "mochila" }, kind: "mochila" },
  { slot: "accesorio", id: "dibujo-estrella", name: "Estrella", price: 5, pay: "coins", look: { shirtArt: "estrella" }, kind: "dibujo-estrella" },
  { slot: "accesorio", id: "dibujo-sol", name: "Sol", price: 5, pay: "coins", look: { shirtArt: "sol" }, kind: "dibujo-sol" },
  { slot: "accesorio", id: "dibujo-corazon", name: "Corazón", price: 5, pay: "coins", look: { shirtArt: "corazon" }, kind: "dibujo-corazon" },
  { slot: "hat", id: "flor", name: "Flor", price: 5, pay: "coins" },
  { slot: "hat", id: "helice", name: "Hélice", price: 8, pay: "coins" },
  { slot: "hat", id: "corona", name: "Corona", price: 12, pay: "coins" },
  { slot: "hat", id: "seta", name: "Seta", price: 9, pay: "coins" },
  { slot: "hat", id: "lazo", name: "Lazo", price: 6, pay: "coins" },
  { slot: "trail", id: "estrellas", name: "Estrellas", price: 6, pay: "coins" },
  { slot: "trail", id: "hojas", name: "Hojas", price: 10, pay: "coins" },
  { slot: "trail", id: "burbujas", name: "Burbujas", price: 7, pay: "coins" },
  { slot: "trail", id: "corazones", name: "Corazones", price: 8, pay: "coins" },
  { slot: "pet", id: "pajaro", name: "Pájaro", price: 2, pay: "gems" },
  { slot: "pet", id: "nube", name: "Nube", price: 3, pay: "gems" },
  { slot: "pet", id: "ranita", name: "Ranita", price: 4, pay: "gems" },
  { slot: "pet", id: "estrellita", name: "Estrellita", price: 3, pay: "gems" },
];
const SHOP_SLOTS = ["ropa", "accesorio", "hat", "trail", "pet"];
const SLOT_LABEL = {
  ropa: "Ropa",
  accesorio: "Accesorios",
  hat: "Para la cabeza",
  trail: "Huellas mágicas",
  pet: "Amiguitos",
};
const SLOT_TINT = {
  ropa: "#ffe8d2",
  accesorio: "#efe2ff",
  hat: "#ffe0ef",
  trail: "#d9efff",
  pet: "#d9f5c9",
};
const DAILY_PICKS = { ropa: 4, accesorio: 3, hat: 2, trail: 2, pet: 2 };

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
    lanes: {
      corto: {
        steps: [
          { id: "start", x: 0, z: 4, d: 8, top: 6, w: 8, color: 0x67c587 },
          { id: "a", x: 0, z: -6.45, d: 6.5, top: 5.5, w: 7, color: 0xf2c14e },
          { id: "b", x: 0, z: -16.15, d: 6.5, top: 5.1, w: 7, color: 0x7ec8e3, belt: 2 },
          { id: "c", x: 0, z: -25.35, d: 5.5, top: 6.2, w: 6, color: 0xf7a1c4 },
          { id: "d", x: 0, z: -34.55, d: 6.5, top: 5.0, w: 7, color: 0xb497f0, wheel: { len: 2.1, speed: 1.0 } },
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
      normal: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7, top: 6, w: 6, color: 0x67c587 },
          { id: "a", x: 0, z: -5.35, d: 5, top: 5.3, w: 5.2, color: 0xf2c14e },
          { id: "b", x: 0, z: -13.8, d: 5.2, top: 4.95, w: 5.4, color: 0x7ec8e3, belt: 2.6 },
          { id: "c", x: 0, z: -22.05, d: 4.6, top: 6, w: 4.8, color: 0xf7a1c4 },
          { id: "d", x: 0, z: -30.45, d: 5.6, top: 4.9, w: 6.2, color: 0xb497f0, wheel: { len: 1.7, speed: 1.15 } },
          { id: "e", x: 0, z: -38.9, d: 4.6, top: 5.95, w: 4.8, color: 0xff8c6a },
          { id: "f", x: 0, z: -47.15, d: 5.2, top: 4.9, w: 5.4, color: 0x7ed6a5, belt: 2.6 },
          { id: "g", x: 0, z: -55.85, d: 5.6, top: 5.95, w: 6.4, color: 0xf2c14e, wheel: { len: 1.75, speed: 1.2 } },
          { id: "h", x: 0, z: -64.4, d: 4.8, top: 4.8, w: 5, color: 0xf7a1c4 },
          { id: "finish", x: 0, z: -75.15, d: 10, top: 3.8, w: 8, color: 0xf2d36b },
        ],
        coins: [
          { x: 0, y: 6.2, z: -5.35 },
          { x: 0, y: 5.85, z: -13.8 },
          { x: 0, y: 6.9, z: -22.05 },
          { x: 1.7, y: 5.8, z: -30.45 },
          { x: 0, y: 6.85, z: -38.9 },
          { x: 0, y: 5.8, z: -47.15 },
          { x: -1.7, y: 6.85, z: -55.85 },
          { x: 0, y: 5.7, z: -64.4 },
        ],
        gems: [
          { x: 1.2, y: 6.9, z: -22.05 },
          { x: -1.2, y: 6.85, z: -38.9 },
        ],
        hills: [[-14, -10, 9], [15, -32, 11], [-13, -58, 10], [14, -86, 9]],
        mushrooms: [[-2.4, 6, 5.4], [2.3, 5.3, -5.35]],
        trees: [[-3.8, 6, 5.6], [3.6, 4.9, -47.15]],
      },
      largo: {
        steps: [
          { id: "start", x: 0, z: 4, d: 6.5, top: 6, w: 6, color: 0x67c587 },
          { id: "a", x: 0, z: -5.05, d: 4.8, top: 5.2, w: 5, color: 0xf2c14e },
          { id: "b", x: 0, z: -13.45, d: 5.2, top: 4.8, w: 5.6, color: 0x7ec8e3, belt: 2.8 },
          { id: "c", x: 0, z: -21.95, d: 5, top: 5.9, w: 6.2, color: 0xf7a1c4, slide: { axis: "x", amp: 0.85, period: 2.8, label: "Tabla", hint: "La tabla se mueve" } },
          { id: "d", x: 0, z: -30.6, d: 5.6, top: 4.8, w: 6.4, color: 0xb497f0, wheel: { len: 1.85, speed: 1.3 } },
          { id: "e", x: 0, z: -39.3, d: 5, top: 5.9, w: 5.4, color: 0xfff6ea, blink: { on: 2.2, off: 0.85 } },
          { id: "f", x: 0, z: -47.8, d: 5.2, top: 4.8, w: 5.6, color: 0x7ed6a5, belt: 2.8 },
          { id: "g", x: 0, z: -56.55, d: 5.6, top: 5.9, w: 6.4, color: 0xf2c14e, wheel: { len: 1.85, speed: 1.3 } },
          { id: "h", x: 0, z: -65.05, d: 4.6, top: 4.7, w: 4.8, color: 0xff8c6a },
          { id: "finish", x: 0, z: -75.75, d: 10, top: 3.7, w: 8, color: 0xf2d36b },
        ],
        coins: [
          { x: 0, y: 6.1, z: -5.05 },
          { x: 0, y: 5.7, z: -13.45 },
          { x: 0, y: 6.8, z: -21.95 },
          { x: 1.8, y: 5.7, z: -30.6 },
          { x: 0, y: 6.8, z: -39.3 },
          { x: 0, y: 5.7, z: -47.8 },
          { x: -1.8, y: 6.8, z: -56.55 },
          { x: 0, y: 5.6, z: -65.05 },
        ],
        gems: [
          { x: 1.4, y: 6.8, z: -21.95 },
          { x: -1.3, y: 6.8, z: -39.3 },
        ],
        hills: [[-14, -8, 9], [15, -28, 11], [-13, -52, 10], [14, -84, 9]],
        mushrooms: [[-2.3, 6, 5.2], [2.2, 5.2, -5.05]],
        trees: [[-3.6, 6, 5.4], [3.5, 4.8, -47.8]],
      },
    },
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
    lanes: {
      corto: {
        steps: [
          { id: "start", x: 0, z: 4, d: 8, top: 6, w: 7.2, color: 0xd7a85a },
          { id: "a", x: 0, z: -5.8, d: 5.2, top: 5.5, w: 4.2, color: 0xc4894a },
          { id: "b", x: 0, z: -14.15, d: 5, top: 5.1, w: 4.2, color: 0xe7c98a },
          { id: "c", x: 0, z: -22.3, d: 4.6, top: 6.2, w: 4, color: 0xc46b4a, slide: { axis: "x", amp: 0.75, period: 3.2 } },
          { id: "d", x: 0, z: -30.4, d: 5.2, top: 5.25, w: 4.2, color: 0xd7a85a },
          { id: "e", x: 0, z: -38.6, d: 4.4, top: 6.45, w: 3.8, color: 0xf0d7a2 },
          { id: "finish", x: 0, z: -47.05, d: 6, top: 4.6, w: 6.5, color: 0xc4894a },
        ],
        coins: [
          { x: 0, y: 6.4, z: -5.8 },
          { x: 0, y: 6.0, z: -14.15 },
          { x: 0, y: 7.1, z: -22.3 },
          { x: 0, y: 6.15, z: -30.4 },
          { x: 0, y: 7.35, z: -38.6 },
        ],
        gems: [
          { x: -1.2, y: 6.0, z: -14.15 },
          { x: -1.15, y: 6.15, z: -30.4 },
        ],
        hills: [[-14, -8, 9], [16, -28, 12], [-12, -58, 10]],
        mushrooms: [[-2.3, 6, 6.2], [2.3, 6, 6.4]],
        trees: [[-5.4, 6, 3.2], [5.2, 5.1, -14.15]],
      },
      normal: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7.2, top: 6, w: 6.4, color: 0xd7a85a },
          { id: "a", x: 2.2, z: -5.2, d: 4.6, top: 5.4, w: 3.6, color: 0xc4894a },
          { id: "b", x: -2.2, z: -13.1, d: 4.6, top: 5.0, w: 3.6, color: 0xe7c98a, slide: { axis: "x", amp: 0.7, period: 2.8 } },
          { id: "c", x: 2.15, z: -20.9, d: 4.4, top: 6.05, w: 3.6, color: 0xc46b4a },
          { id: "d", x: -2.1, z: -28.7, d: 4.6, top: 5.1, w: 3.8, color: 0xd7a85a, slide: { axis: "x", amp: 0.75, period: 2.6 } },
          { id: "e", x: 2, z: -36.45, d: 4.2, top: 6.15, w: 3.5, color: 0xf0d7a2 },
          { id: "f", x: -0.7, z: -44.15, d: 4.6, top: 5.2, w: 4, color: 0xc4894a },
          { id: "finish", x: 0, z: -52.7, d: 6, top: 4.4, w: 6.2, color: 0xc4894a },
        ],
        coins: [
          { x: 2.2, y: 6.3, z: -5.2 },
          { x: -2.2, y: 5.9, z: -13.1 },
          { x: 2.15, y: 6.95, z: -20.9 },
          { x: -2.1, y: 6.0, z: -28.7 },
          { x: 2, y: 7.05, z: -36.45 },
          { x: -0.7, y: 6.1, z: -44.15 },
        ],
        gems: [
          { x: 2.7, y: 6.95, z: -20.9 },
          { x: 1.5, y: 7.05, z: -36.45 },
        ],
        hills: [[-14, -6, 9], [16, -24, 11], [-12, -46, 10]],
        mushrooms: [[-2.2, 6, 5.6], [2.2, 5.4, -5.2]],
        trees: [[-5.2, 6, 3.4], [5, 5.2, -28.7]],
      },
      largo: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7, top: 6, w: 6.6, color: 0xd7a85a },
          { id: "a", x: 1.6, z: -5.25, d: 4.8, top: 5.3, w: 4.2, color: 0xc4894a },
          { id: "b", x: 0, z: -13.65, d: 5.4, top: 4.9, w: 6.4, color: 0xe7c98a, belt: 2.4 },
          { id: "c", x: 1.7, z: -21.95, d: 4.6, top: 5.95, w: 4.4, color: 0xc46b4a, slide: { axis: "x", amp: 0.8, period: 2.6 } },
          { id: "d", x: 0, z: -30.35, d: 5.6, top: 4.9, w: 6.6, color: 0xd7a85a, wheel: { len: 1.7, speed: 1.2 } },
          { id: "e", x: 1.7, z: -38.8, d: 4.6, top: 5.95, w: 4.4, color: 0xf0d7a2, blink: { on: 2.1, off: 0.8 } },
          { id: "f", x: -1.0, z: -46.7, d: 4.6, top: 4.9, w: 4.2, color: 0xc4894a, slide: { axis: "x", amp: 0.55, period: 2.7 } },
          { id: "g", x: 0, z: -54.9, d: 5.2, top: 5.9, w: 6.2, color: 0xe7c98a, wheel: { len: 1.65, speed: 1.25 } },
          { id: "finish", x: 0, z: -63.9, d: 6.2, top: 4.5, w: 6.4, color: 0xc4894a },
        ],
        coins: [
          { x: 1.6, y: 6.2, z: -5.25 },
          { x: 0, y: 5.8, z: -13.65 },
          { x: 1.7, y: 6.85, z: -21.95 },
          { x: 1.6, y: 5.8, z: -30.35 },
          { x: 1.7, y: 6.85, z: -38.8 },
          { x: -1.0, y: 5.8, z: -46.7 },
          { x: -1.5, y: 6.8, z: -54.9 },
        ],
        gems: [
          { x: 0.9, y: 6.85, z: -21.95 },
          { x: 1.2, y: 6.85, z: -38.8 },
        ],
        hills: [[-14, -8, 9], [16, -30, 11], [-12, -56, 10]],
        mushrooms: [[-2.4, 6, 5.4], [2.3, 5.3, -5.25]],
        trees: [[-5, 6, 3.2], [5.2, 4.9, -30.35]],
      },
    },
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
    lanes: {
      corto: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7.5, top: 7, w: 7, color: 0xfff6ea },
          { id: "a", x: 0, z: -5.7, d: 5.4, top: 6.15, w: 5.6, color: 0xd7ecff },
          { id: "b", x: 0, z: -13.9, d: 4.6, top: 7.05, w: 5, color: 0xffffff },
          { id: "c", x: 0, z: -22.25, d: 4.6, top: 6.2, w: 4.8, color: 0xcdb4ff },
          { id: "d", x: 0, z: -30.05, d: 4.8, top: 7.1, w: 4.4, color: 0xfff6ea },
          { id: "e", x: 0, z: -38.5, d: 4.4, top: 6.3, w: 5, color: 0xb7d4ff, blink: { on: 2.6, off: 0.75 } },
          { id: "f", x: 0, z: -46.4, d: 4.8, top: 7.5, w: 4.2, color: 0xffffff },
          { id: "finish", x: 0, z: -55.3, d: 6.5, top: 8.3, w: 7, color: 0xfff3b0 },
        ],
        coins: [
          { x: 0, y: 7.05, z: -5.7 },
          { x: 0, y: 7.95, z: -13.9 },
          { x: 0, y: 7.1, z: -22.25 },
          { x: 0, y: 8.0, z: -30.05 },
          { x: 0, y: 7.2, z: -38.5 },
          { x: 0, y: 8.4, z: -46.4 },
        ],
        gems: [
          { x: -1.5, y: 7.05, z: -22.25 },
          { x: 1.5, y: 7.15, z: -38.5 },
        ],
        hills: [[-15, -6, 9], [16, -30, 11], [-13, -66, 10]],
        mushrooms: [[-2.2, 7, 6.1], [2.2, 7, 6.3]],
        trees: [[-5.2, 7, 3.4], [5.4, 6.15, -5.7]],
      },
      normal: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7, top: 7, w: 6.4, color: 0xfff6ea },
          { id: "a", x: 0.4, z: -5.2, d: 4.8, top: 6.2, w: 5, color: 0xd7ecff },
          { id: "b", x: -0.6, z: -13.25, d: 4.6, top: 7.3, w: 4.6, color: 0xffffff, blink: { on: 2.1, off: 0.8 } },
          { id: "c", x: 0.8, z: -21.15, d: 4.6, top: 6.3, w: 4.6, color: 0xcdb4ff },
          { id: "d", x: -0.5, z: -29.1, d: 4.6, top: 7.35, w: 4.4, color: 0xfff6ea, blink: { on: 2.0, off: 0.85 } },
          { id: "e", x: 0.6, z: -37, d: 4.6, top: 6.4, w: 4.4, color: 0xb7d4ff },
          { id: "f", x: -0.4, z: -45, d: 4.8, top: 7.4, w: 4.6, color: 0xffffff },
          { id: "finish", x: 0, z: -53.9, d: 6.4, top: 8.2, w: 6.6, color: 0xfff3b0 },
        ],
        coins: [
          { x: 0.4, y: 7.1, z: -5.2 },
          { x: -0.6, y: 8.2, z: -13.25 },
          { x: 0.8, y: 7.2, z: -21.15 },
          { x: -0.5, y: 8.25, z: -29.1 },
          { x: 0.6, y: 7.3, z: -37 },
          { x: -0.4, y: 8.3, z: -45 },
        ],
        gems: [
          { x: 1.4, y: 7.2, z: -21.15 },
          { x: -1.2, y: 8.25, z: -29.1 },
        ],
        hills: [[-15, -4, 9], [16, -26, 11], [-13, -58, 10]],
        mushrooms: [[-2.2, 7, 5.6], [2.1, 6.2, -5.2]],
        trees: [[-5, 7, 3.2], [5.2, 6.2, -21.15]],
      },
      largo: {
        steps: [
          { id: "start", x: 0, z: 4, d: 6.6, top: 7, w: 6.2, color: 0xfff6ea },
          { id: "a", x: 0.3, z: -5.05, d: 4.8, top: 6.2, w: 5, color: 0xd7ecff, blink: { on: 2.0, off: 0.85 } },
          { id: "b", x: 0, z: -13.35, d: 5.2, top: 5.8, w: 6.2, color: 0xffffff, belt: 2.2 },
          { id: "c", x: 0.4, z: -21.75, d: 5, top: 6.85, w: 6.4, color: 0xcdb4ff, slide: { axis: "x", amp: 0.7, period: 2.8, label: "Tabla", hint: "La tabla se mueve" } },
          { id: "d", x: 0, z: -30.35, d: 5.6, top: 5.8, w: 6.6, color: 0xfff6ea, wheel: { len: 1.65, speed: 1.2 } },
          { id: "e", x: 0.5, z: -38.8, d: 4.6, top: 6.85, w: 4.8, color: 0xb7d4ff, blink: { on: 1.9, off: 0.9 } },
          { id: "f", x: 0, z: -47, d: 5.2, top: 5.9, w: 6.2, color: 0xffffff, belt: 2.4 },
          { id: "g", x: 0.6, z: -55.3, d: 4.8, top: 6.9, w: 5, color: 0xcdb4ff },
          { id: "finish", x: 0, z: -64.2, d: 6.4, top: 7.8, w: 6.6, color: 0xfff3b0 },
        ],
        coins: [
          { x: 0.3, y: 7.1, z: -5.05 },
          { x: 0, y: 6.7, z: -13.35 },
          { x: 0.4, y: 7.75, z: -21.75 },
          { x: 1.6, y: 6.7, z: -30.35 },
          { x: 0.5, y: 7.75, z: -38.8 },
          { x: 0, y: 6.8, z: -47 },
          { x: 0.6, y: 7.8, z: -55.3 },
        ],
        gems: [
          { x: 1.2, y: 7.75, z: -21.75 },
          { x: -1.1, y: 7.75, z: -38.8 },
        ],
        hills: [[-14, -6, 9], [15, -28, 11], [-13, -54, 10]],
        mushrooms: [[-2.1, 7, 5.4], [2.1, 6.2, -5.05]],
        trees: [[-4.8, 7, 3.2], [4.8, 5.8, -30.35]],
      },
    },
  },
  {
    id: "fiesta",
    name: "La fiesta",
    winTitle: "¡La tarta!",
    ending: "tarta",
    tint: "#ff7ab6",
    shade: "#d9568f",
    hill: 0xb7f0c8,
    wall: 0xf2d36b,
    lanes: {
      corto: {
        steps: [
          { id: "start", x: 0, z: 4, d: 8, top: 6, w: 8, color: 0xffd6ea },
          { id: "a", x: 0, z: -5.9, d: 6, top: 5.6, w: 6, color: 0xffb3d9 },
          { id: "b", x: 0, z: -14.4, d: 6, top: 5.2, w: 6, color: 0xffe08a },
          { id: "c", x: 0, z: -22.6, d: 4.6, top: 6.2, w: 4.4, color: 0xc4894a, slide: { axis: "z", amp: 0.8, period: 3.4, label: "Mesa", hint: "La mesa se mueve" } },
          { id: "d", x: 0, z: -30.4, d: 6, top: 5.0, w: 6, color: 0xb8f0c8 },
          { id: "e", x: 0, z: -38.4, d: 5, top: 6.0, w: 5.2, color: 0xcdb4ff },
          { id: "f", x: 0, z: -46.4, d: 6, top: 5.0, w: 6, color: 0xffe08a },
          { id: "finish", x: 0, z: -56.2, d: 8, top: 4.2, w: 8, color: 0xffd6ea },
        ],
        coins: [
          { x: 0, y: 6.9, z: -5.9 },
          { x: 0, y: 6.6, z: -14.4 },
          { x: 0, y: 7.4, z: -22.6 },
          { x: 0, y: 6.4, z: -30.4 },
          { x: 0, y: 7.2, z: -38.4 },
          { x: 0, y: 6.4, z: -46.4 },
        ],
        gems: [
          { x: 1.6, y: 7.6, z: -22.6 },
          { x: -1.4, y: 7.8, z: -46.4 },
        ],
        hills: [[-16, -20, 10], [18, -44, 12], [-14, -84, 11]],
        mushrooms: [[-3.1, 6, 5.2], [2.2, 5.2, -14.4]],
        trees: [[-4.6, 6, 6.2], [4.4, 5, -30.4]],
      },
      normal: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7.4, top: 6, w: 7, color: 0xffd6ea },
          { id: "a", x: -1.6, z: -5.45, d: 5.2, top: 5.5, w: 5.2, color: 0xffb3d9 },
          { id: "b", x: 1.5, z: -13.7, d: 5, top: 5.1, w: 5, color: 0xffe08a, slide: { axis: "z", amp: 0.4, period: 3.2, label: "Mesa", hint: "La mesa se mueve" } },
          { id: "c", x: -1.2, z: -21.7, d: 4.8, top: 6.05, w: 4.6, color: 0xc4894a },
          { id: "d", x: 1.3, z: -29.75, d: 5, top: 5.1, w: 5, color: 0xb8f0c8, slide: { axis: "z", amp: 0.28, period: 3, label: "Mesa", hint: "La mesa se mueve" } },
          { id: "e", x: -1.1, z: -37.75, d: 4.8, top: 6.05, w: 4.8, color: 0xcdb4ff },
          { id: "f", x: 0.6, z: -45.8, d: 5, top: 5.1, w: 5.2, color: 0xffe08a },
          { id: "finish", x: 0, z: -55, d: 7.2, top: 4.3, w: 7.4, color: 0xffd6ea },
        ],
        coins: [
          { x: -1.6, y: 6.4, z: -5.45 },
          { x: 1.5, y: 6.0, z: -13.7 },
          { x: -1.2, y: 6.95, z: -21.7 },
          { x: 1.3, y: 6.0, z: -29.75 },
          { x: -1.1, y: 6.95, z: -37.75 },
          { x: 0.6, y: 6.0, z: -45.8 },
        ],
        gems: [
          { x: 0.4, y: 6.95, z: -21.7 },
          { x: 0.4, y: 6.0, z: -29.75 },
        ],
        hills: [[-15, -8, 9], [16, -32, 11], [-13, -60, 10]],
        mushrooms: [[-2.8, 6, 5.4], [2.6, 5.5, -5.45]],
        trees: [[-4.6, 6, 5.2], [4.4, 5.1, -29.75]],
      },
      largo: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7, top: 6, w: 6.6, color: 0xffd6ea },
          { id: "a", x: -1.2, z: -5.25, d: 5, top: 5.3, w: 5, color: 0xffb3d9, belt: 2.4 },
          { id: "b", x: 1.1, z: -13.3, d: 4.8, top: 6.2, w: 5.2, color: 0xffe08a, slide: { axis: "z", amp: 0.4, period: 2.8, label: "Mesa", hint: "La mesa se mueve" } },
          { id: "c", x: 0, z: -21.7, d: 5.6, top: 5.1, w: 6.4, color: 0xc4894a, wheel: { len: 1.65, speed: 1.2 } },
          { id: "d", x: -1, z: -30, d: 4.6, top: 6.1, w: 4.8, color: 0xb8f0c8, blink: { on: 2.0, off: 0.85 } },
          { id: "e", x: 1.1, z: -37.85, d: 4.8, top: 5.2, w: 5, color: 0xcdb4ff, slide: { axis: "z", amp: 0.3, period: 2.7, label: "Mesa", hint: "La mesa se mueve" } },
          { id: "f", x: 0, z: -45.75, d: 5.2, top: 6.15, w: 6.2, color: 0xffe08a, belt: 2.6 },
          { id: "finish", x: 0, z: -55.5, d: 7.4, top: 4.4, w: 7.2, color: 0xffd6ea },
        ],
        coins: [
          { x: -1.2, y: 6.2, z: -5.25 },
          { x: 1.1, y: 7.1, z: -13.3 },
          { x: 1.5, y: 6.0, z: -21.7 },
          { x: -1, y: 7.0, z: -30 },
          { x: 1.1, y: 6.1, z: -37.85 },
          { x: 0, y: 7.05, z: -45.75 },
        ],
        gems: [
          { x: -1.2, y: 7.0, z: -30 },
          { x: 1.6, y: 6.1, z: -37.85 },
        ],
        hills: [[-14, -8, 9], [16, -30, 11], [-13, -58, 10]],
        mushrooms: [[-2.6, 6, 5.2], [2.4, 5.3, -5.25]],
        trees: [[-4.4, 6, 4.8], [4.6, 5.1, -21.7]],
      },
    },
  },
  {
    id: "globo",
    name: "El globo",
    winTitle: "¡El globo!",
    ending: "globo",
    tint: "#2fb8c4",
    shade: "#1f8c96",
    hill: 0xb7f0c8,
    wall: 0xffffff,
    lanes: {
      corto: {
        steps: [
          { id: "start", x: 0, z: 4, d: 8, top: 6, w: 7.5, color: 0xc5f2f5 },
          { id: "a", x: 0, z: -6, d: 6, top: 5.6, w: 6, color: 0x9fe3ea },
          { id: "b", x: 0, z: -14.8, d: 6, top: 5.2, w: 9, color: 0x7ed6dc },
          { id: "c", x: 0, z: -22, d: 4.8, top: 6.2, w: 5, color: 0xffffff },
          { id: "d", x: 0, z: -29.6, d: 5, top: 6.4, w: 5, color: 0xfff6ea },
          { id: "e", x: 0, z: -37.2, d: 5, top: 7.0, w: 5.2, color: 0xb7f0c8 },
          { id: "finish", x: 0, z: -46.4, d: 8, top: 4.8, w: 9, color: 0xffe08a },
        ],
        coins: [
          { x: 0, y: 6.9, z: -6 },
          { x: 0, y: 6.6, z: -14.8 },
          { x: 0, y: 7.3, z: -22 },
          { x: 0, y: 7.7, z: -29.6 },
          { x: 0, y: 8, z: -37.2 },
        ],
        gems: [
          { x: 0.8, y: 7.9, z: -37.2 },
          { x: -1.4, y: 8, z: -22 },
        ],
        hills: [[-16, -10, 9], [16, -34, 12], [-14, -70, 10]],
        mushrooms: [[-2.5, 5.6, -6], [2.6, 5.2, -14.8]],
        trees: [[5.4, 6, -6], [-5.4, 6.4, -29.6]],
      },
      normal: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7.2, top: 6, w: 6.6, color: 0xc5f2f5 },
          { id: "a", x: 0, z: -5.4, d: 5.2, top: 5.5, w: 5.4, color: 0x9fe3ea },
          { id: "b", x: 0, z: -13.9, d: 5.4, top: 5.1, w: 8, color: 0x7ed6dc, belt: -2.6 },
          { id: "c", x: -2.8, z: -22.05, d: 4.6, top: 6.1, w: 4.6, color: 0xffffff },
          { id: "d", x: 2.6, z: -29.8, d: 4.6, top: 6.2, w: 4.6, color: 0xfff6ea },
          { id: "e", x: 0, z: -37.75, d: 5, top: 6.9, w: 5.4, color: 0xb7f0c8, belt: -2.2 },
          { id: "f", x: -2.4, z: -45.65, d: 4.6, top: 6.0, w: 4.8, color: 0x9fe3ea },
          { id: "finish", x: 0, z: -54.8, d: 7.4, top: 4.6, w: 8, color: 0xffe08a },
        ],
        coins: [
          { x: 0, y: 6.4, z: -5.4 },
          { x: -1.6, y: 6.0, z: -13.9 },
          { x: -2.8, y: 7.0, z: -22.05 },
          { x: 2.6, y: 7.1, z: -29.8 },
          { x: -1.2, y: 7.8, z: -37.75 },
          { x: -2.4, y: 6.9, z: -45.65 },
        ],
        gems: [
          { x: -1.6, y: 7.0, z: -22.05 },
          { x: 1.4, y: 7.1, z: -29.8 },
        ],
        hills: [[-15, -8, 9], [16, -30, 12], [-13, -60, 10]],
        mushrooms: [[-2.4, 6, 5.4], [2.4, 5.5, -5.4]],
        trees: [[5.2, 6, -5.4], [-5.2, 6.1, -29.8]],
      },
      largo: {
        steps: [
          { id: "start", x: 0, z: 4, d: 7, top: 6, w: 6.4, color: 0xc5f2f5 },
          { id: "a", x: 0, z: -5.4, d: 5.2, top: 5.3, w: 6.6, color: 0x7ed6dc, belt: -2.8 },
          { id: "b", x: -2.6, z: -13.5, d: 4.6, top: 6.2, w: 4.8, color: 0xffffff, blink: { on: 2.0, off: 0.85 } },
          { id: "c", x: 0, z: -21.85, d: 5.6, top: 5.1, w: 6.6, color: 0xfff6ea, wheel: { len: 1.7, speed: 1.25 } },
          { id: "d", x: 2.2, z: -30.3, d: 4.8, top: 6.15, w: 5.2, color: 0xb7f0c8, slide: { axis: "x", amp: 0.8, period: 2.7, label: "Tabla", hint: "La tabla se mueve" } },
          { id: "e", x: 0, z: -38.5, d: 5.2, top: 5.2, w: 7, color: 0x9fe3ea, belt: 2.4 },
          { id: "f", x: 2.2, z: -46.6, d: 4.6, top: 6.2, w: 4.8, color: 0xffffff },
          { id: "finish", x: 0, z: -55.7, d: 7.2, top: 4.7, w: 8, color: 0xffe08a },
        ],
        coins: [
          { x: -1.4, y: 6.2, z: -5.4 },
          { x: -2.6, y: 7.1, z: -13.5 },
          { x: 1.6, y: 6.0, z: -21.85 },
          { x: 2.2, y: 7.05, z: -30.3 },
          { x: 1.4, y: 6.1, z: -38.5 },
          { x: 2.2, y: 7.1, z: -46.6 },
        ],
        gems: [
          { x: -1.4, y: 7.1, z: -13.5 },
          { x: 1.2, y: 7.05, z: -30.3 },
        ],
        hills: [[-14, -8, 9], [16, -28, 11], [-13, -58, 10]],
        mushrooms: [[-2.3, 6, 5.2], [2.4, 5.3, -5.4]],
        trees: [[5, 6, -5.4], [-5, 5.1, -21.85]],
      },
    },
  },
];

const LANE_IDS = ["corto", "normal", "largo"];
const STR = {
  es: {
    dance: "Bailar",
    home: "Casa",
    again: "Otra vez",
    doll: "Mi muñeco",
    shop: "La tienda",
    "dress.note": "Toca para cambiar cómo se ve.",
    done: "Listo",
    play: "Jugar",
    notNow: "Ahora no",
    "board.heading": "Tus insignias",
    close: "Cerrar",
    left: "Izquierda",
    forward: "Adelante",
    back: "Atrás",
    right: "Derecha",
    jump: "SALTAR",
    "jump.label": "Saltar",
    "lang.group": "Idioma",
    "sound.off": "Silenciar",
    "sound.on": "Activar sonido",
    "hint.walk": "Camina hacia un portal",
    "hint.belt": "La cinta empuja",
    "hint.plank": "La tabla se mueve",
    "hint.table": "La mesa se mueve",
    "hint.poof": "¡Se esfuma!",
    "hint.jump": "Espacio para saltar",
    "hint.tap": "Pulsa JUMP",
    "sign.belt": "Cinta",
    "sign.wheel": "Rueda",
    "sign.plank": "Tabla",
    "sign.table": "Mesa",
    "sign.poof": "Puf",
    "sign.shop": "Tienda",
    "sign.doll": "Muñeco",
    "sign.badges": "Insignias",
    "lane.corto": "Fácil",
    "lane.normal": "Normal",
    "lane.largo": "Difícil",
    "lane.star": "{name}, con estrella",
    "mark.on": "★ Insignia",
    "mark.off": "☆",
    "board.got": "¡Insignia ganada!",
    "board.need": "Termina este recorrido para ganarla",
    "world.fiesta": "La fiesta",
    "world.cuesta": "La cuesta",
    "world.puente": "El puente",
    "world.nubes": "Las nubes",
    "world.globo": "El globo",
    "win.fiesta": "¡La tarta!",
    "win.cuesta": "¡Piscina de bolas!",
    "win.puente": "¡El cofre!",
    "win.nubes": "¡La estrella!",
    "win.globo": "¡El globo!",
    purse: "Llevas {coins} monedas y {gems} gemas.",
    "win.fresh": "Insignia nueva. {purse}",
    "win.star": "Estrella de {lane}. {purse}",
    "shop.today": "Hoy: {day}. Toca para comprar o poner.",
    "shop.on": "¡Qué guay! {name} puesto.",
    "shop.off": "{name} guardado.",
    "shop.need.gems": "¡Te faltan gemas! 💎",
    "shop.need.coins": "¡Te faltan monedas! 🪙",
    "shop.got": "¡Sí! Ya tienes {name}.",
    "shop.worn": "Puesto",
    "shop.wear": "Poner",
    "slot.ropa": "Ropa",
    "slot.accesorio": "Accesorios",
    "slot.hat": "Para la cabeza",
    "slot.trail": "Huellas mágicas",
    "slot.pet": "Amiguitos",
    "dress.hair": "Pelo",
    "dress.curls": "Rizos",
    "dress.short": "Corto",
    "dress.cap": "Gorra",
    "dress.face": "Cara",
    "dress.smile": "Sonrisa",
    "dress.open": "Abierta",
    "dress.tongue": "Lengua",
    "dress.glasses": "Gafas",
    "dress.no": "No",
    "dress.round": "Redondas",
    "dress.sun": "De sol",
    "dress.pack": "Mochila",
    "dress.yes": "Sí",
    "dress.art": "Dibujo",
    "dress.plain": "Lisa",
    "dress.star": "Estrella",
    "dress.sunart": "Sol",
    "dress.heart": "Corazón",
    "dress.skin": "Piel",
    "dress.shirt": "Camiseta",
    "dress.pants": "Pantalón",
    "dress.shoes": "Zapatos",
    "dress.eyes": "Ojos",
    "item.cam-roja": "Camiseta roja",
    "item.cam-azul": "Camiseta azul",
    "item.cam-verde": "Camiseta verde",
    "item.cam-lila": "Camiseta lila",
    "item.cam-amarilla": "Camiseta amarilla",
    "item.pant-azul": "Pantalón azul",
    "item.pant-verde": "Pantalón verde",
    "item.pant-rojo": "Pantalón rojo",
    "item.zap-amarillos": "Zapatos amarillos",
    "item.zap-blancos": "Zapatos blancos",
    "item.zap-rojos": "Zapatos rojos",
    "item.gafas-redondas": "Gafas redondas",
    "item.gafas-sol": "Gafas de sol",
    "item.mochila": "Mochila",
    "item.dibujo-estrella": "Estrella",
    "item.dibujo-sol": "Sol",
    "item.dibujo-corazon": "Corazón",
    "item.flor": "Flor",
    "item.helice": "Hélice",
    "item.corona": "Corona",
    "item.seta": "Seta",
    "item.lazo": "Lazo",
    "item.estrellas": "Estrellas",
    "item.hojas": "Hojas",
    "item.burbujas": "Burbujas",
    "item.corazones": "Corazones",
    "item.pajaro": "Pájaro",
    "item.nube": "Nube",
    "item.ranita": "Ranita",
    "item.estrellita": "Estrellita",
    sneeze: "¡ACHÚS!",
    file: "Abre este juego con un servidor local, no como archivo suelto.",
  },
  en: {
    dance: "Dance",
    home: "Home",
    again: "Again",
    doll: "My avatar",
    shop: "The shop",
    "dress.note": "Tap to change how it looks.",
    done: "Done",
    play: "Play",
    notNow: "Not now",
    "board.heading": "Your badges",
    close: "Close",
    left: "Left",
    forward: "Forward",
    back: "Back",
    right: "Right",
    jump: "JUMP",
    "jump.label": "Jump",
    "lang.group": "Language",
    "sound.off": "Mute",
    "sound.on": "Turn sound on",
    "hint.walk": "Walk to a gate",
    "hint.belt": "The belt pushes",
    "hint.plank": "The plank moves",
    "hint.table": "The table moves",
    "hint.poof": "It vanishes!",
    "hint.jump": "Space to jump",
    "hint.tap": "Tap JUMP",
    "sign.belt": "Belt",
    "sign.wheel": "Wheel",
    "sign.plank": "Plank",
    "sign.table": "Table",
    "sign.poof": "Poof",
    "sign.shop": "Shop",
    "sign.doll": "Avatar",
    "sign.badges": "Badges",
    "lane.corto": "Easy",
    "lane.normal": "Normal",
    "lane.largo": "Hard",
    "lane.star": "{name}, with a star",
    "mark.on": "★ Badge",
    "mark.off": "☆",
    "board.got": "Badge won!",
    "board.need": "Finish this course to win it",
    "world.fiesta": "The Party",
    "world.cuesta": "The Hill",
    "world.puente": "The Bridge",
    "world.nubes": "The Clouds",
    "world.globo": "The Balloon",
    "win.fiesta": "The cake!",
    "win.cuesta": "Ball pit!",
    "win.puente": "The chest!",
    "win.nubes": "The star!",
    "win.globo": "The balloon!",
    purse: "You have {coins} coins and {gems} gems.",
    "win.fresh": "New badge. {purse}",
    "win.star": "{lane} star. {purse}",
    "shop.today": "Today: {day}. Tap to buy or wear.",
    "shop.on": "Yay! {name} is on.",
    "shop.off": "{name} put away.",
    "shop.need.gems": "You need more gems! 💎",
    "shop.need.coins": "You need more coins! 🪙",
    "shop.got": "Yes! You got {name}.",
    "shop.worn": "On",
    "shop.wear": "Wear",
    "slot.ropa": "Clothes",
    "slot.accesorio": "Extras",
    "slot.hat": "Hats",
    "slot.trail": "Trails",
    "slot.pet": "Pets",
    "dress.hair": "Hair",
    "dress.curls": "Curls",
    "dress.short": "Short",
    "dress.cap": "Cap",
    "dress.face": "Face",
    "dress.smile": "Smile",
    "dress.open": "Open",
    "dress.tongue": "Tongue",
    "dress.glasses": "Glasses",
    "dress.no": "No",
    "dress.round": "Round",
    "dress.sun": "Sun",
    "dress.pack": "Backpack",
    "dress.yes": "Yes",
    "dress.art": "Picture",
    "dress.plain": "Plain",
    "dress.star": "Star",
    "dress.sunart": "Sun",
    "dress.heart": "Heart",
    "dress.skin": "Skin",
    "dress.shirt": "Shirt",
    "dress.pants": "Pants",
    "dress.shoes": "Shoes",
    "dress.eyes": "Eyes",
    "item.cam-roja": "Red shirt",
    "item.cam-azul": "Blue shirt",
    "item.cam-verde": "Green shirt",
    "item.cam-lila": "Lilac shirt",
    "item.cam-amarilla": "Yellow shirt",
    "item.pant-azul": "Blue pants",
    "item.pant-verde": "Green pants",
    "item.pant-rojo": "Red pants",
    "item.zap-amarillos": "Yellow shoes",
    "item.zap-blancos": "White shoes",
    "item.zap-rojos": "Red shoes",
    "item.gafas-redondas": "Round glasses",
    "item.gafas-sol": "Sunglasses",
    "item.mochila": "Backpack",
    "item.dibujo-estrella": "Star",
    "item.dibujo-sol": "Sun",
    "item.dibujo-corazon": "Heart",
    "item.flor": "Flower",
    "item.helice": "Propeller",
    "item.corona": "Crown",
    "item.seta": "Mushroom",
    "item.lazo": "Bow",
    "item.estrellas": "Stars",
    "item.hojas": "Leaves",
    "item.burbujas": "Bubbles",
    "item.corazones": "Hearts",
    "item.pajaro": "Bird",
    "item.nube": "Cloud",
    "item.ranita": "Froggy",
    "item.estrellita": "Little star",
    sneeze: "ACHOO!",
    file: "Open this game with a local server, not as a loose file.",
  },
};
let lang = "en";

function t(key, vars) {
  let text = (STR[lang] && STR[lang][key]) || STR.es[key] || key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, value);
  }
  return text;
}

function itemLabel(item) {
  return t(`item.${item.id}`);
}

function emptyBadges() {
  return Object.fromEntries(COURSES.map((c) => [c.id, false]));
}
function emptyPaths() {
  const paths = {};
  for (const course of COURSES) {
    if (!course.lanes) continue;
    paths[course.id] = { corto: false, normal: false, largo: false };
  }
  return paths;
}
function playableCourse(id, lane) {
  const def = COURSES.find((item) => item.id === id);
  if (!def.lanes) return def;
  const key = def.lanes[lane] ? lane : "normal";
  return { ...def, ...def.lanes[key], lane: key };
}
function keep(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}
function knownIds(slot) {
  return new Set(CATALOG.filter((item) => item.slot === slot).map((item) => item.id));
}
function loadSave() {
  const badges = emptyBadges();
  const paths = emptyPaths();
  const owned = { ropa: [], accesorio: [], hat: [], pet: [], trail: [] };
  const gear = { hat: null, pet: null, trail: null };
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    const look = { ...DEFAULT_LOOK, ...(raw.look || {}) };
    look.hairStyle = keep(look.hairStyle, HAIR_IDS, DEFAULT_LOOK.hairStyle);
    look.face = keep(look.face, FACE_IDS, DEFAULT_LOOK.face);
    look.glasses = keep(look.glasses, GLASSES_IDS, DEFAULT_LOOK.glasses);
    look.pack = keep(look.pack, PACK_IDS, DEFAULT_LOOK.pack);
    look.shirtArt = keep(look.shirtArt, ART_IDS, DEFAULT_LOOK.shirtArt);
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
    for (const id of Object.keys(paths)) {
      const savedPaths = raw.paths?.[id];
      if (savedPaths && typeof savedPaths === "object") {
        for (const lane of Object.keys(paths[id])) paths[id][lane] = !!savedPaths[lane];
      } else if (badges[id]) {
        paths[id].corto = true;
      }
    }
    for (const slot of Object.keys(owned)) {
      const ids = knownIds(slot);
      const list = Array.isArray(raw.owned?.[slot]) ? raw.owned[slot] : [];
      owned[slot] = list.filter((id) => ids.has(id));
      if (ids.has(raw.gear?.[slot]) && owned[slot].includes(raw.gear[slot])) gear[slot] = raw.gear[slot];
    }
    const lang = raw.lang === "es" ? "es" : "en";
    return { look, coins, gems, badges, owned, gear, paths, lang };
  } catch {
    return { look: { ...DEFAULT_LOOK }, coins: 0, gems: 0, badges, owned, gear, paths: emptyPaths(), lang: "en" };
  }
}
const saved = loadSave();
lang = saved.lang;
let avatar = saved.look;
const wallet = { coins: saved.coins, gems: saved.gems };
const badges = saved.badges;
const paths = saved.paths;
const owned = saved.owned;
const gear = saved.gear;
let course = null;

function persist() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ look: avatar, coins: wallet.coins, gems: wallet.gems, badges, paths, owned, gear, lang }));
}

function showProgress() {
  coinsEl.textContent = `🪙 ${wallet.coins}`;
  gemsEl.textContent = `💎 ${wallet.gems}`;
  for (const btn of gamesEl.querySelectorAll("button")) {
    const mark = btn.querySelector("small");
    if (mark) mark.textContent = badges[btn.dataset.course] ? t("mark.on") : t("mark.off");
  }
  for (const [id, stars] of Object.entries(portalStars)) {
    const def = COURSES.find((item) => item.id === id);
    stars.forEach((star, i) => {
      star.visible = def.lanes ? !!paths[id]?.[LANE_IDS[i]] : !!badges[id];
    });
  }
  paintBoard();
}

function scanSpots() {
  if (!player.onGround) return;
  const here = spots.find((s) => player.pos.x > s.minX && player.pos.x < s.maxX && player.pos.z > s.minZ && player.pos.z < s.maxZ);
  if (!here) {
    armedSpot = null;
    if (state === "gate") closeGate();
    return;
  }
  if (here.id === armedSpot) return;
  if (state === "gate") closeGate();
  armedSpot = here.id;
  if (here.kind === "portal") openGate(here.course);
  else if (here.kind === "shop") openShop();
  else if (here.kind === "board") openBoardCard();
  else openDress();
}

const keys = new Set();
const touch = { left: false, right: false, forward: false, back: false };
let jumpEdge = false;
let jumpFromTouch = false;
let jumpBufferTouch = false;
let lastMoveX = 0;
let lastMoveZ = -RUN;
let airX = 0;
let airZ = 0;
let airCarry = false;
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
scene.fog = new THREE.Fog(0xa9dbff, 35, 95);

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
const flags = [];
const wheels = [];
const PUSH_V = 5.5;
const PUSH_T = 0.2;
let pushT = 0;
let pushCool = 0;
const pushV = { x: 0, z: 0 };
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
    cap.position.set(0, h / 2 - 0.05, 0);
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
    if (cp && !lobby) addFlag(solid);
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
    arrow.rotation.z = (solid.belt > 0 ? -1 : 1) * (Math.PI / 2);
    arrow.position.set(home, solid.h / 2 + 0.14, 0);
    arrow.userData.home = home;
    solid.group.add(arrow);
    solid.stripes.push(arrow);
  }
}

function addFlag(solid) {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.05, 1.15, 6),
    new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.55 })
  );
  pole.position.y = 0.58;
  const clothMat = new THREE.MeshStandardMaterial({ color: 0xd94a3c, roughness: 0.45, side: THREE.DoubleSide });
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.32), clothMat);
  cloth.position.set(0.3, 0.98, 0);
  g.add(pole, cloth);
  g.position.set(solid.w / 2 - 0.45, solid.h / 2, -solid.d / 2 + 0.45);
  g.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  g.visible = false;
  solid.group.add(g);
  flags.push({ id: solid.id, group: g, cloth, clothMat });
}

function buildWheel(solid, spec) {
  const len = spec.len;
  const group = new THREE.Group();
  group.position.set(0, solid.h / 2, 0);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xf2c14e, roughness: 0.5 });
  const capMat = new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.45 });
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.42, 16), capMat);
  hub.position.y = 0.21;
  const armZ = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.5, len * 2), armMat);
  armZ.position.y = 0.35;
  const armX = new THREE.Mesh(new THREE.BoxGeometry(len * 2, 0.5, 0.34), armMat);
  armX.position.y = 0.35;
  group.add(hub, armZ, armX);
  const tipGeo = new THREE.SphereGeometry(0.24, 12, 8);
  for (const [x, z] of [[0, len], [0, -len], [len, 0], [-len, 0]]) {
    const tip = new THREE.Mesh(tipGeo, capMat);
    tip.position.set(x, 0.35, z);
    group.add(tip);
  }
  group.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  solid.group.add(group);
  wheels.push({ solid, group, len, speed: spec.speed, angle: 0 });
}

function hitWheels() {
  if (pushT > 0 || pushCool > 0) return;
  const scale = player.scale;
  const thr = HW * scale + 0.17;
  for (const w of wheels) {
    const top = w.solid.cy;
    if (player.pos.y >= top + 0.6 || player.pos.y + H * scale <= top + 0.1) continue;
    const rx = player.pos.x - w.solid.cx;
    const rz = player.pos.z - w.solid.cz;
    const a = w.angle;
    const arms = [
      [Math.sin(a), Math.cos(a)],
      [Math.cos(a), -Math.sin(a)],
    ];
    for (const [dx, dz] of arms) {
      const along = rx * dx + rz * dz;
      if (Math.abs(along) > w.len + 0.3) continue;
      const sgn = along >= 0 ? 1 : -1;
      const tx = dz;
      const tz = -dx;
      const across = rx * tx + rz * tz;
      if (across * sgn <= 0 || Math.abs(across) > thr) continue;
      pushV.x = tx * sgn * PUSH_V;
      pushV.z = tz * sgn * PUSH_V;
      pushT = PUSH_T;
      pushCool = 1.0;
      if (player.onGround) player.vel.y = Math.max(player.vel.y, 4.5);
      tone(196, 0.16, "triangle", 0.08);
      return;
    }
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
  for (const w of wheels) {
    w.angle = time * w.speed;
    w.group.rotation.y = w.angle;
  }
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

function paintSign(mesh) {
  const text = t(mesh.userData.key);
  const c = mesh.userData.canvas;
  const g = c.getContext("2d");
  g.clearRect(0, 0, c.width, c.height);
  g.fillStyle = mesh.userData.bg;
  roundRect(g, 12, 16, 488, 224, 48);
  g.fill();
  g.fillStyle = "#3a2a22";
  g.textAlign = "center";
  g.textBaseline = "middle";
  let size = 64;
  g.font = `700 ${size}px Fredoka, Trebuchet MS, sans-serif`;
  while (size > 34 && g.measureText(text).width > 440) {
    size -= 2;
    g.font = `700 ${size}px Fredoka, Trebuchet MS, sans-serif`;
  }
  g.fillText(text, 256, 138);
  if (mesh.material.map) mesh.material.map.needsUpdate = true;
}

function makeSign(key, bg) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 1.15),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  mesh.renderOrder = 2;
  mesh.userData.key = key;
  mesh.userData.bg = bg;
  mesh.userData.canvas = c;
  signs.push(mesh);
  paintSign(mesh);
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
  for (let i = signs.length - 1; i >= 0; i--) {
    if (!signs[i].parent) signs.splice(i, 1);
  }
  solids.length = 0;
  flags.length = 0;
  wheels.length = 0;
  pushT = 0;
  pushCool = 0;
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
    { course: "fiesta", x: -7.2 },
    { course: "cuesta", x: -3.6 },
    { course: "puente", x: 0 },
    { course: "nubes", x: 3.6 },
    { course: "globo", x: 7.2 },
  ];
  for (const portal of portals) {
    const def = COURSES.find((item) => item.id === portal.course);
    buildPortal(def, portal.x, 86);
    spots.push({ id: def.id, kind: "portal", course: def.id, minX: portal.x - 1.6, maxX: portal.x + 1.6, minZ: 83.6, maxZ: 89.2 });
  }
  buildStall(-10, 99, "sign.shop", "#ffd23f");
  buildMirror(10, 99);
  buildBoard(-6.6, 99.4);
  spots.push({ id: "board", kind: "board", minX: -8.2, maxX: -5.0, minZ: 99.7, maxZ: 101.8 });
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
  const sign = makeSign(`world.${def.id}`, def.tint);
  sign.position.set(x, 9.15, z);
  plazaRoot.add(sign);
  const marks = def.lanes
    ? LANE_IDS.map((lane, i) => ({ lane, x: x + (i - 1) * 0.5, y: 9.92, scale: 0.2 }))
    : [{ x, y: 9.9, scale: 0.35, badge: true }];
  portalStars[def.id] = marks.map((mark) => {
    const star = starMesh();
    star.scale.setScalar(mark.scale);
    star.position.set(mark.x, mark.y, z);
    star.visible = mark.badge ? !!badges[def.id] : !!paths[def.id]?.[mark.lane];
    plazaRoot.add(star);
    return star;
  });
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

const BOARD_ORDER = ["fiesta", "cuesta", "puente", "nubes", "globo"];
let boardCanvas = null;
let boardCtx = null;
let boardTex = null;

function drawStar(g, x, y, r, color) {
  g.save();
  g.translate(x, y);
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
    const b = a + Math.PI / 5;
    g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    g.lineTo(Math.cos(b) * r * 0.42, Math.sin(b) * r * 0.42);
  }
  g.closePath();
  g.fill();
  g.restore();
}

function drawCoursePicture(g, id) {
  if (id === "fiesta") {
    g.fillStyle = "#ff7ab6";
    g.beginPath();
    g.ellipse(-18, -6, 16, 22, -0.2, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#ffd23f";
    g.beginPath();
    g.ellipse(16, 0, 14, 20, 0.15, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "#6b4426";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(-16, 16);
    g.quadraticCurveTo(0, 34, 16, 18);
    g.stroke();
  } else if (id === "cuesta") {
    g.fillStyle = "#7dcc8a";
    g.beginPath();
    g.moveTo(-36, 24);
    g.lineTo(0, -26);
    g.lineTo(36, 24);
    g.closePath();
    g.fill();
    g.fillStyle = "#c4894a";
    g.fillRect(-3, -28, 5, 20);
    g.fillStyle = "#ff6b4a";
    g.beginPath();
    g.moveTo(2, -28);
    g.lineTo(22, -18);
    g.lineTo(2, -10);
    g.closePath();
    g.fill();
  } else if (id === "puente") {
    g.strokeStyle = "#c4894a";
    g.lineWidth = 9;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(-32, 18);
    g.quadraticCurveTo(0, -34, 32, 18);
    g.stroke();
    g.fillStyle = "#3d7ec9";
    g.fillRect(-40, 16, 80, 12);
  } else if (id === "nubes") {
    g.fillStyle = "#fffdf8";
    g.beginPath();
    g.arc(-14, 8, 16, 0, Math.PI * 2);
    g.arc(12, 4, 20, 0, Math.PI * 2);
    g.arc(0, -10, 14, 0, Math.PI * 2);
    g.fill();
    drawStar(g, 24, -22, 9, "#ffd23f");
  } else if (id === "globo") {
    g.fillStyle = "#2fb8c4";
    g.beginPath();
    g.ellipse(0, -8, 22, 28, 0, 0, Math.PI * 2);
    g.fill();
    g.save();
    g.beginPath();
    g.ellipse(0, -8, 22, 28, 0, 0, Math.PI * 2);
    g.clip();
    g.fillStyle = "#ff7ab6";
    g.fillRect(-8, -40, 12, 70);
    g.restore();
    g.fillStyle = "#c4894a";
    g.fillRect(-12, 28, 24, 12);
    g.strokeStyle = "#6b4426";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-12, 18);
    g.lineTo(-12, 28);
    g.moveTo(12, 18);
    g.lineTo(12, 28);
    g.stroke();
  }
}

function paintBoard() {
  if (!boardCtx) return;
  const g = boardCtx;
  const w = boardCanvas.width;
  const h = boardCanvas.height;
  g.clearRect(0, 0, w, h);
  g.fillStyle = "rgba(70,40,15,0.28)";
  roundRect(g, 22, 26, w - 36, h - 40, 36);
  g.fill();
  g.fillStyle = "#e2a85c";
  roundRect(g, 10, 10, w - 36, h - 44, 34);
  g.fill();
  g.save();
  roundRect(g, 10, 10, w - 36, h - 44, 34);
  g.clip();
  g.strokeStyle = "rgba(140,80,30,0.2)";
  g.lineWidth = 4;
  for (let k = 0; k < 8; k++) {
    const yy = 50 + k * ((h - 90) / 7);
    g.beginPath();
    g.moveTo(30, yy);
    g.bezierCurveTo(w * 0.35, yy - 10, w * 0.65, yy + 10, w - 50, yy);
    g.stroke();
  }
  g.fillStyle = "rgba(255,232,190,0.35)";
  roundRect(g, 36, 28, w - 88, 22, 11);
  g.fill();
  g.restore();
  g.strokeStyle = "#b47a3a";
  g.lineWidth = 12;
  roundRect(g, 10, 10, w - 36, h - 44, 34);
  g.stroke();
  g.fillStyle = "#6b4426";
  for (const [nx, ny] of [[48, 48], [w - 74, 48], [48, h - 82], [w - 74, h - 82]]) {
    g.beginPath();
    g.arc(nx, ny, 9, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = "#4a2e1b";
  g.font = "700 62px Fredoka, Trebuchet MS, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(t("sign.badges"), w / 2 - 8, 86);
  drawStar(g, 250, 86, 22, "#ffd23f");
  drawStar(g, w - 278, 86, 22, "#ffd23f");
  const spots = [
    ["fiesta", 175, 268],
    ["cuesta", 480, 268],
    ["puente", 785, 268],
    ["nubes", 328, 478],
    ["globo", 632, 478],
  ];
  for (const [id, x, y] of spots) {
    const def = COURSES.find((item) => item.id === id);
    const got = !!badges[def.id];
    g.fillStyle = got ? def.tint : "#f4e4c8";
    g.beginPath();
    g.arc(x, y, 74, 0, Math.PI * 2);
    g.fill();
    g.lineWidth = 7;
    g.strokeStyle = got ? "#fffdf8" : "#d9c4a2";
    g.stroke();
    g.save();
    g.translate(x, y);
    if (!got) g.globalAlpha = 0.55;
    drawCoursePicture(g, id);
    g.restore();
    drawStar(g, x + 46, y - 46, got ? 20 : 16, got ? "#ffd23f" : "#c9b48f");
    g.fillStyle = "#4a2e1b";
    const label = t(`world.${id}`);
    let size = 32;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `700 ${size}px Fredoka, Trebuchet MS, sans-serif`;
    while (size > 18 && g.measureText(label).width > 148) {
      size -= 2;
      g.font = `700 ${size}px Fredoka, Trebuchet MS, sans-serif`;
    }
    g.fillText(label, x, y + 104);
  }
  if (boardTex) boardTex.needsUpdate = true;
}

function buildBoard(x, z) {
  boardCanvas = document.createElement("canvas");
  boardCanvas.width = 960;
  boardCanvas.height = 640;
  boardCtx = boardCanvas.getContext("2d");
  paintBoard();
  boardTex = new THREE.CanvasTexture(boardCanvas);
  boardTex.colorSpace = THREE.SRGBColorSpace;
  addSolid({ lobby: true, id: "tablero", x, top: 6.5, z, w: 2.8, d: 0.6, h: 0.5, color: null, cp: null });
  const side = new THREE.MeshStandardMaterial({ color: 0xb47a3a, roughness: 0.8 });
  const face = new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.82, transparent: true });
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.87, 0.1), [side, side, side, side, face, side]);
  board.position.set(x, 7.95, z + 0.08);
  board.castShadow = true;
  plazaRoot.add(board);
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.7 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.35, 10), wood);
  pole.position.set(x, 7.55, z - 0.08);
  pole.castShadow = true;
  plazaRoot.add(pole);
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
  const sign = makeSign("sign.doll", "#fff6ea");
  sign.position.set(x, 8.45, z + 0.28);
  sign.renderOrder = 2;
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
    if (s.belt) placeSign("sign.belt", "#f2c14e", s.x - s.w / 2 - 1.55, s.top + 1.4, s.z);
    if (s.wheel) {
      buildWheel(solid, s.wheel);
      placeSign("sign.wheel", "#ff6b4a", s.x - s.w / 2 - 1.55, s.top + 1.4, s.z);
    }
    if (s.slide && solid.group) {
      const tag = makeSign(s.slide.label === "Mesa" ? "sign.table" : "sign.plank", "#c46b4a");
      tag.position.set(s.w / 2 + 1.55, solid.h / 2 + 1.55, 0);
      solid.group.add(tag);
    }
    if (s.blink) placeSign("sign.poof", "#fff6ea", s.x - s.w / 2 - 1.55, s.top + 1.55, s.z);
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
  } else if (def.ending === "tarta") {
    buildCake(fin);
  } else if (def.ending === "globo") {
    buildBalloon(fin);
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
  } else if (def.ending === "tarta") {
    steps.forEach((s, i) => {
      if (s.slide) return;
      if (i % 2 === 0) bush(s.x - s.w / 2 - 0.95, s.top, s.z);
      else flowerAt(courseRoot, s.x + s.w / 2 + 0.9, s.top, s.z + 0.5, 0xff7ab6);
    });
  } else if (def.ending === "globo") {
    steps.forEach((s) => {
      if (s.belt) return;
      flowerAt(courseRoot, s.x + s.w / 2 + 0.9, s.top, s.z - 0.6, 0xffd23f);
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

function buildCake(fin) {
  const g = new THREE.Group();
  const sponge = new THREE.MeshStandardMaterial({ color: 0xfff1d6, roughness: 0.7 });
  const icing = new THREE.MeshStandardMaterial({ color: 0xff7ab6, roughness: 0.5 });
  const cherry = new THREE.MeshStandardMaterial({ color: 0xff3b5c, roughness: 0.4 });
  const candle = new THREE.MeshStandardMaterial({ color: 0x7ec8e3, roughness: 0.5 });
  const flame = new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0xffb703, emissiveIntensity: 0.6 });
  const bottom = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.8, 24), sponge);
  bottom.position.y = 0.4;
  const icingLow = new THREE.Mesh(new THREE.CylinderGeometry(1.53, 1.53, 0.16, 24), icing);
  icingLow.position.y = 0.8;
  const top = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.6, 24), sponge);
  top.position.y = 1.1;
  const icingHigh = new THREE.Mesh(new THREE.CylinderGeometry(1.03, 1.03, 0.14, 24), icing);
  icingHigh.position.y = 1.47;
  const cherryTop = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), cherry);
  cherryTop.position.y = 1.7;
  g.add(bottom, icingLow, top, icingHigh, cherryTop);
  for (const a of [0, 2.1, 4.2]) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.1), candle);
    c.position.set(Math.cos(a) * 0.55, 1.8, Math.sin(a) * 0.55);
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), flame);
    f.position.set(c.position.x, 2.07, c.position.z);
    g.add(c, f);
  }
  g.position.set(fin.x, fin.top, fin.z - 2.2);
  g.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  courseRoot.add(g);
}

function buildBalloon(fin) {
  const g = new THREE.Group();
  const red = new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.4 });
  const yellow = new THREE.MeshStandardMaterial({ color: 0xffd23f, roughness: 0.4 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x3a2a22, roughness: 0.6 });
  const wood = new THREE.MeshStandardMaterial({ color: 0xc4894a, roughness: 0.7 });
  const big = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 18), red);
  big.scale.y = 1.2;
  big.position.y = 3.6;
  const knot = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.3, 8), red);
  knot.rotation.x = Math.PI;
  knot.position.y = 2.2;
  const small = new THREE.Mesh(new THREE.SphereGeometry(0.6, 18, 14), yellow);
  small.position.set(1.3, 2.9, 0.2);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.7, 6), dark);
  cord.position.y = 1.35;
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), wood);
  basket.position.y = 0.25;
  g.add(big, knot, small, cord, basket);
  g.position.set(fin.x, fin.top, fin.z - 1.5);
  g.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true;
  });
  courseRoot.add(g);
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

function makeGlasses(shades) {
  const g = new THREE.Group();
  const frame = new THREE.MeshStandardMaterial({ color: shades ? 0x2a211c : 0x4a2c24, roughness: 0.4 });
  const lens = new THREE.MeshStandardMaterial({
    color: shades ? 0x243656 : 0xd7f1ff,
    transparent: true,
    opacity: shades ? 0.78 : 0.35,
    roughness: 0.12,
    depthWrite: false,
  });
  for (const x of [-0.12, 0.12]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.016, 8, 18), frame);
    ring.position.set(x, 0, 0);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.072, 16), lens);
    glass.position.set(x, 0, 0.012);
    g.add(ring, glass);
  }
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.07, 6), frame);
  bridge.rotation.z = Math.PI / 2;
  g.add(bridge);
  for (const x of [-0.2, 0.2]) {
    const temple = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.18), frame);
    temple.position.set(x, 0, -0.1);
    g.add(temple);
  }
  g.position.set(0, 1.29, 0.38);
  g.visible = false;
  return g;
}

function makePack() {
  const g = new THREE.Group();
  const cloth = new THREE.MeshStandardMaterial({ color: 0xffd23f, roughness: 0.55 });
  const flapMat = new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.5 });
  const strapMat = new THREE.MeshStandardMaterial({ color: 0x3a2a22, roughness: 0.6 });
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.4, 0.16), cloth);
  bag.position.set(0, 0.84, -0.36);
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.04), flapMat);
  pocket.position.set(0, 0.74, -0.45);
  const flap = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.05), flapMat);
  flap.position.set(0, 1.0, -0.4);
  g.add(bag, pocket, flap);
  for (const x of [-0.1, 0.1]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.34, 0.05), strapMat);
    strap.position.set(x, 1.02, -0.2);
    strap.rotation.x = 0.55;
    g.add(strap);
  }
  g.visible = false;
  return g;
}

function makeShirtArt() {
  const plateMat = new THREE.MeshBasicMaterial({ color: 0xfffdf8 });
  function sticker(node) {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.CircleGeometry(0.125, 18), plateMat);
    node.position.z = 0.03;
    g.add(plate, node);
    g.position.set(0, 0.9, 0.3);
    g.visible = false;
    return g;
  }
  const star = starMesh();
  star.scale.setScalar(0.1);
  const sun = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.CircleGeometry(0.055, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd23f })
  );
  sun.add(core);
  const rayMat = new THREE.MeshBasicMaterial({ color: 0xff6b4a });
  for (let i = 0; i < 8; i++) {
    const ray = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.045, 0.01), rayMat);
    const a = (i / 8) * Math.PI * 2;
    ray.position.set(Math.cos(a) * 0.09, Math.sin(a) * 0.09, 0);
    ray.rotation.z = a - Math.PI / 2;
    sun.add(ray);
  }
  const heart = new THREE.Group();
  const pink = new THREE.MeshBasicMaterial({ color: 0xff5d8f });
  const lobeL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), pink);
  lobeL.position.set(-0.035, 0.02, 0);
  const lobeR = lobeL.clone();
  lobeR.position.x = 0.035;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.078, 0.11, 8), pink);
  tip.rotation.x = Math.PI;
  tip.position.y = -0.035;
  heart.add(lobeL, lobeR, tip);
  return { estrella: sticker(star), sol: sticker(sun), corazon: sticker(heart) };
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
  const open = new THREE.Group();
  const cave = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0x6b3030, roughness: 0.7 })
  );
  cave.scale.set(1.35, 1, 0.45);
  cave.position.set(0, 1.1, 0.34);
  const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.022, 0.02), white);
  teeth.position.set(0, 1.145, 0.36);
  open.add(cave, teeth);
  open.visible = false;
  const tongue = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xff7a8a, roughness: 0.45 })
  );
  tongue.scale.set(0.9, 0.55, 1.35);
  tongue.position.set(0, 1.075, 0.39);
  tongue.visible = false;

  const cap = new THREE.Group();
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), hair);
  crown.scale.set(1, 0.62, 1);
  crown.position.set(0, 0.22, -0.02);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.06, 18), hair);
  brim.position.set(0, 0.08, 0.08);
  cap.add(crown, brim);
  cap.position.y = 1.46;
  cap.visible = false;

  const redondas = makeGlasses(false);
  const sol = makeGlasses(true);
  const pack = makePack();
  const art = makeShirtArt();
  g.add(
    legL, legR, body, stripe, armL, armR, head, earL, earR, curls, cap,
    eye(-0.12), eye(0.12), cheekL, cheekR, smile, open, tongue,
    redondas, sol, pack, art.estrella, art.sol, art.corazon
  );
  g.userData.parts = { legL, legR, armL, armR };
  g.userData.mats = { skin, shirt, pants, shoes: shoe, hair, eyes: iris };
  g.userData.curls = curls;
  g.userData.cap = cap;
  g.userData.face = { smile, open, tongue };
  g.userData.glasses = { redondas, sol };
  g.userData.pack = pack;
  g.userData.art = art;
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  for (const extra of [redondas, sol, open, tongue, art.estrella, art.sol, art.corazon]) {
    extra.traverse((o) => {
      if (o.isMesh) o.castShadow = false;
    });
  }
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
  const face = kid.userData.face;
  face.smile.visible = avatar.face === "sonrisa" || avatar.face === "lengua";
  face.open.visible = avatar.face === "abierta";
  face.tongue.visible = avatar.face === "lengua";
  kid.userData.glasses.redondas.visible = avatar.glasses === "redondas";
  kid.userData.glasses.sol.visible = avatar.glasses === "sol";
  kid.userData.pack.visible = avatar.pack === "mochila";
  for (const [id, mesh] of Object.entries(kid.userData.art)) mesh.visible = avatar.shirtArt === id;
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

const dressStudio = new THREE.Group();
dressStudio.visible = false;
const dressPad = new THREE.Mesh(
  new THREE.CircleGeometry(1.15, 48),
  new THREE.MeshStandardMaterial({ color: 0xfff8ef, roughness: 0.92 })
);
dressPad.rotation.x = -Math.PI / 2;
dressPad.receiveShadow = true;
dressStudio.add(dressPad);
scene.add(dressStudio);

function syncRendererToView() {
  const rect = view.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));
  renderer.setScissorTest(false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  camera.aspect = w / Math.max(1, h);
  camera.updateProjectionMatrix();
}

function setDressStudio(on) {
  document.body.classList.toggle("dressing", on);
  void view.offsetHeight;
  dressStudio.visible = on;
  plazaRoot.visible = !on;
  courseRoot.visible = !on;
  sunBall.visible = !on;
  blob.visible = !on;
  for (const cloud of bobbers) cloud.visible = !on;
  scene.background = new THREE.Color(on ? 0xf7e9ff : 0xa9dbff);
  if (scene.fog) {
    scene.fog.color.set(on ? 0xf7e9ff : 0xa9dbff);
    scene.fog.near = on ? 80 : 35;
    scene.fog.far = on ? 140 : 95;
  }
  camera.up.set(0, 1, 0);
  camera.clearViewOffset();
  renderer.setClearColor(on ? 0xf7e9ff : 0xa9dbff, 1);
  syncRendererToView();
  if (on) {
    dressStudio.position.set(player.pos.x, player.pos.y, player.pos.z);
    kid.position.copy(player.pos);
    frameDressCamera();
  }
}

function dressTurn() {
  // A bit of side angle so backpack and side details stay visible.
  return avatar.pack === "mochila" ? 0.95 : 0.4;
}

function frameDressCamera() {
  camera.up.set(0, 1, 0);
  camera.position.set(player.pos.x, player.pos.y + 1.05, player.pos.z + 3.35);
  camera.lookAt(player.pos.x, player.pos.y + 0.9, player.pos.z);
  kid.rotation.y = dressTurn();
}

function frameHomeCamera() {
  camera.up.set(0, 1, 0);
  camera.position.set(player.pos.x, player.pos.y + 4.2, player.pos.z + 10.5);
  camera.lookAt(player.pos.x, player.pos.y + 1.4, player.pos.z - 4);
  camera.updateProjectionMatrix();
}

const puffGeo = new THREE.SphereGeometry(0.18, 8, 6);
const puffMat = new THREE.MeshBasicMaterial({ color: 0xfffaf2 });
const puffs = [];
for (let i = 0; i < 22; i++) {
  const m = new THREE.Mesh(puffGeo, puffMat);
  m.visible = false;
  scene.add(m);
  puffs.push({ mesh: m, v: new THREE.Vector3(), life: 0, soft: false });
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
let danceT = 0;
let danceYaw = 0;
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
  danceT = 0;
  carry = false;
  control = true;
  pendingIntro = false;
  introTimer = 0;
  cooldown = 0;
  didJump = false;
  airCarry = false;
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
    p.soft = false;
    p.mesh.visible = true;
    p.mesh.position.set(x, y, z);
    p.v.set((Math.random() - 0.5) * 4, 1 + Math.random() * 3, -6 - Math.random() * 8);
    p.mesh.scale.setScalar(0.6 + Math.random() * 0.8);
  }
}

function poof(x, y, z) {
  let n = 0;
  for (const p of puffs) {
    if (p.life > 0) continue;
    const a = (n / 5) * Math.PI * 2;
    p.life = 0.75;
    p.soft = true;
    p.mesh.visible = true;
    p.mesh.position.set(x + Math.cos(a) * 0.45, y + 0.28, z + Math.sin(a) * 0.45);
    p.v.set(Math.cos(a) * 0.3, 0.85, Math.sin(a) * 0.3);
    p.mesh.scale.setScalar(0.75);
    n += 1;
    if (n >= 5) break;
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
  showToast(t("sneeze"));
  sneezeSound();
}

function startDance() {
  if (state === "win" || state === "finish") return;
  if (danceT <= 0) {
    danceYaw = kid.rotation.y;
    danceSound();
  }
  danceT = 2.6;
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
  pushT = 0;
  carry = false;
  player.shrinkT = 0;
  poof(checkpoint.x, checkpoint.y, checkpoint.z);
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
const MUSIC = {
  plaza: { bpm: 92, mel: [659, 0, 784, 0, 880, 784, 659, 0, 523, 0, 587, 0, 659, 0, 587, 0], bass: [131, 0, 0, 0, 147, 0, 0, 0, 175, 0, 0, 0, 147, 0, 0, 0] },
  cuesta: { bpm: 110, mel: [392, 0, 523, 0, 659, 523, 392, 0, 440, 0, 587, 0, 698, 587, 440, 0], bass: [98, 0, 98, 0, 110, 0, 110, 0, 131, 0, 131, 0, 110, 0, 98, 0] },
  puente: { bpm: 100, mel: [330, 0, 392, 0, 523, 392, 330, 0, 294, 0, 330, 0, 392, 0, 330, 0], bass: [82, 0, 0, 0, 98, 0, 0, 0, 73, 0, 0, 0, 98, 0, 0, 0] },
  nubes: { bpm: 84, mel: [784, 0, 0, 659, 0, 880, 784, 0, 698, 0, 0, 587, 0, 659, 0, 0], bass: [131, 0, 0, 0, 131, 0, 0, 0, 175, 0, 0, 0, 147, 0, 0, 0] },
  fiesta: { bpm: 128, mel: [523, 0, 659, 523, 784, 0, 659, 0, 880, 784, 659, 0, 784, 0, 659, 0], bass: [131, 0, 131, 0, 147, 0, 147, 0, 175, 0, 175, 0, 147, 0, 131, 0] },
  globo: { bpm: 118, mel: [587, 0, 659, 0, 784, 880, 0, 784, 659, 0, 587, 0, 523, 0, 659, 0], bass: [147, 0, 147, 0, 131, 0, 131, 0, 98, 0, 98, 0, 110, 0, 110, 0] },
};
const music = { key: null, timer: 0, step: 0, next: 0 };
let userGesture = false;

function musicNote(freq, when, dur, type, gain) {
  const ctx = actx;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, when);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(when);
  o.stop(when + dur + 0.02);
}

function musicTick() {
  const track = MUSIC[music.key];
  if (!track || !actx) return;
  const stepLen = 60 / track.bpm / 2;
  while (music.next < actx.currentTime + 0.25) {
    const i = music.step % track.mel.length;
    if (track.mel[i]) musicNote(track.mel[i], music.next, stepLen * 0.9, "triangle", 0.03);
    if (track.bass[i]) musicNote(track.bass[i], music.next, stepLen * 1.8, "sine", 0.05);
    music.next += stepLen;
    music.step += 1;
  }
}

function stopMusic() {
  clearInterval(music.timer);
  music.timer = 0;
  music.key = null;
}

function playMusic(key) {
  if (music.key === key) return;
  stopMusic();
  audio();
  if (!actx) return;
  music.key = key;
  music.step = 0;
  music.next = actx.currentTime + 0.05;
  music.timer = setInterval(musicTick, 60);
}

function wantedMusic() {
  if (state === "play" || state === "finish" || state === "win") return course.id;
  return "plaza";
}

function syncMusic() {
  if (muted) {
    if (music.key) stopMusic();
    return;
  }
  if (userGesture) playMusic(wantedMusic());
}

function danceSound() {
  tone(523, 0.12, "triangle", 0.07);
  tone(659, 0.12, "triangle", 0.07, 0.12);
  tone(784, 0.18, "triangle", 0.07, 0.24);
}

function padHit(p, box) {
  return box.minX < p.x + p.w / 2 && box.maxX > p.x - p.w / 2 && box.minZ < p.z + p.d / 2 && box.maxZ > p.z - p.d / 2 && box.minY < p.top + 1.25 && box.maxY > p.top;
}

function inStopZone(pos) {
  return pos.x > stopZone.minX && pos.x < stopZone.maxX && pos.z > stopZone.minZ && pos.z < stopZone.maxZ && Math.abs(pos.y - stopZone.top) < 0.35;
}

function step(dt, time) {
  tickMovers(dt, time || 0);
  if (state === "gate") return;
  const pressed = {
    left: keys.has("arrowleft") || keys.has("a") || touch.left,
    right: keys.has("arrowright") || keys.has("d") || touch.right,
    forward: keys.has("arrowup") || keys.has("w") || touch.forward,
    back: keys.has("arrowdown") || keys.has("s") || touch.back,
  };
  if (jumpEdge) {
    jumpBuffer = 0.14;
    jumpBufferTouch = jumpFromTouch;
    jumpEdge = false;
    jumpFromTouch = false;
  }

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
      const lane = course.lane || "normal";
      const freshStar = !!(course.lanes && paths[course.id] && !paths[course.id][lane]);
      if (freshStar) paths[course.id][lane] = true;
      const fresh = !badges[course.id];
      if (fresh) badges[course.id] = true;
      persist();
      showProgress();
      lastWin = { fresh, freshStar, lane };
      fillWin();
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
  if (state === "play") hitWheels();
  if (danceT > 0) {
    jumpBuffer = 0;
    jumpBufferTouch = false;
    airCarry = false;
  } else {
    if (pressed.left) player.vel.x -= RUN;
    if (pressed.right) player.vel.x += RUN;
    if (pressed.forward) player.vel.z -= RUN;
    if (pressed.back) player.vel.z += RUN;
    if (pressed.left !== pressed.right) lastMoveX = player.vel.x;
    if (pressed.forward !== pressed.back) lastMoveZ = player.vel.z;
    if ((pressed.forward || pressed.back) && !pressed.left && !pressed.right) lastMoveX = 0;
  }

  pushCool = Math.max(0, pushCool - dt);
  if (pushT > 0) {
    pushT -= dt;
    player.vel.x = pushV.x;
    player.vel.z = pushV.z;
  }

  if (player.onGround) {
    coyote = 0.12;
    airCarry = false;
  } else {
    coyote = Math.max(0, coyote - dt);
    if (airCarry && pushT <= 0) {
      player.vel.x = airX;
      player.vel.z = airZ;
    }
  }
  jumpBuffer = Math.max(0, jumpBuffer - dt);
  if (jumpBuffer > 0 && coyote > 0) {
    if (jumpBufferTouch && pushT <= 0) {
      const xHeld = pressed.left || pressed.right;
      const zHeld = pressed.forward || pressed.back;
      if (!xHeld && !zHeld) {
        player.vel.x = lastMoveX;
        player.vel.z = lastMoveZ;
      } else if (xHeld && !zHeld) {
        player.vel.z = lastMoveZ;
      } else if (zHeld && !xHeld) {
        player.vel.x = 0;
      }
      airX = player.vel.x;
      airZ = player.vel.z;
      airCarry = true;
    }
    player.vel.y = JUMP_V;
    player.onGround = false;
    coyote = 0;
    jumpBuffer = 0;
    jumpBufferTouch = false;
    didJump = true;
    squash = 0.45;
    jumpSound();
  } else if (jumpBuffer === 0) {
    jumpBufferTouch = false;
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

  if (danceT <= 0 && state !== "home" && player.onGround && player.floor && player.floor.belt) {
    const belt = player.floor;
    const inset = 1.25;
    if (player.pos.x > belt.minX + inset && player.pos.x < belt.maxX - inset) player.pos.x += belt.belt * dt;
  }

  if (state === "home") {
    if (player.pos.y < 1.2) {
      player.pos.set(SPAWN.x, SPAWN.y, SPAWN.z);
      player.vel.set(0, 0, 0);
      poof(SPAWN.x, SPAWN.y, SPAWN.z);
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
    danceT = 0;
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
  const dancing = danceT > 0 && state !== "finish" && state !== "win";
  const moving = !dancing && (Math.abs(player.vel.z) > 0.4 || Math.abs(player.vel.x) > 0.4);
  const swing = Math.sin(time * (moving ? 11 : 2)) * (moving ? 0.55 : 0.06);
  const parts = kid.userData.parts;
  if (dancing) {
    const wave = Math.sin(time * 10);
    parts.armL.rotation.set(-0.35, 0, -2.05);
    parts.armR.rotation.set(-0.2, 0, 1.7 + wave * 0.7);
    const kick = Math.sin(time * 8);
    parts.legL.rotation.x = kick * 0.7;
    parts.legR.rotation.x = -kick * 0.7;
  } else {
    parts.legL.rotation.x = swing;
    parts.legR.rotation.x = -swing;
    parts.armL.rotation.x = -swing * 0.8;
    parts.armR.rotation.x = swing * 0.8;
    parts.armL.rotation.y = 0;
    parts.armR.rotation.y = 0;
    parts.armL.rotation.z = 0;
    parts.armR.rotation.z = 0;
  }
  const yaw = Math.atan2(player.vel.x, player.vel.z || -0.001);
  if (moving) kid.rotation.y = yaw;
  else if (dancing && state !== "dress" && state !== "shop") kid.rotation.y = danceYaw + Math.sin(time * 5) * 0.28;
  squash = Math.max(0, squash - dt * 2.2);
  const s = player.scale;
  kid.scale.set(s * (1 + squash * 0.18), s * (1 - squash * 0.22), s * (1 + squash * 0.08));
  kid.position.copy(player.pos);
  if (dancing) kid.position.y += Math.abs(Math.sin(time * 8)) * 0.22;
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
  for (const flag of flags) {
    const on = flag.id === checkpoint.id;
    flag.group.visible = on;
    if (!on) continue;
    flag.clothMat.color.set(on ? 0xff4d3a : 0xd94a3c);
    flag.cloth.rotation.y = Math.sin(time * (on ? 7 : 2.2) + flag.cloth.position.x) * (on ? 0.4 : 0.12);
  }
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
    if (!p.soft) p.v.y -= 8 * dt;
    p.mesh.position.addScaledVector(p.v, dt);
    p.mesh.scale.multiplyScalar(p.soft ? 1 : 0.98);
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
  blob.visible = state !== "dress" && under != null;
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
  const trailColor = {
    hojas: 0x3aaa62,
    burbujas: 0x7ec8e3,
    corazones: 0xff7ab6,
    estrellas: 0xffd23f,
  };
  spark.mesh.material.color.set(trailColor[gear.trail] || 0xffd23f);
  spark.mesh.position.set(kid.position.x, kid.position.y + 0.32, kid.position.z + 0.28);
  spark.mesh.scale.setScalar(1);
}

function updateHint() {
  if (state !== "home" && state !== "play") {
    hintEl.hidden = true;
    return;
  }
  if (state === "home") {
    hintEl.hidden = false;
    hintEl.textContent = t("hint.walk");
    return;
  }
  const floor = player.floor;
  const text = floor && floor.belt
    ? t("hint.belt")
      : floor && floor.slide
      ? (floor.slide.label === "Mesa" ? t("hint.table") : t("hint.plank"))
      : floor && floor.blink && floor.warn
        ? t("hint.poof")
        : floor && floor.id === "start" && !didJump
          ? t(touchPadOn() ? "hint.tap" : "hint.jump")
          : "";
  hintEl.hidden = !text;
  hintEl.textContent = text;
}

function touchPadOn() {
  return window.matchMedia("(pointer: coarse), (max-width: 800px)").matches;
}

function look(dt) {
  shake *= Math.pow(0.04, dt);
  const dressing = state === "dress";
  const shopping = state === "shop";
  const atHome = state === "home" || state === "gate";
  const goal = dressing
    ? new THREE.Vector3(player.pos.x, player.pos.y + 1.05, player.pos.z + 3.35)
    : shopping
      ? new THREE.Vector3(player.pos.x - 5.8, player.pos.y + 1.2, player.pos.z + 7.4)
      : atHome
        ? new THREE.Vector3(player.pos.x, player.pos.y + 4.2 + shake, player.pos.z + 10.5)
        : new THREE.Vector3(player.pos.x * 0.45, player.pos.y + 3.3 + shake, player.pos.z + 8.2);
  const at = dressing
    ? new THREE.Vector3(player.pos.x, player.pos.y + 0.9, player.pos.z)
    : shopping
      ? new THREE.Vector3(player.pos.x - 1.2, player.pos.y - 1.85, player.pos.z)
      : atHome
        ? new THREE.Vector3(player.pos.x, player.pos.y + 1.4, player.pos.z - 4)
        : new THREE.Vector3(player.pos.x * 0.25, player.pos.y + 1.15, player.pos.z - 3);
  camera.position.lerp(goal, snapCam ? 1 : 1 - Math.pow(0.0008, dt));
  camera.lookAt(at);
  snapCam = false;
}

const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.033);
  const time = clock.elapsedTime;
  if (danceT > 0) danceT = Math.max(0, danceT - dt);
  danceBtn.classList.toggle("on", danceT > 0);
  const hideChrome = state === "win" || state === "finish" || state === "shop" || state === "dress" || state === "gate";
  danceBtn.hidden = hideChrome;
  muteBtn.hidden = hideChrome;
  if (state === "play" || state === "finish" || state === "home") {
    const sub = 2;
    for (let i = 0; i < sub; i++) step(dt / sub, time - dt + (dt / sub) * (i + 1));
  } else if (state === "dress" || state === "shop" || state === "gate") {
    player.vel.set(0, 0, 0);
  }
  pose(dt, time);
  syncMusic();
  updateHint();
  document.body.classList.toggle("playing", state === "play" || state === "win" || state === "finish" || state === "home");
  look(dt);
  if (state === "dress") {
    kid.rotation.y = dressTurn() + Math.sin(time * 0.55) * 0.12;
    kid.position.copy(player.pos);
    dressStudio.position.set(player.pos.x, player.pos.y, player.pos.z);
  } else if (state === "shop") {
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
  danceT = 0;
  setDressStudio(false);
  plazaRoot.visible = true;
  state = "home";
  snapCam = true;
  frameHomeCamera();
  homeEl.hidden = true;
  dresserEl.hidden = true;
  shopEl.hidden = true;
  gateEl.hidden = true;
  hud.hidden = false;
  blob.visible = true;
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

function startGame(id, lane) {
  audio();
  danceT = 0;
  setDressStudio(false);
  course = playableCourse(id, lane);
  buildCourse(course);
  homeEl.hidden = true;
  dresserEl.hidden = true;
  shopEl.hidden = true;
  gateEl.hidden = true;
  hud.hidden = false;
  resetBtn.hidden = false;
  casaBtn.hidden = false;
  snapCam = true;
  resetRun(false);
  state = "play";
}

let gateId = null;

function paintGateLanes(def) {
  gateLanes.textContent = "";
  if (!def.lanes) {
    gateLanes.hidden = true;
    gatePlayBtn.hidden = false;
    return;
  }
  gatePlayBtn.hidden = true;
  gateLanes.hidden = false;
  for (const lane of LANE_IDS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.lane = lane;
    const laneName = t(`lane.${lane}`);
    btn.textContent = laneName;
    if (paths[def.id]?.[lane]) {
      const star = document.createElement("span");
      star.className = "lane-star";
      star.textContent = "★";
      star.setAttribute("aria-hidden", "true");
      btn.append(star);
      btn.setAttribute("aria-label", t("lane.star", { name: laneName }));
    }
    btn.addEventListener("click", () => {
      btn.blur();
      const id = gateId;
      gateEl.hidden = true;
      startGame(id, lane);
    });
    gateLanes.append(btn);
  }
}

function openGate(id) {
  const def = COURSES.find((item) => item.id === id);
  gateId = id;
  state = "gate";
  jumpEdge = false;
  jumpFromTouch = false;
  jumpBufferTouch = false;
  player.vel.set(0, 0, 0);
  gateArt.className = `poster ${def.id}`;
  gateTitle.textContent = t(`world.${def.id}`);
  gateEl.style.setProperty("--tint", def.tint);
  gateEl.style.setProperty("--shade", def.shade);
  gateBadge.hidden = !badges[def.id];
  paintGateLanes(def);
  gateEl.hidden = false;
  hintEl.hidden = true;
}

function closeGate() {
  gateEl.hidden = true;
  boardEl.hidden = true;
  if (state === "gate") state = "home";
}

function fillBoard() {
  boardList.textContent = "";
  for (const id of BOARD_ORDER) {
    const got = !!badges[id];
    const li = document.createElement("li");
    li.className = got ? "got" : "";
    const st = document.createElement("span");
    st.className = "st";
    st.textContent = got ? "★" : "☆";
    const text = document.createElement("span");
    text.textContent = t(`world.${id}`);
    const note = document.createElement("small");
    note.textContent = got ? t("board.got") : t("board.need");
    text.append(note);
    li.append(st, text);
    boardList.append(li);
  }
}

function openBoardCard() {
  state = "gate";
  jumpEdge = false;
  jumpFromTouch = false;
  jumpBufferTouch = false;
  player.vel.set(0, 0, 0);
  fillBoard();
  boardEl.hidden = false;
  hintEl.hidden = true;
}

function openDress() {
  state = "dress";
  player.vel.set(0, 0, 0);
  danceT = 0;
  snapCam = true;
  setDressStudio(true);
  frameDressCamera();
  homeEl.hidden = true;
  shopEl.hidden = true;
  hud.hidden = true;
  dresserEl.hidden = false;
}

function openShop() {
  state = "shop";
  snapCam = true;
  setDressStudio(false);
  homeEl.hidden = true;
  dresserEl.hidden = true;
  hud.hidden = false;
  shopEl.hidden = false;
  shopNote.textContent = t("shop.today", { day: shopDayLabel() });
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
  name.dataset.i18n = `world.${item.id}`;
  name.textContent = t(`world.${item.id}`);
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
gatePlayBtn.addEventListener("click", () => {
  gatePlayBtn.blur();
  const id = gateId;
  gateEl.hidden = true;
  startGame(id);
});
gateBackBtn.addEventListener("click", () => {
  gateBackBtn.blur();
  closeGate();
});
boardBackBtn.addEventListener("click", () => {
  boardBackBtn.blur();
  closeGate();
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
  if (state === "home" || state === "dress" || state === "shop" || state === "gate") return;
  resetRun(false);
  state = "play";
});
danceBtn.addEventListener("click", () => {
  danceBtn.blur();
  startDance();
});
muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.classList.toggle("is-muted", muted);
  paintMute();
  if (!muted) audio();
});

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  keys.add(e.key.toLowerCase());
  if (e.key.toLowerCase() === "b") startDance();
  if (e.code === "Space" && state !== "gate") {
    jumpEdge = true;
    jumpFromTouch = false;
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
  if (e.code === "Space" && (state === "home" || state === "dress" || state === "shop")) e.preventDefault();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("pointerdown", () => {
  userGesture = true;
});
window.addEventListener("keydown", () => {
  userGesture = true;
});

const touchPointers = new Map();
const touchFingers = new Map();
function syncTouch() {
  touch.left = false;
  touch.right = false;
  touch.forward = false;
  touch.back = false;
  for (const name of touchPointers.values()) touch[name] = true;
  for (const names of touchFingers.values()) {
    for (const name of names) touch[name] = true;
  }
}
function holdsAt(x, y) {
  const slop = 12;
  const names = [];
  for (const btn of document.querySelectorAll("#touch [data-hold]")) {
    const r = btn.getBoundingClientRect();
    if (x >= r.left - slop && x <= r.right + slop && y >= r.top - slop && y <= r.bottom + slop) names.push(btn.dataset.hold);
  }
  return names;
}
document.querySelectorAll("#touch [data-hold]").forEach((btn) => {
  const name = btn.dataset.hold;
  const block = (e) => e.preventDefault();
  btn.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    touchPointers.set(e.pointerId, name);
    syncTouch();
    e.preventDefault();
  });
  btn.addEventListener("selectstart", block);
  btn.addEventListener("contextmenu", block);
  btn.addEventListener("dragstart", block);
});
window.addEventListener("pointerup", (e) => {
  if (e.pointerType === "touch" || !touchPointers.has(e.pointerId)) return;
  touchPointers.delete(e.pointerId);
  syncTouch();
});
window.addEventListener("pointercancel", (e) => {
  if (e.pointerType === "touch" || !touchPointers.has(e.pointerId)) return;
  touchPointers.delete(e.pointerId);
  syncTouch();
});
const jumpBtn = document.querySelector("#jump");
const blockJump = (e) => e.preventDefault();
const jumpedFingers = new Set();
function onPadTouch(e) {
  const pad = document.querySelector("#touch").getBoundingClientRect();
  const jr = jumpBtn.getBoundingClientRect();
  let onPad = false;
  for (const t of e.changedTouches) {
    if (t.clientX >= pad.left && t.clientX <= pad.right && t.clientY >= pad.top && t.clientY <= pad.bottom) onPad = true;
  }
  touchFingers.clear();
  for (const t of e.touches) {
    const names = holdsAt(t.clientX, t.clientY);
    if (names.length) touchFingers.set(t.identifier, names);
    const onJump = t.clientX >= jr.left && t.clientX <= jr.right && t.clientY >= jr.top && t.clientY <= jr.bottom;
    if (e.type === "touchstart" && onJump && !jumpedFingers.has(t.identifier)) {
      jumpedFingers.add(t.identifier);
      jumpEdge = true;
      jumpFromTouch = true;
    }
  }
  if (e.type === "touchend" || e.type === "touchcancel") {
    for (const t of e.changedTouches) jumpedFingers.delete(t.identifier);
  }
  syncTouch();
  if (onPad) e.preventDefault();
}
window.addEventListener("touchstart", onPadTouch, { capture: true, passive: false });
window.addEventListener("touchmove", onPadTouch, { capture: true, passive: false });
window.addEventListener("touchend", onPadTouch, { capture: true, passive: false });
window.addEventListener("touchcancel", onPadTouch, { capture: true, passive: false });
jumpBtn.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch") return;
  jumpEdge = true;
  jumpFromTouch = true;
  e.preventDefault();
});
jumpBtn.addEventListener("pointerup", () => jumpBtn.blur());
jumpBtn.addEventListener("pointercancel", () => jumpBtn.blur());
jumpBtn.addEventListener("selectstart", blockJump);
jumpBtn.addEventListener("contextmenu", blockJump);
jumpBtn.addEventListener("dragstart", blockJump);

window.addEventListener("resize", () => {
  camera.clearViewOffset();
  syncRendererToView();
  if (state === "dress") frameDressCamera();
  else if (state === "home" || state === "gate") frameHomeCamera();
});

const ROWS = [
  ["skin", "dress.skin", "#ffe8d6", ["#f6c7a8", "#e0ac8a", "#c68642", "#8d5524"]],
  ["shirt", "dress.shirt", "#ffe0ef", ["#ff6b4a", "#3d7ec9", "#3aaa62", "#7c5cbf", "#ffd23f"]],
  ["pants", "dress.pants", "#d9efff", ["#3e4c8a", "#2f6b4f", "#c45b58", "#2a211c", "#f4e1c1"]],
  ["shoes", "dress.shoes", "#fff3b0", ["#ffb703", "#fffdf8", "#3a2a22", "#7ec8e3", "#ff6b4a"]],
  ["hair", "dress.hair", "#efe2ff", ["#4a2c24", "#1a1a1a", "#e6b15a", "#e07090", "#7c5cbf"]],
  ["eyes", "dress.eyes", "#d9f5c9", ["#1aa894", "#3d7ec9", "#6b4a2a", "#7c5cbf"]],
];
const STYLES = [
  ["rizos", "dress.curls", "look-rizos"],
  ["corto", "dress.short", "look-corto"],
  ["gorra", "dress.cap", "look-gorra"],
];
const LOOKS = [
  ["face", "dress.face", "#fff3b0", [
    ["sonrisa", "dress.smile", "look-sonrisa"],
    ["abierta", "dress.open", "look-abierta"],
    ["lengua", "dress.tongue", "look-lengua"],
  ]],
  ["glasses", "dress.glasses", "#d9efff", [
    ["no", "dress.no", "look-no"],
    ["redondas", "dress.round", "look-gafas"],
    ["sol", "dress.sun", "look-gafas-sol"],
  ]],
  ["pack", "dress.pack", "#dff7fb", [
    ["no", "dress.no", "look-no"],
    ["mochila", "dress.yes", "look-mochila"],
  ]],
  ["shirtArt", "dress.art", "#ffe0ef", [
    ["lisa", "dress.plain", "look-lisa"],
    ["estrella", "dress.star", "look-estrella"],
    ["sol", "dress.sunart", "look-sol"],
    ["corazon", "dress.heart", "look-corazon"],
  ]],
];
const swatchRoot = document.querySelector("#swatches");

function markSwatches() {
  swatchRoot.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle("on", avatar[dot.dataset.key] === dot.dataset.value);
  });
  swatchRoot.querySelectorAll("[data-look]").forEach((btn) => {
    btn.classList.toggle("on", avatar[btn.dataset.look] === btn.dataset.value);
  });
}

function lookArt(kind) {
  const art = document.createElement("span");
  art.className = `look-art ${kind}`;
  art.setAttribute("aria-hidden", "true");
  return art;
}

function makeLookCard(key, value, label, artClass) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "look-card";
  btn.dataset.look = key;
  btn.dataset.value = value;
  const name = document.createElement("strong");
  name.dataset.i18n = label;
  name.textContent = t(label);
  btn.append(lookArt(artClass), name);
  btn.addEventListener("click", () => chooseLook(key, value));
  return btn;
}

function makeDressSection(title, tint, gridClass = "look-grid") {
  const row = document.createElement("div");
  row.className = "dress-block";
  row.style.setProperty("--slot", tint);
  const name = document.createElement("h3");
  name.dataset.i18n = title;
  name.textContent = t(title);
  const grid = document.createElement("div");
  grid.className = gridClass;
  row.append(name, grid);
  return { row, grid };
}

{
  const { row, grid } = makeDressSection("dress.hair", "#efe2ff");
  for (const [value, label, art] of STYLES) grid.append(makeLookCard("hairStyle", value, label, art));
  swatchRoot.append(row);
}
for (const [key, label, tint, options] of LOOKS) {
  const { row, grid } = makeDressSection(label, tint);
  for (const [value, text, art] of options) grid.append(makeLookCard(key, value, text, art));
  swatchRoot.append(row);
}
for (const [key, label, tint, colors] of ROWS) {
  const { row, grid } = makeDressSection(label, tint, "dots");
  for (const color of colors) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.style.background = color;
    dot.dataset.key = key;
    dot.dataset.value = color;
    dot.setAttribute("aria-label", `${label} ${color}`);
    dot.addEventListener("click", () => chooseLook(key, color));
    grid.append(dot);
  }
  swatchRoot.append(row);
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
  } else if (id === "seta") {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.18, 10),
      new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.7 })
    );
    stem.position.y = 0.06;
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 14, 10),
      new THREE.MeshStandardMaterial({ color: 0xff6b4a, roughness: 0.55 })
    );
    cap.scale.y = 0.55;
    cap.position.y = 0.2;
    const spot = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xfff6ea })
    );
    spot.position.set(0.08, 0.26, 0.1);
    g.add(stem, cap, spot);
  } else if (id === "lazo") {
    const mat = new THREE.MeshStandardMaterial({ color: 0xff7ab6, roughness: 0.45 });
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), mat);
    knot.position.y = 0.08;
    const left = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), mat);
    left.scale.set(1.2, 0.7, 0.35);
    left.position.set(-0.14, 0.1, 0);
    const right = left.clone();
    right.position.x = 0.14;
    g.add(knot, left, right);
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
  } else if (id === "estrellita") {
    const mat = new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0xffd23f, emissiveIntensity: 0.2, roughness: 0.4 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), mat);
    g.add(core);
    for (let i = 0; i < 5; i++) {
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 5), mat);
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      tip.position.set(Math.cos(a) * 0.16, Math.sin(a) * 0.16, 0);
      tip.rotation.z = a + Math.PI / 2;
      g.add(tip);
    }
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
  if (item.pay === "gems") return `💎 ${item.price}`;
  return `🪙 ${item.price}`;
}

function shopDayKey() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function shopDayLabel() {
  return new Date().toLocaleDateString(lang === "en" ? "en-US" : "es-ES", { day: "numeric", month: "short" });
}

function dayRand(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function dailyItems(slot) {
  const pool = CATALOG.filter((item) => item.slot === slot);
  const rand = dayRand(shopDayKey() + slot.length * 97 + slot.charCodeAt(0) * 13);
  const shuffled = pool.slice().sort(() => rand() - 0.5);
  const pick = shuffled.slice(0, DAILY_PICKS[slot] || 2);
  const mine = pool.filter((item) => (owned[slot] || []).includes(item.id));
  const seen = new Set();
  const list = [];
  for (const item of [...mine, ...pick]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    list.push(item);
  }
  return list;
}

function isWorn(item) {
  if (item.look) return Object.entries(item.look).every(([key, value]) => avatar[key] === value);
  return gear[item.slot] === item.id;
}

function shopArt(item) {
  const art = document.createElement("span");
  const kind = item.kind || item.id;
  art.className = `shop-art art-${kind}`;
  if (item.swatch) art.style.setProperty("--swatch", item.swatch);
  art.setAttribute("aria-hidden", "true");
  return art;
}

function renderShop() {
  catalogEl.replaceChildren();
  for (const slot of SHOP_SLOTS) {
    const items = dailyItems(slot);
    if (!items.length) continue;
    const row = document.createElement("div");
    row.className = "shop-row";
    row.style.setProperty("--slot", SLOT_TINT[slot]);
    const title = document.createElement("h3");
    title.textContent = t(`slot.${slot}`);
    const grid = document.createElement("div");
    grid.className = "shop-grid";
    for (const item of items) {
      if (!owned[item.slot]) owned[item.slot] = [];
      const has = owned[item.slot].includes(item.id);
      const worn = isWorn(item);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "shop-card";
      btn.classList.toggle("on", worn);
      btn.classList.toggle("owned", has);
      const name = document.createElement("strong");
      name.textContent = itemLabel(item);
      const tag = document.createElement("span");
      tag.className = "shop-tag";
      tag.textContent = worn ? t("shop.worn") : has ? t("shop.wear") : priceLabel(item);
      btn.append(shopArt(item), name, tag);
      btn.addEventListener("click", () => buyOrWear(item));
      grid.append(btn);
    }
    row.append(title, grid);
    catalogEl.append(row);
  }
}

function applyLookItem(item, on) {
  if (!item.look) return;
  if (on) avatar = { ...avatar, ...item.look };
  else {
    const next = { ...avatar };
    for (const key of Object.keys(item.look)) next[key] = DEFAULT_LOOK[key];
    avatar = next;
  }
  paintKid();
  markSwatches();
}

function buyOrWear(item) {
  if (!owned[item.slot]) owned[item.slot] = [];
  const has = owned[item.slot].includes(item.id);
  if (has) {
    if (item.look) {
      const on = !isWorn(item);
      applyLookItem(item, on);
      shopNote.textContent = on ? t("shop.on", { name: itemLabel(item) }) : t("shop.off", { name: itemLabel(item) });
    } else {
      gear[item.slot] = gear[item.slot] === item.id ? null : item.id;
      shopNote.textContent = gear[item.slot] ? t("shop.on", { name: itemLabel(item) }) : t("shop.off", { name: itemLabel(item) });
    }
  } else if (wallet[item.pay] < item.price) {
    shopNote.textContent = item.pay === "gems" ? t("shop.need.gems") : t("shop.need.coins");
    return;
  } else {
    wallet[item.pay] -= item.price;
    owned[item.slot].push(item.id);
    if (item.look) applyLookItem(item, true);
    else gear[item.slot] = item.id;
    shopNote.textContent = t("shop.got", { name: itemLabel(item) });
    showProgress();
    updateHud();
  }
  persist();
  applyGear();
  renderShop();
}

markSwatches();
applyGear();
showProgress();

if (location.protocol === "file:") {
  const fileNote = document.createElement("p");
  fileNote.dataset.i18n = "file";
  fileNote.textContent = t("file");
  homeEl.append(fileNote);
}

homeEl.hidden = true;
hud.hidden = false;
state = "home";
setDressStudio(false);
plazaRoot.visible = true;
player.pos.set(SPAWN.x, SPAWN.y, SPAWN.z);
player.vel.set(0, 0, 0);
kid.rotation.y = Math.PI;
kid.position.copy(player.pos);
achoo.position.copy(achooHome);
snapCam = true;
frameHomeCamera();
updateHud();

let lastWin = null;
const langSwitch = document.querySelector("#lang");

function fillWin() {
  if (!lastWin || !course) return;
  winTitle.textContent = t(`win.${course.id}`);
  const purse = t("purse", { coins: wallet.coins, gems: wallet.gems });
  winText.textContent = lastWin.fresh
    ? t("win.fresh", { purse })
    : lastWin.freshStar
      ? t("win.star", { lane: t(`lane.${lastWin.lane}`), purse })
      : purse;
}

function paintMute() {
  const label = muted ? t("sound.on") : t("sound.off");
  muteBtn.setAttribute("aria-label", label);
  muteBtn.title = label;
}

function paintLang() {
  langSwitch.setAttribute("aria-label", t("lang.group"));
  for (const btn of langSwitch.querySelectorAll("button")) {
    const on = btn.dataset.lang === lang;
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const text = t(el.dataset.i18nLabel);
    el.setAttribute("aria-label", text);
    if (el.hasAttribute("title")) el.title = text;
  });
  paintMute();
  paintLang();
  for (const mesh of signs) {
    if (mesh.parent) paintSign(mesh);
  }
  paintBoard();
  showProgress();
  if (gateId && !gateEl.hidden) {
    const def = COURSES.find((item) => item.id === gateId);
    gateTitle.textContent = t(`world.${def.id}`);
    paintGateLanes(def);
  }
  if (!boardEl.hidden) fillBoard();
  if (!shopEl.hidden) {
    shopNote.textContent = t("shop.today", { day: shopDayLabel() });
    renderShop();
  }
  if (!winCard.hidden) fillWin();
  swatchRoot.querySelectorAll(".dot").forEach((dot) => {
    const key = dot.closest(".dress-block")?.querySelector("h3")?.dataset.i18n;
    if (key) dot.setAttribute("aria-label", `${t(key)} ${dot.dataset.value}`);
  });
}

function setLang(next) {
  if (next !== "es" && next !== "en") return;
  lang = next;
  persist();
  applyLang();
}

langSwitch.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  btn.blur();
  setLang(btn.dataset.lang);
});

applyLang();
frame();
