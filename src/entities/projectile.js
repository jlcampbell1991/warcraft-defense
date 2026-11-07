// src/entities/projectile.js
export class Projectile {
  /**
   * @param {string} type - unit type that fired the projectile (e.g., 'Archer', 'Catapult', 'Dragon')
   * @param {number} x - starting x position
   * @param {number} y - starting y position
   * @param {object} target - enemy object the projectile is heading toward
   * @param {number} speed - pixels per millisecond
   */
  constructor(type, x, y, target, speed = 0.2) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.target = target;
    this.speed = speed;
    this.radius = 4; // visual radius
    this.isAlive = true;
  }

  /** Update projectile position towards its target */
  update(delta) {
    if (!this.isAlive) return;
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    const travel = this.speed * delta;
    if (travel >= dist) {
      // Reach target
      this.x = this.target.x;
      this.y = this.target.y;
    } else {
      this.x += (dx / dist) * travel;
      this.y += (dy / dist) * travel;
    }
  }

  /** Draw projectile as a small circle */
  draw(ctx) {
    if (!this.isAlive) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }
}
