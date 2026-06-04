/* ═══════════════════════════════════════════════════
   Calc Labz — Calculator Database
   AUTO-GENERATED — Maps calculator IDs → metadata + inputs.
   Contains 311 calculators across all categories.
   ═══════════════════════════════════════════════════ */

import { CalculatorDefinition, RegistryEntry, CalculatorCategory } from '@/types/calculator';
import {
  calcEMI, calcSIP, calcGST, calcPreGST, calcCompoundInterest, calcSimpleInterest, calcIncomeTax, calcROI, calcPPF, calcFD, calcMortgage, calcCarLoan, calcBreakeven, calcInflation, calcSWP, calcLumpsum, calcNPS, calcGratuity, calcHRA, calcCAGR, calcCreditCard, calcNetWorth, calcTDS, calcEPF, calcProfitLoss, calcStockReturn, calcMutualFundReturns, calcTaxRegime, calcCapitalGains, calcPrepayment, calcStepUpSIP, calcSavingsGoal, calcDividendYield, calcGoldInvestment, calcRD, calcXIRR, calcLoanEligibility, calcBalanceTransfer, calcSSY, calcSCSS, calcAdvanceTax, calcInhandSalary, calcCtcBreakup, calcSalaryComparison, calcGoalSIP, calcElssReturns, calcNSC, calcAPY, calcBrokerage, calcTaxSaving, calcRetirementCorpus, calcSalaryHike, calcFIRE, calcDebtAvalanche, calcEmergencyFund, calcRentVsBuy, calcCarLeaseVsBuy, calcHomeDownPayment, calcLoanCompare, calcRefinance, calcCreditUtil, calcInsuranceNeed, calcNpvIrr, calcBondYield, calcOptionProfit, calcForexPip, calcPortfolioRebalance, calcAssetAllocation, calcMonteCarlo, calcInflationGoal, calcBusinessLoan, calcGstInvoice, calcEsopTax, calcFreelanceTax, calcTcsRemittance, calcSec80c, calcHraVsHomeLoan, calcProfTax, calcLeaveEncash, calcSGB, calcFoTurnover, calcPresumptiveTax, calcHomeLoanTaxBenefit, calcIndexedCost, calcGoldComparison, calcRentYield,
  calcEmiVsTenure, calcRuleOf72, calcPostOfficeMIS, calcCryptoProfit, calcFlatVsReducing,
} from '@/lib/calculations/finance';
import {
  calcOhmsLaw, calcResistor, calcPower, calcPythagorean, calcLedResistor, calcVoltDivider, calcBatteryLife, calcPcbTrace, calcDecibel, calcAntennaLen, calcTorque, calcBeamLoad, calcHeatExchanger, calcFluidFlow, calcSpringForce, calcGearRatio, calcInverterBattery, calcAcBtu, calcPipeFlow, calcThreePhase, calcTransformer,
  calcMotorSize, calcResistorDecode,
} from '@/lib/calculations/engineering';
import {
  calcConcrete, calcBricks, calcPaint, calcFlooring, calcSteel, calcRoofing, calcEarthwork, calcPlasterwork, calcWaterTank, calcLandArea, calcStampDuty, calcConstructionCost, calcSolarPanel, calcHomeRenovation, calcConcreteMix, calcMaterialWaste, calcRainwater,
  calcStaircase, calcSepticTank, calcElectricalLoad,
  calcFenceWall, calcWaterproofing, calcFalseCeiling, calcColumnFooting, calcWindowDoor, calcSandGravel, calcScaffolding, calcCarpetArea,
} from '@/lib/calculations/construction';
import {
  calcSpeedDist, calcNewtons, calcOhmAdvanced, calcDensity, calcChemMolar, calcWavelength, calcGravitational, calcHalfLife, calcPH, calcKinematic, calcThermodynamics, calcAcceleration,
  calcIdealGas, calcCoulombsLaw, calcEscapeVelocity, calcSoundSpeed,
} from '@/lib/calculations/science';
import {
  calcDateDiff, calcTimeConv, calcCountdown, calcTimezone, calcWorkingDays, calcAgeNextBday, calcRetirementDate, calcAgeUnits,
  calcLeapYear, calcWeekNumber, calcDateAdd,
} from '@/lib/calculations/datetime';
import {
  calcLength, calcWeight, calcTemperature, calcArea, calcSpeed, calcCurrency, calcVolume, calcData, calcPressure, calcEnergy, calcAngle,
  calcFuelEfficiency, calcNumberWord, calcCookingConvert,
} from '@/lib/calculations/unit';
import {
  calcBMI, calcBMR, calcTDEE, calcWater, calcHeartRate, calcAge, calcCalories, calcSleep, calcMacros, calcPregnancy, calcIdealWeight, calcOvulation, calcBloodPressure, calcAlcohol, calcWaistHip, calcIBW, calcVitamins, calcLungCapacity, calcBodyFat, calcProteinIntake, calcSmokingCost, calcChildHeight, calcDiabetesRisk, calcSleepDebt, calcAnemia, calcBSA, calcCholesterolRatio, calcCalorieDeficit, calcOneRepMax, calcRunningPace, calcBodyRecomp, calcVO2Max, calcLeanBodyMass, calcCalorieGoal, calcElectrolyte, calcIntermittentFasting, calcWaistHeightRatio,
  calcPregnancyWeight, calcBreastmilk, calcStepCounter, calcBACDetailed, calcMenstrualCycle,
} from '@/lib/calculations/health';
import {
  calcPercentage, calcRatio, calcSquareRoot, calcLogarithm, calcFactorial, calcQuadratic, calcPrime, calcNumberSystem, calcAverage, calcStatistics, calcMatrix2x2, calcCombinations, calcLcmGcd, calcRomanNumeral, calcTriangleArea, calcScientific, calcFraction, calcStdDev, calcLinearEq, calcCircleCalc, calcDeterminant, calcComplexNum,
} from '@/lib/calculations/math';
import {
  calcTip, calcDiscount, calcFuel, calcSalary, calcEmi2, calcGrade, calcElectricBill, calcLoanAffordability, calcCaloriesFood, calcWireSize, calcPixelResolution, calcTypingSpeed, calcEmiExtra, calcInvestVsRent, calcUnitPrice, calcPetrolParity, calcLaundry, calcWeddingBudget, calcRentAfford, calcFreelanceRate, calcCarbonFootprint, calcCarTco, calcTipSplit, calcPetAge, calcTravelBudget, calcMileage, calcCooking, calcShoeSize, calcStopwatch, calcRandomNum, calcEvPetrolSavings, calcEcomProfit, calcRestaurantCost, calcSubscriptionPricing, calcUnitEconomics, calcEventBudget, calcHouseholdBudget, calcDataUsage,
  calcInflationBasket, calcPhonePlan, calcMovingCost, calcLaundryLoad,
} from '@/lib/calculations/everyday';
import {
  calcCgpa, calcExamNeeded, calcEduLoan, calcStudyHours, calcScholarship, calcPomodoro, calcGpaConverter, calcReadingTime, calcTypingTest, calcSpellingBee, calcAttendance, calcGpaPlanner, calcPercentile, calcCutoffPredictor, calcRevisionPlanner, calcCgpaToPercentage,
  calcMarksPercentage, calcCompetitiveExam, calcBacklogRecovery, calcResearchMetrics, calcAbroadCost,
} from '@/lib/calculations/education';
import {
  calcPasswordStrength, calcWordCounter, calcAspectRatio, calcSocialMediaImage, calcDogAge,
  calcSubnet, calcBandwidth, calcColorConverter,
  calcJsonFormatter,
} from '@/lib/calculations/tech';

