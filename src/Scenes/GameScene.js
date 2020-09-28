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
import Animation from "root/Animation";
import flagAnimImg from 'assets/tilesets/flag.png';
import sound from "root/sound";
import music from "assets/audio/jam.mp3";
import earthBg from 'assets/tilesets/bg-earth.png';
import moonBg from 'assets/tilesets/bg-space.png';

let audio = new sound(music, true, false, false);
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
  nextScene = '';
  flagSprite;
  flagAnimation;
  bgSprite;
  bgSpaceSprite;

  static audio;
  static firstLoad = true;
  /**
   * @param {MapEntry} map
   * @param {string} nextScene
   */
  constructor(map, nextScene = 'MainMenu') {
    super();
    this.nextScene = nextScene;

    /* Background */
    this.bgSprite = new PIXI.Sprite(Game.app.loader.resources[earthBg].texture);
    this.bgSprite.height = Game.app.screen.height;
    this.bgSprite.width = Game.app.screen.width;
    this.sceneContainer.addChild(this.bgSprite);
    this.bgSpaceSprite = new PIXI.Sprite(Game.app.loader.resources[moonBg].texture);
    this.bgSpaceSprite.height = Game.app.screen.height;
    this.bgSpaceSprite.width = Game.app.screen.width * 1.8;
    this.bgSpaceSprite.x = -Game.app.screen.width * 1.8 / 3
    this.bgSpaceSprite.alpha = 0;
    this.sceneContainer.addChild(this.bgSpaceSprite);

    this.tilemap = new Tilemap(map, Game.app.screen.height);
    this.backTileMap = new StaticTilemap(map.backTileMap, Game.app.screen.height, backTilesetImg);
    this.player = new Player(this.tilemap, map.dynamicObjectsMap.start.x, map.dynamicObjectsMap.start.y);
    if(GameScene.firstLoad){
      audio = new sound(music, true, false, false);
      GameScene.firstLoad = false;
    }
    audio.play();

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
      this.flagAnimation = new Animation(flagAnimImg, {x: 26, y: 62}, {
        'idle': {
          animated: false,
          tileId: 0
        },
        'reached': {
          animated: true,
          from: 1,
          to: 12,
          loop: false
        }
      }, 'idle', 100);
      this.flagSprite = this.flagAnimation.sprite;
      this.flagSprite.height = this.tilemap.tileRenderSize * 2;
      this.flagSprite.width = this.tilemap.tileRenderSize;
      this.flagSprite.x = triggerPos.x + map.dynamicObjectsMap.endTrigger.width / 2 - this.flagSprite.width / 2;
      this.flagSprite.y = triggerPos.y + map.dynamicObjectsMap.endTrigger.height * this.tilemap.tileRenderSize - this.flagSprite.height;
      this.cameraHandledContainer.addChild(this.flagSprite);
    }

    for (const ennemy of map.dynamicObjectsMap.ennemies) {
      const mob = new Mob(this.tilemap, ennemy.x, ennemy.y, ennemy.speed);
      this.mobs.push(mob);
      this.cameraHandledContainer.addChild(mob.container);
    }
    this.cameraHandledContainer.addChild(this.backTileMap.container);
    for (const laserData of map.dynamicObjectsMap.laserHitReg) {
      const laser = new Laser(this.player, this.tilemap, laserData)
      this.lasers.push(laser);
      this.cameraHandledContainer.addChild(laser.container);
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
    if (this.flagAnimation)
      this.flagAnimation.start();
  }

  onSceneEnd() {
    super.onSceneEnd();
    audio.pause();
    this.player.stopKeyboardListening();
    this.keysHandlers.gravitySwitch.unsubscribe();
    this.lasers.forEach(item => item.onSceneEnd());
    this.mobs.forEach(item => item.unload());
    if (this.flagAnimation)
      this.flagAnimation.stop();
    this.userInterface.unload();
  }

  switchGravity() {
    Game.gameplayState.isGravityEnabled = !Game.gameplayState.isGravityEnabled;
    Game.events.triggerEvent('gameplay:gravity-switch', Game.gameplayState.isGravityEnabled);
    if (Game.gameplayState.isGravityEnabled) {
      this.bgSprite.alpha = 1
      this.bgSpaceSprite.alpha = 0;
    } else {
      this.bgSprite.alpha = 0;
      this.bgSpaceSprite.alpha = 1;
    }
  }

  onPlayerReachEnd() {
    for (const collectable of this.collectables) {
      if (!collectable.isPick()) {
        Game.events.triggerEvent('gui:missing-coins');
        return;
      }
    }
    this.flagAnimation.onAnimationFinished = (animName) => {
      if (animName === 'reached') {
        this.flagAnimation.stop();
        setTimeout(() => {
          Game.sceneManager.activeScene = this.nextScene;
        }, 700);
      }
    }
    this.flagAnimation.setCurrentAnimation('reached');
  }
}

