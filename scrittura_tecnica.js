// ===============================================
// ✦ Scrittura Tecnica — Metodo Marika
// Studio Abigail — Motore Narrativo + Report Tecnico
// ===============================================

import { generaStesuraRAS } from './ras_generator.js';
import { generaStesuraRAE } from './rae_generator.js';

// ==============================
//  Dizionario significato case
// ==============================
const SIGNIFICATO_CASE = {
  I: 'identità, corpo, inizi personali',
  II: 'valori, risorse, autostima',
  III: 'comunicazione, messaggi, contatti vicini',
  IV: 'radici, casa, stabilità, famiglia',
  V: 'creatività, piacere, cuore, figli',
  VI: 'routine, salute energetica, servizio',
  VII: 'relazioni, coppie, specchio',
  VIII: 'crisi, intimità, trasformazione',
  IX: 'viaggi, visioni, estero, lontananza',
  X: 'visibilità, destino, carriera',
  XI: 'amicizie, social, reti',
  XII: 'prove, passato, inconscio'
};

// ==============================
//  Generatore del Report Tecnico
// ==============================
export function generaReportTecnico(modulo, dati) {
  const out = [];
  out.push('---');
  out.push('### ⚙️ Report Tecnico della Stesa');

  // 🜂 ORARIA CLASSICA
  if (dati.oraria) {
    out.push('\n**Oraria Classica**');
    out.push(`• Ascendente: ${dati.oraria.ascendente || 'n/d'}`);
    Object.entries(dati.oraria.planets || {}).forEach(([p, info]) => {
      const c = info?.casa;
      const s = SIGNIFICATO_CASE[c] ? `(${SIGNIFICATO_CASE[c]})` : '';
      out.push(`• ${p} in ${c || '—'} ${s}`);
    });
  }

  // 🌌 GALASSIE
  if (dati.galassie) {
    out.push('\n**Galassie**');
    Object.entries(dati.galassie.stelle || {}).forEach(([gal, stars]) => {
      const elenco = Array.isArray(stars) && stars.length ? stars.join(', ') : 'nessuna attiva';
      out.push(`• ${gal} → ${elenco}`);
    });
  }

  // ⚛️ SALTO QUANTICO
  if (dati.saltoQuantico) {
    out.push('\n**Salto Quantico**');
    for (const piano of ['passato', 'presente', 'futuro']) {
      const p = dati.saltoQuantico[piano];
      if (p)
        out.push(
          `• ${piano.charAt(0).toUpperCase() + piano.slice(1)} → Porta: ${p.porta}, Vettore: ${p.vettore}, Direttiva: ${p.direttiva}`
        );
    }
  }

  // 🜃 ORACOLI
  if (dati.oracoli) {
    out.push('\n**Oracoli**');
    out.push(`• 2 carte: ${(dati.oracoli.due || []).map(c => c.nome).join(' | ') || 'n/d'}`);
    out.push(`• 3 carte: ${(dati.oracoli.tre || []).map(c => c.nome).join(' | ') || 'n/d'}`);
    out.push(`• 1 carta: ${(dati.oracoli.uno || []).map(c => c.nome).join(' | ') || 'n/d'}`);
    out.push(`• Terne: ${(dati.oracoli.terne || []).map(t => '[' + t.map(c => c.nome).join(' | ') + ']').join(' ') || 'n/d'}`);
  }

  // 🌟 ALDEBARAN (Oraria Evoluta)
  if (dati.aldebaran) {
    out.push('\n**Aldebaran (Oraria Evoluta)**');
    Object.entries(dati.aldebaran.planets || {}).forEach(([p, info]) => {
      const c = info?.casa;
      const s = SIGNIFICATO_CASE[c] ? `(${SIGNIFICATO_CASE[c]})` : '';
      out.push(`• ${p} in ${c || '—'} ${s}`);
    });
  }

  out.push('---');
  return out.join('\n');
}

// ==============================
//  Funzione principale di scrittura
// ==============================
export async function generaScrittura(modulo, tipo, dati) {
  try {
    let testo = '';

    // 1. Seleziona il generatore corretto
    if (tipo === 'RAS') testo = await generaStesuraRAS(modulo, dati);
    else if (tipo === 'RAE') testo = await generaStesuraRAE(modulo, dati);
    else testo = 'Tipo di scrittura non riconosciuto. Usa RAS o RAE.';

    // 2. Formula di chiusura
    testo += '\n\n✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.';

    // 3. Report tecnico
    const report = generaReportTecnico(modulo, dati);

    // 4. Output finale completo
    return { output: testo + '\n\n' + report };
  } catch (err) {
    console.error('❌ Errore nella generazione della scrittura:', err);
    return { output: '❌ Errore durante la generazione della scrittura.' };
  }
}

export default { generaScrittura, generaReportTecnico };

// ==============================
// 🌙 Collegamento a Ollama (Scrittura Viva)
// ==============================
export async function invocaScritturaViva(payload) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "marika:latest", // modello Ollama locale
        prompt: `
${payload.struttura?.modello || 'Generico'} — ${payload.struttura?.tipo || 'R'}
Contesto: ${JSON.stringify(payload.contesto, null, 2)}
Dati tecnici: ${JSON.stringify(payload.datiTecnici, null, 2)}

Scrivi una narrazione coerente, secondo il Metodo Marika:
- Linguaggio empatico e simbolico.
- No elenchi o termini tecnici.
- 100% coerenza energetica.
- Voce: ${payload.struttura?.voce || 'Marika'}.
        `.trim(),
        stream: false
      })
    });

    const data = await response.json();
    return data.response || "(nessuna risposta da Ollama)";
  } catch (err) {
    console.error("❌ Errore nella connessione a Ollama:", err);
    return "(⚠️ Scrittura viva non disponibile in questo momento)";
  }
}
