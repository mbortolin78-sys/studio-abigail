// ===============================
// 🌙 Auroria Tecnico — Metodo Marika (calcolo tecnico)
// ===============================
//
// Flusso:
// 1) Avvia Comandi Operativi
// 2) Calcola Oraria astrale reale (astronomy-engine)
// 3) Proietta il Sistema Solare secondo le REGOLE di Auroria
// 4) Identifica la stella dalla GALASSIA (tabelle da riempire con i tuoi nomi)
// 5) Restituisce output tecnico (nessuna narrativa)
//
// NOTA IMPORTANTE: questo file NON inventa niente.
// Se le tabelle sotto non sono ancora compilate, il motore avvisa
// ma NON blocca la UI (tasti e invio restano attivi).
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ====== TABELLE DA COMPILARE CON I NOMI UFFICIALI DI AURORIA ======
const TABELLE_AURORIA = {
  // categorie di pianeti usate da Auroria per scegliere la galassia
  CATEGORIE: {
    MENTALI:    new Set(['Mercurio', 'Urano']),
    EMOZIONALI: new Set(['Luna', 'Venere', 'Nettuno']),
    MATERIALI:  new Set(['Marte', 'Saturno', 'Plutone']),
  },

  // elenco galassie del TUO metodo (inserisci i nomi esatti dal file Auroria)
  GALASSIE: [
    // 'Andromeda', 'Sirio', 'Taurus', 'Michelaus (M41)', ...
  ],

  // mappa galassia -> elenco stelle (nomi esatti dal file Auroria)
  STELLE_PER_GALASSIA: {
    // 'Andromeda': ['Stella della Rivelazione', 'Stella della Confessione', ...],
    // 'Sirio':     ['Stella del Dialogo', ...],
    // ...
  },

  // regole opzionali: preferenze stella per tipo aspetto (se presenti nel tuo file)
  PREFERENZE_STELLE: {
    // 'TRIGONO':    [/Rivelazione|Intelletto|Costruzione/i],
    // 'SESTILE':    [/Dialogo|Chiarezza/i],
    // 'QUADRATO':   [/Coraggio|Materia/i],
    // 'OPPOSIZIONE':[/Cose Nascoste|Silenzio|Attesa/i],
  }
};
// ================================================================

export function eseguiAuroria(data, ora, luogo, comando) {
  // 1) avvio operativo
  const avvio = applicaComandiOperativi('Auroria');

  // 2) oraria reale (Sole + pianeti in gradi eclittici 0–360)
  const oraria = calcolaOraria(data, ora, luogo);

  // se fallisce il calcolo oraria, esci senza bloccare la UI
  if (oraria?.errore) {
    return {
      output: `❌ Errore oraria: ${oraria.errore}`
    };
  }

  // 3) proiezione galattica secondo Auroria (nessun nome inventato)
  const gal = proiezioneGalatticaAuroria(oraria, TABELLE_AURORIA);

  // 4) stesa sibille — solo struttura (sorteo reale lo aggiungiamo quando vuoi)
  const sibille = strutturaSibille();

  // 5) output tecnico (solo dati)
  const output = [
    `⚙️ RISULTATO TECNICO — AURORIA (${comando})`,
    `📅 ${data}  ⏰ ${ora}  📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale):`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate.',
    ``,
    `✴️ GALASSIE (Auroria):`,
    gal.testo,
    ``,
    `🜂 STESA SIBILLE (struttura):`,
    sibille,
    ``,
    `✅ Comandi operativi:`,
    `• ${avvio.join('\n• ')}`
  ].join('\n');

  return { output };
}

