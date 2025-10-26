// ======================================================
// ♀️ RVE — Generatore di Scrittura Estesa (Velaria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// Scrittura viva, mai ripetitiva: la narrativa è generata dinamicamente
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js'; // modulo che crea la scrittura dinamica

export async function generaRVE(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO 1 — Apertura del Campo =====
  const apertura = await invocaScritturaViva({
    tema: 'apertura velaria',
    contesto: 'inizio del campo energetico, centratura percettiva',
    tono: 'analitico e fluido',
    parole: 80,
    energia: 'Venere in moto di osservazione'
  });

  // ===== BLOCCO 2 — Centro del Movimento =====
  const centro = await invocaScritturaViva({
    tema: 'centro velaria',
    contesto: 'interazione tra luce e materia, percezione reale',
    tono: 'lucido, coerente, percettivo',
    parole: 80,
    energia: 'Aldebaran come catalizzatore del movimento'
  });

  // ===== BLOCCO 3 — Polarità e Direzione =====
  const polarita = await invocaScritturaViva({
    tema: 'polarità velaria',
    contesto: 'analisi dei due poli in contrasto o armonia',
    tono: 'razionale ma empatico',
    parole: 80,
    energia: 'Fusione Venere–Aldebaran'
  });

  // ===== BLOCCO 4 — Trasmissione del Segnale =====
  const trasmissione = await invocaScritturaViva({
    tema: 'trasmissione velaria',
    contesto: 'flusso dell’informazione sottile, traduzione in realtà',
    tono: 'analitico con sfumature poetiche',
    parole: 80,
    energia: 'Interferenza luminosa tra fasci attivi'
  });

  // ===== BLOCCO 5 — Ritorno e Chiusura =====
  const ritorno = await invocaScritturaViva({
    tema: 'ritorno velaria',
    contesto: 'ricomposizione e sintesi dei dati interiori',
    tono: 'armonico, quieto, integrativo',
    parole: 80,
    energia: 'Ritorno al punto di quiete dopo il fascio di percezione'
  });

  // ===== SINTESI (≈100 parole) =====
  const sintesi = await invocaScritturaViva({
    tema: 'sintesi velaria',
    contesto: 'riepilogo cosciente della dinamica energetica osservata',
    tono: 'chiaro, completo, equilibrato',
    parole: 100,
    energia: 'Allineamento finale sotto la Legge Universale'
  });

  // ===== CHIUSURA TECNICA =====
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    apertura,
    '',
    centro,
    '',
    polarita,
    '',
    trasmissione,
    '',
    ritorno,
    '',
    `🔹 Sintesi: ${sintesi}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RVE generata correttamente');
  return { output: testoFinale };
}

export default generaRVE ;
