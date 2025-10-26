const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const tabs = document.querySelectorAll(".tab");

let currentTab = "marika";
const chatStorage = { marika: [], clienti: [] };

// --- Gestione invio messaggi ---
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const userMessage = `
    <div class="message user">
      <div class="text">${text}</div>
      <div class="meta"><span class="time">${time}</span></div>
    </div>
  `;

  const responseText = interpretCommand(text);
  const assistantMessage = `
    <div class="message assistant">
      <div class="text">${responseText}</div>
      <div class="meta"><span class="time">${time}</span></div>
    </div>
  `;

  chatStorage[currentTab].push(userMessage, assistantMessage);
  input.value = "";
  renderChat();
}

// --- Riconoscimento vocale ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "it-IT";
  recognition.interimResults = false;

  micBtn.addEventListener("click", () => {
    recognition.start();
    micBtn.classList.add("active");
  });

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    input.value = transcript.trim();
  };

  recognition.onend = () => micBtn.classList.remove("active");
  recognition.onerror = () => micBtn.classList.remove("active");
}

// --- Interpretazione comandi ---
function interpretCommand(text) {
  const normalized = text.toUpperCase().replace(/\s|\./g, "").replace(/-|_/g, "");

  const commands = [
    "RAE", "RAS", "REE", "RES", "RVE", "RVS", "RETERIAE", "RETERIAS", "RVC", "RVA", "RVV", "RVETERIA", "RVI"
  ];

  const matched = commands.find(cmd => normalized.includes(cmd));

  if (matched) {
    return `✨ Comando ${matched} riconosciuto. Inizio elaborazione...`;
  } else {
    return "✨ Cortesemente mi potresti dire il comando?";
  }
}

// --- Cambio scheda ---
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentTab = index === 0 ? "clienti" : "marika";
    renderChat();
  });
});

// --- Rendering chat ---
function renderChat() {
  chatWindow.innerHTML = chatStorage[currentTab].join("");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
