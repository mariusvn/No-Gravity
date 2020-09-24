import Game from "root/main";
import laserimg from 'assets/player/Player1.png';
import * as Collision from "root/Collision";
import Trigger from "root/Trigger";

export default class Laser{
  container = new PIXI.Container();
  sprite = [];
  _canHitPlayer = true;
  _active = true;
  _intervalId;
  _laserlenght;
  delay;
  constructor(player, tilemap, {x, y, lenght, delay, direction}) {
    for(let i = 0; i <= lenght; i ++){
     // console.log(i);
      this.sprite.push(new PIXI.Sprite(Game.app.loader.resources[laserimg].texture));
      if (direction === "top"){
        this.sprite[i].y = y - this.sprite[i].height*(i+1);
        this.sprite[i].x = x
      }
      else if(direction === "bottom"){
        this.sprite[i].y = y + this.sprite[i].height*(i+1);
        this.sprite[i].x = x
      }
      else if(direction === "left") {
        this.sprite[i].angle = 90;
        this.sprite[i].y = y
        this.sprite[i].x = x + this.sprite[i].height*(i+1);
      }
      else {
        this.sprite[i].angle = -90;
        this.sprite[i].y = y
        this.sprite[i].x = x - this.sprite[i].height*(i+1);
      }

     // this.sprite[i].x = x;
      this._laserlenght = this.sprite[i].height;
     // console.log(this.sprite[i].x);
      this.container.addChild(this.sprite[i]);
    }
   // this._laserlenght = this.sprite.length * this.sprite[0].height;
    this.laserHitReg = new Trigger(
      new PIXI.Rectangle(
        this.sprite[0].x,
        this.sprite[this.sprite.length-1].y,
        this.sprite[0].width,
        this.sprite[0].height*this.sprite.length
      ),
      player.container
    );
    console.log(this.sprite[0].y)
    this.delay = delay;
    this._intervalId = this.startInterval();
    this.laserHitReg.onCollide = this.onHit.bind(this);
  }

  onHit() {
    if (this._canHitPlayer){
      this._canHitPlayer = false;
      console.log("hit");
      Game.events.triggerEvent('gameplay:death');
    }
  }

  startInterval(){

    return setInterval(() =>{
      if(this.delay !== -1)
         this._active = !this._active;

      let alpha = (this._active ? 1 : 0);
      for(let i = 0; i < this.sprite.length; i ++){
        this.sprite[i].alpha = alpha;
      }

    },this.delay)
  }

  onSceneEnd(){
    clearInterval(this._intervalId);
  }

  update(player) {
    //this.i++;
    if (this._active)
       this.laserHitReg.update()
   // console.log(player.getPosition())
  }

}