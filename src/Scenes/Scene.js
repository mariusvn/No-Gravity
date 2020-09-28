import sound from "root/sound";
import music from "assets/audio/jam.mp3"
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
