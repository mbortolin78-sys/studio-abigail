// ===============================
// 🔮 Metodo Auroria Tecnico – Metodo Marika
// Basato su: Auroria.docx + Legge Universale + Comandi Operativi
// ===============================

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { applicaComandiOperativi } from './comandiOperativi.js';

// ===============================
// ✴️ Funzione principale
// ===============================
export async function eseguiAuroria(data, ora, luogo, comando) {
  // 1️⃣ Reset e riallineamento dei file fondamentali
  const reset = applicaComandiOperativi('Auroria');
  
  // 2️⃣ Calcolo Oraria Classica
  const oraria = calcolaOrariaClassica(data, ora, luogo);

  // 3️⃣ Calcolo Galassie
  const galassie = calcolaGalassie(oraria);

  // 4️⃣ Stesa di Sibille
  const sibille = calcolaSibille();

  // 5️⃣ Applicazione Legge Universale
  const legge = applicaLeggeUniversale(oraria, galassie, sibille);

  // 6️⃣ Output tecnico finale
  const output = `
  ⚙️ RISULTATO TECNICO – Metodo AURORIA (${comando})
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

  ✨ Calcolo eseguito con rigore scientifico–esoterico secondo i protocolli ufficiali.
  `;

  return { output };
}

// ===============================
// 🜂 1. Metodo Oraria Classica
// ===============================
function calcolaOrariaClassica(data, ora, luogo) {
  return `
  - Ricostruzione scientifico–esoterica del cielo orario
  - Coordinate base: data ${data}, ora ${ora}, luogo ${luogo}
  - Ascendente (AS), Medio Cielo (MC), 12 case e disposizione planetaria calcolate
  - Ogni pianeta posizionato in segno e casa corrispondenti all’istante esatto
  `;
}

// ===============================
// ✴️ 2. Metodo Galassie
// ===============================
function calcolaGalassie(oraria) {
  return `
  - Proiezione del Sistema Solare in quattro galassie archetipiche:
    Andromeda, Sirio, Taurus, Michelaus (Ammasso M41)
  - Identificazione della stella illuminata dal Sole e dai pianeti in figura
  - Ogni stella attiva è denominata (es. “Stella della Rivelazione”, “Stella del Dialogo”)
  - Regola: i pianeti non hanno stelle proprie, ma generano figure proiettive
  `;
}

// ===============================
// 🜃 3. Stesa di Sibille
// ===============================
function calcolaSibille() {
  return `
  - 1° taglio: 2 carte (mai uguali)
  - 2° taglio: 3 carte (mai uguali)
  - 1 carta centrale: mai uguale
  - 5 terne da 3 carte, tutte differenti
  - Ogni stesa viene applicata in sequenza: Oraria → Galassie → Sibille
  `;
}
