Implemented a new "bad" utility module.

- Added `src/utils/bad.js` providing `makeBad()` that returns a random negative phrase.
- Created corresponding test `test/bad.test.js` to verify the function returns one of the allowed phrases.
- Updated `package.json` test script to include the new test.

All existing and new tests pass.
