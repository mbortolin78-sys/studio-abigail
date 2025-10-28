// ======================================================
// 🜂 RAE — Generatore Strutturale Esteso (Auroria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';  // genera la tabella finale
import { generaNarrativa } from './llama_bridge.js';           // invoca la narrativa viva

// ✦ Funzione principale per generare la RAE
export async function generaRAE(data, ora, luogo, datiTecnici = {}) {
  // 1️⃣ Prepara i blocchi strutturali
  const struttura = {
    modello: 'Auroria',
    tipo: 'RAE',
    blocchi: ['Oraria Classica', 'Galassie', 'Sibille', 'Conclusione'],
    voce: 'integrata, empatica, diretta',
    protocollo: 'Scrittura Estesa — Legge Universale art. 7.8'
  };

  // 2️⃣ Esegue la narrazione viva tramite Llama
  const narrazione = await generaNarrativa(
    {
      struttura,
      datiTecnici,
      contesto: { data, ora, luogo }
    },
    "RAE - Lettura Energetica Estesa"
  );

  // 3️⃣ Tabella tecnica dei calcoli
  const tabella = await generaReportTecnico(datiTecnici);

  // 4️⃣ Composizione finale
  const testoFinale = [
    narrazione.trim(),
    '',
    '✨ Tabella Tecnica dei Calcoli:',
    tabella
  ].join('\n\n');

  console.log('✅ Scrittura Estesa (RAE) generata correttamente.');
  return { output: testoFinale };
}

// ✦ Export principali
export default generaRAE;

// ✦ Alias per compatibilità con moduli precedenti
// (serve perché alcuni file più vecchi cercano ancora “generaStesuraRAE”)
export const generaStesuraRAE = generaRAE;
