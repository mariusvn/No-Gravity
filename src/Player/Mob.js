import Entity from "root/Player/Entity";
import Game from "root/main";
import player from 'assets/player/Player1.png';
import * as Collision from "root/Collision";

export default class Mob extends Entity {
  sprite;
  tilemap;
  reverse = false;
  speed = 5;

  constructor(tilemap, x, y) {
    super(tilemap);
    this.sprite = new PIXI.Sprite(Game.app.loader.resources[player].texture);
    const resizeRatio = (tilemap.tileRenderSize * 2) / (this.sprite.height);
    this.sprite.scale.set(resizeRatio);
    this.container.y = y;
    this.container.x = x;
    this.container.addChild(this.sprite);
    this.tilemap = tilemap;
    this.setVelocity({x: 8, y: this.getVelocity().y});
  }

  isTouching(player) {
    let playerPosition = player.getPosition();
    let mobPosition = this.getPosition();
    let playerBox = new PIXI.Rectangle(playerPosition.x, playerPosition.y, player.playerSprite.width, player.playerSprite.height);
    let mobBox = new PIXI.Rectangle(mobPosition.x, mobPosition.y, this.sprite.width, this.sprite.height);
    return !!Collision.hitTestRectangle(playerBox, mobBox);

  }

  move() {
    const userPos = Object.assign({}, this.getPosition());
    const frontPositionX = (this.reverse) ? userPos.x + this.sprite.width : userPos.x;
    const footPositionY = userPos.y + this.sprite.height;
    const tilePos = this.tilemap.getTileCoord({x: frontPositionX, y: footPositionY - 1}); /* -1 to avoid between tile confusion */

    if (this.tilemap.getTile({x: tilePos.x, y: tilePos.y + 1}) === -1) {
      // If tile under the player is air
      this.reverse = !this.reverse;
    } else if (this.tilemap.getTile({x: tilePos.x + ((this.reverse) ? -1 : 1), y: tilePos.y + 1}) === -1) {
      // If tile in front and under the player is air
      this.reverse = !this.reverse;
    } else if (this.tilemap.getTile({x: tilePos.x + ((this.reverse) ? -1 : 1), y: tilePos.y}) !== -1) {
      // If tile in front of knees is filled
      this.reverse = !this.reverse;
    } else if (this.tilemap.getTile({x: tilePos.x + ((this.reverse) ? -1 : 1), y: tilePos.y -1}) !== -1) {
      // If tile in front of head is filled
      this.reverse = !this.reverse;
    }

    this.setVelocity({x: this.speed * ((this.reverse) ? -1 : 1), y: this.getVelocity().y});
  }

  update(delta, player) {
    super.update(delta);
    if (this.isTouching(player)) {
      //	console.log("hit");
    }
    this.move();
  }


}
