/**
 * Service Worker — 漢方外来サポート PWA v1
 * 戦略: HTML → ネットワーク優先（常に最新版を取得、オフライン時はキャッシュ）
 *       その他（data*.js・アイコン等） → キャッシュ優先（オフライン対応）
 */

const CACHE_NAME = 'kampo-support-v1';
const PRECACHE = [
  'index.html', 'manifest.json',
  'data1.js', 'data2.js', 'data3.js', 'data4.js',
  'icon-192.png', 'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isHTML = event.request.headers.get('accept')?.includes('text/html')
    || url.pathname === '/'
    || url.pathname.endsWith('/')
    || url.pathname.endsWith('.html');

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('index.html')))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
          }
          return response;
        }).catch(() => null);
        return cached || networkFetch;
      })
    );
  }
});
