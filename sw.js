// ─── Service Worker v3 ───────────────────────────────────────────────────────
// ورژن رو هر بار که index.html رو عوض میکنی +1 کن
const CACHE_NAME = ‘kriya-v3’;
const ASSETS = [’./’, ‘./index.html’, ‘./manifest.json’];

self.addEventListener(‘install’, e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
self.skipWaiting(); // فوری فعال شو
});

self.addEventListener(‘activate’, e => {
// حذف cache های قدیمی
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim(); // همه تب‌های باز رو کنترل کن
});

self.addEventListener(‘fetch’, e => {
e.respondWith(
caches.match(e.request).then(cached => cached || fetch(e.request))
);
});
