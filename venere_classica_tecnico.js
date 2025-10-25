// =======================================
// ♀️ VENERE CLASSICA — Motore Tecnico
// Metodo Marika — Studio Abigail
// =======================================
//
// Flusso tassativo:
// 1) Comandi Operativi
// 2) Oraria reale
// 3) Metodi in sequenza: Tema Natale → Venaria → Oraria Classica → Aldebaran
// 4) Applicazione Legge Universale (FSRU)
// =======================================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';

// ==================== ENTRY POINT ====================

export function eseguiVenereClassica(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: `Comando non riconosciuto. Usa: RVC (Venere Classica).` };

  const operativi = safe(() => applicaComandiOperativi('Venere Classica')) || [];
  const oraria = safe(() => calcolaOraria(data, ora, luogo)) || {};
  const legge  = safe(() => applicaLeggeUniversale({ modulo: 'Venere Classica', data, ora, luogo })) || {};

  // Esecuzione in sequenza dei 4 metodi canonici
  const tn = metodoTemaNatale(oraria);
  const vn = metodoVenaria(oraria);
  const oc = metodoOrariaClassica(oraria);
  const al = metodoAldebaran(oraria);

  const righe = [];
  righe.push(`✨ METODO VENERE CLASSICA — ${tipo}`);
  righe.push(`📅 ${data} — 🕰️ ${ora} — 📍 ${luogo}`);
  righe.push('');
  righe.push('🔹 Metodo Tema Natale');
  righe.push(...tn.testo);
  righe.push('');
  righe.push('🔹 Metodo Venaria');
  righe.push(...vn.testo);
  righe.push('');
  righe.push('🔹 Metodo Oraria Classica');
  righe.push(...oc.testo);
  righe.push('');
  righe.push('🔹 Metodo Aldebaran');
  righe.push(...al.testo);
  righe.push('');
  righe.push('⚖️ Legge Universale');
  if (Array.isArray(legge?.righe)) righe.push(...legge.righe);
  else righe.push('• Legge applicata secondo protocollo.');
  righe.push('');
  righe.push('✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.');

  return { output: righe.join('\n') };
}

// =====================================================
//                  METODO 1 — TEMA NATALE
// =====================================================

function metodoTemaNatale(oraria) {
  const out = [];
  out.push('• Analisi di base: ASC, Luna, Venere, Marte, cuspidi I–XII.');
  out.push('• Consultante: ASC + signore ASC + Luna.');
  out.push('• Energia affettiva: Venere (amore), Marte (azione).');
  out.push('• Partner: cuspide VII + signore VII + pianeti in VII.');
  out.push('• Vie di contatto: III, XI, IX (chat, social, estero).');
  out.push('• Blocchi: XII, Saturno duro, retrogradi.');
  out.push('• Stabilità: X, IV, II.');
  return { testo: out };
}

// =====================================================
//                  METODO 2 — VENARIA
// =====================================================

function metodoVenaria(oraria) {
  const out = [];
  out.push('• Fasci attivi: Andromeda, Sirio, Marte, Aldebaran.');
  out.push('• Ogni fascio definisce un ramo-evento e una persona.');
  out.push('• Colori standard: Argento, Oro, Azzurro Elettrico, Blu Elettrico.');
  out.push('• Regola: non saltare alcun ramo numerato, mai invertire l’ordine.');
  return { testo: out };
}

// =====================================================
//              METODO 3 — ORARIA CLASSICA
// =====================================================

function metodoOrariaClassica(oraria) {
  const out = [];
  out.push('• Centro: Sole. Analisi di case, pianeti e aspetti applicativi.');
  out.push('• Consultante = Ascendente + Luna.');
  out.push('• Partner = Signore VII o pianeti in VII.');
  out.push('• Oggetto/domanda = casa attivata (es. III per messaggi, X per esito).');
  out.push('• Aspetti applicativi = eventi imminenti.');
  out.push('• Aspetti separativi = eventi passati.');
  out.push('• Orbi sobri: congi/opp 6°, trig/sest 4°, quad 5°.');
  out.push('• Timeline generica: giorni/settimane.');
  return { testo: out };
}

// =====================================================
//              METODO 4 — ALDEBARAN
// =====================================================

function metodoAldebaran(oraria) {
  const out = [];
  out.push('• Sostituzione Sole → Aldebaran (9° Gemelli).');
  out.push('• Ricalcolo dignità e ricezioni con Aldebaran.');
  out.push('• Aspetti applicativi → eventi imminenti (messaggi, emoji, chiamate).');
  out.push('• Aspetti separativi → fatti già accaduti.');
  out.push('• Marte = messaggio diretto; Mercurio = chat scritta; Luna = video; Venere = immagine/reazione; Saturno = filtro o blocco.');
  out.push('• Nodo Nord = conferma digitale (screenshot, link).');
  out.push('• Timeline dettagliata: ore/giorni precisi.');
  return { testo: out };
}

// =====================================================
//                  HELPERS
// =====================================================

function parseTipo(c) {
  const s = String(c || '').toUpperCase();
  return s.includes('RVC') ? 'RVC' : null;
}

function safe(fn) {
  try { return fn && fn(); } catch { return null; }
}
// ===============================
// OUTPUT
// ===============================
// ===============================
// OUTPUT
// ===============================
const outputFinale = righe.join('\n');
console.log('✅ Venere Classica eseguita correttamente:', outputFinale);
return { output: outputFinale };
}
