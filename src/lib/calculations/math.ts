/* Calc Labz — Math Calculations
   Ported from assets/js/calculators-math.js */
import { CalcFunction } from '@/types/calculator';

export const calcPercentage: CalcFunction = (v) => {
  const val = Number(v.val) || 0;
  const pct = Number(v.pct) || 0;
  const res = val * pct / 100;
  const pctOf = val !== 0 ? (pct / val) * 100 : 0;
  return {
    main: { label: "Result (X% of Y)", value: res.toFixed(2) },
    secondary: [
      { label: "% of total", value: pctOf.toFixed(3) + "%" },
      { label: "Remaining", value: (val - res).toFixed(2) },
      { label: "Increase by " + pct + "%", value: (val * (1 + pct / 100)).toFixed(2) }
    ]
  };
};

export const calcRatio: CalcFunction = (v) => {
  const a = Number(v.a) || 0;
  const b = Number(v.b) || 0;
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const g = Math.abs(gcd(Math.abs(a), Math.abs(b))) || 1;
  return {
    main: { label: "Simplified Ratio", value: `${a / g} : ${b / g}` },
    secondary: [
      { label: "A / B", value: b !== 0 ? (a / b).toFixed(4) : "∞" },
      { label: "B / A", value: a !== 0 ? (b / a).toFixed(4) : "∞" },
      { label: "A as % of total", value: (a + b) !== 0 ? ((a / (a + b)) * 100).toFixed(2) + "%" : "0%" }
    ]
  };
};

export const calcSquareRoot: CalcFunction = (v) => {
  const n = Number(v.n) || 0;
  const root = Number(v.root) || 2;
  const res = Math.pow(n, 1 / root);
  return {
    main: { label: `${root}th Root of ${n}`, value: res.toFixed(6) },
    secondary: [
      { label: "Square Root (√)", value: n >= 0 ? Math.sqrt(n).toFixed(6) : "NaN" },
      { label: "Cube Root (∛)", value: Math.cbrt(n).toFixed(6) },
      { label: "n² (squared)", value: (n * n).toLocaleString() }
    ]
  };
};

export const calcLogarithm: CalcFunction = (v) => {
  const n = Number(v.n) || 0;
  const base = Number(v.base) || 10;
  return {
    main: { label: `log₍${base}₎(${n})`, value: (Math.log(n) / Math.log(base)).toFixed(8) },
    secondary: [
      { label: "Natural Log ln(n)", value: Math.log(n).toFixed(8) },
      { label: "Log₁₀(n)", value: Math.log10(n).toFixed(8) },
      { label: "Log₂(n)", value: Math.log2(n).toFixed(8) }
    ]
  };
};

export const calcFactorial: CalcFunction = (v) => {
  const fact = (num: number): number => num <= 1 ? 1 : num * fact(num - 1);
  const n = Math.min(20, Math.floor(Number(v.n) || 0));
  const r = Math.min(n, Math.floor(Number(v.r) || 0));
  const nf = fact(n);
  const rf = fact(r);
  const nmrf = fact(n - r);
  return {
    main: { label: `${n}! Factorial`, value: nf.toLocaleString() },
    secondary: [
      { label: `P(${n},${r}) Permutations`, value: (nf / nmrf).toLocaleString() },
      { label: `C(${n},${r}) Combinations`, value: (nf / (rf * nmrf)).toLocaleString() }
    ]
  };
};

export const calcQuadratic: CalcFunction = (v) => {
  const a = Number(v.a) || 1;
  const b = Number(v.b) || 0;
  const c = Number(v.c) || 0;
  const d = b * b - 4 * a * c;
  if (d < 0) {
    return {
      main: { label: "Discriminant", value: "No real roots (D<0)" },
      secondary: [{ label: "D", value: d.toFixed(4) }]
    };
  }
  const x1 = (-b + Math.sqrt(d)) / (2 * a);
  const x2 = (-b - Math.sqrt(d)) / (2 * a);
  return {
    main: { label: "Root x₁", value: x1.toFixed(6) },
    secondary: [
      { label: "Root x₂", value: x2.toFixed(6) },
      { label: "Discriminant D", value: d.toFixed(4) },
      { label: "Vertex x", value: (-b / (2 * a)).toFixed(4) }
    ]
  };
};

