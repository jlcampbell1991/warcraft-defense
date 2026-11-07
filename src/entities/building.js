// src/entities/building.js
export class Building {
  constructor(type, x, y, size) {
    this.type = type; // "Barracks", "Tower", "Wall"
    this.x = x; // top-left corner in pixels
    this.y = y;
    this.size = size; // tile size
    // Production properties
    // Determine production properties based on building type
    switch (type) {
      case 'Barracks':
        this.spawnInterval = 6000; // ms (6 seconds)
        this.unitType = 'Footman';
        break;
      case 'Stable':
        this.spawnInterval = 9000; // ms (9 seconds)
        this.unitType = 'Knight';
        break;
      case 'ArcheryRange':
        this.spawnInterval = 7000; // ms (7 seconds)
        this.unitType = 'Archer';
        break;
      case 'Workshop':
        this.spawnInterval = 25000; // ms (25 seconds)
        this.unitType = 'Catapult';
        break;
      case 'DragonRoost':
        this.spawnInterval = 25000; // ms (25 seconds)
        this.unitType = 'Dragon';
        break;
      case 'Tower':
        // Tower specific properties for shooting
        this.towerRange = 200; // pixels
        this.towerCooldown = 2000; // ms between shots
        this.lastShot = 0;
        // Towers do not spawn units
        this.spawnInterval = 0;
        this.unitType = null;
        break;
      default:
        this.spawnInterval = 0;
        this.unitType = null;
    }
    this.lastSpawn = 0;
    // Health properties for buildings
    const BUILDING_HEALTH = {
      Barracks: 200,
      Tower: 150,
      Wall: 100,
      Stable: 200,
      ArcheryRange: 200,
      Workshop: 200,
      DragonRoost: 300,
    };
    const maxHealth = BUILDING_HEALTH[type] || 100;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
  }

  draw(ctx) {
    // Choose color based on type
    let color = '#fff';
    switch (this.type) {
      case 'Barracks':
        color = '#8B4513'; // brown
        break;
      case 'Tower':
        color = '#777777'; // grey
        break;
      case 'Wall':
        color = '#555555'; // dark grey
        break;
      default:
        color = '#ff00ff';
    }
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    // optional border
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    // Health bar below building
    if (this.maxHealth > 0) {
      const barWidth = this.size;
      const healthRatio = Math.max(this.health, 0) / this.maxHealth;
      const barX = this.x;
      const barY = this.y + this.size + 2;
      ctx.fillStyle = 'black';
      ctx.fillRect(barX, barY, barWidth, 4);
      ctx.fillStyle = 'lime';
      ctx.fillRect(barX, barY, barWidth * healthRatio, 4);
    }
    // Draw spawn timer if building produces units
    if (this.spawnInterval > 0) {
      const now = performance.now();
      const remainingMs = Math.max(0, this.spawnInterval - (now - this.lastSpawn));
      const remainingSec = (remainingMs / 1000).toFixed(1);
      ctx.fillStyle = 'white';
      ctx.font = `${Math.round(this.size / 3)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(remainingSec, this.x + this.size / 2, this.y - 2);
    }
  }

  canSpawn(now) {
    return this.spawnInterval > 0 && (now - this.lastSpawn) >= this.spawnInterval;
  }
}

