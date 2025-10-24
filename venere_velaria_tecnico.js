// venere_velaria_tecnico.js
// Metodo Marika – Venere Velaria (VIP)

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
import TAROCCHI_STELLE from './mazzi/tarocchi_stelle.json';

export function eseguiVenereVelaria(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando non riconosciuto. Usa: RVV' };

  const operativi = applicaComandiOperativi('Venere Velaria');
  const oraria = calcolaOraria(data, ora, luogo);
  if (!oraria || oraria.errore)
    return { output: `❌ Errore oraria: ${oraria?.errore || 'calcolo non disponibile'}` };

  const collisione = calcolaCollisioneVenaria(oraria);
  const legge = applicaLeggeUniversale?.({ modulo: 'Venere Velaria', data, ora, luogo, oraria });

  const rng = makeRNG(seedFrom({ data, ora, luogo, tipo, key: collisione.colore }));
  const deck = Array.isArray(TAROCCHI_STELLE?.carte) ? TAROCCHI_STELLE.carte : [];
  const stesa = estraiTarocchi(deck, rng);

  const righe = [
    `✨ Metodo VENERE VELARIA attivo (${tipo})`,
    `📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`,
    ``,
    `🔭 ORARIA (reale)`,
    oraria.testo?.trim() || 'Oraria classica eseguita sui parametri reali.',
    ``,
    `🌌 COLLISIONE SIRIO ↔ ANDROMEDA → MARTE`,
    `• Luce codificata: ${collisione.colore}`,
    `• Rami numerati ① ② ③ …`,
    ``,
    `🜄 STESA TAROCCHI DELLE STELLE (2 + 3 + 1 + 5 terne da 3)`,
    `• 2 carte: ${listNomi(stesa.due)}`,
    `• 3 carte: ${listNomi(stesa.tre)}`,
    `• 1 carta: ${listNomi(stesa.uno)}`,
    `• Terne (5×3): ${stesa.terne.map(trio => '[' + listNomi(trio) + ']').join(' ')}`,
    ``,
    `✅ Comandi Operativi`,
    `• ${operativi.join('\n• ')}`,
    ``,
    `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.`
  ];

  return { output: righe.join('\n'), _meta: { oraria, collisione, stesa, legge } };
}

// --- funzioni interne ---
function calcolaCollisioneVenaria(oraria) {
  const h = oraria?.oraLocale?.split(':')[0];
  const giorno = oraria.stato === 'giorno';
  const colori = ['Argento', 'Oro', 'Azzurro Elettrico', 'Blu Elettrico'];
  const idx = Math.floor(((Number(h) || 0) + (giorno ? 1 : 2)) % 4);
  return { colore: colori[idx] };
}

function estraiTarocchi(deck = [], rng = Math.random) {
  const due = drawUnique(deck, 2, rng);
  const tre = drawUnique(exclude(deck, due), 3, rng);
  const uno = drawUnique(exclude(deck, [...due, ...tre]), 1, rng);
  const terne = creaTerneUniche(exclude(deck, [...due, ...tre, ...uno]), 5, rng);
  return { due, tre, uno, terne };
}

// …(drawUnique, exclude, creaTerneUniche, seedFrom, makeRNG, listNomi, parseTipo come negli altri moduli)…

export default { eseguiVenereVelaria };