export const calcPrime: CalcFunction = (v) => {
  const n = Math.floor(Number(v.n) || 0);
  const isPrime = (num: number) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  const factors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return {
    main: { label: "Is Prime?", value: isPrime(n) ? "✓ YES — Prime" : "✗ NO — Not Prime" },
    secondary: [
      { label: "Factors", value: factors.join(', ') },
      { label: "Factor Count", value: factors.length },
      { label: "Next Prime", value: (() => {
        let x = n + 1;
        while (!isPrime(x)) x++;
        return x;
      })() }
    ]
  };
};

export const calcNumberSystem: CalcFunction = (v) => {
  const dec = Math.floor(Math.abs(Number(v.dec) || 0));
  const customBase = Math.min(36, Math.max(2, Math.floor(Number(v.customBase) || 10)));
  return {
    main: { label: "Binary (Base 2)", value: dec.toString(2) },
    secondary: [
      { label: "Octal (Base 8)", value: dec.toString(8) },
      { label: "Hexadecimal (Base 16)", value: dec.toString(16).toUpperCase() },
      { label: `Base ${customBase}`, value: dec.toString(customBase).toUpperCase() }
    ]
  };
};

export const calcAverage: CalcFunction = (v) => {
  const arr = String(v.nums).split(',').map(Number).filter(n => !isNaN(n));
  if (!arr.length) return { main: { label: "Error", value: "Enter numbers" } };
  arr.sort((a, b) => a - b);
  const mean = arr.reduce((s, x) => s + x, 0) / arr.length;
  const med = arr.length % 2 === 0 ? (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 : arr[Math.floor(arr.length / 2)];
  const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / arr.length;
  return {
    main: { label: "Mean (Average)", value: mean.toFixed(4) },
    secondary: [
      { label: "Median", value: med.toString() },
      { label: "Range", value: (arr[arr.length - 1] - arr[0]).toString() },
      { label: "Std Deviation", value: Math.sqrt(variance).toFixed(4) },
      { label: "Count", value: arr.length }
    ]
  };
};

export const calcStatistics: CalcFunction = (v) => {
  const arr = String(v.data).split(',').map(Number).filter(n => !isNaN(n));
  if (arr.length < 2) return { main: { label: "Error", value: "Enter at least 2 numbers" } };
  const n = arr.length;
  const mean = arr.reduce((s, x) => s + x, 0) / n;
  const popVar = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const sampleVar = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
  const popSD = Math.sqrt(popVar);
  const sampleSD = Math.sqrt(sampleVar);
  const sorted = [...arr].sort((a, b) => a - b);
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const skew = popSD > 0 ? arr.reduce((s, x) => s + ((x - mean) / popSD) ** 3, 0) / n : 0;
  const cv = mean !== 0 ? (popSD / Math.abs(mean)) * 100 : 0;
  const q1 = sorted[Math.floor(n * 0.25)], q3 = sorted[Math.floor(n * 0.75)];
  return {
    main: { label: "Mean", value: mean.toFixed(4) },
    secondary: [
      { label: "Median", value: median.toFixed(4) },
      { label: "Population Std Dev (σ)", value: popSD.toFixed(4) },
      { label: "Sample Std Dev (s)", value: sampleSD.toFixed(4) },
      { label: "Variance (σ²)", value: popVar.toFixed(4) },
      { label: "Min / Max", value: `${sorted[0]} / ${sorted[n - 1]}` },
      { label: "Skewness", value: skew.toFixed(4) },
      { label: "CV (Coeff. of Variation)", value: cv.toFixed(2) + "%" },
      { label: "Q1 / Q3 (IQR)", value: `${q1} / ${q3}` },
      { label: "Sum", value: arr.reduce((s, x) => s + x, 0).toFixed(2) },
      { label: "Count", value: n }
    ]
  };
};

export const calcMatrix2x2: CalcFunction = (v) => {
  const a = Number(v.a) || 0;
  const b = Number(v.b) || 0;
  const c = Number(v.c) || 0;
  const d = Number(v.d) || 0;
  const det = a * d - b * c;
  const trace = a + d;
  const inv = det !== 0 ? `[${(d / det).toFixed(3)}, ${(-b / det).toFixed(3)}; ${(-c / det).toFixed(3)}, ${(a / det).toFixed(3)}]` : "No inverse (det=0)";
  return {
    main: { label: "Determinant", value: det.toFixed(4) },
    secondary: [
      { label: "Trace", value: trace.toFixed(4) },
      { label: "Rank", value: det !== 0 ? "2" : "1 or 0" },
      { label: "Inverse", value: inv }
    ]
  };
};

export const calcCombinations: CalcFunction = (v) => {
  const n = Math.floor(Number(v.n) || 0);
  const r = Math.min(Math.floor(Number(v.r) || 0), n);
  const calcNCr = (num1: number, num2: number) => {
    let r2 = num2;
    if (r2 > num1 - r2) r2 = num1 - r2;
    let res = 1;
    for (let i = 0; i < r2; i++) res = res * (num1 - i) / (i + 1);
    return Math.round(res);
  };
  const calcNPr = (num1: number, num2: number) => {
    let res = 1;
    for (let i = num1; i > num1 - num2; i--) res *= i;
    return res;
  };
  const nCr = calcNCr(n, r);
  const nPr = calcNPr(n, r);
  const favorable = Number(v.favorable) || 0;
  const prob = favorable / nCr;
  return {
    main: { label: `C(${n},${r}) Combinations`, value: nCr.toLocaleString() },
    secondary: [
      { label: `P(${n},${r}) Permutations`, value: nPr.toLocaleString() },
      { label: "Probability", value: isFinite(prob) ? (prob * 100).toFixed(4) + "%" : "0%" },
      { label: "Odds", value: prob > 0 ? `1 in ${Math.round(1 / prob).toLocaleString()}` : "N/A" }
    ]
  };
};

export const calcLcmGcd: CalcFunction = (v) => {
  const gcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : gcd(y, x % y);
  const lcm = (x: number, y: number): number => Math.abs(x * y) / (gcd(x, y) || 1);
  const a = Math.floor(Number(v.a) || 0);
  const b = Math.floor(Number(v.b) || 0);
  const c = Math.floor(Number(v.c) || 0);
  let g = gcd(a, b);
  let l = lcm(a, b);
  if (c > 0) {
    g = gcd(g, c);
    l = lcm(l, c);
  }
  return {
    main: { label: "LCM", value: l.toLocaleString() },
    secondary: [
      { label: "GCD / HCF", value: g.toLocaleString() },
      { label: "LCM × GCD", value: (l * g).toLocaleString() },
      { label: "Verification (a×b)", value: (a * b).toLocaleString() }
    ]
  };
};

export const calcRomanNumeral: CalcFunction = (v) => {
  const n = Math.min(3999, Math.max(1, Math.floor(Number(v.num) || 1)));
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let rem = n;
  let roman = "";
  for (let i = 0; i < vals.length; i++) {
    while (rem >= vals[i]) {
      roman += syms[i];
      rem -= vals[i];
    }
  }
  return {
    main: { label: "Roman Numeral", value: roman },
    secondary: [
      { label: "Arabic", value: n.toLocaleString() },
      { label: "Binary", value: n.toString(2) },
      { label: "Hex", value: n.toString(16).toUpperCase() }
    ]
  };
};

export const calcTriangleArea: CalcFunction = (v) => {
  const a = Number(v.a) || 0;
  const b = Number(v.b) || 0;
  const c = Number(v.c) || 0;
  if (a + b <= c || b + c <= a || a + c <= b) {
    return { main: { label: "Error", value: "Not a valid triangle" } };
  }
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const A = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)) * 180 / Math.PI;
  const B = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)) * 180 / Math.PI;
  const C = 180 - A - B;
  const type = a === b && b === c ? "Equilateral" : (a === b || b === c || a === c) ? "Isosceles" : "Scalene";
  return {
    main: { label: "Area", value: area.toFixed(4) + " sq units" },
    secondary: [
      { label: "Perimeter", value: (a + b + c).toFixed(4) },
      { label: "Angle A", value: A.toFixed(2) + "°" },
      { label: "Angle B", value: B.toFixed(2) + "°" },
      { label: "Angle C", value: C.toFixed(2) + "°" },
      { label: "Type", value: type }
    ]
  };
};

