import { processCommand } from './ai.js';

const messageInput = document.getElementById('messageInput');
const chatArea = document.getElementById('chat-area');
const sendButton = document.querySelector('.send-button');
let currentTab = 'marika';
const chatStorage = {
  marika: [],
  clienti: []
};

// INVIO MANUALE
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  // Bolla utente
  const userBubble = document.createElement('div');
  userBubble.className = 'message-bubble mine';

  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  userBubble.innerHTML = `
    <p>${text}</p>
    <div class="separator-mine"></div>
    <button class="edit-button">✏️</button>
    <button class="copy-button">📋</button>
    <span class="timestamp">${time}</span>
  `;

  chatStorage[currentTab].push(userBubble.outerHTML);
  messageInput.value = '';
  renderChat();
  
  // RISPOSTA DI ABIGAIL
  const result = processCommand(text);

  const botBubble = document.createElement('div');
  botBubble.className = 'message-bubble theirs';

  const botTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  botBubble.innerHTML = `
    <p>${result.output}</p>
    <div class="separator-theirs"></div>
    <span class="timestamp">${botTime}</span>
  `;

  chatStorage[currentTab].push(botBubble.outerHTML);
  renderChat();
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedTab = tab.getAttribute('data-tab');
      const chatArea = document.getElementById('chat-area');

      const introBubble = document.createElement('div');
      introBubble.className = 'message-bubble theirs';

      const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      if (selectedTab === 'marika') {
        introBubble.innerHTML = `
          <p>Benvenuta Marika 🌷</p>
          <div class="separator-theirs"></div>
          <span class="timestamp">${time}</span>
        `;
      } else if (selectedTab === 'clienti') {
        introBubble.innerHTML = `
          <p>Qui troverai i dialoghi con i tuoi clienti 💼</p>
          <div class="separator-theirs"></div>
          <span class="timestamp">${time}</span>
        `;
      }

      chatArea.appendChild(introBubble);
      chatArea.scrollTop = chatArea.scrollHeight;
    });
  });
});
