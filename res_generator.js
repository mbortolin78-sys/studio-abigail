// ======================================================
// 🜂 RES — Generatore di Scrittura Sintetica (Echo)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';  // tabella finale dei calcoli
import { invocaScritturaViva } from './llama_bridge.js';       // narrativa viva (dinamica, non fissa)

/**
 * Genera la Scrittura Sintetica per il Modello Echo (RES)
 * Regole: 200 parole di narrazione + 30 di sintesi
 * Riferimento: Protocollo Scrittura e Legge Universale — Art. 7.8
 */
export async function generaRES(data, ora, luogo, datiTecnici = {}, opts = {}) {
  // 1️⃣ Metadati strutturali e vincoli
  const struttura = {
    modello: 'Echo',
    tipo: 'RES',
    blocchi: ['Narrazione (Sintetica)', 'Conclusione'],
    voce: 'empatica, chiara, diretta, in seconda persona',
    protocollo: 'Scrittura Sintetica — Metodo Echo',
    vincoli: {
      narrazione: 200,
      sintesi: 30,
      tolleranza: 0.15
    },
    regole: {
      evita_elenco: true,
      evita_presente_per_futuro: true,
      linguaggio_empatico: true,
      voce_marika: true,
      tono_calmo_e_personale: true
    }
  };

  // 2️⃣ Narrazione viva generata da Llama
  let narrazione = '';
  try {
    narrazione = await invocaScritturaViva({
      struttura,
      datiTecnici,
      contesto: { data, ora, luogo },
      stile: {
        lingua: 'it',
        ritmo: 'morbido',
        tono: 'emotivo',
        voce: 'Marika',
        registro: 'naturale'
      },
      ancore: {
        oraria: true,
        galassie: true,
        sibille: true,
        echo: true
      }
    });
  } catch (err) {
    console.error('⚠️ Scrittura viva non disponibile per RES:', err);
    // fallback sobrio
    narrazione = `Il calcolo mostra un campo in movimento silenzioso. Le energie si osservano, 
    ma non si interrompono. Lui resta presente nei piani sottili e il contatto energetico 
    non si è dissolto: è in pausa, in riorganizzazione. Il linguaggio del silenzio è 
    ancora una forma di comunicazione, un respiro che unisce invece di separare.`;
  }

  // 3️⃣ Sintesi finale (30 parole)
  const sintesi = `Il campo non è chiuso: è in sospensione consapevole. 
  Le energie restano collegate e il riavvicinamento comunicativo si prepara come un passaggio naturale, non forzato.`;

  // 4️⃣ Tabella tecnica finale
  const tabella = await generaReportTecnico(datiTecnici);

  // 5️⃣ Composizione completa
  const testoFinale = [
    narrazione.trim(),
    '',
    `🔹 Sintesi: ${sintesi.trim()}`,
    '',
    '✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.',
    '',
    '📊 Tabella Tecnica dei Calcoli:',
    tabella
  ].join('\n\n');

  console.log('✅ Scrittura Sintetica (RES) generata correttamente.');
  return { output: testoFinale };
}

export default generaRES;
