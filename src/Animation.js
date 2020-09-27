import Game from "root/main";

/**
 * @typedef {Object.<string, {isAnimated: boolean, tileId?: number, from?: number, to?: number}>} AnimationData
 */

export default class Animation {
  _animTexture;
  _frameSize;
  sprite;
  /** @type AnimationData */
  _animData;
  _currentAnim;
  _currentAnimFrame = 0;
  _frameRect = new PIXI.Rectangle();
  _intervalId = -1;
  _delay;
  _isPaused = false;

  /**
   * @param {string} texPath
   * @param {{x: number, y: number}} frameSize
   * @param {AnimationData} animationData
   * @param {string} defaultAnim
   * @param {number} delay
   */
  constructor(texPath, frameSize, animationData, defaultAnim, delay) {
    this._animTexture = Game.app.loader.resources[texPath].texture;
    this._frameSize = frameSize;
    this._currentAnim = defaultAnim;
    this._animData = animationData;
    this._delay = delay;
    window.anim = this;

    /* Setting up default frame */
    this._frameRect.width = frameSize.x;
    this._frameRect.height = frameSize.y;
    this._frameRect.y = 0;
    this._setCurrentAnimFrame();
    this._animTexture.frame = this._frameRect;


    this.sprite = new PIXI.Sprite(this._animTexture);
  }

  start() {
    if (this._intervalId !== -1)
      this.stop();
    this._intervalId = setInterval(this._setCurrentAnimFrame.bind(this), this._delay);
  }

  pause() {
    this._isPaused = true;
  }

  resume() {
    this._isPaused = false;
  }

  _setCurrentAnimFrame() {
    if (this._isPaused)
      return;
    const current = this._animData[this._currentAnim];
    if (!current)
      return;
    if (current.animated) {
      if (!this._currentAnimFrame)
        this._currentAnimFrame = current.from - 1;
      if (this._currentAnimFrame >= current.to) {
        if (current.loop) {
          this._currentAnimFrame = current.from;
          this._frameRect.x = current.from * this._frameRect.width;
        }
      } else {
        this._currentAnimFrame++;
        this._frameRect.x = this._currentAnimFrame * this._frameRect.width;
      }
    } else {
      this._currentAnimFrame = current.tileId;
      this._frameRect.x = current.tileId * this._frameRect.width;
    }
    this._animTexture.frame = this._frameRect;
  }

  stop() {
    if (this._intervalId !== -1) {
      clearInterval(this._intervalId);
      this._intervalId = -1;
    }
  }

  /**
   * @param {string} animName
   */
  setCurrentAnimation(animName) {
    if (animName !== this._currentAnim) {
      this._currentAnim = animName;
      this._currentAnimFrame = this._animData[this._currentAnim].start;
      this._setCurrentAnimFrame();
    }
  }
}
