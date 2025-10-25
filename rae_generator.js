// ======================================================
// 🜂 RAE — Generatore di Scrittura Estesa (Auroria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js'; // modulo che genera la tabella finale

export async function generaRAE(data, ora, luogo, datiTecnici = {}) {
  // BLOCCO 1 — Apertura del Campo
  const apertura = `Ho aperto il campo in ascolto della tua linea energetica, 
  e la visione si manifesta come un respiro che unisce tempo e presenza. 
  Le forze in moto si organizzano attorno al punto del cuore, richiamando l’origine del movimento.`;

  // BLOCCO 2 — Centro del Movimento
  const centro = `Ciò che vibra ora è una matrice luminosa: un campo che traduce emozione in direzione. 
  Ogni immagine interiore prende forma attraverso il simbolo, 
  e le onde di Venere disegnano ponti tra intuizione e manifestazione.`;

  // BLOCCO 3 — Polarità e Direzione
  const polarita = `Nel centro della visione si aprono due polarità: 
  il desiderio di comprendere e la necessità di lasciar fluire. 
  Le tensioni si dissolvono nel momento in cui la volontà si arrende alla frequenza del cuore.`;

  // BLOCCO 4 — Trasmissione del Segnale
  const trasmissione = `Il segnale attraversa la trama del corpo sottile, 
  portando chiarezza dove prima c’era confusione. 
  La risposta non arriva dalla mente, ma dal silenzio che segue il riconoscimento.`;

  // BLOCCO 5 — Ritorno e Quiete
  const ritorno = `Ora il campo si chiude in equilibrio. 
  La linea si allinea al respiro, e ciò che resta è la memoria del ritmo giusto. 
  Tutto torna al punto d’origine, come eco gentile di ciò che è stato compreso.`;

  // SINTESI (≈100 parole)
  const sintesi = `Ritorno al centro dell’ascolto. 
  L’energia si pacifica, la visione si fa limpida e i piani si riallineano alla verità interiore. 
  Ogni forma si dissolve nel suo principio di luce, e la coscienza torna a fluire libera. 
  Nulla è perso: ogni frammento trova casa, ogni domanda la sua quiete.`;

  // CHIUSURA + TABELLAA TECNICA
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // COMPOSIZIONE TESTO COMPLETO
  const testoFinale = [
    apertura.trim(),
    '',
    centro.trim(),
    '',
    polarita.trim(),
    '',
    trasmissione.trim(),
    '',
    ritorno.trim(),
    '',
    `🔹 Sintesi: ${sintesi}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RAE generata correttamente');
  return { output: testoFinale };
}

export default { generaRAE };
