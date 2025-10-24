// ==============================================
// 🔮 IDENTIKIT TECNICO — Metodo Marika (RVI)
// ==============================================
//
// Allineato a: Venere Auroria / Auroria / Legge Universale
// Caratteristiche:
// • Nuovo calcolo ad ogni richiesta (nessun riuso di stese/risultati)
// • Nessuna “sedimentazione” o “reset” simulati
// • Centro di ricalcolo: Aldebaran (non il Sole)
// • TAG obbligatorio, scelto dall’elenco ufficiale (RVI_TAG)
// • TAG → pianeti dominanti → selezione fascio Venere-centrico (Venere ↔ Pianeti)
// • Nessuna carta: solo calcolo astronomico/galattico reale
// • Output tecnico (niente narrativa)
//
// Dipendenze: comandiOperativi.js, calcolo_oraria.js, leggeUniversale.js
// ==============================================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { calcolaOraria } from './calcolo_oraria.js';
import { applicaLeggeUniversale } from './leggeUniversale.js';

// ==========================
// 1) TAG ufficiali → Pianeti dominanti
// (estratto/compattato da RVI_TAG.docx; estendibile)
// ==========================
const PREFERENZE_PER_TAG = {
  // Relazioni sentimental-affettive
  UFFICIALE:        ['Sole', 'Giove', 'Saturno'],
  LEGAME_STORICO:   ['Luna', 'Saturno', 'Plutone'],
  NUOVA_CONOSCENZA: ['Mercurio', 'Urano'],
  AMANTE:           ['Venere', 'Marte', 'Plutone'],
  EX:               ['Luna', 'Saturno', 'Mercurio'],
  ANIMA_GEMELLA:    ['Venere', 'Sole', 'Nettuno'],

  // Nucleo familiare
  FIGLIO:           ['Sole', 'Luna'],
  FIGLIA:           ['Sole', 'Luna'],
  MADRE:            ['Luna', 'Venere', 'Nettuno'],
  PADRE:            ['Sole', 'Saturno', 'Giove'],
  FRATELLO:         ['Mercurio', 'Luna'],
  SORELLA:          ['Mercurio', 'Luna'],
  NONNO:            ['Saturno', 'Giove'],
  NONNA:            ['Luna', 'Venere'],
  ZIO:              ['Giove', 'Marte'],
  ZIA:              ['Venere', 'Giove'],

  // Lavoro / Ruoli
  COLLEGA:          ['Mercurio', 'Sole', 'Giove'],
  SUPERIORE:        ['Saturno', 'Sole', 'Giove'],
  SUBORDINATO:      ['Mercurio', 'Saturno'],
  CLIENTE:          ['Mercurio', 'Venere'],
  FORNITORE:        ['Mercurio', 'Saturno'],
  MENTORE:          ['Giove', 'Saturno', 'Urano'],
  MAESTRO:          ['Giove', 'Saturno', 'Urano'],
  ALLIEVO:          ['Giove', 'Urano'],

  // Socialità / Relazioni varie
  AMICO:            ['Venere', 'Mercurio'],
  AMICA:            ['Venere', 'Mercurio'],
  CONOSCENTE:       ['Mercurio', 'Luna'],
  RIVALE:           ['Marte', 'Plutone', 'Urano'],
  SOSTEGNO:         ['Giove', 'Venere'],
  GRUPPO:           ['Giove', 'Mercurio'],

  // Spirituale / Sottile
  SPIRITO_GUIDA:    ['Nettuno', 'Giove', 'Sole'],
  MAESTRO_INTERIORE:['Nettuno', 'Saturno'],
  SPIRITO_GEMELLO:  ['Nettuno', 'Venere'],
  ANIMA_OMBRA:      ['Plutone', 'Saturno'],
  NEMICO_KARMICO:   ['Plutone', 'Saturno', 'Marte'],
  DEBITO:           ['Saturno', 'Plutone'],

  // Ambientale / Contesto
  LUOGO:            ['Saturno', 'Venere'],
  CASA:             ['Luna', 'Venere'],
  LAVORO:           ['Saturno', 'Mercurio', 'Sole'],
  VIAGGIO:          ['Mercurio', 'Giove', 'Urano'],
  EVENTO:           ['Sole', 'Mercurio'],
  COMUNITÀ:         ['Giove', 'Venere']
};
const TAG_SET = new Set(Object.keys(PREFERENZE_PER_TAG));

