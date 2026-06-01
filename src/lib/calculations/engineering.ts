/* Calc Labz — Engineering Calculations
   Ported from assets/js/calculators-engineering.js */
import { CalcFunction } from '@/types/calculator';

export const calcOhmsLaw: CalcFunction = (v) => {
  let V = v.v as number, I = v.i as number, R = v.r as number;
  const zeros = [!V, !I, !R].filter(Boolean).length;
  if (zeros !== 1) return { main: { label: 'Tip', value: 'Set exactly one value to 0 to solve for it' } };
  if (!V) V = I * R; else if (!I) I = V / R; else R = V / I;
  const P = V * I;
  return { main: { label: 'Solved', value: `V=${V.toFixed(3)}V  I=${I.toFixed(3)}A  R=${R.toFixed(3)}Ω` }, secondary: [{ label: 'Power (P=VI)', value: P.toFixed(3) + ' W' }, { label: 'Energy (1hr)', value: (P / 1000).toFixed(4) + ' kWh' }, { label: 'Resistance', value: R.toFixed(4) + ' Ω' }] };
};

export const calcResistor: CalcFunction = (v) => {
  const vals: Record<string,number> = { Black: 0, Brown: 1, Red: 2, Orange: 3, Yellow: 4, Green: 5, Blue: 6, Violet: 7, Grey: 8, White: 9 };
  const mults: Record<string,number> = { '×1': 1, '×10': 10, '×100': 100, '×1K': 1000, '×10K': 10000, '×100K': 100000, '×1M': 1000000, '×0.1': 0.1, '×0.01': 0.01 };
  const res = (vals[v.b1 as string] * 10 + vals[v.b2 as string]) * mults[v.mult as string];
  const tolPct = parseFloat((v.tol as string).replace(/.*±(\d+\.?\d*)%.*/, '$1'));
  const fmt = res >= 1000000 ? `${(res / 1000000).toFixed(2)}MΩ` : res >= 1000 ? `${(res / 1000).toFixed(2)}kΩ` : `${res}Ω`;
  return { main: { label: 'Resistance', value: fmt }, secondary: [{ label: 'Tolerance', value: '±' + tolPct + '%' }, { label: 'Min Value', value: (res * (1 - tolPct / 100)).toFixed(2) + ' Ω' }, { label: 'Max Value', value: (res * (1 + tolPct / 100)).toFixed(2) + ' Ω' }] };
};

export const calcPower: CalcFunction = (v) => {
  const power = v.power as number, voltage = v.voltage as number;
  const I = power / voltage, R = voltage / I;
  return { main: { label: 'Current (A)', value: I.toFixed(4) + ' A' }, secondary: [{ label: 'Resistance', value: R.toFixed(2) + ' Ω' }, { label: 'kWh per day (8hr)', value: (power * 8 / 1000).toFixed(3) + ' kWh' }, { label: 'Monthly cost (₹8/unit)', value: '₹' + (power * 8 / 1000 * 30 * 8).toFixed(2) }, { label: 'Annual cost', value: '₹' + (power * 8 / 1000 * 365 * 8).toFixed(2) }] };
};

export const calcPythagorean: CalcFunction = (v) => {
  let a = v.a as number, b = v.b as number, c = v.c as number;
  if (!c) c = Math.sqrt(a * a + b * b); else if (!b) b = Math.sqrt(c * c - a * a); else if (!a) a = Math.sqrt(c * c - b * b);
  return { main: { label: 'Hypotenuse C', value: c.toFixed(6) }, secondary: [{ label: 'Side A', value: a.toFixed(6) }, { label: 'Side B', value: b.toFixed(6) }, { label: 'Triangle Area', value: (0.5 * a * b).toFixed(4) }, { label: 'Perimeter', value: (a + b + c).toFixed(4) }] };
};

