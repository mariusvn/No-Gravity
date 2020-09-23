import * as Collision from "root/Collision";

export default class Trigger {

  bounds;
  targetCollider;
  onCollide = undefined;
  _lastIsTouches = false;

  /**
   * @param {PIXI.Rectangle} position
   * @param {PIXI.DisplayObject} targetCollider
   */
  constructor(position, targetCollider) {
    this.bounds = position;
    this.targetCollider = targetCollider;
  }

  /**
   * @return {boolean}
   */
  get isTouches() {
    return Collision.hitTestRectangle(this.bounds, this.targetCollider);
  }

  update() {
    if (typeof this.onCollide === 'function') {
      if (this.isTouches) {
        if (!this._lastIsTouches) {
          this.onCollide();
          this._lastIsTouches = true;
        }
      } else {
        this._lastIsTouches = false;
      }
    }
  }

}
