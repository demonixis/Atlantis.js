/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.DrawableGameComponent = (function () {
    /**
    * Create a drawable game component.
    * @constructor
    * @class DrawableGameComponent
    * @param {Atlantis.Game} game A game instance.
    */
    var drawableGameComponent = function (game) {
        Atlantis.GameComponent.call(this, game);
        this.visible = true;
        this.assetLoaded = false;
    };

    drawableGameComponent.prototype = new Atlantis.GameComponent();

    /**
    * Load assets of the component.
    * @method loadContent
    */
    drawableGameComponent.prototype.loadContent = function () {
        this.assetLoaded = true;
    };

    /**
    * Unload and dispose all assets of the component.
    * @method unloadContent
    */
    drawableGameComponent.prototype.unloadContent = function () {
        this.assetLoaded = false;
    };

    /** 
    * Draw the component on screen.
    * @method draw
    * @param {Atlantis.GameTime} gameTime
    * @param {Object} context The canvas context.
    */
    drawableGameComponent.prototype.draw = function (gameTime, context) { };

    return drawableGameComponent;
})();