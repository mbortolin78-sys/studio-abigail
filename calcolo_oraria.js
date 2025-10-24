// ===============================
// 🌞 Calcolo Oraria Astrale — Metodo Marika
// ===============================
//
// Calcola le longitudini eclittiche reali di Sole e pianeti
// usando la libreria astronomica "astronomy-engine" (leggera e precisa)
// Se la libreria non è ancora installata, basta aggiungerla con:
// npm install astronomy-engine
//
// ===============================

import * as Astronomy from 'astronomy-engine';

export function calcolaOraria(data, ora, luogo) {
  try {
    // Componi la data esatta (ISO)
    const dateObj = new Date(`${data}T${ora}:00`);
    
    // Coordinate fisse di Montebelluna (se vuoi le aggiorni dopo con il GPS)
    const coord = { lat: 45.776, lon: 11.789 }; 

    // Pianeti e Sole da calcolare
    const corpi = [
      'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
      'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
    ];

    const result = { sunLon: 0, planets: {} };

    // Ciclo sui pianeti e calcolo longitudini
    for (const corpo of corpi) {
      const vec = Astronomy.Equatorial(Astronomy.Body[corpo], dateObj, coord.lat, coord.lon, true);
      const ecl = Astronomy.Ecliptic(vec);
      const lon = ((ecl.elon % 360) + 360) % 360;
      if (corpo === 'Sun') result.sunLon = lon;
      else result.planets[corpo] = { lon: lon };
    }

    result.testo = `
    • Oraria calcolata su effemeridi reali.
    • Data: ${data}, Ora: ${ora}, Luogo: ${luogo}.
    • Posizioni planetarie calcolate astronomicamente.
    `;

    return result;
  } catch (err) {
    console.error(err);
    return { errore: '❌ Errore nel calcolo oraria: ' + err.message };
  }
}
