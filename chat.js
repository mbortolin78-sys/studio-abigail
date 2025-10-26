// =======================================
// Studio Abigail ✨ — Chat con doppia scheda e microfono
// =======================================
(function () {
  const $ = (sel) => document.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  // Elementi principali
  const el = {
    tabs: document.querySelectorAll('.tab'),
    marikaTab: document.querySelector('.tab.marika'),
    clientiTab: document.querySelector('.tab.clienti'),
    chatWindow: document.querySelector('.chat-window'),
    input: $('textarea'),
    send: $('#send-btn'),
    mic: $('#mic-btn'),
  };

  // Stato locale
  const state = {
    activeChat: 'marika',
    chats: { marika: [], clienti: [] },
    recognition: null,
    listening: false,
  };

  // ===============================
  // CAMBIO SCHEDA
  // ===============================
  function switchTab(tab) {
    state.activeChat = tab;

    el.tabs.forEach((t) => t.classList.remove('active'));
    const active = tab === 'marika' ? el.marikaTab : el.clientiTab;
    active.classList.add('active');

    renderChat(); // mostra solo i messaggi della scheda attiva
  }

  on(el.marikaTab, 'click', () => switchTab('marika'));
  on(el.clientiTab, 'click', () => switchTab('clienti'));

  // ===============================
  // RENDER CHAT
  // ===============================
  function renderChat() {
    el.chatWindow.innerHTML = '';
    const messages = state.chats[state.activeChat];
    messages.forEach((m) => appendMessage(m.role, m.text, false));
  }

  // ===============================
  // INVIO MESSAGGIO
  // ===============================
  async function sendMessage() {
    const text = el.input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    el.input.value = '';

    // Finta risposta (qui poi collegheremo processCommand)
    const response = `Risposta automatica (${state.activeChat}): ${text}`;
    setTimeout(() => appendMessage('assistant', response), 600);
  }

  on(el.send, 'click', sendMessage);
  on(el.input, 'keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ===============================
  // MICROFONO
  // ===============================
  function setupMic() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      on(el.mic, 'click', () => alert('🎤 Il microfono non è supportato su questo browser.'));
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Recognition();
    state.recognition = rec;

    rec.lang = 'it-IT';
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      state.listening = true;
      el.input.placeholder = '🎤 In ascolto...';
      el.mic.style.opacity = '0.6';
    };

    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join(' ');
      el.input.value += (el.input.value ? ' ' : '') + text;
    };

    rec.onend = () => {
      state.listening = false;
      el.input.placeholder = 'Scrivi un nuovo messaggio...';
      el.mic.style.opacity = '1';
    };

    on(el.mic, 'click', () => {
      if (state.listening) {
        rec.stop();
      } else {
        try {
          rec.start();
        } catch (err) {
          alert('🎤 Errore microfono. Assicurati che Chrome abbia il permesso.');
        }
      }
    });
  }

  setupMic();

  // ===============================
  // VISUALIZZAZIONE MESSAGGI
  // ===============================
  function appendMessage(role, text, save = true) {
    const wrap = document.createElement('div');
    wrap.className = `message ${role}`;

    const msg = document.createElement('div');
    msg.className = 'text';
    msg.textContent = text;

    const meta = document.createElement('div');
    meta.className = 'meta';

    const sep = document.createElement('div');
    sep.className = 'meta-sep';
    const time = document.createElement('span');
    time.textContent = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    const copy = document.createElement('span');
    copy.className = 'copy';
    copy.textContent = '⧉';
    copy.onclick = () => navigator.clipboard.writeText(text);

    if (role === 'assistant') meta.append(sep, time, copy);
    else meta.append(sep, copy, time);

    wrap.append(msg, meta);
    el.chatWindow.appendChild(wrap);
    el.chatWindow.scrollTop = el.chatWindow.scrollHeight;

    if (save) state.chats[state.activeChat].push({ role, text });
  }

  // Inizializzazione
  switchTab('marika');
})();
