/* Bubble Dragons — Service Worker v10 (hard cache-bust)
 * Aggressively evicts any previous caches, takes control of already-open
 * pages, and force-navigates them so the new HTML is guaranteed to load
 * on the NEXT refresh — even if the user has an older SW stuck from v1..v9.
 */
const CACHE_NAME = 'bubble-dragons-v14';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './bgm.mp3',  // optional
];

self.addEventListener('install', (event) => {
  // Skip the "waiting" phase so the new SW activates right away
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((c) =>
      Promise.allSettled(ASSETS.map((a) => c.add(a).catch(() => null)))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Delete EVERY old cache
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    // Take control of pages currently open
    await self.clients.claim();
    // Force those pages to reload so they fetch the new HTML
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) {
      try {
        // Prefer navigate() — works in Chrome/Firefox/Edge
        if (client.navigate) await client.navigate(client.url);
        else client.postMessage({ type: 'FORCE_RELOAD' });
      } catch (_) {
        try { client.postMessage({ type: 'FORCE_RELOAD' }); } catch (__) {}
      }
    }
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isHTML = event.request.mode === 'navigate' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname.endsWith('/') ||
                 url.pathname.endsWith('/index.html');
  if (isHTML) {
    // NETWORK-FIRST for HTML so updates are always seen on next load
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
          return resp;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }
  // CACHE-FIRST for static assets (icons, audio)
  event.respondWith(
    caches.match(event.request).then((hit) => hit || fetch(event.request).then((resp) => {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
      }
      return resp;
    }).catch(() => hit))
  );
});

// Allow page to send SKIP_WAITING messages (useful if waiting SW persists)
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
