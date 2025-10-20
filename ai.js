// AI locale (gratuita). Due modalità:
// - short → “typewriter” veloce riga-per-riga
// - long  → blocco unico
// È una generazione deterministica e pulita, senza poesia.

const CITY = "Montebelluna (TV)";

function nowHHMM(){
  const d = new Date();
  return d.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});
}

// Semplice “brain” locale: riformula in modo discorsivo e pratico.
function localCompose(userText){
  const t = userText.trim();
  if(!t) return "Dimmi pure cosa desideri esplorare.";
  const lower = t.toLowerCase();

  // risposte rapide riconosciute
  if (/(ciao|buongiorno|buonasera)/.test(lower))
    return "Ciao, parliamo con calma. Dimmi il punto chiave e ti rispondo in modo chiaro e utile.";
  if (/musica|teddy|swims|country/.test(lower))
    return "Sì, prendiamo l’emozione che porta quella musica e traduciamola in parole semplici e vere.";
  if (/gelos|insicur/.test(lower))
    return "Capisco la sensibilità. Facciamo ordine: cosa ti ha fatto scattare quella sensazione? Ti aiuto a metterla a fuoco.";

  // riformulazione corta
  if (t.length <= 180){
    return `Ho capito il senso: ${t} . Ti propongo una risposta semplice e centrata, senza giri di parole.`;
  }

  // riformulazione lunga
  return [
    "Ok. Riordino le idee e ti restituisco una risposta chiara, concreta e rispettosa.",
    "Vado per punti essenziali, così resta tutto leggibile e utile alla conversazione."
  ].join(" ");
}

export async function generateReply(userText){
  const text = localCompose(userText);

  // regola: typewriter solo se risposta breve
  const type = text.length <= 180 ? "short" : "long";

  return { type, text, city: CITY, time: nowHHMM() };
}
