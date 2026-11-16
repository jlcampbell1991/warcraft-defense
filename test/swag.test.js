const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/swag.js');
  const result = mod.makeSwag();
  const allowed = [
    'Swag!',
    'Super Swag!',
    'Totally Swag!',
    'Swaggy Swag!',
    'Epic Swag!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('swag test passed');
})();