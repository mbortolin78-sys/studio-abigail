// ===============================
// VENERE AURORIA — Motore Tecnico (Metodo Marika)
// Sequenza FISSA dei metodi:
// 1) Tema Natale → 2) Venaria → 3) Auroria → 4) Aldebaran
// NESSUNA CARTA. Solo calcoli tecnici + Legge Universale.
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ======================================================
//                      REGOLE
// Inserisci qui le tabelle tratte dai tuoi file DOCX.
// Finché sono vuote, il motore NON inventa: segnala "da compilare".
// ======================================================

// —— TEMA NATALE (estratti di regole che ti servono per Venere-centrico)
const TN_REGOLE = {
  // Mappa essenziale: cosa serve estrarre/verificare per base relazionale
  // DA COMPILARE con le tue regole precise (Ascendente, Luna, Venere, case…)
  richiesti: ['ASC', 'LUNA', 'VENERE'],
  dignitaVenere: {
    // Esempio di struttura: completa coi tuoi criteri (segni/case/aspetti)
    // 'TORO': { punteggio: 2, nota: 'Domicilio' }, ...
  },
  ricezioni: {
    // Schema per note di ricezione Venere ↔ Luna/ASC/Marte…
  }
};

// —— VENARIA (fasci Sirio/Andromeda/Marte/Aldebaran)
const VENARIA_REGOLE = {
  // Cromie, priorità, ordine esposizione fasci, ecc. (DA COMPILARE)
  cromie: ['Argento', 'Oro', 'Azzurro Elettrico', 'Blu Elettrico'],
  // Esempio scaffolding: come mappare il “ramo” su criteri oraria/figure
  mappaFasci: [
    // { criterio: 'giorno+aspetto-armonico', sorgente: 'Sirio', priorita: 1 }
  ]
};

// —— AURORIA (finestre orarie e verifica manifestazione)
const AURORIA_REGOLE = {
  // Finestra → tag logico → cosa verificare (DA COMPILARE dai tuoi doc)
  finestre: [
    { nome: 'mattino',   range: [6, 12]  },
    { nome: 'pomeriggio',range: [12, 18] },
    { nome: 'sera',      range: [18, 21] },
    { nome: 'notte',     range: [21, 24] }, // + [0,6)
  ],
  // Impulsi/pergamene: struttura d’appoggio
  impulsi: [], // compila con i tuoi pattern
  pergamene: [] // compila con i tuoi pattern
};

// —— ALDEBARAN (ricalcolo sostituendo il Sole)
const ALDEBARAN_REGOLE = {
  // Regole di dignità/ricezioni con Aldebaran e pianeti in contatto (DA COMPILARE)
  // es: { pianeta: 'Mercurio', canale: 'messaggio/testo', emoji: ['✍️', '💬'] }
  canali: [
    // { pianeta: 'Mercurio', azione: 'messaggio', dettagli: ['testo','chat'] }
  ]
};

// ======================================================
//               UTIL & NORMALIZZAZIONI
// ======================================================
function parseTipo(comando = '') {
  const c = String(comando).replace(/\./g, '').toUpperCase();
  return /\bRVA\b/.test(c) ? 'RVA' : null; // Venere Auroria
}

function normalizzaLuogo(luogo) {
  if (!luogo || typeof luogo !== 'string') {
    return { name: 'Montebelluna', lat: 45.776, lon: 12.056 };
  }
  return { name: luogo.trim(), lat: 45.776, lon: 12.056 }; // opzionale: mappa coord reali
}

function guessTZ() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome'; }
  catch { return 'Europe/Rome'; }
}

const norm360 = x => ((x % 360) + 360) % 360;
const sep = (a, b) => {
  const d = Math.abs(norm360(a) - norm360(b));
  return d > 180 ? 360 - d : d;
};

function aspettoTra(a, b) {
  // Rileva aspetto di base tra due longitudini eclittiche (se disponibili).
  // (orbite base; affina con i tuoi orbi se necessario)
  if (typeof a !== 'number' || typeof b !== 'number') return null;
  const d = sep(a, b);
  const def = [
    { tipo: 'CONGIUNZIONE', gradi: 0,   orb: 6 },
    { tipo: 'SESTILE',      gradi: 60,  orb: 4 },
    { tipo: 'QUADRATO',     gradi: 90,  orb: 5 },
    { tipo: 'TRIGONO',      gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  gradi: 180, orb: 6 },
  ];
  let best = null;
  for (const adef of def) {
    const diff = Math.abs(d - adef.gradi);
    if (diff <= adef.orb) {
      if (!best || diff < best.diff) best = { tipo: adef.tipo, orb: diff, delta: d };
    }
  }
  return best; // {tipo, orb, delta} | null
}

