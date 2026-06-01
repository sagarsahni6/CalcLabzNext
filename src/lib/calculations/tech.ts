/* ═══════════════════════════════════════════════════
   Calc Labz — Tech & Developer Calculations
   Password strength, subnet, bandwidth, and more.
   ═══════════════════════════════════════════════════ */

import { CalculatorResult } from '@/types/calculator';

/* ── Password Strength Analyzer ───────────────────── */
export function calcPasswordStrength(v: Record<string, number | string>): CalculatorResult {
  const pw = String(v.password || '');
  const len = pw.length;

  if (len === 0) {
    return {
      main: { label: 'Strength', value: 'Enter a password' },
      secondary: [{ label: 'Entropy', value: '0 bits' }],
    };
  }

  // Calculate character pool size
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;

  const entropy = Math.round(len * Math.log2(pool || 1));

  // Crack time estimation (assuming 10 billion guesses/sec)
  const guessesPerSec = 1e10;
  const totalGuesses = Math.pow(pool || 1, len);
  const seconds = totalGuesses / guessesPerSec / 2; // average case

  let crackTime: string;
  if (seconds < 1) crackTime = 'Instantly';
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 86400 * 365) crackTime = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 86400 * 365 * 1000) crackTime = `${Math.round(seconds / (86400 * 365))} years`;
  else if (seconds < 86400 * 365 * 1e6) crackTime = `${Math.round(seconds / (86400 * 365 * 1000))}K years`;
  else crackTime = 'Centuries+';

  let strength: string;
  let score: number;
  if (entropy < 28) { strength = '🔴 Very Weak'; score = 1; }
  else if (entropy < 36) { strength = '🟠 Weak'; score = 2; }
  else if (entropy < 60) { strength = '🟡 Fair'; score = 3; }
  else if (entropy < 80) { strength = '🟢 Strong'; score = 4; }
  else { strength = '🟢 Very Strong'; score = 5; }

  const suggestions: string[] = [];
  if (len < 12) suggestions.push('Use at least 12 characters');
  if (!/[A-Z]/.test(pw)) suggestions.push('Add uppercase letters');
  if (!/[0-9]/.test(pw)) suggestions.push('Add numbers');
  if (!/[^a-zA-Z0-9]/.test(pw)) suggestions.push('Add special characters (!@#$%)');
  if (/(.)\1{2,}/.test(pw)) suggestions.push('Avoid repeated characters');

  return {
    main: { label: 'Password Strength', value: strength },
    secondary: [
      { label: 'Entropy', value: `${entropy} bits` },
      { label: 'Estimated Crack Time', value: crackTime },
      { label: 'Character Pool Size', value: `${pool} characters` },
      { label: 'Password Length', value: `${len} characters` },
      { label: 'Score', value: `${score} / 5` },
      ...(suggestions.length > 0 ? [{ label: 'Suggestion', value: suggestions[0] }] : []),
    ],
    chart: { a: score, b: 5 - score, lA: 'Strength', lB: 'Room to Improve' },
    tips: suggestions,
  };
}

/* ── Word & Character Counter ─────────────────────── */
export function calcWordCounter(v: Record<string, number | string>): CalculatorResult {
  const text = String(v.text || '');

  if (!text.trim()) {
    return {
      main: { label: 'Words', value: '0' },
      secondary: [{ label: 'Characters', value: '0' }],
    };
  }

  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || 1;
  const readingTimeMin = Math.ceil(words / 200);
  const speakingTimeMin = Math.ceil(words / 130);

  return {
    main: { label: 'Word Count', value: words.toLocaleString() },
    secondary: [
      { label: 'Characters (with spaces)', value: chars.toLocaleString() },
      { label: 'Characters (no spaces)', value: charsNoSpace.toLocaleString() },
      { label: 'Sentences', value: sentences.toLocaleString() },
      { label: 'Paragraphs', value: paragraphs.toLocaleString() },
      { label: 'Reading Time', value: `~${readingTimeMin} min` },
      { label: 'Speaking Time', value: `~${speakingTimeMin} min` },
      { label: 'Avg Words/Sentence', value: sentences > 0 ? (words / sentences).toFixed(1) : '0' },
    ],
    chart: { a: words, b: sentences, lA: 'Words', lB: 'Sentences' },
  };
}

