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
import sawAnimImg from 'assets/tilesets/buzzsaw.png';
import flagAnim from 'assets/tilesets/flag.png';
import earthBg from 'assets/tilesets/bg-earth.png';
import earthBg2 from 'assets/tilesets/bg-earth-2.png';

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
  logo,
  sawAnimImg,
  flagAnim,
  earthBg,
  earthBg2
]

export default function loader(pixiLoader, cb) {
  let l = pixiLoader;
  for (const item of assetsToLoad) {
    l = l.add(item);
  }
  l.load(cb);
}
