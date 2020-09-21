import Scene from "./Scene";
import tilesetimg from 'assets/tilesets/prototype.png';
import Tileset from "root/Tileset";

export default class GameScene extends Scene {

  tilemap = [];

  /**
   * @param {MapEntry} map
   */
  constructor(map) {
    super();
    const lines = map.tileMap.split('\n');
    for (let x = 0; x < lines.length; x++) {
      const line = lines[x];
      const cells = line.split(',').map((item) => {
        return Number(item);
      });
      this.tilemap.push(cells);
    }
    const tileset = new Tileset(tilesetimg, {x: 32, y: 32});
    console.log(tileset);
    this.sceneContainer.addChild(tileset.getSprite(0));
  }
}

