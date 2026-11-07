// test/footmanAnimation.test.js
// Simple Node.js test for footman animation integration

const assert = require('assert');

// Import required modules
import { Unit } from '../src/entities/unit.js';
import AnimationAdapter from '../src/animation/animAdapter.js';
import footmanAnimation from '../src/animation/footmanAnimation.js';

// Simple mock canvas context
function createMockContext() {
  return {
    save: () => {},
    restore: () => {},
    scale: () => {},
    translate: () => {},
    drawImage: () => {},
  };
}

// Mock image object (size does not matter for logic)
const mockImage = { width: 100, height: 100 };

(async () => {
  // Create a footman unit
  const footman = new Unit('Footman', 0, 0, 32);

  // Verify basic properties
  assert.strictEqual(footman.type, 'Footman');
  assert.strictEqual(footman.health, 60);
  assert.strictEqual(footman.maxHealth, 60);
  assert.strictEqual(footman.damage, 6);
  assert.strictEqual(footman.attackCooldown, 1000);
  assert.strictEqual(footman.range, 1);
  assert.ok(footman.speed > 0);

  // Simulate walk state
  footman.speed = 0.1; // ensure moving
  footman.update(0.1);
  assert.strictEqual(footman.anim.currentState, 'walk');

  // Simulate attack state
  footman.isAttacking = true;
  footman.update(0.1);
  assert.strictEqual(footman.anim.currentState, 'attack');

  // Simulate death state
  footman.health = 0;
  footman.update(0.1);
  assert.strictEqual(footman.anim.currentState, 'death');

  // Ensure death state does not change after further updates
  footman.update(0.5);
  assert.strictEqual(footman.anim.currentState, 'death');

  // Test draw does not throw (using mock context and image)
  const ctx = createMockContext();
  assert.doesNotThrow(() => {
    footman.anim.draw(ctx, mockImage, footman.x, footman.y, footman.size);
  }, 'draw should not throw');

  console.log('footmanAnimation test passed');
})();