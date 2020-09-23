import testmapCsv from 'assets/maps/test/test-world.csv';
import testDynamicMap from 'assets/maps/test/dynamicMap.json';

/**
 * @type {Object.<string, MapEntry>}
 */
const MapRegistry = {
  test: {
    tileMap: testmapCsv,
    dynamicObjectsMap: testDynamicMap
  }
}

export default MapRegistry;

/**
 * @typedef MapEntry
 * @property {string} tileMap,
 * @property {any} dynamicObjectsMap
 */
