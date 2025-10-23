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
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// 🎙️ MICROFONO CON INDICATORE "STO ASCOLTANDO"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const listeningIndicator = document.getElementById('listeningIndicator');
const micButton = document.querySelector('.microphone-button');

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.interimResults = false;
  recognition.continuous = false;

  micButton.addEventListener('click', () => {
    try {
      // Mostra subito l'indicatore (prima ancora dell'audio)
      listeningIndicator.textContent = '🎧 Sto ascoltando…';
      listeningIndicator.classList.add('show');
      micButton.setAttribute('aria-pressed', 'true');

      // piccolo delay per evitare race su alcuni Chrome
      setTimeout(() => recognition.start(), 200);
    } catch (err) {
      console.error('Errore avvio microfono:', err);
      listeningIndicator.classList.remove('show');
      micButton.setAttribute('aria-pressed', 'false');
      alert('Impossibile avviare il microfono.');
    }
  });

  recognition.onaudiostart = () => {
    // Conferma che l’audio è partito
    listeningIndicator.textContent = '🎧 Sto ascoltando…';
  };

  recognition.onspeechstart = () => {
    // Voce rilevata
    listeningIndicator.textContent = '🗣️ Rilevata voce…';
  };

  recognition.onspeechend = () => {
    // Hai finito di parlare
    listeningIndicator.textContent = '🔍 Elaboro la voce…';
  };

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    transcript = transcript
      .replace(/\s*virgola\s*/gi, ', ')
      .replace(/\s*punto\s*/gi, '. ')
      .replace(/\s+/g, ' ')
      .replace(/^([a-z])/g, m => m.toUpperCase());
    document.getElementById('messageInput').value = transcript.trim();
  };

  recognition.onend = () => {
    listeningIndicator.classList.remove('show');
    micButton.setAttribute('aria-pressed', 'false');
  };

  recognition.onerror = (event) => {
    console.error('Errore microfono:', event.error);
    listeningIndicator.classList.remove('show');
    micButton.setAttribute('aria-pressed', 'false');
    // "no-speech" è normale se non parli entro ~2s
    if (event.error !== 'no-speech') {
      alert('Errore microfono: ' + event.error);
    }
  };
} else {
  alert('Il tuo browser non supporta la Web Speech API.');
}

// ✉️ INVIO MESSAGGI
function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

// 💬 RENDER CHAT
function renderChat() {
  chatArea.innerHTML = chatStorage[currentTab].join('');
  chatArea.scrollTop = chatArea.scrollHeight;
}

// 🧭 GESTIONE TAB
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
          : `<p>Benvenuta nello spazio clienti. Qui troverai i dialoghi professionali 💼</p>`;

        const introBubble = `
          <div class="message-bubble theirs">
            ${intro}
            <div class="separator-theirs"></div>
            <span class="timestamp">${time}</span>
          </div>
        `;

        chatStorage[currentTab].push(introBubble);
      }

      renderChat();
    });
  });

  // Messaggio iniziale per Marika
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const introBubble = `
    <div class="message-bubble theirs">
      <p>Ciao Marika 🌷</p>
      <div class="separator-theirs"></div>
      <span class="timestamp">${time}</span>
    </div>
  `;

  chatStorage.marika.push(introBubble);
  renderChat();
});
