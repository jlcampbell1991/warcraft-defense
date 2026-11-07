// src/entities/unit.js
import footmanAnimation from '../animation/footmanAnimation.js';
import AnimationAdapter from '../animation/animAdapter.js';
// PNG assets are not importable in Node test environment; will be loaded lazily in browser
// import humanFootmanImage from '../../assets/human-footman.png';

export class Unit {
  constructor(type, x, y, size) {
    this.type = type; // e.g., 'Footman'
    this.x = x;
    this.y = y;
    this.size = size;
    // Simple speed in pixels per millisecond
    const BASE_SPEED = 0.05; // base speed for stat 10
    const SPEED_STATS = {
      Footman: 10,
      Archer: 10,
      Knight: 13,
      Catapult: 5,
      Dragon: 16,
    };
    const stat = SPEED_STATS[type] || 10;
    this.speed = BASE_SPEED * (stat / 10); // computed speed
    // Range stat (in tiles). Determines attack distance.
    this.range = 1; // default melee range of 1 tile
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
        // Initialize animation adapter for footman
        this.anim = new AnimationAdapter(footmanAnimation);
        this.anim.setState('idle');
        this.anim.setDirection('S');
        // Load sprite image lazily for browser runtime
        // In browser environments, create Image; in Node tests, leave null
        if (typeof Image !== 'undefined') {
          this.footmanImage = new Image();
          this.footmanImage.src = new URL('../../assets/human-footman.png', import.meta.url).href;
        } else {
          this.footmanImage = null;
        }
        break;
      case 'Knight':
        maxHealth = 90;
        damage = 8;
        attackCooldown = 800;
        break;
      case 'Archer':
        maxHealth = 40;
        damage = 6;
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
      case 'Footman':
        this.range = 1; // melee range 1 tile
        break;
      case 'Knight':
        this.range = 1; // melee range 1 tile
        break;
      case 'Archer':
        this.range = 5; // ranged attack up to 5 tiles
        break;
      case 'Catapult':
        this.range = 8; // ranged attack up to 8 tiles
        break;
      case 'Dragon':
        this.range = 4; // ranged attack up to 4 tiles
        this.isFlying = true;
        break;
      default:
        this.range = 1; // default fallback
    }
    
    // Initialize animation for footman units
    if (type === 'Footman') {
      this.anim = new AnimationAdapter(footmanAnimation);
      this.anim.setState('idle');
      this.anim.setDirection('S');
      this.isAttacking = false;
    }
  }

  setDirection(dir) {
    if (this.type === 'Footman' && this.anim) {
      this.anim.setDirection(dir);
      this.direction = dir;
    }
  }

  update(delta) {
    // Move rightwards (positive x) for now
    this.x += this.speed * delta;
    
    // Update animation state based on unit status
    if (this.type === 'Footman' && this.anim) {
      // If a non‑looping animation is in progress and not finished, do not override it
      if (this.anim.currentAnimation && !this.anim.isLooping && !this.anim.isFinished) {
        // keep current state
      } else if (this.health <= 0) {
        this.anim.setState('death');
      } else if (this.isAttacking) {
        this.anim.setState('attack');
      } else if (this.speed > 0) {
        this.anim.setState('walk');
      } else {
        this.anim.setState('idle');
      }
      
      // Update the animation
      this.anim.update(delta);
    }
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
    
    // Draw animation for footman units
    if (this.type === 'Footman' && this.anim) {
      this.anim.draw(ctx, this.footmanImage, this.x, this.y, this.size);
    } else {
      // Draw rectangle for other units
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
    
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
