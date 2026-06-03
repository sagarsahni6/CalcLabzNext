/* ═══════════════════════════════════════════════════
   Calc Labz — Custom Calculator Content
   Hand-crafted formulas, worked examples, and FAQs
   for the top 30+ high-priority calculators.
   Replaces generic fallback content in page.tsx.
   ═══════════════════════════════════════════════════ */

export interface FormulaData {
  formula: string;
  formulaDesc: string;
  example: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CalculatorContent {
  formula: FormulaData;
  faqs: FAQItem[];
  /** External references for E-E-A-T trust signals */
  sources?: { label: string; url: string }[];
}

// ── CUSTOM FORMULAS ───────────────────────────────────────
const CUSTOM_FORMULAS: Record<string, FormulaData> = {
  emi: {
    formula: `E = P \\cdot r \\cdot \\frac{(1+r)^n}{(1+r)^n - 1}`,
    formulaDesc: `Where:
- **E** is the monthly EMI (Equated Monthly Installment).
- **P** is the Principal Loan Amount.
- **r** is the Monthly Interest Rate (Annual Rate / 12 / 100).
- **n** is the Loan Tenure in months.`,
    example: `Suppose you borrow **₹10,00,000** (P) at an annual interest rate of **8.5%** for **10 years** (120 months).
- Monthly interest rate (r) = 8.5 / 12 / 100 = 0.007083
- EMI (E) = 10,00,000 × 0.007083 × (1.007083)^120 / ((1.007083)^120 - 1)
- **E ≈ ₹12,399 per month**`
  },
  sip: {
    formula: `M = P \\cdot \\frac{(1+i)^n - 1}{i} \\cdot (1+i)`,
    formulaDesc: `Where:
- **M** is the Maturity Amount.
- **P** is the Monthly SIP Amount.
- **i** is the Monthly Interest Rate (Annual expected return / 12 / 100).
- **n** is the Number of Monthly Payments.`,
    example: `Suppose you invest **₹5,000 per month** (P) for **15 years** (180 months) with an expected annual return of **12%**.
- Monthly return rate (i) = 12 / 12 / 100 = 0.01
- Maturity Amount (M) = 5,000 × ((1.01)^180 - 1) / 0.01 × (1.01)
- **M ≈ ₹25,22,880**`
  },
  gst: {
    formula: `GST = \\frac{Original \\; Price \\times GST \\; Rate}{100}`,
    formulaDesc: `For adding GST:
- **Total Price = Original Price + GST Amount**

For removing GST:
- **Original Price = Total Price / (1 + Rate / 100)**
- **GST Amount = Total Price - Original Price**`,
    example: `Suppose the net price of an item is **₹1,000** and GST rate is **18%**.
- GST Amount = (1,000 × 18) / 100 = **₹180**
- Total Price including GST = 1,000 + 180 = **₹1,180**`
  },
  compoundinterest: {
    formula: `A = P \\cdot \\left(1 + \\frac{r}{n}\\right)^{nt}`,
    formulaDesc: `Where:
- **A** is the final maturity amount.
- **P** is the principal balance.
- **r** is the annual interest rate (decimal).
- **n** is the number of times interest compounds per year.
- **t** is the time in years.`,
    example: `Suppose you invest **₹1,00,000** at **8%** interest compounded quarterly (n = 4) for **5 years**.
- A = 1,00,000 × (1 + 0.08 / 4)^(4 × 5)
- A = 1,00,000 × (1.02)^20
- **A ≈ ₹1,48,595** (Interest earned: **₹48,595**)`
  },
  simpleinterest: {
    formula: `SI = \\frac{P \\cdot R \\cdot T}{100}`,
    formulaDesc: `Where:
- **SI** is the Simple Interest.
- **P** is the Principal Amount.
- **R** is the Rate of Interest per annum.
- **T** is the Time/Tenure in years.`,
    example: `Suppose you deposit **₹50,000** at an annual simple interest rate of **6%** for **3 years**.
- SI = (50,000 × 6 × 3) / 100 = **₹9,000**
- Total maturity amount = 50,000 + 9,000 = **₹59,000**`
  },
  bmi: {
    formula: `BMI = \\frac{Weight \\; (kg)}{Height^2 \\; (m^2)}`,
    formulaDesc: `Where:
- **Weight** is measured in kilograms.
- **Height** is measured in meters.`,
    example: `Suppose a person weighs **70 kg** and is **1.75 meters** (175 cm) tall.
- BMI = 70 / (1.75 × 1.75) = 70 / 3.0625 = **22.86**
- *Interpretation:* A BMI of 22.86 is within the **Normal** weight range (18.5 – 24.9).`
  },
  incometax: {
    formula: `Tax = \\sum_{i=1}^{k} (Slab_i \\times Rate_i) - Rebate_{87A} + Surcharge + Cess`,
    formulaDesc: `New Tax Regime FY 2025-26 slabs:
- **0 – ₹3 Lakh**: Nil
- **₹3L – ₹7L**: 5%
- **₹7L – ₹10L**: 10%
- **₹10L – ₹12L**: 15%
- **₹12L – ₹15L**: 20%
- **Above ₹15L**: 30%
- **Standard Deduction**: ₹75,000 (salaried)
- **Rebate 87A**: Full rebate if taxable income ≤ ₹12L
- **Cess**: 4% Health & Education Cess on total tax`,
    example: `For a salaried person earning **₹15,00,000** gross:
- Taxable Income = 15,00,000 − 75,000 (Std Ded) = **₹14,25,000**
- Tax on 0–3L = ₹0, 3–7L = ₹20,000, 7–10L = ₹30,000, 10–12L = ₹30,000, 12–14.25L = ₹45,000
- Total Tax = ₹1,25,000 + 4% Cess = **₹1,30,000**`
  },
  taxregime: {
    formula: `Savings = Tax_{Old} - Tax_{New}`,
    formulaDesc: `The comparison evaluates:
- **Old Regime**: Higher slab rates but allows deductions (80C, 80D, HRA, NPS, Home Loan Interest)
- **New Regime**: Lower slab rates, standard deduction of ₹75K, minimal other deductions
- The regime with the lower tax liability is recommended.`,
    example: `For income **₹12 LPA** with ₹1.5L in 80C, ₹25K in 80D, and ₹1.2L HRA:
- **Old Regime Tax** ≈ ₹1,11,800 (after all deductions)
- **New Regime Tax** ≈ ₹83,200 (with ₹75K standard deduction only)
- **Verdict**: New Regime saves ~₹28,600 → **New Regime is better**`
  },
  mortgage: {
    formula: `EMI = P \\cdot r \\cdot \\frac{(1+r)^n}{(1+r)^n - 1}`,
    formulaDesc: `Identical to the standard EMI formula:
- **P** = Home Loan Principal Amount
- **r** = Monthly Interest Rate (Annual Rate / 12 / 100)
- **n** = Tenure in months (Years × 12)
- The amortization schedule shows month-by-month principal and interest split.`,
    example: `For a **₹50 Lakh** home loan at **8.5%** for **20 years** (240 months):
- r = 8.5 / 12 / 100 = 0.007083
- EMI = 50,00,000 × 0.007083 × (1.007083)^240 / ((1.007083)^240 - 1)
- **EMI ≈ ₹43,391/month**
- Total amount paid: ₹1,04,13,840 — Interest paid: **₹54,13,840**`
  },
  ppf: {
    formula: `M = P \\cdot \\frac{(1+r)^n - 1}{r}`,
    formulaDesc: `Where:
- **M** is the PPF Maturity Amount.
- **P** is the Annual Contribution (max ₹1.5 Lakh).
- **r** is the Annual Interest Rate (currently 7.1%).
- **n** is the Tenure (minimum 15 years, extendable in 5-year blocks).
- Interest compounds annually. Contributions made before the 5th of each month earn interest for that month.`,
    example: `Investing **₹1,50,000/year** at **7.1%** for **15 years**:
- M = 1,50,000 × ((1.071)^15 - 1) / 0.071
- **M ≈ ₹40,68,209**
- Total invested: ₹22,50,000 — Interest earned: **₹18,18,209** (all tax-free)`
  },
  fd: {
    formula: `A = P \\cdot \\left(1 + \\frac{r}{n}\\right)^{n \\cdot t}`,
    formulaDesc: `Where:
- **A** is the FD Maturity Amount.
- **P** is the Principal Deposit.
- **r** is the Annual Interest Rate (decimal).
- **n** is the Compounding Frequency (4 for quarterly, 12 for monthly).
- **t** is the Tenure in years.
- Most Indian banks compound quarterly by default.`,
    example: `A **₹5,00,000 FD** at **7%** for **5 years** (quarterly compounding):
- A = 5,00,000 × (1 + 0.07/4)^(4×5)
- A = 5,00,000 × (1.0175)^20
- **A ≈ ₹7,09,259** — Interest earned: **₹2,09,259**`
  },
  cagr: {
    formula: `CAGR = \\left(\\frac{V_f}{V_i}\\right)^{\\frac{1}{n}} - 1`,
    formulaDesc: `Where:
- **CAGR** is the Compound Annual Growth Rate.
- **Vf** is the Final Value.
- **Vi** is the Initial Value.
- **n** is the Number of Years.
- CAGR smooths out volatility to show the constant rate that would have produced the same result.`,
    example: `Investment grew from **₹1,00,000** to **₹2,50,000** in **5 years**:
- CAGR = (2,50,000 / 1,00,000)^(1/5) - 1
- CAGR = (2.5)^0.2 - 1 = 1.2011 - 1
- **CAGR ≈ 20.11% per year**`
  },
  tdee: {
    formula: `TDEE = BMR \\times Activity\\;Multiplier`,
    formulaDesc: `BMR is calculated using the **Mifflin-St Jeor** equation:
- **Men**: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161 + 166
- **Women**: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161

Activity Multipliers:
- Sedentary (desk job): 1.2
- Lightly Active (1-3 days/week): 1.375
- Moderately Active (3-5 days/week): 1.55
- Very Active (6-7 days/week): 1.725
- Extra Active (physical job + exercise): 1.9`,
    example: `For a **30-year-old male**, 175 cm, 75 kg, moderately active:
- BMR = 10 × 75 + 6.25 × 175 − 5 × 30 + 5 = **1,718.75 kcal**
- TDEE = 1,718.75 × 1.55 = **2,664 kcal/day**
- To lose ~0.5 kg/week, eat **2,164 kcal/day** (500 deficit)`
  },
  bodyfat: {
    formula: `BF\\% = \\frac{495}{Body\\;Density} - 450`,
    formulaDesc: `Body Density is calculated using the **U.S. Navy method**:
- **Men**: BD = 1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)
- **Women**: BD = 1.29579 − 0.35004 × log₁₀(waist + hip − neck) + 0.22100 × log₁₀(height)

Healthy Ranges:
- Men: Essential 2-5%, Athletes 6-13%, Fitness 14-17%, Average 18-24%
- Women: Essential 10-13%, Athletes 14-20%, Fitness 21-24%, Average 25-31%`,
    example: `For a **male**, Height 175 cm, Waist 85 cm, Neck 38 cm:
- BD = 1.0324 − 0.19077 × log₁₀(85 − 38) + 0.15456 × log₁₀(175)
- BD = 1.0324 − 0.19077 × 1.6721 + 0.15456 × 2.2430
- BD ≈ 1.0598
- BF% = 495 / 1.0598 − 450 ≈ **17.0%** (Fitness category)`
  },
  percentage: {
    formula: `X\\% \\;of\\; N = \\frac{X \\times N}{100}`,
    formulaDesc: `Core percentage operations:
- **Find X% of N**: Result = (X × N) / 100
- **What % is A of B**: Percentage = (A / B) × 100
- **Percentage Change**: ((New − Old) / Old) × 100
- **Increase by X%**: Result = N × (1 + X/100)
- **Decrease by X%**: Result = N × (1 − X/100)`,
    example: `**Finding 15% of ₹2,000:**
- Result = (15 × 2,000) / 100 = **₹300**

**Percentage change from ₹500 to ₹650:**
- Change = ((650 − 500) / 500) × 100 = **30% increase**`
  },
  inhandsalary: {
    formula: `InHand = Gross - PF - PT - IT - Other`,
    formulaDesc: `Where:
- **Gross** = Basic + HRA + DA + Special Allowances
- **PF** = Employee PF Contribution (12% of Basic, capped at ₹15,000 basic)
- **PT** = Professional Tax (state-specific, ₹200/month in most states)
- **IT** = Monthly Income Tax (TDS deducted by employer)
- **Other** = Insurance premiums, food coupons, etc.`,
    example: `For **₹1,00,000 Monthly CTC** with 40% basic:
- Basic = ₹40,000, HRA = ₹20,000, Special = ₹40,000
- PF (Employee 12%) = ₹4,800
- Professional Tax = ₹200
- Estimated TDS = ₹8,500/month
- **In-Hand ≈ ₹86,500/month**`
  },
  retirementcorpus: {
    formula: `Corpus = \\frac{E \\times (1+g)^y \\times 12}{r_{post} - g} \\times \\left[1 - \\left(\\frac{1+g}{1+r_{post}}\\right)^{L}\\right]`,
    formulaDesc: `Where:
- **E** = Current Monthly Expenses
- **g** = Inflation Rate
- **y** = Years to Retirement
- **r_post** = Post-Retirement Return Rate
- **L** = Retirement Duration (Life Expectancy − Retirement Age)
- Monthly SIP needed = (Corpus − FV of Existing Savings) adjusted for pre-retirement returns`,
    example: `Age 30, Retire at 60, Life expectancy 85, Expenses ₹50,000/mo, 6% inflation:
- Expenses at retirement = 50,000 × (1.06)^30 ≈ **₹2,87,175/month**
- Corpus needed for 25 years = ≈ **₹5.4 Crore**
- Monthly SIP at 12% return = ≈ **₹15,200/month** starting today`
  },
  hra: {
    formula: `HRA\\;Exempt = \\min(A,\\;B,\\;C)`,
    formulaDesc: `The HRA exemption under Section 10(13A) is the **minimum** of:
- **A** = Actual HRA Received from employer
- **B** = 50% of Basic Salary (metro cities) OR 40% (non-metro)
- **C** = Actual Rent Paid − 10% of Basic Salary

The remaining HRA (Total HRA − Exempt Amount) is added to taxable income.`,
    example: `Basic Salary: ₹50,000/mo, HRA Received: ₹20,000/mo, Rent Paid: ₹18,000/mo (Mumbai):
- A = ₹20,000
- B = 50% × ₹50,000 = ₹25,000
- C = ₹18,000 − (10% × ₹50,000) = ₹18,000 − ₹5,000 = ₹13,000
- **HRA Exempt = min(20K, 25K, 13K) = ₹13,000/month**
- Taxable HRA = ₹20,000 − ₹13,000 = **₹7,000/month**`
  },
  nps: {
    formula: `Corpus = P \\cdot \\frac{(1+r)^n - 1}{r}`,
    formulaDesc: `Where:
- **P** = Monthly Contribution
- **r** = Expected Monthly Return Rate
- **n** = Months to Retirement (Retirement Age − Current Age) × 12
- At retirement, 60% corpus is tax-free lump sum, 40% must buy an annuity for monthly pension.
- Additional ₹50,000 deduction under 80CCD(1B) beyond 80C limit.`,
    example: `Monthly contribution **₹5,000**, age 30, retire at 60, 10% expected return:
- n = 30 × 12 = 360 months, r = 10/12/100 = 0.00833
- Corpus = 5,000 × ((1.00833)^360 − 1) / 0.00833
- **Corpus ≈ ₹1,13,96,627** (~₹1.14 Crore)
- Lump sum (60%) = ₹68.4 Lakh, Annuity (40%) = ₹45.6 Lakh`
  },
  carloan: {
    formula: `EMI = P \\cdot r \\cdot \\frac{(1+r)^n}{(1+r)^n - 1}`,
    formulaDesc: `Same reducing balance EMI formula:
- **P** = Vehicle Loan Amount (typically 80-90% of on-road price)
- **r** = Monthly Interest Rate
- **n** = Tenure in months (typically 36-84 months)
- Car loan interest rates in India: 7.5%-12% depending on credit score.`,
    example: `For a **₹8,00,000** car loan at **9%** for **5 years** (60 months):
- r = 9 / 12 / 100 = 0.0075
- EMI = 8,00,000 × 0.0075 × (1.0075)^60 / ((1.0075)^60 − 1)
- **EMI ≈ ₹16,607/month**
- Total Interest = ₹16,607 × 60 − 8,00,000 = **₹1,96,420**`
  },
  epf: {
    formula: `Corpus = \\sum_{y=1}^{n} \\left[(B_y \\times 0.24 \\times 12) + Interest\\right]`,
    formulaDesc: `Where:
- Employee contributes **12% of Basic** to EPF account
- Employer contributes **12% of Basic** (3.67% to EPF, 8.33% to EPS)
- Interest rate is set by EPFO (currently **8.25% p.a.** for FY 2024-25)
- Interest compounds annually on monthly running balance
- Basic salary growth assumed for long-term projections`,
    example: `Basic Salary **₹30,000/mo**, 20 years of service, 8.25% interest:
- Employee PF = ₹3,600/mo, Employer PF = ₹1,101/mo (3.67%)
- Monthly PF deposit = ₹4,701
- With 8.25% annual compounding over 20 years:
- **EPF Corpus ≈ ₹28,50,000** (approximate)`
  },
  rd: {
    formula: `M = P \\cdot \\frac{(1+r)^n - 1}{1 - (1+r)^{-1/3}}`,
    formulaDesc: `Simplified quarterly compounding formula used by Indian banks:
- **M** = Maturity Amount
- **P** = Monthly Deposit Amount
- **r** = Quarterly Interest Rate (Annual Rate / 4 / 100)
- **n** = Number of Quarters (Tenure in months / 3)
- Interest compounded quarterly as per RBI guidelines.`,
    example: `Monthly deposit **₹5,000** at **6.5%** for **24 months**:
- Total deposited = ₹5,000 × 24 = ₹1,20,000
- Interest earned ≈ **₹7,832**
- **Maturity Amount ≈ ₹1,27,832**`
  },
  swp: {
    formula: `Remaining = C \\cdot (1+r)^n - W \\cdot \\frac{(1+r)^n - 1}{r}`,
    formulaDesc: `Where:
- **C** = Initial Corpus
- **W** = Monthly Withdrawal Amount
- **r** = Monthly Return Rate (Annual Return / 12 / 100)
- **n** = Number of Months
- If Remaining becomes 0, the corpus is depleted. The calculator shows how many months the corpus lasts.`,
    example: `Corpus **₹50,00,000**, Monthly withdrawal **₹25,000**, Expected return **8%**:
- Monthly return r = 8/12/100 = 0.00667
- After 10 years (120 months), remaining ≈ ₹61,79,000
- The corpus actually **grows** because returns exceed withdrawals
- **Corpus lasts indefinitely** at this withdrawal rate`
  },
  lumpsum: {
    formula: `FV = P \\cdot (1+r)^n`,
    formulaDesc: `Where:
- **FV** = Future Value of the investment
- **P** = Lump Sum Investment Amount
- **r** = Annual Return Rate (decimal)
- **n** = Investment Period in years
- This is the standard compound interest formula for one-time investments.`,
    example: `Investing **₹1,00,000** lump sum at **12% expected returns** for **10 years**:
- FV = 1,00,000 × (1.12)^10
- FV = 1,00,000 × 3.1058
- **FV ≈ ₹3,10,585**
- Total gain: **₹2,10,585** (210.6% absolute return)`
  },
  capitalgains: {
    formula: `Tax = Gains \\times TaxRate`,
    formulaDesc: `India Capital Gains Tax (from July 2024):
- **Equity (Stocks/Equity MFs):**
  - STCG (held < 12 months): 20% on gains
  - LTCG (held ≥ 12 months): 12.5% on gains above ₹1.25 Lakh
- **Debt MFs (purchased after April 2023):** Taxed at income tax slab rate
- **Property (held ≥ 24 months):** 12.5% LTCG without indexation
- Plus 4% Health & Education Cess on tax amount`,
    example: `Sold equity shares: Buy ₹1,00,000, Sell ₹1,80,000, Held 18 months:
- Gains = ₹80,000 (Long-term, held > 12 months)
- Exemption limit = ₹1,25,000
- Taxable LTCG = ₹80,000 − ₹1,25,000 = **₹0** (within exemption)
- **Tax payable: ₹0** — No tax on LTCG up to ₹1.25 Lakh`
  },
  stepupsip: {
    formula: `FV = \\sum_{y=1}^{Y} \\left[ P \\cdot (1+s)^{y-1} \\cdot \\frac{(1+r)^{12} - 1}{r} \\cdot (1+r)^{12(Y-y)} \\right]`,
    formulaDesc: `Where:
- **P** = Initial Monthly SIP Amount
- **s** = Annual Step-Up Percentage (SIP increment)
- **r** = Monthly Return Rate
- **Y** = Total Years
- Each year, the SIP amount increases by s%, and returns compound on accumulated corpus.`,
    example: `Starting SIP **₹5,000/mo**, 10% annual step-up, 12% return, 15 years:
- Year 1: ₹5,000/mo, Year 5: ₹7,321/mo, Year 10: ₹11,790/mo, Year 15: ₹18,987/mo
- Total invested ≈ ₹19,09,000
- **Final corpus ≈ ₹52,80,000** vs ₹25.2L without step-up
- Step-up almost **doubles** the final corpus!`
  },
  savingsgoal: {
    formula: `Monthly = \\frac{(Goal - Current \\cdot (1+r)^n) \\cdot r}{(1+r)^n - 1}`,
    formulaDesc: `Where:
- **Goal** = Target Amount
- **Current** = Existing Savings
- **r** = Monthly Return Rate
- **n** = Number of Months to Goal
- Current savings grow with compound interest; the formula calculates additional monthly investment needed.`,
    example: `Goal **₹10,00,000** in 5 years, current savings ₹50,000, 8% return:
- FV of existing savings = 50,000 × (1.00667)^60 = ₹74,659
- Remaining target = ₹10,00,000 − ₹74,659 = ₹9,25,341
- Monthly SIP = 9,25,341 × 0.00667 / ((1.00667)^60 − 1)
- **Monthly SIP ≈ ₹12,590**`
  },
  bmr: {
    formula: `BMR = 10 \\times W + 6.25 \\times H - 5 \\times A + S`,
    formulaDesc: `**Mifflin-St Jeor Equation** (most accurate for modern populations):
- **W** = Weight in kg
- **H** = Height in cm
- **A** = Age in years
- **S** = Sex factor (+5 for males, −161 for females)
- BMR represents the minimum calories your body burns at complete rest.`,
    example: `For a **25-year-old female**, 165 cm, 60 kg:
- BMR = 10 × 60 + 6.25 × 165 − 5 × 25 − 161
- BMR = 600 + 1031.25 − 125 − 161
- **BMR ≈ 1,345 kcal/day**
- This means she burns ~1,345 calories just to stay alive.`
  },
  macros: {
    formula: `Protein = W \\times P_f,\\quad Fat = \\frac{Cal \\times F\\%}{9},\\quad Carbs = \\frac{Cal - (P \\times 4 + F \\times 9)}{4}`,
    formulaDesc: `Calorie values per gram:
- **Protein**: 4 kcal/g — Recommended 1.6-2.2g per kg bodyweight for active adults
- **Fat**: 9 kcal/g — Recommended 20-35% of total calories
- **Carbohydrates**: 4 kcal/g — Fills remaining calories after protein and fat

Common splits: Balanced (30/30/40), Low-carb (40/40/20), Keto (30/65/5)`,
    example: `For a **75 kg male**, 2,500 cal/day, balanced macro split:
- Protein (30%): 2,500 × 0.30 / 4 = **188g**
- Fat (30%): 2,500 × 0.30 / 9 = **83g**
- Carbs (40%): 2,500 × 0.40 / 4 = **250g**`
  },
  caloriedeficit: {
    formula: `Deficit = TDEE - Target\\;Intake`,
    formulaDesc: `Weight loss fundamentals:
- **1 kg of fat ≈ 7,700 kcal** of stored energy
- A **500 kcal/day deficit** leads to ~0.5 kg/week weight loss
- A **1,000 kcal/day deficit** leads to ~1 kg/week (maximum safe rate)
- Never go below **1,200 kcal/day (women)** or **1,500 kcal/day (men)**
- Combine diet and exercise for sustainable results`,
    example: `TDEE = **2,500 kcal**, Goal: lose **0.5 kg/week**:
- Required deficit = 500 kcal/day
- Target daily intake = 2,500 − 500 = **2,000 kcal/day**
- Strategy: Eat 2,200 kcal + burn 200 kcal through exercise
- Expected weight loss in 12 weeks: **~6 kg**`
  },
  concrete: {
    formula: `V = L \\times W \\times D`,
    formulaDesc: `Where:
- **V** is the Volume of concrete in m³.
- **L** is the Length of the slab/footing.
- **W** is the Width.
- **D** is the Depth (thickness).
- Material quantities use the mix ratio (e.g., M20 = 1:1.5:3) and standard dry volume factor of 1.54.`,
    example: `For a **6m × 4m slab, 150mm thick** with **M20 mix (1:1.5:3)**:
- Volume = 6 × 4 × 0.15 = **3.6 m³**
- Dry volume = 3.6 × 1.54 = 5.544 m³
- Cement = 5.544 / (1+1.5+3) × 1 = **1.008 m³ ≈ 20.2 bags** (50 kg each)
- Sand = 1.512 m³, Aggregate = 3.024 m³`
  },
  bricks: {
    formula: `N = \\frac{L \\times H \\times T_{wall}}{(L_b + M) \\times (H_b + M) \\times (T_{wall})}`,
    formulaDesc: `Where:
- **N** is the Number of bricks required.
- **L** and **H** are wall length and height.
- **L_b** and **H_b** are brick dimensions (standard Indian: 230 × 75 mm).
- **M** is the mortar thickness (typically 10mm).
- **T_wall** is the wall thickness (half brick = 115mm, full brick = 230mm).`,
    example: `For a **10m × 3m wall** in **half-brick (115mm)** with standard bricks:
- Wall area = 10 × 3 = 30 m²
- Bricks per m² = 1,000,000 / (240 × 85) = **49 bricks/m²**
- Total = 30 × 49 = **1,470 bricks** + 5% wastage = **~1,544 bricks**`
  },
  paint: {
    formula: `Paint = \\frac{(2 \\times (L + W) \\times H - Openings) \\times Coats}{Coverage}`,
    formulaDesc: `Where:
- **L**, **W**, **H** are room dimensions.
- **Openings** = doors (1.9 m² each) + windows (1.5 m² each).
- **Coats** is typically 2 for emulsion.
- **Coverage** varies: Interior emulsion ~130 sq ft/L, Exterior ~100 sq ft/L, Primer ~140 sq ft/L.`,
    example: `For a **5m × 4m × 3m room** with 1 door and 2 windows, 2 coats of interior emulsion:
- Wall area = 2 × (5+4) × 3 = 54 m² = 581 sq ft
- Openings = 1.9 + 2×1.5 = 4.9 m² = 52.7 sq ft
- Paintable = (581 − 52.7) × 2 coats = 1,057 sq ft
- **Paint needed ≈ 8.1 litres** (at 130 sq ft/L)`
  },
  flooring: {
    formula: `Tiles = \\frac{Room\\;Area}{Tile\\;Area} \\times (1 + Wastage\\%)`,
    formulaDesc: `Where:
- **Room Area** = Room Length × Room Width (in m²).
- **Tile Area** = Tile Length × Tile Width (convert mm to m).
- **Wastage** typically 5-10% for straight lay, 10-15% for diagonal.
- **Boxes** = Total tiles / Tiles per box (rounded up).`,
    example: `**5m × 4m room** with **600×600mm tiles**, 4 tiles/box:
- Room area = 20 m²
- Tile area = 0.6 × 0.6 = 0.36 m²
- Tiles needed = 20 / 0.36 = 55.6 → **56 tiles** + 8% waste = **61 tiles**
- Boxes = ceil(61/4) = **16 boxes**`
  },
  steel: {
    formula: `W = \\frac{D^2}{162} \\times L`,
    formulaDesc: `Where:
- **W** is the Weight in kg per bar.
- **D** is the Bar Diameter in mm.
- **L** is the Length in metres.
- The constant **162** comes from (1000² × π) / (4 × 7850), where 7850 kg/m³ is steel density.
- This is the **BIS standard** formula used across all Indian construction sites.`,
    example: `**10 bars of 12mm dia, 12m length each**:
- Weight per bar = (12² / 162) × 12 = 0.889 × 12 = **10.67 kg**
- Total weight = 10 × 10.67 = **106.7 kg**
- Cost at ₹72/kg = **₹7,680** (approx)`
  },
  constructioncost: {
    formula: `Cost = Area \\times Rate_{per\\;sqft} \\times Floors \\times Finish\\;Multiplier`,
    formulaDesc: `Where:
- **Area** is the built-up area per floor in sq ft.
- **Rate** varies by city tier: Metro ₹2,500, Tier-2 ₹1,800, Tier-3 ₹1,400, Rural ₹800/sq ft.
- **Finish Multiplier**: Basic 0.85, Standard 1.0, Premium 1.35, Luxury 1.7.
- Multi-storey: Each floor above ground adds ~5% to per-floor cost (structural loading).`,
    example: `**1,500 sq ft, 1 floor, Tier-2 city, Standard finish**:
- Base cost = 1,500 × ₹1,800 = ₹27,00,000
- Finish multiplier = 1.0
- **Total ≈ ₹27 Lakh**
- Breakdown: Structure ~45%, Finishing ~30%, MEP ~15%, Misc ~10%`
  },
  stampdutycalc: {
    formula: `Total = Property\\;Value \\times (Stamp\\;Duty\\% + Registration\\%)`,
    formulaDesc: `Stamp duty rates vary by state and gender:
- **Maharashtra**: Male 6%, Female 5% + Registration 1%
- **Karnataka**: 5% + Registration 1%
- **Delhi**: Male 6%, Female 4% + Registration 1%
- **Tamil Nadu**: 7% + Registration 1%
- **Gujarat**: 4.9% + Registration 1%
- Women buyers typically get 1-2% concession in most states.`,
    example: `**₹50 Lakh property in Maharashtra** (male buyer):
- Stamp Duty = 50,00,000 × 6% = **₹3,00,000**
- Registration = 50,00,000 × 1% = **₹50,000** (capped at ₹30,000)
- **Total registration cost ≈ ₹3,30,000**`
  },
  solarpanel: {
    formula: `Payback = \\frac{System\\;Cost - Subsidy}{Annual\\;Savings}`,
    formulaDesc: `Where:
- **Annual generation** = System kW × 4.5 (avg daily sun hours) × 365 × 0.8 (efficiency)
- **Annual savings** = Units generated × Electricity tariff rate
- **Subsidy**: PM Surya Ghar scheme — ₹30,000/kW for first 2 kW, ₹18,000/kW for next 1 kW (max 3 kW)
- **Lifetime** = 25 years with ~0.5% annual degradation.`,
    example: `**3 kW system at ₹1,50,000**, tariff ₹8/unit:
- Annual generation = 3 × 4.5 × 365 × 0.8 = **3,942 units**
- Annual savings = 3,942 × ₹8 = **₹31,536**
- Subsidy = ₹30K×2 + ₹18K×1 = **₹78,000**
- Net cost = ₹72,000 → Payback = **~2.3 years**`
  },
  concretemix: {
    formula: `Cement = \\frac{V_{dry} \\times C_{ratio}}{Sum\\;of\\;Ratios} \\div 0.035`,
    formulaDesc: `Where:
- **V_dry** = Wet volume × 1.54 (dry volume factor for compaction).
- **C_ratio** = Cement part of the mix ratio (e.g., 1 in M20 = 1:1.5:3).
- **Sum** = Total of all ratio parts (e.g., 1+1.5+3 = 5.5 for M20).
- **0.035 m³** = volume of one 50 kg cement bag.
- Water-cement ratio: M15 = 0.50, M20 = 0.45, M25 = 0.40.`,
    example: `**1 m³ of M20 concrete (1:1.5:3)** with 5% wastage:
- Dry volume = 1 × 1.54 × 1.05 = 1.617 m³
- Cement = (1.617 / 5.5) × 1 = 0.294 m³ = **8.4 bags**
- Sand = 0.294 × 1.5 = **0.441 m³**
- Aggregate = 0.294 × 3 = **0.882 m³**
- Water = 8.4 × 50 × 0.45 = **189 litres**`
  },
  landarea: {
    formula: `Area_B = Area_A \\times ConversionFactor`,
    formulaDesc: `Key Indian land area conversions:
- 1 Acre = 43,560 sq ft = 4,047 m² = 100 Cent (South India)
- 1 Hectare = 2.471 Acres = 10,000 m²
- 1 Bigha (UP) = 27,000 sq ft; 1 Bigha (Raj) = 17,424 sq ft
- 1 Gunta = 1,089 sq ft = 101.17 m² (Karnataka/Maharashtra)
- 1 Marla = 272.25 sq ft; 1 Kanal = 20 Marla = 5,445 sq ft`,
    example: `Convert **1 Acre** to all Indian units:
- 1 Acre = **43,560 sq ft** = 4,047 m² = 4,840 sq yards
- = **100 Cents** (Kerala/Tamil Nadu)
- = **40 Guntas** (Karnataka)
- = **1.613 Bigha** (UP) or **2.5 Bigha** (Rajasthan)
- = **160 Marla** or **8 Kanal** (Punjab/Haryana)`
  },
  heartrate: {
    formula: `MHR = 220 - Age`,
    formulaDesc: `**Karvonen Target HR** (more accurate with resting HR):\n- **Target HR** = Resting HR + (HRR \u00d7 %Intensity)\n- **HRR** = Max HR \u2212 Resting HR (Heart Rate Reserve)\n- Tanaka formula (more accurate for older adults): **208 \u2212 0.7 \u00d7 Age**\n- Zone 2 (60\u201370% HRR) = optimal fat-burning zone\n- Zone 4 (80\u201390% HRR) = lactate threshold training`,
    example: `For a **30-year-old** with resting HR of **65 bpm**:\n- Max HR = 220 \u2212 30 = **190 bpm**\n- HRR = 190 \u2212 65 = **125 bpm**\n- Zone 2 (60%): 65 + 125 \u00d7 0.60 = **140 bpm**\n- Zone 4 (80%): 65 + 125 \u00d7 0.80 = **165 bpm**`
  },
  bloodpressure: {
    formula: `MAP = DBP + \\\\frac{SBP - DBP}{3}`,
    formulaDesc: `**ACC/AHA 2017 Guidelines**:\n- **Normal**: SBP < 120 AND DBP < 80\n- **Elevated**: SBP 120\u2013129 AND DBP < 80\n- **Stage 1**: SBP 130\u2013139 OR DBP 80\u201389\n- **Stage 2**: SBP \u2265 140 OR DBP \u2265 90\n- **Crisis**: SBP > 180 OR DBP > 120\n- **Pulse Pressure** = SBP \u2212 DBP (normal 30\u201360 mmHg)\n- **MAP** normal range: 70\u2013100 mmHg`,
    example: `Blood pressure reading: **135/85 mmHg**:\n- Category: **Stage 1 Hypertension** (SBP \u2265 130)\n- Pulse Pressure = 135 \u2212 85 = **50 mmHg** (Normal)\n- MAP = 85 + (135 \u2212 85)/3 = **102 mmHg** (slightly elevated)\n- Action: Lifestyle changes + consider medication`
  },
  pregnancy: {
    formula: `Due\\\\;Date = LMP + 280\\\\;days`,
    formulaDesc: `**Naegele's Rule** for estimating due date:\n- Add **280 days (40 weeks)** to the first day of Last Menstrual Period (LMP)\n- **Conception** typically occurs ~14 days after LMP\n- Only **5%** of babies are born on the exact due date\n- Full-term range: 37\u201342 weeks`,
    example: `LMP: **1 January 2026**:\n- Due Date = 1 Jan + 280 days = **8 October 2026**\n- Conception \u2248 **15 January 2026**\n- 1st Trimester: Weeks 1\u201312 (Jan\u2013Mar)\n- 2nd Trimester: Weeks 13\u201326 (Apr\u2013Jun)\n- 3rd Trimester: Weeks 27\u201340 (Jul\u2013Oct)`
  },
  calories: {
    formula: `Burned = \\\\frac{MET \\\\times 3.5 \\\\times Weight}{200} \\\\times Duration`,
    formulaDesc: `Where:\n- **MET** = Metabolic Equivalent of Task (1 MET = resting energy)\n- **Weight** in kilograms, **Duration** in minutes\n- Common METs: Walking 3.5, Running 10, Cycling 8, Swimming 7, HIIT 12\n- **1 kg fat \u2248 7,700 kcal** (to lose 1 kg, burn 7,700 extra kcal)`,
    example: `**70 kg person jogging (MET 7) for 30 minutes**:\n- Burned = (7 \u00d7 3.5 \u00d7 70 / 200) \u00d7 30\n- Burned = 8.575 \u00d7 30 = **257 kcal**\n- Fat burned \u2248 257 / 7700 \u00d7 1000 = **33g**`
  },
  sleep: {
    formula: `Bedtime = WakeTime - (Cycles \\\\times 90\\\\;min) - 14\\\\;min`,
    formulaDesc: `Sleep cycle science:\n- Each sleep cycle lasts **~90 minutes** (NREM stages 1-3 \u2192 REM)\n- Waking at the end of a cycle = less grogginess\n- **14 minutes** is the average time to fall asleep\n- Recommended: **5\u20136 cycles** (7.5\u20139 hours) per night`,
    example: `Wake time: **6:30 AM**:\n- 6 cycles (9h): Bedtime = **9:16 PM**\n- 5 cycles (7.5h): Bedtime = **10:46 PM**\n- 4 cycles (6h): Bedtime = **12:16 AM**\n- Best choice for most adults: **10:46 PM** (5 cycles + buffer)`
  },
  cholesterolratio: {
    formula: `Ratio = \\\\frac{Total\\\\;Cholesterol}{HDL}`,
    formulaDesc: `Key lipid ratios:\n- **Total/HDL Ratio**: Ideal < 3.5, Moderate 3.5\u20135.0, High > 5.0\n- **LDL/HDL Ratio**: Ideal < 2.5\n- **Non-HDL** = Total \u2212 HDL\n- **VLDL** \u2248 Triglycerides / 5 (Friedewald estimation)\n- **Atherogenic Index** = log\u2081\u2080(Triglycerides / HDL)`,
    example: `Total: **220**, HDL: **55**, LDL: **130**, Triglycerides: **175**:\n- Total/HDL = 220/55 = **4.0** (Moderate risk)\n- LDL/HDL = 130/55 = **2.36** (Low risk \u2713)\n- Non-HDL = **165 mg/dL** (elevated)\n- VLDL = 175/5 = **35 mg/dL**`
  },
  diabetesrisk: {
    formula: `Score = Age_{pts} + BMI_{pts} + Waist_{pts} + Family_{pts} + Activity_{pts}`,
    formulaDesc: `Based on the **FINDRISC** scoring:\n- **Age**: <40 = 0, 40-49 = 1, 50-59 = 2, 60+ = 3\n- **BMI**: <25 = 0, 25-30 = 1, 30-35 = 2, 35+ = 3\n- **Waist**: \u226594cm = +1, \u2265102cm = +1 more\n- **Family**: Parent/Sibling = +2, Both Parents = +4\n- **Activity**: Inactive = +2\n- \u22643 Low, 4\u20138 Moderate, 9\u201312 High, >12 Very High`,
    example: `55-year-old, BMI 28, waist 100cm, parent has diabetes, active:\n- Age (55): +2, BMI (28): +1, Waist (100): +1, Family: +2, Active: +0\n- Total: **6/22** \u2192 **Moderate Risk** (1\u20135% chance in 10 years)`
  },
  idealweight: {
    formula: `Hamwi: M = 48 + 2.7 \\\\times inches\\\\;over\\\\;5ft`,
    formulaDesc: `Four formulas:\n- **Hamwi**: Men = 48 + 2.7\u00d7in, Women = 45.5 + 2.2\u00d7in\n- **Miller**: Men = 56.2 + 1.41\u00d7in, Women = 53.1 + 1.36\u00d7in\n- **Robinson**: Men = 52 + 1.9\u00d7in, Women = 49 + 1.7\u00d7in\n- **BMI 22 Target**: Weight = 22 \u00d7 Height(m)\u00b2`,
    example: `For a **175 cm (5'9") male**:\n- Hamwi = 48 + 2.7 \u00d7 9 = **72.3 kg**\n- Miller = 56.2 + 1.41 \u00d7 9 = **68.9 kg**\n- BMI 22 = 22 \u00d7 1.75\u00b2 = **67.4 kg**`
  },
  proteinintake: {
    formula: `Protein = Weight \\\\times Activity\\\\;Factor \\\\times Goal\\\\;Factor`,
    formulaDesc: `Evidence-based protein recommendations:\n- **Sedentary RDA**: 0.8g/kg (minimum)\n- **Active Adults**: 1.2\u20131.6g/kg\n- **Muscle Building**: 1.6\u20132.2g/kg\n- **Fat Loss**: 1.6\u20132.4g/kg (preserves muscle in deficit)\n- Source: ISSN Position Stand on Protein`,
    example: `**80 kg male**, moderately active, building muscle:\n- 80 \u00d7 1.2 \u00d7 1.6 = **154g/day**\n- Per meal (4 meals): **38g** (~150g chicken breast)\n- Calories from protein: 154 \u00d7 4 = **616 kcal**`
  },
  onerepmax: {
    formula: `1RM = Weight \\\\times \\\\left(1 + \\\\frac{Reps}{30}\\\\right)`,
    formulaDesc: `Four estimation formulas (averaged):\n- **Epley**: W \u00d7 (1 + R/30)\n- **Brzycki**: W \u00d7 (36 / (37 \u2212 R))\n- **Lombardi**: W \u00d7 R^0.10\n- **O'Conner**: W \u00d7 (1 + 0.025 \u00d7 R)\n- Most accurate with 3\u201310 reps; less reliable above 15.`,
    example: `Bench pressed **80 kg for 6 reps**:\n- Epley: 80 \u00d7 (1 + 6/30) = **96 kg**\n- Brzycki: 80 \u00d7 (36/31) = **93 kg**\n- Average 1RM \u2248 **95 kg**\n- Training: 80% = 76 kg (8 reps), 70% = 66 kg (12 reps)`
  },
  runningpace: {
    formula: `Predicted = Base \\\\times \\\\left(\\\\frac{Target}{Base\\\\;Dist}\\\\right)^{1.06}`,
    formulaDesc: `**Riegel Formula** for race prediction:\n- Exponent 1.06 models fatigue factor\n- Most accurate within 2\u00d7 of base distance\n- Pace = Time / Distance (min/km)\n- Speed = Distance / (Time/60) (km/h)`,
    example: `Ran **5K in 25 minutes**:\n- Predicted 10K: 25 \u00d7 (10/5)^1.06 = **52 min** (5:12 /km)\n- Predicted Half: 25 \u00d7 (21.1/5)^1.06 = **115 min** (5:27 /km)\n- Predicted Marathon: 25 \u00d7 (42.2/5)^1.06 = **242 min** (5:44 /km)`
  },
  vo2max: {
    formula: `VO_2Max = \\\\frac{Distance - 504.9}{44.73}`,
    formulaDesc: `Three estimation methods:\n- **Cooper 12-min Run**: (Distance \u2212 504.9) / 44.73\n- **1.5 Mile Run**: 483 / Time(min) + 3.5\n- **Resting HR**: 15.3 \u00d7 (MHR / Resting HR)\n- Rating: <30 Poor, 30\u201340 Below Avg, 40\u201350 Good, 50\u201360 Excellent, 60+ Elite`,
    example: `Cooper test: **2,400 meters in 12 min**:\n- VO\u2082 Max = (2400 \u2212 504.9) / 44.73 = **42.4 ml/kg/min**\n- Rating: **Good** (Top 25%)\n- Predicted marathon: \u2248 **142 min** (2h 22m)`
  },
  water: {
    formula: `Daily\\\\;Water = Weight \\\\times Activity\\\\;Factor`,
    formulaDesc: `Activity Factors:\n- Sedentary = 30ml/kg, Moderate = 35ml/kg, Active = 40ml/kg, Very Active = 45ml/kg\n- IOM: Men ~3.7L/day, Women ~2.7L/day (including food)\n- ~20% from food, increase 500ml+ during exercise/heat`,
    example: `**70 kg, moderately active**:\n- 70 \u00d7 35 = **2,450 ml** (2.45 L)\n- Glasses (250ml): **10 glasses**\n- Hourly: 2,450 / 16 waking hrs = **153 ml/hour**`
  },
  smokingcost: {
    formula: `Annual = \\\\frac{Cigs/Day}{20} \\\\times Pack\\\\;Price \\\\times 365`,
    formulaDesc: `Financial impact:\n- If invested at 12%: FV = Annual \u00d7 ((1.12^Years \u2212 1) / 0.12)\n- Health timeline after quitting: 20 min (BP normalizes), 1 year (heart risk halves), 10 years (lung cancer risk halves)`,
    example: `**10 cigs/day** at \u20b9300/pack for **15 years**:\n- Annual: **\u20b954,750**\n- Total: **\u20b98,21,250**\n- If invested @12%: **\u20b920,39,876**\n- Lost: **\u20b912.2 Lakh** in missed returns`
  },
  sleepdebt: {
    formula: `Debt = (Needed - Actual) \\\\times Days`,
    formulaDesc: `Sleep debt effects:\n- Debt > 8 hrs = moderate cognitive impairment\n- Debt > 16 hrs = equivalent to **0.1% blood alcohol**\n- Recovery: ~2 extra hours/night\n- Chronic debt increases: obesity +55%, diabetes +28%, depression +2.5\u00d7`,
    example: `Need **8 hours**, sleep **6 hours** for **7 days**:\n- Nightly deficit: 2 hours, Weekly debt: **14 hours**\n- Impact: **Severe** cognitive impairment\n- Recovery: ~7 nights of 10-hour sleep`
  },
};

// \u2500\u2500 CUSTOM FAQs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const CUSTOM_FAQS: Record<string, FAQItem[]> = {
  emi: [
    { q: 'What is a Loan EMI?', a: 'EMI stands for Equated Monthly Installment. It is a fixed amount of money that a borrower pays back to a lender (bank or NBFC) every calendar month until the loan is fully repaid. It consists of both the interest component and the principal component.' },
    { q: 'How does loan prepayment affect my EMI?', a: 'Making a principal prepayment reduces the outstanding balance of your loan. You can either choose to keep the tenure same and reduce your monthly EMI, or keep the EMI same and reduce your total loan tenure (which saves more interest over time).' },
    { q: 'Is the EMI calculator secure?', a: 'Yes. Calc Labz operates entirely client-side. All inputs and calculations stay on your local device. We never transmit or save any personal data on our servers, ensuring 100% data privacy.' },
    { q: 'What factors affect my loan EMI amount?', a: 'Three factors determine your EMI: the principal loan amount, the interest rate, and the loan tenure. A higher principal or interest rate increases your EMI, while a longer tenure reduces it (but increases total interest paid).' },
    { q: 'Which EMI formula does this calculator use?', a: 'This calculator uses the standard reducing balance formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the tenure in months. This is the same formula used by all Indian banks and NBFCs.' },
  ],
  sip: [
    { q: 'What is a SIP (Systematic Investment Plan)?', a: 'A Systematic Investment Plan (SIP) is a method of investing a fixed sum of money regularly in mutual funds or stocks. Instead of investing a lump sum, a SIP allows you to invest weekly or monthly to benefit from compounding and rupee cost averaging.' },
    { q: 'What is rupee cost averaging in SIP?', a: 'Rupee cost averaging means you buy more mutual fund units when market prices (NAV) are low, and fewer units when prices are high. Over the long term, this averages out the cost of your investments and reduces market volatility risks.' },
    { q: 'Is SIP better than Lump Sum investment?', a: 'SIP is generally better for salaried individuals as it helps establish financial discipline, does not require timing the market, and provides compound interest benefits. Lump sum is suitable if you have a windfall gain and the market valuations are low.' },
    { q: 'What is the minimum SIP amount in India?', a: 'Most mutual fund houses in India allow SIPs starting from ₹500 per month. Some AMCs offer micro-SIPs starting at ₹100. You can increase your SIP amount over time using Step-Up SIP to match your growing income.' },
    { q: 'Are SIP returns guaranteed?', a: 'No. SIP returns in mutual funds are subject to market risks and are not guaranteed. Historical equity mutual fund returns in India have averaged 12-15% CAGR over 10+ year periods, but past performance does not guarantee future results. Always invest based on your risk appetite and time horizon.' },
  ],
  gst: [
    { q: 'What are the current GST rates in India?', a: 'India has four GST slabs: 5% (essential goods), 12% (standard goods), 18% (most services and goods), and 28% (luxury goods, sin goods). Some items like fresh food, milk, and healthcare are GST-exempt (0%).' },
    { q: 'What is the difference between CGST, SGST, and IGST?', a: 'For intra-state transactions (within the same state), GST is split equally into CGST (Central GST) and SGST (State GST). For inter-state transactions (between different states), IGST (Integrated GST) applies at the full rate.' },
    { q: 'How do I calculate GST-inclusive price from MRP?', a: 'To find the original price from a GST-inclusive MRP: Original Price = MRP ÷ (1 + GST Rate/100). For example, if MRP is ₹1,180 at 18% GST: Original = 1180 ÷ 1.18 = ₹1,000.' },
    { q: 'Who needs to register for GST?', a: 'Businesses with annual turnover exceeding ₹40 Lakh (₹20 Lakh for services, ₹10 Lakh for special category states) must register for GST. E-commerce sellers and inter-state suppliers must register regardless of turnover.' },
    { q: 'Is GST applicable on gold purchases?', a: 'Yes. Gold attracts 3% GST on the value plus making charges. Making charges themselves attract 5% GST. So the effective GST on gold jewelry is approximately 3% on gold value + 5% on making charges.' },
  ],
  compoundinterest: [
    { q: 'What is compound interest and how does it differ from simple interest?', a: 'Compound interest is calculated on both the initial principal and the accumulated interest from previous periods (\"interest on interest\"). Simple interest is only calculated on the original principal. Over time, compound interest grows exponentially while simple interest grows linearly.' },
    { q: 'How does compounding frequency affect returns?', a: 'More frequent compounding generates slightly higher returns. Annual compounding < Half-yearly < Quarterly < Monthly < Daily. For example, ₹1 Lakh at 8% for 5 years yields: ₹1,46,933 (annual) vs ₹1,48,595 (quarterly) vs ₹1,48,985 (monthly). The difference is marginal for short tenures.' },
    { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick mental math shortcut: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 8% return, money doubles in 72/8 = 9 years. At 12%, it doubles in 72/12 = 6 years.' },
    { q: 'Does compound interest work on all investments?', a: 'Compound interest applies to bank FDs, PPF, mutual funds (when returns are reinvested), bonds, and savings accounts. Stocks grow through price appreciation and dividend reinvestment, which produces a similar compounding effect. Plain savings accounts may use simple interest.' },
    { q: 'How much can ₹1 Lakh grow in 20 years?', a: 'At 8% compound interest (quarterly): ~₹4.88 Lakh. At 12%: ~₹9.65 Lakh. At 15%: ~₹16.37 Lakh. The key takeaway: even small differences in return rates create huge differences over long periods due to the exponential nature of compounding.' },
  ],
  simpleinterest: [
    { q: 'When is simple interest used instead of compound interest?', a: 'Simple interest is used for short-term loans, flat-rate personal loans, car loan advertisements (flat rate), some government bonds, and inter-personal lending. Banks may advertise \"flat rate\" which is simple interest — the effective rate is nearly double.' },
    { q: 'How do I convert flat rate to reducing balance rate?', a: 'A rough rule of thumb: Reducing Balance Rate ≈ Flat Rate × 1.8 to 2.0. For example, a 7% flat rate personal loan is approximately 12.5-14% on a reducing balance basis. Always compare loans using reducing balance EMI rates.' },
    { q: 'Is simple interest always less than compound interest?', a: 'Yes, for periods longer than 1 year. For exactly 1 year with annual compounding, both give the same result. For periods less than 1 year, simple interest may actually be slightly higher depending on the compounding frequency.' },
    { q: 'What is the formula for total amount with simple interest?', a: 'Total Amount = Principal + Simple Interest = P + (P × R × T / 100) = P × (1 + R×T/100). For ₹1 Lakh at 6% for 3 years: A = 1,00,000 × (1 + 0.06 × 3) = ₹1,18,000.' },
    { q: 'Do Indian banks use simple or compound interest for savings?', a: 'Indian banks calculate savings account interest on a daily balance basis and credit it quarterly. This is essentially compound interest (quarterly compounding). For FDs, most banks use quarterly compounding. Only some government schemes and informal lending use simple interest.' },
  ],
  bmi: [
    { q: 'What is a healthy BMI range?', a: 'For adults, a healthy BMI is 18.5–24.9 (WHO standards). However, for Asian populations including Indians, the healthy range is 18.5–22.9, as health risks increase at lower BMI values compared to Western populations.' },
    { q: 'Is BMI accurate for athletes and muscular people?', a: 'No. BMI does not distinguish between muscle and fat mass. Athletes, bodybuilders, and people with high muscle mass may have a high BMI (\"overweight\" or \"obese\") despite having low body fat. For such individuals, body fat percentage or waist-to-hip ratio are better indicators.' },
    { q: 'What BMI is considered obese?', a: 'By WHO standards: BMI 30+ is obese. For Asian/Indian populations: BMI 27.5+ is considered obese. Obesity classes: Class I (30-34.9), Class II (35-39.9), Class III/Morbid (40+).' },
    { q: 'How can I improve my BMI?', a: 'For overweight: Create a moderate caloric deficit (500 kcal/day), increase physical activity, eat more protein and fiber, reduce processed foods. For underweight: Increase caloric intake by 300-500 kcal/day, eat calorie-dense nutritious foods, add strength training.' },
    { q: 'Is BMI valid for children and teenagers?', a: 'BMI for children (ages 2-19) uses age-and-sex-specific percentile charts (BMI-for-age) rather than fixed cutoffs. A child at the 85th-95th percentile is considered overweight, and above the 95th percentile is obese. Our calculator uses adult formulas.' },
  ],
  incometax: [
    { q: 'What is the income tax exemption limit for FY 2025-26?', a: 'Under the New Tax Regime, income up to ₹12 Lakh is effectively tax-free due to Section 87A rebate. For salaried individuals, the limit extends to ₹12.75 Lakh (₹12L + ₹75K standard deduction). Under the Old Regime, the basic exemption is ₹2.5 Lakh.' },
    { q: 'What is the standard deduction for salaried employees?', a: 'The standard deduction under the New Tax Regime is ₹75,000 per year (increased from ₹50,000 in Budget 2024). Under the Old Regime, it remains at ₹50,000. This is a flat deduction — no proof of expenses needed.' },
    { q: 'How is surcharge calculated on income tax?', a: 'Surcharge is an additional tax on tax: 10% surcharge for income ₹50L-₹1Cr, 15% for ₹1-2Cr, 25% for ₹2-5Cr (capped at 25% in new regime). The 4% Health & Education Cess is calculated on Tax + Surcharge.' },
    { q: 'Do I need to file ITR if my income is below the taxable limit?', a: 'Filing is mandatory if: gross income exceeds ₹3 Lakh (new regime basic exemption), you have TDS deducted and want a refund, you have foreign assets, or your bank deposits exceed ₹1 Crore. Even if not mandatory, filing is recommended for loan applications and visa purposes.' },
    { q: 'What deductions are available under the New Tax Regime?', a: 'The New Regime offers limited deductions: Standard deduction (₹75K for salaried), NPS employer contribution (80CCD(2)), Agniveer contribution (80CCH). Most deductions like 80C, 80D, HRA, and home loan interest are NOT available under the New Regime.' },
  ],
  taxregime: [
    { q: 'Which tax regime should I choose — Old or New?', a: 'The New Regime is better if you have few deductions/exemptions. The Old Regime is better if you claim significant deductions (80C, 80D, HRA, home loan interest) totaling more than ~₹3.75 Lakh. Use our calculator to compare your specific scenario.' },
    { q: 'Can I switch between Old and New Regime every year?', a: 'Salaried employees can switch between Old and New Regime every financial year. Business/professional income earners who opt out of the New Regime can switch back only once. The New Regime is the default — you need to explicitly opt for the Old Regime.' },
    { q: 'What deductions should I consider before choosing?', a: 'Key deductions in Old Regime: 80C (₹1.5L — PPF, ELSS, EPF, LIC), 80D (₹25K-₹1L health insurance), HRA exemption, Home Loan Interest 24(b) (₹2L), NPS 80CCD(1B) (₹50K), Education Loan interest. If these total >₹3.75L, Old Regime may save more tax.' },
    { q: 'Is HRA exemption available in the New Regime?', a: 'No. HRA exemption under Section 10(13A) is not available in the New Tax Regime. If you pay high rent and receive HRA, this is a significant factor favoring the Old Regime.' },
    { q: 'How much tax do I save by investing in NPS?', a: 'NPS offers up to ₹2 Lakh in deductions: ₹1.5L under 80CCD(1) within the 80C limit, plus an additional ₹50K under 80CCD(1B). Employer NPS contributions under 80CCD(2) are available in BOTH regimes (up to 14% of salary for government, 10% for others).' },
  ],
  mortgage: [
    { q: 'What is the current home loan interest rate in India?', a: 'As of 2026, home loan rates in India range from 8.25% to 9.5% depending on the lender, loan amount, and borrower profile. SBI, HDFC, ICICI, and Kotak offer competitive rates. Rates are usually linked to the repo rate (set by RBI).' },
    { q: 'How does prepayment save interest on a home loan?', a: 'Prepaying even ₹1 Lakh annually on a ₹50 Lakh home loan at 8.5% can save over ₹10 Lakh in interest and reduce tenure by 3-4 years. Most banks allow free prepayment on floating rate loans (RBI mandate). Fixed-rate loans may charge 2-3% prepayment penalty.' },
    { q: 'What is an amortization schedule?', a: 'An amortization schedule shows month-by-month breakdown of each EMI into principal and interest components. In early years, interest forms 70-80% of EMI. As the loan matures, the principal component increases. Our calculator generates this full schedule.' },
    { q: 'What is the maximum home loan tenure in India?', a: 'Most Indian banks offer home loans up to 30 years. The tenure is typically capped at (retirement age - current age). Longer tenure means lower EMI but significantly more total interest paid. A 20-year ₹50L loan at 8.5% costs ₹54L interest vs ₹88L for 30 years.' },
    { q: 'Should I choose fixed or floating interest rate?', a: 'Floating rate is generally recommended in India as: (1) rates tend to decrease over long periods, (2) free prepayment allowed on floating rate, (3) fixed rates in India are typically 1-2% higher. Consider fixed rate only if you believe rates will significantly increase.' },
  ],
  ppf: [
    { q: 'Is PPF interest taxable?', a: 'No. PPF enjoys EEE (Exempt-Exempt-Exempt) tax status. Your contribution qualifies for deduction under 80C (up to ₹1.5 Lakh), the interest earned is completely tax-free, and the maturity amount is also tax-free. It is one of the safest tax-free investments.' },
    { q: 'Can I withdraw from PPF before 15 years?', a: 'Partial withdrawal is allowed from the 7th year onwards (up to 50% of balance at the end of the 4th year). Premature closure is only allowed after 5 years for specific reasons (serious illness, higher education). Loans against PPF are available from 3rd to 6th year.' },
    { q: 'What is the PPF interest rate for 2026?', a: 'The PPF interest rate for Q1 FY 2025-26 is 7.1% per annum, compounded annually. The rate is reviewed quarterly by the Ministry of Finance. It has been 7.1% since April 2020. Historical average (20 years) is approximately 8%.' },
    { q: 'Can I open more than one PPF account?', a: 'No. Only one PPF account per individual is allowed. Accounts opened in violation are considered irregular and earn 0% interest. You can have one PPF account in your name and act as guardian for your minor child\'s PPF account.' },
    { q: 'What happens to PPF after 15 years?', a: 'After 15 years, you can: (1) withdraw the entire maturity amount (tax-free), (2) extend for 5-year blocks with or without fresh contributions, (3) make partial withdrawals from the extended corpus. Extension retains the EEE tax benefit.' },
  ],
  fd: [
    { q: 'Is FD interest taxable?', a: 'Yes. FD interest is fully taxable as "Income from Other Sources" at your income tax slab rate. Banks deduct TDS at 10% if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). You can submit Form 15G/15H to avoid TDS if your total income is below taxable limit.' },
    { q: 'What is the senior citizen FD rate advantage?', a: 'Most Indian banks offer 0.25% to 0.75% higher FD rates for senior citizens (age 60+). Super senior citizens (80+) may get additional 0.25%. Tax-saving FDs also have a higher TDS threshold of ₹50,000 for seniors.' },
    { q: 'Can I break an FD before maturity?', a: 'Yes, but premature withdrawal typically incurs a penalty of 0.5% to 1% reduction in the applicable interest rate. Some banks have zero-penalty FDs but at slightly lower rates. For emergencies, overdraft against FD (up to 90%) avoids penalty.' },
    { q: 'What is a tax-saving FD?', a: 'A 5-year tax-saving FD qualifies for deduction under Section 80C (up to ₹1.5 Lakh). The lock-in period is 5 years with no premature withdrawal allowed. Joint accounts can only be held with spouse, and only the first holder gets the tax benefit.' },
    { q: 'Which compounding frequency gives the best FD returns?', a: 'Monthly > Quarterly > Half-Yearly > Annually. However, the difference is small: ₹1L at 7% for 5 years yields ₹1,41,760 (annual) vs ₹1,41,478 (quarterly). Some banks only offer quarterly compounding. Cumulative FDs (interest reinvested) earn more than non-cumulative (periodic payouts).' },
  ],
  cagr: [
    { q: 'What is a good CAGR for investments?', a: 'In the Indian context: Equity mutual funds: 12-15% CAGR (long-term), Index funds (Nifty 50): 12-13%, FDs: 6-7%, PPF: 7-8%, Gold: 8-10%, Real estate: 5-8%. A CAGR higher than inflation (6%) means real wealth creation.' },
    { q: 'How is CAGR different from average return?', a: 'CAGR shows the smoothed annual growth rate assuming steady growth. Average return is the arithmetic mean of yearly returns. Example: If an investment returns +50% in Year 1 and -50% in Year 2, average return is 0%, but CAGR is -13.4% (you actually lost money).' },
    { q: 'Can CAGR be used to compare different investments?', a: 'Yes. CAGR is the best metric for comparing investments over different time periods. It accounts for compounding and gives you the true annualized return. However, it does not capture volatility — two investments can have the same CAGR but very different risk profiles.' },
    { q: 'What is the CAGR of Nifty 50 over the last 20 years?', a: 'The Nifty 50 has delivered approximately 12-14% CAGR over 20-year periods historically. Including dividends (Total Return Index), it is closer to 13-15%. However, 5-year CAGRs can range from 2% to 25% depending on entry and exit timing.' },
    { q: 'Does CAGR account for additional investments?', a: 'No. CAGR only works for lump-sum investments with a single start and end value. For SIP or multiple cash flows, use XIRR (Extended Internal Rate of Return) instead. XIRR accounts for timing and size of each cash flow.' },
  ],
  tdee: [
    { q: 'What is the most accurate TDEE formula?', a: 'The Mifflin-St Jeor equation (1990) is considered the most accurate for modern populations by the Academy of Nutrition and Dietetics. It is more accurate than the older Harris-Benedict equation (1919). Our calculator uses Mifflin-St Jeor as the primary formula.' },
    { q: 'How do I use TDEE for weight loss?', a: 'To lose weight, eat 300-500 kcal below your TDEE (moderate deficit). For 0.5 kg/week loss, create a 500 kcal/day deficit. For 1 kg/week, create a 1,000 kcal deficit (maximum safe rate). Combine diet and exercise for sustainable results.' },
    { q: 'Does TDEE change over time?', a: 'Yes. TDEE decreases with age (~2-3% per decade after 30), decreases with weight loss (metabolic adaptation), increases with muscle gain, and varies with activity level. Recalculate your TDEE every 4-8 weeks during a weight loss program.' },
    { q: 'What activity level should I choose?', a: 'Sedentary: desk job, no exercise. Lightly active: 1-3 days light exercise/week. Moderately active: 3-5 days moderate exercise. Very active: hard exercise 6-7 days. Extra active: physical labor job + intense exercise. Most people overestimate their activity level — when in doubt, choose one level lower.' },
    { q: 'Should I eat below my BMR?', a: 'Generally no. Eating below your BMR for extended periods can slow metabolism, cause muscle loss, nutrient deficiencies, and hormonal imbalances. Your calorie target should be between BMR and TDEE. Very low calorie diets (<1,200 kcal) should only be done under medical supervision.' },
  ],
  bodyfat: [
    { q: 'What body fat percentage is considered healthy?', a: 'Healthy ranges: Men — Essential: 2-5%, Athletes: 6-13%, Fitness: 14-17%, Average: 18-24%, Obese: 25%+. Women — Essential: 10-13%, Athletes: 14-20%, Fitness: 21-24%, Average: 25-31%, Obese: 32%+. Women naturally carry more essential fat for reproductive health.' },
    { q: 'How accurate is the Navy body fat method?', a: 'The U.S. Navy method has a margin of error of ±3-4%. It is less accurate than DEXA scans (gold standard, ±1-2%) or hydrostatic weighing but far more practical. Bioelectrical impedance (smart scales) can vary ±5-8% and are affected by hydration.' },
    { q: 'What measurements do I need for body fat calculation?', a: 'Men: neck circumference and waist circumference (at navel level). Women: neck, waist, and hip circumference. All measurements should be taken with a flexible tape measure, relaxed (not flexed), in the morning for consistency.' },
    { q: 'Can I have abs at my current body fat percentage?', a: 'Visible abs typically require: Men <15% body fat for faint outline, <12% for defined abs, <10% for shredded six-pack. Women: <20% for faint lines, <18% for definition. Abdominal muscle development (through training) also matters, not just fat loss.' },
    { q: 'Is body fat percentage more important than BMI?', a: 'Yes, for fitness assessment. BMI does not distinguish fat from muscle. A bodybuilder with 10% body fat could be "obese" by BMI. Body fat percentage, waist-to-hip ratio, and waist-to-height ratio are better indicators of metabolic health than BMI alone.' },
  ],
  percentage: [
    { q: 'How do I calculate percentage of a number?', a: 'Multiply the number by the percentage and divide by 100. Formula: X% of N = (X × N) / 100. Example: 25% of 800 = (25 × 800) / 100 = 200. Shortcut: move the decimal point of the percentage two places left and multiply.' },
    { q: 'How do I find what percentage one number is of another?', a: 'Divide the part by the whole and multiply by 100. Formula: (Part / Whole) × 100. Example: 45 is what percent of 180? Answer: (45/180) × 100 = 25%.' },
    { q: 'How do I calculate percentage increase or decrease?', a: 'Percentage Change = ((New Value − Old Value) / Old Value) × 100. Positive result = increase, Negative = decrease. Example: Price went from ₹500 to ₹650: Change = ((650-500)/500) × 100 = 30% increase.' },
    { q: 'How do I reverse a percentage? (Find original price after discount)', a: 'Original Price = Discounted Price / (1 − Discount%/100). Example: An item costs ₹680 after 15% discount. Original = 680 / (1 - 0.15) = 680 / 0.85 = ₹800.' },
    { q: 'How do I calculate cumulative percentage change?', a: 'Cumulative change is NOT the sum of individual changes. If something increases by 20% then decreases by 20%, the result is NOT 0%. It is: 100 × 1.20 × 0.80 = 96 — a net 4% decrease. Always multiply the factors, do not add percentages.' },
  ],
  inhandsalary: [
    { q: 'What is the difference between CTC and in-hand salary?', a: 'CTC (Cost to Company) is the total annual expense to your employer, including your salary, benefits, PF employer contribution, gratuity, and insurance. In-hand salary is what actually lands in your bank account after deducting employee PF, professional tax, income tax (TDS), and other deductions. Typically, in-hand is 65-80% of CTC.' },
    { q: 'Why is my in-hand salary much less than my CTC?', a: 'Major deductions: Employee PF (12% of basic), Income Tax (TDS, varies by income), Professional Tax (₹200/month in most states), Group Insurance, Gratuity provision, ESI (if applicable). Variable pay/bonus in CTC may not be paid monthly.' },
    { q: 'How can I increase my in-hand salary legally?', a: 'Restructure your salary: Maximize HRA (if old regime), claim LTA, food coupons (₹50/meal), add NPS employer contribution (80CCD(2)). Choose the tax regime that gives lower tax. Claim all eligible deductions. Some companies allow salary restructuring annually.' },
    { q: 'Is employer PF contribution part of my in-hand salary?', a: 'No. Employer PF contribution (12% of basic) goes directly to your EPFO account, not your bank account. It is part of your CTC but not your in-hand salary. However, it is your money and you can withdraw it when you leave or retire.' },
    { q: 'What is a good basic salary percentage?', a: 'Ideal basic salary is 40-50% of CTC. Lower basic (30%) means less PF/gratuity but more in-hand pay and more HRA. Higher basic (50%) means more PF accumulation and higher gratuity but less take-home. For tax-saving under old regime, ~40% basic with maximum HRA is optimal.' },
  ],
  retirementcorpus: [
    { q: 'How much money do I need to retire in India?', a: 'A common rule of thumb: 25-30 times your annual expenses at retirement. If you need ₹1 Lakh/month at age 60, that is ₹12L/year, so you need ₹3-3.6 Crore corpus. However, you must account for inflation — ₹50,000/month today equals ~₹2.87L/month in 30 years at 6% inflation.' },
    { q: 'What is the 4% safe withdrawal rule?', a: 'The 4% rule suggests you can withdraw 4% of your corpus annually (adjusted for inflation) without running out of money for 30+ years. For India, a 3-3.5% withdrawal rate may be safer due to higher inflation. ₹3 Crore corpus → ~₹1 Lakh/month withdrawal.' },
    { q: 'At what age should I start planning for retirement?', a: 'As early as possible! Starting at 25 vs 35 means you need to save roughly half the monthly amount for the same corpus. A 5-year head start can reduce required monthly savings by 40%. Even ₹5,000/month SIP started at 25 can grow to ₹2 Crore by 60 at 12% returns.' },
    { q: 'Should I include EPF/PPF in my retirement planning?', a: 'Yes! EPF and PPF are significant retirement assets. Include your current EPF balance + projected contributions, PPF maturity, NPS corpus, and any real estate you plan to liquidate. Then calculate the gap between what you have and what you need.' },
    { q: 'What return rate should I assume for retirement planning?', a: 'Conservative approach: 10-12% pre-retirement (equity-heavy portfolio), 7-8% post-retirement (debt-heavy). Aggressive: 13-15% pre, 9-10% post. Always use 6% inflation for India. Use real returns (nominal - inflation) for more accurate planning.' },
  ],
  hra: [
    { q: 'Can I claim HRA if I live in my own house?', a: 'No, if you live in a house you own. However, if you own a house in one city and rent in another city for work, you can claim both HRA exemption and home loan interest deduction. You must have actual rent receipts to claim HRA.' },
    { q: 'What documents do I need to claim HRA?', a: 'Rent receipts (mandatory if rent > ₹3,000/month), rental agreement/lease deed, PAN of landlord (mandatory if annual rent > ₹1 Lakh), rent payment bank statements. Keep receipts with revenue stamps for amounts over ₹5,000.' },
    { q: 'Can I claim HRA in the New Tax Regime?', a: 'No. HRA exemption under Section 10(13A) is not available in the New Tax Regime. If your HRA exemption is significant, it may make the Old Regime more beneficial. Calculate both scenarios using our Tax Regime Comparator.' },
    { q: 'What if I pay rent to my parents?', a: 'Yes, you can pay rent to parents and claim HRA exemption — this is a legitimate tax-saving strategy. Your parents must include the rent as income in their tax return. If they are in a lower tax bracket or senior citizens with low income, this can save tax for the family overall.' },
    { q: 'Is HRA calculated on basic salary or gross salary?', a: 'HRA exemption is calculated based on Basic Salary + DA (Dearness Allowance). It does not include HRA itself, special allowances, or bonuses. The exempt amount is the minimum of: Actual HRA received, 50%/40% of Basic+DA (metro/non-metro), or Rent paid minus 10% of Basic+DA.' },
  ],
  nps: [
    { q: 'Is NPS a good investment for retirement?', a: 'Yes, NPS is one of the best retirement tools for tax-saving (extra ₹50K deduction under 80CCD(1B)), low-cost professional fund management, and market-linked returns (10-12% equity, 8-9% mixed). However, 40% mandatory annuity and partial lock-in are drawbacks.' },
    { q: 'What is the NPS annuity rule?', a: 'At retirement (age 60): You must use minimum 40% of corpus to buy an annuity (monthly pension from insurance company). The remaining 60% can be withdrawn as a tax-free lump sum. You can voluntarily allocate more than 40% to annuity for higher pension.' },
    { q: 'Can I withdraw from NPS before retirement?', a: 'Partial withdrawal is allowed after 3 years for specific reasons: children\'s education/marriage, home purchase, medical treatment, or skill development. Maximum 25% of employee contributions can be withdrawn, up to 3 times during the account lifetime.' },
    { q: 'NPS vs PPF — which is better?', a: 'NPS: Higher potential returns (10-12% equity), extra 50K tax deduction, but partially locked and 40% annuity mandatory. PPF: Fixed 7.1% return, fully tax-free, more liquid after year 7. Best strategy: Invest in both — PPF for safety and NPS for equity exposure and extra tax saving.' },
    { q: 'What are the NPS fund choices — Active vs Auto?', a: 'Active Choice: You decide allocation across Equity (E), Corporate Debt (C), Government Securities (G), and Alternate Assets (A). Max 75% equity allowed, reducing after age 50. Auto Choice: Age-based allocation — Aggressive, Moderate, or Conservative. Equity reduces automatically as you approach 60.' },
  ],
  carloan: [
    { q: 'What is the ideal car loan tenure?', a: 'Ideally 3-5 years. Shorter tenure means higher EMI but less total interest. For a ₹8L car loan at 9%: 3-year EMI = ₹25,434 (interest: ₹1.16L), 5-year EMI = ₹16,607 (interest: ₹1.96L), 7-year EMI = ₹12,834 (interest: ₹2.78L). Avoid 7-year loans — the car depreciates faster than you repay.' },
    { q: 'Is it better to pay cash or take a car loan?', a: 'Financial analysis: If your investment returns exceed the car loan interest rate, a loan may be better. At 9% car loan rate, you need >9% post-tax investment returns to justify keeping cash invested. However, factor in the psychological cost of debt and depreciation.' },
    { q: 'What is the typical down payment for a car loan?', a: 'Banks finance 80-90% of the on-road price. You typically need 10-20% down payment. Higher down payment means lower EMI and less total interest. Example: ₹10L car, 20% down = ₹2L down, ₹8L loan. With 10% down = ₹1L down, ₹9L loan — this adds ₹24K+ in extra interest over 5 years.' },
    { q: 'Does prepaying a car loan save money?', a: 'Yes, significantly. Most banks allow free prepayment on floating-rate car loans. Prepaying ₹50,000 in the first year of a ₹8L car loan at 9% for 5 years can save ₹15,000+ in interest. However, check if your lender charges prepayment penalty (some charge 2-5% on fixed-rate loans).' },
    { q: 'What credit score do I need for a car loan?', a: 'CIBIL score 750+ gets the best rates (8-9%). Score 700-749 may get approval at slightly higher rates (9-11%). Below 650 is difficult — expect 12-15% or rejection. No credit history? Consider starting with a credit card or secured loan to build your score.' },
  ],
  epf: [
    { q: 'Can I withdraw EPF before retirement?', a: 'Partial withdrawal is allowed for: home purchase/construction (after 5 years), medical treatment (any time), marriage/education (after 7 years). Full withdrawal is allowed only after 2 months of unemployment or at age 58. Early withdrawal before 5 years of continuous service is taxable.' },
    { q: 'What is the current EPF interest rate?', a: 'The EPFO declared 8.25% interest rate for FY 2023-24 (credited in 2025). This is one of the highest rates among debt instruments. EPF interest is tax-free up to ₹2.5 Lakh annual contribution (₹5 Lakh if employer doesn\'t contribute). Beyond this, interest on excess is taxable.' },
    { q: 'How is EPF different from VPF?', a: 'VPF (Voluntary Provident Fund) allows you to contribute more than the mandatory 12% of basic to your PF account, up to 100% of basic salary. VPF earns the same interest rate as EPF (8.25%) and has the same withdrawal rules. It is a good option for low-risk investors.' },
    { q: 'Is EPF interest taxable?', a: 'From April 2021: EPF interest is tax-free only on contributions up to ₹2.5 Lakh per year (₹5 Lakh if employer doesn\'t contribute to EPF). Interest on contributions exceeding this threshold is taxable at your income tax slab rate. This applies to high-salary employees mainly.' },
    { q: 'What happens to my EPF if I change jobs?', a: 'You can transfer your EPF to the new employer\'s PF account using the online UAN portal (requires Aadhaar/KYC linking). Transfer is recommended to maintain continuity for tax-free withdrawal. If you don\'t transfer within 3 months, interest may not be credited on the old account.' },
  ],
  rd: [
    { q: 'How is RD interest calculated?', a: 'RD interest is calculated using quarterly compounding (as per RBI guidelines). Each monthly deposit earns compound interest from its deposit date to maturity. The effective yield is slightly higher than the stated rate due to compounding. Banks use a formula accounting for the diminishing period of each deposit.' },
    { q: 'Can I miss an RD installment?', a: 'Missing installments may incur a penalty (typically ₹1-2 per ₹100 per month of default). After 6 consecutive missed payments, the RD may be closed with penalty. Some banks allow a 1-month grace period. Post-office RDs allow revival within 12 months with penalty.' },
    { q: 'RD vs SIP — which is better?', a: 'RD: Fixed returns (6-7%), zero risk, bank deposit insurance up to ₹5 Lakh, suitable for 6-24 month goals. SIP: Variable returns (12-15% in equity), market risk, better for long-term (5+ years). For goals under 2 years, RD is safer. For 5+ years, SIP likely outperforms.' },
    { q: 'Is RD interest taxable?', a: 'Yes, RD interest is fully taxable as "Income from Other Sources" at your slab rate. Banks deduct TDS at 10% if total interest from all FDs and RDs with that bank exceeds ₹40,000 per year (₹50,000 for senior citizens). No Section 80C benefit on RD investments.' },
    { q: 'What is the minimum RD amount and tenure?', a: 'Post Office RD: Minimum ₹100/month, 5-year fixed tenure. Bank RDs: Minimum ₹100-₹1,000/month (varies by bank), tenure from 6 months to 10 years. Most banks allow premature closure after 3 months with a penalty of 1-2% on the applicable rate.' },
  ],
  swp: [
    { q: 'What is SWP and how does it work?', a: 'SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investment at regular intervals (monthly/quarterly). The remaining corpus continues to earn returns. It is the reverse of SIP — ideal for generating regular income during retirement or for monthly expenses.' },
    { q: 'Is SWP better than FD for monthly income?', a: 'SWP from debt/balanced funds often provides better post-tax returns than FD interest. FD interest is taxed at slab rate, while SWP capital gains have lower tax rates and benefit from indexation. Additionally, SWP allows corpus growth if the fund returns exceed the withdrawal rate.' },
    { q: 'What is a safe SWP withdrawal rate?', a: 'For long-term sustainability: withdraw 3-4% of corpus annually from equity funds, 5-6% from debt funds. If the fund returns 10-12% and you withdraw 6%, the corpus grows. If withdrawals exceed returns, the corpus depletes over time.' },
    { q: 'Is SWP taxable?', a: 'SWP withdrawals are treated as mutual fund redemptions. Only the capital gains portion (not the principal) is taxable. For equity funds (>65% equity): LTCG at 12.5% above ₹1.25L. For debt funds: taxed at income tax slab rate. This makes SWP more tax-efficient than FD interest.' },
    { q: 'Can I change the SWP amount later?', a: 'Yes. Most AMCs allow you to modify the SWP amount, frequency, or stop it entirely without penalty. You can increase withdrawals during high-expense months and decrease them otherwise. Some AMCs even allow SWP and SIP simultaneously in the same fund.' },
  ],
  lumpsum: [
    { q: 'When should I invest lump sum vs SIP?', a: 'Lump sum is better when: markets are significantly undervalued, you have a windfall (bonus, inheritance), or the investment horizon is 7+ years. SIP is better for regular income earners, when markets are at highs, or when you cannot time the market. Historically, lump sum outperforms SIP 65% of the time over 10+ years.' },
    { q: 'What is the power of compounding in lump sum?', a: 'Compounding accelerates wealth exponentially. ₹1 Lakh invested at 12% becomes: ₹3.1L in 10 years, ₹9.6L in 20 years, ₹30L in 30 years. The later years contribute disproportionately more — your money grows more from year 20-30 than from year 0-20. Time is the biggest factor.' },
    { q: 'Which mutual fund category is best for lump sum?', a: 'For 1-3 years: Liquid/Ultra-Short Duration funds. 3-5 years: Short Duration/Corporate Bond funds. 5-7 years: Balanced Advantage/Flexi-Cap funds. 7+ years: Large-Cap/Index funds. Never invest lump sum in small-cap or sectoral funds — too volatile.' },
    { q: 'What if I invest lump sum at the wrong time?', a: 'Even investing at market peaks has historically recovered within 2-4 years in India. The Sensex dropped 60% in 2008 but recovered fully by 2010. If you invest for 10+ years, entry timing matters very little. If worried, split your lump sum into 3-6 monthly installments (STP strategy).' },
    { q: 'Is lump sum in PPF better than annual contributions?', a: 'PPF interest is calculated on the balance as of 5th of each month. Depositing the entire ₹1.5 Lakh before April 5th maximizes interest for that year. Spreading deposits monthly means some months have lower balance. However, many people invest monthly due to cash flow constraints.' },
  ],
  capitalgains: [
    { q: 'What is the difference between STCG and LTCG?', a: 'STCG (Short-Term Capital Gains) applies to assets sold within a specified period, while LTCG (Long-Term Capital Gains) applies to assets held beyond that period. For equity: <12 months is STCG (20%), ≥12 months is LTCG (12.5% above ₹1.25L). For debt/property: the qualifying period varies.' },
    { q: 'How much LTCG is tax-free on equity?', a: 'From Budget 2024: LTCG on equity shares and equity mutual funds up to ₹1.25 Lakh per financial year is exempt from tax. Gains above ₹1.25 Lakh are taxed at 12.5% (increased from ₹1 Lakh and 10% previously).' },
    { q: 'What is indexation benefit in capital gains?', a: 'From Budget 2024: Indexation benefit has been removed for most asset classes. Property sold after July 23, 2024 is taxed at 12.5% LTCG without indexation (previously 20% with indexation). For properties bought before 2001, you can use fair market value as of April 1, 2001 as cost.' },
    { q: 'Can I offset capital losses against gains?', a: 'Yes. STCL (short-term capital loss) can be set off against both STCG and LTCG. LTCL (long-term capital loss) can only be set off against LTCG. Unabsorbed losses can be carried forward for 8 assessment years. This is called tax-loss harvesting.' },
    { q: 'How are mutual fund capital gains taxed?', a: 'Equity MFs (>65% equity): STCG at 20%, LTCG at 12.5% above ₹1.25L. Debt MFs (bought after April 2023): No LTCG benefit — taxed at income slab rate regardless of holding period. Hybrid MFs: Classified as equity or debt based on equity allocation (>65% or <65%).' },
  ],
  stepupsip: [
    { q: 'What is the ideal step-up percentage for SIP?', a: 'Align it with your expected salary growth: 8-10% is common for most professionals. Even a 5% step-up dramatically improves wealth creation. At 12% returns over 20 years: Regular ₹5K SIP = ₹49.9L, 10% step-up = ₹1.15 Crore (2.3x more!). Start with what you can afford and increase gradually.' },
    { q: 'How do I set up a step-up SIP with my AMC?', a: 'Most AMCs and platforms (Groww, Zerodha, Kuvera) offer an auto step-up SIP option during registration. You can specify the step-up percentage and frequency (usually annual). Alternatively, manually increase your SIP amount each April when you get your salary increment.' },
    { q: 'Can I stop the step-up and keep the current SIP amount?', a: 'Yes. Step-up is optional and can be modified or stopped at any time. If your expenses increase unexpectedly, you can pause the step-up while continuing the current SIP. Most platforms allow modification through the app without cancelling the entire SIP.' },
    { q: 'Step-Up SIP vs Lump Sum top-up — which is better?', a: 'Step-Up SIP is better for discipline and automatic execution. It also benefits from rupee cost averaging throughout the year. However, if you receive a large bonus, a lump sum top-up can be more effective since the money enters the market immediately.' },
    { q: 'How does step-up SIP compare to regular SIP over long periods?', a: 'Over 20 years with 12% returns: Regular ₹10K SIP = ₹99.9L. With 10% annual step-up, same SIP grows to ₹2.3 Crore — that is 2.3x more wealth. The step-up adds only ₹1,000/month per year but the compounding effect on each increment is massive over decades.' },
  ],
  savingsgoal: [
    { q: 'What should my emergency fund savings goal be?', a: '6-12 months of essential expenses. Essential = rent + EMIs + food + insurance + utilities. For a ₹50,000/month expense profile, target ₹3-6 Lakh in a liquid fund or savings account. Build this before any other investment goal.' },
    { q: 'How do I prioritize multiple savings goals?', a: 'Priority order: 1) Emergency fund (6 months), 2) High-interest debt repayment, 3) Employer PF match (free money), 4) Term insurance, 5) Short-term goals (1-3 years), 6) Retirement (start early even if small), 7) Medium-term goals (3-7 years). Use separate accounts or mutual fund folios for each goal.' },
    { q: 'Should I adjust my savings goal for inflation?', a: 'Yes! A ₹10 Lakh goal in 5 years actually needs ₹13.38 Lakh in today\'s terms at 6% inflation. Our calculator accounts for returns but you should mentally inflate your target. For education or wedding goals 10+ years away, inflation adjustment is critical.' },
    { q: 'Where should I park money for different goal timelines?', a: '0-1 year: Savings account, Liquid funds. 1-3 years: Short-duration debt funds, FDs. 3-5 years: Balanced advantage funds, Corporate bond funds. 5-10 years: Flexi-cap/Large-cap equity funds. 10+ years: Index funds, Mid-cap, Small-cap equity.' },
    { q: 'What if I cannot save the required monthly amount?', a: 'Options: 1) Extend the timeline, 2) Start with what you can and increase via step-up, 3) Reduce the goal amount, 4) Find ways to increase income (freelancing, upskilling), 5) Reduce expenses. Even ₹1,000/month is better than ₹0 — start and optimize later.' },
  ],
  bmr: [
    { q: 'What is the difference between BMR and TDEE?', a: 'BMR (Basal Metabolic Rate) is the calories your body burns at absolute rest — just to keep your heart beating, lungs breathing, and brain functioning. TDEE (Total Daily Energy Expenditure) is BMR multiplied by your activity factor. TDEE is what you actually burn in a day including movement and exercise.' },
    { q: 'Which BMR formula is most accurate?', a: 'The Mifflin-St Jeor equation (1990) is considered the most accurate by the Academy of Nutrition and Dietetics. It is more accurate than Harris-Benedict (1919, revised 1984) and Katch-McArdle (which requires body fat %). Our calculator uses Mifflin-St Jeor.' },
    { q: 'Why does BMR decrease with age?', a: 'BMR drops ~2-3% per decade after age 30, primarily due to loss of muscle mass (sarcopenia) and hormonal changes. A 25-year-old man may have a BMR of 1,800 kcal, but the same person at 55 may have 1,550 kcal. Strength training helps preserve muscle mass and maintain a higher BMR.' },
    { q: 'Can I increase my BMR?', a: 'Yes. Build more muscle through resistance training (muscle burns more calories at rest than fat). Stay hydrated, get adequate sleep (7-9 hours), and eat enough protein (1.6-2g per kg). Crash dieting lowers BMR, so avoid extreme calorie restriction.' },
    { q: 'Should I eat my BMR calories if trying to lose weight?', a: 'Your calorie target should be TDEE minus 300-500, not BMR. Eating at BMR means a moderate deficit if you are active. Eating below BMR for extended periods can cause metabolic adaptation, muscle loss, and nutrient deficiencies. Minimum safe intakes: 1,200 kcal/day (women), 1,500 kcal/day (men).' },
  ],
  macros: [
    { q: 'What is the best macro ratio for weight loss?', a: 'A good starting point: 30% protein, 30% fat, 40% carbs. High protein preserves muscle during a calorie deficit. Some prefer low-carb (40P/35F/25C) or keto (30P/65F/5C). The best ratio is one you can sustain. Protein at 1.6-2.2g per kg bodyweight is the most important macro for weight loss.' },
    { q: 'How much protein do I need per day?', a: 'Sedentary adults: 0.8g per kg bodyweight. Active/exercising: 1.2-1.6g per kg. Strength training/muscle building: 1.6-2.2g per kg. Weight loss while preserving muscle: 1.8-2.4g per kg. For a 75 kg person doing strength training: 120-165g of protein per day.' },
    { q: 'Do I need to count macros to lose weight?', a: 'No, but it helps. What matters most for weight loss is total calories (caloric deficit). However, macro tracking ensures adequate protein (preserves muscle), sufficient healthy fats (hormones), and appropriate carbs (energy). Many people succeed with simpler approaches like portion control or plate method (½ veggies, ¼ protein, ¼ carbs).' },
    { q: 'How many grams of fat should I eat per day?', a: 'Minimum 0.5g per kg bodyweight for hormonal health (testosterone, estrogen). Recommended: 20-35% of total calories. At 2,000 kcal, that is 44-78g of fat. Focus on unsaturated fats (nuts, avocado, olive oil, fish). Limit saturated fat to <10% of calories.' },
    { q: 'What is the thermic effect of food (TEF)?', a: 'TEF is the energy spent digesting food: Protein burns 20-30% of its calories during digestion, Carbs burn 5-10%, Fat burns 0-3%. This is why high-protein diets boost metabolism slightly. Eating 200g of protein (800 kcal) "costs" 160-240 kcal in digestion — a meaningful difference.' },
  ],
  caloriedeficit: [
    { q: 'How many calories should I cut to lose weight?', a: 'A 500 kcal/day deficit leads to ~0.5 kg/week weight loss. A 1,000 kcal/day deficit leads to ~1 kg/week (maximum safe rate for most people). Start with a moderate 300-500 deficit and adjust based on results after 2-3 weeks. Do not go below 1,200 kcal/day (women) or 1,500 kcal/day (men).' },
    { q: 'Is it better to eat less or exercise more for a deficit?', a: 'Combining both is most effective and sustainable. A 500 kcal deficit could be: eat 300 less + burn 200 through exercise. Exercise alone is slow (30 min running burns ~300 kcal). Diet alone risks muscle loss. The 80/20 rule: 80% diet, 20% exercise for weight loss, but exercise is crucial for health and maintenance.' },
    { q: 'Why did my weight loss stall despite being in a deficit?', a: 'Common reasons: 1) Metabolic adaptation (body adjusts to lower intake), 2) Water retention masking fat loss (especially in women), 3) Underestimating calories (hidden oils, sauces, snacking), 4) Overestimating exercise calories, 5) Muscle gain offsetting fat loss. Wait 2-3 weeks of consistent tracking before adjusting.' },
    { q: 'What is the minimum calories I should eat?', a: 'General minimums: 1,200 kcal/day for women, 1,500 kcal/day for men. Below this, you risk nutrient deficiencies, muscle loss, hormonal disruption, gallstones, and metabolic slowdown. Very low calorie diets (800 kcal) should only be done under medical supervision for a limited time.' },
    { q: 'Can I have cheat meals while in a calorie deficit?', a: 'Yes, strategically. A planned refeed (1 higher-calorie day per week) can help psychologically and may boost leptin levels (hunger hormone). However, one large cheat meal can erase 3-4 days of deficit. Budget it: if weekly deficit is 3,500 kcal, a 1,500 kcal cheat meal reduces net weekly loss by 43%.' },
  ],
  concrete: [
    { q: 'How many bags of cement do I need for 1 cubic metre of concrete?', a: 'For M20 grade (1:1.5:3 mix), you need approximately 8-9 bags (50 kg each) of cement per cubic metre. For M15 (1:2:4), about 6-7 bags, and for M25 (1:1:2), about 11-12 bags. The dry volume factor of 1.54 accounts for voids that get filled during mixing.' },
    { q: 'What concrete grade should I use for a house slab?', a: 'For residential slabs and beams, M20 (1:1.5:3) is the standard minimum as per IS 456. M25 is recommended for RCC columns, foundations, and multi-storey buildings. M15 is suitable only for lean concrete, flooring, and non-structural work. Never use below M20 for any structural member.' },
    { q: 'How much does 1 cubic metre of concrete cost in India?', a: 'Ready-Mix Concrete (RMC) costs \u20b94,500-\u20b96,500/m\u00b3 for M20 grade depending on the city. Site-mixed concrete costs \u20b93,500-\u20b95,000/m\u00b3 (materials only). Add \u20b9500-\u20b91,000/m\u00b3 for labour, formwork, and curing. Premium grades (M30+) cost 15-25% more.' },
    { q: 'What is the water-cement ratio and why does it matter?', a: 'Water-cement ratio (w/c) is the weight of water divided by weight of cement. M20 uses 0.45-0.50, M25 uses 0.40-0.45. Lower w/c ratio means stronger concrete but harder to work with. Too much water weakens concrete significantly: every 1% extra water reduces strength by around 5%.' },
    { q: 'How long should concrete be cured?', a: 'Minimum 7 days for OPC cement, 10-14 days for PPC/PSC cement. Proper curing (keeping concrete moist) develops 65% strength in 7 days and 99% in 28 days. Skip curing and you may lose 30-40% of the designed strength. Use wet jute bags, ponding, or curing compounds.' },
  ],
  bricks: [
    { q: 'How many bricks are needed to build a 10x10 room?', a: 'For a 10x10 ft room (4 walls, 10 ft height) in half-brick (4.5 inch) wall: Wall area = 4 x 10 x 10 = 400 sq ft = 37.2 m\u00b2. At ~49 bricks/m\u00b2 for half-brick, you need ~1,823 bricks. Deduct ~10% for openings (doors/windows), add 5% wastage. Total is approximately 1,700-1,750 standard bricks.' },
    { q: 'What is the standard brick size in India?', a: 'Standard modular brick (IS 1077): 190 x 90 x 90 mm (nominal with mortar: 200 x 100 x 100 mm). Traditional Indian brick: 230 x 115 x 75 mm. The modular size is recommended by BIS for better bonding and reduced mortar consumption.' },
    { q: 'What is the difference between half-brick and full-brick wall?', a: 'Half-brick wall (115mm/4.5 inch): Used for partitions, boundary walls, and non-load-bearing walls. Full-brick wall (230mm/9 inch): Used for external walls and load-bearing structures. Full-brick wall uses roughly double the bricks and mortar but provides better structural strength, sound insulation, and thermal comfort.' },
    { q: 'How much mortar is needed per 1000 bricks?', a: 'For half-brick wall: approximately 0.25-0.30 m\u00b3 of mortar per 1000 bricks. For full-brick wall: 0.45-0.50 m\u00b3. Standard mortar mix is 1:6 (cement:sand) for internal walls and 1:4 for external/load-bearing walls. This translates to roughly 1.5-2 bags of cement per 1000 bricks.' },
    { q: 'What are AAC blocks and are they better than clay bricks?', a: 'AAC (Autoclaved Aerated Concrete) blocks are 3x larger (600x200x200mm), 3x lighter, and provide better insulation than clay bricks. They reduce construction time by 30% and mortar by 60%. Cost is ~20% higher per m\u00b2 but saves on plastering and structural steel. Ideal for high-rise buildings and earthquake-prone zones.' },
  ],
  paint: [
    { q: 'How much paint do I need for a 10x12 room?', a: 'For a 10x12 ft room with 10 ft ceiling, 1 door, 2 windows, and 2 coats of emulsion: Wall area = 2x(10+12)x10 = 440 sq ft. Minus openings = ~400 sq ft. At 130 sq ft/L coverage, you need 400x2/130 which is about 6.2 litres. Buy a 4L + 1L + 1L pack. Add primer separately (~4L).' },
    { q: 'What is the difference between distemper and emulsion paint?', a: 'Distemper: Cheapest option (\u20b910-25/sq ft), water-based, suitable for ceilings and budget homes, not washable, 3-4 year life. Emulsion: Mid-range (\u20b920-50/sq ft), water-based, washable, stain-resistant, 5-7 year life. Enamel: Oil-based, highest durability, used for doors/windows/metal, glossy finish, 8-10 year life.' },
    { q: 'How much does it cost to paint a 2 BHK flat?', a: 'For a typical 2 BHK (800-1000 sq ft carpet area): Interior painting with standard emulsion = \u20b930,000-\u20b950,000 (material + labour). Premium brand emulsion = \u20b950,000-\u20b980,000. With texture/design walls = \u20b980,000-\u20b91,20,000. Labour rate: \u20b925-40/sq ft in metros, \u20b915-25 in smaller cities.' },
    { q: 'Do I need primer before painting?', a: 'Yes, primer is essential for new walls (seals porosity, improves paint adhesion), repainted walls (covers stains and old colors), and exterior walls (prevents moisture damage). Skip primer and paint may peel within 1-2 years. Use water-based primer for emulsion paint and oil-based primer for enamel paint.' },
    { q: 'How many coats of paint are recommended?', a: 'Minimum 2 coats of finish paint over 1 coat of primer is standard. For dark colors over light walls or vice versa, you may need 3 coats. Exterior walls need 2 coats of exterior emulsion over 1 coat of exterior primer. Each additional coat adds ~30% more paint consumption.' },
  ],
  constructioncost: [
    { q: 'What is the cost of constructing a house in India in 2026?', a: 'Average construction cost ranges from \u20b9800/sq ft (rural, basic) to \u20b93,500/sq ft (metro, luxury). Standard quality in Tier-2 cities: \u20b91,600-\u20b92,200/sq ft. This includes structure, finishing, plumbing, electrical, and basic fittings. Land cost, interiors, and furnishing are extra.' },
    { q: 'What is included in the per sq ft construction rate?', a: 'The rate typically includes: civil structure (foundation, columns, beams, slabs) ~45%, finishing (plastering, painting, flooring, doors) ~30%, MEP (plumbing, electrical, fire safety) ~15%, and miscellaneous (compound wall, water tank, drainage) ~10%. It does NOT include land cost, interior design, modular kitchen, or furniture.' },
    { q: 'How much does it cost to build a 1000 sq ft house?', a: 'At standard quality in Tier-2 city: 1,000 x \u20b91,800 = \u20b918 Lakh (structure + finishing). Add \u20b93-5 Lakh for compound wall, water tank, and site development. Total = \u20b921-23 Lakh. In metros with premium finish: \u20b935-45 Lakh. In rural areas with basic finish: \u20b910-12 Lakh.' },
    { q: 'Is it cheaper to buy a flat or build a house?', a: 'Building is typically 20-30% cheaper per sq ft than buying a flat in the same area (excluding land). A flat at \u20b95,000/sq ft includes land cost, builder profit, and amenities. Building at \u20b92,000/sq ft is construction only. However, building requires land purchase, architect fees, approvals, and 12-18 months of your time.' },
    { q: 'What are the hidden costs in house construction?', a: 'Commonly missed costs: architect/engineer fees (3-5% of construction), soil testing (\u20b915-25K), plan approval and permits (\u20b950K-2L), compound wall (\u20b92-5L), water/borewell connection (\u20b950K-1.5L), electrical meter and transformer (\u20b920-50K), road and drainage (\u20b91-3L), and GST on materials (5-28%). Budget 15-20% buffer over estimated cost.' },
  ],
  solarpanel: [
    { q: 'Is rooftop solar worth it in India in 2026?', a: 'Yes, with 3-5 year payback and 25-year panel life, ROI is 300-500%. Key factors: PM Surya Ghar subsidy covers 40-60% of cost for up to 3 kW, electricity tariffs keep rising (~5-8% annually), and net metering lets you sell excess power. A 3 kW system saves \u20b925,000-\u20b935,000/year on electricity bills.' },
    { q: 'What is the PM Surya Ghar Yojana subsidy?', a: 'Under PM Surya Ghar (2024 scheme): \u20b930,000/kW subsidy for first 2 kW, \u20b918,000/kW for additional capacity up to 3 kW, total max subsidy \u20b978,000. For a 3 kW system costing \u20b91.5-1.8 Lakh, your net cost after subsidy is only \u20b972,000-\u20b91,02,000. Available only for residential consumers with valid electricity connection.' },
    { q: 'How much roof space do I need for solar panels?', a: 'Approximately 100 sq ft per kW. A 3 kW system needs ~300 sq ft of shadow-free roof area. Panels should face south (in India) with a tilt angle equal to your latitude (20-30 degrees). East-west facing roofs generate 10-15% less power. Flat roofs are ideal with adjustable tilt mounting structures.' },
    { q: 'How many units does a 1 kW solar system generate?', a: 'A 1 kW system generates approximately 4-5 units (kWh) per day or 1,200-1,500 units/year in most Indian cities. Peak output occurs 10 AM - 3 PM. Generation varies by region: Rajasthan/Gujarat get 5+ units/kW/day, while Kerala/Northeast get 3.5-4 units. Monsoon months see 30-40% lower output.' },
    { q: 'What maintenance does a rooftop solar system need?', a: 'Minimal maintenance: Clean panels with water every 2-4 weeks (dusty areas weekly), check wiring connections annually, and monitor inverter for errors. No moving parts to replace. Panels have 25-year warranty, inverters 5-10 years. Annual maintenance cost: \u20b92,000-\u20b95,000. Panel degradation is only 0.5-0.7% per year.' },
  ],
  landarea: [
    { q: 'How many square feet is 1 acre?', a: '1 Acre = 43,560 square feet = 4,047 square metres = 4,840 square yards. In Indian context: 1 Acre = 100 Cents (Kerala/TN), 40 Guntas (Karnataka), 1.613 Bigha (UP), 2.5 Bigha (Rajasthan), 8 Kanal (Punjab). Remember: 1 Cent = 435.6 sq ft.' },
    { q: 'What is the difference between Bigha in UP and Rajasthan?', a: '1 Bigha varies dramatically by state: UP/Bihar = 27,000 sq ft (0.62 acres), Rajasthan = 17,424 sq ft (0.4 acres), HP = 8,712 sq ft (0.2 acres), West Bengal = 14,400 sq ft (0.33 acres). Always confirm the local Bigha definition before land transactions. This is a major source of disputes in rural land deals.' },
    { q: 'What is a Gunta and where is it used?', a: '1 Gunta (also Guntha) = 1,089 sq ft = 101.17 m\u00b2. It is used primarily in Karnataka, Maharashtra, and parts of Andhra Pradesh. 40 Guntas = 1 Acre. Land revenue records in these states often list plot sizes in Guntas. 1 Gunta is roughly a 33 ft x 33 ft plot.' },
    { q: 'How do I convert Marla to square feet?', a: '1 Marla = 272.25 sq ft = 25.29 m\u00b2. 1 Kanal = 20 Marla = 5,445 sq ft. Used in Punjab, Haryana, J&K, and parts of Pakistan. In urban areas, residential plots are commonly 5 Marla (1,361 sq ft), 10 Marla (2,722 sq ft), or 1 Kanal (5,445 sq ft).' },
    { q: 'What is the difference between carpet area, built-up area and super built-up area?', a: 'Carpet area = actual usable floor area inside walls (smallest). Built-up area = carpet + wall thickness + balcony (10-15% more). Super built-up area = built-up + proportionate share of common areas like lobby, stairs, lift (25-40% more than carpet). RERA mandates sale based on carpet area, but many builders still quote super built-up prices.' },
  ],
};

// ── SOURCES / REFERENCES ──────────────────────────────────
const CUSTOM_SOURCES: Record<string, { label: string; url: string }[]> = {
  emi: [
    { label: 'RBI Master Direction on Loans', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx' },
    { label: 'National Housing Bank (NHB)', url: 'https://nhb.org.in/' },
  ],
  sip: [
    { label: 'SEBI Mutual Fund Regulations', url: 'https://www.sebi.gov.in/legal/regulations/jun-2024/sebi-mutual-funds-regulations-1996_16164.html' },
    { label: 'AMFI — Mutual Fund Basics', url: 'https://www.amfiindia.com/' },
  ],
  gst: [
    { label: 'GST Council — Official Rate Schedule', url: 'https://gstcouncil.gov.in/' },
    { label: 'CBIC GST Portal', url: 'https://www.cbic.gov.in/htdocs-cbec/gst/index' },
  ],
  incometax: [
    { label: 'Income Tax Department — Tax Slabs', url: 'https://www.incometax.gov.in/iec/foportal' },
    { label: 'Union Budget 2024 — Finance Bill', url: 'https://www.indiabudget.gov.in/' },
  ],
  taxregime: [
    { label: 'Income Tax Department', url: 'https://www.incometax.gov.in/iec/foportal' },
    { label: 'Section 115BAC — New Tax Regime', url: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1#' },
  ],
  mortgage: [
    { label: 'RBI — Housing Finance', url: 'https://www.rbi.org.in/' },
    { label: 'NHB — Home Loan Guidelines', url: 'https://nhb.org.in/' },
  ],
  ppf: [
    { label: 'Ministry of Finance — PPF Scheme', url: 'https://www.finmin.nic.in/' },
    { label: 'Post Office — PPF Rates', url: 'https://www.indiapost.gov.in/Financial/Pages/Content/PPF.aspx' },
  ],
  fd: [
    { label: 'RBI — Interest Rate on Deposits', url: 'https://www.rbi.org.in/' },
    { label: 'DICGC — Deposit Insurance', url: 'https://www.dicgc.org.in/' },
  ],
  bmi: [
    { label: 'WHO — BMI Classification', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index' },
    { label: 'CDC — About Adult BMI', url: 'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html' },
  ],
  tdee: [
    { label: 'Mifflin-St Jeor et al. (1990) — AJCN', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
    { label: 'Academy of Nutrition and Dietetics', url: 'https://www.eatright.org/' },
  ],
  bodyfat: [
    { label: 'U.S. Navy Body Fat Formula', url: 'https://www.navy.mil/' },
    { label: 'ACE — Body Fat Percentage Categories', url: 'https://www.acefitness.org/' },
  ],
  nps: [
    { label: 'PFRDA — National Pension System', url: 'https://www.pfrda.org.in/' },
    { label: 'NPS Trust', url: 'https://npstrust.org.in/' },
  ],
  epf: [
    { label: 'EPFO — Interest Rate History', url: 'https://www.epfindia.gov.in/' },
    { label: 'Ministry of Labour — EPF Act', url: 'https://labour.gov.in/' },
  ],
  capitalgains: [
    { label: 'Income Tax Department — Capital Gains', url: 'https://www.incometax.gov.in/iec/foportal' },
    { label: 'Union Budget 2024 — Capital Gains Changes', url: 'https://www.indiabudget.gov.in/' },
  ],
  hra: [
    { label: 'Income Tax Act — Section 10(13A)', url: 'https://www.incometax.gov.in/iec/foportal' },
    { label: 'ClearTax — HRA Exemption Rules', url: 'https://cleartax.in/s/hra-house-rent-allowance' },
  ],
  bmr: [
    { label: 'Mifflin-St Jeor et al. (1990) — AJCN', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
    { label: 'NIDDK — Calorie Calculator', url: 'https://www.niddk.nih.gov/' },
  ],
  macros: [
    { label: 'ISSN — Protein Recommendations', url: 'https://jissn.biomedcentral.com/' },
    { label: 'WHO — Dietary Guidelines', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
  ],
  retirementcorpus: [
    { label: 'RBI — Inflation Data', url: 'https://www.rbi.org.in/' },
    { label: 'PFRDA — Retirement Planning', url: 'https://www.pfrda.org.in/' },
  ],
  caloriedeficit: [
    { label: 'NIH — Weight Management', url: 'https://www.niddk.nih.gov/health-information/weight-management' },
    { label: 'Mayo Clinic — Calorie Counting', url: 'https://www.mayoclinic.org/' },
  ],
  inhandsalary: [
    { label: 'Income Tax Department', url: 'https://www.incometax.gov.in/iec/foportal' },
    { label: 'EPFO — PF Contribution Rules', url: 'https://www.epfindia.gov.in/' },
  ],
  concrete: [
    { label: 'IS 456:2000 — Plain and Reinforced Concrete', url: 'https://www.bis.gov.in/' },
    { label: 'IS 10262:2019 — Concrete Mix Design', url: 'https://www.bis.gov.in/' },
  ],
  bricks: [
    { label: 'IS 1077 — Common Burnt Clay Building Bricks', url: 'https://www.bis.gov.in/' },
    { label: 'National Building Code of India (NBC) 2016', url: 'https://bis.gov.in/index.php/standards/technical-department/national-building-code/' },
  ],
  constructioncost: [
    { label: 'CPWD Plinth Area Rates 2024-25', url: 'https://cpwd.gov.in/' },
    { label: 'State Schedule of Rates (SOR)', url: 'https://cpwd.gov.in/' },
  ],
  stampdutycalc: [
    { label: 'IGR Maharashtra — Stamp Duty Rates', url: 'https://igrmaharashtra.gov.in/' },
    { label: 'Revenue Department — State-wise Stamp Duty', url: 'https://dor.gov.in/' },
  ],
  solarpanel: [
    { label: 'PM Surya Ghar Muft Bijli Yojana', url: 'https://pmsuryaghar.gov.in/' },
    { label: 'MNRE — Solar Rooftop Calculator', url: 'https://solarrooftop.gov.in/' },
  ],
  landarea: [
    { label: 'Survey of India — Measurement Standards', url: 'https://www.surveyofindia.gov.in/' },
    { label: 'Revenue Records — Land Measurement', url: 'https://dolr.gov.in/' },
  ],
};

// ── PUBLIC API ─────────────────────────────────────────────

/**
 * Returns custom formula data for a calculator, or null if no custom content exists.
 */
export function getCustomFormula(calcId: string): FormulaData | null {
  return CUSTOM_FORMULAS[calcId] ?? null;
}

/**
 * Returns custom FAQs for a calculator, or null if no custom content exists.
 */
export function getCustomFAQs(calcId: string): FAQItem[] | null {
  return CUSTOM_FAQS[calcId] ?? null;
}

/**
 * Returns external reference sources for E-E-A-T trust signals.
 */
export function getCustomSources(calcId: string): { label: string; url: string }[] | null {
  return CUSTOM_SOURCES[calcId] ?? null;
}

/**
 * Returns full custom content for a calculator (formula + FAQs + sources).
 * Returns null if no custom content exists for any component.
 */
export function getCalculatorContent(calcId: string): CalculatorContent | null {
  const formula = CUSTOM_FORMULAS[calcId];
  const faqs = CUSTOM_FAQS[calcId];
  if (!formula && !faqs) return null;
  return {
    formula: formula ?? { formula: '', formulaDesc: '', example: '' },
    faqs: faqs ?? [],
    sources: CUSTOM_SOURCES[calcId],
  };
}
