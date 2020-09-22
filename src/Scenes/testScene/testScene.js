import GameScene from "../GameScene";
import MapRegistry from "../../MapRegistry";

export default class testScene extends GameScene {

  constructor() {
    super(MapRegistry.test);
  }


  update(delta) {
    super.update(delta);
  }

}
