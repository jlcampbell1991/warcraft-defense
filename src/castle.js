// src/castle.js
// Helper module to place the player's initial castle on the map.
// The castle consists of four Tower buildings arranged in a 2x2 block.
// Each tower has 2500 HP (overriding the default Tower health).

import { Building } from './entities/building.js';

/**
 * Place the castle towers into the game state.
 * @param {object} state - The global gameState object.
 */
export function placeCastle(state) {
  const tileSize = state.tileSize;
  // Choose a starting offset (e.g., 2 tiles from the left and top edges)
  const startCol = 2;
  const startRow = 2;
  const positions = [
    { col: startCol, row: startRow },
    { col: startCol + 1, row: startRow },
    { col: startCol, row: startRow + 1 },
    { col: startCol + 1, row: startRow + 1 },
  ];

  positions.forEach(pos => {
    const x = pos.col * tileSize;
    const y = pos.row * tileSize;
    const tower = new Building('Tower', x, y, tileSize);
    // Override health for castle towers
    tower.maxHealth = 2500;
    tower.health = 2500;
    // Mark as part of the castle for loss detection
    tower.isCastle = true;
    state.buildings.push(tower);
  });
}
