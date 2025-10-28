// ================================
// ✨ Studio Abigail - Chat Engine
// ================================

// Selettori base
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const tabs = document.querySelectorAll(".tab");

// 📱 Placeholder abbreviato su mobile
if (window.innerWidth <= 768) {
  input.placeholder = "Scrivi...";
}

// ================================
// 🔌 Collegamento al Motore Narrativo locale
// ================================
import { invocaScritturaViva } from "./server/narrativa_engine.js";

// ================================
// 🔸 RICONOSCIMENTO COMANDI
// ================================
const commands = [
  "RAE", "R A E", "R-A-E", "R.A.E.", "rae", "r a e", "r-a-e", "r.a.e",
  "RAS", "R A S", "R-A-S", "R.A.S.", "ras", "r a s", "r-a-s", "r.a.s",
  "REE", "R E E", "R-E-E", "R.E.E.", "ree", "r e e", "r-e-e", "r.e.e",
  "RES", "R E S", "R-E-S", "R.E.S.", "res", "r e s", "r-e-s", "r.e.s",
  "RVE", "R V E", "R-V-E", "R.V.E.", "rve", "r v e", "r-v-e", "r.v.e",
  "RVS", "R V S", "R-V-S", "R.V.S.", "rvs", "r v s", "r-v-s", "r.v.s",
  "RVC", "R V C", "R-V-C", "R.V.C.", "rvc", "r v c", "r-v-c", "r.v.c",
  "RVA", "R V A", "R-V-A", "R.V.A.", "rva", "r v a", "r-v-a", "r.v.a",
  "RVV", "R V V", "R-V-V", "R.V.V.", "rvv", "r v v", "r-v-v", "r.v.v",
  "RVI", "R V I", "R-V-I", "R.V.I.", "rvi", "r v i", "r-v-i", "r.v.i",
  "RETERIAE", "RETERIAS", "RETERIA", "RETERIE", "RETERIA E", "RETERIA S", "RETERIA AE",
  "reteriae", "reterias", "reteria", "reterie", "reteria e", "reteria s", "reteria ae",
  "RVETERIA", "R VETERIA", "R-VETERIA", "R.VETERIA", "rveteria", "r veteria", "r-veteria", "r.veteria"
];

// restituisce la prima “parola comando” trovata
function detectCommand(text) {
  return commands.find(cmd => text.toLowerCase().startsWith(cmd.toLowerCase()));
}

// normalizza in soli caratteri A–Z, poi prende le prime tre lettere (es. “R-A-E” → “RAE”)
function normalizeCmd(cmd) {
  return (cmd || "")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase();
}

// ================================
// 💬 GESTIONE MESSAGGI
// ================================
function addMessage(text, sender = "user") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerHTML = `
    <div class="text">${text}</div>
    <div class="meta">
      ${sender === "user"
        ? `<span class="copy">📋</span><span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`
        : `<span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span><span class="copy">📋</span>`}
    </div>`;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ================================
/* 📨 INVIO MESSAGGIO + NARRATIVA (via server locale su :3210) */
// ================================
async function handleSend() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const found = detectCommand(text);

  if (found) {
    const cmdNorm = normalizeCmd(found); // es. "RAE"
    addMessage(`✨ Comando ${cmdNorm} riconosciuto. Attendi l'elaborazione...`, "assistant");

    try {
     // carica il generatore corrispondente dal frontend (es. /frontend/rae_generator.js)
const module = await import(`/frontend/${cmdNorm.toLowerCase()}_generator.js`);

      // contesto di base
      const now = new Date();
      const data = now.toLocaleDateString("it-IT");
      const ora = now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
      const luogo = "Montebelluna";

      // chiama la funzione genera<COMANDO> (es. generaRAE)
      const result = await module[`genera${cmdNorm}`](data, ora, luogo, {});

      // invia al Motore Narrativo locale (che a sua volta usa Ollama)
      const testoFinale = await invocaScritturaViva(
        `Trasforma questi dati tecnici in un testo narrativo coerente con il Metodo Marika:

${result.output}

Usa tono empatico, energetico e chiaro.`
      );

      addMessage(testoFinale, "assistant");
    } catch (err) {
      console.error(`Errore durante l'elaborazione di ${found}:`, err);
      addMessage(`⚠️ Errore nell'elaborazione del comando ${cmdNorm}.`, "assistant");
    }
  } else {
    addMessage("✨ Cortesemente mi potresti dire il comando?", "assistant");
  }
}

sendBtn.addEventListener("click", handleSend);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// ================================
// 🎙️ MICROFONO
// ================================
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "it-IT";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => { input.placeholder = "🎧 Sto ascoltando..."; };
  recognition.onend = () => { input.placeholder = "Scrivi..."; };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    input.value = transcript;
    handleSend();
  };
}

micBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
  else addMessage("⚠️ Il microfono non è supportato su questo browser.", "assistant");
});

// ================================
// 🗂️ GESTIONE SCHEDE
// ================================
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    chatWindow.innerHTML = "";
    addMessage(`✨ Chat ${tab.textContent} aperta.`, "assistant");
  });
});

// 🌿 Auto-espansione del campo testo
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

// 📋 Copia testo dei messaggi
chatWindow.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    const message = e.target.closest(".message").querySelector(".text").textContent;
    navigator.clipboard.writeText(message)
      .then(() => {
        e.target.textContent = "✅";
        setTimeout(() => (e.target.textContent = "📋"), 1000);
      })
      .catch(() => alert("Errore nella copia"));
  }
});
