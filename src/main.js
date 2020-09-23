import * as PIXI from 'pixi.js';
import SceneManager from "./Scenes/SceneManager";
import testScene from "./Scenes/testScene/testScene";
import Loader from "./Loader";
import MainMenu from "./Scenes/MainMenu/mainMenu";


global.PIXI = PIXI;

export default class Game {

  static app;
  static sceneManager;
  static gameplayState = {
    isGravityEnabled: true,
    gravityForce: 2
  }

  constructor() {
    Game.app = new PIXI.Application({antialias: true, autoDensity: true, height: window.innerHeight, width: window.innerWidth, backgroundColor: 0x45473E});
    document.body.appendChild(Game.app.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    //TODO remove frame dependency

    const mainContainer = new PIXI.Container();
    Game.sceneManager = new SceneManager(mainContainer);
    Game.app.stage.addChild(mainContainer);
    console.info("Loading assets ...");
    Loader(Game.app.loader, () => {
      console.info("Assets loaded !");
      Game.app.ticker.add(delta => this.update(delta));
      Game.sceneManager.addScene(new MainMenu(), 'MainMenu');
      Game.sceneManager.activeScene = 'MainMenu';
    });

  }

  update(delta) {
    if (Game.sceneManager.activeScene) {
      Game.sceneManager.getScene(Game.sceneManager.activeScene).update(delta);
    }
  }
}
