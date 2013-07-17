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
        this.enabled = true;
        this.initialized = false;
    };

    /**
    * Initialize the logic of the component.
    * @method initialize
    */
    gameComponent.prototype.initialize = function () {
        this.initialized = true;
    };

    /**
    * Update the logic of the component.
    * @method update
    * @param {Atlantis.GameTime} gameTime
    */
    gameComponent.prototype.update = function (gameTime) { };

    // ---
    // --- Getters and setters
    // ---

    /**
	 * Gets the status of the component.
     * @method isEnabled
	 * @return {Boolean} The status of the component.
	 */
	gameComponent.prototype.isEnabled = function () {
		return this.enabled;
	};
	
	/**
	 * Flags used to determine if the initialization processes is done.
     * @method isInitialized
	 * @return {Boolean}
	 */
	gameComponent.prototype.isInitialized = function () {
		return this.initialized;
	};

	/**
	 * Gets the status of the component.
     * @method @setEnabled
	 * @param {Boolean} enabled Sets to true to enable
	 */
	gameComponent.prototype.setEnabled = function (enabled) {
		this.enabled = enabled;
	};

    return gameComponent;
})();