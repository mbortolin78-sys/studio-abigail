// server/narrativa_server.js
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Modello predefinito (puoi cambiarlo da .env)
const MODEL = process.env.OLLAMA_MODEL || "llama3.1:latest";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";

// --- Prompt builder senza frasi fisse, aderente ai protocolli/messe in guardia ---
function buildPrompt(tipo, datiTecnici, opzioni = {}) {
  const stileBase = {
    RAE: "Auroria — respiro ampio, ma linguaggio naturale (mai poetese).",
    RAS: "Auroria — tono intimo, diretto, empatico, zero frasi fatte.",
    REE: "Echo — ritmo fluido, immagini di eco e ascolto, mai lirismi fissi.",
    RES: "Echo — simbolico ma quotidiano, chiaro e concreto.",
    RVE: "Velaria Estesa — relazionale/operativo, osservativo e umano.",
    RVS: "Velaria Sintetica — 1 blocco ≥200 parole + conclusione ~30 parole, niente elenchi.", //  [oai_citation:0‡RVS.docx](sediment://file_00000000179c620aa7650243e941e8ac)
    REteriaE: "Eteria Estesa — profondo, strutturato su galassie e salto quantico.",
    REteriaS: "Eteria Sintetica — essenziale, chiaro, rispettando sequenza tecnica.",
    RVC: "Venere Classica — 4 metodi in sequenza, tono conversazionale professionale.",
    RVA: "Venere Auroria — 4 metodi, voce calda e moderna, niente formule fisse.",
    RVV: "Venere Velaria — 4 metodi, pragmatico e relazionale.",
    RVEteria: "Venere Eteria — 4 metodi, focus su galassie+salto, niente carte.",
    RVI: "Identikit — descrizione persona (una sola figura); non mostrare il TAG nel testo."
  }[tipo] || "Voce naturale, discorsiva, senza formule ricorrenti.";

  // Regole per TAG (RVI): i tag esistono ma NON vanno mostrati nel testo narrativo
  const tagIstruzioni = (tipo === "RVI")
    ? `Usa internamente il dizionario dei TAG, ma NON stampare i TAG tra parentesi. La persona è UNA sola (identikit puntuale).` //  [oai_citation:1‡RVI_TAG.docx](sediment://file_000000002b2c620a8621bb06a899c9cc)
    : `Se compaiono persone/campi, rispetta l’uso corretto dei ruoli secondo i miei protocolli.`;

  // Vincoli anti-frasi-fisse: sampling e variazione micro-stilistica
  const variazione = `
Scrivi **in italiano naturale e contemporaneo**, come in una conversazione. 
Vietate formule ripetitive e pattern fissi. Frasi di lunghezza variabile (alcune brevi, altre medie). 
Evita elenchi puntati: usa solo prosa scorrevole.`;

  // Vincoli specifici RVS (Velaria sintetica)
  const rvsVincoli = (tipo === "RVS")
    ? `
[Vincolo Velaria Sintetica]
- Un unico blocco narrativo di **almeno 200 parole**.
- **Conclusione di ~30 parole** in una frase unica, chiara e pulita.
- Sequenza tacita dei calcoli: Oraria Classica → Galassiale → (eventuali carte se previste dal modulo tecnico; per Venere NO).
- Nessun elenco o titoli.`
    : ``; //  [oai_citation:2‡RVS.docx](sediment://file_00000000179c620aa7650243e941e8ac)

  // Tabella tecnica: verrà appesa dalla UI, non duplicarla
  const codaTecnica = `Non ripetere i dati tecnici in elenco: chiudi il testo e lascia che la UI aggiunga la tabella tecnica in coda.`;

  return `
[Ruolo/Voce]
${stileBase}
${variazione}
${tagIstruzioni}
${rvsVincoli}

[Contesto tecnico da interpretare fedelmente, senza inventare]
${JSON.stringify(datiTecnici, null, 2)}

[Obiettivo]
- Trasforma i calcoli in un testo coerente con il metodo indicato.
- Tono conversazionale, professionale ma umano.
- Niente frasi fatte, niente “ho fatto l’oraria…”.
- Chiudi con una riga di sintesi chiara (se RVS, ~30 parole).

[Nota]
${codaTecnica}
`;
}

app.post("/api/narrativa", async (req, res) => {
  try {
    const { tipo, datiTecnici, temperature = 0.9, top_p = 0.95 } = req.body || {};
    if (!tipo) return res.status(400).json({ error: "Missing 'tipo'." });

    const prompt = buildPrompt(tipo, datiTecnici);
    const body = {
      model: MODEL,
      prompt,
      stream: false,
      options: {
        temperature,
        top_p,
        repeat_penalty: 1.1,
        num_predict: 800
      }
    };

    const r = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await r.json();
    if (!r.ok) return res.status(500).json({ error: json?.error || "Ollama error" });

    const text = (json?.response || "").trim();
    return res.json({ text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Narrativa server error" });
  }
});

const PORT = process.env.PORT || 3210;
app.listen(PORT, () => {
  console.log(`Narrativa server up on http://localhost:${PORT}`);
});
