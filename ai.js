// ai.js — Router comandi operativi (riscritto)
// ============================================
// - Normalizza l'input (rimuove punti/spazi extra, uppercase)
// - Mappa alias → handler
// - Instrada ai motori tecnici
// - Ritorna { output: string } in tutti i casi

import { eseguiAuroria }        from './auroria_tecnico.js';
import { eseguiEcho }           from './echo_tecnico.js';
import { eseguiVelaria }        from './velaria_tecnico.js';
import { eseguiEteria }         from './eteria_tecnico.js';

import { eseguiVenereClassica } from './venere_classica_tecnico.js';
import { eseguiVenereAuroria }  from './venere_auroria_tecnico.js';
import { eseguiVenereVelaria }  from './venere_velaria_tecnico.js';
import { eseguiVenereEteria }   from './venere_eteria_tecnico.js';

import { eseguiIdentikit }      from './identikit_tecnico.js';

// ———————————————————————————————————————————————
// utilità
function normalizeCommand(text = '') {
  // rimuovi punti, trim, comprimi spazi, uppercase
  return String(text)
    .replace(/\./g, '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase();
}

function nowPieces() {
  const now = new Date();
  const dataIT = now.toLocaleDateString('it-IT');
  const oraIT  = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  return { now, dataIT, oraIT };
}

function defaultLocation() {
  return 'Montebelluna';
}

// ———————————————————————————————————————————————
// tabella alias → chiave canonica
const COMMAND_ALIASES = new Map([
  // AURORIA
  ['RAS', 'RAS'], ['RAE', 'RAE'],

  // ECHO
  ['RES', 'RES'], ['REE', 'REE'],

  // VELARIA
  ['RVS', 'RVS'], ['RVE', 'RVE'],

  // ETERIA (normale + estesa + sintetica)
  ['RETERIAE', 'RETERIAE'],
  ['RETERIAS', 'RETERIAS'],

  // VENERE (4 varianti)
  ['RVC', 'RVC'],         // Venere Classica
  ['RVA', 'RVA'],         // Venere Auroria
  ['RVV', 'RVV'],         // Venere Velaria
  ['RVETERIA', 'RVETERIA'], // Venere Eteria

  // IDENTIKIT
  ['RVI', 'RVI'],
]);

function resolveCommand(raw) {
  const norm = normalizeCommand(raw);
  return COMMAND_ALIASES.get(norm) || null;
}
// ─────────────────────────────────────────────
// ESECUZIONE DEL COMANDO RICONOSCIUTO
// ─────────────────────────────────────────────

export async function processCommand(text) {
  if (!text || text.trim() === '') {
    return { output: "🪶 Inserisci un comando o una domanda." };
  }

  const norm = normalizeCommand(text);
  const canonical = resolveCommand(norm);
  const [now, dataIT, oraIT] = nowPieces();
  const luogoCorrente = defaultLocation();

  if (!canonical) {
    return { output: "✨ Formula non riconosciuta come comando operativo." };
  }

  switch (canonical) {

    // 🌞 AURORIA
    case 'RAE':
    case 'RAS':
      return await eseguiAuroria(dataIT, oraIT, luogoCorrente, canonical);

    // 🌊 ECHO
    case 'REE':
    case 'RES':
      return await eseguiEcho(dataIT, oraIT, luogoCorrente, canonical);

    // 🌬 VELARIA
    case 'RVE':
    case 'RVS':
      return await eseguiVelaria(dataIT, oraIT, luogoCorrente, canonical);

    // ✴ ETERIA
    case 'RETERIAE':
    case 'RETERIAS':
      return await eseguiEteria(dataIT, oraIT, luogoCorrente, canonical);

    // 💫 VENERE
    case 'RVC':
      return await eseguiVenereClassica(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVA':
      return await eseguiVenereAuroria(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVV':
      return await eseguiVenereVelaria(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVETERIA':
      return await eseguiVenereEteria(dataIT, oraIT, luogoCorrente, canonical);

    // 🌙 IDENTIKIT
    case 'RVI':
      return await eseguiIdentikit(dataIT, oraIT, luogoCorrente, canonical);

    // Default
    default:
      return { output: "✨ Formula non riconosciuta come comando operativo." };
  }

// ———————————————————————————————————————————————
// API principale
export async function processCommand(text) {
  if (!text || String(text).trim() === '') {
    return { output: '🪶 Inserisci un comando o una domanda.' };
  }

  const cmdKey = resolveCommand(text);
  if (!cmdKey) {
    return { output: '✨ Formula non riconosciuta come comando operativo.' };
  }

  const { dataIT, oraIT } = nowPieces();
  const luogo = defaultLocation();

  try {
    const res = await dispatch(cmdKey, { dataIT, oraIT, luogo });
    // Tutti i motori tecnici ritornano { output: string, ... }
    if (!res || typeof res.output !== 'string') {
      return { output: '⚠️ Nessun output generato dal motore tecnico.' };
    }
    return res;
  } catch (err) {
    return { output: `❌ Errore esecuzione comando (${cmdKey}): ${err?.message || String(err)}` };
  }
}

export default { processCommand };
