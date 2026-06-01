/* ═══════════════════════════════════════════════════
   Calc Labz — SEO Content Generator
   Auto-generates unique, keyword-rich content for
   every calculator page so Google sees substantial,
   unique text instead of thin boilerplate.
   ═══════════════════════════════════════════════════ */

import { CalculatorCategory } from '@/types/calculator';

// ── Schema applicationCategory mapping ──────────────
const SCHEMA_APP_CATEGORY: Record<CalculatorCategory, string> = {
  finance: 'FinanceApplication',
  health: 'HealthApplication',
  math: 'EducationalApplication',
  education: 'EducationalApplication',
  everyday: 'LifestyleApplication',
  engineering: 'DesignApplication',
  construction: 'DesignApplication',
  datetime: 'UtilitiesApplication',
  science: 'EducationalApplication',
  unit: 'UtilitiesApplication',
  tech: 'DeveloperApplication',
};

export function getSchemaCategory(cat: CalculatorCategory): string {
  return SCHEMA_APP_CATEGORY[cat] || 'UtilitiesApplication';
}

// ── Category-specific SEO intro paragraphs ──────────
const CATEGORY_SEO_INTROS: Record<CalculatorCategory, string> = {
  finance: 'Make smarter financial decisions with free, accurate calculators trusted by thousands of Indians. Whether you are planning a home loan, comparing SIP returns, or filing income tax — get instant results backed by verified formulas and current rates.',
  health: 'Track your health metrics with medically-informed calculators. From BMI and body fat to calorie targets and sleep cycles — all calculations use peer-reviewed formulas and run 100% in your browser for complete privacy.',
  math: 'Solve mathematical problems instantly with step-by-step breakdowns. From basic percentages and square roots to quadratic equations, statistics, and matrix calculations — accuracy verified against standard mathematical references.',
  everyday: 'Simplify daily decisions with practical calculators for tips, fuel costs, electricity bills, discounts, and more. Each tool provides instant results to help you make informed choices in everyday life.',
  education: 'Plan your academic journey with GPA converters, exam score planners, study hour optimizers, and more. Designed for Indian students across CBSE, ICSE, and university grading systems.',
  engineering: 'Professional-grade engineering calculators for electrical, mechanical, and physics computations. Ohm\'s law, power calculations, beam loads, torque, and more — used by engineers and students across India.',
  construction: 'Estimate material quantities and costs for your construction project. Calculate concrete, bricks, steel, paint, and flooring requirements with formulas aligned to Indian Standard specifications.',
  datetime: 'Calculate date differences, working days, countdown timers, and timezone conversions. Essential tools for project planning, age verification, and scheduling.',
  science: 'Physics, chemistry, and scientific calculators with step-by-step solutions. Speed-distance-time, Newton\'s laws, pH, half-life, kinematic equations, and more.',
  unit: 'Convert between units instantly — length, weight, temperature, area, speed, volume, data, pressure, energy, and angles. Supports metric, imperial, and Indian units.',
  tech: 'Developer and IT tools for web professionals, programmers, and network admins. Password strength checking, subnet calculations, color code conversion, bandwidth estimation, and more — all running locally in your browser.',
};

export function getCategorySEOIntro(cat: CalculatorCategory): string {
  return CATEGORY_SEO_INTROS[cat] || '';
}

// ── Per-calculator SEO content generator ─────────────
export interface SEOContent {
  whatIs: string;
  howToUse: string;
  whyUse: string;
  keyFeatures: string[];
}

export function generateSEOContent(
  calcId: string,
  name: string,
  desc: string,
  category: CalculatorCategory,
  inputLabels: string[]
): SEOContent {
  const catName = getCategoryName(category);

  return {
    whatIs: getWhatIsContent(calcId, name, desc, catName),
    howToUse: getHowToUseContent(name, inputLabels),
    whyUse: getWhyUseContent(name, catName),
    keyFeatures: [
      `Instant ${name.replace(' Calculator', '')} calculations with real-time updates`,
      'No signup, no registration — 100% free forever',
      'All calculations happen in your browser — zero data sent to servers',
      'Works offline as a Progressive Web App (PWA)',
      'Mobile-friendly responsive design',
      `Verified ${catName.toLowerCase()} formulas updated for 2026`,
    ],
  };
}