export const calcScientific: CalcFunction = (v) => {
  const x = parseFloat(String(v.expr)) || 0;
  const rad = v.unit === "Degrees" ? x * Math.PI / 180 : x;
  return {
    main: { label: "sin(" + x + (v.unit === "Degrees" ? "°" : "rad") + ")", value: Math.sin(rad).toFixed(8) },
    secondary: [
      { label: "cos", value: Math.cos(rad).toFixed(8) },
      { label: "tan", value: Math.abs(Math.cos(rad)) < 1e-10 ? "undefined" : Math.tan(rad).toFixed(8) },
      { label: "√x", value: x >= 0 ? Math.sqrt(x).toFixed(8) : "undefined" },
      { label: "x²", value: (x * x).toFixed(4) },
      { label: "x³", value: (x * x * x).toFixed(4) },
      { label: "ln(x)", value: x > 0 ? Math.log(x).toFixed(8) : "undefined" },
      { label: "log₁₀(x)", value: x > 0 ? Math.log10(x).toFixed(8) : "undefined" },
      { label: "eˣ", value: Math.exp(x).toExponential(6) }
    ]
  };
};

export const calcFraction: CalcFunction = (v) => {
  const d1 = Number(v.d1) || 1;
  const d2 = Number(v.d2) || 1;
  const n1 = Number(v.n1) || 0;
  const n2 = Number(v.n2) || 0;
  if (!d1 || !d2) return { main: { label: "Error", value: "Denominator cannot be 0" } };
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  let rn = 0, rd = 1;
  const op = String(v.op || "Add");
  if (op.startsWith("Add")) {
    rn = n1 * d2 + n2 * d1;
    rd = d1 * d2;
  } else if (op.startsWith("Sub")) {
    rn = n1 * d2 - n2 * d1;
    rd = d1 * d2;
  } else if (op.startsWith("Mul")) {
    rn = n1 * n2;
    rd = d1 * d2;
  } else {
    rn = n1 * d2;
    rd = d1 * n2;
  }
  const g = Math.abs(gcd(Math.abs(rn), Math.abs(rd))) || 1;
  const sn = rn / g;
  const sd = rd / g;
  return {
    main: { label: "Result", value: (sd === 1 ? sn.toString() : sn + "/" + sd) + " = " + (rn / rd).toFixed(6) },
    secondary: [
      { label: "Simplified", value: sn + "/" + sd },
      { label: "Decimal", value: (rn / rd).toFixed(8) },
      { label: "Mixed Number", value: Math.abs(sn) > Math.abs(sd) ? Math.floor(sn / sd) + " " + Math.abs(sn % sd) + "/" + sd : sn + "/" + sd },
      { label: "Expression", value: n1 + "/" + d1 + " " + (op.split(" ")[1] || "+") + " " + n2 + "/" + d2 }
    ]
  };
};

