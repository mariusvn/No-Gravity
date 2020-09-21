import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";

export default class GameScene extends Scene {


  /**
   * @param {MapEntry} map
   */
  constructor(map) {
    super();
    const tilemap = new Tilemap(map, Game.app.screen.height);
    this.sceneContainer.addChild(tilemap.container);
  }
}

