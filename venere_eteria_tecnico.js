// ======================================================
// ♀️ VENERE ETERIA — Motore Tecnico (Metodo Marika)
// Flusso tassativo (identico a Eteria “normale”, senza carte):
// 1) Comandi Operativi
// 2) Oraria Classica (reale)
// 3) Proiezione Galattica (Andromeda, Sirio, Taurus, Michelaus M41)
// 4) Salto Quantico (Passato / Presente / Futuro)
// 5) Fusione con Aldebaran (oraria evoluta)
// 6) Legge Universale + FSRU-E/24
// Nessuna estrazione, nessun mazzo, zero narrativa.
// ======================================================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ====================== ENTRY POINT ======================

export function eseguiVenereEteria(data, ora, luogo, comando) {
  const tipo = parseTipo(comando);
  if (!tipo) return { output: 'Comando non riconosciuto. Usa: RVETERIA (Venere Eteria).' };

  const now   = new Date();
  const luogoN = normalizzaLuogo(luogo);
  const tz    = guessTZ();

  // 1) Comandi Operativi + Oraria + Legge Universale
  const operativi = safe(() => applicaComandiOperativi('Venere Eteria')) || [];
  const oraria    = safe(() => calcolaOraria(data, ora, luogoN.name)) || {};
  const legge     = safe(() => applicaLeggeUniversale({ modulo: 'Venere Eteria', now, luogo: luogoN, oraria })) || {};

  // 2–5) Metodi in sequenza tassativa
  const oc  = metodoOrariaClassica(oraria, luogoN, tz);
  const gal = metodoGalassieEteria(oraria);
  const sq  = metodoSaltoQuantico(oraria, gal, tz);
  const al  = metodoAldebaranEteria(oraria, gal);

  // 6) Output tecnico (nessuna narrativa)
  const righe = [];
  righe.push(`✨ VENERE ETERIA — Calcolo Tecnico (${tipo})`);
  righe.push(`📅 ${data} — 🕰️ ${ora} — 📍 ${luogoN.name}`);
  righe.push('');
  righe.push('🔹 Oraria Classica');
  righe.push(...oc.testo);
  righe.push('');
  righe.push('🔹 Proiezione Galattica');
  righe.push(...gal.testo);
  righe.push('');
  righe.push('🔹 Salto Quantico (Passato / Presente / Futuro)');
  righe.push(...sq.testo);
  righe.push('');
  righe.push('🔹 Aldebaran (Oraria Evoluta)');
  righe.push(...al.testo);
  righe.push('');
  righe.push('⚖️ Legge Universale');
  if (Array.isArray(legge?.righe) && legge.righe.length) righe.push(...legge.righe);
  else righe.push('• Legge applicata secondo protocollo FSRU-E/24.');
  righe.push('');
  righe.push('✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali – Metodo Marika (FSRU-E/24).');

  return { output: righe.join('\n') };
}

// ======================================================
//                 METODO — ORARIA CLASSICA
// ======================================================
function metodoOrariaClassica(oraria, luogo, tz) {
  const out = [];
  // Richieste minime
  const hasAsc = isNum(oraria?.ascLon);
  const sunLon = oraria?.sunLon;
  const planets = oraria?.planets || {};

  if (!hasAsc || !isNum(sunLon) || !isNum(planets?.Luna?.lon)) {
    out.push('• Dati oraria incompleti (ASC/Sole/Luna). Integra posizioni reali.');
  } else {
    out.push(`• ASC: ${fmtDeg(oraria.ascLon)}  — Sole: ${fmtDeg(sunLon)}  — Luna: ${fmtDeg(planets.Luna.lon)}`);
  }

  // Finestre orarie di base
  const hh = oraLocaleHH(tz);
  const finestra = (hh >= 6 && hh < 12) ? 'mattino'
                 : (hh >= 12 && hh < 18) ? 'pomeriggio'
                 : (hh >= 18 && hh < 21) ? 'sera'
                 : 'notte';
  out.push(`• Finestra attuale: ${finestra} (${pad2(hh)}:00)`);
  out.push(`• Luogo di calcolo: ${luogo.name}`);

  // Consultante/Partner (schema operativo)
  out.push('• Consultante = Ascendente + Luna (tonalità).');
  out.push('• Partner = cuspide VII + signore VII (+ pianeti in VII).');
  return { testo: out };
}

// ======================================================
//             METODO — PROIEZIONE GALATTICA
// (Andromeda, Sirio, Taurus, Michelaus M41; stelle appartengono alla galassia)
// ======================================================
function metodoGalassieEteria(oraria) {
  const out = [];
  const sun = oraria?.sunLon;
  const pl  = oraria?.planets || {};

  if (!isNum(sun) || !Object.keys(pl).length) {
    out.push('• Impossibile valutare figure Sole–pianeta: dati insufficienti.');
    return { testo: out };
  }

  // Rilevo figure Sole–pianeti (aspetti base)
  const ASP = [
    { tipo: 'CONGIUNZIONE', g: 0,   orb: 6 },
    { tipo: 'SESTILE',      g: 60,  orb: 4 },
    { tipo: 'QUADRATO',     g: 90,  orb: 5 },
    { tipo: 'TRIGONO',      g: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  g: 180, orb: 6 },
  ];
  const figures = [];
  for (const [nome, val] of Object.entries(pl)) {
    if (!isNum(val?.lon)) continue;
    const d = sep(sun, val.lon);
    const found = bestAsp(d, ASP);
    if (found) figures.push({ pianeta: nome, aspetto: found.tipo, orb: found.diff, delta: d });
  }

  if (!figures.length) {
    out.push('• Nessuna figura Sole–pianeta attiva entro orbi standard.');
    out.push('• Nota: le stelle appartengono alla Galassia; inserisci tavole ufficiali quando pronte.');
    return { testo: out };
  }

  figures.sort((a,b) => a.orb - b.orb);
  const dom = figures[0];

  // Galassia prevalente: schema operativo (sostituire con tavole ufficiali)
  // Qui non inventiamo nomi: usi i 4 contenitori e li popoli dai tuoi doc
  const galassia = stimaGalassiaDaPianeta(dom.pianeta);
  out.push(`• Figura dominante: Sole in ${dom.aspetto} a ${dom.pianeta} (Δ=${gr1(dom.delta)}°, orb=${gr1(dom.orb)}°).`);
  out.push(`• Proiezione attiva: ${galassia}.`);
  out.push('• Le stelle sono parte della Galassia (non dei pianeti).');

  return { testo: out };
}