export const calcStdDev: CalcFunction = (v) => {
  const arr = String(v.data).split(',').map(Number).filter(n => !isNaN(n) && String(n).trim() !== '');
  if (arr.length < 2) return { main: { label: "Error", value: "Enter at least 2 numbers" } };
  const n = arr.length, mean = arr.reduce((s, x) => s + x, 0) / n;
  const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const popSD = Math.sqrt(variance);
  const sampleVar = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
  const sampleSD = Math.sqrt(sampleVar);
  arr.sort((a, b) => a - b);
  return {
    main: { label: "Population Std Dev (σ)", value: popSD.toFixed(6) },
    secondary: [
      { label: "Sample Std Dev (s)", value: sampleSD.toFixed(6) },
      { label: "Mean (μ)", value: mean.toFixed(6) },
      { label: "Variance (σ²)", value: variance.toFixed(6) },
      { label: "Min", value: arr[0].toString() },
      { label: "Max", value: arr[arr.length - 1].toString() },
      { label: "Range", value: (arr[arr.length - 1] - arr[0]).toString() },
      { label: "Count (n)", value: n }
    ]
  };
};

export const calcLinearEq: CalcFunction = (v) => {
  const a = Number(v.a_eq) || 0;
  const b = Number(v.b_eq) || 0;
  const c = Number(v.c_eq) || 0;
  if (a === 0) return { main: { label: "Error", value: b === c ? "Infinite solutions" : "No solution" } };
  const x = (c - b) / a;
  return {
    main: { label: "x", value: x.toFixed(8) },
    secondary: [
      { label: "Equation", value: a + "x + " + b + " = " + c },
      { label: "Step 1: Subtract b", value: a + "x = " + (c - b) },
      { label: "Step 2: Divide by a", value: "x = " + (c - b) + "/" + a },
      { label: "Verification", value: a + "×" + x.toFixed(4) + " + " + b + " = " + (a * x + b).toFixed(4) }
    ]
  };
};

