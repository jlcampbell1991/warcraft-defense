// test/findNearest.test.js
// Simple unit test for the findNearest helper

const assert = require('assert');
// Import the ES module using dynamic import (Node >=13 supports import with .js if using ESM, but we are in CJS context.
// We'll use the compiled CommonJS export via require of the transpiled file.
// Since movement.js uses ES module syntax, we use dynamic import.
(async () => {
  const { findNearest } = await import('../src/utils/movement.js');
  const entity = { x: 0, y: 0 };
  const candidates = [
    { x: 10, y: 0 },
    { x: 5, y: 5 },
    { x: -3, y: -4 }, // distance 5
    { x: 2, y: 2 }, // distance ~2.828
  ];
  const nearest = findNearest(entity, candidates);
  assert.deepStrictEqual(nearest, { x: 2, y: 2 }, 'Nearest candidate should be (2,2)');
  console.log('findNearest test passed');
})();
