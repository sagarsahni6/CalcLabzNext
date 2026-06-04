/* ═══════════════════════════════════════════════════
   Calc Labz — Engineering Validation System
   Per-calculator validation rules with standards refs.
   Returns Safe/Warning/Critical status for results.
   ═══════════════════════════════════════════════════ */
import type { EngineeringValidation } from '@/types/engineering';

type ValidatorFn = (inputs: Record<string, number | string>, mainValue: number | string) => EngineeringValidation | null;

/* ── Per-Calculator Validators ───────────────────── */
const VALIDATORS: Record<string, ValidatorFn> = {
  beamload: (inputs, mainValue) => {
    const L = Number(inputs.span || inputs.length || 0);
    const deflection = typeof mainValue === 'string' ? parseFloat(mainValue.replace(/[^\d.-]/g, '')) : Number(mainValue);
    if (!L || !deflection || isNaN(deflection)) return null;

    const ratio = L * 1000 / deflection; // L in m, deflection in mm
    if (ratio < 150) {
      return { status: 'critical', title: 'Excessive Deflection', message: `Deflection exceeds L/150 limit. Calculated ratio is L/${Math.round(ratio)}. This exceeds AISC serviceability limits and may cause structural issues or damage to finishes.`, standardRef: 'AISC 360-22, Chapter L', limit: 'L/150', actual: `L/${Math.round(ratio)}` };
    }
    if (ratio < 250) {
      return { status: 'warning', title: 'Deflection Near Limit', message: `Deflection ratio is L/${Math.round(ratio)}, approaching the AISC limit of L/250 for beams supporting plaster ceilings. Consider increasing section size or reducing span.`, standardRef: 'AISC 360-22, Table L.1', limit: 'L/250', actual: `L/${Math.round(ratio)}` };
    }
    return { status: 'safe', title: 'Deflection Within Limits', message: `Deflection ratio of L/${Math.round(ratio)} is well within the AISC serviceability limit of L/250.`, standardRef: 'AISC 360-22, Chapter L', limit: 'L/250', actual: `L/${Math.round(ratio)}` };
  },

  fluidflow: (inputs) => {
    const re = Number(inputs.reynoldsNumber || inputs.reynolds || 0);
    const velocity = Number(inputs.velocity || 0);

    if (velocity > 3) {
      return { status: 'critical', title: 'Pipe Erosion Risk', message: `Flow velocity of ${velocity.toFixed(2)} m/s exceeds the recommended 3 m/s limit for water in steel pipes. High velocities cause erosion, vibration, and noise.`, standardRef: 'ASME B31.1', limit: '3 m/s', actual: `${velocity.toFixed(2)} m/s` };
    }
    if (re > 4000) {
      return { status: 'warning', title: 'Turbulent Flow Regime', message: `Reynolds number of ${Math.round(re)} indicates fully turbulent flow (Re > 4000). Friction losses will be significantly higher than laminar flow. Consider larger pipe diameter.`, standardRef: 'Moody Diagram', limit: 'Re < 4000', actual: `Re = ${Math.round(re)}` };
    }
    if (re > 2300) {
      return { status: 'warning', title: 'Transitional Flow', message: `Reynolds number of ${Math.round(re)} is in the transitional regime (2300–4000). Flow behavior is unpredictable; calculations may have higher uncertainty.`, limit: 'Re < 2300', actual: `Re = ${Math.round(re)}` };
    }
    return { status: 'safe', title: 'Laminar Flow', message: `Reynolds number of ${Math.round(re)} indicates stable laminar flow with predictable pressure drop characteristics.`, limit: 'Re < 2300', actual: `Re = ${Math.round(re)}` };
  },

  pipeflow: (inputs) => {
    const velocity = Number(inputs.velocity || 0);
    if (velocity > 3) {
      return { status: 'critical', title: 'Excessive Velocity', message: `Velocity ${velocity.toFixed(2)} m/s exceeds the 3 m/s erosion limit for steel pipes. Consider increasing pipe diameter.`, standardRef: 'ASME B31.1', limit: '3 m/s', actual: `${velocity.toFixed(2)} m/s` };
    }
    if (velocity > 2) {
      return { status: 'warning', title: 'High Velocity', message: `Velocity ${velocity.toFixed(2)} m/s is approaching the erosion limit. Monitor pipe condition periodically.`, limit: '3 m/s', actual: `${velocity.toFixed(2)} m/s` };
    }
    return { status: 'safe', title: 'Acceptable Velocity', message: `Velocity of ${velocity.toFixed(2)} m/s is within safe limits for pipe transport.` };
  },

  pcbtrace: (_inputs, mainValue) => {
    const width = typeof mainValue === 'string' ? parseFloat(mainValue.replace(/[^\d.-]/g, '')) : Number(mainValue);
    if (!width || isNaN(width)) return null;

    const widthMm = width; // assuming result is in mm
    if (widthMm < 0.15) {
      return { status: 'critical', title: 'Below Manufacturing Limit', message: `Trace width of ${widthMm.toFixed(3)} mm is below the typical PCB manufacturing minimum of 0.15 mm (6 mil). Most standard PCB fabs cannot reliably produce this width.`, standardRef: 'IPC-2221B, Section 6.2', limit: '0.15 mm (6 mil)', actual: `${widthMm.toFixed(3)} mm` };
    }
    if (widthMm < 0.25) {
      return { status: 'warning', title: 'Narrow Trace', message: `Trace width of ${widthMm.toFixed(3)} mm is near the manufacturing limit. Consider using a wider trace or higher copper weight for reliability.`, standardRef: 'IPC-2221B', limit: '0.25 mm (10 mil) recommended', actual: `${widthMm.toFixed(3)} mm` };
    }
    return { status: 'safe', title: 'Trace Width Acceptable', message: `Trace width of ${widthMm.toFixed(3)} mm is within standard manufacturing capabilities and includes adequate margin per IPC-2221B.`, standardRef: 'IPC-2221B' };
  },

  threephase: (inputs) => {
    const pf = Number(inputs.powerFactor || inputs.pf || 1);
    const current = Number(inputs.current || 0);

    if (pf < 0.7) {
      return { status: 'critical', title: 'Poor Power Factor', message: `Power factor of ${pf.toFixed(2)} is critically low. This results in excessive reactive power consumption, higher electricity bills, and potential utility penalties. Power factor correction capacitors are strongly recommended.`, standardRef: 'IEC 60038', limit: 'PF ≥ 0.85', actual: `PF = ${pf.toFixed(2)}` };
    }
    if (pf < 0.85) {
      return { status: 'warning', title: 'Low Power Factor', message: `Power factor of ${pf.toFixed(2)} is below the recommended 0.85. Consider installing power factor correction equipment to reduce reactive power consumption.`, standardRef: 'IS 12360', limit: 'PF ≥ 0.85', actual: `PF = ${pf.toFixed(2)}` };
    }
    if (current > 400) {
      return { status: 'warning', title: 'High Current Draw', message: `Line current of ${current.toFixed(1)} A is substantial. Verify cable sizing per NEC Article 430 and ensure proper overcurrent protection.`, standardRef: 'NEC Article 430' };
    }
    return { status: 'safe', title: 'Parameters Normal', message: `Power factor of ${pf.toFixed(2)} and system parameters are within acceptable limits per IEC 60038.`, standardRef: 'IEC 60038' };
  },

  heatexchanger: (inputs) => {
    const lmtd = Number(inputs.lmtd || 0);
    const effectiveness = Number(inputs.effectiveness || inputs.efficiency || 0);

    if (lmtd > 0 && lmtd < 5) {
      return { status: 'warning', title: 'Very Low LMTD', message: `Log Mean Temperature Difference of ${lmtd.toFixed(1)}°C is very low. This requires an impractically large heat transfer surface area, increasing cost significantly.`, standardRef: 'TEMA Standards', limit: 'LMTD ≥ 5°C', actual: `LMTD = ${lmtd.toFixed(1)}°C` };
    }
    if (effectiveness > 95) {
      return { status: 'warning', title: 'Very High Effectiveness', message: `Effectiveness of ${effectiveness.toFixed(1)}% requires extremely large surface area, making the design impractical for most applications.`, standardRef: 'TEMA Standards', limit: 'ε ≤ 95%', actual: `ε = ${effectiveness.toFixed(1)}%` };
    }
    return { status: 'safe', title: 'Design Parameters Acceptable', message: `Heat exchanger parameters are within practical design limits per TEMA standards.`, standardRef: 'TEMA Standards' };
  },

  voltdivider: (inputs) => {
    const r1 = Number(inputs.r1 || inputs.R1 || 0);
    const r2 = Number(inputs.r2 || inputs.R2 || 0);
    const vin = Number(inputs.vin || inputs.Vin || inputs.voltage || 0);

    if (r1 > 0 && r2 > 0 && vin > 0) {
      const current = vin / (r1 + r2);
      const currentMa = current * 1000;
      if (currentMa > 10) {
        return { status: 'warning', title: 'High Quiescent Current', message: `Divider current of ${currentMa.toFixed(1)} mA wastes ${(vin * current * 1000).toFixed(0)} mW of power. Consider larger resistance values for battery-powered circuits.`, standardRef: 'IEC 60063', limit: '< 10 mA', actual: `${currentMa.toFixed(1)} mA` };
      }
    }
    return null;
  },

  transformer: (inputs) => {
    const efficiency = Number(inputs.efficiency || inputs.eta || 100);
    if (efficiency < 80) {
      return { status: 'warning', title: 'Low Efficiency', message: `Transformer efficiency of ${efficiency.toFixed(1)}% indicates significant losses. Modern transformers typically achieve 95-99% efficiency. Check for core saturation or excessive copper losses.`, standardRef: 'IEC 60076-1', limit: '≥ 95%', actual: `${efficiency.toFixed(1)}%` };
    }
    return { status: 'safe', title: 'Efficiency Acceptable', message: `Transformer efficiency is within normal operating parameters per IEC 60076-1.`, standardRef: 'IEC 60076-1' };
  },

  acbtu: (_inputs, mainValue) => {
    const btu = typeof mainValue === 'string' ? parseFloat(mainValue.replace(/[^\d.-]/g, '')) : Number(mainValue);
    if (!btu || isNaN(btu)) return null;

    const tons = btu / 12000;
    if (tons > 5) {
      return { status: 'warning', title: 'High Cooling Load', message: `Cooling load of ${tons.toFixed(1)} tons is substantial. Consider split system or central AC with proper ductwork design per ASHRAE guidelines.`, standardRef: 'ASHRAE 90.1', actual: `${tons.toFixed(1)} tons` };
    }
    return { status: 'safe', title: 'Cooling Load Normal', message: `Cooling requirement of ${tons.toFixed(1)} tons is within typical residential/small commercial range.`, standardRef: 'ASHRAE 90.1' };
  },
};

/**
 * Validate engineering calculation results against applicable standards.
 * Returns null for non-engineering or unmapped calculators.
 */
export function validateEngineering(
  calcId: string,
  inputs: Record<string, number | string>,
  mainValue: number | string
): EngineeringValidation | null {
  const validator = VALIDATORS[calcId];
  if (!validator) return null;

  try {
    return validator(inputs, mainValue);
  } catch (err) {
    console.warn(`Engineering validation error for ${calcId}:`, err);
    return null;
  }
}
