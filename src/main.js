// src/main.js
import { initUI, initStartScreen } from './ui.js';
import { Building } from './entities/building.js';
import { Unit } from './entities/unit.js';
import { Enemy } from './entities/enemy.js';
import { Projectile } from './entities/projectile.js';
import { findNearest, isOccupied } from './utils/movement.js';
import { getRandomSpawnPosition } from './spawn.js';

// Game configuration
let TILE_SIZE = 20; // pixels per tile (adjustable)
const GRID_COLS = 32;
const GRID_ROWS = 32;

// Combat configuration
const COMBAT_RADIUS = 10; // pixels
// Gold reward per enemy kill is based on unit cost
// Enemy melee damage is now defined per enemy type

// Unit gold cost constants
const UNIT_GOLD_COST = {
  Footman: 600,
  Archer: 500,
  Knight: 800,
  Catapult: 900,
  Dragon: 2500,
};

// Performance tuning
const MAX_ENTITIES = 200; // maximum total units and enemies

// Global game state attached to window for UI access
window.gameState = {
  gold: 3000,
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
  pendingProductions: [],
};

// Difficulty scaling variables
let gameStartTime = performance.now();
let difficultyLevel = 0; // index into ENEMY_TYPES
let lastDifficultyIncrease = performance.now();
const ENEMY_TYPES = ['Footman', 'Archer', 'Knight', 'Catapult', 'Dragon'];
const MAX_DIFFICULTY = ENEMY_TYPES.length - 1;

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
  initStartScreen();
});

