// ===============================
// 🌙 Auroria Tecnico — Metodo Marika (calcolo tecnico)
// ===============================
//
// Flusso tecnico:
// 1) Avvio Comandi Operativi (sempre)
// 2) Calcolo Oraria astrale reale (astronomy-engine)
// 3) Proiezione galattica secondo le REGOLE di Auroria (Sole → figura con pianeti)
// 4) Stesura: schema Sibille (2 + 3 + 1 + 5 terne da 3) — solo struttura
// 5) Output SOLO tecnico (nessuna narrativa)
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
// Se usi anche la Legge Universale come passo tecnico, lascia questa riga.
// In caso contrario puoi commentarla senza rompere nulla.
// import { applicaLeggeUniversale } from './leggeUniversale.js';

// ====== TABELLE — riempi con i NOMI UFFICIALI di Auroria ======
const TABELLE_AURORIA = {
  CATEGORIE: {
    MENTALI:    new Set(['Mercurio', 'Urano']),
    EMOZIONALI: new Set(['Luna', 'Venere', 'Nettuno']),
    MATERIALI:  new Set(['Marte', 'Saturno', 'Plutone']),
  },

  GALASSIE: [
    'Andromeda',
    'Sirio',
    'Taurus',
    'Michelaus (M41)',
  ],

  STELLE_PER_GALASSIA: {
    'Andromeda': {
      TRIGONO:     ['Rivelazione', 'Ascensione', 'Soglia dell’Ovest'],
      SESTILE:     ['Armonia', 'Intelletto', 'Dialogo di Luce'],
      QUADRATO:    ['Conflitto Sacro', 'Materia Oscura'],
      OPPOSIZIONE: ['Nascosta', 'Confessione', 'Rottura di Ciclo'],
    },
    'Sirio': {
      TRIGONO:     ['Dialogo', 'Visione', 'Guida'],
      SESTILE:     ['Sincronia', 'Ponte di Cielo'],
      QUADRATO:    ['Scissione', 'Riflesso'],
      OPPOSIZIONE: ['Chiusura', 'Velo di Sirio'],
    },
    // Compila anche per 'Taurus' e 'Michelaus (M41)'
  },

  // Facoltativo: preferenze di scelta stella per tipo di aspetto
  PREFERENZE_STELLE: {
    // 'TRIGONO':     [/Rivelazione|Intelletto|Costruzione/i],
    // 'SESTILE':     [/Dialogo|Chiarezza/i],
    // 'QUADRATO':    [/Coraggio|Materia/i],
    // 'OPPOSIZIONE': [/Cose Nascoste|Silenzio|Attesa/i],
  },
};
// ===============================================================


// ===============================
// API principale chiamata da ai.js
// ===============================
export function eseguiAuroria(data, ora, luogo, comando) {
  // 1️⃣ Calcolo oraria reale
  const oraria = calcolaOraria(data, ora, luogo);

  // 2️⃣ Proiezione galattica
  const gal = proiezioneGalatticaAuroria(oraria, TABELLE_AURORIA);

  // 3️⃣ Schema Sibille (solo struttura)
  const schemaSibille = strutturaSibille();

  // 4️⃣ (Facoltativo) Legge Universale
  // const legge = applicaLeggeUniversale?.({
  //   modulo: 'Auroria', data, ora, luogo, oraria,
  // });

  const righe = [
    `✨ Metodo AURORIA attivo (${comando})`,
    `📅 ${data} → 🕰 ${ora} → 📍 ${luogo}`,
    ``,
    `🌞 ORARIA (reale)`,
    oraria?.testo?.trim() || '⚠️ Posizioni astronomiche non calcolate (Sole e pianeti).',
    ``,
    `🌌 PROIEZIONE GALATTICA`,
    gal?.testo?.trim() || '⚠️ Dati galattici non disponibili.',
    ``,
    `🔮 STESA SIBILLE (schema)`,
    schemaSibille?.trim() || '⚠️ Schema Sibille non definito.',
    ``,
    `⚙️ Comandi Operativi`,
    logOperativi?.join('\n') || '⚠️ Nessun comando operativo disponibile.',
    // (facoltativo) `⚖️ Legge Universale`, legge?.testo || '—',
  ];

  const outputFinale = righe.filter(Boolean).join('\n');

  if (!outputFinale.trim()) {
    console.warn('⚠️ Nessun contenuto generato da AURORIA.');
    return { output: '⚠️ Calcolo non completato — controlla i moduli Oraria o Galattica.' };
  }

  return { output: outputFinale };
}

