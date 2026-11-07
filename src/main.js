// src/main.js
import { initUI } from './ui.js';
import { Building } from './entities/building.js';
import { Unit } from './entities/unit.js';
import { Enemy } from './entities/enemy.js';

// Game configuration
const TILE_SIZE = 20; // pixels per tile
const GRID_COLS = 32;
const GRID_ROWS = 32;

// Global game state attached to window for UI access
window.gameState = {
  gold: 500,
  selectedBuilding: { type: null, cost: 0 },
  buildings: [],
  units: [],
  enemies: [],
  tileSize: TILE_SIZE,
  // timestamp of last frame for delta calculation
  lastFrameTime: null,
  lastEnemySpawn: 0,
  enemySpawnInterval: 3000,
};

function updateGoldUI() {
  const goldDiv = document.getElementById('goldCounter');
  if (goldDiv) goldDiv.textContent = `Gold: ${window.gameState.gold}`;
}

// Wait for DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'gameCanvas';
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '1px solid #000';
  document.body.appendChild(canvas);

  // Initialize UI (HUD, menus)
  initUI();
  updateGoldUI();

  // Canvas click handler for building placement
  canvas.addEventListener('click', (e) => {
    const state = window.gameState;
    const { type, cost } = state.selectedBuilding;
    if (!type) return; // no building selected
    if (state.gold < cost) {
      // insufficient gold, ignore placement
      console.log('Not enough gold for', type);
      return;
    }
    // Snap to grid
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const gridX = Math.floor(clickX / state.tileSize) * state.tileSize;
    const gridY = Math.floor(clickY / state.tileSize) * state.tileSize;
    // Create building
    const building = new Building(type, gridX, gridY, state.tileSize);
    state.buildings.push(building);
    // Deduct gold
    state.gold -= cost;
    updateGoldUI();
    // Reset selection (optional)
    state.selectedBuilding.type = null;
    state.selectedBuilding.cost = 0;
  });

  // Simple render loop
  const ctx = canvas.getContext('2d');
  function drawGrid() {
    ctx.strokeStyle = '#444';
    for (let i = 0; i <= GRID_COLS; i++) {
      const x = i * TILE_SIZE;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GRID_ROWS * TILE_SIZE);
      ctx.stroke();
    }
    for (let j = 0; j <= GRID_ROWS; j++) {
      const y = j * TILE_SIZE;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GRID_COLS * TILE_SIZE, y);
      ctx.stroke();
    }
  }

  function loop() {
    const now = performance.now();
    const state = window.gameState;
    const delta = state.lastFrameTime ? now - state.lastFrameTime : 0;
    state.lastFrameTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Grid
    drawGrid();
    // Buildings
    state.buildings.forEach(b => b.draw(ctx));

    // Production: spawn units from buildings
    state.buildings.forEach(b => {
      if (typeof b.canSpawn === 'function' && b.canSpawn(now)) {
        const unit = new Unit(b.unitType, b.x, b.y, b.size);
        state.units.push(unit);
        b.lastSpawn = now;
      }
    });

    // Enemy spawning
    if (now - state.lastEnemySpawn >= state.enemySpawnInterval) {
      const y = Math.floor(Math.random() * GRID_ROWS) * state.tileSize;
      const enemy = new Enemy('Footman', canvas.width, y, state.tileSize);
      state.enemies.push(enemy);
      state.lastEnemySpawn = now;
    }

    // Update units
    if (delta > 0) {
      state.units.forEach(u => u.update(delta));
    }

    // Draw units
    state.units.forEach(u => u.draw(ctx));
    // Update enemies
    if (delta > 0) {
      state.enemies.forEach(e => e.update(delta));
    }
    // Draw enemies
    state.enemies.forEach(e => e.draw(ctx));

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
