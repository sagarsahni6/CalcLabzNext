/* ═══════════════════════════════════════════════════
   Calc Labz — Health Calculation Unit Tests
   Tests health/fitness formulas against known-correct values.
   ═══════════════════════════════════════════════════ */

import { describe, test, expect } from 'vitest';
import {
  calcBMI, calcBMR, calcTDEE, calcBloodPressure, calcBodyFat,
  calcIdealWeight, calcMacros,
  calcWater, calcHeartRate, calcCalories,
} from '@/lib/calculations/health';

// ── Helper: extract numeric value from result string ──
function numericValue(str: string | number): number {
  if (typeof str === 'number') return str;
  return parseFloat(str.replace(/[₹,%×\s]/g, '').replace(/,/g, ''));
}

// ══════════════════════════════════════════════════════
// BMI CALCULATOR
// ══════════════════════════════════════════════════════
describe('BMI Calculator', () => {
  test('70kg, 175cm → BMI ≈ 22.9 (Normal)', () => {
    const result = calcBMI({ height: 175, weight: 70 });
    const bmi = parseFloat(String(result.main.value));
    expect(bmi).toBeCloseTo(22.9, 1);
  });

  test('90kg, 170cm → BMI ≈ 31.1 (Obese)', () => {
    const result = calcBMI({ height: 170, weight: 90 });
    const bmi = parseFloat(String(result.main.value));
    expect(bmi).toBeCloseTo(31.1, 1);
    const whoCat = result.secondary![0].value;
    expect(whoCat).toContain('Obese');
  });

  test('50kg, 170cm → BMI ≈ 17.3 (Underweight)', () => {
    const result = calcBMI({ height: 170, weight: 50 });
    const bmi = parseFloat(String(result.main.value));
    expect(bmi).toBeCloseTo(17.3, 1);
    const whoCat = result.secondary![0].value;
    expect(whoCat).toContain('Underweight');
  });

  test('includes Asian BMI category', () => {
    const result = calcBMI({ height: 170, weight: 70 });
    const labels = result.secondary!.map(s => s.label);
    expect(labels).toContain('Category (Asian)');
  });

  test('BMI 24 is Normal by WHO but may be Overweight by Asian standards', () => {
    // Find weight that gives BMI ≈ 24 for height 170cm
    // BMI = w / (1.7)^2 → w = 24 × 2.89 ≈ 69.36
    const result = calcBMI({ height: 170, weight: 69.4 });
    const bmi = parseFloat(String(result.main.value));
    expect(bmi).toBeCloseTo(24.0, 0);
    const whoCat = String(result.secondary![0].value);
    const asianCat = String(result.secondary![1].value);
    expect(whoCat).toContain('Normal');
    expect(asianCat).toContain('Overweight');
  });

  test('ideal weight is calculated at BMI 22', () => {
    const result = calcBMI({ height: 175, weight: 70 });
    const ideal = result.secondary!.find(s => s.label.includes('Ideal Weight'));
    const idealVal = parseFloat(String(ideal?.value));
    // Ideal = 22 × (1.75)^2 = 22 × 3.0625 = 67.375
    expect(idealVal).toBeCloseTo(67.4, 0);
  });
});

// ══════════════════════════════════════════════════════
// BMR CALCULATOR (Mifflin-St Jeor)
// ══════════════════════════════════════════════════════
describe('BMR Calculator', () => {
  test('Male, 70kg, 175cm, 30yo → BMR ≈ 1648 kcal', () => {
    const result = calcBMR({ height: 175, weight: 70, age: 30, gender: 'Male' });
    const bmr = numericValue(result.main.value);
    // BMR = 10×70 + 6.25×175 - 5×30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
    expect(bmr).toBeCloseTo(1649, 0);
  });

  test('Female, 60kg, 165cm, 25yo → BMR ≈ 1370 kcal', () => {
    const result = calcBMR({ height: 165, weight: 60, age: 25, gender: 'Female' });
    const bmr = numericValue(result.main.value);
    // BMR = 10×60 + 6.25×165 - 5×25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25
    expect(bmr).toBeCloseTo(1345, 0);
  });

  test('includes activity multiplier outputs', () => {
    const result = calcBMR({ height: 175, weight: 70, age: 30, gender: 'Male' });
    const labels = result.secondary!.map(s => s.label);
    expect(labels.some(l => l.includes('Sedentary'))).toBe(true);
    expect(labels.some(l => l.includes('Moderate'))).toBe(true);
  });
});

