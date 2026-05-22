const { test, expect } = require('@playwright/test');

test.describe('Consent Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the CalcLabzConsent object to be available on window
    await page.waitForFunction(() => window.CalcLabzConsent !== undefined);

    // Ensure clean state before each test
    await page.evaluate(() => {
      window.localStorage.removeItem('calclabz_consent');
    });
  });

  test('should return null when no consent is set', async ({ page }) => {
    const consent = await page.evaluate(() => window.CalcLabzConsent.get());
    expect(consent).toBeNull();
  });

  test('should set consent to accepted and return it', async ({ page }) => {
    // We can just use the exposed page.evaluate to set consent or call the methods internally,
    // but the issue mentioned "Testing this requires mocking localStorage, which is standard but slightly more complex than a pure function."
    // Let's test the public API methods or interact with the banner properly.
    // If the banner click is intercepted, we can force the click.
    await page.evaluate(() => window.CalcLabzConsent.showBanner());
    await page.locator('[data-consent="accept"]').first().click({ force: true });

    const consent = await page.evaluate(() => window.CalcLabzConsent.get());
    expect(consent).toBe('accepted');
  });

  test('should set consent to rejected and return it', async ({ page }) => {
    await page.evaluate(() => window.CalcLabzConsent.showBanner());
    await page.locator('[data-consent="reject"]').first().click({ force: true });

    const consent = await page.evaluate(() => window.CalcLabzConsent.get());
    expect(consent).toBe('rejected');
  });

  test('should revoke consent correctly', async ({ page }) => {
    // Accept consent
    await page.evaluate(() => {
      window.localStorage.setItem('calclabz_consent', 'accepted');
    });

    let consent = await page.evaluate(() => window.CalcLabzConsent.get());
    expect(consent).toBe('accepted');

    // Revoke
    await page.evaluate(() => window.CalcLabzConsent.revoke());

    consent = await page.evaluate(() => window.CalcLabzConsent.get());
    expect(consent).toBeNull();
  });

  test('should handle localStorage errors gracefully in getConsent', async ({ page }) => {
    const consent = await page.evaluate(() => {
      // Mock localStorage.getItem to throw
      const originalGet = window.localStorage.getItem;
      window.localStorage.getItem = () => { throw new Error('Simulated error'); };

      const result = window.CalcLabzConsent.get();

      // Restore
      window.localStorage.getItem = originalGet;
      return result;
    });

    expect(consent).toBeNull();
  });

  test('should handle localStorage errors gracefully when setting consent', async ({ page }) => {
    // Better way to test setConsent through the UI:
    await page.evaluate(() => {
      window.localStorage.setItem = () => { throw new Error('Quota Exceeded'); };
      window.CalcLabzConsent.showBanner();
    });

    // Click accept and ensure it doesn't throw a page error
    let pageError = null;
    page.on('pageerror', err => { pageError = err; });

    await page.locator('[data-consent="accept"]').first().click({ force: true });

    expect(pageError).toBeNull();
  });
});