export const calcCircleCalc: CalcFunction = (v) => {
  const r = Number(v.radius) || 0;
  const a = Number(v.angle) || 0;
  return {
    main: { label: "Circle Area", value: (Math.PI * r * r).toFixed(4) + " sq units" },
    secondary: [
      { label: "Circumference (2πr)", value: (2 * Math.PI * r).toFixed(4) + " units" },
      { label: "Diameter", value: (2 * r).toString() + " units" },
      { label: "Arc Length (" + a + "°)", value: (2 * Math.PI * r * a / 360).toFixed(4) + " units" },
      { label: "Sector Area (" + a + "°)", value: (Math.PI * r * r * a / 360).toFixed(4) + " sq units" },
      { label: "Sphere Volume (4/3πr³)", value: ((4 / 3) * Math.PI * r * r * r).toFixed(4) + " cu units" },
      { label: "Sphere Surface Area (4πr²)", value: (4 * Math.PI * r * r).toFixed(4) + " sq units" }
    ]
  };
};

export const calcDeterminant: CalcFunction = (v) => {
  const a11 = Number(v.a11) || 0, a12 = Number(v.a12) || 0, a13 = Number(v.a13) || 0;
  const a21 = Number(v.a21) || 0, a22 = Number(v.a22) || 0, a23 = Number(v.a23) || 0;
  const a31 = Number(v.a31) || 0, a32 = Number(v.a32) || 0, a33 = Number(v.a33) || 0;
  const det = a11 * (a22 * a33 - a23 * a32)
            - a12 * (a21 * a33 - a23 * a31)
            + a13 * (a21 * a32 - a22 * a31);
  const trace = a11 + a22 + a33;
  return {
    main: { label: "Determinant", value: det.toFixed(6) },
    secondary: [
      { label: "Trace (sum of diagonal)", value: trace.toString() },
      { label: "Is Invertible?", value: det !== 0 ? "Yes (det ≠ 0)" : "No (det = 0, singular)" },
      { label: "Minor M₁₁", value: (a22 * a33 - a23 * a32).toFixed(4) },
      { label: "Minor M₁₂", value: (a21 * a33 - a23 * a31).toFixed(4) },
      { label: "Matrix", value: `[${a11},${a12},${a13}] [${a21},${a22},${a23}] [${a31},${a32},${a33}]` }
    ]
  };
};

export const calcComplexNum: CalcFunction = (v) => {
  const a1 = Number(v.a1) || 0;
  const b1 = Number(v.b1) || 0;
  const a2 = Number(v.a2) || 0;
  const b2 = Number(v.b2) || 0;
  let ra = 0, rb = 0;
  const op = String(v.op_c || "Add");
  if (op.startsWith("Add")) {
    ra = a1 + a2;
    rb = b1 + b2;
  } else if (op.startsWith("Sub")) {
    ra = a1 - a2;
    rb = b1 - b2;
  } else if (op.startsWith("Mul")) {
    ra = a1 * a2 - b1 * b2;
    rb = a1 * b2 + b1 * a2;
  } else {
    const d = a2 * a2 + b2 * b2;
    if (!d) return { main: { label: "Error", value: "Division by zero" } };
    ra = (a1 * a2 + b1 * b2) / d;
    rb = (b1 * a2 - a1 * b2) / d;
  }
  const mag1 = Math.sqrt(a1 * a1 + b1 * b1);
  const mag2 = Math.sqrt(a2 * a2 + b2 * b2);
  const magR = Math.sqrt(ra * ra + rb * rb);
  const fmt = (a: number, b: number) => a.toFixed(4) + (b >= 0 ? "+" : "") + b.toFixed(4) + "i";
  return {
    main: { label: "Result", value: fmt(ra, rb) },
    secondary: [
      { label: "Real Part", value: ra.toFixed(6) },
      { label: "Imaginary Part", value: rb.toFixed(6) + "i" },
      { label: "Magnitude |z|", value: magR.toFixed(6) },
      { label: "Argument (θ)", value: (Math.atan2(rb, ra) * 180 / Math.PI).toFixed(4) + "°" },
      { label: "|z₁|", value: mag1.toFixed(4) },
      { label: "|z₂|", value: mag2.toFixed(4) }
    ]
  };
};
