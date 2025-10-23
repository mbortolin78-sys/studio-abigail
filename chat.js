import { processCommand } from './ai.js';

const messageInput = document.getElementById('messageInput');
const chatArea = document.getElementById('chat-area');
const sendButton = document.querySelector('.send-button');
const micButton = document.querySelector('.mic-button');

let currentTab = 'marika';
const chatStorage = {
  marika: [],
  clienti: []
};

// INVIO CON BOTTONE
sendButton.addEventListener('click', sendMessage);

// INVIO CON ENTER
messageInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// MICROFONO
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.interimResults = false;

  micButton.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = event => {
    let transcript = event.results[0][0].transcript;

    // Correzione base
    transcript = transcript
      .replace(/\s*virgola\s*/gi, ', ')
      .replace(/\s*punto\s*/gi, '. ')
      .replace(/\s+/g, ' ')
      .replace(/^([a-z])/g, m => m.toUpperCase());

    messageInput.value = transcript.trim();
  };
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Bolla utente
  const userBubble = `
    <div class="message-bubble mine">
      <p>${text}</p>
      <div class="separator-mine"></div>
      <span class="timestamp">${time}</span>
    </div>
  `;

  const result = processCommand(text);

  const botBubble = `
    <div class="message-bubble theirs">
      <p>${result.output}</p>
      <div class="separator-theirs"></div>
      <span class="timestamp">${time}</span>
    </div>
  `;

  chatStorage[currentTab].push(userBubble, botBubble);
  messageInput.value = '';
  renderChat();
}

function renderChat() {
  chatArea.innerHTML = chatStorage[currentTab].join('');
  chatArea.scrollTop = chatArea.scrollHeight;
}
