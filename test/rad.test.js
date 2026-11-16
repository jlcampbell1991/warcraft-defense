const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/rad.js');
  const result = mod.makeRad();
  const allowed = [
    'Rad!',
    'Super Rad!',
    'Totally Rad!',
    'Radically Rad!',
    'Epic Rad!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('rad test passed');
})();