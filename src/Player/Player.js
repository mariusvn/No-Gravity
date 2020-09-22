import Entity from "root/Player/Entity";
import prototypePlayer from 'assets/player/prototype.png';
import Game from "root/main";

export default class Player extends Entity {

  playerSprite;

  constructor(tilemap) {
    super(tilemap);
    this.playerSprite = new PIXI.Sprite(Game.app.loader.resources[prototypePlayer].texture);
    this.container.y = 100;
    this.container.addChild(this.playerSprite);
  }

}
