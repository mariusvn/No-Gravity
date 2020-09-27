import Game from "./main";

export default class Tileset {

  texture;
  tileSize;
  tileTextures = [];

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
      x: Math.floor(this.texture.baseTexture.width / this.tileSize.x),
      y: Math.floor(this.texture.baseTexture.height / this.tileSize.y)
    };

    for(let y = 0; y < dimensions.y; y++) {
      for (let x = 0; x < dimensions.x; x++) {
        const rectangle = new PIXI.Rectangle(
          this.tileSize.x * x,
          this.tileSize.y * y,
          this.tileSize.x,
          this.tileSize.y
        );

        this.texture.frame = rectangle;
        this.tileTextures.push(this.texture.clone());
      }
    }
  }

  getSprite(index) {
    if (index > this.tileTextures.length) {
      throw new TypeError(`Cannot find ${index}th element in the tileset, maximum: ${this.tileTextures.length}`);
    }
      return new PIXI.Sprite(this.tileTextures[index]);
  }
}
