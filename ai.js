import { calcolaOrariaAstrale } from './ephemeris.js';

// ai.js — motore interno di Studio Abigail (con luogo fisso gestito dinamicamente)

let luogoCorrente = "Montebelluna"; // valore iniziale predefinito

export function processCommand(text) {
  const cleaned = text.trim().toUpperCase().replace(/\./g, '');

  // Calcola automaticamente data e ora correnti
  const now = new Date();
  const data = now.toLocaleDateString('it-IT');
  const ora = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  // Elenco comandi operativi
  const comandi = [
    'RAE', 'RAS', 'REE', 'RES', 'RVE', 'RVS',
    'RETERIAE', 'RETERIAS', 'RVA', 'RVC', 'RVV', 'RVETERIA', 'RVI'
  ];

  // Controlla se l’input contiene la parola "LUOGO"
  if (cleaned.startsWith("LUOGO ")) {
    const nuovoLuogo = text.substring(6).trim();
    if (nuovoLuogo) {
      luogoCorrente = nuovoLuogo.charAt(0).toUpperCase() + nuovoLuogo.slice(1);
      return { output: `📍 Luogo impostato su ${luogoCorrente}.` };
    } else {
      return { output: "❗️Specificare un luogo dopo il comando 'LUOGO'." };
    }
  }

  // Se contiene un comando operativo
  const comando = comandi.find(cmd => cleaned.startsWith(cmd));
  if (comando) {
    return eseguiComando(comando, data, ora, luogoCorrente, text);
  }

  // Altrimenti, messaggio generico
  return { output: "🪶 In ascolto… formula non riconosciuta come comando operativo." };
}

// Funzione principale che genera la risposta base
function eseguiComando(cmd, data, ora, luogo, text) {
    const oraria = calcolaOrariaAstrale(data, ora, luogo);  return {
    output: `${cmd} eseguito — ${data}, ${ora}, ${luogo} — ${oraria.nota}.`
  };
}
