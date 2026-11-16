const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/awesome.js');
  const result = mod.makeAwesome();
  assert.strictEqual(result, 'Awesome!');
  console.log('awesome test passed');
})();
