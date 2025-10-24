// eteria_tecnico.js
// Motore tecnico per i comandi: RETERIAE (Estesa) / RETERIAS (Sintetica)
// Blocchi: Oraria → Galassie → Salto Quantico → Oracoli (2+3+1 + 5 terne)
// Allineato a auroria_tecnico.js / echo_tecnico.js / velaria_tecnico.js

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ======= IMPORT MAZZO ORACOLI =======
import ORACOLI_SCIAMANO from './mazzi/oracoli_sciamano.json';

// ====== ENTRY POINT ======
export function eseguiEteria(data, ora, luogo, comando) {
  try {
    const tipo = parseTipo(comando);
    if (!tipo) return wrap(`Comando Eteria non riconosciuto. Usa: RETERIAE o RETERIAS.`);

    // 1) Base temporale e luogo
    const now = makeDateFrom(data, ora);
    const location = normalizzaLuogo(luogo);
    const tz = guessTZ();

    // 2) Avvii operativi + Legge Universale
    const avvio = applicaComandiOperativi('Eteria');
    const oraria = safe(() => calcolaOraria(data, ora, location.name));
    const legge = safe(() => applicaLeggeUniversale({ modulo: 'Eteria', now, location, oraria }));

    // 3) Galassie (proiezione sistema solare dentro Andromeda/Sirio/Taurus/Michelaus)
    const galassie = calcolaGalassieEteria({ now, location, oraria, legge });

    // 4) Salto Quantico (Passato / Presente / Futuro)
    const salto = calcolaSaltoQuantico({ now, location, oraria, galassie });

    // 5) Stesa Oracoli (2 + 3 + 1 + 5 terne)
    const rng = makeRNG(seedFrom({ now, location, tipo, key: galassie?.prevalente }));
    const oracoliDeck = Array.isArray(ORACOLI_SCIAMANO?.carte) ? ORACOLI_SCIAMANO.carte : [];
    const stesa = estraiOracoli(oracoliDeck, rng);

    const tecnico = {
      modulo: 'Eteria',
      tipo,
      data,
      ora,
      luogo: location,
      timezone: tz,
      avvio,
      oraria,
      leggeUniversale: legge,
      galassie,
      saltoQuantico: salto,
      oracoli: stesa,
    };

    const out = (tipo === 'RETERIAE')
      ? formatEsteso(tecnico)
      : formatSintetico(tecnico);

    return wrap(out, tecnico);

  } catch (err) {
    return wrap(`❌ Errore Eteria: ${err?.message || String(err)}`);
  }
}

// ====== PARSING ======
function parseTipo(cmd = '') {
  const c = String(cmd).replace(/\./g, '').toUpperCase();
  if (/\bRETERIAE\b/.test(c)) return 'RETERIAE';
  if (/\bRETERIAS\b/.test(c)) return 'RETERIAS';
  return null;
}

// ====== DATA/ORA/LUOGO ======
function makeDateFrom(dataStr, oraStr) {
  // Se hai già lo split "gg/mm/aaaa" e "hh:mm", puoi assemblare qui. Altrimenti usa l'ora locale.
  const now = new Date();
  try {
    if (dataStr && oraStr) {
      const [g, m, a] = dataStr.split('/').map(n => Number(n));
      const [hh, mm] = oraStr.split(':').map(n => Number(n));
      return new Date(a, (m - 1), g, hh, mm, 0);
    }
    return now;
  } catch { return now; }
}
function normalizzaLuogo(l) {
  if (!l || typeof l !== 'string') {
    return { name: 'Montebelluna', lat: 45.776, lon: 12.056 };
  }
  const name = l.trim();
  // opzionale: mappa nomi→coord se servono
  return { name, lat: 45.776, lon: 12.056 };
}
function guessTZ() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome'; }
  catch { return 'Europe/Rome'; }
}

// ====== GALASSIE (STRUTTURA ETERIA) ======
// Qui incolla le tavole complete da Eteria.docx (stelle organizzate per galassia e aspetto)
const GALASSIE = ['Andromeda', 'Sirio', 'Taurus', 'Michelaus (M41)'];

