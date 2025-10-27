// ==============================
// 🌙 Studio Abigail - Llama Bridge (versione con Narrativa Server)
// ==============================
//
// Questo modulo gestisce la comunicazione tra i generatori tecnici
// e il server narrativo locale (che a sua volta parla con Ollama).
//

export async function invocaScritturaViva({
  struttura = {},
  datiTecnici = {},
  contesto = {},
  stile = {},
  ancore = {}
}) {
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

    // 🔗 Invocazione del server narrativo locale (NON direttamente Ollama)
    const response = await fetch("http://localhost:3210/api/comando", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!data.text) {
      console.warn("⚠️ Nessuna risposta ricevuta dal server narrativo.");
      return "(⚠️ Nessuna risposta ricevuta dal sistema narrativo)";
    }

    return data.text.trim();
  } catch (err) {
    console.error("❌ Errore nella connessione al server narrativo:", err);
    return "(⚠️ Scrittura viva non disponibile in questo momento)";
  }
}

export default invocaScritturaViva;
