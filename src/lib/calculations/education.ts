/* ═══════════════════════════════════════════════════
   Calc Labz — Education Calculation Functions
   Ported from calculators-education.js
   Pure functions — no DOM dependencies
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcCgpa: CalcFunction = (v) => {
  const cgpa = Number(v.cgpa) || 0;
  const maxCgpa = Number(v.maxCgpa) || 10;
  const scale = String(v.scale || "CBSE (×9.5)");
  let pct = 0;
  if (scale.includes("×9.5")) pct = cgpa * 9.5;
  else if (scale.includes("×10")) pct = cgpa * 10;
  else if (scale.includes("×9.25")) pct = cgpa * 9.25;
  else pct = (cgpa / 4) * 100; // US scale approx

  const grade = pct >= 90 ? "O (Outstanding)" : pct >= 75 ? "A+ (Excellent)" : pct >= 60 ? "A (Good)" : pct >= 50 ? "B (Average)" : pct >= 40 ? "C (Pass)" : "F (Fail)";
  const relative = (cgpa / (maxCgpa || 1) * 100).toFixed(1);
  return {
    main: { label: "Percentage", value: pct.toFixed(2) + "%" },
    secondary: [
      { label: "Grade", value: grade },
      { label: "Percentile (relative to topper)", value: relative + "%" },
      { label: "Division", value: pct >= 60 ? "First Division" : pct >= 50 ? "Second Division" : "Third Division" },
      { label: "Your CGPA", value: cgpa + "/10" },
      { label: "Scale Used", value: scale.split(" ")[0] }
    ]
  };
};

export const calcExamNeeded: CalcFunction = (v) => {
  const totalSoFar = Number(v.totalSoFar) || 0;
  const finalMax = Number(v.finalMax) || 100;
  const currentMarks = Number(v.currentMarks) || 0;
  const targetPct = Number(v.targetPct) || 0;

  const totalMax = totalSoFar + finalMax;
  const neededTotal = totalMax * targetPct / 100;
  const neededFinal = neededTotal - currentMarks;
  const currentPct = (currentMarks / (totalSoFar || 1) * 100);
  const feasible = neededFinal <= finalMax;
  return {
    main: { label: "Score Needed in Finals", value: feasible ? Math.ceil(neededFinal) + "/" + finalMax : "Not Feasible [X]" },
    secondary: [
      { label: "Current Percentage", value: currentPct.toFixed(2) + "%" },
      { label: "Marks Needed", value: Math.ceil(neededFinal) + " out of " + finalMax },
      { label: "Min % in Finals", value: ((neededFinal / finalMax) * 100).toFixed(1) + "%" },
      { label: "Target Overall", value: targetPct + "%" },
      { label: "Status", value: feasible ? "[OK] Achievable" : "[X] Impossible — lower your target" }
    ]
  };
};

export const calcEduLoan: CalcFunction = (v) => {
  const loanAmt = Number(v.loanAmt) || 0;
  const eduRate = Number(v.eduRate) || 8.5;
  const moratorium = Number(v.moratorium) || 12;
  const repayTenure = Number(v.repayTenure) || 60;

  const r = eduRate / 12 / 100;
  // Interest accrues during moratorium (simple interest)
  const accruedInterest = loanAmt * r * moratorium;
  const principalAtRepay = loanAmt + accruedInterest;
  const emi = principalAtRepay * r * Math.pow(1 + r, repayTenure) / (Math.pow(1 + r, repayTenure) - 1);
  const totalPaid = emi * repayTenure;
  const totalInterest = totalPaid - loanAmt;
  return {
    main: { label: "Monthly EMI After Course", value: "₹" + Math.round(emi).toLocaleString() },
    secondary: [
      { label: "Interest During Moratorium", value: "₹" + Math.round(accruedInterest).toLocaleString() },
      { label: "Principal at Repayment Start", value: "₹" + Math.round(principalAtRepay).toLocaleString() },
      { label: "Total Interest Paid", value: "₹" + Math.round(totalInterest).toLocaleString() },
      { label: "Total Amount Paid", value: "₹" + Math.round(totalPaid).toLocaleString() },
      { label: "Total Duration", value: (moratorium + repayTenure) + " months" }
    ]
  };
};

export const calcStudyHours: CalcFunction = (v) => {
  const daysLeft = Number(v.daysLeft) || 30;
  const hoursPerDay = Number(v.hoursPerDay) || 4;
  const revisions = Number(v.revisions) || 1;
  const subjects = Number(v.subjects) || 5;

  const totalHours = daysLeft * hoursPerDay;
  const effectiveHours = totalHours / (1 + revisions * 0.3);
  const perSubject = effectiveHours / (subjects || 1);
  const revisionHours = totalHours - effectiveHours;
  return {
    main: { label: "Hours per Subject", value: perSubject.toFixed(1) + " hrs" },
    secondary: [
      { label: "Total Study Hours", value: totalHours.toFixed(0) + " hrs" },
      { label: "Study Hours (new content)", value: effectiveHours.toFixed(0) + " hrs" },
      { label: "Revision Hours", value: revisionHours.toFixed(0) + " hrs" },
      { label: "Hours per Day", value: hoursPerDay + " hrs" },
      { label: "Days Remaining", value: daysLeft + " days" },
      { label: "Tip", value: hoursPerDay > 8 ? "[!] Consider reducing to avoid burnout" : "[OK] Manageable schedule" }
    ]
  };
};

export const calcScholarship: CalcFunction = (v) => {
  const totalFee = Number(v.totalFee) || 0;
  const scholarAmt = Number(v.scholarAmt) || 0;
  const loanRate = Number(v.loanRate_s) || 8.5;
  const tenure = Number(v.tenure_s) || 60;

  const r = loanRate / 12 / 100;
  const n = tenure;
  const emiCalc = (P: number) => P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const loanWithout = totalFee;
  const loanWith = Math.max(0, totalFee - scholarAmt);
  const emiWithout = emiCalc(loanWithout), emiWith = emiCalc(loanWith);
  const totalWithout = emiWithout * n, totalWith = emiWith * n;
  return {
    main: { label: "Monthly EMI Saved", value: "₹" + Math.round(emiWithout - emiWith).toLocaleString() },
    secondary: [
      { label: "EMI Without Scholarship", value: "₹" + Math.round(emiWithout).toLocaleString() },
      { label: "EMI With Scholarship", value: "₹" + Math.round(emiWith).toLocaleString() },
      { label: "Total Interest Saved", value: "₹" + Math.round(totalWithout - totalWith).toLocaleString() },
      { label: "Scholarship Value (face)", value: "₹" + scholarAmt.toLocaleString() },
      { label: "True Scholarship Value", value: "₹" + Math.round(totalWithout - totalWith).toLocaleString() + " (incl. interest)" }
    ]
  };
};

export const calcPomodoro: CalcFunction = (v) => {
  const studyHours = Number(v.studyHours) || 4;
  const focusLen = Number(v.focusLen) || 25;
  const shortBreak = Number(v.shortBreak) || 5;
  const longBreak = Number(v.longBreak) || 15;

  const totalMins = studyHours * 60;
  const cycleLen = focusLen + shortBreak;
  const longCycleLen = focusLen * 4 + shortBreak * 3 + longBreak;
  const longCycles = Math.floor(totalMins / longCycleLen);
  const remainMins = totalMins % longCycleLen;
  const extraPomos = Math.floor(remainMins / cycleLen);
  const totalPomodoros = longCycles * 4 + extraPomos;
  const totalFocus = totalPomodoros * focusLen;
  const totalBreak = totalMins - totalFocus;
  return {
    main: { label: "Total Pomodoros", value: totalPomodoros + " sessions" },
    secondary: [
      { label: "Focused Study Time", value: totalFocus + " min (" + Math.round(totalFocus / 60 * 10) / 10 + " hrs)" },
      { label: "Total Break Time", value: totalBreak + " min" },
      { label: "Focus Ratio", value: Math.round(totalFocus / (totalMins || 1) * 100) + "%" },
      { label: "Long Breaks", value: longCycles },
      { label: "Optimal Schedule", value: focusLen + "m focus / " + shortBreak + "m break × 4, then " + longBreak + "m long break" },
      { label: "Tip", value: totalPomodoros > 12 ? "[>] Break into 2 sessions for best focus" : "[OK] Manageable in one session" }
    ]
  };
};

export const calcGpaConverter: CalcFunction = (v) => {
  const fromScale = String(v.fromScale_gpa || "US 4.0");
  const val = Number(v.gpaValue) || 0;
  let usgpa = 0, pct = 0, ind = 0;
  if (fromScale === "US 4.0") { usgpa = val; pct = val * 25; ind = val * 2.5; }
  else if (fromScale === "India 10.0") { usgpa = val * 0.4; pct = val * 9.5; ind = val; }
  else if (fromScale === "UK %") { usgpa = val > 70 ? 4.0 : val > 60 ? 3.5 : val > 50 ? 3.0 : val > 40 ? 2.5 : 2.0; pct = val; ind = val / 9.5; }
  else if (fromScale === "Germany 1-5") { usgpa = (5 - val); pct = (5 - val) * 25; ind = (5 - val) * 2.5; }
  else { usgpa = val / 25; pct = val; ind = val / 9.5; }
  return {
    main: { label: "US GPA (4.0 scale)", value: Math.min(4, usgpa).toFixed(2) },
    secondary: [
      { label: "India CGPA (10.0)", value: Math.min(10, ind).toFixed(2) },
      { label: "Percentage (approx.)", value: Math.min(100, pct).toFixed(1) + "%" },
      { label: "UK Class", value: pct >= 70 ? "First" : pct >= 60 ? "Upper Second (2:1)" : pct >= 50 ? "Lower Second (2:2)" : pct >= 40 ? "Third" : "Fail" },
      { label: "Germany Grade", value: (5 - usgpa).toFixed(1) + " (1 = best)" },
      { label: "Source Scale", value: fromScale }
    ]
  };
};

export const calcReadingTime: CalcFunction = (v) => {
  const readingSpeed = String(v.readingSpeed || "Average (200 wpm)");
  const totalPages = Number(v.totalPages) || 100;
  const pagesRead = Number(v.pagesRead) || 0;
  const wordsPerPage = Number(v.wordsPerPage) || 250;
  const pagesPerDay = Number(v.pagesPerDay) || 20;

  const wpm: Record<string, number> = { "Slow Reader (150 wpm)": 150, "Average (200 wpm)": 200, "Fast Reader (300 wpm)": 300, "Speed Reader (450 wpm)": 450 };
  const speed = wpm[readingSpeed] || 200;
  const pages = totalPages - pagesRead;
  const wordsLeft = pages * wordsPerPage;
  const totalMin = wordsLeft / speed;
  const hrs = Math.floor(totalMin / 60);
  const mins = Math.round(totalMin % 60);
  const dailyPages = pagesPerDay > 0 ? pagesPerDay : 20;
  const daysToFinish = Math.ceil(pages / dailyPages);
  const finishDate = new Date(Date.now() + daysToFinish * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return {
    main: { label: "Reading Time Left", value: (hrs > 0 ? hrs + "h " : "") + mins + " min" },
    secondary: [
      { label: "Pages Remaining", value: pages + " pages" },
      { label: "Words Remaining", value: wordsLeft.toLocaleString() + " words" },
      { label: "At " + dailyPages + " pages/day", value: daysToFinish + " days to finish" },
      { label: "Finish Date", value: finishDate },
      { label: "Reading Speed", value: speed + " wpm" },
      { label: "Progress", value: Math.round(pagesRead / (totalPages || 1) * 100) + "%" }
    ]
  };
};

export const calcTypingTest: CalcFunction = (v) => {
  const grossWPM = Number(v.grossWPM) || 40;
  const errors = Number(v.errors) || 0;
  const testDuration = Number(v.testDuration) || 1;

  const netWPM = Math.max(0, (grossWPM - (errors / testDuration)));
  let accuracy = grossWPM > 0 ? (1 - errors / (grossWPM * testDuration)) * 100 : 0;
  accuracy = Math.max(0, Math.min(100, accuracy));
  const level = netWPM < 30 ? "Beginner" : netWPM < 50 ? "Intermediate" : netWPM < 70 ? "Proficient" : netWPM < 100 ? "Advanced" : "Expert";
  const jobReady = netWPM >= 40 && accuracy >= 95;
  return {
    main: { label: "Net WPM", value: Math.round(netWPM) + " WPM" },
    secondary: [
      { label: "Gross WPM", value: grossWPM + " WPM" },
      { label: "Accuracy", value: accuracy.toFixed(1) + "%" },
      { label: "Skill Level", value: level },
      { label: "Errors", value: errors + " in " + testDuration + " min" },
      { label: "Job Ready (40 WPM, 95%)?", value: jobReady ? "[OK] Yes" : "[X] Keep practicing" },
      { label: "Keystrokes per Min (est.)", value: Math.round(netWPM * 5) + " KPM" }
    ]
  };
};

export const calcSpellingBee: CalcFunction = (v) => {
  const correct = Number(v.correct_sb) || 0;
  const total = Number(v.totalWords_sb) || 0;
  const totalTime = Number(v.totalTime_sb) || 0;

  const accuracy = total > 0 ? (correct / total * 100) : 0;
  const timePerWord = total > 0 ? totalTime / total : 0;
  const grade = accuracy >= 95 ? "A+" : accuracy >= 85 ? "A" : accuracy >= 75 ? "B" : accuracy >= 60 ? "C" : "D";
  const level = accuracy >= 95 ? "Expert" : accuracy >= 85 ? "Advanced" : accuracy >= 70 ? "Intermediate" : "Beginner";
  return {
    main: { label: "Spelling Score", value: correct + "/" + total + " (" + accuracy.toFixed(0) + "%)" },
    secondary: [
      { label: "Grade", value: grade },
      { label: "Level", value: level },
      { label: "Avg Time per Word", value: timePerWord.toFixed(1) + " seconds" },
      { label: "Words Incorrect", value: String(total - correct) },
      { label: "Speed Rating", value: timePerWord < 3 ? "[>] Fast" : timePerWord < 6 ? "[>] Normal" : "[>] Take your time" },
      { label: "Tip", value: accuracy < 80 ? "Focus on commonly misspelled words" : "Great accuracy! Try harder words" }
    ]
  };
};

export const calcAttendance: CalcFunction = (v) => {
  const attended = Number(v.attended) || 0;
  const totalClasses = Number(v.totalClasses) || 1;
  const remainingClasses = Number(v.remainingClasses) || 0;
  const targetPct = Number(v.targetPct_att) || 75;

  const currentPct = (attended / totalClasses) * 100;
  const totalFuture = totalClasses + remainingClasses;
  const neededForTarget = Math.ceil(totalFuture * targetPct / 100) - attended;
  const canSkip = remainingClasses - Math.max(0, neededForTarget);
  const ifAttendAll = ((attended + remainingClasses) / totalFuture) * 100;
  const ifSkipAll = (attended / totalFuture) * 100;
  return {
    main: { label: "Current Attendance", value: currentPct.toFixed(1) + "%" },
    secondary: [
      { label: "Classes Attended", value: attended + " / " + totalClasses },
      { label: "Must Attend (for " + targetPct + "%)", value: Math.max(0, neededForTarget) + " of remaining " + remainingClasses },
      { label: "Can Skip", value: canSkip > 0 ? canSkip + " classes" : "[X] Cannot skip any!" },
      { label: "If You Attend All", value: ifAttendAll.toFixed(1) + "%" },
      { label: "If You Skip All", value: ifSkipAll.toFixed(1) + "%" },
      { label: "Status", value: currentPct >= targetPct ? "[OK] On track" : "[!] Below target" }
    ]
  };
};

export const calcGpaPlanner: CalcFunction = (v) => {
  const completedCredits = Number(v.completedCredits) || 0;
  const semCredits = Number(v.semCredits) || 1;
  const targetCGPA = Number(v.targetCGPA) || 8;
  const currentCGPA = Number(v.currentCGPA) || 8;
  const scale = String(v.scale_gpa || "10.0 scale");

  const totalCredits = completedCredits + semCredits;
  const neededSGPA = (targetCGPA * totalCredits - currentCGPA * completedCredits) / semCredits;
  const is10 = scale.includes("10");
  const maxGPA = is10 ? 10 : 4;
  const feasible = neededSGPA <= maxGPA;
  const bestCase = ((currentCGPA * completedCredits + maxGPA * semCredits) / totalCredits);
  const worstCase = ((currentCGPA * completedCredits + 0) / totalCredits);
  return {
    main: { label: "Required SGPA This Semester", value: feasible ? neededSGPA.toFixed(2) : "[X] Not achievable" },
    secondary: [
      { label: "Current CGPA", value: currentCGPA + " / " + maxGPA },
      { label: "Target CGPA", value: targetCGPA + " / " + maxGPA },
      { label: "Credits: Completed", value: completedCredits },
      { label: "Credits: This Semester", value: semCredits },
      { label: "Best Possible CGPA", value: bestCase.toFixed(2) },
      { label: "Worst Case (all fail)", value: worstCase.toFixed(2) },
      { label: "Status", value: feasible ? "[OK] Achievable — aim for " + neededSGPA.toFixed(2) : "[X] Lower your target" }
    ]
  };
};

export const calcPercentile: CalcFunction = (v) => {
  const yourRank = Number(v.yourRank) || 0;
  const totalCandidates = Number(v.totalCandidates) || 100;
  const yourScore = Number(v.yourScore) || 0;
  const maxScore = Number(v.maxScore_pctl) || 100;

  const rank = yourRank > 0 ? yourRank : Math.round(totalCandidates * (1 - yourScore / (maxScore || 1)));
  const percentile = ((totalCandidates - rank) / (totalCandidates || 1)) * 100;
  const topPct = (rank / (totalCandidates || 1)) * 100;
  const scorePct = (yourScore / (maxScore || 1)) * 100;
  return {
    main: { label: "Percentile", value: percentile.toFixed(2) },
    secondary: [
      { label: "Your Rank (est.)", value: rank.toLocaleString() + " / " + totalCandidates.toLocaleString() },
      { label: "Top %", value: topPct.toFixed(2) + "%" },
      { label: "Score %", value: scorePct.toFixed(1) + "%" },
      { label: "Candidates Below You", value: (totalCandidates - rank).toLocaleString() },
      { label: "Better Than", value: percentile.toFixed(1) + "% of candidates" },
      { label: "Note", value: "Percentile ≠ Percentage. 99 percentile = top 1%." }
    ]
  };
};

export const calcCutoffPredictor: CalcFunction = (v) => {
  const difficulty = String(v.difficulty || "Same Level");
  const totalSeats = Number(v.totalSeats) || 100;
  const totalApplicants = Number(v.totalApplicants) || 1000;
  const lastYearCutoff = Number(v.lastYearCutoff) || 50;
  const yourScore = Number(v.yourScore_cp) || 0;
  const maxScore = Number(v.maxScore_cp) || 100;

  const diffAdj: Record<string, number> = { "Easier": 1.10, "Same Level": 1.0, "Harder": 0.90, "Much Harder": 0.80 };
  const adj = diffAdj[difficulty] || 1.0;
  const seatRatio = totalSeats / (totalApplicants || 1);
  const predictedCutoff = Math.round(lastYearCutoff * adj);
  const margin = yourScore - predictedCutoff;
  const pctAbove = (yourScore / (maxScore || 1)) * 100;
  const safetyMargin = Math.round(predictedCutoff * 1.05);
  return {
    main: { label: "Predicted Cutoff", value: predictedCutoff + " / " + maxScore },
    secondary: [
      { label: "Your Score", value: yourScore + " / " + maxScore + " (" + pctAbove.toFixed(1) + "%)" },
      { label: "Margin Over Cutoff", value: margin > 0 ? "+" + margin + " (Safe [OK])" : margin + " (At risk [!])" },
      { label: "Safe Score (5% margin)", value: String(safetyMargin) },
      { label: "Competition Ratio", value: "1 : " + Math.round(1 / (seatRatio || 1)) },
      { label: "Paper Difficulty", value: difficulty },
      { label: "Last Year Cutoff", value: String(lastYearCutoff) },
      { label: "Disclaimer", value: "This is an estimate based on trends" }
    ]
  };
};

export const calcRevisionPlanner: CalcFunction = (v) => {
  const daysAvailable = Number(v.daysAvailable) || 10;
  const hoursPerDay = Number(v.hoursPerDay_rp) || 4;
  const difficultyMix = String(v.difficultyMix || "All Normal");
  const subjects = Number(v.subjects_rp) || 5;
  const revisionRounds = Number(v.revisionRounds) || 2;

  const totalHours = daysAvailable * hoursPerDay;
  const hardSubjects = difficultyMix.includes("2 Hard") ? 2 : difficultyMix.includes("3 Hard") ? 3 : 0;
  const normalSubjects = subjects - hardSubjects;
  const hardWeight = 2, normalWeight = 1;
  const totalWeight = hardSubjects * hardWeight + normalSubjects * normalWeight;
  const hoursPerRound = totalHours / (revisionRounds || 1);
  const hrPerNormal = hoursPerRound * normalWeight / (totalWeight || 1);
  const hrPerHard = hoursPerRound * hardWeight / (totalWeight || 1);
  const daysPerSubject = daysAvailable / (subjects || 1) / (revisionRounds || 1);
  return {
    main: { label: "Hours per Subject per Round", value: Math.round(hrPerNormal) + " hrs (normal) / " + Math.round(hrPerHard) + " hrs (hard)" },
    secondary: [
      { label: "Total Study Hours", value: totalHours + " hours" },
      { label: "Revision Rounds", value: String(revisionRounds) },
      { label: "Days per Subject per Round", value: daysPerSubject.toFixed(1) + " days" },
      { label: "Hours per Round", value: Math.round(hoursPerRound) + " hrs" },
      { label: "Hard Subjects (2× time)", value: String(hardSubjects) },
      { label: "Normal Subjects", value: String(normalSubjects) },
      { label: "Schedule", value: daysPerSubject >= 1.5 ? "[OK] Comfortable schedule" : "[!] Tight — reduce revision rounds or increase hours" }
    ]
  };
};

export const calcCgpaToPercentage: CalcFunction = (v) => {
  const cgpa = Number(v.ctp_cgpa) || 0;
  const scale = String(v.ctp_scale || "CBSE (×9.5)");
  let pct = 0, formula = "";
  if (scale.includes("CBSE")) { pct = cgpa * 9.5; formula = "CGPA × 9.5"; }
  else if (scale.includes("VTU")) { pct = cgpa * 10 - 7.5; formula = "CGPA × 10 − 7.5"; }
  else if (scale.includes("Mumbai")) { pct = (cgpa - 0.5) * 10; formula = "(CGPA − 0.5) × 10"; }
  else if (scale.includes("Anna")) { pct = (cgpa - 0.5) * 10; formula = "(CGPA − 0.5) × 10"; }
  else if (scale.includes("JNTU")) { pct = cgpa * 10; formula = "CGPA × 10"; }
  else if (scale.includes("Generic")) { pct = cgpa * 10; formula = "CGPA × 10"; }
  else if (scale.includes("US")) {
    pct = cgpa * 25; formula = "GPA × 25";
  }
  pct = Math.min(100, Math.max(0, pct));
  const grade = pct >= 90 ? "O (Outstanding)" : pct >= 80 ? "A+ (Excellent)" : pct >= 70 ? "A (Very Good)" : pct >= 60 ? "B+ (Good)" : pct >= 50 ? "B (Average)" : pct >= 40 ? "C (Below Average)" : "F (Fail)";
  const division = pct >= 60 ? "First Division" : pct >= 50 ? "Second Division" : pct >= 33 ? "Third Division" : "Fail";
  const usGpa = scale.includes("US") ? cgpa : Math.min(4.0, pct / 25);
  const letterGrade = usGpa >= 3.7 ? "A" : usGpa >= 3.3 ? "A-" : usGpa >= 3.0 ? "B+" : usGpa >= 2.7 ? "B" : usGpa >= 2.3 ? "B-" : usGpa >= 2.0 ? "C+" : usGpa >= 1.7 ? "C" : "Below C";
  return {
    main: { label: "Percentage", value: pct.toFixed(2) + "%" },
    secondary: [
      { label: "Grade", value: grade },
      { label: "Division", value: division },
      { label: "Formula Used", value: formula },
      { label: "US GPA Equivalent", value: usGpa.toFixed(2) + " / 4.0" },
      { label: "US Letter Grade", value: letterGrade },
      { label: "CGPA Entered", value: String(cgpa) },
      { label: "Scale", value: scale.split("(")[0].trim() },
      { label: "Note", value: "Verify with your university's official formula" }
    ]
  };
};
