/* Calc Labz — Construction Calculations
   Ported from assets/js/calculators-construction.js */
import { CalcFunction } from '@/types/calculator';

export const calcConcrete: CalcFunction = (v) => {
  const vol = (v.length as number) * (v.width as number) * (v.depth as number); const dryVol = vol * 1.54;
  const ratios: Record<string, number[]> = { 'M15 (1:2:4)': [1, 2, 4], 'M20 (1:1.5:3)': [1, 1.5, 3], 'M25 (1:1:2)': [1, 1, 2] };
  const [c, s, a] = ratios[v.mix as string] || [1, 1.5, 3]; const total = c + s + a;
  const cement = Math.ceil((dryVol * c / total) * 1440 / 50);
  return { main: { label: 'Total Volume', value: vol.toFixed(3) + ' m³' }, secondary: [{ label: 'Cement Bags (50kg)', value: cement + ' bags' }, { label: 'Sand', value: (dryVol * s / total).toFixed(3) + ' m³' }, { label: 'Aggregate', value: (dryVol * a / total).toFixed(3) + ' m³' }, { label: 'Dry Mix Volume', value: dryVol.toFixed(3) + ' m³' }] };
};

export const calcBricks: CalcFunction = (v) => {
  const tMap: Record<string, number> = { 'Half Brick (115mm)': 0.115, 'One Brick (230mm)': 0.230, '1.5 Brick (345mm)': 0.345 };
  const t = tMap[v.thickness as string] || 0.230;
  const wallVol = (v.length as number) * (v.height as number) * t;
  const brickVol = ((v.brickL as number) / 1000) * ((v.brickH as number) / 1000) * t;
  const netBricks = Math.ceil(wallVol / brickVol); const bricks = Math.ceil(netBricks * 1.05);
  const mortarVol = Math.max(0, wallVol - netBricks * brickVol);
  return { main: { label: 'Bricks Required (incl. 5% extra)', value: bricks.toLocaleString() }, secondary: [{ label: 'Wall Area', value: ((v.length as number) * (v.height as number)).toFixed(2) + ' m²' }, { label: 'Wall Volume', value: wallVol.toFixed(3) + ' m³' }, { label: 'Mortar Volume (est.)', value: mortarVol.toFixed(4) + ' m³' }, { label: 'Net Bricks (without wastage)', value: netBricks.toLocaleString() }] };
};

export const calcPaint: CalcFunction = (v) => {
  const wallArea = 2 * ((v.length as number) + (v.width as number)) * (v.height as number);
  const deductions = (v.doors as number) * 1.89 + (v.windows as number) * 1.2;
  const paintArea = (wallArea - deductions) * (v.coats as number); const litres = paintArea / 12;
  return { main: { label: 'Paint Required', value: litres.toFixed(2) + ' L' }, secondary: [{ label: 'Paintable Area', value: (wallArea - deductions).toFixed(2) + ' m²' }, { label: 'Primer Required', value: ((wallArea - deductions) / 12).toFixed(2) + ' L' }, { label: '4L Tins Needed', value: Math.ceil(litres / 4) + ' tins' }, { label: 'Ceiling Area', value: ((v.length as number) * (v.width as number)).toFixed(2) + ' m²' }] };
};

export const calcFlooring: CalcFunction = (v) => {
  const roomArea = (v.roomL as number) * (v.roomW as number);
  const tileArea = ((v.tileL as number) / 1000) * ((v.tileW as number) / 1000);
  const tilesNeeded = Math.ceil(roomArea / tileArea * 1.1); const boxes = Math.ceil(tilesNeeded / (v.boxQty as number));
  return { main: { label: 'Tiles Required', value: tilesNeeded.toLocaleString() }, secondary: [{ label: 'Room Area', value: roomArea.toFixed(2) + ' m²' }, { label: 'Boxes Needed', value: String(boxes) }, { label: 'Wastage Tiles (10%)', value: String(Math.ceil(tilesNeeded - roomArea / tileArea)) }, { label: 'Tile Area', value: (tileArea * 10000).toFixed(0) + ' cm²' }] };
};

