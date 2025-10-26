/* ==========================================================
   Chat Frontend Controller — Studio Abigail ✨
   Robusto, senza import: collega UI, comandi, mic, tabs.
   Funziona con window.processCommand se presente.
   ========================================================== */

(function () {
  // ---------- Utility sicure ----------
  const $ = (sel) => document.querySelector(sel);
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const nowISO = () => new Date().toISOString();
  const hhmm = () => new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  const isFn = (f) => typeof f === 'function';

  // ---------- Hook elementi (tollerante a nodi mancanti) ----------
  const el = {
    messages: $('#messages') || $('#chat-messages') || $('.chat-window'),
    input:    $('#message-input') || $('textarea'),
    send:     $('#send-btn') || $('#btn-send') || $('.btn-send'),
    mic:      $('#mic-btn') || $('#btn-mic') || $('.btn-mic'),
    tabMarika: document.querySelector('[data-tab="marika"]') || $('#tab-marika') || null,
    tabClienti: document.querySelector('[data-tab="clienti"]') || $('#tab-clienti') || null,
    tabsWrap:  $('.tabs'),
  };

  // Stato semplice
  const state = {
    activeTab: 'marika',   // 'marika' | 'clienti'
    dictating: false,
    recognition: null,
  };

  // ---------- Safe log ----------
  const log = (...a) => console.log('[Abigail]', ...a);
  const warn = (...a) => console.warn('[Abigail]', ...a);
  const err  = (...a) => console.error('[Abigail]', ...a);

  // ---------- Init ----------
  function init() {
    wireTabs();
    wireInputSend();
    wireMic();
    dehydratedNotice();
    log('UI pronta.');
  }

  // ---------- Tabs ----------
  function wireTabs() {
    // Se non ci sono le tab, ignora
    if (!el.tabMarika && !el.tabClienti) {
      warn('Schede non presenti (ok).');
      return;
    }

    function activate(tab) {
      state.activeTab = tab;

      // classi attive/inattive
      [el.tabMarika, el.tabClienti].forEach((b) => {
        if (!b) return;
        const isActive = (b === (tab === 'marika' ? el.tabMarika : el.tabClienti));
        b.classList.toggle('active', !!isActive);
        b.classList.toggle('inactive', !isActive);
      });

      // Focus input
      el.input && el.input.focus({ preventScroll: true });
    }

    on(el.tabMarika, 'click', () => activate('marika'));
    on(el.tabClienti, 'click', () => activate('clienti'));

    // Default: Marika attiva
    activate('marika');
  }

  // ---------- Invio messaggi ----------
  function wireInputSend() {
    if (!el.input) {
      warn('Textarea non trovata.');
      return;
    }

    // Enter = invia (Shift+Enter = a capo)
    on(el.input, 'keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCurrent();
      }
    });

    if (el.send) {
      on(el.send, 'click', sendCurrent);
    } else {
      warn('Pulsante Invia non trovato.');
    }
  }

  async function sendCurrent() {
    const text = (el.input?.value || '').trim();
    if (!text) return;

    // Stampa il messaggio utente
    appendMessage('user', text);

    // Pulisce input
    el.input.value = '';
    autoResize(el.input);

    // Chiama il motore comandi se c’è, altrimenti fallback
    try {
      const handler = window.processCommand;
      let response = null;

      if (isFn(handler)) {
        // Il tuo ai.js dovrebbe esportare processCommand(text) → {output: "..."}
        response = await handler(text);
      } else {
        // Fallback (debug)
        response = { output: `⚙️ (debug) Echo: ${text}\n\n— Nessun motore comandi trovato (window.processCommand mancante).` };
      }

      const out = (response && response.output) ? String(response.output) : '— Nessun output.';
      appendMessage('assistant', out);

    } catch (e) {
      err('Errore processCommand:', e);
      appendMessage('assistant', `❌ Errore interno: ${e?.message || e}`);
    }

    // Auto-scroll
    scrollToBottom();
  }

  // ---------- Microfono (Web Speech) ----------
  function wireMic() {
    if (!el.mic) return;

    const canSpeech = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);
    if (!canSpeech) {
      on(el.mic, 'click', () => {
        appendMessage('assistant', '🎤 Microfono non supportato in questo browser.');
      });
      return;
    }

    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    state.recognition = rec;

    rec.lang = 'it-IT';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      state.dictating = true;
      setMicActive(true);
      setPlaceholderListening(true);
    };
    rec.onend = () => {
      state.dictating = false;
      setMicActive(false);
      setPlaceholderListening(false);
    };
    rec.onerror = (e) => {
      appendMessage('assistant', `🎤 Errore microfono: ${e?.error || 'sconosciuto'}`);
      state.dictating = false;
      setMicActive(false);
      setPlaceholderListening(false);
    };
    rec.onresult = (ev) => {
      const txt = Array.from(ev.results)
        .map(r => r[0]?.transcript || '')
        .join(' ')
        .trim();
      if (txt && el.input) {
        el.input.value = (el.input.value ? (el.input.value + ' ') : '') + txt;
        autoResize(el.input);
        el.input.focus();
      }
    };

    on(el.mic, 'click', () => {
      if (state.dictating) {
        try { rec.stop(); } catch {/* noop */}
        return;
      }
      // HTTPS required, su iOS spesso serve interazione utente (ok, è click)
      try { rec.start(); } catch (e) { appendMessage('assistant', '🎤 Concedi permesso microfono o usa HTTPS.'); }
    });
  }

  function setMicActive(active) {
    if (!el.mic) return;
    el.mic.classList.toggle('listening', !!active);
    // Effetto luce soft (CSS deve avere .listening)
  }
  function setPlaceholderListening(active) {
    if (!el.input) return;
    el.input.dataset.listening = active ? '1' : '';
  }

  // ---------- Append messaggi ----------
  function appendMessage(role, text) {
    // Crea contenitore messaggio
    const wrap = document.createElement('div');
    wrap.className = `message ${role === 'user' ? 'user' : 'assistant'}`;

    // Testo
    const t = document.createElement('div');
    t.className = 'text';
    t.textContent = text;

    // Riga meta (linea + orario + copia)
    const meta = document.createElement('div');
    meta.className = 'meta';

    // Separatore linea (lunghezza diversa lato user/assistant gestita da CSS)
    const sep = document.createElement('div');
    sep.className = 'meta-sep';

    const time = document.createElement('span');
    time.textContent = hhmm();

    const copy = document.createElement('span');
    copy.className = 'copy';
    copy.title = 'Copia testo';
    copy.textContent = '⧉';
    on(copy, 'click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        copy.textContent = '✓';
        setTimeout(() => (copy.textContent = '⧉'), 900);
      } catch {
        // fallback
        prompt('Copia manuale:', text);
      }
    });

    // Ordine speculare tra me e te:
    // assistant: [linea][ora][copia]
    // user:      [linea][copia][ora]
    if (role === 'assistant') {
      meta.append(sep, time, copy);
    } else {
      meta.append(sep, copy, time);
    }

    wrap.append(t, meta);

    if (!el.messages) {
      // Se non esiste il contenitore, append in body
      document.body.appendChild(wrap);
    } else {
      el.messages.appendChild(wrap);
      scrollToBottom();
    }
  }

  // ---------- Auto-resize textarea ----------
  function autoResize(ta) {
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(220, ta.scrollHeight) + 'px';
  }

  // ---------- Scroll ----------
  function scrollToBottom() {
    try {
      el.messages && el.messages.scrollTo({ top: el.messages.scrollHeight, behavior: 'smooth' });
    } catch {}
  }

  // ---------- Consiglio cache (facoltativo) ----------
  function dehydratedNotice() {
    // Se service worker vecchio tiene in cache, invito al reload vero
    setTimeout(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        log('ServiceWorker attivo. Se vedi incongruenze, fai Hard Reload (Shift+R).');
      }
    }, 1000);
  }

  // ---------- Avvio ----------
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();

})();