function getCategoryName(cat: CalculatorCategory): string {
  const names: Record<CalculatorCategory, string> = {
    finance: 'Financial', health: 'Health & Fitness', math: 'Mathematical',
    everyday: 'Everyday', education: 'Educational', engineering: 'Engineering',
    construction: 'Construction', datetime: 'Date & Time', science: 'Scientific',
    unit: 'Unit Conversion', tech: 'Tech & Developer',
  };
  return names[cat] || 'Online';
}

function getWhatIsContent(calcId: string, name: string, desc: string, catName: string): string {
  // Check for custom content first
  const custom = CUSTOM_WHAT_IS[calcId];
  if (custom) return custom;

  // Auto-generate from metadata
  return `The ${name} is a free online ${catName.toLowerCase()} tool that helps you ${desc.toLowerCase()}. ` +
    `Built for accuracy and speed, this calculator uses verified formulas and provides instant results without requiring any signup or registration. ` +
    `All calculations run entirely in your browser, ensuring complete privacy — no personal data is ever sent to our servers.`;
}

function getHowToUseContent(name: string, inputLabels: string[]): string {
  const steps = inputLabels.map((label, i) => `${i + 1}. Enter your **${label}** in the input field.`);
  return `Using the ${name} is simple and takes just seconds:\n\n` +
    steps.join('\n') +
    `\n${inputLabels.length + 1}. Results appear **instantly** — no need to click a button.\n` +
    `${inputLabels.length + 2}. Scroll down for a detailed breakdown with secondary outputs and visual charts.`;
}

function getWhyUseContent(name: string, catName: string): string {
  return `The Calc Labz ${name} stands out because it combines accuracy with simplicity. ` +
    `Unlike other online calculators, we provide detailed breakdowns, step-by-step formulas, and actionable advice alongside your results. ` +
    `Our ${catName.toLowerCase()} calculators are regularly updated to reflect current rates, rules, and standards for India (2026). ` +
    `Whether you are a student, professional, or just need a quick calculation — Calc Labz delivers reliable results instantly.`;
}