export const calcSteel: CalcFunction = (v) => {
  const dia = v.dia as number, length = v.length as number, count = v.count as number;
  const weightPerM = (dia ** 2) / 162; const totalWeight = weightPerM * length * count;
  return { main: { label: 'Total Steel Weight', value: totalWeight.toFixed(2) + ' kg' }, secondary: [{ label: 'Weight per Meter', value: weightPerM.toFixed(3) + ' kg/m' }, { label: 'Per Bar Weight', value: (weightPerM * length).toFixed(3) + ' kg' }, { label: 'Total Length', value: (length * count).toLocaleString() + ' m' }, { label: 'Formula', value: 'D²/162 kg/m' }] };
};

export const calcRoofing: CalcFunction = (v) => {
  const slope = 1 / Math.cos((v.pitch as number) * Math.PI / 180);
  const actualArea = (v.length as number) * (v.width as number) * 2 * slope;
  const sheets = Math.ceil(actualArea / (v.sheetArea as number) * 1.1);
  return { main: { label: 'Roof Area', value: actualArea.toFixed(2) + ' m²' }, secondary: [{ label: 'Sheets Required', value: String(sheets) }, { label: 'Ridge Caps', value: String(Math.ceil((v.length as number) / 1.8)) }, { label: 'Slope Factor', value: slope.toFixed(3) }, { label: 'Flat Area', value: ((v.length as number) * (v.width as number) * 2).toFixed(2) + ' m²' }] };
};

export const calcEarthwork: CalcFunction = (v) => {
  const bankVol = (v.length as number) * (v.width as number) * (v.depth as number);
  const loosVol = bankVol * (1 + (v.swell as number) / 100); const weight = bankVol * 1800;
  return { main: { label: 'Excavation Volume', value: bankVol.toFixed(3) + ' m³' }, secondary: [{ label: 'Loose (Truck) Volume', value: loosVol.toFixed(3) + ' m³' }, { label: 'Est. Soil Weight', value: (weight / 1000).toFixed(2) + ' tonnes' }, { label: 'Truck Loads (6m³)', value: Math.ceil(loosVol / 6) + ' trucks' }] };
};

export const calcPlasterwork: CalcFunction = (v) => {
  const area = (v.length as number) * (v.height as number);
  const vol = area * (v.thickness as number) / 1000 * 1.35;
  const ratioMap: Record<string, number[]> = { '1:3 (rich)': [1, 3], '1:4 (standard)': [1, 4], '1:6 (lean)': [1, 6] };
  const [c, s] = ratioMap[v.ratio as string] || [1, 4];
  const cVol = vol * c / (c + s); const bags = Math.ceil(cVol * 1440 / 50);
  return { main: { label: 'Plastering Area', value: area.toFixed(2) + ' m²' }, secondary: [{ label: 'Cement Bags (50kg)', value: String(bags) }, { label: 'Sand Required', value: (vol * s / (c + s)).toFixed(3) + ' m³' }, { label: 'Dry Mortar Volume', value: vol.toFixed(3) + ' m³' }, { label: 'Water (approx)', value: Math.round(bags * 25) + ' litres' }] };
};

export const calcWaterTank: CalcFunction = (v) => {
  const total = (v.people as number) * (v.days as number) * (v.perHead as number); const cu_m = total / 1000;
  return { main: { label: 'Tank Capacity Needed', value: total.toLocaleString() + ' L' }, secondary: [{ label: 'In Cubic Meters', value: cu_m.toFixed(3) + ' m³' }, { label: 'Cube Side (if cubic)', value: Math.cbrt(cu_m).toFixed(2) + ' m' }, { label: 'Daily Requirement', value: ((v.people as number) * (v.perHead as number)).toLocaleString() + ' L/day' }, { label: 'Standard Tank Size', value: total <= 500 ? '500L' : total <= 1000 ? '1000L' : total <= 2000 ? '2000L' : 'Custom' }] };
};

export const calcLandArea: CalcFunction = (v) => {
  const toSqM: Record<string, number> = { 'Square Meter': 1, 'Square Feet': 0.0929, 'Square Yard': 0.836, Acre: 4046.86, Hectare: 10000, 'Bigha (UP/Bihar)': 2529.3, 'Bigha (Rajasthan)': 1618.74, Cent: 40.47, Gunta: 101.17, Marla: 25.29, Kanal: 505.86 };
  const sqm = (v.areaVal as number) * (toSqM[v.fromUnit as string] || 1);
  return { main: { label: 'Square Meters', value: sqm.toFixed(4) + ' m²' }, secondary: [{ label: 'Square Feet', value: (sqm / 0.0929).toFixed(2) + ' sq ft' }, { label: 'Square Yards', value: (sqm / 0.836).toFixed(2) + ' sq yd' }, { label: 'Acre', value: (sqm / 4046.86).toFixed(6) + ' acres' }, { label: 'Hectare', value: (sqm / 10000).toFixed(6) + ' ha' }, { label: 'Bigha (UP/Bihar)', value: (sqm / 2529.3).toFixed(4) }, { label: 'Cent', value: (sqm / 40.47).toFixed(4) }] };
};

