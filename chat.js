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
  recognition.interimResults = true; // 🔥 attiviamo i risultati parziali
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  messageInput.placeholder = "Sto ascoltando…";
  recognition.start();

  let finalTranscript = "";

  recognition.onstart = function() {
    console.log("🟢 In ascolto...");
  };

  recognition.onresult = function(event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const result = event.results[i];
      if (result.isFinal) {
        finalTranscript += result[0].transcript;
      }
    }

    if (finalTranscript) {
      console.log("📝 Trascritto:", finalTranscript);
      messageInput.value = finalTranscript;
      messageInput.placeholder = "Scrivi o parla…";
      sendMessage();
    }
  };

  recognition.onerror = function(event) {
    messageInput.placeholder = "Scrivi o parla…";

    if (event.error === "no-speech") {
      alert("Non ho sentito nulla. Riprova parlando subito dopo il clic.");
    } else {
      alert("Errore nella dettatura: " + event.error);
    }
  };

  recognition.onend = function() {
    console.log("🔴 Microfono spento");
    messageInput.placeholder = "Scrivi o parla…";
  };
}
