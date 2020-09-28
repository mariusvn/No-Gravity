import * as PIXI from 'pixi.js';
import SceneManager from "./Scenes/SceneManager";
import Loader from "./Loader";
import MainMenu from "./Scenes/MainMenu/mainMenu";
import Event from "root/Event";
import Tileset from "root/Tileset";
import earthTileset from "assets/tilesets/earth.png";
import moonTileset from "assets/tilesets/moon.png";
import Tilemap from "root/Tilemap";
import Level1 from "root/Scenes/level1/level1";
import HowToPlayScene from "root/Scenes/howToPlay/howToPlayScene";
import creditScene from "root/Scenes/credits/creditScene";
import levelsScene from "root/Scenes/levels/levelsScene";
import Level0 from "root/Scenes/level0/level0";
import Level2 from "root/Scenes/level2/level2";


global.PIXI = PIXI;

export default class Game {

  static app;
  static sceneManager;
  static events = new Event();
  static gameplayState = {
    isGravityEnabled: true,
    gravityForce: 2,
    paused: false,
  }

  constructor() {
    Game.app = new PIXI.Application({antialias: true, autoDensity: true, height: window.innerHeight, width: window.innerWidth, backgroundColor: 0x45473E});
    document.body.appendChild(Game.app.view);
    if (Game.app.renderer.height > 500)
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const mainContainer = new PIXI.Container();
    Game.sceneManager = new SceneManager(mainContainer);
    Game.app.stage.addChild(mainContainer);
    Loader(Game.app.loader, () => {
      Tilemap.tilesets = {
        earth: new Tileset(earthTileset, {x: 32, y: 32}),
        moon: new Tileset(moonTileset, {x: 32, y: 32})
      };
      Game.app.ticker.add(delta => this.update(delta));
      Game.sceneManager.addScene(MainMenu, 'MainMenu');
      Game.sceneManager.addScene(HowToPlayScene, 'HowToPlay');
      Game.sceneManager.addScene(creditScene, 'credits');
      Game.sceneManager.addScene(levelsScene, 'levels');
      Game.sceneManager.addScene(Level1, 'level1');
      Game.sceneManager.addScene(Level0, 'level0');
      Game.sceneManager.addScene(Level2, 'level2');
      Game.sceneManager.activeScene = 'MainMenu';
    });
  }

  update(delta) {
    if (Game.sceneManager.activeScene) {
      Game.sceneManager.getScene(Game.sceneManager.activeScene).update(delta);
    }
  }
}
