// ephemeris.js — calcolo oraria astrale reale di Studio Abigail

import * as Astronomy from 'astronomy-engine';

export function calcolaOrariaAstrale(data, ora, luogo) {
  try {
    // Converte la data e ora italiane in formato ISO
    const [giorno, mese, anno] = data.split('/');
    const [ore, minuti] = ora.split(':');
    const dateISO = new Date(`${anno}-${mese}-${giorno}T${ore}:${minuti}:00+02:00`);

    // Coordinate base — Montebelluna
    let lat = 45.7781;
    let lon = 12.0383;

    // Aggiorna coordinate se il luogo è diverso
    if (luogo.toLowerCase().includes("roma")) { lat = 41.9028; lon = 12.4964; }
    if (luogo.toLowerCase().includes("venezia")) { lat = 45.4408; lon = 12.3155; }
    if (luogo.toLowerCase().includes("milano")) { lat = 45.4642; lon = 9.19; }
    if (luogo.toLowerCase().includes("napoli")) { lat = 40.8518; lon = 14.2681; }

    // Crea l’osservatore
    const observer = new Astronomy.Observer(lat, lon, 0);

    // Calcola posizioni reali di Sole e Luna
    const sole = Astronomy.Equator('Sun', dateISO, observer, true, true);
    const luna = Astronomy.Equator('Moon', dateISO, observer, true, true);

    // Calcolo ascendente (semplificato per ora)
    const ascendente = (sole.ra + lon / 15) % 24;

    // Restituisce i dati principali del cielo reale
    return {
      ascendente: `${ascendente.toFixed(2)}h`,
      sole: `RA ${sole.ra.toFixed(2)}h / Dec ${sole.dec.toFixed(2)}°`,
      luna: `RA ${luna.ra.toFixed(2)}h / Dec ${luna.dec.toFixed(2)}°`,
      nota: `Cielo calcolato per ${luogo} (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`
    };

  } catch (err) {
    return { nota: "⚠️ Errore nel calcolo orario." };
  }
}
