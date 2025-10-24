// ===============================
// ♀️ Venere Classica — Motore Tecnico (RVC)
// Metodo Marika — Studio Abigail
// ===============================
//
// Flusso tecnico:
// 1) Comandi Operativi
// 2) Oraria reale (astronomy-engine)
// 3) Proiezione galattica VENERE-centrica (Venere in aspetto ai pianeti)
// 4) Stesa Tarocchi delle Stelle: 2 + 3 + 1 + 5 terne da 3 (tutte diverse)
// 5) Output SOLO tecnico (nessuna narrativa)

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
// Se vuoi applicarla qui, lasciala; altrimenti puoi commentarla senza rompere nulla
import { applicaLeggeUniversale } from './leggeUniversale.js';

// Mazzo unico per RVC
import TAROCCHI_STELLE from './mazzi/tarocchi_stelle.json';

// ====== ENTRY POINT ======
export function eseguiVenereClassica(data, ora, luogo, comando) {
  // accetta RVC con o senza punti, maiuscole/minuscole
  const tipo = parseTipo(comando);
  if (!tipo) return { output: `Comando non riconosciuto. Usa: RVC` };

  // 1) Comandi Operativi (log tecnico)
  const operativi = applicaComandiOperativi('Venere Classica');

  // 2) Oraria reale (posizioni; serve Venere + pianeti)
  const oraria = calcolaOraria(data, ora, luogo);
  if (!oraria || oraria.errore) {
    return { output: `❌ Errore oraria: ${oraria?.errore || 'calcolo non disponibile'}` };
  }

  // 3) Proiezione galattica (Venere-centrica)
  const gal = proiezioneGalatticaVenere(oraria, TABELLE_RVC);

  // 3.b (facoltativa) Legge Universale
  const legge = applicaLeggeUniversale?.({
    modulo: 'Venere Classica',
    data, ora, luogo, oraria
  });

  // 4) Stesa Tarocchi (2 + 3 + 1 + 5×3)
  const rng = makeRNG(seedFrom({ data, ora, luogo, tipo, key: gal?.galassia }));
  const deck = Array.isArray(TAROCCHI_STELLE?.carte) ? TAROCCHI_STELLE.carte : [];
  const stesa = estraiTarocchi(deck, rng);

  // 5) Output tecnico, stesso stile di Auroria
  const righe = [
    `✨ Metodo VENERE CLASSICA attivo (${tipo})`,
    `📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale)`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate (Venere e pianeti).',
    ``,
    `🌌 PROIEZIONE GALATTICA (centrata su Venere)`,
    gal.testo,
    ``,
    `🜄 STESA TAROCCHI DELLE STELLE`,
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti',
    ``,
    `🃏 Estrazioni`,
    `• 2 carte: ${listNomi(stesa.due)}`,
    `• 3 carte: ${listNomi(stesa.tre)}`,
    `• 1 carta: ${listNomi(stesa.uno)}`,
    `• Terne (5×3): ${stesa.terne.map(trio => '[' + listNomi(trio) + ']').join(' ')}`,
    ``,
    `✅ Comandi operativi`,
    `• ${operativi.join('\n• ')}`,
    // (facoltativo) ``, `📜 Legge Universale`, legge?.testo || '—',
  ];

  return { output: righe.join('\n'), _meta: { oraria, gal, stesa, legge } };
}