// ===============================
// Proiezione galattica — AURORIA
// ===============================
function proiezioneGalatticaAuroria(oraria, T) {
  // requisiti minimi
  if (!oraria || typeof oraria.sunLon !== 'number' || !oraria.planets) {
    return { testo: '❌ Oraria incompleta: servono longitudini di Sole e pianeti.' };
  }

  // presenza tabelle
  const tabelleOK =
    Array.isArray(T.GALASSIE) && T.GALASSIE.length > 0 &&
    T.STELLE_PER_GALASSIA && Object.keys(T.STELLE_PER_GALASSIA).length > 0;

  // aspetti usati in Auroria
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

  const trovaAspettoSole = (delta) => {
    let best = null;
    for (const a of ASPETTI) {
      const diff = Math.abs(delta - a.gradi);
      if (diff <= a.orb) {
        if (!best || diff < best.diff) best = { tipo: a.tipo, diff };
      }
    }
    return best;
  };

  // figure Sole–pianeta
  const sun = oraria.sunLon;
  const figure = [];
  for (const [pianeta, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = separazione(sun, val.lon);
    const asp = trovaAspettoSole(delta);
    if (asp) figure.push({ pianeta, aspetto: asp.tipo, orb: asp.diff });
  }

  if (figure.length === 0) {
    if (!tabelleOK) {
      return {
        testo: [
          '• Nessuna figura attiva Sole–pianeta.',
          '• Tabelle galassie/stelle non impostate → compila TABELLE_AURORIA.',
        ].join('\n'),
      };
    }
    return {
      testo: [
        '• Nessuna figura attiva Sole–pianeta.',
        '• (Definisci eventuale “galassia di quiete” nelle tabelle.)',
      ].join('\n'),
    };
  }

  // figura dominante (orb minima)
  figure.sort((a, b) => a.orb - b.orb);
  const dom = figure[0];

  // categoria → galassia
  let galassia = null;
  if (T.CATEGORIE.MENTALI.has(dom.pianeta))      galassia = selezionaGalassia(T, 'MENTALI');
  else if (T.CATEGORIE.EMOZIONALI.has(dom.pianeta)) galassia = selezionaGalassia(T, 'EMOZIONALI');
  else if (T.CATEGORIE.MATERIALI.has(dom.pianeta))  galassia = selezionaGalassia(T, 'MATERIALI');

  if (!tabelleOK || !galassia) {
    return {
      testo: [
        `• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta}.`,
        '• Tabelle galassie/stelle non definite: inserisci i nomi ufficiali.',
      ].join('\n'),
    };
  }

  // stella dalla tabella
  const stella = scegliStella(T, galassia, dom.aspetto);

  return {
    testo: [
      `• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta}.`,
      `• Proiezione: ${galassia}.`,
      `• Il Sole illumina: ${stella}.`,
      '• Regola Auroria: le stelle appartengono alla galassia; i pianeti forniscono la figura.',
    ].join('\n'),
  };

  // —— helpers
  function selezionaGalassia(T, /*categoria*/) {
    // Se vuoi una mappa diretta categoria→galassia, aggiungila qui.
    // Per ora restituiamo la prima galassia definita (NO invenzioni).
    return T.GALASSIE[0] || null;
  }

  function scegliStella(T, gal, aspetto) {
    const elenco =
      T.STELLE_PER_GALASSIA?.[gal]?.[aspetto] ||
      T.STELLE_PER_GALASSIA?.[gal] ||
      [];
    if (!Array.isArray(elenco) || elenco.length === 0) {
      return '— (inserisci elenco stelle per galassia/aspetto)';
    }
    const preferenze = T.PREFERENZE_STELLE?.[aspetto];
    if (Array.isArray(preferenze)) {
      for (const rx of preferenze) {
        const m = elenco.find((s) => rx.test(s));
        if (m) return m;
      }
    }
    return elenco[0];
  }
}


// ===============================
// Struttura Stesa di Sibille (schema)
// ===============================
function strutturaSibille() {
  return [
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti',
  ].join('\n');
}