export const calcLedResistor: CalcFunction = (v) => {
  const vr = (v.vsupply as number) - (v.vled as number);
  const r = vr / ((v.iled as number) / 1000);
  const power = vr * ((v.iled as number) / 1000);
  const e12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
  const decade = Math.pow(10, Math.floor(Math.log10(r)));
  let e12r = e12[0], bestDiff = Infinity;
  for (const val of e12) { const candidate = val * decade / 10; const diff = Math.abs(candidate - r); if (diff < bestDiff) { bestDiff = diff; e12r = candidate; } }
  return { main: { label: 'Required Resistor', value: r.toFixed(1) + ' Ω' }, secondary: [{ label: 'Nearest E12 Value', value: e12r + ' Ω' }, { label: 'Voltage Drop across R', value: vr.toFixed(2) + ' V' }, { label: 'Power Dissipated', value: (power * 1000).toFixed(1) + ' mW' }, { label: 'Use resistor rated', value: power > 0.125 ? '0.5W minimum' : '0.25W or higher' }] };
};

export const calcVoltDivider: CalcFunction = (v) => {
  const vin = v.vin_vd as number, r1 = v.r1_vd as number, r2 = v.r2_vd as number;
  const vout = vin * r2 / (r1 + r2); const current = vin / (r1 + r2) * 1000; const ratio = r2 / (r1 + r2);
  return { main: { label: 'Output Voltage (Vout)', value: vout.toFixed(4) + ' V' }, secondary: [{ label: 'Division Ratio', value: (ratio * 100).toFixed(2) + '%' }, { label: 'Current through divider', value: current.toFixed(3) + ' mA' }, { label: 'Power dissipated (R1)', value: (vin * vin / r1 * 1000).toFixed(2) + ' mW' }, { label: 'Power dissipated (R2)', value: (vout * vout / r2 * 1000).toFixed(2) + ' mW' }] };
};

export const calcBatteryLife: CalcFunction = (v) => {
  const cap = v.capacity_mah as number, eff = v.efficiency as number, draw = v.current_draw as number;
  const hours = (cap * eff / 100) / draw; const days = hours / 24; const energyJ = cap * 3.7 * 3.6;
  return { main: { label: 'Estimated Battery Life', value: hours.toFixed(1) + ' hours' }, secondary: [{ label: 'In days', value: days.toFixed(2) + ' days' }, { label: 'Usable Capacity', value: Math.round(cap * eff / 100) + ' mAh' }, { label: 'Energy Content (3.7V LiPo)', value: (energyJ / 1000).toFixed(2) + ' kJ / ' + (cap * 3.7 / 1000).toFixed(2) + ' Wh' }, { label: 'At 50% efficiency', value: (cap * 0.5 / draw).toFixed(1) + ' hours' }] };
};

export const calcPcbTrace: CalcFunction = (v) => {
  const I = v.current_pcb as number, dT = v.temp_rise as number;
  const isExt = (v.layer as string).startsWith('External');
  const k = isExt ? 0.048 : 0.024;
  const area = Math.pow(I / (k * Math.pow(dT, 0.44)), 1 / 0.725);
  const thickness_mils = (v.thickness_pcb as number) * 1.378;
  const width_mils = area / thickness_mils; const width_mm = width_mils * 0.0254;
  return { main: { label: 'Minimum Trace Width', value: width_mm.toFixed(3) + ' mm' }, secondary: [{ label: 'Width in mils', value: width_mils.toFixed(1) + ' mils' }, { label: 'Cross-section area', value: area.toFixed(1) + ' mils²' }, { label: 'Layer type', value: v.layer as string }, { label: 'Add 50% safety margin', value: (width_mm * 1.5).toFixed(3) + ' mm' }] };
};

export const calcDecibel: CalcFunction = (v) => {
  const dbVal = v.db_val as number;
  const isPower = (v.reference as string).startsWith('Power');
  const ratio = isPower ? Math.pow(10, dbVal / 10) : Math.pow(10, dbVal / 20);
  const perception = dbVal < 20 ? 'Very quiet (whisper)' : dbVal < 50 ? 'Quiet (library)' : dbVal < 70 ? 'Moderate (conversation)' : dbVal < 90 ? 'Loud (traffic)' : dbVal < 110 ? 'Very loud (concert)' : 'Dangerous level';
  return { main: { label: isPower ? 'Power Ratio' : 'Voltage Ratio', value: ratio.toFixed(4) + '×' }, secondary: [{ label: 'dB (power formula)', value: (10 * Math.log10(ratio)).toFixed(4) + ' dB' }, { label: 'dB (voltage formula)', value: (20 * Math.log10(ratio)).toFixed(4) + ' dB' }, { label: 'Inverse ratio (1/x)', value: (1 / ratio).toFixed(6) }, { label: 'SPL perception', value: perception }] };
};

