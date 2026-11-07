// src/spawn.js
// Helper to compute random enemy spawn position on one of the four map edges.
// Returns an object {x, y} in pixel coordinates.

export function getRandomSpawnPosition(state, canvas) {
  // state.tileSize defines size of a grid tile.
  const tileSize = state.tileSize;
  // Determine number of columns and rows based on canvas size and tileSize.
  const cols = Math.floor(canvas.width / tileSize);
  const rows = Math.floor(canvas.height / tileSize);

  const side = Math.floor(Math.random() * 4); // 0:left, 1:right, 2:top, 3:bottom
  let x, y;
  switch (side) {
    case 0: // left edge
      x = 0;
      y = Math.floor(Math.random() * rows) * tileSize;
      break;
    case 1: // right edge
      x = canvas.width;
      y = Math.floor(Math.random() * rows) * tileSize;
      break;
    case 2: // top edge
      x = Math.floor(Math.random() * cols) * tileSize;
      y = 0;
      break;
    case 3: // bottom edge
      x = Math.floor(Math.random() * cols) * tileSize;
      y = canvas.height;
      break;
    default:
      // Fallback to right edge (should never happen)
      x = canvas.width;
      y = Math.floor(Math.random() * rows) * tileSize;
  }
  return { x, y };
}
