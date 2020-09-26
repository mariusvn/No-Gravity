import UserInterface from "root/ui/ui";
import Button from "root/ui/Button";
import Game from "root/main";

export default class Navigation extends UserInterface {

  MainMenuButton = new Button('Main Menu');

  constructor() {
    super();
    this.MainMenuButton.x = 20;
    this.MainMenuButton.y = 20;
    this.MainMenuButton.onClick = this.goToMainMenu.bind(this);
    this.container.addChild(this.MainMenuButton);
  }

  goToMainMenu() {
    Game.sceneManager.activeScene = 'MainMenu';
  }

}
