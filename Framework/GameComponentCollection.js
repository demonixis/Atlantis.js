/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.GameComponentCollection = (function () {
    /**
    * Create a collection of game components.
    * @constructor
    */
    var gameComponentCollection = function () {
        this.components = [];
        this.drawables = [];
        this.initialized = false;
        this.assetLoaded = false;
    };

    /**
    * Initialize logic.
    * @method initialize
    */
    gameComponentCollection.prototype.initialize = function (content) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].initialize();
        }
        this.initialized = true;
    };

    /**
    * Load assets
    * @method loadContent
    */
    gameComponentCollection.prototype.loadContent = function () {
        for (var i = 0, l = this.drawables.length; i < l; i++) {
            this.drawables[i].loadContent();
        }
        this.assetLoaded = true;
    };

    /**
    * Unload assets
    * @method unloadContent
    */
    gameComponentCollection.prototype.unloadContent = function (content) {
        for (var i = 0, l = this.drawables.length; i < l; i++) {
            this.drawables[i].unloadContent();
        }
        this.assetLoaded = false;
    };

    /**
    * Update all components
    * @method update
    * @param {Atlantis.GameTime} gameTime
    */
    gameComponentCollection.prototype.update = function (gameTime) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            if (this.components[i].isEnabled()) {
                this.components[i].update(gameTime);
            }
        }
    };

    /**
    * Draw all components
    * @method draw
    */
    gameComponentCollection.prototype.draw = function (gameTime, context) {
        for (var i = 0, l = this.drawables.length; i < l; i++) {
            if (this.drawables[i].isVisible()) {
                this.drawables[i].draw(gameTime, context);
            }
        }
    };

    /**
    * Add a component to the collection
    * @method add
    * @param {Atlantis.GameComponent} A component or drawable gameComponent to add.
    */
    gameComponentCollection.prototype.add = function (gameComponent) {
        if (this.components.indexOf(gameComponent) == -1) {
            this.components.push(gameComponent);

            if (this.initialized) {
                component.initialize();
            }

            if (gameComponent instanceof Atlantis.DrawableGameComponent) {
                this.drawables.push(gameComponent);

                if (this.assetLoaded) {
                    gameComponent.loadContent();
                }
            }
        }
    };

    /**
    * Remove a component from the collection
    * @method remove
    * @return {Boolean} Return true if the component has been successfully removed.
    */
    gameComponentCollection.prototype.remove = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            this.components.splice(index, 1);
            if (gameComponent instanceof Atlantis.DrawableGameComponent) {
                index = this.drawables.indexOf(gameComponent);
                if (index > -1) {
                    this.drawables.splice(index, 1);
                }
            }
            return true;
        }
        return false;
    };

    /**
    * Get a component from the collection
    * @method get
    */
    gameComponentCollection.prototype.get = function (index) {
        var component = null;
        var pIndex = this.components.indexOf(gameComponent);
        if (pIndex > -1) {
            component = this.components[index];
        }

        return null;
    };

    return gameComponentCollection;
})();