// test/spawnEdge.test.js
// Verify that the random spawn position lies on one of the four map edges.

const assert = require('assert');

(async () => {
  const { getRandomSpawnPosition } = await import('../src/spawn.js');
  // Mock state and canvas similar to a medium map (800x600) with tileSize 25 (800/32).
  const canvas = { width: 800, height: 600 };
  const state = { tileSize: Math.floor(canvas.width / 32) }; // 25
  // Run many iterations to increase confidence.
  for (let i = 0; i < 100; i++) {
    const { x, y } = getRandomSpawnPosition(state, canvas);
    const onEdge = (x === 0) || (x === canvas.width) || (y === 0) || (y === canvas.height);
    assert.ok(onEdge, `Spawned position (${x},${y}) is not on any edge`);
  }
  console.log('spawnEdge test passed');
})();
