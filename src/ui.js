// src/ui.js
import { showDailyCaller } from './dailyCaller.js';
export function initUI() {
// Existing UI initialization
  // Gold counter
  const goldDiv = document.createElement('div');
  goldDiv.id = 'goldCounter';
  goldDiv.textContent = 'Gold: 0';
  goldDiv.style.position = 'absolute';
  goldDiv.style.top = '10px';
  goldDiv.style.left = '10px';
  goldDiv.style.color = 'white';
  goldDiv.style.font = '16px sans-serif';
  document.body.appendChild(goldDiv);

  // Map size selector
  const mapSizeDiv = document.createElement('div');
  mapSizeDiv.id = 'mapSizeSelector';
  mapSizeDiv.style.position = 'absolute';
  mapSizeDiv.style.top = '10px';
  mapSizeDiv.style.right = '10px';
  mapSizeDiv.style.color = 'white';
  mapSizeDiv.style.font = '16px sans-serif';
  mapSizeDiv.innerHTML = `Map Size: 
    <select id="mapSize">
      <option value="small">Small</option>
      <option value="medium" selected>Medium</option>
      <option value="large">Large</option>
    </select>`;
  document.body.appendChild(mapSizeDiv);

  // Map size selector event
  document.getElementById('mapSize').addEventListener('change', (e) => {
    if (window.setMapSize) {
      window.setMapSize(e.target.value);
    }
  });

  // Build menu with building options
  const buildMenu = document.createElement('div');
  buildMenu.id = 'buildMenu';
  buildMenu.style.position = 'absolute';
  buildMenu.style.bottom = '10px';
  buildMenu.style.left = '50%';
  buildMenu.style.transform = 'translateX(-50%)';
  buildMenu.style.background = 'rgba(0,0,0,0.5)';
  buildMenu.style.padding = '8px';
  buildMenu.style.borderRadius = '4px';
  buildMenu.style.color = 'white';
  // Add buttons for buildings with costs
  buildMenu.innerHTML = `
    <button id="btnBarracks" data-type="Barracks" data-cost="150">Barracks (150)</button>
    <button id="btnTower" data-type="Tower" data-cost="200">Tower (200)</button>
    <button id="btnWall" data-type="Wall" data-cost="50">Wall (50)</button>
    <button id="btnStable" data-type="Stable" data-cost="300" disabled>Stable (300)</button>
    <button id="btnArchery" data-type="ArcheryRange" data-cost="350" disabled>Archery Range (350)</button>
    <button id="btnWorkshop" data-type="Workshop" data-cost="400" disabled>Workshop (400)</button>
    <button id="btnDragonRoost" data-type="DragonRoost" data-cost="500" disabled>Dragon Roost (500)</button>
    <button id="btnDailyCaller">Daily Caller</button>
  `;
  document.body.appendChild(buildMenu);

  // Function to unlock buildings based on gold
  const unlockBuildings = () => {
    const gold = window.gameState ? window.gameState.gold : 0;
    const thresholds = {
      btnStable: 300,
      btnArchery: 350,
      btnWorkshop: 400,
      btnDragonRoost: 500,
    };
    Object.entries(thresholds).forEach(([btnId, th]) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      if (gold >= th) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  };

  // Attach click handlers to set selected building type
  const setSelected = (type, cost) => {
    if (window.gameState) {
      window.gameState.selectedBuilding.type = type;
      window.gameState.selectedBuilding.cost = cost;
    }
  };
  document.getElementById('btnBarracks').addEventListener('click', () => setSelected('Barracks', 150));
  document.getElementById('btnTower').addEventListener('click', () => setSelected('Tower', 200));
  document.getElementById('btnWall').addEventListener('click', () => setSelected('Wall', 50));
  document.getElementById('btnStable').addEventListener('click', () => setSelected('Stable', 300));
  document.getElementById('btnArchery').addEventListener('click', () => setSelected('ArcheryRange', 350));
  document.getElementById('btnWorkshop').addEventListener('click', () => setSelected('Workshop', 400));
  document.getElementById('btnDragonRoost').addEventListener('click', () => setSelected('DragonRoost', 500));
  document.getElementById('btnDailyCaller').addEventListener('click', showDailyCaller);

  // Expose unlock function globally for gold updates
  window.unlockBuildings = unlockBuildings;
}

// Start screen handling
export function initStartScreen() {
  const overlay = document.getElementById('startScreen');
  const btn = document.getElementById('startBtn');
  if (!overlay || !btn) {
    console.warn('Start screen elements not found');
    return;
  }
  // Ensure overlay is visible initially
  overlay.style.display = 'flex';
  btn.addEventListener('click', () => {
    overlay.style.display = 'none';
    if (typeof window.startGame === 'function') {
      window.startGame();
    } else {
      console.error('window.startGame is not defined');
    }
  });
}

export function initDailyCallerUI() {
  const modal = document.createElement('div');
  modal.id = 'dailyCallerModal';
  modal.style = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.9); color: white; display: none;
    align-items: center; justify-content: center; padding: 20px; overflow: auto;
    z-index: 2000;
  `;
  modal.innerHTML = `
    <div id="dailyCallerContent" style="max-width: 800px; background:#222; padding:20px; border-radius:8px; position:relative;">
      <button id="dailyCallerClose" style="position:absolute; top:10px; right:10px;">✖</button>
      <div id="dailyCallerBody">Loading…</div>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('dailyCallerClose').addEventListener('click', () => { modal.style.display = 'none'; });
}
