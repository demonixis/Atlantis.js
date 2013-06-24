/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * An interface for game components
 */
Atlantis.GameComponent = (function () {
    /**
    * Create a game component.
    * @constructor
    * @class GameComponent
    * @param {Atlantis.Game} game A game instance.
    */
    var gameComponent = function (game) {
        this.game = game;
        this.visible = true;
        this.enabled = true;
    };

     /**
    * Determine the activity of the state.
    * @method isActive
    * @return {Boolean} Return true if the state is visible and enabled.
    */
    gameComponent.prototype.isActive = function () {
        return this.visible && this.enabled;
    };

    /**
     * Sets the activity of the state.
     * @method setActive
     * @param {Boolean} Sets to true to active the state.
     */
    gameComponent.prototype.setActive = function (isActive) {
        this.enabled = isActive;
        this.visible = isActive;
    };

    /**
    * Initialize the logic of the component.
    * @method initialize
    */
    gameComponent.prototype.initialize = function () { };

    /**
    * Update the logic of the component.
    * @method update
    * @param {Atlantis.GameTime} gameTime
    */
    gameComponent.prototype.update = function (gameTime) { };

    return gameComponent;
})();

/**
 * An interface for drawable game components.
 */
Atlantis.DrawableGameComponent = (function () {
    /**
     * Create a drawable game component.
     * @constructor
     * @class DrawableGameComponent
     * @param {Atlantis.Game} game A game instance.
     */
    var drawableGameComponent = function (game) {
        Atlantis.GameComponent.call(this, game);
    };

    drawableGameComponent.prototype = new Atlantis.GameComponent();
    
    /** 
     * Draw the component on screen.
     * @method draw
     * @param {Atlantis.GameTime} gameTime
     * @param {Object} context The canvas context.
     */
    drawableGameComponent.prototype.draw = function (gameTime, context) { };

    return drawableGameComponent;
})();

/**
 * A collection who'll initialize, load, update and draw components.
 */
Atlantis.GameComponentCollection = (function () {
    /**
    * Create a collection of game components.
    * @constructor
    */
    var gameComponentCollection = function () {
        this.components = [];
        this.drawables = [];
    };

    /**
    * Add a component to the collection
    * @method add
    */
    gameComponentCollection.prototype.add = function (gameComponent) {
        if (this.components.indexOf(gameComponent) == -1) {
            this.components.push(gameComponent);
            if (gameComponent instanceof Atlantis.DrawableGameComponent) {
                this.drawables.push(gameComponent);
            }
        }
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

    /**
    * Remove a component from the collection
    * @method remove
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
        }
    };

    /**
    * Initialize logic.
    * @method initialize
    */
    gameComponentCollection.prototype.initialize = function (content) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].initialize();
        }
    };

    /**
    * Load assets
    * @method loadContent
    */
    gameComponentCollection.prototype.loadContent = function (content) {
        for (var i = 0, l = this.drawables.length; i < l; i++) {
            this.drawables[i].loadContent(content);
        }
    };

    /**
    * Update all components
    * @method update
    */
    gameComponentCollection.prototype.update = function (gameTime) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            if (this.components[i].enabled) {
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
            if (this.drawables[i].visible) {
                this.drawables[i].draw(gameTime, context);
            }
        }
    };

    return gameComponentCollection;
})();