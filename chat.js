// ================================
// ✨ Studio Abigail - Chat Engine (versione stabile)
// ================================

// Selettori base
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const tabs = document.querySelectorAll(".tab");

// Placeholder breve solo su mobile
if (window.innerWidth <= 768) {
  input.placeholder = "Scrivi...";
}

// ================================
// 🔸 RICONOSCIMENTO COMANDI
// ================================
const commands = [
  // RAE
  "RAE","R A E","R-A-E","R.A.E.","rae","r a e","r-a-e","r.a.e",
  // RAS
  "RAS","R A S","R-A-S","R.A.S.","ras","r a s","r-a-s","r.a.s",
  // REE
  "REE","R E E","R-E-E","R.E.E.","ree","r e e","r-e-e","r.e.e",
  // RES
  "RES","R E S","R-E-S","R.E.S.","res","r e s","r-e-s","r.e.s",
  // RVE
  "RVE","R V E","R-V-E","R.V.E.","rve","r v e","r-v-e","r.v.e",
  // RVS
  "RVS","R V S","R-V-S","R.V.S.","rvs","r v s","r-v-s","r.v.s",
  // RVC
  "RVC","R V C","R-V-C","R.V.C.","rvc","r v c","r-v-c","r.v.c",
  // RVA
  "RVA","R V A","R-V-A","R.V.A.","rva","r v a","r-v-a","r.v.a",
  // RVV
  "RVV","R V V","R-V-V","R.V.V.","rvv","r v v","r-v-v","r.v.v",
  // RVI
  "RVI","R V I","R-V-I","R.V.I.","rvi","r v i","r-v-i","r.v.i",
  // RETERIAE / RETERIAS
  "RETERIAE","RETERIAS","RETERIA","RETERIE","RETERIA E","RETERIA S","RETERIA AE",
  "reteriae","reterias","reteria","reterie","reteria e","reteria s","reteria ae",
  // RVETERIA
  "RVETERIA","R VETERIA","R-VETERIA","R.VETERIA","rveteria","r veteria","r-veteria","r.veteria"
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
// 📨 INVIO MESSAGGIO
// ================================
function handleSend() {
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

  // ripristina altezza e placeholder
  input.style.height = "auto";
  input.placeholder = (window.innerWidth <= 768) ? "Scrivi..." : "Scrivi...";
}

sendBtn.addEventListener("click", handleSend);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// Auto-espansione del campo di testo
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

// ================================
// 🎙️ MICROFONO (versione semplice, stabile)
// ================================
let recognition = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "it-IT";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    input.placeholder = "🎧 Sto ascoltando...";
  };

 recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.trim();
  input.value = transcript;
  handleSend();

  // 🔇 chiude subito il microfono
  try {
    recognition.stop();
    recognition.abort();
  } catch {}

  // ⏳ sicurezza extra per Safari: spegne tutto dopo 5 secondi
  setTimeout(() => {
    try {
      recognition.stop();
      recognition.abort();
    } catch {}
    input.placeholder = "Scrivi...";
  }, 5000);
};
  
  // 💡 su iPhone serve un piccolo delay per disattivarlo davvero
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    setTimeout(() => {
      try {
        recognition.stop();
        recognition.abort();
      } catch {}
      input.placeholder = "Scrivi...";
    }, 1000);
  }
};

  recognition.onend = () => {
    input.placeholder = (window.innerWidth <= 768) ? "Scrivi..." : "Scrivi...";
  };
}

micBtn.addEventListener("click", () => {
  if (!recognition) {
    addMessage("⚠️ Il microfono non è supportato su questo browser.", "assistant");
    return;
  }
  try {
    recognition.start();
  } catch {
    // se era già in ascolto o ha dato errore, lo fermo e riprovo
    try { recognition.stop(); } catch {}
    setTimeout(() => { try { recognition.start(); } catch {} }, 150);
  }
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
