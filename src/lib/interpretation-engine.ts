/* ═══════════════════════════════════════════════════
   Calc Labz — Result Interpretation Engine
   Provides color-coded severity, icon, and actionable advice
   based on calculator results.
   ═══════════════════════════════════════════════════ */

export type Severity = 'success' | 'info' | 'warning' | 'danger';

export interface Interpretation {
  severity: Severity;
  emoji: string; // Now stores fa-* icon name instead of emoji
  title: string;
  message: string;
  advice?: string;
}

const SEVERITY_CONFIG: Record<Severity, { color: string; bg: string; border: string; icon: string }> = {
  success: { color: '#2E7BBF', bg: 'rgba(46, 123, 191, 0.1)', border: 'rgba(46, 123, 191, 0.3)', icon: 'fa-circle-check' },
  info: { color: '#004C8F', bg: 'rgba(0, 76, 143, 0.1)', border: 'rgba(0, 76, 143, 0.3)', icon: 'fa-info-circle' },
  warning: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', icon: 'fa-triangle-exclamation' },
  danger: { color: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.1)', border: 'rgba(255, 107, 107, 0.3)', icon: 'fa-circle-exclamation' },
};

export function getSeverityConfig(severity: Severity) {
  return SEVERITY_CONFIG[severity];
}

/**
 * Get an interpretation for a calculator result based on the calcId and input values.
 * Returns null if no specific interpretation is available.
 */