export const calcAntennaLen: CalcFunction = (v) => {
  const c = 299792458; const freq = v.freq_mhz as number; const vel = v.vel_factor as number;
  const lambda = (c / (freq * 1e6)) * vel;
  const half = lambda / 2 * 100, quarter = lambda / 4 * 100, fiveEighths = lambda * 5 / 8 * 100;
  const use = freq < 30 ? 'HF/Shortwave' : freq < 300 ? 'VHF (FM/TV)' : freq < 3000 ? 'UHF (WiFi/Cellular)' : 'Microwave';
  return { main: { label: 'Half-wave Dipole', value: half.toFixed(1) + ' cm' }, secondary: [{ label: 'Quarter-wave Monopole', value: quarter.toFixed(1) + ' cm' }, { label: '5/8 Wave (gain antenna)', value: fiveEighths.toFixed(1) + ' cm' }, { label: 'Full wavelength (λ)', value: (lambda * 100).toFixed(1) + ' cm' }, { label: 'Frequency', value: freq + ' MHz' }, { label: 'Common use', value: use }] };
};

export const calcTorque: CalcFunction = (v) => {
  const tau = (v.force_t as number) * (v.arm_t as number) * Math.sin((v.angle_t as number) * Math.PI / 180);
  return { main: { label: 'Torque (τ)', value: tau.toFixed(4) + ' N·m' }, secondary: [{ label: 'In kgf·cm', value: (tau * 10.197).toFixed(2) + ' kgf·cm' }, { label: 'In lbf·ft', value: (tau * 0.7376).toFixed(4) + ' lbf·ft' }, { label: 'In lbf·in', value: (tau * 8.8507).toFixed(3) + ' lbf·in' }, { label: 'Power at 100 RPM', value: (tau * 100 * 2 * Math.PI / 60).toFixed(2) + ' W' }, { label: 'Formula', value: 'τ = F × r × sin(θ)' }] };
};

export const calcBeamLoad: CalcFunction = (v) => {
  const L = v.span as number, w = v.loadPerMeter as number, P = v.pointLoad as number, pos = v.loadPosition as number, EI = v.EI as number;
  const raUDL = w * L / 2, raPoint = P * (L - pos) / L, rbPoint = P * pos / L;
  const raTotal = raUDL + raPoint, rbTotal = raUDL + rbPoint;
  const maxMomentUDL = w * L * L / 8, maxMomentPoint = P * pos * (L - pos) / L;
  const totalMaxMoment = maxMomentUDL + maxMomentPoint;
  const deflection = 5 * w * Math.pow(L, 4) / (384 * EI);
  return { main: { label: 'Max Bending Moment', value: totalMaxMoment.toFixed(2) + ' kN·m' }, secondary: [{ label: 'Reaction at A (RA)', value: raTotal.toFixed(2) + ' kN' }, { label: 'Reaction at B (RB)', value: rbTotal.toFixed(2) + ' kN' }, { label: 'Max Shear Force', value: Math.max(raTotal, rbTotal).toFixed(2) + ' kN' }, { label: 'UDL Moment', value: maxMomentUDL.toFixed(2) + ' kN·m' }, { label: 'Point Load Moment', value: maxMomentPoint.toFixed(2) + ' kN·m' }, { label: 'Max Deflection (UDL only)', value: (deflection * 1000).toFixed(3) + ' mm' }] };
};

