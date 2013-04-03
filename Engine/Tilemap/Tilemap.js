 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

 var Atlantis = window.Atlantis || {};

Atlantis.Tilemap = (function () {
    /**
     * A tilemap.
     * @constructor
     * @class Tilemap
     * @param {Array} layers A collection of Atlantis.Layer or an instance of Altantis.Layer
     */
    var tilemap = function (layers) {
        this.layers = [];
        this.camera = new Atlantis.Rectangle();

        if (layers instanceof Array) {
            for (var i = 0, l = layers.length; i < l; i++) {
                this.layers.push(layers[i]);
            }
        } 
        else {
            this.layers.push(layers);
        }
    };

    /**
     * Load assets from all layers.
     * @method loadContent
     */
    tilemap.prototype.loadContent = function (content) {
        for (var i = 0, l = this.layers.length; i < l; i++) {
            this.layers[i].loadContent(content);  
        }
    };

    /**
     * Draw layers on screen.
     * @method draw
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     * @param {Object} context The canvas context.
     */
    tilemap.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            for (var i = 0, l = this.layers.length; i < l; i++) {
                this.layers[i].draw(gameTime, context, this.camera);  
            }
        }
    };

    return tilemap;
})();