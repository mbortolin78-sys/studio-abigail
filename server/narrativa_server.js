// ==============================================
// 🌙 Studio Abigail — Server Narrativo Principale
// Metodo Marika — Connessione diretta con Ollama
// ==============================================

const express = require("express");
const cors = require("cors");
const chiediAollama = require("./ollama_bridge.js");

const app = express();

// Rotta di salute — verifica che il server risponde
app.get('/health', (req, res) => {
  res.status(200).send('✅ Studio Abigail Narrative Engine is alive');
});

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
    const testoRisposta = await chiediAollama(contenuto);
    res.json({ text: testoRisposta || "⚠️ Nessuna risposta leggibile da Ollama." });
    console.log("✅ Risposta inviata al frontend.");
  } catch (err) {
    console.error("❌ Errore nel server narrativo:", err);
    res.status(500).json({
      text: "⚠️ Errore nella generazione. Assicurati che Ollama sia aperto e il modello caricato."
    });
  }
});

// 🚀 Avvio del server
app.listen(PORT, () => {
  console.log(`✅ Narrativa Server attivo su http://localhost:${PORT}`);
});
