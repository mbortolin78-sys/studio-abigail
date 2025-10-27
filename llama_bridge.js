// ==============================
// 🌙 Studio Abigail - Llama Bridge
// ==============================
//
// Questo modulo gestisce la comunicazione tra i generatori tecnici
// e il modello narrativo Ollama (es. marika:latest).
// È totalmente autonomo e può essere richiamato da qualunque generatore.
//

export async function invocaScritturaViva({ struttura = {}, datiTecnici = {}, contesto = {}, stile = {}, ancore = {} }) {
  try {
    // 🧠 Costruzione del prompt coerente con il Metodo Marika
    const prompt = `
Scrivi una narrazione conforme al Metodo Marika e alla Legge Universale.

• Modello: ${struttura.modello || "Generico"}
• Tipo: ${struttura.tipo || "Non specificato"}
• Blocchi: ${Array.isArray(struttura.blocchi) ? struttura.blocchi.join(", ") : "n/a"}
• Voce richiesta: ${struttura.voce || "empatica, chiara e precisa"}
• Protocollo: ${struttura.protocollo || "Standard"}
• Vincoli: ${struttura.vincoli ? JSON.stringify(struttura.vincoli) : "n/a"}

Contesto operativo:
Data: ${contesto.data || "non definita"}
Ora: ${contesto.ora || "non definita"}
Luogo: ${contesto.luogo || "Montebelluna (default)"}

Dati tecnici forniti:
${JSON.stringify(datiTecnici, null, 2)}

Richiedi:
- Linguaggio scientifico-esoterico, coerente, non simbolista.
- Narrazione viva, chiara, basata su coerenze energetiche reali.
- Tono analitico ma naturale, voce integrata e consapevole.
- Evita formule tecniche inutili e terminologia oscura.
- Struttura discorsiva, empatica, con ritmo fluido e armonico.
- Rispetta i vincoli di lunghezza richiesti dalla struttura.
    `.trim();

    // 🔗 Invocazione del modello Ollama locale
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "marika:latest", // modello Ollama locale
        prompt,
        stream: false
      })
    });

    const data = await response.json();
    return data.response?.trim() || "(⚠️ Nessuna risposta ricevuta da Ollama)";
  } catch (err) {
    console.error("❌ Errore nella connessione a Ollama:", err);
    return "(⚠️ Scrittura viva non disponibile in questo momento)";
  }
}

export default invocaScritturaViva;
