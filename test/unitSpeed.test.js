// test/unitSpeed.test.js
// Verify that each Unit type has correct speed based on stats

const assert = require('assert');

(async () => {
  const { Unit } = await import('../src/entities/unit.js');
  const eps = 0.0001;
  const cases = [
    { type: 'Footman', expected: 0.05 },
    { type: 'Archer', expected: 0.05 },
    { type: 'Knight', expected: 0.065 },
    { type: 'Catapult', expected: 0.025 },
    { type: 'Dragon', expected: 0.08 },
  ];
  for (const c of cases) {
    const u = new Unit(c.type, 0, 0, 10);
    assert.ok(Math.abs(u.speed - c.expected) < eps, `Speed for ${c.type} should be ${c.expected}, got ${u.speed}`);
  }
  console.log('unitSpeed test passed');
})();