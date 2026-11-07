// src/entities/enemy.js
export class Enemy {
  constructor(type, x, y, size) {
    this.type = type; // e.g., 'Footman'
    this.x = x;
    this.y = y;
    this.size = size;
    // Speed in pixels per millisecond (move leftwards)
    this.speed = 0.05; // 0.05 px/ms => 50 px/s
    // Health for combat
    this.health = 100;
  }

  update(delta) {
    // Move leftwards
    this.x -= this.speed * delta;
  }

  draw(ctx) {
    // Render as red square
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    // Optional health bar above enemy
    if (this.health < 100) {
      const barWidth = this.size;
      const healthRatio = Math.max(this.health, 0) / 100;
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y - 5, barWidth, 4);
      ctx.fillStyle = 'lime';
      ctx.fillRect(this.x, this.y - 5, barWidth * healthRatio, 4);
    }
  }
}

