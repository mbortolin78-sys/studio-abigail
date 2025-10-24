// rvi_tecnico.js
// Identikit Universale (RVI) — motore tecnico conforme ai documenti Metodo Marika
// Requisiti chiave rispettati:
// - Comando “RVI [TAG]” con TAG obbligatorio dai dizionari ufficiali
// - Import automatico dei dati della stesura precedente (data/ora/luogo, oraria, galassie, Aldebaran…)
// - Fascio energetico focalizzato SOLO sulla presenza marcata dal TAG (rami esclusi)
// - Output tecnico plain-text-ready per narrativa ≥ 550 parole (narrazione separata)
// Fonti: Identikit (RVI) e RVI_TAG (dizionari), Comandi Operativi (vincoli esecutivi).

import { applicaComandiOperativi } from './comandiOperativi.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';

// ===== Stato effimero dell’ultima stesura (riempito dai moduli Venere/Auroria/Eteria/Velaria)
let LAST_CONTEXT = null;

/** Chiamare da Auroria/Echo/Velaria/Eteria subito dopo ogni calcolo tecnico */
export function setLastContext(ctx) {
  // ctx atteso: { data, ora, luogo:{name,lat,lon}, timezone, oraria, galassie, aldebaran, canali:{venaria,auroria}, polarita, lineaCalcolo }
  LAST_CONTEXT = ctx ? { ...ctx } : null;
}

// ===== Dizionario TAG (minimo vitale). Puoi anche importare un JSON generato dai tuoi docx.
const TAGS = new Set([
  // Sentimentale
  'UFFICIALE','AMANTE','LEGAME_STORICO','NUOVO_INGRESSO','ANIMA_GEMELLA','SEPARAZIONE','OMBRA_AFFETTIVA',
  // Familiare
  'MADRE','PADRE','FIGLIO','FIGLIA','FRATELLO','SORELLA','NONNO','NONNA','ZIO','ZIA',
  // Lavorativo / Sociale / Spirituale / Ambientale
  'COLLEGA','SUPERIORE','SUBORDINATO','CLIENTE','FORNITORE','MENTORE','ALLIEVO',
  'AMICO','AMICA','CONOSCENTE','RIVALE','SOSTEGNO','GRUPPO',
  'GUIDA','PROTEZIONE','NEMICO_KARMICO','DEBITO','ANIMA_OMBRA','MAESTRO_INTERIORE','SPIRITO_GEMELLO',
  'LUOGO','CASA','LAVORO','VIAGGIO','EVENTO','COMUNITÀ'
]);
// Regola d’uso dei TAG: obbligatori, univoci, scelti per intenzione della domanda.  [oai_citation:3‡RVI_TAG.docx](sediment://file_000000009928620ab2ce1a3831e8a185)

// ===== Entry Point =====
export function processRVI(inputText) {
  // 1) Parsing comando + TAG
  const parsed = parseRVI(inputText);
  if (!parsed.ok) return wrap(`❌ ${parsed.error}`);

  // 2) Verifica contesto precedente obbligatorio
  if (!LAST_CONTEXT) {
    // L’Identikit NON crea un nuovo cielo: usa i dati già calcolati.  [oai_citation:4‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
    return wrap('❌ Nessun contesto precedente. Esegui prima il calcolo (RVA/RVV/RVC/RVEteria/…)', { ok: false });
  }

  // 3) Avvio operativo + Legge Universale
  const avvio = applicaComandiOperativi('RVI'); // vincoli esecutivi del comando RVI.  [oai_citation:5‡Comandi Operativi.docx](sediment://file_00000000ce68620a960fedc61db407ea)
  const legge = safe(() => applicaLeggeUniversale({
    modulo: 'RVI',
    nowISO: new Date().toISOString(),
    location: LAST_CONTEXT.luogo,
    oraria: LAST_CONTEXT.oraria
  }));

  // 4) Costruzione fascio: chiude su TAG, esclude altri rami.  [oai_citation:6‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
  const fascio = costruisciFascio(LAST_CONTEXT, parsed.tag);

  // 5) Mappa dei campi Identikit (A–I) — qui agganci le tue “chiavi tecniche” dagli allegati
  // (placeholder strutturale, nessuna narrativa: calcoli numerici/simbolici solo tecnici)
  const campi = calcolaCampiIdentikit(fascio);

  // 6) Output tecnico (plain-text-ready; la vera narrativa 550 parole si farà in fase 2)
  const out = formatTecnico({
    tag: parsed.tag,
    ctx: LAST_CONTEXT,
    avvio,
    legge,
    fascio,
    campi
  });

  // Chiusura fascio prevista a fine stesura (operativa)  [oai_citation:7‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
  return wrap(out, {
    ok: true,
    tag: parsed.tag,
    imported: pick(LAST_CONTEXT, ['data','ora','luogo','timezone','oraria','galassie','aldebaran','polarita','lineaCalcolo','canali'])
  });
}