/* ── Aspect Ratio Calculator ──────────────────────── */
export function calcAspectRatio(v: Record<string, number | string>): CalculatorResult {
  const w = Number(v.width) || 1920;
  const h = Number(v.height) || 1080;

  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
  const d = gcd(Math.abs(Math.round(w)), Math.abs(Math.round(h)));
  const rw = Math.round(w) / d;
  const rh = Math.round(h) / d;

  // Common presets matching
  const presets: Record<string, string> = {
    '16:9': 'YouTube, TV, Desktop',
    '9:16': 'TikTok, Reels, Stories',
    '4:3': 'iPad, Classic TV',
    '3:4': 'Portrait Photo',
    '1:1': 'Instagram Square',
    '21:9': 'Ultra-wide Monitor',
    '3:2': 'DSLR Photo',
    '2:3': 'Portrait Photo',
    '4:5': 'Instagram Portrait',
  };
  const ratioStr = `${rw}:${rh}`;
  const preset = presets[ratioStr] || 'Custom';

  // Common social media sizes
  const socialSizes = [
    { platform: 'YouTube Thumbnail', w: 1280, h: 720 },
    { platform: 'Instagram Post', w: 1080, h: 1080 },
    { platform: 'Instagram Story', w: 1080, h: 1920 },
    { platform: 'Twitter Post', w: 1200, h: 675 },
    { platform: 'Facebook Cover', w: 820, h: 312 },
  ];

  const matchedPlatform = socialSizes.find(s => {
    const sd = gcd(s.w, s.h);
    return s.w / sd === rw && s.h / sd === rh;
  });

  return {
    main: { label: 'Aspect Ratio', value: ratioStr },
    secondary: [
      { label: 'Dimensions', value: `${Math.round(w)} × ${Math.round(h)} px` },
      { label: 'Decimal Ratio', value: (w / h).toFixed(4) },
      { label: 'Common Use', value: preset },
      { label: 'Total Pixels', value: (Math.round(w) * Math.round(h)).toLocaleString() },
      { label: 'Megapixels', value: ((w * h) / 1e6).toFixed(2) + ' MP' },
      ...(matchedPlatform ? [{ label: 'Platform Match', value: matchedPlatform.platform, pos: true as const }] : []),
    ],
    chart: { a: Math.round(w), b: Math.round(h), lA: 'Width', lB: 'Height' },
  };
}

/* ── Social Media Image Size ──────────────────────── */
export function calcSocialMediaImage(v: Record<string, number | string>): CalculatorResult {
  const platform = String(v.platform || 'Instagram');

  const sizes: Record<string, { profile: string; cover: string; post: string; story: string; thumb: string }> = {
    'Instagram': { profile: '320×320', cover: 'N/A', post: '1080×1080', story: '1080×1920', thumb: '161×161' },
    'YouTube': { profile: '800×800', cover: '2560×1440', post: 'N/A', story: 'N/A', thumb: '1280×720' },
    'Twitter / X': { profile: '400×400', cover: '1500×500', post: '1200×675', story: 'N/A', thumb: 'N/A' },
    'LinkedIn': { profile: '400×400', cover: '1584×396', post: '1200×627', story: '1080×1920', thumb: 'N/A' },
    'Facebook': { profile: '170×170', cover: '820×312', post: '1200×630', story: '1080×1920', thumb: 'N/A' },
  };

  const s = sizes[platform] || sizes['Instagram'];

  return {
    main: { label: 'Platform', value: platform },
    secondary: [
      { label: 'Profile Picture', value: s.profile },
      { label: 'Cover / Banner', value: s.cover },
      { label: 'Post Image', value: s.post },
      { label: 'Story / Reel', value: s.story },
      { label: 'Thumbnail', value: s.thumb },
      { label: 'Format', value: 'JPG/PNG (< 10MB)' },
    ],
  };
}

