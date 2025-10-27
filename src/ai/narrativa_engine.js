// ==============================================
// ✦ NARRATIVA ENGINE — Connessione a Ollama via Server Locale
// Metodo Marika — Studio Abigail
// ==============================================

export async function invocaScritturaViva(payload) {
  const backendUrl = "http://localhost:3210/narrativa";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.text || "⚠️ Nessuna risposta dal motore narrativo.";
  } catch (err) {
    console.error("❌ Errore nella comunicazione con il server narrativo:", err);
    if (err.name === "AbortError") {
      return "⚠️ Timeout di connessione: il motore narrativo non ha risposto in tempo.";
    }
    return "⚠️ Il motore narrativo non è raggiungibile. Assicurati che “narrativa_server.js” sia in esecuzione.";
  }
}
