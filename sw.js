const cacheName = 'dland-v1';
const resourcesToCache = [
  'index.html',
  'tailwind.js',
  'qrcode.js',
  'logo.png',
  'manifest.json',
  'app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(resourcesToCache)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
