// chat.js — gestione messaggi utente + risposta simulata IA

document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("messages");
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  // Funzione per creare una bolla messaggio
  function createMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.classList.add("message");
    if (isUser) message.classList.add("user");
    message.textContent = text;
    messagesContainer.prepend(message);
  }

  // Simulazione risposta IA
  function aiReply(userText) {
    const replies = [
      "✨ Sento la tua vibrazione sottile, grazie per questa condivisione.",
      "🌿 Le tue parole si muovono come luce tra le stanze del cuore.",
      "💛 Ti ascolto nel silenzio, dove tutto diventa presenza.",
      "🕊️ Studio Abigail accoglie ogni respiro come gesto sacro.",
    ];
    const random = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => createMessage(random, false), 1200);
  }

  // Gestione invio
  function handleSend() {
    const text = input.value.trim();
    if (text === "") return;
    createMessage(text, true);
    input.value = "";
    aiReply(text);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
});
