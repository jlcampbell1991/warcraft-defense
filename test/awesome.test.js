const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/awesome.js');
  const result = mod.makeAwesome();
  const allowed = [
    'Awesome!',
    'Super Awesome!',
    'Totally Awesome!',
    'Awesomely Awesome!',
    'Epic Awesome!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('awesome test passed');
})();
