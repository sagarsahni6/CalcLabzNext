/* ═══════════════════════════════════════════════════
   Calc Labz — Construction Calculations (Enhanced)
   28 calculators with charts, tips & enriched logic
   ═══════════════════════════════════════════════════ */
import { CalcFunction } from '@/types/calculator';

/* ── 1. Concrete Calculator ──────────────────────── */
export const calcConcrete: CalcFunction = (v) => {
  const vol = (v.length as number) * (v.width as number) * (v.depth as number);
  const dryVol = vol * 1.54;
  const ratios: Record<string, number[]> = { 'M15 (1:2:4)': [1, 2, 4], 'M20 (1:1.5:3)': [1, 1.5, 3], 'M25 (1:1:2)': [1, 1, 2] };
  const [c, s, a] = ratios[v.mix as string] || [1, 1.5, 3];
  const total = c + s + a;
  const cementBags = Math.ceil((dryVol * c / total) * 1440 / 50);
  const sandVol = dryVol * s / total;
  const aggVol = dryVol * a / total;
  const waterL = Math.round(cementBags * 50 * 0.5);
  return {
    main: { label: 'Total Volume', value: vol.toFixed(3) + ' m³' },
    secondary: [
      { label: 'Cement Bags (50kg)', value: cementBags + ' bags' },
      { label: 'Sand', value: sandVol.toFixed(3) + ' m³' },
      { label: 'Aggregate', value: aggVol.toFixed(3) + ' m³' },
      { label: 'Water (approx)', value: waterL + ' litres' },
      { label: 'Dry Mix Volume (×1.54)', value: dryVol.toFixed(3) + ' m³' },
      { label: 'Cement Cost (est. ₹380/bag)', value: '₹' + (cementBags * 380).toLocaleString() },
    ],
    chart: { labels: ['Cement', 'Sand', 'Aggregate'], data: [Math.round(dryVol * c / total * 100), Math.round(dryVol * s / total * 100), Math.round(dryVol * a / total * 100)] },
    tips: [
      'M20 concrete is standard for residential slabs and beams.',
      'Always cure concrete for at least 7 days to achieve full strength.',
      'Dry volume is 1.54× wet volume due to void filling during compaction.',
    ],
  };
};

/* ── 2. Brick & Mortar Calculator ────────────────── */
export const calcBricks: CalcFunction = (v) => {
  const tMap: Record<string, number> = { 'Half Brick (115mm)': 0.115, 'One Brick (230mm)': 0.230, '1.5 Brick (345mm)': 0.345 };
  const t = tMap[v.thickness as string] || 0.230;
  const wallVol = (v.length as number) * (v.height as number) * t;
  const brickVol = ((v.brickL as number) / 1000) * ((v.brickH as number) / 1000) * t;
  const netBricks = Math.ceil(wallVol / brickVol);
  const bricks = Math.ceil(netBricks * 1.05);
  const mortarVol = Math.max(0, wallVol - netBricks * brickVol);
  const wallArea = (v.length as number) * (v.height as number);
  return {
    main: { label: 'Bricks Required (incl. 5% wastage)', value: bricks.toLocaleString() },
    secondary: [
      { label: 'Wall Area', value: wallArea.toFixed(2) + ' m²' },
      { label: 'Wall Volume', value: wallVol.toFixed(3) + ' m³' },
      { label: 'Mortar Volume (est.)', value: mortarVol.toFixed(4) + ' m³' },
      { label: 'Net Bricks (without wastage)', value: netBricks.toLocaleString() },
      { label: 'Wastage Bricks (5%)', value: (bricks - netBricks).toLocaleString() },
      { label: 'Brick Cost (est. ₹8/brick)', value: '₹' + (bricks * 8).toLocaleString() },
    ],
    chart: { a: netBricks, b: bricks - netBricks, lA: 'Net Bricks', lB: 'Wastage (5%)' },
    tips: [
      'Standard Indian brick size is 230×115×75 mm (with mortar: 240×120×80 mm).',
      'One Brick wall (230mm) is load-bearing; Half Brick (115mm) is for partitions only.',
      'Always add 5-10% extra bricks to account for breakage during transport and laying.',
    ],
  };
};

/* ── 3. Paint Calculator ─────────────────────────── */
export const calcPaint: CalcFunction = (v) => {
  const wallArea = 2 * ((v.length as number) + (v.width as number)) * (v.height as number);
  const deductions = (v.doors as number) * 1.89 + (v.windows as number) * 1.2;
  const paintableArea = wallArea - deductions;
  const paintArea = paintableArea * (v.coats as number);
  const coverageMap: Record<string, number> = { 'Interior Emulsion': 12, 'Exterior Emulsion': 10, 'Primer': 14, 'Distemper': 16, 'Enamel Paint': 10 };
  const coverage = coverageMap[v.paintType as string] || 12;
  const litres = paintArea / coverage;
  const primerL = paintableArea / 14;
  const ceilingArea = (v.length as number) * (v.width as number);
  return {
    main: { label: 'Paint Required', value: litres.toFixed(2) + ' L' },
    secondary: [
      { label: 'Paintable Area', value: paintableArea.toFixed(2) + ' m²' },
      { label: 'Primer Required', value: primerL.toFixed(2) + ' L' },
      { label: '4L Tins Needed', value: Math.ceil(litres / 4) + ' tins' },
      { label: '1L Tins Needed', value: Math.ceil(litres) + ' tins' },
      { label: 'Ceiling Area', value: ceilingArea.toFixed(2) + ' m²' },
      { label: 'Coverage Rate', value: coverage + ' m²/L' },
    ],
    chart: { labels: ['Wall Paint', 'Primer', 'Ceiling Paint'], data: [Math.round(litres), Math.round(primerL), Math.round(ceilingArea / coverage)] },
    tips: [
      'Always apply primer before painting for better adhesion and coverage.',
      'Interior emulsion covers ~12 m²/L; exterior emulsion ~10 m²/L per coat.',
      'Two coats of paint are minimum; textured walls may need three coats.',
    ],
  };
};

/* ── 4. Flooring / Tiles Calculator ──────────────── */
export const calcFlooring: CalcFunction = (v) => {
  const roomArea = (v.roomL as number) * (v.roomW as number);
  const groutGap = ((v.groutGap as number) || 0) / 1000; // mm to m
  const effectiveTileL = ((v.tileL as number) / 1000) + groutGap;
  const effectiveTileW = ((v.tileW as number) / 1000) + groutGap;
  const tileArea = effectiveTileL * effectiveTileW;
  const baseTiles = Math.ceil(roomArea / tileArea);
  const tilesNeeded = Math.ceil(baseTiles * 1.1);
  const boxes = Math.ceil(tilesNeeded / (v.boxQty as number));
  const wastageTiles = tilesNeeded - baseTiles;
  return {
    main: { label: 'Tiles Required (incl. 10% wastage)', value: tilesNeeded.toLocaleString() },
    secondary: [
      { label: 'Room Area', value: roomArea.toFixed(2) + ' m²' },
      { label: 'Boxes Needed', value: String(boxes) },
      { label: 'Wastage Tiles (10%)', value: String(wastageTiles) },
      { label: 'Tile Size', value: (v.tileL as number) + '×' + (v.tileW as number) + ' mm' },
      { label: 'Tile Area', value: ((v.tileL as number) * (v.tileW as number) / 10000).toFixed(0) + ' cm²' },
      { label: 'Adhesive Bags (est.)', value: Math.ceil(roomArea / 4.5) + ' bags (20kg)' },
    ],
    chart: { a: baseTiles, b: wastageTiles, lA: 'Required Tiles', lB: 'Wastage (10%)' },
    tips: [
      '600×600mm tiles are most popular for living rooms; 300×300mm for bathrooms.',
      'Keep 2-3 extra tiles for future repairs — matching batch colors later is difficult.',
      'Add grout gap (2-3mm) for accurate tile count, especially for large areas.',
    ],
  };
};

