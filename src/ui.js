// src/ui.js
export function initUI() {
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

  // Build menu placeholder
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
  buildMenu.textContent = 'Build Menu (placeholder)';
  document.body.appendChild(buildMenu);
}
