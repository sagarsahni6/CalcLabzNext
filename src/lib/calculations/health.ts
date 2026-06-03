/* Calc Labz — Health and Fitness Calculations
   Ported from assets/js/calculators-health.js */
import { CalcFunction } from '@/types/calculator';

export const calcBMI: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const weight = Number(v.weight) || 70;
  const h = height / 100;
  const bmi = weight / (h * h);
  // WHO standard categories
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal ✓" : bmi < 30 ? "Overweight" : "Obese";
  // Asian (WHO Asia-Pacific) categories — overweight starts at 23, obese at 27.5
  const asianCat = bmi < 18.5 ? "Underweight" : bmi < 23 ? "Normal" : bmi < 27.5 ? "Overweight" : "Obese";
  const ideal = 22 * h * h;
  const idealLow = 18.5 * h * h;
  const idealHigh = 24.9 * h * h;
  const diff = weight - ideal;
  const bmiPrime = bmi / 25;
  const ponderal = weight / (h * h * h);
  // Sensitivity: how BMI changes with weight
  const sensWeights: number[] = [];
  const sensBMIs: number[] = [];
  let bmiSensIdx = 0;
  for (let w = Math.max(40, weight - 15); w <= weight + 15; w += 3) {
    sensWeights.push(w);
    sensBMIs.push(Math.round((w / (h * h)) * 10) / 10);
    if (Math.abs(w - weight) < 2) bmiSensIdx = sensWeights.length - 1;
  }
  return {
    main: { label: "Your BMI", value: bmi.toFixed(1) },
    secondary: [
      { label: "Category (WHO)", value: cat },
      { label: "Category (Asian)", value: asianCat + (asianCat !== cat ? ' ⚠️' : '') },
      { label: "Ideal Weight (BMI 22)", value: ideal.toFixed(1) + " kg" },
      { label: "Healthy Range", value: idealLow.toFixed(1) + " – " + idealHigh.toFixed(1) + " kg" },
      { label: "Weight to Ideal", value: (diff > 0 ? "+" : "") + diff.toFixed(1) + " kg" + (Math.abs(diff) < 2 ? ' — Great!' : '') },
      { label: "BMI Prime", value: bmiPrime.toFixed(2) + (bmiPrime <= 1 ? " ✓" : " (>1 = overweight)") },
      { label: "Ponderal Index", value: ponderal.toFixed(1) + " kg/m³" },
      { label: "Asian Healthy Range", value: "18.5 – 22.9 (overweight ≥23)" },
    ],
    chart: { a: Math.round(ideal * 10) / 10, b: Math.round(Math.abs(diff) * 10) / 10, lA: 'Ideal Weight (kg)', lB: diff > 0 ? 'Excess Weight (kg)' : 'Weight to Gain (kg)' },
    table: {
      title: 'BMI Classification Reference',
      headers: ['Category', 'BMI Range (WHO)', 'BMI Range (Asian)', 'Health Risk'],
      rows: [
        ['Underweight', '< 18.5', '< 18.5', 'Moderate'],
        ['Normal', '18.5 – 24.9', '18.5 – 22.9', 'Low'],
        ['Overweight', '25.0 – 29.9', '23.0 – 27.4', 'Increased'],
        ['Obese Class I', '30.0 – 34.9', '27.5 – 32.4', 'High'],
        ['Obese Class II', '35.0 – 39.9', '32.5 – 37.4', 'Very High'],
        ['Obese Class III', '≥ 40.0', '≥ 37.5', 'Extremely High'],
      ],
      collapsible: true,
      highlightRows: [bmi < 18.5 ? 0 : bmi < 25 ? 1 : bmi < 30 ? 2 : bmi < 35 ? 3 : bmi < 40 ? 4 : 5],
    },
    sensitivity: [{
      variable: 'weight', label: 'Body Weight', unit: 'kg',
      range: sensWeights, values: sensBMIs, currentIdx: bmiSensIdx, resultLabel: 'BMI',
    }],
  };
};

export const calcBMR: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const weight = Number(v.weight) || 70;
  const age = Number(v.age) || 30;
  const gender = String(v.gender || "Male");
  const bodyFat = Number(v.bodyfat_bmr) || 0;
  const bmr = gender === "Male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  // Harris-Benedict comparison
  const hbBmr = gender === "Male"
    ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    : 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  // Katch-McArdle (if body fat known)
  const lbm = bodyFat > 0 ? weight * (1 - bodyFat / 100) : 0;
  const kmBmr = bodyFat > 0 ? 370 + 21.6 * lbm : 0;
  const sed = Math.round(bmr * 1.2), light = Math.round(bmr * 1.375), mod = Math.round(bmr * 1.55), active = Math.round(bmr * 1.725), vActive = Math.round(bmr * 1.9);
  return {
    main: { label: "BMR", value: Math.round(bmr) + " kcal/day" },
    secondary: [
      { label: "Sedentary (×1.2)", value: sed + " kcal" },
      { label: "Light Activity (×1.375)", value: light + " kcal" },
      { label: "Moderate (×1.55)", value: mod + " kcal" },
      { label: "Very Active (×1.725)", value: active + " kcal" },
      { label: "Extra Active (×1.9)", value: vActive + " kcal" },
      { label: "Harris-Benedict BMR", value: Math.round(hbBmr) + " kcal (comparison)" },
      ...(kmBmr > 0 ? [{ label: "Katch-McArdle BMR", value: Math.round(kmBmr) + " kcal (body fat adjusted)" }] : []),
      { label: "Daily Protein (min)", value: Math.round(weight * 0.8) + "g (sedentary RDA)" },
    ],
    chart: {
      labels: ['BMR', 'Sedentary', 'Light', 'Moderate', 'Very Active', 'Extra Active'],
      data: [Math.round(bmr), sed, light, mod, active, vActive],
    },
    table: {
      title: 'Daily Calorie Needs by Activity Level',
      headers: ['Activity Level', 'Description', 'Multiplier', 'Calories/Day'],
      rows: [
        ['BMR (Resting)', 'Complete rest, no movement', '1.0', Math.round(bmr) + ' kcal'],
        ['Sedentary', 'Desk job, no exercise', '1.2', sed + ' kcal'],
        ['Lightly Active', 'Exercise 1-3 days/week', '1.375', light + ' kcal'],
        ['Moderately Active', 'Exercise 3-5 days/week', '1.55', mod + ' kcal'],
        ['Very Active', 'Hard exercise 6-7 days/week', '1.725', active + ' kcal'],
        ['Extra Active', 'Physical job + training', '1.9', vActive + ' kcal'],
      ],
      collapsible: true,
    },
  };
};

export const calcTDEE: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const weight = Number(v.weight) || 70;
  const age = Number(v.age) || 30;
  const gender = String(v.gender || "Male");
  const activity = String(v.activity || "Sedentary");
  // FIX: Use Mifflin-St Jeor (more accurate, consistent with calcBMR)
  // Previously used Harris-Benedict which overestimates by ~5%
  const bmr = gender === "Male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const mult = [1.2, 1.375, 1.55, 1.725, 1.9];
  const idx = ["Sedentary", "Light", "Moderate", "Active", "Very Active"].indexOf(activity);
  const m = idx !== -1 ? mult[idx] : 1.2;
  const tdee = Math.round(bmr * m);
  const protein = Math.round(weight * 1.6); // Moderate protein (1.6g/kg)
  const fatCals = Math.round(tdee * 0.25);
  const carbCals = tdee - (protein * 4) - fatCals;
  const tef = Math.round(tdee * 0.10); // Thermic Effect of Food ~10%
  const neat = Math.round(tdee * 0.15); // Non-Exercise Activity
  return {
    main: { label: "TDEE", value: tdee + " kcal/day" },
    secondary: [
      { label: "Weight Loss (−500 kcal)", value: (tdee - 500) + " kcal" },
      { label: "Maintenance", value: tdee + " kcal" },
      { label: "Weight Gain (+500 kcal)", value: (tdee + 500) + " kcal" },
      { label: "BMR (Mifflin-St Jeor)", value: Math.round(bmr) + " kcal" },
      { label: "TEF (Thermic Effect)", value: "~" + tef + " kcal (10% of TDEE)" },
      { label: "NEAT (est.)", value: "~" + neat + " kcal" },
      { label: "Suggested Protein", value: protein + "g (" + (protein * 4) + " kcal)" },
      { label: "Suggested Carbs", value: Math.round(carbCals / 4) + "g (" + carbCals + " kcal)" },
      { label: "Suggested Fat", value: Math.round(fatCals / 9) + "g (" + fatCals + " kcal)" }
    ],
    chart: {
      labels: ['Protein', 'Carbohydrates', 'Fat'],
      data: [protein * 4, carbCals, fatCals],
    },
    table: {
      title: 'Calorie Targets by Goal',
      headers: ['Goal', 'Daily Calories', 'Weekly Change', 'Timeline'],
      rows: [
        ['Aggressive Loss', (tdee - 1000) + ' kcal', '−1.0 kg/week', 'Fast but hard to sustain'],
        ['Moderate Loss', (tdee - 500) + ' kcal', '−0.5 kg/week', 'Recommended for most'],
        ['Mild Loss', (tdee - 250) + ' kcal', '−0.25 kg/week', 'Very sustainable'],
        ['Maintenance', tdee + ' kcal', '0 kg/week', 'Maintain current weight'],
        ['Lean Bulk', (tdee + 250) + ' kcal', '+0.25 kg/week', 'Minimize fat gain'],
        ['Bulk', (tdee + 500) + ' kcal', '+0.5 kg/week', 'Standard muscle gain'],
      ],
      collapsible: true,
      highlightRows: [3],
    },
    sensitivity: [{
      variable: 'activity', label: 'Activity Level', unit: '',
      range: ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'],
      values: [Math.round(bmr * 1.2), Math.round(bmr * 1.375), Math.round(bmr * 1.55), Math.round(bmr * 1.725), Math.round(bmr * 1.9)],
      currentIdx: idx !== -1 ? idx : 0, resultLabel: 'TDEE (kcal/day)',
    }],
  };
};

export const calcWater: CalcFunction = (v) => {
  const weight = Number(v.weight) || 70;
  const activity = String(v.activity || "Sedentary");
  const mult: Record<string, number> = { Sedentary: 30, Moderate: 35, Active: 40, "Very Active": 45 };
  const factor = mult[activity] || 30;
  const ml = Math.round(weight * factor);
  const glasses = Math.ceil(ml / 250);
  // Hourly intake assuming 16 waking hours
  const hourly = Math.round(ml / 16);
  return {
    main: { label: "Daily Water", value: ml + " ml" },
    secondary: [
      { label: "In Litres", value: (ml / 1000).toFixed(1) + " L" },
      { label: "Glasses (250ml)", value: glasses + " glasses" },
      { label: "Bottles (1L)", value: Math.ceil(ml / 1000) + " bottles" },
      { label: "Hourly Target", value: hourly + " ml/hour (waking)" },
      { label: "Morning (6-12)", value: Math.round(ml * 0.35) + " ml" },
      { label: "Afternoon (12-6)", value: Math.round(ml * 0.40) + " ml" },
      { label: "Evening (6-10)", value: Math.round(ml * 0.25) + " ml" },
    ],
    chart: { a: glasses, b: Math.max(0, 10 - glasses), lA: 'Your Target (glasses)', lB: 'vs 10 glass goal' },
  };
};

