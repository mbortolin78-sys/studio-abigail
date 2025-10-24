// ai.js — Motore tecnico diretto di Studio Abigail
// Gestisce il riconoscimento dei comandi e richiama il file tecnico corretto

// Importa i moduli principali
import { calcolaOrariaAstrale } from './ephemeris.js';

// Comandi tecnici collegati (ognuno sarà un file separato)
import { eseguiRAS } from './ras.js';
import { eseguiRAE } from './rae.js';
// In futuro: import { eseguiRVE } from './rve.js'; ecc.

let luogoCorrente = "Montebelluna"; // Luogo predefinito

export function processCommand(text) {
  const cleaned = text.trim().toUpperCase().replace(/\./g, '');
  const now = new Date();

  const data = now.toLocaleDateString('it-IT');
  const ora = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  // Se l'utente imposta un nuovo luogo
  if (cleaned.startsWith("LUOGO ")) {
    const nuovoLuogo = text.substring(6).trim();
    if (nuovoLuogo) {
      luogoCorrente = nuovoLuogo.charAt(0).toUpperCase() + nuovoLuogo.slice(1);
      return { output: `📍 Luogo impostato su ${luogoCorrente}.` };
    } else {
      return { output: "❗️Devi specificare un luogo dopo 'LUOGO'." };
    }
  }

  // Riconoscimento comando operativo
  const comando = cleaned.split(' ')[0]; // es. "RAS", "RAE" ecc.

  switch (comando) {
    case 'RAS':
      return eseguiRAS(data, ora, luogoCorrente, text);
    case 'RAE':
      return eseguiRAE(data, ora, luogoCorrente, text);
    // Aggiungeremo qui anche gli altri (REE, RES, RVE, ecc.)
    default:
      return { output: "🪶 Formula non riconosciuta come comando operativo." };
  }
}