export const calcHeatExchanger: CalcFunction = (v) => {
  const Q = (v.massFlow as number) * (v.cpFluid as number) * ((v.hotInlet as number) - (v.coldInlet as number)) * (v.effectiveness as number) / 100;
  const lmtdP = ((v.hotInlet as number) - (v.coldOutlet as number)) - ((v.hotOutlet as number) - (v.coldInlet as number));
  const lmtdD = Math.log(((v.hotInlet as number) - (v.coldOutlet as number)) / ((v.hotOutlet as number) - (v.coldInlet as number)));
  const lmtd = Math.abs(lmtdD) > 0.001 ? lmtdP / lmtdD : 0;
  const area = lmtd > 0 && (v.overallU as number) > 0 ? Q * 1000 / ((v.overallU as number) * lmtd) : 0;
  return { main: { label: 'Heat Transfer Rate', value: Q.toFixed(2) + ' kW' }, secondary: [{ label: 'LMTD', value: lmtd.toFixed(2) + ' °C' }, { label: 'Required Area', value: area.toFixed(3) + ' m²' }, { label: 'Overall U', value: v.overallU + ' W/m²·K' }, { label: 'Effectiveness', value: v.effectiveness + '%' }] };
};

export const calcFluidFlow: CalcFunction = (v) => {
  const area = Math.PI * Math.pow((v.pipeDia as number) / 2000, 2);
  const velocity = (v.flowRate as number) / (area * 1000 * 60);
  const Re = (v.density as number) * velocity * (v.pipeDia as number) / 1000 / (v.viscosity as number);
  const flowType = Re < 2300 ? 'Laminar' : Re < 4000 ? 'Transitional' : 'Turbulent';
  const f = Re < 2300 ? 64 / Re : 0.316 * Math.pow(Re, -0.25);
  const pressureDrop = f * (v.pipeLength as number) / ((v.pipeDia as number) / 1000) * (v.density as number) * velocity * velocity / 2;
  return { main: { label: 'Flow Velocity', value: velocity.toFixed(3) + ' m/s' }, secondary: [{ label: 'Reynolds Number', value: Math.round(Re).toLocaleString() }, { label: 'Flow Type', value: flowType }, { label: 'Friction Factor (f)', value: f.toFixed(6) }, { label: 'Pressure Drop', value: (pressureDrop / 1000).toFixed(2) + ' kPa' }, { label: 'Pipe Cross-Section', value: (area * 1e6).toFixed(1) + ' mm²' }] };
};

export const calcSpringForce: CalcFunction = (v) => {
  const k = v.springConstant as number, x = v.displacement as number, mass = v.mass_spring as number;
  const force = k * x / 1000; const pe = 0.5 * k * Math.pow(x / 1000, 2);
  const naturalFreq = Math.sqrt(k / mass) / (2 * Math.PI); const period = 1 / naturalFreq;
  return { main: { label: 'Spring Force (F = kx)', value: force.toFixed(3) + ' N' }, secondary: [{ label: 'Potential Energy', value: pe.toFixed(4) + ' J' }, { label: 'Natural Frequency', value: naturalFreq.toFixed(2) + ' Hz' }, { label: 'Period', value: period.toFixed(4) + ' s' }, { label: 'Max Velocity', value: (x / 1000 * 2 * Math.PI * naturalFreq).toFixed(3) + ' m/s' }] };
};

export const calcGearRatio: CalcFunction = (v) => {
  const ratio = (v.drivenTeeth as number) / (v.drivingTeeth as number);
  const outputRPM = (v.inputRPM as number) / ratio;
  const outputTorque = (v.inputTorque as number) * ratio * (v.gearEfficiency as number) / 100;
  const inputPower = (v.inputTorque as number) * (v.inputRPM as number) * 2 * Math.PI / 60;
  return { main: { label: 'Gear Ratio', value: ratio.toFixed(3) + ':1' }, secondary: [{ label: 'Output RPM', value: outputRPM.toFixed(1) + ' RPM' }, { label: 'Output Torque', value: outputTorque.toFixed(2) + ' N·m' }, { label: 'Input Power', value: inputPower.toFixed(1) + ' W' }, { label: 'Output Power', value: (inputPower * (v.gearEfficiency as number) / 100).toFixed(1) + ' W' }, { label: 'Type', value: ratio > 1 ? 'Speed Reducer (torque ↑)' : 'Speed Multiplier (torque ↓)' }] };
};