/* ── 5. Steel / Rebar Calculator ─────────────────── */
export const calcSteel: CalcFunction = (v) => {
  const dia = v.dia as number, length = v.length as number, count = v.count as number;
  const weightPerM = (dia ** 2) / 162;
  const perBarWeight = weightPerM * length;
  const totalWeight = perBarWeight * count;
  const totalLength = length * count;
  return {
    main: { label: 'Total Steel Weight', value: totalWeight.toFixed(2) + ' kg' },
    secondary: [
      { label: 'Weight per Meter', value: weightPerM.toFixed(3) + ' kg/m' },
      { label: 'Per Bar Weight', value: perBarWeight.toFixed(3) + ' kg' },
      { label: 'Total Length', value: totalLength.toLocaleString() + ' m' },
      { label: 'Cost (est. ₹65/kg)', value: '₹' + Math.round(totalWeight * 65).toLocaleString() },
      { label: 'Formula', value: 'D²/162 kg/m' },
      { label: 'Bar Diameter', value: dia + ' mm' },
    ],
    chart: { a: Math.round(perBarWeight), b: Math.round(totalWeight - perBarWeight), lA: 'Single Bar', lB: 'Remaining Bars' },
    tips: [
      'D²/162 is the standard IS formula for steel weight calculation.',
      'Standard bar length in India is 12 meters; shorter bars need lap splicing.',
      '8mm & 10mm bars are used for stirrups; 12-25mm for main reinforcement.',
    ],
  };
};

/* ── 6. Roofing Material Calculator ──────────────── */
export const calcRoofing: CalcFunction = (v) => {
  const slope = 1 / Math.cos((v.pitch as number) * Math.PI / 180);
  const flatArea = (v.length as number) * (v.width as number) * 2;
  const actualArea = flatArea * slope;
  const slopeExtra = actualArea - flatArea;
  const sheets = Math.ceil(actualArea / (v.sheetArea as number) * 1.1);
  const ridgeCaps = Math.ceil((v.length as number) / 1.8);
  return {
    main: { label: 'Roof Area', value: actualArea.toFixed(2) + ' m²' },
    secondary: [
      { label: 'Sheets Required (incl. overlap)', value: String(sheets) },
      { label: 'Ridge Caps', value: String(ridgeCaps) },
      { label: 'Slope Factor', value: slope.toFixed(3) },
      { label: 'Flat Area (plan)', value: flatArea.toFixed(2) + ' m²' },
      { label: 'Extra Area due to Slope', value: slopeExtra.toFixed(2) + ' m²' },
      { label: 'Underlayment Area', value: actualArea.toFixed(2) + ' m²' },
    ],
    chart: { a: Math.round(flatArea), b: Math.round(slopeExtra), lA: 'Flat Plan Area', lB: 'Slope Addition' },
    tips: [
      'Roof pitch of 15-30° is standard for most Indian climates.',
      'Add 10% overlap allowance for sheet joints and ridge connections.',
      'Metal roofing lasts 40+ years; clay tiles 50+ years with proper maintenance.',
    ],
  };
};

/* ── 7. Earthwork / Excavation Calculator ────────── */
export const calcEarthwork: CalcFunction = (v) => {
  const bankVol = (v.length as number) * (v.width as number) * (v.depth as number);
  const swellPct = v.swell as number;
  const loosVol = bankVol * (1 + swellPct / 100);
  const swellExtra = loosVol - bankVol;
  const weight = bankVol * 1800;
  const trucks6 = Math.ceil(loosVol / 6);
  const trucks10 = Math.ceil(loosVol / 10);
  return {
    main: { label: 'Excavation Volume', value: bankVol.toFixed(3) + ' m³' },
    secondary: [
      { label: 'Loose (Truck) Volume', value: loosVol.toFixed(3) + ' m³' },
      { label: 'Est. Soil Weight', value: (weight / 1000).toFixed(2) + ' tonnes' },
      { label: 'Truck Loads (6m³)', value: trucks6 + ' trucks' },
      { label: 'Truck Loads (10m³)', value: trucks10 + ' trucks' },
      { label: 'Swell Factor', value: swellPct + '%' },
      { label: 'Swell Extra Volume', value: swellExtra.toFixed(3) + ' m³' },
    ],
    chart: { a: Math.round(bankVol * 100), b: Math.round(swellExtra * 100), lA: 'Bank Volume', lB: 'Swell Volume' },
    tips: [
      'Clay soil swells 30-40%; sand 10-15%; rock 50-60% when excavated.',
      'Always measure loose volume for truck loading — it is larger than in-situ volume.',
      'Compact backfill in 150-200mm layers for proper settlement prevention.',
    ],
  };
};

/* ── 8. Plaster Calculator ───────────────────────── */
export const calcPlasterwork: CalcFunction = (v) => {
  const area = (v.length as number) * (v.height as number);
  const vol = area * (v.thickness as number) / 1000 * 1.35;
  const ratioMap: Record<string, number[]> = { '1:3 (rich)': [1, 3], '1:4 (standard)': [1, 4], '1:6 (lean)': [1, 6] };
  const [c, s] = ratioMap[v.ratio as string] || [1, 4];
  const cVol = vol * c / (c + s);
  const sVol = vol * s / (c + s);
  const bags = Math.ceil(cVol * 1440 / 50);
  const waterL = Math.round(bags * 25);
  return {
    main: { label: 'Plastering Area', value: area.toFixed(2) + ' m²' },
    secondary: [
      { label: 'Cement Bags (50kg)', value: String(bags) },
      { label: 'Sand Required', value: sVol.toFixed(3) + ' m³' },
      { label: 'Dry Mortar Volume', value: vol.toFixed(3) + ' m³' },
      { label: 'Water (approx)', value: waterL + ' litres' },
      { label: 'Mix Ratio', value: (v.ratio as string) || '1:4 (standard)' },
      { label: 'Cement Cost (est.)', value: '₹' + (bags * 380).toLocaleString() },
    ],
    chart: { a: Math.round(cVol * 1000), b: Math.round(sVol * 1000), lA: 'Cement', lB: 'Sand' },
    tips: [
      '12mm thickness is standard for internal walls; 20mm for external walls.',
      '1:4 ratio is most common for internal plastering; 1:6 for ceilings.',
      'Cure plaster for 7 days by sprinkling water to prevent cracking.',
    ],
  };
};

