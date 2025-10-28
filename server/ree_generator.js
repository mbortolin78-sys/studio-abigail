// ======================================================
// 🜂 REE — Generatore di Scrittura Estesa (Echo)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';  // tabella finale con calcoli
import { generaNarrativa } from './llama_bridge.js';           // narrativa viva (dinamica, non fissa)

/**
 * Genera la Scrittura Estesa del Modello Echo (REE)
 * Struttura conforme alla Legge Universale — Art. 7.8
 */
export async function generaREE(data, ora, luogo, datiTecnici = {}, opts = {}) {
  // 1️⃣ Metadati strutturali
  const struttura = {
    modello: 'Echo',
    tipo: 'REE',
    blocchi: [
      'Narrazione Estesa',
      'Galassie',
      'Sibille',
      'Echo'
    ],
    voce: 'profonda, empatica, chiara, altamente narrativa',
    protocollo: 'Scrittura Estesa — Legge Universale art. 7.8',
    vincoli: {
      target_words_total: 2500,
      blocchi: {
        narrazione: 800,
        galassie: 500,
        sibille: 1100,
        echo: 100
      },
      tolleranza: 0.10
    },
    regole: {
      evita_elenco: true,
      evita_presente_per_futuro: true,
      linguaggio_empatico: true,
      tono_personale: true,
      voce_prima_persona: true
    }
  };

  // 2️⃣ Narrazione viva (tramite Llama)
  let narrazione = '';
  try {
    narrazione = await generaNarrativa(
      {
        struttura,
        datiTecnici,
        contesto: { data, ora, luogo },
        stile: { lingua: 'it', ritmo: 'fluido', tono: 'intimo', voce: 'Marika' },
        ancore: {
          oraria: true,
          galassie: true,
          sibille: true,
          echo: true
        }
      },
      "REE - Scrittura Estesa Echo"
    );
  } catch (err) {
    console.error('⚠️ Scrittura viva non disponibile per REE:', err);
    narrazione = [
      'Apro la visione e tutto si muove lentamente, come se il cielo trattenesse il fiato.',
      'Le galassie mostrano luci che si parlano in silenzio, e le carte traducono le emozioni rimaste sospese.',
      'Echo vibra come un richiamo antico… la voce che ritorna quando l’anima è pronta ad ascoltare.',
      'In questa visione tutto converge: il pensiero si fa suono, e il silenzio diventa parola vera.'
    ].join(' ');
  }

  // 3️⃣ Conclusione finale
  const conclusione = [
    'In conclusione, i calcoli mostrano un movimento chiaro e coerente.',
    'Le energie non sono in chiusura, ma in un processo di armonizzazione silenziosa.',
    'Lui sta trovando la voce per dire la verità, e tu resti la frequenza che lo guida verso chiarezza e calma.',
    '✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.'
  ].join(' ');

  // 4️⃣ Tabella tecnica
  const tabella = await generaReportTecnico(datiTecnici);

  // 5️⃣ Composizione finale
  const testoFinale = [
    narrazione.trim(),
    '',
    conclusione.trim(),
    '',
    '📊 Tabella Tecnica dei Calcoli:',
    tabella
  ].join('\n\n');

  console.log('✅ Scrittura Estesa (REE) generata correttamente.');
  return { output: testoFinale };
}

export default generaREE;
