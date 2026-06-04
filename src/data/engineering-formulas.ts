/* ═══════════════════════════════════════════════════
   Calc Labz — Engineering Formula Derivations
   Step-by-step derivation data for each engineering calc.
   ═══════════════════════════════════════════════════ */
import type { FormulaStep } from '@/types/engineering';

export const ENGINEERING_FORMULAS: Record<string, FormulaStep[]> = {
  ohmslaw: [
    { step: 1, title: "Ohm's Law Fundamental", description: "Georg Ohm established that the current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.", latex: 'V = I \\times R', result: 'Voltage = Current × Resistance' },
    { step: 2, title: 'Power Dissipation', description: 'The power dissipated in a resistor can be derived by substituting Ohm\'s Law into the power equation P = V × I.', latex: 'P = V \\times I = I^2 R = \\frac{V^2}{R}', result: 'Power in watts (W)' },
    { step: 3, title: 'Energy Consumption', description: 'Energy is the product of power and time. For electrical billing, energy is measured in kilowatt-hours (kWh).', latex: 'E = P \\times t = V \\times I \\times t \\quad [\\text{Joules}]', result: 'Energy = Power × Time' },
  ],
  resistor: [
    { step: 1, title: 'Band Value Decode', description: 'Each color band on a resistor represents a digit or multiplier per the IEC 60062 standard.', latex: 'R = (\\text{Band}_1 \\times 10 + \\text{Band}_2) \\times \\text{Multiplier}', result: 'Nominal resistance in Ω' },
    { step: 2, title: 'Tolerance Range', description: 'The tolerance band determines the acceptable range around the nominal value.', latex: 'R_{\\text{min}} = R \\times (1 - \\frac{\\text{tol}}{100}), \\quad R_{\\text{max}} = R \\times (1 + \\frac{\\text{tol}}{100})' },
  ],
  power: [
    { step: 1, title: 'Current from Power', description: 'Given power and voltage, current is determined by rearranging P = VI.', latex: 'I = \\frac{P}{V}', result: 'Current in amperes (A)' },
    { step: 2, title: 'Resistance Calculation', description: 'Using Ohm\'s Law, resistance is derived from voltage and current.', latex: 'R = \\frac{V}{I} = \\frac{V^2}{P}', result: 'Resistance in ohms (Ω)' },
    { step: 3, title: 'Energy Cost Estimation', description: 'Daily energy usage in kWh multiplied by the utility rate gives the operating cost.', latex: 'C = \\frac{P \\times h}{1000} \\times \\text{rate}_{\\text{per kWh}}', result: 'Cost in ₹/day' },
  ],
  pythagorean: [
    { step: 1, title: 'Pythagorean Theorem', description: 'For a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.', latex: 'c = \\sqrt{a^2 + b^2}', result: 'Hypotenuse length' },
    { step: 2, title: 'Triangle Area', description: 'The area of a right triangle is half the product of the two perpendicular sides.', latex: 'A = \\frac{1}{2} \\times a \\times b' },
    { step: 3, title: 'Perimeter', description: 'The perimeter is the sum of all three sides.', latex: 'P = a + b + c' },
  ],
  ledresistor: [
    { step: 1, title: 'Voltage Drop Across Resistor', description: 'The resistor must drop the difference between supply voltage and LED forward voltage.', latex: 'V_R = V_{\\text{supply}} - V_{\\text{LED}}' },
    { step: 2, title: 'Required Resistance', description: 'Using Ohm\'s Law, the resistance needed to limit the LED current.', latex: 'R = \\frac{V_R}{I_{\\text{LED}}} = \\frac{V_{\\text{supply}} - V_{\\text{LED}}}{I_{\\text{LED}}}', result: 'Resistance in ohms' },
    { step: 3, title: 'Power Dissipation', description: 'The resistor must be rated to handle the power it dissipates.', latex: 'P_R = V_R \\times I_{\\text{LED}} = (V_{\\text{supply}} - V_{\\text{LED}}) \\times I_{\\text{LED}}' },
  ],
  voltdivider: [
    { step: 1, title: 'Voltage Divider Equation', description: 'Two resistors in series divide the input voltage proportionally.', latex: 'V_{\\text{out}} = V_{\\text{in}} \\times \\frac{R_2}{R_1 + R_2}' },
    { step: 2, title: 'Current Through Divider', description: 'The same current flows through both resistors (series circuit).', latex: 'I = \\frac{V_{\\text{in}}}{R_1 + R_2}' },
    { step: 3, title: 'Power Dissipation', description: 'Each resistor dissipates power proportional to its voltage drop.', latex: 'P_{R1} = \\frac{V_{\\text{in}}^2 \\times R_1}{(R_1 + R_2)^2}, \\quad P_{R2} = \\frac{V_{\\text{out}}^2}{R_2}' },
  ],
  batterylife: [
    { step: 1, title: 'Usable Capacity', description: 'Real battery capacity is reduced by discharge efficiency (typically 80-90%).', latex: 'C_{\\text{usable}} = C_{\\text{rated}} \\times \\frac{\\eta}{100}', result: 'Usable capacity in mAh' },
    { step: 2, title: 'Runtime Estimation', description: 'Divide usable capacity by the average current draw.', latex: 't = \\frac{C_{\\text{usable}}}{I_{\\text{draw}}} \\quad [\\text{hours}]' },
    { step: 3, title: 'Energy Content', description: 'Energy stored in a Li-Po cell (nominal 3.7V).', latex: 'E = C \\times V_{\\text{nom}} \\times 3.6 \\quad [\\text{Joules}]' },
  ],
  pcbtrace: [
    { step: 1, title: 'IPC-2221 Cross-Section Area', description: 'The minimum copper cross-section area is calculated from current capacity using the IPC-2221 standard.', latex: 'A = \\left(\\frac{I}{k \\times \\Delta T^{0.44}}\\right)^{\\frac{1}{0.725}} \\quad [\\text{mils}^2]', result: 'k = 0.048 (external), 0.024 (internal)' },
    { step: 2, title: 'Trace Width', description: 'Width is derived from area and copper thickness.', latex: 'W = \\frac{A}{t_{\\text{mils}}} \\quad [\\text{mils}]' },
    { step: 3, title: 'Safety Margin', description: 'IPC recommends a 50% safety margin on trace width for production tolerances.', latex: 'W_{\\text{safe}} = W \\times 1.5' },
  ],
  decibel: [
    { step: 1, title: 'Power Ratio', description: 'Decibels express the ratio of two power levels on a logarithmic scale.', latex: 'dB = 10 \\times \\log_{10}\\left(\\frac{P_2}{P_1}\\right)', result: 'Power ratio in dB' },
    { step: 2, title: 'Voltage Ratio', description: 'For voltage/amplitude quantities, the coefficient is 20 (since power ∝ V²).', latex: 'dB = 20 \\times \\log_{10}\\left(\\frac{V_2}{V_1}\\right)' },
    { step: 3, title: 'Inverse Conversion', description: 'Converting back from dB to a linear ratio.', latex: '\\text{ratio} = 10^{dB/10} \\text{ (power)}, \\quad 10^{dB/20} \\text{ (voltage)}' },
  ],
  antennalen: [
    { step: 1, title: 'Wavelength Calculation', description: 'Wavelength is the speed of light divided by frequency, adjusted for velocity factor.', latex: '\\lambda = \\frac{c}{f} \\times v_f = \\frac{299{,}792{,}458}{f_{\\text{Hz}}} \\times v_f' },
    { step: 2, title: 'Dipole Length', description: 'A half-wave dipole is the most common antenna configuration.', latex: 'L_{\\text{dipole}} = \\frac{\\lambda}{2}, \\quad L_{\\text{monopole}} = \\frac{\\lambda}{4}' },
  ],
  torque: [
    { step: 1, title: 'Torque Formula', description: 'Torque is the cross-product of force and moment arm, considering the angle of application.', latex: '\\tau = F \\times r \\times \\sin(\\theta)' },
    { step: 2, title: 'Unit Conversions', description: 'Common engineering unit conversions for torque.', latex: '1 \\text{ N·m} = 10.197 \\text{ kgf·cm} = 0.7376 \\text{ lbf·ft}' },
    { step: 3, title: 'Power from Torque', description: 'Rotational power is torque multiplied by angular velocity.', latex: 'P = \\tau \\times \\omega = \\tau \\times \\frac{2\\pi N}{60} \\quad [\\text{W}]' },
  ],
  beamload: [
    { step: 1, title: 'Reaction Forces (Simply Supported)', description: 'For a simply supported beam with UDL and point load, reactions are found by equilibrium.', latex: 'R_A = \\frac{wL}{2} + \\frac{P(L-a)}{L}, \\quad R_B = \\frac{wL}{2} + \\frac{Pa}{L}' },
    { step: 2, title: 'UDL Bending Moment', description: 'Maximum bending moment for a uniformly distributed load occurs at midspan.', latex: 'M_{\\text{UDL}} = \\frac{wL^2}{8}', result: 'Maximum moment at midspan' },
    { step: 3, title: 'Point Load Bending Moment', description: 'Bending moment from a point load at position a from the left support.', latex: 'M_{\\text{point}} = \\frac{P \\times a \\times (L-a)}{L}' },
    { step: 4, title: 'Maximum Deflection (UDL)', description: 'Maximum deflection at midspan for a simply supported beam under UDL, from beam theory.', latex: '\\delta_{\\max} = \\frac{5wL^4}{384EI}', result: 'Deflection in mm' },
    { step: 5, title: 'Design Check', description: 'Deflection must be within allowable limits per design codes.', latex: '\\delta_{\\text{allow}} = \\frac{L}{250} \\quad \\text{(AISC/Eurocode)}, \\quad \\frac{L}{325} \\quad \\text{(IS 800)}' },
  ],
  heatexchanger: [
    { step: 1, title: 'Heat Transfer Rate', description: 'The rate of heat transfer from the energy balance equation.', latex: 'Q = \\dot{m} \\times C_p \\times \\Delta T \\times \\varepsilon', result: 'Heat transfer in kW' },
    { step: 2, title: 'Log-Mean Temperature Difference', description: 'LMTD accounts for the changing temperature difference along the exchanger length.', latex: '\\Delta T_{\\text{LMTD}} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}' },
    { step: 3, title: 'Required Surface Area', description: 'From the fundamental heat exchanger design equation.', latex: 'A = \\frac{Q}{U \\times \\Delta T_{\\text{LMTD}}}', result: 'Area in m²' },
  ],
  fluidflow: [
    { step: 1, title: 'Flow Velocity', description: 'Velocity from volumetric flow rate and pipe cross-section area.', latex: 'v = \\frac{Q}{A} = \\frac{Q}{\\pi (D/2)^2}', result: 'Velocity in m/s' },
    { step: 2, title: 'Reynolds Number', description: 'Dimensionless number determining flow regime (laminar < 2300, turbulent > 4000).', latex: 'Re = \\frac{\\rho v D}{\\mu}' },
    { step: 3, title: 'Friction Factor', description: 'Laminar: Hagen-Poiseuille. Turbulent: Blasius correlation.', latex: 'f = \\begin{cases} \\frac{64}{Re} & Re < 2300 \\\\ 0.316 \\times Re^{-0.25} & Re > 4000 \\end{cases}' },
    { step: 4, title: 'Pressure Drop (Darcy-Weisbach)', description: 'Major head loss through the pipe length.', latex: '\\Delta P = f \\times \\frac{L}{D} \\times \\frac{\\rho v^2}{2}' },
  ],
  springforce: [
    { step: 1, title: "Hooke's Law", description: 'The restoring force of a spring is proportional to its displacement from equilibrium.', latex: 'F = k \\times x', result: 'Force in newtons (N)' },
    { step: 2, title: 'Potential Energy', description: 'The elastic potential energy stored in a compressed/stretched spring.', latex: 'PE = \\frac{1}{2} k x^2' },
    { step: 3, title: 'Natural Frequency', description: 'The natural oscillation frequency of a spring-mass system.', latex: 'f_n = \\frac{1}{2\\pi} \\sqrt{\\frac{k}{m}}, \\quad T = \\frac{1}{f_n}' },
  ],
  gearratio: [
    { step: 1, title: 'Gear Ratio', description: 'The ratio of the driven gear teeth to the driving gear teeth.', latex: 'GR = \\frac{N_{\\text{driven}}}{N_{\\text{driving}}}' },
    { step: 2, title: 'Output Speed', description: 'Output RPM is inversely proportional to the gear ratio.', latex: 'n_{\\text{out}} = \\frac{n_{\\text{in}}}{GR}' },
    { step: 3, title: 'Output Torque', description: 'Torque multiplication is proportional to gear ratio, reduced by efficiency.', latex: '\\tau_{\\text{out}} = \\tau_{\\text{in}} \\times GR \\times \\eta' },
    { step: 4, title: 'Power Conservation', description: 'Input power equals output power divided by efficiency.', latex: 'P_{\\text{in}} = \\tau_{\\text{in}} \\times \\frac{2\\pi n_{\\text{in}}}{60}, \\quad P_{\\text{out}} = P_{\\text{in}} \\times \\eta' },
  ],
  inverterbattery: [
    { step: 1, title: 'Inverter VA Rating', description: 'The inverter must handle the load with a power factor margin (typically 0.8).', latex: 'VA = \\frac{P_{\\text{load}}}{\\text{PF}} = \\frac{P_{\\text{load}}}{0.8}' },
    { step: 2, title: 'Battery Capacity', description: 'Required battery capacity based on backup hours and depth of discharge.', latex: 'C = \\frac{P_{\\text{load}} \\times t_{\\text{backup}}}{V_{\\text{batt}} \\times DoD}' },
  ],
  acbtu: [
    { step: 1, title: 'Base BTU Calculation', description: 'The base cooling load is calculated from room area at 25 BTU per square foot.', latex: 'BTU_{\\text{base}} = \\text{Area}_{\\text{sqft}} \\times 25' },
    { step: 2, title: 'Adjustment Factors', description: 'Additional heat loads from height, sun exposure, and occupants.', latex: 'BTU_{\\text{total}} = BTU_{\\text{base}} + BTU_{\\text{height}} + BTU_{\\text{sun}} + (n_{\\text{people}} - 1) \\times 600' },
    { step: 3, title: 'Tonnage Conversion', description: 'Convert BTU/hr to tons of refrigeration.', latex: '\\text{Tons} = \\frac{BTU_{\\text{total}}}{12{,}000}' },
  ],
  pipeflow: [
    { step: 1, title: 'Pipe Cross-Section', description: 'Calculate the internal area from pipe diameter.', latex: 'A = \\pi \\left(\\frac{D}{2}\\right)^2' },
    { step: 2, title: 'Reynolds Number', description: 'Determines laminar (< 2300), transitional, or turbulent (> 4000) flow.', latex: 'Re = \\frac{\\rho \\times v \\times D}{\\mu}' },
    { step: 3, title: 'Darcy-Weisbach Equation', description: 'Pressure drop calculation for pipe flow.', latex: '\\Delta P = f \\times \\frac{L}{D} \\times \\frac{\\rho v^2}{2}' },
  ],
  threephase: [
    { step: 1, title: 'Three-Phase Power', description: 'Active power in a balanced three-phase system.', latex: 'P = \\sqrt{3} \\times V_L \\times I_L \\times \\cos\\phi', result: 'Active power in kW' },
    { step: 2, title: 'Phase Voltage', description: 'The relationship between line and phase voltage in a star (Y) connection.', latex: 'V_{\\text{phase}} = \\frac{V_{\\text{line}}}{\\sqrt{3}}' },
    { step: 3, title: 'Power Triangle', description: 'Apparent, active, and reactive power form a right triangle.', latex: 'S = \\sqrt{P^2 + Q^2}, \\quad Q = S \\times \\sin(\\cos^{-1}(\\text{PF}))' },
  ],
  transformer: [
    { step: 1, title: 'Turns Ratio', description: 'The voltage ratio equals the turns ratio in an ideal transformer.', latex: '\\frac{V_p}{V_s} = \\frac{N_p}{N_s} = a \\quad \\text{(turns ratio)}' },
    { step: 2, title: 'Current Relationship', description: 'Power conservation gives the inverse current relationship.', latex: 'V_p I_p = V_s I_s \\implies I_s = I_p \\times a' },
    { step: 3, title: 'Efficiency & Losses', description: 'Real transformer efficiency accounts for core and copper losses.', latex: 'P_{\\text{out}} = P_{\\text{in}} \\times \\frac{\\eta}{100}, \\quad P_{\\text{loss}} = P_{\\text{in}} - P_{\\text{out}}' },
  ],
  motorsize: [
    { step: 1, title: 'Mechanical Power', description: 'Power required from the torque and speed relationship.', latex: 'P_{\\text{mech}} = \\frac{\\tau \\times N}{9550} \\quad [\\text{kW}]', result: 'Base mechanical power' },
    { step: 2, title: 'Safety Factor', description: 'Apply a safety factor (typically 1.15-1.25) to account for starting torque and overloads.', latex: 'P_{\\text{req}} = P_{\\text{mech}} \\times SF' },
    { step: 3, title: 'Current Estimation', description: 'Estimate line current for motor selection.', latex: 'I = \\frac{P \\times 1000}{\\sqrt{3} \\times V \\times \\text{PF} \\times \\eta}' },
  ],
  resistorDecode: [
    { step: 1, title: 'Band Decoding', description: 'Each color represents a digit value per IEC 60062 standard.', latex: 'R = (d_1 \\times 10 + d_2) \\times M' },
    { step: 2, title: 'Tolerance Band', description: 'The tolerance percentage defines the acceptable resistance range.', latex: 'R_{\\text{range}} = R \\pm \\frac{\\text{tol\\%}}{100} \\times R' },
  ],
};
