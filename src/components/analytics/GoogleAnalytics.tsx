'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = 'G-KBNL7BG63K';
const CONSENT_KEY = 'calclabz_consent';

/**
 * Fires a GA4 page_view event.
 * GA4's enhanced measurement detects History API changes automatically,
 * but this explicit call guarantees tracking for every Next.js route change,
 * including shallow navigations and search-param changes.
 */
function sendPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
}

/**
 * GoogleAnalytics component — tracks SPA page views on route changes.
 * Placed in the root layout; only fires if the user has accepted consent
 * (i.e. the gtag script has already been loaded by ConsentBanner).
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only send page views if consent was given and gtag is loaded
    try {
      if (localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
    } catch {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    sendPageView(url);
  }, [pathname, searchParams]);

  return null;
}
