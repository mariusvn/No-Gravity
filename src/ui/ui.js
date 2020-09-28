import Game from "root/main";

export default class UserInterface {
  container = new PIXI.Container();
  screenSize = {x: Game.app.renderer.width, y: Game.app.renderer.height};

  constructor() {}

  update(delta) {}

  unload() {}
}
