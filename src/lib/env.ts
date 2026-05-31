/* ═══════════════════════════════════════════════════
   Calc Labz — Centralized Environment Configuration
   Type-safe access to all environment variables with
   validation and fallback defaults.
   ═══════════════════════════════════════════════════ */

/**
 * Server-side environment variables.
 * These are only accessible in Server Components, API routes, and middleware.
 * NEVER import this in client components.
 */
export const serverEnv = {
  /** Web3Forms API key for the contact form */
  WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY || '',

  /** Node environment */
  NODE_ENV: process.env.NODE_ENV || 'development',

  /** Vercel deployment URL (auto-set by Vercel) */
  VERCEL_URL: process.env.VERCEL_URL || '',

  /** Sentry DSN for error reporting (optional) */
  SENTRY_DSN: process.env.SENTRY_DSN || '',
} as const;

/**
 * Client-side environment variables.
 * Must be prefixed with NEXT_PUBLIC_ to be exposed to the browser.
 */
export const clientEnv = {
  /** Google Analytics measurement ID */
  GA_ID: process.env.NEXT_PUBLIC_GA_ID || 'G-KBNL7BG63K',

  /** Google AdSense publisher ID */
  ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-3010631666598300',

  /** Base URL for canonical links and OG tags */
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://calclabz.com',
} as const;

/**
 * Validate that required server-side env vars are set.
 * Call this in API routes that depend on specific vars.
 */
export function requireEnv(key: keyof typeof serverEnv): string {
  const value = serverEnv[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Set it in .env.local or your deployment environment.`
    );
  }
  return value;
}

/**
 * Check if we're in production.
 */
export function isProduction(): boolean {
  return serverEnv.NODE_ENV === 'production';
}
