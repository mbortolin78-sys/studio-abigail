// ai.js — Router comandi operativi (versione corretta e stabile)
// - Normalizza input (rimuove punti/spazi extra, uppercase)
// - Mappa alias → chiave canonica
// - Instrada ai moduli tecnici
// - Ritorna sempre { output: string }

// ─────────────────────────────────────────────
// IMPORT PRINCIPALI
// ─────────────────────────────────────────────

import { eseguiAuroria }        from './auroria_tecnico.js';
import { eseguiEcho }           from './echo_tecnico.js';
import { eseguiVelaria }        from './velaria_tecnico.js';
import { eseguiEteria }         from './eteria_tecnico.js';
import { eseguiVenereClassica } from './venere_classica_tecnico.js';
import { eseguiVenereAuroria }  from './venere_auroria_tecnico.js';
import { eseguiVenereVelaria }  from './venere_velaria_tecnico.js';
import { eseguiVenereEteria }   from './venere_eteria_tecnico.js';
import { eseguiIdentikit }      from './identikit_tecnico.js';

// ─────────────────────────────────────────────
// FUNZIONI DI UTILITÀ
// ─────────────────────────────────────────────

function normalizeCommand(text = '') {
  return String(text || '')
    .replace(/\./g, '')     // elimina i punti
    .trim()                 // rimuove spazi extra
    .toUpperCase();         // converte in maiuscolo
}

function nowPieces() {
  const now = new Date();
  const data = now.toLocaleDateString('it-IT');
  const ora = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  return [now, data, ora];
}

function defaultLocation() {
  return 'Montebelluna';
}

// ─────────────────────────────────────────────
// Mappa alias → chiave canonica
// ─────────────────────────────────────────────

const COMMAND_ALIASES = new Map([
  // AURORIA
  ['RAS', 'RAS'], ['RAE', 'RAE'],
  // ECHO
  ['RES', 'RES'], ['REE', 'REE'],
  // VELARIA
  ['RVS', 'RVS'], ['RVE', 'RVE'],
  // ETERIA
  ['RETERIAE', 'RETERIAE'], ['RETERIAS', 'RETERIAS'],
  // VENERE
  ['RVC', 'RVC'], ['RVA', 'RVA'], ['RVV', 'RVV'], ['RVETERIA', 'RVETERIA'],
  // IDENTIKIT
  ['RVI', 'RVI'],
]);

function resolveCommand(raw) {
  const norm = normalizeCommand(raw);
  return COMMAND_ALIASES.get(norm) || null;
}

// ─────────────────────────────────────────────
// ROUTER PRINCIPALE
// ─────────────────────────────────────────────

export async function processCommand(text) {
  try {
    if (!text || text.trim() === '') {
      return { output: '🪶 Inserisci un comando o una domanda.' };
    }

    const canonical = resolveCommand(text);
    const [, dataIT, oraIT] = nowPieces();
    const luogo = defaultLocation();

    if (!canonical) {
      return { output: '✨ Formula non riconosciuta come comando operativo.' };
    }

    switch (canonical) {
      // 🌞 AURORIA
      case 'RAS':
      case 'RAE':
        return await eseguiAuroria(dataIT, oraIT, luogo, canonical);

      // 🌊 ECHO
      case 'RES':
      case 'REE':
        return await eseguiEcho(dataIT, oraIT, luogo, canonical);

      // 🌬 VELARIA
      case 'RVS':
      case 'RVE':
        return await eseguiVelaria(dataIT, oraIT, luogo, canonical);

      // ✴ ETERIA
      case 'RETERIAE':
      case 'RETERIAS':
        return await eseguiEteria(dataIT, oraIT, luogo, canonical);

      // 💫 VENERE
      case 'RVC':
        return await eseguiVenereClassica(dataIT, oraIT, luogo, canonical);
      case 'RVA':
        return await eseguiVenereAuroria(dataIT, oraIT, luogo, canonical);
      case 'RVV':
        return await eseguiVenereVelaria(dataIT, oraIT, luogo, canonical);
      case 'RVETERIA':
        return await eseguiVenereEteria(dataIT, oraIT, luogo, canonical);

      // 🌙 IDENTIKIT
      case 'RVI':
        return await eseguiIdentikit(dataIT, oraIT, luogo, canonical);

      // Default
      default:
        return { output: '✨ Formula non riconosciuta come comando operativo.' };
    }
  } catch (err) {
    console.error('Errore processCommand:', err);
    return { output: `❌ Errore di runtime: ${err?.message || String(err)}` };
  }
}