// ===============================
// Proiezione galattica VENERE-centrica
// ===============================
const TABELLE_RVC = {
  GALASSIE: ['Andromeda', 'Sirio', 'Taurus', 'Michelaus (M41)'],

  // Completa per il tuo metodo (nomi ufficiali). Non inventiamo nulla: se mancano, avvisiamo.
  STELLE_PER_GALASSIA: {
    'Andromeda': { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Sirio':     { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Taurus':    { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Michelaus (M41)': { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
  }
};

function proiezioneGalatticaVenere(oraria, T) {
  // requisiti minimi
  const ven = oraria?.planets?.Venere?.lon;
  if (typeof ven !== 'number' || !oraria?.planets) {
    return { testo: '❌ Oraria incompleta: serve longitudine di Venere e dei pianeti.' };
  }

  // aspetti come in Auroria (tolleranze in gradi)
  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0,   orb: 6 },
    { tipo: 'SESTILE',      gradi: 60,  orb: 4 },
    { tipo: 'QUADRATO',     gradi: 90,  orb: 5 },
    { tipo: 'TRIGONO',      gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  gradi: 180, orb: 6 },
  ];

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const separazione = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
  };
  const aspettoVenere = (delta) => {
    let best = null;
    for (const a of ASPETTI) {
      const diff = Math.abs(delta - a.gradi);
      if (diff <= a.orb) {
        if (!best || diff < best.diff) best = { tipo: a.tipo, diff };
      }
    }
    return best;
  };

  // figure Venere–pianeta
  const figure = [];
  for (const [pianeta, val] of Object.entries(oraria.planets)) {
    if (pianeta === 'Venere') continue;
    if (typeof val?.lon !== 'number') continue;
    const delta = separazione(ven, val.lon);
    const asp = aspettoVenere(delta);
    if (asp) figure.push({ pianeta, aspetto: asp.tipo, orb: asp.diff });
  }

  // se non c’è una figura attiva, non inventiamo
  const tabelleOK = !!T?.GALASSIE?.length && !!T?.STELLE_PER_GALASSIA && Object.keys(T.STELLE_PER_GALASSIA).length;
  if (figure.length === 0) {
    if (!tabelleOK) {
      return {
        testo: [
          '• Nessuna figura attiva Venere–pianeta.',
          '• Tabelle galassie/stelle non impostate → compila TABELLE_RVC.',
        ].join('\n')
      };
    }
    return {
      testo: [
        '• Nessuna figura attiva Venere–pianeta.',
        '• (Definisci eventuale “galassia di quiete” per RVC nelle tue tabelle.)'
      ].join('\n')
    };
  }

  // figura dominante (orb minima)
  figure.sort((a, b) => a.orb - b.orb);
  const dom = figure[0];

  // mappatura semplice: giorno→Sirio, notte→Andromeda (puoi sostituire con la tua regola RVC)
  const galassia = (oraria.stato === 'giorno') ? 'Sirio' : 'Andromeda';

  // scelta stella
  const elenco = T.STELLE_PER_GALASSIA?.[galassia]?.[dom.aspetto] || [];
  const stella = Array.isArray(elenco) && elenco.length ? elenco[0] : '— (inserisci elenco stelle per galassia/aspetto)';

  return {
    galassia,
    aspetto: dom.aspetto,
    pianeta_figura: dom.pianeta,
    testo: [
      `• Figura dominante: Venere in ${dom.aspetto} a ${dom.pianeta}.`,
      `• Proiezione: ${galassia}.`,
      `• Venere illumina: ${stella}.`,
      '• Regola RVC: le stelle appartengono alla galassia; i pianeti forniscono la figura.',
    ].join('\n')
  };
}

// ===============================
// Estrazione TAROCCHI — 2 + 3 + 1 + (5×3)
// ===============================
function estraiTarocchi(deck = [], rng = Math.random) {
  const avvisi = [];
  if (!Array.isArray(deck) || deck.length < 30) {
    avvisi.push('Tarocchi delle Stelle non caricati o insufficienti.');
  }
  const due = drawUnique(deck, 2, rng);
  const tre = drawUnique(exclude(deck, due), 3, rng);
  const uno = drawUnique(exclude(deck, [...due, ...tre]), 1, rng);
  const terne = creaTerneUniche(exclude(deck, [...due, ...tre, ...uno]), 5, rng);

  return { struttura: '2 + 3 + 1 + 5 terne da 3', due, tre, uno, terne, avvisi };
}

// ===============================
// UTILS carte + RNG
// ===============================
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
  for (let i = 0; i < selezione.length; i += 3) out.push(selezione.slice(i, i + 3));
  return out;
}

function seedFrom({ data, ora, luogo, tipo, key }) {
  const base = [
    'RVC',
    String(data || ''),
    String(ora || ''),
    typeof luogo === 'string' ? luogo : (luogo?.name || ''),
    String(luogo?.lat ?? ''),
    String(luogo?.lon ?? ''),
    String(tipo || ''),
    String(key || '')
  ].join('|');
  let h = 2166136261 >>> 0;
  for (let i = 0; i < base.length; i++) { h ^= base.charCodeAt(i); h = Math.imul(h, 16777619); }
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
function listNomi(arr = []) { return (arr || []).map(c => c?.nome || c?.id || '(s.n.)').join(' | '); }

// ====== PARSING comando ======
function parseTipo(cmd = '') {
  const c = String(cmd || '').replace(/\./g, '').toUpperCase();
  return /\bRVC\b/.test(c) ? 'RVC' : null;
}

export default { eseguiVenereClassica };
