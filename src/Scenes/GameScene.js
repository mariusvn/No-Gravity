import Scene from "./Scene";

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
  }
}