// Esempio struttura da completare con i tuoi dati (TODO: riempi ogni lista con le stelle corrette)
const STELLE_PER_GALASSIA = {
  'Andromeda': {
    TRIGONO:   [/* … */],
    SESTILE:   [/* … */],
    QUADRATO:  [/* … */],
    OPPOSIZIONE:[/* … */]
  },
  'Sirio': {
    TRIGONO:   [/* … */],
    SESTILE:   [/* … */],
    QUADRATO:  [/* … */],
    OPPOSIZIONE:[/* … */]
  },
  'Taurus': {
    TRIGONO:   [/* … */],
    SESTILE:   [/* … */],
    QUADRATO:  [/* … */],
    OPPOSIZIONE:[/* … */]
  },
  'Michelaus (M41)': {
    TRIGONO:   [/* … */],
    SESTILE:   [/* … */],
    QUADRATO:  [/* … */],
    OPPOSIZIONE:[/* … */]
  },
};

// mapping dell’aspetto in base allo “tono” orario (semplificazione compatibile col tuo schema)
function aspettoDaOraria(oraria) {
  if (!oraria || !oraria.finestre) return 'TRIGONO';
  const f = oraria.finestre;
  if (f.mattino)   return 'TRIGONO';
  if (f.pomeriggio)return 'SESTILE';
  if (f.sera)      return 'QUADRATO';
  return 'OPPOSIZIONE'; // notte
}

function calcolaGalassieEteria({ now, location, oraria }) {
  const asp = aspettoDaOraria(oraria);
  // prevalenza giorno/notte: Sirio di giorno, Andromeda di notte; Taurus/Michelaus a supporto
  const prevalente = (oraria?.stato === 'giorno') ? 'Sirio' : 'Andromeda';

  // prendi un set coerente di stelle per ciascuna galassia, in base all’aspetto
  const stelle = {};
  GALASSIE.forEach(g => { stelle[g] = (STELLE_PER_GALASSIA[g]?.[asp]) || []; });

  return {
    prevalente,
    aspetto: asp,
    stelle,          // oggetto: { Galassia: [stelle…], … }
    nota: 'Le stelle appartengono alla Galassia (non ai pianeti). Proiezione coerente con oraria.'
  };
}

// ====== SALTO QUANTICO ======
// Tre piani: Passato / Presente / Futuro. Ogni piano restituisce porte, vettori, direttive.
function calcolaSaltoQuantico({ now, location, oraria, galassie }) {
  const rng = makeRNG(seedFrom({ now, location, key: 'SALTO', asp: galassie?.aspetto }));
  const base = (oraria?.stato === 'giorno') ? 'apertura' : 'profondità';

  function piano(label) {
    // qui puoi sostituire con le tue tavole/dizionari precisi da Eteria.docx
    const PORTE   = ['Nodo del Paradosso', 'Croce delle 4 Direzioni', 'Sigillo Cosmico', 'Velo di Sirio', 'Specchio di Venere'];
    const VETTORI = ['Fascio di Luce', 'Gradiente Onirico', 'Rotazione di Centaurus', 'Arco di Michelaus', 'Corrente Andromediana'];
    const DIRETTIVE = ['Ascolto', 'Rivelazione', 'Ricomposizione', 'Svincolo', 'Riallineamento'];

    return {
      piano: label,
      stato: base,
      porta: PORTE[Math.floor(rng()*PORTE.length)],
      vettore: VETTORI[Math.floor(rng()*VETTORI.length)],
      direttiva: DIRETTIVE[Math.floor(rng()*DIRETTIVE.length)],
    };
  }

  return {
    passato:  piano('Passato'),
    presente: piano('Presente'),
    futuro:   piano('Futuro')
  };
}

// ====== STESA ORACOLI ======
function estraiOracoli(deck = [], rng = Math.random) {
  const avvisi = [];
  if (!Array.isArray(deck) || deck.length < 30) {
    avvisi.push('Oracoli dello Sciamano non caricati o insufficienti.');
  }
  const due = drawUnique(deck, 2, rng);
  const tre = drawUnique(exclude(deck, due), 3, rng);
  const uno = drawUnique(exclude(deck, [...due, ...tre]), 1, rng);
  const terne = creaTerneUniche(exclude(deck, [...due, ...tre, ...uno]), 5, rng);

  return {
    struttura: '2 + 3 + 1 + 5 terne (3 carte) — tutte differenti',
    due, tre, uno, terne, avvisi
  };
}

// ====== UTILS CARTE ======
function drawUnique(deck = [], n = 1, rng = Math.random) {
  if (!Array.isArray(deck) || deck.length === 0 || n <= 0) return [];
  const taken = new Set();
  const max = Math.min(n, deck.length);
  while (taken.size < max) taken.add(Math.floor(rng() * deck.length));
  return [...taken].map(i => deck[i]);
}
function exclude(deck = [], cards = []) {
  const ids = new Set(cards.map(c => c?.id ?? c?.nome ?? JSON.stringify(c)));
  return deck.filter(c => !ids.has(c?.id ?? c?.nome ?? JSON.stringify(c)));
}
function creaTerneUniche(deck = [], numeroTerne = 5, rng = Math.random) {
  const tot = numeroTerne * 3;
  const selezione = drawUnique(deck, tot, rng);
  const out = [];
  for (let i = 0; i < selezione.length; i += 3) out.push(selezione.slice(i, i+3));
  return out;
}

