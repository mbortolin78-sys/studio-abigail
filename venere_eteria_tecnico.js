// ===============================
// 💫 Venere Eteria — Motore Tecnico (RVEteria)
// Metodo Marika — Studio Abigail
// ===============================
//
// 1. Comandi Operativi
// 2. Oraria reale (Venere, Luna, case attive)
// 3. Portali Quantici (Passato / Presente / Futuro)
// 4. Fusione energetica Sirio↔Andromeda→Marte (luce codificata)
// 5. Estrazione Oracoli dello Sciamano: 2 + 3 + 1 + 5×3
// 6. Output tecnico + FSRU–E/24
//

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
// ====== CARICAMENTO MAZZO ORACOLI (Venere Eteria) ======
let ORACOLI_SCIAMANO = null;

async function caricaMazzoOracoli() {
  try {
  import ORACOLI_SCIAMANO from './mazzi/oracoli_sciamano.json' assert { type: 'json' };
}

export async function eseguiVenereEteria(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando non riconosciuto. Usa: RVEteria' };
await caricaMazzoOracoli();
  console.log('Oracoli disponibili:', ORACOLI_SCIAMANO?.carte?.length || 0);
  if (!ORACOLI_SCIAMANO) return { output: '❌ Mazzo Oracoli non caricato correttamente.' };
  
  // 1️⃣ Comandi + Legge
  const operativi = applicaComandiOperativi('Venere Eteria');
  const oraria = calcolaOraria(data, ora, luogo);
  const legge = applicaLeggeUniversale?.({ modulo: 'Venere Eteria', data, ora, luogo, oraria });
  if (oraria?.errore) return { output: `❌ Errore oraria: ${oraria.errore}` };

  // 2️⃣ Attivazione Portali
  const portali = calcolaPortaliEteria(oraria);

  // 3️⃣ Fusione energetica
  const fusione = calcolaFusioneVenaria(oraria);

  // 4️⃣ Estrazione Oracoli
  const rng = makeRNG(seedFrom({ data, ora, luogo, tipo, key: fusione.colore }));
  const deck = Array.isArray(ORACOLI_SCIAMANO?.carte) ? ORACOLI_SCIAMANO.carte : [];
  const stesa = estraiOracoli(deck, rng);

  // 5️⃣ Output tecnico
  const righe = [
    `✨ Metodo VENERE ETERIA attivo (${tipo})`,
    `📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale)`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate.',
    ``,
    `🌌 PORTALI QUANTICI`,
    `• Passato → ${portali.passato.colore}`,
    `• Presente → ${portali.presente.colore}`,
    `• Futuro → ${portali.futuro.colore}`,
    ``,
    `⚡ FUSIONE SIRIO↔ANDROMEDA → MARTE`,
    `• Luce codificata = ${fusione.colore}`,
    ``,
    `🜄 STESA ORACOLI DELLO SCIAMANO (2 + 3 + 1 + 5×3)`,
    `• 2 carte: ${listNomi(stesa.due)}`,
    `• 3 carte: ${listNomi(stesa.tre)}`,
    `• 1 carta: ${listNomi(stesa.uno)}`,
    `• Terne (5×3): ${stesa.terne.map(trio => '[' + listNomi(trio) + ']').join(' ')}`,
    ``,
    `✅ Comandi Operativi`,
    `• ${operativi.join('\n• ')}`,
    ``,
    `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali. (FSRU–E/24)`
  ];

  return { output: righe.join('\n'), _meta: { oraria, portali, fusione, stesa, legge } };
}

// --- Portali Quantici ---
function calcolaPortaliEteria(oraria) {
  const colori = ['Viola', 'Argento', 'Oro'];
  const stato = oraria?.stato === 'giorno' ? 1 : 0;
  return {
    passato: { colore: colori[stato] },
    presente: { colore: 'Argento' },
    futuro: { colore: colori[(stato + 2) % 3] }
  };
}

// --- Fusione Venaria ---
function calcolaFusioneVenaria(oraria) {
  const ora = Number(oraria?.oraLocale?.split(':')[0]) || 0;
  const giorno = oraria.stato === 'giorno';
  const colori = ['Argento', 'Oro', 'Azzurro Elettrico', 'Blu Elettrico'];
  return { colore: colori[(ora + (giorno ? 1 : 2)) % 4] };
}

// --- Estrazioni ---
function estraiOracoli(deck = [], rng = Math.random) {
  const due = drawUnique(deck, 2, rng);
  const tre = drawUnique(exclude(deck, due), 3, rng);
  const uno = drawUnique(exclude(deck, [...due, ...tre]), 1, rng);
  const terne = creaTerneUniche(exclude(deck, [...due, ...tre, ...uno]), 5, rng);
  return { due, tre, uno, terne };
}

// --- Utilities comuni (drawUnique, exclude, creaTerneUniche, seedFrom, makeRNG, listNomi, parseTipo) ---
// (uguali a quelli già usati in auroria_tecnico.js e eteria_tecnico.js)

export default { eseguiVenereEteria };
