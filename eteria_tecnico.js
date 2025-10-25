// ===============================
// ✦ Eteria — Motore Tecnico (RETERIAE / RETERIAS)
// Metodo Marika — Studio Abigail
// Blocchi: Oraria → Galassie → Salto Quantico → Oracoli (2+3+1 + 5×3)
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ====== CACHE MAZZO ORACOLI (caricato via fetch) ======
let ORACOLI_SCIAMANO = null;
async function caricaOracoliSciamano() {
  if (Array.isArray(ORACOLI_SCIAMANO) || Array.isArray(ORACOLI_SCIAMANO?.carte)) return ORACOLI_SCIAMANO;
  try {
    const res = await fetch('./mazzi/oracoli_sciamano.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    ORACOLI_SCIAMANO = data;
    console.log('✅ Oracoli dello Sciamano caricati');
    return ORACOLI_SCIAMANO;
  } catch (err) {
    console.error('❌ Errore caricando oracoli_sciamano.json:', err);
    ORACOLI_SCIAMANO = null;
    return null;
  }
}

// ====== PARSING COMANDO ======
function parseTipo(text = '') {
  const t = String(text).replace(/\./g, '').toUpperCase();
  if (/\bRETERIAE\b/.test(t)) return 'RETERIAE';
  if (/\bRETERIAS\b/.test(t)) return 'RETERIAS';
  return null;
}

// ====== FUNZIONE PRINCIPALE ======
export async function eseguiEteria(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando Eteria non riconosciuto. Usa: RETERIAE o RETERIAS.' };

  const avvio = applicaComandiOperativi('Eteria');
  const oraria = safe(() => calcolaOraria(data, ora, luogo));
  const legge  = safe(() => applicaLeggeUniversale({ modulo: 'Eteria', data, ora, luogo, oraria }));
  if (oraria?.errore) return { output: `❌ Errore oraria: ${oraria.errore}` };

  const gal = calcolaGalassieEteria(oraria);
  const salto = calcolaSaltoQuantico({ oraria, gal });

  await caricaOracoliSciamano();
  const deck = Array.isArray(ORACOLI_SCIAMANO)
    ? ORACOLI_SCIAMANO
    : (Array.isArray(ORACOLI_SCIAMANO?.carte) ? ORACOLI_SCIAMANO.carte : []);

  const rng = makeRNG(seedFrom({ data, ora, luogo, tipo, key: gal?.prevalente }));
  const stesa = estraiOracoli(deck, rng);

  const out = (tipo === 'RETERIAE')
    ? formatEsteso({ data, ora, luogo, avvio, oraria, legge, gal, salto, stesa })
    : formatSintetico({ data, ora, luogo, oraria, gal, salto, stesa });

  return { output: out };
}

// ====== GALASSIE ======
const GALASSIE = ['Andromeda', 'Sirio', 'Taurus', 'Michelaus (M41)'];
const STELLE_PER_GALASSIA = {
  'Andromeda': { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
  'Sirio':     { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
  'Taurus':    { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
  'Michelaus (M41)': { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] }
};

function calcolaGalassieEteria(oraria) {
  const asp = aspettoDaOraria(oraria);
  const prevalente = (oraria?.stato === 'giorno') ? 'Sirio' : 'Andromeda';

  const stelle = {};
  for (const g of GALASSIE) {
    const lista = STELLE_PER_GALASSIA[g]?.[asp];
    stelle[g] = Array.isArray(lista) ? lista : [];
  }

  return {
    prevalente,
    aspetto: asp,
    stelle,
    nota: 'Le stelle appartengono alla loro Galassia; la figura nasce da Sole/pianeti nella proiezione oraria.'
  };
}

function aspettoDaOraria(oraria) {
  if (!oraria || !oraria.finestre) return 'TRIGONO';
  const f = oraria.finestre;
  if (f.mattino)    return 'TRIGONO';
  if (f.pomeriggio) return 'SESTILE';
  if (f.sera)       return 'QUADRATO';
  return 'OPPOSIZIONE';
}

// ====== SALTO QUANTICO ======
function calcolaSaltoQuantico({ oraria, gal }) {
  const base = (oraria?.stato === 'giorno') ? 'apertura' : 'profondità';
  const rng  = makeRNG(seedFrom({ key: 'SALTO', asp: gal?.aspetto, g: gal?.prevalente }));

  const PORTE    = ['Nodo del Paradosso', 'Croce delle Quattro Direzioni', 'Sigillo Cosmico', 'Velo di Sirio', 'Specchio di Venere'];
  const VETTORI  = ['Fascio di Luce', 'Gradiente Onirico', 'Rotazione di Centaurus', 'Arco di Michelaus', 'Corrente Andromediana'];
  const DIRETTIVE= ['Ascolto', 'Rivelazione', 'Ricomposizione', 'Svincolo', 'Riallineamento'];

  const piano = (label) => ({
    piano: label,
    stato: base,
    porta:    PORTE[Math.floor(rng()*PORTE.length)],
    vettore:  VETTORI[Math.floor(rng()*VETTORI.length)],
    direttiva:DIRETTIVE[Math.floor(rng()*DIRETTIVE.length)],
  });

  return {
    passato:  piano('Passato'),
    presente: piano('Presente'),
    futuro:   piano('Futuro')
  };
}

// ====== ORACOLI ======
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

// ======

// ===============================
// Funzione di sicurezza (safe wrapper)
// ===============================
function safe(fn) {
  try {
    return fn && fn();
  } catch (err) {
    console.warn('⚠️ Errore in funzione protetta:', err);
    return null;
  }
}
