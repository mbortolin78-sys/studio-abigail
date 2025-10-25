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
case 'RETERIA':
case 'RETERIAE':
case 'RETERIAS':
  return await eseguiEteria(data, ora, luogoCorrente, comando);

   // venere_classica_tecnico.js
export function eseguiVenereClassica(data, ora, luogo, comando) {
  console.log(`💫 Avvio calcolo VENERE CLASSICA — ${comando}`);
  return { output: `💫 Metodo VENERE CLASSICA attivo (${comando}) — ${ora}, ${luogo}` };
}

// venere_auroria_tecnico.js
export function eseguiVenereAuroria(data, ora, luogo, comando) {
  console.log(`💫 Avvio calcolo VENERE AURORIA — ${comando}`);
  return { output: `💫 Metodo VENERE AURORIA attivo (${comando}) — ${ora}, ${luogo}` };
}

// venere_velaria_tecnico.js
export function eseguiVenereVelaria(data, ora, luogo, comando) {
  console.log(`💫 Avvio calcolo VENERE VELARIA — ${comando}`);
  return { output: `💫 Metodo VENERE VELARIA attivo (${comando}) — ${ora}, ${luogo}` };
}

// venere_eteria_tecnico.js
export function eseguiVenereEteria(data, ora, luogo, comando) {
  console.log(`💫 Avvio calcolo VENERE ETERIA — ${comando}`);
  return { output: `💫 Metodo VENERE ETERIA attivo (${comando}) — ${ora}, ${luogo}` };
}

// identikit_tecnico.js
export function eseguiIdentikit(data, ora, luogo, comando) {
  console.log(`🪞 Avvio IDENTIKIT — ${comando}`);
  return { output: `🪞 Metodo IDENTIKIT attivo (${comando}) — ${ora}, ${luogo}` };
}
