// ==============================================
// ✦ NARRATIVA ENGINE — Metodo Marika / Studio Abigail
// Gestisce la generazione narrativa con Ollama
// ==============================================

export async function generaNarrativa(tipo, datiTecnici, opzioni = {}) {
  const MODEL = "llama3.1:latest";
  const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";

  // ===============================
  // 1. Mappa dei protocolli di stile
  // ===============================
  const STILI = {
    RAE: "Auroria — linguaggio ampio e fluido, tono discorsivo e umano, senza formule fisse.",
    RAS: "Auroria — tono intimo e introspettivo, diretto, mai poetico, voce semplice e sincera.",
    REE: "Echo — flusso naturale, linguaggio evocativo ma concreto, ritmo variabile.",
    RES: "Echo — simbolico e chiaro, linguaggio quotidiano e scorrevole.",
    RVE: "Velaria Estesa — relazionale, umano, osservativo, narrativo ma reale.",
    RVS: "Velaria Sintetica — un unico blocco ≥200 parole + sintesi di ~30 parole, senza elenchi.",
    REteriaE: "Eteria Estesa — tono profondo e tecnico, coerente con la Legge Universale.",
    REteriaS: "Eteria Sintetica — voce chiara e neutra, mai didascalica.",
    RVC: "Venere Classica — 5 blocchi identificativi completi, tono professionale e empatico.",
    RVA: "Venere Auroria — identikit esteso, voce morbida e moderna, senza artifici poetici.",
    RVV: "Venere Velaria — tono relazionale e lucido, linguaggio contemporaneo.",
    RVEteria: "Venere Eteria — connessa a galassie e salto quantico, chiusura armonica.",
    RVI: "Identikit — descrizione di una persona reale, senza mostrare i TAG nel testo."
  };

  // ===============================
  // 2. Prompt dinamico
  // ===============================
  const base = STILI[tipo] || "Voce naturale, contemporanea e coerente con i protocolli.";

  const prompt = `
[Ruolo/Voce]
${base}

[Regole]
- Linguaggio naturale, discorsivo, come un dialogo reale.
- Evita frasi fisse, elenchi, titoli e formule ricorrenti.
- Usa lunghezze di frase variabili.
- Mantieni tono coerente con ${tipo}.
${tipo === "RVI" ? "Non mostrare i TAG nel testo, usali solo per orientare la descrizione." : ""}
${tipo === "RVS" ? "- Scrivi almeno 200 parole + una conclusione di circa 30 parole." : ""}

[Dati tecnici da interpretare simbolicamente]
${JSON.stringify(datiTecnici, null, 2)}

[Obiettivo]
Traduci i dati tecnici in un testo discorsivo coerente con il Metodo Marika.
Chiudi sempre con equilibrio e naturalezza.
`;

  // ===============================
  // 3. Invio ad Ollama
  // ===============================
  const body = {
    model: MODEL,
    prompt,
    stream: false,
    options: {
      temperature: opzioni.temperature ?? 0.9,
      top_p: opzioni.top_p ?? 0.95,
      repeat_penalty: 1.1,
      num_predict: 900
    }
  };

  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || "Errore Ollama");

    const testo = (json.response || "").trim();
    return testo;
  } catch (err) {
    console.error("❌ Errore durante la generazione narrativa:", err);
    return "⚠️ Errore nel motore narrativo.";
  }
}
