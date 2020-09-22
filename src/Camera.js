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
    setInterval(() => {
      console.group('');
      console.log(this.screenSize)
      console.log(Math.round((-1 * this.followedContainer.x) + this.screenSize.x / 2));
      console.groupEnd();
    }, 500);
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
    this.sceneContainer.x = Math.round((-1 * this.followedContainer.x) + this.screenSize.x / 2);
  }

}
