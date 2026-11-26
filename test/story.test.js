// test/story.test.js
const assert = require('assert');
(async () => {
  const mod = await import('../src/story.js');
  assert.strictEqual(typeof mod.showStory, 'function', 'showStory should be exported');
  assert.ok(mod.STORY_TEXT.includes('Israeli'), 'STORY_TEXT should contain the expected content');
  console.log('story module test passed');
})();
