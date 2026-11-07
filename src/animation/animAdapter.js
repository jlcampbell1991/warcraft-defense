/**
 * Animation Adapter for Warcraft II-style sprite animations.
 * Translates animation definitions into canvas rendering for units.
 * 
 * This adapter supports:
 * - Animation sequence selection
 * - Directional facing (S, SE, NE, SW, NW)
 * - Horizontal mirroring
 * - Frame timing
 * - Looping and non-looping animations
 * - State transitions
 * - Canvas rendering using sprite source rectangles
 * 
 * Usage:
 * const anim = new AnimationAdapter(footmanAnimation);
 * anim.setState('walk');
 * anim.setDirection('SE');
 * anim.update(delta);
 * anim.draw(ctx, spriteImage, x, y, size);
 */

export class AnimationAdapter {
  constructor(animationDef) {
    this.animationDef = animationDef;
    this.currentAnimation = null;
    this.currentState = null;
    this.currentDirection = 'S';
    this.currentFrameIndex = 0;
    this.currentFrameTime = 0;
    this.isLooping = false;
    this.isFinished = false;
    this.frameRate = animationDef.frameRate || 24;
  }

  /**
   * Set the animation state (e.g., 'idle', 'walk', 'attack', 'death')
   * @param {string} stateName - Name of the animation state
   */
  setState(stateName) {
    if (this.animationDef[stateName]) {
      this.currentState = stateName;
      this.currentAnimation = this.animationDef[stateName];
      this.currentFrameIndex = 0;
      this.currentFrameTime = 0;
      this.isLooping = this.currentAnimation.loop;
      this.isFinished = false;
    }
  }

  /**
   * Set the direction (S, SE, NE, SW, NW)
   * @param {string} dir - Direction (S, SE, NE, SW, NW)
   */
  setDirection(dir) {
    // Validate direction
    const validDirections = ['S', 'SE', 'NE', 'SW', 'NW'];
    if (!validDirections.includes(dir)) {
      console.warn(`Invalid direction: ${dir}. Using default 'S'.`);
      dir = 'S';
    }
    
    this.currentDirection = dir;
  }

  /**
   * Update the animation state based on the time delta
   * @param {number} delta - Time elapsed since last update (in seconds)
   */
  update(delta) {
    // Skip if no current animation
    if (!this.currentAnimation) return;
    
    // Calculate time since last update in game ticks
    const gameTicks = delta * this.frameRate;
    
    // Add to current frame time
    this.currentFrameTime += gameTicks;
    
    // Check if we need to advance to the next frame
    if (this.currentFrameTime >= this.currentAnimation.timing) {
      // Reset frame time
      this.currentFrameTime = 0;
      
      // Advance to next frame
      if (Array.isArray(this.currentAnimation.frames)) {
        // Multiple frames in sequence
        const frameCount = this.currentAnimation.frames.length;
        if (frameCount === 1) {
          // Single frame (static animation)
          // Do nothing - we're already on the only frame
        } else {
          // Multiple frames
          this.currentFrameIndex = (this.currentFrameIndex + 1) % frameCount;
        }
      } else {
        // Single frame index (not an array)
        // Do nothing - we're already on the only frame
      }
      
      // Check if animation has finished (non-looping)
      if (!this.isLooping && this.currentFrameIndex === this.currentAnimation.frames.length - 1) {
        this.isFinished = true;
      }
    }
  }

  /**
   * Draw the current frame to the canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {HTMLImageElement} spriteImage - Sprite sheet image
   * @param {number} x - X position on canvas
   * @param {number} y - Y position on canvas
   * @param {number} size - Size of the unit (side length)
   */
  draw(ctx, spriteImage, x, y, size) {
    // Skip if no sprite image or no current animation
    if (!spriteImage || !this.currentAnimation) return;
    
    // Calculate source rectangle for the frame
    // Frame dimensions: 32x32 (actual frame) with 1-pixel border
    // Effective cell size: 34x34 (32px frame + 1px border on each side)
    const CELL = 34;
    const FRAME_SIZE = 32;
    
    // Determine direction row (S, SE, NE) for the base frame
    let directionRow = 0; // Default to S
    
    // Map directions to rows
    const directionMap = this.animationDef.directions;
    if (directionMap && directionMap[this.currentDirection]) {
      directionRow = directionMap[this.currentDirection].row;
    } else if (this.currentDirection === 'SW' || this.currentDirection === 'NW') {
      // For SW and NW, use SE and NE rows respectively and apply mirroring
      // Get the direction that corresponds to the mirrored direction
      const mirroredDirection = this.currentDirection === 'SW' ? 'SE' : 'NE';
      if (directionMap && directionMap[mirroredDirection]) {
        directionRow = directionMap[mirroredDirection].row;
      }
    }
    
    // Get the frame index based on current state and direction
    let frameIndex = 1; // Default to frame 1 (index 1 in zero-based)
    
    if (Array.isArray(this.currentAnimation.frames)) {
      // Multiple frames - use the current frame index
      if (this.currentAnimation.frames.length > 0) {
        frameIndex = this.currentAnimation.frames[this.currentFrameIndex];
      }
    }
    
    // Calculate source rectangle
    // Skip the left border (1px) and top border (1px)
    const srcX = (frameIndex - 1) * CELL + 1; // frameIndex - 1 because indices start at 1
    const srcY = directionRow * CELL + 1;
    
    // Draw with appropriate scaling
    const scaleX = size / FRAME_SIZE;
    const scaleY = size / FRAME_SIZE;
    
    // For SW and NW directions, apply horizontal mirroring by scaling
    const drawScaleX = this.currentDirection === 'SW' || this.currentDirection === 'NW' ? -scaleX : scaleX;
    
    // Save current context state
    ctx.save();
    
    // Apply scaling and translation
    ctx.scale(drawScaleX, scaleY);
    ctx.translate(-x, -y);
    
    // Draw the frame
    ctx.drawImage(
      spriteImage,
      srcX, srcY, FRAME_SIZE, FRAME_SIZE,
      0, 0, size, size
    );
    
    // Restore context state
    ctx.restore();
  }
}

// Export the class as default
export default AnimationAdapter;