// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('findCalcBySlug function', () => {
  test('should return null for unknown slugs', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(() => {
      // @ts-ignore
      return typeof findCalcBySlug === 'function' ? findCalcBySlug('unknown-slug-xyz') : 'missing';
    });
    expect(result).toBeNull();
  });

  test('should return correct calc ID for valid slug', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(() => {
      // @ts-ignore
      return typeof findCalcBySlug === 'function' ? findCalcBySlug('emi-calculator') : 'missing';
    });
    expect(result).toBe('emi');
  });

  test('should handle new canonical hyphenated slugs', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(() => {
      // @ts-ignore
      return typeof findCalcBySlug === 'function' ? findCalcBySlug('car-loan-calculator') : 'missing';
    });
    expect(result).toBe('carloan');
  });

  test('should handle legacy camelCase old slugs as redirects', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(() => {
      // @ts-ignore
      return typeof findCalcBySlug === 'function' ? findCalcBySlug('waisthip-calculator') : 'missing';
    });
    expect(result).toBe('waisthip');
  });
});
