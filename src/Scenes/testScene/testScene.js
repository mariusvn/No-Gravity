import GameScene from "../GameScene";

export default class testScene extends GameScene {

  constructor() {
    super('chemincsv', 'cheminjson');
    const graph = new PIXI.Graphics();
    graph.beginFill(0xFFFFFF);
    graph.drawRect(10, 10, 100, 100);
    this.sceneContainer.addChild(graph);
  }


  update(delta) {
    super.update(delta);

  }

}
