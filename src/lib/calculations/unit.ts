/* ═══════════════════════════════════════════════════
   Calc Labz — Unit Conversion Calculations
   Ported from assets/js/calculators-unit.js
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcLength: CalcFunction = (v) => {
  const toM: Record<string,number> = {Meters:1,Kilometers:1000,Centimeters:0.01,Millimeters:0.001,Miles:1609.344,Feet:0.3048,Inches:0.0254,Yards:0.9144};
  const m = (v.val as number) * (toM[v.from as string] || 1);
  return {
    main: { label: 'Meters', value: m.toFixed(6) },
    secondary: Object.entries(toM).filter(([k]) => k !== v.from && k !== 'Meters').map(([k, f]) => ({ label: k, value: (m / f).toFixed(4) })),
  };
};

export const calcWeight: CalcFunction = (v) => {
  const toKg: Record<string,number> = {Kilograms:1,Grams:0.001,Milligrams:0.000001,Pounds:0.453592,Ounces:0.0283495,Stone:6.35029,Tonnes:1000};
  const kg = (v.val as number) * (toKg[v.from as string] || 1);
  return {
    main: { label: 'Kilograms', value: kg.toFixed(6) },
    secondary: Object.entries(toKg).filter(([k]) => k !== v.from && k !== 'Kilograms').map(([k, f]) => ({ label: k, value: (kg / f).toFixed(4) })),
  };
};

export const calcTemperature: CalcFunction = (v) => {
  let c: number;
  switch (v.from as string) {
    case 'Fahrenheit': c = ((v.val as number) - 32) * 5 / 9; break;
    case 'Kelvin': c = (v.val as number) - 273.15; break;
    case 'Rankine': c = ((v.val as number) - 491.67) * 5 / 9; break;
    default: c = v.val as number;
  }
  return {
    main: { label: 'Celsius', value: c.toFixed(4) + '°C' },
    secondary: [
      { label: 'Fahrenheit', value: (c * 9 / 5 + 32).toFixed(4) + '°F' },
      { label: 'Kelvin', value: (c + 273.15).toFixed(4) + ' K' },
      { label: 'Rankine', value: ((c + 273.15) * 9 / 5).toFixed(4) + ' R' },
    ],
  };
};

export const calcArea: CalcFunction = (v) => {
  const toSqM: Record<string,number> = {'Square Meters':1,'Square Kilometers':1e6,'Square Feet':0.092903,'Square Inches':0.00064516,'Acres':4046.86,'Hectares':10000};
  const sqm = (v.val as number) * (toSqM[v.from as string] || 1);
  return {
    main: { label: 'Square Meters', value: sqm.toFixed(4) + ' m²' },
    secondary: Object.entries(toSqM).filter(([k]) => k !== v.from && k !== 'Square Meters').map(([k, f]) => ({ label: k, value: (sqm / f).toFixed(4) })),
  };
};

export const calcSpeed: CalcFunction = (v) => {
  const toMs: Record<string,number> = {'km/h':1/3.6,'mph':0.44704,'m/s':1,'Knots':0.514444,'Mach':343};
  const ms = (v.val as number) * (toMs[v.from as string] || 1);
  return {
    main: { label: 'm/s', value: ms.toFixed(4) + ' m/s' },
    secondary: Object.entries(toMs).filter(([k]) => k !== v.from && k !== 'm/s').map(([k, f]) => ({ label: k, value: (ms / f).toFixed(4) })),
  };
};

export const calcCurrency: CalcFunction = (v) => {
  const toInr: Record<string,number> = {INR:1,USD:83.5,EUR:90,GBP:105,JPY:0.55,AED:22.7,SGD:62,AUD:54,CAD:61};
  const inr = (v.amount as number) * (toInr[v.from as string] || 1);
  return {
    main: { label: 'Indian Rupees', value: '₹' + inr.toFixed(2) },
    secondary: Object.entries(toInr).filter(([k]) => k !== v.from && k !== 'INR').map(([k, f]) => ({ label: k, value: (inr / f).toFixed(4) })),
  };
};

export const calcVolume: CalcFunction = (v) => {
  const toL: Record<string,number> = {Liters:1,Milliliters:0.001,'Gallons (US)':3.78541,'Gallons (UK)':4.54609,'Cubic Meters':1000,'Fluid Ounces':0.0295735,Cups:0.236588,Pints:0.473176};
  const l = (v.val as number) * (toL[v.from as string] || 1);
  return {
    main: { label: 'Liters', value: l.toFixed(6) + ' L' },
    secondary: Object.entries(toL).filter(([k]) => k !== v.from && k !== 'Liters').map(([k, f]) => ({ label: k, value: (l / f).toFixed(4) })),
  };
};

export const calcData: CalcFunction = (v) => {
  const toBit: Record<string,number> = {Bits:1,Bytes:8,Kilobytes:8192,Megabytes:8388608,Gigabytes:8589934592,Terabytes:8796093022208,Petabytes:8796093022208*1024};
  const bits = (v.val as number) * (toBit[v.from as string] || 1);
  return {
    main: { label: 'Bytes', value: (bits / 8).toLocaleString() },
    secondary: Object.entries(toBit).filter(([k]) => k !== v.from && k !== 'Bytes').map(([k, f]) => ({ label: k, value: (bits / f).toFixed(6) })),
  };
};

export const calcPressure: CalcFunction = (v) => {
  const toPa: Record<string,number> = {Pascal:1,Kilopascal:1000,Bar:100000,PSI:6894.76,Atmosphere:101325,mmHg:133.322,Torr:133.322};
  const pa = (v.val as number) * (toPa[v.from as string] || 1);
  return {
    main: { label: 'Pascal', value: pa.toFixed(4) + ' Pa' },
    secondary: Object.entries(toPa).filter(([k]) => k !== v.from && k !== 'Pascal').map(([k, f]) => ({ label: k, value: (pa / f).toFixed(6) })),
  };
};

export const calcEnergy: CalcFunction = (v) => {
  const toJ: Record<string,number> = {Joules:1,Kilojoules:1000,'Watt-hours':3600,kWh:3600000,Calories:4.184,Kilocalories:4184,BTU:1055.06,Electronvolt:1.602e-19};
  const j = (v.val as number) * (toJ[v.from as string] || 1);
  return {
    main: { label: 'Joules', value: j.toExponential(4) + ' J' },
    secondary: Object.entries(toJ).filter(([k]) => k !== v.from && k !== 'Joules').map(([k, f]) => ({ label: k, value: (j / f).toExponential(4) })),
  };
};

export const calcAngle: CalcFunction = (v) => {
  const toDeg: Record<string,number> = {Degrees:1,Radians:180/Math.PI,Gradians:0.9,Turns:360,Arcminutes:1/60,Arcseconds:1/3600};
  const deg = (v.val as number) * (toDeg[v.from as string] || 1);
  return {
    main: { label: 'Degrees', value: deg.toFixed(6) + '°' },
    secondary: Object.entries(toDeg).filter(([k]) => k !== v.from && k !== 'Degrees').map(([k, f]) => ({ label: k, value: (deg / f).toFixed(6) })),
  };
};

/* ── Fuel Efficiency Converter ────────────────────── */
export const calcFuelEfficiency: CalcFunction = (v) => {
  const val = Number(v.val) || 10;
  const from = String(v.from || 'km/L');

  // Convert everything to L/100km first
  let l100: number;
  if (from === 'km/L') {
    l100 = val > 0 ? 100 / val : 0;
  } else if (from === 'L/100km') {
    l100 = val;
  } else if (from === 'MPG US') {
    l100 = val > 0 ? 235.215 / val : 0;
  } else if (from === 'MPG UK') {
    l100 = val > 0 ? 282.481 / val : 0;
  } else {
    l100 = val;
  }

  // Convert from L/100km to others
  const kmL = l100 > 0 ? 100 / l100 : 0;
  const mpgUS = l100 > 0 ? 235.215 / l100 : 0;
  const mpgUK = l100 > 0 ? 282.481 / l100 : 0;

  // Assuming average fuel price is ₹104 per Liter (Indian context)
  const pricePerL = 104;
  const costPerKm = kmL > 0 ? pricePerL / kmL : 0;

  return {
    main: { label: 'Efficiency in km/L', value: kmL.toFixed(2) + ' km/L' },
    secondary: [
      { label: 'Liters per 100 km', value: l100.toFixed(2) + ' L/100km' },
      { label: 'Miles per Gallon (US)', value: mpgUS.toFixed(2) + ' MPG (US)' },
      { label: 'Miles per Gallon (UK)', value: mpgUK.toFixed(2) + ' MPG (UK)' },
      { label: 'Est. Cost per km (at ₹104/L)', value: '₹' + costPerKm.toFixed(2) },
      { label: 'Est. Cost per 100 km', value: '₹' + (costPerKm * 100).toFixed(2) },
    ],
  };
};

