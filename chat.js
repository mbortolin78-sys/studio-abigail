document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const chatArea = document.getElementById('chat-area');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Cambia stile attivo
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Cancella i messaggi precedenti
      chatArea.innerHTML = '';

      // Inserisci contenuto in base alla scheda
      if (tab.textContent === 'Marika') {
        chatArea.innerHTML = `
          <div class="message-bubble mine">
            <p>Ciao Marika 🌷</p>
            <div class="separator-mine"></div>
            <button class="edit-button">✏️</button>
            <button class="copy-button">📋</button>
            <span class="timestamp">10:35</span>
          </div>
        `;
      } else if (tab.textContent === 'Clienti') {
        chatArea.innerHTML = `
          <div class="message-bubble theirs">
            <p>Benvenuta nello spazio clienti. Qui troverai i dialoghi professionali 💼</p>
            <div class="separator-theirs"></div>
            <span class="timestamp">09:42</span>
            <button class="copy-button">📋</button>
          </div>
        `;
      }
    });
  });
});
