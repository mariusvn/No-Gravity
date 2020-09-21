import Game from "./main";

export default class Tileset {

  texture;
  tileSize;
  tileSprites = [];

  /**
   * @param {string} image
   * @param {{x: number, y: number}} tileSize
   */
  constructor(image, tileSize) {
    this.texture = Game.app.loader.resources[image].texture;
    this.tileSize = tileSize;
    this.generateTileSpriteArray();
  }

  generateTileSpriteArray() {
    const dimensions = {
      x: this.texture.width / this.tileSize.x,
      y: this.texture.height / this.tileSize.y
    };

    for(let y = 0; y < dimensions.y; y++) {
      for (let x = 0; x < dimensions.x; x++) {
        console.log(`adding ${x} ${y} as ${this.tileSprites.length}`)
        const rectangle = new PIXI.Rectangle(
          this.tileSize.x * x,
          this.tileSize.y * y,
          this.tileSize.x,
          this.tileSize.y
        );
        console.log(rectangle);
        this.texture.frame = rectangle;
        this.tileSprites.push(new PIXI.Sprite(this.texture.clone()));
      }
    }
  }

  getSprite(index) {
    if (index > this.tileSprites.length) {
      throw new TypeError(`Cannot find ${index}th element in the tileset, maximum: ${this.tileSprites.length}`);
    }
      return this.tileSprites[index];
  }
}
