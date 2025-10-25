// ======================================================
// 🜃 RES — Scrittura Sintetica (Echo)
// Metodo Marika — Studio Abigail
// Conforme a: Legge Universale (Art. 7.8) e Protocollo Scrittura
// Struttura: Oraria Classica → Galassie → Sibille + Echo → Sintesi
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';

// ======================================================
// FUNZIONE PRINCIPALE
// ======================================================

export async function generaRES(data, ora, luogo, datiTecnici = {}) {

  // 🜂 NARRAZIONE (≈200 parole)
  const narrazione = `
Ho eseguito l’oraria in data ${data}, alle ${ora}, nel luogo di ${luogo}.
La figura mostra una vibrazione sospesa: l’energia è viva ma controllata, come se tutto si muovesse dentro un respiro trattenuto.
L’Ascendente apre un campo di attesa lucida, la Luna si pone in ascolto e Venere manifesta un sentimento autentico ma non espresso del tutto.
C’è emozione, ma anche una strategia di silenzio, una volontà di misurare il passo per non esporsi troppo.
L’oraria dice che la mente osserva e il cuore resta connesso, in un moto costante di riconoscimento reciproco.
Le galassie sostengono il legame su piani paralleli: Andromeda accende l’emozione, Sirio modula la parola, Taurus trattiene la concretezza, Michelaus custodisce il pensiero che non si spegne.
Nel piano delle Sibille, le immagini parlano di un contatto sottile che non è interrotto ma soltanto sospeso.
Echo si accende come una vibrazione che amplifica la voce silenziosa, il pensiero che torna, la presenza che si riflette nell’altro.
Ciò che tace non è spento… è solo in fase di rispecchiamento energetico.`;

  // 🜃 CONCLUSIONE (≈30 parole)
  const conclusione = `
In conclusione, la figura mostra un riavvicinamento comunicativo.
Il silenzio non è chiusura: è una pausa consapevole che prepara la parola, e l’energia resta viva e coerente.`;

  // ✨ CHIUSURA + REPORT TECNICO
  const chiusura = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // 🔹 COMPOSIZIONE FINALE
  const testoFinale = [
    narrazione.trim(),
    '',
    '🔹 Sintesi:',
    conclusione.trim(),
    '',
    chiusura.trim()
  ].join('\n');

  console.log('✅ Scrittura RES generata correttamente');
  return { output: testoFinale };
}

export default { generaRES };
