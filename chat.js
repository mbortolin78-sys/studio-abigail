const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const micButton = document.getElementById("micButton");

// funzione per aggiungere messaggi
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = 0; // la chat parte dall'alto
}

// evento invio testo
sendButton.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
      addMessage("✨ Ricevuto: " + text, "bot");
    }, 600);
  }
});

// microfono animato (senza audio reale)
micButton.addEventListener("click", () => {
  micButton.classList.toggle("active");
});
