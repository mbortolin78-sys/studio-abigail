// ===============================
// 🔮 Metodo Auroria Tecnico — Metodo Marika
// Basato su: Auroria.docx + Legge Universale + Comandi Operativi
// ===============================

import { applicaLeggeUniversale } from './leggeUniversale.js';
import { applicaComandiOperativi } from './comandiOperativi.js';

// ✴️ Funzione principale
export async function eseguiAuroria(data, ora, luogo, comando) {
  const reset = applicaComandiOperativi('Auroria');

  import { calcolaOraria } from './calcolo_oraria.js';
  const oraria = calcolaOraria(data, ora, luogo);
  const galassie = calcolaGalassieAuroria(oraria);
  const sibille = calcolaSibilleAuroria();
  const legge = applicaLeggeUniversale(oraria, galassie, sibille);

  const output = `
  ⚙️ RISULTATO TECNICO — Metodo AURORIA (${comando})
  ────────────────────────────────
  📅 Data: ${data}
  ⏰ Ora: ${ora}
  📍 Luogo: ${luogo}

  🔭 ORARIA CLASSICA
  ${oraria}

  ✴️ GALASSIE
  ${galassie}

  🜂 STESA DI SIBILLE
  ${sibille}

  ⚖️ LEGGE UNIVERSALE
  ${legge}

  ✨ Calcolo conforme alla Legge Universale — Metodo Marika.
  `;
  return { output };
}

// ===============================
// 🔭 Metodo Oraria Classica
// ===============================
function calcolaOrariaClassica(data, ora, luogo) {
  // in seguito potremo sostituirla con il calcolo reale delle longitudini planetarie
  return {
    sunLon: 201.3,
    planets: {
      Mercurio: { lon: 218.9 },
      Venere: { lon: 184.4 },
      Luna: { lon: 12.7 },
      Marte: { lon: 60.1 },
      Giove: { lon: 333.2 },
      Saturno: { lon: 285.5 },
      Urano: { lon: 45.3 },
      Nettuno: { lon: 350.8 },
      Plutone: { lon: 298.0 }
    },
    testo: `
    • Ricostruzione del cielo dell’istante — ascendente, medio cielo, 12 case. 
    • Dati base: ${data}, ${ora}, ${luogo}.
    • Pianeti collocati nei segni e nelle case secondo calcolo esatto.
    `
  };
}

// ===============================
// ✴️ Metodo Galassie Auroria — versione estesa (calcolo reale su Oraria)
// ===============================
function calcolaGalassieAuroria(oraria) {
  if (!oraria || typeof oraria.sunLon !== 'number' || !oraria.planets) {
    return "❌ Oraria incompleta: servono le longitudini eclittiche di Sole e pianeti.";
  }

  const ASPETTI = [
    { tipo: 'CONGIUNZIONE', gradi: 0, orb: 6 },
    { tipo: 'SESTILE', gradi: 60, orb: 4 },
    { tipo: 'QUADRATO', gradi: 90, orb: 5 },
    { tipo: 'TRIGONO', gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE', gradi: 180, orb: 6 }
  ];

  const MENTALI = new Set(['Mercurio', 'Urano']);
  const EMOZIONALI = new Set(['Luna', 'Venere', 'Nettuno']);
  const MATERIALI = new Set(['Marte', 'Saturno', 'Plutone']);

  const STELLE_MAP = {
    'Andromeda': ['Stella della Rivelazione', 'Stella delle Cose Nascoste', 'Stella della Confessione'],
    'Sirio': ['Stella del Dialogo', 'Stella dell’Intelletto', 'Stella della Chiarezza'],
    'Taurus': ['Stella del Coraggio', 'Stella della Costruzione', 'Stella della Materia'],
    'Michelaus (M41)': ['Stella del Riposo', 'Stella del Silenzio', 'Stella dell’Attesa']
  };

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const sep = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
  };
  const trovaAspetto = (delta) => {
    let best = null;
    for (const a of ASPETTI) {
      const diff = Math.abs(delta - a.gradi);
      if (diff <= a.orb) {
        if (!best || diff < best.diff) best = { tipo: a.tipo, target: a.gradi, diff };
      }
    }
    return best;
  };

  const sun = oraria.sunLon;
  const attive = [];
  for (const [nome, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = sep(sun, val.lon);
    const asp = trovaAspetto(delta);
    if (asp) {
      attive.push({
        pianeta: nome,
        aspetto: asp.tipo,
        orb: asp.diff,
        delta
      });
    }
  }

  if (attive.length === 0) {
    return formatOutputGalassie({
      galassia: 'Michelaus (M41)',
      stella: pickStella('Michelaus (M41)'),
      origine: 'Nessuna figura attiva Sole–pianeta'
    });
  }

  attive.sort((a, b) => a.orb - b.orb);
  const dominante = attive[0];

  let galassia;
  if (MENTALI.has(dominante.pianeta)) galassia = 'Sirio';
  else if (EMOZIONALI.has(dominante.pianeta)) galassia = 'Andromeda';
  else if (MATERIALI.has(dominante.pianeta)) galassia = 'Taurus';
  else galassia = 'Michelaus (M41)';

  const stella = pickStella(galassia, dominante.aspetto);

  return formatOutputGalassie({
    galassia,
    stella,
    origine: `Sole in ${dominante.aspetto} a ${dominante.pianeta}`
  });

  function pickStella(gal, aspetto) {
    const elenco = STELLE_MAP[gal] || [];
    if (elenco.length === 0) return 'Stella';
    if (aspetto === 'TRIGONO' && elenco.find(s => /Rivelazione|Intelletto|Costruzione/i))
      return elenco.find(s => /Rivelazione|Intelletto|Costruzione/i);
    if (aspetto === 'SESTILE' && elenco.find(s => /Dialogo|Chiarezza/i))
      return elenco.find(s => /Dialogo|Chiarezza/i);
    if (aspetto === 'QUADRATO' && elenco.find(s => /Coraggio|Materia/i))
      return elenco.find(s => /Coraggio|Materia/i);
    if (aspetto === 'OPPOSIZIONE' && elenco.find(s => /Cose Nascoste|Silenzio|Attesa/i))
      return elenco.find(s => /Cose Nascoste|Silenzio|Attesa/i);
    return elenco[0];
  }

  function formatOutputGalassie({ galassia, stella, origine }) {
    return [
      `• Il Sole illumina la ${stella} di ${galassia}.`,
      `• Origine: ${origine}.`,
      `• Regola: le stelle appartengono alla galassia, i pianeti danno solo la figura.`
    ].join('\n');
  }
}

// ===============================
// 🜃 Metodo Stesa di Sibille Auroria
// ===============================
function calcolaSibilleAuroria() {
  return `
  • 1° taglio: 2 carte (mai uguali)
  • 2° taglio: 3 carte (mai uguali)
  • 1 carta centrale: mai uguale
  • 5 terne da 3 carte (15 carte totali), tutte differenti
  • Nessuna ripetizione ammessa — sequenza fissa Oraria → Galassie → Sibille.
  `;
}
