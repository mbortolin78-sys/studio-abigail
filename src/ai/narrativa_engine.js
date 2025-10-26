// ==============================================
// ✦ NARRATIVA ENGINE — Connessione a Ollama
// Metodo Marika — Studio Abigail
// ==============================================

import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);

// 🔮 Modello Ollama da usare
const MODEL = "llama3.1:latest";

// Prompt base per ogni tipo di scrittura
const PROMPT_BASE = {
  RAE: "Scrivi un testo ispirato al Metodo Auroria: visione ampia, poetica, ma non ripetitiva. Usa linguaggio energetico e naturale, come un discorso tra due persone consapevoli.",
  RAS: "Scrivi in tono profondo e introspettivo, come se leggessi l’energia che si muove nel campo. Linguaggio semplice, sincero, senza frasi fisse.",
  REE: "Trasforma i dati in una narrazione che sembri un racconto di mare e vento: flusso, eco, ascolto. Mantieni vibrazione leggera e vera.",
  RES: "Scrittura simbolica e diretta, come se stessi decifrando un messaggio cosmico ma in linguaggio quotidiano.",
  RVE: "Energia relazionale: scrivi in modo empatico e osservativo, con tono umano e contemplativo.",
  RVI: "Descrivi l’energia e l’aspetto di una persona come se la stessi incontrando ora: reale, non idealizzata, con sfumature sottili."
};

// ==============================================
// ✦ Funzione principale
// ==============================================

export async function generaNarrativa(tipo, datiTecnici) {
  const basePrompt = PROMPT_BASE[tipo] || "Scrivi un testo coerente e simbolico.";
  
  // Costruisci il prompt dinamico con i dati tecnici
  const input = `
${basePrompt}

Dati tecnici da interpretare simbolicamente:
${JSON.stringify(datiTecnici, null, 2)}

Scrivi un testo in italiano naturale, senza formule fisse, con fluidità e variazione.
Chiudi con tono di comprensione e equilibrio.
`;

  try {
    const { stdout } = await execAsync(`ollama run ${MODEL} "${input.replace(/"/g, '\\"')}"`);
    return stdout.trim();
  } catch (err) {
    console.error("❌ Errore durante la generazione narrativa:", err);
    return "⚠️ Errore nel motore narrativo.";
  }
}
