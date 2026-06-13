/* ═══════════════════════════════════════════════════
   Google Sitemap Ping + Full Reindex Trigger

   POST /api/reindex → Pings Google sitemap + submits
   all URLs to IndexNow in one call. Designed to be
   called by Vercel's deploy webhook.

   GET  /api/reindex → Returns status info.
   ═══════════════════════════════════════════════════ */

import { NextResponse } from 'next/server';

const GOOGLE_PING_URL = 'https://www.google.com/ping?sitemap=https://calclabz.com/sitemap.xml';
const INDEXNOW_ENDPOINT = 'https://calclabz.com/api/indexnow';

export async function GET() {
  return NextResponse.json({
    description: 'POST to this endpoint to ping Google sitemap and trigger IndexNow submission.',
    googlePingUrl: GOOGLE_PING_URL,
    indexNowEndpoint: INDEXNOW_ENDPOINT,
  });
}

export async function POST() {
  const results: Record<string, unknown> = {};

  // 1. Ping Google to re-fetch the sitemap
  try {
    const googleRes = await fetch(GOOGLE_PING_URL);
    results.google = {
      status: googleRes.status,
      ok: googleRes.ok,
      message: googleRes.ok
        ? 'Google sitemap ping successful — Google will re-crawl sitemap.xml shortly.'
        : `Google ping returned ${googleRes.status}.`,
    };
  } catch (error) {
    results.google = {
      status: 0,
      ok: false,
      message: 'Failed to reach Google ping endpoint.',
    };
  }

  // 2. Ping Bing sitemap submission
  try {
    const bingPingUrl = 'https://www.bing.com/ping?sitemap=https://calclabz.com/sitemap.xml';
    const bingRes = await fetch(bingPingUrl);
    results.bing = {
      status: bingRes.status,
      ok: bingRes.ok,
      message: bingRes.ok
        ? 'Bing sitemap ping successful.'
        : `Bing ping returned ${bingRes.status}.`,
    };
  } catch {
    results.bing = {
      status: 0,
      ok: false,
      message: 'Failed to reach Bing ping endpoint.',
    };
  }

  // 3. Trigger IndexNow submission for all URLs
  try {
    const indexNowRes = await fetch(INDEXNOW_ENDPOINT, { method: 'POST' });
    const indexNowData = await indexNowRes.json();
    results.indexNow = {
      status: indexNowRes.status,
      ok: indexNowRes.ok,
      ...indexNowData,
    };
  } catch {
    results.indexNow = {
      status: 0,
      ok: false,
      message: 'Failed to trigger IndexNow submission.',
    };
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    results,
  });
}
