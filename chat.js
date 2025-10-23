let currentTab = 'marika';
const chatStorage = {
  marika: [],
  clienti: []
};

function renderChat() {
  chatArea.innerHTML = chatStorage[currentTab].join('');
  chatArea.scrollTop = chatArea.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const chatArea = document.getElementById('chat-area');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentTab = tab.getAttribute('data-tab') || tab.textContent.toLowerCase();

      if (chatStorage[currentTab].length === 0) {
        const time = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        const intro = currentTab === 'marika'
          ? `<p>Ciao Marika 🌷</p>`
          : `<p>Benvenuta nello spazio clienti. Qui troverai i dialoghi professionali 💼</p>`;

        const bubble = `
          <div class="message-bubble theirs">
            ${intro}
            <div class="separator-theirs"></div>
            <span class="timestamp">${time}</span>
          </div>
        `;

        chatStorage[currentTab].push(bubble);
      }

      renderChat();
    });
  });

  // Mostra la chat iniziale di Marika al primo avvio
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
