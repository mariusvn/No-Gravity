import Game from "root/main";
import laserimg from 'assets/tilesets/laser.png';
import laserShooterImg from 'assets/tilesets/laser-shooter.png';
import Trigger from "root/Trigger";

export default class Laser {
  container = new PIXI.Container();
  sprite = [];
  _canHitPlayer = true;
  _active = true;
  _intervalId;
  _laserlength;
  delay;

  constructor(player, tilemap, {x, y, length, delay, direction}) {
    if (direction === 'top') y++;
    if (direction === 'left') x++;
    x = x * tilemap.tileRenderSize;
    y = y * tilemap.tileRenderSize;
    const blockSize = tilemap.tileRenderSize;
    const pixelSize = tilemap.tileRenderSize / 32;


    const laserShooter = new PIXI.Sprite(Game.app.loader.resources[laserShooterImg].texture)

    laserShooter.width = blockSize;
    laserShooter.height = pixelSize * 7;
    laserShooter.x = x;
    laserShooter.y = y;
    laserShooter.anchor.set(0.5, 1);

    switch (direction) {
      case 'left':
        y += pixelSize * 2;
      case 'right':
        y += blockSize / 2 - pixelSize;
        laserShooter.y += blockSize / 2;
        break;
      case 'top':
      case 'bottom':
        x += blockSize / 2 - pixelSize;
        laserShooter.x += blockSize / 2;
        break;
    }

    switch (direction) {
      case 'left':
        laserShooter.angle = -90;
        break;
      case 'right':
        laserShooter.angle = 90;
        break;
      case 'bottom':
        laserShooter.angle = 180;
        break;
    }


    for (let i = 0; i <= length - 1; i++) {

      this.sprite.push(new PIXI.Sprite(Game.app.loader.resources[laserimg].texture));
      this.sprite[i].width = pixelSize * 2;
      this.sprite[i].height = tilemap.tileRenderSize;
      if (direction === "top") {
        this.sprite[i].y = y - this.sprite[i].height * (i + 1);
        this.sprite[i].x = x
      } else if (direction === "bottom") {
        this.sprite[i].y = y + this.sprite[i].height * i;
        this.sprite[i].x = x
      } else if (direction === "left") {
        this.sprite[i].angle = -90;
        this.sprite[i].y = y
        this.sprite[i].x = x - this.sprite[i].height * (i + 1);
      } else {
        this.sprite[i].angle = 90;
        this.sprite[i].y = y
        this.sprite[i].x = x + this.sprite[i].height * (i + 1);
      }

      this._laserlength = this.sprite[i].height;
      this.container.addChild(this.sprite[i]);
    }

    if (direction === "top" || direction === "bottom") {
      this.laserHitReg = new Trigger(
        new PIXI.Rectangle(
          this.sprite[0].x,
          this.sprite[(direction === "bottom") ? 0 : this.sprite.length - 1].y,
          this.sprite[0].width,
          this.sprite[0].height * this.sprite.length
        ),
        player.container
      );
    } else {
      this.laserHitReg = new Trigger(
        new PIXI.Rectangle(
          this.sprite[(direction === "right") ? 0 : this.sprite.length - 1].x - ((direction === "right") ? this.sprite[0].height : 0),
          this.sprite[0].y + ((direction === "right") ? 0 : -1) * this.sprite[0].width,
          this.sprite[0].height * this.sprite.length,
          this.sprite[0].width
        ),
        player.container
      );
    }

    this.container.addChild(laserShooter);

    this.delay = delay;
    this._intervalId = this.startInterval();
    this.laserHitReg.onCollide = this.onHit.bind(this);
  }

  onHit() {
    if (this._canHitPlayer) {
      this._canHitPlayer = false;
      Game.events.triggerEvent('gameplay:death');
    }
  }

  startInterval() {

    return setInterval(() => {
      if (this.delay !== -1)
        this._active = !this._active;

      let alpha = (this._active ? 1 : 0);
      for (let i = 0; i < this.sprite.length; i++) {
        this.sprite[i].alpha = alpha;
      }

    }, this.delay)
  }

  onSceneEnd() {
    clearInterval(this._intervalId);
  }

  update() {
    if (this._active)
      this.laserHitReg.update()
  }

}