// ====== RNG DETERMINISTICO ======
function seedFrom({ now, location, tipo, key, asp } = {}) {
  const t = (now instanceof Date) ? now.getTime() : Date.now();
  const s = [
    'ETERIA',
    String(t),
    String(location?.name ?? ''),
    String(location?.lat ?? ''),
    String(location?.lon ?? ''),
    String(tipo ?? ''),
    String(key ?? ''),
    String(asp ?? '')
  ].join('|');
  let h = 2166136261 >>> 0;
  for (let i=0; i<s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function makeRNG(seed) {
  let t = seed >>> 0;
  return function() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t>>>15), 1|t);
    r ^= r + Math.imul(r ^ (r>>>7), 61|r);
    return ((r ^ (r>>>14)) >>> 0) / 4294967296;
  };
}

// ====== FORMATTERS ======
function formatEsteso(t) {
  const avOr = t.oracoli?.avvisi?.length ? `\n[AVVISI] ${t.oracoli.avvisi.join(' | ')}` : '';
  const gal = t.galassie ?? {};
  const terneStr = (t.oracoli?.terne || [])
    .map(trio => '[' + trio.map(c => c?.nome || c?.id || '(s.n.)').join(' | ') + ']')
    .join(' ');

  return [
    `ETERIA — Estesa (RETERIAE)`,
    `Luogo: ${t.luogo.name} (${t.luogo.lat}, ${t.luogo.lon}) — TZ ${t.timezone}`,
    `Oraria: ${t.oraria?.stato ?? 'n/d'} — ${t.oraria?.oraLocale ?? ''}`,
    `Galassie: prevalente ${gal.prevalente ?? 'n/d'} — aspetto ${gal.aspetto ?? 'n/d'}`,
    `- Andromeda: ${safeList(gal.stelle?.['Andromeda'])}`,
    `- Sirio: ${safeList(gal.stelle?.['Sirio'])}`,
    `- Taurus: ${safeList(gal.stelle?.['Taurus'])}`,
    `- Michelaus (M41): ${safeList(gal.stelle?.['Michelaus (M41)'])}`,
    `Salto Quantico:`,
    `  • Passato → porta ${t.saltoQuantico.passato.porta}, vettore ${t.saltoQuantico.passato.vettore}, direttiva ${t.saltoQuantico.passato.direttiva}`,
    `  • Presente → porta ${t.saltoQuantico.presente.porta}, vettore ${t.saltoQuantico.presente.vettore}, direttiva ${t.saltoQuantico.presente.direttiva}`,
    `  • Futuro → porta ${t.saltoQuantico.futuro.porta}, vettore ${t.saltoQuantico.futuro.vettore}, direttiva ${t.saltoQuantico.futuro.direttiva}`,
    `Oracoli: 2 = ${listNomi(t.oracoli?.due)} | 3 = ${listNomi(t.oracoli?.tre)} | 1 = ${listNomi(t.oracoli?.uno)}`,
    `Terne (5×3): ${terneStr}`,
    avOr
  ].join('\n');
}
function formatSintetico(t) {
  const gal = t.galassie ?? {};
  return [
    `ETERIA — Sintetica (RETERIAS)`,
    `Oraria: ${t.oraria?.stato ?? 'n/d'} — ${t.oraria?.oraLocale ?? ''} (${t.timezone})`,
    `Galassia: ${gal.prevalente ?? 'n/d'} — aspetto ${gal.aspetto ?? 'n/d'}`,
    `Salto: Passato/Presente/Futuro impostati`,
    `Oracoli: 2 + 3 + 1 + 5 terne (3) — tutte differenti`
  ].join('\n');
}
function listNomi(arr = []) { return (arr||[]).map(c => c?.nome || c?.id || '(s.n.)').join(' | '); }
function safeList(arr) { return Array.isArray(arr) && arr.length ? arr.join(' • ') : '—'; }

// ====== SAFE WRAPPERS ======
function wrap(output, meta) { return meta ? { output, _meta: meta } : { output }; }
function safe(fn) { try { return fn && fn(); } catch { return null; } }

export default { eseguiEteria };
