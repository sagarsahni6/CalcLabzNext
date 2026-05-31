/* ═══════════════════════════════════════════════════
   Calc Labz — Cross-Category Related Calculators
   Maps each calculator to related tools across
   different categories for internal linking SEO.
   Includes auto-fallback for calculators without
   explicit mappings — uses same-category peers.
   ═══════════════════════════════════════════════════ */

import { DB, getCalcsByCategory } from '@/data/calculator-db';

/**
 * Cross-category "You may also need" links.
 * Each key is a calcId, value is an array of related calcIds from OTHER categories.
 * This creates a strong internal linking mesh that Google rewards.
 */
export const CROSS_CATEGORY_LINKS: Record<string, string[]> = {
  // ── Finance → Other categories ──────────────────
  emi: ['stampdutycalc', 'homeloanTaxBenefit', 'prepayment', 'loaneligibility', 'mortgage', 'inhandsalary'],
  sip: ['stepupsip', 'goalsip', 'lumpsum', 'fire', 'compoundinterest', 'retirementcorpus'],
  gst: ['pregst', 'gstinvoice', 'profitloss', 'discount'],
  incometax: ['taxregime', 'advancetax', 'taxsaving', 'sec80c', 'hra', 'inhandsalary'],
  taxregime: ['incometax', 'taxsaving', 'sec80c', 'hra', 'nps', 'inhandsalary'],
  compoundinterest: ['simpleinterest', 'fd', 'ppf', 'rd', 'sip', 'inflation'],
  fd: ['rd', 'compoundinterest', 'ppf', 'scss', 'nsc', 'simpleinterest'],
  ppf: ['epf', 'nps', 'ssy', 'fd', 'elssreturns', 'taxsaving'],
  mortgage: ['emi', 'prepayment', 'homeloanTaxBenefit', 'stampdutycalc', 'loaneligibility', 'rentvsbuy'],
  inhandsalary: ['ctcbreakup', 'salaryhike', 'salarycomparison', 'incometax', 'epf', 'hra'],
  nps: ['ppf', 'epf', 'retirementcorpus', 'fire', 'taxsaving'],
  cagr: ['roi', 'compoundinterest', 'sip', 'mutualfundreturns', 'stockreturn'],
  retirementcorpus: ['fire', 'nps', 'ppf', 'epf', 'sip', 'inflation'],
  carloan: ['emi', 'loaneligibility', 'insurance', 'fuel'],
  prepayment: ['emi', 'mortgage', 'homeloanTaxBenefit', 'refinance'],
  lumpsum: ['sip', 'cagr', 'compoundinterest', 'fd', 'elssreturns'],
  rd: ['fd', 'compoundinterest', 'ppf', 'sip', 'scss'],
  epf: ['ppf', 'nps', 'retirementcorpus', 'inhandsalary', 'taxsaving'],
  fire: ['retirementcorpus', 'nps', 'sip', 'inflation', 'montecarlo'],
  roi: ['cagr', 'compoundinterest', 'stockreturn', 'mutualfundreturns'],
  inflation: ['fd', 'ppf', 'retirementcorpus', 'fire', 'compoundinterest'],
  simpleinterest: ['compoundinterest', 'fd', 'rd', 'ppf'],
  creditcard: ['emi', 'creditutil', 'compoundinterest'],
  stockreturn: ['cagr', 'roi', 'mutualfundreturns', 'capitalgains', 'dividendyield'],
  capitalgains: ['stockreturn', 'incometax', 'indexedCost', 'esoptax'],
  savingsgoal: ['sip', 'fd', 'compoundinterest', 'inflationgoal'],
  dividendyield: ['stockreturn', 'roi', 'cagr', 'fd'],
  goldinvestment: ['sgb', 'goldComparison', 'inflation', 'cagr'],
  loaneligibility: ['emi', 'mortgage', 'inhandsalary', 'carloan'],
  balancetransfer: ['emi', 'creditcard', 'prepayment', 'refinance'],
  advancetax: ['incometax', 'taxregime', 'taxsaving', 'sec80c'],
  hra: ['incometax', 'taxregime', 'inhandsalary', 'hravshomeloan', 'rentvsbuy'],
  salaryhike: ['inhandsalary', 'ctcbreakup', 'salarycomparison', 'inflation'],
  ctcbreakup: ['inhandsalary', 'salaryhike', 'incometax', 'epf'],
  taxsaving: ['incometax', 'sec80c', 'ppf', 'elssreturns', 'nps'],
  elssreturns: ['sip', 'taxsaving', 'sec80c', 'ppf', 'cagr'],
  scss: ['fd', 'ppf', 'rd', 'nsc', 'compoundinterest'],
  nsc: ['fd', 'ppf', 'scss', 'taxsaving', 'compoundinterest'],
  ssy: ['ppf', 'fd', 'taxsaving', 'sec80c'],
  goalsip: ['sip', 'stepupsip', 'savingsgoal', 'inflationgoal'],
  stepupsip: ['sip', 'goalsip', 'compoundinterest', 'retirementcorpus'],
  mutualfundreturns: ['sip', 'cagr', 'roi', 'lumpsum', 'elssreturns'],
  smokingcost: ['fuel', 'electricbill', 'householdbudget'],
  loanaffordability: ['emi', 'mortgage', 'loaneligibility', 'inhandsalary'],
  npvirr: ['cagr', 'roi', 'compoundinterest', 'bondyield'],
  bondyield: ['fd', 'npvirr', 'cagr', 'compoundinterest'],
  optionprofit: ['stockreturn', 'capitalgains', 'roi'],
  forexpip: ['roi', 'percentage', 'compoundinterest'],
  portfoliorebalance: ['assetallocation', 'sip', 'mutualfundreturns'],
  assetallocation: ['portfoliorebalance', 'sip', 'retirementcorpus'],
  montecarlo: ['retirementcorpus', 'fire', 'sip', 'compoundinterest'],
  inflationgoal: ['savingsgoal', 'sip', 'inflation', 'retirementcorpus'],
  businessloan: ['emi', 'gst', 'profitloss', 'gstinvoice'],
  gstinvoice: ['gst', 'pregst', 'profitloss', 'businessloan'],
  esoptax: ['incometax', 'capitalgains', 'stockreturn', 'inhandsalary'],
  freelancetax: ['incometax', 'gst', 'advancetax', 'presumptiveTax'],
  tcsremittance: ['incometax', 'advancetax', 'capitalgains'],
  sec80c: ['taxsaving', 'ppf', 'elssreturns', 'nps', 'incometax'],
  hravshomeloan: ['hra', 'mortgage', 'homeloanTaxBenefit', 'rentvsbuy'],
  proftax: ['inhandsalary', 'incometax', 'ctcbreakup'],
  leaveencash: ['inhandsalary', 'incometax', 'epf'],
  sgb: ['goldinvestment', 'goldComparison', 'fd', 'compoundinterest'],
  foTurnover: ['incometax', 'capitalgains', 'stockreturn', 'freelancetax'],
  presumptiveTax: ['incometax', 'freelancetax', 'advancetax', 'gst'],
  homeloanTaxBenefit: ['mortgage', 'emi', 'sec80c', 'incometax', 'prepayment'],
  indexedCost: ['capitalgains', 'incometax', 'stockreturn', 'cagr'],
  goldComparison: ['sgb', 'goldinvestment', 'fd', 'inflation'],
  rentYield: ['mortgage', 'emi', 'rentvsbuy', 'stampdutycalc'],
  refinance: ['emi', 'mortgage', 'prepayment', 'balancetransfer'],
  creditutil: ['creditcard', 'emi', 'balancetransfer'],
  insuranceneed: ['retirementcorpus', 'inhandsalary', 'emi'],
  homedownpayment: ['mortgage', 'stampdutycalc', 'savingsgoal', 'sip'],
  loancompare: ['emi', 'mortgage', 'loaneligibility', 'refinance'],
  salarycomparison: ['inhandsalary', 'salaryhike', 'ctcbreakup'],

  // ── Health → Other categories ───────────────────
  bmi: ['tdee', 'caloriedeficit', 'idealweight', 'bodyfat', 'bmr', 'water'],
  tdee: ['bmr', 'macros', 'caloriedeficit', 'caloriegoal', 'water', 'bmi'],
  bmr: ['tdee', 'macros', 'caloriedeficit', 'calories', 'bmi'],
  bodyfat: ['bmi', 'idealweight', 'leanbodymass', 'waisthip', 'bodyrecomp'],
  caloriedeficit: ['tdee', 'bmr', 'macros', 'idealweight', 'bodyrecomp', 'calories'],
  macros: ['tdee', 'caloriedeficit', 'proteinintake', 'caloriegoal', 'bmr'],
  proteinintake: ['macros', 'tdee', 'bodyrecomp', 'onerepmax'],
  heartrate: ['vo2max', 'runningpace', 'tdee', 'bmr'],
  sleep: ['sleepdebt', 'tdee', 'water'],
  bloodpressure: ['bmi', 'cholesterolratio', 'diabetesrisk', 'waisthip'],
  idealweight: ['bmi', 'bodyfat', 'caloriedeficit', 'tdee'],
  calories: ['tdee', 'bmr', 'caloriedeficit', 'macros'],
  water: ['tdee', 'electrolyte', 'bmr', 'sleep'],
  waisthip: ['bmi', 'bodyfat', 'waistHeightRatio', 'bloodpressure'],
  pregnancy: ['bmi', 'idealweight', 'calories'],
  childheight: ['bmi', 'idealweight', 'pregnancy'],
  diabetesrisk: ['bmi', 'bloodpressure', 'waisthip', 'cholesterolratio'],
  cholesterolratio: ['bloodpressure', 'bmi', 'diabetesrisk'],
  onerepmax: ['proteinintake', 'bodyrecomp', 'tdee', 'macros'],
  runningpace: ['vo2max', 'heartrate', 'tdee', 'caloriedeficit'],
  bodyrecomp: ['bodyfat', 'macros', 'tdee', 'caloriedeficit', 'proteinintake'],
  vo2max: ['runningpace', 'heartrate', 'tdee'],
  leanbodymass: ['bodyfat', 'bmi', 'idealweight', 'macros'],
  caloriegoal: ['tdee', 'caloriedeficit', 'macros', 'bodyrecomp'],
  electrolyte: ['water', 'tdee', 'runningpace'],
  sleepdebt: ['sleep', 'tdee', 'bmr'],
  intermittentFasting: ['tdee', 'caloriedeficit', 'macros', 'bmi'],
  waistHeightRatio: ['bmi', 'bodyfat', 'waisthip', 'bloodpressure'],

  // ── Math → Other categories ─────────────────────
  percentage: ['discount', 'tip', 'profitloss', 'gst', 'roi'],
  quadratic: ['lineareq', 'squareroot', 'scientific'],
  statistics: ['stddev', 'average', 'combinations'],
  average: ['statistics', 'stddev', 'cgpa'],
  squareroot: ['percentage', 'scientific', 'quadratic'],
  lineareq: ['quadratic', 'percentage', 'scientific'],
  combinations: ['statistics', 'average', 'factorial'],
  factorial: ['combinations', 'statistics', 'percentage'],
  matrix: ['lineareq', 'quadratic', 'statistics'],
  scientific: ['quadratic', 'squareroot', 'lineareq'],
  stddev: ['statistics', 'average', 'percentage'],
  hcflcm: ['factorial', 'combinations', 'percentage'],

  // ── Education → Other categories ────────────────
  cgpa: ['cgpaToPercentage', 'gpaplanner', 'gpaconverter', 'percentage', 'examneeded'],
  eduloan: ['emi', 'compoundinterest', 'prepayment'],
  examneeded: ['cgpa', 'studyhours', 'percentage'],
  gpaconverter: ['cgpa', 'cgpaToPercentage', 'percentage'],
  studyhours: ['examneeded', 'cgpa', 'revisionplanner'],
  cgpaToPercentage: ['cgpa', 'gpaconverter', 'gpaplanner'],
  attendance: ['examneeded', 'cgpa', 'studyhours'],
  gpaplanner: ['cgpa', 'cgpaToPercentage', 'attendance'],
  percentile: ['percentage', 'cgpa', 'cutoffpredictor'],
  cutoffpredictor: ['percentile', 'examneeded', 'percentage'],
  revisionplanner: ['studyhours', 'examneeded', 'attendance'],

  // ── Engineering → Other categories ──────────────
  ohmslaw: ['power', 'resistor', 'voltdivider', 'ledresistor'],
  power: ['ohmslaw', 'electricbill', 'threephase'],
  resistor: ['ohmslaw', 'power', 'voltdivider', 'ledresistor'],
  voltdivider: ['ohmslaw', 'resistor', 'power'],
  ledresistor: ['ohmslaw', 'resistor', 'voltdivider'],
  inverterbattery: ['electricbill', 'solarpanel', 'acbtu', 'power'],
  acbtu: ['electricbill', 'inverterbattery', 'power'],
  beamload: ['pipeflow', 'springforce', 'concrete'],
  pipeflow: ['fluidflow', 'beamload', 'heatexchanger'],
  threephase: ['power', 'ohmslaw', 'transformercalc'],
  transformercalc: ['threephase', 'power', 'ohmslaw'],
  heatexchanger: ['pipeflow', 'fluidflow', 'beamload'],
  fluidflow: ['pipeflow', 'heatexchanger', 'beamload'],
  springforce: ['beamload', 'gearratio', 'pipeflow'],
  gearratio: ['springforce', 'beamload', 'power'],

  // ── Construction → Other categories ─────────────
  constructioncost: ['concrete', 'bricks', 'steel', 'flooring', 'paint', 'stampdutycalc'],
  concrete: ['concretemix', 'steel', 'constructioncost', 'materialwaste'],
  stampdutycalc: ['constructioncost', 'mortgage', 'emi', 'homerenovation'],
  solarpanel: ['electricbill', 'inverterbattery', 'acbtu'],
  bricks: ['concrete', 'constructioncost', 'steel', 'flooring'],
  steel: ['concrete', 'constructioncost', 'bricks'],
  flooring: ['paint', 'constructioncost', 'bricks', 'materialwaste'],
  paint: ['flooring', 'constructioncost', 'materialwaste'],
  homerenovation: ['constructioncost', 'concrete', 'paint', 'flooring'],
  concretemix: ['concrete', 'constructioncost', 'materialwaste'],
  materialwaste: ['concretemix', 'flooring', 'paint', 'constructioncost'],
  rainwater: ['solarpanel', 'constructioncost', 'electricbill'],

  // ── Everyday → Other categories ─────────────────
  tip: ['tipsplit', 'percentage', 'discount'],
  discount: ['percentage', 'gst', 'pregst', 'unitPrice'],
  fuel: ['mileage', 'evpetrolsavings', 'carbonfootprint'],
  electricbill: ['solarpanel', 'inverterbattery', 'acbtu', 'power'],
  salary: ['inhandsalary', 'salaryhike', 'ctcbreakup'],
  tipsplit: ['tip', 'percentage', 'discount'],
  mileage: ['fuel', 'evpetrolsavings', 'carbonfootprint'],
  profitloss: ['percentage', 'gst', 'discount', 'roi'],
  unitPrice: ['discount', 'percentage', 'gst'],
  evpetrolsavings: ['fuel', 'mileage', 'electricbill', 'solarpanel'],
  carbonfootprint: ['fuel', 'mileage', 'evpetrolsavings'],
  rentvsbuy: ['mortgage', 'emi', 'hravshomeloan', 'rentYield'],
  ecomprofit: ['profitloss', 'gst', 'uniteconomics', 'percentage'],
  restaurantcost: ['profitloss', 'gst', 'percentage'],
  subscriptionpricing: ['uniteconomics', 'roi', 'percentage'],
  uniteconomics: ['ecomprofit', 'roi', 'subscriptionpricing'],
  eventbudget: ['householdbudget', 'percentage', 'tip'],
  householdbudget: ['inhandsalary', 'eventbudget', 'electricbill', 'fuel'],
  dataUsage: ['electricbill', 'fuel', 'mileage'],

  // ── Date & Time ─────────────────────────────────
  retirementDate: ['retirementcorpus', 'ageUnits', 'fire'],
  ageUnits: ['retirementDate', 'bmi', 'tdee'],

  // ── Science ─────────────────────────────────────
  speed_dist: ['fuel', 'mileage', 'runningpace'],
};

/**
 * Get cross-category related calculator IDs for a given calcId.
 * Falls back to same-category peers if no explicit mapping exists.
 * This ensures ALL 268+ calculators have cross-links for SEO.
 */
export function getCrossCategoryLinks(calcId: string): string[] {
  const explicit = CROSS_CATEGORY_LINKS[calcId];
  if (explicit && explicit.length > 0) {
    return explicit;
  }

  // Auto-fallback: find calculators from the same category (excluding self)
  const calc = DB[calcId];
  if (!calc) return [];

  const sameCat = getCalcsByCategory(calc.cat)
    .filter(id => id !== calcId)
    .slice(0, 6);

  return sameCat;
}
