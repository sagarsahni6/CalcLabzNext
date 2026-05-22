/* ═══════════════════════════════════════════════════
   Calc Labz — DateTime Calculations
   Ported from assets/js/calculators-datetime.js
   ═══════════════════════════════════════════════════ */

import { CalcFunction } from '@/types/calculator';

export const calcDateDiff: CalcFunction = (v) => {
  if (!v.d1 || !v.d2) return { main: { label: 'Error', value: 'Select both dates' } };
  const a = new Date(v.d1 as string), b = new Date(v.d2 as string);
  const diff = Math.abs(b.getTime() - a.getTime()), days = Math.floor(diff / 86400000);
  const lo = new Date(Math.min(a.getTime(), b.getTime())), hi = new Date(Math.max(a.getTime(), b.getTime()));
  let y = hi.getFullYear() - lo.getFullYear(), m = hi.getMonth() - lo.getMonth(), d = hi.getDate() - lo.getDate();
  if (d < 0) { m--; d += new Date(hi.getFullYear(), hi.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return {
    main: { label: 'Total Days', value: days.toLocaleString() },
    secondary: [
      { label: 'Weeks', value: Math.floor(days / 7) + ' weeks, ' + (days % 7) + ' days' },
      { label: 'Years/Months/Days', value: `${y}y ${m}m ${d}d` },
      { label: 'Business Days (approx)', value: Math.round(days * 5 / 7).toLocaleString() },
      { label: 'Hours', value: (days * 24).toLocaleString() },
    ],
  };
};

export const calcTimeConv: CalcFunction = (v) => {
  const toS: Record<string, number> = { Seconds: 1, Minutes: 60, Hours: 3600, Days: 86400, Weeks: 604800, Months: 2629800, Years: 31557600 };
  const s = (v.val as number) * (toS[v.from as string] || 1);
  return {
    main: { label: 'Seconds', value: s.toLocaleString() },
    secondary: Object.entries(toS).filter(([k]) => k !== v.from && k !== 'Seconds').map(([k, f]) => ({ label: k, value: (s / f).toFixed(4) })),
  };
};

export const calcCountdown: CalcFunction = (v) => {
  if (!v.event) return { main: { label: 'Error', value: 'Select event date' } };
  const ev = new Date(v.event as string), now = new Date();
  const diff = ev.getTime() - now.getTime();
  if (diff < 0) return { main: { label: 'Past Event', value: 'Event already occurred' } };
  const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
  return {
    main: { label: 'Days Remaining', value: d.toLocaleString() },
    secondary: [
      { label: 'Hours Remaining', value: (d * 24 + h).toLocaleString() },
      { label: 'Minutes Remaining', value: ((d * 24 + h) * 60 + m).toLocaleString() },
      { label: 'Exact', value: `${d}d ${h}h ${m}m ${s}s` },
    ],
  };
};

export const calcTimezone: CalcFunction = (v) => {
  const [h, m] = (v.time as string).split(':').map(Number);
  const localOff = -(new Date().getTimezoneOffset()) / 60;
  const diff = (v.offset as number) - localOff;
  const th = (h + diff + 24) % 24;
  const fmt = `${String(Math.floor(th)).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  return {
    main: { label: 'Target Time (UTC' + v.offset + ')', value: fmt },
    secondary: [
      { label: 'Your UTC Offset', value: 'UTC' + (localOff >= 0 ? '+' : '') + localOff },
      { label: 'Time Difference', value: (diff >= 0 ? '+' : '') + diff + ' hours' },
      { label: 'UTC Time', value: `${String((h - localOff + 24) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}` },
    ],
  };
};

export const calcWorkingDays: CalcFunction = (v) => {
  if (!v.d1 || !v.d2) return { main: { label: 'Error', value: 'Select both dates' } };
  let a = new Date(v.d1 as string), b = new Date(v.d2 as string);
  if (a > b) [a, b] = [b, a];
  let workDays = 0;
  const cur = new Date(a);
  while (cur <= b) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) workDays++;
    cur.setDate(cur.getDate() + 1);
  }
  const net = Math.max(0, workDays - (v.holidays as number));
  const totalDays = Math.floor((b.getTime() - a.getTime()) / 86400000) + 1;
  return {
    main: { label: 'Working Days', value: net.toLocaleString() },
    secondary: [
      { label: 'Total Calendar Days', value: String(totalDays) },
      { label: 'Weekend Days', value: String(totalDays - workDays) },
      { label: 'After Holidays', value: String(net) },
      { label: 'Weeks', value: (net / 5).toFixed(1) },
    ],
  };
};

export const calcAgeNextBday: CalcFunction = (v) => {
  if (!v.dob) return { main: { label: 'Error', value: 'Select your birthday' } };
  const dob = new Date(v.dob as string), today = new Date();
  const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
  const days = Math.ceil((nextBday.getTime() - today.getTime()) / 86400000);
  const ageNext = nextBday.getFullYear() - dob.getFullYear();
  const dayOfWeek = nextBday.toLocaleDateString('en-IN', { weekday: 'long' });
  return {
    main: { label: 'Days Until Birthday', value: days === 0 ? '[*] Today!' : days + ' days' },
    secondary: [
      { label: 'Birthday Date', value: nextBday.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) },
      { label: 'Day of Week', value: dayOfWeek },
      { label: "Age You'll Turn", value: ageNext + ' years' },
      { label: 'Born On', value: dob.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
    ],
  };
};

export const calcRetirementDate: CalcFunction = (v) => {
  if (!v.rd_dob) return { main: { label: 'Error', value: 'Select your date of birth' } };
  const dob = new Date(v.rd_dob as string);
  const retireAgeText = typeof v.rd_retireAge === 'string' ? v.rd_retireAge : '60 years';
  const retireAge = parseInt(retireAgeText as string) || 60;
  const retireDate = new Date(dob.getFullYear() + retireAge, dob.getMonth(), dob.getDate());
  const today = new Date();
  const diff = retireDate.getTime() - today.getTime();
  if (diff <= 0) return { main: { label: 'Retirement Status', value: '[*] Already retired!' }, secondary: [{ label: 'Retirement Date', value: retireDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) }, { label: 'Retired Since', value: Math.round(-diff / 86400000) + ' days ago' }] };
  const daysLeft = Math.floor(diff / 86400000);
  const yearsLeft = Math.floor(daysLeft / 365.25);
  const remMonths = Math.floor((daysLeft - yearsLeft * 365.25) / 30.44);
  const workingDaysLeft = Math.round(daysLeft * 5 / 7) - Math.round(yearsLeft * 15);
  return {
    main: { label: 'Days to Retirement', value: daysLeft.toLocaleString() + ' days' },
    secondary: [
      { label: 'Retirement Date', value: retireDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
      { label: 'Falls on', value: retireDate.toLocaleDateString('en-IN', { weekday: 'long' }) },
      { label: 'Time Remaining', value: yearsLeft + 'y ' + remMonths + 'm' },
      { label: 'Working Days Left (est.)', value: workingDaysLeft.toLocaleString() },
      { label: 'Weekends Until Then', value: Math.round(daysLeft * 2 / 7).toLocaleString() },
      { label: 'Retirement Age', value: retireAge + ' years' },
      { label: 'Current Age', value: Math.floor((today.getTime() - dob.getTime()) / 31557600000) + ' years' },
    ],
  };
};

export const calcAgeUnits: CalcFunction = (v) => {
  if (!v.au_dob) return { main: { label: 'Error', value: 'Select your date of birth' } };
  const dob = new Date(v.au_dob as string);
  const birthTime = (v.au_time as string) || '00:00';
  const timeParts = birthTime.split(':');
  dob.setHours(parseInt(timeParts[0]) || 0, parseInt(timeParts[1]) || 0);
  const now = new Date();
  const diffMs = now.getTime() - dob.getTime();
  if (diffMs < 0) return { main: { label: 'Error', value: 'Date of birth is in the future' } };
  const totalDays = Math.floor(diffMs / 86400000);
  const totalHours = Math.floor(diffMs / 3600000);
  const totalMinutes = Math.floor(diffMs / 60000);
  const totalWeeks = Math.floor(totalDays / 7);
  let y = now.getFullYear() - dob.getFullYear(), m = now.getMonth() - dob.getMonth(), d = now.getDate() - dob.getDate();
  if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
  const daysToB = Math.ceil((nextBday.getTime() - now.getTime()) / 86400000);
  return {
    main: { label: 'Your Age', value: y + 'y ' + m + 'm ' + d + 'd' },
    secondary: [
      { label: 'Total Days', value: totalDays.toLocaleString() + ' days' },
      { label: 'Total Hours', value: totalHours.toLocaleString() + ' hours' },
      { label: 'Total Minutes', value: totalMinutes.toLocaleString() + ' minutes' },
      { label: 'Total Weeks', value: totalWeeks.toLocaleString() + ' weeks' },
      { label: 'Next Birthday In', value: daysToB === 0 ? '[*] Today!' : daysToB + ' days' },
      { label: 'Born On', value: dob.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
    ],
  };
};
