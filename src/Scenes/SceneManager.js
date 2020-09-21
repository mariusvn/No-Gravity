
export default class SceneManager {
  /**
   * Scene dictionnary
   * @type {Object.<string, Scene>}
   * @private
   */
  _scenes = {};
  /**
   * Current active scene name
   * @type {string}
   * @private
   */
  _activeScene = '';

  _parentContainer;

  constructor(parentContainer) {
    this._parentContainer = parentContainer;
  }

  /**
   * @param {Scene} scene
   * @param {string} name
   */
  addScene(scene, name) {
    this._scenes[name] = scene;
  }

  /**
   * @return {undefined|string}
   */
  get activeScene() {
    return (this._activeScene === '') ? undefined : this._activeScene;
  }

  /**
   * @param {string} value
   */
  set activeScene(value) {
    if (this._scenes[value]) {
      if (this._activeScene) {
        this._parentContainer.removeChild(this._scenes[this._activeScene].getContainer());
      }
      this._activeScene = value;
      this._parentContainer.addChild(this._scenes[value].getContainer());
    } else throw new TypeError(`Scene ${value} doesnt exists`);
  }

  /**
   * @param {string} value
   * @return {Scene}
   */
  getScene(value) {
    if (this._scenes[value]) {
      return this._scenes[value];
    } else throw new TypeError(`Scene ${value} doesnt exists`);
  }

}
