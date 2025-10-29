// ================================
// ✨ Studio Abigail - Frontend → Server Narrativo (Aruba)
// ================================

export async function invocaScritturaViva(prompt) {
  console.log("💫 Invio al server narrativo:", prompt);

  try {
    const res = await fetch('http://31.14.131.80:3210/api/comando', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      console.error("❌ Errore HTTP:", res.status, res.statusText);
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("📩 Risposta ricevuta:", data);

    // Se il backend risponde con { output: "..." }
    return data.output || "⚠️ Nessuna risposta testuale dal motore narrativo.";
  } catch (err) {
    console.error("🚫 Errore durante la comunicazione con il server narrativo:", err);
    return "⚠️ Il motore narrativo non è raggiungibile o ha restituito un errore.";
  }
}
