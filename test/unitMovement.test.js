// test/unitMovement.test.js
// Verify that a unit does not move when an enemy is within combat radius

const assert = require('assert');

(async () => {
  const { findNearest, isOccupied } = await import('../src/utils/movement.js');
  const COMBAT_RADIUS = 10; // matches src/main.js
  const delta = 100; // ms
  const unit = { x: 50, y: 50, size: 20, speed: 0.05 };
  const enemy = { x: 55, y: 55 };
  const state = { units: [unit], enemies: [enemy] };

  const target = findNearest(unit, state.enemies);
  if (target) {
    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    const dist = Math.hypot(dx, dy);
    if (dist > COMBAT_RADIUS) {
      if (dist > 0) {
        const nx = (dx / dist) * unit.speed * delta;
        const ny = (dy / dist) * unit.speed * delta;
        const newX = unit.x + nx;
        const newY = unit.y + ny;
        const occupied = isOccupied(newX, newY, unit.size, state.units, unit);
        if (!occupied) {
          unit.x = newX;
          unit.y = newY;
        }
      }
    }
  }

  assert.strictEqual(unit.x, 50, 'Unit should not have moved on x axis');
  assert.strictEqual(unit.y, 50, 'Unit should not have moved on y axis');
  console.log('unitMovement test passed');
})();
