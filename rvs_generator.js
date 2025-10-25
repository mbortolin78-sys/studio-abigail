// ======================================================
// ♀️ RVS — Generatore di Scrittura Sintetica (Velaria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// Narrazione viva e variabile, senza blocchi fissi
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js'; // modulo per generare scrittura dinamica

export async function generaRVS(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO UNICO NARRATIVO (≈200 parole) =====
  const narrazione = await invocaScritturaViva({
    tema: 'velaria sintetica',
    contesto:
      'integrazione di Oraria Classica, Galassiale e Tarocchi, in chiave sintetica e discorsiva',
    tono: 'empatico, diretto, lucido',
    stile: 'narrativo continuo, senza blocchi o titoli',
    parole: 200,
    energia: 'fusione di Venere e Aldebaran in campo orario',
  });

  // ===== CONCLUSIONE (≈30 parole) =====
  const conclusione = await invocaScritturaViva({
    tema: 'conclusione velaria sintetica',
    contesto: 'chiusura del racconto tecnico e percettivo',
    tono: 'armonico e consapevole',
    parole: 30,
    energia: 'riequilibrio del flusso informativo sotto la Legge Universale',
  });

  // ===== CHIUSURA TECNICA =====
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(
    datiTecnici
  )}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    narrazione.trim(),
    '',
    `🔹 Conclusione: ${conclusione.trim()}`,
    '',
    finale,
  ].join('\n');

  console.log('✅ Scrittura RVS (Velaria Sintetica) generata correttamente');
  return { output: testoFinale };
}

export default { generaRVS };
