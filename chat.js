const messageInput = document.getElementById('messageInput');
const chatArea = document.getElementById('chat-area');
const sendButton = document.querySelector('.send-button');

function sendMessage() {
  const text = messageInput.value.trim();
  if (text !== '') {
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble mine';

    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    bubble.innerHTML = `
      <p>${text}</p>
      <div class="separator-mine"></div>
      <button class="edit-button">✏️</button>
      <button class="copy-button">📋</button>
      <span class="timestamp">${time}</span>
    `;

    chatArea.appendChild(bubble);
    messageInput.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

function startDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Il tuo browser non supporta la dettatura vocale.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  console.log("🎤 Microfono avviato");

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    sendMessage();
  };

  recognition.onerror = function(event) {
    console.error("Errore nella dettatura:", event.error);
  };
}
