import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";
import Player from "root/Player/Player";

export default class GameScene extends Scene {

  player;
  tilemap;

  /**
   * @param {MapEntry} map
   */
  constructor(map) {
    super();
    this.tilemap = new Tilemap(map, Game.app.screen.height);
    this.player = new Player(this.tilemap);
    this.sceneContainer.addChild(this.tilemap.container);
    this.sceneContainer.addChild(this.player.container);
  }

  update(delta) {
    super.update(delta);
    this.player.update(delta);
  }

  onSceneStart() {
    super.onSceneStart();
    this.player.startKeyboardListening();
  }

  onSceneEnd() {
    super.onSceneEnd();
    this.player.stopKeyboardListening();
  }
}

