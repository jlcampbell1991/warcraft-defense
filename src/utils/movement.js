// src/utils/movement.js
// Helper functions for movement and targeting

/**
 * Calculate Euclidean distance squared between two points.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function distSq(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

/**
 * Simple axis‑aligned rectangle overlap test.
 * Returns true if two squares intersect (including edge contact).
 * @param {number} x1 left of first
 * @param {number} y1 top of first
 * @param {number} size1 width/height of first (square)
 * @param {number} x2 left of second
 * @param {number} y2 top of second
 * @param {number} size2 width/height of second
 * @returns {boolean}
 */
function rectOverlap(x1, y1, size1, x2, y2, size2) {
  return x1 < x2 + size2 && x1 + size1 > x2 && y1 < y2 + size2 && y1 + size1 > y2;
}

/**
 * Check if a given rectangle collides with any entity in a list.
 * @param {number} x left coordinate of rectangle
 * @param {number} y top coordinate of rectangle
 * @param {number} size size of rectangle (square)
 * @param {Array<{x:number, y:number, size:number}>} entities list of entities with x, y, size
 * @param {object} [exclude] optional entity to exclude from check (e.g., the moving entity itself)
 * @returns {boolean} true if collision detected
 */
export function isOccupied(x, y, size, entities, exclude) {
  for (const e of entities) {
    if (exclude && e === exclude) continue;
    if (rectOverlap(x, y, size, e.x, e.y, e.size)) {
      return true;
    }
  }
  return false;
}

/**
 * Find the nearest target from an entity among a list of candidates.
 * Returns null if candidates is empty.
 * @param {{x:number, y:number}} entity - object with x and y coordinates
 * @param {Array<{x:number, y:number}>} candidates - array of objects with x and y
 * @returns {{x:number, y:number}|null}
 */
export function findNearest(entity, candidates) {
  if (!candidates || candidates.length === 0) return null;
  let nearest = null;
  let nearestDist = Infinity;
  for (const cand of candidates) {
    const d = distSq(entity.x, entity.y, cand.x, cand.y);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = cand;
    }
  }
  return nearest;
}

export default { findNearest, isOccupied };
