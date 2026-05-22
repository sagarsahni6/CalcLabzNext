/* Calc Labz Service Worker — Production Hardened (v17)
   - HTML: Network-first with offline cache fallback
   - Assets (JS/CSS/images): Cache-first with background revalidation
   - Never cache error/non-ok responses
   - Offline fallback to cached index.html for navigation requests
*/
const CACHE = 'calclabz-v26';
const CACHE_VER = '26'; // Bump this on every deploy
const ASSETS = [
    './',
    'index.html',
    'calclabz-logo.png',
    'manifest.json',
    'assets/css/main.css?v=' + CACHE_VER,
    // Core stubs
    'assets/js/css-swap.js?v=' + CACHE_VER,
    'assets/js/calculators-core.js?v=' + CACHE_VER,
    'assets/js/blog-posts.js?v=' + CACHE_VER,
    'assets/js/blog-content-finance.js?v=' + CACHE_VER,
    'assets/js/blog-content-health.js?v=' + CACHE_VER,
    'assets/js/blog-content-education.js?v=' + CACHE_VER,
    'assets/js/blog-content-lifestyle.js?v=' + CACHE_VER,
    'assets/js/faq-data.js?v=' + CACHE_VER,
    'assets/js/formulas.js?v=' + CACHE_VER,
    'assets/js/consent.js?v=' + CACHE_VER,
    'assets/js/app.js?v=' + CACHE_VER,
    // Lazy-loaded category files (pre-cached for offline-first)
    'assets/js/calculators-finance.js?v=' + CACHE_VER,
    'assets/js/calculators-health.js?v=' + CACHE_VER,
    'assets/js/calculators-math.js?v=' + CACHE_VER,
    'assets/js/calculators-unit.js?v=' + CACHE_VER,
    'assets/js/calculators-everyday.js?v=' + CACHE_VER,
    'assets/js/calculators-datetime.js?v=' + CACHE_VER,
    'assets/js/calculators-engineering.js?v=' + CACHE_VER,
    'assets/js/calculators-science.js?v=' + CACHE_VER,
    'assets/js/calculators-construction.js?v=' + CACHE_VER,
    'assets/js/calculators-education.js?v=' + CACHE_VER
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(c => c.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    if (url.origin !== self.location.origin) return;

    // HTML navigation requests: Network-first
    // Ensures users always get fresh HTML after deploys
    const isNavigation = e.request.mode === 'navigate';
    const isHTML = (e.request.headers.get('accept') || '').includes('text/html');

    if (isNavigation || isHTML) {
        e.respondWith(
            fetch(e.request)
                .then(response => {
                    // Only cache successful HTML responses
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE).then(c => c.put(e.request, clone));
                    }
                    return response;
                })
                .catch(() =>
                    // Offline: try cache, then fall back to index.html
                    caches.match(e.request)
                        .then(cached => cached || caches.match('index.html'))
                )
        );
        return;
    }

    // Static assets (JS, CSS, images, fonts): Cache-first with background revalidation
    e.respondWith(
        caches.match(e.request).then(cached => {
            const fetchPromise = fetch(e.request).then(response => {
                // Only cache successful responses
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);
            return cached || fetchPromise;
        })
    );
});
