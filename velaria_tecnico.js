// velaria_tecnico.js
// Motore tecnico per i comandi: RVE (Velaria Estesa), RVS (Velaria Sintetica)
// Struttura conforme ai file Auroria, con adattamento alle logiche di Velaria.
// Differenza principale: stesa con terne da tre carte ciascuna (5 terne = 15 carte).

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { validaComandoBase } from './comandiOperativi.js';

let ORACOLI_SCIAMANO = null;
let TAROCCHI_STELLE = null;

// ====== INIEZIONE MAZZI ======
export function setOracoliSciamano(data) { ORACOLI_SCIAMANO = data; }
export function setTarocchiStelle(data) { TAROCCHI_STELLE = data; }

// ====== ENTRY POINT ======
export function processVelaria(inputText, runtime = {}) {
  try {
    const parsed = parseCommand(inputText);
    if (!parsed || !parsed.tipo || !['RVE', 'RVS'].includes(parsed.tipo)) {
      return asOutput(`Comando non riconosciuto per Velaria. Usa: RVE o RVS.`, { ok: false, code: 'CMD' });
    }

    const now = runtime.now instanceof Date ? runtime.now : new Date();
    const location = coalesceLocation(runtime.location);
    const tz = runtime.timezone || guessTZ();

    const validBase = safeCall(() => validaComandoBase({ modulo: 'Velaria', tipo: parsed.tipo, now, location, tz }));
    if (validBase && validBase.error) {
      return asOutput(`Errore: ${validBase.error}`, { ok: false, code: 'VAL' });
    }

    const oraria = calcolaOrariaClassica(now, tz, location);
    const legge = safeCall(() => applicaLeggeUniversale({ modulo: 'Velaria', now, location, oraria }));
    const galassiale = calcolaGalassialeVelaria({ now, location, oraria, legge, seedExtra: runtime.seedExtra });

    const rng = makeRNG(seedFrom({ now, location, tipo: parsed.tipo, galassia: galassiale?.keyword, extra: runtime.seedExtra }));

    const oracoliDisponibili = Array.isArray(ORACOLI_SCIAMANO?.carte) ? ORACOLI_SCIAMANO.carte : [];
    const tarocchiDisponibili = Array.isArray(TAROCCHI_STELLE?.carte) ? TAROCCHI_STELLE.carte : [];

    const warningMazzi = [];
    if (oracoliDisponibili.length < 10) warningMazzi.push('Oracoli dello Sciamano non caricati o insufficienti.');
    if (tarocchiDisponibili.length < 25) warningMazzi.push('Tarocchi delle Stelle non caricati o insufficienti.');

    // ====== ESTRAZIONI ======
    const estrazione = {
      oracoli: {
        dueCarte: drawUnique(oracoliDisponibili, 2, rng),
        treCarte: drawUnique(oracoliDisponibili, 3, rng),
        unaCarta: drawUnique(oracoliDisponibili, 1, rng),
      },
      tarocchi: {
        terne: creaTerneUniche(tarocchiDisponibili, 5, rng) // 5 terne da 3 carte ciascuna
      }
    };

    const tecnico = {
      modulo: 'Velaria',
      tipo: parsed.tipo,
      timestamp: toISOZ(now),
      timezone: tz,
      luogo: location,
      oraria,
      leggeUniversale: legge || {},
      galassiale,
      estrazione,
      avvisi: warningMazzi
    };

    const output = (parsed.tipo === 'RVE')
      ? formatOutputEsteso(tecnico)
      : formatOutputSintetico(tecnico);

    return asOutput(output, { ok: true, tecnico });

  } catch (err) {
    return asOutput(`Errore Velaria: ${err?.message || String(err)}`, { ok: false, code: 'EXC' });
  }
}

// ====== PARSING ======
function parseCommand(text = '') {
  const raw = String(text || '').trim();
  const cleaned = raw.replace(/\./g, '').toUpperCase();
  if (/\bRVE\b/.test(cleaned)) return { tipo: 'RVE' };
  if (/\bRVS\b/.test(cleaned)) return { tipo: 'RVS' };
  return null;
}

// ====== LUOGO & TEMPO ======
function coalesceLocation(loc) {
  return {
    lat: (loc && typeof loc.lat === 'number') ? loc.lat : 45.776,
    lon: (loc && typeof loc.lon === 'number') ? loc.lon : 12.056,
    name: (loc && loc.name) || 'Montebelluna'
  };
}
function guessTZ() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome'; }
  catch { return 'Europe/Rome'; }
}
function toISOZ(d) {
  try { return new Date(d).toISOString(); } catch { return new Date().toISOString(); }
}

// ====== ORARIA CLASSICA ======
function calcolaOrariaClassica(now, tz, location) {
  const h = Number(new Intl.DateTimeFormat('it-IT', { hour: '2-digit', hour12: false, timeZone: tz }).format(now));
  const isGiorno = (h >= 6 && h < 21);
  const finestre = {
    mattino: (h >= 6 && h < 12),
    pomeriggio: (h >= 12 && h < 18),
    sera: (h >= 18 && h < 21),
    notte: (h >= 21 || h < 6)
  };
  return {
    stato: isGiorno ? 'giorno' : 'notte',
    oraLocale: new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(now),
    finestre
  };
}

