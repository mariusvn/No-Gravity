import Entity from "root/Player/Entity";
import Game from "root/main";
import player from 'assets/player/Player1.png';
import * as Collision from "root/Collision";

export default class Mob extends Entity {
  Sprite;
  tilemap;
  reverse = false;
  speed = 5;

  constructor(tilemap, x, y) {
    super(tilemap);
    this.Sprite = new PIXI.Sprite(Game.app.loader.resources[player].texture);
    const resizeRatio = (tilemap.tileRenderSize * 2) / (this.Sprite.height);
    const newWidth = this.Sprite.width * resizeRatio;
    this.Sprite.scale.set(resizeRatio);
    this.container.y = y;
    this.container.x = x;
    this.container.addChild(this.Sprite);
    this.tilemap = tilemap;
    this.setVelocity({x: 8, y: this.getVelocity().y});
  }

  isTouching(player) {
    let playerPosition = player.getPosition();
    let mobPosition = this.getPosition();
    let playerBox = new PIXI.Rectangle(playerPosition.x, playerPosition.y, player.playerSprite.width, player.playerSprite.height);
    let mobBox = new PIXI.Rectangle(mobPosition.x, mobPosition.y, this.Sprite.width, this.Sprite.height);
    //console.log(this.getPosition());
    if (Collision.hitTestRectangle(playerBox, mobBox)) {
      return true;
    }
    return false;
  }

  move() {
    let checkPos = this.getPosition();
    checkPos.x = checkPos.x + this.getVelocity().x;
    if (!this.reverse) {
      checkPos.x = checkPos.x + this.getVelocity().x + this.Sprite.width;
    }
    checkPos.y += this.Sprite.height;
    let tilecoord = this.tilemap.getTileCoord(checkPos);
    if ((this.tilemap.getTile(tilecoord) == -1) || this.tilemap.getTile({
      x: tilecoord.x,
      y: tilecoord.y - 1
    }) != -1 || this.tilemap.getTile({x: tilecoord.x, y: tilecoord.y - 2}) != -1) {
      this.reverse = !this.reverse;
    }
    if (this.reverse) {
      this.setVelocity({x: -this.speed, y: this.getVelocity().y});
    } else
      this.setVelocity({x: this.speed, y: this.getVelocity().y});

  }

  update(delta, player) {
    super.update(delta);
    //	this.setVelocity({x: 8,y: this.getVelocity().y});
    if (this.isTouching(player)) {
      //	console.log("hit");
    }

    this.move();
  }


}
