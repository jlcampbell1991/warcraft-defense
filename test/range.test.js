// test/range.test.js
// Verify that each Unit type has correct range (in tiles)

const assert = require('assert');

(async () => {
  const { Unit } = await import('../src/entities/unit.js');
  const cases = [
    { type: 'Footman', expected: 1 },
    { type: 'Knight', expected: 1 },
    { type: 'Archer', expected: 5 },
    { type: 'Catapult', expected: 8 },
    { type: 'Dragon', expected: 4 },
  ];
  for (const c of cases) {
    const u = new Unit(c.type, 0, 0, 20);
    assert.strictEqual(u.range, c.expected, `Range for ${c.type} should be ${c.expected}`);
  }
  console.log('range test passed');
})();