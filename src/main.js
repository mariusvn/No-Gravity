import * as PIXI from 'pixi.js';

export default class Game {

  static app;

  constructor() {
    Game.app = new PIXI.Application();
    document.body.appendChild(Game.app.view);
  }
}
