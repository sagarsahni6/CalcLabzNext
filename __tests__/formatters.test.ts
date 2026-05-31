/* ═══════════════════════════════════════════════════
   Calc Labz — Formatter Unit Tests
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import { formatINR, formatRupees, formatAgo, escHtml } from '@/lib/formatters';

describe('formatINR', () => {
  test('formats small numbers without commas', () => {
    expect(formatINR(0)).toBe('0');
    expect(formatINR(1)).toBe('1');
    expect(formatINR(999)).toBe('999');
  });

  test('formats thousands with Indian comma system', () => {
    expect(formatINR(1000)).toBe('1,000');
    expect(formatINR(10000)).toBe('10,000');
    expect(formatINR(100000)).toBe('1,00,000');
    expect(formatINR(1000000)).toBe('10,00,000');
    expect(formatINR(10000000)).toBe('1,00,00,000');
  });

  test('handles large numbers (crores)', () => {
    expect(formatINR(100000000)).toBe('10,00,00,000');
    expect(formatINR(1234567890)).toBe('1,23,45,67,890');
  });

  test('handles negative numbers', () => {
    expect(formatINR(-5000)).toBe('-5,000');
    expect(formatINR(-100000)).toBe('-1,00,000');
  });

  test('rounds decimals', () => {
    expect(formatINR(1234.56)).toBe('1,235');
    expect(formatINR(999.49)).toBe('999');
  });
});

describe('formatRupees', () => {
  test('prepends ₹ symbol', () => {
    expect(formatRupees(0)).toBe('₹0');
    expect(formatRupees(50000)).toBe('₹50,000');
    expect(formatRupees(100000)).toBe('₹1,00,000');
  });
});

describe('formatAgo', () => {
  test('shows "just now" for recent timestamps', () => {
    expect(formatAgo(Date.now() - 5000)).toBe('just now');
    expect(formatAgo(Date.now() - 30000)).toBe('just now');
  });

  test('shows minutes ago', () => {
    expect(formatAgo(Date.now() - 120000)).toBe('2m ago');
    expect(formatAgo(Date.now() - 3000000)).toBe('50m ago');
  });

  test('shows hours ago', () => {
    expect(formatAgo(Date.now() - 7200000)).toBe('2h ago');
  });

  test('shows days ago', () => {
    expect(formatAgo(Date.now() - 172800000)).toBe('2d ago');
  });
});

describe('escHtml', () => {
  test('escapes HTML special characters', () => {
    expect(escHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  test('escapes ampersands', () => {
    expect(escHtml('A & B')).toBe('A &amp; B');
  });

  test('handles empty string', () => {
    expect(escHtml('')).toBe('');
  });

  test('passes clean text through', () => {
    expect(escHtml('Hello World 123')).toBe('Hello World 123');
  });
});
