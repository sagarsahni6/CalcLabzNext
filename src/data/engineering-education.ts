/* ═══════════════════════════════════════════════════
   Calc Labz — Engineering Educational Content
   Theory, applications, examples, and FAQs per calc.
   ═══════════════════════════════════════════════════ */

interface EducationContent {
  theory: string;
  applications: string[];
  examples: { title: string; steps: string[] }[];
  faqs: { q: string; a: string }[];
}

export const ENGINEERING_EDUCATION: Record<string, EducationContent> = {
  ohmslaw: {
    theory: `Ohm's Law is the foundational principle of electrical engineering, discovered by Georg Simon Ohm in 1827. It establishes a linear relationship between voltage (V), current (I), and resistance (R) in a conductor. The law states that current flowing through a conductor is directly proportional to the voltage applied across it and inversely proportional to its resistance, expressed as V = IR.\n\nThis relationship holds for "ohmic" conductors — materials where resistance remains constant regardless of the applied voltage. Common examples include most metals and alloys at constant temperature. Non-ohmic devices like diodes, LEDs, and transistors have non-linear V-I characteristics and require more complex models.`,
    applications: [
      'Circuit design — determining required resistance for LED current limiting, voltage regulation, and biasing circuits',
      'Power distribution — calculating voltage drop in long cables and wire gauge selection per NEC/IEC standards',
      'Troubleshooting — measuring voltage and current to diagnose faulty components in electrical systems',
      'Sensor conditioning — designing resistive sensor circuits (thermistors, strain gauges, potentiometers)',
      'Safety analysis — calculating fault currents and sizing overcurrent protection devices',
    ],
    examples: [
      { title: '12V LED Circuit Design', steps: ['LED forward voltage: 2V, desired current: 20mA', 'Voltage across resistor: V_R = 12V - 2V = 10V', 'Required resistance: R = V_R / I = 10 / 0.02 = 500Ω', 'Nearest standard value: 470Ω (E24 series)', 'Power dissipation: P = 10² / 470 = 0.21W → use ¼W resistor'] },
      { title: 'Cable Voltage Drop', steps: ['100m cable run, 10A load, copper 2.5mm² cable', 'Cable resistance: R = ρL/A = 1.72×10⁻⁸ × 200 / 2.5×10⁻⁶ = 1.376Ω', 'Voltage drop: V = IR = 10 × 1.376 = 13.76V', 'Percentage drop: 13.76 / 230 × 100 = 5.98% — exceeds 5% NEC limit', 'Solution: Upgrade to 4mm² cable (drop = 3.74%)'] },
    ],
    faqs: [
      { q: 'Does Ohm\'s Law apply to AC circuits?', a: 'In AC circuits, Ohm\'s Law uses impedance (Z) instead of resistance: V = IZ. Impedance includes both resistance and reactance (from capacitors and inductors), and is frequency-dependent.' },
      { q: 'Why doesn\'t Ohm\'s Law work for semiconductors?', a: 'Semiconductors like diodes and transistors are non-ohmic — their resistance changes with applied voltage. A diode has near-infinite resistance below its forward voltage (~0.7V for silicon) and very low resistance above it.' },
      { q: 'How does temperature affect resistance?', a: 'Most metals have a positive temperature coefficient — resistance increases with temperature. This is described by R(T) = R₀(1 + α·ΔT), where α is the temperature coefficient (0.004/°C for copper).' },
      { q: 'What is the difference between resistance and impedance?', a: 'Resistance (R) is the opposition to DC current flow and is purely real. Impedance (Z) is the total opposition in AC circuits, combining resistance and reactance into a complex number Z = R + jX.' },
      { q: 'How do I choose the right resistor wattage?', a: 'Calculate power dissipation P = I²R or P = V²/R. Choose a resistor rated at least 2× the calculated power for reliability. For example, if P = 0.15W, use a ¼W (0.25W) rated resistor.' },
    ],
  },

  beamload: {
    theory: `Beam load analysis is fundamental to structural engineering, covering the calculation of internal forces (shear, bending moment) and deformations (deflection, slope) in structural members subjected to external loads. The Euler-Bernoulli beam theory, developed in the 18th century, provides the mathematical framework for analyzing beams where the cross-section remains plane and perpendicular to the neutral axis during bending.\n\nFor simply supported beams — the most common configuration — the analysis begins with equilibrium equations (ΣF = 0, ΣM = 0) to find support reactions, followed by integration of the beam equation EI·d⁴y/dx⁴ = w(x) to determine deflection. Design codes (AISC 360, Eurocode 3, IS 800) specify allowable deflection limits (typically L/250 to L/360) to prevent damage to finishes, partitions, and connected elements.`,
    applications: [
      'Building design — sizing floor beams, roof purlins, and lintels for residential and commercial structures',
      'Bridge engineering — analyzing deck girders, cross-beams, and suspension cable forces',
      'Crane and hoist design — calculating beam deflection under moving loads for runway girders',
      'Machine frame design — ensuring stiffness of CNC machine beds, press frames, and assembly fixtures',
      'Formwork design — temporary support structures for concrete placement during construction',
    ],
    examples: [
      { title: 'Floor Beam Design (UDL)', steps: ['Span: L = 6m, UDL: w = 15 kN/m', 'Reactions: R_A = R_B = wL/2 = 15×6/2 = 45 kN', 'Max moment: M = wL²/8 = 15×6²/8 = 67.5 kN·m', 'Max deflection: δ = 5wL⁴/384EI = 5×15×6⁴/384×200×10³×8450×10⁻⁸ = 12.3mm', 'Check: δ/L = 12.3/6000 = L/488 < L/250 ✓ (AISC compliant)'] },
      { title: 'Cantilever Beam with Point Load', steps: ['Length: L = 3m, Point load at tip: P = 10 kN', 'Max moment at fixed end: M = PL = 10×3 = 30 kN·m', 'Max deflection at tip: δ = PL³/3EI', 'For ISMB 200 (I = 2235 cm⁴): δ = 10000×3000³/(3×200000×2235×10⁴) = 20.1mm', 'L/δ = 3000/20.1 = L/149 — consider larger section'] },
    ],
    faqs: [
      { q: 'What is the difference between UDL and point load?', a: 'A Uniformly Distributed Load (UDL) acts over the entire span (e.g., self-weight, floor load), measured in kN/m. A point load acts at a single location (e.g., column reaction, concentrated equipment), measured in kN.' },
      { q: 'Why are deflection limits important?', a: 'Excessive deflection can crack plaster ceilings (L/360 limit), cause ponding on flat roofs, create misalignment in machinery, and give occupants an unsafe feeling. Different applications have different limits specified in design codes.' },
      { q: 'How do I determine the moment of inertia (I)?', a: 'The moment of inertia depends on the cross-section shape. For standard steel sections (ISMB, W-shapes, UB), values are tabulated in steel design manuals. For custom sections, I = Σ(bh³/12 + Ad²) using the parallel axis theorem.' },
      { q: 'What is the elastic modulus (E) for steel?', a: 'The elastic modulus for structural steel is approximately 200 GPa (200,000 MPa or 29,000 ksi), regardless of the steel grade. This value is used universally in structural calculations per AISC, Eurocode, and IS codes.' },
      { q: 'When should I use a cantilever vs simply supported beam?', a: 'Simply supported beams are more efficient for longer spans — max moment is wL²/8 vs wL²/2 for cantilevers. Cantilevers are used for balconies, canopies, and overhangs where support is only available at one end.' },
    ],
  },

  heatexchanger: {
    theory: `Heat exchanger design is based on the fundamental heat transfer equation Q = UAΔTₘ, where Q is the heat transfer rate, U is the overall heat transfer coefficient, A is the surface area, and ΔTₘ is the log-mean temperature difference (LMTD). The LMTD method accounts for the varying temperature difference along the heat exchanger length.\n\nThe overall heat transfer coefficient U depends on convection coefficients on both fluid sides and conduction through the tube wall: 1/U = 1/h₁ + t/k + 1/h₂ + Rf₁ + Rf₂, where Rf represents fouling resistances. Shell-and-tube exchangers are classified by TEMA standards into classes R (severe duty), C (moderate), and B (chemical service), each with specific design rules for baffle spacing, tube pitch, and material selection.`,
    applications: [
      'HVAC systems — heating/cooling coils in air handling units for building climate control',
      'Power plants — condensers, feedwater heaters, and cooling towers in Rankine cycle systems',
      'Chemical processing — reaction temperature control, product cooling, and heat recovery between process streams',
      'Oil & gas — crude oil coolers, gas compressor aftercoolers, and LNG vaporizers',
      'Food industry — pasteurization, sterilization, and product cooling in dairy and beverage processing',
    ],
    examples: [
      { title: 'Counter-Flow Water Heater', steps: ['Hot water: 90°C → 60°C, Cold water: 20°C → 50°C', 'ΔT₁ = 90-50 = 40°C, ΔT₂ = 60-20 = 40°C', 'LMTD = (40-40)/ln(40/40) = 40°C (equal ΔTs = arithmetic mean)', 'Q = ṁCpΔT = 2×4180×30 = 250.8 kW', 'Required area: A = Q/(U×LMTD) = 250800/(1500×40) = 4.18 m²'] },
    ],
    faqs: [
      { q: 'What is the difference between counter-flow and parallel-flow?', a: 'In counter-flow, fluids move in opposite directions, achieving a higher LMTD and better thermal efficiency. In parallel-flow, both fluids move in the same direction, resulting in a lower LMTD. Counter-flow is preferred for most applications.' },
      { q: 'What is fouling and how does it affect performance?', a: 'Fouling is the buildup of deposits (scale, biological growth, corrosion products) on heat transfer surfaces. It increases thermal resistance and pressure drop, reducing efficiency. TEMA provides recommended fouling factors for different fluids.' },
      { q: 'How do I select the overall heat transfer coefficient (U)?', a: 'U depends on both fluid types and flow conditions. Typical values: water-water ~1000-2500 W/m²K, water-oil ~150-350, gas-gas ~10-50, steam-water ~1500-4000. Use manufacturer data or Perry\'s Chemical Engineers\' Handbook.' },
    ],
  },

  fluidflow: {
    theory: `Fluid flow analysis combines the principles of conservation of mass (continuity equation), conservation of momentum (Navier-Stokes equations), and conservation of energy (Bernoulli's equation) to predict flow behavior in pipes and channels. The Reynolds number Re = ρvD/μ is the key dimensionless parameter that determines the flow regime: laminar (Re < 2300), transitional (2300-4000), or turbulent (Re > 4000).\n\nPressure drop in pipe systems is calculated using the Darcy-Weisbach equation: ΔP = f(L/D)(ρv²/2), where the friction factor f depends on the Reynolds number and pipe roughness. For laminar flow, f = 64/Re (Hagen-Poiseuille). For turbulent flow, the Colebrook equation or Moody chart is used. Minor losses from fittings (elbows, tees, valves) are added as equivalent lengths or K-factors.`,
    applications: [
      'Municipal water supply — pipeline sizing for distribution networks with required flow rates and pressure',
      'Industrial piping — process fluid transport in chemical, petrochemical, and pharmaceutical plants',
      'Fire protection — fire sprinkler system hydraulic calculations per NFPA 13',
      'HVAC systems — chilled water and condenser water piping for building cooling systems',
      'Irrigation — drip and sprinkler system design for agricultural water distribution',
    ],
    examples: [
      { title: 'Water Pipeline Sizing', steps: ['Flow rate: Q = 0.01 m³/s, Pipe: 100mm steel', 'Velocity: v = Q/A = 0.01/(π×0.05²) = 1.27 m/s', 'Reynolds number: Re = 1000×1.27×0.1/0.001 = 127,000 (turbulent)', 'Friction factor (Moody): f ≈ 0.018 for ε/D = 0.00045', 'Pressure drop: ΔP = 0.018×(100/0.1)×(1000×1.27²/2) = 14.5 kPa/100m'] },
    ],
    faqs: [
      { q: 'What velocity should I use for pipe sizing?', a: 'Recommended velocities: 1-2 m/s for water mains, 0.6-1.2 m/s for suction lines, up to 3 m/s for discharge pipes. Higher velocities cause erosion, noise, and water hammer. Lower velocities may cause sedimentation.' },
      { q: 'What is the Moody chart?', a: 'The Moody chart (or Moody diagram) plots the Darcy friction factor against Reynolds number for various pipe roughness ratios ε/D. It\'s the graphical solution to the Colebrook equation and is essential for turbulent flow pressure drop calculations.' },
    ],
  },

  threephase: {
    theory: `Three-phase power systems are the backbone of industrial and utility-scale electrical distribution. Three sinusoidal voltages, displaced by 120° (2π/3 radians), provide constant instantaneous power — unlike single-phase systems where power pulsates at twice the line frequency. This results in smoother mechanical power delivery, smaller conductors per unit power, and more efficient transformer utilization.\n\nIn a balanced three-phase system, the relationships between line and phase quantities depend on the connection: Star (Y) connection: V_line = √3 × V_phase; Delta (Δ) connection: I_line = √3 × I_phase. Total three-phase power is P = √3 × V_L × I_L × cos(φ), where cos(φ) is the power factor.`,
    applications: [
      'Industrial motors — powering 3-phase induction motors for pumps, compressors, and conveyor systems',
      'Power distribution — utility grid transmission at HV/EHV levels (11kV, 33kV, 132kV, 400kV)',
      'Variable frequency drives (VFDs) — motor speed control in HVAC, manufacturing, and process industries',
      'Welding equipment — high-current three-phase welding transformers for industrial fabrication',
      'Data centers — three-phase UPS systems and power distribution units (PDUs) for server racks',
    ],
    examples: [
      { title: 'Motor Power Calculation', steps: ['415V three-phase supply, 50Hz', 'Motor rated: 15 kW, PF = 0.85, η = 92%', 'Input power: P_in = 15/0.92 = 16.3 kW', 'Line current: I = P/(√3 × V × PF) = 16300/(√3 × 415 × 0.85) = 26.7A', 'Cable size per IS 732: 4mm² copper (30A rating)'] },
    ],
    faqs: [
      { q: 'What is the difference between Star and Delta connections?', a: 'Star (Y) provides a neutral point for single-phase loads, with V_line = √3 × V_phase. Delta (Δ) has no neutral, provides higher phase voltage, and is used for motors. Star is standard for distribution (415V/240V in India).' },
      { q: 'What causes low power factor and how to correct it?', a: 'Low PF is caused by inductive loads (motors, transformers, fluorescent lights). It\'s corrected by adding capacitor banks (KVAR compensation). Target PF > 0.9 to avoid utility penalties and reduce current/losses.' },
    ],
  },

  pcbtrace: {
    theory: `PCB trace width calculation determines the minimum conductor width needed to safely carry a given current without exceeding a specified temperature rise. The IPC-2221 standard provides empirical formulas derived from testing: the required cross-sectional area A = (I/(k × ΔT^0.44))^(1/0.725) in mils², where k = 0.048 for external layers and 0.024 for internal layers.\n\nThe newer IPC-2152 standard provides updated current-capacity relationships with correction factors for board thickness, ambient temperature, and copper plating thickness. For high-current designs, techniques like copper fills, thermal vias, and bus bars are used to supplement trace-based routing.`,
    applications: [
      'Power supply design — routing high-current traces from input connectors to voltage regulators',
      'Motor driver PCBs — H-bridge output traces handling motor stall currents (10-50A)',
      'LED driver boards — constant-current driver traces for high-power LED arrays',
      'Battery management systems — charge/discharge current paths in lithium battery packs',
      'Automotive electronics — PCB traces for 12V/24V systems with high inrush currents',
    ],
    examples: [
      { title: 'LED Driver Trace Width', steps: ['Current: 3A, copper thickness: 1oz (35µm), external layer', 'Temperature rise: 10°C above ambient', 'Area = (3/(0.048 × 10^0.44))^(1/0.725) = 82 mils²', 'Width = Area / thickness = 82/1.378 = 59.5 mils (1.51mm)', 'With 50% safety margin: 89 mils (2.26mm)'] },
    ],
    faqs: [
      { q: 'What copper weight should I use?', a: '1oz/ft² (35µm) is standard for most PCBs. 2oz (70µm) for power circuits. Heavy copper (3oz-10oz) for very high current applications like motor drivers and power supplies. Heavier copper increases cost and limits fine-pitch routing.' },
      { q: 'What is the minimum trace width for standard PCB fabrication?', a: 'Standard fabs support 6mil (0.15mm) minimum trace/space. Budget fabs may require 8-10mil minimum. Advanced processes can achieve 3-4mil for BGA breakout routing, but at higher cost.' },
    ],
  },

  transformer: {
    theory: `Transformer operation is based on Faraday's Law of electromagnetic induction: a changing magnetic flux through a coil induces an EMF proportional to the rate of flux change. In an ideal transformer, the voltage ratio equals the turns ratio: V₁/V₂ = N₁/N₂. Power conservation gives the current relationship: V₁I₁ = V₂I₂.\n\nReal transformers have losses: core losses (hysteresis and eddy currents, proportional to flux density and frequency) and copper losses (I²R in the windings). Efficiency η = P_out/(P_out + P_core + P_copper) typically ranges from 95-99% for power transformers. The equivalent circuit model includes magnetizing reactance, leakage reactance, and winding resistance for accurate performance prediction.`,
    applications: [
      'Power distribution — step-down transformers reducing utility voltage (11kV/33kV) to consumer voltage (415V/230V)',
      'Electronics — isolation transformers, SMPS transformers, and gate drive transformers',
      'Welding — high-current step-down transformers for arc and resistance welding',
      'Instrumentation — current transformers (CTs) and voltage transformers (VTs) for metering and protection',
      'Audio — impedance matching transformers for tube amplifiers and balanced audio interconnects',
    ],
    examples: [
      { title: 'Distribution Transformer Sizing', steps: ['Load: 200 kVA, input: 11kV, output: 415V', 'Turns ratio: a = 11000/415 = 26.5:1', 'Primary current: I₁ = 200000/(√3 × 11000) = 10.5A', 'Secondary current: I₂ = 200000/(√3 × 415) = 278A', 'At 98% efficiency: losses = 200 × 0.02 = 4 kW'] },
    ],
    faqs: [
      { q: 'What is the difference between step-up and step-down transformers?', a: 'A step-up transformer increases voltage (N₂ > N₁), used at power plants to raise voltage for long-distance transmission. A step-down transformer decreases voltage (N₂ < N₁), used at distribution substations near consumers.' },
      { q: 'Why is transformer core laminated?', a: 'Lamination breaks the core into thin insulated sheets to reduce eddy current losses. Without lamination, circulating currents induced in the core would cause significant heating and energy waste.' },
    ],
  },

  springforce: {
    theory: `Hooke's Law, formulated by Robert Hooke in 1678, states that the force required to extend or compress a spring is proportional to its displacement: F = kx, where k is the spring constant (stiffness) in N/m and x is the displacement from the equilibrium position. This linear relationship holds within the elastic limit of the spring material.\n\nThe elastic potential energy stored in a deformed spring is PE = ½kx², which is fundamental to understanding spring-mass systems, vibration isolation, and energy storage. The natural frequency of a spring-mass system is f_n = (1/2π)√(k/m), critical for avoiding resonance in mechanical design.`,
    applications: [
      'Automotive suspension — designing coil springs and leaf springs for vehicle ride quality and load capacity',
      'Valve mechanisms — return springs in engine valves, solenoid valves, and pressure relief valves',
      'Vibration isolation — mounting pads and spring isolators for machinery and sensitive equipment',
      'Mechanical watches — mainsprings and balance springs for timekeeping mechanisms',
      'Medical devices — compression springs in syringes, surgical instruments, and prosthetics',
    ],
    examples: [
      { title: 'Valve Return Spring', steps: ['Required force at full compression: F = 50N', 'Spring travel (compression): x = 15mm = 0.015m', 'Spring constant: k = F/x = 50/0.015 = 3333 N/m', 'Energy stored: PE = ½×3333×0.015² = 0.375 J', 'With 500g valve: f_n = (1/2π)√(3333/0.5) = 13 Hz'] },
    ],
    faqs: [
      { q: 'What happens when a spring exceeds its elastic limit?', a: 'Beyond the elastic limit, the spring undergoes permanent deformation (plastic deformation) and will not return to its original length. This is called "spring set" and reduces the effective spring rate and free length.' },
      { q: 'How do springs in series and parallel combine?', a: 'Springs in series: 1/k_total = 1/k₁ + 1/k₂ (softer). Springs in parallel: k_total = k₁ + k₂ (stiffer). This is analogous to resistors — but inverted (series = parallel for resistors).' },
    ],
  },

  gearratio: {
    theory: `Gear systems transmit power between rotating shafts, providing speed reduction (or increase) and torque multiplication (or reduction). The fundamental gear ratio is GR = N_driven/N_driving, where N is the number of teeth. For meshing gears, the pitch circles are tangent, ensuring a constant velocity ratio (fundamental law of gearing).\n\nTorque is amplified proportionally to the gear ratio: τ_out = τ_in × GR × η, where η is the mesh efficiency (typically 95-99% per stage for spur gears). Multi-stage gearboxes multiply individual stage ratios for large overall reductions: GR_total = GR₁ × GR₂ × ... × GRₙ. AGMA 2001 provides standardized methods for calculating gear tooth strength (bending stress) and surface durability (pitting resistance).`,
    applications: [
      'Automotive transmissions — multi-speed gearboxes matching engine torque-speed characteristics to wheel requirements',
      'Industrial gearboxes — speed reducers for conveyor drives, mixers, and rotary kilns',
      'Robotics — planetary gearboxes for high-ratio speed reduction in robot joints and actuators',
      'Wind turbines — speed-increasing gearboxes converting low-speed rotor (15 RPM) to generator speed (1500 RPM)',
      'Clock mechanisms — precision gear trains for accurate timekeeping and mechanical computation',
    ],
    examples: [
      { title: 'Conveyor Drive Gearbox', steps: ['Motor: 1440 RPM, 5.5 kW', 'Required conveyor speed: 72 RPM', 'Gear ratio: GR = 1440/72 = 20:1 (2-stage)', 'Input torque: τ = P×9550/N = 5.5×9550/1440 = 36.5 N·m', 'Output torque (95% eff per stage): τ_out = 36.5 × 20 × 0.95² = 659 N·m'] },
    ],
    faqs: [
      { q: 'What is a planetary gear system?', a: 'Planetary (epicyclic) gears use a sun gear, planet gears, and a ring gear in a compact arrangement. They provide high ratios in a small package, coaxial input/output, and the ability to achieve different ratios by holding different elements stationary.' },
      { q: 'How does gear ratio affect torque and speed?', a: 'A gear ratio of N:1 multiplies torque by N and reduces speed by N (minus efficiency losses). You can\'t get more torque without sacrificing speed — this is conservation of power: P = τω.' },
    ],
  },

  acbtu: {
    theory: `Air conditioning load calculation determines the cooling capacity needed to maintain desired indoor conditions. The total cooling load consists of sensible heat (temperature change) and latent heat (moisture removal). The base calculation uses room area, but practical sizing must account for solar heat gain, occupant heat (100W sensible + 50W latent per person), equipment loads, ventilation air, and building envelope characteristics.\n\nCooling capacity is measured in BTU/hr (British Thermal Units per hour) or tons of refrigeration (1 ton = 12,000 BTU/hr = 3.517 kW). ASHRAE 90.1 provides the standard methodology for commercial load calculations, while Manual J is used for residential applications.`,
    applications: [
      'Residential HVAC — sizing split AC units and window air conditioners for individual rooms',
      'Commercial buildings — central chiller plant sizing for office buildings, malls, and hospitals',
      'Server rooms — precision cooling for data centers with high heat density equipment',
      'Industrial ventilation — cooling for manufacturing floors, welding shops, and foundries',
      'Cold storage — refrigeration load calculations for food storage and pharmaceutical warehouses',
    ],
    examples: [
      { title: 'Bedroom AC Sizing', steps: ['Room: 12ft × 14ft = 168 sq.ft', 'Base load: 168 × 25 = 4200 BTU/hr', 'Sun-facing window adjustment: +1000 BTU/hr', '2 occupants: +600 BTU/hr', 'Total: 5800 BTU/hr → 0.48 tons → Select 0.75 ton (9000 BTU) unit'] },
    ],
    faqs: [
      { q: 'What is the difference between BTU and tons of AC?', a: '1 ton of refrigeration = 12,000 BTU/hr = 3.517 kW. Common residential units: 1 ton (12,000 BTU), 1.5 ton (18,000 BTU), 2 ton (24,000 BTU). "Ton" refers to the cooling effect of melting one ton of ice in 24 hours.' },
      { q: 'Should I size for exact load or go bigger?', a: 'Oversizing causes short-cycling (frequent on/off), poor humidity control, and wasted energy. It\'s best to size within 15-20% of calculated load. Undersizing is also problematic. Aim for the closest standard size above your calculated load.' },
    ],
  },

  voltdivider: {
    theory: `A voltage divider is a simple circuit with two series resistors that produces an output voltage as a fraction of the input voltage. The output voltage Vout = Vin × R2/(R1+R2) is determined by the resistor ratio, not the absolute values. However, the absolute values determine the quiescent current I = Vin/(R1+R2) and the divider's output impedance Zout = R1∥R2.\n\nFor the voltage divider to function accurately, the load impedance must be much greater than R2 (rule of thumb: Z_load > 10×R2). Loading effects reduce the output voltage below the calculated value. This is why voltage dividers are generally used only for signal-level applications (sensor biasing, ADC reference), not for power delivery.`,
    applications: [
      'Microcontroller ADC — scaling sensor voltages to match 3.3V or 5V ADC input range',
      'Battery voltage monitoring — dividing high battery voltage for low-voltage measurement circuits',
      'Biasing circuits — setting DC operating points for transistor amplifier stages',
      'Level shifting — interfacing between different logic voltage levels (5V to 3.3V)',
      'Potentiometers — variable voltage dividers for volume controls, tuning circuits, and calibration',
    ],
    examples: [
      { title: '12V Battery Monitor for 3.3V ADC', steps: ['Input: 12V max, ADC max: 3.3V', 'Ratio needed: 3.3/12 = 0.275', 'Choose R1 = 10kΩ, then R2 = R1 × 0.275/(1-0.275) = 3.79kΩ → use 3.9kΩ', 'Vout = 12 × 3900/(10000+3900) = 3.37V ≈ 3.3V ✓', 'Quiescent current: 12/(10000+3900) = 0.86mA — acceptable for battery use'] },
    ],
    faqs: [
      { q: 'Can I use a voltage divider as a power supply?', a: 'No. Voltage dividers have poor load regulation — the output voltage drops significantly with load current. They also waste power in the top resistor. Use a voltage regulator (LDO or switching) for power supply applications.' },
      { q: 'How do I minimize loading effects?', a: 'Use high-value resistors (100kΩ+) when driving high-impedance loads like op-amp inputs or MOSFET gates. For lower impedance loads, add a voltage follower (unity-gain buffer) after the divider.' },
    ],
  },

  torque: {
    theory: `Torque (τ) is the rotational equivalent of linear force, causing angular acceleration in rotating systems. Mathematically, τ = F × r × sin(θ), where F is the applied force, r is the moment arm (perpendicular distance from the axis of rotation), and θ is the angle between the force vector and the moment arm. Maximum torque occurs when force is applied perpendicular to the moment arm (θ = 90°).\n\nIn mechanical power transmission, torque and angular velocity are related by P = τ × ω = τ × (2πN/60), where N is RPM. This relationship is fundamental to motor selection, gearbox design, and drivetrain engineering. Torque is measured in N·m (SI), kgf·cm, or lbf·ft (imperial).`,
    applications: [
      'Fastener tightening — specifying torque values for bolted connections per grade (8.8, 10.9, 12.9)',
      'Engine design — calculating crankshaft torque, flywheel sizing, and drivetrain requirements',
      'Robotics — servo motor and actuator selection based on joint torque requirements',
      'Manufacturing — machining spindle torque for cutting force calculations',
      'Wind turbines — rotor torque from aerodynamic forces and generator reaction torque',
    ],
    examples: [
      { title: 'Motor Selection for Pump', steps: ['Required shaft torque: 120 N·m at 1450 RPM', 'Mechanical power: P = τ×2π×N/60 = 120×2π×1450/60 = 18.2 kW', 'With safety factor 1.15: P_motor = 18.2 × 1.15 = 20.9 kW', 'Select standard motor: 22 kW, 4-pole, 1450 RPM', 'Motor full-load torque: 22000×60/(2π×1450) = 144.8 N·m'] },
    ],
    faqs: [
      { q: 'What is the difference between torque and force?', a: 'Force causes linear motion (F = ma). Torque causes rotational motion (τ = Iα). Torque depends on both the force magnitude AND the distance from the rotation axis. A longer wrench provides more torque with the same force.' },
      { q: 'How do I convert between N·m, kgf·cm, and lbf·ft?', a: '1 N·m = 10.197 kgf·cm = 0.7376 lbf·ft. For quick conversion: multiply N·m by 10 to get approximate kgf·cm, or multiply by 0.74 to get approximate lbf·ft.' },
    ],
  },
};

/**
 * Get educational content for a calculator.
 * Returns null if no content is available.
 */
export function getEducation(calcId: string): EducationContent | null {
  return ENGINEERING_EDUCATION[calcId] ?? null;
}
