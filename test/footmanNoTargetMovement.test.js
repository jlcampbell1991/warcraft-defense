// test/footmanNoTargetMovement.test.js
// Verify that a Footman unit moves rightwards when there are no enemies.

const assert = require('assert');

(async () => {
  const { Unit } = await import('../src/entities/unit.js');
  const { isOccupied, findNearest } = await import('../src/utils/movement.js');
  const delta = 100; // ms
  const tileSize = 20; // arbitrary, not used here
  const footman = new Unit('Footman', 0, 0, tileSize);
  const state = { units: [footman], enemies: [] };

  // Simulate the movement logic from main loop
  const target = findNearest(footman, state.enemies);
  if (target) {
    // not expected
  } else if (footman.type === 'Footman') {
    const nx = footman.speed * delta;
    const newX = footman.x + nx;
    const occupied = isOccupied(newX, footman.y, footman.size, state.units, footman);
    if (!occupied) {
      footman.x = newX;
    }
  }

  const expectedX = footman.speed * delta; // since initial x=0
  assert.strictEqual(footman.x, expectedX, 'Footman should have moved rightwards by speed * delta');
  console.log('footmanNoTargetMovement test passed');
})();
