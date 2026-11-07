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
        this.spawnInterval = 5000; // ms
        this.unitType = 'Footman';
        break;
      case 'Stable':
        this.spawnInterval = 5000;
        this.unitType = 'Knight';
        break;
      case 'ArcheryRange':
        this.spawnInterval = 5000;
        this.unitType = 'Archer';
        break;
      case 'Workshop':
        this.spawnInterval = 5000;
        this.unitType = 'Catapult';
        break;
      case 'DragonRoost':
        this.spawnInterval = 5000;
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
  }

  canSpawn(now) {
    return this.spawnInterval > 0 && (now - this.lastSpawn) >= this.spawnInterval;
  }
}

