import Game from "root/main";

export default class UserInterface {
  container = new PIXI.Container();
  gravityBackground = new PIXI.Graphics();
  screenSize = {x: Game.app.renderer.width, y: Game.app.renderer.height};
  gravityText = new PIXI.Text("Gravity:", {
    fontFamily: 'Londrina Solid',
    fill: '#fff'
  });
  gravityValueText = new PIXI.Text("ON", {
    fontFamily: 'Londrina Solid',
    fill: '#0f0',
    fontSize: 40
  })
  gravityContainer = new PIXI.Container();


  constructor() {
    this.gravityBackground.beginFill(0x3E83C1);
    this.gravityBackground.drawPolygon([
      new PIXI.Point(20,20),
      new PIXI.Point(200,0),
      new PIXI.Point(210, 120),
      new PIXI.Point(24, 110),
    ]);
    this.gravityBackground.endFill();
    this.gravityContainer.x = this.screenSize.x - 250;
    this.gravityContainer.y = this.screenSize.y - 150;
    this.gravityText.x = 50;
    this.gravityText.y = 25;
    this.gravityValueText.x = 90;
    this.gravityValueText.y = 60;
    this.gravityContainer.addChild(this.gravityBackground);
    this.gravityContainer.addChild(this.gravityValueText);
    this.gravityContainer.addChild(this.gravityText);
    this.container.addChild(this.gravityContainer);
    console.log(Game.app.loader.resources);
  }

  update(delta) {

  }

  setGravityState(isOn) {
    if (isOn) {
      this.gravityValueText.text = 'ON';
      this.gravityValueText.style.fill = '#0f0';
    } else {
      this.gravityValueText.text = 'OFF';
      this.gravityValueText.style.fill = '#f00';
    }
  }

  assignToContainer(container) {
    container.addChild(this.container);
  }
}
