// ==============================
// 🌙 Studio Abigail - Ollama Bridge
// ==============================
//
// Gestisce la connessione tra il server narrativo e Ollama.
//

import fetch from "node-fetch";

async function chiediAollama(prompt) {
  try {
    console.log("📤 Invio richiesta a Ollama...");
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // oppure "marika:latest" se lo hai creato
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

// 👇 questa è la parte mancante che serve al server
export default chiediAollama;
