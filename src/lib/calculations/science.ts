/* ═══════════════════════════════════════════════════
   Calc Labz — Science Calculations
   Ported from assets/js/calculators-science.js
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcSpeedDist: CalcFunction = (v) => {
  let speed = v.speed as number, distance = v.distance as number, time = v.time as number;
  const zeros = [!speed, !distance, !time].filter(Boolean).length;
  if (zeros !== 1) return { main: { label: 'Tip', value: 'Set exactly one value to 0 to solve' } };
  if (!speed) speed = distance / time;
  else if (!distance) distance = speed * time;
  else time = distance / speed;
  const h = Math.floor(time), m = Math.round((time - h) * 60);
  return {
    main: { label: 'Result', value: `Speed=${speed.toFixed(2)} km/h  Dist=${distance.toFixed(2)} km  Time=${h}h ${m}m` },
    secondary: [
      { label: 'Speed', value: speed.toFixed(3) + ' km/h' },
      { label: 'Distance', value: distance.toFixed(3) + ' km' },
      { label: 'Time', value: `${h}h ${m}m` },
      { label: 'Speed in m/s', value: (speed / 3.6).toFixed(3) + ' m/s' },
    ],
  };
};

export const calcNewtons: CalcFunction = (v) => {
  const mass = v.mass as number, acceleration = v.acceleration as number, velocity = v.velocity as number;
  const F = mass * acceleration;
  const ke = 0.5 * mass * velocity ** 2;
  const momentum = mass * velocity;
  const weight = mass * 9.81;
  return {
    main: { label: 'Force (F=ma)', value: F.toFixed(4) + ' N' },
    secondary: [
      { label: 'Kinetic Energy', value: ke.toFixed(4) + ' J' },
      { label: 'Momentum (p=mv)', value: momentum.toFixed(4) + ' kg·m/s' },
      { label: 'Weight on Earth', value: weight.toFixed(2) + ' N' },
      { label: 'Weight on Moon', value: (mass * 1.62).toFixed(2) + ' N' },
    ],
  };
};

export const calcOhmAdvanced: CalcFunction = (v) => {
  const r1 = v.r1 as number, r2 = v.r2 as number, r3 = v.r3 as number, voltage = v.voltage as number;
  const rs = r1 + r2 + r3;
  const rp = 1 / (1 / r1 + 1 / r2 + 1 / r3);
  const Is = voltage / rs, Ip = voltage / rp;
  return {
    main: { label: 'Series Resistance', value: rs.toFixed(3) + ' Ω' },
    secondary: [
      { label: 'Parallel Resistance', value: rp.toFixed(3) + ' Ω' },
      { label: 'Series Current', value: Is.toFixed(4) + ' A' },
      { label: 'Parallel Current', value: Ip.toFixed(4) + ' A' },
      { label: 'Power (Series)', value: (voltage * Is).toFixed(3) + ' W' },
      { label: 'Power (Parallel)', value: (voltage * Ip).toFixed(3) + ' W' },
    ],
  };
};

export const calcDensity: CalcFunction = (v) => {
  let mass = v.mass as number, volume = v.volume as number, density = v.density as number;
  if (!density) density = mass / volume;
  else if (!volume) volume = mass / density;
  else mass = density * volume;
  return {
    main: { label: 'Density', value: density.toFixed(4) + ' g/cm³' },
    secondary: [
      { label: 'Mass', value: mass.toFixed(4) + ' g' },
      { label: 'Volume', value: volume.toFixed(4) + ' cm³' },
      { label: 'kg/m³', value: (density * 1000).toFixed(2) },
      { label: 'Floats in water?', value: density < 1 ? 'Yes (ρ<1)' : 'No (ρ≥1)' },
    ],
  };
};

export const calcChemMolar: CalcFunction = (v) => {
  const moles = v.moles as number, molarMass = v.molarMass as number, vol = v.volume as number;
  const mass = moles * molarMass;
  const molarity = moles / (vol / 1000);
  return {
    main: { label: 'Mass of Solute', value: mass.toFixed(4) + ' g' },
    secondary: [
      { label: 'Molarity (M)', value: molarity.toFixed(4) + ' mol/L' },
      { label: 'Millimoles', value: (moles * 1000).toFixed(2) + ' mmol' },
      { label: 'Molecules', value: (moles * 6.022e23).toExponential(3) },
    ],
  };
};

export const calcWavelength: CalcFunction = (v) => {
  const speed = v.speed as number, frequency = v.frequency as number;
  const lambda = speed / frequency;
  const period = 1 / frequency;
  const angFreq = 2 * Math.PI * frequency;
  return {
    main: { label: 'Wavelength (λ)', value: lambda.toFixed(6) + ' m' },
    secondary: [
      { label: 'Period (T)', value: period.toFixed(6) + ' s' },
      { label: 'Angular Frequency (ω)', value: angFreq.toFixed(4) + ' rad/s' },
      { label: 'Energy (E=hf)', value: (6.626e-34 * frequency).toExponential(3) + ' J' },
    ],
  };
};

export const calcGravitational: CalcFunction = (v) => {
  const G = 6.674e-11;
  const m1 = v.m1 as number, m2 = v.m2 as number, r = v.r as number;
  const F = G * m1 * m2 / (r ** 2);
  const g1 = G * m1 / (r ** 2);
  return {
    main: { label: 'Gravitational Force', value: F.toExponential(4) + ' N' },
    secondary: [
      { label: 'G constant', value: '6.674×10⁻¹¹ N·m²/kg²' },
      { label: 'Field strength at r', value: g1.toExponential(4) + ' m/s²' },
      { label: 'Escape velocity', value: Math.sqrt(2 * G * m1 / r).toFixed(2) + ' m/s' },
    ],
  };
};

export const calcHalfLife: CalcFunction = (v) => {
  const initial = v.initial as number, time = v.time as number, halflife = v.halflife as number;
  const remaining = initial * Math.pow(0.5, time / halflife);
  const decayed = initial - remaining;
  const halfLives = time / halflife;
  const activityRatio = Math.pow(0.5, halfLives);
  return {
    main: { label: 'Remaining Quantity', value: remaining.toFixed(4) + ' g' },
    secondary: [
      { label: 'Decayed', value: decayed.toFixed(4) + ' g' },
      { label: 'Half-Lives Elapsed', value: halfLives.toFixed(2) },
      { label: 'Fraction Remaining', value: (activityRatio * 100).toFixed(4) + '%' },
    ],
  };
};

export const calcPH: CalcFunction = (v) => {
  const conc = v.conc as number, temp = v.temp as number;
  const ph = -Math.log10(conc);
  const poh = 14 - ph;
  const type = ph < 7 ? 'Acid' : ph === 7 ? 'Neutral' : 'Base';
  const tempCorr = temp !== 25 ? ` (at ${temp}°C)` : '';
  return {
    main: { label: 'pH' + tempCorr, value: ph.toFixed(4) },
    secondary: [
      { label: 'pOH', value: poh.toFixed(4) },
      { label: 'OH⁻ Concentration', value: Math.pow(10, -poh).toExponential(4) + ' mol/L' },
      { label: 'Type', value: type },
      { label: 'pH Scale', value: '0 (acid) ← 7 (neutral) → 14 (base)' },
    ],
  };
};

export const calcKinematic: CalcFunction = (v) => {
  const u = v.u as number, a = v.a as number, t = v.t as number;
  const vFinal = u + a * t;
  const s = u * t + 0.5 * a * t ** 2;
  const v2 = u ** 2 + 2 * a * s;
  return {
    main: { label: 'Final Velocity (v)', value: vFinal.toFixed(4) + ' m/s' },
    secondary: [
      { label: 'Distance (s)', value: s.toFixed(4) + ' m' },
      { label: 'v² = u² + 2as', value: v2.toFixed(4) },
      { label: 'KE at v (1kg)', value: (0.5 * vFinal ** 2).toFixed(4) + ' J' },
      { label: 'Avg Velocity', value: ((u + vFinal) / 2).toFixed(4) + ' m/s' },
    ],
  };
};

export const calcThermodynamics: CalcFunction = (v) => {
  const p1 = v.p1 as number, v1 = v.v1 as number, v2 = v.v2 as number, t1 = v.t1 as number, t2 = v.t2 as number;
  const p2Boyle = p1 * v1 / v2;
  const v2Charles = v1 * t2 / t1;
  const p2Gay = p1 * t2 / t1;
  const n = (p1 * v1) / (0.0821 * t1);
  const combinedP2 = p1 * v1 * t2 / (v2 * t1);
  return {
    main: { label: 'Moles of Gas (n)', value: n.toFixed(4) + ' mol' },
    secondary: [
      { label: `Boyle's P₂ (V₂=${v2}L, const T)`, value: p2Boyle.toFixed(4) + ' atm' },
      { label: `Charles V₂ (T₂=${t2}K, const P)`, value: v2Charles.toFixed(4) + ' L' },
      { label: 'Gay-Lussac P₂ (const V)', value: p2Gay.toFixed(4) + ' atm' },
      { label: 'Combined Law P₂', value: combinedP2.toFixed(4) + ' atm' },
      { label: 'PV = nRT check', value: (n * 0.0821 * t1).toFixed(4) + ' L·atm' },
    ],
  };
};

export const calcAcceleration: CalcFunction = (v) => {
  const v1 = v.v1_acc as number, v2 = v.v2_acc as number, t = v.time_acc as number;
  const a = (v2 - v1) / t;
  const s = v1 * t + 0.5 * a * t * t;
  const gForce = a / 9.81;
  return {
    main: { label: 'Acceleration (a)', value: a.toFixed(4) + ' m/s²' },
    secondary: [
      { label: 'Distance covered', value: s.toFixed(2) + ' m' },
      { label: 'G-force', value: Math.abs(gForce).toFixed(3) + ' g ' + (a < 0 ? '(deceleration)' : '') },
      { label: 'Initial speed', value: (v1 * 3.6).toFixed(1) + ' km/h' },
      { label: 'Final speed', value: (v2 * 3.6).toFixed(1) + ' km/h' },
      { label: 'Formula', value: 'a = (v − u) / t' },
    ],
  };
};
