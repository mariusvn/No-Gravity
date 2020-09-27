import GameScene from "root/Scenes/GameScene";
import MapRegistry from "root/MapRegistry";

export default class Level0 extends GameScene {

  constructor() {
    super(MapRegistry.level0, 'level1');
  }
}
