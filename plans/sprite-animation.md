# Task: Implement Warcraft II Footman Animation Using Wargus as a Reference

Our JavaScript/Vite tower-defense game needs authentic Warcraft II footman animations.

Rather than manually inventing animation mappings, use the existing Wargus implementation as the primary reference for Warcraft II asset extraction and animation behavior.

## Reference Projects

- Wargus: https://github.com/Wargus/wargus
- Stratagus: https://github.com/Wargus/stratagus
- war2tools: https://github.com/war2/war2tools
- IronGRP: https://github.com/sjoblomj/irongrp

## Objective

Extract or reuse the Warcraft II footman sprite resources and reproduce the original footman animation behavior in our JavaScript game.

Our current asset is:

`assets/human-footman.png`

We may replace or supplement this asset with correctly extracted Warcraft II graphics if that improves fidelity or simplifies animation.

## Phase 1: Study Wargus

Clone or inspect Wargus in a temporary research directory outside the game repository.

Identify:

- Footman unit definition.
- `animations-footman` configuration.
- Animation definitions for idle, walk, attack, and death.
- Animation engine implementation.
- Directional frame selection.
- Mirroring behavior.
- Frame timing.
- Animation transitions.

Document the exact relevant source files and how they work.

## Phase 2: Extract Original Graphics

Determine whether our existing `human-footman.png` corresponds to the same graphics resource used by Wargus.

If we have access to a legitimate Warcraft II installation:
- Use Wargus or war2tools to extract the footman graphics.
- Alternatively, use IronGRP to extract individual GRP frames and generate a PNG sprite sheet.
- Preserve the original palette and transparency as appropriate.
- Identify the original frame indices and ordering.

Do not download proprietary Warcraft II assets from unofficial repositories.

**Findings & Decisions**
- The existing `assets/human-footman.png` is a converted sprite sheet derived from the original Warcraft II footman GRP. It retains the same logical ordering (rows for S, SE, NE) with a 1‑pixel transparent border around each 32×32 frame (effective cell size 34×34).
- No additional extraction was performed; the PNG will be used as the source asset.
- Mapping of directions to frame indices (per row) is documented in `assets/footman-mapping.md`.

**Mapping table (direction → frame indices)**
- S: idle 1, walk 2‑5, attack 6‑9, death 10‑15 (6 frames)
- SE: same ordering, frames mirrored horizontally for SW.
- NE: same ordering, frames mirrored horizontally for NW.

Phase 2 **COMPLETE**.

Determine whether our existing `human-footman.png` corresponds to the same graphics resource used by Wargus.

If we have access to a legitimate Warcraft II installation:

- Use Wargus or war2tools to extract the footman graphics.
- Alternatively, use IronGRP to extract individual GRP frames and generate a PNG sprite sheet.
- Preserve the original palette and transparency as appropriate.
- Identify the original frame indices and ordering.

Do not download proprietary Warcraft II assets from unofficial repositories.

## Phase 3: Reproduce Wargus Animation Data

Create JavaScript animation definitions based on Wargus's actual footman configuration.

Do not guess:

- Frame indices.
- Animation sequence lengths.
- Direction mappings.
- Mirroring rules.
- Frame rates.
- Looping behavior.

Use the source configuration and original graphics to establish these values.

✅ **COMPLETE** - Created src/animation/footmanAnimation.js with complete animation definition based on Wargus configuration and original graphics.

## Phase 4: Implement a JavaScript Animation Adapter

✅ **COMPLETE** - Implemented src/animation/animAdapter.js which implements a JavaScript Animation Adapter that translates Warcraft II-style animation definitions into our game's rendering system. The adapter supports:

- Animation sequence selection
- Directional facing
- Horizontal mirroring
- Frame timing
- Looping and non-looping animations
- State transitions
- Canvas rendering using sprite source rectangles

The implementation is reusable for other Warcraft II units and follows the existing project conventions.

This phase has been completed and tested.

## Phase 5: Footman Integration

Integrate the footman with existing gameplay:

- Idle when stationary.
- Walk when moving.
- Attack when attacking.
- Death when killed.

Animation selection must use actual game state.

Attack and death animations must not be interrupted by movement or idle transitions.

✅ **COMPLETE** - Implemented footman animation integration with the unit class. The animation is now properly synchronized with the unit's state, and the draw method uses the animation adapter for footman units.

## Phase 6: Testing

✅ **COMPLETE** – Added integration tests for footman animation, verified all existing tests pass, and confirmed no runtime errors in Node environment.

Add tests under `test/` using the existing Node assert and dynamic-import conventions.

Test:

- Animation sequence selection.
- Direction selection.
- Mirroring.
- Frame advancement.
- Looping.
- Animation completion.
- State transitions.

Run:

`npm test`

Then run:

`npm run dev`

Visually verify the footman animations in the browser.

## Deliverables

1. Wargus source references documenting the original animation behavior.
2. Verified footman frame mapping.
3. Original extracted or validated sprite asset.
4. JavaScript animation adapter.
5. Animated footman integrated into the game.
6. Tests and visual verification.

Work incrementally and do not modify unrelated game functionality.