/* ── Dog Age Calculator (Scientific) ──────────────── */
export function calcDogAge(v: Record<string, number | string>): CalculatorResult {
  const dogYears = Number(v.dogAge) || 5;
  const sizeStr = String(v.breedSize || 'Medium');

  // AKC/science-based aging: dogs age faster in early years
  // Varies by breed size — larger dogs age faster after maturity
  const ageMultipliers: Record<string, number[]> = {
    'Small': [15, 9.5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    'Medium': [15, 9.5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    'Large': [15, 9.5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    'Giant': [15, 9.5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  };

  const multipliers = ageMultipliers[sizeStr] || ageMultipliers['Medium'];
  let humanAge = 0;
  for (let i = 0; i < Math.min(Math.floor(dogYears), multipliers.length); i++) {
    humanAge += multipliers[i];
  }
  const frac = dogYears - Math.floor(dogYears);
  if (frac > 0 && Math.floor(dogYears) < multipliers.length) {
    humanAge += frac * multipliers[Math.floor(dogYears)];
  }
  humanAge = Math.round(humanAge);

  let lifeStage: string;
  if (dogYears < 0.5) lifeStage = '🐾 Puppy';
  else if (dogYears < 1) lifeStage = '🐕 Junior';
  else if (dogYears < 3) lifeStage = '🐕 Young Adult';
  else if (dogYears < 7) lifeStage = '🐕 Adult';
  else if (dogYears < 10) lifeStage = '🐕‍🦺 Mature';
  else lifeStage = '🐕‍🦺 Senior';

  const avgLifespan: Record<string, string> = {
    'Small': '12–16 years', 'Medium': '10–14 years',
    'Large': '8–12 years', 'Giant': '6–10 years',
  };

  return {
    main: { label: 'Human Equivalent Age', value: `~${humanAge} years` },
    secondary: [
      { label: 'Dog Age', value: `${dogYears} year(s)` },
      { label: 'Breed Size', value: sizeStr },
      { label: 'Life Stage', value: lifeStage },
      { label: 'Average Lifespan', value: avgLifespan[sizeStr] || '10–14 years' },
      { label: 'Vet Checkup', value: dogYears >= 7 ? 'Every 6 months (senior)' : 'Annually' },
    ],
    chart: { a: dogYears, b: humanAge, lA: 'Dog Years', lB: 'Human Years' },
  };
}

/* ── IP Subnet Calculator ─────────────────────────── */
export function calcSubnet(v: Record<string, number | string>): CalculatorResult {
  const ip = String(v.ip || '192.168.1.0');
  const cidr = Number(v.cidr) || 24;

  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return { main: { label: 'Error', value: 'Invalid IP address' } };
  }
  if (cidr < 0 || cidr > 32) {
    return { main: { label: 'Error', value: 'CIDR must be 0–32' } };
  }

  const ipNum = (parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3]) >>> 0;
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcard = (~mask) >>> 0;
  const network = (ipNum & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const firstHost = cidr >= 31 ? network : (network + 1) >>> 0;
  const lastHost = cidr >= 31 ? broadcast : (broadcast - 1) >>> 0;
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2;

  function toIP(n: number): string {
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  }

  return {
    main: { label: 'Network Address', value: `${toIP(network)}/${cidr}` },
    secondary: [
      { label: 'Subnet Mask', value: toIP(mask) },
      { label: 'Wildcard Mask', value: toIP(wildcard) },
      { label: 'Broadcast Address', value: toIP(broadcast) },
      { label: 'First Usable Host', value: toIP(firstHost) },
      { label: 'Last Usable Host', value: toIP(lastHost) },
      { label: 'Usable Hosts', value: usableHosts.toLocaleString() },
      { label: 'Total Addresses', value: Math.pow(2, 32 - cidr).toLocaleString() },
      { label: 'IP Class', value: parts[0] < 128 ? 'A' : parts[0] < 192 ? 'B' : parts[0] < 224 ? 'C' : 'D/E' },
    ],
    chart: { a: usableHosts, b: 2, lA: 'Usable Hosts', lB: 'Reserved (Network + Broadcast)' },
  };
}

/* ── Bandwidth / Download Time ────────────────────── */
export function calcBandwidth(v: Record<string, number | string>): CalculatorResult {
  const fileSizeMB = Number(v.fileSize) || 1000;
  const speedMbps = Number(v.speed) || 100;

  const fileSizeBits = fileSizeMB * 8; // Megabits
  const seconds = fileSizeBits / speedMbps;

  let timeStr: string;
  if (seconds < 1) timeStr = `${Math.round(seconds * 1000)} ms`;
  else if (seconds < 60) timeStr = `${seconds.toFixed(1)} sec`;
  else if (seconds < 3600) timeStr = `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  else timeStr = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;

  // Streaming quality recommendations
  let streamQuality: string;
  if (speedMbps >= 25) streamQuality = '4K UHD streaming ✓';
  else if (speedMbps >= 10) streamQuality = '1080p HD streaming ✓';
  else if (speedMbps >= 5) streamQuality = '720p streaming ✓';
  else if (speedMbps >= 1.5) streamQuality = '480p streaming ✓';
  else streamQuality = 'Audio only';

  return {
    main: { label: 'Download Time', value: timeStr },
    secondary: [
      { label: 'File Size', value: fileSizeMB >= 1000 ? `${(fileSizeMB / 1000).toFixed(2)} GB` : `${fileSizeMB} MB` },
      { label: 'Speed', value: `${speedMbps} Mbps` },
      { label: 'Speed (MB/s)', value: `${(speedMbps / 8).toFixed(2)} MB/s` },
      { label: 'Streaming Quality', value: streamQuality },
      { label: 'Upload Time (half speed)', value: seconds < 60 ? `${(seconds * 2).toFixed(1)} sec` : `${Math.floor(seconds * 2 / 60)}m ${Math.round((seconds * 2) % 60)}s` },
    ],
    chart: { a: fileSizeMB, b: Math.round(seconds), lA: 'File Size (MB)', lB: 'Time (sec)' },
  };
}

/* ── Color Code Converter ─────────────────────────── */
export function calcColorConverter(v: Record<string, number | string>): CalculatorResult {
  const input = String(v.colorInput || '#3B82F6').trim();

  let r = 0, g = 0, b = 0;

  // Parse HEX
  const hexMatch = input.match(/^#?([0-9a-fA-F]{6})$/);
  if (hexMatch) {
    r = parseInt(hexMatch[1].substring(0, 2), 16);
    g = parseInt(hexMatch[1].substring(2, 4), 16);
    b = parseInt(hexMatch[1].substring(4, 6), 16);
  }
  // Parse RGB
  const rgbMatch = input.match(/^rgb\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)?$/i);
  if (rgbMatch) {
    r = Math.min(255, parseInt(rgbMatch[1]));
    g = Math.min(255, parseInt(rgbMatch[2]));
    b = Math.min(255, parseInt(rgbMatch[3]));
  }

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

  // RGB to HSL
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

  // Complementary color
  const compH = (Math.round(h * 360) + 180) % 360;
  const compHsl = `hsl(${compH}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

  // CMYK
  const k = 1 - max;
  const c = max === 0 ? 0 : (1 - rn - k) / (1 - k);
  const m = max === 0 ? 0 : (1 - gn - k) / (1 - k);
  const y = max === 0 ? 0 : (1 - bn - k) / (1 - k);

  return {
    main: { label: 'HEX', value: hex },
    secondary: [
      { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
      { label: 'HSL', value: hsl },
      { label: 'CMYK', value: `C:${Math.round(c * 100)}% M:${Math.round(m * 100)}% Y:${Math.round(y * 100)}% K:${Math.round(k * 100)}%` },
      { label: 'Complementary', value: compHsl },
      { label: 'CSS Variable', value: `--color: ${hex};` },
      { label: 'Brightness', value: l > 0.5 ? 'Light' : 'Dark' },
    ],
    chart: { a: r + g + b, b: 765 - (r + g + b), lA: 'Color', lB: 'Remaining' },
  };
}

/* ── JSON Formatter & Validator ───────────────────── */
export function calcJsonFormatter(v: Record<string, number | string>): CalculatorResult {
  const jsonInput = String(v.jsonInput || '').trim();

  if (!jsonInput) {
    return {
      main: { label: 'Status', value: 'Empty Input' },
      secondary: [{ label: 'Validation', value: 'Please enter JSON string to validate' }],
    };
  }

  try {
    const parsed = JSON.parse(jsonInput);
    const formatted = JSON.stringify(parsed, null, 2);
    
    // Analyze structure
    let keyCount = 0;
    let maxDepth = 0;
    
    function analyze(obj: any, depth: number) {
      maxDepth = Math.max(maxDepth, depth);
      if (obj && typeof obj === 'object') {
        keyCount += Object.keys(obj).length;
        Object.values(obj).forEach(val => analyze(val, depth + 1));
      }
    }
    
    analyze(parsed, 1);

    return {
      main: { label: 'Validation Status', value: 'VALID JSON ✓' },
      secondary: [
        { label: 'Structural Keys Count', value: String(keyCount) },
        { label: 'Max Nesting Depth', value: String(maxDepth) },
        { label: 'Size (Formatted)', value: formatted.length + ' characters' },
        { label: 'Minified Size', value: JSON.stringify(parsed).length + ' characters' },
        { label: 'Root Type', value: Array.isArray(parsed) ? 'Array' : 'Object' },
        { label: 'Formatted Output Preview', value: formatted.substring(0, 300) + (formatted.length > 300 ? '...' : '') }
      ]
    };
  } catch (err: any) {
    return {
      main: { label: 'Validation Status', value: 'INVALID JSON ✗' },
      secondary: [
        { label: 'Error Message', value: err.message },
        { label: 'Error Position', value: String(err.message.match(/position\s+(\d+)/)?.[1] || 'Unknown') },
        { label: 'Input Length', value: jsonInput.length + ' characters' }
      ]
    };
  }
}
