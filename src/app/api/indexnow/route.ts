/* ═══════════════════════════════════════════════════
   IndexNow API — Submit URLs to Bing/Yandex/Naver
   for instant crawling after deployments.

   POST /api/indexnow → submits all canonical URLs
   GET  /api/indexnow → returns URL list (dry run)

   Called automatically by Vercel deploy hook or
   manually via curl/browser.
   ═══════════════════════════════════════════════════ */

import { NextResponse } from 'next/server';
import { getCanonicalCalculatorSlugs } from '@/data/calculator-db';
import { CATEGORY_META } from '@/types/calculator';
import { BLOG_POSTS } from '@/data/blog-db';
import { SEO } from '@/lib/seo/constants';

const INDEXNOW_KEY = '07adc0ad574748edb23a270f890a49a2';
const HOST = 'calclabz.com';

/** Collect all canonical URLs that should be indexed */
function getAllCanonicalUrls(): string[] {
  const baseUrl = SEO.BASE_URL;
  const urls: string[] = [];

  // 1. Homepage
  urls.push(baseUrl);

  // 2. Static pages
  const staticPages = [
    '/blog', '/about', '/author/sagar-sahni', '/contact',
    '/privacy', '/terms', '/disclaimer', '/editorial-policy',
  ];
  staticPages.forEach((page) => urls.push(`${baseUrl}${page}`));

  // 3. Category pages
  Object.keys(CATEGORY_META).forEach((catKey) => {
    urls.push(`${baseUrl}/${catKey}-calculators`);
  });

  // 4. Calculator pages (canonical only — no redirect aliases)
  getCanonicalCalculatorSlugs().forEach((slug) => {
    urls.push(`${baseUrl}/${slug}`);
  });

  // 5. Blog posts
  BLOG_POSTS.forEach((post) => {
    urls.push(`${baseUrl}/blog/${post.slug}`);
  });

  return urls;
}

/** GET: Dry-run — returns the URL list without submitting */
export async function GET() {
  const urls = getAllCanonicalUrls();
  return NextResponse.json({
    totalUrls: urls.length,
    key: INDEXNOW_KEY,
    host: HOST,
    urls,
  });
}

/** POST: Submit all canonical URLs to IndexNow */
export async function POST() {
  const urls = getAllCanonicalUrls();

  // IndexNow API accepts max 10,000 URLs per request
  // We batch in chunks of 10,000 (unlikely to hit this with ~250 URLs)
  const BATCH_SIZE = 10_000;
  const results: { batch: number; status: number; ok: boolean }[] = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);

    try {
      const response = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      });

      results.push({
        batch: Math.floor(i / BATCH_SIZE) + 1,
        status: response.status,
        ok: response.ok || response.status === 202, // 202 = accepted
      });
    } catch (error) {
      results.push({
        batch: Math.floor(i / BATCH_SIZE) + 1,
        status: 0,
        ok: false,
      });
    }
  }

  const allOk = results.every((r) => r.ok);

  return NextResponse.json({
    success: allOk,
    totalUrls: urls.length,
    batches: results,
    message: allOk
      ? `Successfully submitted ${urls.length} URLs to IndexNow (Bing/Yandex/Naver).`
      : 'Some batches failed. Check batch details.',
  }, { status: allOk ? 200 : 207 });
}
