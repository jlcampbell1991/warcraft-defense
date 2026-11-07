// src/main.js
import { initUI } from './ui.js';

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

  // Simple render loop
  const ctx = canvas.getContext('2d');
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Placeholder: draw background
    ctx.fillStyle = '#0a0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