export const calcInverterBattery: CalcFunction = (v) => {
  const voltMap: Record<string, number> = { '12V (single battery)': 12, '24V (2 batteries)': 24, '48V (4 batteries)': 48 };
  const battV = voltMap[v.batteryVoltage as string] || 12;
  const inverterVA = Math.ceil((v.loadWatts as number) / 0.8 / 100) * 100;
  const totalEnergy = (v.loadWatts as number) * (v.backupHours as number);
  const battCapacityAh = totalEnergy / (battV * ((v.dod as number) / 100)) / battV;
  const numBatteries = Math.ceil(battV / 12);
  const actualBackup = ((v.batteryAh as number) * battV * ((v.dod as number) / 100)) / (v.loadWatts as number);
  return { main: { label: 'Inverter Size Required', value: inverterVA + ' VA (minimum)' }, secondary: [{ label: 'Battery Capacity Needed', value: Math.ceil(battCapacityAh) + ' Ah' }, { label: 'Actual Backup (with ' + v.batteryAh + 'Ah)', value: actualBackup.toFixed(1) + ' hours' }, { label: 'Number of Batteries', value: numBatteries + ' × ' + v.batteryAh + 'Ah' }, { label: 'Total Energy Need', value: totalEnergy + ' Wh' }, { label: 'Depth of Discharge', value: v.dod + '%' }] };
};

export const calcAcBtu: CalcFunction = (v) => {
  const areaSqFt = (v.roomLength as number) * (v.roomWidth as number);
  const baseBTU = areaSqFt * 25;
  const heightAdj = (v.ceilingHeight as number) > 10 ? ((v.ceilingHeight as number) - 10) * areaSqFt * 2 : 0;
  const floorAdj: Record<string, number> = { 'Ground Floor': 0, 'Middle Floor': 0, 'Top Floor (direct sun)': baseBTU * 0.15 };
  const windowAdj: Record<string, number> = { 'North (least sun)': 0, 'East/West': baseBTU * 0.05, 'South (most sun)': baseBTU * 0.10, 'Multiple large windows': baseBTU * 0.15 };
  const occupantAdj = ((v.occupants as number) - 1) * 600;
  const totalBTU = Math.round(baseBTU + heightAdj + (floorAdj[v.floorLevel as string] || 0) + (windowAdj[v.windowArea as string] || 0) + occupantAdj);
  const tons = totalBTU / 12000;
  const starRating = tons <= 1.0 ? '1 Ton (3-Star)' : tons <= 1.5 ? '1.5 Ton (3-Star)' : '2 Ton (3-Star)';
  return { main: { label: 'AC Capacity Needed', value: tons.toFixed(2) + ' Ton' }, secondary: [{ label: 'BTU/hr Required', value: totalBTU.toLocaleString() + ' BTU' }, { label: 'Recommended AC', value: starRating }, { label: 'Room Area', value: areaSqFt + ' sq ft' }, { label: 'Est. Monthly Cost (8hr/day)', value: '₹' + Math.round(tons * 0.746 * 8 * 30 * 8).toLocaleString() + ' (at ₹8/unit)' }] };
};

