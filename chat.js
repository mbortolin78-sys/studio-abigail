const textarea = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");

// funzione di invio
function sendMessage() {
  const text = textarea.value.trim();
  if (!text) return;
  const msg = document.createElement("div");
  msg.className = "message user";
  msg.textContent = text;
  messagesContainer.prepend(msg);
  textarea.value = "";
  textarea.style.height = "auto";

  // risposta simulata
  setTimeout(() => {
    const ai = document.createElement("div");
    ai.className = "message";
    ai.textContent = "Risposta dell’IA… ✨";
    messagesContainer.prepend(ai);
  }, 500);
}

// invio forzato con Enter
document.addEventListener("keydown", (event) => {
  const active = document.activeElement;
  if (
    active === textarea &&
    event.key === "Enter" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    sendMessage();
  }
});

// click sul pulsante Invia
sendBtn.addEventListener("click", sendMessage);

// autoespansione
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
