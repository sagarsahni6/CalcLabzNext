/* ═══════════════════════════════════════════════════
   Calc Labz — Validation Unit Tests
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import { validateField, validateAll, sanitizeNumericInput, clamp } from '@/lib/validation';

describe('validateField', () => {
  test('required field rejects empty string', () => {
    const err = validateField('Amount', '', { required: true });
    expect(err).toContain('required');
  });

  test('required field rejects undefined', () => {
    const err = validateField('Amount', undefined, { required: true });
    expect(err).toContain('required');
  });

  test('required field accepts valid number', () => {
    const err = validateField('Amount', 100, { required: true });
    expect(err).toBeNull();
  });

  test('min check rejects value below minimum', () => {
    const err = validateField('Loan Amount', 500, { min: 10000 });
    expect(err).toContain('at least');
  });

  test('max check rejects value above maximum', () => {
    const err = validateField('Rate', 60, { max: 50 });
    expect(err).toContain('at most');
  });

  test('positive type rejects zero', () => {
    const err = validateField('Amount', 0, { type: 'positive' });
    expect(err).toContain('greater than 0');
  });

  test('positive type rejects negative', () => {
    const err = validateField('Amount', -100, { type: 'positive' });
    expect(err).toContain('greater than 0');
  });

  test('non-negative type accepts zero', () => {
    const err = validateField('Amount', 0, { type: 'non-negative' });
    expect(err).toBeNull();
  });

  test('non-negative type rejects negative', () => {
    const err = validateField('Amount', -1, { type: 'non-negative' });
    expect(err).toContain('cannot be negative');
  });

  test('integer type rejects decimal', () => {
    const err = validateField('Tenure', 5.5, { type: 'integer' });
    expect(err).toContain('whole number');
  });

  test('integer type accepts whole number', () => {
    const err = validateField('Tenure', 12, { type: 'integer' });
    expect(err).toBeNull();
  });

  test('custom validation works', () => {
    const err = validateField('Rate', 101, {
      custom: (v) => Number(v) > 100 ? 'Rate cannot exceed 100%' : null,
    });
    expect(err).toContain('cannot exceed 100%');
  });

  test('non-required empty field passes', () => {
    const err = validateField('Optional', '', {});
    expect(err).toBeNull();
  });

  test('NaN string is rejected', () => {
    const err = validateField('Amount', 'abc', { required: true });
    expect(err).toContain('valid number');
  });

  test('valid string number passes', () => {
    const err = validateField('Amount', '123', { required: true, min: 0 });
    // parseFloat('123') = 123 which is valid
    expect(err).toBeNull();
  });
});

describe('validateAll', () => {
  test('validates multiple fields', () => {
    const errors = validateAll(
      { principal: 0, rate: 60, tenure: '' as unknown as number },
      {
        principal: { label: 'Loan Amount', rules: { required: true, type: 'positive' } },
        rate: { label: 'Interest Rate', rules: { required: true, max: 50 } },
        tenure: { label: 'Tenure', rules: { required: true } },
      }
    );
    expect(Object.keys(errors)).toHaveLength(3);
    expect(errors.principal).toContain('greater than 0');
    expect(errors.rate).toContain('at most');
    expect(errors.tenure).toContain('required');
  });

  test('returns empty object when all valid', () => {
    const errors = validateAll(
      { principal: 1000000, rate: 8.5, tenure: 240 },
      {
        principal: { label: 'Loan Amount', rules: { required: true, type: 'positive' } },
        rate: { label: 'Interest Rate', rules: { required: true, min: 0.1, max: 50 } },
        tenure: { label: 'Tenure', rules: { required: true, min: 1, max: 360 } },
      }
    );
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('sanitizeNumericInput', () => {
  test('strips non-numeric chars', () => {
    expect(sanitizeNumericInput('₹1,00,000')).toBe(100000);
  });

  test('handles negative numbers', () => {
    expect(sanitizeNumericInput('-500')).toBe(-500);
  });

  test('handles decimals', () => {
    expect(sanitizeNumericInput('8.75%')).toBe(8.75);
  });

  test('returns NaN for pure text', () => {
    expect(sanitizeNumericInput('abc')).toBeNaN();
  });
});

describe('clamp', () => {
  test('clamps below min', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  test('clamps above max', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  test('passes through in-range value', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});