export const calcPipeFlow: CalcFunction = (v) => {
  const fluidProps: Record<string, { rho: number; mu: number }> = { 'Water (20°C)': { rho: 998, mu: 0.001 }, 'Water (60°C)': { rho: 983, mu: 0.000467 }, 'Oil (light)': { rho: 850, mu: 0.03 }, Air: { rho: 1.2, mu: 0.000018 } };
  const fp = fluidProps[v.fluid as string] || fluidProps['Water (20°C)'];
  const D = (v.pipeD as number) / 1000; const A = Math.PI * Math.pow(D / 2, 2);
  const velocity = (v.flowRate_pf as number) / (A * 1000 * 60);
  const Re = fp.rho * velocity * D / fp.mu;
  const flowType = Re < 2300 ? 'Laminar' : Re < 4000 ? 'Transitional' : 'Turbulent';
  const f = Re < 2300 ? 64 / Re : 0.316 * Math.pow(Re, -0.25);
  const dP = f * ((v.pipeLength as number) / D) * (fp.rho * velocity * velocity / 2);
  return { main: { label: 'Flow Velocity', value: velocity.toFixed(3) + ' m/s' }, secondary: [{ label: 'Reynolds Number', value: Math.round(Re).toLocaleString() }, { label: 'Flow Regime', value: flowType }, { label: 'Friction Factor', value: f.toFixed(6) }, { label: 'Pressure Drop', value: (dP / 1000).toFixed(2) + ' kPa' }, { label: 'Velocity Status', value: velocity > 2.5 ? '[!] May cause noise' : '[OK] Within limits' }] };
};

export const calcThreePhase: CalcFunction = (v) => {
  const sqrt3 = Math.sqrt(3); const mode = v.calcMode_3p as string;
  let P = 0, I = 0, V = v.voltage3p as number; const pf = v.powerFactor3p as number;
  if (mode === 'Power from V & I') { P = sqrt3 * V * (v.current3p as number) * pf / 1000; I = v.current3p as number; }
  else if (mode === 'Current from V & Power') { P = v.powerKw_3p as number; I = P * 1000 / (sqrt3 * V * pf); }
  else { P = v.powerKw_3p as number; I = v.current3p as number; V = P * 1000 / (sqrt3 * I * pf); }
  const phaseV = V / sqrt3; const apparentPower = sqrt3 * V * I / 1000; const reactivePower = apparentPower * Math.sin(Math.acos(pf));
  return { main: { label: 'Active Power', value: P.toFixed(2) + ' kW' }, secondary: [{ label: 'Line Current', value: I.toFixed(2) + ' A' }, { label: 'Line Voltage', value: V.toFixed(1) + ' V' }, { label: 'Phase Voltage', value: phaseV.toFixed(1) + ' V' }, { label: 'Apparent Power (S)', value: apparentPower.toFixed(2) + ' kVA' }, { label: 'Reactive Power (Q)', value: reactivePower.toFixed(2) + ' kVAR' }] };
};

export const calcTransformer: CalcFunction = (v) => {
  const pV = v.primaryV as number, sV = v.secondaryV as number, pwr = v.powerRating_t as number, eff = v.efficiency_t as number;
  const turnsRatio = pV / sV; const primaryI = pwr / pV; const secondaryI = pwr / sV;
  const outputPower = pwr * eff / 100; const losses = pwr - outputPower;
  const wireGauge_p = primaryI < 0.5 ? '30 AWG' : primaryI < 1 ? '26 AWG' : primaryI < 2 ? '22 AWG' : primaryI < 5 ? '18 AWG' : '14 AWG';
  const wireGauge_s = secondaryI < 1 ? '26 AWG' : secondaryI < 3 ? '22 AWG' : secondaryI < 5 ? '18 AWG' : secondaryI < 10 ? '14 AWG' : '12 AWG';
  return { main: { label: 'Turns Ratio', value: turnsRatio.toFixed(2) + ':1' }, secondary: [{ label: 'Primary Current', value: primaryI.toFixed(3) + ' A' }, { label: 'Secondary Current', value: secondaryI.toFixed(2) + ' A' }, { label: 'Output Power (at ' + eff + '%)', value: outputPower.toFixed(1) + ' W' }, { label: 'Power Loss', value: losses.toFixed(1) + ' W' }, { label: 'Primary Wire (approx.)', value: wireGauge_p }, { label: 'Secondary Wire (approx.)', value: wireGauge_s }, { label: 'Type', value: turnsRatio > 1 ? 'Step-Down' : 'Step-Up' }] };
};

