// ===========================================
// 🌙 ECHO Tecnico — Metodo Marika
// ===========================================
//
// 1) Calcola Oraria Classica (cielo orario reale)
// 2) Proietta il Sistema Solare su base lunare
// 3) Attiva la stesa di Sibille + Oracoli Mara Official
//
// Conforme a: Comandi Operativi + Legge Universale
// ===========================================

import { applicaComandiOperativi } from './comandiOperativi.js';
import { caricaLeggeUniversale } from './leggeUniversale.js';
import { calcolaOraria } from './calcolo_oraria.js';

// ==========================
// Funzione principale
// ==========================
export function eseguiEcho(data, ora, luogo, comando) {
  console.log(`⚙️ Avvio calcolo ECHO — ${comando}, ${data}, ${ora}, ${luogo}`);

  const logOperativi = applicaComandiOperativi('Echo');
  const legge = caricaLeggeUniversale();
  const oraria = calcolaOraria(data, ora, luogo);
  if (oraria?.errore) return { output: `❌ Errore: ${oraria.errore}` };

  // Calcolo Galassie (riflesso lunare)
  const gal = metodoGalassieEcho(oraria);

  // Stese
  const sibille = strutturaSibille();
  const oracoli = strutturaOracoli();

  const output = `
⚙️ ECHO — Metodo Marika
📅 ${data}  ⏰ ${ora}  📍 ${luogo}

🔭 ORARIA CLASSICA
${oraria.testo}

🌌 GALASSIE RIFLESSE (BASE LUNARE)
${gal.testo}

🔮 STESA DI SIBILLE
${sibille}

🪞 STESA DI ORACOLI (Mara Official Vol.2 + Vol.3)
${oracoli}

${logOperativi.join('\n')}
${legge}

✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.
`;

  return { output };
}

// ==========================
// Metodo Galassie Riflesse (Echo)
// ==========================
function metodoGalassieEcho(oraria) {
  // Principio: il riferimento non è più il Sole, ma la Luna.
  const ASPETTI = [
    { tipo: 'SESTILE', gradi: 60, orb: 4 },
    { tipo: 'QUADRATO', gradi: 90, orb: 5 },
    { tipo: 'TRIGONO', gradi: 120, orb: 5 },
    { tipo: 'OPPOSIZIONE', gradi: 180, orb: 6 },
  ];

  const norm360 = (x) => ((x % 360) + 360) % 360;
  const sep = (a, b) => {
    const d = Math.abs(norm360(a) - norm360(b));
    return d > 180 ? 360 - d : d;
  };

  const luna = oraria.moonLon;
  const figure = [];

  for (const [nome, val] of Object.entries(oraria.planets)) {
    if (typeof val?.lon !== 'number') continue;
    const delta = sep(luna, val.lon);
    for (const asp of ASPETTI) {
      const diff = Math.abs(delta - asp.gradi);
      if (diff <= asp.orb) {
        figure.push({ pianeta: nome, aspetto: asp.tipo, orb: diff });
      }
    }
  }

  if (!figure.length) {
    return { testo: "🌙 Nessuna figura lunare attiva in questo istante." };
  }

  const dom = figure[0];
  const galassie = ["Andromeda", "Sirio", "Taurus", "Michelaus (M41)"];

  let galassia;
  switch (dom.aspetto) {
    case "TRIGONO": galassia = "Sirio"; break;
    case "SESTILE": galassia = "Andromeda"; break;
    case "QUADRATO": galassia = "Michelaus (M41)"; break;
    case "OPPOSIZIONE": galassia = "Taurus"; break;
    default: galassia = "Sistema neutro";
  }

  const testo = `
🌙 La Luna forma una ${dom.aspetto} con ${dom.pianeta}.
✨ La figura illumina la galassia ${galassia}.
🪶 Proiezione riflessa secondo la base lunare.
`;

  return { testo };
}

// ==========================
// Stesa Sibille
// ==========================
function strutturaSibille() {
  return `• 1° taglio: 2 carte (mai uguali)
• 2° taglio: 3 carte (mai uguali)
• 1 carta centrale: mai uguale
• 5 terne da 3 carte (mai uguali)`;
}

// ==========================
// Stesa Oracoli (Mara Official Vol.2 + 3)
// ==========================
function strutturaOracoli() {
  return `• 1° taglio: 2 oracoli (mai uguali)
• 2° taglio: 3 oracoli (mai uguali)
• 1 oracolo centrale: mai uguale
• 5 terne da 3 oracoli (mai uguali)`;
}
