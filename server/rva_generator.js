// ======================================================
// ♀️ RVA — Generatore di Scrittura Estesa (Venere Auroria Purificata 2025)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { generaNarrativa } from './llama_bridge.js'; // motore narrativo dinamico

export async function generaRVA(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO 1 — Tema Natale
  const temaNatale = await generaNarrativa(
    {
      tema: 'tema natale venere auroria',
      contesto:
        'narrazione viva che apre la lettura e descrive le energie affettive e mentali del consultante, i punti di partenza e le percezioni iniziali del campo',
      tono: 'empatico, analitico e discorsivo',
      parole: 700,
      energia:
        'riconoscimento del centro energetico e dei legami affettivi principali, con accenni al movimento della giornata',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Tema Natale"
  );

  // ===== BLOCCO 2 — Venaria
  const venaria = await generaNarrativa(
    {
      tema: 'venaria venere auroria',
      contesto:
        'descrizione fluida e narrativa dei fasci luminosi, delle connessioni attive e dei canali di contatto reali o simbolici, con riferimenti ai tempi e alle intenzioni',
      tono: 'realistico, sensibile, diretto',
      parole: 700,
      energia:
        'Sirio, Andromeda, Marte e Aldebaran come vettori di interazione e risveglio del dialogo affettivo',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Venaria"
  );

  // ===== BLOCCO 3 — Auroria
  const auroria = await generaNarrativa(
    {
      tema: 'auroria venere auroria',
      contesto:
        'sviluppo della linea temporale concreta: finestre orarie, eventi, messaggi, movimenti del campo e della persona osservata, come fossero fotogrammi in sequenza',
      tono: 'discorsivo, realistico e coerente',
      parole: 800,
      energia:
        'manifestazione progressiva del contatto e dei segnali diretti, interpretati come fasi di ricomposizione energetica',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Auroria"
  );

  // ===== BLOCCO 4 — Aldebaran
  const aldebaran = await generaNarrativa(
    {
      tema: 'aldebaran venere auroria',
      contesto:
        'integrazione finale, traduzione dei movimenti in comprensione pratica, individuazione del tipo di riavvicinamento (emotivo, comunicativo o fisico)',
      tono: 'armonico, chiaro e risolutivo',
      parole: 800,
      energia:
        'allineamento del piano pratico e simbolico in chiusura del calcolo, con comprensione completa della dinamica relazionale',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Aldebaran"
  );

  // ===== CONCLUSIONE (≈100 parole)
  const conclusione = await generaNarrativa(
    {
      tema: 'conclusione venere auroria',
      contesto:
        'sintesi finale che riassume la direzione della stesura e la qualità del movimento, esplicitando la forma del riavvicinamento',
      tono: 'sereno e diretto',
      parole: 100,
      energia:
        'chiusura del cerchio, riconciliazione dei piani e quiete del campo affettivo',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Conclusione"
  );

  // ===== IDENTIKIT (≈550 parole)
  const identikit = await generaNarrativa(
    {
      tema: 'identikit venere auroria',
      contesto:
        'descrizione specifica della presenza rilevata, con analisi empatica e caratteriale della figura collegata al consultante',
      tono: 'analitico, caldo e realistico',
      parole: 550,
      energia:
        'riconoscimento del canale di fondo, lettura delle intenzioni e definizione della natura reale o imitativa della presenza energetica',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVA - Identikit"
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
    auroria.trim(),
    '',
    aldebaran.trim(),
    '',
    `🔹 Conclusione: ${conclusione.trim()}`,
    '',
    `🔹 Identikit: ${identikit.trim()}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RVA (Venere Auroria) generata correttamente');
  return { output: testoFinale };
}

export default generaRVA;
