// ==============================================
// ✦ NARRATIVA SERVER — Metodo Marika, Studio Abigail
// Versione funzionante con Ollama su Mac
// ==============================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

// Rotta di test
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

// Rotta principale
app.post("/api/comando", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /api/comando");

  const { comando, testo, prompt } = req.body;
  const contenuto = prompt || testo || comando || "Nessun testo ricevuto";

  try {
    // 🔥 Chiamata corretta ad Ollama (funziona su Mac)
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // modello che hai installato
        prompt: contenuto,
        stream: false,
      }),
    });

    const data = await response.json();

    // 🔎 Log per capire se Ollama risponde
    console.log("🔍 Risposta Ollama:", data);

    if (!data || !data.response) {
      throw new Error("Nessuna risposta da Ollama.");
    }

    console.log("✨ Risposta ricevuta da Ollama");
    res.json({ text: data.response });
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text:
        "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e il modello caricato.",
    });
  }
});

// Avvio server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