// ==========================
// 2) Tabelle Galassie/Stelle (placeholder da riempire)
// ==========================
const TABELLE_IDENTIKIT = {
  GALASSIE: ['Andromeda','Sirio','Taurus','Michelaus (M41)'],
  STELLE_PER_GALASSIA: {
    'Andromeda':      { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Sirio':          { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Taurus':         { TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
    'Michelaus (M41)':{ TRIGONO: [], SESTILE: [], QUADRATO: [], OPPOSIZIONE: [] },
  }
};

// ==========================
// 3) Entry point
// ==========================
export function eseguiIdentikit(data, ora, luogo, comando, tagInput) {
  // a) parsing comando + tag
  const tipo = parseRVI(comando);
  if (!tipo) return wrap('❌ Comando non riconosciuto. Usa: RVI [TAG].');

  const tag = normalizeTag(tagInput);
  if (!TAG_SET.has(tag)) {
    return wrap(`❌ TAG non riconosciuto: "${tagInput}". Usa un TAG ufficiale (RVI_TAG).`);
  }

  // b) avvio operativo + oraria
  const operativi = applicaComandiOperativi('Identikit');
  const oraria = calcolaOraria(data, ora, luogo);
  if (!oraria || oraria.errore) {
    return wrap(`❌ Errore oraria: ${oraria?.errore || 'calcolo non disponibile'}`);
  }

  // c) ricalibrazione su Aldebaran (centro aurorico)
  const alba = ricalibraSuAldebaran(oraria);

  // d) figure Venere-centriche (Venere ↔ Pianeti) e selezione fascio per TAG
  const figures = calcolaFigureVenere(oraria);                 // tutte le figure attive
  const preferiti = PREFERENZE_PER_TAG[tag];                   // pianeti dominanti del TAG
  const fascio = selezionaFiguraPerTag(figures, preferiti);    // figura scelta per il TAG

  // e) proiezione galattica stile Auroria (niente invenzioni: usa tabelle)
  const proiezione = proiezioneGalattica(oraria, fascio, TABELLE_IDENTIKIT);

  // f) Legge Universale (vincolo metodologico)
  const legge = applicaLeggeUniversale?.({ modulo: 'Identikit', data, ora, luogo, oraria });

  // g) output tecnico
  const out = formatOutput({
    data, ora, luogo, tag,
    operativi, oraria, alba,
    figures, fascio,
    proiezione, legge
  });

  return { output: out, _meta: { tag, oraria, ald: alba, fascio, proiezione } };
}

// ==========================
// 4) Parsing / Normalization
// ==========================
function parseRVI(cmd='') {
  const c = String(cmd).replace(/\./g,' ').toUpperCase();
  return /\bR\s*V\s*I\b/.test(c) ? 'RVI' : null;
}
function normalizeTag(t='') {
  return String(t).trim().toUpperCase().replace(/\s+/g,'_');
}

// ==========================
// 5) Aldebaran (ricalibrazione centro)
// ==========================
function ricalibraSuAldebaran(oraria) {
  // Placeholder conforme ad Auroria: se hai già una funzione dedicata, importala.
  // Qui restituiamo il “punto guida” e una nota.
  return {
    punto: 'Aldebaran',
    nota: 'Centro di proiezione impostato su Aldebaran secondo Auroria.'
  };
}

// ==========================
// 6) Figure Venere-centriche (Venere ↔ Pianeti)
// ==========================
function calcolaFigureVenere(oraria) {
  const ven = oraria?.planets?.Venere?.lon;
  if (typeof ven !== 'number' || !oraria?.planets) {
    return [];
  }
  const ASP = [
    { tipo: 'CONGIUNZIONE', g: 0,   orb: 6 },
    { tipo: 'SESTILE',      g: 60,  orb: 4 },
    { tipo: 'QUADRATO',     g: 90,  orb: 5 },
    { tipo: 'TRIGONO',      g: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE',  g: 180, orb: 6 },
  ];
  const norm360 = (x)=>((x%360)+360)%360;
  const sep = (a,b)=>{ const d=Math.abs(norm360(a)-norm360(b)); return d>180?360-d:d; };
  const matchAsp = (delta)=> {
    let best=null;
    for (const a of ASP) {
      const diff=Math.abs(delta-a.g);
      if (diff<=a.orb) { if(!best || diff<best.diff) best={tipo:a.tipo, diff}; }
    }
    return best;
  };

  const out = [];
  for (const [p, val] of Object.entries(oraria.planets)) {
    if (p === 'Venere') continue;
    const lon = val?.lon;
    if (typeof lon !== 'number') continue;
    const delta = sep(ven, lon);
    const asp = matchAsp(delta);
    if (asp) out.push({ pianeta: p, aspetto: asp.tipo, orb: asp.diff });
  }
  out.sort((a,b)=> a.orb - b.orb);
  return out;
}

// ==========================
// 7) Selezione figura coerente col TAG
// ==========================
function selezionaFiguraPerTag(figs, pianetiDominanti=[]) {
  if (!Array.isArray(figs) || !figs.length) return null;
  // 1) preferenza: figura che coinvolge uno dei pianeti dominanti
  for (const pref of pianetiDominanti) {
    const f = figs.find(x => new RegExp(pref,'i').test(x.pianeta));
    if (f) return { ...f, criterio: `TAG→${pref}` };
  }
  // 2) fallback: orb minima
  const best = figs[0];
  return { ...best, criterio: 'orb_minima' };
}

// ==========================
// 8) Proiezione galattica (stile Auroria)
// ==========================
function proiezioneGalattica(oraria, figura, T) {
  const tabelleOK = Array.isArray(T?.GALASSIE) && T.GALASSIE.length &&
                    T?.STELLE_PER_GALASSIA && Object.keys(T.STELLE_PER_GALASSIA).length;

  if (!figura) {
    return { testo: '• Nessuna figura selezionata per il fascio.', galassia: null, stella: null };
  }

  // Mappatura semplice: giorno→Sirio, notte→Andromeda (sostituisci con la tua tabella se disponibile)
  const galassia = (oraria?.stato === 'giorno') ? 'Sirio' : 'Andromeda';

  if (!tabelleOK) {
    return {
      galassia, stella: null,
      testo: [
        `• Figura: Venere in ${figura.aspetto} a ${figura.pianeta} (criterio: ${figura.criterio || 'n/d'}, orb=${fmt(figura.orb)}°)`,
        `• Tabelle galassie/stelle non compilate (completa TABELLE_IDENTIKIT per la stella).`
      ].join('\n')
    };
  }

  const elenco = T.STELLE_PER_GALASSIA?.[galassia]?.[figura.aspetto] || [];
  const stella = Array.isArray(elenco) && elenco.length ? elenco[0] : null;

  return {
    galassia, stella,
    testo: [
      `• Figura: Venere in ${figura.aspetto} a ${figura.pianeta} (criterio: ${figura.criterio || 'n/d'}, orb=${fmt(figura.orb)}°)`,
      `• Proiezione: ${galassia}`,
      `• Stella: ${stella || '— (inserisci l’elenco ufficiale)'}`
    ].join('\n')
  };
}

// ==========================
// 9) Output tecnico
// ==========================
function formatOutput({ data, ora, luogo, tag, operativi, oraria, alba, figures, fascio, proiezione, legge }) {
  const righe = [];
  righe.push(`🧭 IDENTIKIT TECNICO — RVI [${tag}]`);
  righe.push(`📅 ${data}  ⏰ ${ora}  📍 ${luogo}`);
  righe.push('');
  righe.push('🔭 ORARIA (reale)');
  righe.push(oraria?.testo?.trim() || '• Posizioni astronomiche calcolate (Venere e pianeti attivi).');
  righe.push('');
  righe.push(`🌟 Centro di ricalcolo: ${alba?.punto || 'Aldebaran'} — ${alba?.nota || ''}`);
  righe.push('');
  righe.push('🌌 Figure Venere-centriche attive:');
  if (Array.isArray(figures) && figures.length) {
    for (const f of figures) righe.push(`• ${f.aspetto} a ${f.pianeta} (orb=${fmt(f.orb)}°)`);
  } else {
    righe.push('• Nessuna figura attiva trovata.');
  }
  righe.push('');
  righe.push('✴️ Fascio selezionato (per TAG):');
  righe.push(fascio
    ? `• Venere in ${fascio.aspetto} a ${fascio.pianeta} (criterio: ${fascio.criterio || 'n/d'}, orb=${fmt(fascio.orb)}°)`
    : '• n/d');
  righe.push('');
  righe.push('🜂 Proiezione Galattica');
  righe.push(proiezione?.testo || '—');
  righe.push('');
  righe.push('✅ Comandi Operativi');
  righe.push(Array.isArray(operativi) && operativi.length ? ('• ' + operativi.join('\n• ')) : '• Avvio eseguito.');
  if (legge) {
    righe.push('');
    righe.push('📜 Legge Universale applicata (vincoli metodologici interni).');
  }
  return righe.join('\n');
}

function fmt(n){ return (typeof n==='number' && isFinite(n)) ? Number(n.toFixed(2)) : 'n/d'; }
function wrap(output, meta){ return meta ? { output, _meta: meta } : { output }; }

export default { eseguiIdentikit };
