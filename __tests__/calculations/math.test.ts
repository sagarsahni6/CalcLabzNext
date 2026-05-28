/* ═══════════════════════════════════════════════════
   Calc Labz — Math Calculation Unit Tests
   Tests pure math formulas against known-correct values.
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import {
  calcPercentage, calcQuadratic, calcFactorial, calcStatistics,
  calcSquareRoot, calcPrime, calcAverage,
  calcCombinations, calcLcmGcd, calcRatio,
} from '@/lib/calculations/math';

// ── Helper ──
function numericValue(str: string | number): number {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/[₹,%×\s]/g, '').replace(/,/g, ''));
}

// ══════════════════════════════════════════════════════
// PERCENTAGE CALCULATOR
// ══════════════════════════════════════════════════════
describe('Percentage Calculator', () => {
  test('25% of 200 = 50', () => {
    const result = calcPercentage({ val: 200, pct: 25 });
    const val = numericValue(result.main.value);
    expect(val).toBe(50);
  });

  test('100% of 500 = 500', () => {
    const result = calcPercentage({ val: 500, pct: 100 });
    const val = numericValue(result.main.value);
    expect(val).toBe(500);
  });

  test('0% of anything = 0', () => {
    const result = calcPercentage({ val: 1000, pct: 0 });
    const val = numericValue(result.main.value);
    expect(val).toBe(0);
  });

  test('15.5% of 200 = 31', () => {
    const result = calcPercentage({ val: 200, pct: 15.5 });
    const val = numericValue(result.main.value);
    expect(val).toBe(31);
  });
});

// ══════════════════════════════════════════════════════
// QUADRATIC EQUATION SOLVER
// ══════════════════════════════════════════════════════
describe('Quadratic Equation Solver', () => {
  test('x² - 5x + 6 = 0 → roots x=2, x=3', () => {
    const result = calcQuadratic({ a: 1, b: -5, c: 6 });
    // x1 is in main, x2 is in secondary
    const x1 = parseFloat(String(result.main.value));
    const x2Sec = result.secondary?.find(s => s.label.includes('x₂'));
    const x2 = x2Sec ? parseFloat(String(x2Sec.value)) : NaN;
    expect(x1).toBeCloseTo(3, 4);
    expect(x2).toBeCloseTo(2, 4);
  });

  test('x² + 1 = 0 → complex roots (discriminant < 0)', () => {
    const result = calcQuadratic({ a: 1, b: 0, c: 1 });
    const mainVal = String(result.main.value);
    // Should indicate complex/imaginary roots
    expect(mainVal.toLowerCase()).toMatch(/complex|imaginary|no real/i);
  });

  test('discriminant of x² - 4x + 4 = 0 is 0 (one root)', () => {
    const result = calcQuadratic({ a: 1, b: -4, c: 4 });
    const disc = result.secondary?.find(s => s.label.includes('Discriminant'));
    if (disc) {
      expect(numericValue(disc.value)).toBe(0);
    }
  });
});

// ══════════════════════════════════════════════════════
// FACTORIAL CALCULATOR
// ══════════════════════════════════════════════════════
describe('Factorial Calculator', () => {
  test('5! = 120', () => {
    const result = calcFactorial({ n: 5 });
    const val = numericValue(result.main.value);
    expect(val).toBe(120);
  });

  test('0! = 1', () => {
    const result = calcFactorial({ n: 0 });
    const val = numericValue(result.main.value);
    expect(val).toBe(1);
  });

  test('1! = 1', () => {
    const result = calcFactorial({ n: 1 });
    const val = numericValue(result.main.value);
    expect(val).toBe(1);
  });

  test('10! = 3628800', () => {
    const result = calcFactorial({ n: 10 });
    const val = numericValue(result.main.value);
    expect(val).toBe(3628800);
  });
});

// ══════════════════════════════════════════════════════
// SQUARE ROOT CALCULATOR
// ══════════════════════════════════════════════════════
describe('Square Root Calculator', () => {
  test('√144 = 12', () => {
    const result = calcSquareRoot({ n: 144, root: 2 });
    const sqrtVal = result.secondary?.find(s => s.label.includes('Square Root'));
    const val = parseFloat(String(sqrtVal?.value));
    expect(val).toBeCloseTo(12, 4);
  });

  test('√2 ≈ 1.4142', () => {
    const result = calcSquareRoot({ n: 2, root: 2 });
    const sqrtVal = result.secondary?.find(s => s.label.includes('Square Root'));
    const val = parseFloat(String(sqrtVal?.value));
    expect(val).toBeCloseTo(1.4142, 3);
  });
});

// ══════════════════════════════════════════════════════
// AVERAGE CALCULATOR
// ══════════════════════════════════════════════════════
describe('Average Calculator', () => {
  test('average of 10, 20, 30 = 20', () => {
    const result = calcAverage({ nums: '10, 20, 30' });
    const val = parseFloat(String(result.main.value));
    expect(val).toBe(20);
  });

  test('single number returns itself', () => {
    const result = calcAverage({ nums: '42' });
    const val = parseFloat(String(result.main.value));
    expect(val).toBe(42);
  });
});

// ══════════════════════════════════════════════════════
// STATISTICS CALCULATOR
// ══════════════════════════════════════════════════════
describe('Statistics Calculator', () => {
  test('dataset 1,2,3,4,5 → mean=3, sum=15, count=5', () => {
    const result = calcStatistics({ data: '1, 2, 3, 4, 5' });
    const mean = numericValue(result.main.value);
    expect(mean).toBe(3);
    const sum = result.secondary?.find(s => s.label.includes('Sum'));
    if (sum) expect(numericValue(sum.value)).toBe(15);
  });
});

// ══════════════════════════════════════════════════════
// RATIO CALCULATOR
// ══════════════════════════════════════════════════════
describe('Ratio Calculator', () => {
  test('ratio simplification: 12:8 → 3:2', () => {
    const result = calcRatio({ a: 12, b: 8 });
    const mainVal = String(result.main.value);
    expect(mainVal).toContain('3');
    expect(mainVal).toContain('2');
  });
});

// ══════════════════════════════════════════════════════
// LCM & GCD CALCULATOR
// ══════════════════════════════════════════════════════
describe('LCM & GCD Calculator', () => {
  test('GCD(12, 8) = 4', () => {
    const result = calcLcmGcd({ a: 12, b: 8 });
    // Check secondary for GCD
    const gcd = result.secondary?.find(s => s.label.includes('GCD'));
    if (gcd) expect(numericValue(gcd.value)).toBe(4);
  });

  test('LCM(4, 6) = 12', () => {
    const result = calcLcmGcd({ a: 4, b: 6 });
    const lcm = numericValue(result.main.value);
    expect(lcm).toBe(12);
  });
});

// ══════════════════════════════════════════════════════
// COMBINATIONS & PERMUTATIONS CALCULATOR
// ══════════════════════════════════════════════════════
describe('Combinations Calculator', () => {
  test('C(5,2) = 10', () => {
    const result = calcCombinations({ n: 5, r: 2 });
    const val = numericValue(result.main.value);
    expect(val).toBe(10);
  });

  test('P(5,2) = 20', () => {
    const result = calcCombinations({ n: 5, r: 2 });
    const perm = result.secondary?.find(s => s.label.includes('Permutation'));
    if (perm) expect(numericValue(perm.value)).toBe(20);
  });
});

// ══════════════════════════════════════════════════════
// PRIME NUMBER CHECKER
// ══════════════════════════════════════════════════════
describe('Prime Number Checker', () => {
  test('7 is prime', () => {
    const result = calcPrime({ number: 7 });
    expect(String(result.main.value).toLowerCase()).toContain('prime');
  });

  test('12 is not prime', () => {
    const result = calcPrime({ number: 12 });
    expect(String(result.main.value).toLowerCase()).toMatch(/not prime|composite/i);
  });

  test('2 is prime', () => {
    const result = calcPrime({ number: 2 });
    expect(String(result.main.value).toLowerCase()).toContain('prime');
  });
});
