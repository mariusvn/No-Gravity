import Tileset from "root/Tileset";
import prototypeTileset from 'assets/tilesets/prototype.png';

export default class Tilemap {

  container = new PIXI.Container();
  tileset = new Tileset(prototypeTileset, {x: 32, y: 32});
  tilemap = [];
  spriteList = [];
  width = 0;
  height = 0;
  tileRenderSize = 0;

  /**
   * @param {MapEntry} map
   * @param {number} heightpx
   */
  constructor(map, heightpx) {
    const lines = map.tileMap.split('\n');
    for (let x = 0; x < lines.length; x++) {
      const line = lines[x];
      const cells = line.split(',').map((item) => {
        return Number(item);
      });
      if (cells.length === 0 || (cells.length === 1 && cells[0] === 0))
        continue;
      this.tilemap.push(cells);
    }
    this.width = this.tilemap[0].length;
    this.height = this.tilemap.length - 1;
    this.tileRenderSize = Math.round(heightpx / this.height);
    this.dumpTilemap();
    this.generateTilemapContent();
  }

  dumpTilemap() {
    console.group('Tilemap');
    console.info('Map:')
    console.table(this.tilemap);
    console.info('width:', this.width, 'height:', this.height);
    console.groupEnd();
  }

  /**
   * TODO OPTIMIZE PLZZZ
   * @param {PIXI.Rectangle} colliderBox
   */
  isColliding(colliderBox) {
    for (const sprite of this.spriteList) {
      const boundingBox = sprite.getBounds();
      if (
        colliderBox.x + colliderBox.width > boundingBox.x &&
        colliderBox.x < boundingBox.x + boundingBox.width &&
        colliderBox.y + colliderBox.height > boundingBox.y &&
        colliderBox.y < boundingBox.y + boundingBox.height
      ) {
        return true;
      }
    }
    return false
  }

  generateTilemapContent() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.tilemap[y][x] !== -1) {
          const tile = this.tileset.getSprite(0);
          tile.x = this.tileRenderSize * x;
          tile.y = this.tileRenderSize * y;
          tile.width = this.tileRenderSize;
          tile.height = this.tileRenderSize;
          this.container.addChild(tile);
          this.spriteList.push(tile);
        }
      }
    }
  }

}
