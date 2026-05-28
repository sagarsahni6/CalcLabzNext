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
  return {
    main: { label: "Your BMI", value: bmi.toFixed(1) },
    secondary: [
      { label: "Category (WHO)", value: cat },
      { label: "Category (Asian)", value: asianCat + (asianCat !== cat ? ' ⚠️' : '') },
      { label: "Ideal Weight (BMI 22)", value: ideal.toFixed(1) + " kg" },
      { label: "Healthy Range", value: idealLow.toFixed(1) + " – " + idealHigh.toFixed(1) + " kg" },
      { label: "Weight to Ideal", value: (diff > 0 ? "+" : "") + diff.toFixed(1) + " kg" + (Math.abs(diff) < 2 ? ' — Great!' : '') },
      { label: "Asian Healthy Range", value: "18.5 – 22.9 (overweight ≥23)" },
    ]
  };
};

export const calcBMR: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const weight = Number(v.weight) || 70;
  const age = Number(v.age) || 30;
  const gender = String(v.gender || "Male");
  const bmr = gender === "Male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  return {
    main: { label: "BMR", value: Math.round(bmr) + " kcal/day" },
    secondary: [
      { label: "Sedentary (×1.2)", value: Math.round(bmr * 1.2) + " kcal" },
      { label: "Light Activity (×1.375)", value: Math.round(bmr * 1.375) + " kcal" },
      { label: "Moderate (×1.55)", value: Math.round(bmr * 1.55) + " kcal" },
      { label: "Very Active (×1.725)", value: Math.round(bmr * 1.725) + " kcal" }
    ]
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
  return {
    main: { label: "TDEE", value: tdee + " kcal/day" },
    secondary: [
      { label: "Weight Loss (−500 kcal)", value: (tdee - 500) + " kcal" },
      { label: "Maintenance", value: tdee + " kcal" },
      { label: "Weight Gain (+500 kcal)", value: (tdee + 500) + " kcal" },
      { label: "BMR (Mifflin-St Jeor)", value: Math.round(bmr) + " kcal" },
      { label: "Suggested Protein", value: protein + "g (" + (protein * 4) + " kcal)" },
      { label: "Suggested Carbs", value: Math.round(carbCals / 4) + "g (" + carbCals + " kcal)" },
      { label: "Suggested Fat", value: Math.round(fatCals / 9) + "g (" + fatCals + " kcal)" }
    ]
  };
};

export const calcWater: CalcFunction = (v) => {
  const weight = Number(v.weight) || 70;
  const activity = String(v.activity || "Sedentary");
  const mult: Record<string, number> = { Sedentary: 30, Moderate: 35, Active: 40, "Very Active": 45 };
  const factor = mult[activity] || 30;
  const ml = Math.round(weight * factor);
  return {
    main: { label: "Daily Water", value: ml + " ml" },
    secondary: [
      { label: "In Litres", value: (ml / 1000).toFixed(1) + " L" },
      { label: "Glasses (250ml)", value: Math.ceil(ml / 250) + " glasses" },
      { label: "Bottles (1L)", value: Math.ceil(ml / 1000) + " bottles" }
    ]
  };
};

