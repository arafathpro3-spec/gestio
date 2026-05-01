const nom_du_cache = 'dland-v1';
const ressources_a_mettre_en_cache = [
  'index.html',
  'tailwind.js',
  'qrcode.js',
  'manifest.json',
  'app.js'
];

// Installation du Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(nom_du_cache).then((cache) => {
      return cache.addAll(ressources_a_mettre_en_cache);
    }).catch(err => console.log("Erreur de mise en cache :", err))
  );
});

// Stratégie : Cache First, then Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
