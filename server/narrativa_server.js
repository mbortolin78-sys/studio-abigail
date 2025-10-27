// ==============================================
// ✦ NARRATIVA SERVER — Metodo Marika, Studio Abigail
// Versione stabile e verificata
// ==============================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

// 🌙 Rotta di test
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

// ✦ Rotta principale: riceve i prompt dal frontend o dal bridge
app.post("/api/comando", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /api/comando");

  // Estrae il testo da qualunque campo
  const { comando, testo, prompt } = req.body;
  const contenuto = prompt || testo || comando;

  if (!contenuto) {
    console.warn("⚠️ Nessun contenuto ricevuto nel body della richiesta.");
    return res.status(400).json({ text: "⚠️ Nessun testo fornito al server." });
  }

  try {
    // 🔗 Comunicazione con Ollama locale
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // modello che hai installato
        prompt: contenuto,
        stream: false,
      }),
    });

    // 🧠 Parsing della risposta da Ollama
    const data = await response.json();
    console.log("🔍 Risposta completa di Ollama:", data);

    // ✨ Interpreta qualunque campo testuale disponibile
    const testoRisposta =
      data.response || data.output || data.text || JSON.stringify(data);

    // ✉️ Invia il testo elaborato al frontend
    res.json({
      text:
        testoRisposta?.trim() ||
        "⚠️ Nessuna risposta leggibile dal modello (potrebbe essere silenzioso).",
    });

    console.log("✅ Risposta inviata correttamente al frontend.");
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text:
        "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e il modello caricato.",
    });
  }
});

// 🚀 Avvio server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
