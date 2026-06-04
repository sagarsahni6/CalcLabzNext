/* ═══════════════════════════════════════════════════
   Calc Labz — Unit Conversion System
   Bidirectional conversion for engineering units.
   ═══════════════════════════════════════════════════ */
import type { UnitDefinition, UnitCategory } from '@/types/engineering';

/* ── Unit Definitions ──────────────────────────── */
const UNITS: Record<string, UnitDefinition> = {
  // Length
  mm:   { symbol: 'mm',   name: 'Millimeters',  category: 'length', toBase: 0.001 },
  cm:   { symbol: 'cm',   name: 'Centimeters',  category: 'length', toBase: 0.01 },
  m:    { symbol: 'm',    name: 'Meters',        category: 'length', toBase: 1 },
  km:   { symbol: 'km',   name: 'Kilometers',    category: 'length', toBase: 1000 },
  in:   { symbol: 'in',   name: 'Inches',        category: 'length', toBase: 0.0254 },
  ft:   { symbol: 'ft',   name: 'Feet',          category: 'length', toBase: 0.3048 },
  mil:  { symbol: 'mil',  name: 'Thousandths inch', category: 'length', toBase: 0.0000254 },

  // Force
  N:    { symbol: 'N',    name: 'Newtons',       category: 'force', toBase: 1 },
  kN:   { symbol: 'kN',   name: 'Kilonewtons',   category: 'force', toBase: 1000 },
  kgf:  { symbol: 'kgf',  name: 'Kilogram-force', category: 'force', toBase: 9.80665 },
  lbf:  { symbol: 'lbf',  name: 'Pound-force',   category: 'force', toBase: 4.44822 },

  // Pressure
  Pa:   { symbol: 'Pa',   name: 'Pascals',       category: 'pressure', toBase: 1 },
  kPa:  { symbol: 'kPa',  name: 'Kilopascals',   category: 'pressure', toBase: 1000 },
  MPa:  { symbol: 'MPa',  name: 'Megapascals',   category: 'pressure', toBase: 1e6 },
  GPa:  { symbol: 'GPa',  name: 'Gigapascals',   category: 'pressure', toBase: 1e9 },
  psi:  { symbol: 'psi',  name: 'PSI',           category: 'pressure', toBase: 6894.76 },
  bar:  { symbol: 'bar',  name: 'Bar',           category: 'pressure', toBase: 100000 },
  atm:  { symbol: 'atm',  name: 'Atmospheres',   category: 'pressure', toBase: 101325 },

  // Torque
  Nm:   { symbol: 'N·m',      name: 'Newton-meters',   category: 'torque', toBase: 1 },
  kgfcm:{ symbol: 'kgf·cm',   name: 'Kilogram-force-cm', category: 'torque', toBase: 0.0980665 },
  lbfft:{ symbol: 'lbf·ft',   name: 'Pound-force-feet', category: 'torque', toBase: 1.35582 },
  lbfin:{ symbol: 'lbf·in',   name: 'Pound-force-inch', category: 'torque', toBase: 0.112985 },

  // Power
  W:    { symbol: 'W',    name: 'Watts',         category: 'power', toBase: 1 },
  kW:   { symbol: 'kW',   name: 'Kilowatts',     category: 'power', toBase: 1000 },
  HP:   { symbol: 'HP',   name: 'Horsepower',    category: 'power', toBase: 745.7 },
  BTUhr:{ symbol: 'BTU/hr', name: 'BTU per hour', category: 'power', toBase: 0.29307 },

  // Flow
  m3s:  { symbol: 'm³/s',  name: 'Cubic m/s',    category: 'flow', toBase: 1 },
  Lmin: { symbol: 'L/min',  name: 'Liters/min',  category: 'flow', toBase: 1.66667e-5 },
  GPM:  { symbol: 'GPM',    name: 'Gallons/min', category: 'flow', toBase: 6.30902e-5 },
  CFM:  { symbol: 'CFM',    name: 'Cubic ft/min', category: 'flow', toBase: 4.71947e-4 },

  // Electrical
  V:    { symbol: 'V',    name: 'Volts',         category: 'electrical', toBase: 1 },
  mV:   { symbol: 'mV',   name: 'Millivolts',    category: 'electrical', toBase: 0.001 },
  kV:   { symbol: 'kV',   name: 'Kilovolts',     category: 'electrical', toBase: 1000 },
  A:    { symbol: 'A',    name: 'Amperes',       category: 'electrical', toBase: 1 },
  mA:   { symbol: 'mA',   name: 'Milliamps',     category: 'electrical', toBase: 0.001 },
  ohm:  { symbol: 'Ω',    name: 'Ohms',          category: 'electrical', toBase: 1 },
  kohm: { symbol: 'kΩ',   name: 'Kilohms',       category: 'electrical', toBase: 1000 },
  Mohm: { symbol: 'MΩ',   name: 'Megohms',       category: 'electrical', toBase: 1e6 },

  // Temperature (special case: offset-based)
  C:    { symbol: '°C',   name: 'Celsius',       category: 'temperature', toBase: 1, offset: 0 },
  F:    { symbol: '°F',   name: 'Fahrenheit',    category: 'temperature', toBase: 5 / 9, offset: -32 },
  K:    { symbol: 'K',    name: 'Kelvin',        category: 'temperature', toBase: 1, offset: -273.15 },

  // Area
  mm2:  { symbol: 'mm²',  name: 'Sq. Millimeters', category: 'area', toBase: 1e-6 },
  cm2:  { symbol: 'cm²',  name: 'Sq. Centimeters', category: 'area', toBase: 1e-4 },
  m2:   { symbol: 'm²',   name: 'Sq. Meters',      category: 'area', toBase: 1 },
  in2:  { symbol: 'in²',  name: 'Sq. Inches',      category: 'area', toBase: 6.4516e-4 },
  ft2:  { symbol: 'ft²',  name: 'Sq. Feet',        category: 'area', toBase: 0.092903 },

  // Mass
  g:    { symbol: 'g',    name: 'Grams',         category: 'mass', toBase: 0.001 },
  kg:   { symbol: 'kg',   name: 'Kilograms',     category: 'mass', toBase: 1 },
  lb:   { symbol: 'lb',   name: 'Pounds',        category: 'mass', toBase: 0.453592 },
  oz:   { symbol: 'oz',   name: 'Ounces',        category: 'mass', toBase: 0.0283495 },

  // Energy
  J:    { symbol: 'J',    name: 'Joules',        category: 'energy', toBase: 1 },
  kJ:   { symbol: 'kJ',   name: 'Kilojoules',    category: 'energy', toBase: 1000 },
  cal:  { symbol: 'cal',  name: 'Calories',      category: 'energy', toBase: 4.184 },
  kcal: { symbol: 'kcal', name: 'Kilocalories',  category: 'energy', toBase: 4184 },
  BTU:  { symbol: 'BTU',  name: 'BTU',           category: 'energy', toBase: 1055.06 },
  kWh:  { symbol: 'kWh',  name: 'Kilowatt-hours', category: 'energy', toBase: 3.6e6 },
};

