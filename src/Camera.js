import Game from "root/main";

export default class Camera {

  container = new PIXI.Container();
  sceneContainer;
  followedContainer;
  maxPadding = 50;
  screenSize = {x: Game.app.renderer.width, y: Game.app.renderer.height};


  /**
   * @param {PIXI.Container} followedContainer
   * @param {PIXI.Container} sceneContainer
   */
  constructor(followedContainer, sceneContainer) {
    this.container.addChild(sceneContainer);
    this.sceneContainer = sceneContainer;
    this.followedContainer = followedContainer;
    this.sceneContainer.x = 100;
  }

  getRelativePosition(a, b) {
    const bounds = {
      a: a.getBounds(),
      b: b.getBounds()
    };
    return {
      x: bounds.b.x - bounds.a.x,
      y: bounds.b.y - bounds.a.y
    }
  }

  update() {
    const sceneWidth = this.sceneContainer.width;
    let targetPos = Math.round((-1 * this.followedContainer.x) + this.screenSize.x / 2);
    if (targetPos > 0)
      targetPos = (this.followedContainer.x < 0) ? -1 * this.followedContainer.x : 0;
    if (targetPos < -1 * sceneWidth + this.screenSize.x)
      targetPos = -1 * sceneWidth + this.screenSize.x;
    this.sceneContainer.x = targetPos;
  }

}