export const calcHeartRate: CalcFunction = (v) => {
  const age = Number(v.age) || 30;
  const resting = Number(v.resting) || 70;
  const max = 220 - age;
  const res = max - resting;
  const z = (lo: number, hi: number) => `${Math.round(resting + res * lo)}–${Math.round(resting + res * hi)} bpm`;
  return {
    main: { label: "Max Heart Rate", value: max + " bpm" },
    secondary: [
      { label: "Zone 1 — Recovery (50–60%)", value: z(0.5, 0.6) },
      { label: "Zone 2 — Fat Burn (60–70%)", value: z(0.6, 0.7) },
      { label: "Zone 3 — Aerobic (70–80%)", value: z(0.7, 0.8) },
      { label: "Zone 4 — Threshold (80–90%)", value: z(0.8, 0.9) },
      { label: "Zone 5 — VO₂ Max (90–100%)", value: z(0.9, 1.0) }
    ]
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
  const mets: Record<string, number> = { Walking: 3.5, Jogging: 7, Running: 10, Cycling: 8, Swimming: 7, HIIT: 12, Yoga: 3, "Weight Training": 5 };
  const met = mets[activity] || 5;
  const burned = Math.round((met * 3.5 * weight / 200) * duration);
  return {
    main: { label: "Calories Burned", value: burned + " kcal" },
    secondary: [
      { label: "Per Minute", value: (burned / duration).toFixed(1) + " kcal/min" },
      { label: "Fat Burned", value: (burned / 7700 * 1000).toFixed(1) + " g" },
      { label: "MET Value", value: met }
    ]
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
      { label: "Fall-asleep buffer", value: "~14 minutes" }
    ]
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
  return {
    main: { label: "Protein", value: Math.round(calories * p / 4) + "g" },
    secondary: [
      { label: "Carbohydrates", value: Math.round(calories * c / 4) + "g" },
      { label: "Fat", value: Math.round(calories * f / 9) + "g" },
      { label: "Protein (kcal)", value: Math.round(calories * p) + " kcal" }
    ]
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
  return {
    main: { label: "Expected Due Date", value: due.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
    secondary: [
      { label: "Weeks Pregnant", value: weeks + " weeks" },
      { label: "Trimester", value: tri },
      { label: "Days Remaining", value: daysLeft + " days" },
      { label: "Conception Date", value: new Date(lmp.getTime() + 14 * 86400000).toLocaleDateString('en-IN') }
    ]
  };
};

export const calcIdealWeight: CalcFunction = (v) => {
  const height = Number(v.height) || 170;
  const gender = String(v.gender || "Male");
  const hIn = (height - 152.4) / 2.54;
  const miller = gender === "Male" ? 56.2 + 1.41 * hIn : 53.1 + 1.36 * hIn;
  const hamwi = gender === "Male" ? 48 + 2.7 * hIn : 45.5 + 2.2 * hIn;
  const robinson = gender === "Male" ? 52 + 1.9 * hIn : 49 + 1.7 * hIn;
  const bmi22 = (22 * (height / 100) ** 2);
  return {
    main: { label: "Hamwi Formula", value: hamwi.toFixed(1) + " kg" },
    secondary: [
      { label: "Miller Formula", value: miller.toFixed(1) + " kg" },
      { label: "Robinson Formula", value: robinson.toFixed(1) + " kg" },
      { label: "BMI=22 Target", value: bmi22.toFixed(1) + " kg" }
    ]
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
  return {
    main: { label: "BP Classification", value: cat },
    secondary: [
      { label: "Risk Level", value: risk },
      { label: "Advice", value: advice },
      { label: "Pulse Pressure", value: pp + " mmHg" },
      { label: "Mean Arterial Pressure (MAP)", value: map + " mmHg" },
      { label: "Normal MAP range", value: "70–100 mmHg" }
    ]
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
      { label: "High Risk Threshold", value: "> " + mod }
    ]
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
  return {
    main: { label: "Predicted FVC", value: fvc.toFixed(2) + " L" },
    secondary: [
      { label: "Predicted FEV1", value: fev1.toFixed(2) + " L" },
      { label: "FEV1/FVC Ratio", value: ((fev1 / fvc) * 100).toFixed(1) + "%" },
      { label: "Normal Range (FVC)", value: gender === "Male" ? "4.0-6.0 L" : "3.0-4.5 L" }
    ]
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
    ]
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
      { label: "Minimum (sedentary RDA)", value: Math.round(minP) + "g" },
      { label: "Maximum (advanced training)", value: Math.round(maxP) + "g" },
      { label: "Calories from Protein", value: Math.round(base * 4) + " kcal" }
    ]
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
  return {
    main: { label: "Annual Smoking Cost", value: "₹" + Math.round(yearlyCost).toLocaleString() },
    secondary: [
      { label: "Daily Cost", value: "₹" + Math.round(dailyCost).toFixed(0) },
      { label: "Monthly Cost", value: "₹" + Math.round(monthlyCost).toLocaleString() },
      { label: "Total Spent in " + yearsSmoked + " years", value: "₹" + Math.round(totalSpent).toLocaleString() },
      { label: "If invested @12% instead", value: "₹" + Math.round(investedAt12).toLocaleString() },
      { label: "Cigarettes in " + yearsSmoked + " years", value: Math.round(cigsPerDay * 365 * yearsSmoked).toLocaleString() }
    ]
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
      { label: "Recommended Action", value: risk === "Low" ? "Annual check-up" : risk === "Moderate" ? "Lifestyle changes + HbA1c test" : "See a doctor for full assessment" }
    ]
  };
};

export const calcSleepDebt: CalcFunction = (v) => {
  const needed = Number(v.needed) || 8;
  const actual = Number(v.actual) || 7;
  const days = Number(v.days) || 7;
  const nightly = needed - actual;
  const total = nightly * days;
  const recoveryDays = Math.ceil(total / 2);
  return {
    main: { label: "Sleep Debt", value: total.toFixed(1) + " hours" },
    secondary: [
      { label: "Nightly Deficit", value: nightly.toFixed(1) + " hrs/night" },
      { label: "Recovery Plan", value: recoveryDays + " nights of +2hr sleep" },
      { label: "Ideal Bedtime (for 6AM wake)", value: "10:00 PM" },
      { label: "Productivity Impact", value: total > 14 ? "Severe" : total > 7 ? "Moderate" : "Mild" },
      { label: "Health Risk", value: total > 20 ? "High" : total > 10 ? "Moderate" : "Low" }
    ]
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
      { label: "Advice", value: advice }
    ]
  };
};

export const calcBSA: CalcFunction = (v) => {
  const weight = Number(v.weight_bsa) || 70;
  const height = Number(v.height_bsa) || 170;
  const mosteller = Math.sqrt(weight * height / 3600);
  const dubois = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
  const haycock = 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
  return {
    main: { label: "BSA (Mosteller)", value: mosteller.toFixed(3) + " m²" },
    secondary: [
      { label: "BSA (DuBois & DuBois)", value: dubois.toFixed(3) + " m²" },
      { label: "BSA (Haycock)", value: haycock.toFixed(3) + " m²" },
      { label: "Average BSA", value: ((mosteller + dubois + haycock) / 3).toFixed(3) + " m²" },
      { label: "Normal adult range", value: "1.6–2.0 m²" }
    ]
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
  return {
    main: { label: "Total/HDL Ratio", value: totalHdl.toFixed(2) + " — " + riskTotal },
    secondary: [
      { label: "LDL/HDL Ratio", value: ldlHdl.toFixed(2) + " — " + riskLdl },
      { label: "Non-HDL Cholesterol", value: nonHdl + " mg/dL" + (nonHdl < 130 ? " ✓" : " [!]") },
      { label: "VLDL (estimated)", value: vldl.toFixed(0) + " mg/dL" },
      { label: "Triglycerides Status", value: trigStatus },
      { label: "Healthy Total/HDL", value: "< 3.5 (ideal < 3.0)" },
      { label: "Healthy LDL/HDL", value: "< 2.5" },
      { label: "Target LDL", value: "< 100 mg/dL (optimal)" }
    ]
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
  return {
    main: { label: "Daily Calorie Target", value: targetCalories + " kcal" },
    secondary: [
      { label: "Your TDEE (maintenance)", value: tdee + " kcal/day" },
      { label: "Daily Deficit", value: actualDeficit + " kcal" },
      { label: "Weight to Lose", value: weightToLose.toFixed(1) + " kg" },
      { label: "Time to Goal", value: weeksNeeded + " weeks (" + Math.round(weeksNeeded / 4.3) + " months)" },
      { label: "Goal Date (estimated)", value: goalDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
      { label: "BMR", value: Math.round(bmr) + " kcal" },
      { label: "Min Safe Calories", value: gender === "Male" ? "1,500 kcal" : "1,200 kcal" }
    ]
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
      { label: "90% 1RM (3 reps)", value: Math.round(avg * 0.9) + " kg" },
      { label: "80% 1RM (8 reps)", value: Math.round(avg * 0.8) + " kg" },
      { label: "70% 1RM (12 reps)", value: Math.round(avg * 0.7) + " kg" },
      { label: "Exercise", value: String(v.exercise) }
    ]
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
  return {
    main: { label: "Pace", value: paceM + ":" + String(paceS).padStart(2, '0') + " min/km" },
    secondary: [
      { label: "Speed", value: speedKmh.toFixed(1) + " km/h" },
      { label: "Predicted " + targetDist + " Time", value: (predH > 0 ? predH + "h " : "") + predM + "m " + predS + "s" },
      { label: "Predicted 5K", value: Math.round(timeMin * Math.pow(5 / distanceKm, 1.06)) + " min" },
      { label: "Predicted 10K", value: Math.round(timeMin * Math.pow(10 / distanceKm, 1.06)) + " min" },
      { label: "Predicted Half Marathon", value: Math.round(timeMin * Math.pow(21.1 / distanceKm, 1.06)) + " min" },
      { label: "Predicted Marathon", value: Math.round(timeMin * Math.pow(42.195 / distanceKm, 1.06)) + " min" }
    ]
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
  return {
    main: { label: "Daily Calories for Recomp", value: targetCals + " kcal" },
    secondary: [
      { label: "Fat to Lose", value: fatToLose.toFixed(1) + " kg" },
      { label: "Current Lean Mass", value: lbm.toFixed(1) + " kg" },
      { label: "TDEE", value: tdee + " kcal" },
      { label: "Deficit (15%)", value: deficit + " kcal" },
      { label: "Daily Protein Target", value: protein + "g (" + Math.round(protein * 4) + " kcal)" },
      { label: "Timeline (est.)", value: Math.ceil(fatToLose / 0.35) + " weeks at 0.35 kg/week" },
      { label: "Target Weight", value: (lbm + targetFatMass).toFixed(1) + " kg" }
    ]
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
  return {
    main: { label: "Estimated VO2 Max", value: vo2.toFixed(1) + " ml/kg/min" },
    secondary: [
      { label: "Fitness Level", value: rating },
      { label: "Category", value: category },
      { label: "Method Used", value: method },
      { label: "Age", value: age + " years" },
      { label: "Marathon Prediction (est.)", value: vo2 > 30 ? Math.round(42.195 / (vo2 * 0.07)) + " min" : "Build base fitness first" }
    ]
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
      { label: "Method", value: bodyfat > 0 ? "Direct (from body fat %)" : "Boer Formula (estimated)" }
    ]
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
    ]
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
      { label: "Climate Factor", value: climate }
    ]
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
    ]
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
      { label: "Universal Boundary", value: "Keep waist < half your height" }
    ]
  };
};
