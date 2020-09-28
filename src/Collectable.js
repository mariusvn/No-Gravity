import Game from "root/main";
import tilecoin from 'assets/tilesets/goldCoin1.png';
import Trigger from "root/Trigger";
import sound from  "root/sound"
import coinSound from "assets/audio/coin.mp3";

export default class Collectable{
  container = new PIXI.Container();
  count = {total: 0, pick: 0,}
  sprite
  _pick = false;
  audio;
  constructor(player, x, y, tileRenderSize) {
    this.sprite =  new PIXI.Sprite(Game.app.loader.resources[tilecoin].texture);
    this.sprite.width = tileRenderSize;
    this.sprite.height = tileRenderSize;
    this.audio = new sound(coinSound, false, true, false, 0.1)
    this.container.x = x * tileRenderSize;
    this.container.y = y * tileRenderSize;
    this.container.addChild(this.sprite);
    this.takeCoin = new Trigger(
      new PIXI.Rectangle(
        this.container.x,
        this.container.y,
        this.sprite.width,
        this.sprite.height
      ),
      player.container
    );
    this.takeCoin.onCollide = this.pickup.bind(this);
  }

  pickup(){
    this.audio.play();
    this._pick = true;
    this.takeCoin.onCollide = undefined;
    this.container.removeChild(this.sprite);
    console.log("pickup");
  }

  isPick(){return this._pick}

  update(){
    this.takeCoin.update()
  }
}
