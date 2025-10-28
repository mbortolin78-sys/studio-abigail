// ===============================
// 🌙 Auroria Tecnico — Metodo Marika (calcolo tecnico + narrativa)
// ===============================
//
// Flusso:
// 1) Calcolo tecnico Auroria
// 2) Invocazione del motore narrativo locale (Ollama) tramite narrativa_engine.js
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { invocaScritturaViva } from './src/ai/narrativa_engine.js'; // 💫 collegamento al motore narrativo

// ====== TABELLE — NOMI UFFICIALI DI AURORIA ======
const TABELLE_AURORIA = {
  CATEGORIE: {
    MENTALI:    new Set(['Mercurio', 'Urano']),
    EMOZIONALI: new Set(['Luna', 'Venere', 'Nettuno']),
    MATERIALI:  new Set(['Marte', 'Saturno', 'Plutone']),
  },
  GALASSIE: ['Andromeda', 'Sirio', 'Taurus', 'Michelaus (M41)'],
  STELLE_PER_GALASSIA: {
    'Andromeda': {
      TRIGONO: ['Rivelazione', 'Ascensione', 'Soglia dell’Ovest'],
      SESTILE: ['Armonia', 'Intelletto', 'Dialogo di Luce'],
      QUADRATO: ['Conflitto Sacro', 'Materia Oscura'],
      OPPOSIZIONE: ['Nascosta', 'Confessione', 'Rottura di Ciclo'],
    },
    'Sirio': {
      TRIGONO: ['Dialogo', 'Visione', 'Guida'],
      SESTILE: ['Sincronia', 'Ponte di Cielo'],
      QUADRATO: ['Scissione', 'Riflesso'],
      OPPOSIZIONE: ['Chiusura', 'Velo di Sirio'],
    },
  },
};

// ===============================
// API principale (chiamata da ai.js)
// ===============================
export async function eseguiAuroria(data, ora, luogo, comando) {
  console.log(`⚙️ Avvio AURORIA — ${comando}, ${data}, ${ora}, ${luogo}`);

  // 1️⃣ Calcolo tecnico base
  const logOperativi = applicaComandiOperativi('Auroria');
  const oraria = calcolaOraria(data, ora, luogo);
  if (oraria?.errore) {
    return { output: `❌ Errore oraria: ${oraria.errore}` };
  }

  const gal = proiezioneGalatticaAuroria(oraria, TABELLE_AURORIA);
  const schemaSibille = strutturaSibille();

  const baseTecnico = [
    `✨ Metodo AURORIA attivo (${comando})`,
    `📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale)`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate (Sole e pianeti).',
    ``,
    `🌌 PROIEZIONE GALATTICA`,
    gal.testo,
    ``,
    `🜂 STESA SIBILLE (schema)`,
    schemaSibille,
    ``,
    `✅ Comandi operativi`,
    `• ${logOperativi.join('\n• ')}`,
  ].join('\n');

  // 2️⃣ Invocazione narrativa
  console.log("🌙 Invocazione narrativa con Ollama...");
  const risposta = await invocaScritturaViva({
    comando,
    testo: baseTecnico,
    prompt: "lui pensa a me?",
  });

  console.log("📜 Risposta narrativa:", risposta);

  // 3️⃣ Restituzione finale (tecnico + narrativo)
  return { output: `${baseTecnico}\n\n💫 NARRAZIONE VIVA\n${risposta}` };
}

// ===============================
// Proiezione galattica — AURORIA
// ===============================
function proiezioneGalatticaAuroria(oraria, T) {
  if (!oraria || typeof oraria.sunLon !== 'number' || !oraria.planets) {
    return { testo: '❌ Oraria incompleta: servono longitudini di Sole e pianeti.' };
  }

  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0, orb: 6 },
    { tipo: 'SESTILE', gradi: 60, orb: 4 },
    { tipo: 'QUADRATO', gradi: 90, orb: 5 },
    { tipo: 'TRIGONO', gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE', gradi: 180, orb: 6 },
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

  const sun = oraria.sunLon;
  const figure = [];
  for (const [pianeta, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = separazione(sun, val.lon);
    const asp = trovaAspettoSole(delta);
    if (asp) figure.push({ pianeta, aspetto: asp.tipo, orb: asp.diff });
  }

  if (!figure.length) return { testo: '• Nessuna figura attiva Sole–pianeta.' };

  figure.sort((a, b) => a.orb - b.orb);
  const dom = figure[0];
  return { testo: `• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta}.` };
}

// ===============================
// Struttura Stesa Sibille
// ===============================
function strutturaSibille() {
  return [
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti',
  ].join('\n');
}
