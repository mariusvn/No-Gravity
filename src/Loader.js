import moonTileset from 'assets/tilesets/moon.png';
import earthTileset from 'assets/tilesets/earth.png';
import player from 'assets/player/Player1.png';
import playerOldFrame from 'assets/player/Player1-old.png';
import tilecoin from 'assets/tilesets/goldCoin1.png';
import laser from 'assets/tilesets/laser.png';
import keyboardLayout from 'assets/tilesets/keyboard-layout.png';
import laserShooter from 'assets/tilesets/laser-shooter.png';
import miscTileset from 'assets/tilesets/misc.png';
import logo from 'assets/tilesets/logo.png';

const assetsToLoad = [
  moonTileset,
  earthTileset,
  player,
  tilecoin,
  playerOldFrame,
  laser,
  laserShooter,
  keyboardLayout,
  miscTileset,
  logo
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
