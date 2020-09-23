import Entity from "root/Player/Entity";
import player from 'assets/player/Player1.png';
import Game from "root/main";
import keyboard from "root/Keyboard";

export default class Player extends Entity {

  playerSize = 2;
  playerSprite;
  keysHandlers = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  }
  isSneaked = false;
  remainingJumps = 2;
  maxSpeed = 8;

  constructor(tilemap) {
    super(tilemap);
    this.playerSprite = new PIXI.Sprite(Game.app.loader.resources[player].texture);
    const resizeRatio = (tilemap.tileRenderSize * this.playerSize)/(this.playerSprite.height);
    const newWidth = this.playerSprite.width * resizeRatio;
    this.playerSprite.scale.set(resizeRatio);
    this.container.y = 500;
    this.container.x = 65;
    this.container.addChild(this.playerSprite);
  }

  startKeyboardListening() {
    this.keysHandlers.top = keyboard(' ');
    this.keysHandlers.bottom = keyboard('ctrl');
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
        if (vel.x < this.maxSpeed)
          vel.x += 0.7 * delta;
      }
      if (this.keysHandlers.left.isDown) {
        const vel = this.getVelocity();
        if (vel.x > -1 * this.maxSpeed)
          vel.x -= 0.7 * delta;
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
