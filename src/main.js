import * as PIXI from 'pixi.js';
import SceneManager from "./Scenes/SceneManager";
import testScene from "./Scenes/testScene/testScene";
import Loader from "./Loader";
import MainMenu from "./Scenes/MainMenu/mainMenu";
import Event from "root/Event";


global.PIXI = PIXI;

export default class Game {

  static app;
  static sceneManager;
  static events = new Event();
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
    Loader(Game.app.loader, () => {
      Game.app.ticker.add(delta => this.update(delta));
      Game.sceneManager.addScene(new testScene(), 'testScene');
      Game.sceneManager.addScene(new MainMenu(), 'MainMenu');
      Game.sceneManager.activeScene = 'testScene';
    });

  }

  update(delta) {
    if (Game.sceneManager.activeScene) {
      Game.sceneManager.getScene(Game.sceneManager.activeScene).update(delta);
    }
  }
}
