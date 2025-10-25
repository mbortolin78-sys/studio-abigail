// ======================================================
// 🜂 RAS — Scrittura Sintetica (Auroria)
// Metodo Marika — Studio Abigail
// Conforme a: Legge Universale (art. 7.8 – 8)
// Struttura tassativa: Oraria → Galassie → Sibille → Sintesi
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';

// ======================================================
// FUNZIONE PRINCIPALE
// ======================================================

export async function generaRAS(data, ora, luogo, datiTecnici = {}) {

  // 1️⃣ — NARRAZIONE SINTETICA (≈200 parole)
  const narrazione = `Ho eseguito l’oraria in data ${data}, alle ${ora}, nel luogo di ${luogo}.
  La figura apre subito un piano di chiarezza: la mente si placa e la linea di azione si definisce.
  L’Ascendente si illumina nel punto d’incontro tra pensiero e intuizione, mentre la Luna amplifica ciò che ancora chiede ascolto.
  Ogni pianeta muove la trama dei fatti con precisione: Venere parla di relazione autentica, Marte di decisione, Mercurio di parole che ricompongono.
  Le case disegnano la mappa concreta del momento, con la VII che espone il confronto diretto e la X che porta il senso ultimo dell’esperienza.
  Le Galassie si accendono come fari complementari: Andromeda apre il piano emotivo, Sirio il mentale, Taurus il materiale, Michelaus la parte invisibile del disegno.
  Tutto converge in un unico fascio di luce coerente, dove ciò che sembrava incerto si ordina spontaneamente.
  L’energia scorre senza ostacolo: non serve forzare, basta restare in ascolto del ritmo che si è generato nel campo.`;

  // 2️⃣ — CONCLUSIONE (≈30 parole)
  const sintesi = `In conclusione, la figura mostra un equilibrio in rinascita.
  Il movimento è armonico e l’intento trova forma precisa nella realtà che ora si apre davanti.`;

  // 3️⃣ — CHIUSURA + REPORT TECNICO
  const chiusura = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // 4️⃣ — COMPOSIZIONE FINALE
  const testoFinale = [
    narrazione.trim(),
    '',
    `🔹 Sintesi: ${sintesi.trim()}`,
    '',
    chiusura.trim()
  ].join('\n');

  console.log('✅ Scrittura RAS generata correttamente');
  return { output: testoFinale };
}

export default { generaRAS };
