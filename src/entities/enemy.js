// src/entities/enemy.js
export class Enemy {
  constructor(type, x, y, size) {
    this.type = type; // e.g., 'Footman'
    this.x = x;
    this.y = y;
    this.size = size;
    // Speed in pixels per millisecond (move leftwards)
    this.speed = 0.05; // 0.05 px/ms => 50 px/s
    // Define health, damage, attackCooldown, and color based on type
    const TYPE_DATA = {
      Footman: { health: 60, damage: 6, attackCooldown: 1000, color: 'red' },
      Archer: { health: 40, damage: 3, attackCooldown: 900, color: 'orange' },
      Knight: { health: 90, damage: 8, attackCooldown: 800, color: 'purple' },
      Catapult: { health: 110, damage: 15, attackCooldown: 1200, color: 'brown' },
      Dragon: { health: 100, damage: 10, attackCooldown: 500, color: 'black' },
    };
    const data = TYPE_DATA[type] || TYPE_DATA.Footman;
    this.maxHealth = data.health;
    this.health = data.health;
    this.damage = data.damage;
    this.attackCooldown = data.attackCooldown;
    this.lastAttack = 0;
    this.color = data.color;
  }

  update(delta) {
    // Move leftwards (will be overridden by dynamic targeting elsewhere)
    this.x -= this.speed * delta;
  }

  draw(ctx) {
    // Render as type‑specific color square
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    // Health bar below enemy (always shown)
    const barWidth = this.size;
    const healthRatio = Math.max(this.health, 0) / this.maxHealth;
    const barY = this.y + this.size + 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, barY, barWidth, 4);
    ctx.fillStyle = 'lime';
    ctx.fillRect(this.x, barY, barWidth * healthRatio, 4);
  }
}

