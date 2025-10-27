// ==============================================
// ✦ NARRATIVA SERVER — Metodo Marika, Studio Abigail
// Versione ottimizzata e pronta all'uso
// ==============================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3210;

// 🛡️ Middleware
app.use(cors());
app.use(express.json());

// 🌙 Rotta di test
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

// 🧠 Rotta principale: riceve input e comunica con Ollama
app.post("/api/comando", async (req, res) => {
  console.log("📨 Richiesta ricevuta su /api/comando");

  const { comando, testo, prompt } = req.body;
  const contenuto = prompt || testo || comando;

  if (!contenuto) {
    console.warn("⚠️ Nessun contenuto valido nel body.");
    return res.status(400).json({ text: "⚠️ Nessun testo fornito al server." });
  }

  try {
    const ollamaRes = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1",
        prompt: contenuto,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();
    console.log("🔍 Risposta da Ollama:", data);

    const rispostaTesto =
      data.response || data.output || data.text || JSON.stringify(data);

    res.json({
      text:
        rispostaTesto?.trim() ||
        "⚠️ Nessuna risposta leggibile dal modello.",
    });

    console.log("✅ Risposta inviata al frontend.");
  } catch (error) {
    console.error("❌ Errore durante la generazione:", error);
    res.status(500).json({
      text:
        "⚠️ Errore nella generazione. Verifica che Ollama sia attivo e il modello caricato.",
    });
  }
});

// 🚀 Avvio server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
