// ==========================================================
// 🜂 NARRATIVA SERVER — Metodo Marika / Studio Abigail
// Gestisce la comunicazione diretta con Ollama
// ==========================================================

import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Modello e percorso Ollama
const MODEL = process.env.OLLAMA_MODEL || "llama3.1:latest";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";

// ==========================================================
// 🪶 Mappa di stile per ogni comando
// ==========================================================
const STILI = {
  RAE: "Auroria — visione ampia, voce fluida e umana, linguaggio naturale.",
  RAS: "Auroria — tono intimo e diretto, nessuna retorica, ritmo sincero.",
  REE: "Echo — flusso morbido, discorsivo, immagini delicate e contemporanee.",
  RES: "Echo — simbolico ma realistico, lingua chiara e accessibile.",
  RVE: "Velaria Estesa — relazionale, osservativa, mai fredda o tecnica.",
  RVS: "Velaria Sintetica — un solo blocco ≥200 parole + sintesi finale di ~30 parole, mai elenchi o formule fisse.",
  REteriaE: "Eteria Estesa — profonda, ordinata, coerente con la Legge Universale.",
  REteriaS: "Eteria Sintetica — diretta, neutra, armoniosa, no frasi ripetute.",
  RVC: "Venere Classica — 4 metodi canonici, voce esperta ma empatica.",
  RVA: "Venere Auroria — calda, umana, moderna, senza artifici poetici.",
  RVV: "Venere Velaria — relazionale, lucida, descrittiva ma naturale.",
  RVEteria: "Venere Eteria — galassiale, energetica, con chiusura equilibrata.",
  RVI: "Identikit — descrizione reale di una persona, tono presente e autentico (mai mostrare TAG)."
};

// ==========================================================
// 🧠 Costruttore del prompt dinamico
// ==========================================================
function buildPrompt(tipo, datiTecnici) {
  const stile = STILI[tipo] || "Voce naturale, discorsiva, coerente al Metodo Marika.";
  const noteIdentikit =
    tipo === "RVI"
      ? "Non mostrare i TAG nel testo. Descrivi una sola persona, con tono naturale e contemporaneo."
      : "";
  const noteSintetica =
    tipo === "RVS"
      ? "Scrivi un unico blocco narrativo di almeno 200 parole e una chiusura di circa 30 parole, senza elenchi o formule ripetute."
      : "";

  return `
[Ruolo/Voce]
${stile}

[Regole generali]
- Linguaggio discorsivo, reale, mai artificiale.
- Vietate frasi fisse, elenchi, titoli o schemi rigidi.
- Tono coerente con ${tipo}.
- Alcune frasi brevi, altre medie, mai tutte uguali.
${noteIdentikit}
${noteSintetica}

[Dati tecnici da interpretare simbolicamente]
${JSON.stringify(datiTecnici, null, 2)}

[Obiettivo]
Traduci i dati tecnici in un testo naturale e coerente con il Metodo Marika.
Chiudi sempre con equilibrio e chiarezza.
`;
}

// ==========================================================
// 🔮 Endpoint principale
// ==========================================================
app.post("/api/narrativa", async (req, res) => {
  try {
    const { tipo, datiTecnici, temperature = 0.9, top_p = 0.95 } = req.body || {};
    if (!tipo) return res.status(400).json({ error: "Manca il parametro 'tipo'." });

    const prompt = buildPrompt(tipo, datiTecnici);
    const body = {
      model: MODEL,
      prompt,
      stream: false,
      options: {
        temperature,
        top_p,
        repeat_penalty: 1.1,
        num_predict: 900
      }
    };

    const r = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const json = await r.json();
    if (!r.ok) {
      console.error("❌ Errore Ollama:", json);
      return res.status(500).json({ error: json?.error || "Errore da Ollama." });
    }

    const testo = (json.response || "").trim();
    res.json({ text: testo });
  } catch (e) {
    console.error("❌ Errore nel server narrativa:", e);
    res.status(500).json({ error: "Errore nel motore narrativa." });
  }
});

// ==========================================================
// 🚀 Avvio del server
// ==========================================================
const PORT = process.env.PORT || 3210;
app.listen(PORT, () => {
  console.log(`✨ Narrativa Server attivo su http://localhost:${PORT}`);
});
