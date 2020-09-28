import GameScene from "root/Scenes/GameScene";
import MapRegistry from "root/MapRegistry";

export default class Level2 extends GameScene {

  constructor() {
    super(MapRegistry.level2, 'level3');
  }
}