// ===============================
// Proiezione galattica — Auroria
// ===============================
function proiezioneGalatticaAuroria(oraria, T) {
  // requisiti minimi
  if (!oraria || typeof oraria.sunLon !== 'number' || !oraria.planets) {
    return { testo: '❌ Oraria incompleta: servono longitudini di Sole e pianeti.' };
  }

  // se le tabelle non sono state ancora compilate, non inventiamo: avvisiamo.
  const tabelleOK = Array.isArray(T.GALASSIE) && T.GALASSIE.length > 0 &&
                    T.STELLE_PER_GALASSIA && Object.keys(T.STELLE_PER_GALASSIA).length > 0;

  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0,   orb: 6 },
    { tipo: 'SESTILE',      gradi: 60,  orb: 4 },
    { tipo: 'QUADRATO',     gradi: 90,  orb: 5 },
    { tipo: 'TRIGONO',      gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  gradi: 180, orb: 6 },
  ];

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const sep = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
    };
  const aspettoSole = (delta) => {
    let best = null;
    for (const a of ASPETTI) {
      const diff = Math.abs(delta - a.gradi);
      if (diff <= a.orb) {
        if (!best || diff < best.diff) best = { tipo: a.tipo, diff };
      }
    }
    return best;
  };

  const sun = oraria.sunLon;
  const figure = [];

  // figure Sole–pianeta
  for (const [nome, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = sep(sun, val.lon);
    const asp = aspettoSole(delta);
    if (asp) figure.push({ pianeta: nome, aspetto: asp.tipo, orb: asp.diff });
  }

  if (figure.length === 0) {
    if (!tabelleOK) {
      return {
        testo: [
          '• Nessuna figura attiva Sole–pianeta.',
          '• Tabelle galassie/stelle non impostate (riempi TABELLE_AURORIA in auroria_tecnico.js).'
        ].join('\n')
      };
    }
    // se vuoi, puoi decidere qui una galassia “di quiete” dal tuo file (es. M41)
    return {
      testo: [
        '• Nessuna figura attiva Sole–pianeta.',
        '• Galassia di quiete (definiscila nelle tabelle) → stella associata.'
      ].join('\n')
    };
  }

  // figura più stretta (orb minore)
  figure.sort((a, b) => a.orb - b.orb);
  const dom = figure[0];

  // scelta galassia secondo categorie Auroria
  let galassia = null;
  if (T.CATEGORIE.MENTALI.has(dom.pianeta))      galassia = trovaGalassia(T, 'MENTALI');
  else if (T.CATEGORIE.EMOZIONALI.has(dom.pianeta)) galassia = trovaGalassia(T, 'EMOZIONALI');
  else if (T.CATEGORIE.MATERIALI.has(dom.pianeta))  galassia = trovaGalassia(T, 'MATERIALI');

  // se le tabelle non sono settate, non inventiamo nulla
  if (!tabelleOK || !galassia) {
    const righe = [
      `• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta}.`,
      '• Tabelle galassie/stelle non definite: inserisci i nomi ufficiali dal file Auroria.',
      '  → Sezione TABELLE_AURORIA in auroria_tecnico.js.'
    ];
    return { testo: righe.join('\n') };
  }

  // scelta stella dalla tabella
  const stella = scegliStella(T, galassia, dom.aspetto);

  const testo = [
    `• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta}.`,
    `• Proiezione: ${galassia}.`,
    `• Il Sole illumina: ${stella}.`,
    `• Regola Auroria: le stelle appartengono alla galassia (i pianeti forniscono la figura).`
  ].join('\n');

  return { testo };

  // —— helpers
  function trovaGalassia(T, categoria) {
    // se vuoi una mappa diretta categoria→galassia, definiscila qui.
    // per ora restituisco la prima galassia presente, così NON inventiamo
    // e non blocchiamo il flusso. Riempirai tu la logica esatta dal file.
    return T.GALASSIE[0] || null;
  }

  function scegliStella(T, gal, aspetto) {
    const elenco = T.STELLE_PER_GALASSIA[gal] || [];
    if (!elenco.length) return '— (inserisci elenco stelle dal file Auroria)';
    const preferenze = T.PREFERENZE_STELLE?.[aspetto];
    if (preferenze && Array.isArray(preferenze)) {
      for (const rx of preferenze) {
        const m = elenco.find(s => rx.test(s));
        if (m) return m;
      }
    }
    return elenco[0]; // nessuna preferenza impostata → prima stella
  }
}

// ===============================
// Struttura Stesa di Sibille (solo schema, senza estrazione)
// ===============================
function strutturaSibille() {
  return [
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti'
  ].join('\n');
}
