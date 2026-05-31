import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow routes that waste crawl budget:
        // - /api/ routes are not crawlable content
        // - /dashboard is user-specific, no SEO value
        // - /_next/ contains build assets, not content
        // - /sw.js is the service worker, not content
        disallow: ['/api/', '/dashboard', '/_next/', '/sw.js'],
      },
    ],
    sitemap: 'https://calclabz.com/sitemap.xml',
    host: 'https://calclabz.com',
  };
}
