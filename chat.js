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

  // click su invia
  sendBtn.addEventListener("click", sendMessage);

  // autoespansione
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
});
