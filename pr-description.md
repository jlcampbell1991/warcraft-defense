# Pull Request Description

Implemented a new "groovy" utility mirroring the existing "awesome" pattern.

### Changes Made
- Added `src/utils/groovy.js` with `makeGroovy()` returning a random groovy phrase.
- Added default export `{ makeGroovy }`.
- Added corresponding test `test/groovy.test.js` validating the output against the allowed phrase list.
- Updated `package.json` test script to run the new groovy test.

These changes introduce the requested "groovy" functionality while keeping consistency with the project's utility and testing conventions.
