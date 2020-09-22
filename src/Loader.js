import prototypeTileset from 'assets/tilesets/prototype.png';
import prototypePlayer from 'assets/player/prototype.png';
import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';

const assetsToLoad = [
  prototypeTileset,
  prototypePlayer,
  moonTileset,
  earthTileset
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
