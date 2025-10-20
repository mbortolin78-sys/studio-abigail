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

// Invia messaggio con click
sendBtn.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (text === "") return;
  createMessage(text, true);
  textarea.value = "";
  setTimeout(() => createMessage("Risposta dell’IA… ✨"), 400);
});

// Invia messaggio con Enter (compatibile Safari/Mac)
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendBtn.click();
  }
});

// Autoespansione campo testo
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
