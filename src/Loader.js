import prototypeTileset from 'assets/tilesets/prototype.png';

const assetsToLoad = [
  prototypeTileset
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
