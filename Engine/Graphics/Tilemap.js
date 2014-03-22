/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Define the type of a layer
 * - Tiles
 * - Background
 * - Objects
 * @class TilemapLayerType
 * @static
 */
Atlantis.TilemapLayerType = {
    Tiles: "tilelayer",
    Background: "imagelayer",
    Objects: "objectlayer"
};

/**
 * Define the type of projection of the map
 * - Orthogonal (2D)
 * - Isometric (2D Iso)
 * @class TilemapProjection
 * @static
 */
Atlantis.TilemapProjection = {
    Orthogonal: "orthogonal",
    Isometric: "isometric"
};

/**
 * Represent a tileset which is an image that contains many other images named tiles.
 * @class Tileset
 * @constructor
 * @param {Atlantis.Tileset|Object} tileset (optional) An object that contains all necessary data to construct a tileset.
 */
Atlantis.Tileset = function (tileset) {
    this.firstGID = +tileset.firstgid || 1;
    this.id = Atlantis.Tileset.Counter++;
    this.name = tileset.name || ["Tileset_", this.id].join("");
    this.texture = tileset.texture;
    this.width = +tileset.imagewidth|0;
    this.height = +tileset.imageheight|0;
    this.margin = +tileset.margin|0;
    this.padding = +tileset.spacing|0;
    this.tileWidth = +tileset.tilewidth|0;
    this.tileHeight = +tileset.tileheight|0;
    this.properties = tileset.properties || {};
};

Atlantis.Tileset.Counter = 0;

/**
 * Represent a tilemap layer which contains a tileset or background.
 * @class TilemapLayer
 * @constructor
 * @param {Atlantis.TilemapLayer|Object} layer (optional) An object that contains all necessary data to construct a layer.
 */
Atlantis.TilemapLayer = function (layer) {
    var layer = layer || {};
    this.id = Atlantis.TilemapLayer.Counter++
	this.data = layer.data || [];
	this.type = layer.type || Atlantis.TilemapLayer.Tiles;
    this.visible = layer.visible;
    this.opacity = +layer.opacity;
    this.name = layer.name || ["Layer_", this.id].join("");
    this.width = +layer.width|0;
	this.height = +layer.height|0;
    this.offset = { 
        x: +layer.x|0, 
        y: +layer.y|0 
    };
    this.properties = layer.properties || {};
    this.backgroundId = +layer.backgroundId || +this.properties.backgroundId || 0;
    this.tilesetId = +layer.tilesetId || +this.properties.tilesetId || 0;
};

Atlantis.TilemapLayer.Counter = 0;

/**
 * This class is responsible to store all data for drawing a tilemap.
 * A tilemap is composed of layers, tilesets and backgrounds.
 * @class Tilemap
 * @constructor
 * @param {Atlantis.Tilemap|Object} tilemap (optional) An object that contains tilemap data.
 */
Atlantis.Tilemap = function (tilemap) {
    var tilemap = tilemap || {};
    this.id = Atlantis.Tilemap.Counter++;
    this.name = tilemap.name || ["Tilemap_", this.id].join("");
    this.version = +tilemap.version|0;
    this.projection = tilemap.orientation || tilemap.projection || Atlantis.TilemapProjection.Orthogonal;

    this.layers = tilemap.layers || [];
    this.tilesets = tilemap.tilesets || [];
    this.backgrounds = tilemap.backgrounds || [];
    
    this.width = +tilemap.width|0;
    this.height = +tilemap.height|0;
    this.tileWidth = +tilemap.tilewidth|0, 
    this.tileHeight = +tilemap.tileheight|0 
    this.mapWidth = this.width * this.tileWidth;
    this.mapHeight = this.height * this.tileHeight;
    
    this.properties = tilemap.properties || {};
    this.loaded = (typeof(tilemap.loaded) !== "undefined") ? tilemap.loaded : false;
    this.visible = (typeof(tilemap.visible) !== "undefined") ? tilemap.visible : true;

    this._cacheTilesCanvas = [];
};

Atlantis.Tilemap.Counter = 0;

Atlantis.Tilemap.prototype.update = function (camera) {
    // TODO : Add collision detection 
};