export const calcStampDuty: CalcFunction = (v) => {
  const rates: Record<string, Record<string, number>> = { Maharashtra: { Male: 6, Female: 5, Joint: 5.5 }, Karnataka: { Male: 5, Female: 5, Joint: 5 }, Delhi: { Male: 6, Female: 4, Joint: 5 }, 'Tamil Nadu': { Male: 7, Female: 7, Joint: 7 }, 'UP/Bihar': { Male: 7, Female: 6, Joint: 6.5 }, Gujarat: { Male: 4.9, Female: 4.9, Joint: 4.9 }, Rajasthan: { Male: 6, Female: 5, Joint: 5.5 } };
  const gKey = (v.gender as string).startsWith('Joint') ? 'Joint' : v.gender as string;
  const r = (rates[v.state as string] || { Male: 5, Female: 5, Joint: 5 })[gKey] || 5;
  const stamp = (v.propVal as number) * r / 100; const reg = Math.min((v.propVal as number) * 0.01, 30000); const total = stamp + reg;
  return { main: { label: 'Total Registration Cost', value: '₹' + Math.round(total).toLocaleString() }, secondary: [{ label: 'Stamp Duty (' + r + '%)', value: '₹' + Math.round(stamp).toLocaleString() }, { label: 'Registration Fee (1%)', value: '₹' + Math.round(reg).toLocaleString() }, { label: 'Property Value', value: '₹' + (v.propVal as number).toLocaleString() }, { label: 'State', value: v.state as string }, { label: 'Total as % of Property', value: ((total / (v.propVal as number)) * 100).toFixed(2) + '%' }] };
};

export const calcConstructionCost: CalcFunction = (v) => {
  const tier = v.tier as string;
  const baseCost = tier.includes('2500') ? 2500 : tier.includes('1800') ? 1800 : tier.includes('1400') ? 1400 : tier.includes('1100') ? 1100 : 800;
  const finishMult: Record<string, number> = { Basic: 0.85, Standard: 1.0, Premium: 1.25, Luxury: 1.6 };
  const costPerSqft = baseCost * (finishMult[v.finishLevel as string] || 1.0);
  const base = costPerSqft * (v.area_c as number) * (v.floors as number); const misc = base * 0.10; const total = base + misc;
  return { main: { label: 'Estimated Construction Cost', value: '₹' + Math.round(total).toLocaleString() }, secondary: [{ label: 'Cost per Sq Ft', value: '₹' + Math.round(costPerSqft).toLocaleString() }, { label: 'Base Construction', value: '₹' + Math.round(base).toLocaleString() }, { label: 'Miscellaneous (10%)', value: '₹' + Math.round(misc).toLocaleString() }, { label: 'Total Area', value: ((v.area_c as number) * (v.floors as number)).toLocaleString() + ' sq ft' }] };
};

export const calcSolarPanel: CalcFunction = (v) => {
  const kw = v.systemKw as number, tariff = v.tariff as number, bill = v.monthlyBill as number, cost = v.systemCost as number;
  const dailyGen = kw * 4.5; const monthlyGen = dailyGen * 30;
  const monthlySaving = Math.min(monthlyGen * tariff, bill); const annualSaving = monthlySaving * 12;
  const payback = cost / annualSaving;
  let subsidy = 0;
  if (kw <= 2) subsidy = kw * 30000; else if (kw <= 3) subsidy = 60000 + (kw - 2) * 18000; else subsidy = 78000;
  const netCost = cost - subsidy; const paybackWithSubsidy = netCost / annualSaving;
  const co2Saved = monthlyGen * 12 * 0.82 / 1000;
  return { main: { label: 'Annual Savings', value: '₹' + Math.round(annualSaving).toLocaleString() }, secondary: [{ label: 'Monthly Generation', value: Math.round(monthlyGen) + ' units' }, { label: 'Monthly Bill Savings', value: '₹' + Math.round(monthlySaving).toLocaleString() }, { label: 'Govt Subsidy (Surya Ghar)', value: '₹' + subsidy.toLocaleString() }, { label: 'Net Cost After Subsidy', value: '₹' + Math.round(netCost).toLocaleString() }, { label: 'Payback (with subsidy)', value: paybackWithSubsidy.toFixed(1) + ' years' }, { label: 'Payback (without subsidy)', value: payback.toFixed(1) + ' years' }, { label: 'CO₂ Saved per Year', value: co2Saved.toFixed(2) + ' tonnes' }] };
};

