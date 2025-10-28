// ===============================
// 🌘 ECHO Tecnico — Metodo Marika (calcolo tecnico riflesso lunare)
// ===============================
//
// Flusso ufficiale:
// 1) Avvio Comandi Operativi
// 2) Calcolo Oraria reale (astronomy-engine)
// 3) Proiezione riflessa galattica (Luna come centro)
// 4) Identificazione stella attiva
// 5) Stese Sibille e Oracoli
// 6) Restituzione output tecnico (nessuna narrativa)
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ====== TABELLE ECHO ======
const TABELLE_ECHO = {
  CATEGORIE: {
    MENTALI: new Set(['Mercurio', 'Urano']),
    EMOZIONALI: new Set(['Luna', 'Venere', 'Nettuno']),
    MATERIALI: new Set(['Marte', 'Saturno', 'Plutone'])
  },

  GALASSIE: [
    'Andromeda Riflessa',
    'Sirio Riflesso',
    'Taurus Riflesso',
    'Michelaus Riflesso (M41)'
  ],

  STELLE_PER_GALASSIA: {
    'Andromeda Riflessa': {
      TRIGONO: ['Specchio dell’Est', 'Cristallo di Selene', 'Portale d’Aria'],
      SESTILE: ['Riflesso del Pensiero', 'Occhio di Ermes', 'Sfera Mentale'],
      QUADRATO: ['Nodo d’Ambra', 'Torre del Silenzio'],
      OPPOSIZIONE: ['Cuore Speculare']
    },
    'Sirio Riflesso': {
      TRIGONO: ['Velo d’Argento', 'Stella delle Maree', 'Etere Emotivo'],
      SESTILE: ['Onda Interna', 'Riflesso di Sirio', 'Specchio di Venere'],
      QUADRATO: ['Nucleo del Desiderio', 'Porta delle Emozioni'],
      OPPOSIZIONE: ['Lacrima Lunare']
    },
    'Taurus Riflesso': {
      TRIGONO: [
        'Spira del Ferro',
        'Occhio di Rubino',
        'Nucleo del Minerale'
      ],
      SESTILE: [
        'Croce di Rame',
        'Riflesso Terrestre',
        'Sfera del Lavoro'
      ],
      QUADRATO: [
        'Caverna di Piombo',
        'Nodo del Peso',
        'Specchio del Tempo'
      ],
      OPPOSIZIONE: [
        'Anello Saturniano',
        'Cuore del Toro'
      ]
    },
    'Michelaus Riflesso (M41)': {
      TRIGONO: [
        'Frattale Dorato',
        'Etere Centrale',
        'Sigillo Cosmico'
      ],
      SESTILE: [
        'Armonia di Quarzo',
        'Scala delle Tre Forme',
        'Riflesso Universale'
      ],
      QUADRATO: [
        'Nodo del Paradosso',
        'Sfera del Disordine',
        'Croce delle Quattro Direzioni'
      ],
      OPPOSIZIONE: [
        'Punto Zero',
        'Cuore della Legge Universale'
      ]
    }
  }
};

// ===============================
// 🔮 Funzione principale di calcolo
// ===============================
export function eseguiEcho(data, ora, luogo, comando) {
  console.log(`⚙️ Avvio calcolo ECHO — ${comando}, ${data}, ${ora}, ${luogo}`);

  // 1) Avvio operativo
  const avvio = applicaComandiOperativi('Echo');

  // 2) Calcolo oraria reale
  const oraria = calcolaOraria(data, ora, luogo);
  if (!oraria || typeof oraria.moonLon !== 'number' || !oraria.planets) {
    return { output: '❌ Oraria incompleta: servono longitudini di Luna e pianeti.' };
  }

  // 3) Proiezione riflessa
  const proiezione = proiezioneRiflessaEcho(oraria, TABELLE_ECHO);

  // 4) Struttura delle stese
  const sibille = strutturaSibille();
  const oracoli = strutturaOracoli();

  // 5) Output tecnico
  const output = [
    `⚙️ RISULTATO TECNICO — ECHO (${comando})`,
    `📅 ${data}  ⏰ ${ora}  📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale):`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate.',
    ``,
    `🌘 GALASSIE RIFLESSE (Echo):`,
    proiezione.testo,
    ``,
    `🜂 STESA SIBILLE (struttura):`,
    sibille,
    ``,
    `🪞 STESA ORACOLI (Mara Official Vol.2 + Vol.3):`,
    oracoli,
    ``,
    `✅ Comandi operativi:`,
    `• ${avvio.join('\n• ')}`,
    ``,
    `✨ I calcoli sono stati eseguiti secondo la Legge Universale (Art.7.1–7.7)`
  ].join('\n');

  return { output };
}

// ===============================
// 🌙 Calcolo proiezione riflessa
// ===============================
function proiezioneRiflessaEcho(oraria, T) {
  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0, orb: 6 },
    { tipo: 'SESTILE', gradi: 60, orb: 4 },
    { tipo: 'QUADRATO', gradi: 90, orb: 5 },
    { tipo: 'TRIGONO', gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE', gradi: 180, orb: 6 }
  ];

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const sep = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
  };

  const luna = oraria.moonLon;
  const figure = [];

  for (const [nome, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = sep(luna, val.lon);
    for (const asp of ASPETTI) {
      const diff = Math.abs(delta - asp.gradi);
      if (diff <= asp.orb) {
        figure.push({ pianeta: nome, aspetto: asp.tipo, orb: diff });
      }
    }
  }

  if (figure.length === 0) {
    return { testo: '🌙 Nessuna figura lunare attiva in questo istante.' };
  }

  figure.sort((a, b) => a.orb - b.orb);
  const dom = figure[0];

  let galassia = null;
  if (T.CATEGORIE.MENTALI.has(dom.pianeta)) galassia = 'Andromeda Riflessa';
  else if (T.CATEGORIE.EMOZIONALI.has(dom.pianeta)) galassia = 'Sirio Riflesso';
  else if (T.CATEGORIE.MATERIALI.has(dom.pianeta)) galassia = 'Taurus Riflesso';
  else galassia = 'Michelaus Riflesso (M41)';

  const stella = scegliStella(T, galassia, dom.aspetto);

  const testo = [
    `• Figura dominante: Luna in ${dom.aspetto} a ${dom.pianeta}.`,
    `• Proiezione riflessa: ${galassia}.`,
    `• La Luna illumina (riflesso): ${stella}.`,
    `• Regola Echo: la figura nasce per riflessione lunare, non per emissione solare.`
  ].join('\n');

  return { testo };
}

function scegliStella(T, gal, aspetto) {
  const elenco = T.STELLE_PER_GALASSIA[gal]?.[aspetto] || [];
  if (!elenco.length) return '— (nessuna stella definita)';
  return elenco[Math.floor(Math.random() * elenco.length)];
}

// ===============================
// 🜂 Struttura Stese
// ===============================
function strutturaSibille() {
  return [
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti'
  ].join('\n');
}

function strutturaOracoli() {
  return [
    '• 1° taglio: 2 oracoli (mai uguali)',
    '• 2° taglio: 3 oracoli (mai uguali)',
    '• 1 oracolo centrale: mai uguale',
    '• 5 terne da 3 oracoli (15 oracoli), tutte differenti'
  ].join('\n');
}