export const calcHeartRate: CalcFunction = (v) => {
  const age = Number(v.age) || 30;
  const resting = Number(v.resting) || 70;
  const max = 220 - age;
  const res = max - resting;
  const z = (lo: number, hi: number) => `${Math.round(resting + res * lo)}–${Math.round(resting + res * hi)} bpm`;
  // Tanaka formula (more accurate for older adults)
  const tanakaMax = Math.round(208 - 0.7 * age);
  return {
    main: { label: "Max Heart Rate", value: max + " bpm" },
    secondary: [
      { label: "Zone 1 — Recovery (50–60%)", value: z(0.5, 0.6) },
      { label: "Zone 2 — Fat Burn (60–70%)", value: z(0.6, 0.7) },
      { label: "Zone 3 — Aerobic (70–80%)", value: z(0.7, 0.8) },
      { label: "Zone 4 — Threshold (80–90%)", value: z(0.8, 0.9) },
      { label: "Zone 5 — VO₂ Max (90–100%)", value: z(0.9, 1.0) },
      { label: "Tanaka MHR (208−0.7×age)", value: tanakaMax + " bpm" },
      { label: "Heart Rate Reserve", value: res + " bpm" },
    ],
    chart: {
      labels: ['Zone 1 Recovery', 'Zone 2 Fat Burn', 'Zone 3 Aerobic', 'Zone 4 Threshold', 'Zone 5 VO₂ Max'],
      data: [
        Math.round(resting + res * 0.55),
        Math.round(resting + res * 0.65),
        Math.round(resting + res * 0.75),
        Math.round(resting + res * 0.85),
        Math.round(resting + res * 0.95),
      ],
    },
    table: {
      title: 'Heart Rate Training Zones',
      headers: ['Zone', 'Intensity', 'HR Range', 'Duration', 'Benefit'],
      rows: [
        ['Zone 1', '50–60%', z(0.5, 0.6), '30–60 min', 'Recovery & warm-up'],
        ['Zone 2', '60–70%', z(0.6, 0.7), '45–90 min', 'Fat burning & endurance base'],
        ['Zone 3', '70–80%', z(0.7, 0.8), '20–45 min', 'Aerobic capacity'],
        ['Zone 4', '80–90%', z(0.8, 0.9), '10–20 min', 'Lactate threshold'],
        ['Zone 5', '90–100%', z(0.9, 1.0), '1–5 min', 'VO₂ Max & speed'],
      ],
      collapsible: true,
    },
  };
};

export const calcAge: CalcFunction = (v) => {
  if (!v.dob) return { main: { label: "Error", value: "Select a date" } };
  const dob = new Date(v.dob as string);
  const today = new Date();
  let y = today.getFullYear() - dob.getFullYear();
  let m = today.getMonth() - dob.getMonth();
  let d = today.getDate() - dob.getDate();
  if (d < 0) {
    m--;
    d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  const days = Math.floor((today.getTime() - dob.getTime()) / 86400000);
  const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  const daysToB = Math.ceil((next.getTime() - today.getTime()) / 86400000);
  return {
    main: { label: "Your Age", value: `${y}y ${m}m ${d}d` },
    secondary: [
      { label: "Total Days", value: days.toLocaleString() },
      { label: "Total Weeks", value: Math.floor(days / 7).toLocaleString() },
      { label: "Total Months", value: (y * 12 + m).toString() },
      { label: "Birthday in", value: daysToB + " days" }
    ]
  };
};

export const calcCalories: CalcFunction = (v) => {
  const weight = Number(v.weight) || 70;
  const duration = Number(v.duration) || 30;
  const activity = String(v.activity || "Walking");
  const mets: Record<string, number> = { Walking: 3.5, Jogging: 7, Running: 10, Cycling: 8, Swimming: 7, HIIT: 12, Yoga: 3, "Weight Training": 5, Hiking: 6, Dancing: 5, "Jump Rope": 11, "Martial Arts": 10, Elliptical: 5, Rowing: 7, "Stair Climbing": 9, Gardening: 4 };
  const met = mets[activity] || 5;
  const burned = Math.round((met * 3.5 * weight / 200) * duration);
  const fatG = burned / 7700 * 1000;
  // Equivalent comparisons
  const walkEquiv = Math.round(burned / (3.5 * 3.5 * weight / 200));
  return {
    main: { label: "Calories Burned", value: burned + " kcal" },
    secondary: [
      { label: "Per Minute", value: (burned / duration).toFixed(1) + " kcal/min" },
      { label: "Fat Burned", value: fatG.toFixed(1) + " g" },
      { label: "MET Value", value: met },
      { label: "Walk Equivalent", value: walkEquiv + " min of walking" },
      { label: "Food Equivalent", value: "~" + Math.round(burned / 7) + "g of chocolate" },
      { label: "Weekly (same session)", value: Math.round(burned * 5) + " kcal (5 days)" },
    ],
    chart: { a: burned, b: Math.max(0, 500 - burned), lA: 'Burned (kcal)', lB: 'To 500 kcal target' },
  };
};

export const calcSleep: CalcFunction = (v) => {
  if (!v.wake) return { main: { label: "Error", value: "Enter wake time" } };
  const [h, m] = String(v.wake).split(':').map(Number);
  const wm = h * 60 + m;
  const cycles = [6, 5, 4];
  const times = cycles.map(n => {
    let sm = wm - n * 90 - 14;
    if (sm < 0) sm += 1440;
    return `${String(Math.floor(sm / 60) % 24).padStart(2, '0')}:${String(sm % 60).padStart(2, '0')}`;
  });
  return {
    main: { label: "Best Bedtime (6 cycles / 9h)", value: times[0] },
    secondary: [
      { label: "7.5h (5 cycles)", value: times[1] },
      { label: "6h (4 cycles)", value: times[2] },
      { label: "Fall-asleep buffer", value: "~14 minutes" },
      { label: "Total Sleep (6 cycles)", value: "9 hours" },
      { label: "Total Sleep (5 cycles)", value: "7.5 hours" },
      { label: "Total Sleep (4 cycles)", value: "6 hours" },
    ],
    chart: {
      labels: ['4 Cycles (6h)', '5 Cycles (7.5h)', '6 Cycles (9h)'],
      data: [6, 7.5, 9],
    },
  };
};

export const calcMacros: CalcFunction = (v) => {
  const calories = Number(v.calories) || 2000;
  const goal = String(v.goal || "Maintenance");
  const splits: Record<string, number[]> = {
    "Weight Loss": [0.35, 0.35, 0.30],
    "Maintenance": [0.30, 0.45, 0.25],
    "Muscle Gain": [0.30, 0.40, 0.30]
  };
  const [p, c, f] = splits[goal] || splits["Maintenance"];
  const proteinG = Math.round(calories * p / 4);
  const carbG = Math.round(calories * c / 4);
  const fatG = Math.round(calories * f / 9);
  const proteinCal = Math.round(calories * p);
  const carbCal = Math.round(calories * c);
  const fatCal = Math.round(calories * f);
  // Sensitivity: calorie target ±500
  const sensCals = [calories - 500, calories - 250, calories, calories + 250, calories + 500];
  const sensProt = sensCals.map(cal => Math.round(cal * p / 4));
  const sensCalIdx = 2; // current is always the middle
  return {
    main: { label: "Protein", value: proteinG + "g" },
    secondary: [
      { label: "Carbohydrates", value: carbG + "g" },
      { label: "Fat", value: fatG + "g" },
      { label: "Protein (kcal)", value: proteinCal + " kcal (" + Math.round(p * 100) + "%)" },
      { label: "Carbs (kcal)", value: carbCal + " kcal (" + Math.round(c * 100) + "%)" },
      { label: "Fat (kcal)", value: fatCal + " kcal (" + Math.round(f * 100) + "%)" },
      { label: "Goal", value: goal },
    ],
    chart: {
      labels: ['Protein (' + proteinG + 'g)', 'Carbs (' + carbG + 'g)', 'Fat (' + fatG + 'g)'],
      data: [proteinCal, carbCal, fatCal],
    },
    table: {
      title: 'Per-Meal Breakdown',
      headers: ['Meals/Day', 'Protein', 'Carbs', 'Fat', 'Calories'],
      rows: [
        ['3 meals', Math.round(proteinG / 3) + 'g', Math.round(carbG / 3) + 'g', Math.round(fatG / 3) + 'g', Math.round(calories / 3) + ' kcal'],
        ['4 meals', Math.round(proteinG / 4) + 'g', Math.round(carbG / 4) + 'g', Math.round(fatG / 4) + 'g', Math.round(calories / 4) + ' kcal'],
        ['5 meals', Math.round(proteinG / 5) + 'g', Math.round(carbG / 5) + 'g', Math.round(fatG / 5) + 'g', Math.round(calories / 5) + ' kcal'],
        ['6 meals', Math.round(proteinG / 6) + 'g', Math.round(carbG / 6) + 'g', Math.round(fatG / 6) + 'g', Math.round(calories / 6) + ' kcal'],
      ],
      collapsible: true,
    },
    sensitivity: [{
      variable: 'calories', label: 'Calorie Target', unit: 'kcal',
      range: sensCals, values: sensProt, currentIdx: sensCalIdx, resultLabel: 'Protein (g)',
    }],
  };
};

export const calcPregnancy: CalcFunction = (v) => {
  if (!v.lmp) return { main: { label: "Error", value: "Select date" } };
  const lmp = new Date(v.lmp as string);
  const due = new Date(lmp.getTime() + 280 * 86400000);
  const today = new Date();
  const weeks = Math.min(40, Math.max(0, Math.floor((today.getTime() - lmp.getTime()) / (7 * 86400000))));
  const daysLeft = Math.max(0, Math.ceil((due.getTime() - today.getTime()) / 86400000));
  const tri = weeks < 13 ? "1st Trimester" : weeks < 27 ? "2nd Trimester" : "3rd Trimester";
  // Baby size comparisons
  const babySize = weeks <= 4 ? 'Poppy seed' : weeks <= 8 ? 'Raspberry' : weeks <= 12 ? 'Lime' : weeks <= 16 ? 'Avocado' : weeks <= 20 ? 'Banana' : weeks <= 24 ? 'Corn cob' : weeks <= 28 ? 'Eggplant' : weeks <= 32 ? 'Coconut' : weeks <= 36 ? 'Honeydew melon' : 'Watermelon';
  return {
    main: { label: "Expected Due Date", value: due.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
    secondary: [
      { label: "Weeks Pregnant", value: weeks + " weeks" },
      { label: "Trimester", value: tri },
      { label: "Days Remaining", value: daysLeft + " days" },
      { label: "Baby Size (approx.)", value: babySize },
      { label: "Conception Date", value: new Date(lmp.getTime() + 14 * 86400000).toLocaleDateString('en-IN') },
      { label: "Progress", value: Math.round(weeks / 40 * 100) + "%" },
    ],
    chart: { a: weeks, b: Math.max(0, 40 - weeks), lA: 'Weeks Completed', lB: 'Weeks Remaining' },
    table: {
      title: 'Pregnancy Milestones',
      headers: ['Week', 'Trimester', 'Baby Size', 'Key Development'],
      rows: [
        ['4', '1st', 'Poppy seed', 'Implantation, heart begins forming'],
        ['8', '1st', 'Raspberry', 'All major organs forming, fingers appear'],
        ['12', '1st', 'Lime', 'Vocal cords form, fingernails develop'],
        ['16', '2nd', 'Avocado', 'Gender visible, movement begins'],
        ['20', '2nd', 'Banana', 'Halfway! Kicks felt, hearing develops'],
        ['24', '2nd', 'Corn cob', 'Lungs developing, viability milestone'],
        ['28', '3rd', 'Eggplant', 'Eyes open, brain rapidly growing'],
        ['32', '3rd', 'Coconut', 'Bones hardening, practice breathing'],
        ['36', '3rd', 'Honeydew', 'Lungs nearly mature, head engages'],
        ['40', '3rd', 'Watermelon', 'Full term! Ready for birth'],
      ],
      collapsible: true,
      highlightRows: [Math.min(9, Math.max(0, Math.floor(weeks / 4) - 1))],
    },
  };
};

export const calcIdealWeight: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const gender = String(v.gender || "Male");
  const hIn = (height - 152.4) / 2.54;
  const miller = gender === "Male" ? 56.2 + 1.41 * hIn : 53.1 + 1.36 * hIn;
  const hamwi = gender === "Male" ? 48 + 2.7 * hIn : 45.5 + 2.2 * hIn;
  const robinson = gender === "Male" ? 52 + 1.9 * hIn : 49 + 1.7 * hIn;
  const devine = gender === "Male" ? 50 + 2.3 * hIn : 45.5 + 2.2 * hIn;
  const bmi22 = (22 * (height / 100) ** 2);
  const avg = Math.round((miller + hamwi + robinson + devine) / 4 * 10) / 10;
  return {
    main: { label: "Average Ideal Weight", value: avg + " kg" },
    secondary: [
      { label: "Hamwi Formula", value: hamwi.toFixed(1) + " kg" },
      { label: "Miller Formula", value: miller.toFixed(1) + " kg" },
      { label: "Robinson Formula", value: robinson.toFixed(1) + " kg" },
      { label: "Devine Formula", value: devine.toFixed(1) + " kg" },
      { label: "BMI=22 Target", value: bmi22.toFixed(1) + " kg" },
      { label: "Healthy BMI Range", value: (18.5 * (height / 100) ** 2).toFixed(1) + ' – ' + (24.9 * (height / 100) ** 2).toFixed(1) + ' kg' },
    ],
    chart: {
      labels: ['Hamwi', 'Miller', 'Robinson', 'Devine', 'BMI 22'],
      data: [Math.round(hamwi * 10) / 10, Math.round(miller * 10) / 10, Math.round(robinson * 10) / 10, Math.round(devine * 10) / 10, Math.round(bmi22 * 10) / 10],
    },
  };
};

export const calcOvulation: CalcFunction = (v) => {
  if (!v.lastPeriod) return { main: { label: "Error", value: "Enter last period date" } };
  const lp = new Date(v.lastPeriod as string);
  const cycleLen = Number(v.cycleLen) || 28;
  const luteal = Number(v.luteal) || 14;
  const ovDay = new Date(lp);
  ovDay.setDate(lp.getDate() + cycleLen - luteal);
  const fertStart = new Date(ovDay);
  fertStart.setDate(ovDay.getDate() - 5);
  const fertEnd = new Date(ovDay);
  fertEnd.setDate(ovDay.getDate() + 1);
  const nextPeriod = new Date(lp);
  nextPeriod.setDate(lp.getDate() + cycleLen);
  const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return {
    main: { label: "Ovulation Day (est.)", value: fmt(ovDay) },
    secondary: [
      { label: "Fertile Window", value: fmt(fertStart) + " to " + fmt(fertEnd) },
      { label: "Next Period (est.)", value: fmt(nextPeriod) },
      { label: "Cycle Day of Ovulation", value: (cycleLen - luteal).toString() },
      { label: "Days Until Ovulation", value: Math.ceil((ovDay.getTime() - new Date().getTime()) / 86400000) + " days" }
    ]
  };
};

export const calcBloodPressure: CalcFunction = (v) => {
  const s = Number(v.systolic) || 120;
  const d = Number(v.diastolic) || 80;
  let cat = "", risk = "", advice = "";
  // ACC/AHA 2017 Guidelines — check from highest to lowest severity
  // Key fix: Use OR for severity (either number crossing threshold = that stage)
  if (s >= 180 || d >= 120) {
    cat = "Hypertensive Crisis";
    risk = "Very High";
    advice = "Seek emergency care immediately";
  } else if (s >= 140 || d >= 90) {
    cat = "Hypertension Stage 2";
    risk = "High";
    advice = "See a doctor promptly";
  } else if (s >= 130 || d >= 80) {
    cat = "Hypertension Stage 1";
    risk = "Moderate–High";
    advice = "Lifestyle change + possible medication";
  } else if (s >= 120 && d < 80) {
    cat = "Elevated";
    risk = "Moderate";
    advice = "Diet, exercise, reduce sodium";
  } else if (s < 90 || d < 60) {
    cat = "Low (Hypotension)";
    risk = "Low–Moderate";
    advice = "Consult a doctor if dizzy or fatigued";
  } else {
    cat = "Normal";
    risk = "Low";
    advice = "Maintain healthy lifestyle";
  }
  const pp = s - d;
  const map = Math.round(d + pp / 3);
  const ppRisk = pp > 60 ? 'Widened (cardiovascular risk) ⚠️' : pp < 30 ? 'Narrow (possible valve issue) ⚠️' : 'Normal ✓';
  const mapRisk = map < 70 ? 'Low (hypoperfusion risk)' : map > 100 ? 'Elevated' : 'Normal ✓';
  return {
    main: { label: "BP Classification", value: cat },
    secondary: [
      { label: "Risk Level", value: risk },
      { label: "Advice", value: advice },
      { label: "Pulse Pressure", value: pp + " mmHg — " + ppRisk },
      { label: "Mean Arterial Pressure (MAP)", value: map + " mmHg — " + mapRisk },
      { label: "Systolic", value: s + " mmHg" },
      { label: "Diastolic", value: d + " mmHg" },
    ],
    chart: {
      labels: ['Systolic', 'Diastolic', 'Normal Sys (120)', 'Normal Dia (80)'],
      data: [s, d, 120, 80],
    },
    table: {
      title: 'Blood Pressure Classification (ACC/AHA 2017)',
      headers: ['Category', 'Systolic (mmHg)', 'Diastolic (mmHg)', 'Action'],
      rows: [
        ['Low (Hypotension)', '< 90', '< 60', 'Consult if symptomatic'],
        ['Normal', '< 120', '< 80', 'Maintain healthy lifestyle'],
        ['Elevated', '120–129', '< 80', 'Lifestyle changes recommended'],
        ['Stage 1 Hypertension', '130–139', '80–89', 'Lifestyle + possible medication'],
        ['Stage 2 Hypertension', '≥ 140', '≥ 90', 'Medication + lifestyle changes'],
        ['Hypertensive Crisis', '> 180', '> 120', 'Emergency medical care'],
      ],
      collapsible: true,
      highlightRows: [s < 90 || d < 60 ? 0 : s < 120 && d < 80 ? 1 : s < 130 && d < 80 ? 2 : s < 140 || d < 90 ? 3 : s < 180 && d < 120 ? 4 : 5],
    },
  };
};

export const calcAlcohol: CalcFunction = (v) => {
  const drinks = Number(v.drinks) || 0;
  const weight = Number(v.weight) || 70;
  const hours = Number(v.hours) || 0;
  const gender = String(v.gender || "Male");
  const r = gender === "Male" ? 0.68 : 0.55;
  const bac = (drinks * 14 * 0.806) / (weight * 1000 * r) * 100;
  const current = Math.max(0, bac - 0.015 * hours);
  const soberIn = current > 0 ? current / 0.015 : 0;
  const effect = current < 0.02 ? "Sober" : current < 0.05 ? "Mild Impairment" : current < 0.08 ? "Moderate Impairment" : "Significant Impairment — Do Not Drive";
  return {
    main: { label: "Est. BAC", value: current.toFixed(3) + "%" },
    secondary: [
      { label: "Effect", value: effect },
      { label: "Sober in", value: soberIn > 0 ? soberIn.toFixed(1) + " hrs" : "Already sober" },
      { label: "Legal limit (India)", value: "0.03%" }
    ]
  };
};

export const calcWaistHip: CalcFunction = (v) => {
  const waist = Number(v.waist) || 80;
  const hip = Number(v.hip) || 90;
  const gender = String(v.gender || "Male");
  const ratio = waist / hip;
  const low = gender === "Male" ? 0.90 : 0.80;
  const mod = gender === "Male" ? 0.95 : 0.85;
  const risk = ratio <= low ? "Low Risk" : ratio <= mod ? "Moderate Risk" : "High Risk";
  return {
    main: { label: "Waist-to-Hip Ratio", value: ratio.toFixed(3) },
    secondary: [
      { label: "Risk Category", value: risk },
      { label: "Low Risk Threshold", value: "≤ " + low },
      { label: "High Risk Threshold", value: "> " + mod },
      { label: "Ideal Waist", value: "< " + Math.round(hip * low) + " cm" },
      { label: "Waist to Reduce", value: ratio > low ? Math.round(waist - hip * low) + " cm" : "Already at healthy level ✓" },
    ],
    chart: { a: Math.round(waist), b: Math.round(hip), lA: 'Waist (cm)', lB: 'Hip (cm)' },
  };
};

export const calcIBW: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const gender = String(v.gender || "Male");
  const frame = String(v.frame || "Medium");
  const hIn = (height - 152.4) / 2.54;
  const frameAdj: Record<string, number> = { Small: -10, Medium: 0, Large: 10 };
  const adj = frameAdj[frame] !== undefined ? frameAdj[frame] : 0;
  const devine = gender === "Male" ? 50 + 2.3 * hIn : 45.5 + 2.2 * hIn;
  const adjusted = devine + devine * adj / 100;
  const rangeLow = (adjusted * 0.9).toFixed(1);
  const rangeHigh = (adjusted * 1.1).toFixed(1);
  return {
    main: { label: "Ideal Weight (Devine)", value: adjusted.toFixed(1) + " kg" },
    secondary: [
      { label: "Healthy Range", value: rangeLow + " – " + rangeHigh + " kg" },
      { label: "BMI 22 Target", value: (22 * (height / 100) ** 2).toFixed(1) + " kg" },
      { label: "Frame Adjustment", value: (adj >= 0 ? "+" : "") + adj + "%" }
    ]
  };
};

