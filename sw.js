// TVRD Service Worker — macht die App ohne Netz lauffähig.
//
// Strategie:
//  - Seiten-Navigation (index.html): network-first mit Cache-Fallback.
//    Online bekommst du also immer die frische Version (damit "push = live"
//    sofort durchschlägt), offline die zuletzt gecachte.
//  - Übrige gleiche-Origin-Assets: cache-first. Fonts sind ins HTML eingebettet,
//    es gibt also praktisch nur diese wenigen Dateien.
//
// Bei einem Deploy, der die vorgecachten Dateien ändert (z.B. das Icon),
// CACHE hochzählen (tvrd-v2, ...). Für reine index.html-Änderungen nicht nötig.

const CACHE = 'tvrd-v1';
const PRECACHE = ['./', './index.html', './manifest.json', './icon.svg',
  './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return; // Fremd-Origins normal lassen

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached)
    )
  );
});