// ── Custom "What Is" content for high-priority calculators ──
const CUSTOM_WHAT_IS: Record<string, string> = {
  emi: 'The EMI Calculator helps you find your Equated Monthly Installment (EMI) for home loans, car loans, personal loans, and education loans. EMI is the fixed amount you pay every month to repay your loan — it includes both principal and interest components. Our calculator uses the standard reducing balance formula used by all Indian banks and NBFCs, giving you accurate results instantly.',

  sip: 'The SIP Calculator shows you the future value of your Systematic Investment Plan (SIP) in mutual funds. SIP is a disciplined investment method where you invest a fixed amount every month, benefiting from rupee cost averaging and the power of compounding. Our calculator projects your wealth growth over time, helping you plan for retirement, education, or any financial goal.',

  gst: 'The GST Calculator helps you add or remove Goods and Services Tax (GST) from any amount. It automatically splits the tax into CGST and SGST (for intra-state transactions) or shows IGST (for inter-state). Whether you are a business owner creating invoices or a consumer verifying prices, this tool covers all GST slabs — 5%, 12%, 18%, and 28%.',

  bmi: 'The BMI Calculator determines your Body Mass Index — a widely used screening tool to categorize weight status. Our calculator uses both WHO and Asian-specific BMI categories, which is important because Asians have higher health risks at lower BMI values. Simply enter your weight and height to get your BMI with a detailed interpretation of what it means for your health.',

  incometax: 'The Income Tax Calculator computes your tax liability under the New Tax Regime for FY 2025-26 (AY 2026-27) as per the latest Union Budget. It factors in the standard deduction, rebate under Section 87A, surcharge, and health & education cess. Get an instant breakdown of your tax slab-wise computation.',

  percentage: 'The Percentage Calculator handles all percentage operations — find X% of a number, calculate percentage change between two values, find what percentage one number is of another, and more. Used by students, shoppers calculating discounts, and professionals computing margins.',

  taxregime: 'The Old vs New Tax Regime Comparator helps Indian taxpayers choose the most beneficial tax regime for FY 2025-26. Enter your income and all deductions (80C, 80D, HRA, NPS, home loan interest) to see which regime saves you more tax. The new regime offers lower rates but fewer deductions, while the old regime rewards tax planning.',

  compoundinterest: 'The Compound Interest Calculator shows how your money grows with the power of compounding — earning interest on interest. Unlike simple interest, compound interest accelerates wealth creation exponentially over time. Our calculator supports multiple compounding frequencies: monthly, quarterly, half-yearly, and annually.',

  fd: 'The Fixed Deposit (FD) Calculator estimates your maturity amount and interest earned for bank FDs. It supports quarterly, monthly, half-yearly, and annual compounding, matching how different banks calculate FD returns. Compare FD returns across different tenures and rates to find the best option.',

  ppf: 'The PPF Calculator projects the maturity value of your Public Provident Fund account over its 15-year lock-in period. PPF enjoys EEE (Exempt-Exempt-Exempt) tax status — your investment, interest, and maturity are all tax-free. Current PPF rate is 7.1% p.a. (as of 2026), and max annual investment is ₹1.5 lakh.',

  mortgage: 'The Mortgage Calculator estimates your monthly home loan payment and total interest over the loan tenure. It provides a complete amortization schedule showing how each EMI is split between principal and interest. Essential for home buyers planning their budget and comparing loan offers from different banks.',

  cagr: 'The CAGR Calculator computes the Compound Annual Growth Rate of your investments, revenue, or any value that grows over time. CAGR gives you the smoothed annual rate of return, making it easy to compare different investments. It is the most accurate way to evaluate long-term investment performance.',

  tdee: 'The TDEE Calculator estimates your Total Daily Energy Expenditure — the total number of calories you burn per day including basal metabolism, physical activity, and the thermic effect of food. Knowing your TDEE is the foundation of any weight management plan, whether you want to lose fat, gain muscle, or maintain your current weight.',

  bodyfat: 'The Body Fat Percentage Calculator estimates your body composition using the U.S. Navy method, which uses body measurements to predict fat mass. Body fat percentage is a better indicator of fitness than BMI alone, as it distinguishes between fat and muscle. Our calculator provides gender-specific interpretations and fitness category ratings.',

  inhandsalary: 'The In-Hand Salary Calculator shows your actual take-home pay after all deductions — PF, professional tax, income tax, and other deductions. Enter your CTC or gross salary to see exactly how much lands in your bank account each month. Essential for salary negotiations, job offer comparisons, and monthly budget planning.',

  retirementcorpus: 'The Retirement Corpus Calculator tells you exactly how much money you need to retire comfortably in India. It factors in inflation, pre and post-retirement returns, life expectancy, and your current savings to calculate the gap. Start planning early — even a 5-year head start can reduce your required monthly savings by 40%.',
};

// ── HowTo schema step generator ──────────────────────
export interface HowToStep {
  name: string;
  text: string;
}