export const calcVitamins: CalcFunction = (v) => {
  const sunExposure = String(v.sunExposure || "None (<5 min)");
  const skinTone = String(v.skinTone || "Medium");
  const age = Number(v.age) || 30;
  const sunBase: Record<string, number> = { "None (<5 min)": 0, "Low (5-15 min)": 10, "Moderate (15-30 min)": 25, "Good (30+ min)": 40 };
  const skinMult: Record<string, number> = { "Very Fair": 1.5, "Fair": 1.2, "Medium": 1.0, "Dark": 0.7, "Very Dark": 0.5 };
  const ageMult = age > 70 ? 0.5 : age > 50 ? 0.75 : 1.0;
  const score = (sunBase[sunExposure] !== undefined ? sunBase[sunExposure] : 0) *
                (skinMult[skinTone] !== undefined ? skinMult[skinTone] : 1.0) *
                ageMult;
  const level = score < 10 ? "Deficient (<20 ng/mL)" : score < 25 ? "Insufficient (20-30 ng/mL)" : "Likely Sufficient (>30 ng/mL)";
  const supp = score < 10 ? "4000 IU/day" : score < 25 ? "2000 IU/day" : "Maintain 1000 IU/day";
  return {
    main: { label: "Estimated Status", value: level },
    secondary: [
      { label: "Suggested Supplement", value: supp },
      { label: "Optimal Range", value: "40-60 ng/mL" },
      { label: "Note", value: "Get a blood test for accuracy" }
    ]
  };
};

export const calcLungCapacity: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const age = Number(v.age) || 30;
  const gender = String(v.gender || "Male");
  const fvc = gender === "Male"
    ? (0.057 * height - 0.022 * age - 4.241)
    : (0.041 * height - 0.018 * age - 2.690);
  const fev1 = fvc * (age < 40 ? 0.85 : 0.78);
  const ratio = (fev1 / fvc) * 100;
  const normalFvc = gender === "Male" ? 5.0 : 3.75;
  const lungStatus = ratio > 80 ? 'Normal' : ratio > 70 ? 'Mild Obstruction' : ratio > 60 ? 'Moderate Obstruction' : 'Severe Obstruction';
  return {
    main: { label: "Predicted FVC", value: fvc.toFixed(2) + " L" },
    secondary: [
      { label: "Predicted FEV1", value: fev1.toFixed(2) + " L" },
      { label: "FEV1/FVC Ratio", value: ratio.toFixed(1) + "%" },
      { label: "Airway Status", value: lungStatus },
      { label: "Normal Range (FVC)", value: gender === "Male" ? "4.0–6.0 L" : "3.0–4.5 L" },
      { label: "Normal FEV1/FVC", value: "> 70% (below may indicate COPD)" },
    ],
    chart: { a: Math.round(fvc * 100) / 100, b: Math.round(Math.max(0, normalFvc - fvc) * 100) / 100, lA: 'Your FVC (L)', lB: 'vs Average (L)' },
  };
};

