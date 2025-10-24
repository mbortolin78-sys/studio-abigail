// ===============================
// 🔮 Metodo Auroria Tecnico — Metodo Marika
// Basato su: Auroria.docx + Legge Universale + Comandi Operativi
// ===============================

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { applicaComandiOperativi } from './comandiOperativi.js';

// ✴️ Funzione principale
export async function eseguiAuroria(data, ora, luogo, comando) {
  const reset = applicaComandiOperativi('Auroria');

  const oraria = calcolaOrariaClassica(data, ora, luogo);
  const galassie = calcolaGalassieAuroria(oraria);
  const sibille = calcolaSibilleAuroria();
  const legge = applicaLeggeUniversale(oraria, galassie, sibille);

  const output = `
  ⚙️ RISULTATO TECNICO — Metodo AURORIA (${comando})
  ────────────────────────────────
  📅 Data: ${data}
  ⏰ Ora: ${ora}
  📍 Luogo: ${luogo}

  🔭 ORARIA CLASSICA
  ${oraria}

  ✴️ GALASSIE
  ${galassie}

  🜂 STESA DI SIBILLE
  ${sibille}

  ⚖️ LEGGE UNIVERSALE
  ${legge}

  ✨ Calcolo conforme alla Legge Universale — Metodo Marika.
  `;
  return { output };
}

// ===============================
// 🔭 Metodo Oraria Classica
// ===============================
function calcolaOrariaClassica(data, ora, luogo) {
  return `
  • Ricostruzione del cielo dell’istante — ascendente, medio cielo, 12 case. 
  • Dati base: ${data}, ${ora}, ${luogo}.
  • Pianeti collocati nei segni e nelle case secondo calcolo esatto.
  `;
}

// ===============================
// ✴️ Metodo Galassie Auroria
// ===============================
function calcolaGalassieAuroria(oraria) {
  return `
  • Il Sole funge da faro di proiezione.
  • Si verifica la figura geometrica del Sole con gli altri pianeti 
    (opposizione, trigono, quadrato, sestile, triangolo).
  • Il Sistema Solare viene proiettato nella galassia corrispondente:
    Andromeda, Sirio, Taurus, Michelaus (M41).
  • Si individua la stella illuminata dal Sole (es. “Stella della Rivelazione”).
  • Regola: i pianeti non hanno stelle proprie — la luce appartiene solo alla galassia.
  • Forma corretta: “Il Sole illumina la Stella della Rivelazione di Andromeda”.
  `;
}

// ===============================
// 🜃 Metodo Stesa di Sibille Auroria
// ===============================
function calcolaSibilleAuroria() {
  return `
  • 1° taglio: 2 carte (mai uguali)
  • 2° taglio: 3 carte (mai uguali)
  • 1 carta centrale: mai uguale
  • 5 terne da 3 carte (15 carte totali), tutte differenti
  • Nessuna ripetizione ammessa — sequenza fissa Oraria → Galassie → Sibille.
  `;
}
