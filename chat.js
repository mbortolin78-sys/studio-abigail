// =======================================
// Studio Abigail — Chat con doppia scheda e microfono
// =======================================

(function () {
  const chatWindow = document.getElementById("chat-window");
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const micBtn = document.getElementById("mic-btn");
  const tabs = document.querySelectorAll(".tab");

  // Stato locale
  const state = {
    activeChat: "marika",
    chats: { marika: [], clienti: [] },
    listening: false,
    recognition: null
  };

  // ===============================
  // CAMBIO SCHEDA
  // ===============================
  tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Rimuove stato attivo da tutte
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Transizione morbida nella finestra chat
    chatWindow.style.opacity = "0";
    setTimeout(() => {
      state.activeChat = index === 0 ? "clienti" : "marika";
      renderChat();
      chatWindow.style.opacity = "1";
    }, 150);
  });
});
  
  // ===============================
  // RENDER CHAT
  // ===============================
  function renderChat() {
    chatWindow.innerHTML = "";
    const messages = state.chats[state.activeChat];
    messages.forEach(m => appendMessage(m.role, m.text, false));
  }

  // ===============================
  // INVIO MESSAGGIO
  // ===============================
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage("user", text);
    input.value = "";

    // Risposta simulata
    setTimeout(() => {
      appendMessage("assistant", `Risposta (${state.activeChat}): ${text}`);
    }, 600);
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ===============================
  // MICROFONO (Chrome, HTTPS o localhost)
  // ===============================
  function setupMic() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      micBtn.addEventListener("click", () =>
        alert("🎤 Il microfono non è supportato su questo browser.")
      );
      return;
    }

    const rec = new Recognition();
    state.recognition = rec;
    rec.lang = "it-IT";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      state.listening = true;
      input.placeholder = "🎤 In ascolto...";
      micBtn.style.opacity = "0.6";
    };

    rec.onresult = (event) => {
      const text = Array.from(event.results)
        .map(r => r[0].transcript)
        .join(" ");
      input.value += (input.value ? " " : "") + text;
    };

    rec.onend = () => {
      state.listening = false;
      input.placeholder = "Scrivi un nuovo messaggio...";
      micBtn.style.opacity = "1";
    };

    micBtn.addEventListener("click", () => {
      if (state.listening) rec.stop();
      else {
        try {
          rec.start();
        } catch {
          alert("⚠️ Errore microfono. Assicurati di dare il permesso a Chrome.");
        }
      }
    });
  }

  setupMic();

  // ===============================
  // VISUALIZZAZIONE MESSAGGI
  // ===============================
  function appendMessage(role, text, save = true) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", role);

    const msgText = document.createElement("div");
    msgText.classList.add("text");
    msgText.textContent = text;

    const meta = document.createElement("div");
    meta.classList.add("meta");

    const sep = document.createElement("div");
    sep.classList.add("meta-sep");

    const time = document.createElement("span");
    time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const copy = document.createElement("span");
    copy.classList.add("copy");
    copy.textContent = "⧉";
    copy.addEventListener("click", () => navigator.clipboard.writeText(text));

    if (role === "assistant") meta.append(sep, time, copy);
    else meta.append(sep, copy, time);

    msgDiv.append(msgText, meta);
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (save) state.chats[state.activeChat].push({ role, text });
  }

  // Avvio iniziale
  renderChat();
})();
