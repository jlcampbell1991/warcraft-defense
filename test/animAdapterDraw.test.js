// test/animAdapterDraw.test.js
// Verify that AnimationAdapter.draw translates and scales correctly

import assert from 'assert';

import AnimationAdapter from '../src/animation/animAdapter.js';
import footmanAnimation from '../src/animation/footmanAnimation.js';

function createRecordingContext() {
  const calls = { translate: [], scale: [] };
  return {
    save: () => {},
    restore: () => {},
    translate: (x, y) => calls.translate.push({ x, y }),
    scale: (sx, sy) => calls.scale.push({ sx, sy }),
    drawImage: () => {},
    __calls: calls,
  };
}

(async () => {
  const ctx = createRecordingContext();
  const mockImage = { width: 100, height: 100 };
  const size = 32;
  const x = 10;
  const y = 20;

  const anim = new AnimationAdapter(footmanAnimation);
  anim.setState('idle');
  // Test non-mirrored direction (S)
  anim.setDirection('S');
  anim.draw(ctx, mockImage, x, y, size);
  // Expect translate called with (x, y) and positive scaleX
  assert.strictEqual(ctx.__calls.translate.length, 1, 'translate should be called once for S');
  assert.deepStrictEqual(ctx.__calls.translate[0], { x, y });
  assert.strictEqual(ctx.__calls.scale.length, 1, 'scale should be called once for S');
  const expectedScaleX = size / 32; // FRAME_SIZE = 32
  assert.deepStrictEqual(ctx.__calls.scale[0], { sx: expectedScaleX, sy: expectedScaleX });

  // Reset calls
  ctx.__calls.translate = [];
  ctx.__calls.scale = [];

  // Test mirrored direction (SW)
  anim.setDirection('SW');
  anim.draw(ctx, mockImage, x, y, size);
  // Expect translate called with (x + size, y) and negative scaleX
  assert.strictEqual(ctx.__calls.translate.length, 1, 'translate should be called once for SW');
  assert.deepStrictEqual(ctx.__calls.translate[0], { x: x + size, y });
  assert.strictEqual(ctx.__calls.scale.length, 1, 'scale should be called once for SW');
  assert.deepStrictEqual(ctx.__calls.scale[0], { sx: -expectedScaleX, sy: expectedScaleX });

  console.log('animAdapterDraw test passed');
})();