import Scene from "root/Scenes/Scene";
import Button from "root/ui/Button";
import Game from "root/main";
import logoImg from 'assets/tilesets/logo.png';

export default class MainMenu extends Scene {

  startButton;
  levelsButton;
  creditsButton;
  howToPlay;
  logoSprite;

  constructor() {
    super();
    this.logoSprite = new PIXI.Sprite(Game.app.loader.resources[logoImg].texture);
    this.logoSprite.width = this.logoSprite.width * 2;
    this.logoSprite.height = this.logoSprite.height * 2;
    this.logoSprite.x = Game.app.screen.width / 2 - this.logoSprite.width / 2;
    this.logoSprite.y = Game.app.screen.height / 2 - 450;

    this.startButton = new Button('Play');
    this.startButton.x = Game.app.screen.width / 2 - this.startButton.width / 2;
    this.startButton.y = Game.app.screen.height / 2 - 150;
    this.startButton.onClick = this.startGame.bind(this);

    this.levelsButton = new Button('Levels');
    this.levelsButton.x = Game.app.screen.width / 2 - this.levelsButton.width / 2;
    this.levelsButton.y = Game.app.screen.height / 2 - 50;
    this.levelsButton.onClick = this.goToLevels.bind(this);


    this.howToPlay = new Button('How to play ?');
    this.howToPlay.x = Game.app.screen.width / 2 - this.howToPlay.width / 2;
    this.howToPlay.y = Game.app.screen.height / 2 + 50;
    this.howToPlay.onClick = this.goToHowToPlay.bind(this);

    this.creditsButton = new Button('Credits');
    this.creditsButton.x = Game.app.screen.width / 2 - this.creditsButton.width / 2;
    this.creditsButton.y = Game.app.screen.height / 2 + 150;
    this.creditsButton.onClick = this.goToCredits.bind(this);


    this.sceneContainer.addChild(this.logoSprite);
    this.sceneContainer.addChild(this.startButton);
    this.sceneContainer.addChild(this.howToPlay);
    this.sceneContainer.addChild(this.creditsButton);
    this.sceneContainer.addChild(this.levelsButton);
  }

  startGame() {
    Game.sceneManager.activeScene = 'level0';
  }

  goToHowToPlay() {
    Game.sceneManager.activeScene = 'HowToPlay';
  }

  goToCredits() {
    Game.sceneManager.activeScene = 'credits';
  }

  goToLevels() {
    Game.sceneManager.activeScene = 'levels';
  }

}
