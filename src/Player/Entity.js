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
    const pos = this.getPosition();

    if (!this.tilemap.isColliding(this.container.getBounds())) {
      pos.y += this._velocity.y * delta;
      pos.x += this._velocity.x * delta;
    } else {
      this._velocity.y = 0;
      this._velocity.x = 0;
    }
    this.setPosition(pos);
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
