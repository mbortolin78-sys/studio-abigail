const textarea = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// funzione invio messaggio
function sendMessage() {
  const text = textarea.value.trim();
  if (!text) return;
  const msg = document.createElement("div");
  msg.className = "message user";
  msg.textContent = text;
  messagesContainer.prepend(msg);
  textarea.value = "";
  setTimeout(() => {
    const aiMsg = document.createElement("div");
    aiMsg.className = "message";
    aiMsg.textContent = "Risposta dell’IA… ✨";
    messagesContainer.prepend(aiMsg);
  }, 400);
}

// click su bottone
sendBtn.addEventListener("click", sendMessage);

// invio con Enter su Chrome/Mac
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// compatibilità totale (anche se Chrome blocca keydown)
textarea.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// auto espansione campo
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
