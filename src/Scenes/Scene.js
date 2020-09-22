
export default class Scene {

  sceneContainer;

  constructor() {
    this.sceneContainer = new PIXI.Container();
  }

  update(delta) {}

  getContainer() {
    return this.sceneContainer;
  }

  onSceneStart() {}

  onSceneEnd() {}

}
