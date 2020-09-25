import level1Csv from 'assets/maps/level-1/level-1.csv';
import level1Json from 'assets/maps/level-1/level-1.json';

/**
 * @type {Object.<string, MapEntry>}
 */
const MapRegistry = {
  level1: {
    tileMap: level1Csv,
    dynamicObjectsMap: level1Json
  }
}

export default MapRegistry;

/**
 * @typedef MapEntry
 * @property {string} tileMap,
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
