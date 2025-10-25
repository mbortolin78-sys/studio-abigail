// ai.js — Router comandi operativi (versione stabile 2025-10-25)
// Metodo Marika — Studio Abigail

// ======================================================
// IMPORT PRINCIPALI
// ======================================================
import { eseguiAuroria } from './auroria_tecnico.js';
import { eseguiEcho } from './echo_tecnico.js';
import { eseguiVelaria } from './velaria_tecnico.js';
import { eseguiEteria } from './eteria_tecnico.js';
import { eseguiVenereClassica } from './venere_classica_tecnico.js';
import { eseguiVenereAuroria } from './venere_auroria_tecnico.js';
import { eseguiVenereVelaria } from './venere_velaria_tecnico.js';
import { eseguiVenereEteria } from './venere_eteria_tecnico.js';
import { eseguiIdentikit } from './identikit_tecnico.js';

// ======================================================
// FUNZIONI DI UTILITÀ
// ======================================================
function normalizeCommand(text = '') {
  return String(text || '')
    .replace(/\./g, '')   // rimuove i punti
    .replace(/\s+/g, '')  // rimuove gli spazi
    .trim()
    .toUpperCase();
}

function nowPieces() {
  const now = new Date();
  const dataIT = now.toLocaleDateString('it-IT');
  const oraIT = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  const luogo = 'Montebelluna';
  return [now, dataIT, oraIT, luogo];
}

// ======================================================
// ROUTER PRINCIPALE
// ======================================================
export async function processCommand(text) {
  if (!text || !text.trim()) {
    return { output: '🪶 Inserisci un comando o una domanda.' };
  }

  const comando = normalizeCommand(text);
  const [now, dataIT, oraIT, luogo] = nowPieces();

  console.log('🛰️ Comando ricevuto:', comando);

  try {
    switch (comando) {
      // ✦ AURORIA
      case 'RAS':
      case 'RAE':
        return await eseguiAuroria(dataIT, oraIT, luogo, comando);

      // ✦ ECHO
      case 'RES':
      case 'REE':
        return await eseguiEcho(dataIT, oraIT, luogo, comando);

      // ✦ VELARIA
      case 'RVS':
      case 'RVE':
        return await eseguiVelaria(dataIT, oraIT, luogo, comando);

      // ✦ ETERIA
      case 'RETERIAE':
      case 'RETERIAS':
        console.log('✅ Eteria riconosciuta, eseguo eseguiEteria...');
        return await eseguiEteria(dataIT, oraIT, luogo, comando);

      // ✦ VENERE CLASSICA
      case 'RVC':
        return await eseguiVenereClassica(dataIT, oraIT, luogo, comando);

      // ✦ VENERE AURORIA
      case 'RVA':
        return await eseguiVenereAuroria(dataIT, oraIT, luogo, comando);

      // ✦ VENERE VELARIA
      case 'RVV':
        return await eseguiVenereVelaria(dataIT, oraIT, luogo, comando);

      // ✦ VENERE ETERIA
      case 'RVETERIA':
        return await eseguiVenereEteria(dataIT, oraIT, luogo, comando);

      // ✦ IDENTIKIT
      case 'RVI':
        return await eseguiIdentikit(dataIT, oraIT, luogo, comando);

      // ❌ Default
      default:
        console.warn('❌ Comando non riconosciuto:', comando);
        return { output: '✨ Formula non riconosciuta come comando operativo.' };
    }
  } catch (err) {
    console.error('❌ Errore processCommand:', err);
    return { output: `❌ Errore interno: ${err.message}` };
  }
}