export const calcHomeRenovation: CalcFunction = (v) => {
  const qualityMult: Record<string, number> = { Economy: 0.6, Standard: 1.0, Premium: 1.6, Luxury: 2.5 };
  const cityMult: Record<string, number> = { 'Metro (Delhi/Mumbai)': 1.2, 'Tier-1 (Pune/Hyd)': 1.0, 'Tier-2': 0.8, 'Tier-3': 0.65 };
  const qm = qualityMult[v.quality as string] || 1; const cm = cityMult[v.city as string] || 1;
  let base: Record<string, number> = {};
  const scope = v.scope as string;
  if (scope === 'Full Renovation') base = { painting: 45, flooring: 120, electrical: 80, plumbing: 60, kitchen: 350, bathroom: 250, carpentry: 200, false_ceiling: 100, misc: 50 };
  else if (scope === 'Kitchen Only') base = { kitchen_cabinets: 400, countertop: 150, tiles: 80, plumbing: 60, electrical: 40, chimney_sink: 80, misc: 30 };
  else if (scope === 'Bathroom Only') base = { tiles: 120, fixtures: 150, plumbing: 80, waterproofing: 50, vanity: 60, misc: 25 };
  else if (scope === 'Painting Only') base = { painting: 40, primer: 10, putty: 15, labour: 20, misc: 5 };
  else base = { flooring_material: 100, labour: 40, leveling: 20, skirting: 15, misc: 10 };
  const area = v.area as number;
  const items = Object.entries(base).map(([k, rate]) => ({ label: k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: '₹' + Math.round(area * rate * qm * cm).toLocaleString() }));
  const totalCost = Object.values(base).reduce((s, r) => s + r, 0) * area * qm * cm;
  return { main: { label: 'Estimated Total Cost', value: '₹' + Math.round(totalCost).toLocaleString() }, secondary: [...items, { label: 'Cost per sq ft', value: '₹' + Math.round(totalCost / area).toLocaleString() }, { label: 'Timeline (est.)', value: scope === 'Full Renovation' ? '45-60 days' : scope === 'Painting Only' ? '7-10 days' : '15-25 days' }] };
};

export const calcConcreteMix: CalcFunction = (v) => {
  const ratios: Record<string, number[]> = { 'M10 (1:3:6)': [1, 3, 6], 'M15 (1:2:4)': [1, 2, 4], 'M20 (1:1.5:3)': [1, 1.5, 3], 'M25 (1:1:2)': [1, 1, 2], 'M30 (Design Mix)': [1, 0.75, 1.5], Custom: [v.customCement as number, v.customSand as number, v.customAggregate as number] };
  const r = ratios[v.mixRatio as string] || [1, 1.5, 3];
  const vol = (v.volume_cm as number) * (1 + (v.wastage_cm as number) / 100); const dryVol = vol * 1.54; const totalParts = r[0] + r[1] + r[2];
  const cementBags = Math.ceil(dryVol * r[0] / totalParts * 1440 / 50);
  return { main: { label: 'Cement Bags (50kg)', value: cementBags + ' bags' }, secondary: [{ label: 'Sand Required', value: (dryVol * r[1] / totalParts).toFixed(3) + ' m³' }, { label: 'Aggregate Required', value: (dryVol * r[2] / totalParts).toFixed(3) + ' m³' }, { label: 'Water (est.)', value: Math.round(cementBags * 50 * 0.5) + ' litres' }, { label: 'Dry Volume (×1.54)', value: dryVol.toFixed(3) + ' m³' }, { label: 'Mix Ratio', value: r.join(' : ') }] };
};