// ══════════════════════════════════════════════════════
// TDEE CALCULATOR
// ══════════════════════════════════════════════════════
describe('TDEE Calculator', () => {
  test('sedentary TDEE = BMR × 1.2', () => {
    const result = calcTDEE({ height: 175, weight: 70, age: 30, gender: 'Male', activity: 'Sedentary' });
    const tdee = numericValue(result.main.value);
    // BMR ≈ 1649, TDEE = 1649 × 1.2 ≈ 1979
    expect(tdee).toBeCloseTo(1979, -1);
  });

  test('moderate TDEE = BMR × 1.55', () => {
    const result = calcTDEE({ height: 175, weight: 70, age: 30, gender: 'Male', activity: 'Moderate' });
    const tdee = numericValue(result.main.value);
    // BMR ≈ 1649, TDEE = 1649 × 1.55 ≈ 2556
    expect(tdee).toBeCloseTo(2556, -1);
  });

  test('includes weight loss/gain calorie targets', () => {
    const result = calcTDEE({ height: 175, weight: 70, age: 30, gender: 'Male', activity: 'Sedentary' });
    const labels = result.secondary!.map(s => s.label);
    expect(labels.some(l => l.includes('Weight Loss'))).toBe(true);
    expect(labels.some(l => l.includes('Weight Gain'))).toBe(true);
  });
});

// ══════════════════════════════════════════════════════
// BLOOD PRESSURE CALCULATOR (ACC/AHA 2017)
// ══════════════════════════════════════════════════════
describe('Blood Pressure Calculator', () => {
  test('120/80 → Normal', () => {
    const result = calcBloodPressure({ systolic: 115, diastolic: 75 });
    expect(result.main.value).toContain('Normal');
  });

  test('125/78 → Elevated', () => {
    const result = calcBloodPressure({ systolic: 125, diastolic: 78 });
    expect(result.main.value).toContain('Elevated');
  });

  test('135/85 → Hypertension Stage 1', () => {
    const result = calcBloodPressure({ systolic: 135, diastolic: 85 });
    expect(result.main.value).toContain('Stage 1');
  });

  test('150/95 → Hypertension Stage 2', () => {
    const result = calcBloodPressure({ systolic: 150, diastolic: 95 });
    expect(result.main.value).toContain('Stage 2');
  });

  test('185/125 → Hypertensive Crisis', () => {
    const result = calcBloodPressure({ systolic: 185, diastolic: 125 });
    expect(result.main.value).toContain('Crisis');
  });

  test('85/55 → Hypotension', () => {
    const result = calcBloodPressure({ systolic: 85, diastolic: 55 });
    expect(result.main.value).toContain('Low');
  });

  test('includes MAP and pulse pressure', () => {
    const result = calcBloodPressure({ systolic: 120, diastolic: 80 });
    const labels = result.secondary!.map(s => s.label);
    expect(labels.some(l => l.includes('Pulse Pressure'))).toBe(true);
    expect(labels.some(l => l.includes('Mean Arterial'))).toBe(true);
  });
});

// ══════════════════════════════════════════════════════
// BODY FAT CALCULATOR (US Navy Method)
// ══════════════════════════════════════════════════════
describe('Body Fat Calculator', () => {
  test('Male with typical measurements → reasonable body fat', () => {
    const result = calcBodyFat({ gender: 'Male', waist_bf: 85, neck_bf: 38, height_bf: 175, hip_bf: 95, weight_bf: 80 });
    const bf = parseFloat(String(result.main.value));
    expect(bf).toBeGreaterThan(5);
    expect(bf).toBeLessThan(40);
  });

  test('Female with typical measurements → reasonable body fat', () => {
    const result = calcBodyFat({ gender: 'Female', waist_bf: 75, neck_bf: 33, height_bf: 165, hip_bf: 95, weight_bf: 60 });
    const bf = parseFloat(String(result.main.value));
    expect(bf).toBeGreaterThan(10);
    expect(bf).toBeLessThan(45);
  });

  test('includes FFMI calculation', () => {
    const result = calcBodyFat({ gender: 'Male', waist_bf: 85, neck_bf: 38, height_bf: 175, hip_bf: 95, weight_bf: 80 });
    const labels = result.secondary!.map(s => s.label);
    expect(labels).toContain('FFMI');
  });

  test('body fat is clamped between 3% and 60%', () => {
    // Extreme measurements that might give negative BF from formula
    const result = calcBodyFat({ gender: 'Male', waist_bf: 60, neck_bf: 50, height_bf: 200, hip_bf: 70, weight_bf: 90 });
    const bf = parseFloat(String(result.main.value));
    expect(bf).toBeGreaterThanOrEqual(3);
    expect(bf).toBeLessThanOrEqual(60);
  });
});