export const DB: Record<string, CalculatorDefinition> = {
  percentage: {
    name: 'Percentage Calculator', desc: 'X% of a number, percentage change & more',
    icon: 'fa-percent', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 200 },
      { id: 'pct', label: 'Percentage', default: 25, suffix: '%' },
    ],
    calc: calcPercentage,
  },
  ratio: {
    name: 'Ratio Calculator', desc: 'Simplify ratios and find proportional values',
    icon: 'fa-equals', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'First Value (A)', default: 12 },
      { id: 'b', label: 'Second Value (B)', default: 18 },
    ],
    calc: calcRatio,
  },
  squareroot: {
    name: 'Square Root Calculator', desc: 'Square root, cube root & nth root',
    icon: 'fa-square-root-variable', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n', label: 'Number', default: 144 },
      { id: 'root', label: 'Root (nth)', default: 2 },
    ],
    calc: calcSquareRoot,
  },
  logarithm: {
    name: 'Logarithm Calculator', desc: 'Natural log, log base 10 and custom base',
    icon: 'fa-wave-square', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n', label: 'Number', default: 100 },
      { id: 'base', label: 'Log Base', default: 10 },
    ],
    calc: calcLogarithm,
  },
  factorial: {
    name: 'Factorial Calculator', desc: 'n! Factorial, permutations & combinations',
    icon: 'fa-exclamation', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n', label: 'n (max 20)', default: 10 },
      { id: 'r', label: 'r (for nPr, nCr)', default: 3 },
    ],
    calc: calcFactorial,
  },
  quadratic: {
    name: 'Quadratic Equation', desc: 'Solve ax² + bx + c = 0',
    icon: 'fa-superscript', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'a (coefficient of x²)', default: 1 },
      { id: 'b', label: 'b (coefficient of x)' },
      { id: 'c', label: 'c (constant)', default: 6 },
    ],
    calc: calcQuadratic,
  },
  prime: {
    name: 'Prime Number Checker', desc: 'Check if a number is prime & find factors',
    icon: 'fa-hashtag', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n', label: 'Number to Check', default: 97 },
    ],
    calc: calcPrime,
  },
  numbersystem: {
    name: 'Number Base Converter', desc: 'Binary, Octal, Decimal, Hex conversions',
    icon: 'fa-code', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'dec', label: 'Decimal Number', default: 255 },
      { id: 'customBase', label: 'Custom Base (2–36)', default: 16 },
    ],
    calc: calcNumberSystem,
  },
  average: {
    name: 'Average / Mean Calculator', desc: 'Mean, median, mode, range, variance',
    icon: 'fa-chart-simple', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'nums', label: 'Numbers (comma-separated)', default: '4,8,15,16,23,42', type: 'text' },
    ],
    calc: calcAverage,
  },
  statistics: {
    name: 'Statistics Calculator', desc: 'Variance, std dev, skewness from a dataset',
    icon: 'fa-chart-column', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'data', label: 'Numbers (comma-separated)', default: '10,20,30,40,50,60,70', type: 'text' },
    ],
    calc: calcStatistics,
  },
  matrix2x2: {
    name: '2×2 Matrix Calculator', desc: 'Determinant, inverse, trace of a 2×2 matrix',
    icon: 'fa-table-cells', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'a (row1,col1)', default: 1 },
      { id: 'b', label: 'b (row1,col2)', default: 2 },
      { id: 'c', label: 'c (row2,col1)', default: 3 },
      { id: 'd', label: 'd (row2,col2)', default: 4 },
    ],
    calc: calcMatrix2x2,
  },
  combinations: {
    name: 'Probability Calculator', desc: 'nCr, nPr, and event probability',
    icon: 'fa-dice', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n', label: 'Total outcomes (n)', default: 52 },
      { id: 'r', label: 'Choose (r)', default: 5 },
      { id: 'favorable', label: 'Favorable outcomes', default: 4 },
    ],
    calc: calcCombinations,
  },
  lcmgcd: {
    name: 'LCM & GCD Calculator', desc: 'Least Common Multiple & Greatest Common Divisor',
    icon: 'fa-divide', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'First Number', default: 12 },
      { id: 'b', label: 'Second Number', default: 18 },
      { id: 'c', label: 'Third Number (optional, 0 to skip)', default: 0 },
    ],
    calc: calcLcmGcd,
  },
  romanNumeral: {
    name: 'Roman Numeral Converter', desc: 'Convert between Arabic and Roman numerals',
    icon: 'fa-i-cursor', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'num', label: 'Arabic Number (1–3999)', default: 2024 },
    ],
    calc: calcRomanNumeral,
  },
  triangleArea: {
    name: 'Triangle Calculator', desc: 'Area, perimeter, angles — all triangle types',
    icon: 'fa-draw-polygon', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'Side A', default: 3 },
      { id: 'b', label: 'Side B', default: 4 },
      { id: 'c', label: 'Side C', default: 5 },
    ],
    calc: calcTriangleArea,
  },
  scientific: {
    name: 'Scientific Calculator', desc: 'Trigonometry, logarithms, powers and more',
    icon: 'fa-calculator', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'expr', label: 'Value / Angle', default: 45, type: 'text' },
    ],
    calc: calcScientific,
  },
  fraction: {
    name: 'Fraction Calculator', desc: 'Add, subtract, multiply and divide fractions with simplification',
    icon: 'fa-divide', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'n1', label: 'Numerator 1', default: 3 },
      { id: 'd1', label: 'Denominator 1', default: 4 },
    ],
    calc: calcFraction,
  },
  stddev: {
    name: 'Standard Deviation Calculator', desc: 'Mean, variance, standard deviation from raw data',
    icon: 'fa-chart-bar', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'data', label: 'Enter Numbers (comma separated)', default: '10,20,30,40,50', type: 'text' },
    ],
    calc: calcStdDev,
  },
  lineareq: {
    name: 'Linear Equation Solver', desc: 'Solve ax + b = c for any single variable',
    icon: 'fa-equals', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a_eq', label: 'Coefficient a (of x)', default: 3 },
      { id: 'b_eq', label: 'Constant b', default: 7 },
      { id: 'c_eq', label: 'Right-hand side c', default: 22 },
    ],
    calc: calcLinearEq,
  },
  circleCalc: {
    name: 'Circle & Sphere Calculator', desc: 'Area, circumference, arc length, sphere volume',
    icon: 'fa-circle', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'radius', label: 'Radius', default: 7, suffix: 'units' },
      { id: 'angle', label: 'Arc Angle', default: 90, suffix: '°' },
    ],
    calc: calcCircleCalc,
  },
  determinant: {
    name: 'Matrix Determinant (3×3)', desc: 'Calculate determinant of a 3×3 matrix',
    icon: 'fa-table-cells', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a11', label: 'Row 1, Col 1', default: 1 },
      { id: 'a12', label: 'Row 1, Col 2', default: 2 },
      { id: 'a13', label: 'Row 1, Col 3', default: 3 },
      { id: 'a21', label: 'Row 2, Col 1', default: 4 },
      { id: 'a22', label: 'Row 2, Col 2', default: 5 },
      { id: 'a23', label: 'Row 2, Col 3', default: 6 },
      { id: 'a31', label: 'Row 3, Col 1', default: 7 },
      { id: 'a32', label: 'Row 3, Col 2', default: 8 },
      { id: 'a33', label: 'Row 3, Col 3', default: 0 },
    ],
    calc: calcDeterminant,
  },
  complexnum: {
    name: 'Complex Number Calculator', desc: 'Add, subtract, multiply, divide complex numbers (a + bi)',
    icon: 'fa-infinity', cat: 'math' as CalculatorCategory,
    inputs: [
      { id: 'a1', label: 'Real part (a₁)', default: 3 },
      { id: 'b1', label: 'Imaginary part (b₁)', default: 4 },
    ],
    calc: calcComplexNum,
  },
  emi: {
    name: 'Loan EMI Calculator', desc: 'Monthly EMI, total interest & payment breakdown',
    icon: 'fa-building-columns', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'principal', label: 'Loan Amount', default: 1000000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8.5, suffix: '% p.a.' },
      { id: 'tenure', label: 'Tenure (months)', default: 60 },
    ],
    calc: calcEMI,
  },
  sip: {
    name: 'SIP Calculator', desc: 'Systematic Investment Plan future value',
    icon: 'fa-seedling', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'monthly', label: 'Monthly Investment', default: 5000, prefix: '₹' },
      { id: 'return', label: 'Expected Return', default: 12, suffix: '% p.a.' },
      { id: 'years', label: 'Period', default: 10, suffix: 'years' },
    ],
    calc: calcSIP,
  },
  gst: {
    name: 'GST Calculator', desc: 'Add GST to net price — CGST, SGST & IGST split',
    icon: 'fa-file-invoice', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'net', label: 'Net Amount (Pre-GST)', default: 1000, prefix: '₹' },
    ],
    calc: calcGST,
  },
  pregst: {
    name: 'Pre-GST / Reverse GST', desc: 'Extract original price from GST-inclusive MRP',
    icon: 'fa-file-invoice-dollar', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'gross', label: 'GST-Inclusive Amount (MRP)', default: 1180, prefix: '₹' },
    ],
    calc: calcPreGST,
  },
  compoundinterest: {
    name: 'Compound Interest', desc: 'A = P(1 + r/n)^nt with full breakdown',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal', label: 'Principal', default: 100000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8, suffix: '%' },
      { id: 'time', label: 'Time Period', default: 5, suffix: 'years' },
    ],
    calc: calcCompoundInterest,
  },
  simpleinterest: {
    name: 'Simple Interest', desc: 'SI = PRT/100',
    icon: 'fa-coins', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal', label: 'Principal', default: 100000, prefix: '₹' },
      { id: 'rate', label: 'Rate', default: 6, suffix: '%' },
      { id: 'time', label: 'Time', default: 2, suffix: 'years' },
    ],
    calc: calcSimpleInterest,
  },
  incometax: {
    name: 'Income Tax Calculator', desc: 'New regime FY 2025-26 (India)',
    icon: 'fa-landmark', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'income', label: 'Annual Income', default: 1200000, prefix: '₹' },
    ],
    calc: calcIncomeTax,
  },
  roi: {
    name: 'ROI Calculator', desc: 'Return on Investment & CAGR',
    icon: 'fa-arrow-trend-up', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'initial', label: 'Initial Investment', default: 50000, prefix: '₹' },
      { id: 'final', label: 'Current Value', default: 75000, prefix: '₹' },
      { id: 'years', label: 'Period', default: 2, suffix: 'years' },
    ],
    calc: calcROI,
  },
  ppf: {
    name: 'PPF Calculator', desc: 'Public Provident Fund maturity',
    icon: 'fa-piggy-bank', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'contribution', label: 'Monthly Contribution', default: 5000, prefix: '₹' },
      { id: 'years', label: 'Period', default: 15, suffix: 'years' },
      { id: 'rate', label: 'Rate', default: 7.1, suffix: '%' },
    ],
    calc: calcPPF,
  },
  fd: {
    name: 'Fixed Deposit Calculator', desc: 'FD maturity with flexible compounding frequency',
    icon: 'fa-vault', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal', label: 'Principal', default: 100000, prefix: '₹' },
      { id: 'rate', label: 'Rate', default: 6.5, suffix: '%' },
      { id: 'years', label: 'Period', default: 5, suffix: 'years' },
      { id: 'compounding', label: 'Compounding Frequency', type: 'select', options: ['Quarterly', 'Monthly', 'Half-Yearly', 'Annually'] },
    ],
    calc: calcFD,
  },
  mortgage: {
    name: 'Mortgage Calculator', desc: 'Home loan monthly payment & amortization',
    icon: 'fa-house', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Loan Amount', default: 2500000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8.5, suffix: '%' },
      { id: 'term', label: 'Term', default: 20, suffix: 'years' },
    ],
    calc: calcMortgage,
  },
  carloan: {
    name: 'Car Loan EMI', desc: 'Vehicle loan monthly instalment',
    icon: 'fa-car', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Loan Amount', default: 800000, prefix: '₹' },
      { id: 'rate', label: 'Rate', default: 9, suffix: '%' },
      { id: 'tenure', label: 'Tenure', default: 5, suffix: 'years' },
    ],
    calc: calcCarLoan,
  },
  breakeven: {
    name: 'Break-Even Calculator', desc: 'Units & revenue needed to break even',
    icon: 'fa-scale-balanced', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'fixed', label: 'Fixed Costs', default: 100000, prefix: '₹' },
      { id: 'price', label: 'Selling Price/Unit', default: 500, prefix: '₹' },
      { id: 'variable', label: 'Variable Cost/Unit', default: 300, prefix: '₹' },
    ],
    calc: calcBreakeven,
  },
  inflation: {
    name: 'Inflation Calculator', desc: 'Future value with inflation erosion',
    icon: 'fa-fire-flame-curved', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Current Amount', default: 100000, prefix: '₹' },
      { id: 'rate', label: 'Inflation Rate', default: 6, suffix: '%' },
      { id: 'years', label: 'Years', default: 10 },
    ],
    calc: calcInflation,
  },
  swp: {
    name: 'SWP Calculator', desc: 'Systematic Withdrawal Plan — monthly income from corpus',
    icon: 'fa-money-bill-transfer', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'corpus', label: 'Total Corpus', default: 5000000, prefix: '₹' },
      { id: 'withdrawal', label: 'Monthly Withdrawal', default: 25000, prefix: '₹' },
      { id: 'return', label: 'Expected Return', default: 8, suffix: '% p.a.' },
    ],
    calc: calcSWP,
  },
  lumpsum: {
    name: 'Lumpsum Investment', desc: 'One-time investment future value with returns',
    icon: 'fa-sack-dollar', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Investment Amount', default: 100000, prefix: '₹' },
      { id: 'return', label: 'Expected Return', default: 12, suffix: '% p.a.' },
      { id: 'years', label: 'Period', default: 10, suffix: 'years' },
    ],
    calc: calcLumpsum,
  },
  nps: {
    name: 'NPS Calculator', desc: 'National Pension Scheme corpus & pension estimate',
    icon: 'fa-user-shield', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'monthly', label: 'Monthly Contribution', default: 5000, prefix: '₹' },
      { id: 'currentAge', label: 'Current Age', default: 30, suffix: 'years' },
      { id: 'retireAge', label: 'Retirement Age', default: 60, suffix: 'years' },
      { id: 'return', label: 'Expected Return', default: 10, suffix: '% p.a.' },
    ],
    calc: calcNPS,
  },
  gratuity: {
    name: 'Gratuity Calculator', desc: 'Employee gratuity & leave encashment as per Indian law',
    icon: 'fa-handshake', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'salary', label: 'Last Drawn Basic Salary', default: 50000, prefix: '₹' },
      { id: 'years', label: 'Years of Service', default: 10 },
      { id: 'leaveBalance', label: 'Leave Balance (for encashment)', default: 30, suffix: 'days' },
    ],
    calc: calcGratuity,
  },
  hra: {
    name: 'HRA Exemption Calculator', desc: 'House Rent Allowance tax exemption — Section 10(13A)',
    icon: 'fa-house-chimney', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'basic', label: 'Basic Salary', default: 50000, prefix: '₹', suffix: '/mo' },
      { id: 'hra', label: 'HRA Received', default: 20000, prefix: '₹', suffix: '/mo' },
      { id: 'rent', label: 'Actual Rent Paid', default: 18000, prefix: '₹', suffix: '/mo' },
    ],
    calc: calcHRA,
  },
  cagr: {
    name: 'CAGR Calculator', desc: 'Compound Annual Growth Rate — investments, revenue, portfolio',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'begin', label: 'Initial Value', default: 100000, prefix: '₹' },
      { id: 'end', label: 'Final Value', default: 250000, prefix: '₹' },
      { id: 'yrs', label: 'Number of Years', default: 5, suffix: 'years' },
    ],
    calc: calcCAGR,
  },
  creditcard: {
    name: 'Credit Card Interest Calculator', desc: 'True cost of minimum payments and revolving credit',
    icon: 'fa-credit-card', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'balance', label: 'Outstanding Balance', default: 50000, prefix: '₹' },
      { id: 'apr', label: 'Annual Interest Rate', default: 36, suffix: '% p.a.' },
      { id: 'minPct', label: 'Minimum Payment %', default: 5, suffix: '%' },
      { id: 'extra', label: 'Extra Monthly Payment', default: 0, prefix: '₹' },
    ],
    calc: calcCreditCard,
  },
  networth: {
    name: 'Net Worth Calculator', desc: 'Total assets minus liabilities',
    icon: 'fa-scale-unbalanced-flip', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'cash', label: 'Cash & Savings', default: 200000, prefix: '₹' },
      { id: 'investments', label: 'Investments & Stocks', default: 500000, prefix: '₹' },
      { id: 'property', label: 'Real Estate Value', default: 3000000, prefix: '₹' },
      { id: 'loans', label: 'Total Loans & Debt', default: 1500000, prefix: '₹' },
      { id: 'other', label: 'Other Assets', default: 100000, prefix: '₹' },
    ],
    calc: calcNetWorth,
  },
  tds: {
    name: 'TDS Calculator', desc: 'Tax Deducted at Source on salary & payments',
    icon: 'fa-percent', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Payment Amount', default: 100000, prefix: '₹' },
    ],
    calc: calcTDS,
  },
  epf: {
    name: 'EPF / PF Calculator', desc: 'Employee & Employer PF contribution & corpus',
    icon: 'fa-briefcase', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'basic', label: 'Basic Salary', default: 30000, prefix: '₹' },
      { id: 'years', label: 'Years of Service', default: 20 },
      { id: 'rate', label: 'EPF Interest Rate', default: 8.25, suffix: '%' },
    ],
    calc: calcEPF,
  },
  profitloss: {
    name: 'Profit & Loss Calculator', desc: 'Profit, loss, margin and markup percentage',
    icon: 'fa-arrow-trend-up', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'cost', label: 'Cost Price', default: 500, prefix: '₹' },
      { id: 'sell', label: 'Selling Price', default: 750, prefix: '₹' },
    ],
    calc: calcProfitLoss,
  },
  stockreturn: {
    name: 'Stock Return Calculator', desc: 'Shares P&L with brokerage & taxes (India)',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'buyPrice', label: 'Buy Price per Share', default: 500, prefix: '₹' },
      { id: 'sellPrice', label: 'Sell Price per Share', default: 650, prefix: '₹' },
      { id: 'qty', label: 'Quantity of Shares', default: 100 },
      { id: 'brokerage', label: 'Brokerage per Trade', default: 20, prefix: '₹' },
    ],
    calc: calcStockReturn,
  },
  mutualfundreturns: {
    name: 'Mutual Fund Returns (XIRR)', desc: 'Estimate fund return from NAV change',
    icon: 'fa-arrow-up-right-dots', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'buyNav', label: 'Buy NAV', default: 50, prefix: '₹' },
      { id: 'sellNav', label: 'Current NAV', default: 90, prefix: '₹' },
      { id: 'units', label: 'Units Held', default: 1000 },
      { id: 'years', label: 'Holding Period', default: 5, suffix: 'years' },
    ],
    calc: calcMutualFundReturns,
  },
  taxregime: {
    name: 'Old vs New Tax Regime', desc: 'Compare tax liability under both regimes for FY 2025-26',
    icon: 'fa-scale-balanced', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'income', label: 'Gross Annual Income', default: 1000000, prefix: '₹' },
      { id: 'hra_ex', label: 'HRA Exemption', default: 120000, prefix: '₹' },
      { id: 'sec80c', label: '80C Investments (max ₹1.5L)', default: 150000, prefix: '₹' },
      { id: 'nps', label: 'NPS (80CCD(1B), max ₹50K)', default: 50000, prefix: '₹' },
      { id: 'med', label: 'Medical Insurance 80D', default: 25000, prefix: '₹' },
      { id: 'hloan', label: 'Home Loan Interest (24B)', default: 200000, prefix: '₹' },
    ],
    calc: calcTaxRegime,
  },
  capitalgains: {
    name: 'Capital Gains Tax Calculator', desc: 'STCG & LTCG on stocks, mutual funds, property (India)',
    icon: 'fa-hand-holding-dollar', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'buyPrice', label: 'Purchase Price', default: 100000, prefix: '₹' },
      { id: 'sellPrice', label: 'Selling Price', default: 180000, prefix: '₹' },
      { id: 'holdMonths', label: 'Holding Period', default: 18, suffix: 'months' },
    ],
    calc: calcCapitalGains,
  },
  prepayment: {
    name: 'Home Loan Prepayment Savings', desc: 'Interest saved and tenure reduced by lump-sum prepayment',
    icon: 'fa-house-circle-check', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'outstanding', label: 'Outstanding Principal', default: 3000000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8.5, suffix: '% p.a.' },
      { id: 'rem', label: 'Remaining Tenure', default: 240, suffix: 'months' },
      { id: 'lump', label: 'Prepayment Amount', default: 500000, prefix: '₹' },
    ],
    calc: calcPrepayment,
  },
  stepupsip: {
    name: 'Step-Up SIP Calculator', desc: 'SIP with annual increment — see accelerated wealth creation',
    icon: 'fa-stairs', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'monthly', label: 'Initial Monthly SIP', default: 5000, prefix: '₹' },
      { id: 'stepup', label: 'Annual Step-Up %', default: 10, suffix: '% p.a.' },
      { id: 'ret', label: 'Expected Return', default: 12, suffix: '% p.a.' },
      { id: 'years', label: 'Investment Period', default: 15, suffix: 'years' },
    ],
    calc: calcStepUpSIP,
  },
  savingsgoal: {
    name: 'Savings Goal Planner', desc: 'How much to save monthly to reach your target amount',
    icon: 'fa-bullseye', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'goal', label: 'Target Amount', default: 1000000, prefix: '₹' },
      { id: 'current', label: 'Current Savings', default: 50000, prefix: '₹' },
      { id: 'ret', label: 'Expected Return', default: 8, suffix: '% p.a.' },
      { id: 'years', label: 'Time to Goal', default: 5, suffix: 'years' },
    ],
    calc: calcSavingsGoal,
  },
  dividendyield: {
    name: 'Dividend Yield Calculator', desc: 'Annual dividend yield, payout ratio and income from shares',
    icon: 'fa-coins', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'price', label: 'Stock Price', default: 500, prefix: '₹' },
      { id: 'dividend', label: 'Annual Dividend per Share', default: 15, prefix: '₹' },
      { id: 'shares', label: 'Number of Shares', default: 100 },
      { id: 'eps', label: 'EPS (for payout ratio)', default: 40, prefix: '₹' },
    ],
    calc: calcDividendYield,
  },
  goldinvestment: {
    name: 'Gold Investment Calculator', desc: 'Gold purchase value, returns and SIP in gold',
    icon: 'fa-trophy', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'grams', label: 'Gold Quantity', default: 10, suffix: 'grams' },
      { id: 'buyRate', label: 'Buy Price per 10g', default: 85000, prefix: '₹' },
      { id: 'currentRate', label: 'Current Price per 10g', default: 95000, prefix: '₹' },
      { id: 'making', label: 'Making Charges', default: 5, suffix: '%' },
    ],
    calc: calcGoldInvestment,
  },
  rd: {
    name: 'RD Calculator', desc: 'Recurring Deposit maturity value and interest earned',
    icon: 'fa-piggy-bank', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'monthly_rd', label: 'Monthly Deposit', default: 5000, prefix: '₹' },
      { id: 'rate_rd', label: 'Interest Rate', default: 6.5, suffix: '% p.a.' },
      { id: 'tenure_rd', label: 'Tenure', default: 24, suffix: 'months' },
    ],
    calc: calcRD,
  },
  xirr: {
    name: 'XIRR Calculator', desc: 'Extended IRR for irregular cash flows — SIPs, lump sums',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'invested', label: 'Total Amount Invested', default: 120000, prefix: '₹' },
      { id: 'currentVal', label: 'Current Portfolio Value', default: 185000, prefix: '₹' },
      { id: 'months_x', label: 'Investment Duration', default: 36, suffix: 'months' },
    ],
    calc: calcXIRR,
  },
  loaneligibility: {
    name: 'Loan Eligibility Calculator', desc: 'Maximum loan amount based on your income and obligations',
    icon: 'fa-hand-holding-dollar', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'income_le', label: 'Monthly Net Income', default: 80000, prefix: '₹' },
      { id: 'existing_emi', label: 'Existing Monthly EMIs', default: 10000, prefix: '₹' },
      { id: 'rate_le', label: 'Expected Interest Rate', default: 8.5, suffix: '% p.a.' },
      { id: 'tenure_le', label: 'Loan Tenure', default: 240, suffix: 'months' },
    ],
    calc: calcLoanEligibility,
  },
  balancetransfer: {
    name: 'Home Loan Balance Transfer', desc: 'Interest saved by transferring your loan to a lower rate',
    icon: 'fa-right-left', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'outstanding_bt', label: 'Outstanding Principal', default: 3000000, prefix: '₹' },
      { id: 'currentRate', label: 'Current Interest Rate', default: 9.5, suffix: '% p.a.' },
      { id: 'newRate', label: 'New Bank Rate', default: 8.5, suffix: '% p.a.' },
      { id: 'remaining_bt', label: 'Remaining Tenure', default: 180, suffix: 'months' },
      { id: 'processingFee', label: 'Processing Fee', default: 15000, prefix: '₹' },
    ],
    calc: calcBalanceTransfer,
  },
  ssy: {
    name: 'Sukanya Samriddhi Yojana (SSY)', desc: 'SSY maturity amount for girl child savings scheme',
    icon: 'fa-child', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'annual_ssy', label: 'Annual Deposit', default: 50000, prefix: '₹' },
      { id: 'girlAge', label: 'Girl Child\'s Current Age', default: 5, suffix: 'years' },
      { id: 'rate_ssy', label: 'Interest Rate', default: 8.2, suffix: '% p.a.' },
    ],
    calc: calcSSY,
  },
  scss: {
    name: 'SCSS Calculator', desc: 'Senior Citizens Savings Scheme quarterly interest and maturity',
    icon: 'fa-user-tie', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal_scss', label: 'Deposit Amount (max ₹30L)', default: 1000000, prefix: '₹' },
      { id: 'rate_scss', label: 'Interest Rate', default: 8.2, suffix: '% p.a.' },
    ],
    calc: calcSCSS,
  },
  advancetax: {
    name: 'Advance Tax Calculator', desc: 'Quarterly advance tax installment schedule for FY 2025-26',
    icon: 'fa-calendar-check', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'income', label: 'Total Annual Income', default: 1500000, prefix: '₹' },
      { id: 'tds', label: 'TDS Already Deducted', default: 80000, prefix: '₹' },
    ],
    calc: calcAdvanceTax,
  },
  inhandsalary: {
    name: 'In-Hand Salary Calculator', desc: 'Take-home pay after PF, tax & deductions',
    icon: 'fa-hand-holding-dollar', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'ctc', label: 'Monthly CTC / Gross', default: 100000, prefix: '₹' },
      { id: 'basic_pct', label: 'Basic Salary %', default: 40, suffix: '%' },
      { id: 'hra_pct', label: 'HRA %', default: 50, suffix: '% of Basic' },
      { id: 'pf_pct', label: 'PF Contribution %', default: 12, suffix: '% of Basic' },
      { id: 'ptax', label: 'Professional Tax', default: 200, prefix: '₹' },
      { id: 'other_ded', label: 'Other Deductions', default: 0, prefix: '₹' },
    ],
    calc: calcInhandSalary,
  },
  ctcbreakup: {
    name: 'CTC to In-Hand Breakdown', desc: 'Full CTC structure with all components decoded',
    icon: 'fa-receipt', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'annual_ctc', label: 'Annual CTC', default: 1200000, prefix: '₹' },
      { id: 'basic_pct', label: 'Basic %', default: 40, suffix: '% of CTC' },
      { id: 'hra_pct', label: 'HRA %', default: 50, suffix: '% of Basic' },
      { id: 'bonus_pct', label: 'Variable/Bonus %', default: 10, suffix: '% of CTC' },
    ],
    calc: calcCtcBreakup,
  },
  salarycomparison: {
    name: 'Salary Comparison', desc: 'Compare old vs new job offer — CTC, in-hand & growth',
    icon: 'fa-code-compare', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'old_ctc', label: 'Current CTC (Annual)', default: 1000000, prefix: '₹' },
      { id: 'new_ctc', label: 'New Offer CTC (Annual)', default: 1400000, prefix: '₹' },
      { id: 'old_bonus', label: 'Current Bonus %', default: 10, suffix: '%' },
      { id: 'new_bonus', label: 'New Bonus %', default: 15, suffix: '%' },
      { id: 'old_pf', label: 'Current PF (Employer Annual)', default: 21600, prefix: '₹' },
      { id: 'new_pf', label: 'New PF (Employer Annual)', default: 21600, prefix: '₹' },
      { id: 'relocation', label: 'Relocation/Joining Bonus', default: 0, prefix: '₹' },
    ],
    calc: calcSalaryComparison,
  },
  goalsip: {
    name: 'Goal-Based SIP Calculator', desc: 'Monthly SIP needed to reach your financial goal',
    icon: 'fa-bullseye', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'goal', label: 'Target Amount', default: 5000000, prefix: '₹' },
      { id: 'years', label: 'Time Horizon', default: 10, suffix: 'years' },
      { id: 'rate', label: 'Expected Return', default: 12, suffix: '% p.a.' },
      { id: 'existing', label: 'Existing Corpus', default: 0, prefix: '₹' },
    ],
    calc: calcGoalSIP,
  },
  elssreturns: {
    name: 'ELSS Tax Saver Returns', desc: 'ELSS mutual fund returns with 80C tax savings',
    icon: 'fa-leaf', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'monthly', label: 'Monthly SIP', default: 12500, prefix: '₹' },
      { id: 'years', label: 'Investment Period', default: 10, suffix: 'years' },
      { id: 'rate', label: 'Expected ELSS Return', default: 14, suffix: '% p.a.' },
    ],
    calc: calcElssReturns,
  },
  nsc: {
    name: 'NSC Calculator', desc: 'National Savings Certificate maturity & tax benefit',
    icon: 'fa-stamp', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Investment Amount', default: 100000, prefix: '₹' },
      { id: 'rate', label: 'NSC Interest Rate', default: 7.7, suffix: '% p.a.' },
      { id: 'tenure', label: 'Tenure', default: 5, suffix: 'years' },
    ],
    calc: calcNSC,
  },
  apy: {
    name: 'APY Calculator', desc: 'Atal Pension Yojana — monthly contribution & pension estimate',
    icon: 'fa-umbrella', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'age', label: 'Current Age', default: 25, suffix: 'years' },
    ],
    calc: calcAPY,
  },
  brokerage: {
    name: 'Stock Brokerage & Tax Calculator', desc: 'Total trading cost — brokerage, STT, GST & stamp duty',
    icon: 'fa-chart-candlestick', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'buy_price', label: 'Buy Price', default: 500, prefix: '₹' },
      { id: 'sell_price', label: 'Sell Price', default: 550, prefix: '₹' },
      { id: 'qty', label: 'Quantity', default: 100 },
    ],
    calc: calcBrokerage,
  },
  taxsaving: {
    name: 'Tax Saving Optimizer', desc: 'Optimize ₹1.5L deduction across 80C, 80D, 80CCD',
    icon: 'fa-piggy-bank', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'income', label: 'Taxable Income', default: 1500000, prefix: '₹' },
      { id: 'epf', label: 'EPF (Employee)', default: 21600, prefix: '₹' },
      { id: 'ppf', label: 'PPF', default: 0, prefix: '₹' },
      { id: 'elss', label: 'ELSS Mutual Funds', default: 50000, prefix: '₹' },
      { id: 'lic', label: 'LIC / Insurance Premium', default: 25000, prefix: '₹' },
      { id: 'nps80ccd', label: 'NPS 80CCD(1B)', default: 50000, prefix: '₹' },
      { id: 'med80d', label: 'Medical Insurance 80D', default: 25000, prefix: '₹' },
      { id: 'hloan', label: 'Home Loan Interest (24B)', default: 0, prefix: '₹' },
    ],
    calc: calcTaxSaving,
  },
  retirementcorpus: {
    name: 'Retirement Corpus Calculator', desc: 'How much you need to retire comfortably',
    icon: 'fa-person-cane', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'age', label: 'Current Age', default: 30, suffix: 'years' },
      { id: 'retire_age', label: 'Retirement Age', default: 60, suffix: 'years' },
      { id: 'life_exp', label: 'Life Expectancy', default: 85, suffix: 'years' },
      { id: 'monthly_exp', label: 'Current Monthly Expenses', default: 50000, prefix: '₹' },
      { id: 'inflation', label: 'Inflation Rate', default: 6, suffix: '%' },
      { id: 'return_pre', label: 'Pre-Retirement Return', default: 12, suffix: '%' },
      { id: 'return_post', label: 'Post-Retirement Return', default: 7, suffix: '%' },
      { id: 'existing', label: 'Current Savings', default: 500000, prefix: '₹' },
    ],
    calc: calcRetirementCorpus,
  },
  salaryhike: {
    name: 'Salary Hike Calculator', desc: 'New salary after hike — monthly increase, annual gain & real value',
    icon: 'fa-arrow-trend-up', cat: 'finance' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'currentSalary', label: 'Current Monthly Salary', default: 50000, prefix: '₹' },
      { id: 'hikePercent', label: 'Hike Percentage', default: 15, suffix: '%' },
      { id: 'currentCTC', label: 'Current Annual CTC', default: 600000, prefix: '₹' },
      { id: 'inflation', label: 'Inflation Rate', default: 6, suffix: '%' },
    ],
    calc: calcSalaryHike,
  },
  bmi: {
    name: 'BMI Calculator', desc: 'Body Mass Index with category & ideal weight',
    icon: 'fa-weight-scale', cat: 'health' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'weight', label: 'Weight', default: 70, suffix: 'kg' },
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcBMI,
  },
  bmr: {
    name: 'BMR Calculator', desc: 'Basal Metabolic Rate (Mifflin-St Jeor)',
    icon: 'fa-fire', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight', label: 'Weight', default: 70, suffix: 'kg' },
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
      { id: 'age', label: 'Age', default: 30, suffix: 'years' },
    ],
    calc: calcBMR,
  },
  tdee: {
    name: 'TDEE Calculator', desc: 'Total Daily Energy Expenditure',
    icon: 'fa-bolt', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight', label: 'Weight', default: 70, suffix: 'kg' },
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
      { id: 'age', label: 'Age', default: 30, suffix: 'years' },
    ],
    calc: calcTDEE,
  },
  water: {
    name: 'Water Intake Calculator', desc: 'Daily hydration requirement',
    icon: 'fa-droplet', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight', label: 'Weight', default: 70, suffix: 'kg' },
    ],
    calc: calcWater,
  },
  heartrate: {
    name: 'Heart Rate Zones', desc: 'Target heart rate for every fitness zone',
    icon: 'fa-heart-pulse', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'age', label: 'Age', default: 30, suffix: 'years' },
      { id: 'resting', label: 'Resting HR', default: 65, suffix: 'bpm' },
    ],
    calc: calcHeartRate,
  },
  age: {
    name: 'Age Calculator', desc: 'Exact age in years, months, days & more',
    icon: 'fa-birthday-cake', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date' },
    ],
    calc: calcAge,
  },
  calories: {
    name: 'Calories Burned Calculator', desc: 'Calories burned during exercise',
    icon: 'fa-person-running', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight', label: 'Weight', default: 70, suffix: 'kg' },
      { id: 'duration', label: 'Duration', default: 30, suffix: 'min' },
    ],
    calc: calcCalories,
  },
  sleep: {
    name: 'Sleep Calculator', desc: 'Optimal bedtimes based on sleep cycles',
    icon: 'fa-moon', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'wake', label: 'Wake-Up Time', default: '07:00', type: 'time' },
    ],
    calc: calcSleep,
  },
  macros: {
    name: 'Macro Calculator', desc: 'Daily protein, carbs & fat targets',
    icon: 'fa-chart-pie', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'calories', label: 'Daily Calories', default: 2000, suffix: 'kcal' },
    ],
    calc: calcMacros,
  },
  pregnancy: {
    name: 'Pregnancy Due Date', desc: 'EDD and trimester tracker',
    icon: 'fa-baby', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'lmp', label: 'First Day of Last Period', type: 'date' },
    ],
    calc: calcPregnancy,
  },
  idealweight: {
    name: 'Ideal Weight Calculator', desc: 'Multiple formula ideal body weight',
    icon: 'fa-weight-hanging', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcIdealWeight,
  },
  ovulation: {
    name: 'Ovulation & Fertile Window', desc: 'Estimate peak fertile days based on cycle length',
    icon: 'fa-calendar-heart', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'lastPeriod', label: 'First Day of Last Period', type: 'date' },
      { id: 'cycleLen', label: 'Cycle Length', default: 28, suffix: 'days' },
      { id: 'luteal', label: 'Luteal Phase Length', default: 14, suffix: 'days' },
    ],
    calc: calcOvulation,
  },
  bloodpressure: {
    name: 'Blood Pressure Classifier', desc: 'Classify your BP reading and understand the risk level',
    icon: 'fa-heart-pulse', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'systolic', label: 'Systolic Pressure (upper)', default: 120, suffix: 'mmHg' },
      { id: 'diastolic', label: 'Diastolic Pressure (lower)', default: 80, suffix: 'mmHg' },
      { id: 'age_bp', label: 'Your Age', default: 35, suffix: 'years' },
    ],
    calc: calcBloodPressure,
  },
  alcohol: {
    name: 'BAC Calculator', desc: 'Blood Alcohol Content estimator',
    icon: 'fa-wine-glass', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'drinks', label: 'Standard Drinks Consumed', default: 3 },
      { id: 'weight', label: 'Body Weight', default: 70, suffix: 'kg' },
    ],
    calc: calcAlcohol,
  },
  waisthip: {
    name: 'Waist-to-Hip Ratio', desc: 'Cardiovascular risk indicator',
    icon: 'fa-ruler-horizontal', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'waist', label: 'Waist Circumference', default: 80, suffix: 'cm' },
      { id: 'hip', label: 'Hip Circumference', default: 96, suffix: 'cm' },
    ],
    calc: calcWaistHip,
  },
  ibw: {
    name: 'IBW — Ideal Body Weight', desc: 'Target weight by height using clinical formulas',
    icon: 'fa-user-check', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcIBW,
  },
  vitamins: {
    name: 'Vitamin D Deficiency Check', desc: 'Estimated Vitamin D level & supplementation',
    icon: 'fa-sun', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'sunExposure', label: 'Daily Sun Exposure', type: 'select', options: ['None (<5 min)', 'Low (5-15 min)', 'Moderate (15-30 min)', 'Good (30+ min)'] },
      { id: 'skinTone', label: 'Skin Tone', type: 'select', options: ['Very Fair', 'Fair', 'Medium', 'Dark', 'Very Dark'] },
      { id: 'age', label: 'Age', default: 30, suffix: 'years' },
    ],
    calc: calcVitamins,
  },
  lungcapacity: {
    name: 'Lung Capacity (FVC) Estimator', desc: 'Forced Vital Capacity prediction',
    icon: 'fa-lungs', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
      { id: 'age', label: 'Age', default: 35, suffix: 'years' },
    ],
    calc: calcLungCapacity,
  },
  bodyfat: {
    name: 'Body Fat % Calculator (Navy Method)', desc: 'Estimate body fat percentage using measurements',
    icon: 'fa-person', cat: 'health' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'weight_bf', label: 'Weight', default: 70, suffix: 'kg' },
    ],
    calc: calcBodyFat,
  },
  proteinintake: {
    name: 'Protein Intake Calculator', desc: 'Daily protein requirement based on weight, activity and goal',
    icon: 'fa-dumbbell', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight_p', label: 'Body Weight', default: 70, suffix: 'kg' },
    ],
    calc: calcProteinIntake,
  },
  smokingcost: {
    name: 'Smoking Cost Calculator', desc: 'Money wasted on cigarettes and health risk assessment',
    icon: 'fa-ban-smoking', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'cigsPerDay', label: 'Cigarettes Per Day', default: 10 },
      { id: 'packPrice', label: 'Price per Pack (20 cigs)', default: 250, prefix: '₹' },
      { id: 'yearsSmoked', label: 'Years Smoking', default: 5, suffix: 'years' },
    ],
    calc: calcSmokingCost,
  },
  childheight: {
    name: 'Child Adult Height Predictor', desc: 'Predict child\'s adult height from parents\' heights',
    icon: 'fa-child-reaching', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'fatherH', label: 'Father\'s Height', default: 175, suffix: 'cm' },
      { id: 'motherH', label: 'Mother\'s Height', default: 162, suffix: 'cm' },
    ],
    calc: calcChildHeight,
  },
  diabetesrisk: {
    name: 'Diabetes Risk Score', desc: 'ADA-based type 2 diabetes risk assessment',
    icon: 'fa-droplet', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'age_d', label: 'Age', default: 40, suffix: 'years' },
      { id: 'bmi_d', label: 'BMI', default: 26, suffix: 'kg/m²' },
      { id: 'waist_d', label: 'Waist Circumference', default: 88, suffix: 'cm' },
    ],
    calc: calcDiabetesRisk,
  },
  sleepdebt: {
    name: 'Sleep Debt Calculator', desc: 'Cumulative sleep deficit and recovery plan',
    icon: 'fa-moon', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'needed', label: 'Hours Needed per Night', default: 8, suffix: 'hrs' },
      { id: 'actual', label: 'Average Hours You Sleep', default: 6.5, suffix: 'hrs' },
      { id: 'days', label: 'Days of Deficit', default: 7, suffix: 'days' },
    ],
    calc: calcSleepDebt,
  },
  anemia: {
    name: 'Anemia Risk Checker', desc: 'Hemoglobin level interpretation and severity classification',
    icon: 'fa-syringe', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'hb', label: 'Hemoglobin Level', default: 12, suffix: 'g/dL' },
    ],
    calc: calcAnemia,
  },
  bsa: {
    name: 'Body Surface Area Calculator', desc: 'BSA using Mosteller & DuBois formulas (used in drug dosing)',
    icon: 'fa-person-dots-from-line', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight_bsa', label: 'Weight', default: 70, suffix: 'kg' },
      { id: 'height_bsa', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcBSA,
  },
  cholesterolratio: {
    name: 'Cholesterol Ratio Calculator', desc: 'Total/HDL ratio, LDL/HDL ratio & cardiovascular risk',
    icon: 'fa-heart-circle-check', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'total', label: 'Total Cholesterol', default: 200, suffix: 'mg/dL' },
      { id: 'hdl', label: 'HDL (Good Cholesterol)', default: 55, suffix: 'mg/dL' },
      { id: 'ldl', label: 'LDL (Bad Cholesterol)', default: 120, suffix: 'mg/dL' },
      { id: 'triglycerides', label: 'Triglycerides', default: 150, suffix: 'mg/dL' },
    ],
    calc: calcCholesterolRatio,
  },
  caloriedeficit: {
    name: 'Calorie Deficit Calculator', desc: 'Daily calories & timeline to reach your goal weight',
    icon: 'fa-weight-scale', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight', label: 'Current Weight', default: 85, suffix: 'kg' },
      { id: 'goal_weight', label: 'Goal Weight', default: 72, suffix: 'kg' },
      { id: 'height', label: 'Height', default: 175, suffix: 'cm' },
      { id: 'age', label: 'Age', default: 30, suffix: 'years' },
    ],
    calc: calcCalorieDeficit,
  },
  length: {
    name: 'Length Converter', desc: 'cm, m, km, inch, ft, mile, yard',
    icon: 'fa-ruler', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcLength,
  },
  weight: {
    name: 'Weight Converter', desc: 'kg, g, lb, oz, stone, tonne',
    icon: 'fa-weight-hanging', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcWeight,
  },
  temperature: {
    name: 'Temperature Converter', desc: '°C, °F, K, Rankine',
    icon: 'fa-temperature-half', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Temperature', default: 100 },
    ],
    calc: calcTemperature,
  },
  area: {
    name: 'Area Converter', desc: 'm², km², acres, hectares, sq ft',
    icon: 'fa-vector-square', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcArea,
  },
  speed: {
    name: 'Speed Converter', desc: 'km/h, mph, m/s, knots',
    icon: 'fa-gauge-high', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 100 },
    ],
    calc: calcSpeed,
  },
  currency: {
    name: 'Currency Converter (INR Base)', desc: 'Approximate conversions (not live)',
    icon: 'fa-indian-rupee-sign', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Amount', default: 1000 },
    ],
    calc: calcCurrency,
  },
  volume: {
    name: 'Volume Converter', desc: 'Liters, gallons, ml, cubic units',
    icon: 'fa-flask', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcVolume,
  },
  data: {
    name: 'Data Storage Converter', desc: 'Bits, bytes, KB, MB, GB, TB',
    icon: 'fa-hard-drive', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcData,
  },
  pressure: {
    name: 'Pressure Converter', desc: 'Pa, bar, psi, atm, mmHg, kPa',
    icon: 'fa-compress', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcPressure,
  },
  energy: {
    name: 'Energy Converter', desc: 'Joules, kWh, calories, BTU, eV',
    icon: 'fa-bolt', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 1 },
    ],
    calc: calcEnergy,
  },
  angle: {
    name: 'Angle Converter', desc: 'Degrees, radians, gradians, turns',
    icon: 'fa-drafting-compass', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 180 },
    ],
    calc: calcAngle,
  },
  dateiff: {
    name: 'Date Difference', desc: 'Days, weeks, months between two dates',
    icon: 'fa-calendar-days', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'd1', label: 'Start Date', type: 'date' },
      { id: 'd2', label: 'End Date', type: 'date' },
    ],
    calc: calcDateDiff,
  },
  timeconv: {
    name: 'Time Unit Converter', desc: 'Seconds, minutes, hours, days, weeks',
    icon: 'fa-clock', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Value', default: 3600 },
    ],
    calc: calcTimeConv,
  },
  countdown: {
    name: 'Event Countdown', desc: 'Days, hours, minutes until your event',
    icon: 'fa-hourglass-half', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'event', label: 'Event Date & Time', type: 'datetime-local' },
    ],
    calc: calcCountdown,
  },
  timezone: {
    name: 'Time Zone Converter', desc: 'Convert time across global time zones',
    icon: 'fa-globe', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'time', label: 'Your Local Time', default: '12:00', type: 'time' },
      { id: 'offset', label: 'Target UTC Offset', default: 0, suffix: 'hrs' },
    ],
    calc: calcTimezone,
  },
  workingdays: {
    name: 'Working Days Calculator', desc: 'Business days between dates (excl. weekends)',
    icon: 'fa-calendar-check', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'd1', label: 'Start Date', type: 'date' },
      { id: 'd2', label: 'End Date', type: 'date' },
      { id: 'holidays', label: 'Public Holidays to Exclude', default: 0 },
    ],
    calc: calcWorkingDays,
  },
  agenextbday: {
    name: 'Next Birthday Calculator', desc: 'Days until next birthday & age you\'ll turn',
    icon: 'fa-cake-candles', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date' },
    ],
    calc: calcAgeNextBday,
  },
  ohmslaw: {
    name: 'Ohm\'s Law Calculator', desc: 'V=IR — solve for any variable',
    icon: 'fa-bolt-lightning', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'v', label: 'Voltage (V) — 0 to solve', default: 12, suffix: 'V' },
      { id: 'i', label: 'Current (I) — 0 to solve', default: 2, suffix: 'A' },
      { id: 'r', label: 'Resistance (R) — 0 to solve', default: 0, suffix: 'Ω' },
    ],
    calc: calcOhmsLaw,
  },
  resistor: {
    name: 'Resistor Color Code', desc: 'Decode 4-band resistor colors',
    icon: 'fa-microchip', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'b1', label: 'Band 1 (1st digit)', type: 'select', options: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White'] },
      { id: 'b2', label: 'Band 2 (2nd digit)', type: 'select', options: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White'] },
      { id: 'mult', label: 'Band 3 (Multiplier)', type: 'select', options: ['×1', '×10', '×100', '×1K', '×10K', '×100K', '×1M', '×0.1', '×0.01'] },
      { id: 'tol', label: 'Band 4 (Tolerance)', type: 'select', options: ['±1% (Brown)', '±2% (Red)', '±5% (Gold)', '±10% (Silver)', '±20% (None)'] },
    ],
    calc: calcResistor,
  },
  power: {
    name: 'Power Calculator', desc: 'Electrical power, current, voltage',
    icon: 'fa-plug-circle-bolt', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'power', label: 'Power', default: 1000, suffix: 'W' },
      { id: 'voltage', label: 'Voltage', default: 230, suffix: 'V' },
    ],
    calc: calcPower,
  },
  pythagorean: {
    name: 'Pythagorean Theorem', desc: 'Find hypotenuse or missing side',
    icon: 'fa-triangle-exclamation', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'a', label: 'Side A (0 to solve)', default: 3 },
      { id: 'b', label: 'Side B (0 to solve)', default: 4 },
      { id: 'c', label: 'Hypotenuse C (0 to solve)', default: 0 },
    ],
    calc: calcPythagorean,
  },
  ledresistor: {
    name: 'LED Resistor Calculator', desc: 'Calculate resistor value to safely drive an LED',
    icon: 'fa-lightbulb', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'vsupply', label: 'Supply Voltage', default: 5, suffix: 'V' },
      { id: 'vled', label: 'LED Forward Voltage', default: 2, suffix: 'V' },
      { id: 'iled', label: 'LED Forward Current', default: 20, suffix: 'mA' },
    ],
    calc: calcLedResistor,
  },
  voltdivider: {
    name: 'Voltage Divider Calculator', desc: 'Output voltage and current from a resistor voltage divider',
    icon: 'fa-bolt-lightning', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'vin_vd', label: 'Input Voltage (Vin)', default: 12, suffix: 'V' },
      { id: 'r1_vd', label: 'R1 (top resistor)', default: 10000, suffix: 'Ω' },
      { id: 'r2_vd', label: 'R2 (bottom resistor)', default: 5600, suffix: 'Ω' },
    ],
    calc: calcVoltDivider,
  },
  batterylife: {
    name: 'Battery Life Calculator', desc: 'Estimate how long a battery will last for a device',
    icon: 'fa-battery-half', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'capacity_mah', label: 'Battery Capacity', default: 3000, suffix: 'mAh' },
      { id: 'current_draw', label: 'Device Current Draw', default: 150, suffix: 'mA' },
      { id: 'efficiency', label: 'Circuit Efficiency', default: 85, suffix: '%' },
    ],
    calc: calcBatteryLife,
  },
  pcbtrace: {
    name: 'PCB Trace Width Calculator', desc: 'Minimum trace width for a given current (IPC-2221)',
    icon: 'fa-microchip', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'current_pcb', label: 'Maximum Current', default: 1, suffix: 'A' },
      { id: 'temp_rise', label: 'Allowable Temp Rise', default: 10, suffix: '°C' },
      { id: 'thickness_pcb', label: 'Copper Thickness', default: 1, suffix: 'oz (35µm)' },
      { id: 'layer', label: 'Layer Type', type: 'select', options: ['External (outer)', 'Internal (inner)'] },
    ],
    calc: calcPcbTrace,
  },
  decibel: {
    name: 'Decibel (dB) Calculator', desc: 'Convert between dB and power/voltage ratios',
    icon: 'fa-volume-high', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'db_val', label: 'Decibel Value', default: 20, suffix: 'dB' },
      { id: 'reference', label: 'Reference Type', type: 'select', options: ['Power (10·log₁₀)', 'Voltage (20·log₁₀)'] },
    ],
    calc: calcDecibel,
  },
  antennalen: {
    name: 'Antenna Length Calculator', desc: 'Dipole, quarter-wave and Yagi antenna lengths',
    icon: 'fa-tower-broadcast', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'freq_mhz', label: 'Frequency', default: 433, suffix: 'MHz' },
      { id: 'vel_factor', label: 'Velocity Factor', default: 0.95, suffix: '(0.66–1.0)' },
    ],
    calc: calcAntennaLen,
  },
  torque: {
    name: 'Torque Calculator', desc: 'Torque, force, arm length and angular conversions',
    icon: 'fa-rotate', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'force_t', label: 'Force', default: 100, suffix: 'N' },
      { id: 'arm_t', label: 'Moment Arm Length', default: 0.5, suffix: 'm' },
      { id: 'angle_t', label: 'Angle between F and arm', default: 90, suffix: '°' },
    ],
    calc: calcTorque,
  },
  tip: {
    name: 'Tip Calculator', desc: 'Split bill with tip among friends',
    icon: 'fa-hand-holding-dollar', cat: 'everyday' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'bill', label: 'Total Bill', default: 1200, prefix: '₹' },
      { id: 'tip', label: 'Tip %', default: 15, suffix: '%' },
      { id: 'people', label: 'Number of People', default: 4 },
    ],
    calc: calcTip,
  },
  discount: {
    name: 'Discount Calculator', desc: 'Sale price, savings & discount %',
    icon: 'fa-tag', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'original', label: 'Original Price', default: 2000, prefix: '₹' },
      { id: 'discount', label: 'Discount', default: 30, suffix: '%' },
    ],
    calc: calcDiscount,
  },
  fuel: {
    name: 'Fuel Cost Calculator', desc: 'Trip cost, mileage & efficiency',
    icon: 'fa-gas-pump', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'distance', label: 'Distance', default: 100, suffix: 'km' },
      { id: 'efficiency', label: 'Fuel Efficiency', default: 15, suffix: 'km/L' },
      { id: 'price', label: 'Fuel Price', default: 103, prefix: '₹', suffix: '/L' },
    ],
    calc: calcFuel,
  },
  salary: {
    name: 'Salary Calculator', desc: 'Monthly, weekly & daily from CTC',
    icon: 'fa-money-bill-wave', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'ctc', label: 'Annual CTC', default: 1200000, prefix: '₹' },
      { id: 'pf', label: 'PF Deduction', default: 21600, prefix: '₹' },
      { id: 'tax', label: 'Estimated Annual Tax', default: 80000, prefix: '₹' },
    ],
    calc: calcSalary,
  },
  emi2: {
    name: 'EMI Eligibility', desc: 'Max loan you can get based on income',
    icon: 'fa-circle-check', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'income', label: 'Monthly Income', default: 80000, prefix: '₹' },
      { id: 'obligations', label: 'Existing EMIs', default: 5000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 9, suffix: '%' },
      { id: 'tenure', label: 'Tenure', default: 240, suffix: 'months' },
    ],
    calc: calcEmi2,
  },
  grade: {
    name: 'Grade / GPA Calculator', desc: 'Percentage to grade & GPA conversion',
    icon: 'fa-graduation-cap', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'pct', label: 'Percentage', default: 78, suffix: '%' },
    ],
    calc: calcGrade,
  },
  electricbill: {
    name: 'Electricity Bill Estimator', desc: 'Monthly electricity cost by appliance',
    icon: 'fa-lightbulb', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'watts', label: 'Appliance Wattage', default: 1500, suffix: 'W' },
      { id: 'hours', label: 'Daily Usage', default: 5, suffix: 'hrs' },
      { id: 'rate', label: 'Rate per Unit', default: 7, prefix: '₹', suffix: '/kWh' },
    ],
    calc: calcElectricBill,
  },
  loanaffordability: {
    name: 'Loan Affordability', desc: 'Max home price based on income & down payment',
    icon: 'fa-house-flag', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'income', label: 'Gross Monthly Income', default: 100000, prefix: '₹' },
      { id: 'down', label: 'Down Payment Available', default: 500000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8.5, suffix: '%' },
      { id: 'term', label: 'Loan Term', default: 20, suffix: 'years' },
    ],
    calc: calcLoanAffordability,
  },
  caloriesfood: {
    name: 'Food Calorie Tracker', desc: 'Calories from protein, carbs & fat intake',
    icon: 'fa-utensils', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'protein', label: 'Protein', default: 50, suffix: 'g' },
      { id: 'carbs', label: 'Carbohydrates', default: 200, suffix: 'g' },
      { id: 'fat', label: 'Fat', default: 65, suffix: 'g' },
      { id: 'fiber', label: 'Dietary Fiber', default: 25, suffix: 'g' },
    ],
    calc: calcCaloriesFood,
  },
  wiresize: {
    name: 'Wire / Cable Size Calculator', desc: 'Recommended wire gauge for current load',
    icon: 'fa-plug', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'current', label: 'Current Load', default: 15, suffix: 'A' },
      { id: 'length', label: 'Cable Run (one-way)', default: 20, suffix: 'm' },
      { id: 'voltage', label: 'System Voltage', default: 230, suffix: 'V' },
      { id: 'drop', label: 'Acceptable Voltage Drop', default: 3, suffix: '%' },
    ],
    calc: calcWireSize,
  },
  pixelresolution: {
    name: 'Image / Pixel Size Calculator', desc: 'Megapixels, file size & print dimensions',
    icon: 'fa-image', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'width', label: 'Width', default: 4000, suffix: 'px' },
      { id: 'height', label: 'Height', default: 3000, suffix: 'px' },
    ],
    calc: calcPixelResolution,
  },
  typing_speed: {
    name: 'Reading / Typing Time', desc: 'Time to read or type a given word count',
    icon: 'fa-keyboard', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'words', label: 'Word Count', default: 1000 },
      { id: 'wpm', label: 'Your WPM', default: 200, suffix: 'wpm' },
      { id: 'typingWpm', label: 'Typing WPM', default: 40, suffix: 'wpm' },
    ],
    calc: calcTypingSpeed,
  },
  emi_extra: {
    name: 'Extra EMI Prepayment Benefit', desc: 'Interest saved by paying extra EMI',
    icon: 'fa-piggy-bank', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'outstanding', label: 'Outstanding Principal', default: 2000000, prefix: '₹' },
      { id: 'rate', label: 'Interest Rate', default: 8.5, suffix: '%' },
      { id: 'remaining', label: 'Remaining Tenure', default: 180, suffix: 'months' },
      { id: 'extra', label: 'Extra Monthly Payment', default: 5000, prefix: '₹' },
    ],
    calc: calcEmiExtra,
  },
  investVsRent: {
    name: 'Rent vs Buy Calculator', desc: 'Is buying or renting more financially sensible?',
    icon: 'fa-house-circle-xmark', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'propValue', label: 'Property Value', default: 5000000, prefix: '₹' },
      { id: 'rent', label: 'Monthly Rent', default: 20000, prefix: '₹' },
      { id: 'emi', label: 'Estimated Monthly EMI', default: 40000, prefix: '₹' },
      { id: 'years', label: 'Holding Period', default: 10, suffix: 'years' },
      { id: 'appreciation', label: 'Property Appreciation', default: 6, suffix: '% p.a.' },
    ],
    calc: calcInvestVsRent,
  },
  unitPrice: {
    name: 'Unit Price / Value Comparator', desc: 'Which pack offers the best value per unit?',
    icon: 'fa-scale-balanced', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'price1', label: 'Price of Item A', default: 99, prefix: '₹' },
      { id: 'qty1', label: 'Quantity of Item A', default: 500, suffix: 'g' },
      { id: 'price2', label: 'Price of Item B', default: 175, prefix: '₹' },
      { id: 'qty2', label: 'Quantity of Item B', default: 1000, suffix: 'g' },
    ],
    calc: calcUnitPrice,
  },
  petrolParity: {
    name: 'Petrol vs EV Cost Calculator', desc: 'Annual running cost — ICE vs Electric vehicle',
    icon: 'fa-car-battery', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'kmPerYear', label: 'Annual Distance', default: 15000, suffix: 'km' },
      { id: 'petrolMileage', label: 'Petrol Mileage', default: 15, suffix: 'km/L' },
      { id: 'petrolPrice', label: 'Petrol Price', default: 105, prefix: '₹', suffix: '/L' },
      { id: 'evRange', label: 'EV Range', default: 400, suffix: 'km/charge' },
      { id: 'chargeCost', label: 'Cost per Full Charge', default: 250, prefix: '₹' },
    ],
    calc: calcPetrolParity,
  },
  laundry: {
    name: 'Clothes / Fabric Care Size', desc: 'Size conversion for clothing across regions',
    icon: 'fa-shirt', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'chest', label: 'Chest Circumference', default: 96, suffix: 'cm' },
      { id: 'waist', label: 'Waist Circumference', default: 80, suffix: 'cm' },
      { id: 'height', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcLaundry,
  },
  weddingbudget: {
    name: 'Wedding Budget Planner', desc: 'Estimate total wedding cost based on guest count and city tier',
    icon: 'fa-ring', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'guests', label: 'Number of Guests', default: 300 },
    ],
    calc: calcWeddingBudget,
  },
  rentafford: {
    name: 'House Rent Affordability', desc: 'Maximum rent you can afford based on income and expenses',
    icon: 'fa-house-user', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'salary_r', label: 'Monthly Take-Home Salary', default: 80000, prefix: '₹' },
      { id: 'expenses_r', label: 'Monthly Fixed Expenses', default: 20000, prefix: '₹' },
      { id: 'emi_r', label: 'Existing EMIs', default: 10000, prefix: '₹' },
      { id: 'savings_r', label: 'Target Monthly Savings', default: 15000, prefix: '₹' },
    ],
    calc: calcRentAfford,
  },
  freelancerate: {
    name: 'Freelancer Rate Calculator', desc: 'Ideal hourly and daily rate based on desired annual income',
    icon: 'fa-laptop-code', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'annualIncome', label: 'Desired Annual Income', default: 1200000, prefix: '₹' },
      { id: 'workDays', label: 'Billable Days per Year', default: 220, suffix: 'days' },
      { id: 'hoursPerDay', label: 'Billable Hours per Day', default: 6, suffix: 'hrs' },
      { id: 'expenses_fl', label: 'Annual Business Expenses', default: 120000, prefix: '₹' },
      { id: 'tax_fl', label: 'Tax Rate', default: 30, suffix: '%' },
    ],
    calc: calcFreelanceRate,
  },
  carbonfootprint: {
    name: 'Carbon Footprint Calculator', desc: 'Estimate your annual CO₂ emissions from daily activities',
    icon: 'fa-leaf', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'carKm', label: 'Car Travel per Year', default: 10000, suffix: 'km' },
      { id: 'carFuel', label: 'Car Fuel Efficiency', default: 15, suffix: 'km/L' },
      { id: 'flights', label: 'Short Flights per Year (<3hrs)', default: 2, suffix: 'flights' },
      { id: 'elecUnits', label: 'Monthly Electricity', default: 300, suffix: 'kWh' },
      { id: 'meatMeals', label: 'Meat Meals per Week', default: 5, suffix: 'meals' },
    ],
    calc: calcCarbonFootprint,
  },
  cartco: {
    name: 'Car Total Cost of Ownership', desc: 'True annual cost of owning a car including all expenses',
    icon: 'fa-car', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'carPrice', label: 'Car Price', default: 1200000, prefix: '₹' },
      { id: 'downpay', label: 'Down Payment', default: 200000, prefix: '₹' },
      { id: 'carRate', label: 'Car Loan Rate', default: 9, suffix: '%' },
      { id: 'carTenure', label: 'Loan Tenure', default: 60, suffix: 'months' },
      { id: 'kmYear', label: 'Annual Distance', default: 15000, suffix: 'km' },
      { id: 'mileage', label: 'Fuel Mileage', default: 15, suffix: 'km/L' },
      { id: 'fuelPrice', label: 'Fuel Price', default: 103, prefix: '₹', suffix: '/L' },
      { id: 'insurance', label: 'Annual Insurance', default: 35000, prefix: '₹' },
      { id: 'maintenance', label: 'Annual Maintenance', default: 20000, prefix: '₹' },
    ],
    calc: calcCarTco,
  },
  tipsplit: {
    name: 'Bill Split & Tip Calculator', desc: 'Split group bill with custom tip per person',
    icon: 'fa-receipt', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'billAmt', label: 'Total Bill Amount', default: 2400, prefix: '₹' },
      { id: 'tipPct', label: 'Tip Percentage', default: 10, suffix: '%' },
      { id: 'people', label: 'Number of People', default: 4 },
      { id: 'extra', label: 'Extra Charges (taxes etc.)', default: 0, prefix: '₹' },
    ],
    calc: calcTipSplit,
  },
  petage: {
    name: 'Dog & Cat Age in Human Years', desc: 'Convert your pet\'s age to human equivalent years',
    icon: 'fa-paw', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'petAge', label: 'Pet\'s Age', default: 5, suffix: 'years' },
    ],
    calc: calcPetAge,
  },
  travelbudget: {
    name: 'Travel Budget Estimator', desc: 'Estimate total trip cost based on destination and days',
    icon: 'fa-plane-departure', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'days', label: 'Trip Duration', default: 7, suffix: 'days' },
      { id: 'people_t', label: 'Number of Travelers', default: 2 },
    ],
    calc: calcTravelBudget,
  },
  mileage: {
    name: 'Mileage & Fuel Efficiency', desc: 'km/L, L/100km, MPG — convert and compare fuel economy',
    icon: 'fa-gauge-high', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'distance_mi', label: 'Distance Traveled', default: 500, suffix: 'km' },
      { id: 'fuel_used', label: 'Fuel Used', default: 40, suffix: 'litres' },
    ],
    calc: calcMileage,
  },
  cooking: {
    name: 'Cooking Measurement Converter', desc: 'Convert cups, tbsp, tsp, ml, grams for common ingredients',
    icon: 'fa-kitchen-set', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'cook_val', label: 'Amount', default: 1 },
    ],
    calc: calcCooking,
  },
  shoesize: {
    name: 'Shoe Size Converter', desc: 'Convert shoe sizes between US, UK, EU, India and CM',
    icon: 'fa-shoe-prints', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'shoe_val', label: 'Size Value', default: 9 },
    ],
    calc: calcShoeSize,
  },
  stopwatch: {
    name: 'Stopwatch & Timer', desc: 'Online stopwatch with lap times and countdown',
    icon: 'fa-stopwatch', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'countdown_min', label: 'Countdown (minutes, 0 = stopwatch)', default: 0, suffix: 'min' },
      { id: 'lap_interval', label: 'Lap interval', default: 0, suffix: 'seconds (0=manual)' },
    ],
    calc: calcStopwatch,
  },
  randomnum: {
    name: 'Random Number Generator', desc: 'Generate random integers, decimals, dice rolls and lists',
    icon: 'fa-dice', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'rng_min', label: 'Minimum', default: 1 },
      { id: 'rng_max', label: 'Maximum', default: 100 },
      { id: 'rng_count', label: 'How many numbers', default: 5 },
    ],
    calc: calcRandomNum,
  },
  evpetrolsavings: {
    name: 'EV vs Petrol/Diesel Savings', desc: 'Compare total cost of ownership — EV vs ICE vehicle',
    icon: 'fa-charging-station', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'ev_price', label: 'EV Price (on-road)', default: 1500000, prefix: '₹' },
      { id: 'petrol_price', label: 'Petrol/Diesel Car Price', default: 1000000, prefix: '₹' },
      { id: 'daily_km', label: 'Daily Driving', default: 40, suffix: 'km' },
      { id: 'petrol_rate', label: 'Fuel Price', default: 105, prefix: '₹', suffix: '/litre' },
      { id: 'mileage', label: 'Petrol Car Mileage', default: 15, suffix: 'km/l' },
      { id: 'ev_efficiency', label: 'EV Efficiency', default: 8, suffix: 'km/kWh' },
      { id: 'elec_rate', label: 'Electricity Rate', default: 8, prefix: '₹', suffix: '/kWh' },
      { id: 'years', label: 'Ownership Period', default: 8, suffix: 'years' },
    ],
    calc: calcEvPetrolSavings,
  },
  speed_dist: {
    name: 'Speed / Distance / Time', desc: 'Solve any leg of the SDT triangle',
    icon: 'fa-person-running', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'speed', label: 'Speed (0 to solve)', default: 60, suffix: 'km/h' },
      { id: 'distance', label: 'Distance (0 to solve)', default: 0, suffix: 'km' },
      { id: 'time', label: 'Time (0 to solve)', default: 2, suffix: 'hrs' },
    ],
    calc: calcSpeedDist,
  },
  newtons: {
    name: 'Newton\'s Laws (F=ma)', desc: 'Force, mass, acceleration & energy',
    icon: 'fa-apple-whole', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'mass', label: 'Mass', default: 10, suffix: 'kg' },
      { id: 'acceleration', label: 'Acceleration', default: 9.8, suffix: 'm/s²' },
      { id: 'velocity', label: 'Velocity', default: 5, suffix: 'm/s' },
    ],
    calc: calcNewtons,
  },
  ohm_advanced: {
    name: 'Circuit Power Calculator', desc: 'Series & parallel resistance + power',
    icon: 'fa-circle-nodes', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'r1', label: 'Resistance R1', default: 100, suffix: 'Ω' },
      { id: 'r2', label: 'Resistance R2', default: 200, suffix: 'Ω' },
      { id: 'r3', label: 'Resistance R3', default: 300, suffix: 'Ω' },
      { id: 'voltage', label: 'Supply Voltage', default: 12, suffix: 'V' },
    ],
    calc: calcOhmAdvanced,
  },
  density: {
    name: 'Density Calculator', desc: 'Density, mass, volume — solve any',
    icon: 'fa-cube', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'mass', label: 'Mass (0 to solve)', default: 500, suffix: 'g' },
      { id: 'volume', label: 'Volume (0 to solve)', default: 250, suffix: 'cm³' },
      { id: 'density', label: 'Density (0 to solve)', default: 0, suffix: 'g/cm³' },
    ],
    calc: calcDensity,
  },
  chemMolar: {
    name: 'Molar Mass Calculator', desc: 'Concentration, moles & molarity',
    icon: 'fa-flask-vial', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'moles', label: 'Moles (mol)', default: 2, suffix: 'mol' },
      { id: 'molarMass', label: 'Molar Mass', default: 18, suffix: 'g/mol' },
      { id: 'volume', label: 'Solution Volume', default: 500, suffix: 'mL' },
    ],
    calc: calcChemMolar,
  },
  wavelength: {
    name: 'Wave Properties Calculator', desc: 'Wavelength, frequency, wave speed',
    icon: 'fa-wave-square', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'speed', label: 'Wave Speed', default: 343, suffix: 'm/s' },
      { id: 'frequency', label: 'Frequency', default: 440, suffix: 'Hz' },
    ],
    calc: calcWavelength,
  },
  gravitational: {
    name: 'Gravitational Force', desc: 'Newton\'s law of universal gravitation',
    icon: 'fa-earth-americas', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'm1', label: 'Mass 1', default: 5.972, suffix: 'kg' },
      { id: 'm2', label: 'Mass 2', default: 7.342, suffix: 'kg' },
      { id: 'r', label: 'Distance', default: 3.844, suffix: 'm' },
    ],
    calc: calcGravitational,
  },
  halflife: {
    name: 'Radioactive Decay / Half-Life', desc: 'Remaining quantity after radioactive decay',
    icon: 'fa-radiation', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'initial', label: 'Initial Quantity', default: 1000, suffix: 'g' },
      { id: 'halflife', label: 'Half-Life', default: 5730, suffix: 'years' },
      { id: 'time', label: 'Elapsed Time', default: 11460, suffix: 'years' },
    ],
    calc: calcHalfLife,
  },
  ph: {
    name: 'pH Calculator', desc: 'Acid/base strength from H⁺ ion concentration',
    icon: 'fa-flask', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'conc', label: 'H⁺ Concentration (mol/L)', default: 1, suffix: 'mol/L' },
      { id: 'temp', label: 'Temperature', default: 25, suffix: '°C' },
    ],
    calc: calcPH,
  },
  kinematicCalc: {
    name: 'Kinematics Calculator', desc: 'SUVAT equations — solve for any variable',
    icon: 'fa-satellite', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'u', label: 'Initial Velocity (u)', default: 0, suffix: 'm/s' },
      { id: 'a', label: 'Acceleration (a)', default: 9.8, suffix: 'm/s²' },
      { id: 't', label: 'Time (t)', default: 5, suffix: 's' },
    ],
    calc: calcKinematic,
  },
  thermodynamics: {
    name: 'Gas Laws Calculator', desc: 'Ideal gas law, Boyle\'s, Charles\'s law',
    icon: 'fa-temperature-arrow-up', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'p1', label: 'Initial Pressure P₁', default: 1, suffix: 'atm' },
      { id: 'v1', label: 'Initial Volume V₁', default: 10, suffix: 'L' },
      { id: 't1', label: 'Initial Temp T₁', default: 300, suffix: 'K' },
      { id: 'v2', label: 'Final Volume V₂ (Boyle\'s)', default: 5, suffix: 'L' },
      { id: 't2', label: 'Final Temp T₂', default: 600, suffix: 'K' },
    ],
    calc: calcThermodynamics,
  },
  acceleration: {
    name: 'Acceleration Calculator', desc: 'Linear acceleration, deceleration and stopping distance',
    icon: 'fa-gauge-simple-high', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'v1_acc', label: 'Initial Velocity (u)', default: 0, suffix: 'm/s' },
      { id: 'v2_acc', label: 'Final Velocity (v)', default: 30, suffix: 'm/s' },
      { id: 'time_acc', label: 'Time taken (t)', default: 10, suffix: 's' },
    ],
    calc: calcAcceleration,
  },
  concrete: {
    name: 'Concrete Calculator', desc: 'Cement, sand, aggregate for slabs & columns',
    icon: 'fa-building', cat: 'construction' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'length', label: 'Length', default: 6, suffix: 'm' },
      { id: 'width', label: 'Width', default: 4, suffix: 'm' },
      { id: 'depth', label: 'Thickness/Depth', default: 0.15, suffix: 'm' },
      { id: 'mix', label: 'Concrete Grade', type: 'select', options: ['M15 (1:2:4)', 'M20 (1:1.5:3)', 'M25 (1:1:2)'] },
    ],
    calc: calcConcrete,
  },
  bricks: {
    name: 'Brick & Mortar Calculator', desc: 'Number of bricks and mortar needed for a wall',
    icon: 'fa-border-all', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'length', label: 'Wall Length', default: 10, suffix: 'm' },
      { id: 'height', label: 'Wall Height', default: 3, suffix: 'm' },
      { id: 'thickness', label: 'Wall Thickness', type: 'select', options: ['Half Brick (115mm)', 'One Brick (230mm)', '1.5 Brick (345mm)'] },
      { id: 'brickL', label: 'Brick Length', default: 230, suffix: 'mm' },
      { id: 'brickH', label: 'Brick Height', default: 75, suffix: 'mm' },
    ],
    calc: calcBricks,
  },
  paint: {
    name: 'Paint Calculator', desc: 'Litres of paint needed for walls & ceiling',
    icon: 'fa-paint-roller', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'length', label: 'Room Length', default: 5, suffix: 'm' },
      { id: 'width', label: 'Room Width', default: 4, suffix: 'm' },
      { id: 'height', label: 'Room Height', default: 3, suffix: 'm' },
      { id: 'doors', label: 'Number of Doors', default: 1 },
      { id: 'windows', label: 'Number of Windows', default: 2 },
      { id: 'coats', label: 'Coats of Paint', default: 2 },
      { id: 'paintType', label: 'Paint Type', type: 'select', options: ['Interior Emulsion', 'Exterior Emulsion', 'Primer', 'Distemper', 'Enamel Paint'] },
    ],
    calc: calcPaint,
  },
  flooring: {
    name: 'Flooring / Tiles Calculator', desc: 'Number of tiles & boxes for any room',
    icon: 'fa-grip', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'roomL', label: 'Room Length', default: 5, suffix: 'm' },
      { id: 'roomW', label: 'Room Width', default: 4, suffix: 'm' },
      { id: 'tileL', label: 'Tile Length', default: 600, suffix: 'mm' },
      { id: 'tileW', label: 'Tile Width', default: 600, suffix: 'mm' },
      { id: 'boxQty', label: 'Tiles per Box', default: 4 },
      { id: 'groutGap', label: 'Grout Gap', default: 3, suffix: 'mm' },
    ],
    calc: calcFlooring,
  },
  steel: {
    name: 'Steel / Rebar Calculator', desc: 'Weight of steel bars for reinforcement',
    icon: 'fa-bars-progress', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'dia', label: 'Bar Diameter', type: 'select', options: ['8', '10', '12', '16', '20', '25', '32'] },
      { id: 'length', label: 'Bar Length', default: 12, suffix: 'm' },
      { id: 'count', label: 'Number of Bars', default: 10 },
    ],
    calc: calcSteel,
  },
  roofing: {
    name: 'Roofing Material Calculator', desc: 'Sheets, underlayment & ridge caps needed',
    icon: 'fa-house-chimney', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'length', label: 'Roof Length', default: 10, suffix: 'm' },
      { id: 'width', label: 'Roof Width (one side)', default: 5, suffix: 'm' },
      { id: 'pitch', label: 'Roof Pitch', default: 30, suffix: '°' },
      { id: 'sheetArea', label: 'Sheet Coverage', default: 2.7, suffix: 'm²/sheet' },
    ],
    calc: calcRoofing,
  },
  earthwork: {
    name: 'Earthwork / Excavation', desc: 'Volume of soil for trenches & pits',
    icon: 'fa-tractor', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'length', label: 'Length', default: 10, suffix: 'm' },
      { id: 'width', label: 'Width', default: 3, suffix: 'm' },
      { id: 'depth', label: 'Depth', default: 1.5, suffix: 'm' },
      { id: 'swell', label: 'Soil Swell Factor', default: 25, suffix: '%' },
    ],
    calc: calcEarthwork,
  },
  plasterwork: {
    name: 'Plaster Calculator', desc: 'Cement & sand for wall plastering',
    icon: 'fa-layer-group', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'length', label: 'Wall Length', default: 10, suffix: 'm' },
      { id: 'height', label: 'Wall Height', default: 3, suffix: 'm' },
      { id: 'thickness', label: 'Plaster Thickness', default: 12, suffix: 'mm' },
      { id: 'ratio', label: 'Mix Ratio', type: 'select', options: ['1:3 (rich)', '1:4 (standard)', '1:6 (lean)'] },
    ],
    calc: calcPlasterwork,
  },
  waterTank: {
    name: 'Water Tank / Reservoir Size', desc: 'Capacity for household or building use',
    icon: 'fa-water', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'people', label: 'Number of Residents', default: 4 },
      { id: 'days', label: 'Storage Days Required', default: 2 },
      { id: 'perHead', label: 'Liters per Person/Day', default: 135 },
      { id: 'shape', label: 'Tank Shape', type: 'select', options: ['Rectangular', 'Cylindrical'] },
    ],
    calc: calcWaterTank,
  },
  landarea: {
    name: 'Plot & Land Area Converter', desc: 'Convert between Indian and international area units',
    icon: 'fa-map', cat: 'construction' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'areaVal', label: 'Area Value', default: 1, suffix: 'unit' },
      { id: 'fromUnit', label: 'Convert From', type: 'select', options: ['Square Meter', 'Square Feet', 'Square Yard', 'Acre', 'Hectare', 'Bigha (UP/Bihar)', 'Bigha (Rajasthan)', 'Cent', 'Gunta', 'Marla', 'Kanal'] },
    ],
    calc: calcLandArea,
  },
  stampdutycalc: {
    name: 'Stamp Duty & Registration Calculator', desc: 'Property registration cost based on value and state',
    icon: 'fa-stamp', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'propVal', label: 'Property Value', default: 5000000, prefix: '₹' },
      { id: 'state', label: 'State', type: 'select', options: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'UP/Bihar', 'Gujarat', 'Rajasthan'] },
      { id: 'gender', label: 'Buyer Gender', type: 'select', options: ['Male', 'Female', 'Joint'] },
    ],
    calc: calcStampDuty,
  },
  constructioncost: {
    name: 'Home Construction Cost', desc: 'Estimate construction cost per sq ft by city tier',
    icon: 'fa-building', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'area_c', label: 'Built-up Area', default: 1500, suffix: 'sq ft' },
      { id: 'floors', label: 'Number of Floors', default: 1 },
      { id: 'tier', label: 'City Tier', type: 'select', options: ['Tier-1 Metro (₹2500/sqft)', 'Tier-2 (₹1800/sqft)', 'Tier-3 (₹1400/sqft)', 'Tier-4 (₹1100/sqft)', 'Rural (₹800/sqft)'] },
      { id: 'finishLevel', label: 'Finish Quality', type: 'select', options: ['Basic', 'Standard', 'Premium', 'Luxury'] },
    ],
    calc: calcConstructionCost,
  },
  solarpanel: {
    name: 'Solar Panel Savings Calculator', desc: 'Rooftop solar ROI, payback period and lifetime savings',
    icon: 'fa-solar-panel', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'monthlyBill', label: 'Current Monthly Electricity Bill', default: 3000, prefix: '₹' },
      { id: 'systemKw', label: 'Solar System Size', default: 3, suffix: 'kW' },
      { id: 'systemCost', label: 'Installation Cost', default: 150000, prefix: '₹' },
      { id: 'tariff', label: 'Electricity Tariff', default: 8, prefix: '₹', suffix: '/unit' },
    ],
    calc: calcSolarPanel,
  },
  homerenovation: {
    name: 'Home Renovation Cost Estimator', desc: 'Room-wise renovation budget with material costs',
    icon: 'fa-paint-roller', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'area', label: 'Total Area', default: 1000, suffix: 'sq ft' },
      { id: 'scope', label: 'Renovation Scope', type: 'select', options: ['Full Renovation', 'Kitchen Only', 'Bathroom Only', 'Painting Only', 'Flooring Only'] },
      { id: 'quality', label: 'Quality Level', type: 'select', options: ['Economy', 'Standard', 'Premium', 'Luxury'] },
      { id: 'city', label: 'City Type', type: 'select', options: ['Metro (Delhi/Mumbai)', 'Tier-1 (Pune/Hyd)', 'Tier-2', 'Tier-3'] },
    ],
    calc: calcHomeRenovation,
  },
  cgpa: {
    name: 'CGPA to Percentage', desc: 'Convert CGPA to percentage (various university scales)',
    icon: 'fa-graduation-cap', cat: 'education' as CalculatorCategory, badge: 'Popular',
    inputs: [
      { id: 'cgpa', label: 'Your CGPA', default: 8.5, suffix: '/10' },
    ],
    calc: calcCgpa,
  },
  examneeded: {
    name: 'Exam Score Needed', desc: 'What score you need in finals to achieve your target percentage',
    icon: 'fa-file-pen', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'currentMarks', label: 'Marks Scored So Far', default: 340, suffix: 'marks' },
      { id: 'totalSoFar', label: 'Max Marks So Far', default: 400, suffix: 'marks' },
      { id: 'finalMax', label: 'Final Exam Max Marks', default: 100, suffix: 'marks' },
      { id: 'targetPct', label: 'Target Overall Percentage', default: 75, suffix: '%' },
    ],
    calc: calcExamNeeded,
  },
  eduloan: {
    name: 'Education Loan EMI', desc: 'Student loan EMI with moratorium period',
    icon: 'fa-book-open', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'loanAmt', label: 'Loan Amount', default: 500000, prefix: '₹' },
      { id: 'eduRate', label: 'Interest Rate', default: 10.5, suffix: '% p.a.' },
      { id: 'moratorium', label: 'Moratorium Period (course duration)', default: 24, suffix: 'months' },
      { id: 'repayTenure', label: 'Repayment Tenure After Course', default: 60, suffix: 'months' },
    ],
    calc: calcEduLoan,
  },
  studyhours: {
    name: 'Study Hours Planner', desc: 'Plan study hours per subject to cover syllabus before exam',
    icon: 'fa-clock', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'subjects', label: 'Number of Subjects', default: 5 },
      { id: 'daysLeft', label: 'Days Until Exam', default: 30, suffix: 'days' },
      { id: 'hoursPerDay', label: 'Available Study Hours/Day', default: 6, suffix: 'hrs' },
      { id: 'revisions', label: 'Number of Revisions Planned', default: 2 },
    ],
    calc: calcStudyHours,
  },
  scholarship: {
    name: 'Scholarship Savings Calculator', desc: 'How much a scholarship reduces your total education loan burden',
    icon: 'fa-medal', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'totalFee', label: 'Total Course Fee', default: 2000000, prefix: '₹' },
      { id: 'scholarAmt', label: 'Scholarship Amount', default: 400000, prefix: '₹' },
      { id: 'loanRate_s', label: 'Loan Interest Rate', default: 10.5, suffix: '% p.a.' },
      { id: 'tenure_s', label: 'Loan Repayment Tenure', default: 60, suffix: 'months' },
    ],
    calc: calcScholarship,
  },
  pomodoro: {
    name: 'Pomodoro Study Planner', desc: 'Plan focused study sessions with work/break intervals',
    icon: 'fa-stopwatch', cat: 'education' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'studyHours', label: 'Total Study Time Available', default: 4, suffix: 'hours' },
      { id: 'focusLen', label: 'Focus Block Length', default: 25, suffix: 'min' },
      { id: 'shortBreak', label: 'Short Break', default: 5, suffix: 'min' },
      { id: 'longBreak', label: 'Long Break (after 4 blocks)', default: 15, suffix: 'min' },
    ],
    calc: calcPomodoro,
  },
  gpaconverter: {
    name: 'GPA / CGPA Converter', desc: 'Convert GPA between US, Indian, UK and German scales',
    icon: 'fa-right-left', cat: 'education' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'gpaValue', label: 'Your GPA / CGPA', default: 8.5 },
    ],
    calc: calcGpaConverter,
  },
  readingtime: {
    name: 'Reading Time Calculator', desc: 'Estimate time to finish a book based on your reading speed',
    icon: 'fa-book-open-reader', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'totalPages', label: 'Total Pages', default: 350 },
      { id: 'pagesRead', label: 'Pages Already Read', default: 50 },
      { id: 'wordsPerPage', label: 'Words per Page (avg)', default: 250 },
    ],
    calc: calcReadingTime,
  },
  typingtest: {
    name: 'Typing Speed Analyzer', desc: 'Calculate net WPM, accuracy and skill level from test results',
    icon: 'fa-keyboard', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'grossWPM', label: 'Gross Words per Minute', default: 55 },
      { id: 'errors', label: 'Total Errors', default: 3 },
      { id: 'testDuration', label: 'Test Duration', default: 1, suffix: 'min' },
    ],
    calc: calcTypingTest,
  },
  spellingbee: {
    name: 'Spelling Bee Score Tracker', desc: 'Track spelling accuracy, speed and skill level',
    icon: 'fa-spell-check', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'correct_sb', label: 'Words Spelled Correctly', default: 18 },
      { id: 'totalWords_sb', label: 'Total Words Attempted', default: 20 },
      { id: 'totalTime_sb', label: 'Total Time Taken', default: 60, suffix: 'seconds' },
    ],
    calc: calcSpellingBee,
  },
  fire: {
    name: 'FIRE Calculator', desc: 'Financial Independence, Retire Early — years to freedom',
    icon: 'fa-fire', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'annualExpense', label: 'Annual Living Expenses', default: 600000, prefix: '₹' },
      { id: 'currentSavings', label: 'Current Portfolio Value', default: 500000, prefix: '₹' },
      { id: 'annualSaving', label: 'Annual Savings', default: 400000, prefix: '₹' },
      { id: 'returnRate', label: 'Expected Return', default: 8, suffix: '% p.a.' },
      { id: 'withdrawalRate', label: 'Safe Withdrawal Rate', default: 4, suffix: '%' },
    ],
    calc: calcFIRE,
  },
  debtavalanche: {
    name: 'Debt Snowball vs Avalanche', desc: 'Compare payoff strategies — save interest or win quick',
    icon: 'fa-money-bill-wave', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'debt1bal', label: 'Debt 1 Balance', default: 50000, prefix: '₹' },
      { id: 'debt1rate', label: 'Debt 1 Rate', default: 18, suffix: '%' },
      { id: 'debt1min', label: 'Debt 1 Min Payment', default: 2000, prefix: '₹' },
      { id: 'debt2bal', label: 'Debt 2 Balance', default: 200000, prefix: '₹' },
      { id: 'debt2rate', label: 'Debt 2 Rate', default: 12, suffix: '%' },
      { id: 'debt2min', label: 'Debt 2 Min Payment', default: 5000, prefix: '₹' },
      { id: 'debt3bal', label: 'Debt 3 Balance (0=skip)', default: 0, prefix: '₹' },
      { id: 'debt3rate', label: 'Debt 3 Rate', default: 9, suffix: '%' },
      { id: 'debt3min', label: 'Debt 3 Min Payment', default: 0, prefix: '₹' },
      { id: 'extraPay', label: 'Extra Monthly Payment', default: 3000, prefix: '₹' },
    ],
    calc: calcDebtAvalanche,
  },
  emergencyfund: {
    name: 'Emergency Fund Calculator', desc: 'How much you need in your rainy-day fund',
    icon: 'fa-shield-halved', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'monthlyExpense', label: 'Monthly Living Expenses', default: 40000, prefix: '₹' },
      { id: 'monthsCover', label: 'Months of Cover', default: 6, suffix: 'months' },
      { id: 'currentFund', label: 'Current Emergency Fund', default: 50000, prefix: '₹' },
      { id: 'monthlySave', label: 'Monthly Saving Toward Fund', default: 10000, prefix: '₹' },
      { id: 'dependents', label: 'Number of Dependents', default: 2 },
    ],
    calc: calcEmergencyFund,
  },
  rentvsbuy: {
    name: 'Rent vs Buy Home Calculator', desc: 'Should you rent or buy? Total cost comparison over time',
    icon: 'fa-house-chimney', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'homePrice', label: 'Home Purchase Price', default: 5000000, prefix: '₹' },
      { id: 'downPayment', label: 'Down Payment', default: 1000000, prefix: '₹' },
      { id: 'loanRate', label: 'Home Loan Rate', default: 8.5, suffix: '%' },
      { id: 'loanTenure', label: 'Loan Tenure', default: 20, suffix: 'years' },
      { id: 'monthlyRent', label: 'Current Monthly Rent', default: 15000, prefix: '₹' },
      { id: 'rentIncrease', label: 'Annual Rent Increase', default: 5, suffix: '%' },
      { id: 'propertyAppreciation', label: 'Property Appreciation', default: 5, suffix: '% p.a.' },
      { id: 'maintenance', label: 'Annual Maintenance', default: 12000, prefix: '₹' },
    ],
    calc: calcRentVsBuy,
  },
  carleasevsbuy: {
    name: 'Car Lease vs Buy Calculator', desc: 'Total cost of leasing vs buying a vehicle',
    icon: 'fa-car-side', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'carPrice', label: 'Car On-Road Price', default: 1000000, prefix: '₹' },
      { id: 'downPay', label: 'Down Payment (if buying)', default: 200000, prefix: '₹' },
      { id: 'loanRateCar', label: 'Car Loan Rate', default: 9, suffix: '%' },
      { id: 'loanYears', label: 'Loan Tenure', default: 5, suffix: 'years' },
      { id: 'monthlyLease', label: 'Monthly Lease Payment', default: 18000, prefix: '₹' },
      { id: 'leaseYears', label: 'Lease Period', default: 3, suffix: 'years' },
      { id: 'resalePercent', label: 'Resale Value After Loan Period', default: 40, suffix: '%' },
      { id: 'annualInsurance', label: 'Annual Insurance (if buying)', default: 15000, prefix: '₹' },
    ],
    calc: calcCarLeaseVsBuy,
  },
  homedownpayment: {
    name: 'Home Down Payment Planner', desc: 'Monthly savings needed to reach your down payment goal',
    icon: 'fa-piggy-bank', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'targetHome', label: 'Target Home Price', default: 5000000, prefix: '₹' },
      { id: 'downPct', label: 'Down Payment %', default: 20, suffix: '%' },
      { id: 'currentSaved', label: 'Currently Saved', default: 100000, prefix: '₹' },
      { id: 'timelineYears', label: 'Target Timeline', default: 3, suffix: 'years' },
      { id: 'savingsReturn', label: 'Savings Return Rate', default: 6, suffix: '% p.a.' },
    ],
    calc: calcHomeDownPayment,
  },
  loancompare: {
    name: 'Loan Comparison Calculator', desc: 'Compare up to 3 loan offers side-by-side',
    icon: 'fa-code-compare', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount_lc', label: 'Loan Amount', default: 2000000, prefix: '₹' },
      { id: 'rate1', label: 'Bank 1 Rate', default: 8.5, suffix: '%' },
      { id: 'tenure1', label: 'Bank 1 Tenure', default: 240, suffix: 'months' },
      { id: 'fee1', label: 'Bank 1 Processing Fee', default: 10000, prefix: '₹' },
      { id: 'rate2', label: 'Bank 2 Rate', default: 9, suffix: '%' },
      { id: 'tenure2', label: 'Bank 2 Tenure', default: 240, suffix: 'months' },
      { id: 'fee2', label: 'Bank 2 Processing Fee', default: 5000, prefix: '₹' },
      { id: 'rate3', label: 'Bank 3 Rate', default: 8.75, suffix: '%' },
      { id: 'tenure3', label: 'Bank 3 Tenure', default: 180, suffix: 'months' },
      { id: 'fee3', label: 'Bank 3 Processing Fee', default: 15000, prefix: '₹' },
    ],
    calc: calcLoanCompare,
  },
  refinance: {
    name: 'Refinance Savings Calculator', desc: 'Should you refinance? Compare old vs new loan terms',
    icon: 'fa-rotate', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'outstandingBal', label: 'Outstanding Balance', default: 2500000, prefix: '₹' },
      { id: 'currentRate_r', label: 'Current Interest Rate', default: 10, suffix: '%' },
      { id: 'remainingMonths', label: 'Remaining Months', default: 180, suffix: 'months' },
      { id: 'newRate_r', label: 'New Offered Rate', default: 8.5, suffix: '%' },
      { id: 'newTenure_r', label: 'New Tenure', default: 180, suffix: 'months' },
      { id: 'closingCost', label: 'Refinance Costs (fees + charges)', default: 25000, prefix: '₹' },
    ],
    calc: calcRefinance,
  },
  creditutil: {
    name: 'Credit Utilization Calculator', desc: 'Credit score impact of your card usage',
    icon: 'fa-gauge-high', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'card1Limit', label: 'Card 1 Credit Limit', default: 200000, prefix: '₹' },
      { id: 'card1Used', label: 'Card 1 Current Balance', default: 40000, prefix: '₹' },
      { id: 'card2Limit', label: 'Card 2 Limit (0=skip)', default: 100000, prefix: '₹' },
      { id: 'card2Used', label: 'Card 2 Current Balance', default: 10000, prefix: '₹' },
      { id: 'card3Limit', label: 'Card 3 Limit (0=skip)', default: 0, prefix: '₹' },
      { id: 'card3Used', label: 'Card 3 Current Balance', default: 0, prefix: '₹' },
    ],
    calc: calcCreditUtil,
  },
  insuranceneed: {
    name: 'Insurance Need Calculator', desc: 'How much life insurance cover do you actually need?',
    icon: 'fa-umbrella', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'annualIncome_i', label: 'Annual Income', default: 1000000, prefix: '₹' },
      { id: 'yearsToReplace', label: 'Income Years to Replace', default: 15, suffix: 'years' },
      { id: 'outstandingLoans', label: 'Outstanding Loans', default: 2000000, prefix: '₹' },
      { id: 'childrenExpense', label: 'Children Education Fund', default: 1000000, prefix: '₹' },
      { id: 'existingCover', label: 'Existing Life Cover', default: 500000, prefix: '₹' },
      { id: 'existingSavings_i', label: 'Existing Savings & Investments', default: 300000, prefix: '₹' },
      { id: 'inflationAdj', label: 'Inflation', default: 6, suffix: '%' },
    ],
    calc: calcInsuranceNeed,
  },
  npvirr: {
    name: 'NPV / IRR Calculator', desc: 'Net Present Value and Internal Rate of Return for projects',
    icon: 'fa-chart-gantt', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'initialInvest', label: 'Initial Investment', default: 500000, prefix: '₹' },
      { id: 'cf1', label: 'Year 1 Cash Flow', default: 100000, prefix: '₹' },
      { id: 'cf2', label: 'Year 2 Cash Flow', default: 150000, prefix: '₹' },
      { id: 'cf3', label: 'Year 3 Cash Flow', default: 200000, prefix: '₹' },
      { id: 'cf4', label: 'Year 4 Cash Flow', default: 200000, prefix: '₹' },
      { id: 'cf5', label: 'Year 5 Cash Flow', default: 250000, prefix: '₹' },
      { id: 'discountRate', label: 'Discount Rate / WACC', default: 10, suffix: '%' },
    ],
    calc: calcNpvIrr,
  },
  bondyield: {
    name: 'Bond Yield / YTM Calculator', desc: 'Yield to maturity, current yield, and holding return',
    icon: 'fa-file-invoice-dollar', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'faceValue', label: 'Face Value (Par)', default: 1000, prefix: '₹' },
      { id: 'couponRate', label: 'Coupon Rate', default: 7.5, suffix: '%' },
      { id: 'marketPrice', label: 'Market Price', default: 950, prefix: '₹' },
      { id: 'yearsToMaturity', label: 'Years to Maturity', default: 10, suffix: 'years' },
    ],
    calc: calcBondYield,
  },
  optionprofit: {
    name: 'Option Profit Calculator', desc: 'Call & put option P&L with break-even and max loss',
    icon: 'fa-arrow-up-right-dots', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'optType', label: 'Option Type', type: 'select', options: ['Buy Call', 'Buy Put', 'Sell Call', 'Sell Put'] },
      { id: 'strikePrice', label: 'Strike Price', default: 20000, prefix: '₹' },
      { id: 'premium', label: 'Premium Paid/Received', default: 200, prefix: '₹' },
      { id: 'exitPrice', label: 'Underlying Price at Expiry', default: 20500, prefix: '₹' },
      { id: 'lotSize', label: 'Lot Size', default: 50 },
    ],
    calc: calcOptionProfit,
  },
  forexpip: {
    name: 'Forex Pip / Lot Size Calculator', desc: 'Calculate pip value and position size for forex trading',
    icon: 'fa-money-bill-trend-up', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'pair', label: 'Currency Pair', type: 'select', options: ['USD/INR', 'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'] },
      { id: 'accountBal', label: 'Account Balance', default: 100000, prefix: '₹' },
      { id: 'riskPct', label: 'Risk per Trade', default: 1, suffix: '%' },
      { id: 'stopLossPips', label: 'Stop Loss Distance', default: 30, suffix: 'pips' },
      { id: 'pipValue_override', label: 'Custom Pip Value (0 = auto)', default: 0, prefix: '₹' },
    ],
    calc: calcForexPip,
  },
  portfoliorebalance: {
    name: 'Portfolio Rebalancing Calculator', desc: 'How much to buy/sell to match your target allocation',
    icon: 'fa-scale-balanced', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'totalPortfolio', label: 'Total Portfolio Value', default: 1000000, prefix: '₹' },
      { id: 'equityCurrent', label: 'Current Equity %', default: 70, suffix: '%' },
      { id: 'debtCurrent', label: 'Current Debt %', default: 20, suffix: '%' },
      { id: 'goldCurrent', label: 'Current Gold %', default: 10, suffix: '%' },
      { id: 'equityTarget', label: 'Target Equity %', default: 60, suffix: '%' },
      { id: 'debtTarget', label: 'Target Debt %', default: 30, suffix: '%' },
      { id: 'goldTarget', label: 'Target Gold %', default: 10, suffix: '%' },
    ],
    calc: calcPortfolioRebalance,
  },
  assetallocation: {
    name: 'Asset Allocation Calculator', desc: 'Suggested allocation based on age, risk profile and goals',
    icon: 'fa-chart-pie', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'ageAlloc', label: 'Your Age', default: 30, suffix: 'years' },
    ],
    calc: calcAssetAllocation,
  },
  montecarlo: {
    name: 'Monte Carlo Retirement Simulator', desc: 'Probability of your retirement plan succeeding',
    icon: 'fa-dice-d20', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'corpus_mc', label: 'Retirement Corpus', default: 10000000, prefix: '₹' },
      { id: 'annualWithdrawal_mc', label: 'Annual Withdrawal', default: 500000, prefix: '₹' },
      { id: 'yearsRetirement', label: 'Years in Retirement', default: 30, suffix: 'years' },
      { id: 'avgReturn_mc', label: 'Expected Avg Return', default: 8, suffix: '%' },
      { id: 'stdDev_mc', label: 'Return Std Deviation', default: 15, suffix: '%' },
    ],
    calc: calcMonteCarlo,
  },
  inflationgoal: {
    name: 'Inflation-Adjusted Goal Planner', desc: 'Future cost of your goal adjusted for inflation + SIP needed',
    icon: 'fa-bullseye', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'goalAmount_ig', label: 'Goal Amount (today\'s value)', default: 2000000, prefix: '₹' },
      { id: 'yearsToGoal', label: 'Years to Goal', default: 10, suffix: 'years' },
      { id: 'inflationRate_ig', label: 'Expected Inflation', default: 6, suffix: '%' },
      { id: 'returnRate_ig', label: 'Investment Return', default: 12, suffix: '% p.a.' },
      { id: 'currentSavings_ig', label: 'Already Saved', default: 100000, prefix: '₹' },
    ],
    calc: calcInflationGoal,
  },
  businessloan: {
    name: 'Business Loan EMI + DSCR', desc: 'Business loan EMI and Debt Service Coverage Ratio',
    icon: 'fa-briefcase', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'loanAmt_bl', label: 'Loan Amount', default: 2000000, prefix: '₹' },
      { id: 'rate_bl', label: 'Interest Rate', default: 12, suffix: '% p.a.' },
      { id: 'tenure_bl', label: 'Tenure', default: 60, suffix: 'months' },
      { id: 'annualRevenue', label: 'Annual Business Revenue', default: 5000000, prefix: '₹' },
      { id: 'operatingExpenses', label: 'Annual Operating Expenses', default: 3500000, prefix: '₹' },
      { id: 'otherDebt', label: 'Other Annual Debt Payments', default: 0, prefix: '₹' },
    ],
    calc: calcBusinessLoan,
  },
  gstinvoice: {
    name: 'GST Invoice + Profit Margin', desc: 'Generate invoice breakdown with profit margin analysis',
    icon: 'fa-file-invoice', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'costPrice_gi', label: 'Cost / Purchase Price', default: 500, prefix: '₹' },
      { id: 'sellingPrice_gi', label: 'Selling Price (excl. GST)', default: 800, prefix: '₹' },
    ],
    calc: calcGstInvoice,
  },
  esoptax: {
    name: 'ESOP Tax Calculator', desc: 'Tax on ESOP exercise and sale — perquisite vs capital gains',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'grantPrice', label: 'Grant / Exercise Price', default: 100, prefix: '₹' },
      { id: 'fmvOnExercise', label: 'FMV on Exercise Date', default: 500, prefix: '₹' },
      { id: 'salePrice_esop', label: 'Sale Price', default: 800, prefix: '₹' },
      { id: 'sharesQty', label: 'Number of Shares', default: 1000 },
      { id: 'holdingMonths', label: 'Holding Period After Exercise', default: 18, suffix: 'months' },
    ],
    calc: calcEsopTax,
  },
  freelancetax: {
    name: 'Freelance Tax + GST Calculator', desc: 'Estimated income tax and GST for freelancers / consultants',
    icon: 'fa-laptop-code', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'annualRevenue_ft', label: 'Annual Gross Revenue', default: 1500000, prefix: '₹' },
      { id: 'expenses_ft', label: 'Business Expenses', default: 300000, prefix: '₹' },
      { id: 'sec80c_ft', label: '80C Investments', default: 150000, prefix: '₹' },
      { id: 'healthInsurance_ft', label: 'Health Insurance (80D)', default: 25000, prefix: '₹' },
    ],
    calc: calcFreelanceTax,
  },
  tcsremittance: {
    name: 'TCS on Foreign Remittance', desc: 'Tax Collected at Source on LRS payments abroad',
    icon: 'fa-plane-departure', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'remittanceAmt', label: 'Remittance Amount', default: 1000000, prefix: '₹' },
    ],
    calc: calcTcsRemittance,
  },
  sec80c: {
    name: 'Section 80C Optimizer', desc: 'Maximize your ₹1.5L tax deduction across 80C instruments',
    icon: 'fa-shield-halved', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'epf80c', label: 'EPF (Employee PF)', default: 21600, prefix: '₹' },
      { id: 'ppf80c', label: 'PPF', default: 50000, prefix: '₹' },
      { id: 'elss80c', label: 'ELSS Mutual Funds', default: 0, prefix: '₹' },
      { id: 'lifeInsurance80c', label: 'Life Insurance Premium', default: 20000, prefix: '₹' },
      { id: 'nsc80c', label: 'NSC', default: 0, prefix: '₹' },
      { id: 'tuitionFees80c', label: 'Children Tuition Fees', default: 0, prefix: '₹' },
      { id: 'homeLoanPrincipal80c', label: 'Home Loan Principal', default: 0, prefix: '₹' },
    ],
    calc: calcSec80c,
  },
  hravshomeloan: {
    name: 'HRA vs Home Loan Benefit', desc: 'Compare tax benefits of HRA exemption vs home loan deductions',
    icon: 'fa-house-lock', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'basic_hvh', label: 'Monthly Basic Salary', default: 60000, prefix: '₹' },
      { id: 'hra_hvh', label: 'Monthly HRA Received', default: 24000, prefix: '₹' },
      { id: 'rent_hvh', label: 'Monthly Rent Paid', default: 20000, prefix: '₹' },
    ],
    calc: calcHraVsHomeLoan,
  },
  proftax: {
    name: 'Professional Tax by State', desc: 'Monthly professional tax deduction based on your state',
    icon: 'fa-map-location-dot', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'grossSalary_pt', label: 'Monthly Gross Salary', default: 50000, prefix: '₹' },
    ],
    calc: calcProfTax,
  },
  leaveencash: {
    name: 'Leave Encashment Calculator', desc: 'Tax-exempt leave encashment on retirement or resignation',
    icon: 'fa-calendar-check', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'basicSalary_le', label: 'Last Drawn Basic Salary', default: 50000, prefix: '₹', suffix: '/mo' },
      { id: 'leaveBalance', label: 'Leave Balance', default: 180, suffix: 'days' },
      { id: 'yearsOfService_le', label: 'Years of Service', default: 15 },
    ],
    calc: calcLeaveEncash,
  },
  onerepmax: {
    name: 'One Rep Max (1RM) Calculator', desc: 'Estimate your max lift from sub-maximal reps',
    icon: 'fa-dumbbell', cat: 'health' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'weightLifted', label: 'Weight Lifted', default: 80, suffix: 'kg' },
      { id: 'repsPerformed', label: 'Reps Performed', default: 5 },
    ],
    calc: calcOneRepMax,
  },
  runningpace: {
    name: 'Running Pace / Race Predictor', desc: 'Pace calculator and race time predictions (5K to Marathon)',
    icon: 'fa-person-running', cat: 'health' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'distanceKm', label: 'Distance Run', default: 5, suffix: 'km' },
      { id: 'timeMin', label: 'Time Taken', default: 25, suffix: 'minutes' },
    ],
    calc: calcRunningPace,
  },
  bodyrecomp: {
    name: 'Body Recomposition Planner', desc: 'Simultaneous fat loss and muscle gain — calories + macros',
    icon: 'fa-person-arrow-up-from-line', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight_br', label: 'Current Weight', default: 80, suffix: 'kg' },
      { id: 'height_br', label: 'Height', default: 170, suffix: 'cm' },
      { id: 'age_br', label: 'Age', default: 28, suffix: 'years' },
      { id: 'gender_br', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
      { id: 'bodyfat_br', label: 'Current Body Fat', default: 22, suffix: '%' },
      { id: 'targetBf', label: 'Target Body Fat', default: 15, suffix: '%' },
      { id: 'activity_br', label: 'Activity Level', type: 'select', options: ['Sedentary', 'Light Exercise (1-3 days)', 'Moderate (3-5 days)', 'Heavy (6-7 days)', 'Athlete (2× daily)'] },
    ],
    calc: calcBodyRecomp,
  },
  vo2max: {
    name: 'VO2 Max Estimator', desc: 'Estimate cardiovascular fitness from run/walk data',
    icon: 'fa-lungs', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'method_vo2', label: 'Test Method', type: 'select', options: ['Cooper 12-min Run', '1.5 Mile Run', 'Resting HR (Fox formula)'] },
      { id: 'distanceCovered', label: 'Distance Covered (Cooper test)', default: 2400, suffix: 'meters' },
      { id: 'runTime15', label: '1.5 Mile Run Time', default: 12, suffix: 'minutes' },
      { id: 'age_vo2', label: 'Age', default: 30, suffix: 'years' },
      { id: 'restingHR', label: 'Resting Heart Rate', default: 70, suffix: 'bpm' },
    ],
    calc: calcVO2Max,
  },
  leanbodymass: {
    name: 'Lean Body Mass Calculator', desc: 'Calculate fat-free mass using multiple formulas',
    icon: 'fa-weight-scale', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight_lbm', label: 'Body Weight', default: 75, suffix: 'kg' },
      { id: 'height_lbm', label: 'Height', default: 175, suffix: 'cm' },
    ],
    calc: calcLeanBodyMass,
  },
  caloriegoal: {
    name: 'Calorie Intake by Goal Timeline', desc: 'Daily calories needed to hit your target weight by a date',
    icon: 'fa-utensils', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'currentWeight_cg', label: 'Current Weight', default: 85, suffix: 'kg' },
      { id: 'targetWeight_cg', label: 'Target Weight', default: 75, suffix: 'kg' },
      { id: 'weeks_cg', label: 'Timeline', default: 16, suffix: 'weeks' },
      { id: 'height_cg', label: 'Height', default: 175, suffix: 'cm' },
      { id: 'age_cg', label: 'Age', default: 30, suffix: 'years' },
    ],
    calc: calcCalorieGoal,
  },
  electrolyte: {
    name: 'Water + Electrolyte Calculator', desc: 'Daily water and electrolyte needs based on activity and climate',
    icon: 'fa-glass-water-droplet', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'weight_el', label: 'Body Weight', default: 70, suffix: 'kg' },
      { id: 'exerciseMin', label: 'Daily Exercise Duration', default: 60, suffix: 'minutes' },
    ],
    calc: calcElectrolyte,
  },
  attendance: {
    name: 'Attendance Percentage Calculator', desc: 'Track attendance and calculate classes needed for 75%',
    icon: 'fa-clipboard-check', cat: 'education' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'totalClasses', label: 'Total Classes Held', default: 120 },
      { id: 'attended', label: 'Classes Attended', default: 90 },
      { id: 'targetPct_att', label: 'Target Attendance %', default: 75, suffix: '%' },
      { id: 'remainingClasses', label: 'Remaining Classes This Semester', default: 30 },
    ],
    calc: calcAttendance,
  },
  gpaplanner: {
    name: 'Semester GPA Planner', desc: 'Plan your target grades to achieve desired CGPA',
    icon: 'fa-chart-simple', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'currentCGPA', label: 'Current CGPA', default: 7.5, suffix: '/10' },
      { id: 'completedCredits', label: 'Credits Completed', default: 80 },
      { id: 'semCredits', label: 'This Semester Credits', default: 24 },
      { id: 'targetCGPA', label: 'Target CGPA', default: 8, suffix: '/10' },
    ],
    calc: calcGpaPlanner,
  },
  percentile: {
    name: 'Percentile Calculator', desc: 'Find percentile rank from score and total candidates',
    icon: 'fa-ranking-star', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'yourScore', label: 'Your Score / Marks', default: 180 },
      { id: 'totalCandidates', label: 'Total Candidates', default: 100000 },
      { id: 'yourRank', label: 'Your Rank (if known, 0=auto)', default: 5000 },
      { id: 'maxScore_pctl', label: 'Maximum Score', default: 300 },
    ],
    calc: calcPercentile,
  },
  cutoffpredictor: {
    name: 'Cutoff Predictor', desc: 'Predict exam cutoff based on difficulty and past trends',
    icon: 'fa-crystal-ball', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'yourScore_cp', label: 'Your Expected Score', default: 150 },
      { id: 'maxScore_cp', label: 'Maximum Score', default: 300 },
      { id: 'lastYearCutoff', label: 'Last Year Cutoff', default: 140 },
    ],
    calc: calcCutoffPredictor,
  },
  revisionplanner: {
    name: 'Revision Planner', desc: 'Create a timetable dividing subjects across available days',
    icon: 'fa-calendar-days', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'subjects_rp', label: 'Number of Subjects', default: 6 },
      { id: 'daysAvailable', label: 'Days Until Exam', default: 21, suffix: 'days' },
      { id: 'hoursPerDay_rp', label: 'Study Hours per Day', default: 8, suffix: 'hrs' },
      { id: 'revisionRounds', label: 'Revision Rounds Needed', default: 2 },
    ],
    calc: calcRevisionPlanner,
  },
  inverterbattery: {
    name: 'Inverter / Battery Backup Calculator', desc: 'Inverter VA rating and battery capacity for your load',
    icon: 'fa-car-battery', cat: 'engineering' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'loadWatts', label: 'Total Load (appliances)', default: 500, suffix: 'Watts' },
      { id: 'backupHours', label: 'Backup Hours Needed', default: 4, suffix: 'hours' },
    ],
    calc: calcInverterBattery,
  },
  acbtu: {
    name: 'AC Load / BTU Calculator', desc: 'Air conditioner tonnage needed for your room size',
    icon: 'fa-snowflake', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'roomLength', label: 'Room Length', default: 15, suffix: 'feet' },
      { id: 'roomWidth', label: 'Room Width', default: 12, suffix: 'feet' },
      { id: 'ceilingHeight', label: 'Ceiling Height', default: 10, suffix: 'feet' },
    ],
    calc: calcAcBtu,
  },
  beamload: {
    name: 'Beam Load / Deflection Calculator', desc: 'Simply supported beam — max bending moment and deflection',
    icon: 'fa-ruler-combined', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'span', label: 'Beam Span (Length)', default: 5, suffix: 'meters' },
    ],
    calc: calcBeamLoad,
  },
  pipeflow: {
    name: 'Pipe Flow / Pressure Drop', desc: 'Flow rate, velocity and friction loss in pipes',
    icon: 'fa-faucet-drip', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'pipeD', label: 'Pipe Inner Diameter', default: 50, suffix: 'mm' },
      { id: 'pipeLength', label: 'Pipe Length', default: 100, suffix: 'meters' },
      { id: 'flowRate_pf', label: 'Flow Rate', default: 5, suffix: 'liters/min' },
    ],
    calc: calcPipeFlow,
  },
  threephase: {
    name: '3-Phase Electrical Calculator', desc: 'Power, current and voltage for 3-phase electrical systems',
    icon: 'fa-bolt', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'voltage3p', label: 'Line Voltage', default: 415, suffix: 'V' },
      { id: 'current3p', label: 'Line Current', default: 20, suffix: 'A' },
      { id: 'powerFactor3p', label: 'Power Factor', default: 0.85 },
    ],
    calc: calcThreePhase,
  },
  transformercalc: {
    name: 'Transformer Calculator', desc: 'Turns ratio, voltage and current for transformer design',
    icon: 'fa-right-left', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'primaryV', label: 'Primary Voltage', default: 230, suffix: 'V' },
      { id: 'secondaryV', label: 'Secondary Voltage', default: 12, suffix: 'V' },
      { id: 'powerRating_t', label: 'Power Rating', default: 100, suffix: 'VA' },
    ],
    calc: calcTransformer,
  },
  heatexchanger: {
    name: 'Heat Exchanger Calculator', desc: 'LMTD, heat transfer rate and required area',
    icon: 'fa-temperature-half', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'massFlow', label: 'Mass Flow Rate', default: 2, suffix: 'kg/s' },
      { id: 'cpFluid', label: 'Specific Heat (Cp)', default: 4.18, suffix: 'kJ/kg·°C' },
      { id: 'hotInlet', label: 'Hot Inlet Temp', default: 90, suffix: '°C' },
      { id: 'hotOutlet', label: 'Hot Outlet Temp', default: 50, suffix: '°C' },
      { id: 'coldInlet', label: 'Cold Inlet Temp', default: 20, suffix: '°C' },
      { id: 'coldOutlet', label: 'Cold Outlet Temp', default: 60, suffix: '°C' },
      { id: 'overallU', label: 'Overall Heat Transfer Coeff (U)', default: 500, suffix: 'W/m²·K' },
      { id: 'effectiveness', label: 'Effectiveness', default: 80, suffix: '%' },
    ],
    calc: calcHeatExchanger,
  },
  fluidflow: {
    name: 'Fluid Flow Calculator', desc: 'Reynolds number, velocity and pressure drop in pipes',
    icon: 'fa-water', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'pipeDia', label: 'Pipe Inner Diameter', default: 50, suffix: 'mm' },
      { id: 'pipeLength', label: 'Pipe Length', default: 100, suffix: 'm' },
      { id: 'flowRate', label: 'Flow Rate', default: 5, suffix: 'L/min' },
      { id: 'density', label: 'Fluid Density', default: 998, suffix: 'kg/m³' },
      { id: 'viscosity', label: 'Dynamic Viscosity', default: 0.001, suffix: 'Pa·s' },
    ],
    calc: calcFluidFlow,
  },
  springforce: {
    name: 'Spring Force Calculator', desc: 'Hooke\'s law — force, energy and frequency of springs',
    icon: 'fa-compress', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'springConstant', label: 'Spring Constant (k)', default: 500, suffix: 'N/m' },
      { id: 'displacement', label: 'Displacement (x)', default: 20, suffix: 'mm' },
      { id: 'mass_spring', label: 'Attached Mass', default: 1, suffix: 'kg' },
    ],
    calc: calcSpringForce,
  },
  gearratio: {
    name: 'Gear Ratio Calculator', desc: 'Speed, torque and power through gear trains',
    icon: 'fa-gears', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'drivingTeeth', label: 'Driving Gear Teeth', default: 20 },
      { id: 'drivenTeeth', label: 'Driven Gear Teeth', default: 60 },
      { id: 'inputRPM', label: 'Input RPM', default: 1500, suffix: 'RPM' },
      { id: 'inputTorque', label: 'Input Torque', default: 10, suffix: 'N·m' },
      { id: 'gearEfficiency', label: 'Gear Efficiency', default: 95, suffix: '%' },
    ],
    calc: calcGearRatio,
  },
  concretemix: {
    name: 'Concrete Mix Design Calculator', desc: 'Cement, sand, aggregate and water quantities per mix ratio',
    icon: 'fa-cubes-stacked', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'volume_cm', label: 'Concrete Volume Needed', default: 1, suffix: 'm³' },
      { id: 'wastage_cm', label: 'Wastage Allowance', default: 5, suffix: '%' },
      { id: 'mixRatio', label: 'Mix Ratio', type: 'select', options: ['M10 (1:3:6)', 'M15 (1:2:4)', 'M20 (1:1.5:3)', 'M25 (1:1:2)', 'M30 (Design Mix)', 'Custom'] },
    ],
    calc: calcConcreteMix,
  },
  materialwaste: {
    name: 'Material Wastage Calculator', desc: 'Tile, paint, flooring material with wastage factor',
    icon: 'fa-recycle', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'material_mw', label: 'Material Type', type: 'select', options: ['Tiles (floor/wall)', 'Paint (interior)', 'Paint (exterior)', 'Laminate Flooring', 'Wallpaper', 'Carpet'] },
      { id: 'area_mw', label: 'Surface Area', default: 500, suffix: 'sq ft' },
      { id: 'materialSize', label: 'Tile Size (if applicable)', type: 'select', options: ['2×2 ft', '1×2 ft', '1×1 ft', 'Custom'] },
      { id: 'coats', label: 'Number of Coats (paint)', default: 2 },
      { id: 'wastage_mw', label: 'Wastage Allowance', default: 10, suffix: '%' },
    ],
    calc: calcMaterialWaste,
  },
  rainwater: {
    name: 'Rainwater Harvesting Calculator', desc: 'Potential rainwater collection and tank size for your roof',
    icon: 'fa-cloud-rain', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'roofArea_rw', label: 'Catchment / Roof Area', default: 1000, suffix: 'sq ft' },
      { id: 'annualRainfall', label: 'Annual Rainfall', default: 800, suffix: 'mm' },
      { id: 'runoffCoeff', label: 'Runoff Coefficient', type: 'select', options: ['0.9 (concrete/metal roof)', '0.8 (tiled roof)', '0.6 (ground/gravel)', 'Custom'] },
      { id: 'dailyDemand_rw', label: 'Daily Water Demand', default: 500, suffix: 'litres' },
    ],
    calc: calcRainwater,
  },
  staircase: {
    name: 'Staircase Calculator', desc: 'Riser, tread, stringer length and 2R+T comfort check',
    icon: 'fa-stairs', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'totalRise', label: 'Total Floor Height', default: 3000, suffix: 'mm' },
      { id: 'targetRiser', label: 'Target Riser Height', default: 175, suffix: 'mm' },
      { id: 'targetTread', label: 'Target Tread Depth', default: 275, suffix: 'mm' },
    ],
    calc: calcStaircase,
  },
  septicTank: {
    name: 'Septic Tank Size Calculator', desc: 'Tank dimensions based on users and desludging interval',
    icon: 'fa-toilet', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'users', label: 'Number of Users', default: 6 },
      { id: 'waterPerPerson', label: 'Water Usage per Person', default: 150, suffix: 'L/day' },
      { id: 'interval', label: 'Desludging Interval', default: 2, suffix: 'years' },
    ],
    calc: calcSepticTank,
  },
  electricalLoad: {
    name: 'Home Electrical Load Calculator', desc: 'Connected load, MCB size, inverter recommendation',
    icon: 'fa-bolt', cat: 'construction' as CalculatorCategory,
    inputs: [
      { id: 'acCount', label: 'Number of ACs', default: 1 },
      { id: 'fansCount', label: 'Number of Fans', default: 4 },
      { id: 'lightsCount', label: 'Number of Lights', default: 10 },
      { id: 'geyserCount', label: 'Number of Geysers', default: 1 },
      { id: 'fridgeCount', label: 'Refrigerators', default: 1 },
      { id: 'tvCount', label: 'TVs / Monitors', default: 1 },
      { id: 'ovenCount', label: 'Ovens / Microwaves', default: 0 },
    ],
    calc: calcElectricalLoad,
  },
  fenceWall: {
    name: 'Fence / Boundary Wall Calculator', desc: 'Posts, fencing material and cost for compound walls',
    icon: 'fa-border-top-left', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'fenceLength', label: 'Total Boundary Length', default: 100, suffix: 'm' },
      { id: 'fenceHeight', label: 'Wall/Fence Height', default: 2, suffix: 'm' },
      { id: 'pillarSpacing', label: 'Pillar Spacing', default: 3, suffix: 'm' },
      { id: 'fenceMaterial', label: 'Material Type', type: 'select', options: ['Brick Wall', 'Chain Link Fence', 'Precast Compound Wall', 'Iron Railing', 'Barbed Wire'] },
    ],
    calc: calcFenceWall,
  },
  waterproofing: {
    name: 'Waterproofing Calculator', desc: 'Material quantity and cost for terrace & bathroom waterproofing',
    icon: 'fa-droplet', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'wpArea', label: 'Area to Waterproof', default: 100, suffix: 'm²' },
      { id: 'wpMethod', label: 'Waterproofing Method', type: 'select', options: ['Cementitious Coating', 'Liquid Membrane', 'Bituminous Coating', 'PU (Polyurethane)', 'APP Membrane Sheet'] },
      { id: 'wpCoats', label: 'Number of Coats', default: 2 },
    ],
    calc: calcWaterproofing,
  },
  falseCeiling: {
    name: 'False Ceiling Calculator', desc: 'Panels, channels, screws and cost estimate',
    icon: 'fa-maximize', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'fcLength', label: 'Room Length', default: 5, suffix: 'm' },
      { id: 'fcWidth', label: 'Room Width', default: 4, suffix: 'm' },
      { id: 'fcMaterial', label: 'Ceiling Material', type: 'select', options: ['Gypsum Board', 'POP (Plaster of Paris)', 'Grid / Mineral Fiber', 'PVC Panel', 'Wooden'] },
    ],
    calc: calcFalseCeiling,
  },
  columnFooting: {
    name: 'Column / Footing Size Calculator', desc: 'Footing dimensions, concrete and rebar for columns',
    icon: 'fa-arrows-down-to-line', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'colLoad', label: 'Column Load', default: 500, suffix: 'kN' },
      { id: 'soilBearing', label: 'Soil Bearing Capacity', default: 150, suffix: 'kN/m²' },
      { id: 'colSize', label: 'Column Size', default: 300, suffix: 'mm' },
    ],
    calc: calcColumnFooting,
  },
  windowDoor: {
    name: 'Window & Door Cost Estimator', desc: 'Frame, glass and hardware cost for all openings',
    icon: 'fa-door-open', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'doorCount', label: 'Number of Doors', default: 3 },
      { id: 'windowCount', label: 'Number of Windows', default: 4 },
      { id: 'wdMaterial', label: 'Material Type', type: 'select', options: ['Wooden (Teak)', 'Wooden (Sal)', 'UPVC', 'Aluminium', 'Steel'] },
    ],
    calc: calcWindowDoor,
  },
  sandGravel: {
    name: 'Sand & Gravel Calculator', desc: 'Quantity in m³, tonnes and truck loads',
    icon: 'fa-mound', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'sgArea', label: 'Area', default: 50, suffix: 'm²' },
      { id: 'sgDepth', label: 'Depth/Thickness', default: 150, suffix: 'mm' },
      { id: 'sgMaterial', label: 'Material Type', type: 'select', options: ['River Sand', 'M-Sand (Manufactured)', 'Pit Sand', 'Gravel (20mm)', 'Gravel (40mm)', 'Stone Dust'] },
    ],
    calc: calcSandGravel,
  },
  scaffolding: {
    name: 'Scaffolding Calculator', desc: 'Frames, planks, lifts and rental cost estimate',
    icon: 'fa-building-lock', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'scHeight', label: 'Building Height', default: 12, suffix: 'm' },
      { id: 'scPerimeter', label: 'Building Perimeter', default: 60, suffix: 'm' },
      { id: 'scType', label: 'Scaffold Type', type: 'select', options: ['Steel Tubular', 'H-Frame', 'Cup-Lock', 'Bamboo'] },
      { id: 'scDuration', label: 'Rental Duration', default: 30, suffix: 'days' },
    ],
    calc: calcScaffolding,
  },
  carpetArea: {
    name: 'RERA Carpet Area Calculator', desc: 'Carpet area from super built-up with loading factor',
    icon: 'fa-ruler-combined', cat: 'construction' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'superBuiltUp', label: 'Super Built-Up Area', default: 1200, suffix: 'sq ft' },
      { id: 'loadingPct', label: 'Loading Factor', default: 30, suffix: '%' },
      { id: 'balconyArea', label: 'Balcony Area', default: 50, suffix: 'sq ft' },
      { id: 'pricePerSqft', label: 'Price per Sq Ft (Super Built-Up)', default: 5000, prefix: '₹' },
    ],
    calc: calcCarpetArea,
  },
  ecomprofit: {
    name: 'E-commerce Profit Calculator', desc: 'True profit per order with all hidden costs included',
    icon: 'fa-cart-shopping', cat: 'everyday' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'sellingPrice_ec', label: 'Selling Price', default: 999, prefix: '₹' },
      { id: 'productCost_ec', label: 'Product / Manufacturing Cost', default: 350, prefix: '₹' },
      { id: 'shippingCost', label: 'Shipping Cost', default: 60, prefix: '₹' },
      { id: 'platformFee', label: 'Platform Fee', default: 15, suffix: '%' },
    ],
    calc: calcEcomProfit,
  },
  restaurantcost: {
    name: 'Restaurant Food Cost Calculator', desc: 'Menu pricing based on food cost percentage target',
    icon: 'fa-utensils', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'ingredientCost', label: 'Ingredient / Raw Cost', default: 120, prefix: '₹' },
      { id: 'targetFoodCost', label: 'Target Food Cost %', default: 30, suffix: '%' },
      { id: 'portionSize', label: 'Portion Size', default: 1, suffix: 'servings' },
      { id: 'wastageFood', label: 'Prep Wastage %', default: 10, suffix: '%' },
    ],
    calc: calcRestaurantCost,
  },
  subscriptionpricing: {
    name: 'Subscription Pricing Calculator', desc: 'MRR, ARR, churn impact and LTV calculations',
    icon: 'fa-repeat', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'monthlyPrice', label: 'Monthly Subscription Price', default: 499, prefix: '₹' },
      { id: 'subscribers', label: 'Current Subscribers', default: 500 },
      { id: 'monthlyChurn', label: 'Monthly Churn Rate', default: 5, suffix: '%' },
      { id: 'monthlyNewSub', label: 'New Subscribers per Month', default: 50 },
      { id: 'acquisitionCost', label: 'Customer Acquisition Cost', default: 200, prefix: '₹' },
      { id: 'annualDiscountPct', label: 'Annual Plan Discount', default: 20, suffix: '%' },
    ],
    calc: calcSubscriptionPricing,
  },
  uniteconomics: {
    name: 'Unit Economics Calculator', desc: 'LTV, CAC, payback period and contribution margin per unit',
    icon: 'fa-chart-bar', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'revenuePerUnit', label: 'Revenue per Unit / Order', default: 500, prefix: '₹' },
      { id: 'cogsPerUnit', label: 'COGS per Unit', default: 200, prefix: '₹' },
      { id: 'opexPerUnit', label: 'Operating Cost per Unit', default: 100, prefix: '₹' },
      { id: 'cac_ue', label: 'Customer Acquisition Cost', default: 300, prefix: '₹' },
      { id: 'avgOrders', label: 'Avg Orders per Customer Lifetime', default: 8 },
      { id: 'avgLifetimeMonths', label: 'Avg Customer Lifetime', default: 12, suffix: 'months' },
    ],
    calc: calcUnitEconomics,
  },
  eventbudget: {
    name: 'Event Budget Calculator', desc: 'Complete event cost breakdown by category',
    icon: 'fa-calendar-day', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'guests', label: 'Number of Guests', default: 100 },
      { id: 'venueCost', label: 'Venue Cost', default: 50000, prefix: '₹' },
      { id: 'cateringPerHead', label: 'Catering per Head', default: 800, prefix: '₹' },
      { id: 'decorCost', label: 'Decoration Cost', default: 25000, prefix: '₹' },
      { id: 'entertainment', label: 'Entertainment / DJ', default: 15000, prefix: '₹' },
      { id: 'photography_ev', label: 'Photography / Video', default: 20000, prefix: '₹' },
      { id: 'miscPct_ev', label: 'Miscellaneous Buffer', default: 15, suffix: '%' },
    ],
    calc: calcEventBudget,
  },
  householdbudget: {
    name: 'Household Budget Planner', desc: '50/30/20 rule and category-wise monthly budget breakdown',
    icon: 'fa-house-user', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'monthlyIncome_hb', label: 'Monthly Take-Home Income', default: 60000, prefix: '₹' },
      { id: 'rentEmi', label: 'Rent / EMI', default: 15000, prefix: '₹' },
      { id: 'groceries', label: 'Groceries & Household', default: 8000, prefix: '₹' },
      { id: 'utilities_hb', label: 'Utilities (electric, water, wifi)', default: 3000, prefix: '₹' },
      { id: 'transport_hb', label: 'Transport / Fuel', default: 3000, prefix: '₹' },
      { id: 'insurance_hb', label: 'Insurance Premiums', default: 2000, prefix: '₹' },
      { id: 'lifestyle_hb', label: 'Lifestyle / Dining / Entertainment', default: 5000, prefix: '₹' },
      { id: 'savingsTarget_hb', label: 'Savings Target', default: 20, suffix: '%' },
    ],
    calc: calcHouseholdBudget,
  },
  sgb: {
    name: 'Sovereign Gold Bond (SGB) Calculator', desc: 'SGB maturity value, interest earned & returns vs physical gold',
    icon: 'fa-coins', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'sgb_amount', label: 'Investment Amount', default: 100000, prefix: '₹' },
      { id: 'sgb_issuePrice', label: 'Issue Price per Gram', default: 6000, prefix: '₹' },
      { id: 'sgb_expectedPrice', label: 'Expected Gold Price at Maturity (₹/gram)', default: 9000, prefix: '₹' },
    ],
    calc: calcSGB,
  },
  foTurnover: {
    name: 'F&O Turnover Calculator (ITR-3)', desc: 'Calculate F&O trading turnover for income tax filing as per ICAI guidelines',
    icon: 'fa-chart-line', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'fo_futuresProfit', label: 'Futures Total Profit', default: 22000, prefix: '₹' },
      { id: 'fo_futuresLoss', label: 'Futures Total Loss (absolute)', default: 14000, prefix: '₹' },
      { id: 'fo_optionsPremium', label: 'Options Premium Received', default: 18000, prefix: '₹' },
      { id: 'fo_optionsPL', label: 'Options Net Profit/Loss (absolute)', default: 6000, prefix: '₹' },
    ],
    calc: calcFoTurnover,
  },
  presumptiveTax: {
    name: 'Presumptive Tax Calculator (44AD/44ADA)', desc: 'Presumptive income tax for small businesses & professionals without full books',
    icon: 'fa-file-invoice', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'pt_type', label: 'Business Type', type: 'select', options: ['Business (44AD)', 'Professional (44ADA)'] },
      { id: 'pt_turnover', label: 'Annual Turnover / Gross Receipts', default: 5000000, prefix: '₹' },
      { id: 'pt_cashPct', label: 'Cash Receipts Percentage', default: 20, suffix: '%' },
    ],
    calc: calcPresumptiveTax,
  },
  homeloanTaxBenefit: {
    name: 'Home Loan Tax Benefit Calculator', desc: 'Income tax savings on home loan interest (24b) & principal (80C)',
    icon: 'fa-house-circle-check', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'hltb_interest', label: 'Annual Interest Paid', default: 240000, prefix: '₹' },
      { id: 'hltb_principal', label: 'Annual Principal Repaid', default: 120000, prefix: '₹' },
      { id: 'hltb_income', label: 'Annual Income', default: 1500000, prefix: '₹' },
      { id: 'hltb_other80c', label: 'Other 80C Investments', default: 30000, prefix: '₹' },
    ],
    calc: calcHomeLoanTaxBenefit,
  },
  indexedCost: {
    name: 'Indexed Cost of Acquisition Calculator', desc: 'Calculate indexed cost using CII for long-term capital gains tax',
    icon: 'fa-calculator', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'ic_purchasePrice', label: 'Original Purchase Price', default: 3000000, prefix: '₹' },
      { id: 'ic_salePrice', label: 'Sale Price', default: 12000000, prefix: '₹' },
    ],
    calc: calcIndexedCost,
  },
  goldComparison: {
    name: 'Digital Gold vs SGB vs Gold ETF', desc: 'Compare returns, taxes & charges across gold investment options',
    icon: 'fa-scale-balanced', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'gc_amount', label: 'Investment Amount', default: 100000, prefix: '₹' },
      { id: 'gc_years', label: 'Investment Period', default: 5, suffix: 'years' },
      { id: 'gc_goldReturn', label: 'Expected Gold Price Growth', default: 8, suffix: '% p.a.' },
    ],
    calc: calcGoldComparison,
  },
  rentYield: {
    name: 'Rental Yield Calculator', desc: 'Gross & net rental yield on investment property',
    icon: 'fa-building', cat: 'finance' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'ry_propertyValue', label: 'Property Value', default: 8000000, prefix: '₹' },
      { id: 'ry_monthlyRent', label: 'Monthly Rent', default: 22000, prefix: '₹' },
      { id: 'ry_maintenance', label: 'Annual Maintenance', default: 24000, prefix: '₹' },
      { id: 'ry_propertyTax', label: 'Annual Property Tax', default: 12000, prefix: '₹' },
      { id: 'ry_vacancy', label: 'Vacancy Period', default: 1, suffix: 'months/year' },
    ],
    calc: calcRentYield,
  },
  intermittentFasting: {
    name: 'Intermittent Fasting Window Calculator', desc: 'Calculate eating & fasting windows for 16:8, 18:6, 20:4, OMAD protocols',
    icon: 'fa-clock', cat: 'health' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'if_protocol', label: 'Fasting Protocol', type: 'select', options: ['16:8', '18:6', '20:4', 'OMAD (23:1)'] },
      { id: 'if_eatStart', label: 'First Meal Time', default: '12:00', type: 'time' },
      { id: 'if_wakeTime', label: 'Wake-Up Time', default: '07:00', type: 'time' },
    ],
    calc: calcIntermittentFasting,
  },
  waistHeightRatio: {
    name: 'Waist-to-Height Ratio Calculator', desc: 'Better predictor of cardiovascular risk than BMI — keep waist below half your height',
    icon: 'fa-ruler-vertical', cat: 'health' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'whr_waist', label: 'Waist Circumference', default: 85, suffix: 'cm' },
      { id: 'whr_height', label: 'Height', default: 170, suffix: 'cm' },
    ],
    calc: calcWaistHeightRatio,
  },
  cgpaToPercentage: {
    name: 'CGPA to Percentage Converter', desc: 'Convert CGPA to percentage for any university scale — 10-point, 4-point, VTU, Mumbai, Anna',
    icon: 'fa-graduation-cap', cat: 'education' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'ctp_cgpa', label: 'Your CGPA', default: 8.4 },
    ],
    calc: calcCgpaToPercentage,
  },
  retirementDate: {
    name: 'Retirement Date Calculator', desc: 'Exact retirement date, days/months/years remaining based on DOB & retirement age',
    icon: 'fa-calendar-check', cat: 'datetime' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'rd_dob', label: 'Date of Birth', type: 'date' },
    ],
    calc: calcRetirementDate,
  },
  ageUnits: {
    name: 'Age in Days, Hours & Minutes', desc: 'Your exact age in years, months, days, hours, minutes & weeks',
    icon: 'fa-hourglass-half', cat: 'datetime' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'au_dob', label: 'Date of Birth', type: 'date' },
      { id: 'au_time', label: 'Time of Birth (optional)', default: '00:00', type: 'time' },
    ],
    calc: calcAgeUnits,
  },
  dataUsage: {
    name: 'Mobile Data Usage Calculator', desc: 'Calculate daily & monthly mobile data consumption by app — find the right Jio/Airtel plan',
    icon: 'fa-wifi', cat: 'everyday' as CalculatorCategory, badge: 'New',
    inputs: [
      { id: 'du_youtube', label: 'YouTube (hours/day)', default: 1, suffix: 'hrs' },
    ],
    calc: calcDataUsage,
  },

  // ═══ PHASE 1: NEW CALCULATORS ═══════════════════════

  // ── Finance (5 new) ────────────────────────────────
  emivstenure: {
    name: 'EMI vs Tenure Trade-off Calculator', desc: 'Compare EMI and total interest for different loan tenures',
    icon: 'fa-scale-balanced', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal', label: 'Loan Amount (₹)', default: 1000000 },
      { id: 'rate', label: 'Interest Rate (%)', default: 8.5, suffix: '%' },
      { id: 'tenure1', label: 'Tenure Option 1 (months)', default: 60 },
      { id: 'tenure2', label: 'Tenure Option 2 (months)', default: 120 },
    ],
    calc: calcEmiVsTenure,
  },
  ruleof72: {
    name: 'Rule of 72 Calculator', desc: 'How long to double your investment at a given return rate',
    icon: 'fa-arrows-rotate', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'rate', label: 'Annual Interest Rate (%)', default: 12, suffix: '%' },
    ],
    calc: calcRuleOf72,
  },
  postofficemis: {
    name: 'Post Office MIS Calculator', desc: 'Monthly Income Scheme returns and comparison with FD',
    icon: 'fa-building-columns', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'amount', label: 'Investment Amount (₹)', default: 500000 },
      { id: 'rate', label: 'MIS Interest Rate (%)', default: 7.4, suffix: '%' },
    ],
    calc: calcPostOfficeMIS,
  },
  cryptoprofit: {
    name: 'Crypto Profit/Loss Calculator', desc: 'Calculate crypto trading profit, fees, and India tax',
    icon: 'fa-bitcoin-sign', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'buyPrice', label: 'Buy Price (₹)', default: 50000 },
      { id: 'sellPrice', label: 'Sell Price (₹)', default: 65000 },
      { id: 'quantity', label: 'Quantity (coins)', default: 0.5 },
      { id: 'fee', label: 'Exchange Fee (%)', default: 0.1, suffix: '%' },
    ],
    calc: calcCryptoProfit,
  },
  flatvsreducing: {
    name: 'Flat vs Reducing Rate Calculator', desc: 'Compare flat rate and reducing balance interest on loans',
    icon: 'fa-arrows-left-right', cat: 'finance' as CalculatorCategory,
    inputs: [
      { id: 'principal', label: 'Loan Amount (₹)', default: 1000000 },
      { id: 'flatRate', label: 'Flat Interest Rate (%)', default: 7, suffix: '%' },
      { id: 'reducingRate', label: 'Reducing Balance Rate (%)', default: 12, suffix: '%' },
      { id: 'tenure', label: 'Tenure (months)', default: 60 },
    ],
    calc: calcFlatVsReducing,
  },

  // ── Health (5 new) ─────────────────────────────────
  pregnancyweight: {
    name: 'Pregnancy Weight Gain Calculator', desc: 'Track pregnancy weight gain against IOM guidelines',
    icon: 'fa-baby', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'preWeight', label: 'Pre-pregnancy Weight (kg)', default: 60 },
      { id: 'currentWeight', label: 'Current Weight (kg)', default: 65 },
      { id: 'height_pw', label: 'Height (cm)', default: 160 },
      { id: 'weeks', label: 'Weeks Pregnant', default: 20 },
      { id: 'twins', label: 'Pregnancy Type', default: 'Single', options: ['Single', 'Twins'] },
    ],
    calc: calcPregnancyWeight,
  },
  breastmilk: {
    name: 'Breastmilk / Formula Calculator', desc: 'Calculate daily milk intake and feeding schedule for babies',
    icon: 'fa-bottle-water', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'babyWeight', label: 'Baby Weight (kg)', default: 4 },
      { id: 'ageMonths', label: 'Age (months)', default: 3 },
      { id: 'feedingType', label: 'Feeding Type', default: 'Breastmilk', options: ['Breastmilk', 'Formula', 'Mixed'] },
    ],
    calc: calcBreastmilk,
  },
  stepcounter: {
    name: 'Steps to Calories Calculator', desc: 'Convert daily steps to calories burned and distance',
    icon: 'fa-shoe-prints', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'steps', label: 'Steps Taken', default: 10000 },
      { id: 'weight_sc', label: 'Your Weight (kg)', default: 70 },
      { id: 'height_sc', label: 'Your Height (cm)', default: 170 },
      { id: 'speed_sc', label: 'Walking Speed', default: 'Normal', options: ['Slow', 'Normal', 'Brisk', 'Running'] },
    ],
    calc: calcStepCounter,
  },
  bacdetailed: {
    name: 'BAC & Sober Time Calculator', desc: 'Detailed blood alcohol content with drink types and legal limits',
    icon: 'fa-wine-glass', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'drinkType', label: 'Drink Type', default: 'Beer (330mL, 5%)', options: ['Beer (330mL, 5%)', 'Wine (150mL, 12%)', 'Whisky (30mL, 40%)', 'Vodka (30mL, 40%)', 'Cocktail (200mL, ~15%)'] },
      { id: 'numDrinks', label: 'Number of Drinks', default: 2 },
      { id: 'weight_bac', label: 'Body Weight (kg)', default: 70 },
      { id: 'gender_bac', label: 'Gender', default: 'Male', options: ['Male', 'Female'] },
      { id: 'hours_bac', label: 'Hours Since First Drink', default: 1 },
    ],
    calc: calcBACDetailed,
  },
  menstrualcycle: {
    name: 'Period & Menstrual Cycle Calculator', desc: 'Predict next 6 periods, fertile windows, and PMS dates',
    icon: 'fa-calendar-days', cat: 'health' as CalculatorCategory,
    inputs: [
      { id: 'lastPeriodDate', label: 'Last Period Start Date', type: 'date' as const },
      { id: 'cycleLength', label: 'Average Cycle Length (days)', default: 28 },
      { id: 'periodDuration', label: 'Period Duration (days)', default: 5 },
    ],
    calc: calcMenstrualCycle,
  },

  // ── Tech & Developer (3 new) ──────────────────────
  passwordstrength: {
    name: 'Password Strength Checker', desc: 'Analyze password entropy, crack time, and get suggestions',
    icon: 'fa-lock', cat: 'tech' as CalculatorCategory,
    inputs: [
      { id: 'password', label: 'Enter Password', type: 'text' as const },
    ],
    calc: calcPasswordStrength,
  },
  subnet: {
    name: 'IP Subnet Calculator', desc: 'Calculate network address, host range, and subnet details',
    icon: 'fa-network-wired', cat: 'tech' as CalculatorCategory,
    inputs: [
      { id: 'ip', label: 'IP Address', default: '192.168.1.0', type: 'text' as const },
      { id: 'cidr', label: 'CIDR / Prefix Length', default: 24 },
    ],
    calc: calcSubnet,
  },
  bandwidth: {
    name: 'Bandwidth & Download Time Calculator', desc: 'Estimate download time and streaming quality',
    icon: 'fa-gauge-high', cat: 'tech' as CalculatorCategory,
    inputs: [
      { id: 'fileSize', label: 'File Size (MB)', default: 1000 },
      { id: 'speed', label: 'Internet Speed (Mbps)', default: 100 },
    ],
    calc: calcBandwidth,
  },
  colorconverter: {
    name: 'Color Code Converter', desc: 'Convert between HEX, RGB, HSL, and CMYK color codes',
    icon: 'fa-palette', cat: 'tech' as CalculatorCategory,
    inputs: [
      { id: 'colorInput', label: 'Color (HEX or RGB)', default: '#3B82F6', type: 'text' as const },
    ],
    calc: calcColorConverter,
  },

  // ── Everyday (3 new) ──────────────────────────────
  wordcounter: {
    name: 'Word & Character Counter', desc: 'Count words, characters, sentences, and reading time',
    icon: 'fa-spell-check', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'text', label: 'Paste your text here', type: 'text' as const },
    ],
    calc: calcWordCounter,
  },
  aspectratio: {
    name: 'Aspect Ratio Calculator', desc: 'Calculate aspect ratio, match social media presets',
    icon: 'fa-expand', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'width', label: 'Width (px)', default: 1920 },
      { id: 'height', label: 'Height (px)', default: 1080 },
    ],
    calc: calcAspectRatio,
  },
  socialmediaimage: {
    name: 'Social Media Image Size Calculator', desc: 'Get recommended image sizes for all social platforms',
    icon: 'fa-image', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'platform', label: 'Platform', default: 'Instagram', options: ['Instagram', 'YouTube', 'Twitter / X', 'LinkedIn', 'Facebook'] },
    ],
    calc: calcSocialMediaImage,
  },
  dogage: {
    name: 'Dog Age Calculator', desc: 'Scientific dog-to-human age converter by breed size',
    icon: 'fa-dog', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'dogAge', label: 'Dog Age (years)', default: 5 },
      { id: 'breedSize', label: 'Breed Size', default: 'Medium', options: ['Small', 'Medium', 'Large', 'Giant'] },
    ],
    calc: calcDogAge,
  },

  // ── Science (4 new) ───────────────────────────────
  idealGas: {
    name: 'Ideal Gas Law Calculator', desc: 'Solve PV = nRT for pressure, volume, moles, or temperature',
    icon: 'fa-wind', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'solveFor', label: 'Solve For', default: 'Temperature', options: ['Temperature', 'Pressure', 'Volume', 'Moles'] },
      { id: 'pressure', label: 'Pressure (P)', default: 1, suffix: 'atm' },
      { id: 'volume_ig', label: 'Volume (V)', default: 22.4, suffix: 'L' },
      { id: 'moles_ig', label: 'Moles (n)', default: 1, suffix: 'mol' },
      { id: 'temp_ig', label: 'Temperature (T)', default: 273.15, suffix: 'K' },
    ],
    calc: calcIdealGas,
  },
  coulombsLaw: {
    name: "Coulomb's Law Calculator", desc: 'Calculate electrostatic force between two charges',
    icon: 'fa-bolt', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'charge1', label: 'Charge q₁', default: 1e-6, suffix: 'C' },
      { id: 'charge2', label: 'Charge q₂', default: -1e-6, suffix: 'C' },
      { id: 'distance_c', label: 'Distance (r)', default: 0.1, suffix: 'm' },
    ],
    calc: calcCoulombsLaw,
  },
  escapeVelocity: {
    name: 'Escape Velocity Calculator', desc: 'Calculate the escape velocity and orbital velocity of a celestial body',
    icon: 'fa-rocket', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'planetMass', label: 'Mass of Planet/Body', default: 5.972e24, suffix: 'kg' },
      { id: 'planetRadius', label: 'Radius of Planet/Body', default: 6371000, suffix: 'm' },
    ],
    calc: calcEscapeVelocity,
  },
  soundSpeed: {
    name: 'Speed of Sound Calculator', desc: 'Calculate speed of sound in various media and temperatures',
    icon: 'fa-volume-high', cat: 'science' as CalculatorCategory,
    inputs: [
      { id: 'medium', label: 'Medium', default: 'Air', options: ['Air', 'Water', 'Steel', 'Glass', 'Wood', 'Concrete', 'Helium'] },
      { id: 'temperature_ss', label: 'Temperature', default: 20, suffix: '°C' },
    ],
    calc: calcSoundSpeed,
  },

  // ── Date & Time (3 new) ───────────────────────────
  leapYear: {
    name: 'Leap Year Checker', desc: 'Determine if a year is a leap year and view leap calendar details',
    icon: 'fa-calendar-check', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'year', label: 'Year', default: 2024 },
    ],
    calc: calcLeapYear,
  },
  weekNumber: {
    name: 'Week Number & Day of Year', desc: 'Get ISO week number, day of year, and remaining days',
    icon: 'fa-calendar-days', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'date', label: 'Select Date', default: '', type: 'text' as const },
    ],
    calc: calcWeekNumber,
  },
  dateAdd: {
    name: 'Add or Subtract Days', desc: 'Add or subtract days, weeks, months, or years from any date',
    icon: 'fa-calendar-plus', cat: 'datetime' as CalculatorCategory,
    inputs: [
      { id: 'startDate', label: 'Start Date', default: '', type: 'text' as const },
      { id: 'operation', label: 'Operation', default: 'add', options: ['add', 'subtract'] },
      { id: 'days', label: 'Days', default: 0 },
      { id: 'weeks', label: 'Weeks', default: 0 },
      { id: 'months', label: 'Months', default: 0 },
      { id: 'years', label: 'Years', default: 0 },
    ],
    calc: calcDateAdd,
  },

  // ── Unit Conversion (3 new) ───────────────────────
  fuelEfficiency: {
    name: 'Fuel Efficiency Converter', desc: 'Convert fuel efficiency between km/L, L/100km, and MPG',
    icon: 'fa-gas-pump', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Efficiency Value', default: 15 },
      { id: 'from', label: 'Convert From', default: 'km/L', options: ['km/L', 'L/100km', 'MPG US', 'MPG UK'] },
    ],
    calc: calcFuelEfficiency,
  },
  numberWord: {
    name: 'Number to Words Converter', desc: 'Convert any numeric value to Indian and International words',
    icon: 'fa-file-invoice', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Enter Number', default: 123456 },
    ],
    calc: calcNumberWord,
  },
  cookingConvert: {
    name: 'Cooking Measurement Converter', desc: 'Convert recipe units (cups, spoons, ml, grams, and ounces)',
    icon: 'fa-utensils', cat: 'unit' as CalculatorCategory,
    inputs: [
      { id: 'val', label: 'Quantity', default: 1 },
      { id: 'from', label: 'From Unit', default: 'Cups (US)', options: ['Cups (US)', 'Cups (Metric)', 'Tablespoons (US)', 'Teaspoons (US)', 'Milliliters', 'Fluid Ounces (US)', 'Liters', 'Grams (Water)'] },
    ],
    calc: calcCookingConvert,
  },

  // ── Education (5 new) ─────────────────────────────
  marksPercentage: {
    name: 'Marks to Percentage', desc: 'Calculate percentage, grade, and division from exam marks',
    icon: 'fa-square-poll-vertical', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'obtained', label: 'Marks Obtained', default: 82 },
      { id: 'total', label: 'Out of Total Marks', default: 100 },
    ],
    calc: calcMarksPercentage,
  },
  competitiveExam: {
    name: 'Competitive Exam Percentile Predictor', desc: 'Predict exam scores and percentiles based on correct/incorrect attempts',
    icon: 'fa-award', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'exam', label: 'Target Exam', default: 'JEE Main', options: ['JEE Main', 'NEET', 'BITSAT'] },
      { id: 'correct', label: 'Correct Answers', default: 50 },
      { id: 'wrong', label: 'Incorrect Answers (Negative Marks)', default: 10 },
      { id: 'unanswered', label: 'Unattempted Questions', default: 15 },
    ],
    calc: calcCompetitiveExam,
  },
  backlogRecovery: {
    name: 'Backlog Recovery Planner', desc: 'Calculate daily study hours and stress level to clear academic backlogs',
    icon: 'fa-business-time', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'backlogs', label: 'Backlog Subjects', default: 3 },
      { id: 'days', label: 'Days Until Exam', default: 45 },
      { id: 'dailyHours', label: 'Daily Study Hours Limit', default: 4 },
    ],
    calc: calcBacklogRecovery,
  },
  researchMetrics: {
    name: 'Research Paper Metrics', desc: 'Calculate h-index, i10-index, and citation stats for academic profiles',
    icon: 'fa-chart-line', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'citations', label: 'Citation Counts (comma-separated)', default: '24, 18, 11, 7, 5, 2, 0', type: 'text' as const },
    ],
    calc: calcResearchMetrics,
  },
  abroadCost: {
    name: 'Study Abroad Cost Estimator', desc: 'Estimate total study and living costs abroad in INR with EMI breakdown',
    icon: 'fa-plane-departure', cat: 'education' as CalculatorCategory,
    inputs: [
      { id: 'country', label: 'Destination Country', default: 'USA', options: ['USA', 'UK', 'Canada', 'Australia', 'Germany'] },
      { id: 'duration', label: 'Course Duration (years)', default: 2 },
      { id: 'tuition', label: 'Tuition Fees (per year in target currency)', default: 35000 },
      { id: 'living', label: 'Living Costs (per month in target currency)', default: 1500 },
    ],
    calc: calcAbroadCost,
  },

  // ── Phase 3: Everyday (4 new) ──────────────────────
  inflationBasket: {
    name: 'Grocery Inflation Calculator', desc: 'Calculate the future cost of your grocery basket and purchasing power loss',
    icon: 'fa-basket-shopping', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'budget', label: 'Current Monthly Grocery Budget', default: 10000, suffix: '₹' },
      { id: 'inflation', label: 'Expected Annual Inflation Rate', default: 6, suffix: '%' },
      { id: 'years', label: 'Years into Future', default: 5, suffix: 'years' },
    ],
    calc: calcInflationBasket,
  },
  phonePlan: {
    name: 'Mobile Plan Comparator', desc: 'Compare daily data limits, validity, and total cost of two mobile plans',
    icon: 'fa-mobile-screen-button', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'price1', label: 'Plan 1: Price', default: 299, suffix: '₹' },
      { id: 'validity1', label: 'Plan 1: Validity', default: 28, suffix: 'days' },
      { id: 'data1', label: 'Plan 1: Data Limit', default: 1.5, suffix: 'GB/day' },
      { id: 'price2', label: 'Plan 2: Price', default: 749, suffix: '₹' },
      { id: 'validity2', label: 'Plan 2: Validity', default: 84, suffix: 'days' },
      { id: 'data2', label: 'Plan 2: Data Limit', default: 2, suffix: 'GB/day' },
    ],
    calc: calcPhonePlan,
  },
  movingCost: {
    name: 'House Relocation Cost Estimator', desc: 'Estimate packing, transporting, and insurance costs for home shifting',
    icon: 'fa-truck-ramp-box', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'bhk', label: 'Home Size', default: '2 BHK', options: ['1 BHK', '2 BHK', '3 BHK', '4 BHK/Penthouse'] },
      { id: 'distance', label: 'Moving Distance', default: 250, suffix: 'km' },
      { id: 'quality', label: 'Packing Quality', default: 'Premium', options: ['Economy', 'Premium', 'Super Deluxe'] },
    ],
    calc: calcMovingCost,
  },
  laundryLoad: {
    name: 'Washing Machine Load Calculator', desc: 'Determine perfect laundry load weight and estimate water and power use',
    icon: 'fa-soap', cat: 'everyday' as CalculatorCategory,
    inputs: [
      { id: 'capacity', label: 'Washing Machine Capacity', default: 7, suffix: 'kg' },
      { id: 'shirts', label: 'Number of Shirts/T-shirts', default: 6 },
      { id: 'pants', label: 'Number of Jeans/Pants', default: 4 },
      { id: 'towels', label: 'Number of Bath Towels', default: 2 },
      { id: 'bedsheets', label: 'Number of Bedsheets', default: 1 },
    ],
    calc: calcLaundryLoad,
  },

  // ── Phase 3: Tech & Engineering (3 new) ────────────
  jsonFormatter: {
    name: 'JSON Formatter & Validator', desc: 'Prettify, validate, minify, and analyze JSON structure',
    icon: 'fa-code', cat: 'tech' as CalculatorCategory,
    inputs: [
      { id: 'jsonInput', label: 'Paste JSON Input here', default: '{"name": "CalcLabz", "type": "Utility", "features": ["Speed", "SEO"]}', type: 'text' as const },
    ],
    calc: calcJsonFormatter,
  },
  motorSize: {
    name: 'Electric Motor Sizing Calculator', desc: 'Calculate the required electric motor horsepower and kW from load torque and speed',
    icon: 'fa-engine', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'torque', label: 'Load Torque', default: 15, suffix: 'N-m' },
      { id: 'speed', label: 'Rotational Speed', default: 1440, suffix: 'RPM' },
      { id: 'safety', label: 'Safety Factor', default: 1.25 },
    ],
    calc: calcMotorSize,
  },
  resistorDecode: {
    name: 'Resistor Color Code Decoder', desc: 'Decode 4-band resistor color bands into Ohm value and tolerance percentage',
    icon: 'fa-barcode', cat: 'engineering' as CalculatorCategory,
    inputs: [
      { id: 'band1', label: 'Band 1 Color (1st digit)', default: 'Brown', options: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'] },
      { id: 'band2', label: 'Band 2 Color (2nd digit)', default: 'Black', options: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'] },
      { id: 'multiplier_r', label: 'Multiplier Color', default: 'Red', options: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gold', 'Silver'] },
      { id: 'tolerance_r', label: 'Tolerance Color', default: 'Gold', options: ['Brown', 'Red', 'Green', 'Blue', 'Violet', 'Gold', 'Silver'] },
    ],
    calc: calcResistorDecode,
  },
};

// ── SLUG RESOLUTION ─────────────────────────────────
const slugToId: Record<string, string> = {};
const idToSlug: Record<string, string> = {};

Object.keys(DB).forEach((id) => {
  const slug = id.toLowerCase().replace(/_/g, '-') + '-calculator';
  slugToId[slug] = id;
  idToSlug[id] = slug;
});

// Additional slug redirects
const slugRedirects: Record<string, string> = {
  'car-loan-calculator': 'carloan',
  'compound-interest-calculator': 'compoundinterest',
  'simple-interest-calculator': 'simpleinterest',
  'income-tax-calculator': 'incometax',
  'tax-regime-calculator': 'taxregime',
  'step-up-sip-calculator': 'stepupsip',
  'body-fat-calculator': 'bodyfat',
  'blood-pressure-calculator': 'bloodpressure',
  'protein-intake-calculator': 'proteinintake',
  'construction-cost-calculator': 'constructioncost',
  'calorie-deficit-calculator': 'caloriedeficit',
  'speed-dist-calculator': 'speed_dist',
  'ohm-advanced-calculator': 'ohm_advanced',
  'number-system-calculator': 'numbersystem',
  'square-root-calculator': 'squareroot',

  // New redirects matching next.config.ts rewrites
  'credit-card-calculator': 'creditcard',
  'stock-return-calculator': 'stockreturn',
  'capital-gains-calculator': 'capitalgains',
  'savings-goal-calculator': 'savingsgoal',
  'dividend-yield-calculator': 'dividendyield',
  'gold-investment-calculator': 'goldinvestment',
  'loan-eligibility-calculator': 'loaneligibility',
  'balance-transfer-calculator': 'balancetransfer',
  'advance-tax-calculator': 'advancetax',
  'in-hand-salary-calculator': 'inhandsalary',
  'ctc-breakup-calculator': 'ctcbreakup',
  'tax-saving-calculator': 'taxsaving',
  'retirement-corpus-calculator': 'retirementcorpus',
  'smoking-cost-calculator': 'smokingcost',
  'child-height-calculator': 'childheight',
  'diabetes-risk-calculator': 'diabetesrisk',
  'loan-affordability-calculator': 'loanaffordability',
  'calories-food-calculator': 'caloriesfood',
  'stamp-duty-calculator': 'stampdutycalc',
  'solar-panel-calculator': 'solarpanel',
  'home-renovation-calculator': 'homerenovation',
  'professionaltax-calculator': 'proftax',
  'fo-turnover-calculator': 'foTurnover',
  'presumptive-tax-calculator': 'presumptiveTax',
  'homeloan-taxbenefit-calculator': 'homeloanTaxBenefit',
  'indexed-cost-calculator': 'indexedCost',
  'gold-comparison-calculator': 'goldComparison',
  'rent-yield-calculator': 'rentYield',
  'intermittent-fasting-calculator': 'intermittentFasting',
  'waist-height-ratio-calculator': 'waistHeightRatio',
  'cgpa-to-percentage-calculator': 'cgpaToPercentage',
  'retirement-date-calculator': 'retirementDate',
  'age-units-calculator': 'ageUnits',
  'data-usage-calculator': 'dataUsage',
  // Phase 1 new calculators
  'emi-vs-tenure-calculator': 'emivstenure',
  'rule-of-72-calculator': 'ruleof72',
  'post-office-mis-calculator': 'postofficemis',
  'crypto-profit-calculator': 'cryptoprofit',
  'flat-vs-reducing-calculator': 'flatvsreducing',
  'pregnancy-weight-calculator': 'pregnancyweight',
  'breastmilk-calculator': 'breastmilk',
  'step-counter-calculator': 'stepcounter',
  'steps-to-calories-calculator': 'stepcounter',
  'bac-calculator': 'bacdetailed',
  'menstrual-cycle-calculator': 'menstrualcycle',
  'period-calculator': 'menstrualcycle',
  'password-strength-calculator': 'passwordstrength',
  'word-counter-calculator': 'wordcounter',
  'aspect-ratio-calculator': 'aspectratio',
  'social-media-image-calculator': 'socialmediaimage',
  'dog-age-calculator': 'dogage',
  'subnet-calculator': 'subnet',
  'ip-subnet-calculator': 'subnet',
  'bandwidth-calculator': 'bandwidth',
  'download-time-calculator': 'bandwidth',
  'color-converter-calculator': 'colorconverter',
  'hex-to-rgb-calculator': 'colorconverter',
  // Phase 2 — Science
  'ideal-gas-law-calculator': 'idealGas',
  'coulombs-law-calculator': 'coulombsLaw',
  'escape-velocity-calculator': 'escapeVelocity',
  'speed-of-sound-calculator': 'soundSpeed',
  // Phase 2 — Date & Time
  'leap-year-calculator': 'leapYear',
  'week-number-calculator': 'weekNumber',
  'date-add-calculator': 'dateAdd',
  // Phase 2 — Unit Conversion
  'fuel-efficiency-calculator': 'fuelEfficiency',
  'number-to-words-calculator': 'numberWord',
  'cooking-measurement-calculator': 'cookingConvert',
  // Phase 2 — Education
  'marks-percentage-calculator': 'marksPercentage',
  'competitive-exam-calculator': 'competitiveExam',
  'backlog-recovery-calculator': 'backlogRecovery',
  'research-metrics-calculator': 'researchMetrics',
  'study-abroad-cost-calculator': 'abroadCost',
  // Phase 3 — Everyday
  'grocery-inflation-calculator': 'inflationBasket',
  'mobile-plan-comparator': 'phonePlan',
  'house-relocation-cost-estimator': 'movingCost',
  'washing-machine-load-calculator': 'laundryLoad',
  // Phase 3 — Tech & Engineering
  'json-formatter-validator': 'jsonFormatter',
  'electric-motor-sizing-calculator': 'motorSize',
  'resistor-color-code-decoder': 'resistorDecode',
  // Phase 3 — Construction
  'staircase-calculator': 'staircase',
  'septic-tank-size-calculator': 'septicTank',
  'home-electrical-load-calculator': 'electricalLoad',
  // Engineering — human-friendly hyphenated slugs
  'ohms-law-calculator': 'ohmslaw',
  'volt-divider-calculator': 'voltdivider',
  'voltage-divider-calculator': 'voltdivider',
  'led-resistor-calculator': 'ledresistor',
  'battery-life-calculator': 'batterylife',
  'pcb-trace-calculator': 'pcbtrace',
  'pcb-trace-width-calculator': 'pcbtrace',
  'antenna-length-calculator': 'antennalen',
  'beam-load-calculator': 'beamload',
  'heat-exchanger-calculator': 'heatexchanger',
  'fluid-flow-calculator': 'fluidflow',
  'spring-force-calculator': 'springforce',
  'gear-ratio-calculator': 'gearratio',
  'inverter-battery-calculator': 'inverterbattery',
  'ac-btu-calculator': 'acbtu',
  'pipe-flow-calculator': 'pipeflow',
  'three-phase-calculator': 'threephase',
  'three-phase-power-calculator': 'threephase',
  'motor-size-calculator': 'motorSize',
};

Object.entries(slugRedirects).forEach(([slug, id]) => {
  if (!slugToId[slug]) slugToId[slug] = id;
  idToSlug[id] = slug;
});

export function findCalcBySlug(slug: string): string | null {
  return slugToId[slug] || null;
}

export function getSlugForId(id: string): string {
  return idToSlug[id] || id.toLowerCase().replace(/_/g, '-') + '-calculator';
}

export function getCalcsByCategory(cat: CalculatorCategory): string[] {
  return Object.keys(DB).filter((id) => DB[id].cat === cat);
}

export function getAllCalculatorSlugs(): string[] {
  return [...new Set([...Object.values(idToSlug), ...Object.keys(slugToId)])];
}

import registryData from '@/data/calculator-registry.json';
export const calculatorRegistry: RegistryEntry[] = registryData as RegistryEntry[];

export function getRegistryEntry(slug: string): RegistryEntry | undefined {
  return calculatorRegistry.find((r) => r.slug === slug);
}