/**
 * Draw the tilemap if it's visible and loaded.
 * @method draw
 * @param {Atlantis.SpriteBatch} spriteBatch An instance of SpriteBatch for drawing the tileset.
 * @param {Atlantis.Camera2D} camera The camera to use to defined what must be drawn.
 */
Atlantis.Tilemap.prototype.draw = function (spriteBatch, camera) {
    if (this.visible && this.loaded) {
        for (var i = 0, l = this.layers.length; i < l; i++) {
            if (this.layers[i].visible) {
                if (this.layers[i].type === Atlantis.TilemapLayerType.Background) {
                    this.drawBackground(spriteBatch, this.layers[i], this.backgrounds[this.layers[i].backgroundId])
                }
                else if (this.layers[i].type === Atlantis.TilemapLayerType.Tiles) {
                    this.drawLayer(spriteBatch, camera, this.layers[i], this.tilesets[this.layers[i].tilesetId]);
                }
            }
        }
    }
};

/**
 * Draw the background with this defined offset
 * @method drawBackground
 * @param {Atlantis.SpriteBatch} spriteBatch An instance of SpriteBatch for drawing the background.
 * @param {Atlantis.TilemapLayer} layer The layer to draw.
 * @param {Image|Canvas} background An image or canvas to draw as background.
 */
Atlantis.Tilemap.prototype.drawBackground = function (spriteBatch, layer, background) {
    spriteBatch.draw(background, { x: layer.offset.x, y: layer.offset.y });
};

/**
 * Draw tiles with the defined offset, spacing and margin
 * @method drawLayer
 * @param {Atlantis.SpriteBatch} spriteBatch An instance of SpriteBatch for drawing the tileset.
 * @param {Atlantis.Camera2D} camera The camera to use to defined what must be drawn.
 * @param {Atlantis.TilemapLayer} layer The layer to draw.
 * @param {Atlantis.Tileset} The tileset to use for drawing the layer.
 */
Atlantis.Tilemap.prototype.drawLayer = function (spriteBatch, camera, layer, tileset) { 
     var nbTileX = Math.floor((tileset.width - tileset.margin * 4) / tileset.tileWidth),
         nbTileY = Math.floor((tileset.height - tileset.margin * 4) / tileset.tileHeight);
   
    // posX/Y   : Relative position to the camera
    // start/End/X/Y : Start/End position for the render loop  
    var posX = camera.x / this.tileWidth,
        posY = camera.y / this.tileHeight
        startX = Math.floor(posX),
        startY = Math.floor(posY),
        stopX = Math.min(Math.round((camera.x + Atlantis.screen.width) / tileset.tileWidth) + 1, layer.width),
        stopY = Math.min(Math.round((camera.y + Atlantis.screen.height) / tileset.tileHeight) + 1, layer.height);

    // Source rectangle values for drawing a tile.
    var srcX = 0,
        srcY = 0,
        destX = 0,
        destY = 0,
        isoX = 0,
        isoY = 0,
        tileId = 0;
    
    for (var x = startX; x < stopX; x++) {
        for (var y = startY; y < stopY; y++) {
            tileId = layer.data[x + y * layer.width] - tileset.firstGID;

            // To prevent negative source rectangle
            if (tileId >= 0) {
                srcX = tileId % nbTileX;
                srcY = Math.floor(tileId / nbTileX);
                srcX = (srcY > 0) ? (srcX % (nbTileX * srcY)) : (srcX % nbTileX);   
                
                destX = ((x + layer.offset.x) - posX) * this.tileWidth;
                destY = ((y + layer.offset.y) - posY) * this.tileHeight;

                if (this.projection === Atlantis.TilemapProjection.Isometric) {
                    isoX = (destX / 2 - destY);
                    isoY = (destX / 2 + destY) / 2;
                    destX = isoX + Atlantis.screen.width / 2;
                    destY = isoY;
                }

                spriteBatch.draw(tileset.texture, { 
                    x: destX, 
                    y: destY, 
                    width: this.tileWidth, 
                    height: this.tileHeight
                }, 
                { 
                    x: tileset.margin + srcX * (tileset.tileWidth + tileset.padding), 
                    y: tileset.margin + srcY * (tileset.tileHeight + tileset.padding), 
                    width: tileset.tileWidth - tileset.padding, 
                    height: tileset.tileHeight - tileset.padding 
                });
            }
        }
    }
};