export function getInterpretation(
  calcId: string,
  values: Record<string, number | string>,
  mainValue?: string | number
): Interpretation | null {
  const mainStr = String(mainValue || '');

  switch (calcId) {
    // ── Health Calculators ──────────────────────────
    case 'bmi': {
      const bmi = parseFloat(mainStr);
      if (isNaN(bmi)) return null;
      if (bmi < 18.5) return { severity: 'warning', emoji: 'fa-scale-balanced', title: 'Underweight', message: `Your BMI of ${bmi.toFixed(1)} is below the healthy range.`, advice: 'Consider consulting a nutritionist. Focus on nutrient-dense foods and strength training.' };
      if (bmi < 23) return { severity: 'success', emoji: 'fa-heart', title: 'Healthy Weight', message: `Your BMI of ${bmi.toFixed(1)} is within the ideal range for most Asian populations.`, advice: 'Maintain your current lifestyle with regular exercise and balanced diet.' };
      if (bmi < 25) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Normal (WHO)', message: `Your BMI of ${bmi.toFixed(1)} is normal by WHO standards but may be elevated for Asian populations (overweight at 23+).`, advice: 'Consider maintaining or slightly reducing weight through activity.' };
      if (bmi < 30) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Overweight', message: `Your BMI of ${bmi.toFixed(1)} indicates overweight status.`, advice: 'A 5-10% weight reduction can significantly improve health markers. Focus on a caloric deficit of 500 kcal/day.' };
      return { severity: 'danger', emoji: 'fa-heartbeat', title: 'Obese', message: `Your BMI of ${bmi.toFixed(1)} indicates obesity.`, advice: 'Please consult a healthcare provider. Structured weight management programs can help significantly.' };
    }

    case 'bloodpressure': {
      if (mainStr.includes('Normal')) return { severity: 'success', emoji: 'fa-heart', title: 'Normal Blood Pressure', message: 'Your blood pressure is within the healthy range.', advice: 'Maintain a healthy lifestyle with regular exercise, low sodium diet, and stress management.' };
      if (mainStr.includes('Elevated')) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Elevated Blood Pressure', message: 'Your blood pressure is slightly elevated.', advice: 'Reduce sodium intake, exercise 150 min/week, maintain healthy weight, and limit alcohol.' };
      if (mainStr.includes('Stage 1')) return { severity: 'warning', emoji: 'fa-heartbeat', title: 'Hypertension Stage 1', message: 'You have Stage 1 hypertension.', advice: 'Consult your doctor. Lifestyle changes may be sufficient, but medication might be needed.' };
      if (mainStr.includes('Stage 2')) return { severity: 'danger', emoji: 'fa-heartbeat', title: 'Hypertension Stage 2', message: 'You have Stage 2 hypertension which needs medical attention.', advice: 'See a doctor promptly. You likely need medication alongside lifestyle changes.' };
      if (mainStr.includes('Crisis')) return { severity: 'danger', emoji: 'fa-circle-exclamation', title: 'Hypertensive Crisis!', message: 'This is a medical emergency if accompanied by symptoms.', advice: 'Seek emergency medical care immediately if you have headache, chest pain, or vision changes.' };
      if (mainStr.includes('Low')) return { severity: 'info', emoji: 'fa-info-circle', title: 'Low Blood Pressure', message: 'Your blood pressure is below the normal range.', advice: 'Stay hydrated, avoid standing up quickly, and consult a doctor if you feel dizzy or fatigued.' };
      return null;
    }

    case 'tdee': {
      const tdee = parseInt(mainStr);
      if (isNaN(tdee)) return null;
      return { severity: 'info', emoji: 'fa-fire', title: 'Your Daily Energy Budget', message: `You burn approximately ${tdee} calories per day. This is your maintenance level.`, advice: 'To lose weight, eat 500 kcal less. To gain weight, eat 300-500 kcal more. Adjust every 2-4 weeks based on progress.' };
    }

    case 'bmr': {
      const bmr = parseInt(mainStr);
      if (isNaN(bmr)) return null;
      return { severity: 'info', emoji: 'fa-moon', title: 'Resting Metabolism', message: `Your body burns ${bmr} calories at complete rest. Never eat below this amount.`, advice: 'This is the minimum your body needs to function. Any diet should provide at least BMR calories.' };
    }

    case 'bodyfat': {
      const bf = parseFloat(mainStr);
      if (isNaN(bf)) return null;
      const gender = String(values.gender || 'Male');
      if (gender === 'Male') {
        if (bf < 6) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Essential Fat Level', message: 'Your body fat is at essential levels. This is typical only for competition bodybuilders.', advice: 'This level is not sustainable long-term. Consider increasing to 10-15% for optimal health.' };
        if (bf < 14) return { severity: 'success', emoji: 'fa-dumbbell', title: 'Athletic', message: `${bf.toFixed(1)}% body fat is in the athletic range.`, advice: 'Excellent fitness level. Maintain with consistent training and nutrition.' };
        if (bf < 25) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Average Range', message: `${bf.toFixed(1)}% body fat is within the average range for men.`, advice: 'Consider body recomposition through resistance training and moderate caloric deficit.' };
        return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Above Average', message: `${bf.toFixed(1)}% body fat is above the healthy range.`, advice: 'Focus on gradual fat loss through diet and exercise. Aim for 0.5-1% reduction per month.' };
      } else {
        if (bf < 14) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Essential Fat Level', message: 'Body fat is at essential levels for women.', advice: 'This may affect hormonal health. Consider increasing to 18-25% for optimal function.' };
        if (bf < 21) return { severity: 'success', emoji: 'fa-dumbbell', title: 'Athletic', message: `${bf.toFixed(1)}% body fat is in the athletic range for women.`, advice: 'Excellent fitness level. Maintain with consistent training.' };
        if (bf < 32) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Average Range', message: `${bf.toFixed(1)}% body fat is within the average range for women.` };
        return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Above Average', message: `${bf.toFixed(1)}% body fat is above the healthy range for women.`, advice: 'Focus on gradual fat loss. Aim for 0.5-1% reduction per month.' };
      }
    }

    // ── Finance Calculators ─────────────────────────
    case 'emi': {
      const income = Number(values.income) || 0;
      const emi = parseInt(mainStr.replace(/[₹,]/g, ''));
      if (isNaN(emi) || income <= 0) {
        return { severity: 'info', emoji: 'fa-file-invoice', title: 'EMI Calculated', message: `Your monthly EMI is ${mainStr}.`, advice: 'Ensure your EMI does not exceed 40% of your monthly income for financial stability.' };
      }
      const ratio = (emi / income) * 100;
      if (ratio < 30) return { severity: 'success', emoji: 'fa-heart', title: 'Comfortable EMI', message: `EMI is ${ratio.toFixed(1)}% of your income — well within the safe range.`, advice: 'Banks recommend keeping total EMIs under 40% of income. You have room for comfortable repayment.' };
      if (ratio < 40) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Manageable EMI', message: `EMI is ${ratio.toFixed(1)}% of your income — at the recommended upper limit.`, advice: 'Consider building an emergency fund of 6 months expenses before taking this loan.' };
      if (ratio < 50) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Stretched EMI', message: `EMI is ${ratio.toFixed(1)}% of your income — above the recommended 40%.`, advice: 'Consider a longer tenure to reduce EMI, or increase your down payment.' };
      return { severity: 'danger', emoji: 'fa-circle-exclamation', title: 'EMI Too High', message: `EMI is ${ratio.toFixed(1)}% of your income — this may cause financial stress.`, advice: 'Banks may reject this application. Consider reducing the loan amount or increasing the tenure significantly.' };
    }

    case 'sip': {
      return { severity: 'success', emoji: 'fa-arrow-trend-up', title: 'Power of Compounding', message: `Your SIP can grow to ${mainStr} through the power of compound returns.`, advice: 'Start early — even 5 extra years of SIP can double your corpus. Consider step-up SIP (increasing amount annually) for even better results.' };
    }

    case 'incometax': {
      const total = parseInt(mainStr.replace(/[₹,]/g, ''));
      const income = Number(values.income) || 0;
      if (isNaN(total) || income <= 0) return null;
      const effectiveRate = (total / income) * 100;
      if (effectiveRate < 5) return { severity: 'success', emoji: 'fa-heart', title: 'Low Tax Bracket', message: `Your effective tax rate is only ${effectiveRate.toFixed(1)}%.`, advice: 'You are in a low tax bracket. Consider investing the tax savings in ELSS or PPF for wealth building.' };
      if (effectiveRate < 15) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Moderate Tax', message: `Your effective tax rate is ${effectiveRate.toFixed(1)}%.`, advice: 'Consider using Section 80C (₹1.5L), NPS (₹50K extra), and health insurance (80D) to reduce taxable income.' };
      if (effectiveRate < 25) return { severity: 'warning', emoji: 'fa-coins', title: 'High Tax Bracket', message: `Your effective tax rate is ${effectiveRate.toFixed(1)}%.`, advice: 'Maximize all deductions. Compare both tax regimes. Consider NPS, HRA, and home loan interest for maximum savings.' };
      return { severity: 'danger', emoji: 'fa-chart-simple', title: 'Very High Tax', message: `Your effective tax rate is ${effectiveRate.toFixed(1)}%.`, advice: 'Consult a chartered accountant for tax planning. Explore advanced strategies like capital gains harvesting and Section 54 benefits.' };
    }

    case 'taxregime': {
      if (mainStr.includes('New Regime saves')) return { severity: 'success', emoji: 'fa-sparkles', title: 'New Regime is Better', message: mainStr, advice: 'The new regime works best when you have fewer deductions. No action needed — this is the default regime.' };
      if (mainStr.includes('Old Regime saves')) return { severity: 'info', emoji: 'fa-file-invoice', title: 'Old Regime is Better', message: mainStr, advice: 'You benefit from deductions. File Form 10-IE to opt for old regime. Ensure you have proofs for all claimed deductions.' };
      return { severity: 'info', emoji: 'fa-scale-balanced', title: 'Both Regimes Equal', message: 'Both tax regimes result in the same tax liability.', advice: 'Choose the new regime for simplicity since you don\'t benefit from deductions.' };
    }

    case 'fd': {
      return { severity: 'info', emoji: 'fa-landmark', title: 'Fixed Deposit Returns', message: `Your FD will mature at ${mainStr}.`, advice: 'Remember: FD interest is taxable. If total interest exceeds ₹40,000/year (₹50,000 for seniors), TDS of 10% applies. Submit Form 15G/15H if not taxable.' };
    }

    case 'gst': {
      return { severity: 'info', emoji: 'fa-receipt', title: 'GST Breakdown', message: `Total with GST: ${mainStr}`, advice: 'For inter-state transactions, IGST applies. For intra-state, CGST + SGST applies (split equally).' };
    }

    case 'ppf': {
      return { severity: 'success', emoji: 'fa-building-columns', title: 'Tax-Free Savings', message: `Your PPF will grow to ${mainStr}.`, advice: 'PPF enjoys EEE status — exempt at investment, growth, and withdrawal. Max ₹1.5L/year counts under Section 80C. Consider investing early each year for maximum interest.' };
    }

    case 'nps': {
      return { severity: 'info', emoji: 'fa-shield-halved', title: 'Pension Corpus', message: `Estimated NPS corpus: ${mainStr}.`, advice: 'NPS offers extra ₹50K deduction under 80CCD(1B) above the ₹1.5L 80C limit. Choose aggressive equity allocation while young, shift to conservative near retirement.' };
    }

    case 'mortgage': {
      return { severity: 'info', emoji: 'fa-house', title: 'Home Loan Payment', message: `Your monthly mortgage payment is ${mainStr}.`, advice: 'Claim tax benefits: up to ₹2L/year on interest (Sec 24B) and ₹1.5L on principal (Sec 80C). Making even one extra EMI per year can save years of repayment.' };
    }

    case 'creditcard': {
      return { severity: 'danger', emoji: 'fa-credit-card', title: 'Credit Card Debt Alert', message: `Minimum payment trap: ${mainStr}.`, advice: 'Credit cards charge 36-42% APR — the most expensive debt. Pay the full balance each month. If you have outstanding balance, transfer to a personal loan at 12-15% to save significantly.' };
    }

    case 'networth': {
      const nw = parseInt(mainStr.replace(/[₹,]/g, ''));
      if (isNaN(nw)) return null;
      if (nw < 0) return { severity: 'danger', emoji: 'fa-chart-line', title: 'Negative Net Worth', message: 'Your liabilities exceed your assets.', advice: 'Focus on paying off high-interest debt first (avalanche method). Build an emergency fund of ₹50K, then aggressively pay off loans.' };
      if (nw < 500000) return { severity: 'warning', emoji: 'fa-seedling', title: 'Building Phase', message: `Your net worth is ${mainStr} — you are in the wealth building phase.`, advice: 'Start a SIP of at least 20% of your income. Focus on increasing income alongside saving.' };
      if (nw < 5000000) return { severity: 'info', emoji: 'fa-chart-simple', title: 'Growing Wealth', message: `Your net worth of ${mainStr} shows healthy progress.`, advice: 'Diversify: aim for 60% equity, 20% debt, 10% gold, 10% real estate. Rebalance annually.' };
      return { severity: 'success', emoji: 'fa-trophy', title: 'Strong Financial Position', message: `Net worth of ${mainStr} — excellent financial health.`, advice: 'Consider advanced strategies: direct equity, REITs, international diversification, and estate planning.' };
    }

    case 'loanaffordability': {
      return { severity: 'info', emoji: 'fa-house-chimney', title: 'Home Buying Budget', message: `Maximum affordable property: ${mainStr}.`, advice: 'Banks typically approve 5-6× annual income. Keep total EMIs (existing + new) under 50% of net income. Factor in registration, stamp duty (5-7%), and furnishing costs.' };
    }

    // ── Health — Additional ─────────────────────────
    case 'water': {
      return { severity: 'info', emoji: 'fa-glass-water-droplet', title: 'Daily Hydration', message: `Recommended water intake: ${mainStr}.`, advice: 'Increase by 500ml for every 30 min of exercise. Drink before you feel thirsty. Urine should be pale yellow — dark yellow means dehydration.' };
    }

    case 'macros': {
      return { severity: 'info', emoji: 'fa-utensils', title: 'Macro Targets Set', message: `Your daily macro breakdown is ready.`, advice: 'Protein is the most important macro for body composition. Hit your protein target first, then fill remaining calories with carbs and fats based on preference.' };
    }

    case 'sleep': {
      return { severity: 'info', emoji: 'fa-moon', title: 'Optimal Sleep Windows', message: `Your recommended bedtimes are calculated based on 90-min sleep cycles.`, advice: 'Waking between cycles (not during) prevents grogginess. Aim for 5-6 complete cycles (7.5-9 hours). Keep a consistent schedule — even on weekends.' };
    }

    case 'caloriedeficit': {
      return { severity: 'info', emoji: 'fa-bullseye', title: 'Weight Loss Plan', message: `Your calorie target for weight loss: ${mainStr}.`, advice: 'A 500 kcal/day deficit = ~0.5 kg/week loss. Never go below your BMR. Combine diet with resistance training to preserve muscle. Weigh weekly, not daily.' };
    }

    case 'waisthip': {
      if (mainStr.includes('Low')) return { severity: 'success', emoji: 'fa-heart', title: 'Low Risk', message: 'Your waist-to-hip ratio indicates low cardiovascular risk.', advice: 'Excellent! Maintain with regular exercise and balanced diet.' };
      if (mainStr.includes('Moderate')) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Moderate Risk', message: 'Your waist-to-hip ratio indicates moderate cardiovascular risk.', advice: 'Focus on reducing visceral fat through aerobic exercise and reducing refined carbs.' };
      return { severity: 'danger', emoji: 'fa-heartbeat', title: 'High Risk', message: 'Your waist-to-hip ratio indicates elevated cardiovascular risk.', advice: 'Consult a doctor. Visceral fat (around organs) is the most dangerous type. Prioritize waist reduction.' };
    }

    case 'cholesterolratio': {
      if (mainStr.includes('Optimal') || mainStr.includes('Desirable')) return { severity: 'success', emoji: 'fa-heart', title: 'Healthy Cholesterol', message: 'Your cholesterol levels are in the healthy range.', advice: 'Maintain with a diet rich in omega-3, fiber, and regular exercise. Retest annually.' };
      if (mainStr.includes('Borderline')) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Borderline Cholesterol', message: 'Your cholesterol ratio is borderline high.', advice: 'Increase fiber intake, reduce saturated fats, exercise 30 min/day, and consider omega-3 supplements.' };
      return { severity: 'danger', emoji: 'fa-heartbeat', title: 'High Cholesterol Risk', message: 'Your cholesterol levels need medical attention.', advice: 'See a doctor. You may need statins alongside lifestyle changes. Get retested in 3 months.' };
    }

    case 'diabetesrisk': {
      if (mainStr.includes('Low')) return { severity: 'success', emoji: 'fa-heart', title: 'Low Diabetes Risk', message: 'Your diabetes risk score is low.', advice: 'Maintain healthy weight, exercise regularly, and limit sugar intake. Get fasting glucose checked annually after age 45.' };
      if (mainStr.includes('Moderate')) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Moderate Risk', message: 'You have moderate risk factors for type 2 diabetes.', advice: 'Get HbA1c and fasting glucose tested. Reduce refined carbs, increase fiber, and aim for 150 min/week of moderate exercise.' };
      return { severity: 'danger', emoji: 'fa-heartbeat', title: 'High Diabetes Risk', message: 'Your risk factors suggest high probability of type 2 diabetes.', advice: 'See a doctor immediately for blood sugar testing. Early intervention can prevent or reverse prediabetes.' };
    }

    case 'bodyrecomp': {
      return { severity: 'info', emoji: 'fa-dumbbell', title: 'Recomposition Plan Ready', message: `Target daily intake: ${mainStr}.`, advice: 'Body recomp works best for beginners and those returning from a break. Prioritize protein (2.2g/kg), sleep 7-9 hours, and progressive overload in training. Don\'t trust the scale — take progress photos.' };
    }

    case 'proteinintake': {
      return { severity: 'info', emoji: 'fa-dumbbell', title: 'Protein Target', message: `Your daily protein needs: ${mainStr}.`, advice: 'Spread protein across 4-5 meals (30-40g each) for optimal muscle protein synthesis. Complete sources: chicken, fish, eggs, whey, paneer, dal+rice combo.' };
    }

    case 'heartrate': {
      return { severity: 'info', emoji: 'fa-heart', title: 'Training Zones', message: 'Your heart rate training zones are calculated.', advice: 'Zone 2 (60-70% max HR) is best for fat burning and cardiovascular health. Zone 4-5 (80-100%) builds anaerobic capacity. Spend 80% of training time in Zone 2.' };
    }

    case 'compoundinterest': {
      return { severity: 'success', emoji: 'fa-chart-simple', title: 'Compound Growth', message: `Your investment will grow to ${mainStr}.`, advice: 'The earlier you start, the more powerful compounding becomes. At 8% return, money doubles every 9 years (Rule of 72).' };
    }

    case 'roi': {
      return { severity: 'info', emoji: 'fa-arrow-trend-up', title: 'Investment Returns', message: `Your return on investment: ${mainStr}.`, advice: 'Compare your CAGR against benchmarks: Nifty 50 averages ~12% CAGR, FDs give ~6-7%, and inflation is ~5-6%.' };
    }

    case 'gratuity': {
      return { severity: 'info', emoji: 'fa-handshake', title: 'Gratuity Entitlement', message: `Your estimated gratuity: ${mainStr}.`, advice: 'Gratuity is tax-free up to ₹20 lakh. You are eligible after 5 years of continuous service (or 4 years + 240 days). Amount = (Basic × 15 × Years) / 26.' };
    }

    // ── Finance — Government Schemes ────────────────
    case 'ssy': {
      return { severity: 'success', emoji: 'fa-piggy-bank', title: 'Sukanya Samriddhi', message: `Maturity amount: ${mainStr}.`, advice: 'SSY has the highest govt-backed rate (~8.2%). EEE tax status. Min ₹250/year, max ₹1.5L. Account matures at girl\'s 21st birthday. Partial withdrawal (50%) allowed after 18 for higher education.' };
    }
    case 'scss': {
      return { severity: 'info', emoji: 'fa-landmark', title: 'Senior Citizen Savings', message: `Quarterly interest payout: ${mainStr}.`, advice: 'SCSS offers regular income at ~8.2%. Max investment ₹30L (₹15L extended). Interest is taxable but qualifies for 80TTB deduction up to ₹50K for seniors.' };
    }
    case 'nsc': {
      return { severity: 'info', emoji: 'fa-file-certificate', title: 'NSC Returns', message: `Maturity value: ${mainStr}.`, advice: 'NSC interest is reinvested and qualifies for 80C deduction. 5-year lock-in. Current rate ~7.7%. Good for conservative investors wanting tax savings.' };
    }
    case 'rd': {
      return { severity: 'info', emoji: 'fa-piggy-bank', title: 'Recurring Deposit', message: `RD maturity: ${mainStr}.`, advice: 'RDs are great for building savings discipline. Interest is fully taxable. TDS applies if interest exceeds ₹40K/year (₹50K for seniors). Compare with SIP for better long-term returns.' };
    }
    case 'epf': {
      return { severity: 'success', emoji: 'fa-shield-halved', title: 'Retirement Savings', message: `EPF corpus: ${mainStr}.`, advice: 'EPF enjoys EEE tax status. Don\'t withdraw on job change — transfer via EPFO portal. VPF (Voluntary PF) is a smart way to increase tax-free retirement savings at the same rate.' };
    }
    case 'stepupsip': {
      return { severity: 'success', emoji: 'fa-chart-line', title: 'Step-Up SIP Power', message: `Corpus with annual increases: ${mainStr}.`, advice: 'A 10% annual step-up in SIP can nearly double your corpus vs flat SIP over 20 years. Even a 5% step-up makes a huge difference. Align increases with your salary hikes.' };
    }
    case 'lumpsum': {
      return { severity: 'info', emoji: 'fa-sack-dollar', title: 'Lump Sum Growth', message: `Investment will grow to ${mainStr}.`, advice: 'Lump sum investing beats SIP when markets are low. For large amounts, consider Systematic Transfer Plan (STP) — park in liquid fund, transfer monthly to equity to average out risk.' };
    }

    // ── Finance — Loans & Debt ──────────────────────
    case 'carloan':
    case 'homeloan': {
      return { severity: 'info', emoji: 'fa-car', title: 'Loan Payment', message: `Your monthly payment: ${mainStr}.`, advice: 'The 20/4/10 rule for car loans: 20% down payment, 4-year max tenure, total vehicle expenses under 10% of income. For home loans, EMI should be under 40% of income.' };
    }
    case 'prepayment': {
      return { severity: 'success', emoji: 'fa-hand-holding-dollar', title: 'Prepayment Savings', message: `You can save ${mainStr} in interest.`, advice: 'Even small prepayments have big impact early in the loan tenure (when interest component is highest). Choose "reduce tenure" over "reduce EMI" to save maximum interest.' };
    }
    case 'debtavalanche': {
      return { severity: 'info', emoji: 'fa-ranking-star', title: 'Debt Freedom Plan', message: `Debt-free timeline: ${mainStr}.`, advice: 'Avalanche method (highest interest first) saves the most money. Snowball method (smallest balance first) gives psychological wins. Pick what keeps you motivated.' };
    }
    case 'loaneligibility': {
      return { severity: 'info', emoji: 'fa-check-circle', title: 'Loan Eligibility', message: `Maximum eligible loan: ${mainStr}.`, advice: 'This is the maximum — don\'t borrow the max! Keep EMI under 35% of income. Factor in existing EMIs, credit card bills, and maintain a credit score above 750.' };
    }
    case 'loancompare': {
      return { severity: 'info', emoji: 'fa-scale-balanced', title: 'Loan Comparison', message: mainStr, advice: 'Don\'t just compare interest rates — check processing fees, prepayment charges, and foreclosure terms. A 0.5% lower rate on a 20-year loan saves lakhs.' };
    }

    // ── Finance — Investment & Planning ─────────────
    case 'fire': {
      return { severity: 'info', emoji: 'fa-fire', title: 'FIRE Target', message: `Financial independence corpus: ${mainStr}.`, advice: 'The 4% rule: withdraw 4% of corpus annually in retirement. For India, use 3-3.5% due to higher inflation. Build 25-33× your annual expenses before retiring.' };
    }
    case 'retirementcorpus': {
      return { severity: 'info', emoji: 'fa-umbrella-beach', title: 'Retirement Planning', message: `Required corpus: ${mainStr}.`, advice: 'Account for medical inflation (~10-12% in India). Build a separate medical corpus. Consider annuity for guaranteed income and equity for inflation beating returns.' };
    }
    case 'savingsgoal': {
      return { severity: 'info', emoji: 'fa-bullseye', title: 'Goal Tracker', message: `Monthly savings needed: ${mainStr}.`, advice: 'Automate your savings — set up auto-debit on salary day. Pay yourself first before expenses. Track progress quarterly and adjust if needed.' };
    }
    case 'goalsip': {
      return { severity: 'info', emoji: 'fa-bullseye', title: 'Goal-Based SIP', message: `SIP amount for your goal: ${mainStr}.`, advice: 'Start immediately — even if the amount seems small. Missing 1 year of compounding at 12% return can cost you 15% of final corpus. Review and step-up annually.' };
    }
    case 'capitalgains': {
      return { severity: 'info', emoji: 'fa-landmark', title: 'Capital Gains Tax', message: mainStr, advice: 'Tax-loss harvesting: sell losing investments to offset gains. For equity LTCG, harvest ₹1.25L exemption annually. For property, consider Section 54 reinvestment to save tax.' };
    }
    case 'inflation': {
      return { severity: 'warning', emoji: 'fa-chart-line', title: 'Inflation Impact', message: `Future value: ${mainStr}.`, advice: 'India\'s average inflation is ~5-6%. Your investments must beat this! FDs at 6-7% barely keep pace. Equity (12% average) is the best inflation hedge over 5+ years.' };
    }
    case 'rentvsbuy': {
      return { severity: 'info', emoji: 'fa-house', title: 'Rent vs Buy Analysis', message: mainStr, advice: 'The price-to-rent ratio helps decide: if property costs >20× annual rent, renting is usually better financially. Factor in maintenance, property tax, and opportunity cost of down payment.' };
    }

    // ── Finance — Insurance ─────────────────────────
    case 'lifeinsurance': {
      return { severity: 'info', emoji: 'fa-umbrella', title: 'Insurance Need', message: `Recommended cover: ${mainStr}.`, advice: 'Rule of thumb: 10-15× annual income as pure term cover. Include outstanding loans + children\'s education + spouse\'s retirement. Buy term insurance, invest the rest.' };
    }
    case 'healthinsurance': {
      return { severity: 'info', emoji: 'fa-hospital', title: 'Health Cover', message: `Recommended health cover: ${mainStr}.`, advice: 'Individual cover > family floater for families with 2+ members. Get super top-up for cost-effective high coverage. Check co-pay, room rent limits, and sub-limits before buying.' };
    }

    // ── Health — Nutrition & Fitness ─────────────────
    case 'calories': {
      return { severity: 'info', emoji: 'fa-fire', title: 'Calorie Count', message: `Calories: ${mainStr}.`, advice: 'Track calories for 2 weeks to build awareness, then you won\'t need to track daily. Focus on whole foods — they are naturally more satiating per calorie than processed foods.' };
    }
    case 'idealweight': {
      return { severity: 'info', emoji: 'fa-weight-scale', title: 'Ideal Weight', message: `Your ideal weight range: ${mainStr}.`, advice: 'Ideal weight is a range, not a single number. Body composition (muscle vs fat) matters more than scale weight. Focus on strength, energy, and how you feel.' };
    }
    case 'pregnancy': {
      return { severity: 'info', emoji: 'fa-baby', title: 'Due Date Estimate', message: `Estimated due date: ${mainStr}.`, advice: 'Only 5% of babies are born on the due date. Normal range is ±2 weeks. First ultrasound (6-8 weeks) gives the most accurate dating. Start prenatal vitamins with folic acid early.' };
    }
    case 'ovulation': {
      return { severity: 'info', emoji: 'fa-calendar', title: 'Ovulation Window', message: `Fertile window calculated.`, advice: 'Peak fertility is 1-2 days before and on ovulation day. Sperm survives 3-5 days. For conception, consistent intimacy during the fertile window is key. Track with BBT and OPK for accuracy.' };
    }
    case 'vo2max': {
      const vo2 = parseFloat(mainStr);
      if (isNaN(vo2)) return null;
      if (vo2 >= 50) return { severity: 'success', emoji: 'fa-medal', title: 'Excellent Fitness', message: `VO2max of ${vo2} ml/kg/min is excellent.`, advice: 'You\'re in elite cardiovascular fitness. Maintain with varied training: Zone 2 base building + VO2max intervals (4×4 min at 90-95% max HR).' };
      if (vo2 >= 40) return { severity: 'info', emoji: 'fa-running', title: 'Good Fitness', message: `VO2max of ${vo2} ml/kg/min is above average.`, advice: 'Good base! Add 2 sessions/week of interval training to push higher. Each 1 ml/kg/min increase in VO2max reduces all-cause mortality risk by ~2.8%.' };
      if (vo2 >= 30) return { severity: 'warning', emoji: 'fa-chart-simple', title: 'Average Fitness', message: `VO2max of ${vo2} ml/kg/min is average.`, advice: 'Start with consistent Zone 2 training (brisk walk/easy jog where you can hold a conversation). Build to 150+ min/week before adding intensity.' };
      return { severity: 'danger', emoji: 'fa-heart', title: 'Below Average', message: `VO2max of ${vo2} ml/kg/min needs improvement.`, advice: 'Start slowly with 20-30 min daily walks. Gradually increase intensity. Low VO2max is a stronger predictor of mortality than smoking — every improvement counts.' };
    }
    case 'onerepmax': {
      return { severity: 'info', emoji: 'fa-dumbbell', title: 'Strength Estimate', message: `Estimated 1RM: ${mainStr}.`, advice: 'Use percentages for programming: 60-70% for endurance (12-15 reps), 70-85% for hypertrophy (6-12 reps), 85%+ for strength (1-5 reps). Never test true 1RM without a spotter.' };
    }
    case 'runningpace': {
      return { severity: 'info', emoji: 'fa-person-running', title: 'Pace Calculator', message: `Your running pace: ${mainStr}.`, advice: 'Easy runs should be conversational pace (~60-70% effort). Most people run too fast on easy days and too slow on hard days. 80/20 rule: 80% easy, 20% hard.' };
    }
    case 'intermittentfasting':
    case 'intermittentFasting': {
      return { severity: 'info', emoji: 'fa-clock', title: 'Fasting Schedule', message: `Your fasting window: ${mainStr}.`, advice: 'Start with 12:12, then progress to 16:8. Stay hydrated — water, black coffee, and green tea are allowed. Break fast with protein-rich foods, not carbs. Listen to your body.' };
    }
    case 'alcohol': {
      if (mainStr.includes('0.000')) return { severity: 'success', emoji: 'fa-check-circle', title: 'Sober', message: 'Your BAC is effectively zero.', advice: 'You are sober and safe to drive.' };
      return { severity: 'danger', emoji: 'fa-wine-glass', title: 'Alcohol in System', message: `Estimated BAC: ${mainStr}.`, advice: 'Legal limit in India is 0.03%. Do NOT drive. BAC eliminates at ~0.015%/hour — there is no way to speed this up. Coffee and cold showers do not help.' };
    }
    case 'sleepdebt': {
      return { severity: 'warning', emoji: 'fa-bed', title: 'Sleep Debt', message: `Accumulated sleep debt: ${mainStr}.`, advice: 'Chronic sleep debt increases cortisol, reduces testosterone, and impairs cognitive function. You can\'t "catch up" on weekends. Consistent 7-9 hours is the only fix.' };
    }
    case 'age': {
      return { severity: 'info', emoji: 'fa-cake-candles', title: 'Age Calculator', message: `Your exact age: ${mainStr}.`, advice: 'Your chronological age is just a number. Biological age (fitness, health markers) matters more. Regular exercise can make your biological age 10+ years younger.' };
    }

    case 'anemia': {
      if (mainStr.includes('Normal')) return { severity: 'success', emoji: 'fa-heart', title: 'Normal Hemoglobin', message: 'Your hemoglobin is within the healthy range.', advice: 'Maintain with iron-rich foods: spinach, lentils, red meat, and vitamin C to aid absorption.' };
      if (mainStr.includes('Mild')) return { severity: 'warning', emoji: 'fa-droplet', title: 'Mild Anemia', message: 'Your hemoglobin is slightly below normal.', advice: 'Increase iron-rich foods (spinach, liver, lentils). Pair with vitamin C. Avoid tea/coffee with meals as they block iron absorption.' };
      if (mainStr.includes('Moderate')) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Moderate Anemia', message: 'Your hemoglobin is significantly below normal.', advice: 'See a doctor. Iron supplements are likely needed. Get a complete blood count (CBC) and ferritin test.' };
      return { severity: 'danger', emoji: 'fa-circle-exclamation', title: 'Severe Anemia', message: 'Your hemoglobin is dangerously low.', advice: 'Seek urgent medical attention. Severe anemia can cause organ damage. Blood transfusion may be needed.' };
    }

    case 'lungcapacity': {
      return { severity: 'info', emoji: 'fa-lungs', title: 'Lung Function', message: `Predicted FVC: ${mainStr}.`, advice: 'A normal FEV1/FVC ratio is >70%. Values below may indicate COPD or asthma. Regular aerobic exercise, diaphragmatic breathing, and avoiding smoking improve lung capacity.' };
    }

    case 'vitamins': {
      if (mainStr.includes('Sufficient')) return { severity: 'success', emoji: 'fa-sun', title: 'Adequate Vitamin D', message: 'Your estimated vitamin D status is likely sufficient.', advice: 'Maintain with 15-20 min of midday sun exposure. Continue 1000 IU/day supplementation. Retest levels annually.' };
      if (mainStr.includes('Insufficient')) return { severity: 'warning', emoji: 'fa-cloud-sun', title: 'Insufficient Vitamin D', message: 'Your estimated vitamin D status is below optimal.', advice: 'Supplement with 2000 IU/day. Increase sun exposure. Eat fortified foods, fatty fish, and egg yolks. Get a 25(OH)D blood test.' };
      return { severity: 'danger', emoji: 'fa-triangle-exclamation', title: 'Vitamin D Deficient', message: 'You are likely vitamin D deficient.', advice: 'Take 4000 IU/day supplement. Deficiency causes bone loss, fatigue, and weakened immunity. Get a blood test and consult your doctor.' };
    }

    case 'ibw': {
      return { severity: 'info', emoji: 'fa-weight-scale', title: 'Ideal Body Weight', message: `Ideal weight: ${mainStr}.`, advice: 'Ideal weight formulas provide estimates — your body composition matters more. Focus on being within a healthy BMI range (18.5-24.9) and maintaining good muscle mass.' };
    }

    case 'bsa': {
      return { severity: 'info', emoji: 'fa-user', title: 'Body Surface Area', message: `Your BSA: ${mainStr}.`, advice: 'BSA is used clinically for drug dosing (chemotherapy, burn care), cardiac index calculations, and metabolic rate estimation. Normal adult BSA ranges from 1.6 to 2.0 m².' };
    }

    case 'smokingcost': {
      const cost = parseInt(mainStr.replace(/[₹,]/g, ''));
      if (isNaN(cost) || cost === 0) return { severity: 'info', emoji: 'fa-ban-smoking', title: 'Non-Smoker', message: 'Great! You don\'t have smoking costs.', advice: 'Stay smoke-free. Even second-hand smoke increases health risks.' };
      return { severity: 'danger', emoji: 'fa-smoking', title: 'Smoking Financial Impact', message: `Annual smoking cost: ${mainStr}.`, advice: 'After quitting: 20 min — BP normalizes, 1 year — heart disease risk halves, 5 years — stroke risk equals non-smoker, 10 years — lung cancer risk halves. The money saved could fund a retirement corpus.' };
    }

    case 'childheight': {
      return { severity: 'info', emoji: 'fa-child', title: 'Height Prediction', message: `Predicted adult height: ${mainStr}.`, advice: 'This mid-parental height method has ±8.5cm variance. Genetics accounts for ~80%, nutrition and sleep for ~20%. Ensure adequate protein, calcium, and 8-10 hours sleep during growth years.' };
    }

    case 'leanbodymass': {
      return { severity: 'info', emoji: 'fa-dumbbell', title: 'Lean Body Mass', message: `Your lean mass: ${mainStr}.`, advice: 'FFMI (Fat-Free Mass Index) above 25 is near the natural genetic limit. Focus on progressive overload, adequate protein (1.6-2.2g/kg), and sleep to maximize lean mass.' };
    }

    case 'caloriegoal': {
      if (mainStr.includes('kcal')) {
        const cals = parseInt(mainStr);
        if (!isNaN(cals) && cals < 1400) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Aggressive Target', message: `Daily target: ${mainStr} — this may be too aggressive.`, advice: 'Eating below 1500 kcal (men) or 1200 kcal (women) can slow metabolism and cause nutrient deficiencies. Consider extending your timeline for safer weight loss.' };
      }
      return { severity: 'info', emoji: 'fa-bullseye', title: 'Calorie Goal Set', message: `Your daily target: ${mainStr}.`, advice: 'Track for 2-3 weeks to build awareness. Weigh weekly at the same time. Adjust by 100-200 kcal if progress stalls after 2 weeks.' };
    }

    case 'electrolyte': {
      return { severity: 'info', emoji: 'fa-glass-water-droplet', title: 'Hydration Plan', message: `Recommended fluid intake: ${mainStr}.`, advice: 'Electrolytes are critical during exercise, hot weather, and illness. Signs of imbalance: muscle cramps, headache, fatigue. Add a pinch of salt and lemon to water during intense workouts.' };
    }

    case 'waistHeightRatio': {
      const ratio = parseFloat(mainStr);
      if (isNaN(ratio)) return null;
      if (ratio < 0.5) return { severity: 'success', emoji: 'fa-heart', title: 'Healthy Ratio', message: `WHtR of ${ratio.toFixed(3)} — excellent.`, advice: 'A waist-to-height ratio below 0.5 indicates low visceral fat risk. This is one of the best predictors of cardiovascular health.' };
      if (ratio < 0.58) return { severity: 'warning', emoji: 'fa-triangle-exclamation', title: 'Elevated Risk', message: `WHtR of ${ratio.toFixed(3)} — above the 0.5 threshold.`, advice: 'Focus on reducing visceral fat through aerobic exercise (walking 30 min/day), reducing refined carbs, and increasing fiber intake.' };
      return { severity: 'danger', emoji: 'fa-heartbeat', title: 'High Risk', message: `WHtR of ${ratio.toFixed(3)} — significantly elevated.`, advice: 'Your waist circumference significantly exceeds healthy limits. Consult a doctor for cardiovascular risk assessment. Prioritize waist reduction over scale weight.' };
    }

    case 'pregnancyweight': {
      if (mainStr.includes('kg')) {
        if (mainStr.includes('On track') || mainStr.includes('✓')) return { severity: 'success', emoji: 'fa-baby', title: 'On Track', message: `Weight gain is within recommended range.`, advice: 'Continue balanced nutrition. Focus on protein, folate, iron, and calcium. Aim for 300 extra kcal/day in 2nd trimester, 450 in 3rd.' };
      }
      return { severity: 'info', emoji: 'fa-baby', title: 'Pregnancy Weight', message: `Weight gained: ${mainStr}.`, advice: 'Weight gain varies by pre-pregnancy BMI. Underweight women need more gain (12.5-18 kg), overweight women less (7-11.5 kg). Consult your OB-GYN for personalized guidance.' };
    }

    case 'breastmilk': {
      return { severity: 'info', emoji: 'fa-baby', title: 'Feeding Guide', message: `Daily intake needed: ${mainStr}.`, advice: 'Feed on demand — hunger cues include lip smacking, rooting, and hand-to-mouth. Adequate wet diapers (6+/day) indicate sufficient intake. Breast milk composition adapts to baby\'s needs.' };
    }

    case 'stepcounter': {
      const steps = Number(values.steps) || 0;
      if (steps >= 10000) return { severity: 'success', emoji: 'fa-person-walking', title: '10K Goal Reached!', message: `You've hit ${steps.toLocaleString()} steps!`, advice: 'Excellent! 10,000 steps burns ~300-400 kcal. For additional benefits, try incorporating brisk walking intervals (3 min fast, 2 min normal).' };
      if (steps >= 7000) return { severity: 'info', emoji: 'fa-shoe-prints', title: 'Good Activity', message: `${steps.toLocaleString()} steps — solid effort.`, advice: 'You\'re above the minimum recommended 7,000 steps. Each additional 1,000 steps/day reduces mortality risk by ~15% (up to 10K).' };
      if (steps >= 4000) return { severity: 'warning', emoji: 'fa-shoe-prints', title: 'Below Target', message: `${steps.toLocaleString()} steps — room for improvement.`, advice: 'Try adding a 15-min walk after each meal. Take stairs, park farther away, and walk during phone calls. Small changes add up.' };
      return { severity: 'danger', emoji: 'fa-chair', title: 'Sedentary Alert', message: `Only ${steps.toLocaleString()} steps — significantly below target.`, advice: 'Prolonged sitting increases health risks regardless of exercise. Set hourly reminders to stand and walk. Start with 5,000 steps and increase by 500/week.' };
    }

    case 'menstrualcycle': {
      return { severity: 'info', emoji: 'fa-calendar-days', title: 'Cycle Tracker', message: `Next period: ${mainStr}.`, advice: 'Track your cycle for 3+ months for accuracy. Irregular cycles (outside 21-35 days) may indicate hormonal imbalance — consult a gynecologist. PMS symptoms typically start 7-10 days before period.' };
    }

    case 'bacdetailed': {
      const bac = parseFloat(mainStr);
      if (isNaN(bac)) return null;
      if (bac < 0.02) return { severity: 'success', emoji: 'fa-check-circle', title: 'Sober', message: 'Your BAC is effectively zero.', advice: 'You are sober and safe to drive.' };
      if (bac < 0.03) return { severity: 'warning', emoji: 'fa-wine-glass', title: 'Near Legal Limit (India)', message: `BAC: ${mainStr} — approaching India's legal limit of 0.03%.`, advice: 'Wait before driving. India has one of the strictest drink-drive limits globally (0.03%). BAC drops at ~0.015%/hour — no way to speed this up.' };
      if (bac < 0.08) return { severity: 'danger', emoji: 'fa-car', title: 'Over Legal Limit', message: `BAC: ${mainStr} — over India's legal limit.`, advice: 'DO NOT DRIVE. You are legally intoxicated in India. Use a cab or designated driver. Impairment affects reaction time and judgment even below 0.08%.' };
      return { severity: 'danger', emoji: 'fa-circle-exclamation', title: 'Severely Impaired', message: `BAC: ${mainStr} — significant impairment.`, advice: 'DO NOT DRIVE under any circumstances. At this BAC level, motor skills, vision, and judgment are severely compromised. If you feel unwell, seek medical help.' };
    }


    case 'percentage': {
      return { severity: 'info', emoji: 'fa-percent', title: 'Percentage Result', message: `Result: ${mainStr}`, advice: 'Quick mental math: 10% = move decimal left. 5% = half of 10%. 15% = 10% + 5%. 20% = 10% × 2. Works for tips, discounts, and taxes.' };
    }
    case 'quadratic': {
      if (mainStr.includes('i') || mainStr.includes('complex')) return { severity: 'warning', emoji: 'fa-calculator', title: 'Complex Roots', message: 'The equation has complex (imaginary) roots.', advice: 'Complex roots mean the parabola doesn\'t cross the x-axis. In real-world problems, this often means no physical solution exists for the given constraints.' };
      return { severity: 'success', emoji: 'fa-calculator', title: 'Real Roots Found', message: `Solutions: ${mainStr}`, advice: 'Real roots represent where the parabola crosses the x-axis. Two distinct roots = crosses twice, one root = touches once (vertex on x-axis).' };
    }
    case 'cgpa': {
      const cgpa = parseFloat(mainStr);
      if (isNaN(cgpa)) return null;
      if (cgpa >= 9) return { severity: 'success', emoji: 'fa-star', title: 'Outstanding!', message: `CGPA ${cgpa} — top percentile.`, advice: 'Excellent academic standing. Focus on building practical skills, internships, and projects alongside academics for career success.' };
      if (cgpa >= 7.5) return { severity: 'info', emoji: 'fa-graduation-cap', title: 'Good Standing', message: `CGPA ${cgpa} — good academic performance.`, advice: 'Solid performance. Identify 1-2 weak subjects and improve them. Most companies have a 7.0+ CGPA cutoff — you\'re above it.' };
      if (cgpa >= 6) return { severity: 'warning', emoji: 'fa-book', title: 'Average', message: `CGPA ${cgpa} — needs improvement.`, advice: 'Focus on core subjects, attend all classes, and form study groups. Many companies have a 6.0 cutoff — focus on practical skills and projects to compensate.' };
      return { severity: 'danger', emoji: 'fa-triangle-exclamation', title: 'Below Average', message: `CGPA ${cgpa} — improvement needed.`, advice: 'Meet your academic advisor. Identify root causes (foundations, study habits, or personal issues). Improvement is absolutely possible with the right strategy.' };
    }
    case 'examneeded': {
      return { severity: 'info', emoji: 'fa-chart-bar', title: 'Target Score', message: `Score needed: ${mainStr}.`, advice: 'Break the target into daily study hours. Use active recall and spaced repetition for maximum retention. Past papers are the best predictor of exam patterns.' };
    }
    case 'statistics': {
      return { severity: 'info', emoji: 'fa-chart-bar', title: 'Statistical Summary', message: `Results: ${mainStr}`, advice: 'Mean is sensitive to outliers — median is more robust for skewed data. Standard deviation tells you spread — 68% of data falls within 1 SD of the mean (for normal distributions).' };
    }

    // ── Engineering ─────────────────────────────────
    case 'ohmslaw': {
      return { severity: 'info', emoji: 'fa-bolt', title: 'Ohm\'s Law Result', message: `Result: ${mainStr}`, advice: 'V = I × R. Remember: voltage is the push, current is the flow, resistance is the opposition. Always check wire gauge ratings to prevent overheating.' };
    }
    case 'power': {
      return { severity: 'info', emoji: 'fa-plug', title: 'Power Calculation', message: `Power: ${mainStr}`, advice: 'P = V × I. For AC circuits, multiply by power factor (typically 0.8-0.95). Always use proper fuse ratings — never exceed the circuit breaker capacity.' };
    }

    // ── Everyday Calculators ────────────────────────
    case 'fuel':
    case 'mileage': {
      return { severity: 'info', emoji: 'fa-gas-pump', title: 'Fuel Efficiency', message: `Result: ${mainStr}`, advice: 'Tips for better mileage: maintain tire pressure, remove excess weight, avoid aggressive acceleration, use cruise control on highways, and keep RPM under 2500.' };
    }
    case 'electricbill': {
      return { severity: 'info', emoji: 'fa-lightbulb', title: 'Electricity Cost', message: `Monthly bill estimate: ${mainStr}`, advice: 'Top energy savers: LED bulbs (80% less than incandescent), 5-star AC (30% less than 3-star), inverter appliances. Set AC to 24°C — each degree lower increases bill by 6%.' };
    }
    case 'tip': {
      return { severity: 'info', emoji: 'fa-hand-holding-heart', title: 'Tip Calculator', message: `Tip amount: ${mainStr}`, advice: 'India: 10-15% is standard at restaurants. USA: 15-20% is expected. Check if service charge is already included on the bill — don\'t double tip.' };
    }
    case 'carbonfootprint': {
      return { severity: 'warning', emoji: 'fa-leaf', title: 'Carbon Footprint', message: `Your footprint: ${mainStr}`, advice: 'India average: 1.9 tonnes CO2/year per person. Global average: 4.7 tonnes. Easy wins: reduce air travel (1 flight = ~1 tonne), eat less red meat, switch to renewable energy.' };
    }
    case 'discount': {
      return { severity: 'info', emoji: 'fa-tags', title: 'Discount Savings', message: `You save: ${mainStr}`, advice: 'Don\'t buy something just because it\'s on sale — calculate cost-per-use. A ₹5000 item used 100 times (₹50/use) is better value than ₹2000 item used 5 times (₹400/use).' };
    }
    case 'hra': {
      return { severity: 'info', emoji: 'fa-house', title: 'HRA Exemption', message: `Tax-exempt HRA: ${mainStr}`, advice: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 50%/40% of basic for metro/non-metro, (3) Rent paid - 10% of basic. Keep rent receipts and landlord PAN if rent > ₹1L/year.' };
    }
    case 'pregst': {
      return { severity: 'info', emoji: 'fa-receipt', title: 'Pre-GST Price', message: `Original price: ${mainStr}`, advice: 'Use this to verify if a seller is overcharging. The MRP on products already includes GST — you should never pay GST over and above MRP.' };
    }
    case 'swp': {
      return { severity: 'info', emoji: 'fa-money-bill-transfer', title: 'SWP Plan', message: `Monthly withdrawal: ${mainStr}`, advice: 'SWP is tax-efficient for regular income — only the gain component is taxed, not the full withdrawal. Keep withdrawal rate under 4-6% annually to avoid depleting the corpus.' };
    }

    case 'simpleinterest': {
      return { severity: 'info', emoji: 'fa-calculator', title: 'Simple Interest', message: `Interest earned: ${mainStr}`, advice: 'Simple interest is linear — same amount each year. Compound interest grows exponentially. Over 10+ years, compound interest earns 50-100% more than simple interest at the same rate.' };
    }

    // ── Default: No specific interpretation ─────────
    default:
      return null;
  }
}

