window.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesContainer = document.getElementById("messages");

  // verifica che gli elementi esistano
  if (!textarea || !sendBtn || !messagesContainer) {
    console.error("⚠️ Elementi chat non trovati nel DOM!");
    return;
  }

  // funzione invio messaggio
  function sendMessage() {
    const text = textarea.value.trim();
    if (!text) return;
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.textContent = text;
    messagesContainer.prepend(msg);
    textarea.value = "";
    textarea.style.height = "auto";
    setTimeout(() => {
      const ai = document.createElement("div");
      ai.className = "message";
      ai.textContent = "Risposta dell’IA… ✨";
      messagesContainer.prepend(ai);
    }, 500);
  }

  // ENTER compatibile TUTTI browser, anche Chrome su Mac
  document.addEventListener("keyup", (event) => {
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === "TEXTAREA" || active.tagName === "INPUT") &&
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  });

 document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const testo = input.value.trim();
  if (!testo) return;

  // Mostra subito il messaggio utente
  aggiungiMessaggio(testo, "user");

  // Se contiene un comando, eseguilo
  const risposta = await eseguiComando(testo);
  aggiungiMessaggio(risposta, "assistant");

  input.value = "";
});

async function eseguiComando(input) {
  const testo = await leggiComandiOperativi();
  if (!testo) return "⚠️ Errore: impossibile leggere il file Comandi Operativi.";

  const comando = input.trim().toUpperCase();

  // controlla presenza comando nel testo
  if (testo.includes(comando)) {
    switch (comando) {
      case "RAE":
        return "✨ Esecuzione RAE avviata — Lettura Estesa secondo modello Auroria.";
      case "RAS":
        return "🪶 Esecuzione RAS avviata — Lettura Sintetica secondo modello Auroria.";
      case "RVE":
        return "🌿 Esecuzione RVE avviata — Visione Energetica Estesa (Velaria).";
      case "RVS":
        return "🌱 Esecuzione RVS avviata — Visione Energetica Sintetica (Velaria).";
      case "RVC":
        return "💫 Esecuzione RVC avviata — Visione di Connessione (Venere).";
      case "RVA":
        return "🌸 Esecuzione RVA avviata — Visione di Anima (Venere).";
      case "RVI":
        return "🔮 Esecuzione RVI avviata — Visione di Identità (Venere).";
      default:
        return `✅ Comando ${comando} riconosciuto nel file Comandi Operativi.`;
    }
  } else {
    return "❌ Comando non trovato nel file Comandi Operativi.";
  }
}    textarea.style.height = textarea.scrollHeight + "px";
  });
});
