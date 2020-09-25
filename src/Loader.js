import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
import tilesetimg from 'assets/tilesets/interface32x.png';
import player from 'assets/player/Player1.png';
import playerOldFrame from 'assets/player/Player1-old.png';
import tilecoin from 'assets/tilesets/goldCoin1.png';

const assetsToLoad = [
  moonTileset,
  tilesetimg,
  earthTileset,
  player,
  tilecoin,
  playerOldFrame
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
