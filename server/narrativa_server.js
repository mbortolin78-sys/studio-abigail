// ==============================================
// ✦ NARRATIVA SERVER — Metodo Marika, Studio Abigail
// Gestisce le richieste dal frontend e comunica con Ollama
// ==============================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

// Log di avvio
console.log(`🌙 Narrativa Server attivo su http://localhost:${PORT}`);

// Rotta principale
app.post("/narrativa", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /narrativa");
  const { prompt } = req.body;

  if (!prompt) {
    console.warn("⚠️ Nessun prompt ricevuto");
    return res.status(400).json({ text: "Nessun testo fornito." });
  }

  try {
    // Invio la richiesta al modello Ollama
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2", // puoi cambiare qui il modello se serve
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!data.response) {
      throw new Error("Nessuna risposta da Ollama.");
    }

    console.log("✨ Risposta ricevuta da Ollama");
    res.json({ text: data.response });
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text: "⚠️ Errore nella generazione. Assicurati che Ollama sia in esecuzione.",
    });
  }
});

// Avvio server
app.listen(PORT);
