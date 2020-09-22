import Tileset from "root/Tileset";
import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
import * as Collision from "root/Collision";

export default class Tilemap {

  container = new PIXI.Container();
  tileset = new Tileset(earthTileset, {x: 32, y: 32});
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
    this.height = this.tilemap.length;
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
   * @param {PIXI.Rectangle} colliderBox
   * @return {PIXI.Rectangle | undefined}
   */
  isColliding(colliderBox) {
    for (const sprite of this.spriteList) {
      if (sprite.x > colliderBox.x + 200 || sprite.x < colliderBox.x - 200)
        continue;
      if (sprite.y > colliderBox.y + 200 || sprite.y < colliderBox.y - 200)
        continue;
      const boundingBox = new PIXI.Rectangle(sprite.x, sprite.y, sprite.width, sprite.height);
      if (Collision.hitTestRectangle(colliderBox, boundingBox)) {
        return boundingBox;
      }
    }
    return undefined;
  }



  generateTilemapContent() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.tilemap[y][x] !== -1) {
          const tile = this.tileset.getSprite(this.tilemap[y][x]);
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
