// ===============================
// 🌞 Calcolo Oraria Astrale Reale — Metodo Marika
// usa astronomy-engine per posizioni vere di Sole e pianeti
// ===============================

import * as Astronomy from 'https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.0/+esm';

export function calcolaOraria(data, ora, luogo) {
  try {
    // ISO locale (secondi a 00)
    const when = new Date(`${data}T${ora}:00`);

    // per ora fisso Montebelluna (aggiorneremo al GPS quando vuoi)
    const coord = { lat: 45.776, lon: 11.789 };

    const corpi = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
    const result = { sunLon: 0, planets: {} };

    for (const body of corpi) {
      const eq = Astronomy.Equatorial(Astronomy.Body[body], when, coord.lat, coord.lon, true);
      const ecl = Astronomy.Ecliptic(eq);
      const lon = ((ecl.elon % 360) + 360) % 360;
      if (body === 'Sun') result.sunLon = lon;
      else result.planets[nomeItaliano(body)] = { lon };
    }

    result.testo = [
      '• Oraria calcolata su effemeridi reali.',
      `• Data: ${data}  Ora: ${ora}  Luogo: ${luogo}`,
      '• Longitudini eclittiche 0–360°: Sole e pianeti.'
    ].join('\n');

    return result;
  } catch (err) {
    return { errore: err.message || String(err) };
  }

  function nomeItaliano(b) {
    switch (b) {
      case 'Mercury': return 'Mercurio';
      case 'Venus':   return 'Venere';
      case 'Mars':    return 'Marte';
      case 'Jupiter': return 'Giove';
      case 'Saturn':  return 'Saturno';
      case 'Uranus':  return 'Urano';
      case 'Neptune': return 'Nettuno';
      case 'Pluto':   return 'Plutone';
      case 'Moon':    return 'Luna';
      default:        return b;
    }
  }
}
