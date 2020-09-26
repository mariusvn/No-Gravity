import Scene from "root/Scenes/Scene";
import Button from "root/ui/Button";
import Game from "root/main";

export default class MainMenu extends Scene {

  startButton;
  creditsButton;
  howToPlay;

  constructor() {
    super();
    this.startButton = new Button('Play');
    this.startButton.x = Game.app.screen.width / 2 - this.startButton.width / 2;
    this.startButton.y = Game.app.screen.height / 2 - 100;
    this.startButton.onClick = this.startGame.bind(this);

    this.howToPlay = new Button('How to play ?');
    this.howToPlay.x = Game.app.screen.width / 2 - this.howToPlay.width / 2;
    this.howToPlay.y = Game.app.screen.height / 2;

    this.creditsButton = new Button('Credits');
    this.creditsButton.x = Game.app.screen.width / 2 - this.creditsButton.width / 2;
    this.creditsButton.y = Game.app.screen.height / 2 + 100;


    this.sceneContainer.addChild(this.startButton);
    this.sceneContainer.addChild(this.howToPlay);
    this.sceneContainer.addChild(this.creditsButton);
  }

  startGame() {
    Game.sceneManager.activeScene = 'level1';
  }


  update(delta) {
    super.update(delta);

  }

}
