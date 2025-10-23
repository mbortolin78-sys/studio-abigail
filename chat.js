import { processCommand } from './ai.js';
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

 const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'it-IT';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  const testoCorretto = correggiTesto(transcript);
  messageInput.value = testoCorretto;
  messageInput.placeholder = "Scrivi o parla…";
};

  // Correzione base
  testo = testo.trim();
  testo = testo.charAt(0).toUpperCase() + testo.slice(1);

  // Aggiunta virgole semplici: dove ci sono "e poi", "allora", "però", ecc.
  testo = testo.replace(/\b(e poi|allora|però|comunque|quindi|invece|cioè)\b/gi, ", $1");

  // Punto finale se manca
  if (!/[.!?]$/.test(testo)) {
    testo += ".";
  }

  messageInput.value = testo;
  messageInput.placeholder = "Scrivi o parla…";
};
  
function correggiTesto(testo) {
  // Inizia con maiuscola
  testo = testo.charAt(0).toUpperCase() + testo.slice(1);

  // Aggiunge punto finale se manca
  if (!/[.!?]$/.test(testo)) {
    testo += ".";
  }

  return testo;
}

function correggiTesto(testo) {
  testo = testo.trim();

  // Maiuscola iniziale
  testo = testo.charAt(0).toUpperCase() + testo.slice(1);

  // Aggiunta virgole prima di connettivi (solo se presenti)
  const connettivi = ["poi", "allora", "però", "comunque", "quindi", "invece", "cioè", "ma", "o", "oppure"];
  connettivi.forEach(parola => {
    const regex = new RegExp("\\b" + parola + "\\b", "gi");
    testo = testo.replace(regex, ", " + parola);
  });

  // Punto finale se manca
  if (!/[.!?]$/.test(testo)) {
    testo += ".";
  }

  return testo;
}


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

  messageInput.placeholder = "Sto ascoltando…";
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const testoCorretto = correggiTesto(transcript);
    messageInput.value = testoCorretto;
    messageInput.placeholder = "Scrivi o parla…";
  };

  recognition.onerror = function(event) {
    messageInput.placeholder = "Scrivi o parla…";
    alert("Errore nella dettatura: " + event.error);
  };

  recognition.onend = function() {
    messageInput.placeholder = "Scrivi o parla…";
  };
}

// Attiva le schede cliccabili
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = '';

    if (tab.textContent === 'Marika') {
      chatArea.innerHTML = `
        <div class="message-bubble theirs">
          <p>Benvenuta Marika 🌷</p>
          <div class="separator-theirs"></div>
          <span class="timestamp">09:42</span>
        </div>
      `;
    } else if (tab.textContent === 'Clienti') {
      chatArea.innerHTML = `
        <div class="message-bubble theirs">
          <p>Qui troverai i dialoghi con i tuoi clienti 💼</p>
          <div class="separator-theirs"></div>
          <span class="timestamp">09:42</span>
        </div>
      `;
    }
  });
});
