const assert = require('assert');
(async () => {
  const mod = await import('../src/utils/groovy.js');
  const result = mod.makeGroovy();
  const allowed = [
    'Groovy!',
    'Super Groovy!',
    'Totally Groovy!',
    'Groovily Groovy!',
    'Epic Groovy!',
  ];
  assert.ok(allowed.includes(result), `Result '${result}' not in allowed list`);
  console.log('groovy test passed');
})();