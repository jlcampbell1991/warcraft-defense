// test/enemyRange.test.js
// Verify that each Enemy type has correct range (in tiles) and can attack from distance

const assert = require('assert');

(async () => {
  const { Enemy } = await import('../src/entities/enemy.js');
  const cases = [
    { type: 'Footman', expected: 1 },
    { type: 'Knight', expected: 1 },
    { type: 'Archer', expected: 5 },
    { type: 'Catapult', expected: 8 },
    { type: 'Dragon', expected: 4 },
  ];
  for (const c of cases) {
    const e = new Enemy(c.type, 0, 0, 20);
    assert.strictEqual(e.range, c.expected, `Range for ${c.type} should be ${c.expected}`);
  }
  console.log('enemy range test passed');
})();