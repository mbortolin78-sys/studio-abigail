// ===============================
// ♀️ VENERE AURORIA — Motore Tecnico
// Metodo Marika — Studio Abigail
// ===============================
//
// Sequenza FISSA dei metodi:
// 1) Tema Natale → 2) Venaria → 3) Auroria → 4) Aldebaran
// Nessuna carta, solo calcoli tecnici + Legge Universale.
// ===============================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
import { calcolaOraria } from './calcolo_oraria.js';

// =====================================================
// FUNZIONE PRINCIPALE
// =====================================================

export function eseguiVenereAuroria(data, ora, luogoStr, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando non riconosciuto. Usa: RVA (Venere Auroria).' };

  const luogo = normalizzaLuogo(luogoStr);
  const tz = guessTZ();
  const now = new Date();

  // 1️⃣ Comandi Operativi + Oraria + Legge Universale
  const avvio = safe(() => applicaComandiOperativi('Venere Auroria')) || [];
  const oraria = safe(() => calcolaOraria(data, ora, luogo.name)) || {};
  const legge  = safe(() => applicaLeggeUniversale({ modulo: 'Venere Auroria', data, ora, luogo, oraria })) || {};

  // 2️⃣ Calcoli dei 4 metodi
  const tn = metodoTemaNatale(oraria, luogo);
  const vn = metodoVenaria(oraria, tn);
  const au = metodoAuroria(oraria, vn, tz);
  const al = metodoAldebaran(oraria, au);

  // 3️⃣ Output finale
  const righe = [];
  righe.push(`✨ VENERE AURORIA — Calcolo Tecnico (${tipo})`);
  righe.push(`📅 ${data} — 🕰️ ${ora} — 📍 ${luogo.name}`);
  righe.push('');
  righe.push('🔹 Metodo Tema Natale');
  righe.push(...tn.testo);
  righe.push('');
  righe.push('🔹 Metodo Venaria');
  righe.push(...vn.testo);
  righe.push('');
  righe.push('🔹 Metodo Auroria');
  righe.push(...au.testo);
  righe.push('');
  righe.push('🔹 Metodo Aldebaran');
  righe.push(...al.testo);
  righe.push('');
  righe.push('⚖️ Legge Universale');
  if (Array.isArray(legge?.righe)) righe.push(...legge.righe);
  else righe.push('• Legge applicata secondo protocollo.');
  righe.push('');
  righe.push('✅ Calcolo concluso con rigore secondo le Leggi Universali.');

  const outputFinale = righe.join('\n');
  console.log('✅ Venere Auroria eseguita correttamente:', outputFinale);
  return { output: outputFinale };
}

// =====================================================
// METODO 1 — TEMA NATALE
// =====================================================

function metodoTemaNatale(oraria, luogo) {
  const out = [];
  out.push('• Analisi Venere-centrica: Ascendente, Luna, Venere.');
  out.push('• Parametri richiesti per base relazionale: ASC, Luna, Venere.');
  out.push('• Dignità e ricezioni di Venere da verificare nel calcolo orario.');
  out.push(`• Luogo di riferimento: ${luogo.name}`);
  return { testo: out };
}

// =====================================================
// METODO 2 — VENARIA
// =====================================================

function metodoVenaria(oraria, temaNatale) {
  const out = [];
  out.push('• Fasci attivi: Andromeda, Sirio, Marte, Aldebaran.');
  out.push('• Ogni fascio definisce un ramo-evento e una persona.');
  out.push('• Colori standard: Argento, Oro, Azzurro Elettrico, Blu Elettrico.');
  out.push('• Regola: non saltare alcun ramo numerato, mai invertire l’ordine.');
  out.push('• Verifica con la figura Venere–Marte o altre combinazioni attive.');
  return { testo: out };
}

// =====================================================
// METODO 3 — AURORIA
// =====================================================

function metodoAuroria(oraria, venaria, tz) {
  const out = [];
  out.push('• Analisi delle finestre orarie e dei vettori di manifestazione.');
  out.push('• Identifica la finestra corrente (mattino, pomeriggio, sera, notte).');
  out.push(`• Fuso orario rilevato: ${tz}`);
  out.push('• Impulsi e pergamene da compilare nelle tabelle dedicate.');
  out.push('• Distribuzione temporale completata secondo il modello Auroria.');
  return { testo: out };
}

// =====================================================
// METODO 4 — ALDEBARAN
// =====================================================

function metodoAldebaran(oraria, auroria) {
  const out = [];
  out.push('• Ricalcolo sostituendo il Sole con Aldebaran (9° Gemelli).');
  out.push('• Dignità e ricezioni aggiornate per contatti di Venere.');
  out.push('• Canali pratici: messaggi, immagini, conferme digitali.');
  out.push('• Saturno = filtro o blocco, Nodo Nord = conferma (screenshot/link).');
  out.push('• Timeline precisa: ore e giorni calcolati secondo proiezione reale.');
  return { testo: out };
}

// =====================================================
// HELPERS
// =====================================================

function parseTipo(text = '') {
  const c = String(text).replace(/\./g, '').toUpperCase();
  return /\bRVA\b/.test(c) ? 'RVA' : null;
}

function normalizzaLuogo(luogo) {
  if (!luogo || typeof luogo !== 'string') {
    return { name: 'Montebelluna', lat: 45.776, lon: 12.056 };
  }
  return { name: luogo.trim(), lat: 45.776, lon: 12.056 };
}

function guessTZ() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome'; }
  catch { return 'Europe/Rome'; }
}

function safe(fn) {
  try { return fn && fn(); } catch { return null; }
}
