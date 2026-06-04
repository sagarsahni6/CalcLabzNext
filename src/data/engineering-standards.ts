/* ═══════════════════════════════════════════════════
   Calc Labz — Engineering Standards References
   Per-calculator mapping to AISC, ASME, IEC, NEC, etc.
   ═══════════════════════════════════════════════════ */
import type { EngineeringStandard } from '@/types/engineering';

export const ENGINEERING_STANDARDS: Record<string, EngineeringStandard[]> = {
  /* ── Structural / Mechanical ─────────────────── */
  beamload: [
    { code: 'AISC 360-22', section: 'Chapter F & L', title: 'Specification for Structural Steel Buildings', organization: 'AISC', description: 'Design of flexural members, deflection limits (L/240 to L/360), and serviceability criteria for steel beams.', url: 'https://www.aisc.org/publications/steel-construction-manual/' },
    { code: 'Eurocode 3 (EN 1993-1-1)', section: 'Section 7.2', title: 'Design of Steel Structures — General Rules', organization: 'Eurocode', description: 'European standard for beam deflection limits, load combinations, and resistance of cross-sections.', url: 'https://eurocodes.jrc.ec.europa.eu/' },
    { code: 'IS 800:2007', section: 'Clause 5.6', title: 'General Construction in Steel — Code of Practice', organization: 'IS', description: 'Indian standard for deflection limits (L/325 for beams carrying plaster), member design, and safety factors.', url: 'https://www.bis.gov.in/' },
  ],
  torque: [
    { code: 'ASME Y14.5-2018', title: 'Dimensioning and Tolerancing', organization: 'ASME', description: 'Standard for geometric dimensioning and tolerancing applicable to torque specifications on engineering drawings.', url: 'https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing' },
    { code: 'ISO 898-1', title: 'Mechanical Properties of Fasteners — Bolts, Screws, and Studs', organization: 'ASME', description: 'Bolt grade classifications (8.8, 10.9, 12.9) and proof load/torque relationships.', url: 'https://www.iso.org/standard/60610.html' },
  ],
  gearratio: [
    { code: 'AGMA 2001-D04', title: 'Fundamental Rating Factors and Calculation Methods for Involute Spur and Helical Gear Teeth', organization: 'AGMA', description: 'Gear tooth strength, pitting resistance, and service factor calculations for spur/helical gears.', url: 'https://www.agma.org/' },
    { code: 'ISO 6336', title: 'Calculation of Load Capacity of Spur and Helical Gears', organization: 'ASME', description: 'International standard for contact stress and bending stress in gear design.', url: 'https://www.iso.org/standard/63819.html' },
  ],
  springforce: [
    { code: 'IS 7906 (Part 1)', title: 'Helical Compression Springs — Design and Calculation', organization: 'IS', description: 'Indian standard for compression spring design, stress limits, and fatigue life calculations.', url: 'https://www.bis.gov.in/' },
    { code: 'EN 13906-1', title: 'Cylindrical Helical Springs — Calculation and Design', organization: 'Eurocode', description: 'European standard for spring design, covering compression, extension, and torsion springs.' },
  ],
  motorsize: [
    { code: 'IEC 60034-1', title: 'Rotating Electrical Machines — Rating and Performance', organization: 'IEC', description: 'Motor frame sizes, rated output, duty types, and temperature rise classifications.', url: 'https://webstore.iec.ch/en/publication/136' },
    { code: 'IS 325:1996', title: 'Three-Phase Induction Motors', organization: 'IS', description: 'Indian standard for motor specifications, efficiency classes, and performance requirements.' },
    { code: 'NEMA MG 1', title: 'Motors and Generators', organization: 'IEEE', description: 'NEMA motor frame sizes, design letters (A, B, C, D), and service factor guidelines.', url: 'https://www.nema.org/' },
  ],

  /* ── Electrical ──────────────────────────────── */
  ohmslaw: [
    { code: 'IEC 60364', section: 'Part 5-52', title: 'Low-Voltage Electrical Installations — Selection and Erection of Wiring Systems', organization: 'IEC', description: 'Cable sizing based on current-carrying capacity and voltage drop limits for low-voltage installations.', url: 'https://webstore.iec.ch/en/publication/1878' },
    { code: 'NEC Article 210', title: 'Branch Circuits', organization: 'NEC', description: 'Branch circuit ratings, conductor sizing, overcurrent protection for 15A, 20A, and 30A circuits.', url: 'https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70' },
    { code: 'IS 732:2019', title: 'Wiring of Electrical Installations', organization: 'IS', description: 'Indian standard for conductor selection, current ratings, and installation requirements.' },
  ],
  power: [
    { code: 'IEC 60364-5-52', title: 'Selection and Erection of Electrical Equipment — Wiring Systems', organization: 'IEC', description: 'Current-carrying capacity tables and derating factors for cable sizing based on power requirements.' },
    { code: 'NEC Article 220', title: 'Branch-Circuit, Feeder, and Service Load Calculations', organization: 'NEC', description: 'Standard and optional methods for calculating electrical load demand.' },
  ],
  threephase: [
    { code: 'IEC 60038', title: 'IEC Standard Voltages', organization: 'IEC', description: 'Standard voltage levels for three-phase systems (400V, 690V, 11kV, etc.).', url: 'https://webstore.iec.ch/en/publication/153' },
    { code: 'NEC Article 430', title: 'Motors, Motor Circuits, and Controllers', organization: 'NEC', description: 'Three-phase motor circuit conductor sizing, overcurrent protection, and disconnect requirements.' },
    { code: 'IS 12360:1988', title: 'Voltage Bands for Electrical Installations', organization: 'IS', description: 'Indian standard for permissible voltage variations in three-phase supply systems.' },
  ],
  voltdivider: [
    { code: 'IEC 60063', title: 'Preferred Number Series for Resistors and Capacitors', organization: 'IEC', description: 'E-series (E12, E24, E96) for selecting standard resistor values in voltage divider circuits.' },
  ],
  ledresistor: [
    { code: 'IEC 60063', title: 'Preferred Number Series for Resistors and Capacitors', organization: 'IEC', description: 'Standard resistor values (E-series) for selecting the closest available resistance to calculated value.' },
    { code: 'IEC 62031', title: 'LED Modules for General Lighting — Safety Specifications', organization: 'IEC', description: 'Safety requirements for LED modules including forward voltage and current specifications.' },
  ],
  resistor: [
    { code: 'IEC 60062', title: 'Marking Codes for Resistors and Capacitors', organization: 'IEC', description: 'Color band coding standard for through-hole resistors (4-band, 5-band, 6-band systems).' },
  ],
  resistorDecode: [
    { code: 'IEC 60062', title: 'Marking Codes for Resistors and Capacitors', organization: 'IEC', description: 'Official color band coding standard defining digit values, multipliers, and tolerance bands.' },
  ],
  pcbtrace: [
    { code: 'IPC-2221B', section: 'Section 6.2', title: 'Generic Standard on Printed Board Design', organization: 'IPC', description: 'Minimum conductor width calculations based on current capacity, temperature rise, and copper weight.', url: 'https://www.ipc.org/ipc-2221b' },
    { code: 'IPC-2152', title: 'Standard for Determining Current-Carrying Capacity in Printed Board Design', organization: 'IPC', description: 'Updated current-temperature relationships superseding older IPC-2221 charts for improved accuracy.', url: 'https://www.ipc.org/' },
  ],
  decibel: [
    { code: 'IEC 61672-1', title: 'Electroacoustics — Sound Level Meters', organization: 'IEC', description: 'Standards for sound measurement instruments, frequency weighting (A, C, Z), and time weighting.' },
  ],
  antennalen: [
    { code: 'ITU-R P.525', title: 'Free-Space Attenuation', organization: 'IEC', description: 'ITU recommendation for calculating free-space path loss and wavelength-frequency relationships.' },
    { code: 'IEEE 145-2013', title: 'Standard for Definitions of Terms for Antennas', organization: 'IEEE', description: 'Standardized antenna terminology including gain, directivity, VSWR, and bandwidth definitions.' },
  ],
  transformer: [
    { code: 'IEC 60076-1', title: 'Power Transformers — General', organization: 'IEC', description: 'International standard for transformer rating, testing, and performance specifications.', url: 'https://webstore.iec.ch/en/publication/594' },
    { code: 'IS 2026 (Part 1)', title: 'Power Transformers — General', organization: 'IS', description: 'Indian standard for transformer design, ratings, insulation levels, and test procedures.' },
    { code: 'IEEE C57.12.00', title: 'General Requirements for Liquid-Immersed Distribution, Power, and Regulating Transformers', organization: 'IEEE', description: 'ANSI/IEEE standard covering transformer ratings, temperature limits, and efficiency requirements.' },
  ],
  batterylife: [
    { code: 'IEC 61960', title: 'Secondary Lithium Cells and Batteries for Portable Applications', organization: 'IEC', description: 'Testing standards for Li-ion/LiPo battery capacity, cycle life, and safety requirements.' },
    { code: 'IEC 62133-2', title: 'Safety Requirements for Portable Sealed Secondary Cells', organization: 'IEC', description: 'Safety testing standards for lithium batteries in consumer electronics.' },
  ],
  inverterbattery: [
    { code: 'IS 1651:1991', title: 'Lead-Acid Storage Batteries for Stationary Service', organization: 'IS', description: 'Indian standard for tubular and flat plate battery specifications used in home inverter systems.' },
    { code: 'IEC 62040-1', title: 'UPS Systems — General and Safety Requirements', organization: 'IEC', description: 'International standard for uninterruptible power supply performance, efficiency, and battery sizing.' },
  ],

  /* ── Thermal / Fluid ─────────────────────────── */
  heatexchanger: [
    { code: 'ASME BPVC Section VIII', title: 'Boiler and Pressure Vessel Code — Pressure Vessels', organization: 'ASME', description: 'Design rules for pressure vessels including shell-and-tube heat exchangers, covering allowable stress, wall thickness, and joint efficiencies.', url: 'https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-for-construction-of-pressure-vessels-division-1' },
    { code: 'TEMA Standards', section: '9th Edition', title: 'Standards of the Tubular Exchanger Manufacturers Association', organization: 'TEMA', description: 'Classification (R, C, B), baffle design, tube pitch, and fouling factor guidelines for shell-and-tube heat exchangers.', url: 'https://www.tema.org/' },
  ],
  fluidflow: [
    { code: 'ASME B31.1', title: 'Power Piping', organization: 'ASME', description: 'Design and construction of power piping systems, including velocity limits and pressure drop calculations.', url: 'https://www.asme.org/codes-standards/find-codes-standards/b31-1-power-piping' },
    { code: 'ASME B31.3', title: 'Process Piping', organization: 'ASME', description: 'Design standards for process piping including petroleum, chemical, and pharmaceutical plants.' },
    { code: 'IS 2062:2011', title: 'Hot Rolled Low and Medium Tensile Structural Steel', organization: 'IS', description: 'Indian standard for pipe material grades and properties used in fluid transport systems.' },
  ],
  pipeflow: [
    { code: 'ASME B31.1', title: 'Power Piping', organization: 'ASME', description: 'Pipe sizing, velocity limits (3 m/s for water), and pressure drop calculation methodology.' },
    { code: 'Eurocode 1 (EN 1991-4)', section: 'Part 4', title: 'Actions on Structures — Actions in Silos and Tanks', organization: 'Eurocode', description: 'European standard for fluid pressure loads on piping structures and containment systems.' },
  ],
  acbtu: [
    { code: 'ASHRAE 90.1', title: 'Energy Standard for Buildings', organization: 'ASHRAE', description: 'HVAC load calculation methodology, equipment efficiency requirements (SEER, EER), and building envelope criteria.', url: 'https://www.ashrae.org/technical-resources/ashrae-standards-and-guidelines' },
    { code: 'IS 3103:1975', title: 'Code of Practice for Industrial Ventilation', organization: 'IS', description: 'Indian standard for ventilation and air conditioning load calculations for tropical climates.' },
    { code: 'ISHRAE Standard', title: 'Indian Society of Heating, Refrigerating and Air Conditioning Engineers', organization: 'ASHRAE', description: 'Indian HVAC guidelines for cooling load estimation, indoor air quality, and energy efficiency.' },
  ],

  /* ── Math / Science (non-engineering but included for completeness) ── */
  pythagorean: [
    { code: 'Euclidean Geometry', title: 'Elements — Book I, Proposition 47', organization: 'ASME', description: 'The fundamental theorem of plane geometry relating the sides of right-angled triangles, attributed to Pythagoras (c. 570–495 BCE).' },
  ],
};

/**
 * Get standards for a given calculator ID.
 * Returns empty array if no standards are mapped.
 */
export function getStandards(calcId: string): EngineeringStandard[] {
  return ENGINEERING_STANDARDS[calcId] ?? [];
}
