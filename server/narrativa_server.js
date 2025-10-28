// ==============================================
// 🌙 Studio Abigail — Server Narrativo Principale
// Metodo Marika — Connessione diretta con Ollama
// ==============================================

import express from "express";
import cors from "cors";
import { chiediAollama } from "./ollama_bridge.js"; // 🔗 Connessione a Ollama

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

// 🌐 Endpoint di test
app.get("/", (req, res) => {
  res.send("🌙 Narrativa Server attivo e funzionante ✅");
});

// 🪶 Endpoint principale — riceve i comandi dal frontend
app.post("/api/comando", async (req, res) => {
  console.log("🪶 Richiesta ricevuta da /api/comando");

  const { comando, testo, prompt } = req.body;
  const contenuto = prompt || testo || comando || "Nessun testo ricevuto";

  try {
    // 🔮 Invoca il modello Ollama attraverso il bridge
    const testoRisposta = await chiediAollama(contenuto);

    // 🔁 Invia la risposta al frontend
    res.json({
      text: testoRisposta || "⚠️ Nessuna risposta leggibile da Ollama.",
    });

    console.log("✅ Risposta inviata al frontend.");
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text:
        "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e il modello caricato.",
    });
  }
});

// 🚀 Avvio del server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
