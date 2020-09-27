import Scene from "root/Scenes/Scene";
import Game from "root/main";
import Button from "root/ui/Button";

export default class LevelsScene extends Scene {
  _title = new PIXI.Text('LEVELS', {
    fontFamily: 'Londrina Solid',
    fontSize: 40,
    fill: '0xfff',
    align: 'center'
  });
  _mainMenuButton = new Button('Main Menu');

  _levels = [
    {
      name: 'Tutorial',
      id: 'level0'
    },
    {
      name: 'Level 1',
      id: 'level1'
    },
    {
      name: 'Level 2',
      id: 'level2'
    },
  ];

  constructor() {
    super();
    const titleMetrics = PIXI.TextMetrics.measureText(this._title.text, this._title.style);
    this._title.x = Game.app.screen.width / 2 - titleMetrics.width / 2;
    this._title.y = 100;
    this.sceneContainer.addChild(this._title);
    this._mainMenuButton.x = 20;
    this._mainMenuButton.y = 20;
    this._mainMenuButton.onClick = this.goToMainMenu.bind(this);
    this.sceneContainer.addChild(this._mainMenuButton);
    this.generateMenu();
  }

  generateMenu() {
    const getRedirectFunction = (levelId) => () => {
      Game.sceneManager.activeScene = levelId;
    }
    for (let i = 0; i < this._levels.length; i++) {
      const levelData = this._levels[i];
      const button = new Button(levelData.name);
      button.x = Game.app.screen.width / 2 - button.width / 2;
      button.y = 200 + i * 100;
      button.onClick = getRedirectFunction(levelData.id);
      this.sceneContainer.addChild(button);
    }
  }

  goToMainMenu() {
    Game.sceneManager.activeScene = 'MainMenu';
  }
}
