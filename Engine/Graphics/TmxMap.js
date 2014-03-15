/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A loader of tilemap created with Tiled and exported in JSON
 * @class TmxMap
 * @constructor
 * @param {String} mapPath The path of the map to load.
 */
Atlantis.TmxMap = function (mapPath) {
    this.mapPath = mapPath;
    this.height = 0;
    this.height = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.layers = [];
    this.tilesets = [];
    this.tilesetTextures = [];
    this.backgroundTextures = [];
    this.orientation = "orthogonal";
    this.properties = {};
    this.version = 0;
    this._loaded = false;
};

Atlantis.TmxMap.prototype.loadContent = function (content, callback) {
    var that = this;

    content.load(this.mapPath, function (map) {
        var i = 0,
            l = 0;

        for (i = 0, l = map.layers.length; i < l; i++) {
            that.layers.push(map.layers[i]);
            
            if (map.layers[i].image) {
                that.backgroundTextures.push(content.load(map.layers[i].image));
            }
        }

        for (i = 0, l = map.tilesets.length; i < l; i++) {
            that.tilesets.push(map.tilesets[i]);
            that.tilesetTextures.push(content.load(map.tilesets[i].image));
            that.tilesetTextures[i].width = map.tilesets[i].imagewidth;
            that.tilesetTextures[i].height = map.tilesets[i].imageheight;
        }

        that.height = map.height;
        that.width = map.width;
        that.tileWidth = map.tilewidth;
        that.tileHeight = map.tileheight;
        that.mapWidth = that.width * that.tileWidth;
        that.mapHeight = that.height * that.tileHeight;
        that.version = map.version
        that.properties = map.properties;
        that._loaded = true;
        
        if (callback) {
            callback(that);
        }
    });
};

Atlantis.TmxMap.prototype.getTileId = function (layerIndex, camera, x, y) {
    var layer = this.layers[layerIndex];
    var x = Math.floor((x + camera.x) / this.tileWidth);
    var y = Math.floor((y + camera.y) / this.tileHeight);
    return layer.data[x + y * layer.width];
};

/**
 * Draw the map relative to a camera position.
 * @method draw
 * @param {Atlantis.SpriteBatch} spriteBatch The SpriteBatch to use to draw the map.
 * @param {Atlantis.Camera2D} camera The camera used in the scene.
 */
Atlantis.TmxMap.prototype.draw = function (spriteBatch, camera) {
    if (this._loaded) {
        for (var i = 0, l = this.layers.length; i < l; i++) {
            if (this.layers[i].visible) {
                if (this.layers[i].type === "imagelayer") {
                    spriteBatch.draw(this.backgroundTextures[i], { x: 0, y: 0 });
                }
                else if (this.layers[i].type === "tilelayer") {
                    this._drawLayer(spriteBatch, camera, this.layers[i], this.tilesets[0]);
                }
            }
        }
    }
};

Atlantis.TmxMap.prototype._drawLayer = function (spriteBatch, camera, layer, tileset) {
    var nbTileX = tileset.imagewidth / tileset.tilewidth,
        nbTileY = tileset.imageheight / tileset.tileheight;
    
    var posX = camera.x / this.tileWidth,
        posY = camera.y / this.tileHeight,
        startX = Math.floor(posX),
        startY = Math.floor(posY),
        stopX = Math.min(Math.round((camera.x + Atlantis.screen.width) / tileset.tilewidth) + 1, layer.width),
        stopY = Math.min(Math.round((camera.y + Atlantis.screen.height) / tileset.tileheight) + 1, layer.height);
    
    var srcX = 0,
        srcY = 0,
        tileId = 0;
    
    for (var x = startX; x < stopX; x++) {
        for (var y = startY; y < stopY; y++) {
            tileId = layer.data[x + y * layer.width] - tileset.firstgid;

            if (tileId >= 0) {
                srcX = tileId % nbTileX;
                srcY = Math.floor(tileId / nbTileX);
                srcX = (srcY > 0) ? (srcX % (nbTileX * srcY)) : (srcX % nbTileX);   
                
                spriteBatch.draw(this.tilesetTextures[0], { 
                    x: (x - posX) * this.tileWidth, 
                    y: (y - posY) * this.tileHeight, 
                    width: this.tileWidth, 
                    height: this.tileHeight
                }, 
                { 
                    x: srcX * tileset.tilewidth, 
                    y: srcY * tileset.tileheight, 
                    width: tileset.tilewidth, 
                    height: tileset.tileheight 
                });
            }
        }
    }
};