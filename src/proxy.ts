/* ═══════════════════════════════════════════════════
   Calc Labz — Edge Proxy (Next.js 16)
   Runs at the CDN edge before every request.
   Handles: security headers for API, bot detection,
   rate limiting signals, and request logging.

   NOTE: Next.js 16 renamed middleware.ts → proxy.ts.
   The exported function must be named 'proxy'.
   ═══════════════════════════════════════════════════ */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ── API Route Hardening ──────────────────────────
  if (pathname.startsWith('/api/')) {
    // Prevent MIME-type sniffing on API responses
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // No caching for API responses
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');

    // Rate limit headers (informational — actual enforcement in route handler)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';
    response.headers.set('X-RateLimit-Policy', '5;w=60');
    response.headers.set('X-Request-IP', ip);

    // Block suspicious user agents on API routes
    const ua = request.headers.get('user-agent') || '';
    if (isBlockedBot(ua)) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Forbidden' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // ── Security Headers for All Routes ──────────────
  // Cross-Origin policies (defense-in-depth with next.config.ts headers)
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site');

  return response;
}

/**
 * Detect known malicious/scraper bots.
 * Does NOT block legitimate crawlers (Googlebot, Bingbot, etc.)
 */
function isBlockedBot(ua: string): boolean {
  const blocked = [
    /curl\//i,
    /python-requests/i,
    /Go-http-client/i,
    /java\//i,
    /libwww-perl/i,
    /wget/i,
    /scrapy/i,
    /PhantomJS/i,
  ];
  return blocked.some((pattern) => pattern.test(ua));
}

// Only run middleware on API routes and specific paths
// Exclude static assets and Next.js internals for performance
export const config = {
  matcher: [
    '/api/:path*',
    // Skip _next, static files, and favicon
    '/((?!_next/static|_next/image|favicon.ico|icon-|calclabz-logo|manifest.json|sw.js|robots.txt|sitemap.xml|og-image).*)',
  ],
};