/* ── 9. Water Tank / Reservoir Size ──────────────── */
export const calcWaterTank: CalcFunction = (v) => {
  const daily = (v.people as number) * (v.perHead as number);
  const total = daily * (v.days as number);
  const cu_m = total / 1000;
  const shape = (v.shape as string) || 'Rectangular';
  let dimStr = '';
  if (shape === 'Cylindrical') {
    const depth = 1.5;
    const radius = Math.sqrt(cu_m / (Math.PI * depth));
    dimStr = 'Dia ' + (radius * 2).toFixed(2) + 'm × ' + depth + 'm deep';
  } else {
    const side = Math.cbrt(cu_m);
    dimStr = side.toFixed(2) + 'm × ' + side.toFixed(2) + 'm × ' + side.toFixed(2) + 'm';
  }
  return {
    main: { label: 'Tank Capacity Needed', value: total.toLocaleString() + ' L' },
    secondary: [
      { label: 'In Cubic Meters', value: cu_m.toFixed(3) + ' m³' },
      { label: 'Suggested Dimensions (' + shape + ')', value: dimStr },
      { label: 'Daily Requirement', value: daily.toLocaleString() + ' L/day' },
      { label: 'Standard Tank Size', value: total <= 500 ? '500L' : total <= 1000 ? '1000L' : total <= 2000 ? '2000L' : total <= 5000 ? '5000L' : 'Custom' },
      { label: 'Shape', value: shape },
    ],
    chart: { a: Math.round(daily), b: Math.round(total - daily), lA: 'Daily Need', lB: 'Reserve Capacity' },
    tips: [
      'BIS recommends 135 litres per person per day for domestic use.',
      '2-day storage is recommended; areas with irregular supply need 3-5 days.',
      'Overhead tanks should be at 3m+ height above highest outlet for proper pressure.',
    ],
  };
};

/* ── 10. Plot & Land Area Converter ──────────────── */
export const calcLandArea: CalcFunction = (v) => {
  const toSqM: Record<string, number> = { 'Square Meter': 1, 'Square Feet': 0.0929, 'Square Yard': 0.836, Acre: 4046.86, Hectare: 10000, 'Bigha (UP/Bihar)': 2529.3, 'Bigha (Rajasthan)': 1618.74, Cent: 40.47, Gunta: 101.17, Marla: 25.29, Kanal: 505.86 };
  const sqm = (v.areaVal as number) * (toSqM[v.fromUnit as string] || 1);
  return {
    main: { label: 'Square Meters', value: sqm.toFixed(4) + ' m²' },
    secondary: [
      { label: 'Square Feet', value: (sqm / 0.0929).toFixed(2) + ' sq ft' },
      { label: 'Square Yards', value: (sqm / 0.836).toFixed(2) + ' sq yd' },
      { label: 'Acre', value: (sqm / 4046.86).toFixed(6) + ' acres' },
      { label: 'Hectare', value: (sqm / 10000).toFixed(6) + ' ha' },
      { label: 'Bigha (UP/Bihar)', value: (sqm / 2529.3).toFixed(4) },
      { label: 'Cent', value: (sqm / 40.47).toFixed(4) },
    ],
    chart: { labels: ['Sq Ft', 'Sq Yd', 'Sq M'], data: [Math.round(sqm / 0.0929), Math.round(sqm / 0.836), Math.round(sqm)] },
    tips: [
      '1 Acre = 43,560 sq ft = 4,046.86 sq m = 0.4047 hectares.',
      'Bigha size varies by state — always confirm the local standard.',
      'RERA uses Carpet Area (not built-up) for pricing — know the difference.',
    ],
  };
};

/* ── 11. Stamp Duty & Registration Calculator ────── */
export const calcStampDuty: CalcFunction = (v) => {
  const rates: Record<string, Record<string, number>> = { Maharashtra: { Male: 6, Female: 5, Joint: 5.5 }, Karnataka: { Male: 5, Female: 5, Joint: 5 }, Delhi: { Male: 6, Female: 4, Joint: 5 }, 'Tamil Nadu': { Male: 7, Female: 7, Joint: 7 }, 'UP/Bihar': { Male: 7, Female: 6, Joint: 6.5 }, Gujarat: { Male: 4.9, Female: 4.9, Joint: 4.9 }, Rajasthan: { Male: 6, Female: 5, Joint: 5.5 } };
  const gKey = (v.gender as string || 'Male').startsWith('Joint') ? 'Joint' : (v.gender as string || 'Male');
  const stateName = (v.state as string) || 'Maharashtra';
  const r = (rates[stateName] || { Male: 5, Female: 5, Joint: 5 })[gKey] || 5;
  const propVal = v.propVal as number;
  const stamp = propVal * r / 100;
  const reg = Math.min(propVal * 0.01, 30000);
  const total = stamp + reg;
  return {
    main: { label: 'Total Registration Cost', value: '₹' + Math.round(total).toLocaleString() },
    secondary: [
      { label: 'Stamp Duty (' + r + '%)', value: '₹' + Math.round(stamp).toLocaleString() },
      { label: 'Registration Fee (1%)', value: '₹' + Math.round(reg).toLocaleString() },
      { label: 'Property Value', value: '₹' + propVal.toLocaleString() },
      { label: 'State', value: stateName },
      { label: 'Gender Category', value: gKey },
      { label: 'Total as % of Property', value: ((total / propVal) * 100).toFixed(2) + '%' },
    ],
    chart: { a: Math.round(stamp), b: Math.round(reg), lA: 'Stamp Duty', lB: 'Registration Fee' },
    tips: [
      'Female buyers get 1-2% lower stamp duty in most Indian states.',
      'Registration fee is capped at ₹30,000 in most states regardless of property value.',
      'Stamp duty is payable on the higher of: agreement value or ready reckoner rate.',
    ],
  };
};

/* ── 12. Home Construction Cost Estimator ────────── */
export const calcConstructionCost: CalcFunction = (v) => {
  const tier = (v.tier as string) || 'Tier-1 Metro (₹2500/sqft)';
  const baseCost = tier.includes('2500') ? 2500 : tier.includes('1800') ? 1800 : tier.includes('1400') ? 1400 : tier.includes('1100') ? 1100 : 800;
  const finishMult: Record<string, number> = { Basic: 0.85, Standard: 1.0, Premium: 1.25, Luxury: 1.6 };
  const finishLevel = (v.finishLevel as string) || 'Standard';
  const costPerSqft = baseCost * (finishMult[finishLevel] || 1.0);
  const areaVal = v.area_c as number;
  const floors = v.floors as number;
  const totalArea = areaVal * floors;
  const base = costPerSqft * totalArea;
  const misc = base * 0.10;
  const total = base + misc;
  return {
    main: { label: 'Estimated Construction Cost', value: '₹' + Math.round(total).toLocaleString() },
    secondary: [
      { label: 'Cost per Sq Ft', value: '₹' + Math.round(costPerSqft).toLocaleString() },
      { label: 'Base Construction', value: '₹' + Math.round(base).toLocaleString() },
      { label: 'Miscellaneous (10%)', value: '₹' + Math.round(misc).toLocaleString() },
      { label: 'Total Area', value: totalArea.toLocaleString() + ' sq ft' },
      { label: 'Finish Level', value: finishLevel },
      { label: 'City Tier Rate', value: '₹' + baseCost + '/sq ft (base)' },
    ],
    chart: { a: Math.round(base), b: Math.round(misc), lA: 'Base Construction', lB: 'Miscellaneous (10%)' },
    tips: [
      'Miscellaneous costs include approvals, utility connections, fencing, and landscaping.',
      'Premium finish adds modular kitchen, vitrified tiles, branded fittings — ~25% more.',
      'Always keep 15-20% contingency budget above the estimate for unforeseen costs.',
    ],
  };
};

