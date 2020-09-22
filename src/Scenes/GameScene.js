import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";
import Player from "root/Player/Player";
import keyboard from "root/Keyboard";

export default class GameScene extends Scene {

  player;
  tilemap;
  keysHandlers = {
    gravitySwitch: null
  };

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
    Game.gameplayState.isGravityEnabled = true;
    super.onSceneStart();
    this.player.startKeyboardListening();
    this.keysHandlers.gravitySwitch = keyboard(' ');
    this.keysHandlers.gravitySwitch.press = this.switchGravity.bind(this);
  }

  onSceneEnd() {
    super.onSceneEnd();
    this.player.stopKeyboardListening();
    this.keysHandlers.gravitySwitch.unsubscribe();
  }

  switchGravity() {
    console.log('Gravity switch');
    Game.gameplayState.isGravityEnabled = !Game.gameplayState.isGravityEnabled;
  }
}

