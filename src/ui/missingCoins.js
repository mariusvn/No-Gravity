import UserInterface from "root/ui/ui";
import Game from "root/main";

export default class MissingCoins extends UserInterface {

  _background = new PIXI.Graphics();
  _textStyle = new PIXI.TextStyle({
    fontFamily: 'Londrina Solid',
    fontSize: 40,
    fill: '0xfff'
  });
  _text = new PIXI.Text(`Missing coins`, this._textStyle);

  constructor() {
    super();
    this._background.beginFill(0xE32E2D);
    this._background.drawPolygon([
      new PIXI.Point(0,0),
      new PIXI.Point(225,25),
      new PIXI.Point(237, 100),
      new PIXI.Point(5, 120),
    ]);
    this._background.endFill();
    this._background.addChild(this._text);
    this._background.x = Game.app.renderer.width / 2 - this._background.width / 2;
    this._background.y = 20;
    this._text.x = this._background.width / 2 - this._text.width / 2;
    this._text.y = 40;
    this.hide();
    this.container.addChild(this._background);
    this.onMissingCoins = this.onMissingCoins.bind(this);
    Game.events.addEventHandler('gui:missing-coins', this.onMissingCoins);
  }

  onMissingCoins() {
    this.display();
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  display() {
    this.container.alpha = 1;
  }

  hide() {
    this.container.alpha = 0;
  }

  unload() {
    super.unload();
    Game.events.removeEventHandler('gui:missing-coins', this.onMissingCoins);
  }

}
