import Tileset from "root/Tileset";
import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
import * as Collision from "root/Collision";
import Game from "root/main";

export default class Tilemap {

  static TilesetType = {
    EARTH: 'earth',
    MOON: 'moon'
  };

  container = new PIXI.Container();
  containers = {
    earth: new PIXI.Container(),
    moon: new PIXI.Container()
  };
  tilesets = {
    earth: new Tileset(earthTileset, {x: 32, y: 32}),
    moon: new Tileset(moonTileset, {x: 32, y: 32})
  };
  currentTileset = Tilemap.TilesetType.EARTH;
  tilemap = [];
  spriteList = {
    earth: [],
    moon: []
  };
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
    //this.dumpTilemap();
    this.generateTilemapContent();
    Game.events.addEventHandler('gameplay:gravity-switch', this.switchTileset.bind(this));
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
        const sprite = this.spriteList[this.currentTileset][y][x];
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

  switchTileset(isOn) {
    this.container.removeChildren();
    if (isOn)
      this.currentTileset = Tilemap.TilesetType.EARTH;
    else
      this.currentTileset = Tilemap.TilesetType.MOON;
    this.container.addChild(this.containers[this.currentTileset]);
  }

  generateTilemapContent() {
    for (let tilesetType of Object.keys(Tilemap.TilesetType)) {
      tilesetType = Tilemap.TilesetType[tilesetType];
      for (let y = 0; y < this.height; y++) {
        this.spriteList[tilesetType][y] = [];
        for (let x = 0; x < this.width; x++) {
          if (this.tilemap[y][x] !== -1) {
            const tile = this.tilesets[tilesetType].getSprite(this.tilemap[y][x]);
            tile.x = this.tileRenderSize * x;
            tile.y = this.tileRenderSize * y;
            tile.width = this.tileRenderSize;
            tile.height = this.tileRenderSize;
            this.containers[tilesetType].addChild(tile);
            this.spriteList[tilesetType][y].push(tile);
          } else {
            this.spriteList[tilesetType][y].push(undefined);
          }
        }
      }
    }
    this.container.addChild(this.containers[this.currentTileset]);
  }

}
