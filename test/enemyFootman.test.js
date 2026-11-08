// test/enemyFootman.test.js
// Verify enemy footman stats and melee damage with cooldown

const assert = require('assert');

(async () => {
  const { Enemy } = await import('../src/entities/enemy.js');

  // Create footman enemy
  const footman = new Enemy('Footman', 0, 0, 20);
  assert.strictEqual(footman.maxHealth, 60, 'Footman maxHealth should be 60');
  assert.strictEqual(footman.health, 60, 'Footman initial health should be 60');
  assert.strictEqual(footman.damage, 6, 'Footman damage should be 6');
  assert.strictEqual(footman.attackCooldown, 1000, 'Footman attackCooldown should be 1000ms');

  // Dummy target with health property
  const target = { health: 100, x: 0, y: 0 };
  const now = 2000; // arbitrary timestamp

  // Simulate melee attack when cooldown passed
  footman.lastAttack = 500; // enough time passed (2000-500 > 1000)
  // Apply damage logic (same as main loop)
  if (now - (footman.lastAttack || 0) >= footman.attackCooldown) {
    target.health -= footman.damage;
    footman.lastAttack = now;
  }
  assert.strictEqual(target.health, 94, 'Target health should be reduced by 6 after attack');

  // Simulate attack before cooldown expires
  const earlyNow = now + 200; // only 200ms later
  // Reset target health
  target.health = 100;
  footman.lastAttack = now; // last attack just occurred
  if (earlyNow - (footman.lastAttack || 0) >= footman.attackCooldown) {
    target.health -= footman.damage;
    footman.lastAttack = earlyNow;
  }
  assert.strictEqual(target.health, 100, 'Target health should not change before cooldown');

  console.log('enemyFootman.test passed');
})();
