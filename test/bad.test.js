const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/bad.js');
  const result = mod.makeBad();
  const allowed = [
    'Bad!',
    'Super Bad!',
    'Totally Bad!',
    'Awfully Bad!',
    'Epic Bad!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('bad test passed');
})();