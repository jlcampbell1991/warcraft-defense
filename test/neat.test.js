const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/neat.js');
  const result = mod.makeNeat();
  const allowed = [
    'Neat!',
    'Super Neat!',
    'Totally Neat!',
    'Neatly Neat!',
    'Epic Neat!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('neat test passed');
})();
