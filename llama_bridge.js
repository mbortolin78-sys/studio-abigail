// ==============================
// 🌙 Studio Abigail - Llama Bridge
// ==============================
//
// Questo modulo gestisce la comunicazione tra i generatori tecnici
// e il modello narrativo Ollama (es. marika:latest).
// È totalmente autonomo e può essere richiamato da qualunque generatore.
//

export async function generaNarrativa(contenuto, contesto = "Studio Abigail") {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "marika:latest", // modello Ollama locale
        prompt: `
Scrivi una narrazione coerente secondo il Metodo Marika.

Contesto: ${contesto}

Dati di partenza:
${contenuto}

Richiedi:
- Linguaggio simbolico, empatico e armonico.
- Nessuna formula tecnica.
- Tono energetico, chiaro, dolce e autorevole.
- Narrazione fluida in forma breve (max 100 parole di testo + 30 di sintesi).
        `.trim(),
        stream: false
      })
    });

    const data = await response.json();
    return data.response || "(⚠️ Nessuna risposta ricevuta da Ollama)";
  } catch (err) {
    console.error("❌ Errore nella connessione a Ollama:", err);
    return "(⚠️ Scrittura viva non disponibile in questo momento)";
  }
}
