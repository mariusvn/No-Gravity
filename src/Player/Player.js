import Entity from "root/Player/Entity";
import player from 'assets/player/Player1.png';
import Game from "root/main";
import keyboard from "root/Keyboard";
import Animation from "root/Animation";

export default class Player extends Entity {

  playerSize = 2;
  playerAnimation;
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
  resizeRatio = 0;

  constructor(tilemap, x, y) {
    super(tilemap);
    this.playerAnimation = new Animation(player, {x: 32, y: 56}, {
      'idle': {
        animated: false,
        tileId: 0
      },
      'run': {
        animated: true,
        from: 1,
        to: 7
      }
    }, 'idle', 100);
    this.playerSprite = this.playerAnimation.sprite;
    this.resizeRatio = (tilemap.tileRenderSize * this.playerSize)/(this.playerSprite.height);
    this.playerSprite.scale.set(this.resizeRatio);
    this.playerSprite.anchor.set(0.5);
    this.playerSprite.x = this.playerSprite.width / 2;
    this.playerSprite.y = this.playerSprite.height / 2;
    this.container.x = x * this.tilemap.tileRenderSize;
    this.container.y = y * this.tilemap.tileRenderSize;
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
    this.playerAnimation.start();
    /*const run = () => this.playerAnimation.setCurrentAnimation('run');
    const idle = (keyCheck) => () => {
      if (!keyCheck.isDown)
        this.playerAnimation.setCurrentAnimation('idle');
    }
    this.keysHandlers.right.press = run;
    this.keysHandlers.left.press = run;
    this.keysHandlers.right.release = idle(this.keysHandlers.left);
    this.keysHandlers.left.release = idle(this.keysHandlers.right);*/
  }

  stopKeyboardListening() {
    this.keysHandlers.top.unsubscribe();
    this.keysHandlers.bottom.unsubscribe();
    this.keysHandlers.left.unsubscribe();
    this.keysHandlers.right.unsubscribe();
    this.playerAnimation.unload();
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
    if (this.isLanded) {
      if (this.keysHandlers.right.isDown || this.keysHandlers.left.isDown)
        this.playerAnimation.setCurrentAnimation('run');
      else
        this.playerAnimation.setCurrentAnimation('idle');
    } else {
      this.playerAnimation.setCurrentAnimation('idle');
    }
    super.update(delta);
    if (Game.gameplayState.isGravityEnabled) {
      if (this.keysHandlers.right.isDown) {
        this.playerSprite.scale.x = this.resizeRatio;
        const vel = this.getVelocity();
        if (vel.x < this.maxSpeed * this.tilemap.tileRenderSize * 0.03)
          vel.x += 0.7 * delta * this.tilemap.tileRenderSize * 0.04;
      }
      if (this.keysHandlers.left.isDown) {
        this.playerSprite.scale.x = -1 * this.resizeRatio;
        const vel = this.getVelocity();
        if (vel.x > -1 * this.maxSpeed * this.tilemap.tileRenderSize * 0.03)
          vel.x -= 0.7 * delta * this.tilemap.tileRenderSize * 0.04;
      }
      if (this.isSneaked) {
        const vel = this.getVelocity();
        vel.y += 0.2 * delta * this.tilemap.tileRenderSize * 0.04;
      }
    }
  }

  onLanded() {
    super.onLanded();
    this.remainingJumps = 2;
  }

}
