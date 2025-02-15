import Scene from "root/Scenes/Scene";
import Game from "root/main";
import Button from "root/ui/Button";
import earthBg2 from "assets/tilesets/bg-earth-2.png";

export default class CreditScene extends Scene {
  _textContent = `NO GRAVITY - To the space
  
  Code:
  Marius "Astroboy" Van Nieuwenhuyse
  Jason "Vakeros" Defer
  
  Assets:
  Jesse "Jwoodif" Jamison Menser
  
  Created using PIXI.js library
  All assets created by Jwoodif
  All sound effects and Music created by Astroboy`;

  _textStyle = new PIXI.TextStyle({
    fontFamily: 'Londrina Solid',
    fontSize: 40,
    fill: '0xfff',
    align: 'center'
  });
  _textMetrics = PIXI.TextMetrics.measureText(this._textContent, this._textStyle);
  _text = new PIXI.Text(this._textContent, this._textStyle);
  _mainMenuButton = new Button('Main Menu');

  constructor() {
    super();

    const bgSprite = new PIXI.Sprite(Game.app.loader.resources[earthBg2].texture);
    bgSprite.width = Game.app.renderer.width;
    bgSprite.height = Game.app.renderer.height;
    bgSprite.x = 0;
    bgSprite.y = 0;
    this.sceneContainer.addChild(bgSprite);

    this._text.x = Game.app.renderer.width / 2 - this._textMetrics.width / 2;
    this._text.y = Game.app.renderer.height / 2 - this._textMetrics.height / 2;
    this.sceneContainer.addChild(this._text);
    this._mainMenuButton.x = 20;
    this._mainMenuButton.y = 20;
    this._mainMenuButton.onClick = this.goToMainMenu.bind(this);
    this.sceneContainer.addChild(this._mainMenuButton);
  }

  goToMainMenu() {
    Game.sceneManager.activeScene = 'MainMenu';
  }
}
