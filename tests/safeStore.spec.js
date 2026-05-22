const { test, expect } = require('@playwright/test');

test.describe('safeStore function', () => {
  test('should catch localStorage errors and log a warning', async ({ page }) => {
    const logs = [];
    page.on('console', msg => {
        logs.push({ type: msg.type(), text: msg.text() });
    });

    await page.goto('/');

    await page.waitForFunction(() => typeof safeStore === 'function');

    const result = await page.evaluate(() => {
      let errorThrown = false;

      // Override localStorage inside a closure
      const mockStorage = {
          setItem: () => { throw new Error('QuotaExceededError'); }
      };

      try {
        // Mock window.localStorage for the page to throw on setItem
        Object.defineProperty(window.localStorage, 'setItem', {
            value: () => { throw new Error('QuotaExceededError'); },
            configurable: true
        });

        safeStore('testKey', 'testValue');
      } catch (err) {
        errorThrown = true;
      }

      return { errorThrown };
    });

    expect(result.errorThrown).toBe(false);

    // wait for log propagation
    await page.waitForTimeout(100);

    const warnings = logs.filter(log => log.type === 'warning');
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[warnings.length - 1].text).toContain('Storage error for testKey Error: QuotaExceededError');
  });

  test('should successfully set item when no error occurs', async ({ page }) => {
    await page.goto('/');

    await page.waitForFunction(() => typeof safeStore === 'function');

    await page.evaluate(() => {
      safeStore('testKey2', 'testValue2');
    });

    const storedValue = await page.evaluate(() => {
      return localStorage.getItem('testKey2');
    });

    expect(storedValue).toBe('testValue2');
  });
});
