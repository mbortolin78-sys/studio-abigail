// ======================================================
// 🜂 RAS — Generatore Strutturale Sintetico (Auroria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// - Nessun testo fisso: la narrazione è generata da Llama
// - Tabella tecnica dei calcoli in coda
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';  // tabella tecnica (oraria, galassie, ecc.)
import { invocaScritturaViva } from './llama_bridge.js';       // ponte verso il modello di scrittura

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
    // l’ordine dei blocchi guida Llama ma non impone frasi fisse
    blocchi: [
      'Apertura rapida di campo',
      'Centro/immagine dominante',
      'Direzione operativa (cosa/chi/dove/perché)',
      'Indicazioni pratiche',
      'Sintesi breve'
    ],
    voce: 'chiara, essenziale, empatica, non ripetitiva',
    protocollo: 'Scrittura Sintetica — Legge Universale art. 7.8',
    // vincoli di lunghezza richiesti dal metodo: ~100 parole + ~30 parole
    vincoli: {
      target_words_main: 100,
      target_words_synthesis: 30,
      tolleranza: 0.15 // ±15%
    },
    // segnali importanti per evitare ripetizioni fra letture ravvicinate
    antiRipetizione: {
      vieta_frasi_template: true,
      varia_soggetti: true,
      usa_sinonimi: true,
      evita_ripetizione_ascendente: true
    }
  };

  // 2) Chiamata al motore di scrittura (narrazione viva, zero boilerplate)
  let narrazione = '';
  try {
    narrazione = await invocaScritturaViva({
      struttura,
      datiTecnici,
      contesto: { data, ora, luogo },
      stile: { lingua: 'it', formale: false, seconda_persona: true, ritmo: 'scorrevole' },
      // suggeriamo le “ancore” ma non imponiamo il testo
      ancore: {
        oraria: true,            // usa i punti salienti dell’oraria
        galassie: true,          // cita solo le stelle/galassie rilevanti
        carte: true,             // se presenti nel datiTecnici (per Auroria: sibille)
        saltoQuantico: true,     // se presente
        aldebaran: true          // se presente
      }
    });
  } catch (err) {
    // Fallback sobrio: non blocchiamo la UI
    console.error('❌ Llama non disponibile per RAS:', err);
    narrazione = [
      'Apertura rapida del campo. Osservo la linea e sintetizzo l’immagine dominante.',
      'La direzione operativa è definita: concentrati sul passaggio che si apre ora.',
      'Chiudi in centratura: una scelta piccola ma netta sposta l’asse nella tua direzione.',
      'Sintesi: focus, movimento essenziale, fiducia nel ritmo che si è appena allineato.'
    ].join(' ');
  }

  // 3) Tabella tecnica dei calcoli (sempre in coda)
  const tabella = await generaReportTecnico(datiTecnici);

  // 4) Composizione finale
  const testoFinale = [
    narrazione.trim(),
    '',
    '✨ Tabella Tecnica dei Calcoli:',
    tabella
  ].join('\n\n');

  return { output: testoFinale };
}

export default { generaRAS };
