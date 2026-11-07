// src/main.js
import { initUI } from './ui.js';
import { Building } from './entities/building.js';
import { Unit } from './entities/unit.js';
import { Enemy } from './entities/enemy.js';
import { Projectile } from './entities/projectile.js';

// Game configuration
const TILE_SIZE = 20; // pixels per tile
const GRID_COLS = 32;
const GRID_ROWS = 32;

// Combat configuration
const COMBAT_RADIUS = 10; // pixels
const ENEMY_GOLD_REWARD = 20; // gold per kill

// Global game state attached to window for UI access
window.gameState = {
  gold: 500,
  selectedBuilding: { type: null, cost: 0 },
  buildings: [],
  units: [],
  enemies: [],
  projectiles: [],
  tileSize: TILE_SIZE,
  // timestamp of last frame for delta calculation
  lastFrameTime: null,
  lastEnemySpawn: 0,
  enemySpawnInterval: 3000,
};

function updateGoldUI() {
  const goldDiv = document.getElementById('goldCounter');
  if (goldDiv) goldDiv.textContent = `Gold: ${window.gameState.gold}`;
  // Unlock buildings based on new gold amount
  if (typeof window.unlockBuildings === 'function') {
    window.unlockBuildings();
  }
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

    // Ranged unit shooting logic
    if (delta > 0) {
      const now = performance.now();
      state.units.forEach(unit => {
        if (unit.range && now - (unit.lastShot || 0) >= unit.shotCooldown) {
          // Find nearest enemy within range
          let nearest = null;
          let nearestDistSq = Infinity;
          state.enemies.forEach(enemy => {
            const dx = enemy.x - unit.x;
            const dy = enemy.y - unit.y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= unit.range * unit.range && distSq < nearestDistSq) {
              nearest = enemy;
              nearestDistSq = distSq;
            }
          });
          if (nearest) {
            const proj = new Projectile(unit.type, unit.x + unit.size/2, unit.y + unit.size/2, nearest);
            state.projectiles.push(proj);
            unit.lastShot = now;
          }
        }
      });
    }

    // Tower shooting logic
    if (delta > 0) {
      const now = performance.now();
      state.buildings.forEach(building => {
        if (building.type === 'Tower' && now - (building.lastShot || 0) >= (building.towerCooldown || 2000)) {
          // Find nearest enemy within tower range
          let nearest = null;
          let nearestDistSq = Infinity;
          const range = building.towerRange || 200;
          state.enemies.forEach(enemy => {
            const dx = enemy.x - building.x;
            const dy = enemy.y - building.y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= range * range && distSq < nearestDistSq) {
              nearest = enemy;
              nearestDistSq = distSq;
            }
          });
          if (nearest) {
            const proj = new Projectile('Tower', building.x + building.size/2, building.y + building.size/2, nearest);
            state.projectiles.push(proj);
            building.lastShot = now;
          }
        }
      });
    }

    // Draw units
    state.units.forEach(u => u.draw(ctx));
    // Update enemies with wall collision handling
    if (delta > 0) {
      const isBlocked = (x, y, size) => {
        // Check against wall buildings
        for (const b of state.buildings) {
          if (b.type !== 'Wall') continue;
          if (x < b.x + b.size && x + size > b.x && y < b.y + b.size && y + size > b.y) {
            return true;
          }
        }
        return false;
      };
      state.enemies.forEach(e => {
        // Desired horizontal move
        const newX = e.x - e.speed * delta;
        const newY = e.y;
        if (!isBlocked(newX, newY, e.size)) {
          e.x = newX;
        } else {
          // Try vertical move up by one tile
          const upY = e.y - TILE_SIZE;
          if (!isBlocked(e.x, upY, e.size)) {
            e.y = upY;
          } else {
            // Try down by one tile
            const downY = e.y + TILE_SIZE;
            if (!isBlocked(e.x, downY, e.size)) {
              e.y = downY;
            }
            // else remain in place
          }
        }
      });
    }
    // Update projectiles
    if (delta > 0) {
      state.projectiles.forEach(p => p.update(delta));
    }
    // Projectile‑enemy collision handling
    const remainingProjectiles = [];
    const remainingEnemiesAfterProj = [];
    state.enemies.forEach(enemy => {
      let enemyDead = false;
      // Check each projectile against this enemy
      state.projectiles.forEach(proj => {
        if (!proj.isAlive) return;
        const dx = proj.x - enemy.x;
        const dy = proj.y - enemy.y;
        const distSq = dx * dx + dy * dy;
        // Simple hit radius (projectile radius + half enemy size)
        const hitRadius = proj.radius + enemy.size / 2;
        if (distSq <= hitRadius * hitRadius) {
          // Apply damage rules
          if (proj.type === 'Catapult' && enemy.type === 'Dragon') {
            // No damage
          } else {
            enemy.health -= 100; // one‑shot kill
          }
          proj.isAlive = false;
        }
      });
      if (enemy.health <= 0) {
        enemyDead = true;
        window.gameState.gold += ENEMY_GOLD_REWARD;
        updateGoldUI();
      }
      if (!enemyDead) remainingEnemiesAfterProj.push(enemy);
    });
    // Keep alive projectiles only
    state.projectiles.forEach(p => {
      if (p.isAlive) remainingProjectiles.push(p);
    });
    state.projectiles = remainingProjectiles;
    state.enemies = remainingEnemiesAfterProj;
    // Combat detection: melee units attack nearest enemy within radius
    const combatRadiusSq = COMBAT_RADIUS * COMBAT_RADIUS;
    const remainingEnemies = [];
    state.enemies.forEach(enemy => {
      let dead = false;
      for (const unit of state.units) {
        if (unit.range) continue; // skip ranged units (handled by projectiles)
        const dx = unit.x - enemy.x;
        const dy = unit.y - enemy.y;
        if (dx * dx + dy * dy <= combatRadiusSq) {
          dead = true;
          // Award gold for kill
          window.gameState.gold += ENEMY_GOLD_REWARD;
          updateGoldUI();
          break;
        }
      }
      if (!dead) remainingEnemies.push(enemy);
    });
    state.enemies = remainingEnemies;
    // Draw projectiles
    state.projectiles.forEach(p => p.draw(ctx));
    // Draw enemies
    state.enemies.forEach(e => e.draw(ctx));

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
