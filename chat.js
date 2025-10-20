const textarea = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// Funzione per creare e mostrare i messaggi
function createMessage(text, isUser = false) {
  const message = document.createElement("div");
  message.classList.add("message");
  if (isUser) message.classList.add("user");
  message.textContent = text;
  messagesContainer.prepend(message);
  messagesContainer.scrollTop = 0;
}

// Funzione per inviare
function sendMessage() {
  const text = textarea.value.trim();
  if (text === "") return;
  createMessage(text, true);
  textarea.value = "";
  setTimeout(() => createMessage("Risposta dell’IA… ✨"), 400);
}

// Cattura Enter in modo universale
textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Click su Invia
sendBtn.addEventListener("click", sendMessage);

// Autoespansione campo testo
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