export const calcMaterialWaste: CalcFunction = (v) => {
  const material = v.material_mw as string; const area = v.area_mw as number;
  const unit: Record<string, string> = { 'Tiles (floor/wall)': 'tiles', 'Paint (interior)': 'litres', 'Paint (exterior)': 'litres', 'Laminate Flooring': 'sq ft', Wallpaper: 'rolls', Carpet: 'sq ft' };
  const tileSizes: Record<string, number> = { '2×2 ft': 4, '1×2 ft': 2, '1×1 ft': 1, Custom: 1 };
  let baseQty: number;
  if (material.includes('Paint')) baseQty = area / (material.includes('exterior') ? 80 : 100) * (v.coats as number);
  else if (material.includes('Tile')) baseQty = Math.ceil(area / (tileSizes[v.materialSize as string] || 1));
  else if (material.includes('Wallpaper')) baseQty = Math.ceil(area / 56);
  else baseQty = area;
  const wastagePct = v.wastage_mw as number;
  const totalQty = Math.ceil(baseQty * (1 + wastagePct / 100));
  return { main: { label: 'Total Required', value: totalQty + ' ' + (unit[material] || 'units') }, secondary: [{ label: 'Base Quantity', value: Math.ceil(baseQty) + ' ' + (unit[material] || 'units') }, { label: 'Extra for Wastage (' + wastagePct + '%)', value: (totalQty - baseQty) + ' ' + (unit[material] || 'units') }, { label: 'Surface Area', value: area + ' sq ft' }, { label: 'Material', value: material }] };
};

export const calcRainwater: CalcFunction = (v) => {
  const coeffMap: Record<string, number> = { '0.9 (concrete/metal roof)': 0.9, '0.8 (tiled roof)': 0.8, '0.6 (ground/gravel)': 0.6, Custom: v.customCoeff as number };
  const coeff = coeffMap[v.runoffCoeff as string] || 0.85;
  const roofSqM = (v.roofArea_rw as number) * 0.0929;
  const annualCollection = roofSqM * (v.annualRainfall as number) * coeff;
  const monthlyAvg = annualCollection / 12; const dailyAvg = annualCollection / 365;
  const annualDemand = (v.dailyDemand_rw as number) * 365;
  const pctDemandMet = Math.min(100, (annualCollection / annualDemand) * 100);
  const tankSize = Math.ceil(monthlyAvg * 1.5 / 1000) * 1000;
  return { main: { label: 'Annual Collection', value: Math.round(annualCollection).toLocaleString() + ' litres' }, secondary: [{ label: 'Monthly Average', value: Math.round(monthlyAvg).toLocaleString() + ' litres' }, { label: 'Daily Average', value: Math.round(dailyAvg) + ' litres' }, { label: '% of Demand Met', value: pctDemandMet.toFixed(1) + '%' }, { label: 'Suggested Tank Size', value: tankSize.toLocaleString() + ' litres' }, { label: 'Runoff Coefficient', value: String(coeff) }] };
};

/* ── Staircase Calculator ─────────────────────────── */
export const calcStaircase: CalcFunction = (v) => {
  const rise = Number(v.totalRise) || 3000; // mm
  const targetRiser = Number(v.targetRiser) || 175; // mm
  const targetTread = Number(v.targetTread) || 275; // mm

  const numRisers = Math.round(rise / targetRiser);
  const exactRiser = rise / numRisers;
  const numTreads = numRisers - 1;
  const totalRun = numTreads * targetTread;

  const angleRad = Math.atan(exactRiser / targetTread);
  const angleDeg = angleRad * (180 / Math.PI);

  let compliance = 'Standard Compliant [OK]';
  if (exactRiser > 200 || exactRiser < 120) compliance = 'Riser out of standard range (120-200mm) [!]';
  else if (targetTread < 220 || targetTread > 350) compliance = 'Tread depth out of standard range (220-350mm) [!]';

  return {
    main: { label: 'Number of Risers', value: numRisers + ' steps (Exact Riser: ' + exactRiser.toFixed(1) + ' mm)' },
    secondary: [
      { label: 'Number of Treads', value: numTreads + ' treads' },
      { label: 'Tread Depth', value: targetTread + ' mm' },
      { label: 'Total Staircase Run', value: (totalRun / 1000).toFixed(2) + ' m' },
      { label: 'Staircase Angle', value: angleDeg.toFixed(1) + '°' },
      { label: 'Safety Compliance', value: compliance },
      { label: 'Riser + Tread Rule (2R + T)', value: Math.round(2 * exactRiser + targetTread) + ' mm (ideal is 600-640mm)' }
    ]
  };
};

