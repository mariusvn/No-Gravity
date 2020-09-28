import UserInterface from "root/ui/ui";
import keyboard from "root/Keyboard";
import Game from "root/main";
import Sound from "root/sound"
import DeathSound from "assets/audio/death.mp3"

export default class DeathScreen extends UserInterface {

  background = new PIXI.Graphics();
  availableTexts = [
    "You're dead buddy !",
    "Wasted",
    "Yet another restart !",
    "This time, he said.",
    "Not this time !",
    "Why are you running ?",
    "Waconda forever",
    "Are ya winnin' son ?"
  ];
  textStyle = new PIXI.TextStyle({
    fontFamily: 'Londrina Solid',
    fontSize: 90,
    fill: '0xfff'
  })
  text = new PIXI.Text(this.availableTexts[0], this.textStyle);
  textDims;
  isAnimating = false;

  constructor() {
    super();
    this.audio = new Sound(DeathSound, false, true, false, 0.1);
    this.background.beginFill(0x3E83C1);
    this.background.drawPolygon([
      new PIXI.Point(0,0),
      new PIXI.Point(900,100),
      new PIXI.Point(950, 550),
      new PIXI.Point(20, 600),
    ]);
    this.background.endFill();
    this.background.x = -1 * this.background.width;
    this.textDims = PIXI.TextMetrics.measureText(this.text.text, this.textStyle);
    this.text.x = -1 * this.textDims.width;
    this.container.y = this.screenSize.y / 2 - this.background.height / 2;
    this.container.addChild(this.background);
    this.container.addChild(this.text);
    this.startAnim = this.startAnim.bind(this);
    Game.events.addEventHandler('gameplay:death', this.startAnim);
  }

  startAnim() {
    this.audio.play();
    const random = Math.floor(Math.random() * this.availableTexts.length);
    this.text.text = this.availableTexts[random];
    this.textDims = PIXI.TextMetrics.measureText(this.text.text, this.textStyle);
    this.text.x = -1 * this.textDims.width;
    this.text.y = this.background.height / 2 - this.textDims.height / 2;
    this.background.x = this.screenSize.x;
    this.isAnimating = true;
    Game.gameplayState.paused = true;
  }

  update(delta) {
    super.update(delta);
    if (this.isAnimating) {
      if (this.text.x < this.screenSize.x) {
        if (this.text.x < this.background.x || this.text.x + this.textDims.width > this.background.x + this.background.width) {
          this.text.x += delta * 40;
        } else {
          this.text.x += delta * 2;
        }
      }
      if (this.background.x + this.background.width > 0) {
        if (this.text.x < this.background.x || this.text.x + this.textDims.width > this.background.x + this.background.width) {
          this.background.x -= delta * 50;
        } else {
          this.background.x -= delta * 2;
        }
      }
      if (!(this.text.x < this.screenSize.x) && !(this.background.x + this.background.width > 0)) {
        this.isAnimating = false;
        Game.gameplayState.paused = false;
        Game.events.triggerEvent('scene:restart');
      }
    }
  }

  unload() {
    super.unload();
    Game.events.removeEventHandler('gameplay:death', this.startAnim);
  }

}
