// ======================================================
// 🜂 RAE — Generatore di Scrittura Estesa (Auroria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';

// Funzione per scelta casuale ma coerente
function scegli(frasi = []) {
  return frasi[Math.floor(Math.random() * frasi.length)];
}

export async function generaRAE(data, ora, luogo, datiTecnici = {}) {
  // ————————————————————————————
  // BLOCCO 1 — Apertura del Campo
  // ————————————————————————————
  const aperture = [
    `Il campo si apre come un respiro che unisce i piani visibili e invisibili.`,
    `Un soffio di luce disegna lo spazio sacro dove il tempo si piega all’ascolto.`,
    `La visione si espande, delicata, come acqua che trova la sua forma naturale.`,
    `Il punto d’origine si manifesta: un cuore che pulsa e richiama la sua eco nel mondo.`
  ];
  const apertura = scegli(aperture);

  // ————————————————————————————
  // BLOCCO 2 — Centro del Movimento
  // ————————————————————————————
  const centri = [
    `Ogni particella di emozione si trasforma in direzione: Venere orienta la bellezza verso la manifestazione.`,
    `Un moto interiore traduce l’intuizione in gesto, e il gesto in presenza.`,
    `Il cuore diventa bussola, e l’energia trova la sua traiettoria silenziosa.`,
    `Dalla quiete nasce il moto, e dal moto la nuova armonia del sentire.`
  ];
  const centro = scegli(centri);

  // ————————————————————————————
  // BLOCCO 3 — Polarità e Direzione
  // ————————————————————————————
  const polaritaBlocchi = [
    `Due forze si incontrano: la spinta e l’accoglienza, il sapere e il sentire.`,
    `La volontà incontra il fluire, e ciò che appariva conflitto diventa danza.`,
    `Nell’asse del cuore la dualità si dissolve e resta solo la linea dell’essere.`,
    `L’intenzione si curva in accettazione, e il desiderio diventa offerta.`
  ];
  const polarita = scegli(polaritaBlocchi);

  // ————————————————————————————
  // BLOCCO 4 — Trasmissione del Segnale
  // ————————————————————————————
  const trasmissioni = [
    `Un impulso percorre la trama sottile, restituendo coerenza e silenzio.`,
    `Il segnale vibra attraverso i corpi sottili: dove c’era peso, ora c’è ritmo.`,
    `La memoria si risveglia nel corpo: la frequenza è pronta a farsi parola.`,
    `La vibrazione si riallinea: la risposta è già nel respiro che segue.`
  ];
  const trasmissione = scegli(trasmissioni);

  // ————————————————————————————
  // BLOCCO 5 — Ritorno e Quiete
  // ————————————————————————————
  const ritorni = [
    `Tutto torna alla sua origine, limpido e riconosciuto.`,
    `Il cerchio si chiude in un punto di luce, dove tutto riposa.`,
    `La corrente si placa, e resta soltanto la gratitudine del movimento compiuto.`,
    `Il ritmo rientra nel cuore, e la visione si trasforma in pace silenziosa.`
  ];
  const ritorno = scegli(ritorni);

  // ————————————————————————————
  // SINTESI (100 parole)
  // ————————————————————————————
  const sintesi = `L’energia ritrova il suo asse. 
  Ciò che si è mosso trova pace, ciò che si è taciuto trova voce. 
  Ogni impulso si riconnette al suo scopo e la visione si stabilizza nel cuore. 
  Il campo vibra in equilibrio, mentre il tempo si apre al suo ritmo naturale. 
  Ogni forma si scioglie nella luce che l’ha generata.`;

  // ————————————————————————————
  // CHIUSURA + TABELLA TECNICA
  // ————————————————————————————
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // ————————————————————————————
  // COMPOSIZIONE TESTO COMPLETO
  // ————————————————————————————
  const testoFinale = [
    apertura,
    '',
    centro,
    '',
    polarita,
    '',
    trasmissione,
    '',
    ritorno,
    '',
    `🔹 Sintesi: ${sintesi}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RAE generata correttamente');
  return { output: testoFinale };
}

export default { generaRAE };
