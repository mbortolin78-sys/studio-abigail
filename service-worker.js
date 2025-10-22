self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('studio-abigail-v1').then((cache) => {
      return cache.addAll(['/', '/index.html', '/style.css', '/manifest.json']);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== 'studio-abigail-v1' && caches.delete(key)))
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
