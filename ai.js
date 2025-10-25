// ai.js — Motore di riconoscimento e instradamento dei comandi operativi

// Importa i metodi principali
import { eseguiAuroria } from './auroria_tecnico.js';
import { eseguiEcho } from './echo_tecnico.js';
import { eseguiVelaria } from './velaria_tecnico.js';
import { eseguiEteria } from './eteria_tecnico.js';
import { eseguiVenereClassica } from './venere_classica_tecnico.js';
import { eseguiVenereAuroria } from './venere_auroria_tecnico.js';
import { eseguiVenereVelaria } from './venere_velaria_tecnico.js';
import { eseguiVenereEteria } from './venere_eteria_tecnico.js';
import { eseguiIdentikit } from './identikit_tecnico.js';

// ────────────────────────────────────────────────
// FUNZIONE PRINCIPALE
// ────────────────────────────────────────────────

export async function processCommand(text) {
  if (!text || text.trim() === '') {
    return { output: "🪶 Inserisci un comando o una domanda." };
  }

  // Normalizza testo (rimuove punti, spazi e converte in maiuscolo)
  const comando = text.replace(/\./g, '').trim().toUpperCase();

  // Data, ora e luogo automatici
  const data = new Date();
  const ora = data.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  const luogoCorrente = "Montebelluna"; // luogo predefinito

  // ───────────────────────────────
  // ROUTER DEI COMANDI
  // ───────────────────────────────
  switch (comando) {

    // 🌞 AURORIA
    case 'RAS':
    case 'RAE':
      return eseguiAuroria(data, ora, luogoCorrente, comando);

    // 🌊 ECHO
    case 'RES':
    case 'REE':
      return eseguiEcho(data, ora, luogoCorrente, comando);

    // 🌬 VELARIA
    case 'RVS':
    case 'RVE':
      return eseguiVelaria(data, ora, luogoCorrente, comando);

    // ✴ ETERIA
case 'RETERIAE':
case 'RETERIAS':
  return await eseguiEteria(data, ora, luogoCorrente, comando);

    // 💫 VENERE — CLASSICA
    case 'RVC':
      return eseguiVenereClassica(data, ora, luogoCorrente, comando);

    // 💫 VENERE — AURORIA
    case 'RVA':
      return eseguiVenereAuroria(data, ora, luogoCorrente, comando);

    // 💫 VENERE — VELARIA
    case 'RVV':
      return eseguiVenereVelaria(data, ora, luogoCorrente, comando);

    // 💫 VENERE — ETERIA
    case 'RVETERIA':
      return eseguiVenereEteria(data, ora, luogoCorrente, comando);

    // 🌙 IDENTIKIT
    case 'RVI':
      return eseguiIdentikit(data, ora, luogoCorrente, comando);

    // 🪶 Default
    default:
      return { output: "✨ Formula non riconosciuta come comando operativo." };
  }
}
