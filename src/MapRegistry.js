import testmapCsv from 'assets/maps/test/test-world.csv';

/**
 * @type {Object.<string, MapEntry>}
 */
const MapRegistry = {
  test: {
    tileMap: testmapCsv,
    dynamicObjectsMap: {}
  }
}

export default MapRegistry;

/**
 * @typedef MapEntry
 * @property {string} tileMap,
 * @property {any} dynamicObjectsMap
 */
