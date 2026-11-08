// test/occupancy.test.js
// Verify occupancy checking prevents overlapping placements and movements.

const assert = require('assert');

(async () => {
  const { isOccupied } = await import('../src/utils/movement.js');
  const tileSize = 20;
  // Define two entities occupying adjacent tiles
  const building = { x: 0, y: 0, size: tileSize };
  const unit = { x: tileSize, y: 0, size: tileSize };
  const entities = [building, unit];

  // Position overlapping building should be occupied
  assert.ok(isOccupied(0, 0, tileSize, entities), 'Tile occupied by building should be true');
  // Position overlapping unit should be occupied
  assert.ok(isOccupied(tileSize, 0, tileSize, entities), 'Tile occupied by unit should be true');
  // Empty tile should be false
  assert.ok(!isOccupied(tileSize * 2, 0, tileSize, entities), 'Empty tile should be false');

  // Excluding the building itself should allow its own position when checking (e.g., during movement)
  assert.ok(!isOccupied(building.x, building.y, building.size, entities, building), 'Excluding self should not report occupied');

  console.log('occupancy test passed');
})();
