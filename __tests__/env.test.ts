/* ═══════════════════════════════════════════════════
   Calc Labz — Environment Config Tests
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import { serverEnv, clientEnv, requireEnv, isProduction } from '@/lib/env';

describe('serverEnv', () => {
  test('has NODE_ENV defined', () => {
    expect(serverEnv.NODE_ENV).toBeDefined();
    expect(typeof serverEnv.NODE_ENV).toBe('string');
  });

  test('has WEB3FORMS_ACCESS_KEY field', () => {
    expect('WEB3FORMS_ACCESS_KEY' in serverEnv).toBe(true);
  });
});

describe('clientEnv', () => {
  test('has BASE_URL with valid URL format', () => {
    expect(clientEnv.BASE_URL).toMatch(/^https?:\/\//);
  });

  test('has GA_ID with valid format', () => {
    expect(clientEnv.GA_ID).toMatch(/^G-/);
  });

  test('has ADSENSE_ID with valid format', () => {
    expect(clientEnv.ADSENSE_ID).toMatch(/^ca-pub-/);
  });
});

describe('requireEnv', () => {
  test('throws for missing required env var', () => {
    // SENTRY_DSN is optional and likely empty in test
    expect(() => requireEnv('SENTRY_DSN')).toThrow('Missing required environment variable');
  });
});

describe('isProduction', () => {
  test('returns false in test environment', () => {
    expect(isProduction()).toBe(false);
  });
});
