import prototypeTileset from 'assets/tilesets/prototype.png';
import prototypePlayer from 'assets/player/prototype.png';
import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
<<<<<<< HEAD
import tilesetimg from 'assets/tilesets/interface32x.png';
=======
import player from 'assets/player/Player1.png';
>>>>>>> a80f9442ade88862f21eec2444cbf964ad75f928

const assetsToLoad = [
  prototypeTileset,
  prototypePlayer,
  moonTileset,
<<<<<<< HEAD
  tilesetimg,
  earthTileset
=======
  earthTileset,
  player
>>>>>>> a80f9442ade88862f21eec2444cbf964ad75f928
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
