# Feature: Warcraft II Footman Sprite Animation

## Project Context

This project is a tower-defense game written in JavaScript ES modules and bundled with Vite.

- Game source: `src/`
- Game entities: `src/entities/`
- Utilities: `src/utils/`
- Tests: `test/`
- Assets: `assets/`
- Development server: `npm run dev`
- Tests: `npm test`

Follow the existing project architecture, naming conventions, and coding patterns. Do not introduce a new framework or replace the rendering architecture.

## Objective

Implement authentic Warcraft II-style animation for the human footman using the existing sprite asset:

`/Users/jamble-campbell/Development/html/warcraft-defense/assets/human-footman.png`

The goal is to reproduce the original Warcraft II footman appearance, directional facing, and animation behavior as closely as practical.

Do not redraw the footman, substitute another asset, or invent animation frames.

# Phase 1: Research Warcraft II Prior Art

**Status:** ✅ Completed – see [Phase 1 research report](docs/phase1-footman-research.md)

Before implementing anything, study existing open-source Warcraft II implementations and documentation.

## Wargus

Repository: https://github.com/Wargus/wargus

Investigate:

- Warcraft II footman unit definitions.
- The `animations-footman` animation configuration.
- Original footman animation sequences.
- Directional facing conventions.
- Frame ordering and timing.
- How the original engine selects frames for walking, attacking, and dying.

Identify the relevant source files and explain their findings.

## Open-Rts

Repository: https://github.com/corepunch/open-rts

Investigate:

- `games/warcraft-2/info.c`
- `MT_FOOTMAN`
- Footman GRP resource references.
- Original sprite dimensions.
- Warcraft II graphics interpretation and animation conventions.

## Warcraft II GRP Documentation

Reference:
https://ftp.war2.ru/war2/Modding/Graphics/GRP_Format.pdf

Investigate:

- Original GRP frame organization.
- Directional frame ordering.
- Five-direction-plus-mirroring conventions.
- Footman attack and death animation frame counts.
- Any relevant differences between GRP resources and the supplied PNG.

Use these implementations as authoritative references for Warcraft II conventions, but adapt the implementation to this project's JavaScript architecture.

# Phase 2: Analyze the Actual Sprite Sheet

Inspect:

`assets/human-footman.png`

Do not assume a conventional sprite-sheet layout.

Determine:

1. Image dimensions.
2. Individual frame dimensions.
3. Number of frames.
4. Frame ordering.
5. Directional facing organization.
6. Animation sequences.
7. Whether the PNG preserves original GRP ordering.
8. Whether frames require horizontal mirroring.
9. Whether transparent padding or inconsistent frame alignment exists.

If useful, create a temporary Node or browser-based sprite inspection utility that:

- Splits the sheet into individual frames.
- Displays a numbered contact sheet.
- Makes frame coordinates easy to identify.
- Allows visual comparison of directional frames.

Cross-reference the results with Wargus and Open-Rts.

Produce a verified animation mapping before implementation.

# Phase 3: Animation Mapping

Document the actual frame mapping for the footman.

Include:

- Idle/stand animation.
- Walking animation.
- Attack animation.
- Death animation.
- Available facing directions.
- Mirroring rules.
- Animation frame counts.
- Suggested playback speeds.
- Looping behavior.

Do not assume that all animations use the same number of frames.

Do not assume that animation sequences correspond to individual rows in the PNG.

If the supplied asset lacks a particular animation, document that explicitly.

# Phase 4: Implement the Animation System

Inspect the existing game rendering and entity architecture first.

Determine:

- How entities are currently rendered.
- How units are positioned in the world.
- How movement is implemented.
- How unit states are represented.
- How the main game loop handles elapsed time.
- How images are currently loaded and cached.

Integrate the animation implementation into the existing architecture.

## Animation Requirements

The implementation must:

- Load the sprite sheet once.
- Render individual frames using source rectangles.
- Support animation sequences defined by frame indices.
- Support configurable animation speed.
- Advance frames using elapsed time.
- Support looping and non-looping animations.
- Support directional facing.
- Support horizontal mirroring where required.
- Preserve transparency.
- Preserve sprite alignment between frames.
- Avoid unnecessary image allocations during animation.
- Separate animation updates from rendering.

## Animation State

The footman should have an animation state independent of its facing direction.

For example:

- `idle`
- `walk`
- `attack`
- `death`

Facing should be independently represented and mapped to the appropriate directional frames.

Implement appropriate state-transition rules:

- Stationary footman → idle.
- Moving footman → walk.
- Attacking footman → attack.
- Dead footman → death.

Attack and death animations must not be interrupted by ordinary movement or idle transitions.

Once an attack finishes, return to the appropriate idle or movement state.

# Phase 5: JavaScript Implementation

Use the existing JavaScript ES-module architecture.

Potential organization, subject to inspection of existing conventions:

- `src/utils/sprite-sheet.js`
- `src/utils/animation.js`
- `src/entities/footman.js`

Do not create these files if equivalent functionality already exists.

Use individually exported functions/classes consistent with existing code.

Avoid unnecessary dependencies.

Use the existing game loop and rendering mechanism.

If the project uses Canvas 2D, use `drawImage()` source rectangles to select frames from the sprite sheet.

Do not implement a separate animation loop using `setInterval()` or independent timers.

Animation updates must integrate with the existing game loop.

# Phase 6: Animation Configuration

Keep Warcraft II animation mappings separate from rendering logic.

Use a configuration structure that describes:

- Sprite sheet.
- Frame dimensions.
- Animation frame indices.
- Directional mappings.
- Frame rate.
- Looping.
- Mirroring.

The configuration should make it possible to add other Warcraft II units later without rewriting the animation engine.

Do not overengineer a generalized asset framework before successfully animating the footman.

# Phase 7: Tests

Add appropriate tests under `test/`.

Follow the existing test conventions:

- Node's built-in `assert`.
- Dynamic imports for ES modules.
- Self-contained test files.
- Clear success messages.

Test at least:

1. Sprite frame coordinate calculations.
2. Animation frame progression.
3. Animation looping.
4. Non-looping animation completion.
5. Directional frame selection.
6. Horizontal mirroring selection.
7. Animation state transitions.
8. Attack completion behavior.

Do not require browser rendering for unit tests when the behavior can be tested independently.

Add any new test file to the existing `npm test` script in `package.json`.

# Phase 8: Visual Verification

Run the game using:

`npm run dev`

Verify the footman visually.

Create a temporary animation demonstration if necessary.

Verify:

- Idle animation.
- Walking animation.
- Attack animation.
- Death animation.
- Directional facing.
- Mirroring.
- Frame alignment.
- Correct sprite scaling.
- Smooth transitions.
- No jitter or unintended position changes.

Do not proceed to other Warcraft II units until the footman is visually correct.

# Definition of Done

1. Warcraft II animation conventions have been researched and documented.
2. The actual footman sprite sheet has been analyzed.
3. Animation frame mappings are verified rather than guessed.
4. The footman displays authentic idle, walking, attack, and death animations where available.
5. Directional facing and mirroring work correctly.
6. Animation transitions integrate with actual game state.
7. The implementation follows existing JavaScript/Vite architecture.
8. Tests are added and registered in `package.json`.
9. `npm test` passes.
10. `npm run dev` loads the game without browser errors.
11. The footman has been visually verified in the running game.

## Working Instructions

Work incrementally.

First inspect the existing code, sprite sheet, and Warcraft II references.

Report the verified sprite-sheet layout and animation mapping before implementing.

Then implement the footman animation, add tests, and visually verify the result.

Do not modify unrelated game functionality.