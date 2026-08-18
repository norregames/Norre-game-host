const CACHE_NAME = 'norregames-ps4-host-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './assets/logo.png',
  './assets/background.jpg',
  './exploit/psfree.js',
  './exploit/kernel.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});