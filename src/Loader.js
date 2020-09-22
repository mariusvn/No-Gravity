import prototypeTileset from 'assets/tilesets/prototype.png';
import prototypePlayer from 'assets/player/prototype.png';

const assetsToLoad = [
  prototypeTileset,
  prototypePlayer
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
