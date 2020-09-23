import Game from "root/main";

export default class Camera {

  container = new PIXI.Container();
  sceneContainer;
  sceneContainerWidth;
  followedContainer;
  screenSize = {x: Game.app.renderer.width, y: Game.app.renderer.height};


  /**
   * @param {PIXI.Container} followedContainer
   * @param {PIXI.Container} sceneContainer
   */
  constructor(followedContainer, sceneContainer) {
    this.container.addChild(sceneContainer);
    this.sceneContainer = sceneContainer;
    this.sceneContainerWidth = this.sceneContainer.width;
    this.followedContainer = followedContainer;
  }

  update() {
    const followedContainerX = this.followedContainer.x;
    let targetPos = Math.round((-1 * followedContainerX) + this.screenSize.x / 2);
    if (targetPos > 0)
      targetPos = (followedContainerX < 0) ? -1 * followedContainerX : 0;
    if (targetPos < -1 * this.sceneContainerWidth + this.screenSize.x)
      targetPos = -1 * this.sceneContainerWidth + this.screenSize.x;
    this.sceneContainer.x = targetPos;
  }

}
