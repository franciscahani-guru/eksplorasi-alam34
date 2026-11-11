const CACHE_NAME = 'eksplorasi-alam-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// Instalasikan Service Worker & Caching Aset
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('⚡ PWA Cache Berhasil Disimpan!');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ambil Aset dari Cache Saat Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});