/**
 * Convert a value between two units.
 * Temperature uses offset-based conversion; all others use multiplicative.
 */
export function convert(value: number, fromUnit: string, toUnit: string): number {
  const from = UNITS[fromUnit];
  const to = UNITS[toUnit];

  if (!from || !to) {
    throw new Error(`Unknown unit: ${fromUnit} or ${toUnit}`);
  }
  if (from.category !== to.category) {
    throw new Error(`Cannot convert between ${from.category} and ${to.category}`);
  }

  // Temperature special case
  if (from.category === 'temperature') {
    // Convert to Celsius first, then to target
    let celsius: number;
    if (fromUnit === 'C') celsius = value;
    else if (fromUnit === 'F') celsius = (value - 32) * (5 / 9);
    else if (fromUnit === 'K') celsius = value - 273.15;
    else celsius = (value + (from.offset || 0)) * from.toBase;

    if (toUnit === 'C') return celsius;
    if (toUnit === 'F') return celsius * (9 / 5) + 32;
    if (toUnit === 'K') return celsius + 273.15;
    return celsius / to.toBase - (to.offset || 0);
  }

  // Standard multiplicative conversion via SI base
  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}

/**
 * Get all units for a given category.
 */
export function getUnitsForCategory(category: UnitCategory): UnitDefinition[] {
  return Object.values(UNITS).filter((u) => u.category === category);
}

/**
 * Get all unit keys for a category.
 */
export function getUnitKeys(category: UnitCategory): string[] {
  return Object.entries(UNITS)
    .filter(([, u]) => u.category === category)
    .map(([key]) => key);
}

/**
 * Get a unit definition by key.
 */
export function getUnit(key: string): UnitDefinition | undefined {
  return UNITS[key];
}

/**
 * Format a converted value with the unit symbol.
 */
export function formatWithUnit(value: number, unitKey: string, decimals = 4): string {
  const unit = UNITS[unitKey];
  if (!unit) return `${value}`;

  // Smart precision: fewer decimals for large values
  const precision = Math.abs(value) >= 1000 ? Math.min(decimals, 2) : Math.abs(value) >= 1 ? Math.min(decimals, 3) : decimals;
  return `${value.toFixed(precision)} ${unit.symbol}`;
}

export { UNITS };
