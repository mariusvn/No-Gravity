import * as PIXIimport from 'pixi.js';

export default class Button extends PIXIimport.Container {
  onClick = undefined;

  _container = new PIXI.Container();
  _textStyle = new PIXI.TextStyle({
    fontFamily: 'Londrina Solid',
    fontSize: 45,
    fill: '0xfff'
  });
  _text = new PIXI.Text('', this._textStyle);
  _textMectric;
  _background = new PIXI.Graphics();
  _padding = {
    x: 90,
    y: 10
  }

  constructor(text) {
    super();
    this.text = text;
    this._container.addChild(this._background);
    this._container.addChild(this._text);
    this._background.interactive = true;
    this._background.on('mouseover', this._onHover.bind(this));
    this._background.on('mouseout', this._onHoverEnd.bind(this));
    this._background.on('click', this._onClick.bind(this));
    this._container.x = this._container.width / 20;
    this._container.y = this._container.height / 20;
    this._container.scale.set(0.9);
    this.addChild(this._container);
  }

  get text() {
    return this._text.text;
  }

  set text(val) {
    this._textMectric = PIXI.TextMetrics.measureText(val, this._textStyle);
    this._drawBackground();
    this._text.text = val;
  }

  _drawBackground() {
    const width = this._textMectric.width + this._padding.x * 2;
    const height = this._textMectric.height + this._padding.y * 2;
    const getRandomInt = (padding) => {
      padding /= 2;
      return Math.floor(Math.random() * Math.floor(padding));
    }

    // Setting text position
    this._text.x = this._padding.x;
    this._text.y = this._padding.y;

    // Generating offsets of the borders
    const offsets = [
      {
        x: getRandomInt(this._padding.x),
        y: getRandomInt(this._padding.y)
      },
      {
        x: getRandomInt(this._padding.x),
        y: getRandomInt(this._padding.y)
      },
      {
        x: getRandomInt(this._padding.x),
        y: getRandomInt(this._padding.y)
      },
      {
        x: getRandomInt(this._padding.x),
        y: getRandomInt(this._padding.y)
      }
    ]

    // Draw
    this._background.clear();
    this._background.beginFill(0x3E83C1);
    this._background.drawPolygon([
      new PIXI.Point(offsets[0].x, offsets[0].y),
      new PIXI.Point(width - offsets[1].x, offsets[1].y),
      new PIXI.Point(width - offsets[2].x, height - offsets[2].y),
      new PIXI.Point(offsets[3].x, height - offsets[3].y),
    ]);
    this._background.endFill();
  }

  _onHover() {
    this._container.x = 0;
    this._container.y = 0;
    this._container.scale.set(1);
  }

  _onHoverEnd() {
    this._container.x = this._container.width / 20;
    this._container.y = this._container.height / 20;
    this._container.scale.set(0.9);
  }

  _onClick() {
    if (typeof this.onClick === 'function')
      this.onClick();
  }


}