/* ── 13. Solar Panel Savings Calculator ──────────── */
export const calcSolarPanel: CalcFunction = (v) => {
  const kw = v.systemKw as number, tariff = v.tariff as number, bill = v.monthlyBill as number, cost = v.systemCost as number;
  const dailyGen = kw * 4.5;
  const monthlyGen = dailyGen * 30;
  const monthlySaving = Math.min(monthlyGen * tariff, bill);
  const annualSaving = monthlySaving * 12;
  const payback = cost / annualSaving;
  let subsidy = 0;
  if (kw <= 2) subsidy = kw * 30000; else if (kw <= 3) subsidy = 60000 + (kw - 2) * 18000; else subsidy = 78000;
  const netCost = cost - subsidy;
  const paybackWithSubsidy = netCost / annualSaving;
  const co2Saved = monthlyGen * 12 * 0.82 / 1000;
  const panelCount = Math.ceil(kw * 1000 / 400);
  const roofAreaNeeded = panelCount * 2; // ~2 m² per 400W panel
  return {
    main: { label: 'Annual Savings', value: '₹' + Math.round(annualSaving).toLocaleString() },
    secondary: [
      { label: 'Monthly Generation', value: Math.round(monthlyGen) + ' units' },
      { label: 'Monthly Bill Savings', value: '₹' + Math.round(monthlySaving).toLocaleString() },
      { label: 'Govt Subsidy (Surya Ghar)', value: '₹' + subsidy.toLocaleString() },
      { label: 'Net Cost After Subsidy', value: '₹' + Math.round(netCost).toLocaleString() },
      { label: 'Payback (with subsidy)', value: paybackWithSubsidy.toFixed(1) + ' years' },
      { label: 'Payback (without subsidy)', value: payback.toFixed(1) + ' years' },
      { label: 'CO₂ Saved per Year', value: co2Saved.toFixed(2) + ' tonnes' },
      { label: 'Panels Needed (400W)', value: panelCount + ' panels' },
      { label: 'Roof Area Needed', value: roofAreaNeeded + ' m² (approx)' },
    ],
    chart: { a: Math.round(subsidy), b: Math.round(netCost), lA: 'Govt Subsidy', lB: 'Your Net Cost' },
    tips: [
      'PM Surya Ghar scheme provides up to ₹78,000 subsidy for residential rooftop solar.',
      'Average solar generation in India is 4-5 units/kW/day; south-facing roofs work best.',
      '1 kW system saves ~800 kg CO₂ per year — equivalent to planting 40 trees.',
    ],
  };
};

