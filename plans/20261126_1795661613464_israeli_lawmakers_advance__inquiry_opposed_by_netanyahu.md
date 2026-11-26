# Implementation Specification: Israeli lawmakers advance inquiry opposed by Netanyahu

## 1. Objective
Create a lightweight, in‑game UI feature that displays a short news‑style story about the Israeli parliamentary inquiry (as described in the task). The story should be accessible from the game's main UI via a **"Story"** button and presented in a dismissible overlay.

## 2. Existing Architecture and Relevant Code
- **Entry point**: `src/main.js` creates the canvas, calls `initStartScreen()` and `initUI()`.
- **UI initialization**: `src/ui.js` builds the gold counter, map‑size selector and the bottom build menu (buttons for Barracks, Tower, Wall, etc.).
- **Start screen**: `index.html` defines a full‑screen overlay with a *Start Game* button.
- **Module system**: All source files are ES modules (`export …`, `import …`). Tests are plain Node scripts located under `test/` and use `assert`.
- **No existing story or modal infrastructure** – we will add a new module `src/story.js` that creates an overlay DOM element and exports a `showStory()` function.

## 3. Required Changes
### 3.1 Files to Modify
| File | Change | Reason |
|------|--------|--------|
| `src/ui.js` | 1. Add `import { showStory } from './story.js';` at the top.<br>2. Extend `buildMenu.innerHTML` to include a new button `<button id="btnStory">Story</button>` placed after the existing building buttons.<br>3. Add a click handler `document.getElementById('btnStory').addEventListener('click', showStory);` so the overlay appears when the user clicks the button. | Integrates the new story feature into the existing UI flow without altering game logic. |
| `src/ui.js` (optional) | Ensure the new button is styled consistently (no extra CSS required – inherits existing menu styling). | Keeps UI appearance uniform. |
### 3.2 Files to Create
| File | Responsibility | Content Overview |
|------|----------------|------------------|
| `src/story.js` | Provides the story text and renders a modal overlay. | ```js
// src/story.js
export const STORY_TEXT = `Israel's new parliament on Wednesday took a first step to set up a state commission of inquiry into the security failures that led to Hamas's unprecedented October 7, 2023 attack, a move long opposed by caretaker Prime Minister Benjamin Netanyahu. FRANCE 24's Selina Sykes reports.`;

export function showStory() {
  // If an overlay already exists, just show it
  let overlay = document.getElementById('storyOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    return;
  }
  overlay = document.createElement('div');
  overlay.id = 'storyOverlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '2000';
  overlay.style.color = 'white';
  overlay.style.padding = '20px';
  overlay.style.boxSizing = 'border-box';
  overlay.style.textAlign = 'center';

  const container = document.createElement('div');
  container.style.maxWidth = '800px';
  container.style.background = '#222';
  container.style.padding = '20px';
  container.style.borderRadius = '8px';
  container.style.boxShadow = '0 0 10px #000';

  const title = document.createElement('h2');
  title.textContent = 'News Story';
  container.appendChild(title);

  const paragraph = document.createElement('p');
  paragraph.textContent = STORY_TEXT;
  container.appendChild(paragraph);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.marginTop = '12px';
  closeBtn.style.padding = '6px 12px';
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
  container.appendChild(closeBtn);

  overlay.appendChild(container);
  document.body.appendChild(overlay);
}
```
| Implements the story display logic entirely in the front‑end, independent of game state.
| `test/story.test.js` | Unit test for the newly added module. | ```js
// test/story.test.js
const assert = require('assert');
(async () => {
  const mod = await import('../src/story.js');
  assert.strictEqual(typeof mod.showStory, 'function', 'showStory should be exported');
  assert.ok(mod.STORY_TEXT.includes('Israeli'), 'STORY_TEXT should contain the expected content');
  console.log('story module test passed');
})();
``` |

## 4. Implementation Plan
1. **Add import to `src/ui.js`.** Place it after existing imports.
2. **Update `buildMenu.innerHTML`.** Append a `<button id="btnStory">Story</button>` after the last building button (maintain line breaks for readability).
3. **Register click handler** for `btnStory` that calls the imported `showStory`.
4. **Create `src/story.js`** with the constant `STORY_TEXT` (the exact paragraph from the task) and the `showStory` function that builds a modal overlay as described.
5. **Create `test/story.test.js`** to verify the module exports and that the story text contains a keyword.
6. **Run the existing test suite** (`npm test`) to ensure no regression. The new test should pass alongside the existing ones.
7. **Manual verification**: launch the app (`npm run dev`), click the **Story** button, confirm the overlay appears with the correct text, and that the Close button hides it.

## 5. Code Samples and Technical Details
- **Import statement (src/ui.js)**
  ```js
  import { showStory } from './story.js';
  ```
- **Button addition (src/ui.js)**
  ```js
  buildMenu.innerHTML = `
    ... existing buttons ...
    <button id="btnStory">Story</button>
  `;
  ```
- **Handler registration (src/ui.js)**
  ```js
  document.getElementById('btnStory').addEventListener('click', showStory);
  ```
- **Overlay creation (src/story.js)** – see full implementation in the file‑creation section above.

## 6. Error Handling and Edge Cases
- **Multiple clicks**: `showStory` checks for an existing overlay and simply makes it visible instead of creating duplicates.
- **Missing DOM**: The function gracefully creates the overlay even if called before the document body is fully loaded (the UI is initialized after `DOMContentLoaded`).
- **Accessibility**: The overlay uses high‑contrast colors and a clearly labelled Close button.
- **Test environment**: The unit test uses dynamic `import()` because the source files are ES modules.

## 7. Testing Requirements
- **Unit test** (`test/story.test.js`) validates that:
  - `showStory` is a function.
  - `STORY_TEXT` contains the word "Israeli" (ensuring the correct content).
- **Integration test (manual)**: Run the game, click the Story button, verify overlay appearance and dismissal.
- Ensure the existing test suite still passes (`npm test`). No changes to existing tests are required.

## 8. Acceptance Criteria
- [ ] A **Story** button appears in the bottom UI menu.
- [ ] Clicking the button opens a modal overlay containing the exact paragraph supplied in the task.
- [ ] The overlay includes a **Close** button that hides the overlay.
- [ ] No duplicate overlays are created on repeated clicks.
- [ ] `src/story.js` exports `STORY_TEXT` and `showStory`.
- [ ] New unit test `test/story.test.js` passes.
- [ ] All pre‑existing tests continue to pass.
- [ ] Manual run of the application shows the feature working without console errors.

## 9. Outstanding Questions and Assumptions
- **Styling**: The specification assumes the existing menu styling is sufficient; no additional CSS files are created.
- **Placement of the button**: Chosen to be the last button in the build menu for minimal disruption.
- **Internationalisation**: Not required for this single static paragraph.
- **Persistence**: The story does not need to persist across sessions.
- **Accessibility**: Basic contrast is provided; further accessibility improvements are out of scope.