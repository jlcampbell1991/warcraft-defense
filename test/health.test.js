// test/health.test.js
// Verify health properties on units and buildings and damage handling

const assert = require('assert');

(async () => {
  const { Unit } = await import('../src/entities/unit.js');
  const { Building } = await import('../src/entities/building.js');

  // Unit health test
  const footman = new Unit('Footman', 0, 0, 20);
  assert.strictEqual(footman.maxHealth, 60, 'Footman maxHealth should be 60');
  assert.strictEqual(footman.health, 60, 'Footman initial health should be 60');
  footman.health -= 30;
  assert.strictEqual(footman.health, 30, 'Footman health after damage should be 30');

  // Building health test
  const barracks = new Building('Barracks', 0, 0, 20);
  assert.strictEqual(barracks.maxHealth, 200, 'Barracks maxHealth should be 200');
  assert.strictEqual(barracks.health, 200, 'Barracks initial health should be 200');
  barracks.health -= 250; // overkill
  assert.ok(barracks.health <= 0, 'Barracks health should be <= 0 after overkill');

  console.log('health.test passed');
})();