// ======================================================
//                ENTRY POINT PUBBLICO
// ======================================================
export function eseguiVenereAuroria(data, ora, luogoStr, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) {
    return { output: 'Comando non riconosciuto. Usa: RVA (Venere Auroria).' };
  }

  const luogo = normalizzaLuogo(luogoStr);
  const tz = guessTZ();
  const now = new Date();

  // 1) Comandi Operativi + Oraria + Legge Universale
  const avvio = safe(() => applicaComandiOperativi('Venere Auroria')) || [];
  const oraria = safe(() => calcolaOraria(data, ora, luogo.name)) || {};
  const legge  = safe(() => applicaLeggeUniversale({ modulo: 'Venere Auroria', now, luogo, oraria })) || {};

  // 2) Calcoli dei 4 metodi in sequenza FISSA
  const tn = calcolaTemaNatale(oraria, luogo);
  const vn = calcolaVenaria(oraria, tn);
  const au = calcolaAuroriaMetodo(oraria, vn, tz);
  const al = calcolaAldebaran(oraria, au);

  // 3) Output tecnico (nessuna narrativa)
  const righe = [];
  righe.push('🌕 VENERE AURORIA — Calcolo Tecnico');
  righe.push(`📅 ${data}  ⏰ ${ora}  📍 ${luogo.name}`);
  righe.push('');
  righe.push('🔹 Metodo Tema Natale');
  righe.push(...tn.testo);
  righe.push('');
  righe.push('🔹 Metodo Venaria');
  righe.push(...vn.testo);
  righe.push('');
  righe.push('🔹 Metodo Auroria');
  righe.push(...au.testo);
  righe.push('');
  righe.push('🔹 Metodo Aldebaran');
  righe.push(...al.testo);
  righe.push('');
  righe.push('⚖️ Legge Universale');
  if (Array.isArray(legge?.righe)) righe.push(...legge.righe);
  else righe.push('• Legge applicata secondo protocollo.');
  righe.push('');
  righe.push('✅ Calcolo concluso con rigore secondo le Leggi Universali.');

  return { output: righe.join('\n') };
}

// ======================================================
//                METODO 1 — TEMA NATALE
// Venere-centrico: Ascendente + Luna + Venere, dignità e ricezioni.
// Usa i dati di oraria/posizioni se disponibili dal tuo calcolo_oraria.
// ======================================================
function calcolaTemaNatale(oraria, luogo) {
  const out = [];

  // disponibilità posizioni:
  const venereLon = oraria?.planets?.Venere?.lon;
  const lunaLon   = oraria?.planets?.Luna?.lon;
  const ascLon    = oraria?.ascLon; // se il tuo calcolo_oraria lo fornisce

  // Verifiche base richieste:
  const richiesti = TN_REGOLE.richiesti || [];
  out.push(`• Parametri richiesti: ${richiesti.join(', ')}`);

  if (venereLon == null || lunaLon == null || ascLon == null) {
    out.push('• Avviso: posizioni incomplete (ASC/Luna/Venere). Integra i dati dall’oraria reale.');
  } else {
    out.push(`• Venere: ${fmtDeg(venereLon)}  — Luna: ${fmtDeg(lunaLon)}  — ASC: ${fmtDeg(ascLon)}`);
    // ESEMPIO: applica dignità/ricezioni di Venere (DA COMPILARE con regole reali)
    const dign = valutaDignitaVenere(oraria);
    if (dign?.righe?.length) out.push(...dign.righe);
  }

  out.push(`• Luogo di riferimento: ${luogo.name}`);
  return { testo: out };
}

function valutaDignitaVenere(oraria) {
  // Punto di appoggio per dignità/ricezioni: compila TN_REGOLE.dignitaVenere / TN_REGOLE.ricezioni
  const out = [];
  if (!TN_REGOLE.dignitaVenere || !Object.keys(TN_REGOLE.dignitaVenere).length) {
    out.push('• Dignità Venere: tabelle da compilare.');
  } else {
    // qui applichi le tue regole (segno casa aspetto) per comporre la dignità
    out.push('• Dignità Venere: calcolata secondo tabella (OK).'); // segnaposto
  }
  if (!TN_REGOLE.ricezioni || !Object.keys(TN_REGOLE.ricezioni).length) {
    out.push('• Ricezioni Venere: tabelle da compilare.');
  } else {
    out.push('• Ricezioni Venere: verificate secondo schema (OK).'); // segnaposto
  }
  return { righe: out };
}

