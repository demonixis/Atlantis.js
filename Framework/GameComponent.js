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
    };

    /**
     * Add a component to the collection
     * @method add
     */
    gameComponentCollection.add = function (gameComponent) {
        if (this.components.indexOf(gameComponent) == -1) {
            this.components.push(gameComponent);
        }
    };

    /**
     * Get a component from the collection
     * @method get
     */
    gameComponentCollection.get = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            return this.components[index];
        }

        return null;
    };

    /**
     * Remove a component from the collection
     * @method remove
     */
    gameComponentCollection.remove = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    };

    /**
     * Load assets
     * @method loadContent
     */
    gameComponentCollection.loadContent = function (content) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].loadContent(content);
        }
    };

    /**
     * Update all components
     * @method update
     */
    gameComponentCollection.update = function (gameTime) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].update(gameTime);
        }  
    };

    /**
     * Draw all components
     * @method draw
     */
    gameComponentCollection.draw = function (gameTime, context) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            if (this.components[i] instanceof Atlantis.DrawableGameComponent) {
                this.components[i].draw(gameTime, context);
            }
        }   
    };

    return gameComponentCollection;
})();