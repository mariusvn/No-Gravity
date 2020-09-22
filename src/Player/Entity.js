import Game from "root/main";

export default class Entity {

  container = new PIXI.Container();
  _velocity = {x: 0, y: 0};
  tilemap;

  constructor(tilemap) {
    this.tilemap = tilemap;
  }

  update(delta) {
    if (Game.gameplayState.isGravityEnabled) {
      this._velocity.y += Game.gameplayState.gravityForce * 0.1
    }

    let pos = this.getPosition();
    let vel = this.getVelocity();
    let newPosRect, collider, old_pos;

    old_pos = pos.x;
    pos.x += vel.x * delta;
    newPosRect = new PIXI.Rectangle(pos.x, pos.y, this.container.width, this.container.height);
    collider = this.tilemap.isColliding(newPosRect);
    if (collider) {
      if (collider.centerX > newPosRect.centerX) {
        // Collision Right
        pos.x = collider.x - this.container.width;
      } else {
        // Collision Left
        pos.x = collider.x + collider.width;
      }
      if (Game.gameplayState.isGravityEnabled) {
        vel.x = 0;
      } else {
        vel.x = -1 * (vel.x / 2);
      }
    }

    old_pos = pos.y;
    pos.y += vel.y * delta;
    newPosRect = new PIXI.Rectangle(pos.x, pos.y, this.container.width, this.container.height);
    collider = this.tilemap.isColliding(newPosRect);
    if (collider) {
      if (collider.centerY > newPosRect.centerY) {
        // Collision downside
        pos.y = collider.y - this.container.height;
        if (Game.gameplayState.isGravityEnabled && vel.y > 0) {
          vel.y = 0;
        } else {
          //bounce on ground if no gravity
          vel.y = -1 * (vel.y / 2);
        }
        this.onLanded();

        // Ground friction
        if (vel.x !== 0 && Game.gameplayState.isGravityEnabled) {
          if (vel.x > 0.15)
            vel.x -= 0.1 * delta;
          else if (vel.x < -0.15)
            vel.x += 0.1 * delta;
          else
            vel.x = 0;
        }
      } else {
        // Collision topside
        pos.y = collider.y + collider.height;
        if (Game.gameplayState.isGravityEnabled && vel.y < 0)
          vel.y = 0;
        else
          vel.y = -1 * (vel.y / 2);
      }
    }

    this.setPosition(pos);
    this.setVelocity(vel);
  }

  jump() {
    const vel = this.getVelocity();
    vel.y = -0.195 * this.tilemap.tileRenderSize;
  }

  setPosition({x, y}) {
    this.container.x = x;
    this.container.y = y;
  }

  getPosition() {
    return {
      x: this.container.x,
      y: this.container.y
    }
  }

  setVelocity({x, y}) {
    this._velocity.x = x;
    this._velocity.y = y;
  }

  getVelocity() {
    return this._velocity;
  }

  onLanded() {}

}