export function generateHowToSteps(
  name: string,
  inputs: { label: string; suffix?: string; prefix?: string }[]
): HowToStep[] {
  const steps: HowToStep[] = inputs.map((input) => {
    const unit = input.suffix ? ` (in ${input.suffix})` : '';
    const currency = input.prefix === '₹' ? ' in Indian Rupees (₹)' : '';
    return {
      name: `Enter ${input.label}`,
      text: `Enter your ${input.label.toLowerCase()}${unit}${currency} in the input field. The calculator will validate your input automatically.`,
    };
  });

  steps.push({
    name: 'View Your Results',
    text: `The ${name} displays your results instantly in the output panel. You will see the primary result along with a detailed breakdown of secondary outputs. Scroll down for charts, interpretations, and expert advice.`,
  });

  return steps;
}

// ── Category FAQ generator ───────────────────────────
export interface CategoryFAQ {
  q: string;
  a: string;
}

export function generateCategoryFAQs(
  catName: string,
  catKey: CalculatorCategory,
  calcCount: number
): CategoryFAQ[] {
  return [
    {
      q: `How many ${catName} calculators are available on Calc Labz?`,
      a: `Calc Labz offers ${calcCount} free ${catName.toLowerCase()} calculators, covering everything from basic calculations to advanced analysis tools. All are free, require no signup, and work offline.`,
    },
    {
      q: `Are the ${catName} calculators on Calc Labz accurate?`,
      a: `Yes. All calculators use verified, standard formulas that are regularly reviewed and updated. For ${catKey === 'finance' ? 'financial calculators, we use formulas matching those used by Indian banks and SEBI-registered entities' : catKey === 'health' ? 'health calculators, we use peer-reviewed medical formulas and WHO guidelines' : 'these calculators, we use industry-standard formulas and reference implementations'}. However, results are for informational purposes — consult a professional for critical decisions.`,
    },
    {
      q: `Is my data safe when using these calculators?`,
      a: `Absolutely. All Calc Labz calculators run entirely in your browser using JavaScript. No data is ever sent to our servers. We do not require signups, accounts, or personal information. Your inputs stay on your device.`,
    },
    {
      q: `Can I use these calculators on my phone?`,
      a: `Yes. Calc Labz is fully responsive and works on all devices — desktop, tablet, and mobile. You can also install it as a Progressive Web App (PWA) for instant access and offline use.`,
    },
  ];
}

// ── QUICK ANSWER GENERATOR (Phase 6 — AI Search) ─────
// Returns a concise 2-3 sentence answer targeting featured snippets
// and AI Overviews. Falls back to auto-generated content.

