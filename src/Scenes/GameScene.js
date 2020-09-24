import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";
import Player from "root/Player/Player";
import Mob from "root/Player/Mob";
import keyboard from "root/Keyboard";
import Camera from "root/Camera";
import Trigger from "root/Trigger";
import UserInterfaceHandler from "root/ui/UserInterfaceHandler";

export default class GameScene extends Scene {

  player;
  mob;
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
    this.mob = new Mob(this.tilemap, 1200, 100);
    this.mob2 = new Mob(this.tilemap, 100, 100);
    this.userInterface = new UserInterfaceHandler();
    this.cameraHandledContainer.addChild(this.tilemap.container);
    this.cameraHandledContainer.addChild(this.player.container);
    this.cameraHandledContainer.addChild(this.mob.container);
    this.cameraHandledContainer.addChild(this.mob2.container);
    this.camera = new Camera(this.player.container, this.cameraHandledContainer);
    this.userInterface.assignToContainer(this.camera.container);
    this.sceneContainer.addChild(this.camera.container);
  }

  update(delta) {
    super.update(delta);
    this.player.update(delta);
    this.mob.update(delta, this.player);
    this.mob2.update(delta, this.player);
    this.camera.update();
    this.userInterface.update(delta);
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
    Game.events.triggerEvent('gameplay:gravity-switch', Game.gameplayState.isGravityEnabled);
  }

  onPlayerReachEnd() {
    console.info('Player reached end'); 
  }
}

