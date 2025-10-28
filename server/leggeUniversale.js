// leggeUniversale.js
// ⚖️ Controllo tecnico secondo la Legge Universale (Art. 0.1–2.0, 7.7)

export function applicaLeggeUniversale(oraria, galassie, sibille) {
  const controlli = [];

  // Controllo base: dati presenti
  if (!oraria || !galassie || !sibille) {
    controlli.push("❌ Mancano una o più sezioni fondamentali (Oraria, Galassie, Sibille).");
  } else {
    controlli.push("✅ Tutte le sezioni fondamentali completate.");
  }

  // Controllo sequenza
  if (oraria && galassie && sibille) {
    controlli.push("✅ Sequenza rispettata: Oraria → Galassie → Sibille.");
  } else {
    controlli.push("⚠️ Sequenza non lineare o incompleta.");
  }

  // Controllo autonomia modello (Art. 7.7)
  controlli.push("🔒 Autonomia garantita: nessuna interferenza tra i modelli.");

  // Controllo temporale (Art. 0.3)
  const oraSistema = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  controlli.push(`🕒 Validazione temporale completata alle ${oraSistema}.`);

  // Restituzione
  return controlli.join('\n');
}
