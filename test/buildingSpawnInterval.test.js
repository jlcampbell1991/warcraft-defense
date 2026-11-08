// test/buildingSpawnInterval.test.js
// Verify that each building type has the correct spawn interval in milliseconds.

const assert = require('assert');

(async () => {
  const { Building } = await import('../src/entities/building.js');
  const tileSize = 20;
  const expectedIntervals = {
    Barracks: 6000,
    ArcheryRange: 7000,
    Stable: 9000,
    Workshop: 25000,
    DragonRoost: 25000,
  };

  for (const [type, expected] of Object.entries(expectedIntervals)) {
    const b = new Building(type, 0, 0, tileSize);
    assert.strictEqual(b.spawnInterval, expected, `${type} should have spawnInterval ${expected}`);
  }

  console.log('buildingSpawnInterval test passed');
})();