const CUSTOM_QUICK_ANSWERS: Record<string, { question: string; answer: string }> = {
  emi: {
    question: 'Quick Answer — What is EMI?',
    answer: 'The EMI for a <strong>₹10 Lakh home loan at 8.5% for 10 years is approximately ₹12,399/month</strong>. Total interest paid: ₹4,87,880. EMI (Equated Monthly Installment) is the fixed monthly payment that includes both principal and interest. Use the calculator below for your exact scenario.',
  },
  sip: {
    question: 'Quick Answer — SIP Returns',
    answer: 'A monthly SIP of <strong>₹5,000 for 15 years at 12% expected returns grows to approximately ₹25.2 Lakh</strong> — with only ₹9 Lakh invested. SIP leverages rupee cost averaging and compound interest for disciplined wealth creation.',
  },
  gst: {
    question: 'Quick Answer — GST Calculation',
    answer: 'To add 18% GST to ₹1,000: <strong>GST = ₹180, Total = ₹1,180</strong>. To remove GST: Original price = ₹1,180 ÷ 1.18 = ₹1,000. CGST and SGST are each 9% for intra-state transactions.',
  },
  bmi: {
    question: 'Quick Answer — BMI Range',
    answer: 'A person weighing <strong>70 kg at 175 cm height has a BMI of 22.9 — Normal weight</strong>. BMI under 18.5 is underweight, 18.5–24.9 is normal, 25–29.9 is overweight, and 30+ is obese. For Asians, health risks increase above 23.',
  },
  incometax: {
    question: 'Quick Answer — Income Tax FY 2025-26',
    answer: 'Under the New Tax Regime, income up to <strong>₹12 Lakh (₹12.75L for salaried with standard deduction) is effectively tax-free</strong> thanks to Section 87A rebate. Above that, rates are: 5% (3-7L), 10% (7-10L), 15% (10-12L), 20% (12-15L), and 30% (above 15L).',
  },
  compoundinterest: {
    question: 'Quick Answer — Compound Interest',
    answer: 'Investing <strong>₹1 Lakh at 8% compounded quarterly for 5 years yields ₹1,48,595</strong> — that\'s ₹48,595 in interest. Compound interest earns "interest on interest," making it far more powerful than simple interest over time.',
  },
  tdee: {
    question: 'Quick Answer — Daily Calories',
    answer: 'An average 30-year-old male (175 cm, 75 kg, moderately active) burns approximately <strong>2,500-2,700 calories per day</strong>. To lose weight, eat 300-500 calories below your TDEE. To gain muscle, eat 200-300 above.',
  },
  bodyfat: {
    question: 'Quick Answer — Healthy Body Fat',
    answer: 'Healthy body fat ranges: <strong>Men: 10-20%, Women: 18-28%</strong>. Athletes: Men 6-13%, Women 14-20%. Essential fat minimums: Men 2-5%, Women 10-13%. Body fat % is a better fitness indicator than BMI alone.',
  },
  percentage: {
    question: 'Quick Answer — Percentage Formula',
    answer: 'To find X% of a number: <strong>multiply the number by X and divide by 100</strong>. Example: 15% of ₹2,000 = (2000 × 15) ÷ 100 = ₹300. For percentage change: ((New - Old) ÷ Old) × 100.',
  },
  fd: {
    question: 'Quick Answer — FD Returns',
    answer: 'A <strong>₹5 Lakh FD at 7% for 5 years (quarterly compounding) matures to approximately ₹7,09,259</strong> — earning ₹2,09,259 as interest. Senior citizens typically get 0.5% higher rates from most Indian banks.',
  },
  ppf: {
    question: 'Quick Answer — PPF Maturity',
    answer: 'Investing <strong>₹1.5 Lakh/year in PPF at 7.1% for 15 years gives ₹40.68 Lakh</strong> — with ₹22.5 Lakh invested. PPF is tax-free under EEE status: investment (80C), interest, and maturity are all exempt.',
  },
  mortgage: {
    question: 'Quick Answer — Home Loan EMI',
    answer: 'For a <strong>₹50 Lakh home loan at 8.5% for 20 years, the monthly EMI is approximately ₹43,391</strong>. Total interest paid over the tenure: ₹54.14 Lakh. Prepaying even small amounts can save lakhs in interest.',
  },
  inhandsalary: {
    question: 'Quick Answer — Take-Home Pay',
    answer: 'For a <strong>₹12 LPA CTC, your approximate in-hand salary is ₹82,000-85,000/month</strong> after PF (12%), professional tax, and income tax deductions under the new regime. Actual amount varies by company structure.',
  },
};

/**
 * Returns a Quick Answer block for featured snippet targeting.
 * Falls back to auto-generated content if no custom answer exists.
 */
export function getQuickAnswer(
  calcId: string,
  calcName: string,
  calcDesc: string,
  category: CalculatorCategory,
): { question: string; answer: string } {
  const custom = CUSTOM_QUICK_ANSWERS[calcId];
  if (custom) return custom;

  const catName = getCategoryName(category);
  return {
    question: `Quick Answer — ${calcName.replace(' Calculator', '')}`,
    answer: `The <strong>${calcName}</strong> is a free online ${catName.toLowerCase()} tool that helps you ${calcDesc.toLowerCase()}. Enter your values above for <strong>instant, accurate results</strong> — no signup required. All calculations run privately in your browser.`,
  };
}

// ── GLOSSARY TERMS GENERATOR (Phase 6 — Topical Depth) ────
// Returns related terms/definitions for a calculator to increase
// topical authority and help users understand key concepts.

