// Thread offline support. Change VERSION whenever the app files change,
// so phones pick up the new version the next time Thread opens.
const VERSION = 'thread-v6';
const FONTS = 'thread-fonts';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.svg',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App files: answer from the cache straight away (works offline), refresh it in the background.
  if (url.origin === self.location.origin) {
    const network = fetch(req).then(async res => {
      if (res && res.ok) { const cache = await caches.open(VERSION); await cache.put(req, res.clone()); }
      return res;
    }).catch(() => null);
    event.waitUntil(network.then(() => {}));
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const hit = (await cache.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
      return hit || (await network) || new Response('Thread is offline and this file isn’t saved yet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })());
    return;
  }

  // Fonts: keep a copy the first time they load so Thread looks the same offline.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const cache = await caches.open(FONTS);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    })());
  }
});
