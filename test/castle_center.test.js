// test/castle_center.test.js
// Verify that the castle towers are placed in the center of the grid (2x2 block).

const assert = require('assert');

(async () => {
  const { placeCastle } = await import('../src/castle.js');
  const tileSize = 20;
  const mockState = {
    tileSize,
    buildings: [],
  };
  placeCastle(mockState);
  const castleTowers = mockState.buildings.filter(b => b.isCastle);
  assert.strictEqual(castleTowers.length, 4, 'Should have 4 castle towers');
  // Expected columns and rows for center based on 32x32 grid
  const GRID_COLS = 32;
  const GRID_ROWS = 32;
  const startCol = Math.floor(GRID_COLS / 2) - 1; // 15
  const startRow = Math.floor(GRID_ROWS / 2) - 1; // 15
  const expectedPositions = [
    { col: startCol, row: startRow },
    { col: startCol + 1, row: startRow },
    { col: startCol, row: startRow + 1 },
    { col: startCol + 1, row: startRow + 1 },
  ];
  const actualPositions = castleTowers.map(t => ({ col: t.x / tileSize, row: t.y / tileSize }));
  // Sort both arrays for comparison
  const sortFn = (a, b) => a.row - b.row || a.col - b.col;
  expectedPositions.sort(sortFn);
  actualPositions.sort(sortFn);
  assert.deepStrictEqual(actualPositions, expectedPositions, 'Castle towers should be centered on the grid');
  console.log('castle_center.test passed');
})();
