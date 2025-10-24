// ephemeris.js — calcolo oraria astrale reale di Studio Abigail
// ephemeris.js — calcolo oraria astrale reale con tolleranza di 50 metri
import * as Astronomy from 'astronomy-engine';

// Distanza in metri tra due punti GPS
function distanzaMetri(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Raggio medio della Terra in metri
  const toRad = x => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Coordinate attuali salvate in memoria (predefinite Montebelluna)
let latCorrente = 45.7781;
let lonCorrente = 12.0383;
let luogoCorrente = "Montebelluna";

export function calcolaOrariaAstrale(data, ora, luogo) {
  try {
    // Converte la data e ora italiane in formato ISO
    const [giorno, mese, anno] = data.split('/');
    const [ore, minuti] = ora.split(':');
    const dateISO = new Date(`${anno}-${mese}-${giorno}T${ore}:${minuti}:00+02:00`);

    // Imposta coordinate predefinite
    let lat = 45.7781;
    let lon = 12.0383;

    // Aggiorna coordinate se il luogo è diverso
    if (luogo.toLowerCase().includes("roma")) { lat = 41.9028; lon = 12.4964; }
    if (luogo.toLowerCase().includes("venezia")) { lat = 45.4408; lon = 12.3155; }
    if (luogo.toLowerCase().includes("milano")) { lat = 45.4642; lon = 9.19; }
    if (luogo.toLowerCase().includes("napoli")) { lat = 40.8518; lon = 14.2681; }

    // Controlla la distanza dal punto precedente
    const distanza = distanzaMetri(latCorrente, lonCorrente, lat, lon);

    // Se lo spostamento è minore di 50 metri, mantieni il cielo attuale
    if (distanza < 50) {
      return { 
        ascendente: "—",
        sole: "—",
        luna: "—",
        nota: `Cielo invariato — spostamento inferiore a 50 metri da ${luogoCorrente}.`
      };
    }

    // Aggiorna la posizione corrente
    latCorrente = lat;
    lonCorrente = lon;
    luogoCorrente = luogo;

    // Crea l’osservatore
    const observer = new Astronomy.Observer(lat, lon, 0);

    // Calcola posizioni reali del Sole e della Luna
    const sole = Astronomy.Equator('Sun', dateISO, observer, true, true);
    const luna = Astronomy.Equator('Moon', dateISO, observer, true, true);

    // Calcola ascendente (approssimazione oraria)
    const ascendente = (sole.ra + lon / 15) % 24;

    // Restituisce i dati principali del cielo reale
    return {
      ascendente: `${ascendente.toFixed(2)}h`,
      sole: `RA ${sole.ra.toFixed(2)}h / Dec ${sole.dec.toFixed(2)}°`,
      luna: `RA ${luna.ra.toFixed(2)}h / Dec ${luna.dec.toFixed(2)}°`,
      nota: `Cielo calcolato per ${luogo} (${lat.toFixed(4)}°, ${lon.toFixed(4)}°)`
    };

  } catch (err) {
    return { nota: "⚠️ Errore nel calcolo orario." };
  }
}
