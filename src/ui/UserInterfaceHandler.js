import GravityIndicator from "root/ui/gravityIndicator";
import DeathScreen from "root/ui/deathScreen";

export default class UserInterfaceHandler {
  container = new PIXI.Container();
  /** @type Array<UserInterface> */
  uis = [
    new GravityIndicator(),
    new DeathScreen()
  ]

  constructor() {
    for (let ui of this.uis) {
      this.container.addChild(ui.container);
    }
  }

  update(delta) {
    for (let ui of this.uis) {
      ui.update(delta);
    }
  }

  assignToContainer(container) {
    container.addChild(this.container);
  }
}
