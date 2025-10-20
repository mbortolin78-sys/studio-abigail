window.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesContainer = document.getElementById("messages");

  // verifica che gli elementi esistano
  if (!textarea || !sendBtn || !messagesContainer) {
    console.error("⚠️ Elementi chat non trovati nel DOM!");
    return;
  }

  <div class="input-area">
  <textarea id="messageInput" placeholder="Scrivi un messaggio..." rows="1"></textarea>
  <button id="sendBtn">INVIA</button>
  <button id="micBtn">🎤</button>
</div>

  // autoespansione
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
});
