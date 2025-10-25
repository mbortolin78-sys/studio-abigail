// ======================================================
// ♀️ REteriaE — Generatore di Scrittura Estesa (Venere Eteria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// Narrazione viva, integrata con calcoli di Oraria, Galassie, Salto Quantico e Oracoli
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js'; // modulo narrativo dinamico

export async function generaREteriaE(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO 1 — Apertura Energetica (Oraria Classica)
  const blocco1 = await invocaScritturaViva({
    tema: 'apertura energetica eteria',
    contesto:
      'descrizione fluida della base oraria, del cielo, delle energie in transito e delle prime percezioni del campo',
    tono: 'empatico, introspettivo, reale',
    parole: 600,
    energia: 'connessione iniziale al respiro del consultante e alle case attive',
  });

  // ===== BLOCCO 2 — Espansione Galattica (Proiezione Galattica)
  const blocco2 = await invocaScritturaViva({
    tema: 'espansione galattica eteria',
    contesto:
      'narrazione delle galassie attive, delle stelle accese e del loro significato in relazione al consultante',
    tono: 'visionario ma lucido',
    parole: 600,
    energia: 'Andromeda, Sirio, Taurus e Michelaus in moto sincronico',
  });

  // ===== BLOCCO 3 — Salto Quantico (Passato/Presente/Futuro)
  const blocco3 = await invocaScritturaViva({
    tema: 'salto quantico eteria',
    contesto:
      'descrizione dei tre piani temporali, il modo in cui le informazioni si spostano e riorganizzano nei fasci attivi',
    tono: 'profondo e simbolico ma sempre concreto',
    parole: 650,
    energia: 'movimento tridimensionale dei piani temporali, legato al cuore del consultante',
  });

  // ===== BLOCCO 4 — Sintesi Operativa (Oracoli + Aldebaran)
  const blocco4 = await invocaScritturaViva({
    tema: 'sintesi operativa eteria',
    contesto:
      'rielaborazione delle informazioni emerse, tradotte in realtà percettiva e comprensione della linea affettiva o personale',
    tono: 'chiaro, armonico e risolutivo',
    parole: 650,
    energia: 'fusione finale tra Oraria e Aldebaran sotto le Leggi Universali',
  });

  // ===== CONCLUSIONE (≈100 parole)
  const conclusione = await invocaScritturaViva({
    tema: 'conclusione eteria',
    contesto:
      'chiusura del cerchio, integrazione dei piani, ritorno al centro del consultante con serenità e visione chiara',
    tono: 'calmo, pacifico, consapevole',
    parole: 100,
    energia: 'risonanza finale e quiete energetica',
  });

  // ===== CHIUSURA TECNICA =====
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(
    datiTecnici
  )}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    blocco1.trim(),
    '',
    blocco2.trim(),
    '',
    blocco3.trim(),
    '',
    blocco4.trim(),
    '',
    `🔹 Conclusione: ${conclusione.trim()}`,
    '',
    finale,
  ].join('\n');

  console.log('✅ Scrittura REteriaE (Eteria Estesa) generata correttamente');
  return { output: testoFinale };
}

export default { generaREteriaE };