export const calcBodyFat: CalcFunction = (v) => {
  const gender = String(v.gender || "Male");
  const waist = Number(v.waist_bf) || 80;
  const neck = Number(v.neck_bf) || 38;
  const height = Number(v.height_bf) || 170;
  const hip = Number(v.hip_bf) || 90;
  const weight = Number(v.weight_bf) || 70; // FIX: Use actual weight input
  let bf = 0;
  if (gender === "Male") {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  bf = Math.max(3, Math.min(60, bf));
  const cat = gender === "Male"
    ? (bf < 6 ? "Essential Fat" : bf < 14 ? "Athletes" : bf < 18 ? "Fitness" : bf < 25 ? "Average" : "Obese")
    : (bf < 14 ? "Essential Fat" : bf < 21 ? "Athletes" : bf < 25 ? "Fitness" : bf < 32 ? "Average" : "Obese");
  // FIX: Use actual user weight instead of hardcoded 70kg
  const fatMass = weight * bf / 100;
  const leanMass = weight * (1 - bf / 100);
  const ffmi = leanMass / Math.pow(height / 100, 2);
  return {
    main: { label: "Estimated Body Fat", value: bf.toFixed(1) + "%" },
    secondary: [
      { label: "Category", value: cat },
      { label: "Fat Mass", value: fatMass.toFixed(1) + " kg" },
      { label: "Lean Mass", value: leanMass.toFixed(1) + " kg" },
      { label: "FFMI", value: ffmi.toFixed(1) + (ffmi > 25 ? " (near genetic limit)" : "") },
      { label: "Healthy Range", value: gender === "Male" ? "10–20%" : "18–28%" },
      { label: "Lean-to-Fat Ratio", value: (leanMass / fatMass).toFixed(1) + ":1" },
      { label: "Competition Readiness", value: gender === 'Male' ? (bf < 8 ? 'Stage Ready ✓' : bf < 12 ? 'Prep Phase' : bf < 15 ? 'Off-Season Lean' : 'Not Contest Ready') : (bf < 15 ? 'Stage Ready ✓' : bf < 20 ? 'Prep Phase' : bf < 24 ? 'Off-Season Lean' : 'Not Contest Ready') },
    ],
    chart: { a: Math.round(leanMass * 10) / 10, b: Math.round(fatMass * 10) / 10, lA: 'Lean Mass (kg)', lB: 'Fat Mass (kg)' },
    table: {
      title: 'Body Fat Percentage Categories',
      headers: ['Category', 'Men (%)', 'Women (%)', 'Description'],
      rows: [
        ['Essential Fat', '2–5%', '10–13%', 'Minimum for survival'],
        ['Athletes', '6–13%', '14–20%', 'Competitive fitness level'],
        ['Fitness', '14–17%', '21–24%', 'Active & healthy'],
        ['Average', '18–24%', '25–31%', 'Acceptable range'],
        ['Obese', '25%+', '32%+', 'Health risk zone'],
      ],
      collapsible: true,
      highlightRows: gender === 'Male'
        ? [bf < 6 ? 0 : bf < 14 ? 1 : bf < 18 ? 2 : bf < 25 ? 3 : 4]
        : [bf < 14 ? 0 : bf < 21 ? 1 : bf < 25 ? 2 : bf < 32 ? 3 : 4],
    },
    sensitivity: [{
      variable: 'waist', label: 'Waist Circumference', unit: 'cm',
      range: [waist - 6, waist - 4, waist - 2, waist, waist + 2, waist + 4, waist + 6].map(Math.round),
      values: [waist - 6, waist - 4, waist - 2, waist, waist + 2, waist + 4, waist + 6].map(w => {
        let bfEst;
        if (gender === 'Male') bfEst = 495 / (1.0324 - 0.19077 * Math.log10(w - neck) + 0.15456 * Math.log10(height)) - 450;
        else bfEst = 495 / (1.29579 - 0.35004 * Math.log10(w + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        return Math.round(Math.max(3, Math.min(60, bfEst)) * 10) / 10;
      }),
      currentIdx: 3, resultLabel: 'Body Fat (%)',
    }],
  };
};

export const calcProteinIntake: CalcFunction = (v) => {
  const weight = Number(v.weight_p) || 70;
  const activity = String(v.activity_p || "Sedentary");
  const goal = String(v.goal_p || "Maintain Weight");
  const actMult: Record<string, number> = { Sedentary: 0.8, "Lightly Active": 1.0, "Moderately Active": 1.2, "Very Active": 1.5, Athlete: 1.8 };
  const goalMult: Record<string, number> = { "Maintain Weight": 1.0, "Lose Fat": 1.2, "Build Muscle": 1.6, "Maximum Muscle": 2.0 };
  const base = weight * (actMult[activity] || 1.0) * (goalMult[goal] || 1.0);
  const minP = weight * 0.8, maxP = weight * 2.2;
  return {
    main: { label: "Daily Protein Target", value: Math.round(base) + "g" },
    secondary: [
      { label: "Per Meal (3 meals)", value: Math.round(base / 3) + "g" },
      { label: "Per Meal (4 meals)", value: Math.round(base / 4) + "g" },
      { label: "Per Meal (5 meals)", value: Math.round(base / 5) + "g" },
      { label: "Minimum (sedentary RDA)", value: Math.round(minP) + "g" },
      { label: "Maximum (advanced training)", value: Math.round(maxP) + "g" },
      { label: "Calories from Protein", value: Math.round(base * 4) + " kcal" },
      { label: "% of 2000 kcal diet", value: Math.round(base * 4 / 2000 * 100) + "%" },
    ],
    chart: { a: Math.round(base * 4), b: Math.round(2000 - base * 4), lA: 'Protein Calories', lB: 'Remaining Calories' },
  };
};

export const calcSmokingCost: CalcFunction = (v) => {
  const cigsPerDay = Number(v.cigsPerDay) || 0;
  const packPrice = Number(v.packPrice) || 0;
  const yearsSmoked = Number(v.yearsSmoked) || 0;
  const dailyCost = (cigsPerDay / 20) * packPrice;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;
  const totalSpent = yearlyCost * yearsSmoked;
  const investedAt12 = yearsSmoked === 0 ? 0 : yearlyCost * ((Math.pow(1.12, yearsSmoked) - 1) / 0.12);
  // Timeline: cumulative cost over years
  const tlLabels: string[] = [];
  const tlCost: number[] = [];
  const tlInvested: number[] = [];
  for (let y = 1; y <= Math.min(30, Math.max(yearsSmoked, 10)); y += Math.max(1, Math.floor(yearsSmoked / 10))) {
    tlLabels.push('Year ' + y);
    tlCost.push(Math.round(yearlyCost * y));
    tlInvested.push(Math.round(yearlyCost * ((Math.pow(1.12, y) - 1) / 0.12)));
  }
  return {
    main: { label: "Annual Smoking Cost", value: "₹" + Math.round(yearlyCost).toLocaleString() },
    secondary: [
      { label: "Daily Cost", value: "₹" + Math.round(dailyCost).toFixed(0) },
      { label: "Monthly Cost", value: "₹" + Math.round(monthlyCost).toLocaleString() },
      { label: "Total Spent in " + yearsSmoked + " years", value: "₹" + Math.round(totalSpent).toLocaleString() },
      { label: "If invested @12% instead", value: "₹" + Math.round(investedAt12).toLocaleString() },
      { label: "Money Lost to Smoking", value: "₹" + Math.round(investedAt12 - totalSpent).toLocaleString() + " in returns" },
      { label: "Cigarettes in " + yearsSmoked + " years", value: Math.round(cigsPerDay * 365 * yearsSmoked).toLocaleString() }
    ],
    chart: {
      timeline: {
        labels: tlLabels,
        datasets: [
          { label: 'Total Spent (₹)', data: tlCost, fill: true },
          { label: 'If Invested @12% (₹)', data: tlInvested, fill: true },
        ],
      },
    },
    table: {
      title: 'Year-by-Year Cost & Health Recovery After Quitting',
      headers: ['Year', 'Cumulative Spent (₹)', 'If Invested @12% (₹)', 'Health Recovery Milestone'],
      rows: [
        ['Year 1', Math.round(yearlyCost).toLocaleString(), Math.round(yearlyCost).toLocaleString(), '20 min: BP normalizes, 12 hrs: CO drops'],
        ['Year 2', Math.round(yearlyCost * 2).toLocaleString(), Math.round(yearlyCost * ((Math.pow(1.12, 2) - 1) / 0.12)).toLocaleString(), 'Heart disease risk halves'],
        ['Year 5', Math.round(yearlyCost * 5).toLocaleString(), Math.round(yearlyCost * ((Math.pow(1.12, 5) - 1) / 0.12)).toLocaleString(), 'Stroke risk = non-smoker'],
        ['Year 10', Math.round(yearlyCost * 10).toLocaleString(), Math.round(yearlyCost * ((Math.pow(1.12, 10) - 1) / 0.12)).toLocaleString(), 'Lung cancer risk halves'],
        ['Year 15', Math.round(yearlyCost * 15).toLocaleString(), Math.round(yearlyCost * ((Math.pow(1.12, 15) - 1) / 0.12)).toLocaleString(), 'Heart risk = non-smoker'],
        ['Year 20', Math.round(yearlyCost * 20).toLocaleString(), Math.round(yearlyCost * ((Math.pow(1.12, 20) - 1) / 0.12)).toLocaleString(), 'All risks nearly baseline'],
      ],
      collapsible: true,
    },
  };
};

export const calcChildHeight: CalcFunction = (v) => {
  const fatherH = Number(v.fatherH) || 175;
  const motherH = Number(v.motherH) || 162;
  const childGender = String(v.childGender || "Boy");
  const midParent = (fatherH + motherH) / 2;
  const predicted = childGender === "Boy" ? midParent + 6.5 : midParent - 6.5;
  const low = predicted - 8.5, high = predicted + 8.5;
  return {
    main: {
      label: "Predicted Adult Height",
      value: predicted.toFixed(1) + " cm (" + Math.floor(predicted / 2.54 / 12) + "'" + Math.round((predicted / 2.54) % 12) + '\")'
    },
    secondary: [
      { label: "Height Range (±8.5cm)", value: low.toFixed(1) + " – " + high.toFixed(1) + " cm" },
      { label: "Mid-Parent Height", value: midParent.toFixed(1) + " cm" },
      { label: "Father", value: fatherH + " cm" },
      { label: "Mother", value: motherH + " cm" },
      { label: "Note", value: "Genetics accounts for ~80% of adult height" }
    ]
  };
};

export const calcDiabetesRisk: CalcFunction = (v) => {
  const age = Number(v.age_d) || 30;
  const bmi = Number(v.bmi_d) || 22;
  const waist = Number(v.waist_d) || 80;
  const familyHist = String(v.familyHist || "No");
  const physActive = String(v.physActive || "Yes");
  let score = 0;
  if (age >= 40 && age < 50) score += 1; else if (age >= 50 && age < 60) score += 2; else if (age >= 60) score += 3;
  if (bmi >= 25 && bmi < 30) score += 1; else if (bmi >= 30 && bmi < 35) score += 2; else if (bmi >= 35) score += 3;
  if (waist >= 94) score += 1; if (waist >= 102) score += 1;
  if (familyHist === "Parent or Sibling") score += 2; else if (familyHist === "Both Parents") score += 4;
  if (physActive === "No") score += 2;
  const risk = score <= 3 ? "Low" : score <= 8 ? "Moderate" : score <= 12 ? "High" : "Very High";
  const prob = score <= 3 ? "<1%" : score <= 8 ? "1–5%" : score <= 12 ? "5–15%" : ">15%";
  return {
    main: { label: "Diabetes Risk Level", value: risk },
    secondary: [
      { label: "Risk Score", value: score + "/22" },
      { label: "Estimated 10-year Risk", value: prob },
      { label: "Recommended Action", value: risk === "Low" ? "Annual check-up" : risk === "Moderate" ? "Lifestyle changes + HbA1c test" : "See a doctor for full assessment" },
      { label: "Key HbA1c Targets", value: "Normal < 5.7% | Pre-diabetic 5.7–6.4% | Diabetic ≥ 6.5%" },
    ],
    chart: { a: score, b: Math.max(0, 22 - score), lA: 'Your Risk Score', lB: 'Maximum Score (22)' },
  };
};

export const calcSleepDebt: CalcFunction = (v) => {
  const needed = Number(v.needed) || 8;
  const actual = Number(v.actual) || 7;
  const days = Number(v.days) || 7;
  const nightly = needed - actual;
  const total = nightly * days;
  const recoveryDays = Math.ceil(total / 2);
  // Sensitivity: how sleep debt accumulates at different actual sleep hours
  const sensActual = [5, 5.5, 6, 6.5, 7, 7.5, 8];
  const sensDebts = sensActual.map(a => Math.round((needed - a) * days * 10) / 10);
  const sensIdx = sensActual.indexOf(actual) !== -1 ? sensActual.indexOf(actual) : 4;
  return {
    main: { label: "Sleep Debt", value: total.toFixed(1) + " hours" },
    secondary: [
      { label: "Nightly Deficit", value: nightly.toFixed(1) + " hrs/night" },
      { label: "Recovery Plan", value: recoveryDays + " nights of +2hr sleep" },
      { label: "Ideal Bedtime (for 6AM wake)", value: "10:00 PM" },
      { label: "Productivity Impact", value: total > 14 ? "Severe" : total > 7 ? "Moderate" : "Mild" },
      { label: "Health Risk", value: total > 20 ? "High" : total > 10 ? "Moderate" : "Low" },
      { label: "Cognitive Impairment", value: total > 16 ? "Equivalent to 0.1% BAC" : total > 8 ? "Noticeable" : "Minimal" },
    ],
    chart: { a: Math.round(actual * days * 10) / 10, b: Math.round(total * 10) / 10, lA: 'Actual Sleep (hrs)', lB: 'Sleep Debt (hrs)' },
    sensitivity: [{
      variable: 'actual', label: 'Hours of Sleep', unit: 'hrs',
      range: sensActual, values: sensDebts, currentIdx: sensIdx, resultLabel: 'Sleep Debt (hrs)',
    }],
  };
};

export const calcAnemia: CalcFunction = (v) => {
  const gender = String(v.gender_a || "Male");
  const hb = Number(v.hb) || 14;
  const thresholds: Record<string, number> = { Male: 13, Female: 12, "Pregnant Woman": 11, "Child (6-12 yr)": 11.5 };
  const normal = thresholds[gender] || 12;
  const diff = hb - normal;
  let severity = "", advice = "";
  if (hb >= normal) {
    severity = "Normal";
    advice = "Hemoglobin is within healthy range";
  } else if (hb >= normal - 1) {
    severity = "Mild Anemia";
    advice = "Increase iron-rich foods (spinach, lentils, meat)";
  } else if (hb >= normal - 3) {
    severity = "Moderate Anemia";
    advice = "See a doctor. Iron supplements likely needed";
  } else {
    severity = "Severe Anemia";
    advice = "Urgent medical attention required";
  }
  return {
    main: { label: "Anemia Status", value: severity },
    secondary: [
      { label: "Your Hemoglobin", value: hb + " g/dL" },
      { label: "Normal for " + gender, value: normal + " g/dL" },
      { label: "Gap", value: diff.toFixed(1) + " g/dL" },
      { label: "Advice", value: advice },
      { label: "Iron-Rich Foods", value: "Spinach, lentils, liver, red meat, chickpeas" },
    ],
    chart: { a: Math.round(hb * 10) / 10, b: Math.round(Math.max(0, normal - hb) * 10) / 10, lA: 'Your Hb (g/dL)', lB: 'Below Normal (g/dL)' },
    table: {
      title: 'Hemoglobin Reference Ranges',
      headers: ['Category', 'Normal Range (g/dL)', 'Mild Anemia', 'Severe'],
      rows: [
        ['Adult Male', '13.0–17.5', '11.0–12.9', '< 8.0'],
        ['Adult Female', '12.0–15.5', '10.0–11.9', '< 8.0'],
        ['Pregnant Woman', '11.0–14.0', '9.0–10.9', '< 7.0'],
        ['Child (6-12 yr)', '11.5–15.5', '10.0–11.4', '< 8.0'],
      ],
      collapsible: true,
    },
  };
};

export const calcBSA: CalcFunction = (v) => {
  const weight = Number(v.weight_bsa) || 70;
  const height = Number(v.height_bsa) || 170;
  const mosteller = Math.sqrt(weight * height / 3600);
  const dubois = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
  const haycock = 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
  const avg = (mosteller + dubois + haycock) / 3;
  return {
    main: { label: "BSA (Mosteller)", value: mosteller.toFixed(3) + " m²" },
    secondary: [
      { label: "BSA (DuBois & DuBois)", value: dubois.toFixed(3) + " m²" },
      { label: "BSA (Haycock)", value: haycock.toFixed(3) + " m²" },
      { label: "Average BSA", value: avg.toFixed(3) + " m²" },
      { label: "Normal adult range", value: "1.6–2.0 m²" },
      { label: "Clinical Use", value: "Drug dosing, burn area, cardiac output" },
    ],
    chart: {
      labels: ['Mosteller', 'DuBois', 'Haycock'],
      data: [Math.round(mosteller * 1000) / 1000, Math.round(dubois * 1000) / 1000, Math.round(haycock * 1000) / 1000],
    },
  };
};

export const calcCholesterolRatio: CalcFunction = (v) => {
  const total = Number(v.total) || 200;
  const hdl = Number(v.hdl) || 50;
  const ldl = Number(v.ldl) || 100;
  const triglycerides = Number(v.triglycerides) || 150;
  const totalHdl = total / hdl;
  const ldlHdl = ldl / hdl;
  const nonHdl = total - hdl;
  const vldl = triglycerides / 5;
  const riskTotal = totalHdl < 3.5 ? "Low Risk ✓" : totalHdl < 5 ? "Moderate Risk [!]" : "High Risk [X]";
  const riskLdl = ldlHdl < 2.5 ? "Low Risk ✓" : ldlHdl < 3.5 ? "Moderate Risk [!]" : "High Risk [X]";
  const trigStatus = triglycerides < 150 ? "Normal ✓" : triglycerides < 200 ? "Borderline [!]" : "High [X]";
  // Atherogenic Index
  const atherogenicIdx = Math.log10(triglycerides / hdl);
  const aiRisk = atherogenicIdx < 0.11 ? 'Low Risk ✓' : atherogenicIdx < 0.21 ? 'Intermediate' : 'High Risk [!]';
  return {
    main: { label: "Total/HDL Ratio", value: totalHdl.toFixed(2) + " — " + riskTotal },
    secondary: [
      { label: "LDL/HDL Ratio", value: ldlHdl.toFixed(2) + " — " + riskLdl },
      { label: "Non-HDL Cholesterol", value: nonHdl + " mg/dL" + (nonHdl < 130 ? " ✓" : " [!]") },
      { label: "VLDL (estimated)", value: vldl.toFixed(0) + " mg/dL" },
      { label: "Friedewald LDL (calc)", value: Math.round(total - hdl - triglycerides / 5) + " mg/dL" + (triglycerides > 400 ? " (inaccurate — TG > 400)" : "") },
      { label: "Triglycerides Status", value: trigStatus },
      { label: "Atherogenic Index", value: atherogenicIdx.toFixed(2) + " — " + aiRisk },
      { label: "Healthy Total/HDL", value: "< 3.5 (ideal < 3.0)" },
      { label: "Healthy LDL/HDL", value: "< 2.5" },
      { label: "Target LDL", value: "< 100 mg/dL (optimal)" }
    ],
    chart: {
      labels: ['Total', 'HDL', 'LDL', 'Triglycerides'],
      data: [total, hdl, ldl, triglycerides],
    },
    table: {
      title: 'Cholesterol Reference Ranges',
      headers: ['Marker', 'Optimal', 'Borderline', 'High Risk'],
      rows: [
        ['Total Cholesterol', '< 200 mg/dL', '200–239 mg/dL', '≥ 240 mg/dL'],
        ['HDL (Good)', '≥ 60 mg/dL', '40–59 mg/dL', '< 40 mg/dL'],
        ['LDL (Bad)', '< 100 mg/dL', '130–159 mg/dL', '≥ 160 mg/dL'],
        ['Triglycerides', '< 150 mg/dL', '150–199 mg/dL', '≥ 200 mg/dL'],
        ['Total/HDL Ratio', '< 3.5', '3.5–5.0', '> 5.0'],
      ],
      collapsible: true,
    },
  };
};

export const calcCalorieDeficit: CalcFunction = (v) => {
  const gender = String(v.gender || "Male");
  const weight = Number(v.weight) || 70;
  const height = Number(v.height) || 170;
  const age = Number(v.age) || 30;
  const goalWeight = Number(v.goal_weight) || 60;
  const activity = String(v.activity || "Sedentary");
  const rate = String(v.rate || "0.5");
  const bmr = gender === "Male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const actMult: Record<string, number> = { "Sedentary": 1.2, "Lightly Active": 1.375, "Moderately Active": 1.55, "Very Active": 1.725 };
  const tdee = Math.round(bmr * (actMult[activity] || 1.2));
  const lossRate = parseFloat(rate) || 0.5;
  const deficitPerDay = Math.round(lossRate * 7700 / 7);
  const targetCalories = Math.max(1200, tdee - deficitPerDay);
  const actualDeficit = tdee - targetCalories;
  const weightToLose = weight - goalWeight;
  const weeksNeeded = Math.ceil(weightToLose / lossRate);
  const daysNeeded = weeksNeeded * 7;
  const goalDate = new Date(Date.now() + daysNeeded * 86400000);
  // Timeline projection
  const timelineLabels: string[] = [];
  const timelineWeights: number[] = [];
  const timelineCalories: number[] = [];
  const step = Math.max(1, Math.floor(weeksNeeded / 12));
  for (let w = 0; w <= weeksNeeded && timelineLabels.length <= 12; w += step) {
    timelineLabels.push('Week ' + w);
    timelineWeights.push(Math.round((weight - lossRate * w) * 10) / 10);
    timelineCalories.push(targetCalories);
  }
  // Sensitivity: how timeline changes with different loss rates
  const sensRates = [0.25, 0.35, 0.5, 0.75, 1.0];
  const sensWeeks = sensRates.map(r => Math.ceil(weightToLose / r));
  const sensIdx = sensRates.indexOf(lossRate) !== -1 ? sensRates.indexOf(lossRate) : 2;
  return {
    main: { label: "Daily Calorie Target", value: targetCalories + " kcal" },
    secondary: [
      { label: "Your TDEE (maintenance)", value: tdee + " kcal/day" },
      { label: "Daily Deficit", value: actualDeficit + " kcal" },
      { label: "Weight to Lose", value: weightToLose.toFixed(1) + " kg" },
      { label: "Time to Goal", value: weeksNeeded + " weeks (" + Math.round(weeksNeeded / 4.3) + " months)" },
      { label: "Goal Date (estimated)", value: goalDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
      { label: "Protein Target", value: Math.round(weight * 2.0) + "g (" + Math.round(weight * 2.0 * 4) + " kcal) — preserves muscle" },
      { label: "Fat Target", value: Math.round(targetCalories * 0.25 / 9) + "g (" + Math.round(targetCalories * 0.25) + " kcal)" },
      { label: "Carb Target", value: Math.round((targetCalories - weight * 2.0 * 4 - targetCalories * 0.25) / 4) + "g (remaining)" },
      { label: "Refeed Day", value: actualDeficit > 500 ? 'Recommended 1×/week at TDEE (' + tdee + ' kcal) to prevent metabolic adaptation' : 'Not needed at moderate deficit' },
      { label: "BMR", value: Math.round(bmr) + " kcal" },
      { label: "Min Safe Calories", value: gender === "Male" ? "1,500 kcal" : "1,200 kcal" }
    ],
    chart: {
      timeline: {
        labels: timelineLabels,
        datasets: [
          { label: 'Projected Weight (kg)', data: timelineWeights, fill: true },
        ],
      },
    },
    table: {
      title: 'Weekly Weight Loss Projection',
      headers: ['Week', 'Projected Weight', 'Total Lost', 'Daily Calories'],
      rows: Array.from({ length: Math.min(12, weeksNeeded) }, (_, i) => {
        const w = (i + 1) * Math.max(1, Math.floor(weeksNeeded / 12));
        const projected = Math.round((weight - lossRate * w) * 10) / 10;
        return ['Week ' + w, projected + ' kg', (lossRate * w).toFixed(1) + ' kg', targetCalories + ' kcal'];
      }),
      collapsible: true,
    },
    sensitivity: [{
      variable: 'rate', label: 'Weight Loss Rate', unit: 'kg/week',
      range: sensRates, values: sensWeeks, currentIdx: sensIdx, resultLabel: 'Weeks to Goal',
    }],
  };
};

export const calcOneRepMax: CalcFunction = (v) => {
  const w = Number(v.weightLifted) || 0;
  const r = Number(v.repsPerformed) || 1;
  const epley = w * (1 + r / 30);
  const brzycki = w * (36 / (37 - r));
  const lombardi = w * Math.pow(r, 0.1);
  const oconner = w * (1 + r * 0.025);
  const avg = Math.round((epley + brzycki + lombardi + oconner) / 4);
  return {
    main: { label: "Estimated 1RM", value: avg + " kg" },
    secondary: [
      { label: "Epley Formula", value: Math.round(epley) + " kg" },
      { label: "Brzycki Formula", value: Math.round(brzycki) + " kg" },
      { label: "Lombardi Formula", value: Math.round(lombardi) + " kg" },
      { label: "O'Conner Formula", value: Math.round(oconner) + " kg" },
      { label: "Exercise", value: String(v.exercise) }
    ],
    table: {
      title: 'Training Load Chart',
      headers: ['% of 1RM', 'Weight (kg)', 'Rep Range', 'Training Goal'],
      rows: [
        ['100%', avg + ' kg', '1 rep', 'Max Strength Test'],
        ['95%', Math.round(avg * 0.95) + ' kg', '1–2 reps', 'Peaking / Competition'],
        ['90%', Math.round(avg * 0.90) + ' kg', '2–3 reps', 'Strength'],
        ['85%', Math.round(avg * 0.85) + ' kg', '3–5 reps', 'Strength & Power'],
        ['80%', Math.round(avg * 0.80) + ' kg', '5–8 reps', 'Hypertrophy (heavy)'],
        ['75%', Math.round(avg * 0.75) + ' kg', '8–10 reps', 'Hypertrophy'],
        ['70%', Math.round(avg * 0.70) + ' kg', '10–12 reps', 'Hypertrophy (light)'],
        ['60%', Math.round(avg * 0.60) + ' kg', '12–15 reps', 'Endurance'],
        ['50%', Math.round(avg * 0.50) + ' kg', '15–20 reps', 'Warm-up / Endurance'],
      ],
      collapsible: true,
      highlightRows: [4],
    },
  };
};

export const calcRunningPace: CalcFunction = (v) => {
  const distanceKm = Number(v.distanceKm) || 5;
  const timeMin = Number(v.timeMin) || 30;
  const targetDist = String(v.targetDist || "5K");
  const customDistKm = Number(v.customDistKm) || 5;
  const pace = timeMin / distanceKm;
  const speedKmh = distanceKm / (timeMin / 60);
  const targetDistMap: Record<string, number> = { "5K": 5, "10K": 10, "Half Marathon (21.1K)": 21.1, "Marathon (42.2K)": 42.195, "Custom": customDistKm };
  const td = targetDistMap[targetDist] || customDistKm;
  const predictedTime = timeMin * Math.pow(td / distanceKm, 1.06);
  const predH = Math.floor(predictedTime / 60);
  const predM = Math.floor(predictedTime % 60);
  const predS = Math.round((predictedTime % 1) * 60);
  const paceM = Math.floor(pace);
  const paceS = Math.round((pace - paceM) * 60);
  const fmtTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const s = Math.round((mins % 1) * 60);
    return (h > 0 ? h + 'h ' : '') + m + 'm ' + s + 's';
  };
  // Predicted times for bar chart
  const pred5k = Math.round(timeMin * Math.pow(5 / distanceKm, 1.06));
  const pred10k = Math.round(timeMin * Math.pow(10 / distanceKm, 1.06));
  const predHalf = Math.round(timeMin * Math.pow(21.1 / distanceKm, 1.06));
  const predFull = Math.round(timeMin * Math.pow(42.195 / distanceKm, 1.06));
  // Sensitivity: pace at different distances
  const sensDists = [3, 5, 10, 15, 21.1, 42.195];
  const sensLabels = ['3K', '5K', '10K', '15K', 'Half', 'Marathon'];
  const sensPaces = sensDists.map(d => Math.round(timeMin * Math.pow(d / distanceKm, 1.06) / d * 100) / 100);
  const sensIdx = sensDists.indexOf(distanceKm) !== -1 ? sensDists.indexOf(distanceKm) : 1;
  return {
    main: { label: "Pace", value: paceM + ":" + String(paceS).padStart(2, '0') + " min/km" },
    secondary: [
      { label: "Speed", value: speedKmh.toFixed(1) + " km/h" },
      { label: "Predicted " + targetDist + " Time", value: (predH > 0 ? predH + "h " : "") + predM + "m " + predS + "s" },
      { label: "Calories/km (est.)", value: Math.round(speedKmh > 8 ? 1.0 * 70 : 0.7 * 70) + " kcal" },
    ],
    chart: {
      labels: ['5K', '10K', 'Half Marathon', 'Marathon'],
      data: [pred5k, pred10k, predHalf, predFull],
    },
    table: {
      title: 'Race Predictions (Riegel Formula)',
      headers: ['Race', 'Distance', 'Predicted Time', 'Avg Pace'],
      rows: [
        ['5K', '5 km', fmtTime(timeMin * Math.pow(5 / distanceKm, 1.06)), Math.floor(timeMin * Math.pow(5 / distanceKm, 1.06) / 5) + ':' + String(Math.round((timeMin * Math.pow(5 / distanceKm, 1.06) / 5 % 1) * 60)).padStart(2, '0') + ' /km'],
        ['10K', '10 km', fmtTime(timeMin * Math.pow(10 / distanceKm, 1.06)), Math.floor(timeMin * Math.pow(10 / distanceKm, 1.06) / 10) + ':' + String(Math.round((timeMin * Math.pow(10 / distanceKm, 1.06) / 10 % 1) * 60)).padStart(2, '0') + ' /km'],
        ['Half Marathon', '21.1 km', fmtTime(timeMin * Math.pow(21.1 / distanceKm, 1.06)), Math.floor(timeMin * Math.pow(21.1 / distanceKm, 1.06) / 21.1) + ':' + String(Math.round((timeMin * Math.pow(21.1 / distanceKm, 1.06) / 21.1 % 1) * 60)).padStart(2, '0') + ' /km'],
        ['Marathon', '42.2 km', fmtTime(timeMin * Math.pow(42.195 / distanceKm, 1.06)), Math.floor(timeMin * Math.pow(42.195 / distanceKm, 1.06) / 42.195) + ':' + String(Math.round((timeMin * Math.pow(42.195 / distanceKm, 1.06) / 42.195 % 1) * 60)).padStart(2, '0') + ' /km'],
      ],
      collapsible: true,
    },
    sensitivity: [{
      variable: 'distance', label: 'Race Distance', unit: '',
      range: sensLabels, values: sensPaces, currentIdx: sensIdx, resultLabel: 'Pace (min/km)',
    }],
  };
};

export const calcBodyRecomp: CalcFunction = (v) => {
  const weight = Number(v.weight_br) || 70;
  const bodyfat = Number(v.bodyfat_br) || 20;
  const targetBf = Number(v.targetBf) || 15;
  const height = Number(v.height_br) || 170; // FIX: Use actual height from input
  const age = Number(v.age_br) || 30;         // FIX: Use actual age from input
  const gender = String(v.gender_br || "Male"); // FIX: Use actual gender from input
  const activity = String(v.activity_br || "Sedentary");
  const lbm = weight * (1 - bodyfat / 100);
  const fatMass = weight * bodyfat / 100;
  const targetFatMass = lbm * targetBf / (100 - targetBf);
  const fatToLose = Math.max(0, fatMass - targetFatMass);
  const actMult: Record<string, number> = { "Sedentary": 1.2, "Light Exercise (1-3 days)": 1.375, "Moderate (3-5 days)": 1.55, "Heavy (6-7 days)": 1.725, "Athlete (2× daily)": 1.9 };
  // FIX: Use actual height, age, and gender instead of hardcoded values
  const bmr = gender === "Male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * (actMult[activity] || 1.55));
  const deficit = Math.round(tdee * 0.15);
  const targetCals = tdee - deficit;
  const protein = Math.round(weight * 2.2);
  const proteinCals = Math.round(protein * 4);
  const carbG = Math.round((targetCals - proteinCals - Math.round(targetCals * 0.25)) / 4);
  const fatG = Math.round(targetCals * 0.25 / 9);
  return {
    main: { label: "Daily Calories for Recomp", value: targetCals + " kcal" },
    secondary: [
      { label: "Fat to Lose", value: fatToLose.toFixed(1) + " kg" },
      { label: "Current Lean Mass", value: lbm.toFixed(1) + " kg" },
      { label: "TDEE", value: tdee + " kcal" },
      { label: "Deficit (15%)", value: deficit + " kcal" },
      { label: "Daily Protein Target", value: protein + "g (" + proteinCals + " kcal)" },
      { label: "Daily Carbs", value: carbG + "g" },
      { label: "Daily Fat", value: fatG + "g" },
      { label: "Timeline (est.)", value: Math.ceil(fatToLose / 0.35) + " weeks at 0.35 kg/week" },
      { label: "Target Weight", value: (lbm + targetFatMass).toFixed(1) + " kg" }
    ],
    chart: {
      labels: ['Protein (' + protein + 'g)', 'Carbs (' + carbG + 'g)', 'Fat (' + fatG + 'g)'],
      data: [proteinCals, carbG * 4, fatG * 9],
    },
  };
};

export const calcVO2Max: CalcFunction = (v) => {
  const method = String(v.method_vo2 || "Cooper 12-min Run");
  const age = Number(v.age_vo2) || 30;
  const restingHR = Number(v.restingHR) || 70;
  const distanceCovered = Number(v.distanceCovered) || 2000;
  const runTime15 = Number(v.runTime15) || 12;
  let vo2 = 0;
  if (method === "Cooper 12-min Run") vo2 = (distanceCovered - 504.9) / 44.73;
  else if (method === "1.5 Mile Run") vo2 = 483 / runTime15 + 3.5;
  else vo2 = 15.3 * (220 - age) / restingHR;
  const rating = vo2 < 30 ? "Poor" : vo2 < 40 ? "Below Average" : vo2 < 50 ? "Good" : vo2 < 60 ? "Excellent" : "Elite";
  const category = vo2 < 35 ? "Low Fitness" : vo2 < 45 ? "Moderate Fitness" : vo2 < 55 ? "Good Fitness" : "High Fitness";
  // Age-adjusted percentile
  const percentile = vo2 >= 60 ? 'Top 1%' : vo2 >= 50 ? 'Top 10%' : vo2 >= 45 ? 'Top 25%' : vo2 >= 40 ? 'Top 50%' : vo2 >= 35 ? 'Bottom 50%' : 'Bottom 25%';
  return {
    main: { label: "Estimated VO2 Max", value: vo2.toFixed(1) + " ml/kg/min" },
    secondary: [
      { label: "Fitness Level", value: rating },
      { label: "Category", value: category },
      { label: "Age-Adjusted Percentile", value: percentile },
      { label: "Method Used", value: method },
      { label: "Marathon Prediction (est.)", value: vo2 > 30 ? Math.round(42.195 / (vo2 * 0.07)) + " min" : "Build base fitness first" },
      { label: "Mortality Benefit", value: "+" + Math.round(Math.max(0, vo2 - 30) * 2.8) + "% reduced risk (vs VO2 30)" },
    ],
    chart: {
      labels: ['Poor (<30)', 'Below Avg (30-40)', 'Good (40-50)', 'Excellent (50-60)', 'Elite (60+)'],
      data: [
        vo2 < 30 ? vo2 : 0,
        vo2 >= 30 && vo2 < 40 ? vo2 : 0,
        vo2 >= 40 && vo2 < 50 ? vo2 : 0,
        vo2 >= 50 && vo2 < 60 ? vo2 : 0,
        vo2 >= 60 ? vo2 : 0,
      ],
    },
  };
};

export const calcLeanBodyMass: CalcFunction = (v) => {
  const weight = Number(v.weight_lbm) || 70;
  const height = Number(v.height_lbm) || 170;
  const bodyfat = Number(v.bodyfat_lbm) || 0;
  const gender = String(v.gender_lbm || "Male");
  let lbm = 0;
  if (bodyfat > 0) {
    lbm = weight * (1 - bodyfat / 100);
  } else {
    if (gender === "Male") lbm = 0.407 * weight + 0.267 * height - 19.2;
    else lbm = 0.252 * weight + 0.473 * height - 48.3;
  }
  const fatMass = weight - lbm;
  const bfPct = (fatMass / weight) * 100;
  const ffmi = lbm / Math.pow(height / 100, 2);
  return {
    main: { label: "Lean Body Mass", value: lbm.toFixed(1) + " kg" },
    secondary: [
      { label: "Fat Mass", value: fatMass.toFixed(1) + " kg" },
      { label: "Body Fat %", value: bfPct.toFixed(1) + "%" },
      { label: "FFMI", value: ffmi.toFixed(1) },
      { label: "FFMI Rating", value: ffmi < 18 ? "Below Average" : ffmi < 20 ? "Average" : ffmi < 22 ? "Above Average" : ffmi < 25 ? "Excellent" : "Near Natural Limit" },
      { label: "Lean-to-Fat Ratio", value: fatMass > 0 ? (lbm / fatMass).toFixed(1) + ":1" : "N/A" },
      { label: "Method", value: bodyfat > 0 ? "Direct (from body fat %)" : "Boer Formula (estimated)" }
    ],
    chart: { a: Math.round(lbm * 10) / 10, b: Math.round(fatMass * 10) / 10, lA: 'Lean Mass (kg)', lB: 'Fat Mass (kg)' },
  };
};

export const calcCalorieGoal: CalcFunction = (v) => {
  const currentWeight = Number(v.currentWeight_cg) || 70;
  const height = Number(v.height_cg) || 170;
  const age = Number(v.age_cg) || 30;
  const targetWeight = Number(v.targetWeight_cg) || 60;
  const weeks = Number(v.weeks_cg) || 12;
  const gender = String(v.gender_cg || "Male");
  const activity = String(v.activity_cg || "Sedentary (desk job)");
  const bmr = gender === "Male"
    ? 10 * currentWeight + 6.25 * height - 5 * age + 5
    : 10 * currentWeight + 6.25 * height - 5 * age - 161;
  const actMult: Record<string, number> = { "Sedentary (desk job)": 1.2, "Light (1-3×/week)": 1.375, "Moderate (3-5×/week)": 1.55, "Active (6-7×/week)": 1.725, "Very Active (2×/day)": 1.9 };
  const tdee = Math.round(bmr * (actMult[activity] || 1.2));
  const weightDiff = currentWeight - targetWeight;
  const totalDeficit = weightDiff * 7700;
  const dailyDeficit = Math.round(totalDeficit / (weeks * 7));
  const targetCals = Math.max(gender === "Male" ? 1500 : 1200, tdee - dailyDeficit);
  const actualDeficit = tdee - targetCals;
  const weeklyLoss = (actualDeficit * 7 / 7700);
  const safeFlag = weeklyLoss > 1 ? "[!] Aggressive" : "[OK] Safe";
  // Timeline: weight trajectory
  const cgLabels: string[] = [];
  const cgWeights: number[] = [];
  const cgStep = Math.max(1, Math.floor(weeks / 10));
  for (let w = 0; w <= weeks; w += cgStep) {
    cgLabels.push('Week ' + w);
    cgWeights.push(Math.round((currentWeight - weeklyLoss * w) * 10) / 10);
  }
  // Sensitivity: how weeks change the deficit
  const sensWks = [8, 12, 16, 20, 24, 30];
  const sensCals = sensWks.map(w => {
    const dd = Math.round(totalDeficit / (w * 7));
    return Math.max(gender === "Male" ? 1500 : 1200, tdee - dd);
  });
  const sensWkIdx = sensWks.indexOf(weeks) !== -1 ? sensWks.indexOf(weeks) : 1;
  return {
    main: { label: "Daily Calorie Target", value: targetCals + " kcal" },
    secondary: [
      { label: "Your TDEE", value: tdee + " kcal" },
      { label: "Required Daily Deficit", value: dailyDeficit + " kcal" },
      { label: "Actual Deficit (adjusted)", value: actualDeficit + " kcal" },
      { label: "Weekly Weight Change", value: weeklyLoss.toFixed(2) + " kg/week" },
      { label: "Safety", value: safeFlag },
      { label: "Weight Change", value: weightDiff > 0 ? weightDiff.toFixed(1) + " kg to lose" : Math.abs(weightDiff).toFixed(1) + " kg to gain" },
      { label: "Est. Completion", value: weeks + " weeks" }
    ],
    chart: {
      timeline: {
        labels: cgLabels,
        datasets: [
          { label: 'Weight Trajectory (kg)', data: cgWeights, fill: true },
        ],
      },
    },
    table: {
      title: 'Weekly Calorie & Weight Targets',
      headers: ['Week', 'Target Calories', 'Expected Weight', 'Deficit/Day'],
      rows: Array.from({ length: Math.min(10, weeks) }, (_, i) => {
        const wk = (i + 1) * Math.max(1, Math.floor(weeks / 10));
        const wt = Math.round((currentWeight - weeklyLoss * wk) * 10) / 10;
        return ['Week ' + wk, targetCals + ' kcal', wt + ' kg', actualDeficit + ' kcal'];
      }),
      collapsible: true,
    },
    sensitivity: [{
      variable: 'weeks', label: 'Timeline (weeks)', unit: 'weeks',
      range: sensWks, values: sensCals, currentIdx: sensWkIdx, resultLabel: 'Daily Calories (kcal)',
    }],
  };
};

export const calcElectrolyte: CalcFunction = (v) => {
  const weight = Number(v.weight_el) || 70;
  const exerciseMin = Number(v.exerciseMin) || 0;
  const climate = String(v.climate || "Temperate (20-25°C)");
  const caffeine = String(v.caffeine || "None");
  const sweatRate = String(v.sweatRate || "Moderate");
  const baseWater = weight * 35;
  const exerciseWater = exerciseMin * 12;
  const climateMult: Record<string, number> = { "Temperate (20-25°C)": 1.0, "Hot & Humid (30°C+)": 1.3, "Cold (below 15°C)": 0.9, "High Altitude": 1.2 };
  const caffeineMult: Record<string, number> = { "None": 1.0, "1-2 cups": 1.05, "3-4 cups": 1.10, "5+ cups": 1.15 };
  const totalWater = Math.round((baseWater + exerciseWater) * (climateMult[climate] || 1) * (caffeineMult[caffeine] || 1));
  const sweatMult: Record<string, number> = { "Low (light sweater)": 1.0, Moderate: 1.3, Heavy: 1.6 };
  const sodium = Math.round(2300 * (sweatMult[sweatRate] || 1));
  const potassium = Math.round(3500 * (sweatMult[sweatRate] || 1) * 0.8);
  const magnesium = Math.round(400 * (sweatMult[sweatRate] || 1) * 0.9);
  return {
    main: { label: "Daily Water Intake", value: (totalWater / 1000).toFixed(1) + " liters (" + totalWater + " ml)" },
    secondary: [
      { label: "Glasses (250ml)", value: Math.ceil(totalWater / 250) + " glasses" },
      { label: "Sodium", value: sodium + " mg" },
      { label: "Potassium", value: potassium + " mg" },
      { label: "Magnesium", value: magnesium + " mg" },
      { label: "Exercise Hydration", value: exerciseWater + " ml extra" },
      { label: "Climate Factor", value: climate },
      { label: "Hourly Target", value: Math.round(totalWater / 16) + " ml/hour (waking)" },
    ],
    chart: {
      labels: ['Water (mL)', 'Sodium (mg)', 'Potassium (mg)', 'Magnesium (mg)'],
      data: [Math.round(totalWater / 10), sodium, potassium, magnesium],
    },
    table: {
      title: 'Daily Electrolyte Requirements',
      headers: ['Electrolyte', 'Your Target', 'RDA', 'Key Sources'],
      rows: [
        ['Sodium', sodium + ' mg', '2,300 mg', 'Salt, pickles, cheese'],
        ['Potassium', potassium + ' mg', '3,500 mg', 'Bananas, potatoes, coconut water'],
        ['Magnesium', magnesium + ' mg', '400 mg', 'Nuts, dark chocolate, spinach'],
        ['Calcium', '1,000 mg', '1,000 mg', 'Dairy, ragi, tofu'],
      ],
      collapsible: true,
    },
  };
};

export const calcIntermittentFasting: CalcFunction = (v) => {
  const protocolMap: Record<string, { fast: number; eat: number }> = {
    "16:8": { fast: 16, eat: 8 },
    "18:6": { fast: 18, eat: 6 },
    "20:4": { fast: 20, eat: 4 },
    "OMAD (23:1)": { fast: 23, eat: 1 }
  };
  const if_protocol = String(v.if_protocol || "16:8");
  const protocol = protocolMap[if_protocol] || { fast: 16, eat: 8 };
  const eatStart = String(v.if_eatStart || "12:00");
  const parts = eatStart.split(':');
  const eatStartH = parseInt(parts[0]) || 12, eatStartM = parseInt(parts[1]) || 0;
  const eatStartMin = eatStartH * 60 + eatStartM;
  const eatEndMin = eatStartMin + protocol.eat * 60;
  const fastEndMin = eatStartMin;
  const fastStartMin = eatEndMin;
  const formatTime = (mins: number) => {
    const m = (mins + 1440) % 1440;
    const h = Math.floor(m / 60), mm = m % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return h12 + ":" + String(mm).padStart(2, '0') + " " + ampm;
  };
  const wakeTime = String(v.if_wakeTime || "07:00");
  const wakeParts = wakeTime.split(':');
  const wakeMin = (parseInt(wakeParts[0]) || 7) * 60 + (parseInt(wakeParts[1]) || 0);
  const hoursToFirstMeal = ((eatStartMin - wakeMin) + 1440) % 1440 / 60;
  return {
    main: { label: "Eating Window", value: formatTime(eatStartMin) + " → " + formatTime(eatEndMin) },
    secondary: [
      { label: "Fasting Window", value: formatTime(fastStartMin) + " → " + formatTime(fastEndMin) },
      { label: "Protocol", value: if_protocol + " (" + protocol.fast + "h fast, " + protocol.eat + "h eat)" },
      { label: "Fasting Hours", value: protocol.fast + " hours" },
      { label: "Eating Hours", value: protocol.eat + " hours" },
      { label: "First Meal After Waking", value: hoursToFirstMeal.toFixed(1) + " hours" },
      { label: "Last Meal", value: formatTime(eatEndMin) },
      { label: "Allowed During Fast", value: "Water, black coffee, green tea" },
      { label: "Tip", value: protocol.fast >= 20 ? "Very advanced — consult a doctor" : "Stay hydrated during fasting window" }
    ],
    chart: { a: protocol.eat, b: protocol.fast, lA: 'Eating Window (hrs)', lB: 'Fasting Window (hrs)' },
  };
};

export const calcWaistHeightRatio: CalcFunction = (v) => {
  const waist = Number(v.whr_waist) || 80;
  const height = Number(v.whr_height) || 170;
  const ratio = waist / height;
  let category = "", risk = "", action = "";
  if (ratio < 0.4) {
    category = "Very Lean";
    risk = "Low";
    action = "Maintain current lifestyle";
  } else if (ratio < 0.5) {
    category = "Healthy";
    risk = "Low";
    action = "[OK] Excellent — keep it up";
  } else if (ratio < 0.54) {
    category = "Slightly Overweight";
    risk = "Moderate";
    action = "Increase physical activity";
  } else if (ratio < 0.58) {
    category = "Overweight";
    risk = "Increased";
    action = "Diet + exercise recommended";
  } else if (ratio < 0.63) {
    category = "Very Overweight";
    risk = "High";
    action = "Significant lifestyle changes needed";
  } else {
    category = "Obese";
    risk = "Very High";
    action = "Consult a doctor immediately";
  }
  const idealWaist = Math.round(height * 0.49);
  const waistToLose = Math.max(0, waist - idealWaist);
  return {
    main: { label: "Waist-to-Height Ratio", value: ratio.toFixed(3) },
    secondary: [
      { label: "Category", value: category },
      { label: "Health Risk", value: risk },
      { label: "Action", value: action },
      { label: "Your Waist", value: waist + " cm" },
      { label: "Your Height", value: height + " cm" },
      { label: "Ideal Waist (WHtR < 0.5)", value: idealWaist + " cm" },
      { label: "Waist to Reduce", value: waistToLose > 0 ? waistToLose + " cm" : "Already at healthy level [OK]" },
      { label: 'Universal Boundary', value: 'Keep waist < half your height' }
    ],
    chart: { a: Math.round(idealWaist), b: Math.round(Math.max(0, waist - idealWaist)), lA: 'Ideal Waist (cm)', lB: 'Excess (cm)' },
  };
};

/* ── Pregnancy Weight Gain Tracker ────────────────── */
export const calcPregnancyWeight: CalcFunction = (v) => {
  const preWeight = Number(v.preWeight) || 60;
  const currentWeight = Number(v.currentWeight) || 65;
  const weeks = Number(v.weeks) || 20;
  const twins = String(v.twins || 'Single');
  const height = Number(v.height_pw) || 160;

  const bmiPre = preWeight / Math.pow(height / 100, 2);
  let recLow: number, recHigh: number;
  if (twins === 'Twins') { recLow = 17; recHigh = 25; }
  else if (bmiPre < 18.5) { recLow = 12.5; recHigh = 18; }
  else if (bmiPre < 25) { recLow = 11.5; recHigh = 16; }
  else if (bmiPre < 30) { recLow = 7; recHigh = 11.5; }
  else { recLow = 5; recHigh = 9; }

  const gained = currentWeight - preWeight;
  const expectedAtWeek = weeks <= 13 ? recLow * weeks / 40 : recLow * 13 / 40 + (recLow + recHigh) / 2 * (weeks - 13) / 27;
  const status = gained < expectedAtWeek * 0.8 ? 'Below range — eat more ⚠️' : gained > expectedAtWeek * 1.3 ? 'Above range — consult doctor ⚠️' : 'On track ✓';
  const weeklyTarget = weeks > 13 ? ((recLow + recHigh) / 2 / 27).toFixed(2) : '0.5–1.0';

  return {
    main: { label: 'Weight Gained', value: gained.toFixed(1) + ' kg' },
    secondary: [
      { label: 'Status', value: status },
      { label: 'Pre-pregnancy BMI', value: bmiPre.toFixed(1) },
      { label: 'Recommended Total Gain', value: `${recLow}–${recHigh} kg` },
      { label: 'Expected at Week ' + weeks, value: expectedAtWeek.toFixed(1) + ' kg' },
      { label: 'Weekly Target (2nd/3rd tri)', value: weeklyTarget + ' kg/week' },
      { label: 'Current Week', value: 'Week ' + weeks + ' of 40' },
      { label: 'Trimester', value: weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd' },
    ],
    chart: { a: Math.round(gained * 10) / 10, b: Math.round(Math.max(0, (recLow + recHigh) / 2 - gained) * 10) / 10, lA: 'Gained', lB: 'Remaining (recommended)' }
  };
};

/* ── Breastmilk / Formula Feeding Calculator ──────── */
export const calcBreastmilk: CalcFunction = (v) => {
  const babyWeight = Number(v.babyWeight) || 4;
  const ageMonths = Number(v.ageMonths) || 3;
  const feedingType = String(v.feedingType || 'Breastmilk');

  // Average intake: 150 mL/kg/day for 0-6 months, reducing after
  const mlPerKg = ageMonths <= 6 ? 150 : ageMonths <= 12 ? 120 : 100;
  const dailyMl = Math.round(babyWeight * mlPerKg);
  const feedsPerDay = ageMonths < 1 ? 10 : ageMonths < 3 ? 8 : ageMonths < 6 ? 7 : 5;
  const mlPerFeed = Math.round(dailyMl / feedsPerDay);

  const formulaScoops = feedingType === 'Formula' ? Math.round(dailyMl / 30) : 0;

  return {
    main: { label: 'Daily Intake Needed', value: dailyMl + ' mL' },
    secondary: [
      { label: 'Feeds Per Day', value: feedsPerDay + ' feeds' },
      { label: 'Per Feed', value: mlPerFeed + ' mL (~' + Math.round(mlPerFeed / 30) + ' oz)' },
      { label: 'Baby Weight', value: babyWeight + ' kg' },
      { label: 'Feeding Type', value: feedingType },
      ...(formulaScoops > 0 ? [{ label: 'Formula Scoops/Day', value: formulaScoops + ' scoops (1 scoop = 30 mL)' }] : []),
      { label: 'Feed Interval', value: Math.round(24 / feedsPerDay * 10) / 10 + ' hours' },
      { label: 'Note', value: 'Adjust based on baby\'s hunger cues' },
    ],
    chart: { a: dailyMl, b: mlPerFeed, lA: 'Daily Total (mL)', lB: 'Per Feed (mL)' }
  };
};

/* ── Steps to Calories / Distance ─────────────────── */
export const calcStepCounter: CalcFunction = (v) => {
  const steps = Number(v.steps) || 10000;
  const weight = Number(v.weight_sc) || 70;
  const height = Number(v.height_sc) || 170;
  const speed = String(v.speed_sc || 'Normal');

  const strideM = height * 0.00415; // average stride
  const distanceKm = (steps * strideM) / 1000;
  const speedMult: Record<string, number> = { 'Slow': 0.035, 'Normal': 0.045, 'Brisk': 0.055, 'Running': 0.08 };
  const caloriesPer = speedMult[speed] || 0.045;
  const caloriesBurned = Math.round(steps * caloriesPer * weight / 70);
  const activeMinutes = Math.round(steps / (speed === 'Running' ? 160 : speed === 'Brisk' ? 120 : 100));

  return {
    main: { label: 'Calories Burned', value: caloriesBurned + ' kcal' },
    secondary: [
      { label: 'Distance', value: distanceKm.toFixed(2) + ' km (' + (distanceKm * 0.6214).toFixed(2) + ' mi)' },
      { label: 'Steps', value: steps.toLocaleString() },
      { label: 'Active Minutes', value: activeMinutes + ' min' },
      { label: 'Stride Length', value: (strideM * 100).toFixed(1) + ' cm' },
      { label: 'Fat Burned', value: (caloriesBurned / 7700 * 1000).toFixed(1) + ' g' },
      { label: 'Goal Progress', value: steps >= 10000 ? '✓ 10K steps reached!' : Math.round(steps / 100) + '% of 10K goal' },
      { label: 'Steps/km', value: Math.round(1000 / strideM).toLocaleString() },
    ],
    chart: { a: caloriesBurned, b: Math.max(0, 300 - caloriesBurned), lA: 'Burned', lB: 'To 300 kcal target' }
  };
};

/* ── Detailed BAC & Sober Time Calculator ─────────── */
export const calcBACDetailed: CalcFunction = (v) => {
  const drinkType = String(v.drinkType || 'Beer (330mL, 5%)');
  const drinks = Number(v.numDrinks) || 2;
  const weight = Number(v.weight_bac) || 70;
  const gender = String(v.gender_bac || 'Male');
  const hours = Number(v.hours_bac) || 1;

  const drinkAlcohol: Record<string, number> = {
    'Beer (330mL, 5%)': 13.2,
    'Wine (150mL, 12%)': 14.4,
    'Whisky (30mL, 40%)': 9.6,
    'Vodka (30mL, 40%)': 9.6,
    'Cocktail (200mL, ~15%)': 24.0,
  };
  const gramsPerDrink = drinkAlcohol[drinkType] || 14;
  const totalGrams = gramsPerDrink * drinks;

  const r = gender === 'Male' ? 0.68 : 0.55;
  const peakBAC = (totalGrams / (weight * r * 10)) * 100;
  const currentBAC = Math.max(0, peakBAC - 0.015 * hours);

  const soberHours = currentBAC > 0 ? currentBAC / 0.015 : 0;
  const soberTime = new Date(Date.now() + soberHours * 3600000);

  let impairment: string;
  if (currentBAC < 0.02) impairment = '✅ Sober / Minimal';
  else if (currentBAC < 0.05) impairment = '🟡 Mild relaxation, slight impairment';
  else if (currentBAC < 0.08) impairment = '🟠 Reduced coordination, judgment impaired';
  else if (currentBAC < 0.15) impairment = '🔴 Significant impairment — DO NOT DRIVE';
  else impairment = '🚨 Severe impairment — medical risk';

  const legalDriving: Record<string, string> = { India: '0.03%', US: '0.08%', UK: '0.08%', EU: '0.05%' };

  return {
    main: { label: 'Current BAC', value: currentBAC.toFixed(3) + '%' },
    secondary: [
      { label: 'Peak BAC', value: peakBAC.toFixed(3) + '%' },
      { label: 'Impairment Level', value: impairment },
      { label: 'Sober in', value: soberHours > 0 ? soberHours.toFixed(1) + ' hours' : 'Already sober' },
      { label: 'Estimated Sober Time', value: soberHours > 0 ? soberTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Now' },
      { label: 'Total Alcohol', value: totalGrams.toFixed(1) + ' grams' },
      { label: 'Calories from Alcohol', value: Math.round(totalGrams * 7) + ' kcal' },
      { label: 'India Legal Limit', value: '0.03% — ' + (currentBAC > 0.03 ? 'OVER LIMIT ❌' : 'Under limit ✓') },
      { label: 'US Legal Limit', value: '0.08% — ' + (currentBAC > 0.08 ? 'OVER LIMIT ❌' : 'Under limit ✓') },
    ],
    chart: { a: Math.round(currentBAC * 1000), b: Math.round(Math.max(0, 80 - currentBAC * 1000)), lA: 'Current BAC (×1000)', lB: 'To US limit' }
  };
};

/* ── Menstrual Cycle & Period Tracker ─────────────── */
export const calcMenstrualCycle: CalcFunction = (v) => {
  if (!v.lastPeriodDate) return { main: { label: 'Error', value: 'Enter last period date' } };
  const lp = new Date(v.lastPeriodDate as string);
  const cycleLength = Number(v.cycleLength) || 28;
  const periodDuration = Number(v.periodDuration) || 5;

  const fmt = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const periods: string[] = [];
  const fertileWindows: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const nextStart = new Date(lp);
    nextStart.setDate(lp.getDate() + cycleLength * i);
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextStart.getDate() + periodDuration - 1);
    periods.push(fmt(nextStart) + ' – ' + fmt(nextEnd));

    // Fertile window: ~5 days before ovulation + ovulation day
    const ovulation = new Date(nextStart);
    ovulation.setDate(nextStart.getDate() + cycleLength - 14);
    const fertStart = new Date(ovulation);
    fertStart.setDate(ovulation.getDate() - 5);
    fertileWindows.push(fmt(fertStart) + ' – ' + fmt(ovulation));
  }

  const nextPeriod = new Date(lp);
  nextPeriod.setDate(lp.getDate() + cycleLength);
  const daysUntil = Math.ceil((nextPeriod.getTime() - Date.now()) / 86400000);
  const pmsStart = new Date(nextPeriod);
  pmsStart.setDate(nextPeriod.getDate() - 7);

  return {
    main: { label: 'Next Period', value: fmt(nextPeriod) + (daysUntil > 0 ? ' (' + daysUntil + ' days)' : ' (today!)') },
    secondary: [
      { label: 'Cycle Length', value: cycleLength + ' days' },
      { label: 'Period Duration', value: periodDuration + ' days' },
      { label: 'PMS Window', value: fmt(pmsStart) + ' – ' + fmt(nextPeriod) },
      { label: 'Next Fertile Window', value: fertileWindows[0] },
      { label: 'Period 2', value: periods[1] },
      { label: 'Period 3', value: periods[2] },
      { label: 'Period 4', value: periods[3] },
      { label: 'Period 5', value: periods[4] },
    ],
    chart: { a: daysUntil > 0 ? daysUntil : cycleLength, b: Math.max(0, cycleLength - (daysUntil > 0 ? daysUntil : cycleLength)), lA: 'Days Until Period', lB: 'Days Elapsed' },
    table: {
      title: '6-Month Cycle Calendar',
      headers: ['Cycle', 'Period Dates', 'Fertile Window', 'Ovulation Day'],
      rows: periods.slice(0, 6).map((p, i) => [
        'Cycle ' + (i + 1),
        p,
        fertileWindows[i] || '—',
        (() => { const nextS = new Date(lp); nextS.setDate(lp.getDate() + cycleLength * (i + 1)); const ov = new Date(nextS); ov.setDate(nextS.getDate() + cycleLength - 14); return fmt(ov); })(),
      ]),
      collapsible: true,
    },
  };
};
