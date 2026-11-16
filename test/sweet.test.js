const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/sweet.js');
  const result = mod.makeSweet();
  const allowed = [
    'Sweet!',
    'Super Sweet!',
    'Totally Sweet!',
    'Sweetly Sweet!',
    'Epic Sweet!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('sweet test passed');
})();