/* ── 14. Home Renovation Cost Estimator ──────────── */
export const calcHomeRenovation: CalcFunction = (v) => {
  const qualityMult: Record<string, number> = { Economy: 0.6, Standard: 1.0, Premium: 1.6, Luxury: 2.5 };
  const cityMult: Record<string, number> = { 'Metro (Delhi/Mumbai)': 1.2, 'Tier-1 (Pune/Hyd)': 1.0, 'Tier-2': 0.8, 'Tier-3': 0.65 };
  const qm = qualityMult[(v.quality as string) || 'Standard'] || 1;
  const cm = cityMult[(v.city as string) || 'Tier-1 (Pune/Hyd)'] || 1;
  let base: Record<string, number> = {};
  const scope = (v.scope as string) || 'Full Renovation';
  if (scope === 'Full Renovation') base = { painting: 45, flooring: 120, electrical: 80, plumbing: 60, kitchen: 350, bathroom: 250, carpentry: 200, false_ceiling: 100, misc: 50 };
  else if (scope === 'Kitchen Only') base = { kitchen_cabinets: 400, countertop: 150, tiles: 80, plumbing: 60, electrical: 40, chimney_sink: 80, misc: 30 };
  else if (scope === 'Bathroom Only') base = { tiles: 120, fixtures: 150, plumbing: 80, waterproofing: 50, vanity: 60, misc: 25 };
  else if (scope === 'Painting Only') base = { painting: 40, primer: 10, putty: 15, labour: 20, misc: 5 };
  else base = { flooring_material: 100, labour: 40, leveling: 20, skirting: 15, misc: 10 };
  const area = v.area as number;
  const items = Object.entries(base).map(([k, rate]) => ({ label: k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: '₹' + Math.round(area * rate * qm * cm).toLocaleString() }));
  const totalCost = Object.values(base).reduce((s, r) => s + r, 0) * area * qm * cm;
  const timeline = scope === 'Full Renovation' ? '45-60 days' : scope === 'Painting Only' ? '7-10 days' : '15-25 days';
  const chartLabels = Object.keys(base).map(k => k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  const chartData = Object.values(base).map(rate => Math.round(area * rate * qm * cm));
  return {
    main: { label: 'Estimated Total Cost', value: '₹' + Math.round(totalCost).toLocaleString() },
    secondary: [...items, { label: 'Cost per sq ft', value: '₹' + Math.round(totalCost / area).toLocaleString() }, { label: 'Timeline (est.)', value: timeline }],
    chart: { labels: chartLabels.slice(0, 5), data: chartData.slice(0, 5) },
    tips: [
      'Get at least 3 contractor quotes before starting renovation work.',
      'Premium quality adds 60% cost; Luxury adds 150% over Standard rates.',
      'Plan renovation in phases to manage cash flow — start with structural work.',
    ],
  };
};

/* ── 15. Concrete Mix Design Calculator ──────────── */
export const calcConcreteMix: CalcFunction = (v) => {
  const ratios: Record<string, number[]> = { 'M10 (1:3:6)': [1, 3, 6], 'M15 (1:2:4)': [1, 2, 4], 'M20 (1:1.5:3)': [1, 1.5, 3], 'M25 (1:1:2)': [1, 1, 2], 'M30 (Design Mix)': [1, 0.75, 1.5], Custom: [v.customCement as number || 1, v.customSand as number || 1.5, v.customAggregate as number || 3] };
  const r = ratios[(v.mixRatio as string) || 'M20 (1:1.5:3)'] || [1, 1.5, 3];
  const vol = (v.volume_cm as number) * (1 + (v.wastage_cm as number) / 100);
  const dryVol = vol * 1.54;
  const totalParts = r[0] + r[1] + r[2];
  const cementBags = Math.ceil(dryVol * r[0] / totalParts * 1440 / 50);
  const sandVol = dryVol * r[1] / totalParts;
  const aggVol = dryVol * r[2] / totalParts;
  const waterL = Math.round(cementBags * 50 * 0.5);
  return {
    main: { label: 'Cement Bags (50kg)', value: cementBags + ' bags' },
    secondary: [
      { label: 'Sand Required', value: sandVol.toFixed(3) + ' m³' },
      { label: 'Aggregate Required', value: aggVol.toFixed(3) + ' m³' },
      { label: 'Water (est.)', value: waterL + ' litres' },
      { label: 'Dry Volume (×1.54)', value: dryVol.toFixed(3) + ' m³' },
      { label: 'Mix Ratio', value: r.join(' : ') },
      { label: 'Cement Cost (est.)', value: '₹' + (cementBags * 380).toLocaleString() },
    ],
    chart: { labels: ['Cement', 'Sand', 'Aggregate', 'Water'], data: [Math.round(cementBags * 50), Math.round(sandVol * 1600), Math.round(aggVol * 1450), waterL] },
    tips: [
      'M10 for lean concrete / PCC; M20 for general RCC; M25+ for heavy structural work.',
      'Water-cement ratio should be 0.45-0.55 for adequate workability and strength.',
      'Use 20mm aggregate for general work; 12mm for thin sections and columns.',
    ],
  };
};

/* ── 16. Material Wastage Calculator ─────────────── */
export const calcMaterialWaste: CalcFunction = (v) => {
  const material = v.material_mw as string;
  const area = v.area_mw as number;
  const unit: Record<string, string> = { 'Tiles (floor/wall)': 'tiles', 'Paint (interior)': 'litres', 'Paint (exterior)': 'litres', 'Laminate Flooring': 'sq ft', Wallpaper: 'rolls', Carpet: 'sq ft' };
  const tileSizes: Record<string, number> = { '2×2 ft': 4, '1×2 ft': 2, '1×1 ft': 1, Custom: 1 };
  let baseQty: number;
  if (material.includes('Paint')) baseQty = area / (material.includes('exterior') ? 80 : 100) * (v.coats as number);
  else if (material.includes('Tile')) baseQty = Math.ceil(area / (tileSizes[v.materialSize as string] || 1));
  else if (material.includes('Wallpaper')) baseQty = Math.ceil(area / 56);
  else baseQty = area;
  const wastagePct = v.wastage_mw as number;
  const wastageQty = Math.ceil(baseQty * wastagePct / 100);
  const totalQty = Math.ceil(baseQty + wastageQty);
  return {
    main: { label: 'Total Required', value: totalQty + ' ' + (unit[material] || 'units') },
    secondary: [
      { label: 'Base Quantity', value: Math.ceil(baseQty) + ' ' + (unit[material] || 'units') },
      { label: 'Extra for Wastage (' + wastagePct + '%)', value: wastageQty + ' ' + (unit[material] || 'units') },
      { label: 'Surface Area', value: area + ' sq ft' },
      { label: 'Material', value: material },
    ],
    chart: { a: Math.ceil(baseQty), b: wastageQty, lA: 'Base Quantity', lB: 'Wastage' },
    tips: [
      'Tiles: 10% wastage for straight lay; 15% for diagonal; 20% for complex patterns.',
      'Always buy all tiles from the same batch — different batches may have color variations.',
      'Paint wastage is lower (5-8%) with roller application vs spray (15-20%).',
    ],
  };
};

/* ── 17. Rainwater Harvesting Calculator ─────────── */
export const calcRainwater: CalcFunction = (v) => {
  const coeffMap: Record<string, number> = { '0.9 (concrete/metal roof)': 0.9, '0.8 (tiled roof)': 0.8, '0.6 (ground/gravel)': 0.6, Custom: v.customCoeff as number || 0.85 };
  const coeff = coeffMap[(v.runoffCoeff as string) || '0.8 (tiled roof)'] || 0.85;
  const roofSqM = (v.roofArea_rw as number) * 0.0929;
  const annualCollection = roofSqM * (v.annualRainfall as number) * coeff;
  const monthlyAvg = annualCollection / 12;
  const dailyAvg = annualCollection / 365;
  const dailyDemand = (v.dailyDemand_rw as number) || 500;
  const annualDemand = dailyDemand * 365;
  const pctDemandMet = Math.min(100, (annualCollection / annualDemand) * 100);
  const tankSize = Math.ceil(monthlyAvg * 1.5 / 1000) * 1000;
  return {
    main: { label: 'Annual Collection', value: Math.round(annualCollection).toLocaleString() + ' litres' },
    secondary: [
      { label: 'Monthly Average', value: Math.round(monthlyAvg).toLocaleString() + ' litres' },
      { label: 'Daily Average', value: Math.round(dailyAvg) + ' litres' },
      { label: '% of Demand Met', value: pctDemandMet.toFixed(1) + '%' },
      { label: 'Suggested Tank Size', value: tankSize.toLocaleString() + ' litres' },
      { label: 'Runoff Coefficient', value: String(coeff) },
      { label: 'Daily Demand', value: dailyDemand + ' litres' },
    ],
    chart: { a: Math.round(pctDemandMet), b: Math.round(100 - pctDemandMet), lA: 'Demand Met', lB: 'Unmet Demand' },
    tips: [
      'A 1000 sq ft roof in 800mm rainfall area collects ~60,000 litres/year.',
      'First-flush diverters improve water quality by discarding initial dirty runoff.',
      'Rainwater harvesting is mandatory for plots >100 sq m in many Indian cities.',
    ],
  };
};

/* ── 18. Staircase Calculator ────────────────────── */
export const calcStaircase: CalcFunction = (v) => {
  const rise = Number(v.totalRise) || 3000;
  const targetRiser = Number(v.targetRiser) || 175;
  const targetTread = Number(v.targetTread) || 275;

  const numRisers = Math.round(rise / targetRiser);
  const exactRiser = rise / numRisers;
  const numTreads = numRisers - 1;
  const totalRun = numTreads * targetTread;
  const angleRad = Math.atan(exactRiser / targetTread);
  const angleDeg = angleRad * (180 / Math.PI);
  const twoRplusT = Math.round(2 * exactRiser + targetTread);

  let compliance = 'Standard Compliant ✓';
  if (exactRiser > 200 || exactRiser < 120) compliance = 'Riser out of range (120-200mm) ⚠';
  else if (targetTread < 220 || targetTread > 350) compliance = 'Tread out of range (220-350mm) ⚠';
  else if (twoRplusT < 600 || twoRplusT > 640) compliance = '2R+T outside ideal range (600-640mm) ⚠';

  return {
    main: { label: 'Number of Risers', value: numRisers + ' steps (Riser: ' + exactRiser.toFixed(1) + ' mm)' },
    secondary: [
      { label: 'Number of Treads', value: numTreads + ' treads' },
      { label: 'Tread Depth', value: targetTread + ' mm' },
      { label: 'Total Staircase Run', value: (totalRun / 1000).toFixed(2) + ' m' },
      { label: 'Staircase Angle', value: angleDeg.toFixed(1) + '°' },
      { label: 'Safety Compliance', value: compliance },
      { label: '2R + T Rule', value: twoRplusT + ' mm (ideal 600-640mm)' },
      { label: 'Stringer Length', value: (Math.sqrt(rise * rise + totalRun * totalRun) / 1000).toFixed(2) + ' m' },
    ],
    chart: { a: Math.round(2 * exactRiser), b: targetTread, lA: '2×Riser', lB: 'Tread (2R+T rule)' },
    tips: [
      'The 2R+T comfort rule: twice the riser plus tread should equal 600-640mm.',
      'Maximum riser height per NBC India is 190mm for residential; 150mm for public buildings.',
      'Minimum tread depth should be 250mm for comfortable foot placement.',
    ],
  };
};

/* ── 19. Septic Tank Size Calculator ─────────────── */
export const calcSepticTank: CalcFunction = (v) => {
  const users = Number(v.users) || 6;
  const waterPerPerson = Number(v.waterPerPerson) || 150;
  const interval = Number(v.interval) || 2;

  const sewageVolume = users * waterPerPerson * 2;
  const sludgeVolume = users * 30 * interval;
  const totalLiquidVolume = sewageVolume + sludgeVolume;
  const totalVolumeLiters = totalLiquidVolume * 1.25;
  const volM3 = totalVolumeLiters / 1000;

  const depth = 1.5;
  const area = volM3 / depth;
  const width = Math.sqrt(area / 3);
  const length = width * 3;

  return {
    main: { label: 'Recommended Capacity', value: Math.round(totalVolumeLiters).toLocaleString() + ' L (' + volM3.toFixed(2) + ' m³)' },
    secondary: [
      { label: 'Length (internal)', value: length.toFixed(2) + ' m' },
      { label: 'Width (internal)', value: width.toFixed(2) + ' m' },
      { label: 'Depth (incl. freeboard)', value: (depth + 0.3).toFixed(2) + ' m' },
      { label: 'Number of Users', value: String(users) },
      { label: 'Cleaning Frequency', value: `Every ${interval} years` },
      { label: 'Daily Wastewater Flow', value: (users * waterPerPerson) + ' L/day' },
    ],
    chart: { a: Math.round(sewageVolume), b: Math.round(sludgeVolume), lA: 'Sewage Volume', lB: 'Sludge Storage' },
    tips: [
      'L:W ratio of 3:1 to 4:1 is recommended for proper flow and settlement.',
      'Minimum liquid depth is 1.0m; 1.5m is standard with 0.3m freeboard.',
      'Desludge every 2-3 years to maintain tank efficiency and prevent blockage.',
    ],
  };
};

/* ── 20. Home Electrical Load Calculator ─────────── */
export const calcElectricalLoad: CalcFunction = (v) => {
  const acW = (Number(v.acCount) || 1) * 1500;
  const fanW = (Number(v.fansCount) || 4) * 75;
  const lightW = (Number(v.lightsCount) || 10) * 15;
  const geyserW = (Number(v.geyserCount) || 0) * 2000;
  const fridgeW = (Number(v.fridgeCount) || 1) * 300;
  const tvW = (Number(v.tvCount) || 1) * 100;
  const ovenW = (Number(v.ovenCount) || 0) * 1500;

  const connectedLoadW = acW + fanW + lightW + geyserW + fridgeW + tvW + ovenW;
  const runningLoadW = connectedLoadW * 0.8;
  const runningCurrentAmps = runningLoadW / 230;

  let mcbSize = '16 A';
  if (runningCurrentAmps > 40) mcbSize = '63 A';
  else if (runningCurrentAmps > 25) mcbSize = '40 A';
  else if (runningCurrentAmps > 16) mcbSize = '32 A';
  else if (runningCurrentAmps > 10) mcbSize = '20 A';

  let wireGauge = '4.0 sq mm';
  if (runningCurrentAmps > 32) wireGauge = '10.0 sq mm';
  else if (runningCurrentAmps > 20) wireGauge = '6.0 sq mm';
  else if (runningCurrentAmps < 15) wireGauge = '2.5 sq mm';

  // Inverter recommendation
  const essentialLoadW = fanW + lightW + fridgeW + tvW;
  const inverterVA = Math.ceil(essentialLoadW / 0.8 / 100) * 100;
  const batteryAh = Math.ceil(essentialLoadW * 3 / 12 / 100) * 100; // 3 hours backup

  return {
    main: { label: 'Total Connected Load', value: (connectedLoadW / 1000).toFixed(2) + ' kW' },
    secondary: [
      { label: 'Running Load (0.8 factor)', value: (runningLoadW / 1000).toFixed(2) + ' kW' },
      { label: 'Peak Current Draw', value: runningCurrentAmps.toFixed(1) + ' Amps' },
      { label: 'Recommended Main MCB', value: mcbSize },
      { label: 'Recommended Service Cable', value: wireGauge },
      { label: 'AC Units Load', value: (acW / 1000).toFixed(1) + ' kW' },
      { label: 'Geysers Load', value: (geyserW / 1000).toFixed(1) + ' kW' },
      { label: 'Other Appliances', value: ((fanW + lightW + fridgeW + tvW + ovenW) / 1000).toFixed(2) + ' kW' },
      { label: 'Inverter Size (3hr backup)', value: inverterVA + ' VA' },
      { label: 'Battery Size (3hr backup)', value: batteryAh + ' Ah (12V)' },
    ],
    chart: { labels: ['AC', 'Fans', 'Lights', 'Geyser', 'Fridge', 'TV', 'Oven'], data: [acW, fanW, lightW, geyserW, fridgeW, tvW, ovenW] },
    tips: [
      'Diversity factor of 0.8 means not all appliances run simultaneously.',
      'ACs and geysers are the biggest load contributors — use star-rated models.',
      'Inverter-rated fans (28W) can reduce fan load by 60% compared to regular fans.',
    ],
  };
};

/* ═══════════════════════════════════════════════════
   NEW CALCULATORS (8)
   ═══════════════════════════════════════════════════ */

/* ── 21. Fence / Boundary Wall Calculator ────────── */
export const calcFenceWall: CalcFunction = (v) => {
  const totalLength = v.fenceLength as number;
  const height = v.fenceHeight as number;
  const pillarSpacing = v.pillarSpacing as number;
  const materialMap: Record<string, { costPerM: number; label: string }> = {
    'Brick Wall': { costPerM: 1800, label: 'Brick + Mortar Wall' },
    'Chain Link Fence': { costPerM: 450, label: 'Chain Link Fencing' },
    'Precast Compound Wall': { costPerM: 1200, label: 'Precast Panels' },
    'Iron Railing': { costPerM: 1400, label: 'MS Iron Railing' },
    'Barbed Wire': { costPerM: 150, label: 'Barbed Wire (3 rows)' },
  };
  const matKey = (v.fenceMaterial as string) || 'Brick Wall';
  const mat = materialMap[matKey] || materialMap['Brick Wall'];

  const pillars = Math.ceil(totalLength / pillarSpacing) + 1;
  const pillarCostEach = 800 * height; // approx cost per pillar
  const totalPillarCost = pillars * pillarCostEach;
  const fencingCost = totalLength * mat.costPerM * height;
  const totalCost = fencingCost + totalPillarCost;

  return {
    main: { label: 'Total Boundary Cost', value: '₹' + Math.round(totalCost).toLocaleString() },
    secondary: [
      { label: 'Total Length', value: totalLength + ' m' },
      { label: 'Pillars/Posts Needed', value: pillars + ' nos' },
      { label: 'Pillar Cost', value: '₹' + Math.round(totalPillarCost).toLocaleString() },
      { label: 'Fencing Cost', value: '₹' + Math.round(fencingCost).toLocaleString() },
      { label: 'Material', value: mat.label },
      { label: 'Cost per Running Meter', value: '₹' + Math.round(totalCost / totalLength).toLocaleString() + '/m' },
    ],
    chart: { a: Math.round(totalPillarCost), b: Math.round(fencingCost), lA: 'Pillars/Posts', lB: 'Fencing Material' },
    tips: [
      'Pillar spacing of 3m is standard for brick walls; 2.5m for chain link fencing.',
      'Compound walls need a plinth of 150-300mm above ground level for damp protection.',
      'Precast walls are 30-40% cheaper than brick and install in half the time.',
    ],
  };
};

/* ── 22. Waterproofing Calculator ────────────────── */
export const calcWaterproofing: CalcFunction = (v) => {
  const area = v.wpArea as number;
  const methodMap: Record<string, { coveragePerL: number; costPerSqm: number; coatsNeeded: number }> = {
    'Cementitious Coating': { coveragePerL: 1.5, costPerSqm: 45, coatsNeeded: 2 },
    'Liquid Membrane': { coveragePerL: 1.2, costPerSqm: 80, coatsNeeded: 2 },
    'Bituminous Coating': { coveragePerL: 1.0, costPerSqm: 60, coatsNeeded: 2 },
    'PU (Polyurethane)': { coveragePerL: 1.5, costPerSqm: 120, coatsNeeded: 1 },
    'APP Membrane Sheet': { coveragePerL: 0, costPerSqm: 150, coatsNeeded: 1 },
  };
  const method = (v.wpMethod as string) || 'Cementitious Coating';
  const coats = (v.wpCoats as number) || 2;
  const m = methodMap[method] || methodMap['Cementitious Coating'];

  const materialQty = m.coveragePerL > 0 ? Math.ceil(area * coats / m.coveragePerL) : Math.ceil(area * 1.1);
  const totalCost = Math.round(area * m.costPerSqm * (coats / m.coatsNeeded));
  const labourCost = Math.round(area * 25);

  return {
    main: { label: 'Total Waterproofing Cost', value: '₹' + (totalCost + labourCost).toLocaleString() },
    secondary: [
      { label: 'Material Quantity', value: m.coveragePerL > 0 ? materialQty + ' litres' : materialQty + ' sq m of sheet' },
      { label: 'Material Cost', value: '₹' + totalCost.toLocaleString() },
      { label: 'Labour Cost (est.)', value: '₹' + labourCost.toLocaleString() },
      { label: 'Area', value: area + ' m²' },
      { label: 'Method', value: method },
      { label: 'Coats Applied', value: String(coats) },
    ],
    chart: { a: totalCost, b: labourCost, lA: 'Material Cost', lB: 'Labour Cost' },
    tips: [
      'Apply waterproofing on clean, damp (not wet) surfaces for best adhesion.',
      'Cementitious coating is cheapest; PU membrane is best for terrace waterproofing.',
      'Allow 24-48 hours curing between coats; do ponding test after final coat.',
    ],
  };
};

/* ── 23. False Ceiling Calculator ────────────────── */
export const calcFalseCeiling: CalcFunction = (v) => {
  const roomL = v.fcLength as number;
  const roomW = v.fcWidth as number;
  const area = roomL * roomW;
  const materialMap: Record<string, { panelSize: number; ratePerSqft: number }> = {
    'Gypsum Board': { panelSize: 32, ratePerSqft: 75 },
    'POP (Plaster of Paris)': { panelSize: 0, ratePerSqft: 90 },
    'Grid / Mineral Fiber': { panelSize: 4, ratePerSqft: 55 },
    'PVC Panel': { panelSize: 8, ratePerSqft: 45 },
    'Wooden': { panelSize: 12, ratePerSqft: 130 },
  };
  const matKey = (v.fcMaterial as string) || 'Gypsum Board';
  const mat = materialMap[matKey] || materialMap['Gypsum Board'];
  const areaSqft = area * 10.764;
  const panels = mat.panelSize > 0 ? Math.ceil(areaSqft / mat.panelSize) : 0;
  const channels = Math.ceil((roomL + roomW) * 2 * 3.28 / 4) * 2; // perimeter channels + cross
  const screws = Math.ceil(areaSqft * 1.5);
  const totalCost = Math.round(areaSqft * mat.ratePerSqft);

  return {
    main: { label: 'Total False Ceiling Cost', value: '₹' + totalCost.toLocaleString() },
    secondary: [
      { label: 'Ceiling Area', value: area.toFixed(2) + ' m² (' + Math.round(areaSqft) + ' sq ft)' },
      { label: 'Material', value: matKey },
      { label: 'Panels/Boards Needed', value: panels > 0 ? panels + ' nos' : 'N/A (custom pour)' },
      { label: 'GI Channels (8ft)', value: channels + ' nos' },
      { label: 'Screws (est.)', value: screws + ' nos' },
      { label: 'Rate per Sq Ft', value: '₹' + mat.ratePerSqft },
    ],
    chart: { a: Math.round(totalCost * 0.6), b: Math.round(totalCost * 0.4), lA: 'Material Cost (~60%)', lB: 'Labour + Framework (~40%)' },
    tips: [
      'Gypsum is most popular for residential; grid ceiling for offices and commercial spaces.',
      'POP is cheapest but cracks easily; Gypsum is crack-resistant and moisture-friendly.',
      'Leave 6-9 inch gap between false ceiling and slab for concealed wiring and AC ducts.',
    ],
  };
};

/* ── 24. Column / Footing Size Calculator ────────── */
export const calcColumnFooting: CalcFunction = (v) => {
  const load = (v.colLoad as number) || 500; // kN
  const sbc = (v.soilBearing as number) || 150; // kN/m²
  const colSize = (v.colSize as number) || 300; // mm
  const fos = 2.5; // factor of safety

  const designLoad = load * fos;
  const footingAreaM2 = designLoad / sbc;
  const footingSide = Math.ceil(Math.sqrt(footingAreaM2) * 100) / 100;
  const footingDepth = Math.max(0.3, Math.round(footingSide / 3 * 100) / 100);
  const concreteVol = footingSide * footingSide * footingDepth;
  const rebarKg = Math.round(concreteVol * 120); // ~120 kg/m³ for footing
  const colVolPerM = (colSize / 1000) * (colSize / 1000);

  return {
    main: { label: 'Footing Size', value: footingSide.toFixed(2) + 'm × ' + footingSide.toFixed(2) + 'm × ' + footingDepth.toFixed(2) + 'm' },
    secondary: [
      { label: 'Footing Area', value: footingAreaM2.toFixed(3) + ' m²' },
      { label: 'Concrete for Footing', value: concreteVol.toFixed(3) + ' m³' },
      { label: 'Rebar (est.)', value: rebarKg + ' kg' },
      { label: 'Column Size', value: colSize + 'mm × ' + colSize + 'mm' },
      { label: 'Column Concrete/m', value: colVolPerM.toFixed(4) + ' m³/m' },
      { label: 'Applied Load', value: load + ' kN' },
      { label: 'Soil Bearing Capacity', value: sbc + ' kN/m²' },
    ],
    chart: { a: Math.round(concreteVol * 1000), b: rebarKg, lA: 'Concrete (L)', lB: 'Rebar (kg)' },
    tips: [
      'Minimum footing depth is 300mm below natural ground level as per IS 456.',
      'Standard SBC: soft soil 100 kN/m², medium 150-200, hard rock 300+ kN/m².',
      'Always get a soil test report before finalizing foundation design.',
    ],
  };
};

/* ── 25. Window & Door Cost Estimator ────────────── */
export const calcWindowDoor: CalcFunction = (v) => {
  const doorCount = (v.doorCount as number) || 3;
  const windowCount = (v.windowCount as number) || 4;
  const typeMap: Record<string, { doorCost: number; windowCost: number }> = {
    'Wooden (Teak)': { doorCost: 18000, windowCost: 8000 },
    'Wooden (Sal)': { doorCost: 12000, windowCost: 5500 },
    'UPVC': { doorCost: 15000, windowCost: 9000 },
    'Aluminium': { doorCost: 10000, windowCost: 7000 },
    'Steel': { doorCost: 8000, windowCost: 5000 },
  };
  const matType = (v.wdMaterial as string) || 'Wooden (Sal)';
  const t = typeMap[matType] || typeMap['Wooden (Sal)'];

  const totalDoorCost = doorCount * t.doorCost;
  const totalWindowCost = windowCount * t.windowCost;
  const glassCost = windowCount * 1500;
  const fittingCost = (doorCount + windowCount) * 800;
  const totalCost = totalDoorCost + totalWindowCost + glassCost + fittingCost;

  return {
    main: { label: 'Total Doors & Windows Cost', value: '₹' + Math.round(totalCost).toLocaleString() },
    secondary: [
      { label: 'Door Frames + Shutters', value: '₹' + totalDoorCost.toLocaleString() + ' (' + doorCount + ' nos)' },
      { label: 'Window Frames + Shutters', value: '₹' + totalWindowCost.toLocaleString() + ' (' + windowCount + ' nos)' },
      { label: 'Glass Cost (est.)', value: '₹' + glassCost.toLocaleString() },
      { label: 'Hardware & Fittings', value: '₹' + fittingCost.toLocaleString() },
      { label: 'Material Type', value: matType },
      { label: 'Avg Cost per Opening', value: '₹' + Math.round(totalCost / (doorCount + windowCount)).toLocaleString() },
    ],
    chart: { labels: ['Door Frames', 'Window Frames', 'Glass', 'Fittings'], data: [totalDoorCost, totalWindowCost, glassCost, fittingCost] },
    tips: [
      'UPVC windows are maintenance-free, termite-proof, and offer best sound insulation.',
      'Standard door size in India: 7ft × 3ft (2100 × 900mm); window: 4ft × 3ft.',
      'Teak doors are premium but need annual polishing; Sal wood is budget-friendly.',
    ],
  };
};

/* ── 26. Sand & Gravel Calculator ────────────────── */
export const calcSandGravel: CalcFunction = (v) => {
  const area = v.sgArea as number;
  const depth = (v.sgDepth as number) / 1000; // mm to m
  const volume = area * depth;
  const densityMap: Record<string, number> = {
    'River Sand': 1600,
    'M-Sand (Manufactured)': 1700,
    'Pit Sand': 1450,
    'Gravel (20mm)': 1550,
    'Gravel (40mm)': 1500,
    'Stone Dust': 1750,
  };
  const matType = (v.sgMaterial as string) || 'River Sand';
  const density = densityMap[matType] || 1600;
  const weightTonnes = (volume * density) / 1000;
  const trucks = Math.ceil(weightTonnes / 10); // 10-tonne trucks

  return {
    main: { label: 'Total Volume', value: volume.toFixed(3) + ' m³' },
    secondary: [
      { label: 'Weight', value: weightTonnes.toFixed(2) + ' tonnes' },
      { label: 'Truck Loads (10T)', value: trucks + ' trucks' },
      { label: 'Area', value: area + ' m²' },
      { label: 'Depth', value: (v.sgDepth as number) + ' mm' },
      { label: 'Material', value: matType },
      { label: 'Density Used', value: density + ' kg/m³' },
    ],
    chart: { a: Math.round(volume * 1000), b: Math.round(weightTonnes * 100), lA: 'Volume (L)', lB: 'Weight (×100 kg)' },
    tips: [
      'M-Sand is an eco-friendly alternative to river sand and is IS-code approved.',
      'River sand density: ~1600 kg/m³; M-Sand: ~1700 kg/m³; Gravel: ~1500 kg/m³.',
      'Always check sand for silt content — max 8% is acceptable for construction.',
    ],
  };
};

/* ── 27. Scaffolding Calculator ──────────────────── */
export const calcScaffolding: CalcFunction = (v) => {
  const buildingHeight = v.scHeight as number;
  const perimeter = v.scPerimeter as number;
  const typeMap: Record<string, { liftHeight: number; rentPerDay: number }> = {
    'Steel Tubular': { liftHeight: 1.5, rentPerDay: 8 },
    'H-Frame': { liftHeight: 1.8, rentPerDay: 12 },
    'Cup-Lock': { liftHeight: 1.5, rentPerDay: 15 },
    'Bamboo': { liftHeight: 1.5, rentPerDay: 3 },
  };
  const scType = (v.scType as string) || 'Steel Tubular';
  const sc = typeMap[scType] || typeMap['Steel Tubular'];
  const duration = (v.scDuration as number) || 30;

  const lifts = Math.ceil(buildingHeight / sc.liftHeight);
  const scaffoldArea = perimeter * buildingHeight;
  const frames = Math.ceil(perimeter / 2) * lifts; // frames every 2m along perimeter
  const planks = Math.ceil(perimeter / 1.5) * lifts;
  const rentalCost = Math.round(scaffoldArea * sc.rentPerDay * duration);

  return {
    main: { label: 'Scaffolding Rental Cost', value: '₹' + rentalCost.toLocaleString() + ' (' + duration + ' days)' },
    secondary: [
      { label: 'Scaffold Area', value: scaffoldArea.toFixed(2) + ' m²' },
      { label: 'Number of Lifts', value: lifts + ' lifts' },
      { label: 'Frames/Standards', value: frames + ' nos' },
      { label: 'Planks/Platforms', value: planks + ' nos' },
      { label: 'Type', value: scType },
      { label: 'Daily Rate', value: '₹' + sc.rentPerDay + '/m²/day' },
    ],
    chart: { a: Math.round(rentalCost * 0.7), b: Math.round(rentalCost * 0.3), lA: 'Equipment Rental (~70%)', lB: 'Erection Labour (~30%)' },
    tips: [
      'Steel tubular scaffolding is most common for buildings up to G+4 floors.',
      'Cup-lock system is fastest to erect but costs 50% more than tubular.',
      'Bamboo scaffolding is still used in many Indian cities — cheapest but risky above 3 floors.',
    ],
  };
};

/* ── 28. RERA Carpet Area Calculator ─────────────── */
export const calcCarpetArea: CalcFunction = (v) => {
  const superBuiltUp = v.superBuiltUp as number;
  const loadingPct = (v.loadingPct as number) || 30;

  const builtUpArea = superBuiltUp / (1 + loadingPct / 100);
  const commonArea = superBuiltUp - builtUpArea;
  const wallAreaPct = 10; // walls ~10% of built-up
  const carpetArea = builtUpArea * (1 - wallAreaPct / 100);
  const wallArea = builtUpArea - carpetArea;
  const balconyArea = (v.balconyArea as number) || 0;
  const reraCarpet = carpetArea + balconyArea;

  const pricePerSqft = (v.pricePerSqft as number) || 5000;
  const superCost = superBuiltUp * pricePerSqft;
  const carpetCost = reraCarpet * (superCost / reraCarpet); // effective price
  const effectiveCarpetRate = Math.round(superCost / reraCarpet);

  return {
    main: { label: 'RERA Carpet Area', value: reraCarpet.toFixed(2) + ' sq ft' },
    secondary: [
      { label: 'Super Built-Up Area', value: superBuiltUp + ' sq ft' },
      { label: 'Built-Up Area', value: builtUpArea.toFixed(2) + ' sq ft' },
      { label: 'Common Area (loading)', value: commonArea.toFixed(2) + ' sq ft (' + loadingPct + '%)' },
      { label: 'Wall Area', value: wallArea.toFixed(2) + ' sq ft' },
      { label: 'Balcony Area', value: balconyArea + ' sq ft' },
      { label: 'Effective Rate (per carpet sq ft)', value: '₹' + effectiveCarpetRate.toLocaleString() },
      { label: 'Total Cost', value: '₹' + Math.round(superCost).toLocaleString() },
    ],
    chart: { labels: ['Carpet Area', 'Wall Area', 'Common/Loading'], data: [Math.round(carpetArea), Math.round(wallArea), Math.round(commonArea)] },
    tips: [
      'RERA mandates that flats must be sold on Carpet Area basis, not Super Built-Up.',
      'Loading factor varies: 25-30% for apartments, 35-45% for commercial properties.',
      'Carpet area = usable floor area inside walls, excluding walls, balcony, and common areas.',
    ],
  };
};
