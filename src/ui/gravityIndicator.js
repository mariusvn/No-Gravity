import UserInterface from "root/ui/ui";
import Game from "root/main";

export default class GravityIndicator extends UserInterface {

  background = new PIXI.Graphics();
  gravityText = new PIXI.Text("Gravity (E):", {
    fontFamily: 'Londrina Solid',
    fill: '#fff'
  });
  gravityValueText = new PIXI.Text("ON", {
    fontFamily: 'Londrina Solid',
    fill: '#0f0',
    fontSize: 40
  });

  constructor() {
    super();
    this.background.beginFill(0x3E83C1);
    this.background.drawPolygon([
      new PIXI.Point(20,20),
      new PIXI.Point(200,0),
      new PIXI.Point(210, 120),
      new PIXI.Point(24, 110),
    ]);
    this.background.endFill();
    this.container.x = this.screenSize.x - 250;
    this.container.y = this.screenSize.y - 150;
    this.gravityText.x = 50;
    this.gravityText.y = 25;
    this.gravityValueText.x = 90;
    this.gravityValueText.y = 60;
    this.container.addChild(this.background);
    this.container.addChild(this.gravityValueText);
    this.container.addChild(this.gravityText);
    Game.events.addEventHandler('gameplay:gravity-switch', this.onGravitySwitches.bind(this));
  }

  onGravitySwitches(isOn) {
    if (isOn) {
      this.gravityValueText.text = 'ON';
      this.gravityValueText.style.fill = '#0f0';
    } else {
      this.gravityValueText.text = 'OFF';
      this.gravityValueText.style.fill = '#f00';
    }
  }
}
