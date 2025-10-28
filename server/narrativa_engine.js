// ==============================================
// ✦ NARRATIVA ENGINE — Connessione a Ollama via Server Aruba
// Metodo Marika — Studio Abigail
// ==============================================

export async function invocaScritturaViva(payload) {
  try {
    console.log("📤 Invio al server narrativo:", payload);

    // 🔗 collegamento al server remoto Aruba
    const res = await fetch('http://188.213.168.151:3210/api/comando', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log("📥 Risposta ricevuta:", res.status);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    console.log("📜 Dati dal server:", data);

    return data.text || '⚠️ Nessuna risposta dal motore narrativo.';
  } catch (err) {
    console.error('❌ Errore nella comunicazione con il server narrativo:', err);
    return '⚠️ Il motore narrativo non è raggiungibile. Verifica che “narrativa_server.js” sia in esecuzione sul VPS Aruba.';
  }
}
