/* ═══════════════════════════════════════════════════
   Calc Labz Service Worker — Next.js Compatible (v2)

   Strategy:
   - Navigation (HTML): Network-first with offline fallback
   - Next.js static assets (/_next/static/): Cache-first (immutable)
   - Public assets (images, fonts): Stale-while-revalidate
   - API routes: Network-only (never cache)
   - Bypasses: localhost, hot-update, webpack HMR

   Cache naming: calclabz-runtime-v1 (bump on breaking changes)
   ═══════════════════════════════════════════════════ */

const RUNTIME_CACHE = 'calclabz-runtime-v1';
const STATIC_CACHE = 'calclabz-static-v1';
const OFFLINE_URL = '/';

// ── INSTALL ────────────────────────────────────────
// Pre-cache only the offline fallback page
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(RUNTIME_CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ───────────────────────────────────────
// Clean up old caches from previous versions
self.addEventListener('activate', (e) => {
  const KEEP = new Set([RUNTIME_CACHE, STATIC_CACHE]);
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !KEEP.has(k)).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ──────────────────────────────────────────
self.addEventListener('fetch', (e) => {
  const { request } = e;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip development environment
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return;

  // Skip HMR and webpack dev assets
  if (url.pathname.includes('hot-update') || url.pathname.includes('__webpack')) return;

  // Skip API routes — always fetch fresh
  if (url.pathname.startsWith('/api/')) return;

  // ── Next.js immutable static assets ──────────────
  // /_next/static/ files have content hashes — safe to cache forever
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // ── Navigation requests (HTML pages) ─────────────
  // Network-first: always try to get fresh HTML,
  // fall back to cache for offline support
  const isNavigation = request.mode === 'navigate';
  const isHTML = (request.headers.get('accept') || '').includes('text/html');

  if (isNavigation || isHTML) {
    e.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // ── Static public assets (images, icons, manifest) ─
  // Stale-while-revalidate: serve from cache instantly,
  // update cache in background
  if (/\.(png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf|json)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          }
          return response;
        }).catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // ── Everything else: network-first ───────────────
  e.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
