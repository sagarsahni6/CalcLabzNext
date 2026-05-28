/* ═══════════════════════════════════════════════════
   Calc Labz — Everyday Calculation Unit Tests
   Tests pure everyday formulas against known-correct values.
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import {
  calcTip,
  calcDiscount,
  calcFuel,
  calcSalary,
  calcElectricBill,
  calcCaloriesFood,
  calcUnitPrice,
  calcTypingSpeed,
} from '@/lib/calculations/everyday';

// Helper to extract numeric values from strings like "₹550.00"
function numericValue(str: string | number): number {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/[₹,%×\s]/g, '').replace(/,/g, ''));
}

describe('Tip Calculator', () => {
  test('bill of 1000 with 10% tip for 2 people = 550 per person', () => {
    const result = calcTip({ bill: 1000, tip: 10, people: 2 });
    const val = numericValue(result.main.value);
    expect(val).toBe(550);
    
    const tipAmt = result.secondary?.find(s => s.label.includes('Tip Amount'));
    expect(numericValue(tipAmt!.value)).toBe(100);
  });

  test('default inputs (zeroes/fallbacks)', () => {
    const result = calcTip({});
    const val = numericValue(result.main.value);
    expect(val).toBe(0);
  });
});

describe('Discount Calculator', () => {
  test('original 500 with 20% discount = 400', () => {
    const result = calcDiscount({ original: 500, discount: 20 });
    const val = numericValue(result.main.value);
    expect(val).toBe(400);

    const saved = result.secondary?.find(s => s.label.includes('You Save'));
    expect(numericValue(saved!.value)).toBe(100);
  });

  test('100% discount reduces price to 0', () => {
    const result = calcDiscount({ original: 250, discount: 100 });
    const val = numericValue(result.main.value);
    expect(val).toBe(0);
  });
});

describe('Fuel Calculator', () => {
  test('distance 150, efficiency 15, price 100 = 1000 cost', () => {
    const result = calcFuel({ distance: 150, efficiency: 15, price: 100 });
    const val = numericValue(result.main.value);
    expect(val).toBe(1000);

    const litres = result.secondary?.find(s => s.label.includes('Fuel Required'));
    expect(parseFloat(String(litres!.value))).toBe(10);
  });

  test('efficiency of 0 does not divide by zero', () => {
    // Falls back to efficiency = 1 or prevents infinity
    const result = calcFuel({ distance: 100, efficiency: 0, price: 10 });
    const val = numericValue(result.main.value);
    // distance / 1 (efficiency fallback is 1) * price = 1000
    expect(val).toBe(1000);
  });
});

describe('Salary Calculator', () => {
  test('CTC 1200000 with 100000 PF and 100000 tax = 83333 in-hand', () => {
    const result = calcSalary({ ctc: 1200000, pf: 100000, tax: 100000 });
    const val = numericValue(result.main.value);
    expect(val).toBe(83333);
  });
});

describe('Electricity Bill Calculator', () => {
  test('1000W for 8 hours at ₹5 rate = ₹120 monthly cost', () => {
    const result = calcElectricBill({ watts: 1000, hours: 8, rate: 5 });
    const val = numericValue(result.main.value);
    expect(val).toBe(1200);

    const consumption = result.secondary?.find(s => s.label.includes('Daily Consumption'));
    expect(parseFloat(String(consumption!.value))).toBe(8);
  });
});

describe('Calories Food Calculator', () => {
  test('20g protein, 30g carbs, 10g fat = 290 kcal', () => {
    const result = calcCaloriesFood({ protein: 20, carbs: 30, fat: 10, fiber: 5 });
    const val = numericValue(result.main.value);
    expect(val).toBe(290);

    const netCarbs = result.secondary?.find(s => s.label.includes('Net Carbs'));
    expect(parseFloat(String(netCarbs!.value))).toBe(25);
  });
});

describe('Unit Price Comparison', () => {
  test('Item A (100 for 2) vs Item B (120 for 3) → Item B is better value', () => {
    const result = calcUnitPrice({ price1: 100, qty1: 2, price2: 120, qty2: 3 });
    expect(result.main.value).toBe('Item B');

    const saving = result.secondary?.find(s => s.label.includes('Saving per unit'));
    expect(numericValue(saving!.value)).toBeCloseTo(10, 4); // 50 vs 40 per unit
  });
});

describe('Typing & Reading Speed', () => {
  test('500 words at 250 wpm = 2m reading time', () => {
    const result = calcTypingSpeed({ words: 500, wpm: 250, typingWpm: 50 });
    expect(result.main.value).toBe('2m 0s');

    const typingTime = result.secondary?.find(s => s.label.includes('Typing Time'));
    expect(typingTime!.value).toBe('10m 0s');
  });
});
