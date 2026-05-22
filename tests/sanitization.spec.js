const { test, expect } = require('@playwright/test');

test.describe('sanitizeHTML function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ensure the function is available
    await page.waitForFunction(() => typeof sanitizeHTML === 'function');
  });

  test('should return empty string for non-string inputs', async ({ page }) => {
    const results = await page.evaluate(() => {
      return {
        nullVal: sanitizeHTML(null),
        undefinedVal: sanitizeHTML(undefined),
        numberVal: sanitizeHTML(123),
        objectVal: sanitizeHTML({})
      };
    });
    expect(results.nullVal).toBe('');
    expect(results.undefinedVal).toBe('');
    expect(results.numberVal).toBe('');
    expect(results.objectVal).toBe('');
  });

  test('should allow safe HTML', async ({ page }) => {
    const input = '<p>Hello <strong>World</strong>!</p>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe(input);
  });

  test('should strip dangerous tags', async ({ page }) => {
    const input = '<div>Safe</div><script>alert("xss")</script><style>body{color:red}</style><iframe></iframe>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe('<div>Safe</div>');
  });

  test('should strip event handler attributes', async ({ page }) => {
    const input = '<span onclick="alert(\'xss\')" onmouseover="console.log(\'hover\')">Click me</span>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe('<span>Click me</span>');
  });

  test('should strip javascript: hrefs', async ({ page }) => {
    const input = '<a href="javascript:alert(\'xss\')">Click me</a><a href="https://google.com">Google</a>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toContain('<a>Click me</a>');
    expect(result).toContain('<a href="https://google.com">Google</a>');
  });

  test('should be case-insensitive for javascript: URIs', async ({ page }) => {
    const input = '<a href="JAVAscript:alert(\'xss\')">Click me</a>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe('<a>Click me</a>');
  });

  test('should handle whitespace in javascript: URIs', async ({ page }) => {
    const input = '<a href="  javascript:alert(\'xss\')">Click me</a>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe('<a>Click me</a>');
  });

  test('should strip dangerous attributes in src and action', async ({ page }) => {
    const input = '<img src="javascript:alert(1)"><form action="javascript:alert(2)"></form>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    // form is in dangerous tags list, so it should be removed.
    // img src=javascript should have src removed.
    expect(result).not.toContain('form');
    expect(result).not.toContain('src');
  });

  test('should handle empty string', async ({ page }) => {
    const result = await page.evaluate(() => sanitizeHTML(''));
    expect(result).toBe('');
  });

  test('should handle malformed HTML', async ({ page }) => {
    const input = '<div class="test">Unclosed div';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toContain('<div class="test">Unclosed div</div>');
  });

  test('should handle nested dangerous elements', async ({ page }) => {
    const input = '<div><p><script>alert(1)</script></p></div>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    expect(result).toBe('<div><p></p></div>');
  });

  test('should sanitize body tag attributes', async ({ page }) => {
    const input = '<body onload="alert(1)">Hello</body>';
    const result = await page.evaluate((html) => sanitizeHTML(html), input);
    // sanitizeHTML returns doc.body.innerHTML, so it won't include the <body> tags themselves
    // but the attributes on body should be stripped before innerHTML is taken.
    expect(result).toBe('Hello');
  });
});
