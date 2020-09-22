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
  isSneaked = false;
  remainingJumps = 2;

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
    this.keysHandlers.bottom.press = this.startSneack.bind(this);
    this.keysHandlers.bottom.release = this.stopSneack.bind(this);
  }

  stopKeyboardListening() {
    this.keysHandlers.top.unsubscribe();
    this.keysHandlers.bottom.unsubscribe();
    this.keysHandlers.left.unsubscribe();
    this.keysHandlers.right.unsubscribe();
  }

  jump() {
    if (Game.gameplayState.isGravityEnabled) {
      if (this.remainingJumps <= 0)
        return;
      this.remainingJumps--;
      super.jump();
    }
  }

  startSneack() {
    this.isSneaked = true;
  }

  stopSneack() {
    this.isSneaked = false;
  }

  update(delta) {
    super.update(delta);
    if (Game.gameplayState.isGravityEnabled) {
      if (this.keysHandlers.right.isDown) {
        const vel = this.getVelocity();
        vel.x += 0.2 * delta;
      }
      if (this.keysHandlers.left.isDown) {
        const vel = this.getVelocity();
        vel.x -= 0.2 * delta;
      }
      if (this.isSneaked) {
        const vel = this.getVelocity();
        vel.y += 0.2 * delta;
      }
    }
  }

  onLanded() {
    super.onLanded();
    this.remainingJumps = 2;
  }

}