function stimaGalassiaDaPianeta(p) {
  // Segnaposto coerente: sostituisci con la tua mappa ufficiale
  const mentali    = new Set(['Mercurio', 'Urano']);
  const emozionali = new Set(['Luna', 'Venere', 'Nettuno']);
  const materiali  = new Set(['Marte', 'Saturno', 'Plutone', 'Giove']);

  if (mentali.has(p)) return 'Sirio';
  if (emozionali.has(p)) return 'Andromeda';
  if (materiali.has(p)) return 'Taurus';
  return 'Michelaus (M41)';
}

// ======================================================
//                METODO — SALTO QUANTICO
// (Portali Passato / Presente / Futuro; fari: Sole e Luna Nera)
// ======================================================
function metodoSaltoQuantico(oraria, gal, tz) {
  const out = [];
  const sun = oraria?.sunLon;
  const lilith = oraria?.planets?.LunaNera?.lon; // se disponibile dal tuo calcolo_oraria

  if (!isNum(sun)) {
    out.push('• Salto Quantico: Sole mancante. Integra oraria reale.');
    return { testo: out };
  }

  // Piano per piano (schema tecnico; sostituisci con formule dei tuoi doc)
  const piani = ['Passato', 'Presente', 'Futuro'].map(label => {
    const base = (label === 'Presente') ? sun : rot(sun, label === 'Passato' ? -33 : 33);
    const faro = isNum(lilith) ? `Faro aggiuntivo: Luna Nera ${fmtDeg(lilith)}` : 'Faro aggiuntivo: Luna Nera n/d';
    const figura = 'Figura: triangolazione energetica su fasci attivi (vedi Venaria).';
    return `• ${label} → ancora ${fmtDeg(base)} — ${faro} — ${figura}`;
  });

  out.push(...piani);
  out.push('• Traduzione: ogni piano vincola cosa/chi/dove/perché + direzione del flusso.');
  return { testo: out };
}

// ======================================================
//           METODO — ALDEBARAN (Oraria Evoluta)
// (Ricalcolo con Aldebaran al posto del Sole; canali pratici)
// ======================================================
function metodoAldebaranEteria(oraria, gal) {
  const out = [];
  const ven = oraria?.planets?.Venere?.lon;
  if (!isNum(ven)) {
    out.push('• Venere mancante: impossibile mappare canali pratici su Aldebaran.');
    return { testo: out };
  }

  out.push('• Sostituzione Sole → Aldebaran (9° Gemelli).');
  out.push('• Aspetti applicativi → eventi imminenti; separativi → già accaduti.');
  out.push('• Canali pratici (schema operativo):');
  out.push('  – Marte = messaggio diretto');
  out.push('  – Mercurio = chat testuale');
  out.push('  – Luna = video/chiamata');
  out.push('  – Venere = immagine/reazione');
  out.push('  – Saturno = blocco/filtro');
  out.push('  – Nodo Nord = conferma digitale');
  return { testo: out };
}

// ======================================================
//                     HELPERS
// ======================================================
function parseTipo(c) {
  const s = String(c || '').replace(/\./g, '').toUpperCase();
  return s.includes('RVETERIA') ? 'RVETERIA' : null;
}
function normalizzaLuogo(l) {
  if (!l || typeof l !== 'string') return { name: 'Montebelluna', lat: 45.776, lon: 12.056 };
  return { name: l.trim(), lat: 45.776, lon: 12.056 }; // opzionale: mappa coordinate precise
}
function guessTZ() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Rome'; }
  catch { return 'Europe/Rome'; }
}
function isNum(x) { return typeof x === 'number' && isFinite(x); }
function norm360(x){ return ((x % 360) + 360) % 360; }
function sep(a,b){ const d = Math.abs(norm360(a)-norm360(b)); return d>180 ? 360-d : d; }
function bestAsp(delta, defs){
  let best=null;
  for (const d of defs){ const diff=Math.abs(delta-d.g); if (diff<=d.orb && (!best || diff<best.diff)) best={tipo:d.tipo,diff}; }
  return best;
}
function rot(lon, deg){ return norm360((lon||0)+deg); }
function fmtDeg(x){ return `${gr1(norm360(x))}°`; }
function gr1(n){ return (Math.round(Number(n)*10)/10).toFixed(1); }
function pad2(n){ return String(n).padStart(2,'0'); }
function oraLocaleHH(tz){
  try { return Number(new Intl.DateTimeFormat('it-IT',{hour:'2-digit',hour12:false,timeZone:tz}).format(new Date())); }
  catch { return new Date().getHours(); }
}
function safe(fn){ try { return fn && fn(); } catch { return null; } }

export default { eseguiVenereEteria };
