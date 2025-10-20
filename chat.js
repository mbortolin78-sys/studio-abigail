const textarea = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// Crea messaggio con fade-in
function createMessage(text, isUser = false) {
  const message = document.createElement("div");
  message.classList.add("message");
  if (isUser) message.classList.add("user");
  message.textContent = text;
  message.style.opacity = 0;
  message.style.transition = "opacity 0.6s ease-in-out";
  messagesContainer.prepend(message);
  setTimeout(() => (message.style.opacity = 1), 50);
}

// Invia messaggio
sendBtn.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (text === "") return;
  createMessage(text, true);
  textarea.value = "";
  setTimeout(() => createMessage("Risposta dell’IA… ✨"), 600);
});

// Invio messaggio con Enter (senza Shift)
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendBtn.click();
  }
});

// Autoespansione del campo testo
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
