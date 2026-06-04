/* ═══════════════════════════════════════════════════
   Calc Labz — Material Property Database
   ~80 common engineering materials with mechanical,
   thermal, and electrical properties.
   ═══════════════════════════════════════════════════ */
import type { MaterialProperty, MaterialCategory } from '@/types/engineering';

export const MATERIALS_DB: MaterialProperty[] = [
  /* ── Structural Steels ──────────────────────── */
  { id: 'fe250', name: 'Fe 250 (Mild Steel)', category: 'structural-steel', grade: 'IS 2062 E250', standard: 'IS 2062', density: 7850, yieldStrength: 250, tensileStrength: 410, elasticModulus: 200, poissonsRatio: 0.3, thermalConductivity: 50, specificHeat: 480, thermalExpansion: 12 },
  { id: 'fe415', name: 'Fe 415 (TMT Rebar)', category: 'structural-steel', grade: 'IS 1786 Fe415', standard: 'IS 1786', density: 7850, yieldStrength: 415, tensileStrength: 485, elasticModulus: 200, poissonsRatio: 0.3 },
  { id: 'fe500', name: 'Fe 500 (TMT Rebar)', category: 'structural-steel', grade: 'IS 1786 Fe500', standard: 'IS 1786', density: 7850, yieldStrength: 500, tensileStrength: 545, elasticModulus: 200, poissonsRatio: 0.3 },
  { id: 's235', name: 'S235', category: 'structural-steel', grade: 'EN 10025', standard: 'Eurocode 3', density: 7850, yieldStrength: 235, tensileStrength: 360, elasticModulus: 210, poissonsRatio: 0.3, thermalConductivity: 50, specificHeat: 480, thermalExpansion: 12 },
  { id: 's275', name: 'S275', category: 'structural-steel', grade: 'EN 10025', standard: 'Eurocode 3', density: 7850, yieldStrength: 275, tensileStrength: 430, elasticModulus: 210, poissonsRatio: 0.3, thermalConductivity: 50, specificHeat: 480, thermalExpansion: 12 },
  { id: 's355', name: 'S355', category: 'structural-steel', grade: 'EN 10025', standard: 'Eurocode 3', density: 7850, yieldStrength: 355, tensileStrength: 510, elasticModulus: 210, poissonsRatio: 0.3, thermalConductivity: 50, specificHeat: 480, thermalExpansion: 12 },
  { id: 'a36', name: 'ASTM A36', category: 'structural-steel', grade: 'A36', standard: 'ASTM A36', density: 7850, yieldStrength: 250, tensileStrength: 400, elasticModulus: 200, poissonsRatio: 0.26, thermalConductivity: 51.9, specificHeat: 486, thermalExpansion: 11.7 },
  { id: 'a992', name: 'ASTM A992', category: 'structural-steel', grade: 'A992', standard: 'ASTM A992', density: 7850, yieldStrength: 345, tensileStrength: 450, elasticModulus: 200, poissonsRatio: 0.26, thermalConductivity: 51.9, specificHeat: 486, thermalExpansion: 11.7 },
  { id: 'a572-50', name: 'ASTM A572 Gr.50', category: 'structural-steel', grade: 'A572-50', standard: 'ASTM A572', density: 7850, yieldStrength: 345, tensileStrength: 450, elasticModulus: 200, poissonsRatio: 0.26 },

  /* ── Stainless Steels ───────────────────────── */
  { id: 'ss304', name: '304 Stainless Steel', category: 'stainless-steel', grade: '304 / 1.4301', standard: 'ASTM A240', density: 8000, yieldStrength: 215, tensileStrength: 505, elasticModulus: 193, poissonsRatio: 0.29, thermalConductivity: 16.2, specificHeat: 500, thermalExpansion: 17.3, electricalResistivity: 72 },
  { id: 'ss316', name: '316 Stainless Steel', category: 'stainless-steel', grade: '316 / 1.4401', standard: 'ASTM A240', density: 8000, yieldStrength: 205, tensileStrength: 515, elasticModulus: 193, poissonsRatio: 0.29, thermalConductivity: 16.3, specificHeat: 500, thermalExpansion: 15.9, electricalResistivity: 74 },
  { id: 'ss410', name: '410 Stainless Steel', category: 'stainless-steel', grade: '410 / 1.4006', standard: 'ASTM A240', density: 7740, yieldStrength: 275, tensileStrength: 450, elasticModulus: 200, poissonsRatio: 0.28, thermalConductivity: 24.9, specificHeat: 460, thermalExpansion: 9.9 },
  { id: 'ss430', name: '430 Stainless Steel', category: 'stainless-steel', grade: '430 / 1.4016', density: 7700, yieldStrength: 205, tensileStrength: 450, elasticModulus: 200, poissonsRatio: 0.28, thermalConductivity: 26.1, specificHeat: 460, thermalExpansion: 10.4 },

  /* ── Aluminum Alloys ────────────────────────── */
  { id: 'al6061t6', name: '6061-T6 Aluminum', category: 'aluminum', grade: '6061-T6', standard: 'ASTM B209', density: 2700, yieldStrength: 276, tensileStrength: 310, elasticModulus: 68.9, poissonsRatio: 0.33, thermalConductivity: 167, specificHeat: 896, thermalExpansion: 23.6, electricalResistivity: 4.0 },
  { id: 'al7075t6', name: '7075-T6 Aluminum', category: 'aluminum', grade: '7075-T6', standard: 'ASTM B209', density: 2810, yieldStrength: 503, tensileStrength: 572, elasticModulus: 71.7, poissonsRatio: 0.33, thermalConductivity: 130, specificHeat: 960, thermalExpansion: 23.4 },
  { id: 'al2024t3', name: '2024-T3 Aluminum', category: 'aluminum', grade: '2024-T3', standard: 'ASTM B209', density: 2780, yieldStrength: 345, tensileStrength: 483, elasticModulus: 73.1, poissonsRatio: 0.33, thermalConductivity: 121, specificHeat: 875, thermalExpansion: 23.2 },
  { id: 'al5052', name: '5052-H32 Aluminum', category: 'aluminum', grade: '5052-H32', standard: 'ASTM B209', density: 2680, yieldStrength: 193, tensileStrength: 228, elasticModulus: 70.3, poissonsRatio: 0.33, thermalConductivity: 138, specificHeat: 880, thermalExpansion: 23.8 },
  { id: 'al1100', name: '1100-H14 Aluminum', category: 'aluminum', grade: '1100-H14', density: 2710, yieldStrength: 117, tensileStrength: 124, elasticModulus: 68.9, poissonsRatio: 0.33, thermalConductivity: 222, specificHeat: 904, thermalExpansion: 23.6, electricalResistivity: 2.9 },

  /* ── Copper Alloys ──────────────────────────── */
  { id: 'c110', name: 'C110 Electrolytic Copper', category: 'copper', grade: 'C11000', standard: 'ASTM B152', density: 8940, yieldStrength: 69, tensileStrength: 221, elasticModulus: 117, poissonsRatio: 0.34, thermalConductivity: 388, specificHeat: 385, thermalExpansion: 16.5, electricalResistivity: 1.72 },
  { id: 'c260', name: 'C260 Cartridge Brass', category: 'copper', grade: 'C26000', standard: 'ASTM B36', density: 8530, yieldStrength: 124, tensileStrength: 338, elasticModulus: 110, poissonsRatio: 0.35, thermalConductivity: 120, specificHeat: 375, thermalExpansion: 19.9, electricalResistivity: 6.6 },
  { id: 'c510', name: 'C510 Phosphor Bronze', category: 'copper', grade: 'C51000', standard: 'ASTM B103', density: 8860, yieldStrength: 345, tensileStrength: 517, elasticModulus: 110, poissonsRatio: 0.34, thermalConductivity: 69, specificHeat: 380, thermalExpansion: 17.8 },
  { id: 'c360', name: 'C360 Free-Cutting Brass', category: 'copper', grade: 'C36000', density: 8500, yieldStrength: 138, tensileStrength: 338, elasticModulus: 97, poissonsRatio: 0.34, thermalConductivity: 115, specificHeat: 380, thermalExpansion: 20.5 },

  /* ── Concrete ────────────────────────────────── */
  { id: 'm15', name: 'M15 Concrete', category: 'concrete', grade: 'M15', standard: 'IS 456', density: 2400, tensileStrength: 1.6, elasticModulus: 22.4, poissonsRatio: 0.15, thermalConductivity: 1.7, specificHeat: 880, thermalExpansion: 10 },
  { id: 'm20', name: 'M20 Concrete', category: 'concrete', grade: 'M20', standard: 'IS 456', density: 2400, tensileStrength: 1.85, elasticModulus: 25, poissonsRatio: 0.15, thermalConductivity: 1.7, specificHeat: 880, thermalExpansion: 10 },
  { id: 'm25', name: 'M25 Concrete', category: 'concrete', grade: 'M25', standard: 'IS 456', density: 2400, tensileStrength: 2.1, elasticModulus: 25, poissonsRatio: 0.15, thermalConductivity: 1.7, specificHeat: 880, thermalExpansion: 10 },
  { id: 'm30', name: 'M30 Concrete', category: 'concrete', grade: 'M30', standard: 'IS 456', density: 2400, tensileStrength: 2.3, elasticModulus: 27.4, poissonsRatio: 0.15, thermalConductivity: 1.7, specificHeat: 880, thermalExpansion: 10 },
  { id: 'm35', name: 'M35 Concrete', category: 'concrete', grade: 'M35', standard: 'IS 456', density: 2400, tensileStrength: 2.5, elasticModulus: 29.6, poissonsRatio: 0.15 },
  { id: 'm40', name: 'M40 Concrete', category: 'concrete', grade: 'M40', standard: 'IS 456', density: 2400, tensileStrength: 2.65, elasticModulus: 31.6, poissonsRatio: 0.15 },
  { id: 'm45', name: 'M45 Concrete', category: 'concrete', grade: 'M45', standard: 'IS 456', density: 2450, tensileStrength: 2.8, elasticModulus: 33.5, poissonsRatio: 0.15 },
  { id: 'm50', name: 'M50 Concrete', category: 'concrete', grade: 'M50', standard: 'IS 456', density: 2450, tensileStrength: 2.9, elasticModulus: 35.4, poissonsRatio: 0.15 },
  { id: 'm60', name: 'M60 Concrete', category: 'concrete', grade: 'M60', standard: 'IS 456', density: 2500, tensileStrength: 3.1, elasticModulus: 38.7, poissonsRatio: 0.15 },

  /* ── Timber ──────────────────────────────────── */
  { id: 'teak', name: 'Teak', category: 'timber', standard: 'IS 883', density: 650, tensileStrength: 98, elasticModulus: 12.6, thermalConductivity: 0.17, specificHeat: 1670, thermalExpansion: 4.5 },
  { id: 'sal', name: 'Sal (Shorea robusta)', category: 'timber', standard: 'IS 883', density: 880, tensileStrength: 135, elasticModulus: 12.6, thermalConductivity: 0.17, specificHeat: 1670, thermalExpansion: 4.5 },
  { id: 'deodar', name: 'Deodar (Cedrus deodara)', category: 'timber', standard: 'IS 883', density: 560, tensileStrength: 58, elasticModulus: 9.6, thermalConductivity: 0.12, specificHeat: 1700, thermalExpansion: 4.5 },
  { id: 'pine', name: 'Pine (Pinus)', category: 'timber', density: 530, tensileStrength: 50, elasticModulus: 12, thermalConductivity: 0.12, specificHeat: 1700, thermalExpansion: 5 },
  { id: 'oak', name: 'Oak', category: 'timber', density: 700, tensileStrength: 75, elasticModulus: 12.3, thermalConductivity: 0.17, specificHeat: 1670, thermalExpansion: 5 },

  /* ── Plastics ────────────────────────────────── */
  { id: 'abs', name: 'ABS', category: 'plastic', density: 1050, yieldStrength: 43, tensileStrength: 44, elasticModulus: 2.3, poissonsRatio: 0.35, thermalConductivity: 0.17, specificHeat: 1400, thermalExpansion: 90 },
  { id: 'hdpe', name: 'HDPE', category: 'plastic', density: 950, yieldStrength: 28, tensileStrength: 31, elasticModulus: 1.1, poissonsRatio: 0.41, thermalConductivity: 0.44, specificHeat: 1900, thermalExpansion: 130 },
  { id: 'nylon6', name: 'Nylon 6', category: 'plastic', density: 1140, yieldStrength: 70, tensileStrength: 79, elasticModulus: 2.8, poissonsRatio: 0.39, thermalConductivity: 0.25, specificHeat: 1700, thermalExpansion: 80 },
  { id: 'polycarbonate', name: 'Polycarbonate', category: 'plastic', density: 1200, yieldStrength: 62, tensileStrength: 66, elasticModulus: 2.4, poissonsRatio: 0.37, thermalConductivity: 0.2, specificHeat: 1200, thermalExpansion: 66 },
  { id: 'pvc', name: 'PVC (Rigid)', category: 'plastic', density: 1400, yieldStrength: 45, tensileStrength: 52, elasticModulus: 3.3, poissonsRatio: 0.38, thermalConductivity: 0.16, specificHeat: 900, thermalExpansion: 70 },
  { id: 'ptfe', name: 'PTFE (Teflon)', category: 'plastic', density: 2170, yieldStrength: 14, tensileStrength: 25, elasticModulus: 0.5, poissonsRatio: 0.46, thermalConductivity: 0.25, specificHeat: 1050, thermalExpansion: 135 },
  { id: 'acetal', name: 'Acetal (POM)', category: 'plastic', density: 1410, yieldStrength: 65, tensileStrength: 70, elasticModulus: 2.9, poissonsRatio: 0.37, thermalConductivity: 0.31, specificHeat: 1460, thermalExpansion: 110 },

  /* ── Composites ──────────────────────────────── */
  { id: 'cfrp', name: 'Carbon Fiber (CFRP)', category: 'composite', density: 1600, tensileStrength: 1500, elasticModulus: 150, poissonsRatio: 0.27, thermalConductivity: 7, specificHeat: 800, thermalExpansion: -0.5 },
  { id: 'gfrp', name: 'Glass Fiber (GFRP)', category: 'composite', density: 2000, tensileStrength: 600, elasticModulus: 40, poissonsRatio: 0.25, thermalConductivity: 0.4, specificHeat: 850, thermalExpansion: 14 },
];

const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  'structural-steel': 'Structural Steel',
  'stainless-steel': 'Stainless Steel',
  'aluminum': 'Aluminum Alloys',
  'copper': 'Copper Alloys',
  'concrete': 'Concrete',
  'timber': 'Timber',
  'plastic': 'Plastics',
  'composite': 'Composites',
};

/**
 * Get all materials grouped by category.
 */
export function getMaterialsByCategory(): Record<string, MaterialProperty[]> {
  const grouped: Record<string, MaterialProperty[]> = {};
  for (const mat of MATERIALS_DB) {
    const label = CATEGORY_LABELS[mat.category] || mat.category;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(mat);
  }
  return grouped;
}

/**
 * Search materials by name, grade, or standard.
 */
export function searchMaterials(query: string): MaterialProperty[] {
  const q = query.toLowerCase().trim();
  if (!q) return MATERIALS_DB;
  return MATERIALS_DB.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.grade?.toLowerCase().includes(q) ||
      m.standard?.toLowerCase().includes(q) ||
      m.category.includes(q)
  );
}

/**
 * Get material by ID.
 */
export function getMaterial(id: string): MaterialProperty | undefined {
  return MATERIALS_DB.find((m) => m.id === id);
}

export { CATEGORY_LABELS };
