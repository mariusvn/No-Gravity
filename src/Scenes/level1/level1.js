import GameScene from "root/Scenes/GameScene";
import MapRegistry from "root/MapRegistry";

export default class Level1 extends GameScene {

  constructor() {
    super(MapRegistry.level1);
  }
}
