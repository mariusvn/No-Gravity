import Entity from "root/Player/Entity";
import Game from "root/main";
import * as Collision from "root/Collision";
import sawAnimImg from 'assets/tilesets/buzzsaw.png';
import Animation from "root/Animation";

export default class Mob extends Entity {
  sprite;
  reverse = false;
  speed = 5;
  _canHitPlayer = true;
  _animation;

  constructor(tilemap, x, y, speeeeed = 1.0) {
    super(tilemap);
    this._animation = new Animation(sawAnimImg, {x: 18, y: 18}, {
      'anim': {
        animated: true,
        from: 0,
        to: 2,
        loop: true
      }
    }, 'anim', 50);
    this.sprite = this._animation.sprite;
    this.sprite.height = tilemap.tileRenderSize;
    this.sprite.width = tilemap.tileRenderSize;
    this.container.y = y * tilemap.tileRenderSize;
    this.container.x = x * tilemap.tileRenderSize;
    this.container.addChild(this.sprite);
    this._animation.start();
    this.speed = speeeeed;
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
    const userPos = this.getPosition();
    const frontPositionX = (this.reverse) ? userPos.x + this.sprite.width - 1 : userPos.x + 1;
    const footPositionY = userPos.y + this.sprite.height;
    const tilePos = this.tilemap.getTileCoord({x: frontPositionX, y: footPositionY - 1}); /* -1 to avoid between tile confusion */

    if (this.tilemap.getTile({x: tilePos.x, y: tilePos.y + 1}) === -1) {
      // If tile under the player is air DO NOTHING
      return;
    } else if (this.tilemap.getTile({x: tilePos.x + ((this.reverse) ? -1 : 1), y: tilePos.y + 1}) === -1) {
      // If tile in front and under the saw is air
      this.reverse = !this.reverse;
    } else if (this.tilemap.getTile({x: tilePos.x + ((this.reverse) ? -1 : 1), y: tilePos.y}) !== -1) {
      // If tile in front is filled
      this.reverse = !this.reverse;
    }

    this.setVelocity({x: this.speed * ((this.reverse) ? -1 : 1) * this.tilemap.tileRenderSize * 0.03, y: this.getVelocity().y});
  }

  update(delta, player) {
    super.update(delta);
    if (this.isTouching(player) && this._canHitPlayer) {
      Game.events.triggerEvent('gameplay:death');
      this._canHitPlayer = false;
    }
    this.move();
  }

  unload() {
    this._animation.stop();
  }
}
