import Game from "root/main";

export default class SceneManager {
  /**
   * Scene dictionnary
   * @type {Object.<string, Scene>}
   * @private
   */
  _scenes = {};
  /**
   * Class dictionnary
   * @type {Object.<string, function>}
   */
  _scenesClasses = {};
  /**
   * Current active scene name
   * @type {string}
   * @private
   */
  _activeScene = '';

  _parentContainer;

  constructor(parentContainer) {
    this._parentContainer = parentContainer;
    Game.events.addEventHandler('scene:restart', this.restartCurrentScene.bind(this));
  }

  /**
   * @param {function} sceneClass
   * @param {string} name
   */
  addScene(sceneClass, name) {
    this._scenes[name] = new sceneClass();
    this._scenesClasses[name] = sceneClass;
  }

  restartCurrentScene() {
    if (!this.activeScene)
      return;
    const oldActiveScene = this.activeScene;
    this._activeScene = undefined;
    // unload old instance
    this._scenes[oldActiveScene].onSceneEnd();
    this._parentContainer.removeChild(this._scenes[oldActiveScene].getContainer());
    delete this._scenes[oldActiveScene];

    // create new instance
    this._scenes[oldActiveScene] = new this._scenesClasses[oldActiveScene]();

    // Initialize and display new instance
    this._parentContainer.addChild(this._scenes[oldActiveScene].getContainer());
    this._scenes[oldActiveScene].onSceneStart();
    this._activeScene = oldActiveScene;
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
        this._scenes[this._activeScene].onSceneEnd();
        this._parentContainer.removeChild(this._scenes[this._activeScene].getContainer());
      }
      this._activeScene = value;
      this._parentContainer.addChild(this._scenes[value].getContainer());
      this._scenes[value].onSceneStart();
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