interface GlossaryTerm {
  term: string;
  definition: string;
}

const CATEGORY_GLOSSARY: Record<string, GlossaryTerm[]> = {
  finance: [
    { term: 'Principal', definition: 'The original amount of money borrowed or invested, before any interest is applied.' },
    { term: 'Interest Rate', definition: 'The percentage charged on borrowed money or earned on invested money, usually expressed per annum.' },
    { term: 'Compound Interest', definition: 'Interest calculated on both the initial principal and previously accumulated interest — "interest on interest."' },
    { term: 'Amortization', definition: 'The process of spreading loan repayment into equal installments over a fixed period.' },
    { term: 'Maturity', definition: 'The date on which a financial instrument (FD, bond, PPF) reaches its full term and the principal is returned.' },
    { term: 'CAGR', definition: 'Compound Annual Growth Rate — the smoothed annual rate of return on an investment over a specified period.' },
    { term: 'NAV', definition: 'Net Asset Value — the per-unit price of a mutual fund, calculated by dividing total assets minus liabilities by outstanding units.' },
    { term: 'Tenure', definition: 'The total duration or time period of a loan, investment, or financial contract.' },
  ],
  health: [
    { term: 'BMI', definition: 'Body Mass Index — a screening tool that estimates body fat using weight and height (kg/m²).' },
    { term: 'BMR', definition: 'Basal Metabolic Rate — the number of calories your body burns at complete rest to maintain vital functions.' },
    { term: 'TDEE', definition: 'Total Daily Energy Expenditure — total calories burned per day including BMR, activity, and thermic effect of food.' },
    { term: 'Macros', definition: 'Macronutrients: protein, carbohydrates, and fats — the three main nutrients that provide energy (calories).' },
    { term: 'Caloric Deficit', definition: 'Consuming fewer calories than your TDEE, causing your body to use stored fat for energy, leading to weight loss.' },
    { term: 'Body Fat %', definition: 'The percentage of your total body weight that is composed of fat tissue, as opposed to lean mass.' },
    { term: 'VO2 Max', definition: 'Maximum oxygen uptake — the highest rate at which your body can consume oxygen during intense exercise.' },
    { term: 'Lean Body Mass', definition: 'Your total body weight minus fat mass — includes muscle, bone, organs, and water.' },
  ],
  math: [
    { term: 'Percentage', definition: 'A fraction or ratio expressed as a part of 100, denoted by the % symbol.' },
    { term: 'Mean (Average)', definition: 'The sum of all values divided by the count of values in a dataset.' },
    { term: 'Standard Deviation', definition: 'A measure of how spread out numbers are from the mean — higher means more variability.' },
    { term: 'Quadratic Equation', definition: 'A polynomial equation of degree 2, in the form ax² + bx + c = 0, solved using the quadratic formula.' },
    { term: 'Square Root', definition: 'A number that, when multiplied by itself, gives the original number. √25 = 5.' },
    { term: 'Factorial', definition: 'The product of all positive integers up to a given number. 5! = 5 × 4 × 3 × 2 × 1 = 120.' },
  ],
  everyday: [
    { term: 'Tip', definition: 'A gratuity or extra payment given to service providers, usually calculated as a percentage of the bill.' },
    { term: 'Discount', definition: 'A reduction from the original price, expressed as a percentage or absolute amount off.' },
    { term: 'Fuel Efficiency', definition: 'How far a vehicle travels per unit of fuel, measured in km/L (kilometers per liter) in India.' },
    { term: 'Unit Price', definition: 'The cost per single unit of measurement (per kg, per liter, per piece) — used to compare value.' },
    { term: 'ROI', definition: 'Return on Investment — the gain or loss on an investment relative to its cost, expressed as a percentage.' },
  ],
  education: [
    { term: 'CGPA', definition: 'Cumulative Grade Point Average — the weighted average of grade points across all semesters.' },
    { term: 'GPA', definition: 'Grade Point Average — the average of grade points earned in a single semester or academic period.' },
    { term: 'Percentile', definition: 'A score below which a given percentage of scores fall — 90th percentile means you scored higher than 90% of test-takers.' },
    { term: 'Credit Hours', definition: 'The weightage assigned to a course based on lecture and lab hours per week.' },
  ],
  engineering: [
    { term: 'Ohm\'s Law', definition: 'V = I × R — Voltage equals Current times Resistance. The fundamental law of electrical circuits.' },
    { term: 'Power Factor', definition: 'The ratio of real power to apparent power in an AC circuit, ranging from 0 to 1.' },
    { term: 'Torque', definition: 'A rotational force measured in Newton-meters (N·m) that causes an object to rotate about an axis.' },
    { term: 'Reynolds Number', definition: 'A dimensionless quantity predicting whether fluid flow is laminar (smooth) or turbulent.' },
  ],
  construction: [
    { term: 'Concrete Mix Ratio', definition: 'The proportion of cement, sand, and aggregate (e.g., M20 = 1:1.5:3) that determines concrete strength.' },
    { term: 'Stamp Duty', definition: 'A state government tax levied on property registration, calculated as a percentage of property value.' },
    { term: 'Carpet Area', definition: 'The usable floor area of a property, excluding walls, balcony, and common spaces.' },
    { term: 'Built-up Area', definition: 'Carpet area plus the thickness of inner and outer walls — larger than carpet area.' },
  ],
  datetime: [
    { term: 'Leap Year', definition: 'A year with 366 days (Feb 29). Occurs every 4 years, except centuries not divisible by 400.' },
    { term: 'Working Days', definition: 'Business days excluding weekends and public holidays, used for project planning and payroll.' },
    { term: 'IST', definition: 'Indian Standard Time — UTC+5:30, the single time zone used across India.' },
  ],
  science: [
    { term: 'Acceleration', definition: 'The rate of change of velocity over time, measured in m/s² (meters per second squared).' },
    { term: 'pH', definition: 'A scale from 0-14 measuring acidity/alkalinity: 7 is neutral, below 7 is acidic, above 7 is basic.' },
    { term: 'Half-Life', definition: 'The time required for half of a radioactive substance to decay into another element.' },
    { term: 'Kinetic Energy', definition: 'Energy possessed by a body due to its motion: KE = ½mv² (mass × velocity²).' },
  ],
  unit: [
    { term: 'Metric System', definition: 'The decimal measuring system based on meters, kilograms, and seconds (MKS) — used globally.' },
    { term: 'Imperial System', definition: 'The measuring system using feet, pounds, and Fahrenheit — primarily used in the US.' },
    { term: 'SI Units', definition: 'International System of Units — the modern standard: meter, kilogram, second, ampere, kelvin, mole, candela.' },
  ],
  tech: [
    { term: 'Entropy (Password)', definition: 'A measure of password randomness in bits. Higher entropy = harder to crack. 80+ bits is considered strong.' },
    { term: 'CIDR', definition: 'Classless Inter-Domain Routing — a notation for specifying IP address ranges (e.g., /24 = 256 addresses).' },
    { term: 'Subnet Mask', definition: 'A 32-bit number that divides an IP address into network and host portions.' },
    { term: 'HEX Color', definition: 'A 6-digit hexadecimal code representing a color (#RRGGBB), widely used in CSS and web design.' },
    { term: 'Bandwidth', definition: 'The maximum data transfer rate of a network connection, measured in Mbps or Gbps.' },
  ],
};

/**
 * Returns glossary terms relevant to a calculator's category.
 * These provide topical depth for SEO and help users understand key concepts.
 */
export function getGlossaryTerms(category: CalculatorCategory): GlossaryTerm[] {
  return CATEGORY_GLOSSARY[category] || [];
}
