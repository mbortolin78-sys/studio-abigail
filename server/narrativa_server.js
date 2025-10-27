// ==============================================
// ✦ NARRATIVA SERVER — Metodo Marika, Studio Abigail
// Versione finale funzionante — con ritorno garantito al frontend
// ==============================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

// Test
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

app.post("/api/comando", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /api/comando");

  const { comando, testo, prompt } = req.body;
  const contenuto = prompt || testo || comando || "Nessun testo ricevuto";

  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1",
        prompt: contenuto,
        stream: false,
      }),
    });

    const data = await response.json();
    console.log("🔍 Risposta Ollama:", data);

    // se Ollama non risponde
    if (!data || !data.response) {
      console.warn("⚠️ Nessuna risposta valida ricevuta da Ollama");
      return res.json({
        text: "⚠️ Nessuna risposta dal modello. Forse sta pensando troppo a te 😉",
      });
    }

    // se Ollama risponde
    console.log("✨ Risposta ricevuta e inviata al frontend");
    res.json({ text: data.response });
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text:
        "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e il modello caricato.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