/* ── Number to Words Converter ────────────────────── */
export const calcNumberWord: CalcFunction = (v) => {
  const num = Math.floor(Number(v.val)) || 0;
  if (num < 0 || num > 999999999999) {
    return { main: { label: 'Error', value: 'Please enter a number between 0 and 999,999,999,999' } };
  }

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertLessThanThousand(n: number): string {
    if (n === 0) return '';
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += ones[n] + ' ';
    }
    return str.trim();
  }

  // Indian numbering system (Lakhs, Crores)
  function toIndianSystem(n: number): string {
    if (n === 0) return 'Zero';
    let str = '';
    
    // Crores (10,00,00,00)
    if (n >= 10000000) {
      str += toIndianSystem(Math.floor(n / 10000000)) + ' Crore ';
      n %= 10000000;
    }
    // Lakhs (1,00,000)
    if (n >= 100000) {
      str += convertLessThanThousand(Math.floor(n / 100000)) + ' Lakh ';
      n %= 100000;
    }
    // Thousands (1,000)
    if (n >= 1000) {
      str += convertLessThanThousand(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    // Remainder
    if (n > 0) {
      str += convertLessThanThousand(n);
    }
    return str.trim();
  }

  // International System (Millions, Billions)
  function toInternationalSystem(n: number): string {
    if (n === 0) return 'Zero';
    let str = '';
    
    // Billions
    if (n >= 1000000000) {
      str += convertLessThanThousand(Math.floor(n / 1000000000)) + ' Billion ';
      n %= 1000000000;
    }
    // Millions
    if (n >= 1000000) {
      str += convertLessThanThousand(Math.floor(n / 1000000)) + ' Million ';
      n %= 1000000;
    }
    // Thousands
    if (n >= 1000) {
      str += convertLessThanThousand(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    // Remainder
    if (n > 0) {
      str += convertLessThanThousand(n);
    }
    return str.trim();
  }

  const indian = toIndianSystem(num);
  const international = toInternationalSystem(num);

  return {
    main: { label: 'Indian Format', value: indian },
    secondary: [
      { label: 'International Format', value: international },
      { label: 'Check-Writing Format', value: `Rupees ${indian} Only` },
      { label: 'Number', value: num.toLocaleString('en-IN') },
      { label: 'Digit Count', value: String(String(num).length) + ' digits' },
    ],
  };
};

/* ── Cooking Measurement Converter ────────────────── */
export const calcCookingConvert: CalcFunction = (v) => {
  const val = Number(v.val) || 1;
  const from = String(v.from || 'Cups (US)');

  // Conversion factors to Milliliters (ml)
  const toMl: Record<string, number> = {
    'Cups (US)': 236.588,
    'Cups (Metric)': 250,
    'Tablespoons (US)': 14.7868,
    'Teaspoons (US)': 4.92892,
    'Milliliters': 1,
    'Fluid Ounces (US)': 29.5735,
    'Liters': 1000,
    'Grams (Water)': 1,
  };

  const baseMl = val * (toMl[from] || 1);

  return {
    main: { label: 'Milliliters (ml)', value: baseMl.toFixed(2) + ' ml' },
    secondary: Object.entries(toMl)
      .filter(([k]) => k !== from && k !== 'Milliliters')
      .map(([k, f]) => ({
        label: k,
        value: (baseMl / f).toFixed(2) + (k === 'Liters' ? ' L' : k === 'Grams (Water)' ? ' g' : ''),
      })),
  };
};
