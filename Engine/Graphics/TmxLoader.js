/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A loader that load a map created with Tiled and exported to JSON.
 * @class TmxLoader
 * @static
 */
Atlantis.TmxLoader = {
    /**
     * Load a tilemap at the specified path.
     * @method load
     * @param {String} mapPath
     * @param {Function} callback
     * @return {Atlantis.Tilemap} Return a tilemap.
     */
    load: function(mapPath, callback) {
        var tilemap = new Atlantis.Tilemap();

        Atlantis.app.content.load(mapPath, function(map) {
            var i = 0,
                l = 0;

            for (i = 0, l = map.tilesets.length; i < l; i++) {
                tilemap.tilesets.push(new Atlantis.Tileset(map.tilesets[i]));
                tilemap.tilesets[i].texture = Atlantis.app.content.load(map.tilesets[i].image);
                tilemap.tilesets[i].texture.width = map.tilesets[i].imagewidth;
                tilemap.tilesets[i].texture.height = map.tilesets[i].imageheight;
            }

            for (i = 0, l = map.layers.length; i < l; i++) {
                tilemap.layers.push(new Atlantis.TilemapLayer(map.layers[i]));

                if (map.layers[i].image) {
                    tilemap.backgrounds.push(Atlantis.app.content.load(map.layers[i].image));
                    tilemap.layers[i].backgroundId = i;
                }
            }

            tilemap.height = map.height;
            tilemap.width = map.width;
            tilemap.tileWidth = map.tilewidth;
            tilemap.tileHeight = map.tileheight;
            tilemap.mapWidth = tilemap.width * tilemap.tileWidth;
            tilemap.mapHeight = tilemap.height * tilemap.tileHeight;
            tilemap.projection = map.orientation;
            tilemap.version = map.version;
            tilemap.properties = map.properties;
            tilemap.visible = true;
            tilemap.loaded = true;

            if (callback) {
                callback(tilemap);
            }
        });

        return tilemap;
    }
};