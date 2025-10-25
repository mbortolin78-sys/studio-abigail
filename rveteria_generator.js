// ======================================================
// ♀️ RVE — Generatore di Scrittura Estesa (Venere Eteria Purificata 2025)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js';  // motore narrativo dinamico

export async function generaRVE(data, ora, luogo, datiTecnici = {}) {

  // ===== BLOCCO 1 — TEMA NATALE =====
  const temaNatale = await invocaScritturaViva({
    tema: 'tema natale venere eteria',
    contesto:
      'introduzione narrativa della linea energetica del consultante, con descrizione discorsiva del campo affettivo e delle forze planetarie di base',
    tono: 'empatico, diretto e fluido',
    parole: 700,
    energia:
      'riconoscimento del punto d’origine del movimento affettivo e mentale, con spiegazione chiara del campo di riferimento',
  });

  // ===== BLOCCO 2 — VENARIA =====
  const venaria = await invocaScritturaViva({
    tema: 'venaria venere eteria',
    contesto:
      'descrizione discorsiva dei fasci Sirio–Andromeda–Marte–Aldebaran, narrazione del contatto e delle sue forme (dirette, indirette, portali digitali o esoterici)',
    tono: 'vivo, realistico e analitico',
    parole: 700,
    energia:
      'interpretazione energetica dei canali di scambio e delle polarità in atto, spiegando come i fasci costruiscono o dissolvono il contatto',
  });

  // ===== BLOCCO 3 — ETERIA =====
  const eteria = await invocaScritturaViva({
    tema: 'eteria venere eteria',
    contesto:
      'narrazione viva della proiezione galattica, con visione degli eventi su scala energetica, temporale e comunicativa; spiega cosa accade e perché, secondo la linea dei calcoli',
    tono: 'discorsivo e analitico con linguaggio semplice e coerente',
    parole: 800,
    energia:
      'sviluppo della timeline oraria: descrizione continua delle finestre, dei movimenti reciproci, dei contatti, dei silenzi e dei segnali in sequenza naturale',
  });

  // ===== BLOCCO 4 — ALDEBARAN =====
  const aldebaran = await invocaScritturaViva({
    tema: 'aldebaran venere eteria',
    contesto:
      'rielaborazione finale del calcolo, integrazione tra piano tecnico e piano umano, con distinzione chiara fra riavvicinamento emotivo, comunicativo o fisico',
    tono: 'sereno, lucido, risolutivo',
    parole: 800,
    energia:
      'chiusura del campo e traduzione dei calcoli in esito pratico e comprensibile, con messa a fuoco del tipo di contatto in atto',
  });

  // ===== CONCLUSIONE (≈ 100 parole) =====
  const conclusione = await invocaScritturaViva({
    tema: 'conclusione venere eteria',
    contesto:
      'sintesi breve e chiara della stesura, con indicazione esplicita del tipo di riavvicinamento (emotivo, comunicativo o fisico) secondo la Legge Universale 7.6',
    tono: 'diretto e pacificato',
    parole: 100,
    energia:
      'chiarimento totale del quadro e riequilibrio del campo dopo la lettura',
  });

  // ===== CHIUSURA TECNICA =====
  const finale =
    `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    temaNatale.trim(),
    '',
    venaria.trim(),
    '',
    eteria.trim(),
    '',
    aldebaran.trim(),
    '',
    `🔹 Conclusione: ${conclusione.trim()}`,
    '',
    finale,
  ].join('\n');

  console.log('✅ Scrittura RVE (Venere Eteria) generata correttamente');
  return { output: testoFinale };
}

export default { generaRVE };
