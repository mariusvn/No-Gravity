import level0Csv from 'assets/maps/level-0/level-0.csv';
import level0Json from 'assets/maps/level-0/level-0.json';
import level0BackCsv from 'assets/maps/level-0/level-0-back.csv';

import level1Csv from 'assets/maps/level-1/level-1.csv';
import level1Json from 'assets/maps/level-1/level-1.json';
import level1BackCsv from 'assets/maps/level-1/level-1-back.csv';

import level2Csv from 'assets/maps/level-2/level-2.csv';
import level2Json from 'assets/maps/level-2/level-2.json';
import level2BackCsv from 'assets/maps/level-2/level-2-back.csv';

import level3Csv from 'assets/maps/level-3/level-3.csv';
import level3Json from 'assets/maps/level-3/level-3.json';
import level3BackCsv from 'assets/maps/level-3/level-3-back.csv';

import level4Csv from 'assets/maps/level-4/level-4.csv';
import level4Json from 'assets/maps/level-4/level-4.json';
import level4BackCsv from 'assets/maps/level-4/level-4-back.csv';

/**
 * @type {Object.<string, MapEntry>}
 */
const MapRegistry = {
  level0: {
    tileMap: level0Csv,
    backTileMap: level0BackCsv,
    dynamicObjectsMap: level0Json
  },
  level1: {
    tileMap: level1Csv,
    backTileMap: level1BackCsv,
    dynamicObjectsMap: level1Json
  },
  level2: {
    tileMap: level2Csv,
    backTileMap: level2BackCsv,
    dynamicObjectsMap: level2Json
  },
  level3: {
    tileMap: level3Csv,
    backTileMap: level3BackCsv,
    dynamicObjectsMap: level3Json
  },
  level4: {
    tileMap: level4Csv,
    backTileMap: level4BackCsv,
    dynamicObjectsMap: level4Json
  },

}

export default MapRegistry;

/**
 * @typedef MapEntry
 * @property {string} tileMap,
 * @property {string} backTileMap
 * @property {{
 *   endTrigger: {
 *     x: number,
 *     y: number,
 *     width: number,
 *     height: number
 *   },
 *   start: {
 *     x: number,
 *     y: number
 *   },
 *   laserHitReg: Array<{
 *     x: number,
 *     y: number,
 *     length: number,
 *     delay: number,
 *     direction: 'top'|'left'|'right'|'bottom'
 *   }>,
 *   ennemies: Array<{
 *     x: number,
 *     y: number,
 *     speed: number
 *   }>,
 *   collectables: Array<{
 *     x: number,
 *     y: number
 *   }>
 * }} dynamicObjectsMap
 */