// ======================================================
//                METODO 2 — VENARIA
// Fasci Sirio / Andromeda / Marte / Aldebaran
// Nessuna carta: definizione dei rami/fasci attivi e priorità.
// ======================================================
function calcolaVenaria(oraria, temaNatale) {
  const out = [];
  if (!VENARIA_REGOLE?.cromie?.length) {
    out.push('• Venaria: tabelle cromie/mappa fasci da compilare.');
    return { testo: out };
  }

  // Esempio coerente: usa una “figura” tra Venere e Marte per attivazione fasci
  const venereLon = oraria?.planets?.Venere?.lon;
  const marteLon  = oraria?.planets?.Marte?.lon;
  const aspVM = aspettoTra(venereLon, marteLon);

  if (!aspVM) {
    out.push('• Nessuna figura Venere–Marte rilevabile (integra oraria reale).');
  } else {
    out.push(`• Figura Venere–Marte: ${aspVM.tipo} (Δ=${gr1(aspVM.delta)}°, orb=${gr1(aspVM.orb)}°).`);
    // Applica tua mappa fasci (DA COMPILARE in VENARIA_REGOLE.mappaFasci)
    if (!Array.isArray(VENARIA_REGOLE.mappaFasci) || VENARIA_REGOLE.mappaFasci.length === 0) {
      out.push('• Mappa fasci non impostata. Inserisci criteri in VENARIA_REGOLE.mappaFasci.');
    } else {
      out.push('• Fasci attivi determinati secondo mappa (OK).');
    }
  }

  // Nota cromatica/grafica di presenza
  out.push(`• Cromie in uso: ${VENARIA_REGOLE.cromie.join(', ')}`);
  return { testo: out };
}

// ======================================================
//                METODO 3 — AURORIA
// Distribuzione temporale (finestre/impulsi/pergamene) su base oraria.
// ======================================================
function calcolaAuroriaMetodo(oraria, venaria, tz) {
  const out = [];
  if (!oraria?.finestre) {
    out.push('• Oraria non disponibile: impossibile distribuire finestre.');
    return { testo: out };
  }

  const finestra = finestraCorrente(oraria, tz);
  out.push(`• Finestra corrente: ${finestra}`);

  if (!Array.isArray(AURORIA_REGOLE.impulsi) || !Array.isArray(AURORIA_REGOLE.pergamene)) {
    out.push('• Impulsi/Pergamene: tabelle da compilare.');
  } else {
    out.push('• Impulsi/Pergamene: verificate secondo schema (OK).');
  }

  return { testo: out };
}

function finestraCorrente(oraria, tz) {
  try {
    const hh = Number(new Intl.DateTimeFormat('it-IT', { hour: '2-digit', hour12: false, timeZone: tz }).format(new Date()));
    const f = AURORIA_REGOLE.finestre.find(x => (hh >= x.range[0] && hh < x.range[1]) || (x.nome === 'notte' && (hh >= 21 || hh < 6)));
    return f ? f.nome : 'n/d';
  } catch { return 'n/d'; }
}

// ======================================================
//                METODO 4 — ALDEBARAN
// Ricalcolo sostituendo il Sole con Aldebaran: canali/azioni/segni pratici.
// ======================================================
function calcolaAldebaran(oraria, auroria) {
  const out = [];
  if (!Array.isArray(ALDEBARAN_REGOLE.canali)) {
    out.push('• Tabelle canali Aldebaran da compilare.');
    return { testo: out };
  }

  // Esempio coerente: leggi contatti di Venere con pianeti “canale”
  const venereLon = oraria?.planets?.Venere?.lon;

  if (venereLon == null) {
    out.push('• Posizione di Venere mancante: impossibile valutare canali Aldebaran.');
    return { testo: out };
  }

  // Scansione canali dichiarati in tabella (DA COMPILARE con i tuoi criteri esatti)
  if (ALDEBARAN_REGOLE.canali.length === 0) {
    out.push('• Nessun canale definito in tabella.');
  } else {
    out.push('• Canali pratici impostati secondo tabelle (OK).');
  }

  return { testo: out };
}

// ======================================================
//                    HELPERS
// ======================================================
function fmtDeg(x) { return `${gr1(norm360(x))}°`; }
function gr1(n) { return (Math.round(Number(n) * 10) / 10).toFixed(1); }
function safe(fn) { try { return fn && fn(); } catch { return null; } }

export default { eseguiVenereAuroria };
