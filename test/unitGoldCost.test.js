// test/unitGoldCost.test.js
// Verify that unit gold cost constants are defined correctly

const assert = require('assert');

(async () => {
  // Import main to access UNIT_GOLD_COST (export not defined). We'll import the file and evaluate its globals.
  // Since UNIT_GOLD_COST is defined in src/main.js as a const in module scope, we can import the file and read it via eval.
  const { readFile } = await import('fs').then(m => ({readFile: m.promises.readFile }));
  const path = require('path');
  const filePath = path.resolve(__dirname, '../src/main.js');
  const content = await readFile(filePath, 'utf8');
  // Extract the UNIT_GOLD_COST object via regex
  const match = content.match(/const UNIT_GOLD_COST = (\{[^}]*\});/);
  assert.ok(match, 'UNIT_GOLD_COST definition not found');
  // eslint-disable-next-line no-eval
  const UNIT_GOLD_COST = eval('(' + match[1] + ')');
  const expected = {
    Footman: 600,
    Archer: 500,
    Knight: 800,
    Catapult: 900,
    Dragon: 2500,
  };
  assert.deepStrictEqual(UNIT_GOLD_COST, expected, 'UNIT_GOLD_COST values mismatch');
  console.log('unitGoldCost test passed');
})();
