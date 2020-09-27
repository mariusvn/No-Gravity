import Scene from "root/Scenes/Scene";
import Game from "root/main";
import keyboardLayout from 'assets/tilesets/keyboard-layout.png';
import Button from "root/ui/Button";

export default class HowToPlayScene extends Scene {

  _textContent =
  `Welcome to NO GRAVITY!
  
  The game is pretty simple. Get all the gold 
  coins and reach the end of the level.
  
  To help you achieve this, we've created a whole new tech called
  the "Neosensor Turbothermal Gravitotron" or NTG for short.
  It basically allows you to avoid the gravity field of the earth by
  teleporting your entire environment to space.
  
  To activate it just press the big red button on your suit, AKA
  the E button on your keyboard.
  
  To move around, just use your feet or you can
  use the little buttons on your gloves, otherwise known as
  the A and D buttons on your keyboard. (if you're using a
  French keyboard, you can also use the Q button).
  
  Oh and don't forget that you can also use the SPACE button to get a
  little boost in your legs and jump!
  
  See you explorer.`

  _textStyle = new PIXI.TextStyle({
    fontFamily: 'Londrina Solid',
    fontSize: 25,
    fill: '0xfff',
    align: 'center'
  });
  _textMetrics = PIXI.TextMetrics.measureText(this._textContent, this._textStyle);
  _text = new PIXI.Text(this._textContent, this._textStyle);
  _keyboardSprite = new PIXI.Sprite(Game.app.loader.resources[keyboardLayout].texture);
  _mainMenuButton = new Button('Main Menu');

  constructor() {
    super();
    this._text.x = Game.app.renderer.width / 2 - this._textMetrics.width / 2;
    this._text.y = Game.app.renderer.height / 2 - this._textMetrics.height / 2 - 100;
    this._keyboardSprite.x = Game.app.renderer.width / 2 - this._keyboardSprite.width / 2;
    this._keyboardSprite.y = Game.app.renderer.height / 2 + 200;
    this.sceneContainer.addChild(this._text);
    this.sceneContainer.addChild(this._keyboardSprite);
    this._mainMenuButton.x = 20;
    this._mainMenuButton.y = 20;
    this._mainMenuButton.onClick = this.goToMainMenu.bind(this);
    this.sceneContainer.addChild(this._mainMenuButton);
  }


  goToMainMenu() {
    Game.sceneManager.activeScene = 'MainMenu';
  }
}
