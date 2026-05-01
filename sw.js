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
    caches.match(e.request).then((response) => {
      // 1. Si le fichier est dans le cache, on le renvoie
      if (response) {
        return response;
      }

      // 2. Sinon, on tente de le chercher sur le réseau
      return fetch(e.request).catch(() => {
        console.log("Ressource non trouvée et réseau absent : " + e.request.url);
        
        // 3. Si c'est une navigation (page html), on peut renvoyer index.html par défaut
        if (e.request.mode === 'navigate') {
          return caches.match('index.html');
        }
        
        // 4. Pour le reste, on renvoie une réponse vide pour éviter le crash TypeError
        return new Response('Hors ligne et ressource non cachée', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      });
    })
  );
});
