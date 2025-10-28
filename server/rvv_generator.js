// ======================================================
// ♀️ RVV — Generatore di Scrittura Estesa (Venere Velaria Purificata 2025)
// Metodo Marika – conforme a Legge Universale e Protocollo Scrittura
// ======================================================

import { generaReportTecnico } from './scrittura_tecnica.js';
import { invocaScritturaViva } from './llama_bridge.js';  // motore narrativo dinamico

export async function generaRVV(data, ora, luogo, datiTecnici = {}) {
  try {
    // ===== BLOCCO 1 — TEMA NATALE =====
    const temaNatale = await invocaScritturaViva({
      tema: 'tema natale venere velaria',
      contesto:
        'apertura empatica e spiegazione iniziale della base energetica; introduce la relazione e la disposizione dei pianeti secondo il Metodo Velaria',
      tono: 'caldo, analitico, diretto',
      parole: 700,
      energia:
        'riconoscimento del centro energetico e della frequenza di contatto, equilibrio tra mente e cuore',
    });

    // ===== BLOCCO 2 — VENARIA =====
    const venaria = await invocaScritturaViva({
      tema: 'venaria venere velaria',
      contesto:
        'narrazione discorsiva dei fasci luminosi, del movimento dei canali e dei rami di contatto; descrive la sequenza Sirio-Andromeda-Marte-Aldebaran',
      tono: 'fluido, empatico, realistico',
      parole: 700,
      energia:
        'fasci luminosi che collegano i piani emozionali e comunicativi del campo, con riferimenti ai movimenti sottili e ai segnali concreti',
    });

    // ===== BLOCCO 3 — VELARIA =====
    const velaria = await invocaScritturaViva({
      tema: 'velaria oraria classica',
      contesto:
        'sviluppo della timeline concreta: descrizione continua degli eventi, finestre orarie, azioni, canali di contatto e movimenti reciproci, secondo la regola del film in slow-motion del Protocollo Velaria',
      tono: 'discorsivo, realistico, umano',
      parole: 800,
      energia:
        'ricostruzione del giorno energetico, dai segnali silenziosi ai contatti reali, con indicazioni su chi agisce, come e perché',
    });

    // ===== BLOCCO 4 — ALDEBARAN =====
    const aldebaran = await invocaScritturaViva({
      tema: 'aldebaran venere velaria',
      contesto:
        'rielaborazione conclusiva del campo; traduce la dinamica energetica in comprensione pratica e distingue il tipo di riavvicinamento (emotivo, comunicativo o fisico)',
      tono: 'armonico e risolutivo',
      parole: 800,
      energia:
        'fusione dell’oraria evoluta con la Legge Universale, consolidamento del contatto reale o simbolico e definizione del piano attivo',
    });

    // ===== CONCLUSIONE (≈ 100 parole) =====
    const conclusione = await invocaScritturaViva({
      tema: 'conclusione venere velaria',
      contesto:
        'sintesi chiara che espone il significato finale dei calcoli e l’esito del contatto; deve specificare il tipo di riavvicinamento secondo la Legge Universale (7.6)',
      tono: 'sereno e definitivo',
      parole: 100,
      energia:
        'ricomposizione e quiete del campo dopo la lettura, con riconoscimento della direzione emotiva e pratica',
    });

    // ===== CHIUSURA TECNICA =====
    const finale = `✨ I calcoli sono stati eseguiti con rigore secondo le Leggi Universali.\n\n${await generaReportTecnico(datiTecnici)}`;

    // ===== COMPOSIZIONE COMPLETA =====
    const testoFinale = [
      temaNatale.trim(),
      '',
      venaria.trim(),
      '',
      velaria.trim(),
      '',
      aldebaran.trim(),
      '',
      `🔹 Conclusione: ${conclusione.trim()}`,
      '',
      finale,
    ].join('\n');

    console.log('✅ Scrittura RVV (Venere Velaria) generata correttamente');
    return { output: testoFinale };

  } catch (err) {
    console.error('❌ Errore nella generazione della RVV:', err);
    return { output: '⚠️ Impossibile completare la Scrittura Estesa (Velaria).' };
  }
}

export default generaRVV;