function initializeGame() {
  // Simple render loop and game initialization (previously in DOMContentLoaded)
  const canvas = document.createElement('canvas');
  canvas.id = 'gameCanvas';
  // Default to medium size; will be adjusted via setMapSize if needed
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '1px solid #000';
  document.body.appendChild(canvas);

  // Map size handling
  const mapPresets = {
    small: { width: 600, height: 400 },
    medium: { width: 800, height: 600 },
    large: { width: 1000, height: 800 },
  };
  // Function to adjust canvas and tile size
  function setMapSize(size) {
    const preset = mapPresets[size] || mapPresets.medium;
    canvas.width = preset.width;
    canvas.height = preset.height;
    // Compute new tile size to keep 32 columns
    TILE_SIZE = Math.floor(preset.width / GRID_COLS);
    // Update state tile size for placement calculations
    window.gameState.tileSize = TILE_SIZE;
  }
  // Expose globally for UI
  window.setMapSize = setMapSize;
  // Initialize to default (medium) size
  setMapSize('medium');

  // Initialize UI (HUD, menus)
  initUI();
  updateGoldUI();

  // Canvas click handler for building placement
  canvas.addEventListener('click', (e) => {
    const state = window.gameState;
    const { type, cost } = state.selectedBuilding;
    if (!type) return; // no building selected
    if (state.gold < cost) {
      console.log('Not enough gold for', type);
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const gridX = Math.floor(clickX / state.tileSize) * state.tileSize;
    const gridY = Math.floor(clickY / state.tileSize) * state.tileSize;
    // Occupancy check: ensure no building or unit occupies this tile
    const occupied = isOccupied(gridX, gridY, state.tileSize, state.buildings.concat(state.units));
    if (occupied) {
      console.log('Cannot place building on occupied tile');
      return;
    }
    const building = new Building(type, gridX, gridY, state.tileSize);
    state.buildings.push(building);
    // Immediately create a free unit of this building's type (if it produces units)
    if (building.unitType) {
      const freeUnit = new Unit(building.unitType, building.x, building.y, building.size);
      state.units.push(freeUnit);
    }
    state.gold -= cost;
    updateGoldUI();
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
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    state.buildings.forEach(b => b.draw(ctx));
    // Production: queue units when production interval elapsed
    state.buildings.forEach(b => {
      if (typeof b.canSpawn === 'function' && b.canSpawn(now)) {
        // Add to pending productions queue; timer will resume after unit is actually spawned
        state.pendingProductions.push({ building: b, readyTime: now });
        b.pendingProduction = true;
        // Do NOT update b.lastSpawn here; it will be set when the unit is successfully spawned
      }
    });
    // Process pending productions in FIFO order
    while (state.pendingProductions.length > 0) {
      const entry = state.pendingProductions[0];
      const cost = UNIT_GOLD_COST[entry.building.unitType] || 0;
      if (window.gameState.gold >= cost) {
        // Spawn unit
        const unit = new Unit(entry.building.unitType, entry.building.x, entry.building.y, entry.building.size);
        state.units.push(unit);
        // Deduct gold
        window.gameState.gold -= cost;
        updateGoldUI();
        // Reset building's spawn timer
        entry.building.lastSpawn = now;
        entry.building.pendingProduction = false;
        // Remove from queue
        state.pendingProductions.shift();
      } else {
        // Insufficient gold; notify player and pause processing further pending productions
        console.log('Insufficient gold for', entry.building.unitType, 'production');
        break;
      }
    }
    // Difficulty increase
    if (now - lastDifficultyIncrease >= 30000) {
      if (difficultyLevel < MAX_DIFFICULTY) {
        difficultyLevel++;
        state.enemySpawnInterval = Math.max(800, state.enemySpawnInterval - 300);
      }
      lastDifficultyIncrease = now;
    }
    // Enemy spawning
    if (now - state.lastEnemySpawn >= state.enemySpawnInterval) {
      if (state.units.length + state.enemies.length < MAX_ENTITIES) {
        const { x, y } = getRandomSpawnPosition(state, canvas);
        const currentType = ENEMY_TYPES[difficultyLevel];
        const enemy = new Enemy(currentType, x, y, state.tileSize);
        state.enemies.push(enemy);
        state.lastEnemySpawn = now;
      }
    }
    // Update units
    if (delta > 0) {
      state.units.forEach(u => {
        const target = findNearest(u, state.enemies);
        if (target) {
          const dx = target.x - u.x;
          const dy = target.y - u.y;
          const dist = Math.hypot(dx, dy);
          // If within combat radius, unit should stand ground and attack (handled elsewhere)
          if (dist > COMBAT_RADIUS) {
            if (dist > 0) {
              const nx = (dx / dist) * u.speed * delta;
              const ny = (dy / dist) * u.speed * delta;
              // Compute potential new position for unit movement
              const newX = u.x + nx;
              const newY = u.y + ny;
              // Prevent moving into a tile occupied by another unit (excluding self)
              const occupied = isOccupied(newX, newY, u.size, state.units, u);
              if (!occupied) {
                u.x = newX;
                u.y = newY;
              }
            }
          }
        }
      });
    }
    // Ranged unit shooting
    if (delta > 0) {
      const now = performance.now();
      state.units.forEach(unit => {
        if (unit.range && now - (unit.lastShot || 0) >= unit.shotCooldown) {
          const rangePx = unit.range * TILE_SIZE;
          const rangeSq = rangePx * rangePx;
          let nearest = null;
          let nearestDistSq = Infinity;
          state.enemies.forEach(enemy => {
            const dx = enemy.x - unit.x;
            const dy = enemy.y - unit.y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= rangeSq && distSq < nearestDistSq) {
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
    // Tower shooting
    if (delta > 0) {
      const now = performance.now();
      state.buildings.forEach(building => {
        if (building.type === 'Tower' && now - (building.lastShot || 0) >= (building.towerCooldown || 2000)) {
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
    // Enemy wall collision
    if (delta > 0) {
      const isBlocked = (x, y, size) => {
        for (const b of state.buildings) {
          if (b.type !== 'Wall') continue;
          if (x < b.x + b.size && x + size > b.x && y < b.y + b.size && y + size > b.y) {
            return true;
          }
        }
        return false;
      };
      // Determine potential targets for enemies: player units and non‑wall buildings
      const enemyTargets = state.units.concat(state.buildings.filter(b => b.type !== 'Wall'));
      state.enemies.forEach(e => {
        const target = findNearest(e, enemyTargets);
        if (target) {
          const dx = target.x - e.x;
          const dy = target.y - e.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0) {
            const nx = (dx / dist) * e.speed * delta;
            const ny = (dy / dist) * e.speed * delta;
            const newX = e.x + nx;
            const newY = e.y + ny;
            if (!isBlocked(newX, newY, e.size) && !isOccupied(newX, newY, e.size, state.units.concat(state.enemies), e)) {
              e.x = newX;
              e.y = newY;
            } else {
              // Simple fallback: try moving only in x direction
              if (!isBlocked(e.x + nx, e.y, e.size)) {
                e.x += nx;
              } else if (!isBlocked(e.x, e.y + ny, e.size)) {
                e.y += ny;
              }
            }
          }
        }
      });
    }
    // Update projectiles
    if (delta > 0) {
      state.projectiles.forEach(p => p.update(delta));
    }
    // Projectile‑enemy collisions
    const remainingProjectiles = [];
    const remainingEnemiesAfterProj = [];
    state.enemies.forEach(enemy => {
      let enemyDead = false;
      state.projectiles.forEach(proj => {
        if (!proj.isAlive) return;
        const dx = proj.x - enemy.x;
        const dy = proj.y - enemy.y;
        const distSq = dx * dx + dy * dy;
        const hitRadius = proj.radius + enemy.size / 2;
        if (distSq <= hitRadius * hitRadius) {
          if (proj.type === 'Catapult' && enemy.type === 'Dragon') {
            // No damage
          } else {
            if (proj.type === 'Tower') {
                enemy.health -= 12;
            } else {
                enemy.health -= 100;
            }
          }
          proj.isAlive = false;
        }
      });
      if (enemy.health <= 0) {
        enemyDead = true;
        const reward = UNIT_GOLD_COST[enemy.type] || 0;
        window.gameState.gold += reward;
        updateGoldUI();
      }
      if (!enemyDead) remainingEnemiesAfterProj.push(enemy);
    });
    state.projectiles.forEach(p => {
      if (p.isAlive) remainingProjectiles.push(p);
    });
    state.projectiles = remainingProjectiles;
    state.enemies = remainingEnemiesAfterProj;
    const combatRadiusSq = COMBAT_RADIUS * COMBAT_RADIUS;
    // Enemy melee attack on player units and buildings (attack first)
    state.enemies.forEach(enemy => {
      const potentialTargets = state.units.concat(state.buildings.filter(b => b.type !== 'Wall'));
      const target = findNearest(enemy, potentialTargets);
      if (target) {
        const dx = target.x - enemy.x;
        const dy = target.y - enemy.y;
        if (dx * dx + dy * dy <= combatRadiusSq) {
          if (typeof target.health === 'number') {
            if (now - (enemy.lastAttack || 0) >= enemy.attackCooldown) {
          target.health -= enemy.damage;
          enemy.lastAttack = now;
        }
          }
        }
      }
    });
    // Player combat (damage and cooldown) using unit range
    state.units.forEach(unit => {
      const target = findNearest(unit, state.enemies);
      if (target) {
        const dx = target.x - unit.x;
        const dy = target.y - unit.y;
        const attackRangePx = unit.range * TILE_SIZE;
        if (dx * dx + dy * dy <= attackRangePx * attackRangePx) {
          if (now - (unit.lastAttack || 0) >= unit.attackCooldown) {
            target.health -= unit.damage || 0;
            unit.lastAttack = now;
          }
        }
      }
    });
    // Remove dead enemies and award gold
    const remainingEnemiesAfterCombat = [];
    state.enemies.forEach(enemy => {
      if (enemy.health > 0) {
        remainingEnemiesAfterCombat.push(enemy);
      } // gold already awarded earlier when enemy died
    });
    state.enemies = remainingEnemiesAfterCombat;
        // Remove dead units and buildings
    state.units = state.units.filter(u => u.health > 0);
    state.buildings = state.buildings.filter(b => b.health > 0);
    // Draw projectiles and enemies
    state.projectiles.forEach(p => p.draw(ctx));
    state.enemies.forEach(e => e.draw(ctx));

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

window.startGame = initializeGame;
