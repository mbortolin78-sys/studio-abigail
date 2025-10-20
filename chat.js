const textarea = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// Funzione per creare e mostrare messaggi
function createMessage(text, isUser = false) {
  const message = document.createElement("div");
  message.classList.add("message");
  if (isUser) message.classList.add("user");
  message.textContent = text;
  messagesContainer.prepend(message);
  messagesContainer.scrollTop = 0;
}

// Funzione di invio
function sendMessage() {
  const text = textarea.value.trim();
  if (!text) return;
  createMessage(text, true);
  textarea.value = "";
  textarea.style.height = "auto";
  setTimeout(() => createMessage("Risposta dell’IA… ✨"), 500);
}

// Gestione ENTER in modo universale (Chrome, Safari, Edge, Firefox)
textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Fallback per sicurezza su Chrome (focus persi o bug di input)
textarea.addEventListener("blur", () => {
  textarea.focus();
});

// Clic sul pulsante Invia
sendBtn.addEventListener("click", sendMessage);

// Autoespansione campo di testo
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
