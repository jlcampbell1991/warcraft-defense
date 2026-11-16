const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/sad.js');
  const result = mod.makeSad();
  const allowed = [
    'Sad.',
    'Super Sad.',
    'Totally Sad.',
    'Awfully Sad.',
    'Epic Sad.'
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('sad test passed');
})();