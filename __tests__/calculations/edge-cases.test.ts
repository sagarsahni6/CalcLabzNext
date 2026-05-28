/* ═══════════════════════════════════════════════════
   Calc Labz — Edge Case & Robustness Unit Tests
   Tests edge case behaviors, zero inputs, negative inputs,
   and division-by-zero protection.
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import { calcFuel, calcTip, calcUnitPrice } from '@/lib/calculations/everyday';
import { calcIdealWeight, calcSmokingCost, calcBMI } from '@/lib/calculations/health';
import { calcPercentage, calcQuadratic, calcAverage } from '@/lib/calculations/math';

// Helper
function numericValue(str: string | number): number {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/[₹,%×\s]/g, '').replace(/,/g, ''));
}

describe('Division by Zero Protection', () => {
  test('Fuel Calculator: 0 efficiency fallback', () => {
    const res = calcFuel({ distance: 150, efficiency: 0, price: 100 });
    const cost = numericValue(res.main.value);
    expect(isFinite(cost)).toBe(true);
    expect(cost).toBe(15000); // 150 / 1 * 100
  });

  test('Tip Calculator: 0 people fallback', () => {
    const res = calcTip({ bill: 500, tip: 10, people: 0 });
    const perPerson = numericValue(res.main.value);
    expect(isFinite(perPerson)).toBe(true);
    expect(perPerson).toBe(550); // 550 / 1 (fallback)
  });

  test('Unit Price: 0 quantity fallback', () => {
    const res = calcUnitPrice({ price1: 100, qty1: 0, price2: 120, qty2: 0 });
    expect(res.main.value).toBe('Item A'); // Item A per unit is 100/1 = 100, Item B is 120/1 = 120. Item A is better value.
    const unitA = res.secondary?.find(s => s.label.includes('Item A'));
    expect(isFinite(numericValue(unitA!.value))).toBe(true);
  });
});

describe('Negative Value Handling', () => {
  test('BMI Calculator with negative height/weight', () => {
    const res = calcBMI({ height: -170, weight: -70 });
    const bmiVal = numericValue(res.main.value);
    expect(bmiVal).toBe(-24.2); // weight / (height/100)^2 = -70 / (-1.7)^2 = -70 / 2.89 = -24.22
  });

  test('Ideal Weight with negative height', () => {
    const res = calcIdealWeight({ height: -160, gender: 'Male' });
    const weight = numericValue(res.main.value);
    expect(isFinite(weight)).toBe(true);
    expect(weight).toBeLessThan(0); // height under 152.4 cm results in negative value in Hamwi formula
  });

  test('Percentage with negative numbers', () => {
    const res = calcPercentage({ val: -200, pct: -10 });
    const val = numericValue(res.main.value);
    expect(val).toBe(20); // -10% of -200 is 20
  });
});

describe('Missing/Malformed Inputs', () => {
  test('Empty string values handle cleanly', () => {
    const res = calcBMI({ height: '', weight: '' });
    expect(numericValue(res.main.value)).toBeGreaterThanOrEqual(0);
  });

  test('Non-numeric gibberish string values handle cleanly', () => {
    const res = calcAverage({ nums: 'abc, def, ghi' });
    expect(res.main.value).toBeDefined();
  });

  test('Smoking Cost with 0 years smoked', () => {
    const res = calcSmokingCost({ cigsPerDay: 10, packPrice: 200, yearsSmoked: 0 });
    const invested = res.secondary?.find(s => s.label.includes('invested'));
    expect(numericValue(invested!.value)).toBe(0);
  });
});

describe('Extreme Large Values (Overflow Checks)', () => {
  test('Percentage with extremely large values', () => {
    const res = calcPercentage({ val: 1e12, pct: 50 });
    expect(numericValue(res.main.value)).toBe(5e11);
  });

  test('Average of massive numbers', () => {
    const res = calcAverage({ nums: '1000000000000, 2000000000000' });
    expect(numericValue(res.main.value)).toBe(1500000000000);
  });
});
