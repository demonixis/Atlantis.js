/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.GameTime = (function () {
    /**
    * Create a game time object who's responsible to get time informations.
    * @constructor
    * @class GameTime
    */
    var gameTime = function () {
        this.reset();
    };

    /**
    * Reset the game timer.
    * @method reset
    */
    gameTime.prototype.reset = function () {
        this.elapsedTime = 0;
        this.totalGameTime = 0;
        this.currentTime = +new Date();
        this.fps = 0;
    };

    /**
    * Update the game time.
    * @method update
    */
    gameTime.prototype.update = function () {
        var now = +new Date();
        this.elapsedTime = now - this.currentTime;
        this.totalGameTime += this.elapsedTime;
        this.fps = 1000 / (now - this.currentTime);
        this.currentTime = now;
    };

    /**
    * Gets the elapsed time since last frame.
    * @method getElapsedTime
    * @return {Number} The elapsed time since last frame.
    */
    gameTime.prototype.getElapsedTime = function () {
        return this.elapsedTime;
    };

    /**
    * Gets the total elapsed time since the begining.
    * @method getTotalGameTime
    * @return {Number} The total elapsed time.
    */
    gameTime.prototype.getTotalGameTime = function () {
        return this.totalGameTime;
    };

    /**
	 * Gets the current FPS indice.
     * @method getFPS
	 * @return {Number} Return the current FPS.
	 */
	gameTime.prototype.getFPS = function () {
		return this.fps;
	}

    return gameTime;
})();