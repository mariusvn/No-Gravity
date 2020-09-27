import Tileset from "root/Tileset";
import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
import * as Collision from "root/Collision";
import Game from "root/main";

export default class StaticTilemap {
  container = new PIXI.Container();
  tilemap = [];
  tileset;
  spriteList = [];
  width = 0;
  height = 0;
  tileRenderSize = 0;

  /**
   * @param {MapEntry.backTileMap} map
   * @param {number} heightpx
   * @param {string} resourcePath
   */
  constructor(map, heightpx, resourcePath) {
    this.tileset = new Tileset(resourcePath, {x: 32, y: 32});
    const lines = map.split('\n');
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
    const colliderTilePos = this.getTileCoord(colliderBox);
    for (let y = colliderTilePos.y - 4; y < colliderTilePos.y + 5; y++) {
      for (let x = colliderTilePos.x - 3; x < colliderTilePos.x + 5; x++) {
        if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1)
          continue;
        const sprite = this.spriteList[y][x];
        if (sprite) {
          if (sprite.x > colliderBox.x + 200 || sprite.x < colliderBox.x - 200)
            continue;
          if (sprite.y > colliderBox.y + 200 || sprite.y < colliderBox.y - 200)
            continue;
          const boundingBox = new PIXI.Rectangle(sprite.x, sprite.y, sprite.width, sprite.height);
          if (Collision.hitTestRectangle(colliderBox, boundingBox)) {
            return boundingBox;
          }
        }
      }
    }
  }

  /**
   * Convert a pixel position to a tile position
   * @param {number} x
   * @param {number} y
   * @return {{x: number, y: number}}
   */
  getTileCoord({x, y}) {
    return {
      x: Math.floor(x / this.tileRenderSize),
      y: Math.floor(y / this.tileRenderSize)
    };
  }

  /**
   * @param {number} x
   * @param {number} y
   * @return {{x: number, y: number}}
   */
  getPixelsFromTileCoord({x, y}) {
    return {
      x: x * this.tileRenderSize,
      y: y * this.tileRenderSize
    }
  }

  /**
   * Retrieve a tile ID from a tile position
   * @param {number} x
   * @param {number} y
   * @return {number}
   */
  getTile({x, y}) {
    if(x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0){
      return undefined;
    }
    return this.tilemap[y][x];
  }

  generateTilemapContent() {
    for (let y = 0; y < this.height; y++) {
      this.spriteList[y] = [];
      for (let x = 0; x < this.width; x++) {
        if (this.tilemap[y][x] !== -1) {
          const tile = this.tileset.getSprite(this.tilemap[y][x]);
          tile.x = this.tileRenderSize * x;
          tile.y = this.tileRenderSize * y;
          tile.width = this.tileRenderSize;
          tile.height = this.tileRenderSize;
          this.container.addChild(tile);
          this.spriteList[y].push(tile);
        } else {
          this.spriteList[y].push(undefined);
        }
      }
    }
  }

}
