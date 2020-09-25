import Game from "root/main";
import laserimg from 'assets/player/Player1-old.png';
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
    x = x * tilemap.tileRenderSize;
    y = y * tilemap.tileRenderSize;
    for (let i = 0; i <= length - 1; i++) {

      this.sprite.push(new PIXI.Sprite(Game.app.loader.resources[laserimg].texture));
      this.sprite[i].width = tilemap.tileRenderSize;
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