/* ── Septic Tank Size Calculator ──────────────────── */
export const calcSepticTank: CalcFunction = (v) => {
  const users = Number(v.users) || 6;
  const waterPerPerson = Number(v.waterPerPerson) || 150; // L/day
  const interval = Number(v.interval) || 2; // years

  // Septic volume (L) = A (users * water * days retention) + B (sludge storage)
  // Standard retention is 1-3 days. Let's assume 2 days retention.
  const sewageVolume = users * waterPerPerson * 2;
  const sludgeVolume = users * 30 * interval; // ~30L sludge per person per year
  const totalLiquidVolume = sewageVolume + sludgeVolume;
  
  // Total tank volume (including 0.3m freeboard, which adds approx 25% volume)
  const totalVolumeLiters = totalLiquidVolume * 1.25;
  const volM3 = totalVolumeLiters / 1000;

  // Standard dimensions L:W is 2:1 to 4:1. Let's assume 3:1 ratio, depth = 1.5m
  const depth = 1.5;
  const area = volM3 / depth;
  const width = Math.sqrt(area / 3);
  const length = width * 3;

  return {
    main: { label: 'Recommended Capacity', value: Math.round(totalVolumeLiters).toLocaleString() + ' Liters (' + volM3.toFixed(2) + ' m³)' },
    secondary: [
      { label: 'Length (internal)', value: length.toFixed(2) + ' m' },
      { label: 'Width (internal)', value: width.toFixed(2) + ' m' },
      { label: 'Depth (including freeboard)', value: (depth + 0.3).toFixed(2) + ' m' },
      { label: 'Number of Users', value: String(users) },
      { label: 'Cleaning Frequency', value: `Every ${interval} years` },
      { label: 'Daily Wastewater Flow', value: (users * waterPerPerson) + ' L/day' }
    ]
  };
};

/* ── Home Electrical Load Calculator ──────────────── */
export const calcElectricalLoad: CalcFunction = (v) => {
  const acCount = Number(v.acCount) || 1;      // ~1500W each
  const fansCount = Number(v.fansCount) || 4;    // ~75W each
  const lightsCount = Number(v.lightsCount) || 10; // ~15W each
  const geyserCount = Number(v.geyserCount) || 0; // ~2000W each
  const fridgeCount = Number(v.fridgeCount) || 1; // ~300W each
  const tvCount = Number(v.tvCount) || 1;         // ~100W each
  const ovenCount = Number(v.ovenCount) || 0;     // ~1500W each

  const rawLoad = (acCount * 1500) + (fansCount * 75) + (lightsCount * 15) + (geyserCount * 2000) + (fridgeCount * 300) + (tvCount * 100) + (ovenCount * 1500);
  
  // Apply standard demand/diversity factor of 0.8 (not all appliances run simultaneously)
  const connectedLoadW = rawLoad;
  const runningLoadW = rawLoad * 0.8;

  // Ampere calculation at 230V single phase
  const runningCurrentAmps = runningLoadW / 230;

  // Recommendations
  let mcbSize = '16 A';
  if (runningCurrentAmps > 40) mcbSize = '63 A';
  else if (runningCurrentAmps > 25) mcbSize = '40 A';
  else if (runningCurrentAmps > 16) mcbSize = '32 A';
  else if (runningCurrentAmps > 10) mcbSize = '20 A';

  let wireGauge = '4.0 sq mm';
  if (runningCurrentAmps > 32) wireGauge = '10.0 sq mm';
  else if (runningCurrentAmps > 20) wireGauge = '6.0 sq mm';
  else if (runningCurrentAmps < 15) wireGauge = '2.5 sq mm';

  return {
    main: { label: 'Total Connected Load', value: (connectedLoadW / 1000).toFixed(2) + ' kW' },
    secondary: [
      { label: 'Estimated Running Load', value: (runningLoadW / 1000).toFixed(2) + ' kW (diversity factor applied)' },
      { label: 'Peak Current Draw', value: runningCurrentAmps.toFixed(1) + ' Amps' },
      { label: 'Recommended Main MCB', value: mcbSize },
      { label: 'Recommended Service Cable', value: wireGauge },
      { label: 'AC Units Load', value: (acCount * 1.5) + ' kW' },
      { label: 'Geysers Load', value: (geyserCount * 2.0) + ' kW' },
      { label: 'Other Appliances Load', value: ((fansCount * 75 + lightsCount * 15 + fridgeCount * 300 + tvCount * 100 + ovenCount * 1500) / 1000).toFixed(2) + ' kW' }
    ]
  };
};
