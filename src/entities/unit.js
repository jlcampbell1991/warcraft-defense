// src/entities/unit.js
export class Unit {
  constructor(type, x, y, size) {
    this.type = type; // e.g., 'Footman'
    this.x = x;
    this.y = y;
    this.size = size;
    // Simple speed in pixels per millisecond
    this.speed = 0.05; // 0.05 px/ms => 50 px/s
    // Ranged unit properties (default for melee units)
    this.range = null; // in pixels, null means melee
    this.shotCooldown = 2000; // ms between shots for ranged units
    this.lastShot = 0; // timestamp of last shot
    // Flying flag for Dragons
    this.isFlying = false;
    // Initialize type‑specific defaults
    switch (type) {
      case 'Archer':
        this.range = 150;
        break;
      case 'Catapult':
        this.range = 150;
        break;
      case 'Dragon':
        this.range = 150;
        this.isFlying = true;
        break;
      default:
        // melee units keep range null
        break;
    }
  }

  update(delta) {
    // Move rightwards (positive x) for now
    this.x += this.speed * delta;
  }

  draw(ctx) {
    // Choose color based on unit type
    let color = 'green'; // default
    switch (this.type) {
      case 'Footman':
        color = 'green';
        break;
      case 'Knight':
        color = 'blue';
        break;
      case 'Archer':
        color = 'green'; // same as footman per spec
        break;
      case 'Catapult':
        color = 'orange';
        break;
      case 'Dragon':
        color = 'purple';
        break;
      default:
        color = 'gray';
    }
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
}
