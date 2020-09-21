import Game from "./main";

export default class Tileset {

  texture;
  tileSize;

  /**
   * @param {string} image
   * @param {{x: number, y: number}} tileSize
   */
  constructor(image, tileSize) {
    this.texture = Game.app.loader.resources[image].texture;
    this.tileSize = tileSize;
    console.log(`width: ${this.texture.width}`);
  }

  getSprite(index) {
    const dimensions = {
      x: this.texture.width / this.tileSize.x,
      y: this.texture.height / this.tileSize.y
    };

    if (index > dimensions.x * dimensions.y) {
      throw new TypeError(`Cannot find ${index}th element in the tileset, maximum: ${dimensions.x * dimensions.y}`);
    }

    const location = {x: 0, y: 0};

    for (let i = 0; i < index; i++) {
      location.x++;
      if (location.x >= dimensions.x) {
        location.x = 0;
        location.y++;
      }
    }

    const rectangle = new PIXI.Rectangle(
      this.tileSize.x * location.x,
      this.tileSize.y * location.y,
      this.tileSize.x,
      this.tileSize.y
    );

    this.texture.frame = rectangle;

    const sprite = new PIXI.Sprite(this.texture);

    return sprite;
  }
}
