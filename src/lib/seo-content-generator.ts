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
    unit: 'Unit Conversion',
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
