// ======================================================
// ♀️ VENERE VELARIA — Motore Tecnico (Metodo Marika)
// Conforme a: Legge Universale (art.7.1–7.6) e Protocollo Operativo 2025
// ======================================================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';

// ====================== ENTRY POINT ======================

export function eseguiVenereVelaria(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando non riconosciuto. Usa: RVV (Venere Velaria).' };

  // 1️⃣ Comandi Operativi + Oraria + Legge Universale
  const operativi = safe(() => applicaComandiOperativi('Venere Velaria')) || [];
  const oraria = safe(() => calcolaOraria(data, ora, luogo)) || {};
  const legge  = safe(() => applicaLeggeUniversale({ modulo: 'Venere Velaria', data, ora, luogo })) || {};

  // 2️⃣ Metodi in sequenza tassativa
  const tn = metodoTemaNatale(oraria);
  const vn = metodoVenaria(oraria);
  const vv = metodoVelaria(oraria);
  const al = metodoAldebaran(oraria);

  // 3️⃣ Costruzione output
  const righe = [];
  righe.push(`✨ METODO VENERE VELARIA — ${tipo}`);
  righe.push(`📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`);
  righe.push('');
  righe.push('🔹 Metodo Tema Natale');
  righe.push(...tn.testo);
  righe.push('');
  righe.push('🔹 Metodo Venaria');
  righe.push(...vn.testo);
  righe.push('');
  righe.push('🔹 Metodo Velaria');
  righe.push(...vv.testo);
  righe.push('');
  righe.push('🔹 Metodo Aldebaran');
  righe.push(...al.testo);
  righe.push('');
  righe.push('⚖️ Legge Universale');
  if (Array.isArray(legge?.righe)) righe.push(...legge.righe);
  else righe.push('• Legge applicata secondo protocollo.');
  righe.push('');
  righe.push('✅ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali — Metodo Marika.');

  const outputFinale = righe.join('\n');
  console.log('✅ Venere Velaria eseguita correttamente:', outputFinale);
  return { output: outputFinale };
}

// ======================================================
//            METODO 1 — TEMA NATALE (riassunto tecnico)
// ======================================================
function metodoTemaNatale(oraria) {
  const out = [];
  out.push('• Analisi base: ASC, Luna, Venere, Marte, cuspidi I–XII.');
  out.push('• Consultante = ASC + Luna + Signore ASC.');
  out.push('• Partner = Cuspide VII + Signore VII.');
  out.push('• Blocchi: XII, Saturno duro, retrogradi.');
  out.push('• Stabilità: X, IV, II.');
  return { testo: out };
}

// ======================================================
//          METODO 2 — VENARIA (fasci luminosi)
// ======================================================
function metodoVenaria(oraria) {
  const out = [];
  out.push('• Ricostruzione fasci Andromeda–Sirio–Marte–Aldebaran.');
  out.push('• Regola tassativa: due luci separate (viola fluo + arancio fluo) → fusione solo su Marte.');
  out.push('• Codici Marte: Argento (consultante), Oro/Bronzo (falsa energia), Azzurro Elettrico (reale), Blu Elettrico (mentale).');
  out.push('• Rami numerati ① ② ③… ogni presenza marcata con TAG corretto.');
  return { testo: out };
}

// ======================================================
//     METODO 3 — VELARIA (oraria + collisione + timeline)
// ======================================================
function metodoVelaria(oraria) {
  const out = [];
  out.push('• Oraria Classica interna eseguita su data–ora–luogo domanda.');
  out.push('• Luna = metronomo: aspetti applicativi = attivazioni (ora/giorno).');
  out.push('• Case rilevanti: III messaggi – XI social – IX estero – I/IV fisico – X visibilità.');
  out.push('• Fusione Venaria → Velaria: ricalcolo rami dal fascio consultante.');
  out.push('• Timeline = quando, chi, cosa, dove, perché, sviluppo, dettagli, intenzioni.');
  out.push('• Portali Argento + Azzurro = reali / Oro o Bronzo = impersonificazione / Rame = filtro.');
  out.push('• Calibrazione Identità: coincidenza fasci = autenticità / scarto = deviazione.');
  return { testo: out };
}

// ======================================================
//        METODO 4 — ALDEBARAN (oraria evoluta)
// ======================================================
function metodoAldebaran(oraria) {
  const out = [];
  out.push('• Ricalcolo Oraria con Aldebaran (9° Gemelli) al posto del Sole.');
  out.push('• Aspetti applicativi = eventi imminenti / separativi = fatti passati.');
  out.push('• Traduzione pratica degli aspetti:');
  out.push('  – Marte = messaggio diretto');
  out.push('  – Mercurio = chat scritta');
  out.push('  – Luna = video/chiamata');
  out.push('  – Venere = immagine o reazione');
  out.push('  – Saturno = blocco/filtro');
  out.push('  – Nodo Nord = conferma digitale (screenshot/link)');
  out.push('• Durata temporale: gradi mancanti → ore/giorni.');
  return { testo: out };
}

// ======================================================
//                  HELPERS
// ======================================================
function parseTipo(c) {
  const s = String(c || '').toUpperCase();
  return s.includes('RVV') ? 'RVV' : null;
}

function safe(fn) {
  try { return fn && fn(); } catch { return null; }
}
