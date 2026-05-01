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

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // Si la ressource est dans le cache, on la renvoie
      if (res) {
        return res;
      }
      // Sinon, on essaie de la chercher sur le réseau
      return fetch(e.request).catch(() => {
        // Optionnel : renvoyer une page d'erreur personnalisée ici si vous voulez
        console.log("Ressource non trouvée et réseau absent.");
      });
    })
  );
});
