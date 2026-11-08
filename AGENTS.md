# Project Overview
- **Name / purpose** – A simple tower‑defense style game written in JavaScript/Node, bundled with Vite for development.
- **Primary language** – JavaScript (ES modules) with a small Node‑based test harness.
- **Entry point** – `index.html` loads the compiled bundle; source code lives under `src/`.

# Architecture & Code Organization
| Directory | Purpose |
|-----------|---------|
| `src/` | Core game code (entities, utils, main loop) – see `src/main.js`, `src/spawn.js`, `src/ui.js`. |
| `src/entities/` | Game entity definitions (e.g., castles, units). |
| `src/utils/` | Helper libraries – e.g., movement helpers in `src/utils/movement.js`. |
| `test/` | Unit‑style tests that are executed with plain Node (`node test/*.test.js`). |
| `assets/` | Image / sound assets used by the game. |
| `node_modules/` | npm dependencies (Vite, etc.). |
| `plans/` | Project planning files (not code‑related). |

# Development Commands
- **`npm run dev`** – Starts the Vite dev server (`vite`). *(Defined in `package.json` line 6)*
- **`npm test`** – Executes all test files sequentially with Node. *(Defined in `package.json` line 7 – long `test` script)*

# Coding Conventions & Patterns
- **Module system** – ES modules (`export`, `import`) are used in source files; tests import them via dynamic `import()` because the test runner is plain Node CommonJS. Example: `test/findNearest.test.js` imports `../src/utils/movement.js` (lines 8‑9).
- **Export style** – Functions are exported individually (`export function …`) and also as a default object (`export default { … }`). *(See `src/utils/movement.js` lines 42‑73)*
- **Assertions** – Tests use Node’s built‑in `assert` module (`const assert = require('assert');`).
- **Naming** – Files use lower‑case, hyphen‑separated names (`*.test.js`, `*.js`).
- **No linting/formatting config** – The repository does not contain ESLint, Prettier, or similar config files; formatting is left to the developer’s editor.

# Testing & Verification
- Run all tests with `npm test`.
- Each test file is self‑contained and prints a success message on the console (e.g., `console.log('findNearest test passed');`).
- No CI configuration is present in the repo (no `.github/workflows/`).

# Project‑Specific Constraints & Pitfalls
- **Vite config missing** – The project relies on Vite’s default configuration; custom build settings are not present.
- **Dynamic imports in tests** – Because the test runner is plain Node, any ES‑module source must be imported dynamically (`await import(...)`). Adding a dedicated test runner (Vitest, Jest) would simplify this.
- **Long test script** – The `npm test` command strings together many individual test files; adding or removing a test requires editing this long command.

# Definition of Done (for new features or bug fixes)
1. Add/modify source files under `src/` following the existing ES‑module style.
2. Add a corresponding test file under `test/` that:
   - Uses `assert` for expectations.
   - Dynamically imports the module under test.
   - Logs a clear “… test passed” message.
3. Run `npm test` locally and verify all tests (including the new one) pass.
4. If the change affects the dev build, run `npm run dev` and confirm the browser loads without errors.
