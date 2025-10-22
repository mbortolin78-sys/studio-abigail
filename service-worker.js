self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('studio-abigail-cache').then((cache) => {
      return cache.addAll(['/', '/index.html', '/style.css', '/chat.js', '/ai.js']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
