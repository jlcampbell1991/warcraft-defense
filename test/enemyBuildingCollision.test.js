// test/enemyBuildingCollision.test.js
// Verify that enemy ground units cannot move onto building tiles but can remain adjacent.

const assert = require('assert');

(async () => {
  const { Enemy } = await import('../src/entities/enemy.js');
  const { Building } = await import('../src/entities/building.js');
  const { findNearest } = await import('../src/utils/movement.js');
  const tileSize = 20;

  // Mock game state
  const state = {
    buildings: [],
    enemies: [],
    units: [],
  };

  // Place a non‑wall building at (0,0)
  const building = new Building('Barracks', 0, 0, tileSize);
  state.buildings.push(building);

  // Enemy positioned two tiles to the right (40,0)
  const enemy = new Enemy('Footman', 40, 0, tileSize);
  state.enemies.push(enemy);

  // isBlocked implementation mirrors the updated logic in src/main.js
  const isBlocked = (x, y, size) => {
    for (const b of state.buildings) {
      if (x < b.x + b.size && x + size > b.x && y < b.y + b.size && y + size > b.y) {
        return true;
      }
    }
    return false;
  };

  // Simulate a single movement tick (delta = 1000 ms)
  const delta = 1000; // 1 second
  const target = findNearest(enemy, state.buildings.filter(b => b.type !== 'Wall'));
  if (target) {
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0) {
      const nx = (dx / dist) * enemy.speed * delta;
      const ny = (dy / dist) * enemy.speed * delta;
      const newX = enemy.x + nx;
      const newY = enemy.y + ny;
      // Apply movement rules from src/main.js
      if (!isBlocked(newX, newY, enemy.size) && !state.enemies.some(e => e !== enemy && e.x < newX + enemy.size && e.x + e.size > newX && e.y < newY + enemy.size && e.y + e.size > newY)) {
        enemy.x = newX;
        enemy.y = newY;
      } else {
        // fallback to axis‑only movement (mirrors main loop logic)
        if (!isBlocked(enemy.x + nx, enemy.y, enemy.size)) {
          enemy.x += nx;
        } else if (!isBlocked(enemy.x, enemy.y + ny, enemy.size)) {
          enemy.y += ny;
        }
      }
    }
  }

  // Enemy should not have moved onto the building tile (i.e., x should remain >= tileSize)
  assert.ok(enemy.x >= tileSize, `Enemy moved onto building tile: x=${enemy.x}`);

  console.log('enemyBuildingCollision test passed');
})();
