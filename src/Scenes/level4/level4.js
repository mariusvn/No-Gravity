import GameScene from "root/Scenes/GameScene";
import MapRegistry from "root/MapRegistry";

export default class Level4 extends GameScene {

  constructor() {
    super(MapRegistry.level4, 'credits');
  }
}
