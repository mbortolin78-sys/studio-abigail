// ==============================================
// ✦ NARRATIVA ENGINE — Connessione a Ollama via Server Locale
// Metodo Marika — Studio Abigail
// ==============================================

export async function invocaScritturaViva(payload) {
  try {
    const res = await fetch('http://localhost:3210/narrativa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    return data.text || '⚠️ Nessuna risposta dal motore narrativo.';
  } catch (err) {
    console.error('❌ Errore nella comunicazione con il server narrativo:', err);
    return '⚠️ Il motore narrativo non è raggiungibile. Verifica che “narrativa_server.js” sia in esecuzione.';
  }
}
