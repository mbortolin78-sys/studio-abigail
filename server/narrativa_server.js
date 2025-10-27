import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3210;

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
    console.log("🔍 Risposta completa di Ollama:", data);

    // Gestione universale del campo di testo
    const testoRisposta =
      data.response || data.output || data.text || JSON.stringify(data);

    res.json({
      text:
        testoRisposta ||
        "⚠️ Nessuna risposta leggibile dal modello (forse è rimasto a riflettere troppo).",
    });

    console.log("✨ Risposta inviata al frontend");
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
