/* ═══════════════════════════════════════════════════
   Calc Labz — Finance Calculation Functions
   Ported from calculators-finance.js
   Pure functions — no DOM dependencies
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcEMI: CalcFunction = (v) => {
  const P = Number(v.principal) || 0;
  const r = (Number(v.rate) || 0) / 12 / 100;
  const n = Number(v.tenure) || 1;
  const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;
  return {
    main: { label: 'Monthly EMI', value: '₹' + Math.round(emi).toLocaleString() },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(interest).toLocaleString() },
      { label: 'Total Payment', value: '₹' + Math.round(total).toLocaleString() },
      { label: 'Interest %', value: ((interest / (P || 1)) * 100).toFixed(1) + '%' },
    ],
    chart: {
      a: Math.round(P), b: Math.round(interest), lA: 'Principal', lB: 'Interest',
      timeline: (() => {
        const labels: string[] = [], invested: number[] = [], intPaid: number[] = [], bal: number[] = [];
        const years = Math.ceil(n / 12);
        let balance = P, totPrin = 0, totInt = 0;
        for (let yr = 1; yr <= years; yr++) {
          const monthsThisYear = Math.min(12, n - (yr - 1) * 12);
          for (let mo = 0; mo < monthsThisYear; mo++) {
            const intMo = balance * r;
            const prinMo = emi - intMo;
            balance -= prinMo; totPrin += prinMo; totInt += intMo;
          }
          labels.push('Yr ' + yr);
          invested.push(Math.round(totPrin));
          intPaid.push(Math.round(totInt));
          bal.push(Math.max(0, Math.round(balance)));
        }
        return {
          labels, datasets: [
            { label: 'Principal Paid', data: invested, fill: false },
            { label: 'Interest Paid', data: intPaid, fill: false },
            { label: 'Balance', data: bal, fill: true },
          ]
        };
      })()
    }
  };
};

export const calcSIP: CalcFunction = (v) => {
  const P = Number(v.monthly) || 0;
  const r = (Number(v.return) || 0) / 12 / 100;
  const n = (Number(v.years) || 0) * 12;
  const FV = r === 0 ? P * n : P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = P * n;
  const returns = FV - invested;
  return {
    main: { label: 'Future Value', value: '₹' + Math.round(FV).toLocaleString() },
    secondary: [
      { label: 'Total Invested', value: '₹' + invested.toLocaleString() },
      { label: 'Expected Returns', value: '₹' + Math.round(returns).toLocaleString(), pos: true },
      { label: 'Return %', value: ((returns / (invested || 1)) * 100).toFixed(1) + '%', pos: true },
    ],
    chart: {
      a: Math.round(invested), b: Math.round(returns), lA: 'Invested', lB: 'Returns',
      timeline: (() => {
        const labels: string[] = [], invArr: number[] = [], corpusArr: number[] = [];
        const years = Number(v.years) || 0;
        for (let yr = 1; yr <= years; yr++) {
          const months = yr * 12;
          const fv = r === 0 ? P * months : P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
          labels.push('Yr ' + yr);
          invArr.push(Math.round(P * months));
          corpusArr.push(Math.round(fv));
        }
        return {
          labels, datasets: [
            { label: 'Amount Invested', data: invArr, fill: false },
            { label: 'Corpus Value', data: corpusArr, fill: true },
          ]
        };
      })()
    }
  };
};

export const calcGST: CalcFunction = (v) => {
  const net = Number(v.net) || 0;
  const rate = parseFloat(String(v.rate || '18'));
  const gst = net * rate / 100;
  const gross = net + gst;
  return {
    main: { label: 'Gross Amount (with GST)', value: '₹' + gross.toFixed(2) },
    secondary: [
      { label: 'Net Amount (Pre-GST)', value: '₹' + net.toFixed(2) },
      { label: 'Total GST', value: '₹' + gst.toFixed(2) },
      { label: 'CGST (' + rate / 2 + '%)', value: '₹' + (gst / 2).toFixed(2) },
      { label: 'SGST (' + rate / 2 + '%)', value: '₹' + (gst / 2).toFixed(2) },
      { label: 'IGST (' + rate + '%)', value: '₹' + gst.toFixed(2) },
    ],
    chart: { labels: ['Net Amount', 'CGST', 'SGST'], data: [net, gst / 2, gst / 2] }
  };
};

export const calcPreGST: CalcFunction = (v) => {
  const gross = Number(v.gross) || 0;
  const rate = parseFloat(String(v.rate || '18'));
  const net = gross * 100 / (100 + rate);
  const gst = gross - net;
  return {
    main: { label: 'Pre-GST / Net Price', value: '₹' + net.toFixed(2) },
    secondary: [
      { label: 'GST-Inclusive Price (given)', value: '₹' + gross.toFixed(2) },
      { label: 'GST Amount Included', value: '₹' + gst.toFixed(2) },
      { label: 'CGST (' + rate / 2 + '%)', value: '₹' + (gst / 2).toFixed(2) },
      { label: 'SGST (' + rate / 2 + '%)', value: '₹' + (gst / 2).toFixed(2) },
      { label: 'IGST (' + rate + '%)', value: '₹' + gst.toFixed(2) },
    ]
  };
};

export const calcCompoundInterest: CalcFunction = (v) => {
  const P = Number(v.principal) || 0;
  const rate = Number(v.rate) || 0;
  const time = Number(v.time) || 0;
  const compound = String(v.compound || 'Annually');
  const nMap: Record<string, number> = { Annually: 1, 'Semi-annually': 2, Quarterly: 4, Monthly: 12, Daily: 365 };
  const n = nMap[compound] || 1;
  const r = rate / 100;
  const amount = P * Math.pow(1 + r / n, n * time);
  const ci = amount - P;
  return {
    main: { label: 'Compound Interest', value: '₹' + ci.toFixed(2) },
    secondary: [
      { label: 'Total Amount', value: '₹' + amount.toFixed(2) },
      { label: 'Doubling Time', value: (r === 0 ? 0 : Math.log(2) / Math.log(1 + r / n) / n).toFixed(2) + ' years' },
      { label: 'Growth', value: ((amount / (P || 1) - 1) * 100).toFixed(2) + '%', pos: true },
    ]
  };
};

export const calcSimpleInterest: CalcFunction = (v) => {
  const P = Number(v.principal) || 0;
  const rate = Number(v.rate) || 0;
  const time = Number(v.time) || 0;
  const si = (P * rate * time) / 100;
  const total = P + si;
  return {
    main: { label: 'Simple Interest', value: '₹' + si.toFixed(2) },
    secondary: [
      { label: 'Total Amount', value: '₹' + total.toFixed(2) },
      { label: 'Effective Rate', value: rate + '%' },
      { label: 'Monthly Interest', value: '₹' + (si / ((time * 12) || 1)).toFixed(2) },
    ]
  };
};

export const calcIncomeTax: CalcFunction = (v) => {
  const income = Number(v.income) || 0;
  const regime = String(v.regime || 'New Regime');
  const age = String(v.age || 'Below 60');
  let tax = 0;
  let taxable = 0;
  let surcharge = 0;

  if (regime === 'New Regime') {
    // Budget 2025-26: Standard deduction ₹75,000, rebate up to ₹12L taxable
    const slabs: [number, number][] = [[400000, 0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25], [Infinity, 0.30]];
    taxable = Math.max(0, income - 75000);
    let rem = taxable;
    for (const [lim, rate] of slabs) {
      if (rem <= 0) break;
      const chunk = Math.min(rem, lim);
      tax += chunk * rate; rem -= chunk;
    }
    // Rebate u/s 87A: No tax if taxable income <= ₹12,00,000
    if (taxable <= 1200000) {
      tax = 0;
    } else {
      // Marginal relief: tax payable cannot exceed (taxable income - 12,00,000)
      // This prevents a sudden cliff where ₹12,00,001 taxable income triggers full tax
      const marginalRelief = taxable - 1200000;
      if (tax > marginalRelief) tax = marginalRelief;
    }
    // Surcharge for new regime (Budget 2025-26)
    if (income > 50000000) surcharge = tax * 0.25;       // >5Cr: 25% (capped at 25% for new regime)
    else if (income > 20000000) surcharge = tax * 0.25;  // >2Cr: 25%
    else if (income > 10000000) surcharge = tax * 0.15;  // >1Cr: 15%
    else if (income > 5000000) surcharge = tax * 0.10;   // >50L: 10%
  } else {
    const exempt = age === 'Below 60' ? 250000 : age === '60-80 years' ? 300000 : 500000;
    taxable = Math.max(0, income - 50000 - exempt);
    let rem = taxable;
    const slabs: [number, number][] = [[250000, 0.05], [500000, 0.20], [Infinity, 0.30]];
    for (const [lim, rate] of slabs) {
      if (rem <= 0) break;
      const chunk = Math.min(rem, lim);
      tax += chunk * rate; rem -= chunk;
    }
    // Old regime rebate u/s 87A: applies when TOTAL INCOME (not taxable) is up to ₹5L
    if (income <= 500000) tax = 0;
    // FIX: Surcharge for old regime
    if (income > 50000000) surcharge = tax * 0.37;       // >5Cr: 37%
    else if (income > 20000000) surcharge = tax * 0.25;  // >2Cr: 25%
    else if (income > 10000000) surcharge = tax * 0.15;  // >1Cr: 15%
    else if (income > 5000000) surcharge = tax * 0.10;   // >50L: 10%
  }
  const taxAfterSurcharge = Math.round(tax + surcharge);
  const cess = Math.round(taxAfterSurcharge * 0.04);
  const total = taxAfterSurcharge + cess;
  return {
    main: { label: 'Total Tax Payable', value: '₹' + total.toLocaleString() },
    secondary: [
      { label: 'Taxable Income', value: '₹' + Math.round(taxable).toLocaleString() },
      { label: 'Base Tax', value: '₹' + Math.round(tax).toLocaleString() },
      { label: 'Surcharge', value: surcharge > 0 ? '₹' + Math.round(surcharge).toLocaleString() : 'Nil' },
      { label: 'Health & Education Cess (4%)', value: '₹' + cess.toLocaleString() },
      { label: 'Effective Rate', value: (total / (income || 1) * 100).toFixed(2) + '%' },
      { label: 'Monthly Tax', value: '₹' + Math.round(total / 12).toLocaleString() },
    ]
  };
};

export const calcROI: CalcFunction = (v) => {
  const final = Number(v.final) || 0;
  const initial = Number(v.initial) || 1;
  const years = Number(v.years) || 1;
  const gain = final - initial;
  const roi = (gain / initial) * 100;
  const cagr = (Math.pow(final / initial, 1 / (years || 1)) - 1) * 100;
  return {
    main: { label: 'Net Gain', value: '₹' + gain.toFixed(2) },
    secondary: [
      { label: 'ROI', value: roi.toFixed(2) + '%', pos: gain > 0 },
      { label: 'CAGR', value: cagr.toFixed(2) + '%', pos: gain > 0 },
      { label: 'Multiplier', value: (final / initial).toFixed(2) + '×' },
    ]
  };
};

export const calcPPF: CalcFunction = (v) => {
  const contribution = Number(v.contribution) || 0;
  const rate = Number(v.rate) || 7.1;
  const years = Number(v.years) || 15;
  const annualContrib = Math.min(contribution * 12, 150000); // PPF max ₹1.5L/year
  const r = rate / 100;
  // PPF compounds annually on the running balance (not annuity formula)
  // Each year: balance = (previous_balance + annual_contribution) × (1 + r)
  let balance = 0;
  const labels: string[] = [], balArr: number[] = [], invArr: number[] = [];
  for (let yr = 1; yr <= years; yr++) {
    balance = (balance + annualContrib) * (1 + r);
    labels.push('Yr ' + yr);
    balArr.push(Math.round(balance));
    invArr.push(Math.round(annualContrib * yr));
  }
  const invested = annualContrib * years;
  const interest = balance - invested;
  return {
    main: { label: 'Maturity Amount', value: '₹' + Math.round(balance).toLocaleString() },
    secondary: [
      { label: 'Total Invested', value: '₹' + Math.round(invested).toLocaleString() },
      { label: 'Interest Earned', value: '₹' + Math.round(interest).toLocaleString(), pos: true },
      { label: 'Effective Yield', value: (interest / (invested || 1) * 100).toFixed(2) + '%' },
      { label: 'Annual Contribution', value: '₹' + annualContrib.toLocaleString() + (contribution * 12 > 150000 ? ' (capped at ₹1.5L)' : '') },
      { label: 'Tax Benefit (80C)', value: '₹' + Math.min(annualContrib, 150000).toLocaleString() + '/yr' },
    ],
    chart: {
      a: Math.round(invested), b: Math.round(interest), lA: 'Invested', lB: 'Interest',
      timeline: {
        labels,
        datasets: [
          { label: 'Amount Invested', data: invArr, fill: false },
          { label: 'Corpus Value', data: balArr, fill: true },
        ]
      }
    }
  };
};

export const calcFD: CalcFunction = (v) => {
  const principal = Number(v.principal) || 0;
  const rate = Number(v.rate) || 0;
  const years = Number(v.years) || 1;
  // FIX: Support selectable compounding frequency (was hardcoded to quarterly)
  const freqMap: Record<string, number> = {
    'Monthly': 12, 'Quarterly': 4, 'Half-Yearly': 2, 'Annually': 1
  };
  const compFreq = String(v.compounding || 'Quarterly');
  const freq = freqMap[compFreq] || 4;
  const P = principal, r = rate / 100 / freq, n = years * freq;
  const amount = P * Math.pow(1 + r, n), interest = amount - P;
  // Effective annual rate
  const ear = (Math.pow(1 + rate / 100 / freq, freq) - 1) * 100;
  return {
    main: { label: 'Maturity Amount', value: '₹' + Math.round(amount).toLocaleString() },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(interest).toLocaleString(), pos: true },
      { label: 'Principal', value: '₹' + P.toLocaleString() },
      { label: 'Effective Annual Rate', value: ear.toFixed(2) + '%' },
      { label: 'Compounding', value: compFreq + ' (' + freq + '×/yr)' },
      { label: 'Monthly Income (avg)', value: '₹' + Math.round(interest / ((years * 12) || 1)).toLocaleString() },
    ],
    chart: {
      a: P, b: Math.round(interest),
      lA: 'Principal', lB: 'Interest Earned',
    }
  };
};

export const calcMortgage: CalcFunction = (v) => {
  const amount = Number(v.amount) || 0;
  const rate = Number(v.rate) || 0;
  const term = Number(v.term) || 30;
  const P = amount, r = rate / 12 / 100, n = term * 12;
  const pmt = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total = pmt * n, interest = total - P;
  return {
    main: { label: 'Monthly Payment', value: '₹' + Math.round(pmt).toLocaleString() },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(interest).toLocaleString() },
      { label: 'Total Payment', value: '₹' + Math.round(total).toLocaleString() },
      { label: 'Interest Ratio', value: ((interest / (total || 1)) * 100).toFixed(1) + '%' },
    ]
  };
};

export const calcCarLoan: CalcFunction = (v) => {
  const amount = Number(v.amount) || 0;
  const rate = Number(v.rate) || 0;
  const tenure = Number(v.tenure) || 5;
  const P = amount, r = rate / 12 / 100, n = tenure * 12;
  const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total = emi * n, interest = total - P;
  return {
    main: { label: 'Monthly EMI', value: '₹' + Math.round(emi).toLocaleString() },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(interest).toLocaleString() },
      { label: 'Total Payment', value: '₹' + Math.round(total).toLocaleString() },
    ]
  };
};

export const calcBreakeven: CalcFunction = (v) => {
  const price = Number(v.price) || 0;
  const variable = Number(v.variable) || 0;
  const fixed = Number(v.fixed) || 0;
  const contrib = price - variable;
  if (contrib <= 0) return { main: { label: 'Error', value: 'Price must exceed variable cost' } };
  const units = fixed / contrib;
  const revenue = units * price;
  return {
    main: { label: 'Break-Even Units', value: Math.ceil(units).toLocaleString() },
    secondary: [
      { label: 'Break-Even Revenue', value: '₹' + Math.round(revenue).toLocaleString() },
      { label: 'Contribution Margin', value: '₹' + contrib.toFixed(2) },
      { label: 'Margin Ratio', value: ((contrib / (price || 1)) * 100).toFixed(1) + '%' },
    ]
  };
};

export const calcInflation: CalcFunction = (v) => {
  const amount = Number(v.amount) || 0;
  const rate = Number(v.rate) || 0;
  const years = Number(v.years) || 0;
  const future = amount * Math.pow(1 + rate / 100, years);
  const realValue = amount / Math.pow(1 + rate / 100, years);
  return {
    main: { label: 'Future Cost (same goods)', value: '₹' + Math.round(future).toLocaleString() },
    secondary: [
      { label: "Real Purchasing Power (in today's ₹)", value: '₹' + Math.round(realValue).toLocaleString() },
      { label: 'Amount Required Extra', value: '₹' + Math.round(future - amount).toLocaleString() },
      { label: 'Purchasing Power Erosion', value: ((1 - realValue / (amount || 1)) * 100).toFixed(1) + '%' },
      { label: 'Effective Annual Erosion', value: rate + '% p.a.' },
    ]
  };
};

export const calcSWP: CalcFunction = (v) => {
  const corpus = Number(v.corpus) || 0;
  const rate = Number(v.return) || 8;
  const withdrawal = Number(v.withdrawal) || 0;
  const r = rate / 12 / 100;
  const P = corpus;
  const W = withdrawal;
  const months = W <= P * r ? Infinity : r > 0 ? Math.log(W / (W - P * r)) / Math.log(1 + r) : P / (W || 1);
  const years = isFinite(months) ? Math.floor(months / 12) : 99;
  const remMonths = isFinite(months) ? Math.floor(months % 12) : 0;
  const totalWithdrawn = isFinite(months) ? W * months : W * 1200;
  return {
    main: { label: 'Corpus Lasts', value: isFinite(months) ? `${years}y ${remMonths}m` : 'Forever (withdrawal <= returns) [OK]' },
    secondary: [
      { label: 'Total Withdrawn', value: '₹' + Math.round(totalWithdrawn).toLocaleString() },
      { label: 'Monthly Income', value: '₹' + W.toLocaleString() },
      { label: 'Months', value: isFinite(months) ? Math.floor(months) + ' months' : 'Indefinite' }
    ]
  };
};

export const calcLumpsum: CalcFunction = (v) => {
  const amount = Number(v.amount) || 0;
  const rate = Number(v.return) || 0;
  const years = Number(v.years) || 0;
  const fv = amount * Math.pow(1 + rate / 100, years);
  const gain = fv - amount;
  return {
    main: { label: 'Future Value', value: '₹' + Math.round(fv).toLocaleString() },
    secondary: [
      { label: 'Total Gain', value: '₹' + Math.round(gain).toLocaleString(), pos: true },
      { label: 'Return %', value: ((gain / (amount || 1)) * 100).toFixed(1) + '%', pos: true },
      { label: 'Doubling Time (72 rule)', value: (rate === 0 ? 0 : 72 / rate).toFixed(1) + ' years' },
    ],
    chart: { a: Math.round(amount), b: Math.round(gain), lA: 'Principal', lB: 'Returns' }
  };
};

export const calcNPS: CalcFunction = (v) => {
  const currentAge = Number(v.currentAge) || 18;
  const retireAge = Number(v.retireAge) || 60;
  const monthly = Number(v.monthly) || 0;
  const rate = Number(v.return) || 10;
  const years = retireAge - currentAge;
  if (years <= 0) return { main: { label: 'Error', value: 'Retirement age must exceed current age' } };
  const r = rate / 12 / 100;
  const n = years * 12;
  const corpus = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  // If corpus ≤ ₹5L, 100% can be withdrawn as lumpsum (2024 rule)
  const canFullWithdraw = corpus <= 500000;
  const lumpPct = canFullWithdraw ? 1.0 : 0.6;
  const annuityPct = canFullWithdraw ? 0 : 0.4;
  const annuityCorpus = corpus * annuityPct;
  const monthlyPension = annuityCorpus > 0 ? annuityCorpus * 0.06 / 12 : 0;
  const labels: string[] = [], invArr: number[] = [], corpusArr: number[] = [];
  for (let yr = 1; yr <= years; yr++) {
    const mo = yr * 12;
    const fv = r === 0 ? monthly * mo : monthly * ((Math.pow(1 + r, mo) - 1) / r) * (1 + r);
    labels.push('Yr ' + yr);
    invArr.push(Math.round(monthly * mo));
    corpusArr.push(Math.round(fv));
  }
  return {
    main: { label: 'Estimated Corpus', value: '₹' + Math.round(corpus).toLocaleString() },
    secondary: [
      { label: `Lumpsum (${Math.round(lumpPct * 100)}%)`, value: '₹' + Math.round(corpus * lumpPct).toLocaleString() },
      { label: `Annuity (${Math.round(annuityPct * 100)}%)`, value: annuityCorpus > 0 ? '₹' + Math.round(annuityCorpus).toLocaleString() : 'N/A (full withdrawal)' },
      { label: 'Est. Monthly Pension', value: monthlyPension > 0 ? '₹' + Math.round(monthlyPension).toLocaleString() : 'N/A' },
      { label: 'Total Invested', value: '₹' + invested.toLocaleString() },
      { label: 'Wealth Gained', value: '₹' + Math.round(corpus - invested).toLocaleString(), pos: true },
      { label: 'Tax Benefit (80CCD)', value: 'Up to ₹2L/yr (₹1.5L 80C + ₹50K 80CCD1B)' },
    ],
    chart: {
      a: Math.round(invested), b: Math.round(corpus - invested), lA: 'Invested', lB: 'Returns',
      timeline: {
        labels,
        datasets: [
          { label: 'Amount Invested', data: invArr, fill: false },
          { label: 'Corpus Value', data: corpusArr, fill: true },
        ]
      }
    }
  };
};

export const calcGratuity: CalcFunction = (v) => {
  const salary = Number(v.salary) || 0;
  const years = Number(v.years) || 0;
  const leaveBalance = Number(v.leaveBalance) || 30;
  if (years < 5) {
    return {
      main: { label: 'Not Eligible', value: 'Minimum 5 years required' },
      secondary: [
        { label: 'Years Needed', value: (5 - years) + ' more years' },
        { label: 'Tip', value: 'Complete 4 years 240 days to qualify' }
      ]
    };
  }
  const gratuity = (salary * 15 * years) / 26;
  const taxable = Math.max(0, gratuity - 2000000);
  const leaveEncash = (salary / 30) * Math.min(leaveBalance, 300);
  const leTaxable = Math.max(0, leaveEncash - 2500000);
  const totalPayout = gratuity + leaveEncash;
  return {
    main: { label: 'Gratuity Amount', value: '₹' + Math.round(gratuity).toLocaleString() },
    secondary: [
      { label: 'Tax-Free Limit', value: '₹20,00,000' },
      { label: 'Taxable Gratuity', value: '₹' + Math.round(taxable).toLocaleString() },
      { label: 'Formula', value: '(Basic×15×Years)/26' },
      { label: 'Leave Encashment (' + leaveBalance + ' days)', value: '₹' + Math.round(leaveEncash).toLocaleString() },
      { label: 'Leave Tax-Free Limit', value: '₹25,00,000' },
      { label: 'Taxable Leave Encash', value: '₹' + Math.round(leTaxable).toLocaleString() },
      { label: 'Total Retirement Payout', value: '₹' + Math.round(totalPayout).toLocaleString(), pos: true },
      { label: 'Total Taxable', value: '₹' + Math.round(taxable + leTaxable).toLocaleString() }
    ]
  };
};

export const calcHRA: CalcFunction = (v) => {
  const basic = Number(v.basic) || 0;
  const hra = Number(v.hra) || 0;
  const rent = Number(v.rent) || 0;
  const metro = String(v.metro || 'Yes');
  const isMetro = metro.startsWith('Yes');
  const annBasic = basic * 12, annHra = hra * 12, annRent = rent * 12;
  const rule1 = annHra;
  const rule2 = annRent - 0.1 * annBasic;
  const rule3 = isMetro ? 0.5 * annBasic : 0.4 * annBasic;
  const exempt = Math.max(0, Math.min(rule1, rule2, rule3));
  const taxable = annHra - exempt;
  return {
    main: { label: 'HRA Exemption (Annual)', value: '₹' + Math.round(exempt).toLocaleString() },
    secondary: [
      { label: 'Taxable HRA', value: '₹' + Math.round(taxable).toLocaleString() },
      { label: 'Rule 1 — Actual HRA', value: '₹' + Math.round(rule1).toLocaleString() },
      { label: 'Rule 2 — Rent minus 10% Basic', value: '₹' + Math.max(0, Math.round(rule2)).toLocaleString() },
      { label: 'Rule 3 — ' + (isMetro ? '50' : '40') + '% of Basic', value: '₹' + Math.round(rule3).toLocaleString() },
      { label: 'Exemption = Minimum of 3 rules', value: '₹' + Math.round(exempt).toLocaleString() }
    ]
  };
};

export const calcCAGR: CalcFunction = (v) => {
  const begin = Number(v.begin) || 1;
  const end = Number(v.end) || 1;
  const yrs = Number(v.yrs) || 1;
  const cagr = (Math.pow(end / begin, 1 / (yrs || 1)) - 1) * 100;
  const absGain = end - begin;
  const totalRet = ((end / begin) - 1) * 100;
  return {
    main: { label: 'CAGR', value: cagr.toFixed(2) + '%' },
    secondary: [
      { label: 'Absolute Gain', value: '₹' + absGain.toLocaleString(), pos: true },
      { label: 'Total Return', value: totalRet.toFixed(2) + '%', pos: true },
      { label: 'Initial Value', value: '₹' + begin.toLocaleString() },
      { label: 'Final Value', value: '₹' + end.toLocaleString() },
      { label: 'Growth Multiplier', value: (end / begin).toFixed(2) + '×' },
    ]
  };
};

export const calcCreditCard: CalcFunction = (v) => {
  const balance = Number(v.balance) || 0;
  const apr = Number(v.apr) || 0;
  const minPct = Number(v.minPct) || 5;
  const extra = Number(v.extra) || 0;
  const monthlyRate = apr / 12 / 100;
  let bal = balance, months = 0, totalInt = 0, totalPaid = 0;
  const firstPayment = Math.max(bal * minPct / 100 + extra, 100);
  while (bal > 0.5 && months < 600) {
    const int = bal * monthlyRate;
    totalInt += int;
    // Minimum payment recalculated each month as % of current balance, with ₹100 floor
    const minPay = Math.max(bal * minPct / 100 + extra, 100);
    const pay = Math.min(bal + int, minPay);
    bal = bal + int - pay;
    totalPaid += pay;
    months++;
    if (bal < 0.5) bal = 0;
  }
  const yearsPayoff = Math.floor(months / 12);
  const remMonths = months % 12;
  return {
    main: { label: 'Total Interest Paid', value: '₹' + Math.round(totalInt).toLocaleString() },
    secondary: [
      { label: 'Time to Pay Off', value: months < 600 ? `${yearsPayoff}y ${remMonths}m (${months} months)` : '50+ years — consider balance transfer!' },
      { label: 'Total Amount Paid', value: '₹' + Math.round(totalPaid).toLocaleString() },
      { label: 'First Monthly Payment', value: '₹' + Math.round(firstPayment).toLocaleString() },
      { label: 'Interest Rate (monthly)', value: (apr / 12).toFixed(2) + '%' },
      { label: 'Interest/Principal Ratio', value: (totalInt / (balance || 1) * 100).toFixed(0) + '% — ' + (totalInt > balance ? 'You pay more in interest than the debt!' : 'Manageable') },
    ]
  };
};

export const calcNetWorth: CalcFunction = (v) => {
  const cash = Number(v.cash) || 0;
  const investments = Number(v.investments) || 0;
  const property = Number(v.property) || 0;
  const other = Number(v.other) || 0;
  const loans = Number(v.loans) || 0;
  const assets = cash + investments + property + other;
  const netWorth = assets - loans;
  return {
    main: { label: 'Net Worth', value: '₹' + netWorth.toLocaleString() },
    secondary: [
      { label: 'Total Assets', value: '₹' + assets.toLocaleString() },
      { label: 'Total Liabilities', value: '₹' + loans.toLocaleString() },
      { label: 'Debt-to-Asset Ratio', value: ((loans / (assets || 1)) * 100).toFixed(1) + '%' },
      { label: 'Status', value: netWorth >= 0 ? '✓ Positive' : '[!] Negative' },
    ]
  };
};

export const calcTDS: CalcFunction = (v) => {
  const type = String(v.type || 'Salary');
  const amount = Number(v.amount) || 0;
  const rates: Record<string, number> = { Salary: 10, 'Interest (194A)': 10, 'Commission (194H)': 5, 'Rent (194I)': 10, 'Professional (194J)': 10, 'Contractor (194C)': 1 };
  const rate = rates[type] || 10;
  const tds = amount * rate / 100;
  const net = amount - tds;
  const secMatch = type.match(/\(([^)]+)\)/);
  const section = secMatch ? secMatch[1] : '192B';
  return {
    main: { label: 'TDS Amount', value: '₹' + tds.toFixed(2) },
    secondary: [
      { label: 'Net Amount (after TDS)', value: '₹' + net.toFixed(2) },
      { label: 'TDS Rate', value: rate + '%' },
      { label: 'Gross Amount', value: '₹' + amount.toFixed(2) },
      { label: 'Section', value: section }
    ]
  };
};

export const calcEPF: CalcFunction = (v) => {
  const basic = Number(v.basic) || 0;
  const rate = Number(v.rate) || 8.15;
  const years = Number(v.years) || 30;
  const empContrib = basic * 0.12; // Employee: 12% to EPF
  // Employer: 12% total, split as 8.33% EPS + 3.67% EPF
  // EPS capped at ₹15,000 basic; excess goes to EPF
  const epsCap = 15000;
  const epsContrib = Math.min(basic, epsCap) * 0.0833;
  const empRContrib = basic * 0.12 - epsContrib; // Remaining goes to EPF
  const monthlyEPF = empContrib + empRContrib;
  const annualContrib = monthlyEPF * 12;
  const r = rate / 100;
  // EPF compounds annually on running balance
  let balance = 0;
  const labels: string[] = [], balArr: number[] = [], invArr: number[] = [];
  for (let yr = 1; yr <= years; yr++) {
    balance = (balance + annualContrib) * (1 + r);
    labels.push('Yr ' + yr);
    balArr.push(Math.round(balance));
    invArr.push(Math.round(annualContrib * yr));
  }
  const invested = monthlyEPF * years * 12;
  return {
    main: { label: 'EPF Corpus', value: '₹' + Math.round(balance).toLocaleString() },
    secondary: [
      { label: 'Employee EPF (12%)', value: '₹' + empContrib.toFixed(0) + '/mo' },
      { label: 'Employer EPF (3.67%+)', value: '₹' + Math.round(empRContrib) + '/mo' },
      { label: 'Employer EPS (8.33%)', value: '₹' + Math.round(epsContrib) + '/mo' + (basic > epsCap ? ' (capped at ₹15K basic)' : '') },
      { label: 'Total EPF Monthly', value: '₹' + Math.round(monthlyEPF) },
      { label: 'Total Invested in EPF', value: '₹' + Math.round(invested).toLocaleString() },
      { label: 'Interest Earned', value: '₹' + Math.round(balance - invested).toLocaleString(), pos: true },
      { label: 'Growth Multiplier', value: (balance / (invested || 1)).toFixed(2) + '×' },
    ],
    chart: {
      a: Math.round(invested), b: Math.round(balance - invested), lA: 'Invested', lB: 'Interest',
      timeline: {
        labels,
        datasets: [
          { label: 'Amount Invested', data: invArr, fill: false },
          { label: 'EPF Corpus', data: balArr, fill: true },
        ]
      }
    }
  };
};

export const calcProfitLoss: CalcFunction = (v) => {
  const sell = Number(v.sell) || 0;
  const cost = Number(v.cost) || 1;
  const pl = sell - cost;
  const plPct = (pl / cost) * 100;
  const margin = (pl / (sell || 1)) * 100;
  const markup = (pl / cost) * 100;
  return {
    main: { label: pl >= 0 ? 'Profit' : 'Loss', value: '₹' + Math.abs(pl).toFixed(2) },
    secondary: [
      { label: pl >= 0 ? 'Profit %' : 'Loss %', value: Math.abs(plPct).toFixed(2) + '%', pos: pl >= 0 },
      { label: 'Profit Margin', value: margin.toFixed(2) + '%' },
      { label: 'Markup %', value: markup.toFixed(2) + '%' },
      { label: 'To break even', value: '₹' + cost.toFixed(2) },
    ]
  };
};

export const calcStockReturn: CalcFunction = (v) => {
  const buyPrice = Number(v.buyPrice) || 0;
  const sellPrice = Number(v.sellPrice) || 0;
  const qty = Number(v.qty) || 0;
  const brokerage = Number(v.brokerage) || 0;
  const invested = buyPrice * qty + brokerage;
  const proceeds = sellPrice * qty - brokerage;
  const pl = proceeds - invested;
  const stts = (buyPrice + sellPrice) * qty * 0.001;
  const netPl = pl - stts;
  const roi = (netPl / (invested || 1)) * 100;
  return {
    main: { label: netPl >= 0 ? 'Net Profit' : 'Net Loss', value: '₹' + Math.abs(netPl).toFixed(2) },
    secondary: [
      { label: 'Invested', value: '₹' + invested.toFixed(2) },
      { label: 'Gross Profit', value: '₹' + pl.toFixed(2), pos: pl >= 0 },
      { label: 'STTS (0.1%)', value: '₹' + stts.toFixed(2) },
      { label: 'ROI', value: roi.toFixed(2) + '%', pos: roi >= 0 }
    ]
  };
};

export const calcMutualFundReturns: CalcFunction = (v) => {
  const buyNav = Number(v.buyNav) || 1;
  const sellNav = Number(v.sellNav) || 1;
  const units = Number(v.units) || 0;
  const years = Number(v.years) || 1;
  const invested = buyNav * units;
  const current = sellNav * units;
  const gain = current - invested;
  const absReturn = (gain / (invested || 1)) * 100;
  const cagr = (Math.pow(sellNav / buyNav, 1 / (years || 1)) - 1) * 100;
  return {
    main: { label: 'Current Value', value: '₹' + Math.round(current).toLocaleString() },
    secondary: [
      { label: 'Invested Amount', value: '₹' + Math.round(invested).toLocaleString() },
      { label: 'Gain', value: '₹' + Math.round(gain).toLocaleString(), pos: gain >= 0 },
      { label: 'Absolute Return', value: absReturn.toFixed(2) + '%', pos: gain >= 0 },
      { label: 'CAGR', value: cagr.toFixed(2) + '%', pos: gain >= 0 }
    ]
  };
};

export const calcTaxRegime: CalcFunction = (v) => {
  const income = Number(v.income) || 0;
  const sec80c = Number(v.sec80c) || 0;
  const nps = Number(v.nps) || 0;
  const med = Number(v.med) || 0;
  const hloan = Number(v.hloan) || 0;
  const hra_ex = Number(v.hra_ex) || 0;

  const std = 50000;
  const oldDeductions = Math.min(sec80c, 150000) + Math.min(nps, 50000) + med + Math.min(hloan, 200000) + hra_ex + std;
  const oldTaxable = Math.max(0, income - oldDeductions);
  const oldTax = (ti: number) => {
    if (ti <= 250000) return 0;
    if (ti <= 500000) return (ti - 250000) * 0.05;
    if (ti <= 1000000) return 12500 + (ti - 500000) * 0.20;
    return 112500 + (ti - 1000000) * 0.30;
  };
  // --- Old regime tax ---
  let oldTFinal = oldTax(oldTaxable);
  // Old regime rebate u/s 87A: applies when TOTAL INCOME (not taxable) <= 5L
  if (income <= 500000) oldTFinal = 0;
  const oldT = oldTFinal * 1.04;

  // --- New regime tax ---
  const newTaxable = Math.max(0, income - 75000);
  const newTax = (ti: number) => {
    if (ti <= 400000) return 0;
    if (ti <= 800000) return (ti - 400000) * 0.05;
    if (ti <= 1200000) return 20000 + (ti - 800000) * 0.10;
    if (ti <= 1600000) return 60000 + (ti - 1200000) * 0.15;
    if (ti <= 2000000) return 120000 + (ti - 1600000) * 0.20;
    if (ti <= 2400000) return 200000 + (ti - 2000000) * 0.25;
    return 300000 + (ti - 2400000) * 0.30;
  };
  let newT = newTax(newTaxable);
  if (newTaxable <= 1200000) {
    newT = 0;
  } else {
    // Marginal relief: tax cannot exceed (taxable - 12L) in new regime
    const marginalRelief = newTaxable - 1200000;
    if (newT > marginalRelief) newT = marginalRelief;
  }
  newT = newT * 1.04;

  const saving = oldT - newT;
  let breakEven = 0;
  for (let inc = 500000; inc <= 5000000; inc += 25000) {
    const oT2 = oldTax(Math.max(0, inc - oldDeductions)) * 1.04;
    let nT2 = newTax(Math.max(0, inc - 75000));
    const nTaxable2 = Math.max(0, inc - 75000);
    if (nTaxable2 <= 1200000) { nT2 = 0; } else { const mr = nTaxable2 - 1200000; if (nT2 > mr) nT2 = mr; }
    nT2 = nT2 * 1.04;
    if (oT2 <= nT2 && breakEven === 0) { breakEven = inc; break; }
  }
  const oldEffRate = income > 0 ? (oldT / income * 100) : 0;
  const newEffRate = income > 0 ? (newT / income * 100) : 0;
  const oldMarginal = oldTaxable > 1000000 ? '30%' : oldTaxable > 500000 ? '20%' : oldTaxable > 250000 ? '5%' : '0%';
  const newMarginal = newTaxable > 2400000 ? '30%' : newTaxable > 2000000 ? '25%' : newTaxable > 1600000 ? '20%' : newTaxable > 1200000 ? '15%' : newTaxable > 800000 ? '10%' : newTaxable > 400000 ? '5%' : '0%';

  return {
    main: { label: 'Better Regime', value: saving > 0 ? 'New Regime saves ₹' + Math.round(saving).toLocaleString() : saving < 0 ? 'Old Regime saves ₹' + Math.round(-saving).toLocaleString() : 'Both equal' },
    secondary: [
      { label: 'Old Regime Tax', value: '₹' + Math.round(oldT).toLocaleString() },
      { label: 'Old Taxable Income', value: '₹' + Math.round(oldTaxable).toLocaleString() },
      { label: 'Old Deductions Used', value: '₹' + Math.round(oldDeductions).toLocaleString() },
      { label: 'Old Effective Rate', value: oldEffRate.toFixed(2) + '%' },
      { label: 'Old Marginal Rate', value: oldMarginal },
      { label: 'New Regime Tax', value: '₹' + Math.round(newT).toLocaleString() },
      { label: 'New Taxable Income', value: '₹' + Math.round(newTaxable).toLocaleString() },
      { label: 'New Effective Rate', value: newEffRate.toFixed(2) + '%' },
      { label: 'New Marginal Rate', value: newMarginal },
      { label: 'Tax Saving', value: '₹' + Math.round(Math.abs(saving)).toLocaleString() + ' with ' + (saving > 0 ? 'New' : 'Old') + ' Regime', pos: true },
      { label: 'Monthly Tax (Old)', value: '₹' + Math.round(oldT / 12).toLocaleString() },
      { label: 'Monthly Tax (New)', value: '₹' + Math.round(newT / 12).toLocaleString() },
      { label: 'Break-even Income', value: breakEven > 0 ? '₹' + breakEven.toLocaleString() + ' — Old better above this' : 'Old not better up to ₹50L' }
    ],
    chart: { a: Math.round(oldT), b: Math.round(newT), lA: 'Old Regime Tax', lB: 'New Regime Tax' }
  };
};

export const calcCapitalGains: CalcFunction = (v) => {
  const buyPrice = Number(v.buyPrice) || 0;
  const sellPrice = Number(v.sellPrice) || 0;
  const holdMonths = Number(v.holdMonths) || 0;
  const assetType = String(v.assetType || 'Equity');
  const gain = sellPrice - buyPrice;
  const isEquity = assetType.startsWith('Equity');
  const isDebt = assetType.startsWith('Debt');
  let taxRate = 0, taxLabel = '', tax = 0;
  if (isEquity) {
    const isLT = holdMonths >= 12;
    if (isLT) { taxRate = 12.5; taxLabel = 'LTCG (Equity >12 mo)'; tax = Math.max(0, gain - 125000) * 0.125; }
    else { taxRate = 20; taxLabel = 'STCG (Equity <12 mo)'; tax = Math.max(0, gain) * 0.20; }
  } else if (isDebt) {
    // Post-2023: Debt fund gains are always taxed at slab rate, no LTCG benefit
    taxLabel = 'STCG (Debt — slab rate)'; taxRate = 30;
    tax = Math.max(0, gain) * 0.30;
  } else {
    // Property/Gold/Others: LTCG after 24 months at 12.5%
    const isLT = holdMonths >= 24;
    if (isLT) { taxRate = 12.5; taxLabel = 'LTCG (≥24 mo, no indexation)'; tax = Math.max(0, gain) * 0.125; }
    else { taxLabel = 'STCG (added to income)'; taxRate = 30; tax = Math.max(0, gain) * 0.30; }
  }
  const postTaxProfit = gain - tax;
  return {
    main: { label: taxLabel + ' Tax', value: '₹' + Math.round(tax).toLocaleString() },
    secondary: [
      { label: 'Capital Gain', value: '₹' + gain.toLocaleString(), pos: gain > 0, neg: gain < 0 },
      { label: 'Tax Rate', value: taxRate + '%' + (isDebt ? ' (slab — no LTCG for debt post-2023)' : '') },
      { label: 'Post-Tax Profit', value: '₹' + Math.round(postTaxProfit).toLocaleString(), pos: postTaxProfit > 0, neg: postTaxProfit < 0 },
      { label: 'Effective Return', value: ((postTaxProfit) / (buyPrice || 1) * 100).toFixed(2) + '%' },
      { label: 'Holding Period', value: holdMonths + ' months (' + (holdMonths / 12).toFixed(1) + ' years)' },
    ],
    chart: { a: Math.round(buyPrice), b: Math.round(Math.max(0, gain)), lA: 'Cost', lB: 'Gain' }
  };
};

export const calcPrepayment: CalcFunction = (v) => {
  const outstanding = Number(v.outstanding) || 0;
  const rate = Number(v.rate) || 8.5;
  const rem = Number(v.rem) || 120;
  const lump = Number(v.lump) || 0;
  const r = rate / 12 / 100;
  const totalInterest = (P: number, n: number) => {
    const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return emi * n - P;
  };
  const intBefore = totalInterest(outstanding, rem);
  const newP = Math.max(0, outstanding - lump);
  const intAfter = totalInterest(newP, rem);
  const saved = intBefore - intAfter;
  const emi = r === 0 ? outstanding / rem : outstanding * r * Math.pow(1 + r, rem) / (Math.pow(1 + r, rem) - 1);
  const newN = emi === newP * r ? Infinity : Math.log(emi / (emi - newP * r)) / Math.log(1 + r);
  const monthsSaved = isFinite(newN) ? rem - Math.ceil(newN) : 0;
  return {
    main: { label: 'Interest Saved', value: '₹' + Math.round(saved).toLocaleString(), pos: true },
    secondary: [
      { label: 'Months Saved', value: monthsSaved + ' months (' + Math.floor(monthsSaved / 12) + 'y ' + monthsSaved % 12 + 'm)' },
      { label: 'New Outstanding', value: '₹' + Math.round(newP).toLocaleString() },
      { label: 'Interest Without Prepayment', value: '₹' + Math.round(intBefore).toLocaleString() },
      { label: 'Interest After Prepayment', value: '₹' + Math.round(intAfter).toLocaleString() }
    ]
  };
};

export const calcStepUpSIP: CalcFunction = (v) => {
  const monthly = Number(v.monthly) || 0;
  const ret = Number(v.ret) || 12;
  const years = Number(v.years) || 10;
  const stepup = Number(v.stepup) || 10;
  let totalInvested = 0, fv = 0;
  const monthlyRate = ret / 12 / 100;
  let monthlySIP = monthly;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      fv = (fv + monthlySIP) * (1 + monthlyRate);
      totalInvested += monthlySIP;
    }
    monthlySIP *= (1 + stepup / 100);
  }
  const gains = fv - totalInvested;
  return {
    main: { label: 'Future Value', value: '₹' + Math.round(fv).toLocaleString() },
    secondary: [
      { label: 'Total Invested', value: '₹' + Math.round(totalInvested).toLocaleString() },
      { label: 'Wealth Gained', value: '₹' + Math.round(gains).toLocaleString(), pos: true },
      { label: 'Final Monthly SIP', value: '₹' + Math.round(monthlySIP).toLocaleString() },
      { label: 'Return Multiple', value: (fv / (totalInvested || 1)).toFixed(2) + '×' },
    ],
    chart: { a: Math.round(totalInvested), b: Math.round(gains), lA: 'Invested', lB: 'Gains' }
  };
};

export const calcSavingsGoal: CalcFunction = (v) => {
  const goal = Number(v.goal) || 0;
  const current = Number(v.current) || 0;
  const ret = Number(v.ret) || 12;
  const years = Number(v.years) || 5;
  const r = ret / 12 / 100, n = years * 12;
  const futureCurrentSavings = current * Math.pow(1 + r, n);
  const remaining = Math.max(0, goal - futureCurrentSavings);
  const monthly = remaining > 0 ? (r === 0 ? remaining / n : remaining * r / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
  return {
    main: { label: 'Monthly Savings Needed', value: '₹' + Math.round(monthly).toLocaleString() },
    secondary: [
      { label: 'Target Amount', value: '₹' + goal.toLocaleString() },
      { label: 'Future Value of Current Savings', value: '₹' + Math.round(futureCurrentSavings).toLocaleString() },
      { label: 'Gap to Fill via SIP', value: '₹' + Math.round(remaining).toLocaleString() },
      { label: 'Total New Investment', value: '₹' + Math.round(monthly * n).toLocaleString() },
      { label: 'Years to Goal', value: years + ' years' }
    ]
  };
};

export const calcDividendYield: CalcFunction = (v) => {
  const price = Number(v.price) || 1;
  const dividend = Number(v.dividend) || 0;
  const shares = Number(v.shares) || 0;
  const eps = Number(v.eps) || 1;
  const yieldVal = (dividend / price) * 100;
  const annualIncome = dividend * shares;
  const payout = (dividend / eps) * 100;
  return {
    main: { label: 'Dividend Yield', value: yieldVal.toFixed(2) + '%' },
    secondary: [
      { label: 'Annual Dividend Income', value: '₹' + annualIncome.toLocaleString() },
      { label: 'Monthly Income', value: '₹' + (annualIncome / 12).toFixed(0) },
      { label: 'Payout Ratio', value: payout.toFixed(1) + '%' },
      { label: 'Shares Held', value: shares.toLocaleString() },
      { label: 'Investment Value', value: '₹' + (price * shares).toLocaleString() }
    ]
  };
};

export const calcGoldInvestment: CalcFunction = (v) => {
  const buyRate = Number(v.buyRate) || 0;
  const currentRate = Number(v.currentRate) || 0;
  const grams = Number(v.grams) || 0;
  const making = Number(v.making) || 0;
  const buyTotal = (buyRate / 10) * grams * (1 + making / 100);
  const currentVal = (currentRate / 10) * grams;
  const profit = currentVal - buyTotal;
  const returns = (profit / (buyTotal || 1)) * 100;
  return {
    main: { label: 'Current Gold Value', value: '₹' + Math.round(currentVal).toLocaleString() },
    secondary: [
      { label: 'Total Buy Cost (incl. making)', value: '₹' + Math.round(buyTotal).toLocaleString() },
      { label: 'Profit / Loss', value: '₹' + Math.round(profit).toLocaleString(), pos: profit > 0 },
      { label: 'Return', value: returns.toFixed(2) + '%', pos: returns > 0 },
      { label: 'Gold Rate (per gram)', value: '₹' + (currentRate / 10).toFixed(0) }
    ]
  };
};

export const calcRD: CalcFunction = (v) => {
  const monthly_rd = Number(v.monthly_rd) || 0;
  const rate_rd = Number(v.rate_rd) || 0;
  const tenure_rd = Number(v.tenure_rd) || 12;
  const i = rate_rd / 4 / 100;
  const n = tenure_rd / 3;
  const denom = (1 - Math.pow(1 + i, -1 / 3));
  const M = denom === 0 ? monthly_rd * tenure_rd : monthly_rd * (Math.pow(1 + i, n) - 1) / denom;
  const invested = monthly_rd * tenure_rd;
  const interest = M - invested;
  return {
    main: { label: 'Maturity Amount', value: '₹' + Math.round(M).toLocaleString('en-IN') },
    secondary: [
      { label: 'Total Deposited', value: '₹' + invested.toLocaleString('en-IN') },
      { label: 'Interest Earned', value: '₹' + Math.round(interest).toLocaleString('en-IN'), pos: true },
      { label: 'Effective Return', value: ((interest / (invested || 1)) * 100).toFixed(2) + '%', pos: true }
    ],
    chart: { a: Math.round(invested), b: Math.round(interest), lA: 'Deposited', lB: 'Interest' }
  };
};

export const calcXIRR: CalcFunction = (v) => {
  const invested = Number(v.invested) || 1;
  const currentVal = Number(v.currentVal) || 1;
  const months_x = Number(v.months_x) || 12;
  const years = months_x / 12;
  const xirr = (Math.pow(currentVal / invested, 1 / (years || 1)) - 1) * 100;
  const absgain = currentVal - invested;
  const doubleYrs = (xirr === 0 ? 0 : 72 / xirr).toFixed(1);
  return {
    main: { label: 'XIRR (Annualised Return)', value: xirr.toFixed(2) + '%' },
    secondary: [
      { label: 'Absolute Gain', value: '₹' + Math.round(absgain).toLocaleString('en-IN'), pos: absgain > 0 },
      { label: 'Total Return', value: ((absgain / invested) * 100).toFixed(2) + '%', pos: absgain > 0 },
      { label: 'Rule of 72 — Doubles in', value: xirr > 0 ? doubleYrs + ' years' : 'N/A' },
      { label: 'Duration', value: months_x + ' months (' + years.toFixed(1) + ' years)' }
    ]
  };
};

export const calcLoanEligibility: CalcFunction = (v) => {
  const income_le = Number(v.income_le) || 0;
  const existing_emi = Number(v.existing_emi) || 0;
  const rate_le = Number(v.rate_le) || 8.5;
  const tenure_le = Number(v.tenure_le) || 120;
  const maxEMI = (income_le - existing_emi) * 0.5;
  const r = rate_le / 12 / 100, n = tenure_le;
  const maxLoan = r === 0 ? maxEMI * n : maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  const foir = ((existing_emi + maxEMI) / (income_le || 1) * 100).toFixed(1);
  return {
    main: { label: 'Maximum Loan Eligibility', value: '₹' + Math.round(maxLoan).toLocaleString('en-IN') },
    secondary: [
      { label: 'Max Affordable EMI', value: '₹' + Math.round(maxEMI).toLocaleString('en-IN') },
      { label: 'FOIR (Fixed Obligation Ratio)', value: foir + '%' },
      { label: 'Banks prefer FOIR below', value: '50%' },
      { label: 'Tenure', value: tenure_le + ' months' }
    ]
  };
};

export const calcBalanceTransfer: CalcFunction = (v) => {
  const outstanding_bt = Number(v.outstanding_bt) || 0;
  const remaining_bt = Number(v.remaining_bt) || 12;
  const currentRate = Number(v.currentRate) || 10;
  const newRate = Number(v.newRate) || 8.5;
  const processingFee = Number(v.processingFee) || 0;

  const P = outstanding_bt, n = remaining_bt;
  const totalInt = (rate: number) => {
    const r = rate / 12 / 100;
    const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return emi * n - P;
  };
  const intOld = totalInt(currentRate);
  const intNew = totalInt(newRate);
  const saved = intOld - intNew - processingFee;
  const diffInt = intOld - intNew;
  const breakEven = saved > 0 && diffInt > 0 ? Math.ceil(processingFee / (diffInt / n)) : 0;
  return {
    main: { label: 'Net Interest Saved', value: '₹' + Math.round(saved).toLocaleString('en-IN'), pos: saved > 0 },
    secondary: [
      { label: 'Interest at Current Rate', value: '₹' + Math.round(intOld).toLocaleString('en-IN') },
      { label: 'Interest at New Rate', value: '₹' + Math.round(intNew).toLocaleString('en-IN') },
      { label: 'Processing Fee', value: '₹' + processingFee.toLocaleString('en-IN') },
      { label: 'Break-Even in', value: saved > 0 ? breakEven + ' months' : 'Not beneficial' },
      { label: 'Verdict', value: saved > 0 ? '[OK] Transfer beneficial' : '[X] Not worth transferring' }
    ]
  };
};

export const calcSSY: CalcFunction = (v) => {
  const girlAge = Number(v.girlAge) || 0;
  const annual_ssy = Number(v.annual_ssy) || 0;
  const rate_ssy = Number(v.rate_ssy) || 8.2;
  const depositYears = 15, maturityAge = 21;
  const totalYears = maturityAge - girlAge;
  const r = rate_ssy / 100;
  let balance = 0;
  for (let y = 1; y <= depositYears; y++) balance = (balance + annual_ssy) * (1 + r);
  for (let y = depositYears + 1; y <= totalYears; y++) balance = balance * (1 + r);
  const invested = annual_ssy * depositYears;
  return {
    main: { label: 'Maturity Amount (at age 21)', value: '₹' + Math.round(balance).toLocaleString('en-IN') },
    secondary: [
      { label: 'Total Invested (15 years)', value: '₹' + invested.toLocaleString('en-IN') },
      { label: 'Interest Earned', value: '₹' + Math.round(balance - invested).toLocaleString('en-IN'), pos: true },
      { label: 'Years to Maturity', value: totalYears + ' years' },
      { label: 'Tax Benefit', value: '80C deduction + tax-free maturity (EEE)' }
    ]
  };
};

export const calcSCSS: CalcFunction = (v) => {
  const principal_scss = Number(v.principal_scss) || 0;
  const rate_scss = Number(v.rate_scss) || 8.2;
  const P = Math.min(principal_scss, 3000000);
  const quarterly = P * rate_scss / 4 / 100;
  const annual = P * rate_scss / 100;
  const totalInterest = annual * 5;
  return {
    main: { label: 'Quarterly Interest', value: '₹' + Math.round(quarterly).toLocaleString('en-IN') },
    secondary: [
      { label: 'Annual Interest', value: '₹' + Math.round(annual).toLocaleString('en-IN') },
      { label: 'Total Interest (5 years)', value: '₹' + Math.round(totalInterest).toLocaleString('en-IN'), pos: true },
      { label: 'Principal at Maturity', value: '₹' + P.toLocaleString('en-IN') },
      { label: 'Effective Yield', value: rate_scss + '% p.a.' },
      { label: 'TDS applicable above', value: '₹50,000 interest/year' }
    ]
  };
};

export const calcAdvanceTax: CalcFunction = (v) => {
  const income = Number(v.income) || 0;
  const regime = String(v.regime || 'New Regime');
  const sec80c = Number(v.sec80c) || 0;
  const tds = Number(v.tds) || 0;
  let taxable = income;
  let tax = 0;
  if (regime === 'New Regime') {
    taxable = Math.max(0, income - 75000);
    const slabs = [[400000, 0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25], [Infinity, 0.30]];
    let rem = taxable;
    for (const [lim, rate] of slabs) { if (rem <= 0) break; const ch = Math.min(rem, lim); tax += ch * rate; rem -= ch; }
    if (taxable <= 1200000) tax = 0;
  } else {
    taxable = Math.max(0, income - 50000 - Math.min(sec80c, 150000));
    const slabs = [[250000, 0], [250000, 0.05], [500000, 0.20], [Infinity, 0.30]];
    let rem = taxable;
    for (const [lim, rate] of slabs) { if (rem <= 0) break; const ch = Math.min(rem, lim); tax += ch * rate; rem -= ch; }
  }
  const cess = tax * 0.04;
  const totalTax = Math.round(tax + cess);
  const net = Math.max(0, totalTax - tds);
  const q1 = Math.round(net * 0.15);
  const q2 = Math.round(net * 0.45) - q1;
  const q3 = Math.round(net * 0.75) - q1 - q2;
  const q4 = net - q1 - q2 - q3;
  return {
    main: { label: 'Net Advance Tax Payable', value: '₹' + net.toLocaleString() },
    secondary: [
      { label: 'Total Tax (incl. cess)', value: '₹' + totalTax.toLocaleString() },
      { label: 'Less: TDS', value: '₹' + tds.toLocaleString() },
      { label: 'Q1 (Jun 15) — 15%', value: '₹' + q1.toLocaleString() },
      { label: 'Q2 (Sep 15) — 45%', value: '₹' + (q1 + q2).toLocaleString() + ' (pay ₹' + q2.toLocaleString() + ')' },
      { label: 'Q3 (Dec 15) — 75%', value: '₹' + (q1 + q2 + q3).toLocaleString() + ' (pay ₹' + q3.toLocaleString() + ')' },
      { label: 'Q4 (Mar 15) — 100%', value: '₹' + net.toLocaleString() + ' (pay ₹' + q4.toLocaleString() + ')' }
    ],
    chart: { labels: ['Q1 (Jun)', 'Q2 (Sep)', 'Q3 (Dec)', 'Q4 (Mar)'], data: [q1, q2, q3, q4] }
  };
};

export const calcInhandSalary: CalcFunction = (v) => {
  const ctc = Number(v.ctc) || 0;
  const basic_pct = Number(v.basic_pct) || 40;
  const hra_pct = Number(v.hra_pct) || 50;
  const pf_pct = Number(v.pf_pct) || 12;
  const ptax = Number(v.ptax) || 200;
  const other_ded = Number(v.other_ded) || 0;

  const basic = ctc * basic_pct / 100;
  const hra = basic * hra_pct / 100;
  const pf_emp = basic * pf_pct / 100;
  const pf_er = basic * Math.min(pf_pct, 12) / 100;
  const special = Math.max(0, ctc - basic - hra - pf_er);
  const inhand = ctc - pf_emp - ptax - other_ded;
  return {
    main: { label: 'Monthly In-Hand Salary', value: '₹' + Math.round(inhand).toLocaleString() },
    secondary: [
      { label: 'Basic Salary', value: '₹' + Math.round(basic).toLocaleString() },
      { label: 'HRA', value: '₹' + Math.round(hra).toLocaleString() },
      { label: 'PF (Employee)', value: '₹' + Math.round(pf_emp).toLocaleString() },
      { label: 'PF (Employer)', value: '₹' + Math.round(pf_er).toLocaleString() },
      { label: 'Professional Tax', value: '₹' + ptax.toLocaleString() },
      { label: 'Special Allowance', value: '₹' + Math.round(special).toLocaleString() },
      { label: 'Annual In-Hand', value: '₹' + Math.round(inhand * 12).toLocaleString(), pos: true }
    ],
    chart: { labels: ['In-Hand', 'PF (Emp)', 'PF (Er)', 'PT', 'Other Ded'], data: [Math.round(inhand), Math.round(pf_emp), Math.round(pf_er), ptax, other_ded] }
  };
};

export const calcCtcBreakup: CalcFunction = (v) => {
  const ctc = Number(v.annual_ctc) || 0;
  const basic_pct = Number(v.basic_pct) || 40;
  const hra_pct = Number(v.hra_pct) || 50;
  const bonus_pct = Number(v.bonus_pct) || 10;
  const gratuity_inc = String(v.gratuity_inc || 'Yes');
  const ins = Number(v.insurance) || 0;

  const basic = ctc * basic_pct / 100;
  const hra = basic * hra_pct / 100;
  const bonus = ctc * bonus_pct / 100;
  const gratAmt = gratuity_inc === 'Yes' ? Math.round(basic * 15 / 26 / 12) * 12 : 0;
  const pfEr = Math.min(basic, 15000 * 12) * 0.12;
  const pfEmp = pfEr;
  const grossMonthly = (ctc - bonus - gratAmt - pfEr - ins) / 12;
  const monthlyPF = pfEmp / 12;
  const ptax = 200;
  const inhand = grossMonthly - monthlyPF - ptax;
  return {
    main: { label: 'Monthly In-Hand (est.)', value: '₹' + Math.round(inhand).toLocaleString() },
    secondary: [
      { label: 'Annual CTC', value: '₹' + Math.round(ctc).toLocaleString() },
      { label: 'Monthly Basic', value: '₹' + Math.round(basic / 12).toLocaleString() },
      { label: 'Monthly HRA', value: '₹' + Math.round(hra / 12).toLocaleString() },
      { label: 'Annual Bonus/Variable', value: '₹' + Math.round(bonus).toLocaleString() },
      { label: 'Employer PF (annual)', value: '₹' + Math.round(pfEr).toLocaleString() },
      { label: 'Gratuity (annual)', value: '₹' + Math.round(gratAmt).toLocaleString() },
      { label: 'Medical Insurance', value: '₹' + ins.toLocaleString() },
      { label: 'Annual In-Hand (approx.)', value: '₹' + Math.round(inhand * 12).toLocaleString(), pos: true }
    ],
    chart: {
      labels: ['In-Hand', 'PF (Emp+Er)', 'Bonus', 'Gratuity', 'Insurance', 'Tax/PT'],
      data: [Math.round(inhand * 12), Math.round(pfEr + pfEmp), Math.round(bonus), Math.round(gratAmt), ins, ptax * 12]
    }
  };
};

export const calcSalaryComparison: CalcFunction = (v) => {
  const old_ctc = Number(v.old_ctc) || 0;
  const new_ctc = Number(v.new_ctc) || 0;
  const old_bonus = Number(v.old_bonus) || 0;
  const new_bonus = Number(v.new_bonus) || 0;
  const old_pf = Number(v.old_pf) || 0;
  const new_pf = Number(v.new_pf) || 0;
  const relocation = Number(v.relocation) || 0;

  const oldFixed = old_ctc * (1 - old_bonus / 100) - old_pf;
  const newFixed = new_ctc * (1 - new_bonus / 100) - new_pf;
  const oldMonthly = Math.round(oldFixed / 12);
  const newMonthly = Math.round(newFixed / 12);
  const hike = old_ctc === 0 ? 0 : ((new_ctc - old_ctc) / old_ctc * 100);
  const fixedHike = oldFixed === 0 ? 0 : ((newFixed - oldFixed) / oldFixed * 100);
  return {
    main: { label: 'CTC Hike', value: hike.toFixed(1) + '%' },
    secondary: [
      { label: 'Old CTC', value: '₹' + old_ctc.toLocaleString() },
      { label: 'New CTC', value: '₹' + new_ctc.toLocaleString() },
      { label: 'Old Monthly (fixed)', value: '₹' + oldMonthly.toLocaleString() },
      { label: 'New Monthly (fixed)', value: '₹' + newMonthly.toLocaleString() },
      { label: 'Fixed Pay Hike', value: fixedHike.toFixed(1) + '%', pos: fixedHike > 0 },
      { label: 'Monthly Increase', value: '₹' + (newMonthly - oldMonthly).toLocaleString(), pos: newMonthly > oldMonthly },
      { label: 'Relocation/Joining Bonus', value: '₹' + relocation.toLocaleString() }
    ],
    chart: {
      labels: ['Old Fixed', 'Old Bonus', 'Old PF', 'New Fixed', 'New Bonus', 'New PF'],
      data: [Math.round(oldFixed), Math.round(old_ctc * old_bonus / 100), old_pf, Math.round(newFixed), Math.round(new_ctc * new_bonus / 100), new_pf]
    }
  };
};

export const calcGoalSIP: CalcFunction = (v) => {
  const goal = Number(v.goal) || 0;
  const rate = Number(v.rate) || 12;
  const years = Number(v.years) || 5;
  const existing = Number(v.existing) || 0;

  const r = rate / 12 / 100;
  const n = years * 12;
  const existingFV = existing * Math.pow(1 + r, n);
  const remaining = Math.max(0, goal - existingFV);
  const sip = remaining > 0 ? (r === 0 ? remaining / n : remaining * r / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
  const totalInvested = Math.round(sip) * n + existing;
  const returns = goal - totalInvested;
  return {
    main: { label: 'Monthly SIP Required', value: '₹' + Math.round(sip).toLocaleString() },
    secondary: [
      { label: 'Target Goal', value: '₹' + goal.toLocaleString() },
      { label: 'Existing Corpus FV', value: '₹' + Math.round(existingFV).toLocaleString() },
      { label: 'Remaining to Fund', value: '₹' + Math.round(remaining).toLocaleString() },
      { label: 'Total Investment', value: '₹' + Math.round(totalInvested).toLocaleString() },
      { label: 'Expected Returns', value: '₹' + Math.round(returns).toLocaleString(), pos: true },
      { label: 'Daily SIP Equivalent', value: '₹' + Math.round(sip / 30).toLocaleString() + '/day' }
    ],
    chart: {
      a: Math.round(totalInvested), b: Math.round(Math.max(0, returns)), lA: 'Invested', lB: 'Returns',
      timeline: (() => {
        const labels: string[] = [], invArr: number[] = [], corpusArr: number[] = [];
        for (let yr = 1; yr <= years; yr++) {
          const months = yr * 12;
          const fv = r === 0 ? Math.round(sip) * months + existing : Math.round(sip) * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) + existing * Math.pow(1 + r, months);
          labels.push('Yr ' + yr);
          invArr.push(Math.round(Math.round(sip) * months + existing));
          corpusArr.push(Math.round(fv));
        }
        return {
          labels, datasets: [
            { label: 'Amount Invested', data: invArr, fill: false },
            { label: 'Corpus Value', data: corpusArr, fill: true }
          ]
        };
      })()
    }
  };
};

export const calcElssReturns: CalcFunction = (v) => {
  const monthly = Number(v.monthly) || 0;
  const rate = Number(v.rate) || 12;
  const years = Number(v.years) || 3;
  const taxslab = String(v.taxslab || '30%');

  const r = rate / 12 / 100;
  const n = years * 12;
  const fv = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  const returns = fv - invested;
  const annualInvest = Math.min(monthly * 12, 150000);
  const slabRate = parseFloat(taxslab) / 100;
  const annualTaxSaved = Math.round(annualInvest * slabRate);
  const totalTaxSaved = annualTaxSaved * years;
  const ltcg = Math.max(0, returns - 125000);
  const ltcgTax = Math.round(ltcg * 0.125);
  return {
    main: { label: 'Maturity Value', value: '₹' + Math.round(fv).toLocaleString() },
    secondary: [
      { label: 'Total Invested', value: '₹' + invested.toLocaleString() },
      { label: 'Expected Returns', value: '₹' + Math.round(returns).toLocaleString(), pos: true },
      { label: 'Annual Tax Saved (80C)', value: '₹' + annualTaxSaved.toLocaleString(), pos: true },
      { label: 'Total Tax Saved', value: '₹' + totalTaxSaved.toLocaleString(), pos: true },
      { label: 'LTCG Tax (12.5% above ₹1.25L)', value: '₹' + ltcgTax.toLocaleString() },
      { label: 'Effective Return (with tax benefit)', value: ((fv + totalTaxSaved - invested) / (invested || 1) * 100).toFixed(1) + '%', pos: true },
      { label: 'Lock-in Period', value: '3 years (shortest in 80C)' }
    ],
    chart: { labels: ['Invested', 'Returns', 'Tax Saved'], data: [invested, Math.round(returns), totalTaxSaved] }
  };
};

export const calcNSC: CalcFunction = (v) => {
  const amount = Number(v.amount) || 0;
  const rate = Number(v.rate) || 7.7;
  const tenure = Number(v.tenure) || 5;
  const taxslab = String(v.taxslab || '30%');

  const maturity = amount * Math.pow(1 + rate / 100, tenure);
  const interest = maturity - amount;
  const taxBenefit80C = Math.min(amount, 150000) * parseFloat(taxslab) / 100;
  let reinvestedInterest = 0;
  for (let i = 1; i < tenure; i++) {
    reinvestedInterest += amount * Math.pow(1 + rate / 100, i) - amount * Math.pow(1 + rate / 100, i - 1);
  }
  const reinvestTaxBenefit = Math.round(reinvestedInterest * parseFloat(taxslab) / 100);
  return {
    main: { label: 'Maturity Amount', value: '₹' + Math.round(maturity).toLocaleString() },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(interest).toLocaleString(), pos: true },
      { label: 'Investment', value: '₹' + amount.toLocaleString() },
      { label: 'Tax Saved (80C on principal)', value: '₹' + Math.round(taxBenefit80C).toLocaleString(), pos: true },
      { label: 'Tax Saved (reinvested interest)', value: '₹' + reinvestTaxBenefit.toLocaleString(), pos: true },
      { label: 'Effective Return (post-tax benefit)', value: ((interest + taxBenefit80C) / (amount || 1) * 100).toFixed(1) + '%', pos: true },
      { label: 'Tenure', value: tenure + ' years (fixed)' }
    ],
    chart: { a: amount, b: Math.round(interest), lA: 'Principal', lB: 'Interest' }
  };
};

export const calcAPY: CalcFunction = (v) => {
  const pension = String(v.pension || '5000');
  const age = Number(v.age) || 18;

  const pensionAmt = parseInt(pension.replace(/[₹,]/g, '')) || 5000;
  const yearsToContribute = 60 - age;
  const table: Record<number, Record<number, number>> = {
    1000: { 18: 42, 20: 50, 25: 76, 30: 116, 35: 181, 40: 291 },
    2000: { 18: 84, 20: 100, 25: 151, 30: 231, 35: 362, 40: 582 },
    3000: { 18: 126, 20: 150, 25: 226, 30: 347, 35: 543, 40: 873 },
    4000: { 18: 168, 20: 198, 25: 301, 30: 462, 35: 722, 40: 1164 },
    5000: { 18: 210, 20: 248, 25: 376, 30: 577, 35: 902, 40: 1454 }
  };
  const ages = [18, 20, 25, 30, 35, 40];
  let contribution = 0;
  const t = table[pensionAmt];
  if (t) {
    let closest = 18;
    for (const a of ages) { if (age >= a) closest = a; }
    contribution = t[closest] || t[40] || 0;
  }
  const totalContrib = contribution * 12 * yearsToContribute;
  const corpusMultiplier: Record<number, number> = { 1000: 1.7, 2000: 3.4, 3000: 5.1, 4000: 6.8, 5000: 8.5 };
  const corpus = (corpusMultiplier[pensionAmt] || 1.7) * 100000;
  return {
    main: { label: 'Monthly Contribution', value: '₹' + contribution.toLocaleString() },
    secondary: [
      { label: 'Desired Pension', value: '₹' + pensionAmt.toLocaleString() + '/month' },
      { label: 'Years of Contribution', value: String(yearsToContribute) + ' years' },
      { label: 'Total Contribution', value: '₹' + totalContrib.toLocaleString() },
      { label: 'Corpus at 60', value: '₹' + corpus.toLocaleString() },
      { label: 'Pension Starts at', value: 'Age 60' },
      { label: 'Spouse gets pension', value: 'Yes, after subscriber' },
      { label: 'Nominee gets corpus', value: '₹' + corpus.toLocaleString() }
    ]
  };
};

export const calcBrokerage: CalcFunction = (v) => {
  const buy_price = Number(v.buy_price) || 0;
  const sell_price = Number(v.sell_price) || 0;
  const qty = Number(v.qty) || 0;
  const broker_type = String(v.broker_type || 'Discount (₹20 flat)');
  const trade_type = String(v.trade_type || 'Delivery (CNC)');

  const buyVal = buy_price * qty;
  const sellVal = sell_price * qty;
  const turnover = buyVal + sellVal;
  let brokerage = 0;
  if (broker_type === 'Discount (₹20 flat)') brokerage = Math.min(20, buyVal * 0.0003) + Math.min(20, sellVal * 0.0003);
  else if (broker_type === 'Traditional (0.5%)') brokerage = turnover * 0.005;
  else brokerage = trade_type === 'Delivery (CNC)' ? 0 : Math.min(20, buyVal * 0.0003) + Math.min(20, sellVal * 0.0003);

  let stt = 0;
  if (trade_type === 'Delivery (CNC)') stt = buyVal * 0.001 + sellVal * 0.001;
  else if (trade_type === 'Intraday (MIS)') stt = sellVal * 0.00025;
  else if (trade_type === 'F&O (Futures)') stt = sellVal * 0.0002;
  else stt = sellVal * 0.001;

  const exchangeTxn = turnover * 0.0000345;
  const gst = (brokerage + exchangeTxn) * 0.18;
  const sebi = turnover * 0.000001;
  const stamp = buyVal * 0.00015;
  const totalCharges = brokerage + stt + exchangeTxn + gst + sebi + stamp;
  const profit = sellVal - buyVal;
  const netProfit = profit - totalCharges;
  return {
    main: { label: 'Net Profit/Loss', value: '₹' + netProfit.toFixed(2) },
    secondary: [
      { label: 'Gross Profit', value: '₹' + profit.toFixed(2), pos: profit > 0 },
      { label: 'Total Charges', value: '₹' + totalCharges.toFixed(2) },
      { label: 'Brokerage', value: '₹' + brokerage.toFixed(2) },
      { label: 'STT', value: '₹' + stt.toFixed(2) },
      { label: 'Exchange Txn Charges', value: '₹' + exchangeTxn.toFixed(2) },
      { label: 'GST (18%)', value: '₹' + gst.toFixed(2) },
      { label: 'SEBI Charges', value: '₹' + sebi.toFixed(2) },
      { label: 'Stamp Duty', value: '₹' + stamp.toFixed(2) },
      { label: 'Break-Even Sell Price', value: '₹' + (qty === 0 ? 0 : (buyVal + totalCharges) / qty).toFixed(2) }
    ],
    chart: { labels: ['Brokerage', 'STT', 'Exchange', 'GST', 'SEBI', 'Stamp'], data: [brokerage, stt, exchangeTxn, gst, sebi, stamp] }
  };
};

export const calcTaxSaving: CalcFunction = (v) => {
  const epf = Number(v.epf) || 0;
  const ppf = Number(v.ppf) || 0;
  const elss = Number(v.elss) || 0;
  const lic = Number(v.lic) || 0;
  const nps80ccd = Number(v.nps80ccd) || 0;
  const med80d = Number(v.med80d) || 0;
  const hloan = Number(v.hloan) || 0;
  const taxslab = String(v.taxslab || '30%');
  const income = Number(v.income) || 1;

  const sec80c = Math.min(150000, epf + ppf + elss + lic);
  const sec80ccd = Math.min(50000, nps80ccd);
  const sec80d = Math.min(75000, med80d);
  const sec24b = Math.min(200000, hloan);
  const totalDeductions = sec80c + sec80ccd + sec80d + sec24b;
  const slabRate = parseFloat(taxslab) / 100;
  const taxSaved = Math.round(totalDeductions * slabRate);
  const remaining80c = Math.max(0, 150000 - epf - ppf - elss - lic);
  const remaining80ccd = Math.max(0, 50000 - nps80ccd);
  return {
    main: { label: 'Total Tax Saved', value: '₹' + taxSaved.toLocaleString() },
    secondary: [
      { label: '80C Used / Limit', value: '₹' + sec80c.toLocaleString() + ' / ₹1,50,000' },
      { label: '80CCD(1B) — NPS', value: '₹' + sec80ccd.toLocaleString() + ' / ₹50,000' },
      { label: '80D — Medical', value: '₹' + sec80d.toLocaleString() + ' / ₹75,000' },
      { label: '24B — Home Loan Interest', value: '₹' + sec24b.toLocaleString() + ' / ₹2,00,000' },
      { label: 'Total Deductions', value: '₹' + totalDeductions.toLocaleString() },
      { label: 'Remaining 80C room', value: '₹' + remaining80c.toLocaleString() },
      { label: 'Remaining NPS room', value: '₹' + remaining80ccd.toLocaleString() },
      { label: 'Effective Tax Rate Reduction', value: (totalDeductions / income * 100).toFixed(1) + '%' }
    ],
    chart: { labels: ['80C', '80CCD(1B)', '80D', '24B'], data: [sec80c, sec80ccd, sec80d, sec24b] }
  };
};

export const calcRetirementCorpus: CalcFunction = (v) => {
  const age = Number(v.age) || 30;
  const retire_age = Number(v.retire_age) || 60;
  const life_exp = Number(v.life_exp) || 85;
  const monthly_exp = Number(v.monthly_exp) || 0;
  const inflation = Number(v.inflation) || 6;
  const return_pre = Number(v.return_pre) || 12;
  const return_post = Number(v.return_post) || 8;
  const existing = Number(v.existing) || 0;

  const yearsToRetire = retire_age - age;
  const yearsInRetirement = life_exp - retire_age;
  if (yearsToRetire <= 0 || yearsInRetirement <= 0) return { main: { label: 'Error', value: 'Verify ages' } };

  const futureMonthly = monthly_exp * Math.pow(1 + inflation / 100, yearsToRetire);
  const futureAnnual = futureMonthly * 12;
  const realReturn = ((1 + return_post / 100) / (1 + inflation / 100)) - 1;
  const corpus = realReturn <= 0 ? futureAnnual * yearsInRetirement : futureAnnual * (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn;
  const existingFV = existing * Math.pow(1 + return_pre / 100, yearsToRetire);
  const remaining = Math.max(0, corpus - existingFV);
  const r = return_pre / 12 / 100;
  const n = yearsToRetire * 12;
  const sip = remaining > 0 && r > 0 ? remaining * r / ((Math.pow(1 + r, n) - 1) * (1 + r)) : 0;
  return {
    main: { label: 'Retirement Corpus Needed', value: '₹' + Math.round(corpus).toLocaleString() },
    secondary: [
      { label: 'Monthly Expenses at Retirement', value: '₹' + Math.round(futureMonthly).toLocaleString() },
      { label: 'Years to Retirement', value: yearsToRetire + ' years' },
      { label: 'Retirement Duration', value: yearsInRetirement + ' years' },
      { label: 'Existing Savings FV', value: '₹' + Math.round(existingFV).toLocaleString() },
      { label: 'Gap to Fill', value: '₹' + Math.round(remaining).toLocaleString() },
      { label: 'Monthly SIP Required', value: '₹' + Math.round(sip).toLocaleString() },
      { label: 'Daily SIP Equivalent', value: '₹' + Math.round(sip / 30).toLocaleString() + '/day' }
    ],
    chart: {
      labels: ['Existing FV', 'SIP Corpus', 'Gap'],
      data: [Math.round(existingFV), Math.round(remaining), 0],
      timeline: (() => {
        const labels: string[] = [], savArr: number[] = [], targetArr: number[] = [];
        for (let yr = 1; yr <= yearsToRetire; yr++) {
          const months = yr * 12;
          const sipFV = r === 0 ? Math.round(sip) * months : Math.round(sip) * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
          const existFV = existing * Math.pow(1 + return_pre / 100, yr);
          labels.push('Age ' + (age + yr));
          savArr.push(Math.round(sipFV + existFV));
          targetArr.push(Math.round(corpus));
        }
        return {
          labels, datasets: [
            { label: 'Your Savings', data: savArr, fill: true },
            { label: 'Target Corpus', data: targetArr, fill: false }
          ]
        };
      })()
    }
  };
};

export const calcSalaryHike: CalcFunction = (v) => {
  const currentSalary = Number(v.currentSalary) || 0;
  const currentCTC = Number(v.currentCTC) || 0;
  const hikePercent = Number(v.hikePercent) || 0;
  const inflation = Number(v.inflation) || 6;

  const newMonthly = Math.round(currentSalary * (1 + hikePercent / 100));
  const monthlyIncrease = newMonthly - currentSalary;
  const newAnnualCTC = Math.round(currentCTC * (1 + hikePercent / 100));
  const annualIncrease = newAnnualCTC - currentCTC;
  const realHike = hikePercent - inflation;
  const purchasingPowerGain = realHike > 0
    ? '+' + realHike.toFixed(1) + '% real gain (beats inflation [OK])'
    : realHike.toFixed(1) + '% real loss (below inflation [!])';
  const yearsToDouble = (hikePercent === 0 ? 0 : 72 / hikePercent).toFixed(1);
  return {
    main: { label: 'New Monthly Salary', value: '₹' + newMonthly.toLocaleString('en-IN') },
    secondary: [
      { label: 'Monthly Increase', value: '₹' + monthlyIncrease.toLocaleString('en-IN'), pos: true },
      { label: 'New Annual CTC', value: '₹' + newAnnualCTC.toLocaleString('en-IN') },
      { label: 'Annual Increment', value: '₹' + annualIncrease.toLocaleString('en-IN'), pos: true },
      { label: 'Hike %', value: hikePercent.toFixed(1) + '%' },
      { label: 'Real Purchasing Power', value: purchasingPowerGain },
      { label: 'Salary Doubles in', value: yearsToDouble + ' years (at ' + hikePercent + '% annually)' }
    ],
    chart: { a: currentCTC, b: annualIncrease, lA: 'Old CTC', lB: 'Increment' }
  };
};

export const calcFIRE: CalcFunction = (v) => {
  const annualExpense = Number(v.annualExpense) || 0;
  const withdrawalRate = Number(v.withdrawalRate) || 4;
  const currentSavings = Number(v.currentSavings) || 0;
  const returnRate = Number(v.returnRate) || 12;
  const annualSaving = Number(v.annualSaving) || 0;

  const fireNumber = annualExpense / (withdrawalRate / 100);
  let portfolio = currentSavings;
  const r = returnRate / 100;
  let years = 0;
  while (portfolio < fireNumber && years < 100) {
    portfolio = (portfolio + annualSaving) * (1 + r);
    years++;
  }
  const coastFire = fireNumber / Math.pow(1 + r, Math.max(1, 30 - years));
  return {
    main: { label: 'Years to FIRE', value: years < 100 ? years + ' years' : '100+ years' },
    secondary: [
      { label: 'FIRE Number', value: '₹' + Math.round(fireNumber).toLocaleString('en-IN') },
      { label: 'Monthly Expense Budget', value: '₹' + Math.round(annualExpense / 12).toLocaleString('en-IN') },
      { label: 'Portfolio at FIRE', value: '₹' + Math.round(portfolio).toLocaleString('en-IN') },
      { label: 'Total Invested', value: '₹' + Math.round(currentSavings + annualSaving * years).toLocaleString('en-IN') },
      { label: 'Coast FIRE Number (today)', value: '₹' + Math.round(coastFire).toLocaleString('en-IN') },
      { label: 'Savings Rate', value: ((annualSaving / (annualExpense + annualSaving || 1)) * 100).toFixed(1) + '%' }
    ],
    chart: {
      a: Math.round(currentSavings + annualSaving * years), b: Math.round(portfolio - (currentSavings + annualSaving * years)), lA: 'Invested', lB: 'Returns',
      timeline: (() => {
        const labels: string[] = [], invested: number[] = [], corpus: number[] = [];
        let p = currentSavings;
        const lim = Math.min(years, 40) || 1;
        for (let y = 1; y <= lim; y++) {
          p = (p + annualSaving) * (1 + r);
          labels.push('Yr ' + y);
          invested.push(Math.round(currentSavings + annualSaving * y));
          corpus.push(Math.round(p));
        }
        return { labels, datasets: [{ label: 'Invested', data: invested, fill: false }, { label: 'Portfolio', data: corpus, fill: true }] };
      })()
    }
  };
};

export const calcDebtAvalanche: CalcFunction = (v) => {
  const debts: { bal: number; rate: number; min: number }[] = [];
  if (Number(v.debt1bal) > 0) debts.push({ bal: Number(v.debt1bal), rate: (Number(v.debt1rate) || 0) / 100 / 12, min: Number(v.debt1min) || 0 });
  if (Number(v.debt2bal) > 0) debts.push({ bal: Number(v.debt2bal), rate: (Number(v.debt2rate) || 0) / 100 / 12, min: Number(v.debt2min) || 0 });
  if (Number(v.debt3bal) > 0) debts.push({ bal: Number(v.debt3bal), rate: (Number(v.debt3rate) || 0) / 100 / 12, min: Number(v.debt3min) || 0 });
  if (debts.length === 0) return { main: { label: 'Error', value: 'Enter at least one debt' } };

  const simulate = (order: 'avalanche' | 'snowball') => {
    const ds = debts.map((d) => ({ bal: d.bal, rate: d.rate, min: d.min }));
    if (order === 'avalanche') ds.sort((a, b) => b.rate - a.rate);
    else ds.sort((a, b) => a.bal - b.bal);
    let months = 0, totalInt = 0;
    const extra = Number(v.extraPay) || 0;
    while (ds.some((d) => d.bal > 0) && months < 600) {
      let ex = extra;
      for (let i = 0; i < ds.length; i++) {
        if (ds[i].bal <= 0) continue;
        const intVal = ds[i].bal * ds[i].rate; totalInt += intVal;
        const pay = ds[i].min + ex; ex = 0;
        ds[i].bal = Math.max(0, ds[i].bal + intVal - pay);
        if (ds[i].bal === 0 && pay > ds[i].min + intVal) ex += pay - ds[i].min - intVal;
      }
      months++;
    }
    return { months, totalInt };
  };

  const av = simulate('avalanche');
  const sn = simulate('snowball');
  const totalDebt = debts.reduce((sum, d) => sum + d.bal, 0);
  const saved = sn.totalInt - av.totalInt;
  return {
    main: { label: 'Avalanche Payoff Time', value: av.months + ' months' },
    secondary: [
      { label: 'Avalanche Total Interest', value: '₹' + Math.round(av.totalInt).toLocaleString('en-IN') },
      { label: 'Snowball Payoff Time', value: sn.months + ' months' },
      { label: 'Snowball Total Interest', value: '₹' + Math.round(sn.totalInt).toLocaleString('en-IN') },
      { label: 'Interest Saved (Avalanche)', value: '₹' + Math.round(Math.max(0, saved)).toLocaleString('en-IN'), pos: saved > 0 },
      { label: 'Total Debt', value: '₹' + Math.round(totalDebt).toLocaleString('en-IN') },
      { label: 'Recommendation', value: saved > 1000 ? 'Avalanche (saves ₹' + Math.round(saved).toLocaleString('en-IN') + ')' : 'Either works — pick snowball for motivation' }
    ]
  };
};

export const calcEmergencyFund: CalcFunction = (v) => {
  const monthlyExpense = Number(v.monthlyExpense) || 0;
  const monthsCover = Number(v.monthsCover) || 6;
  const dependents = Number(v.dependents) || 0;
  const currentFund = Number(v.currentFund) || 0;
  const monthlySave = Number(v.monthlySave) || 0;

  const target = monthlyExpense * monthsCover;
  const adjustedTarget = target * (1 + dependents * 0.1);
  const gap = Math.max(0, adjustedTarget - currentFund);
  const monthsNeeded = monthlySave > 0 ? Math.ceil(gap / monthlySave) : Infinity;
  return {
    main: { label: 'Emergency Fund Target', value: '₹' + Math.round(adjustedTarget).toLocaleString('en-IN') },
    secondary: [
      { label: 'Base Target (' + monthsCover + ' months)', value: '₹' + Math.round(target).toLocaleString('en-IN') },
      { label: 'Dependent Adjustment (+' + dependents * 10 + '%)', value: '₹' + Math.round(adjustedTarget - target).toLocaleString('en-IN') },
      { label: 'Current Fund', value: '₹' + Math.round(currentFund).toLocaleString('en-IN') },
      { label: 'Gap to Fill', value: '₹' + Math.round(gap).toLocaleString('en-IN') },
      { label: 'Months to Full Fund', value: isFinite(monthsNeeded) ? monthsNeeded + ' months' : '∞ (increase savings)' },
      { label: 'Fund Status', value: currentFund >= adjustedTarget ? '[OK] Fully funded!' : currentFund >= target / 2 ? '[!] Partially funded' : '[X] Underfunded' }
    ],
    chart: { a: Math.round(currentFund), b: Math.round(gap), lA: 'Current Fund', lB: 'Gap' }
  };
};

export const calcRentVsBuy: CalcFunction = (v) => {
  const homePrice = Number(v.homePrice) || 0;
  const downPayment = Number(v.downPayment) || 0;
  const loanRate = Number(v.loanRate) || 8.5;
  const loanTenure = Number(v.loanTenure) || 20;
  const monthlyRent = Number(v.monthlyRent) || 0;
  const rentIncrease = Number(v.rentIncrease) || 5;
  const maintenance = Number(v.maintenance) || 0;
  const propertyAppreciation = Number(v.propertyAppreciation) || 5;

  const loan = homePrice - downPayment;
  const r = loanRate / 12 / 100, n = loanTenure * 12;
  const emi = loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalEmi = emi * n + downPayment;
  let totalMaint = 0, totalRent = 0, rent = monthlyRent;
  for (let y = 0; y < loanTenure; y++) {
    totalRent += rent * 12; totalMaint += maintenance;
    rent *= (1 + rentIncrease / 100);
  }
  const propertyValue = homePrice * Math.pow(1 + propertyAppreciation / 100, loanTenure);
  const buyCost = totalEmi + totalMaint - propertyValue;
  const rentCost = totalRent;
  const investReturn = downPayment * Math.pow(1.08, loanTenure);
  return {
    main: { label: 'Better Option', value: buyCost < rentCost ? 'Buy (saves ₹' + Math.round(rentCost - buyCost).toLocaleString('en-IN') + ')' : 'Rent (saves ₹' + Math.round(buyCost - rentCost).toLocaleString('en-IN') + ')' },
    secondary: [
      { label: 'Total Cost of Buying', value: '₹' + Math.round(totalEmi + totalMaint).toLocaleString('en-IN') },
      { label: 'Property Value (' + loanTenure + 'yr)', value: '₹' + Math.round(propertyValue).toLocaleString('en-IN'), pos: true },
      { label: 'Net Buy Cost', value: '₹' + Math.round(buyCost).toLocaleString('en-IN') },
      { label: 'Monthly EMI', value: '₹' + Math.round(emi).toLocaleString('en-IN') },
      { label: 'Total Rent (' + loanTenure + 'yr)', value: '₹' + Math.round(totalRent).toLocaleString('en-IN') },
      { label: 'Down Payment if Invested @8%', value: '₹' + Math.round(investReturn).toLocaleString('en-IN') }
    ]
  };
};

export const calcCarLeaseVsBuy: CalcFunction = (v) => {
  const carPrice = Number(v.carPrice) || 0;
  const downPay = Number(v.downPay) || 0;
  const loanRateCar = Number(v.loanRateCar) || 8.5;
  const loanYears = Number(v.loanYears) || 5;
  const annualInsurance = Number(v.annualInsurance) || 0;
  const resalePercent = Number(v.resalePercent) || 50;
  const monthlyLease = Number(v.monthlyLease) || 0;
  const leaseYears = Number(v.leaseYears) || 3;

  const loan = carPrice - downPay;
  const r = loanRateCar / 12 / 100, n = loanYears * 12;
  const emi = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalBuy = emi * n + downPay + annualInsurance * loanYears;
  const resale = carPrice * resalePercent / 100;
  const netBuy = totalBuy - resale;
  const totalLease = monthlyLease * leaseYears * 12;
  return {
    main: { label: 'Better Option', value: netBuy < totalLease ? 'Buy (saves ₹' + Math.round(totalLease - netBuy).toLocaleString('en-IN') + ')' : 'Lease (saves ₹' + Math.round(netBuy - totalLease).toLocaleString('en-IN') + ')' },
    secondary: [
      { label: 'Total Buy Cost', value: '₹' + Math.round(totalBuy).toLocaleString('en-IN') },
      { label: 'Resale Value', value: '₹' + Math.round(resale).toLocaleString('en-IN'), pos: true },
      { label: 'Net Buy Cost (after resale)', value: '₹' + Math.round(netBuy).toLocaleString('en-IN') },
      { label: 'Monthly EMI', value: '₹' + Math.round(emi).toLocaleString('en-IN') },
      { label: 'Total Lease Cost (' + leaseYears + 'yr)', value: '₹' + Math.round(totalLease).toLocaleString('en-IN') },
      { label: 'Monthly Cost: Buy', value: '₹' + Math.round(netBuy / ((loanYears * 12) || 1)).toLocaleString('en-IN') }
    ]
  };
};

export const calcHomeDownPayment: CalcFunction = (v) => {
  const targetHome = Number(v.targetHome) || 0;
  const downPct = Number(v.downPct) || 20;
  const currentSaved = Number(v.currentSaved) || 0;
  const savingsReturn = Number(v.savingsReturn) || 6;
  const timelineYears = Number(v.timelineYears) || 5;

  const target = targetHome * downPct / 100;
  const r = savingsReturn / 12 / 100, n = timelineYears * 12;
  const futureCurrentSaved = currentSaved * Math.pow(1 + r, n);
  const remaining = Math.max(0, target - futureCurrentSaved);
  const monthly = remaining > 0 ? (r === 0 ? remaining / n : remaining * r / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
  return {
    main: { label: 'Monthly Savings Needed', value: '₹' + Math.round(monthly).toLocaleString('en-IN') },
    secondary: [
      { label: 'Down Payment Target', value: '₹' + Math.round(target).toLocaleString('en-IN') },
      { label: 'Current Savings Growth', value: '₹' + Math.round(futureCurrentSaved).toLocaleString('en-IN') },
      { label: 'Gap to Fill via SIP', value: '₹' + Math.round(remaining).toLocaleString('en-IN') },
      { label: 'Total New Savings', value: '₹' + Math.round(monthly * n).toLocaleString('en-IN') },
      { label: 'Timeline', value: timelineYears + ' years (' + n + ' months)' }
    ]
  };
};

export const calcLoanCompare: CalcFunction = (v) => {
  const amount_lc = Number(v.amount_lc) || 0;
  const rate1 = Number(v.rate1) || 0;
  const tenure1 = Number(v.tenure1) || 12;
  const fee1 = Number(v.fee1) || 0;
  const rate2 = Number(v.rate2) || 0;
  const tenure2 = Number(v.tenure2) || 12;
  const fee2 = Number(v.fee2) || 0;
  const rate3 = Number(v.rate3) || 0;
  const tenure3 = Number(v.tenure3) || 12;
  const fee3 = Number(v.fee3) || 0;

  const runCalc = (P: number, rate: number, tenure: number, fee: number) => {
    const r = rate / 12 / 100, n = tenure;
    const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return { emi, total: emi * n + fee, interest: emi * n - P + fee };
  };
  const b1 = runCalc(amount_lc, rate1, tenure1, fee1);
  const b2 = runCalc(amount_lc, rate2, tenure2, fee2);
  const b3 = runCalc(amount_lc, rate3, tenure3, fee3);
  const best = b1.total <= b2.total && b1.total <= b3.total ? 'Bank 1' : b2.total <= b3.total ? 'Bank 2' : 'Bank 3';
  return {
    main: { label: 'Best Option', value: best + ' (lowest total cost)' },
    secondary: [
      { label: 'Bank 1 EMI', value: '₹' + Math.round(b1.emi).toLocaleString('en-IN') },
      { label: 'Bank 1 Total Cost', value: '₹' + Math.round(b1.total).toLocaleString('en-IN') },
      { label: 'Bank 2 EMI', value: '₹' + Math.round(b2.emi).toLocaleString('en-IN') },
      { label: 'Bank 2 Total Cost', value: '₹' + Math.round(b2.total).toLocaleString('en-IN') },
      { label: 'Bank 3 EMI', value: '₹' + Math.round(b3.emi).toLocaleString('en-IN') },
      { label: 'Bank 3 Total Cost', value: '₹' + Math.round(b3.total).toLocaleString('en-IN') }
    ]
  };
};

export const calcRefinance: CalcFunction = (v) => {
  const outstandingBal = Number(v.outstandingBal) || 0;
  const currentRate_r = Number(v.currentRate_r) || 0;
  const remainingMonths = Number(v.remainingMonths) || 12;
  const newRate_r = Number(v.newRate_r) || 0;
  const newTenure_r = Number(v.newTenure_r) || 12;
  const closingCost = Number(v.closingCost) || 0;

  const totalInt = (P: number, rate: number, n: number) => {
    const r = rate / 12 / 100;
    const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return emi * n - P;
  };
  const intOld = totalInt(outstandingBal, currentRate_r, remainingMonths);
  const intNew = totalInt(outstandingBal, newRate_r, newTenure_r);
  const netSaved = intOld - intNew - closingCost;
  const diffInt = intOld - intNew;
  const breakEven = netSaved > 0 && diffInt > 0 ? Math.ceil(closingCost / (diffInt / remainingMonths)) : 0;
  return {
    main: { label: 'Net Interest Saved', value: '₹' + Math.round(netSaved).toLocaleString('en-IN'), pos: netSaved > 0 },
    secondary: [
      { label: 'Interest at Current Rate', value: '₹' + Math.round(intOld).toLocaleString('en-IN') },
      { label: 'Interest at New Rate', value: '₹' + Math.round(intNew).toLocaleString('en-IN') },
      { label: 'Refinance Costs', value: '₹' + closingCost.toLocaleString('en-IN') },
      { label: 'Break-even In', value: netSaved > 0 ? breakEven + ' months' : 'Not beneficial' },
      { label: 'Verdict', value: netSaved > 0 ? '[OK] Refinance saves money' : '[X] Not worth refinancing' }
    ]
  };
};

export const calcCreditUtil: CalcFunction = (v) => {
  const cards: { limit: number; used: number }[] = [];
  if (Number(v.card1Limit) > 0) cards.push({ limit: Number(v.card1Limit), used: Number(v.card1Used) || 0 });
  if (Number(v.card2Limit) > 0) cards.push({ limit: Number(v.card2Limit), used: Number(v.card2Used) || 0 });
  if (Number(v.card3Limit) > 0) cards.push({ limit: Number(v.card3Limit), used: Number(v.card3Used) || 0 });

  const totalLimit = cards.reduce((sum, c) => sum + c.limit, 0);
  const totalUsed = cards.reduce((sum, c) => sum + c.used, 0);
  const util = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;
  const rating = util < 10 ? 'Excellent' : util < 30 ? 'Good' : util < 50 ? 'Fair' : util < 75 ? 'Poor' : 'Very Poor';
  const idealMax = totalLimit * 0.3;
  return {
    main: { label: 'Overall Utilization', value: util.toFixed(1) + '%' },
    secondary: [
      { label: 'Credit Score Impact', value: rating },
      { label: 'Total Credit Limit', value: '₹' + totalLimit.toLocaleString('en-IN') },
      { label: 'Total Balance Used', value: '₹' + totalUsed.toLocaleString('en-IN') },
      { label: 'Available Credit', value: '₹' + (totalLimit - totalUsed).toLocaleString('en-IN') },
      { label: 'Ideal Max Balance (30%)', value: '₹' + Math.round(idealMax).toLocaleString('en-IN') },
      { label: 'Reduce By', value: totalUsed > idealMax ? '₹' + Math.round(totalUsed - idealMax).toLocaleString('en-IN') : '[OK] Within ideal range' }
    ],
    chart: { a: Math.round(totalUsed), b: Math.round(totalLimit - totalUsed), lA: 'Used', lB: 'Available' }
  };
};

export const calcInsuranceNeed: CalcFunction = (v) => {
  const annualIncome_i = Number(v.annualIncome_i) || 0;
  const inflationAdj = Number(v.inflationAdj) || 6;
  const yearsToReplace = Number(v.yearsToReplace) || 10;
  const outstandingLoans = Number(v.outstandingLoans) || 0;
  const childrenExpense = Number(v.childrenExpense) || 0;
  const existingCover = Number(v.existingCover) || 0;
  const existingSavings_i = Number(v.existingSavings_i) || 0;

  const denom = (inflationAdj / 100);
  const inflatedIncome = denom === 0 ? annualIncome_i * yearsToReplace : annualIncome_i * ((Math.pow(1 + inflationAdj / 100, yearsToReplace) - 1) / denom);
  const totalNeed = inflatedIncome + outstandingLoans + childrenExpense;
  const gap = Math.max(0, totalNeed - existingCover - existingSavings_i);
  const thumbRule = annualIncome_i * 12;
  return {
    main: { label: 'Recommended Cover', value: '₹' + Math.round(gap).toLocaleString('en-IN') },
    secondary: [
      { label: 'Income Replacement (' + yearsToReplace + 'yr, inflation adj.)', value: '₹' + Math.round(inflatedIncome).toLocaleString('en-IN') },
      { label: 'Outstanding Loans', value: '₹' + outstandingLoans.toLocaleString('en-IN') },
      { label: 'Children Education', value: '₹' + childrenExpense.toLocaleString('en-IN') },
      { label: 'Total Need', value: '₹' + Math.round(totalNeed).toLocaleString('en-IN') },
      { label: 'Existing Cover + Savings', value: '₹' + (existingCover + existingSavings_i).toLocaleString('en-IN') },
      { label: 'Thumb Rule (12× income)', value: '₹' + thumbRule.toLocaleString('en-IN') },
      { label: 'Gap', value: gap > 0 ? '₹' + Math.round(gap).toLocaleString('en-IN') + ' short' : '[OK] Adequately covered' }
    ],
    chart: { a: Math.round(existingCover + existingSavings_i), b: Math.round(gap), lA: 'Existing Cover', lB: 'Gap' }
  };
};

export const calcNpvIrr: CalcFunction = (v) => {
  const initialInvest = Number(v.initialInvest) || 0;
  const cf1 = Number(v.cf1) || 0;
  const cf2 = Number(v.cf2) || 0;
  const cf3 = Number(v.cf3) || 0;
  const cf4 = Number(v.cf4) || 0;
  const cf5 = Number(v.cf5) || 0;
  const discountRate = Number(v.discountRate) || 10;

  const cfs = [-initialInvest, cf1, cf2, cf3, cf4, cf5];
  const r = discountRate / 100;
  let npv = 0;
  for (let i = 0; i < cfs.length; i++) npv += cfs[i] / Math.pow(1 + r, i);

  let irr = 0.1;
  for (let iter = 0; iter < 100; iter++) {
    let f = 0, fp = 0;
    for (let j = 0; j < cfs.length; j++) {
      f += cfs[j] / Math.pow(1 + irr, j);
      fp -= j * cfs[j] / Math.pow(1 + irr, j + 1);
    }
    if (Math.abs(fp) < 1e-10) break;
    irr = irr - f / fp;
    if (Math.abs(f) < 0.01) break;
  }
  const pi = initialInvest === 0 ? 0 : (npv + initialInvest) / initialInvest;
  let payback = 0, cumCf = 0;
  for (let k = 1; k < cfs.length; k++) {
    cumCf += cfs[k];
    if (cumCf >= initialInvest) { payback = k; break; }
  }
  return {
    main: { label: 'NPV', value: '₹' + Math.round(npv).toLocaleString('en-IN'), pos: npv > 0 },
    secondary: [
      { label: 'IRR', value: (irr * 100).toFixed(2) + '%', pos: irr > r },
      { label: 'Profitability Index', value: pi.toFixed(2) + '×' },
      { label: 'Payback Period', value: payback > 0 ? payback + ' years' : 'Beyond 5 years' },
      { label: 'Total Cash Inflows', value: '₹' + Math.round(cfs.slice(1).reduce((a, b) => a + b, 0)).toLocaleString('en-IN') },
      { label: 'Initial Investment', value: '₹' + initialInvest.toLocaleString('en-IN') },
      { label: 'Decision', value: npv > 0 ? '[OK] Accept project' : '[X] Reject project' }
    ]
  };
};

export const calcBondYield: CalcFunction = (v) => {
  const faceValue = Number(v.faceValue) || 1000;
  const couponRate = Number(v.couponRate) || 8;
  const marketPrice = Number(v.marketPrice) || 1000;
  const yearsToMaturity = Number(v.yearsToMaturity) || 5;
  const frequency = String(v.frequency || 'Annual');

  const freqMap: Record<string, number> = { Annual: 1, 'Semi-Annual': 2, Quarterly: 4 };
  const m = freqMap[frequency] || 1;
  const coupon = faceValue * couponRate / 100;
  const currentYield = (coupon / (marketPrice || 1)) * 100;
  const denom = (faceValue + marketPrice) / 2;
  const ytmApprox = denom === 0 ? 0 : ((coupon / m) + (faceValue - marketPrice) / (yearsToMaturity * m)) / denom * m * 100;
  const totalReturn = coupon * yearsToMaturity + (faceValue - marketPrice);
  return {
    main: { label: 'Yield to Maturity (approx.)', value: ytmApprox.toFixed(2) + '%' },
    secondary: [
      { label: 'Current Yield', value: currentYield.toFixed(2) + '%' },
      { label: 'Annual Coupon', value: '₹' + coupon.toFixed(2) },
      { label: 'Total Return (if held)', value: '₹' + Math.round(totalReturn).toLocaleString('en-IN'), pos: totalReturn > 0 },
      { label: 'Bond Status', value: marketPrice < faceValue ? 'Trading at Discount' : marketPrice > faceValue ? 'Trading at Premium' : 'At Par' },
      { label: 'Price vs Par', value: (((marketPrice / faceValue) - 1) * 100).toFixed(2) + '%' }
    ]
  };
};

export const calcOptionProfit: CalcFunction = (v) => {
  const exitPrice = Number(v.exitPrice) || 0;
  const strikePrice = Number(v.strikePrice) || 0;
  const premium = Number(v.premium) || 0;
  const lotSize = Number(v.lotSize) || 1;
  const optType = String(v.optType || 'Buy Call');

  const isBuy = optType.startsWith('Buy');
  const isCall = optType.includes('Call');
  let intrinsic = 0;
  if (isCall) intrinsic = Math.max(0, exitPrice - strikePrice);
  else intrinsic = Math.max(0, strikePrice - exitPrice);

  const pl = isBuy ? (intrinsic - premium) * lotSize : (premium - intrinsic) * lotSize;
  const breakeven = isCall ? strikePrice + premium : strikePrice - premium;
  const maxLoss = isBuy ? premium * lotSize : 'Unlimited';
  const maxProfit = isBuy ? (isCall ? 'Unlimited' : '₹' + (strikePrice - premium) * lotSize) : '₹' + premium * lotSize;
  return {
    main: { label: 'Net P&L', value: '₹' + Math.round(pl).toLocaleString('en-IN'), pos: pl > 0 },
    secondary: [
      { label: 'Intrinsic Value', value: '₹' + intrinsic.toFixed(2) },
      { label: 'Break-even', value: '₹' + breakeven.toFixed(2) },
      { label: 'Max Loss', value: typeof maxLoss === 'string' ? maxLoss : '₹' + maxLoss.toLocaleString('en-IN') },
      { label: 'Max Profit', value: typeof maxProfit === 'string' ? maxProfit : String(maxProfit) },
      { label: 'ROI', value: isBuy ? (((pl / ((premium * lotSize) || 1))) * 100).toFixed(1) + '%' : 'N/A' },
      { label: 'P&L per Share', value: '₹' + (pl / lotSize).toFixed(2) }
    ]
  };
};

export const calcForexPip: CalcFunction = (v) => {
  const pair = String(v.pair || 'USD/INR');
  const pipValue_override = Number(v.pipValue_override) || 0;
  const accountBal = Number(v.accountBal) || 0;
  const riskPct = Number(v.riskPct) || 1;
  const stopLossPips = Number(v.stopLossPips) || 0;

  const pipVal = pipValue_override > 0 ? pipValue_override : (pair.endsWith('INR') ? 1 : 83);
  const riskAmount = accountBal * riskPct / 100;
  const positionSize = stopLossPips > 0 ? Math.floor(riskAmount / (stopLossPips * pipVal)) : 0;
  const standardLots = (positionSize / 100000).toFixed(2);
  const miniLots = (positionSize / 10000).toFixed(2);
  return {
    main: { label: 'Position Size', value: positionSize.toLocaleString() + ' units' },
    secondary: [
      { label: 'Standard Lots', value: standardLots },
      { label: 'Mini Lots', value: miniLots },
      { label: 'Risk Amount', value: '₹' + Math.round(riskAmount).toLocaleString('en-IN') },
      { label: 'Pip Value', value: '₹' + pipVal.toFixed(2) + ' per pip' },
      { label: 'SL Distance', value: stopLossPips + ' pips' },
      { label: 'Pair', value: pair }
    ]
  };
};

export const calcPortfolioRebalance: CalcFunction = (v) => {
  const totalPortfolio = Number(v.totalPortfolio) || 0;
  const equityCurrent = Number(v.equityCurrent) || 0;
  const debtCurrent = Number(v.debtCurrent) || 0;
  const goldCurrent = Number(v.goldCurrent) || 0;
  const equityTarget = Number(v.equityTarget) || 0;
  const debtTarget = Number(v.debtTarget) || 0;
  const goldTarget = Number(v.goldTarget) || 0;

  const P = totalPortfolio;
  const eqCur = P * equityCurrent / 100, dtCur = P * debtCurrent / 100, glCur = P * goldCurrent / 100;
  const eqTgt = P * equityTarget / 100, dtTgt = P * debtTarget / 100, glTgt = P * goldTarget / 100;
  const eqDiff = eqTgt - eqCur, dtDiff = dtTgt - dtCur, glDiff = glTgt - glCur;
  const action = (diff: number) => diff > 0 ? 'Buy ₹' + Math.round(diff).toLocaleString('en-IN') : diff < 0 ? 'Sell ₹' + Math.round(-diff).toLocaleString('en-IN') : 'No change';
  return {
    main: { label: 'Rebalancing Actions', value: (equityTarget + debtTarget + goldTarget) === 100 ? 'Ready' : '[!] Targets must sum to 100%' },
    secondary: [
      { label: 'Equity: ' + action(eqDiff), value: equityCurrent + '% → ' + equityTarget + '%' },
      { label: 'Debt: ' + action(dtDiff), value: debtCurrent + '% → ' + debtTarget + '%' },
      { label: 'Gold: ' + action(glDiff), value: goldCurrent + '% → ' + goldTarget + '%' },
      { label: 'Max Drift', value: Math.max(Math.abs(equityCurrent - equityTarget), Math.abs(debtCurrent - debtTarget), Math.abs(goldCurrent - goldTarget)).toFixed(1) + '%' },
      { label: 'Portfolio Value', value: '₹' + P.toLocaleString('en-IN') }
    ],
    chart: { labels: ['Equity', 'Debt', 'Gold'], data: [Math.round(eqTgt), Math.round(dtTgt), Math.round(glTgt)] }
  };
};

export const calcAssetAllocation: CalcFunction = (v) => {
  const riskProfile = String(v.riskProfile || 'Moderate');
  const ageAlloc = Number(v.ageAlloc) || 30;
  const monthlyInvest_aa = Number(v.monthlyInvest_aa) || 0;
  const horizon = Number(v.horizon) || 5;
  const targetCorpus = Number(v.targetCorpus) || 0;

  const riskMap: Record<string, { eq: number; dt: number; gl: number }> = {
    Conservative: { eq: 30, dt: 55, gl: 15 },
    Moderate: { eq: 50, dt: 35, gl: 15 },
    Aggressive: { eq: 70, dt: 20, gl: 10 },
    'Very Aggressive': { eq: 85, dt: 10, gl: 5 }
  };
  let alloc = riskMap[riskProfile] || riskMap.Moderate;
  const ageAdj = Math.max(0, Math.min(20, (ageAlloc - 25) * 0.5));
  alloc = { eq: Math.round(alloc.eq - ageAdj), dt: Math.round(alloc.dt + ageAdj * 0.7), gl: Math.round(alloc.gl + ageAdj * 0.3) };
  const r = ((alloc.eq * 0.12 + alloc.dt * 0.07 + alloc.gl * 0.08) / 100);
  const monthlyR = r / 12, months = horizon * 12;
  const fv = monthlyR === 0 ? monthlyInvest_aa * months : monthlyInvest_aa * ((Math.pow(1 + monthlyR, months) - 1) / monthlyR) * (1 + monthlyR);
  return {
    main: { label: 'Suggested Allocation', value: alloc.eq + '% Equity / ' + alloc.dt + '% Debt / ' + alloc.gl + '% Gold' },
    secondary: [
      { label: 'Equity Allocation', value: alloc.eq + '%' },
      { label: 'Debt Allocation', value: alloc.dt + '%' },
      { label: 'Gold Allocation', value: alloc.gl + '%' },
      { label: 'Expected Blended Return', value: (r * 100).toFixed(1) + '% p.a.' },
      { label: 'Projected Corpus (' + horizon + 'yr)', value: '₹' + Math.round(fv).toLocaleString('en-IN') },
      { label: 'Gap to Target', value: '₹' + Math.round(Math.max(0, targetCorpus - fv)).toLocaleString('en-IN') }
    ],
    chart: { labels: ['Equity', 'Debt', 'Gold'], data: [alloc.eq, alloc.dt, alloc.gl] }
  };
};

export const calcMonteCarlo: CalcFunction = (v) => {
  const simulations = Number(v.simulations) || 1000;
  const corpus_mc = Number(v.corpus_mc) || 0;
  const yearsRetirement = Number(v.yearsRetirement) || 25;
  const avgReturn_mc = Number(v.avgReturn_mc) || 8;
  const stdDev_mc = Number(v.stdDev_mc) || 15;
  const annualWithdrawal_mc = Number(v.annualWithdrawal_mc) || 0;

  const sims = Math.min(simulations, 5000) || 1000;
  let success = 0;
  const finalBalances: number[] = [];
  for (let s = 0; s < sims; s++) {
    let bal = corpus_mc;
    let survived = true;
    for (let y = 0; y < yearsRetirement; y++) {
      const ret = (avgReturn_mc / 100) + (stdDev_mc / 100) * (Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()));
      bal = bal * (1 + ret) - annualWithdrawal_mc;
      if (bal <= 0) { survived = false; break; }
    }
    if (survived) success++;
    finalBalances.push(Math.max(0, bal));
  }
  const rate = (success / sims * 100);
  finalBalances.sort((a, b) => a - b);
  const median = finalBalances[Math.floor(sims / 2)] || 0;
  const p10 = finalBalances[Math.floor(sims * 0.1)] || 0;
  const p90 = finalBalances[Math.floor(sims * 0.9)] || 0;
  return {
    main: { label: 'Success Rate', value: rate.toFixed(1) + '%' },
    secondary: [
      { label: 'Simulations Run', value: sims.toLocaleString() },
      { label: 'Scenarios Survived', value: success.toLocaleString() + ' / ' + sims.toLocaleString() },
      { label: 'Median Final Balance', value: '₹' + Math.round(median).toLocaleString('en-IN') },
      { label: '10th Percentile (worst case)', value: '₹' + Math.round(p10).toLocaleString('en-IN') },
      { label: '90th Percentile (best case)', value: '₹' + Math.round(p90).toLocaleString('en-IN') },
      { label: 'Verdict', value: rate >= 90 ? '[OK] Plan is robust' : rate >= 70 ? '[!] Consider adjustments' : '[X] High failure risk' }
    ]
  };
};

export const calcInflationGoal: CalcFunction = (v) => {
  const goalAmount_ig = Number(v.goalAmount_ig) || 0;
  const inflationRate_ig = Number(v.inflationRate_ig) || 6;
  const yearsToGoal = Number(v.yearsToGoal) || 5;
  const returnRate_ig = Number(v.returnRate_ig) || 12;
  const currentSavings_ig = Number(v.currentSavings_ig) || 0;

  const inflatedGoal = goalAmount_ig * Math.pow(1 + inflationRate_ig / 100, yearsToGoal);
  const r = returnRate_ig / 12 / 100, n = yearsToGoal * 12;
  const futureCurrentSavings = currentSavings_ig * Math.pow(1 + r, n);
  const remaining = Math.max(0, inflatedGoal - futureCurrentSavings);
  const monthly = remaining > 0 ? (r === 0 ? remaining / n : remaining * r / ((Math.pow(1 + r, n) - 1) * (1 + r))) : 0;
  return {
    main: { label: 'Monthly SIP Needed', value: '₹' + Math.round(monthly).toLocaleString('en-IN') },
    secondary: [
      { label: "Goal (today's value)", value: '₹' + goalAmount_ig.toLocaleString('en-IN') },
      { label: 'Inflation-Adjusted Goal', value: '₹' + Math.round(inflatedGoal).toLocaleString('en-IN') },
      { label: 'Extra Due to Inflation', value: '₹' + Math.round(inflatedGoal - goalAmount_ig).toLocaleString('en-IN') },
      { label: 'Current Savings Growth', value: '₹' + Math.round(futureCurrentSavings).toLocaleString('en-IN') },
      { label: 'Gap to Fill via SIP', value: '₹' + Math.round(remaining).toLocaleString('en-IN') },
      { label: 'Total Investment Required', value: '₹' + Math.round(monthly * n + currentSavings_ig).toLocaleString('en-IN')}
    ],
    chart: { a: Math.round(goalAmount_ig), b: Math.round(inflatedGoal - goalAmount_ig), lA: "Today's Value", lB: 'Inflation Premium' }
  };
};

export const calcBusinessLoan: CalcFunction = (v) => {
  const loanAmt_bl = Number(v.loanAmt_bl) || 0;
  const rate_bl = Number(v.rate_bl) || 10;
  const tenure_bl = Number(v.tenure_bl) || 60;
  const otherDebt = Number(v.otherDebt) || 0;
  const annualRevenue = Number(v.annualRevenue) || 0;
  const operatingExpenses = Number(v.operatingExpenses) || 0;

  const r = rate_bl / 12 / 100, n = tenure_bl;
  const emi = r === 0 ? loanAmt_bl / n : loanAmt_bl * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const annualDebtService = emi * 12 + otherDebt;
  const noi = annualRevenue - operatingExpenses;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  return {
    main: { label: 'Monthly EMI', value: '₹' + Math.round(emi).toLocaleString('en-IN') },
    secondary: [
      { label: 'Total Interest', value: '₹' + Math.round(totalPayment - loanAmt_bl).toLocaleString('en-IN') },
      { label: 'DSCR', value: dscr.toFixed(2) + '×' },
      { label: 'DSCR Status', value: dscr >= 1.25 ? '[OK] Lender-friendly (≥1.25)' : dscr >= 1 ? '[!] Marginal' : '[X] Below requirement' },
      { label: 'Net Operating Income', value: '₹' + Math.round(noi).toLocaleString('en-IN') },
      { label: 'Annual Debt Service', value: '₹' + Math.round(annualDebtService).toLocaleString('en-IN') },
      { label: 'Total Payment', value: '₹' + Math.round(totalPayment).toLocaleString('en-IN') }
    ]
  };
};

export const calcGstInvoice: CalcFunction = (v) => {
  const gstRate_gi = Number(v.gstRate_gi) || 18;
  const sellingPrice_gi = Number(v.sellingPrice_gi) || 0;
  const discount_gi = Number(v.discount_gi) || 0;
  const quantity_gi = Number(v.quantity_gi) || 1;
  const costPrice_gi = Number(v.costPrice_gi) || 0;
  const supplyType = String(v.supplyType || 'Intrastate');

  const discountedPrice = sellingPrice_gi * (1 - discount_gi / 100);
  const lineTotal = discountedPrice * quantity_gi;
  const gstAmt = lineTotal * gstRate_gi / 100;
  const invoiceTotal = lineTotal + gstAmt;
  const totalCost = costPrice_gi * quantity_gi;
  const profit = lineTotal - totalCost;
  const margin = (profit / (lineTotal || 1)) * 100;
  const isIntra = supplyType.includes('Intra');
  return {
    main: { label: 'Invoice Total', value: '₹' + invoiceTotal.toFixed(2) },
    secondary: [
      { label: 'Taxable Amount', value: '₹' + lineTotal.toFixed(2) },
      { label: isIntra ? 'CGST (' + gstRate_gi / 2 + '%)' : 'IGST (' + gstRate_gi + '%)', value: '₹' + (isIntra ? gstAmt / 2 : gstAmt).toFixed(2) },
      ...(isIntra ? [{ label: 'SGST (' + gstRate_gi / 2 + '%)', value: '₹' + (gstAmt / 2).toFixed(2) }] : []),
      { label: 'Total GST', value: '₹' + gstAmt.toFixed(2) },
      { label: 'Profit (before GST)', value: '₹' + profit.toFixed(2), pos: profit > 0 },
      { label: 'Profit Margin', value: margin.toFixed(1) + '%', pos: margin > 0 }
    ],
    chart: { a: Math.round(totalCost), b: Math.round(profit > 0 ? profit : 0), lA: 'Cost', lB: 'Profit' }
  };
};

export const calcEsopTax: CalcFunction = (v) => {
  const fmvOnExercise = Number(v.fmvOnExercise) || 0;
  const grantPrice = Number(v.grantPrice) || 0;
  const sharesQty = Number(v.sharesQty) || 0;
  const taxSlab = String(v.taxSlab || '30%');
  const salePrice_esop = Number(v.salePrice_esop) || 0;
  const holdingMonths = Number(v.holdingMonths) || 0;

  const perquisite = (fmvOnExercise - grantPrice) * sharesQty;
  const slabRate = parseFloat(taxSlab) / 100;
  const perquisiteTax = perquisite * slabRate;
  const capitalGain = (salePrice_esop - fmvOnExercise) * sharesQty;
  const isLTCG = holdingMonths >= 12;
  const cgTax = isLTCG ? Math.max(0, capitalGain - 125000) * 0.125 : capitalGain * 0.20;
  const totalTax = perquisiteTax + cgTax;
  const netProfit = (salePrice_esop - grantPrice) * sharesQty - totalTax;
  const grossDiff = (salePrice_esop - grantPrice) * sharesQty;
  return {
    main: { label: 'Total Tax on ESOPs', value: '₹' + Math.round(totalTax).toLocaleString('en-IN') },
    secondary: [
      { label: 'Perquisite Value', value: '₹' + Math.round(perquisite).toLocaleString('en-IN') },
      { label: 'Perquisite Tax (at ' + Math.round(slabRate * 100) + '% slab)', value: '₹' + Math.round(perquisiteTax).toLocaleString('en-IN') },
      { label: 'Capital Gain (' + (isLTCG ? 'LTCG' : 'STCG') + ')', value: '₹' + Math.round(capitalGain).toLocaleString('en-IN') },
      { label: (isLTCG ? 'LTCG Tax (12.5%)' : 'STCG Tax (20%)'), value: '₹' + Math.round(cgTax).toLocaleString('en-IN') },
      { label: 'Net Profit (after tax)', value: '₹' + Math.round(netProfit).toLocaleString('en-IN'), pos: netProfit > 0 },
      { label: 'Effective Tax Rate', value: ((totalTax / (grossDiff || 1)) * 100).toFixed(1) + '%' }
    ]
  };
};

export const calcFreelanceTax: CalcFunction = (v) => {
  const regime_ft = String(v.regime_ft || 'New Regime (44ADA)');
  const annualRevenue_ft = Number(v.annualRevenue_ft) || 0;
  const expenses_ft = Number(v.expenses_ft) || 0;
  const sec80c_ft = Number(v.sec80c_ft) || 0;
  const healthInsurance_ft = Number(v.healthInsurance_ft) || 0;
  const gstRegistered = String(v.gstRegistered || 'No');

  const is44ADA = regime_ft.includes('44ADA');
  const taxableIncome = is44ADA ? annualRevenue_ft * 0.5 : Math.max(0, annualRevenue_ft - expenses_ft);
  const deductions = is44ADA ? 0 : Math.min(sec80c_ft, 150000) + Math.min(healthInsurance_ft, 25000);
  const netTaxable = Math.max(0, is44ADA ? taxableIncome - 75000 : taxableIncome - deductions - 50000);
  let tax = 0, rem = netTaxable;
  const slabs = [[400000, 0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25], [Infinity, 0.30]];
  for (let i = 0; i < slabs.length; i++) { if (rem <= 0) break; const ch = Math.min(rem, slabs[i][0]); tax += ch * slabs[i][1]; rem -= ch; }
  if (netTaxable <= 1200000) tax = 0;
  const cess = tax * 0.04;
  const totalTax = Math.round(tax + cess);
  const gstRevenue = gstRegistered.startsWith('Yes') ? annualRevenue_ft * 0.18 : 0;
  return {
    main: { label: 'Estimated Income Tax', value: '₹' + totalTax.toLocaleString('en-IN') },
    secondary: [
      { label: 'Gross Revenue', value: '₹' + annualRevenue_ft.toLocaleString('en-IN') },
      { label: is44ADA ? 'Deemed Profit (50%)' : 'Net Business Income', value: '₹' + Math.round(taxableIncome).toLocaleString('en-IN') },
      { label: 'Taxable Income', value: '₹' + Math.round(netTaxable).toLocaleString('en-IN') },
      { label: 'Effective Tax Rate', value: ((totalTax / (annualRevenue_ft || 1)) * 100).toFixed(1) + '%' },
      { label: 'GST to Collect (18%)', value: gstRevenue > 0 ? '₹' + Math.round(gstRevenue).toLocaleString('en-IN') : 'Not applicable' },
      { label: 'Take-Home (after tax)', value: '₹' + Math.round(annualRevenue_ft - totalTax).toLocaleString('en-IN') }
    ]
  };
};

export const calcTcsRemittance: CalcFunction = (v) => {
  const totalLRS = Number(v.totalLRS) || 0;
  const remittanceAmt = Number(v.remittanceAmt) || 0;
  const purpose = String(v.purpose || 'Others');

  const threshold = 700000;
  const cumulativeLRS = totalLRS + remittanceAmt;
  let amtAboveThreshold = Math.max(0, cumulativeLRS - threshold);
  if (amtAboveThreshold > remittanceAmt) amtAboveThreshold = remittanceAmt;
  let rate = 0;
  if (purpose === 'Foreign Education (loan)') rate = 0.005;
  else if (purpose === 'Foreign Education (self)') rate = 0.05;
  else if (purpose === 'Medical Treatment') rate = 0.05;
  else if (purpose === 'Tour Package') rate = 0.05;
  else rate = 0.20;
  let tcs = amtAboveThreshold * rate;
  const tourExtra = purpose === 'Tour Package' ? Math.min(remittanceAmt, threshold) * 0.05 : 0;
  tcs += tourExtra;
  return {
    main: { label: 'TCS Amount', value: '₹' + Math.round(tcs).toLocaleString('en-IN') },
    secondary: [
      { label: 'Remittance Amount', value: '₹' + remittanceAmt.toLocaleString('en-IN') },
      { label: 'Total LRS This FY', value: '₹' + Math.round(cumulativeLRS).toLocaleString('en-IN') },
      { label: 'Amount Above ₹7L Threshold', value: '₹' + Math.round(amtAboveThreshold).toLocaleString('en-IN') },
      { label: 'TCS Rate', value: (rate * 100).toFixed(1) + '%' },
      { label: 'Purpose', value: purpose },
      { label: 'Note', value: 'TCS is adjustable against your income tax liability' }
    ]
  };
};

export const calcSec80c: CalcFunction = (v) => {
  const epf80c = Number(v.epf80c) || 0;
  const ppf80c = Number(v.ppf80c) || 0;
  const elss80c = Number(v.elss80c) || 0;
  const lifeInsurance80c = Number(v.lifeInsurance80c) || 0;
  const nsc80c = Number(v.nsc80c) || 0;
  const tuitionFees80c = Number(v.tuitionFees80c) || 0;
  const homeLoanPrincipal80c = Number(v.homeLoanPrincipal80c) || 0;
  const taxSlab80c = String(v.taxSlab80c || '30%');

  const total = epf80c + ppf80c + elss80c + lifeInsurance80c + nsc80c + tuitionFees80c + homeLoanPrincipal80c;
  const eligible = Math.min(total, 150000);
  const slab = parseFloat(taxSlab80c) / 100;
  const taxSaved = eligible * slab;
  const remaining = Math.max(0, 150000 - total);
  return {
    main: { label: 'Tax Saved under 80C', value: '₹' + Math.round(taxSaved).toLocaleString('en-IN') },
    secondary: [
      { label: 'Total 80C Investments', value: '₹' + total.toLocaleString('en-IN') },
      { label: 'Eligible (max ₹1.5L)', value: '₹' + eligible.toLocaleString('en-IN') },
      { label: 'Unused Limit', value: remaining > 0 ? '₹' + remaining.toLocaleString('en-IN') + ' — invest more!' : '[OK] Fully utilized' },
      { label: 'Tax Slab', value: taxSlab80c },
      { label: 'Suggested: Invest ₹' + remaining.toLocaleString('en-IN') + ' in ELSS', value: remaining > 0 ? 'Additional tax saving: ₹' + Math.round(remaining * slab).toLocaleString('en-IN') : 'Already optimized' }
    ],
    chart: { a: Math.round(eligible), b: Math.round(remaining), lA: 'Utilized', lB: 'Unused' }
  };
};

export const calcHraVsHomeLoan: CalcFunction = (v) => {
  const metro_hvh = String(v.metro_hvh || 'Yes');
  const basic_hvh = Number(v.basic_hvh) || 0;
  const hra_hvh = Number(v.hra_hvh) || 0;
  const rent_hvh = Number(v.rent_hvh) || 0;
  const homeLoanInt = Number(v.homeLoanInt) || 0;
  const homeLoanPrin = Number(v.homeLoanPrin) || 0;
  const slab_hvh = String(v.slab_hvh || '30%');

  const isMetro = metro_hvh === 'Yes';
  const annBasic = basic_hvh * 12, annHra = hra_hvh * 12, annRent = rent_hvh * 12;
  const r1 = annHra, r2 = annRent - 0.1 * annBasic, r3 = isMetro ? 0.5 * annBasic : 0.4 * annBasic;
  const hraExempt = Math.max(0, Math.min(r1, r2, r3));
  const hlInterest = Math.min(homeLoanInt, 200000);
  const hlPrincipal80c = Math.min(homeLoanPrin, 150000);
  const slab = parseFloat(slab_hvh) / 100;
  const hraTaxSaved = hraExempt * slab;
  const hlTaxSaved = (hlInterest + hlPrincipal80c) * slab;
  return {
    main: { label: 'Better Tax Benefit', value: hlTaxSaved > hraTaxSaved ? 'Home Loan (saves ₹' + Math.round(hlTaxSaved - hraTaxSaved).toLocaleString('en-IN') + ' more)' : 'HRA (saves ₹' + Math.round(hraTaxSaved - hlTaxSaved).toLocaleString('en-IN') + ' more)' },
    secondary: [
      { label: 'HRA Exemption (annual)', value: '₹' + Math.round(hraExempt).toLocaleString('en-IN') },
      { label: 'HRA Tax Saved', value: '₹' + Math.round(hraTaxSaved).toLocaleString('en-IN') },
      { label: 'Home Loan Interest (24b)', value: '₹' + Math.round(hlInterest).toLocaleString('en-IN') },
      { label: 'Home Loan Principal (80C)', value: '₹' + Math.round(hlPrincipal80c).toLocaleString('en-IN') },
      { label: 'Home Loan Tax Saved', value: '₹' + Math.round(hlTaxSaved).toLocaleString('en-IN') },
      { label: 'Difference', value: '₹' + Math.round(Math.abs(hlTaxSaved - hraTaxSaved)).toLocaleString('en-IN') }
    ]
  };
};

export const calcProfTax: CalcFunction = (v) => {
  const state_pt = String(v.state_pt || 'Maharashtra');
  const grossSalary_pt = Number(v.grossSalary_pt) || 0;

  const ptRates: Record<string, (s: number) => number> = {
    Maharashtra: (s) => s <= 7500 ? 0 : s <= 10000 ? 175 : 200,
    Karnataka: (s) => s <= 15000 ? 0 : 200,
    'West Bengal': (s) => s <= 10000 ? 0 : s <= 15000 ? 110 : s <= 25000 ? 130 : s <= 40000 ? 150 : 200,
    'Andhra Pradesh': (s) => s <= 15000 ? 0 : s <= 20000 ? 150 : 200,
    Telangana: (s) => s <= 15000 ? 0 : s <= 20000 ? 150 : 200,
    'Tamil Nadu': (s) => s <= 21000 ? 0 : s <= 30000 ? 135 : s <= 45000 ? 315 : s <= 60000 ? 690 : s <= 75000 ? 1025 : 1250,
    Gujarat: (s) => s <= 6000 ? 0 : s <= 9000 ? 80 : s <= 12000 ? 150 : 200,
    'Madhya Pradesh': (s) => s <= 18750 ? 0 : s <= 25000 ? 125 : 208,
    Kerala: (s) => s <= 12000 ? 0 : s <= 18000 ? 120 : s <= 25000 ? 180 : s <= 30000 ? 250 : 208,
    Bihar: (s) => s <= 25000 ? 0 : s <= 50000 ? 83 : 208,
    Odisha: (s) => s <= 13304 ? 0 : s <= 25000 ? 125 : s <= 33333 ? 167 : 200,
    Assam: (s) => s <= 10000 ? 0 : s <= 15000 ? 150 : s <= 25000 ? 180 : 208,
    Jharkhand: (s) => s <= 25000 ? 0 : s <= 40000 ? 150 : 200,
    Meghalaya: (s) => s <= 14999 ? 0 : s <= 20000 ? 150 : 200,
    Tripura: (s) => s <= 7500 ? 0 : s <= 10000 ? 120 : s <= 15000 ? 140 : 150,
    'Other (no PT)': () => 0
  };
  const fn = ptRates[state_pt] || (() => 0);
  const monthly = fn(grossSalary_pt);
  let annual = monthly * 12;
  if (annual > 2500) annual = 2500;
  return {
    main: { label: 'Monthly Professional Tax', value: '₹' + monthly },
    secondary: [
      { label: 'Annual Professional Tax', value: '₹' + annual },
      { label: 'State', value: state_pt },
      { label: 'Gross Salary', value: '₹' + grossSalary_pt.toLocaleString('en-IN') },
      { label: 'PT Deductible from Income Tax', value: 'Yes (under Sec 16)' },
      { label: 'Max PT (Constitutional Limit)', value: '₹2,500 per year' }
    ]
  };
};

export const calcLeaveEncash: CalcFunction = (v) => {
  const basicSalary_le = Number(v.basicSalary_le) || 0;
  const leaveBalance = Number(v.leaveBalance) || 0;
  const govtEmployee = String(v.govtEmployee || 'No');
  const yearsOfService_le = Number(v.yearsOfService_le) || 0;

  const dailySalary = basicSalary_le / 30;
  const grossEncash = dailySalary * leaveBalance;
  const isGovt = govtEmployee.startsWith('Yes');
  let exempt = 0;
  if (isGovt) {
    exempt = grossEncash;
  } else {
    const limit1 = 2500000;
    const limit2 = basicSalary_le * 10;
    const limit3 = dailySalary * Math.min(leaveBalance, 30 * yearsOfService_le);
    const limit4 = 2500000;
    exempt = Math.min(grossEncash, limit1, limit2, limit3, limit4);
  }
  const taxable = Math.max(0, grossEncash - exempt);
  return {
    main: { label: 'Leave Encashment Amount', value: '₹' + Math.round(grossEncash).toLocaleString('en-IN') },
    secondary: [
      { label: 'Tax-Exempt Portion', value: '₹' + Math.round(exempt).toLocaleString('en-IN'), pos: true },
      { label: 'Taxable Portion', value: '₹' + Math.round(taxable).toLocaleString('en-IN') },
      { label: 'Daily Salary', value: '₹' + Math.round(dailySalary).toLocaleString('en-IN') },
      { label: 'Leave Balance', value: leaveBalance + ' days' },
      { label: 'Status', value: isGovt ? 'Fully tax-free (Govt)' : 'Exempt up to ₹25L (Private)' }
    ]
  };
};

export const calcSGB: CalcFunction = (v) => {
  const sgb_amount = Number(v.sgb_amount) || 0;
  const sgb_issuePrice = Number(v.sgb_issuePrice) || 1;
  const sgb_expectedPrice = Number(v.sgb_expectedPrice) || 1;
  const sgb_holding = String(v.sgb_holding || '8 years (maturity)');

  const years = sgb_holding.includes('5') ? 5 : 8;
  const grams = sgb_amount / sgb_issuePrice;
  const interestRate = 0.025;
  const annualInterest = sgb_amount * interestRate;
  const totalInterest = annualInterest * years;
  const maturityValue = grams * sgb_expectedPrice;
  const capitalGain = maturityValue - sgb_amount;
  const totalReturn = maturityValue + totalInterest;
  const totalProfit = totalReturn - sgb_amount;
  const cagr = (Math.pow(totalReturn / (sgb_amount || 1), 1 / years) - 1) * 100;
  const taxFree = years === 8;
  return {
    main: { label: 'Total Return (incl. interest)', value: '₹' + Math.round(totalReturn).toLocaleString('en-IN') },
    secondary: [
      { label: 'Gold Grams Purchased', value: grams.toFixed(3) + ' g' },
      { label: 'Gold Value at Maturity', value: '₹' + Math.round(maturityValue).toLocaleString('en-IN') },
      { label: 'Capital Gain', value: '₹' + Math.round(capitalGain).toLocaleString('en-IN'), pos: capitalGain > 0 },
      { label: 'Interest Earned (2.5% p.a.)', value: '₹' + Math.round(totalInterest).toLocaleString('en-IN') },
      { label: 'Annual Interest', value: '₹' + Math.round(annualInterest).toLocaleString('en-IN') },
      { label: 'Total Profit', value: '₹' + Math.round(totalProfit).toLocaleString('en-IN'), pos: totalProfit > 0 },
      { label: 'Effective CAGR', value: cagr.toFixed(2) + '%' },
      { label: 'Capital Gains Tax', value: taxFree ? 'Tax-free (8-year maturity) [OK]' : 'Taxable at slab rate (premature) [!]' },
      { label: 'Holding Period', value: years + ' years' }
    ],
    chart: { a: Math.round(sgb_amount), b: Math.round(totalProfit), lA: 'Invested', lB: 'Returns' }
  };
};

export const calcFoTurnover: CalcFunction = (v) => {
  const fo_futuresProfit = Number(v.fo_futuresProfit) || 0;
  const fo_futuresLoss = Number(v.fo_futuresLoss) || 0;
  const fo_optionsPremium = Number(v.fo_optionsPremium) || 0;
  const fo_optionsPL = Number(v.fo_optionsPL) || 0;

  const futuresTurnover = Math.abs(fo_futuresProfit) + Math.abs(fo_futuresLoss);
  const optionsTurnover = Math.abs(fo_optionsPremium) + Math.abs(fo_optionsPL);
  const totalTurnover = futuresTurnover + optionsTurnover;
  const netPL = (fo_futuresProfit - fo_futuresLoss) + fo_optionsPL;
  const profitPct = totalTurnover > 0 ? (Math.abs(netPL) / totalTurnover * 100) : 0;
  const auditRequired = totalTurnover > 10000000 || (totalTurnover > 20000000 && profitPct < 6);
  const presumptiveEligible = totalTurnover <= 20000000;
  return {
    main: { label: 'Total F&O Turnover', value: '₹' + Math.round(totalTurnover).toLocaleString('en-IN') },
    secondary: [
      { label: 'Futures Turnover', value: '₹' + Math.round(futuresTurnover).toLocaleString('en-IN') },
      { label: 'Options Turnover', value: '₹' + Math.round(optionsTurnover).toLocaleString('en-IN') },
      { label: 'Net Profit/Loss', value: '₹' + Math.round(netPL).toLocaleString('en-IN'), pos: netPL > 0, neg: netPL < 0 },
      { label: 'Profit % of Turnover', value: profitPct.toFixed(2) + '%' },
      { label: 'Tax Audit Required?', value: auditRequired ? 'Yes — 44AB audit required [!]' : 'No [OK]' },
      { label: '44AD Presumptive?', value: presumptiveEligible ? 'Eligible (turnover ≤ ₹2 Cr) [OK]' : 'Not eligible [X]' },
      { label: 'ITR Form', value: 'ITR-3 (Business Income)' },
      { label: 'Due Date', value: auditRequired ? '31 Oct (audit)' : '31 Jul' }
    ]
  };
};

export const calcPresumptiveTax: CalcFunction = (v) => {
  const pt_type = String(v.pt_type || 'Business (44AD)');
  const pt_turnover = Number(v.pt_turnover) || 0;
  const pt_cashPct = Number(v.pt_cashPct) || 0;

  const cashTurnover = pt_turnover * pt_cashPct / 100;
  const digitalTurnover = pt_turnover - cashTurnover;
  let presumptiveIncome = 0;
  if (pt_type.includes('44AD')) {
    presumptiveIncome = cashTurnover * 0.08 + digitalTurnover * 0.06;
  } else {
    presumptiveIncome = pt_turnover * 0.50;
  }
  const taxable = Math.max(0, presumptiveIncome - 75000);
  let tax = 0;
  const slabs = [[400000, 0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25], [Infinity, 0.30]];
  let rem = taxable;
  for (let i = 0; i < slabs.length; i++) {
    if (rem <= 0) break;
    const chunk = Math.min(rem, slabs[i][0]);
    tax += chunk * slabs[i][1]; rem -= chunk;
  }
  if (taxable <= 1200000) tax = 0;
  const cess = Math.round(tax * 0.04);
  const total = Math.round(tax) + cess;
  const effectiveRate = pt_turnover > 0 ? (total / pt_turnover * 100) : 0;
  return {
    main: { label: 'Tax Payable (New Regime)', value: '₹' + total.toLocaleString('en-IN') },
    secondary: [
      { label: 'Section', value: pt_type.includes('44AD') ? '44AD (Business)' : '44ADA (Professional)' },
      { label: 'Presumptive Income', value: '₹' + Math.round(presumptiveIncome).toLocaleString('en-IN') },
      { label: 'Income as % of Turnover', value: ((presumptiveIncome / (pt_turnover || 1)) * 100).toFixed(1) + '%' },
      { label: 'Cash Turnover (8%)', value: '₹' + Math.round(cashTurnover).toLocaleString('en-IN') },
      { label: 'Digital Turnover (6%)', value: '₹' + Math.round(digitalTurnover).toLocaleString('en-IN') },
      { label: 'Base Tax', value: '₹' + Math.round(tax).toLocaleString('en-IN') },
      { label: 'Health & Edu Cess (4%)', value: cess.toLocaleString('en-IN') },
      { label: 'Effective Tax Rate', value: effectiveRate.toFixed(2) + '% of turnover' },
      { label: 'ITR Form', value: 'ITR-4 (Sugam)' },
      { label: 'Turnover Limit', value: pt_type.includes('44AD') ? '₹3 Cr (digital) / ₹2 Cr (cash)' : '₹75 Lakh' }
    ]
  };
};

export const calcHomeLoanTaxBenefit: CalcFunction = (v) => {
  const hltb_interest = Number(v.hltb_interest) || 0;
  const hltb_principal = Number(v.hltb_principal) || 0;
  const hltb_income = Number(v.hltb_income) || 0;
  const hltb_other80c = Number(v.hltb_other80c) || 0;
  const hltb_property = String(v.hltb_property || 'Self Occupied');

  const isSelfOccupied = hltb_property.includes('Self');
  const maxInterest = isSelfOccupied ? 200000 : Infinity;
  const interestDeduction = Math.min(hltb_interest, maxInterest);
  const available80c = Math.max(0, 150000 - hltb_other80c);
  const principalDeduction = Math.min(hltb_principal, available80c);
  const totalDeduction = interestDeduction + principalDeduction;
  const marginalRate = hltb_income > 1500000 ? 0.312 : hltb_income > 1200000 ? 0.208 : hltb_income > 900000 ? 0.156 : 0.052;
  const taxSaving = Math.round(totalDeduction * marginalRate);
  const monthlyTaxSaving = Math.round(taxSaving / 12);
  return {
    main: { label: 'Annual Tax Saving', value: '₹' + taxSaving.toLocaleString('en-IN') },
    secondary: [
      { label: 'Section 24b (Interest)', value: '₹' + Math.round(interestDeduction).toLocaleString('en-IN') + (isSelfOccupied ? ' (max ₹2L)' : '') },
      { label: 'Section 80C (Principal)', value: '₹' + Math.round(principalDeduction).toLocaleString('en-IN') + ' of ₹1.5L limit' },
      { label: 'Other 80C Used', value: '₹' + hltb_other80c.toLocaleString('en-IN') },
      { label: 'Total Deduction', value: '₹' + Math.round(totalDeduction).toLocaleString('en-IN') },
      { label: 'Monthly Tax Saving', value: '₹' + monthlyTaxSaving.toLocaleString('en-IN') },
      { label: 'Marginal Rate Used', value: (marginalRate * 100).toFixed(1) + '%' },
      { label: 'Property Type', value: hltb_property },
      { label: 'Regime', value: 'Old Regime Only [!]' }
    ],
    chart: { a: Math.round(interestDeduction), b: Math.round(principalDeduction), lA: '24b Interest', lB: '80C Principal' }
  };
};

export const calcIndexedCost: CalcFunction = (v) => {
  const ic_purchasePrice = Number(v.ic_purchasePrice) || 0;
  const ic_purchaseYear = String(v.ic_purchaseYear || '2001-02');
  const ic_salePrice = Number(v.ic_salePrice) || 0;
  const ic_saleYear = String(v.ic_saleYear || '2025-26');

  const cii: Record<string, number> = {
    '2001-02': 100, '2002-03': 105, '2003-04': 109, '2004-05': 113, '2005-06': 117, '2006-07': 122, '2007-08': 129, '2008-09': 137,
    '2009-10': 148, '2010-11': 167, '2011-12': 184, '2012-13': 200, '2013-14': 220, '2014-15': 240, '2015-16': 254, '2016-17': 264,
    '2017-18': 272, '2018-19': 280, '2019-20': 289, '2020-21': 301, '2021-22': 317, '2022-23': 331, '2023-24': 348, '2024-25': 363,
    '2025-26': 377
  };
  const purchaseCII = cii[ic_purchaseYear] || 100;
  const saleCII = cii[ic_saleYear] || 377;
  const indexedCost = ic_purchasePrice * (saleCII / purchaseCII);
  const ltcgWithIndex = ic_salePrice - indexedCost;
  const ltcgWithout = ic_salePrice - ic_purchasePrice;
  const taxWithIndex = Math.max(0, ltcgWithIndex) * 0.20;
  const taxWithout = Math.max(0, ltcgWithout) * 0.125;
  const betterOption = taxWithIndex < taxWithout ? '20% with Indexation' : '12.5% without Indexation';
  return {
    main: { label: 'Indexed Cost of Acquisition', value: '₹' + Math.round(indexedCost).toLocaleString('en-IN') },
    secondary: [
      { label: 'Purchase CII (' + ic_purchaseYear + ')', value: String(purchaseCII) },
      { label: 'Sale CII (' + ic_saleYear + ')', value: String(saleCII) },
      { label: 'LTCG (with indexation)', value: '₹' + Math.round(ltcgWithIndex).toLocaleString('en-IN') },
      { label: 'Tax @20% (with indexation)', value: '₹' + Math.round(taxWithIndex).toLocaleString('en-IN') },
      { label: 'LTCG (without indexation)', value: '₹' + Math.round(ltcgWithout).toLocaleString('en-IN') },
      { label: 'Tax @12.5% (without)', value: '₹' + Math.round(taxWithout).toLocaleString('en-IN') },
      { label: 'Better Option', value: betterOption + ' [OK]' },
      { label: 'Tax Saved', value: '₹' + Math.round(Math.abs(taxWithIndex - taxWithout)).toLocaleString('en-IN'), pos: true }
    ],
    chart: { a: Math.round(Math.min(taxWithIndex, taxWithout)), b: Math.round(Math.max(taxWithIndex, taxWithout)), lA: 'Lower Tax', lB: 'Higher Tax' }
  };
};

export const calcGoldComparison: CalcFunction = (v) => {
  const gc_amount = Number(v.gc_amount) || 0;
  const gc_years = Number(v.gc_years) || 8;
  const gc_goldReturn = Number(v.gc_goldReturn) || 8;
  const gc_taxSlab = String(v.gc_taxSlab || '30%');

  const goldReturn = gc_goldReturn / 100;
  const taxSlab = parseFloat(gc_taxSlab) / 100;
  const goldValue = gc_amount * Math.pow(1 + goldReturn, gc_years);
  const gain = goldValue - gc_amount;

  const dgBuySpread = 0.015, dgSellSpread = 0.015;
  const dgEffective = gc_amount * (1 - dgBuySpread);
  const dgMaturity = dgEffective * Math.pow(1 + goldReturn, gc_years) * (1 - dgSellSpread);
  const dgGain = dgMaturity - gc_amount;
  const dgTax = Math.max(0, dgGain) * taxSlab;
  const dgNet = dgMaturity - dgTax;

  const sgbInterest = gc_amount * 0.025 * gc_years;
  const sgbInterestTax = sgbInterest * taxSlab;
  const sgbCapitalGain = gain;
  const sgbCapitalTax = gc_years >= 8 ? 0 : sgbCapitalGain * taxSlab;
  const sgbNet = goldValue + sgbInterest - sgbInterestTax - sgbCapitalTax;

  const etfExpense = 0.005;
  const etfReturn = goldReturn - etfExpense;
  const etfValue = gc_amount * Math.pow(1 + etfReturn, gc_years);
  const etfGain = etfValue - gc_amount;
  const etfTax = Math.max(0, etfGain) * (gc_years >= 1 ? 0.125 : taxSlab);
  const etfNet = etfValue - etfTax;

  const best = sgbNet >= dgNet && sgbNet >= etfNet ? 'SGB' : etfNet >= dgNet ? 'Gold ETF' : 'Digital Gold';
  return {
    main: { label: 'Best Option', value: best + ' [OK]' },
    secondary: [
      { label: 'SGB Net Return', value: '₹' + Math.round(sgbNet).toLocaleString('en-IN'), pos: true },
      { label: 'SGB Interest (2.5%)', value: '₹' + Math.round(sgbInterest).toLocaleString('en-IN') },
      { label: 'SGB Capital Gains Tax', value: gc_years >= 8 ? 'Tax-free [OK]' : '₹' + Math.round(sgbCapitalTax).toLocaleString('en-IN') },
      { label: 'Gold ETF Net Return', value: '₹' + Math.round(etfNet).toLocaleString('en-IN') },
      { label: 'ETF Tax (12.5% LTCG)', value: '₹' + Math.round(etfTax).toLocaleString('en-IN') },
      { label: 'Digital Gold Net Return', value: '₹' + Math.round(dgNet).toLocaleString('en-IN') },
      { label: 'Digital Gold Spread Cost', value: ((dgBuySpread + dgSellSpread) * 100) + '% buy+sell' },
      { label: 'Gold Value (' + gc_years + 'yr)', value: '₹' + Math.round(goldValue).toLocaleString('en-IN') }
    ],
    chart: { labels: ['SGB', 'Gold ETF', 'Digital Gold'], data: [Math.round(sgbNet), Math.round(etfNet), Math.round(dgNet)] }
  };
};

export const calcRentYield: CalcFunction = (v) => {
  const ry_monthlyRent = Number(v.ry_monthlyRent) || 0;
  const ry_vacancy = Number(v.ry_vacancy) || 0;
  const ry_maintenance = Number(v.ry_maintenance) || 0;
  const ry_propertyTax = Number(v.ry_propertyTax) || 0;
  const ry_propertyValue = Number(v.ry_propertyValue) || 1;

  const annualRent = ry_monthlyRent * 12;
  const effectiveRent = ry_monthlyRent * (12 - ry_vacancy);
  const annualCosts = ry_maintenance + ry_propertyTax;
  const grossYield = (annualRent / ry_propertyValue) * 100;
  const netIncome = effectiveRent - annualCosts;
  const netYield = (netIncome / ry_propertyValue) * 100;
  const monthlyNet = Math.round(netIncome / 12);
  const fdComparison = ry_propertyValue * 0.07;
  const fdVsRent = fdComparison - netIncome;
  return {
    main: { label: 'Gross Rental Yield', value: grossYield.toFixed(2) + '%' },
    secondary: [
      { label: 'Net Rental Yield', value: netYield.toFixed(2) + '%' },
      { label: 'Annual Gross Rent', value: '₹' + Math.round(annualRent).toLocaleString('en-IN') },
      { label: 'Effective Rent (after vacancy)', value: '₹' + Math.round(effectiveRent).toLocaleString('en-IN') },
      { label: 'Annual Costs', value: '₹' + annualCosts.toLocaleString('en-IN') },
      { label: 'Net Annual Income', value: '₹' + Math.round(netIncome).toLocaleString('en-IN') },
      { label: 'Net Monthly Income', value: '₹' + monthlyNet.toLocaleString('en-IN') },
      { label: 'If FD instead (7%)', value: '₹' + Math.round(fdComparison).toLocaleString('en-IN') + '/yr' },
      { label: 'FD vs Rent Gap', value: '₹' + Math.round(Math.abs(fdVsRent)).toLocaleString('en-IN') + (fdVsRent > 0 ? ' more from FD [!]' : ' more from rent [OK]') }
    ],
    chart: { a: Math.round(netIncome), b: Math.round(annualCosts), lA: 'Net Rental Income', lB: 'Annual Costs' }
  };
};
