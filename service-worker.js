self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('lp-run-cache').then((cache) => {
      return cache.addAll([
        '/lprunlapcounter/',
        '/lprunlapcounter/index.html',
        '/lprunlapcounter/styles.css',
        '/lprunlapcounter/app.js',
        '/lprunlapcounter/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
