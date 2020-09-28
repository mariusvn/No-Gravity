import Game from "root/main";
export default class Sound{
  path;
  //volume;
  loop;
  preload = false;
  _finished = false;
  _audio;
  paused = false;
  constructor(path, loop = false, isSoundEffect = false, directPlay = false, volume = 0.01) {

    this._audio = new Audio(path);
    this._audio.volume = volume;
    if (isSoundEffect && directPlay)
        this._audio.preload = 'metadata'
    this._audio.loop = loop
    if (directPlay)
      this._audio.play();

    this._audio.addEventListener("ended",  this._end)
  }
  _end(){
    if (!this.loop)
      this._finished = true;
  }
  play(){
    this._audio.play();
    this._finished = false;
    this.paused = false;
  }

  isAudioPaused() {
      return this.paused;
  }

  pause(){
      this._audio.pause();
      this.paused = true;
  }

  stop(){
    this._audio.stop();
    this._finished = true;
  }

  getVolume(){
    return  this._audio.volume;
  }

  setVolume(vol){
    this._audio.volume = vol;
  }

  isFinished() {
    return this._finished;
  }

}