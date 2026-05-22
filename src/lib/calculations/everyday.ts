/* ═══════════════════════════════════════════════════
   Calc Labz — Everyday Calculation Functions
   Ported from calculators-everyday.js
   Pure functions — no DOM dependencies
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcTip: CalcFunction = (v) => {
  const bill = Number(v.bill) || 0;
  const tip = Number(v.tip) || 0;
  const people = Number(v.people) || 1;
  const tipAmt = bill * tip / 100;
  const total = bill + tipAmt;
  const perPerson = total / people;
  return {
    main: { label: "Per Person", value: "₹" + perPerson.toFixed(2) },
    secondary: [
      { label: "Tip Amount", value: "₹" + tipAmt.toFixed(2) },
      { label: "Total Bill + Tip", value: "₹" + total.toFixed(2) },
      { label: "Bill per Person (no tip)", value: "₹" + (bill / people).toFixed(2) }
    ]
  };
};

export const calcDiscount: CalcFunction = (v) => {
  const original = Number(v.original) || 0;
  const discount = Number(v.discount) || 0;
  const saved = original * discount / 100;
  const final = original - saved;
  return {
    main: { label: "Final Price", value: "₹" + final.toFixed(2) },
    secondary: [
      { label: "You Save", value: "₹" + saved.toFixed(2) },
      { label: "Discount %", value: discount + "%" },
      { label: "Price after extra 10%", value: "₹" + (final * 0.9).toFixed(2) }
    ]
  };
};

export const calcFuel: CalcFunction = (v) => {
  const distance = Number(v.distance) || 0;
  const efficiency = Number(v.efficiency) || 1;
  const price = Number(v.price) || 0;
  const litres = distance / efficiency;
  const cost = litres * price;
  return {
    main: { label: "Trip Cost", value: "₹" + cost.toFixed(2) },
    secondary: [
      { label: "Fuel Required", value: litres.toFixed(2) + " L" },
      { label: "Cost per km", value: "₹" + (cost / (distance || 1)).toFixed(2) },
      { label: "Monthly (2000km)", value: "₹" + ((2000 / efficiency) * price).toFixed(2) }
    ]
  };
};

export const calcSalary: CalcFunction = (v) => {
  const ctc = Number(v.ctc) || 0;
  const pf = Number(v.pf) || 0;
  const tax = Number(v.tax) || 0;
  const net = ctc - pf - tax;
  return {
    main: { label: "Monthly In-Hand", value: "₹" + Math.round(net / 12).toLocaleString() },
    secondary: [
      { label: "Annual In-Hand", value: "₹" + net.toLocaleString() },
      { label: "Weekly", value: "₹" + Math.round(net / 52).toLocaleString() },
      { label: "Daily (22 working days)", value: "₹" + Math.round(net / 12 / 22).toLocaleString() },
      { label: "Hourly", value: "₹" + Math.round(net / 12 / 22 / 8).toLocaleString() }
    ]
  };
};

export const calcEmi2: CalcFunction = (v) => {
  const income = Number(v.income) || 0;
  const obligations = Number(v.obligations) || 0;
  const rate = Number(v.rate) || 0;
  const tenure = Number(v.tenure) || 1;
  const eligible = (income * 0.5) - obligations;
  const r = rate / 12 / 100;
  const n = tenure;
  let loan = 0;
  if (r > 0) {
    loan = eligible * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  } else {
    loan = eligible * n;
  }
  return {
    main: { label: "Max Eligible EMI", value: "₹" + eligible.toLocaleString() },
    secondary: [
      { label: "Max Loan Amount", value: "₹" + Math.round(loan).toLocaleString() },
      { label: "FOIR Used", value: "50%" },
      { label: "Available after EMI", value: "₹" + (income - eligible).toLocaleString() }
    ]
  };
};

export const calcGrade: CalcFunction = (v) => {
  const p = Number(v.pct) || 0;
  const grade = p >= 90 ? "A+" : p >= 80 ? "A" : p >= 70 ? "B+" : p >= 60 ? "B" : p >= 50 ? "C" : p >= 40 ? "D" : "F";
  const gpa = p >= 90 ? 10 : p >= 80 ? 9 : p >= 70 ? 8 : p >= 60 ? 7 : p >= 50 ? 6 : p >= 40 ? 5 : 0;
  const us = p >= 93 ? 4.0 : p >= 90 ? 3.7 : p >= 87 ? 3.3 : p >= 83 ? 3.0 : p >= 80 ? 2.7 : p >= 77 ? 2.3 : p >= 73 ? 2.0 : p >= 70 ? 1.7 : p >= 67 ? 1.3 : p >= 63 ? 1.0 : p >= 60 ? 0.7 : 0.0;
  return {
    main: { label: "Grade", value: grade },
    secondary: [
      { label: "GPA (10 scale)", value: gpa.toFixed(1) },
      { label: "GPA (4.0 US scale)", value: us.toFixed(1) },
      { label: "Class", value: p >= 60 ? "Passing" : "Failing" }
    ]
  };
};

export const calcElectricBill: CalcFunction = (v) => {
  const watts = Number(v.watts) || 0;
  const hours = Number(v.hours) || 0;
  const rate = Number(v.rate) || 0;
  const daily = watts * hours / 1000;
  const monthly = daily * 30;
  const cost = monthly * rate;
  return {
    main: { label: "Monthly Cost", value: "₹" + cost.toFixed(2) },
    secondary: [
      { label: "Daily Consumption", value: daily.toFixed(3) + " kWh" },
      { label: "Monthly Consumption", value: monthly.toFixed(2) + " kWh" },
      { label: "Annual Cost", value: "₹" + (cost * 12).toFixed(2) },
      { label: "Annual Units", value: (daily * 365).toFixed(1) + " kWh" }
    ]
  };
};

export const calcLoanAffordability: CalcFunction = (v) => {
  const income = Number(v.income) || 0;
  const rate = Number(v.rate) || 0;
  const term = Number(v.term) || 1;
  const down = Number(v.down) || 0;
  const maxEMI = income * 0.40;
  const r = rate / 12 / 100;
  const n = term * 12;
  let maxLoan = 0;
  if (r > 0) {
    maxLoan = maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  } else {
    maxLoan = maxEMI * n;
  }
  const maxPrice = maxLoan + down;
  return {
    main: { label: "Max Home Price", value: "₹" + Math.round(maxPrice).toLocaleString() },
    secondary: [
      { label: "Max Loan", value: "₹" + Math.round(maxLoan).toLocaleString() },
      { label: "Max EMI (40% income)", value: "₹" + Math.round(maxEMI).toLocaleString() },
      { label: "Down Payment", value: "₹" + down.toLocaleString() },
      { label: "Down %", value: ((down / (maxPrice || 1)) * 100).toFixed(1) + "%" }
    ]
  };
};

export const calcCaloriesFood: CalcFunction = (v) => {
  const protein = Number(v.protein) || 0;
  const carbs = Number(v.carbs) || 0;
  const fat = Number(v.fat) || 0;
  const fiber = Number(v.fiber) || 0;
  const pCal = protein * 4;
  const cCal = carbs * 4;
  const fCal = fat * 9;
  const total = pCal + cCal + fCal;
  return {
    main: { label: "Total Calories", value: Math.round(total) + " kcal" },
    secondary: [
      { label: "From Protein", value: pCal + " kcal (" + ((pCal / (total || 1)) * 100).toFixed(0) + "%)" },
      { label: "From Carbs", value: cCal + " kcal (" + ((cCal / (total || 1)) * 100).toFixed(0) + "%)" },
      { label: "From Fat", value: fCal + " kcal (" + ((fCal / (total || 1)) * 100).toFixed(0) + "%)" },
      { label: "Net Carbs", value: (carbs - fiber).toFixed(1) + "g" }
    ]
  };
};

export const calcWireSize: CalcFunction = (v) => {
  const voltage = Number(v.voltage) || 230;
  const drop = Number(v.drop) || 3;
  const length = Number(v.length) || 1;
  const current = Number(v.current) || 1;
  const maxDrop = voltage * drop / 100;
  const resistivity = 0.0175; // copper Ω·mm²/m
  const area = (2 * resistivity * length * current) / (maxDrop || 1);
  const stdSizes = [1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
  const recommended = stdSizes.find(s => s >= area) || stdSizes[stdSizes.length - 1];
  const actualDrop = (2 * resistivity * length * current / recommended).toFixed(2);
  return {
    main: { label: "Recommended Wire", value: recommended + " mm²" },
    secondary: [
      { label: "Minimum Area Needed", value: area.toFixed(3) + " mm²" },
      { label: "Actual Voltage Drop", value: actualDrop + " V" },
      { label: "Drop %", value: ((Number(actualDrop) / voltage) * 100).toFixed(2) + "%" },
      { label: "Max Temp Rating", value: "70°C (PVC)" }
    ]
  };
};

export const calcPixelResolution: CalcFunction = (v) => {
  const width = Number(v.width) || 1920;
  const height = Number(v.height) || 1080;
  const dpi = Number(v.dpi) || 300;
  const bpp = String(v.bpp || "24-bit");
  const mp = (width * height / 1e6).toFixed(2);
  const bppMap: Record<string, number> = { "8-bit": 8, "16-bit": 16, "24-bit": 24, "32-bit": 32 };
  const bits = bppMap[bpp] || 24;
  const fileMB = (width * height * bits / 8 / 1024 / 1024).toFixed(2);
  const printW = (width / dpi * 2.54).toFixed(2);
  const printH = (height / dpi * 2.54).toFixed(2);
  const ar = width / height;
  const arStr = Math.abs(ar - 16 / 9) < 0.01 ? "16:9" : Math.abs(ar - 4 / 3) < 0.01 ? "4:3" : Math.abs(ar - 1) < 0.01 ? "1:1" : `${width}:${height}`;
  return {
    main: { label: "Megapixels", value: mp + " MP" },
    secondary: [
      { label: "Raw File Size", value: fileMB + " MB" },
      { label: "Print Size", value: `${printW}×${printH} cm at ${dpi} DPI` },
      { label: "Aspect Ratio", value: arStr },
      { label: "Total Pixels", value: (width * height).toLocaleString() }
    ]
  };
};

export const calcTypingSpeed: CalcFunction = (v) => {
  const words = Number(v.words) || 200;
  const wpm = Number(v.wpm) || 200;
  const typingWpm = Number(v.typingWpm) || 40;
  const readSec = words / wpm * 60;
  const typeSec = words / typingWpm * 60;
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.round(s % 60);
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };
  return {
    main: { label: "Reading Time", value: fmt(readSec) },
    secondary: [
      { label: "Typing Time", value: fmt(typeSec) },
      { label: "Pages (250 words/page)", value: (words / 250).toFixed(1) + " pages" },
      { label: "Speak Aloud (130 wpm)", value: fmt(words / 130 * 60) },
      { label: "Tweet Threads (280 ch)", value: Math.ceil(words * 5.5 / 280) + " tweets" }
    ]
  };
};

export const calcEmiExtra: CalcFunction = (v) => {
  const outstanding = Number(v.outstanding) || 100000;
  const rate = Number(v.rate) || 8.5;
  const remaining = Number(v.remaining) || 120;
  const extra = Number(v.extra) || 5000;
  const r = rate / 12 / 100;
  const emi = outstanding * r * Math.pow(1 + r, remaining) / (Math.pow(1 + r, remaining) - 1);
  const normalInterest = emi * remaining - outstanding;
  const newEmi = emi + extra;
  const newMonths = Math.log(newEmi / (newEmi - outstanding * r)) / Math.log(1 + r);
  const newInterest = newEmi * newMonths - outstanding;
  const saved = normalInterest - newInterest;
  const monthsSaved = remaining - newMonths;
  return {
    main: { label: "Interest Saved", value: "₹" + Math.round(saved).toLocaleString() },
    secondary: [
      { label: "Months Saved", value: Math.round(monthsSaved) + " months" },
      { label: "New Tenure", value: Math.round(newMonths) + " months" },
      { label: "Current EMI", value: "₹" + Math.round(emi).toLocaleString() },
      { label: "New EMI (with extra)", value: "₹" + Math.round(newEmi).toLocaleString() }
    ]
  };
};

export const calcInvestVsRent: CalcFunction = (v) => {
  const propValue = Number(v.propValue) || 5000000;
  const appreciation = Number(v.appreciation) || 5;
  const years = Number(v.years) || 10;
  const emi = Number(v.emi) || 35000;
  const rent = Number(v.rent) || 15000;
  const futureValue = propValue * Math.pow(1 + appreciation / 100, years);
  const capitalGain = futureValue - propValue;
  const totalEmi = emi * years * 12;
  const totalRent = rent * years * 12;
  const netCostBuy = totalEmi - capitalGain;
  const diff = totalRent - netCostBuy;
  return {
    main: { label: "Better Option", value: diff > 0 ? "Buying" : "Renting" },
    secondary: [
      { label: "Future Property Value", value: "₹" + Math.round(futureValue).toLocaleString() },
      { label: "Capital Gain", value: "₹" + Math.round(capitalGain).toLocaleString() },
      { label: "Total EMI Paid", value: "₹" + totalEmi.toLocaleString() },
      { label: "Total Rent Paid", value: "₹" + totalRent.toLocaleString() },
      { label: "Net Cost of Buying", value: "₹" + Math.round(netCostBuy).toLocaleString() }
    ]
  };
};

export const calcUnitPrice: CalcFunction = (v) => {
  const price1 = Number(v.price1) || 0;
  const qty1 = Number(v.qty1) || 1;
  const price2 = Number(v.price2) || 0;
  const qty2 = Number(v.qty2) || 1;
  const unitA = price1 / qty1, unitB = price2 / qty2;
  const better = unitA < unitB ? "Item A" : "Item B";
  const saving = Math.abs(unitA - unitB);
  return {
    main: { label: "Better Value", value: better },
    secondary: [
      { label: "Item A — per unit", value: "₹" + unitA.toFixed(4) },
      { label: "Item B — per unit", value: "₹" + unitB.toFixed(4) },
      { label: "Saving per unit", value: "₹" + saving.toFixed(4) },
      { label: "Item A cheaper by", value: unitA < unitB ? ((1 - unitA / unitB) * 100).toFixed(1) + "%" : "—" },
      { label: "Item B cheaper by", value: unitB < unitA ? ((1 - unitB / unitA) * 100).toFixed(1) + "%" : "—" }
    ]
  };
};

export const calcPetrolParity: CalcFunction = (v) => {
  const kmPerYear = Number(v.kmPerYear) || 10000;
  const petrolMileage = Number(v.petrolMileage) || 15;
  const petrolPrice = Number(v.petrolPrice) || 100;
  const evRange = Number(v.evRange) || 300;
  const chargeCost = Number(v.chargeCost) || 300;
  const petrolAnnual = (kmPerYear / petrolMileage) * petrolPrice;
  const chargesPerYear = kmPerYear / evRange;
  const evAnnual = chargesPerYear * chargeCost;
  const saving = petrolAnnual - evAnnual;
  const breakEvenDiff = 300000; // avg EV premium
  const paybackYears = breakEvenDiff / Math.max(1, saving);
  return {
    main: { label: "Annual Saving (EV)", value: "₹" + Math.round(saving).toLocaleString() },
    secondary: [
      { label: "Petrol Annual Cost", value: "₹" + Math.round(petrolAnnual).toLocaleString() },
      { label: "EV Annual Cost", value: "₹" + Math.round(evAnnual).toLocaleString() },
      { label: "Payback Period (est ₹3L premium)", value: paybackYears.toFixed(1) + " years" },
      { label: "CO₂ Saved (approx)", value: Math.round((kmPerYear / petrolMileage) * 2.31) + " kg/yr" }
    ]
  };
};

export const calcLaundry: CalcFunction = (v) => {
  const chest = Number(v.chest) || 90;
  const height = Number(v.height) || 170;
  const us = chest <= 86 ? "XS" : chest <= 91 ? "S" : chest <= 96 ? "M" : chest <= 101 ? "L" : chest <= 106 ? "XL" : "XXL";
  const eu = chest <= 86 ? "44" : chest <= 91 ? "46" : chest <= 96 ? "48" : chest <= 101 ? "50" : chest <= 106 ? "52" : "54";
  const uk = chest <= 86 ? "34" : chest <= 91 ? "36" : chest <= 96 ? "38" : chest <= 101 ? "40" : chest <= 106 ? "42" : "44";
  const shoeEu = Math.round(height * 0.16 + 1);
  return {
    main: { label: "Size (US/International)", value: us },
    secondary: [
      { label: "EU Size", value: eu },
      { label: "UK Size", value: uk },
      { label: "Estimated Shoe (EU)", value: String(shoeEu) },
      { label: "Chest", value: chest + " cm / " + (chest / 2.54).toFixed(1) + '"' }
    ]
  };
};

export const calcNetWorth: CalcFunction = (v) => {
  const cash = Number(v.cash) || 0;
  const stocks = Number(v.stocks) || 0;
  const property = Number(v.property) || 0;
  const gold = Number(v.gold_nw) || 0;
  const pf = Number(v.pf) || 0;
  const homeloan = Number(v.homeloan) || 0;
  const carloan = Number(v.carloan) || 0;
  const cc = Number(v.cc) || 0;

  const assets = cash + stocks + property + gold + pf;
  const liabilities = homeloan + carloan + cc;
  const netWorth = assets - liabilities;
  const ratio = assets > 0 ? (liabilities / assets * 100) : 0;
  return {
    main: { label: "Net Worth", value: "₹" + netWorth.toLocaleString() },
    secondary: [
      { label: "Total Assets", value: "₹" + assets.toLocaleString() },
      { label: "Total Liabilities", value: "₹" + liabilities.toLocaleString() },
      { label: "Debt-to-Asset Ratio", value: ratio.toFixed(1) + "%" },
      { label: "Financial Health", value: ratio < 30 ? "Strong" : ratio < 50 ? "Moderate" : ratio < 80 ? "Weak" : "Over-leveraged" },
      { label: "Liquid Assets", value: "₹" + (cash + stocks).toLocaleString() }
    ]
  };
};

export const calcWeddingBudget: CalcFunction = (v) => {
  const guests = Number(v.guests) || 100;
  const func = Number(v.func) || 1;
  const catering_pp = Number(v.catering_pp) || 500;
  const city_tier = String(v.city_tier || "Tier 2");
  const multiplier = city_tier.includes("1") ? 1.5 : city_tier.includes("2") ? 1.0 : 0.7;
  const catering = catering_pp * guests * func;
  const venue = 100000 * multiplier * func;
  const decor = 150000 * multiplier;
  const photography = 80000 * multiplier;
  const clothes = 100000 * multiplier;
  const misc = (catering + venue + decor + photography + clothes) * 0.15;
  const total = catering + venue + decor + photography + clothes + misc;
  return {
    main: { label: "Estimated Total Budget", value: "₹" + Math.round(total).toLocaleString() },
    secondary: [
      { label: "Catering (" + guests + " guests × " + func + " functions)", value: "₹" + Math.round(catering).toLocaleString() },
      { label: "Venue & Decoration", value: "₹" + Math.round(venue + decor).toLocaleString() },
      { label: "Photography & Video", value: "₹" + Math.round(photography).toLocaleString() },
      { label: "Clothes & Jewelry (est.)", value: "₹" + Math.round(clothes).toLocaleString() },
      { label: "Miscellaneous (15%)", value: "₹" + Math.round(misc).toLocaleString() }
    ]
  };
};

export const calcRentAfford: CalcFunction = (v) => {
  const salary = Number(v.salary_r) || 0;
  const expenses = Number(v.expenses_r) || 0;
  const emi = Number(v.emi_r) || 0;
  const savings = Number(v.savings_r) || 0;
  const available = salary - expenses - emi - savings;
  const maxRent = Math.round(available * 0.9); // 90% of available for rent
  const rentPct = salary > 0 ? (maxRent / salary * 100) : 0;
  return {
    main: { label: "Max Affordable Rent", value: "₹" + Math.max(0, maxRent).toLocaleString() },
    secondary: [
      { label: "Rent as % of Income", value: rentPct.toFixed(1) + "%" },
      { label: "Recommended Limit (30%)", value: "₹" + (salary * 0.3).toLocaleString() },
      { label: "Surplus After Rent", value: "₹" + Math.max(0, available - maxRent).toLocaleString() },
      { label: "Status", value: rentPct <= 30 ? "[OK] Comfortable" : rentPct <= 40 ? "[!] Manageable" : "[X] Stretched" }
    ]
  };
};

export const calcFreelanceRate: CalcFunction = (v) => {
  const annualIncome = Number(v.annualIncome) || 0;
  const expenses = Number(v.expenses_fl) || 0;
  const tax = Number(v.tax_fl) || 0;
  const workDays = Number(v.workDays) || 200;
  const hoursPerDay = Number(v.hoursPerDay) || 8;
  const grossNeeded = (annualIncome + expenses) / (1 - tax / 100);
  const dailyRate = grossNeeded / workDays;
  const hourlyRate = dailyRate / hoursPerDay;
  const monthly = grossNeeded / 12;
  return {
    main: { label: "Hourly Rate", value: "₹" + Math.round(hourlyRate).toLocaleString() },
    secondary: [
      { label: "Daily Rate", value: "₹" + Math.round(dailyRate).toLocaleString() },
      { label: "Monthly Billing Target", value: "₹" + Math.round(monthly).toLocaleString() },
      { label: "Annual Gross Needed", value: "₹" + Math.round(grossNeeded).toLocaleString() },
      { label: "Tax Provision", value: "₹" + Math.round(grossNeeded * tax / 100).toLocaleString() },
      { label: "Break-even Day Rate", value: "₹" + Math.round(expenses / workDays).toLocaleString() }
    ]
  };
};

export const calcCarbonFootprint: CalcFunction = (v) => {
  const carKm = Number(v.carKm) || 0;
  const carFuel = Number(v.carFuel) || 15;
  const flights = Number(v.flights) || 0;
  const elecUnits = Number(v.elecUnits) || 0;
  const meatMeals = Number(v.meatMeals) || 0;
  const carCO2 = (carKm / carFuel) * 2.31; // kg CO2 per litre petrol
  const flightCO2 = flights * 255; // avg 255kg per short flight
  const elecCO2 = elecUnits * 12 * 0.82; // India grid: 0.82 kg/kWh
  const dietCO2 = meatMeals * 52 * 3.3; // 3.3kg CO2 per meat meal
  const total = carCO2 + flightCO2 + elecCO2 + dietCO2;
  const indiaAvg = 1900;
  return {
    main: { label: "Annual Carbon Footprint", value: (total / 1000).toFixed(2) + " tonnes CO₂" },
    secondary: [
      { label: "Car Emissions", value: (carCO2 / 1000).toFixed(2) + " t CO₂" },
      { label: "Flights", value: (flightCO2 / 1000).toFixed(2) + " t CO₂" },
      { label: "Electricity", value: (elecCO2 / 1000).toFixed(2) + " t CO₂" },
      { label: "Diet", value: (dietCO2 / 1000).toFixed(2) + " t CO₂" },
      { label: "vs India Average (1.9t)", value: total > indiaAvg ? "+" + (((total - indiaAvg) / indiaAvg) * 100).toFixed(0) + "%" : "Below average [OK]" }
    ]
  };
};

export const calcCarTco: CalcFunction = (v) => {
  const carPrice = Number(v.carPrice) || 500000;
  const downpay = Number(v.downpay) || 100000;
  const carRate = Number(v.carRate) || 8.5;
  const carTenure = Number(v.carTenure) || 60;
  const kmYear = Number(v.kmYear) || 10000;
  const mileage = Number(v.mileage) || 15;
  const fuelPrice = Number(v.fuelPrice) || 100;
  const insurance = Number(v.insurance) || 15000;
  const maintenance = Number(v.maintenance) || 5000;

  const P = carPrice - downpay;
  const r = carRate / 12 / 100;
  const n = carTenure;
  const emi = r === 0 ? P / n : P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const annEmi = emi * 12;
  const annFuel = (kmYear / mileage) * fuelPrice;
  const depreciation = carPrice * 0.15; // ~15% first year
  const totalAnnual = annEmi + annFuel + insurance + maintenance + depreciation;
  const perKm = totalAnnual / kmYear;
  return {
    main: { label: "Annual Ownership Cost", value: "₹" + Math.round(totalAnnual).toLocaleString() },
    secondary: [
      { label: "Monthly EMI", value: "₹" + Math.round(emi).toLocaleString() },
      { label: "Annual Fuel Cost", value: "₹" + Math.round(annFuel).toLocaleString() },
      { label: "Insurance + Maintenance", value: "₹" + (insurance + maintenance).toLocaleString() },
      { label: "Depreciation (Year 1 ~15%)", value: "₹" + Math.round(depreciation).toLocaleString() },
      { label: "Cost per km", value: "₹" + perKm.toFixed(1) }
    ]
  };
};

export const calcTipSplit: CalcFunction = (v) => {
  const billAmt = Number(v.billAmt) || 0;
  const tipPct = Number(v.tipPct) || 10;
  const extra = Number(v.extra) || 0;
  const people = Number(v.people) || 1;
  const tip = billAmt * tipPct / 100;
  const total = billAmt + tip + extra;
  const perPerson = total / people;
  return {
    main: { label: "Per Person", value: "₹" + perPerson.toFixed(2) },
    secondary: [
      { label: "Bill Amount", value: "₹" + billAmt.toFixed(2) },
      { label: "Tip Amount (" + tipPct + "%)", value: "₹" + tip.toFixed(2) },
      { label: "Extra Charges", value: "₹" + extra.toFixed(2) },
      { label: "Grand Total", value: "₹" + total.toFixed(2) },
      { label: "Tip per Person", value: "₹" + (tip / people).toFixed(2) }
    ]
  };
};

export const calcPetAge: CalcFunction = (v) => {
  const petType = String(v.petType || "Dog (Medium)");
  const petAge = Number(v.petAge) || 1;
  let humanAge = 0;
  if (petType.startsWith("Cat")) {
    if (petAge <= 1) humanAge = 15;
    else if (petAge <= 2) humanAge = 24;
    else humanAge = 24 + (petAge - 2) * 4;
  } else if (petType.includes("Small")) {
    humanAge = petAge * 15 - petAge * (petAge - 1) * 0.5;
  } else if (petType.includes("Large")) {
    humanAge = petAge * 13;
  } else {
    humanAge = petAge * 14;
  }
  humanAge = Math.round(humanAge);
  const lifeExpect = petType.includes("Small") ? 16 : petType.includes("Large") ? 10 : petType.includes("Cat") ? 15 : 13;
  const pctLife = Math.round(petAge / lifeExpect * 100);
  return {
    main: { label: "Human Age Equivalent", value: humanAge + " human years" },
    secondary: [
      { label: "Pet Age", value: petAge + " years" },
      { label: "Life Stage", value: pctLife < 20 ? "Puppy/Kitten" : pctLife < 50 ? "Young Adult" : pctLife < 75 ? "Mature Adult" : "Senior" },
      { label: "% of Life Lived", value: pctLife + "%" },
      { label: "Expected Lifespan", value: "~" + lifeExpect + " years" }
    ]
  };
};

export const calcTravelBudget: CalcFunction = (v) => {
  const dest = String(v.dest || "Mid-Range");
  const people = Number(v.people_t) || 1;
  const days = Number(v.days) || 1;
  const flights = Number(v.flights_t) || 0;
  const ppd = dest.includes("Budget") ? 2000 : dest.includes("Mid") ? 5000 : dest.includes("Luxury") ? 12000 : 15000;
  const dailyCost = ppd * people;
  const stay = dailyCost * days;
  const buffer = stay * 0.15;
  const total = stay + flights + buffer;
  return {
    main: { label: "Estimated Total Budget", value: "₹" + Math.round(total).toLocaleString() },
    secondary: [
      { label: "Daily Cost (" + people + " people)", value: "₹" + dailyCost.toLocaleString() },
      { label: "Accommodation + Food (" + days + "d)", value: "₹" + stay.toLocaleString() },
      { label: "Flights", value: "₹" + flights.toLocaleString() },
      { label: "Buffer (15%)", value: "₹" + Math.round(buffer).toLocaleString() },
      { label: "Per Person Total", value: "₹" + Math.round(total / people).toLocaleString() }
    ]
  };
};

export const calcMileage: CalcFunction = (v) => {
  const distance = Number(v.distance_mi) || 0;
  const fuel = Number(v.fuel_used) || 1;
  const kmpl = distance / fuel;
  const l100km = 100 / kmpl;
  const mpg_uk = kmpl * 2.8248;
  const mpg_us = kmpl * 2.3521;
  return {
    main: { label: "Mileage", value: kmpl.toFixed(2) + " km/L" },
    secondary: [
      { label: "Litres per 100 km", value: l100km.toFixed(2) + " L/100km" },
      { label: "MPG (UK Imperial)", value: mpg_uk.toFixed(2) + " mpg" },
      { label: "MPG (US)", value: mpg_us.toFixed(2) + " mpg" },
      { label: "Cost per km (at ₹103/L)", value: "₹" + (103 / kmpl).toFixed(2) },
      { label: "Rating", value: kmpl > 20 ? "[OK] Excellent" : kmpl > 15 ? "[~] Good" : kmpl > 10 ? "[!] Average" : "[X] Poor" }
    ]
  };
};

export const calcCooking: CalcFunction = (v) => {
  const value = Number(v.cook_val) || 0;
  const fromUnit = String(v.cook_from || "Cup");
  const ingr = String(v.cook_ingr || "Water");
  const toMl: Record<string, number> = { "Cup": 240, "Tablespoon (tbsp)": 14.787, "Teaspoon (tsp)": 4.929, "Milliliter (ml)": 1, "Fluid Ounce (fl oz)": 29.574, "Liter": 1000, "Pint": 473.176 };
  const densities: Record<string, number> = { "Water": 1.0, "All-Purpose Flour": 0.53, "Sugar (white)": 0.845, "Butter": 0.911, "Rice": 0.75, "Salt": 1.217, "Honey": 1.42, "Milk": 1.03 };
  const ml = value * (toMl[fromUnit] || 1);
  const grams = ml * (densities[ingr] || 1);
  return {
    main: { label: "Milliliters", value: ml.toFixed(1) + " ml" },
    secondary: [
      { label: "Grams (" + ingr + ")", value: grams.toFixed(1) + " g" },
      { label: "Cups", value: (ml / 240).toFixed(3) + " cups" },
      { label: "Tablespoons", value: (ml / 14.787).toFixed(2) + " tbsp" },
      { label: "Teaspoons", value: (ml / 4.929).toFixed(1) + " tsp" },
      { label: "Fluid Ounces", value: (ml / 29.574).toFixed(2) + " fl oz" }
    ]
  };
};

export const calcShoeSize: CalcFunction = (v) => {
  const value = Number(v.shoe_val) || 9;
  const fromUnit = String(v.shoe_from || "US Men");
  let usMen = value;
  if (fromUnit === "US Women") usMen = value - 1.5;
  else if (fromUnit === "UK") usMen = value + 0.5;
  else if (fromUnit === "EU") usMen = (value - 33) / 1.5;
  else if (fromUnit === "India (IN)") usMen = value - 0.5;
  else if (fromUnit === "CM (foot length)") usMen = (value - 22.5) / 0.838;
  return {
    main: { label: "US Men's", value: usMen.toFixed(1) },
    secondary: [
      { label: "US Women's", value: (usMen + 1.5).toFixed(1) },
      { label: "UK", value: (usMen - 0.5).toFixed(1) },
      { label: "EU", value: (usMen * 1.5 + 33).toFixed(0) },
      { label: "India (IN)", value: (usMen + 0.5).toFixed(1) },
      { label: "Foot Length (cm)", value: (usMen * 0.838 + 22.5).toFixed(1) + " cm" },
      { label: "Foot Length (inches)", value: ((usMen * 0.838 + 22.5) / 2.54).toFixed(1) + '"' }
    ]
  };
};

export const calcStopwatch: CalcFunction = (v) => {
  const countdownMin = Number(v.countdown_min) || 0;
  const lapInterval = Number(v.lap_interval) || 0;
  const totalSecs = countdownMin * 60;
  const hrs = Math.floor(totalSecs / 3600), mins = Math.floor((totalSecs % 3600) / 60), secs = totalSecs % 60;
  return {
    main: { label: countdownMin > 0 ? "Countdown Duration" : "Stopwatch Mode", value: countdownMin > 0 ? (hrs ? "" + hrs + "h " + mins + "m " + secs + "s" : mins + "m " + secs + "s") : "Use the live stopwatch widget" },
    secondary: [
      { label: "Total seconds", value: totalSecs + " s" },
      { label: "Tip", value: "Open AI chat and type 'start stopwatch' for a live timer" },
      { label: "Lap interval", value: lapInterval > 0 ? lapInterval + "s intervals" : "Manual laps" }
    ]
  };
};

export const calcRandomNum: CalcFunction = (v) => {
  const count = Math.min(20, Math.max(1, Math.floor(Number(v.rng_count) || 1)));
  const rngMin = Number(v.rng_min) || 1;
  const rngMax = Number(v.rng_max) || 100;
  const rngType = String(v.rng_type || "Integers");
  const results: (number | string)[] = [];
  if (rngType === "Coin Flip") {
    for (let i = 0; i < count; i++) results.push(Math.random() < 0.5 ? "Heads" : "Tails");
  } else if (rngType === "Dice (d6)") {
    for (let i = 0; i < count; i++) results.push(Math.floor(Math.random() * 6) + 1);
  } else if (rngType === "Shuffle 1–N") {
    const arr: number[] = [];
    for (let i = 1; i <= Math.min(count, 20); i++) arr.push(i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    for (let i = 0; i < arr.length; i++) results.push(arr[i]);
  } else if (rngType === "Decimals (2dp)") {
    for (let i = 0; i < count; i++) results.push((rngMin + Math.random() * (rngMax - rngMin)).toFixed(2));
  } else {
    for (let i = 0; i < count; i++) results.push(Math.floor(rngMin + Math.random() * (rngMax - rngMin + 1)));
  }
  const numericResults = results.map(Number).filter(n => !isNaN(n));
  const minVal = numericResults.length > 0 ? Math.min(...numericResults) : rngMin;
  const maxVal = numericResults.length > 0 ? Math.max(...numericResults) : rngMax;
  return {
    main: { label: "Random Numbers", value: results.join(", ") },
    secondary: [
      { label: "Count", value: String(count) },
      { label: "Range", value: rngMin + " – " + rngMax },
      { label: "Type", value: rngType },
      { label: "Min result", value: String(minVal) },
      { label: "Max result", value: String(maxVal) }
    ]
  };
};

export const calcEvPetrolSavings: CalcFunction = (v) => {
  const dailyKm = Number(v.daily_km) || 40;
  const mileage = Number(v.mileage) || 15;
  const petrolPrice = Number(v.petrol_price) || 800000;
  const petrolRate = Number(v.petrol_rate) || 100;
  const elecRate = Number(v.elec_rate) || 7;
  const evPrice = Number(v.ev_price) || 1200000;
  const evEfficiency = Number(v.ev_efficiency) || 7;
  const years = Number(v.years) || 8;

  const totalKm = dailyKm * 365 * years;
  const petrolCost = totalKm / mileage * petrolRate;
  const evEnergyCost = totalKm / evEfficiency * elecRate;
  const fuelSaving = petrolCost - evEnergyCost;
  const petrolMaintenance = 8000 * years;
  const evMaintenance = 3000 * years;
  const maintSaving = petrolMaintenance - evMaintenance;
  const totalPetrolCost = petrolPrice + petrolCost + petrolMaintenance;
  const totalEVCost = evPrice + evEnergyCost + evMaintenance;
  const netSaving = totalPetrolCost - totalEVCost;
  const breakEvenKm = (evPrice - petrolPrice) / ((petrolRate / mileage) - (elecRate / evEfficiency));
  const breakEvenYears = breakEvenKm / (dailyKm * 365);
  return {
    main: { label: `8-Year Net Savings (EV)`, value: "₹" + Math.round(netSaving).toLocaleString() + (netSaving > 0 ? " ✓" : " [X]") },
    secondary: [
      { label: "Total Petrol/Diesel Cost", value: "₹" + Math.round(petrolCost).toLocaleString() },
      { label: "Total EV Charging Cost", value: "₹" + Math.round(evEnergyCost).toLocaleString() },
      { label: "Fuel Savings", value: "₹" + Math.round(fuelSaving).toLocaleString(), pos: true },
      { label: "Maintenance Savings", value: "₹" + Math.round(maintSaving).toLocaleString(), pos: true },
      { label: "Total Petrol Ownership", value: "₹" + Math.round(totalPetrolCost).toLocaleString() },
      { label: "Total EV Ownership", value: "₹" + Math.round(totalEVCost).toLocaleString() },
      { label: "Break-Even Distance", value: Math.round(breakEvenKm).toLocaleString() + " km" },
      { label: "Break-Even Time", value: breakEvenYears.toFixed(1) + " years" }
    ],
    chart: {
      labels: ["EV Purchase", "EV Running", "EV Maint", "Petrol Purchase", "Petrol Fuel", "Petrol Maint"],
      data: [evPrice, Math.round(evEnergyCost), evMaintenance, petrolPrice, Math.round(petrolCost), petrolMaintenance],
      timeline: (() => {
        const labels: string[] = [], evArr: number[] = [], petrolArr: number[] = [];
        for (let yr = 1; yr <= years; yr++) {
          const km = dailyKm * 365 * yr;
          labels.push('Yr ' + yr);
          evArr.push(Math.round(evPrice + km / evEfficiency * elecRate + 3000 * yr));
          petrolArr.push(Math.round(petrolPrice + km / mileage * petrolRate + 8000 * yr));
        }
        return {
          labels, datasets: [
            { label: 'EV Total Cost', data: evArr, fill: false },
            { label: 'Petrol Total Cost', data: petrolArr, fill: false }
          ]
        };
      })()
    }
  };
};

export const calcEcomProfit: CalcFunction = (v) => {
  const sellingPrice = Number(v.sellingPrice_ec) || 0;
  const gstRate = Number(v.gstRate_ec) || 18;
  const platformFee = Number(v.platformFee) || 0;
  const productCost = Number(v.productCost_ec) || 0;
  const shippingCost = Number(v.shippingCost) || 0;
  const adSpend = Number(v.adSpend) || 0;
  const packagingCost = Number(v.packagingCost) || 0;
  const returnRate = Number(v.returnRate_ec) || 0;

  const gstAmt = sellingPrice * gstRate / (100 + gstRate);
  const platformFeeAmt = sellingPrice * platformFee / 100;
  const totalCost = productCost + shippingCost + platformFeeAmt + adSpend + packagingCost;
  const grossProfit = sellingPrice - gstAmt - totalCost;
  const returnCost = (productCost + shippingCost * 2) * returnRate / 100;
  const netProfit = grossProfit - returnCost;
  const margin = sellingPrice > 0 ? (netProfit / sellingPrice * 100) : 0;
  return {
    main: { label: "Net Profit per Order", value: "₹" + netProfit.toFixed(2), pos: netProfit > 0 },
    secondary: [
      { label: "Selling Price", value: "₹" + sellingPrice },
      { label: "GST (" + gstRate + "%)", value: "₹" + gstAmt.toFixed(2) },
      { label: "Platform Fee (" + platformFee + "%)", value: "₹" + platformFeeAmt.toFixed(2) },
      { label: "Product + Packaging + Shipping", value: "₹" + (productCost + packagingCost + shippingCost) },
      { label: "Ad Spend per Order", value: "₹" + adSpend },
      { label: "Return/RTO Cost (" + returnRate + "%)", value: "₹" + returnCost.toFixed(2) },
      { label: "Net Margin", value: margin.toFixed(1) + "%", pos: margin > 10 },
      { label: "Monthly Profit (100 orders)", value: "₹" + Math.round(netProfit * 100).toLocaleString('en-IN') }
    ],
    chart: {
      a: Math.round(totalCost + gstAmt + returnCost),
      b: Math.round(Math.max(0, netProfit)),
      lA: "Total Costs",
      lB: "Net Profit"
    }
  };
};

export const calcRestaurantCost: CalcFunction = (v) => {
  const ingredientCost = Number(v.ingredientCost) || 0;
  const wastageFood = Number(v.wastageFood) || 0;
  const portionSize = Number(v.portionSize) || 1;
  const targetFoodCost = Number(v.targetFoodCost) || 30;
  const gstFood = String(v.gstFood || "5% (non-AC restaurant)");

  const rawCost = ingredientCost * (1 + wastageFood / 100) * portionSize;
  const menuPrice = rawCost / (targetFoodCost / 100);
  const gstRateMap: Record<string, number> = { "5% (non-AC restaurant)": 5, "18% (AC / fine dining)": 18, "0% (cloud kitchen < ₹7.5L)": 0 };
  const gst = gstRateMap[gstFood] || 5;
  const priceWithGST = menuPrice * (1 + gst / 100);
  const grossProfit = menuPrice - rawCost;
  const margin = menuPrice > 0 ? ((grossProfit / menuPrice) * 100) : 0;
  const rounded = Math.ceil(priceWithGST / 10) * 10 - 1;
  return {
    main: { label: "Recommended Menu Price", value: "₹" + Math.round(menuPrice) + " (₹" + rounded + " with GST)" },
    secondary: [
      { label: "Raw Ingredient Cost", value: "₹" + rawCost.toFixed(2) },
      { label: "Food Cost %", value: targetFoodCost + "%" },
      { label: "Gross Profit per Plate", value: "₹" + grossProfit.toFixed(2) },
      { label: "Gross Margin", value: margin.toFixed(1) + "%" },
      { label: "Price incl. GST (" + gst + "%)", value: "₹" + priceWithGST.toFixed(2) },
      { label: "Psycho-Pricing", value: "₹" + rounded },
      { label: "For 50 plates/day", value: "₹" + Math.round(grossProfit * 50).toLocaleString('en-IN') + " gross profit" }
    ]
  };
};

export const calcSubscriptionPricing: CalcFunction = (v) => {
  const monthlyPrice = Number(v.monthlyPrice) || 0;
  const subscribers = Number(v.subscribers) || 0;
  const monthlyChurn = Number(v.monthlyChurn) || 0;
  const monthlyNewSub = Number(v.monthlyNewSub) || 0;
  const acquisitionCost = Number(v.acquisitionCost) || 0;
  const annualDiscountPct = Number(v.annualDiscountPct) || 0;

  const mrr = monthlyPrice * subscribers;
  const arr = mrr * 12;
  const churnedSubs = Math.round(subscribers * monthlyChurn / 100);
  const netNewSubs = monthlyNewSub - churnedSubs;
  const avgLifetime = monthlyChurn > 0 ? (1 / (monthlyChurn / 100)) : 0;
  const ltv = monthlyPrice * avgLifetime;
  const ltvCacRatio = acquisitionCost > 0 ? (ltv / acquisitionCost) : 0;
  const paybackMonths = monthlyPrice > 0 ? (acquisitionCost / monthlyPrice) : 0;
  const annualPrice = monthlyPrice * 12 * (1 - annualDiscountPct / 100);
  const annualSaving = monthlyPrice * 12 - annualPrice;
  let subs6mo = subscribers;
  for (let m = 0; m < 6; m++) {
    subs6mo = Math.round(subs6mo * (1 - monthlyChurn / 100) + monthlyNewSub);
  }
  return {
    main: { label: "MRR", value: "₹" + mrr.toLocaleString('en-IN') },
    secondary: [
      { label: "ARR", value: "₹" + arr.toLocaleString('en-IN') },
      { label: "Monthly Churn", value: churnedSubs + " subscribers (" + monthlyChurn + "%)" },
      { label: "Net Growth/Month", value: (netNewSubs > 0 ? "+" : "") + netNewSubs + " subscribers" },
      { label: "Avg Customer Lifetime", value: avgLifetime.toFixed(1) + " months" },
      { label: "LTV", value: "₹" + Math.round(ltv).toLocaleString('en-IN') },
      { label: "LTV:CAC Ratio", value: ltvCacRatio.toFixed(1) + "× " + (ltvCacRatio >= 3 ? "[OK]" : "[!] aim for 3×+") },
      { label: "CAC Payback", value: paybackMonths.toFixed(1) + " months" },
      { label: "Annual Plan Price", value: "₹" + Math.round(annualPrice) + " (save ₹" + Math.round(annualSaving) + ")" },
      { label: "Subscribers in 6 months", value: subs6mo.toLocaleString() }
    ]
  };
};

export const calcUnitEconomics: CalcFunction = (v) => {
  const revenuePerUnit = Number(v.revenuePerUnit) || 0;
  const cogsPerUnit = Number(v.cogsPerUnit) || 0;
  const opexPerUnit = Number(v.opexPerUnit) || 0;
  const avgOrders = Number(v.avgOrders) || 0;
  const cac = Number(v.cac_ue) || 0;
  const avgLifetimeMonths = Number(v.avgLifetimeMonths) || 0;

  const contribution = revenuePerUnit - cogsPerUnit - opexPerUnit;
  const contributionMargin = revenuePerUnit > 0 ? (contribution / revenuePerUnit) * 100 : 0;
  const ltv = revenuePerUnit * avgOrders;
  const ltvNet = contribution * avgOrders;
  const ltvCac = cac > 0 ? (ltvNet / cac) : 0;
  const paybackOrders = contribution > 0 ? Math.ceil(cac / contribution) : 0;
  const paybackMonths = avgOrders > 0 ? paybackOrders * (avgLifetimeMonths / avgOrders) : 0;
  const totalCostPerCustomer = cac + (cogsPerUnit + opexPerUnit) * avgOrders;
  const netProfitPerCustomer = ltv - totalCostPerCustomer;
  return {
    main: { label: "Contribution per Unit", value: "₹" + contribution.toFixed(2), pos: contribution > 0 },
    secondary: [
      { label: "Contribution Margin", value: contributionMargin.toFixed(1) + "%" },
      { label: "LTV (Revenue)", value: "₹" + ltv.toLocaleString('en-IN') },
      { label: "LTV (Net of costs)", value: "₹" + Math.round(ltvNet).toLocaleString('en-IN') },
      { label: "LTV:CAC Ratio", value: ltvCac.toFixed(1) + "× " + (ltvCac >= 3 ? "[OK]" : "[!]") },
      { label: "CAC Payback", value: paybackOrders + " orders (" + paybackMonths.toFixed(1) + " months)" },
      { label: "Net Profit per Customer", value: "₹" + Math.round(netProfitPerCustomer).toLocaleString('en-IN'), pos: netProfitPerCustomer > 0 },
      { label: "Verdict", value: ltvCac >= 3 ? "[OK] Healthy unit economics" : ltvCac >= 1 ? "[!] Marginal — reduce CAC or increase LTV" : "[X] Unprofitable — rethink pricing" }
    ]
  };
};

export const calcEventBudget: CalcFunction = (v) => {
  const guests = Number(v.guests) || 100;
  const cateringPerHead = Number(v.cateringPerHead) || 0;
  const venueCost = Number(v.venueCost) || 0;
  const decorCost = Number(v.decorCost) || 0;
  const entertainment = Number(v.entertainment) || 0;
  const photography = Number(v.photography_ev) || 0;
  const miscPct = Number(v.miscPct_ev) || 10;

  const catering = cateringPerHead * guests;
  const subtotal = venueCost + catering + decorCost + entertainment + photography;
  const misc = subtotal * miscPct / 100;
  const total = subtotal + misc;
  const perHead = total / (guests || 1);
  return {
    main: { label: "Total Event Budget", value: "₹" + Math.round(total).toLocaleString('en-IN') },
    secondary: [
      { label: "Venue", value: "₹" + venueCost.toLocaleString('en-IN') + " (" + (venueCost / (total || 1) * 100).toFixed(0) + "%)" },
      { label: "Catering (" + guests + " guests)", value: "₹" + catering.toLocaleString('en-IN') + " (" + (catering / (total || 1) * 100).toFixed(0) + "%)" },
      { label: "Decoration", value: "₹" + decorCost.toLocaleString('en-IN') },
      { label: "Entertainment / DJ", value: "₹" + entertainment.toLocaleString('en-IN') },
      { label: "Photography / Video", value: "₹" + photography.toLocaleString('en-IN') },
      { label: "Buffer (" + miscPct + "%)", value: "₹" + Math.round(misc).toLocaleString('en-IN') },
      { label: "Cost per Guest", value: "₹" + Math.round(perHead).toLocaleString('en-IN') }
    ],
    chart: {
      labels: ["Venue", "Catering", "Decor", "Entertainment", "Photo/Video", "Buffer"],
      data: [venueCost, catering, decorCost, entertainment, photography, Math.round(misc)]
    }
  };
};

export const calcHouseholdBudget: CalcFunction = (v) => {
  const rentEmi = Number(v.rentEmi) || 0;
  const groceries = Number(v.groceries) || 0;
  const utilities = Number(v.utilities_hb) || 0;
  const transport = Number(v.transport_hb) || 0;
  const insurance = Number(v.insurance_hb) || 0;
  const lifestyle = Number(v.lifestyle_hb) || 0;
  const monthlyIncome = Number(v.monthlyIncome_hb) || 0;
  const savingsTarget = Number(v.savingsTarget_hb) || 20;

  const needs = rentEmi + groceries + utilities + transport + insurance;
  const wants = lifestyle;
  const targetSavings = monthlyIncome * savingsTarget / 100;
  const actualSavings = monthlyIncome - needs - wants;
  const needsPct = monthlyIncome > 0 ? (needs / monthlyIncome * 100) : 0;
  const wantsPct = monthlyIncome > 0 ? (wants / monthlyIncome * 100) : 0;
  const savingsPct = monthlyIncome > 0 ? (actualSavings / monthlyIncome * 100) : 0;
  const idealNeeds = monthlyIncome * 0.5;
  const idealWants = monthlyIncome * 0.3;
  const idealSavings = monthlyIncome * 0.2;
  return {
    main: { label: "Monthly Savings", value: "₹" + Math.round(actualSavings).toLocaleString('en-IN'), pos: actualSavings >= targetSavings },
    secondary: [
      { label: "Needs (rent+grocery+utilities)", value: "₹" + needs.toLocaleString('en-IN') + " (" + needsPct.toFixed(0) + "%) " + (needsPct <= 50 ? "[OK]" : "[!] over 50%") },
      { label: "Wants (lifestyle)", value: "₹" + wants.toLocaleString('en-IN') + " (" + wantsPct.toFixed(0) + "%) " + (wantsPct <= 30 ? "[OK]" : "[!] over 30%") },
      { label: "Savings", value: savingsPct.toFixed(0) + "% " + (savingsPct >= 20 ? "[OK]" : "[!] below 20%") },
      { label: "50/30/20 Target — Needs", value: "₹" + Math.round(idealNeeds).toLocaleString('en-IN') },
      { label: "50/30/20 Target — Wants", value: "₹" + Math.round(idealWants).toLocaleString('en-IN') },
      { label: "50/30/20 Target — Savings", value: "₹" + Math.round(idealSavings).toLocaleString('en-IN') },
      { label: "Annual Savings (projected)", value: "₹" + Math.round(actualSavings * 12).toLocaleString('en-IN') },
      { label: "Verdict", value: savingsPct >= 20 ? "[OK] Healthy budget" : savingsPct >= 10 ? "[!] Reduce wants" : "[X] Cut non-essentials" }
    ],
    chart: {
      labels: ["Needs", "Wants", "Savings"],
      data: [Math.round(needs), Math.round(wants), Math.round(Math.max(0, actualSavings))]
    }
  };
};

export const calcDataUsage: CalcFunction = (v) => {
  const youtube = Number(v.du_youtube) || 0;
  const instagram = Number(v.du_instagram) || 0;
  const videoCalls = Number(v.du_videoCalls) || 0;
  const music = Number(v.du_music) || 0;
  const browsing = Number(v.du_browsing) || 0;
  const ytQuality = String(v.du_ytQuality || "HD (720p)");

  const ytRates: Record<string, number> = { "SD (360p)": 300, "HD (720p)": 900, "HD (1080p)": 1800, "4K": 7000 };
  const ytRate = ytRates[ytQuality] || 900;
  const ytDaily = youtube * ytRate;
  const instaDaily = instagram * 2.5;
  const videoCallDaily = videoCalls * 5;
  const musicDaily = music * 72;
  const browsingDaily = browsing * 60;
  const totalDailyMB = ytDaily + instaDaily + videoCallDaily + musicDaily + browsingDaily;
  const totalDailyGB = totalDailyMB / 1024;
  const totalMonthlyGB = totalDailyGB * 30;

  let recommendedPlan = "";
  if (totalDailyGB <= 1.5) recommendedPlan = "Jio ₹209 (1.5 GB/day, 28 days)";
  else if (totalDailyGB <= 2) recommendedPlan = "Jio ₹249 (2 GB/day, 28 days)";
  else if (totalDailyGB <= 2.5) recommendedPlan = "Airtel ₹299 (2.5 GB/day, 28 days)";
  else if (totalDailyGB <= 3) recommendedPlan = "Jio ₹349 (3 GB/day, 28 days)";
  else recommendedPlan = "Airtel ₹449 unlimited or WiFi recommended";

  return {
    main: { label: "Daily Data Usage", value: totalDailyGB.toFixed(2) + " GB" },
    secondary: [
      { label: "Monthly Usage (30 days)", value: totalMonthlyGB.toFixed(1) + " GB" },
      { label: "YouTube (" + ytQuality + ")", value: (ytDaily / 1024).toFixed(2) + " GB/day" },
      { label: "Instagram/Reels", value: (instaDaily / 1024).toFixed(2) + " GB/day" },
      { label: "Video Calls", value: (videoCallDaily / 1024).toFixed(2) + " GB/day" },
      { label: "Music Streaming", value: (musicDaily / 1024).toFixed(2) + " GB/day" },
      { label: "Web Browsing", value: (browsingDaily / 1024).toFixed(2) + " GB/day" },
      { label: "Recommended Plan", value: recommendedPlan },
      { label: "Tip", value: totalDailyGB > 3 ? "Switch to WiFi for YouTube & downloads" : "Your usage is manageable on a standard plan" }
    ],
    chart: {
      labels: ["YouTube", "Instagram", "Video Calls", "Music", "Browsing"],
      data: [Math.round(ytDaily), Math.round(instaDaily), Math.round(videoCallDaily), Math.round(musicDaily), Math.round(browsingDaily)]
    }
  };
};
