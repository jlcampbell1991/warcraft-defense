// test/enemySpeed.test.js
// Verify that each Enemy type has correct speed based on stats

const assert = require('assert');

(async () => {
  const { Enemy } = await import('../src/entities/enemy.js');
  const eps = 0.0001;
  const cases = [
    { type: 'Footman', expected: 0.05 },
    { type: 'Archer', expected: 0.05 },
    { type: 'Knight', expected: 0.065 },
    { type: 'Catapult', expected: 0.025 },
    { type: 'Dragon', expected: 0.08 },
  ];
  for (const c of cases) {
    const e = new Enemy(c.type, 0, 0, 10);
    assert.ok(Math.abs(e.speed - c.expected) < eps, `Speed for ${c.type} should be ${c.expected}, got ${e.speed}`);
  }
  console.log('enemySpeed test passed');
})();