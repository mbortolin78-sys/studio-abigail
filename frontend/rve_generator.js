// ======================================================
// ♀️ RVE — Generatore di Scrittura Estesa (Velaria)
// Metodo Marika — conforme a Legge Universale e Protocollo Scrittura
// Scrittura viva, mai ripetitiva: la narrativa è generata dinamicamente
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { generaNarrativa } from './llama_bridge.js'; // motore narrativo dinamico

export async function generaRVE(data, ora, luogo, datiTecnici = {}) {
  // ===== BLOCCO 1 — Apertura del Campo =====
  const apertura = await generaNarrativa(
    {
      tema: 'apertura velaria',
      contesto: 'inizio del campo energetico, centratura percettiva',
      tono: 'analitico e fluido',
      parole: 80,
      energia: 'Venere in moto di osservazione',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Apertura del Campo"
  );

  // ===== BLOCCO 2 — Centro del Movimento =====
  const centro = await generaNarrativa(
    {
      tema: 'centro velaria',
      contesto: 'interazione tra luce e materia, percezione reale',
      tono: 'lucido, coerente, percettivo',
      parole: 80,
      energia: 'Aldebaran come catalizzatore del movimento',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Centro del Movimento"
  );

  // ===== BLOCCO 3 — Polarità e Direzione =====
  const polarita = await generaNarrativa(
    {
      tema: 'polarità velaria',
      contesto: 'analisi dei due poli in contrasto o armonia',
      tono: 'razionale ma empatico',
      parole: 80,
      energia: 'Fusione Venere–Aldebaran',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Polarità e Direzione"
  );

  // ===== BLOCCO 4 — Trasmissione del Segnale =====
  const trasmissione = await generaNarrativa(
    {
      tema: 'trasmissione velaria',
      contesto: 'flusso dell’informazione sottile, traduzione in realtà',
      tono: 'analitico con sfumature poetiche',
      parole: 80,
      energia: 'Interferenza luminosa tra fasci attivi',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Trasmissione del Segnale"
  );

  // ===== BLOCCO 5 — Ritorno e Chiusura =====
  const ritorno = await generaNarrativa(
    {
      tema: 'ritorno velaria',
      contesto: 'ricomposizione e sintesi dei dati interiori',
      tono: 'armonico, quieto, integrativo',
      parole: 80,
      energia: 'Ritorno al punto di quiete dopo il fascio di percezione',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Ritorno e Chiusura"
  );

  // ===== SINTESI (≈100 parole) =====
  const sintesi = await generaNarrativa(
    {
      tema: 'sintesi velaria',
      contesto: 'riepilogo cosciente della dinamica energetica osservata',
      tono: 'chiaro, completo, equilibrato',
      parole: 100,
      energia: 'Allineamento finale sotto la Legge Universale',
      contestoGlobale: { data, ora, luogo, datiTecnici }
    },
    "RVE - Sintesi"
  );

  // ===== CHIUSURA TECNICA =====
  const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(
    datiTecnici
  )}`;

  // ===== COMPOSIZIONE COMPLETA =====
  const testoFinale = [
    apertura.trim(),
    '',
    centro.trim(),
    '',
    polarita.trim(),
    '',
    trasmissione.trim(),
    '',
    ritorno.trim(),
    '',
    `🔹 Sintesi: ${sintesi.trim()}`,
    '',
    finale
  ].join('\n');

  console.log('✅ Scrittura RVE generata correttamente');
  return { output: testoFinale };
}

export default generaRVE;
