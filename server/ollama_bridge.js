// ==============================
// 🌙 Studio Abigail - Ollama Bridge
// ==============================
//
// Gestisce la connessione tra il server narrativo e Ollama.
//

import fetch from "node-fetch";

export async function chiediAollama(prompt) {
  try {
    console.log("📤 Invio richiesta a Ollama...");
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // puoi cambiare in "marika:latest" se lo hai
        prompt,
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
