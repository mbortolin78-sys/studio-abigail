import { processCommand } from './ai.js';

const messageInput = document.getElementById('messageInput');
const chatArea = document.getElementById('chat-area');
const sendButton = document.querySelector('.send-button');
const micButton = document.querySelector('.microphone-button');

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

// 🎙️ MICROFONO ORIGINALE (funzionante)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.interimResults = false;
  recognition.continuous = true; // ✅ questa è l’unica riga che aggiungiamo

  micButton.addEventListener('click', () => {
    recognition.start();
    micButton.classList.add('active');
  });

  recognition.onresult = event => {
    let transcript = event.results[0][0].transcript;
    transcript = transcript
      .replace(/\s*virgola\s*/gi, ', ')
      .replace(/\s*punto\s*/gi, '. ')
      .replace(/\s+/g, ' ')
      .replace(/^([a-z])/g, m => m.toUpperCase());

    messageInput.value = transcript.trim();
  };

  recognition.onend = () => {
    micButton.classList.remove('active');
  };

  recognition.onerror = () => {
    micButton.classList.remove('active');
  };
}

// INVIO MESSAGGIO
function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const userBubble = `
    <div class="message-bubble mine">
      <p>${text}</p>
      <span class="timestamp">${time}</span>
    </div>
  `;

  const result = processCommand(text);

  const botBubble = `
    <div class="message-bubble theirs">
      <p>${result.output}</p>
      <span class="timestamp">${time}</span>
    </div>
  `;

  chatStorage[currentTab].push(userBubble, botBubble);
  messageInput.value = '';
  renderChat();
}

// RENDER CHAT
function renderChat() {
  chatArea.innerHTML = chatStorage[currentTab].join('');
  chatArea.scrollTop = chatArea.scrollHeight;
}

// SCHEDE
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.getAttribute('data-tab');

      if (chatStorage[currentTab].length === 0) {
        const time = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        const intro = currentTab === 'marika'
          ? `<p>Ciao Marika 🌷</p>`
          : `<p>Benvenuta nello spazio clienti 💼</p>`;

        const introBubble = `
          <div class="message-bubble theirs">
            ${intro}
            <span class="timestamp">${time}</span>
          </div>
        `;
        chatStorage[currentTab].push(introBubble);
      }
      renderChat();
    });
  });

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const introBubble = `
    <div class="message-bubble theirs">
      <p>Ciao Marika 🌷</p>
      <span class="timestamp">${time}</span>
    </div>
  `;
  chatStorage.marika.push(introBubble);
  renderChat();
});