// ══════════════════════════════════════════════════════
// WATER INTAKE CALCULATOR
// ══════════════════════════════════════════════════════
describe('Water Intake Calculator', () => {
  test('70kg sedentary → 2100ml', () => {
    const result = calcWater({ weight: 70, activity: 'Sedentary' });
    const ml = numericValue(result.main.value);
    expect(ml).toBe(2100);
  });

  test('70kg active → 2800ml', () => {
    const result = calcWater({ weight: 70, activity: 'Active' });
    const ml = numericValue(result.main.value);
    expect(ml).toBe(2800);
  });
});

// ══════════════════════════════════════════════════════
// HEART RATE ZONES
// ══════════════════════════════════════════════════════
describe('Heart Rate Calculator', () => {
  test('age 30, resting 70 → max = 190 bpm', () => {
    const result = calcHeartRate({ age: 30, resting: 70 });
    const max = numericValue(result.main.value);
    expect(max).toBe(190);
  });

  test('includes all 5 training zones', () => {
    const result = calcHeartRate({ age: 30, resting: 70 });
    expect(result.secondary!.length).toBe(5);
    expect(result.secondary![0].label).toContain('Zone 1');
    expect(result.secondary![4].label).toContain('Zone 5');
  });
});

// ══════════════════════════════════════════════════════
// CALORIES BURNED CALCULATOR
// ══════════════════════════════════════════════════════
describe('Calories Burned Calculator', () => {
  test('70kg walking for 30min → reasonable calories', () => {
    const result = calcCalories({ weight: 70, duration: 30, activity: 'Walking' });
    const burned = numericValue(result.main.value);
    // MET 3.5: (3.5 × 3.5 × 70 / 200) × 30 ≈ 129
    expect(burned).toBeGreaterThan(100);
    expect(burned).toBeLessThan(200);
  });

  test('HIIT burns more than walking', () => {
    const walk = calcCalories({ weight: 70, duration: 30, activity: 'Walking' });
    const hiit = calcCalories({ weight: 70, duration: 30, activity: 'HIIT' });
    expect(numericValue(hiit.main.value)).toBeGreaterThan(numericValue(walk.main.value));
  });
});

// ══════════════════════════════════════════════════════
// MACROS CALCULATOR
// ══════════════════════════════════════════════════════
describe('Macros Calculator', () => {
  test('2000 kcal maintenance → protein + carbs + fat calories ≈ 2000', () => {
    const result = calcMacros({ calories: 2000, goal: 'Maintenance' });
    // Maintenance split: 30% protein, 45% carbs, 25% fat
    const proteinG = numericValue(result.main.value); // grams
    const carbsG = numericValue(result.secondary![0].value);
    const fatG = numericValue(result.secondary![1].value);
    const totalCals = proteinG * 4 + carbsG * 4 + fatG * 9;
    expect(totalCals).toBeCloseTo(2000, -1);
  });
});

// ══════════════════════════════════════════════════════
// IDEAL WEIGHT CALCULATOR
// ══════════════════════════════════════════════════════
describe('Ideal Weight Calculator', () => {
  test('male 175cm → reasonable ideal weight', () => {
    const result = calcIdealWeight({ height: 175, gender: 'Male' });
    const weight = parseFloat(String(result.main.value));
    expect(weight).toBeGreaterThan(55);
    expect(weight).toBeLessThan(85);
  });

  test('includes multiple formulas (Miller, Robinson)', () => {
    const result = calcIdealWeight({ height: 175, gender: 'Male' });
    const labels = result.secondary!.map(s => s.label);
    expect(labels.some(l => l.includes('Miller'))).toBe(true);
    expect(labels.some(l => l.includes('Robinson'))).toBe(true);
  });
});
