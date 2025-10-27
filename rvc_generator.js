// ======================================================
// ♀️ RVC — Generatore di Scrittura Estesa (Venere Classica Purificata 2025)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { generaNarrativa } from './llama_bridge.js'; // motore narrativo dinamico

export async function generaRVC(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO 1 — Tema Natale
  const temaNatale = await generaNarrativa(
    {
      tema: 'tema natale venere classica',
      contesto:
        'analisi del cielo base, introduzione alla linea affettiva e costruzione della giornata come sequenza di percezioni e segnali',
      tono: 'empatico, analitico e discorsivo',
      parole: 700,
      energia:
        'apertura del campo, riconoscimento dell’asse Venere–Luna e lettura della base energetica relazionale',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVC - Tema Natale"
  );

  // ===== BLOCCO 2 — Venaria
  const venaria = await generaNarrativa(
    {
      tema: 'venaria venere classica',
      contesto:
        'descrizione dei fasci luminosi e dei rami di contatto, con dettagli su chi agisce, come e perché',
      tono: 'realistico, sensoriale, con precisione nei movimenti e nei tempi',
      parole: 700,
      energia:
        'fasci Sirio, Andromeda, Marte e Aldebaran che definiscono il campo attivo e le modalità di contatto',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVC - Venaria"
  );

  // ===== BLOCCO 3 — Oraria Classica
  const oraria = await generaNarrativa(
    {
      tema: 'oraria classica venere',
      contesto:
        'descrizione discorsiva e umana degli eventi della giornata, canali di comunicazione, finestre temporali e movimenti reciproci',
      tono: 'concreto, chiaro e coerente',
      parole: 800,
      energia:
        'timeline oraria reale, sviluppo della comunicazione e dei segnali concreti che emergono dal campo',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVC - Oraria Classica"
  );

  // ===== BLOCCO 4 — Aldebaran
  const aldebaran = await generaNarrativa(
    {
      tema: 'aldebaran venere classica',
      contesto:
        'rielaborazione finale, con passaggio dall’oraria all’oraria evoluta e lettura dei canali pratici (messaggi, incontri, riavvicinamenti)',
      tono: 'armonico, risolutivo e realistico',
      parole: 800,
      energia:
        'ricomposizione del quadro e definizione della direzione affettiva o relazionale',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVC - Aldebaran"
  );

  // ===== CONCLUSIONE (≈100 parole)
  const conclusione = await generaNarrativa(
    {
      tema: 'conclusione venere classica',
      contesto:
        'sintesi chiara e diretta che esprime l’esito energetico e pratico della stesura, distinguendo i tipi di riavvicinamento',
      tono: 'deciso e pacifico',
      parole: 100,
      energia:
        'chiusura dei piani, definizione del tipo di contatto (emotivo, comunicativo, fisico) e pacificazione energetica',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVC - Conclusione"
  );

  // ===== CHIUSURA TECNICA =====
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(
    datiTecnici
  )}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    temaNatale.trim(),
    '',
    venaria.trim(),
    '',
    oraria.trim(),
    '',
    aldebaran.trim(),
    '',
    `🔹 Conclusione: ${conclusione.trim()}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RVC (Venere Classica) generata correttamente');
  return { output: testoFinale };
}

export default generaRVC;
