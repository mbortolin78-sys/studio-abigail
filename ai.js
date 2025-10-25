// ─────────────────────────────────────────────
// ESECUZIONE DEL COMANDO RICONOSCIUTO
// ─────────────────────────────────────────────

export async function processCommand(text) {
  if (!text || text.trim() === '') {
    return { output: "🪶 Inserisci un comando o una domanda." };
  }

  const norm = normalizeCommand(text);
  const canonical = resolveCommand(norm);
  const [now, dataIT, oraIT] = nowPieces();
  const luogoCorrente = defaultLocation();

  if (!canonical) {
    return { output: "✨ Formula non riconosciuta come comando operativo." };
  }

  switch (canonical) {

    // 🌞 AURORIA
    case 'RAE':
    case 'RAS':
      return await eseguiAuroria(dataIT, oraIT, luogoCorrente, canonical);

    // 🌊 ECHO
    case 'REE':
    case 'RES':
      return await eseguiEcho(dataIT, oraIT, luogoCorrente, canonical);

    // 🌬 VELARIA
    case 'RVE':
    case 'RVS':
      return await eseguiVelaria(dataIT, oraIT, luogoCorrente, canonical);

    // ✴ ETERIA
    case 'RETERIAE':
    case 'RETERIAS':
      return await eseguiEteria(dataIT, oraIT, luogoCorrente, canonical);

    // 💫 VENERE
    case 'RVC':
      return await eseguiVenereClassica(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVA':
      return await eseguiVenereAuroria(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVV':
      return await eseguiVenereVelaria(dataIT, oraIT, luogoCorrente, canonical);
    case 'RVETERIA':
      return await eseguiVenereEteria(dataIT, oraIT, luogoCorrente, canonical);

    // 🌙 IDENTIKIT
    case 'RVI':
      return await eseguiIdentikit(dataIT, oraIT, luogoCorrente, canonical);

    // Default
    default:
      return { output: "✨ Formula non riconosciuta come comando operativo." };
  }
}
