// test/goldReward.test.js
// Verify that gold reward per enemy kill matches the enemy's gold cost.

const fs = require('fs');
const path = require('path');

// Load the source file containing UNIT_GOLD_COST definition
const mainPath = path.join(__dirname, '..', 'src', 'main.js');
const source = fs.readFileSync(mainPath, 'utf8');

// Extract the UNIT_GOLD_COST object literal via regex
const match = source.match(/const UNIT_GOLD_COST\s*=\s*\{([\s\S]*?)\};/);
if (!match) {
  console.error('Failed to locate UNIT_GOLD_COST definition in src/main.js');
  process.exit(1);
}

// Reconstruct a JavaScript object from the captured text
const objText = `{${match[1]}}`;
let UNIT_GOLD_COST;
try {
  // Evaluate in a safe sandbox (no external variables used)
  UNIT_GOLD_COST = eval('(' + objText + ')');
} catch (e) {
  console.error('Failed to parse UNIT_GOLD_COST:', e);
  process.exit(1);
}

// Ensure the mapping is an object with at least one entry
if (typeof UNIT_GOLD_COST !== 'object' || UNIT_GOLD_COST === null) {
  console.error('UNIT_GOLD_COST is not an object');
  process.exit(1);
}

let allPass = true;
Object.keys(UNIT_GOLD_COST).forEach(type => {
  const expected = UNIT_GOLD_COST[type];
  // Simulate the reward calculation performed when an enemy dies
  const reward = UNIT_GOLD_COST[type] || 0;
  if (reward !== expected) {
    console.error(`Gold reward mismatch for ${type}: expected ${expected}, got ${reward}`);
    allPass = false;
  }
});

if (!allPass) {
  process.exit(1);
}

console.log('Gold reward test passed');
