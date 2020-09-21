import Game from "./main";

export default class Tilemap {

  texture;
  tileSize;

  /**
   * @param {string} image
   * @param {{x: number, y: number}} tileSize
   */
  constructor(image, tileSize) {
    this.texture = Game.app.loader.resources[image];
    this.tileSize = tileSize;
  }

  getSprite(index) {

  }
}
