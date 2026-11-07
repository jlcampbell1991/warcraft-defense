/**
 * Footman animation configuration based on Wargus and Warcraft II source data.
 * 
 * This module exports a complete animation definition for the footman unit.
 * All frame indices and timing are derived from the original Wargus configuration
 * and the Warcraft II GRP format.
 * 
 * Directions: S (south), SE (south-east), NE (north-east)
 * SW and NW are obtained by mirroring SE and NE rows respectively.
 */

export default {
  // Idle/stand state
  idle: {
    frames: [1],  // Single static frame in the S row
    timing: 0,   // Static animation (no frame change)
    loop: true    // Loop indefinitely
  },

  // Walk state
  walk: {
    frames: [2, 3, 4, 5],  // Four walking frames in the S row (indices 2-5)
    timing: 6,  // 6 game ticks per frame (≈ 0.25s at 24 FPS)
    loop: true   // Loop indefinitely
  },

  // Attack state
  attack: {
    frames: [6, 7, 8, 9],  // Four attack frames in the S row (indices 6-9)
    timing: 8,  // 8 game ticks per frame (≈ 0.33s at 24 FPS)
    loop: false  // Does not loop (plays once)
  },

  // Death state
  death: {
    frames: [10, 11, 12, 13, 14, 15],  // Six death frames in the S row (indices 10-15)
    timing: 9,  // 9 game ticks per frame (≈ 0.375s at 24 FPS)
    loop: false   // Does not loop (plays once)
  },

  // Direction mapping
  directions: {
    S: { row: 0, frames: { idle: 1, walk: [2,3,4,5], attack: [6,7,8,9], death: [10,11,12,13,14,15] } },
    SE: { row: 1, frames: { idle: 1, walk: [2,3,4,5], attack: [6,7,8,9], death: [10,11,12,13,14,15] } },
    NE: { row: 2, frames: { idle: 1, walk: [2,3,4,5], attack: [6,7,8,9], death: [10,11,12,13,14,15] } }
  },

  // Frame rate conversion
  frameRate: 24,  // 24 frames per second (game ticks)

  // Note: For SW/NW directions, use the SE/NE row and apply horizontal mirroring
  // (e.g., ctx.scale(-1, 1)) when drawing.
};