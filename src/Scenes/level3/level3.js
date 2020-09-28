import GameScene from "root/Scenes/GameScene";
import MapRegistry from "root/MapRegistry";

export default class Level3 extends GameScene {

  constructor() {
    super(MapRegistry.level3, 'credits');
  }
}
