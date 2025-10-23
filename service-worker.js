const CACHE_NAME = 'abigail-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/chat.js',
  '/manifest.json'
];

// Installazione: salva i file nella cache
self.addEventListener('install', event => {
  self.skipWaiting(); // attiva subito
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Attivazione: prende il controllo della pagina
self.addEventListener('activate', event => {
  self.clients.claim();
});

// Intercetta richieste e serve dalla cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
