/* ═══════════════════════════════════════════════════
   Calc Labz — Cross-Category Related Calculators
   Maps each calculator to related tools across
   different categories for internal linking SEO.
   ═══════════════════════════════════════════════════ */

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

  // ── Math → Other categories ─────────────────────
  percentage: ['discount', 'tip', 'profitloss', 'gst', 'roi'],
  quadratic: ['lineareq', 'squareroot', 'scientific'],
  statistics: ['stddev', 'average', 'combinations'],
  average: ['statistics', 'stddev', 'cgpa'],

  // ── Education → Other categories ────────────────
  cgpa: ['cgpaToPercentage', 'gpaplanner', 'gpaconverter', 'percentage', 'examneeded'],
  eduloan: ['emi', 'compoundinterest', 'prepayment'],
  examneeded: ['cgpa', 'studyhours', 'percentage'],

  // ── Engineering → Other categories ──────────────
  ohmslaw: ['power', 'resistor', 'voltdivider', 'ledresistor'],
  power: ['ohmslaw', 'electricbill', 'threephase'],

  // ── Construction → Other categories ─────────────
  constructioncost: ['concrete', 'bricks', 'steel', 'flooring', 'paint', 'stampdutycalc'],
  concrete: ['concretemix', 'steel', 'constructioncost', 'materialwaste'],
  stampdutycalc: ['constructioncost', 'mortgage', 'emi', 'homerenovation'],
  solarpanel: ['electricbill', 'inverterbattery', 'acbtu'],

  // ── Everyday → Other categories ─────────────────
  tip: ['tipsplit', 'percentage', 'discount'],
  discount: ['percentage', 'gst', 'pregst', 'unitPrice'],
  fuel: ['mileage', 'evpetrolsavings', 'carbonfootprint'],
  electricbill: ['solarpanel', 'inverterbattery', 'acbtu', 'power'],
  salary: ['inhandsalary', 'salaryhike', 'ctcbreakup'],
};

/**
 * Get cross-category related calculator IDs for a given calcId.
 * Falls back to empty array if no mapping exists.
 */
export function getCrossCategoryLinks(calcId: string): string[] {
  return CROSS_CATEGORY_LINKS[calcId] || [];
}