/* ── Electric Motor Sizing Calculator ────────────── */
export const calcMotorSize: CalcFunction = (v) => {
  const torque = Number(v.torque) || 10; // N-m
  const speed = Number(v.speed) || 1500;  // RPM
  const safety = Number(v.safety) || 1.2;

  // Mechanical power (kW) = (Torque * Speed) / 9550
  const basePowerKW = (torque * speed) / 9550;
  const requiredPowerKW = basePowerKW * safety;
  const requiredPowerHP = requiredPowerKW * 1.34102;

  // Electrical current draw estimations
  const currentSinglePhase = (requiredPowerKW * 1000) / (230 * 0.85 * 0.9); // 230V, pf=0.85, eff=0.9
  const currentThreePhase = (requiredPowerKW * 1000) / (1.732 * 415 * 0.85 * 0.9); // 415V

  return {
    main: { label: 'Required Motor Power', value: requiredPowerKW.toFixed(2) + ' kW (' + requiredPowerHP.toFixed(2) + ' HP)' },
    secondary: [
      { label: 'Torque (N·m)', value: String(torque) },
      { label: 'Rotational Speed (RPM)', value: String(speed) },
      { label: 'Raw Mechanical Power', value: basePowerKW.toFixed(2) + ' kW' },
      { label: 'Safety Factor Multiplier', value: safety + 'x' },
      { label: 'Est. Current (230V 1Φ)', value: currentSinglePhase.toFixed(1) + ' Amps' },
      { label: 'Est. Current (415V 3Φ)', value: currentThreePhase.toFixed(1) + ' Amps' },
      { label: 'Formula', value: 'Power (kW) = (T × N) / 9550' }
    ]
  };
};

/* ── Resistor Color Code Decoder ──────────────────── */
export const calcResistorDecode: CalcFunction = (v) => {
  const band1 = String(v.band1 || 'Brown');
  const band2 = String(v.band2 || 'Black');
  const mult = String(v.multiplier_r || 'Red');
  const tol = String(v.tolerance_r || 'Gold');

  const digits: Record<string, number> = {
    'Black': 0, 'Brown': 1, 'Red': 2, 'Orange': 3, 'Yellow': 4,
    'Green': 5, 'Blue': 6, 'Violet': 7, 'Gray': 8, 'White': 9
  };

  const multipliers: Record<string, number> = {
    'Black': 1, 'Brown': 10, 'Red': 100, 'Orange': 1000, 'Yellow': 10000,
    'Green': 100000, 'Blue': 1000000, 'Violet': 10000000, 'Gold': 0.1, 'Silver': 0.01
  };

  const tolerances: Record<string, number> = {
    'Brown': 1, 'Red': 2, 'Green': 0.5, 'Blue': 0.25, 'Violet': 0.1,
    'Gold': 5, 'Silver': 10
  };

  const val1 = digits[band1] !== undefined ? digits[band1] : 1;
  const val2 = digits[band2] !== undefined ? digits[band2] : 0;
  const multiplier = multipliers[mult] !== undefined ? multipliers[mult] : 100;
  const tolerance = tolerances[tol] !== undefined ? tolerances[tol] : 5;

  const resistance = (val1 * 10 + val2) * multiplier;
  const tolVal = (resistance * tolerance) / 100;
  const minVal = resistance - tolVal;
  const maxVal = resistance + tolVal;

  let formattedVal = resistance + ' Ω';
  if (resistance >= 1000000) {
    formattedVal = (resistance / 1000000).toFixed(2) + ' MΩ';
  } else if (resistance >= 1000) {
    formattedVal = (resistance / 1000).toFixed(2) + ' kΩ';
  }

  return {
    main: { label: 'Resistance Value', value: formattedVal + ' ±' + tolerance + '%' },
    secondary: [
      { label: 'Minimum Resistance', value: minVal.toLocaleString() + ' Ω' },
      { label: 'Maximum Resistance', value: maxVal.toLocaleString() + ' Ω' },
      { label: 'Band 1 Color', value: band1 + ` (${val1})` },
      { label: 'Band 2 Color', value: band2 + ` (${val2})` },
      { label: 'Multiplier Color', value: mult + ` (x${multiplier})` },
      { label: 'Tolerance Color', value: tol + ` (±${tolerance}%)` }
    ]
  };
};
