import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";
import Player from "root/Player/Player";
import keyboard from "root/Keyboard";
import Camera from "root/Camera";
import UserInterface from "root/ui/ui";
import Trigger from "root/Trigger";

export default class GameScene extends Scene {

  player;
  tilemap;
  keysHandlers = {
    gravitySwitch: null
  };
  cameraHandledContainer = new PIXI.Container();
  camera;
  userInterface;
  endTrigger;

  /**
   * @param {MapEntry} map
   */
  constructor(map) {
    super();
    this.tilemap = new Tilemap(map, Game.app.screen.height);
    this.player = new Player(this.tilemap);
    window.player = this.player;
    window.tilemap = this.tilemap;

    if (map.dynamicObjectsMap && map.dynamicObjectsMap.endTrigger) {
      const triggerPos = this.tilemap.getPixelsFromTileCoord(map.dynamicObjectsMap.endTrigger);
      this.endTrigger = new Trigger(
        new PIXI.Rectangle(
          triggerPos.x,
          triggerPos.y,
          map.dynamicObjectsMap.endTrigger.width * this.tilemap.tileRenderSize,
          map.dynamicObjectsMap.endTrigger.height * this.tilemap.tileRenderSize
        ),
        this.player.container
      );
      this.endTrigger.onCollide = this.onPlayerReachEnd.bind(this);
    }

    window.endTrigger = this.endTrigger;
    this.userInterface = new UserInterface();
    this.cameraHandledContainer.addChild(this.tilemap.container);
    this.cameraHandledContainer.addChild(this.player.container);
    this.camera = new Camera(this.player.container, this.cameraHandledContainer);
    this.userInterface.assignToContainer(this.camera.container);
    this.sceneContainer.addChild(this.camera.container);
  }

  update(delta) {
    super.update(delta);
    this.player.update(delta);
    this.camera.update();
    this.userInterface.update();
    this.endTrigger.update();
  }

  onSceneStart() {
    Game.gameplayState.isGravityEnabled = true;
    super.onSceneStart();
    this.player.startKeyboardListening();
    this.keysHandlers.gravitySwitch = keyboard('e');
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
    this.userInterface.setGravityState(Game.gameplayState.isGravityEnabled);
  }

  onPlayerReachEnd() {
    console.info('Player reached end'); 
  }
}

