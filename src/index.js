import Game from './main';
import './index.css';

(function index() {
  WebFont.load({
    google: {
      families: ['Londrina Solid']
    },
    active: () => {
      new Game();
    }
  })
})();

