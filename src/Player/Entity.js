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
        pos.x = collider.x - this.container.width;
      } else {
        pos.x = collider.x + collider.width;
      }
      vel.x = 0;
    }

    old_pos = pos.y;
    pos.y += vel.y * delta;
    newPosRect = new PIXI.Rectangle(pos.x, pos.y, this.container.width, this.container.height);
    collider = this.tilemap.isColliding(newPosRect);
    if (collider) {
      if (collider.centerY > newPosRect.centerY) {
        pos.y = collider.y - this.container.height;
        if (vel.y > 0)
          vel.y = 0;
      } else {
        pos.y = collider.y + collider.height;
        if (vel.y < 0)
          vel.y = 0;
      }
      if (vel.x !== 0 && Game.gameplayState.isGravityEnabled) {
        if (vel.x > 0.15)
          vel.x -= 0.1 * delta;
        else if (vel.x < -0.15)
          vel.x += 0.1 * delta;
        else
          vel.x = 0;
      }
    }

    this.setPosition(pos);
    this.setVelocity(vel);



    /*const nextFramContainerBounds = this.container.getBounds();
    nextFramContainerBounds.y += this._velocity.y * delta;
    nextFramContainerBounds.x += this._velocity.x * delta;*/
    /*const localBounding = this.container.getBounds();
    const collideBounding = this.tilemap.isColliding(localBounding);
    if (collideBounding) {
      if (localBounding.centerY > collideBounding.centerY) {
        this.container.y = collideBounding.y + collideBounding.height;
        this._velocity.y = 0;
      } else if (localBounding.centerY < collideBounding.centerY) {
        this.container.y = collideBounding.y - this.container.height;
        this._velocity.y = 0;
      }
      if (localBounding.centerX > collideBounding.centerX) {
        this.container.x = collideBounding.x + collideBounding.width;
        this._velocity.x = 0;
      } else if (localBounding.centerX < collideBounding.centerX) {
        this.container.x = collideBounding.x - this.container.width;
        this._velocity.x = 0;
      }
    }
    this.container.y += this._velocity.y * delta;
    this.container.x += this._velocity.x * delta;
*/
    /*if (!this.tilemap.isColliding(nextFramContainerBounds)) {
      pos.y += this._velocity.y * delta;
      pos.x += this._velocity.x * delta;
    } else {
      this._velocity.y = 0;
      this._velocity.x = 0;
    }*/
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

}
