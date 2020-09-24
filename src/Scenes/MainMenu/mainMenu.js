import Scene from "../Scene";
import Game from "root/main.js";
import Tileset from "root/Tileset";
import tilesetimg from 'assets/tilesets/interface32x.png';
//import prototypeTileset from 'assets/tilesets/prototype.png';
export default class MainMenu extends Scene {

  constructor() {
    super();
    let b = new button(this.sceneContainer,[69, 70, 71], setScene, 200, 100, 1, 1);
  //  this.sceneContainer.addChild(graph);
  }


  update(delta) {
    super.update(delta);

  }

}

class tools {

}

function cc(){
  alert("cc")
}

function setScene(){
  // Game.sceneManager.addScene(new GameScene(), 'GameScene');
   Game.sceneManager.activeScene = 'testScene';
}

class button {
  tileset = new Tileset(tilesetimg, {x: 32, y: 32});
  isOver = false;
  constructor(sceneContainer, spritesId, onClick, x = 0, y = 0, scaleX = 1, scaleY = 1, text = 'start', textAttribute = {fontFamily : 'Arial', fontSize: 15, fill : 0xff1010, align : 'left'} ) {
    this.sprites = [];
    this.scale = {x: scaleX, y: scaleY};
    this.onClick = onClick;
    let initPos = x;
    for (var i = 0; i < spritesId.length; i++) {
      let sprite = this.tileset.getSprite(spritesId[i]);
      this.sprites.push(sprite);
      sprite.position.x = x + sprite.width/2;
      sprite.position.y = y;
      x += 32;
      sceneContainer.addChild(sprite);
      this.sprites[i].interactive = true;
      this.sprites[i].on("pointerover", this.over.bind(this));
      this.sprites[i].on("pointerout", this.out.bind(this));
      this.sprites[i].on("click", this.click.bind(this));
      this.sprites[i].scale.set(scaleX, scaleY);
      this.sprites[i].anchor.set(0.5,0);
   //   this.sprites[i].anchor.set(0.5);
    }
    this.text = new PIXI.Text(text,textAttribute);
    this.text.anchor.set(1,1 );
    let style = new PIXI.TextStyle(textAttribute);
    let textMetrics = PIXI.TextMetrics.measureText(text, style)
    //alert(textMetrics.width);
    let textPos = {x: initPos + ((((x - initPos)/2)*scaleX) +textMetrics.width/2), y: y + (this.sprites[0].height -  textMetrics.height/2)};// textMetrics.width
    this.text.position = textPos;
    sceneContainer.addChild(this.text);
    //Game.app.stage.on("pointermove", this.mouseMove);
 //   this.sceneContainer.addChild(sprite2);
   // this.sceneContainer.addChild(sprite[2]);
  }

  over(e)
  {
   //  this.onClick();
    this.isOver = true;
    for (var i = 0; i < this.sprites.length; i++) {
     //   this.sprites[i].anchor.set(0.5,0);
        this.text.position.y = this.text.position.y +1;
        this.sprites[i].scale.set(this.scale.x + 0.2, this.scale.y + 0.2);
      //  this.sprites[i].anchor.set(0);
    }
    this.text.scale.set(1);

  }

  out(e)
  {
   //  this.onClick();text
    this.isOver = true;
    for (var i = 0; i < this.sprites.length; i++) {
        this.text.position.y = this.text.position.y -1;
        this.sprites[i].scale.set(this.scale.x, this.scale.y);
    }
    this.text.scale.set(1);
  }

  click(e){
    if(this.isOver)
      this.onClick();
  }

  update(delta) {

  }
}

//Game.app.stage.interactive = true;