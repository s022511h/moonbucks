const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css',
  '/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;  // return cached response
        }
        return fetch(event.request);  // fetch from network
      })
  );
});
