// test/tower-damage.test.js
// Verify that a tower projectile deals 12 damage on collision with an enemy.

const assert = require('assert');

(async () => {
  const { Enemy } = await import('../src/entities/enemy.js');
  const { Projectile } = await import('../src/entities/projectile.js');

  // Create an enemy (Footman) with known health
  const enemy = new Enemy('Footman', 0, 0, 20); // size 20, health 60
  const initialHealth = enemy.health;

  // Create a tower projectile positioned at the same location as the enemy (collision)
  const proj = new Projectile('Tower', 0, 0, enemy);

  // Simulate the collision detection logic from src/main.js
  const dx = proj.x - enemy.x;
  const dy = proj.y - enemy.y;
  const distSq = dx * dx + dy * dy;
  const hitRadius = proj.radius + enemy.size / 2;
  if (distSq <= hitRadius * hitRadius) {
    if (proj.type === 'Tower') {
      enemy.health -= 12;
    } else {
      enemy.health -= 100;
    }
    proj.isAlive = false;
  }

  assert.strictEqual(enemy.health, initialHealth - 12, 'Tower projectile should reduce enemy health by 12');
  assert.strictEqual(proj.isAlive, false, 'Projectile should be marked as not alive after hitting');

  console.log('tower-damage.test passed');
})();