/**
 * Get a transformed position from isometric world coordinates to screen coordinates.
 * @method isoToScreen
 * @static
 * @param {Number} x The x coordinate on isometric world.
 * @param {Number} y The y coordinate on isometric world.
 * @return {Object} Return an object with transformed coordinates.
 */
Atlantis.Tilemap.isoToScreen = function (x, y) {
    return { x: (2 * y + x) / 2, y: (2 * y - x) / 2 };
};

/**
 * Get a transformed position from screen coordinates to iso coordinates.
 * @method screenToIso
 * @static
 * @param {Number} x The x coordinate on screen.
 * @param {Number} y The y coordinate on screen.
 * @return {Object} Return an object with transformed coordinates.
 */
Atlantis.Tilemap.screenToIso = function (x, y) {
    return { x: (x - y), y: (x + y) / 2 };
};

/**
 * Gets the tile index at the specified position.
 * @method getTileIdAt
 * @param {Number} layerIndex The index of the layer
 * @param {Number} x The position of the tile on X axis.
 * @param {Number} y The postion of the tile on Y axis.
 * @return {Number} Return the id of the tile at this position if exists, otherwise return 0.
 */
Atlantis.Tilemap.prototype.getTileIdAt = function (layerIndex, x, y) {
    if (this.layers[layerIndex]) {
        var layer = this.layers[layerIndex];
        var x = Math.floor(x / this.tileWidth);
        var y = Math.floor(y / this.tileHeight);
        return layer.data[x + y * layer.width];
    }
    
    return 0;
};

Atlantis.Tilemap.prototype.getTileRectAt = function (layerIndex, x, y) {
    var rect = { x: 0, y: 0, width: this.tileWidth, height: this.tileHeight };

    if (this.layers[layerIndex]) {
        var layer = this.layers[layerIndex];
        rect.x = Math.floor(x / this.tileWidth);
        rect.y = Math.floor(y / this.tileHeight);
    }

    return rect;
};

/**
 * Extract a tile from tileset and return a canvas element with the tile drawn in it.
 * It's usefull to do some tests, such as pixel perfect. 
 * Note 1: that it's work with a scale different to 1.
 * Note 2: The extraction is done once, the result is stored in a cache, so you can safely call this method.
 * @method getTileAt
 * @param {Atlantis.Tileset} tileset The tileset to use to extract the tile.
 * @param {Number} layerIndex The index of the layer
 * @param {Number} x The position of the tile on X axis.
 * @param {Number} y The postion of the tile on Y axis.
 * @return {HTMLCanvas} Return a canvas element of the specified tile if exists, otherwise return null.
 */
Atlantis.Tilemap.prototype.getTileAt = function (tileset, layerIndex, x, y) {
    if (this.layers[layerIndex]) {
        var layer = this.layers[layerIndex],
            tileId = this.getTileIdAt(layerIndex, x, y),
            cacheId = [layer.id, "_", tileset.id, "_", tileId].join("");

        if (!this._cacheTilesCanvas[cacheId]) {
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");

            canvas.width = tileset.tileWidth;
            canvas.height = tileset.tileHeight;

            if (tileId >= 0) {
                var nbTileX = tileset.imagewidth / tileset.tilewidth,
                    nbTileY = tileset.imageheight / tileset.tileheight,
                    srcX = tileId % nbTileX,
                    srcY = Math.floor(tileId / nbTileX);

                srcX = (srcY > 0) ? (srcX % (nbTileX * srcY)) : (srcX % nbTileX);   
                    
                context.drawImage(tileset.texture, 
                    { 
                        x: srcX * tileset.tileWidth, 
                        y: srcY * tileset.tileHeight, 
                        width: tileset.tileWidth, 
                        height: tileset.tileHeight 
                    },
                    { 
                        x: 0, 
                        y: 0, 
                        width: this.tileWidth, 
                        height: this.tileHeight
                    }
                );

                this._cacheTilesCanvas[cacheId] = canvas;
                return canvas;
            }
        }
        else {
            return this._cacheTilesCanvas[cacheId];
        }
    }

    return null;
};