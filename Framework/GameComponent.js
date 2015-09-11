/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

// ---------------------- //
// --- Game Component --- //
// ---------------------- //

/**
 * Create a game component.
 * @constructor
 * @class GameComponent
 * @param {Atlantis.Game} game A game instance.
 */
Atlantis.GameComponent = function(game) {
    this.game = game;
    this.enabled = true;
    this.initialized = false;
};

/**
 * Initialize the logic of the component.
 * @method initialize
 */
Atlantis.GameComponent.prototype.initialize = function() {
    this.initialized = true;
};

/**
 * Update the logic of the component.
 * @method update
 * @param {Atlantis.GameTime} gameTime
 */
Atlantis.GameComponent.prototype.update = function(gameTime) {};

// ---
// --- Getters and setters
// ---

/**
 * Gets the status of the component.
 * @method isEnabled
 * @return {Boolean} The status of the component.
 */
Atlantis.GameComponent.prototype.isEnabled = function() {
    return this.enabled;
};

/**
 * Flags used to determine if the initialization processes is done.
 * @method isInitialized
 * @return {Boolean}
 */
Atlantis.GameComponent.prototype.isInitialized = function() {
    return this.initialized;
};

/**
 * Gets the status of the component.
 * @method @setEnabled
 * @param {Boolean} enabled Sets to true to enable
 */
Atlantis.GameComponent.prototype.setEnabled = function(enabled) {
    this.enabled = enabled;
};

// ------------------------------------------------ //
// ---  Drawable Game Component implementation  --- //
// ------------------------------------------------ //

/**
 * Create a drawable game component.
 * @constructor
 * @class DrawableGameComponent
 * @extends Atlantis.GameComponent
 * @param {Atlantis.Game} game A game instance.
 */
Atlantis.DrawableGameComponent = function(game) {
    Atlantis.GameComponent.call(this, game);
    this.visible = true;
    this.assetLoaded = false;
};

Atlantis.DrawableGameComponent.prototype = new Atlantis.GameComponent();

/**
 * Load assets of the component.
 * @method loadContent
 */
Atlantis.DrawableGameComponent.prototype.loadContent = function() {
    this.assetLoaded = true;
};

/**
 * Unload and dispose all assets of the component.
 * @method unloadContent
 */
Atlantis.DrawableGameComponent.prototype.unloadContent = function() {
    this.assetLoaded = false;
};

/** 
 * Draw the component on screen.
 * @method draw
 * @param {Atlantis.GameTime} gameTime
 * @param {Object} context The canvas context.
 */
Atlantis.DrawableGameComponent.prototype.draw = function(gameTime, context) {};

/**
 * Gets the visibility of the component.
 * @method isVisible
 * @return {Boolean} Return true if visible otherwise return false
 */
Atlantis.DrawableGameComponent.prototype.isVisible = function() {
    return this.isVisible;
};

/**
 * Set the component visible or invisible
 * @method setVisible
 * @param visible
 */
Atlantis.DrawableGameComponent.prototype.setVisible = function(visible) {
    this.isVisible = visible;
};

// ------------------------------------------------ //
// --- Game Component Collection implementation --- //
// ------------------------------------------------ //

/**
 * Create a collection of game components.
 * @constructor
 */
Atlantis.GameComponentCollection = function() {
    this.components = [];
    this.drawables = [];
    this.initialized = false;
    this.assetLoaded = false;
};

/**
 * Initialize logic.
 * @method initialize
 */
Atlantis.GameComponentCollection.prototype.initialize = function(content) {
    for (var i = 0, l = this.components.length; i < l; i++) {
        this.components[i].initialize();
    }
    this.initialized = true;
};

/**
 * Load assets
 * @method loadContent
 */
Atlantis.GameComponentCollection.prototype.loadContent = function() {
    for (var i = 0, l = this.drawables.length; i < l; i++) {
        this.drawables[i].loadContent();
    }
    this.assetLoaded = true;
};

/**
 * Unload assets
 * @method unloadContent
 */
Atlantis.GameComponentCollection.prototype.unloadContent = function() {
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
Atlantis.GameComponentCollection.prototype.update = function(gameTime) {
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
Atlantis.GameComponentCollection.prototype.draw = function(gameTime, context) {
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
Atlantis.GameComponentCollection.prototype.add = function(gameComponent) {
    if (this.components.indexOf(gameComponent) == -1) {
        this.components.push(gameComponent);

        if (this.initialized) {
            gameComponent.initialize();
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
Atlantis.GameComponentCollection.prototype.remove = function(gameComponent) {
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
 * Get a component from the collection by its index
 * @method get
 * @param {Number} index The index of the component.
 * @return {Component} Returns the component if it exists, otherwise it returns `null`.
 */
Atlantis.GameComponentCollection.prototype.get = function(index) {
    if (index > -1 && index < this.components.length) {
        return this.components[index];
    }

    return null;
};