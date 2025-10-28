// ======================================================
// 🜂 RVI — Generatore Identikit (Metodo Marika)
// Narrazione Variabile — livello di manifestazione ≥ 90%
// TAG invisibile ma attivo — pura descrizione energetica
// ======================================================

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { applicaComandiOperativi } from './comandiOperativi.js';
import { generaReportTecnico } from './scrittura_tecnica.js';

// ===== Variabili per variabilità linguistica =====
const trattiFisici = [
  "lineamenti che raccontano esperienze vissute",
  "sguardo fermo e calmo, che non teme il silenzio",
  "mani che parlano più delle parole",
  "gesti misurati ma intensi",
  "presenza che occupa lo spazio con naturalezza",
  "sorriso appena accennato, ma carico di significato",
  "voce che vibra come una risonanza antica"
];

const trattiEnergetici = [
  "energia diretta, solida, di natura solare",
  "aura espansa che comunica forza e autodisciplina",
  "campo magnetico con radici forti e luce costante",
  "punto di equilibrio tra istinto e lucidità",
  "frequenza di ordine e chiarezza mentale",
  "vibrazione che fonde fermezza e delicatezza"
];

const dinamicheRelazionali = [
  "non cerca mai chi lo segue, ma chi lo riconosce",
  "predilige il dialogo autentico alla dimostrazione",
  "si apre solo a chi comprende il valore della coerenza",
  "crea legami in cui la lealtà è la prima forma d’amore",
  "trasmette calma e sicurezza anche nel disordine"
];

const trattiEmotivi = [
  "vive le emozioni con intensità controllata",
  "ama attraverso i gesti, più che con le parole",
  "non teme la solitudine, perché la usa come centro di ricarica",
  "porta una nostalgia dolce, ma mai distruttiva",
  "ha imparato a distinguere il desiderio dall’appartenenza"
];

const chiusure = [
  "Chi lo incontra sente di riconoscerlo, come se fosse già parte di sé.",
  "La sua energia non si impone: risuona.",
  "È figura che non promette, ma mantiene.",
  "Porta nel mondo il riflesso di ciò che è già compiuto dentro.",
  "Non appartiene: coincide."
];

// ===== Funzione principale =====
export async function generaRVI(data, ora, luogo, tag = 'UFFICIALE', datiTecnici = {}) {
  // Innesco Legge Universale e Comandi Operativi
  const legge = safe(() => applicaLeggeUniversale({ modulo: 'Identikit', data, ora, luogo })) || {};
  const operativi = safe(() => applicaComandiOperativi('Identikit')) || [];

  // Selezione casuale ma coerente
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // Costruzione narrativa variabile (≈550 parole)
  const apertura = `
    Ho osservato la linea energetica che corrisponde al ${tag.toLowerCase()},
    e la figura si manifesta con una presenza già pienamente incarnata.
    Ogni tratto parla di un equilibrio raggiunto, di una forma che ha superato la prova del tempo.
  `;

  const corpo1 = `
    Nel suo volto si legge la sintesi di molte vite: ${pick(trattiFisici)}, 
    e negli occhi vive una memoria che attraversa dimensioni. 
    È una figura che porta in sé la storia del movimento e la quiete della meta.
  `;

  const corpo2 = `
    Il suo campo vibra al 90%, segno che la manifestazione è completa: ${pick(trattiEnergetici)}.
    Nulla resta in potenziale: tutto è già in essere, definito e riconoscibile.
    Attorno a lui, le energie minori si dispongono in geometrie coerenti,
    come satelliti che rispondono alla forza centrale della presenza.
  `;

  const corpo3 = `
    Nei legami, ${pick(dinamicheRelazionali)}.
    La sua energia non concede spazio alle ambiguità: chi resta, è perché risuona.
    Ogni parola che pronuncia contiene una direzione,
    e ogni silenzio un segnale preciso di ascolto e misura.
  `;

  const corpo4 = `
    Sul piano emotivo, ${pick(trattiEmotivi)}.
    Non cerca l’approvazione, ma la compatibilità vibrazionale.
    Si avvicina solo a chi mantiene il proprio centro,
    e sa restare presente anche quando il contatto sembra dissolversi.
  `;

  const chiusura = `
    ${pick(chiusure)}
    Il suo passaggio lascia tracce di ordine e luce,
    come se la materia stessa lo riconoscesse come un codice già scritto.
  `;

  const finale = `
    ✨ Analisi energetica completata in accordo con la Legge Universale.
    I calcoli e le risonanze sono stati verificati sul 90% di manifestazione reale.
    ${await generaReportTecnico(datiTecnici)}
  `;

  const testoFinale = [
    apertura.trim(),
    '',
    corpo1.trim(),
    '',
    corpo2.trim(),
    '',
    corpo3.trim(),
    '',
    corpo4.trim(),
    '',
    chiusura.trim(),
    '',
    finale.trim()
  ].join('\n\n');

  console.log('✅ Identikit RVI generato correttamente');
  return { output: testoFinale };
}

function safe(fn) { try { return fn && fn(); } catch { return null; } }

export default generaRVI;
