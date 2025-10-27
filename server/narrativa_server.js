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

// ✅ Rotta di test base (se apri http://localhost:3210)
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

// ✅ Rotta principale usata dal frontend
app.post("/api/comando", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /api/comando");

  const { comando, testo, prompt } = req.body;

  // Usa "prompt" o "testo" come testo base
  const contenuto = prompt || testo || comando || "Nessun testo ricevuto";

  try {
    // Chiamata a Ollama (assicurati che sia aperto)
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2", // puoi cambiare qui il modello se serve
        prompt: contenuto,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!data.response) {
      throw new Error("Nessuna risposta da Ollama");
    }

    console.log("✨ Risposta ricevuta da Ollama");
    res.json({ text: data.response });
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text: "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e in esecuzione.",
    });
  }
});

// 🚀 Avvio del server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