// ===== Helpers =====
function parseRVI(text='') {
  const raw = String(text).trim().replace(/\./g,' ').toUpperCase();
  // ammessi “RVI TAG” oppure “R V I [TAG]”
  const m = raw.match(/\bRVI\s+([A-ZÀ-Ü_]+)\b/);
  if (!m) return { ok: false, error: 'Comando non valido. Usa: RVI [TAG] (es. RVI AMANTE).' };
  const tag = m[1].normalize('NFC');
  if (!TAGS.has(tag)) {
    return { ok: false, error: `TAG sconosciuto: ${tag}. Verifica nel dizionario ufficiale.` };
  }
  return { ok: true, tag };
}

function costruisciFascio(ctx, tag) {
  // In RVI il fascio si concentra unicamente sul soggetto marcato dal TAG.  [oai_citation:8‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
  return {
    tag,
    canali: ctx.canali || {},
    // Eredita tutto il necessario dalla stesura precedente: data/ora/luogo, oraria, galassie, Aldebaran, ecc.  [oai_citation:9‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
    data: ctx.data, ora: ctx.ora, luogo: ctx.luogo, timezone: ctx.timezone,
    oraria: ctx.oraria, galassie: ctx.galassie, aldebaran: ctx.aldebaran,
    polarita: ctx.polarita, lineaCalcolo: ctx.lineaCalcolo
  };
}

function calcolaCampiIdentikit(fascio) {
  // Placeholder tecnico per i tuoi Allegati A–I: Età, Occhi, Capelli, Voce, Corporatura, Stile, Asset emotivo, Asset comunicativo, Asset fisico…
  // Ogni campo = “frequenza specifica” del soggetto.  [oai_citation:10‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
  // Qui mettiamo solo il gancio; le **formule** arriveranno quando incolliamo le chiavi tecniche degli allegati.
  const base = { confidenza: '—', valore: null, note: 'TODO: allegati A–I' };
  return {
    ETA: { ...base },
    OCCHI: { ...base },
    CAPELLI: { ...base },
    VOCE: { ...base },
    CORPORATURA: { ...base },
    STILE: { ...base },
    ASSET_EMOTIVO: { ...base },
    ASSET_COMUNICATIVO: { ...base },
    ASSET_FISICO: { ...base },
  };
}

function formatTecnico({ tag, ctx, avvio, legge, fascio, campi }) {
  // Plain text, nessun elenco numerato. La narrativa da 550 parole è successiva e separata (Protocollo Scrittura).  [oai_citation:11‡Comandi Operativi.docx](sediment://file_00000000ce68620a960fedc61db407ea)  [oai_citation:12‡Identikit.docx](sediment://file_000000004834620a894c3d709d2dd10d)
  const righe = [];
  righe.push(`IDENTIKIT UNIVERSALE (RVI) — TAG: ${tag}`);
  righe.push(`Contesto importato: ${ctx.data} ${ctx.ora} — ${ctx.luogo?.name} (${ctx.timezone})`);
  righe.push(`Oraria: ${ctx.oraria?.stato || 'n/d'} — Galassie: ${ctx.galassie?.prevalente || 'n/d'} (${ctx.galassie?.aspetto || 'n/d'})`);
  righe.push(`Aldebaran/Linea: ${ctx.aldebaran ? 'attivo' : 'n/d'} — Polarità: ${ctx.polarita || 'n/d'} — Linea: ${ctx.lineaCalcolo || 'n/d'}`);
  righe.push(`Fascio chiuso sul soggetto [${tag}] — rami non pertinenti esclusi.`);
  righe.push('');
  righe.push(`Campi frequenziali (A–I) impostati per calcolo tecnico (vedi Allegati):`);
  for (const [k,v] of Object.entries(campi)) {
    righe.push(`${k}: ${v.note}`);
  }
  righe.push('');
  if (Array.isArray(avvio) && avvio.length) {
    righe.push('Comandi Operativi:');
    for (const a of avvio) righe.push(`• ${a}`);
  }
  if (legge && typeof legge === 'object') {
    righe.push(`Legge Universale: caricata (vincolo metodologico e occultamento dati tecnici).`);
  }
  righe.push('Chiusura fascio: OK. Pronto per narrativa (≥ 550 parole, plain text).');
  return righe.join('\n');
}

function wrap(output, meta) { return meta ? ({ output, _meta: meta }) : ({ output }); }
function safe(fn){ try { return fn && fn(); } catch { return null; } }
function pick(o, keys){ const r={}; keys.forEach(k=>{ if(o&&k in o) r[k]=o[k];}); return r; }

export default { processRVI, setLastContext };
