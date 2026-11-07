// test/unitDamage.test.js
// Verify that Archer unit deals 6 damage per attack

const assert = require('assert');

(async () => {
  const { Unit } = await import('../src/entities/unit.js');
  const archer = new Unit('Archer', 0, 0, 20);
  assert.strictEqual(archer.damage, 6, 'Archer damage should be 6');
  console.log('unit damage test passed');
})();