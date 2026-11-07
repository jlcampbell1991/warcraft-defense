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
    // Health and combat properties
    let maxHealth = 100;
    let damage = 0;
    let attackCooldown = 0;
    switch (type) {
      case 'Footman':
        maxHealth = 60;
        damage = 6;
        attackCooldown = 1000; // 1 second
        break;
      case 'Knight':
        maxHealth = 90;
        damage = 8;
        attackCooldown = 800;
        break;
      case 'Archer':
        maxHealth = 40;
        damage = 3;
        attackCooldown = 900;
        break;
      case 'Catapult':
        maxHealth = 110;
        damage = 15;
        attackCooldown = 1200;
        break;
      case 'Dragon':
        maxHealth = 100;
        damage = 10;
        attackCooldown = 500;
        break;
      default:
        maxHealth = 100;
    }
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.damage = damage;
    this.attackCooldown = attackCooldown;
    this.lastAttack = 0;
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
    // Health bar below unit
    if (this.maxHealth > 0) {
      const barWidth = this.size;
      const healthRatio = Math.max(this.health, 0) / this.maxHealth;
      const barX = this.x;
      const barY = this.y + this.size + 2; // 2px below
      ctx.fillStyle = 'black';
      ctx.fillRect(barX, barY, barWidth, 4);
      ctx.fillStyle = 'lime';
      ctx.fillRect(barX, barY, barWidth * healthRatio, 4);
    }
  }
}
