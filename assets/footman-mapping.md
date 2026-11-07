# Footman Sprite Mapping

This document describes the mapping of animation frames for the Warcraft II footman sprite sheet (`human-footman.png`).

## Frame Layout
- Each logical frame is **32 px × 32 px**.
- The PNG adds a **1‑pixel transparent border** around each frame, making the effective cell size **34 px × 34 px**.
- Rows correspond to the three unique directions:
  - **S** (south)
  - **SE** (south‑east)
  - **NE** (north‑east)
- Directions **SW** and **NW** are obtained by horizontal mirroring of the SE and NE rows respectively.

## Animation Sequences per Direction
| Animation | Frames (indices within the row) | Description |
|-----------|--------------------------------|-------------|
| Idle/Stand | 1 | Single static frame.
| Walk | 2‑5 | Four walking frames.
| Attack | 6‑9 | Four attack frames.
| Death | 10‑15 | Six death frames (original GRP provides 6‑8; we use 6).

## Usage
When rendering a footman:
1. Select the row based on the unit's facing direction (S, SE, NE). For SW/NW, use the SE/NE row and draw with `ctx.scale(-1, 1)` to mirror horizontally.
2. Choose the frame index according to the current animation state and progress.
3. Compute the source rectangle:
   ```js
   const CELL = 34; // includes 1‑pixel border
   const srcX = (frameIndex - 1) * CELL + 1; // skip left border
   const srcY = directionRow * CELL + 1;   // skip top border
   const srcW = 32;
   const srcH = 32;
   ```

This mapping aligns with the original Warcraft II GRP ordering and the converted `human-footman.png` used in the project.
