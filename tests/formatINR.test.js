const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

// 1. Read formatters.ts
const formattersPath = path.join(__dirname, '..', 'src', 'lib', 'formatters.ts');
const formattersCode = fs.readFileSync(formattersPath, 'utf8');

// 2. Extract formatINR securely avoiding brittle Regex
// We only care about formatINR, which is a pure function.
// We use a brace-counting method to robustly extract the full function string.

function extractFunction(code, funcName) {
    const startIdx = code.indexOf(`export function ${funcName}`);
    if (startIdx === -1) return null;
    let braceCount = 0;
    let started = false;
    for (let i = startIdx; i < code.length; i++) {
        if (code[i] === '{') {
            braceCount++;
            started = true;
        } else if (code[i] === '}') {
            braceCount--;
        }
        if (started && braceCount === 0) {
            // Strip 'export ' and TypeScript type annotations for VM compatibility
            return code.substring(startIdx, i + 1)
                .replace('export function formatINR(n: number): string', 'function formatINR(n)');
        }
    }
    return null;
}

const formatINRCode = extractFunction(formattersCode, 'formatINR');

if (!formatINRCode) {
    console.error('Could not find formatINR function in app.js');
    process.exit(1);
}

const context = {};
vm.createContext(context);
vm.runInContext(formatINRCode + '\nthis.formatINR = formatINR;', context);

const formatINR = context.formatINR;

// 3. Tests
let passed = 0;
let failed = 0;

function runTest(name, input, expected) {
    try {
        const result = formatINR(input);
        assert.strictEqual(result, expected);
        console.log(`✅ PASS: ${name}`);
        passed++;
    } catch (e) {
        console.error(`❌ FAIL: ${name}`);
        console.error(`   Expected: '${expected}'`);
        console.error(`   Actual:   '${e.actual !== undefined ? e.actual : e.message}'`);
        failed++;
    }
}

console.log('🧪 Running tests for formatINR...\n');

// Less than 1000
runTest('Zero', 0, '0');
runTest('Single digit', 5, '5');
runTest('Double digit', 42, '42');
runTest('Triple digit', 999, '999');

// Thousands
runTest('Exactly one thousand', 1000, '1,000');
runTest('Ten thousands', 15000, '15,000');
runTest('Ninety nine thousands', 99999, '99,999');

// Lakhs and Crores
runTest('One lakh', 100000, '1,00,000');
runTest('Ten lakhs', 1500000, '15,00,000');
runTest('One crore', 10000000, '1,00,00,000');
runTest('Ten crores', 123456789, '12,34,56,789');

// Negative numbers
runTest('Small negative', -500, '-500');
runTest('Thousand negative', -1000, '-1,000');
runTest('Lakh negative', -150000, '-1,50,000');

// Decimal numbers
runTest('Round down decimal', 1234.4, '1,234');
runTest('Round up decimal', 1234.5, '1,235');
runTest('Negative decimal', -1234.5, '-1,234'); // Math.round(-1234.5) is -1234

// String inputs
runTest('String number', '100000', '1,00,000');
runTest('String decimal', '1234.6', '1,235');

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
    process.exit(1);
}
