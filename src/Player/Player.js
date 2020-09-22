import Entity from "root/Player/Entity";
import prototypePlayer from 'assets/player/prototype.png';
import Game from "root/main";
import keyboard from "root/Keyboard";

export default class Player extends Entity {

  playerSprite;
  keysHandlers = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  }

  constructor(tilemap) {
    super(tilemap);
    this.playerSprite = new PIXI.Sprite(Game.app.loader.resources[prototypePlayer].texture);
    this.container.y = 100;
    this.container.addChild(this.playerSprite);
  }

  startKeyboardListening() {
    this.keysHandlers.top = keyboard('z');
    this.keysHandlers.bottom = keyboard('s');
    this.keysHandlers.left = keyboard('q');
    this.keysHandlers.right = keyboard('d');
    this.keysHandlers.top.press = this.jump.bind(this);
  }

  stopKeyboardListening() {
    this.keysHandlers.top.unsubscribe();
    this.keysHandlers.bottom.unsubscribe();
    this.keysHandlers.left.unsubscribe();
    this.keysHandlers.right.unsubscribe();
  }

  jump() {
    console.log('cc');
    const vel = this.getVelocity();
    vel.y = -5;
    this.setVelocity(vel);
  }

  update(delta) {
    super.update(delta);
    if (this.keysHandlers.right.isDown) {
      const vel = this.getVelocity();
      vel.x += 0.2 * delta;
    }
    if (this.keysHandlers.left.isDown) {
      const vel = this.getVelocity();
      vel.x -= 0.2 * delta;
    }
    if (this.keysHandlers.bottom.isDown) {
      const vel = this.getVelocity();
      vel.y += 0.2 * delta;
    }
  }

}
