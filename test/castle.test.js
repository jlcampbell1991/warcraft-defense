// test/castle.test.js
// Verify that the castle placement adds four towers with 2500 HP each and marks them as castle.

const assert = require('assert');

(async () => {
  const { placeCastle } = await import('../src/castle.js');
  // Mock state similar to gameState structure
  const mockState = {
    tileSize: 20,
    buildings: [],
  };
  placeCastle(mockState);
  const castleTowers = mockState.buildings.filter(b => b.isCastle);
  assert.strictEqual(castleTowers.length, 4, 'Should have 4 castle towers');
  castleTowers.forEach(t => {
    assert.strictEqual(t.type, 'Tower', 'Castle tower type should be Tower');
    assert.strictEqual(t.maxHealth, 2500, 'Castle tower maxHealth should be 2500');
    assert.strictEqual(t.health, 2500, 'Castle tower health should be 2500');
  });
  console.log('castle.test passed');
})();
