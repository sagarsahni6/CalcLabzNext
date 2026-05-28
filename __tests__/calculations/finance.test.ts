/* ═══════════════════════════════════════════════════
   Calc Labz — Finance Calculation Unit Tests
   Tests core financial formulas against known-correct values.
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import {
  calcEMI, calcSIP, calcGST, calcPreGST, calcCompoundInterest, calcSimpleInterest,
  calcIncomeTax, calcFD, calcPPF, calcTaxRegime, calcHRA, calcCAGR, calcROI,
  calcGratuity, calcBreakeven, calcInflation, calcMortgage, calcCarLoan,
} from '@/lib/calculations/finance';

// ── Helper: extract numeric value from result string ──
function numericValue(str: string | number): number {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/[₹,%×\s]/g, '').replace(/,/g, ''));
}

// ══════════════════════════════════════════════════════
// EMI CALCULATOR
// ══════════════════════════════════════════════════════
describe('EMI Calculator', () => {
  test('standard home loan: ₹10L at 8.5% for 20 years (240 months)', () => {
    const result = calcEMI({ principal: 1000000, rate: 8.5, tenure: 240 });
    const emi = numericValue(result.main.value);
    // Known EMI: ₹8,678 (standard reducing balance formula)
    expect(emi).toBeGreaterThanOrEqual(8670);
    expect(emi).toBeLessThanOrEqual(8690);
  });

  test('short-term loan: ₹5L at 10% for 12 months', () => {
    const result = calcEMI({ principal: 500000, rate: 10, tenure: 12 });
    const emi = numericValue(result.main.value);
    // Known EMI: ₹43,957
    expect(emi).toBeGreaterThanOrEqual(43950);
    expect(emi).toBeLessThanOrEqual(43970);
  });

  test('zero interest rate returns simple division', () => {
    const result = calcEMI({ principal: 1200000, rate: 0, tenure: 12 });
    const emi = numericValue(result.main.value);
    expect(emi).toBe(100000);
  });

  test('result contains all expected secondary fields', () => {
    const result = calcEMI({ principal: 1000000, rate: 8.5, tenure: 240 });
    expect(result.secondary).toBeDefined();
    expect(result.secondary!.length).toBeGreaterThanOrEqual(3);
    const labels = result.secondary!.map(s => s.label);
    expect(labels).toContain('Total Interest');
    expect(labels).toContain('Total Payment');
  });

  test('total payment = principal + total interest', () => {
    const result = calcEMI({ principal: 1000000, rate: 8.5, tenure: 60 });
    const totalInterest = numericValue(result.secondary![0].value);
    const totalPayment = numericValue(result.secondary![1].value);
    expect(Math.abs(totalPayment - 1000000 - totalInterest)).toBeLessThan(2);
  });

  test('has chart data with timeline', () => {
    const result = calcEMI({ principal: 1000000, rate: 8.5, tenure: 60 });
    expect(result.chart).toBeDefined();
    expect(result.chart!.a).toBeDefined();
    expect(result.chart!.b).toBeDefined();
    expect(result.chart!.timeline).toBeDefined();
    expect(result.chart!.timeline!.labels.length).toBeGreaterThan(0);
  });
});

// ══════════════════════════════════════════════════════
// SIP CALCULATOR
// ══════════════════════════════════════════════════════
describe('SIP Calculator', () => {
  test('₹5,000/month at 12% for 15 years', () => {
    const result = calcSIP({ monthly: 5000, return: 12, years: 15 });
    const fv = numericValue(result.main.value);
    // Known FV with monthly compounding ≈ ₹25,22,880
    expect(fv).toBeGreaterThanOrEqual(2500000);
    expect(fv).toBeLessThanOrEqual(2550000);
  });

  test('₹10,000/month at 0% for 10 years = ₹12,00,000', () => {
    const result = calcSIP({ monthly: 10000, return: 0, years: 10 });
    const fv = numericValue(result.main.value);
    expect(fv).toBe(1200000);
  });

  test('invested amount is monthly × months', () => {
    const result = calcSIP({ monthly: 5000, return: 12, years: 10 });
    const invested = numericValue(result.secondary![0].value);
    expect(invested).toBe(5000 * 10 * 12);
  });

  test('returns are positive when rate > 0', () => {
    const result = calcSIP({ monthly: 5000, return: 12, years: 10 });
    const returns = numericValue(result.secondary![1].value);
    expect(returns).toBeGreaterThan(0);
  });
});

// ══════════════════════════════════════════════════════
// GST CALCULATOR
// ══════════════════════════════════════════════════════
describe('GST Calculator', () => {
  test('₹1,000 at 18% GST', () => {
    const result = calcGST({ net: 1000, rate: '18' });
    const gross = numericValue(result.main.value);
    expect(gross).toBe(1180);
  });

  test('₹25,000 at 18% GST', () => {
    const result = calcGST({ net: 25000, rate: '18' });
    const totalGst = numericValue(result.secondary![1].value);
    expect(totalGst).toBe(4500);
  });

  test('CGST = SGST = GST/2', () => {
    const result = calcGST({ net: 1000, rate: '18' });
    const cgst = numericValue(result.secondary![2].value);
    const sgst = numericValue(result.secondary![3].value);
    expect(cgst).toBe(90);
    expect(sgst).toBe(90);
  });

  test('IGST = total GST', () => {
    const result = calcGST({ net: 1000, rate: '18' });
    const igst = numericValue(result.secondary![4].value);
    expect(igst).toBe(180);
  });

  test('5% GST rate', () => {
    const result = calcGST({ net: 10000, rate: '5' });
    const gross = numericValue(result.main.value);
    expect(gross).toBe(10500);
  });

  test('zero amount returns zero GST', () => {
    const result = calcGST({ net: 0, rate: '18' });
    const gross = numericValue(result.main.value);
    expect(gross).toBe(0);
  });
});

// ══════════════════════════════════════════════════════
// PRE-GST (REVERSE GST) CALCULATOR
// ══════════════════════════════════════════════════════
describe('Pre-GST Calculator', () => {
  test('₹1,180 inclusive of 18% GST → net ₹1,000', () => {
    const result = calcPreGST({ gross: 1180, rate: '18' });
    const net = numericValue(result.main.value);
    expect(net).toBeCloseTo(1000, 0);
  });

  test('reverse-forward consistency: GST(PreGST(x)) ≈ x', () => {
    const preResult = calcPreGST({ gross: 5900, rate: '18' });
    const net = numericValue(preResult.main.value);
    const fwdResult = calcGST({ net, rate: '18' });
    const gross = numericValue(fwdResult.main.value);
    expect(gross).toBeCloseTo(5900, 0);
  });
});

// ══════════════════════════════════════════════════════
// COMPOUND INTEREST CALCULATOR
// ══════════════════════════════════════════════════════
describe('Compound Interest Calculator', () => {
  test('₹1L at 8% for 5 years, compounded annually', () => {
    const result = calcCompoundInterest({ principal: 100000, rate: 8, time: 5, compound: 'Annually' });
    const ci = numericValue(result.main.value);
    // A = 100000 × (1.08)^5 = 146932.81 → CI = 46932.81
    expect(ci).toBeCloseTo(46932.81, 0);
  });

  test('₹1L at 8% for 5 years, compounded quarterly', () => {
    const result = calcCompoundInterest({ principal: 100000, rate: 8, time: 5, compound: 'Quarterly' });
    const ci = numericValue(result.main.value);
    // A = 100000 × (1.02)^20 = 148594.74 → CI = 48594.74
    expect(ci).toBeCloseTo(48594.74, 0);
  });

  test('zero interest returns zero CI', () => {
    const result = calcCompoundInterest({ principal: 100000, rate: 0, time: 5, compound: 'Annually' });
    const ci = numericValue(result.main.value);
    expect(ci).toBeCloseTo(0, 0);
  });
});

// ══════════════════════════════════════════════════════
// SIMPLE INTEREST CALCULATOR
// ══════════════════════════════════════════════════════
describe('Simple Interest Calculator', () => {
  test('₹50,000 at 6% for 3 years', () => {
    const result = calcSimpleInterest({ principal: 50000, rate: 6, time: 3 });
    const si = numericValue(result.main.value);
    expect(si).toBe(9000);
  });

  test('total amount = principal + SI', () => {
    const result = calcSimpleInterest({ principal: 100000, rate: 10, time: 2 });
    const si = numericValue(result.main.value);
    const total = numericValue(result.secondary![0].value);
    expect(total).toBe(100000 + si);
  });

  test('zero rate returns zero interest', () => {
    const result = calcSimpleInterest({ principal: 100000, rate: 0, time: 5 });
    const si = numericValue(result.main.value);
    expect(si).toBe(0);
  });
});

// ══════════════════════════════════════════════════════
// INCOME TAX CALCULATOR (FY 2025-26)
// ══════════════════════════════════════════════════════
describe('Income Tax Calculator', () => {
  test('New Regime: ₹8L income → zero tax (under ₹12L rebate)', () => {
    const result = calcIncomeTax({ income: 800000, regime: 'New Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    expect(tax).toBe(0);
  });

  test('New Regime: ₹12,75,000 income → taxable = ₹12L, rebate applies → 0 tax', () => {
    const result = calcIncomeTax({ income: 1275000, regime: 'New Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    // Taxable = 12,75,000 - 75,000 = 12,00,000 → rebate u/s 87A → 0
    expect(tax).toBe(0);
  });

  test('New Regime: ₹15L income → positive tax', () => {
    const result = calcIncomeTax({ income: 1500000, regime: 'New Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    expect(tax).toBeGreaterThan(0);
  });

  test('Old Regime: ₹5L income → zero tax (rebate)', () => {
    const result = calcIncomeTax({ income: 500000, regime: 'Old Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    expect(tax).toBe(0);
  });

  test('Old Regime: ₹10L income → positive tax', () => {
    const result = calcIncomeTax({ income: 1000000, regime: 'Old Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    expect(tax).toBeGreaterThan(0);
  });

  test('result includes cess component', () => {
    const result = calcIncomeTax({ income: 2000000, regime: 'New Regime', age: 'Below 60' });
    const labels = result.secondary!.map(s => s.label);
    expect(labels).toContain('Health & Education Cess (4%)');
  });

  test('marginal relief prevents tax cliff above ₹12L', () => {
    // ₹12,75,001 taxable income: tax should not exceed (taxable - 12L) = ₹75,001
    const result = calcIncomeTax({ income: 1350001, regime: 'New Regime', age: 'Below 60' });
    const tax = numericValue(result.main.value);
    // Taxable = 1350001 - 75000 = 1275001
    // Marginal relief: tax <= 1275001 - 1200000 = 75001
    // With cess: tax <= 75001 * 1.04 = 78001
    expect(tax).toBeLessThanOrEqual(78002);
  });
});

// ══════════════════════════════════════════════════════
// FD CALCULATOR
// ══════════════════════════════════════════════════════
describe('FD Calculator', () => {
  test('₹1L at 7% for 5 years, quarterly compounding', () => {
    const result = calcFD({ principal: 100000, rate: 7, years: 5, compounding: 'Quarterly' });
    const maturity = numericValue(result.main.value);
    // A = 100000 × (1 + 0.07/4)^(20) ≈ 141478
    expect(maturity).toBeGreaterThanOrEqual(141000);
    expect(maturity).toBeLessThanOrEqual(142000);
  });

  test('interest = maturity - principal', () => {
    const result = calcFD({ principal: 100000, rate: 7, years: 5, compounding: 'Quarterly' });
    const maturity = numericValue(result.main.value);
    const interest = numericValue(result.secondary![0].value);
    expect(Math.abs(interest - (maturity - 100000))).toBeLessThan(2);
  });
});

// ══════════════════════════════════════════════════════
// PPF CALCULATOR
// ══════════════════════════════════════════════════════
describe('PPF Calculator', () => {
  test('₹12,500/month (₹1.5L/year) at 7.1% for 15 years', () => {
    const result = calcPPF({ contribution: 12500, rate: 7.1, years: 15 });
    const maturity = numericValue(result.main.value);
    // PPF compounds annually: each year balance = (prev + annual) × (1 + rate)
    expect(maturity).toBeGreaterThan(3500000);
    expect(maturity).toBeLessThan(4500000);
  });

  test('PPF contribution is capped at ₹1.5L/year', () => {
    const result = calcPPF({ contribution: 20000, rate: 7.1, years: 15 });
    const annualContrib = result.secondary!.find(s => s.label.includes('Annual Contribution'));
    expect(annualContrib?.value).toContain('1,50,000');
    expect(annualContrib?.value).toContain('capped');
  });
});

// ══════════════════════════════════════════════════════
// TAX REGIME COMPARISON
// ══════════════════════════════════════════════════════
describe('Tax Regime Comparison', () => {
  test('low income favors new regime', () => {
    const result = calcTaxRegime({ income: 1000000, sec80c: 0, nps: 0, med: 0, hloan: 0, hra_ex: 0 });
    expect(result.main.value).toContain('New Regime');
  });

  test('high deductions may favor old regime', () => {
    const result = calcTaxRegime({ income: 2000000, sec80c: 150000, nps: 50000, med: 25000, hloan: 200000, hra_ex: 100000 });
    // With ~₹5.75L deductions, old regime should be competitive
    expect(result.secondary).toBeDefined();
    expect(result.secondary!.length).toBeGreaterThan(5);
  });
});

// ══════════════════════════════════════════════════════
// HRA CALCULATOR
// ══════════════════════════════════════════════════════
describe('HRA Calculator', () => {
  test('metro employee: exemption = min(actual HRA, rent-10%basic, 50%basic)', () => {
    const result = calcHRA({ basic: 50000, hra: 20000, rent: 25000, metro: 'Yes (Metro City)' });
    const exempt = numericValue(result.main.value);
    // Rule 1: Annual HRA = 20000×12 = 240000
    // Rule 2: Annual Rent - 10% Basic = (25000 - 5000) × 12 = 240000
    // Rule 3: 50% of Basic = 300000
    // Min = 240000
    expect(exempt).toBe(240000);
  });
});

// ══════════════════════════════════════════════════════
// CAGR CALCULATOR
// ══════════════════════════════════════════════════════
describe('CAGR Calculator', () => {
  test('₹1L to ₹2L in 5 years ≈ 14.87%', () => {
    const result = calcCAGR({ begin: 100000, end: 200000, yrs: 5 });
    const cagr = parseFloat(String(result.main.value));
    expect(cagr).toBeCloseTo(14.87, 1);
  });

  test('no growth = 0% CAGR', () => {
    const result = calcCAGR({ begin: 100000, end: 100000, yrs: 10 });
    const cagr = parseFloat(String(result.main.value));
    expect(cagr).toBeCloseTo(0, 1);
  });
});

// ══════════════════════════════════════════════════════
// ROI CALCULATOR
// ══════════════════════════════════════════════════════
describe('ROI Calculator', () => {
  test('buy at ₹100, sell at ₹150 in 2 years → ROI 50%', () => {
    const result = calcROI({ initial: 100, final: 150, years: 2 });
    const gain = numericValue(result.main.value);
    expect(gain).toBe(50);
    const roi = parseFloat(String(result.secondary![0].value));
    expect(roi).toBeCloseTo(50, 1);
  });
});

// ══════════════════════════════════════════════════════
// GRATUITY CALCULATOR
// ══════════════════════════════════════════════════════
describe('Gratuity Calculator', () => {
  test('not eligible under 5 years', () => {
    const result = calcGratuity({ salary: 50000, years: 3, leaveBalance: 30 });
    expect(result.main.label).toContain('Not Eligible');
  });

  test('₹50,000 salary, 10 years = (50000×15×10)/26', () => {
    const result = calcGratuity({ salary: 50000, years: 10, leaveBalance: 30 });
    const gratuity = numericValue(result.main.value);
    const expected = (50000 * 15 * 10) / 26;
    expect(gratuity).toBeCloseTo(expected, -1);
  });
});

// ══════════════════════════════════════════════════════
// BREAKEVEN CALCULATOR
// ══════════════════════════════════════════════════════
describe('Breakeven Calculator', () => {
  test('price=100, variable=60, fixed=10000 → 250 units', () => {
    const result = calcBreakeven({ price: 100, variable: 60, fixed: 10000 });
    const units = numericValue(result.main.value);
    expect(units).toBe(250);
  });

  test('price <= variable cost returns error', () => {
    const result = calcBreakeven({ price: 50, variable: 60, fixed: 10000 });
    expect(result.main.label).toContain('Error');
  });
});

// ══════════════════════════════════════════════════════
// INFLATION CALCULATOR
// ══════════════════════════════════════════════════════
describe('Inflation Calculator', () => {
  test('₹1L at 6% inflation for 10 years', () => {
    const result = calcInflation({ amount: 100000, rate: 6, years: 10 });
    const future = numericValue(result.main.value);
    // 100000 × (1.06)^10 ≈ 179085
    expect(future).toBeGreaterThanOrEqual(179000);
    expect(future).toBeLessThanOrEqual(180000);
  });
});

// ══════════════════════════════════════════════════════
// MORTGAGE CALCULATOR
// ══════════════════════════════════════════════════════
describe('Mortgage Calculator', () => {
  test('EMI formula consistency: mortgage uses same formula as EMI', () => {
    const mortResult = calcMortgage({ amount: 1000000, rate: 8.5, term: 20 });
    const emiResult = calcEMI({ principal: 1000000, rate: 8.5, tenure: 240 });
    const mortPmt = numericValue(mortResult.main.value);
    const emiPmt = numericValue(emiResult.main.value);
    expect(mortPmt).toBe(emiPmt);
  });
});

// ══════════════════════════════════════════════════════
// CAR LOAN CALCULATOR
// ══════════════════════════════════════════════════════
describe('Car Loan Calculator', () => {
  test('₹5L at 9% for 5 years', () => {
    const result = calcCarLoan({ amount: 500000, rate: 9, tenure: 5 });
    const emi = numericValue(result.main.value);
    // Known EMI ≈ ₹10,381
    expect(emi).toBeGreaterThanOrEqual(10370);
    expect(emi).toBeLessThanOrEqual(10390);
  });
});
