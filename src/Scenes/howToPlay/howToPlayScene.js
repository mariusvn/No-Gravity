import Scene from "root/Scenes/Scene";
import Game from "root/main";
import keyboardLayout from 'assets/tilesets/keyboard-layout.png';
import Button from "root/ui/Button";

export default class HowToPlayScene extends Scene {

  _textContent =
  `Welcome to NO GRAVITY
  
  The game is pretty simple, get all the gold 
  coins and reach the end of the level.
  
  To achieve this, we created a whole new tech named
  the "Neosensor Turbothermal Gavitotron" (You can call it NTG too).
  It basically allow you to avoid the gravity field of the earth by
  teleport all your environment on space.
  
  To activate it just press the big red button on yous suit also
  named the E button.
  
  To move aroud your environment, just use your feets or you can
  also use the little button just next to your gloves, those are
  the A and D buttons (if you're french, you can also use the Q
  button).
  
  Ah and you can also use the SPACE button to have an impulsion in
  your legs and jump.
  
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
