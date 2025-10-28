// ===============================
// ✨ Velaria Tecnico — Metodo Marika (calcolo tecnico)
// ===============================
//
// Flusso:
// 1) Avvia Comandi Operativi
// 2) Calcola Oraria Classica
// 3) Calcola Collisione Galassiale (Sirio–Andromeda → parola chiave)
// 4) Esegue la stesa dei Tarocchi (2 + 3 + 1 + 5 terne)
// 5) Restituisce output tecnico (senza narrativa)
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ====== CARICAMENTO TAROCCHI ======
const TAROCCHI_STELLE = await fetch('./mazzi/tarocchi_stelle.json').then(res => res.json());

// ===============================
// FUNZIONE PRINCIPALE
// ===============================
export async function eseguiVelaria(data, ora, luogo, comando) {
  console.log(`⚙️ Avvio calcolo VELARIA — ${comando}, ${data}, ${ora}, ${luogo}`);

  // 1) Comandi Operativi
  const logOperativi = applicaComandiOperativi('Velaria');

  // 2) Calcolo Oraria Classica
  const oraria = calcolaOraria(data, ora, luogo);
  if (oraria?.errore) return { output: `❌ Errore oraria: ${oraria.errore}` };

  // 3) Calcolo Collisione Galassiale (Sirio–Andromeda)
  const galassiale = collisioneGalassiale(oraria);

  // 4) Stesa Tarocchi (2 + 3 + 1 + 5 terne)
  const stesa = strutturaTarocchi();

  // 5) Output tecnico
  const output = [
    `⚙️ RISULTATO TECNICO — VELARIA (${comando})`,
    `📅 ${data}  ⏰ ${ora}  📍 ${luogo}`,
    ``,
    `🔭 ORARIA CLASSICA:`,
    oraria.testo?.trim() || '• Posizioni astronomiche calcolate.',
    ``,
    `🌌 COLLISIONE GALASSIALE (Sirio–Andromeda):`,
    galassiale.testo,
    ``,
    `🜂 STESA TAROCCHI (struttura):`,
    stesa,
    ``,
    `✅ Comandi operativi:`,
    `• ${logOperativi.join('\n• ')}`
  ].join('\n');

  return { output };
}

// ===============================
// Collisione Galassiale (Sirio–Andromeda)
// ===============================
function collisioneGalassiale(oraria) {
  // Step: prendiamo il Sole e vediamo la figura dominante
  const figure = [];
  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0,   orb: 6 },
    { tipo: 'SESTILE',      gradi: 60,  orb: 4 },
    { tipo: 'QUADRATO',     gradi: 90,  orb: 5 },
    { tipo: 'TRIGONO',      gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  gradi: 180, orb: 6 },
  ];

  if (!oraria?.planets) return { testo: '❌ Nessuna informazione planetaria disponibile.' };

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const sep = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
  };

  const sun = oraria.sunLon;
  for (const [nome, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = sep(sun, val.lon);
    for (const a of ASPETTI) {
      if (Math.abs(delta - a.gradi) <= a.orb) {
        figure.push(a.tipo);
      }
    }
  }

  const aspetto = figure[0] || 'TRIGONO';
  const paroleChiave = {
    TRIGONO: 'Rivelazione',
    SESTILE: 'Dialogo',
    QUADRATO: 'Conflitto',
    OPPOSIZIONE: 'Silenzio',
    CONGIUNZIONE: 'Nascita'
  };
  const keyword = paroleChiave[aspetto] || 'Vortice';

  const testo = [
    `• Figura dominante: Sole in ${aspetto}.`,
    `• Collisione Sirio–Andromeda attiva.`,
    `• Parola chiave estratta: ${keyword}.`,
    `• In Velaria non si nominano stelle singole, ma il vortice Sirio–Andromeda.`
  ].join('\n');

  return { testo };
}

// ===============================
// Struttura Stesa Tarocchi
// ===============================
function strutturaTarocchi() {
  return [
    '• 1° taglio: 2 carte (mai uguali)',
    '• 2° taglio: 3 carte (mai uguali)',
    '• 1 carta centrale: mai uguale',
    '• 5 terne da 3 carte (15 carte), tutte differenti'
  ].join('\n');
}

export default { eseguiVelaria };
