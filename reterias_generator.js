// ======================================================
// ♀️ REteriaS — Generatore di Scrittura Sintetica (Eteria Sintetica)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// Scrittura viva e discorsiva (≈200 parole + 30 di sintesi)
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js'; // modulo per la narrazione dinamica

export async function generaREteriaS(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO UNICO — NARRAZIONE SINTETICA =====
  const narrazione = await invocaScritturaViva({
    tema: 'eteria sintetica',
    contesto:
      'narrazione viva e fluida della lettura energetica Eteria, integrando Oraria Classica, Galassie, Salto Quantico e Oracoli in un flusso continuo',
    tono: 'empatico, diretto, discorsivo e analitico',
    stile:
      'prima persona singolare, linguaggio semplice e umano, senza elenchi né numerazioni',
    parole: 200,
    energia:
      'fusione del campo Eteria, movimento tra cielo, stelle e oracoli verso la chiarezza affettiva e interiore',
  });

  // ===== CONCLUSIONE (≈30 parole) =====
  const conclusione = await invocaScritturaViva({
    tema: 'conclusione eteria sintetica',
    contesto:
      'chiusura chiara e pacifica che raccoglie il messaggio centrale dei calcoli e del campo energetico',
    tono: 'armonico e consapevole',
    parole: 30,
    energia: 'distillato finale della trasformazione e della quiete dopo la visione',
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

  console.log('✅ Scrittura REteriaS (Eteria Sintetica) generata correttamente');
  return { output: testoFinale };
}

export default generaRAS;
