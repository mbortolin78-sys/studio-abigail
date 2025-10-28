// ======================================================
// 🜂 RAS — Generatore Strutturale Sintetico (Auroria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// - Nessun testo fisso: la narrazione è generata da Llama
// - Tabella tecnica dei calcoli in coda
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';  // tabella tecnica (oraria, galassie, ecc.)
import { generaNarrativa } from './llama_bridge.js';           // ponte verso il modello di scrittura

/**
 * Genera la RAS (Sintetica) per Auroria.
 * @param {string|Date} data
 * @param {string} ora
 * @param {string} luogo
 * @param {object} datiTecnici  // output dei motori tecnici (auroria_tecnico, ecc.)
 * @param {object} opts         // opzioni extra (es. stile, lingua)
 * @returns {Promise<{output: string}>}
 */
export async function generaRAS(data, ora, luogo, datiTecnici = {}, opts = {}) {
  // 1) Metadati di struttura per il motore di scrittura
  const struttura = {
    modello: 'Auroria',
    tipo: 'RAS',
    blocchi: [
      'Apertura rapida di campo',
      'Centro/immagine dominante',
      'Direzione operativa (cosa/chi/dove/perché)',
      'Indicazioni pratiche',
      'Sintesi breve'
    ],
    voce: 'chiara, essenziale, empatica, non ripetitiva',
    protocollo: 'Scrittura Sintetica — Legge Universale art. 7.8',
    vincoli: {
      target_words_main: 100,
      target_words_synthesis: 30,
      tolleranza: 0.15
    },
    antiRipetizione: {
      vieta_frasi_template: true,
      varia_soggetti: true,
      usa_sinonimi: true,
      evita_ripetizione_ascendente: true
    }
  };

  // 2) Chiamata al motore di scrittura (narrazione viva)
  let narrazione = '';
  try {
    narrazione = await generaNarrativa(
      {
        struttura,
        datiTecnici,
        contesto: { data, ora, luogo },
        stile: { lingua: 'it', formale: false, seconda_persona: true, ritmo: 'scorrevole' },
        ancore: {
          oraria: true,
          galassie: true,
          carte: true,
          saltoQuantico: true,
          aldebaran: true
        }
      },
      "RAS - Lettura Energetica Sintetica"
    );
  } catch (err) {
    console.error('❌ Llama non disponibile per RAS:', err);
    narrazione = [
      'Apertura rapida del campo. Osservo la linea e sintetizzo l’immagine dominante.',
      'La direzione operativa è definita: concentrati sul passaggio che si apre ora.',
      'Chiudi in centratura: una scelta piccola ma netta sposta l’asse nella tua direzione.',
      'Sintesi: focus, movimento essenziale, fiducia nel ritmo che si è appena allineato.'
    ].join(' ');
  }

  // 3) Tabella tecnica dei calcoli
  const tabella = await generaReportTecnico(datiTecnici);

  // 4) Composizione finale
  const testoFinale = [
    narrazione.trim(),
    '',
    '✨ Tabella Tecnica dei Calcoli:',
    tabella
  ].join('\n\n');

  console.log('✅ Scrittura Sintetica (RAS) generata correttamente.');
  return { output: testoFinale };
}

// ✦ Esportazioni principali
export default generaRAS;

// ✦ Alias compatibilità (necessario per moduli più vecchi)
export const generaStesuraRAS = generaRAS;
