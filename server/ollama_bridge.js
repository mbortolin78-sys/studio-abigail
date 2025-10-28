// ==============================
// 🌙 Studio Abigail - Ollama Bridge
// ==============================
//
// Gestisce la connessione tra il server narrativo e Ollama.
//

import fetch from "node-fetch";

// funzione base di connessione
export async function generaNarrativa(payload, titolo = "Scrittura Viva") {
  try {
    console.log("📤 Invio richiesta a Ollama...");
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // puoi cambiare in "marika:latest" se lo hai
        prompt: costruisciPrompt(payload, titolo),
        stream: false,
      }),
    });

    const data = await response.json();
    console.log("📥 Risposta da Ollama:", data.response);
    return data.response?.trim() || "⚠️ Nessuna risposta ricevuta da Ollama.";
  } catch (err) {
    console.error("❌ Errore di connessione con Ollama:", err);
    return "⚠️ Ollama non risponde. Assicurati che sia aperto e attivo.";
  }
}

// helper per costruire il prompt da payload
function costruisciPrompt(payload, titolo) {
  const contesto = payload?.contesto
    ? `📅 ${payload.contesto.data} — 🕰️ ${payload.contesto.ora} — 📍 ${payload.contesto.luogo}`
    : "";
  return `🜂 ${titolo}\n\n${contesto}\n\nStruttura: ${JSON.stringify(payload.struttura, null, 2)}\n\nDati tecnici: ${JSON.stringify(payload.datiTecnici, null, 2)}\n\nRispondi con linguaggio empatico e simbolico, in italiano.`;
}
