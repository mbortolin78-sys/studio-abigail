// ===============================
// ✨ Velaria Tecnico — Metodo Marika
// ===============================
//
// Modulo tecnico per RVE (Velaria Estesa) e RVS (Velaria Sintetica)
//
// Differenze principali rispetto ad Auroria:
// • Velaria utilizza Oracoli dello Sciamano e Tarocchi delle Stelle
// • Le estrazioni avvengono in terne da 3 carte (5 terne = 15 carte)
// • Include sempre l’applicazione della Legge Universale e del Comando Operativo
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';

// ====== INIEZIONE MAZZI ======
let ORACOLI_SCIAMANO = null;
let TAROCCHI_STELLE = null;

export function setOracoliSciamano(data) { ORACOLI_SCIAMANO = data; }
export function setTarocchiStelle(data) { TAROCCHI_STELLE = data; }

// ====== ENTRY POINT ======
export function eseguiVelaria(data, ora, luogo, comando) {
  // 1️⃣ Comandi Operativi di base
  const operativi = applicaComandiOperativi('Velaria');

  // 2️⃣ Calcolo dell’Oraria classica
  const oraria = calcolaOrariaClassica(new Date(data + ' ' + ora), 'Europe/Rome', luogo);

  // 3️⃣ Applicazione della Legge Universale
  const legge = applicaLeggeUniversale({ modulo: 'Velaria', data, ora, luogo });

  // 4️⃣ Calcolo Galassiale (placeholder tecnico, aggiornabile da Velaria.docx)
  const galassiale = calcolaGalassialeVelaria({ oraria });

  // 5️⃣ Inizializzazione mazzi
  const oracoli = Array.isArray(ORACOLI_SCIAMANO?.carte) ? ORACOLI_SCIAMANO.carte : [];
  const tarocchi = Array.isArray(TAROCCHI_STELLE?.carte) ? TAROCCHI_STELLE.carte : [];

  // 6️⃣ RNG deterministico (nessuna casualità reale)
  const rng = makeRNG(seedFrom({ data, ora, luogo, comando, oraria }));

  // 7️⃣ Estratti tecnici
  const estrazione = {
    oracoli: {
      due: drawUnique(oracoli, 2, rng),
      tre: drawUnique(oracoli, 3, rng),
      uno: drawUnique(oracoli, 1, rng),
    },
    tarocchi: {
      terne: creaTerneUniche(tarocchi, 5, rng),
    }
  };

  // 8️⃣ Output tecnico
  const output = [
    `⚙️ RISULTATO TECNICO — VELARIA (${comando})`,
    `📅 ${data}  ⏰ ${ora}  📍 ${luogo}`,
    ``,
    `🔭 ORARIA CLASSICA: ${oraria.stato} — ${oraria.oraLocale}`,
    `🌌 GALASSIALE: prevalente ${galassiale.prevalente} → keyword ${galassiale.keyword}`,
    `📜 LEGGE UNIVERSALE: ${legge ? 'Applicata' : 'Non disponibile'}`,
    ``,
    `🜂 STESA ORACOLI (2 + 3 + 1 carte):`,
    `• ${listNomi(estrazione.oracoli.due)}`,
    `• ${listNomi(estrazione.oracoli.tre)}`,
    `• ${listNomi(estrazione.oracoli.uno)}`,
    ``,
    `🜄 STESA TAROCCHI (5 terne da 3 carte):`,
    estrazione.tarocchi.terne.map(t => `• [${listNomi(t)}]`).join('\n'),
    ``,
    `✅ Comandi operativi:`,
    `• ${operativi.join('\n• ')}`
  ].join('\n');

  return { output, estrazione, galassiale, legge };
}

// ===============================
// Calcoli tecnici interni
// ===============================

function calcolaOrariaClassica(now, tz, luogo) {
  const ora = now.getHours();
  const isGiorno = ora >= 6 && ora < 21;
  return {
    stato: isGiorno ? 'giorno' : 'notte',
    oraLocale: now.toLocaleTimeString('it-IT', { timeZone: tz, hour: '2-digit', minute: '2-digit' }),
    luogo
  };
}

function calcolaGalassialeVelaria({ oraria }) {
  const prevalente = oraria.stato === 'giorno' ? 'Sirio' : 'Andromeda';
  const keyword = oraria.stato === 'giorno' ? 'AURUM' : 'SOMNIUM';
  return { prevalente, keyword };
}

// ===============================
// Estrazione carte
// ===============================
function drawUnique(deck = [], n = 1, rng = Math.random) {
  const indices = new Set();
  while (indices.size < Math.min(n, deck.length)) {
    indices.add(Math.floor(rng() * deck.length));
  }
  return Array.from(indices).map(i => deck[i]);
}

function creaTerneUniche(deck, numeroTerne, rng) {
  const carte = drawUnique(deck, numeroTerne * 3, rng);
  const terne = [];
  for (let i = 0; i < carte.length; i += 3) {
    terne.push(carte.slice(i, i + 3));
  }
  return terne;
}

// ===============================
// RNG deterministico
// ===============================
function seedFrom({ data, ora, luogo, comando, oraria }) {
  const base = `${data}|${ora}|${luogo?.lat}|${luogo?.lon}|${comando}|${oraria?.stato}`;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < base.length; i++) {
    h ^= base.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRNG(seed) {
  let t = seed >>> 0;
  return function() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// ===============================
// Helpers di formattazione
// ===============================
function listNomi(arr = []) {
  return arr.map(c => c?.nome || '(s.n.)').join(' | ');
}

export default { eseguiVelaria, setOracoliSciamano, setTarocchiStelle };