// ====== GALASSIALE VELARIA ======
function calcolaGalassialeVelaria(ctx) {
  const { now, location, oraria, legge, seedExtra } = ctx;
  const rng = makeRNG(seedFrom({ now, location, oraria: oraria.stato, extra: seedExtra }));

  const sorgenti = ['Sirio', 'Andromeda'];
  const prevalente = (oraria.stato === 'giorno')
    ? (rng() < 0.6 ? 'Sirio' : 'Andromeda')
    : (rng() < 0.6 ? 'Andromeda' : 'Sirio');

  const keywordsGiornoSirio = ['ORDO', 'LUX', 'RATIO', 'AURUM'];
  const keywordsGiornoAndr = ['PASSAGE', 'MATRIX', 'HARMONIA', 'NOVA'];
  const keywordsNotteSirio = ['SACRUM', 'PURGANS', 'ASCENSUS', 'FOCUS'];
  const keywordsNotteAndr = ['VELUM', 'ONIRICA', 'MEMORIA', 'SOMNIUM'];

  let pool;
  if (oraria.stato === 'giorno' && prevalente === 'Sirio') pool = keywordsGiornoSirio;
  if (oraria.stato === 'giorno' && prevalente === 'Andromeda') pool = keywordsGiornoAndr;
  if (oraria.stato === 'notte' && prevalente === 'Sirio') pool = keywordsNotteSirio;
  if (oraria.stato === 'notte' && prevalente === 'Andromeda') pool = keywordsNotteAndr;

  const keyword = pool ? pool[Math.floor(rng() * pool.length)] : 'PENDENS';

  return {
    sorgenti,
    prevalente,
    keyword,
    note: 'Placeholder tecnico finché non incolliamo le regole esatte da Velaria.docx.'
  };
}

// ====== ESTRAZIONI ======
function drawUnique(deck = [], n = 1, rng = Math.random) {
  if (!Array.isArray(deck) || deck.length === 0 || n <= 0) return [];
  const indices = new Set();
  const max = Math.min(n, deck.length);
  while (indices.size < max) {
    indices.add(Math.floor(rng() * deck.length));
  }
  return Array.from(indices).map(i => deck[i]);
}

// --- nuova funzione: TERNE UNICHE ---
function creaTerneUniche(deck, numeroTerne, rng) {
  const carte = drawUnique(deck, numeroTerne * 3, rng);
  const terne = [];
  for (let i = 0; i < carte.length; i += 3) {
    terne.push(carte.slice(i, i + 3));
  }
  return terne;
}

// ====== RNG DETERMINISTICO ======
function seedFrom({ now, location, tipo, galassia, oraria, extra } = {}) {
  const t = (now instanceof Date) ? now.getTime() : Date.now();
  const s = [
    'VELARIA',
    String(t),
    String(location?.lat ?? ''),
    String(location?.lon ?? ''),
    String(location?.name ?? ''),
    String(tipo ?? ''),
    String(galassia ?? ''),
    String(oraria ?? ''),
    String(extra ?? '')
  ].join('|');
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
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

// ====== FORMATTER ======
function formatOutputEsteso(t) {
  const warn = t.avvisi?.length ? `\n[AVVISI] ${t.avvisi.join(' | ')}` : '';
  return [
    `VELARIA — Estesa (RVE)`,
    `Oraria: ${t.oraria.stato} — ora locale ${t.oraria.oraLocale} (${t.timezone})`,
    `Galassiale: prevalente ${t.galassiale.prevalente} → keyword ${t.galassiale.keyword}`,
    `Legge Universale: ${compactLegge(t.leggeUniversale)}`,
    `Luogo: ${t.luogo.name} (${t.luogo.lat}, ${t.luogo.lon})`,
    `— Estratti Oracoli (2): ${listNomi(t.estrazione.oracoli.dueCarte)}`,
    `— Estratti Oracoli (3): ${listNomi(t.estrazione.oracoli.treCarte)}`,
    `— Estratto Oracoli (1): ${listNomi(t.estrazione.oracoli.unaCarta)}`,
    `— Terne Tarocchi (5x3): ${t.estrazione.tarocchi.terne.map(trio => '[' + listNomi(trio) + ']').join(' ')}`,
    warn
  ].join('\n');
}

function formatOutputSintetico(t) {
  const warn = t.avvisi?.length ? `\n[AVVISI] ${t.avvisi.join(' | ')}` : '';
  return [
    `VELARIA — Sintetica (RVS)`,
    `Oraria: ${t.oraria.stato} — ${t.oraria.oraLocale} (${t.timezone})`,
    `Galassiale: ${t.galassiale.prevalente} → ${t.galassiale.keyword}`,
    `Legge Universale: ${compactLegge(t.leggeUniversale)}`,
    `Luogo: ${t.luogo.name}`,
    `Carte: Oracoli [2+3+1], Tarocchi [5 terne da 3 carte]`,
    warn
  ].join('\n');
}

function listNomi(arr = []) {
  return arr.map(c => c?.nome || '(s.n.)').join(' | ');
}
function compactLegge(legge = {}) {
  if (!legge || typeof legge !== 'object') return 'n/d';
  const keys = Object.keys(legge);
  if (!keys.length) return 'n/d';
  return keys.map(k => `${k}:${fmtVal(legge[k])}`).join(', ');
}
function fmtVal(v) {
  if (v == null) return 'n';
  if (typeof v === 'boolean') return v ? '1' : '0';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return v.length > 12 ? v.slice(0, 12) + '…' : v;
  if (Array.isArray(v)) return `[${v.length}]`;
  return '{…}';
}

// ====== OUTPUT WRAPPER ======
function asOutput(text, meta) {
  const res = { output: text };
  if (meta) res._meta = meta;
  return res;
}
function safeCall(fn) {
  try { return fn && fn(); } catch (_e) { return null; }
}

export default { processVelaria };
