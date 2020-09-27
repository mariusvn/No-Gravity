import Scene from "./Scene";
import Tilemap from "root/Tilemap";
import Game from "root/main";
import Player from "root/Player/Player";
import Mob from "root/Player/Mob";
import keyboard from "root/Keyboard";
import Camera from "root/Camera";
import Trigger from "root/Trigger";
import Laser from "root/Laser";
import Collectable from "root/Collectable";
import UserInterfaceHandler from "root/ui/UserInterfaceHandler";
import StaticTilemap from "root/StaticTilemap";
import backTilesetImg from 'assets/tilesets/misc.png';

export default class GameScene extends Scene {

  player;
  tilemap;
  backTileMap;
  keysHandlers = {
    gravitySwitch: null
  };
  cameraHandledContainer = new PIXI.Container();
  camera;
  userInterface;
  endTrigger;
  lasers = [];
  mobs = [];
  collectables = [];

  /**
   * @param {MapEntry} map
   */
  constructor(map) {
    super();
    this.tilemap = new Tilemap(map, Game.app.screen.height);
    this.backTileMap = new StaticTilemap(map.backTileMap, Game.app.screen.height, backTilesetImg);
    this.player = new Player(this.tilemap, map.dynamicObjectsMap.start.x, map.dynamicObjectsMap.start.y);
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
    for (const laserData of map.dynamicObjectsMap.laserHitReg) {
      const laser = new Laser(this.player, this.tilemap, laserData)
      this.lasers.push(laser);
      this.cameraHandledContainer.addChild(laser.container);
    }
    for (const ennemy of map.dynamicObjectsMap.ennemies) {
      const mob = new Mob(this.tilemap, ennemy.x, ennemy.y);
      this.mobs.push(mob);
      this.cameraHandledContainer.addChild(mob.container);
    }
    for (const collectableData of map.dynamicObjectsMap.collectables) {
      const collectable = new Collectable(
        this.player,
        collectableData.x,
        collectableData.y,
        this.tilemap.tileRenderSize);
      this.collectables.push(collectable);
      this.cameraHandledContainer.addChild(collectable.container);
    }
    this.userInterface = new UserInterfaceHandler();
    this.cameraHandledContainer.addChild(this.backTileMap.container);
    this.cameraHandledContainer.addChild(this.tilemap.container);
    this.cameraHandledContainer.addChild(this.player.container);
    this.camera = new Camera(this.player.container, this.cameraHandledContainer);
    this.userInterface.assignToContainer(this.camera.container);
    this.sceneContainer.addChild(this.camera.container);
  }

  update(delta) {
    super.update(delta);
    this.userInterface.update(delta);
    if (Game.gameplayState.paused)
      return;
    this.player.update(delta);
    this.camera.update();
    this.updateLasers();
    this.updateMobs(delta);
    this.updateCollectable();
    this.userInterface.update(delta);
    this.endTrigger.update();
  }

  updateLasers() {
    for (const laser of this.lasers) {
      laser.update();
    }
  }

  updateMobs(delta) {
    for (const mob of this.mobs) {
      mob.update(delta, this.player);
    }
  }

  updateCollectable() {
    for (const collectable of this.collectables) {
      collectable.update();
    }
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
    this.lasers.forEach(item => item.onSceneEnd());
  }

  switchGravity() {
    console.log('Gravity switch');
    Game.gameplayState.isGravityEnabled = !Game.gameplayState.isGravityEnabled;
    Game.events.triggerEvent('gameplay:gravity-switch', Game.gameplayState.isGravityEnabled);
  }

  onPlayerReachEnd() {
    console.info('Player reached end');
    for (const collectable of this.collectables) {
      if (!collectable.isPick())
        return;
    }
    Game.events.triggerEvent('scene:restart');
  }
}

