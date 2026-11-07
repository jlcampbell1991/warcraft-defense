// src/entities/enemy.js
export class Enemy {
  constructor(type, x, y, size) {
    this.type = type; // e.g., 'Footman'
    this.x = x;
    this.y = y;
    this.size = size;
    // Speed in pixels per millisecond (move leftwards)
    this.speed = 0.05; // 0.05 px/ms => 50 px/s
    // Define health and color based on type
    const TYPE_DATA = {
      Footman: { health: 100, color: 'red' },
      Archer: { health: 120, color: 'orange' },
      Knight: { health: 150, color: 'purple' },
      Catapult: { health: 200, color: 'brown' },
      Dragon: { health: 300, color: 'black' },
    };
    const data = TYPE_DATA[type] || TYPE_DATA.Footman;
    this.maxHealth = data.health;
    this.health = data.health;
    this.color = data.color;
  }

  update(delta) {
    // Move leftwards
    this.x -= this.speed * delta;
  }

  draw(ctx) {
    // Render as type‑specific color square
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    // Optional health bar above enemy
    if (this.health < this.maxHealth) {
      const barWidth = this.size;
      const healthRatio = Math.max(this.health, 0) / this.maxHealth;
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y - 5, barWidth, 4);
      ctx.fillStyle = 'lime';
      ctx.fillRect(this.x, this.y - 5, barWidth * healthRatio, 4);
    }
  }
}

