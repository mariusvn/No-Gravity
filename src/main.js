import * as PIXI from 'pixi.js';
import SceneManager from "./Scenes/SceneManager";
import testScene from "./Scenes/testScene/testScene";
import Loader from "./Loader";

global.PIXI = PIXI;

export default class Game {

  static app;
  static sceneManager;
  static gameplayState = {
    isGravityEnabled: true,
    gravityForce: 2
  }

  constructor() {
    Game.app = new PIXI.Application({antialias: true, autoDensity: true, height: window.innerHeight, width: window.innerWidth, backgroundColor: 0xA4347E});
    document.body.appendChild(Game.app.view);
    //PIXI.settings.RENDER_OPTIONS.
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.RENDER_OPTIONS.backgroundColor = 0xA4347E;
    //PIXI.settings.ANISOTROPIC_LEVEL = 16;

    const mainContainer = new PIXI.Container();
    Game.sceneManager = new SceneManager(mainContainer);
    Game.app.stage.addChild(mainContainer);
    console.info("Loading assets ...");
    Loader(Game.app.loader, () => {
      console.info("Assets loaded !");
      Game.app.ticker.add(delta => this.update(delta));

      Game.sceneManager.addScene(new testScene(), 'test');
      Game.sceneManager.activeScene = 'test';
    });

  }

  update(delta) {
    if (Game.sceneManager.activeScene) {
      Game.sceneManager.getScene(Game.sceneManager.activeScene).update(delta);
    }
  }
}
