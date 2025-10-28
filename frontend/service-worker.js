// Lista dei file da mettere in cache
const CACHE_NAME = 'studio-abigail-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/chat.js',
  '/favicon-32.png',
  '/manifest.json',
  '/icon-180.png',
  // Aggiungi altri file statici se servono
];

// Installazione del Service Worker
self.addEventListener('install', event => {
  console.log('📦 Service Worker installato');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker attivato');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🧹 Rimuovo cache vecchia:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Intercetta richieste e serve dalla cache se offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Fallback offline (puoi personalizzarlo)
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
