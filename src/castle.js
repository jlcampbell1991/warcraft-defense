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
  // Place castle in the center of the grid (2x2 block)
  const GRID_COLS = 32;
  const GRID_ROWS = 32;
  const startCol = Math.floor(GRID_COLS / 2) - 1;
  const startRow = Math.floor(GRID_ROWS / 2) - 1;
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
