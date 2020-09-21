import * as PIXI from 'pixi.js';
import SceneManager from "./Scenes/SceneManager";
import testScene from "./Scenes/testScene/testScene";
import Loader from "./Loader";

global.PIXI = PIXI;

export default class Game {

  static app;
  static sceneManager;

  constructor() {
    Game.app = new PIXI.Application({antialias: true, height: window.innerHeight, width: window.innerWidth});
    document.body.appendChild(Game.app.view);

    const mainContainer = new PIXI.Container();
    Game.sceneManager = new SceneManager(mainContainer);
    Game.app.stage.addChild(mainContainer);

    Loader(Game.app.loader, () => {
      Game.app.ticker.add(delta => this.update(delta));

      Game.sceneManager.addScene(new testScene(), 'test');
      Game.sceneManager.activeScene = 'test';
    });

  }

  update(delta) {
    if (Game.sceneManager.activeScene) {
      Game.sceneManager.getScene(Game.sceneManager.activeScene);
    }
  }
}
