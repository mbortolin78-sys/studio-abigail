// ================================
// ✨ Studio Abigail - Chat Engine
// ================================

// Selettori base
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
// 📱 Accorcia solo il testo del placeholder su mobile
if (window.innerWidth <= 768) {
  document.getElementById("message-input").placeholder = "Scrivi...";
}
const micBtn = document.getElementById("mic-btn");
const tabs = document.querySelectorAll(".tab");

// ================================
// 🔸 RICONOSCIMENTO COMANDI
// ================================
const commands = [
  // RAE
  "RAE", "R A E", "R-A-E", "R.A.E.", "rae", "r a e", "r-a-e", "r.a.e",
  // RAS
  "RAS", "R A S", "R-A-S", "R.A.S.", "ras", "r a s", "r-a-s", "r.a.s",
  // REE
  "REE", "R E E", "R-E-E", "R.E.E.", "ree", "r e e", "r-e-e", "r.e.e",
  // RES
  "RES", "R E S", "R-E-S", "R.E.S.", "res", "r e s", "r-e-s", "r.e.s",
  // RVE
  "RVE", "R V E", "R-V-E", "R.V.E.", "rve", "r v e", "r-v-e", "r.v.e",
  // RVS
  "RVS", "R V S", "R-V-S", "R.V.S.", "rvs", "r v s", "r-v-s", "r.v.s",
  // RVC
  "RVC", "R V C", "R-V-C", "R.V.C.", "rvc", "r v c", "r-v-c", "r.v.c",
  // RVA
  "RVA", "R V A", "R-V-A", "R.V.A.", "rva", "r v a", "r-v-a", "r.v.a",
  // RVV
  "RVV", "R V V", "R-V-V", "R.V.V.", "rvv", "r v v", "r-v-v", "r.v.v",
  // RVI
  "RVI", "R V I", "R-V-I", "R.V.I.", "rvi", "r v i", "r-v-i", "r.v.i",
  // RETERIAE + varianti vocali
  "RETERIAE", "RETERIAS", "RETERIA", "RETERIE", "RETERIAE", "RETERIA E", "RETERIA S", "RETERIA AE",
  "reteriae", "reterias", "reteria", "reterie", "reteria e", "reteria s", "reteria ae",
  // RVETERIA
  "RVETERIA", "R VETERIA", "R-VETERIA", "R.VETERIA", "rveteria", "r veteria", "r-veteria", "r.veteria"
];

function detectCommand(text) {
  return commands.find(cmd => text.trim().toLowerCase() === cmd.toLowerCase());
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
// ================================
// 📨 INVIO MESSAGGIO
// ================================
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const foundCommand = detectCommand(text);
  if (foundCommand) {
    setTimeout(() => addMessage(`✨ Comando ${foundCommand.toUpperCase()} riconosciuto. Inizio elaborazione...`, "assistant"), 300);
  } else {
    setTimeout(() => addMessage("✨ Cortesemente mi potresti dire il comando?", "assistant"), 300);
  }

  // 🎙️ Disattiva automaticamente il microfono dopo l'invio
  if (recognition && recognition.stop) {
    recognition.stop();
    console.log("🎤 Microfono disattivato automaticamente dopo l'invio");
  }
});

// ================================
// 🎙️ MICROFONO (riconoscimento vocale)
// ================================
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "it-IT";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    input.placeholder = "🎧 Sto ascoltando...";
  };

  recognition.onend = () => {
    input.placeholder = "Scrivi...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    input.value = transcript;
    sendBtn.click();
  };
}

micBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
  else addMessage("⚠️ Il microfono non è supportato su questo browser.", "assistant");
});

// ================================
// 🗂️ GESTIONE SCHEDE (Clienti / Marika)
// ================================
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    chatWindow.innerHTML = "";
    addMessage(`✨ Chat ${tab.textContent} aperta.`, "assistant");
  });
});

// 🌿 Auto-espansione del campo di testo
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

// ✉️ Dopo invio torna all’altezza originale e mantiene il placeholder corretto
sendBtn.addEventListener("click", () => {
  input.style.height = "auto";
  if (window.innerWidth <= 768) {
    input.placeholder = "Scrivi..."; // mantiene il placeholder breve su mobile
  } else {
    input.placeholder = "Scrivi..."; // desktop
  }
});

// 📋 Copia testo dei messaggi
chatWindow.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    const message = e.target.closest(".message").querySelector(".text").textContent;
    navigator.clipboard.writeText(message)
      .then(() => {
        e.target.textContent = "✅";
        setTimeout(() => e.target.textContent = "📋", 1000);
      })
      .catch(() => alert("Errore nella copia"));
  }
});
