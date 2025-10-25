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
  ['RETERIA',  'RETERIA'],
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

// ———————————————————————————————————————————————
// router → handler
async function dispatch(cmdKey, { dataIT, oraIT, luogo }) {
  switch (cmdKey) {
    // AURORIA
    case 'RAS':
    case 'RAE':
      return eseguiAuroria(dataIT, oraIT, luogo, cmdKey);

    // ECHO
    case 'RES':
    case 'REE':
      return eseguiEcho(dataIT, oraIT, luogo, cmdKey);

    // VELARIA
    case 'RVS':
    case 'RVE':
      return eseguiVelaria(dataIT, oraIT, luogo, cmdKey);

    // ETERIA (tutte le varianti puntano allo stesso motore tecnico)
    case 'RETERIA':
    case 'RETERIAE':
    case 'RETERIAS':
      return await eseguiEteria(dataIT, oraIT, luogo, cmdKey);

    // VENERE
    case 'RVC':
      return eseguiVenereClassica(dataIT, oraIT, luogo, cmdKey);
    case 'RVA':
      return eseguiVenereAuroria(dataIT, oraIT, luogo, cmdKey);
    case 'RVV':
      return eseguiVenereVelaria(dataIT, oraIT, luogo, cmdKey);
    case 'RVETERIA':
      return eseguiVenereEteria(dataIT, oraIT, luogo, cmdKey);

    // IDENTIKIT
    case 'RVI':
      return eseguiIdentikit(dataIT, oraIT, luogo, cmdKey);

    default:
      return { output: '✨ Comando non riconosciuto.' };
  }
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
