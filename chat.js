import { processCommand } from './ai.js';

const messageInput = document.getElementById('messageInput');
const chatArea = document.getElementById('chat-area');
const sendButton = document.querySelector('.send-button');

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

  chatArea.appendChild(userBubble);
  chatArea.scrollTop = chatArea.scrollHeight;
  messageInput.value = '';

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

  chatArea.appendChild(botBubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}
