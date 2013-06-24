/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

/** 
* Keys alias
* @property Keys
*/
Atlantis.Keys = {
    up: 38, down: 40, left: 37, right: 39,
    space: 32, escape: 27
};

Atlantis.KeyboardState = (function () {
    /**
     * Define a keyboard state.
     * @class
     * @constructor
     */
    var keyState = function (keys) {
        this.keys = keys;
    };

    /**
	 * Determine if the key is pressed.
     * @method isKeyDown
	 * @param {Number} button The button to test.
	 * @return {Boolean} Return true if the key is pressed.
	 */
    keyState.prototype.isKeyDown = function (key) {
        return this.keys[key] == true;
    };

    /**
	 * Determine if the key is pressed.
     * @method isKeyUp
	 * @param {Number} button The button to test.
	 * @return {Boolean} Return true if the key is released.
	 */
    keyState.prototype.isKeyUp = function (key) {
        return this.keys[key] == false;
    };
})();

Atlantis.KeyboardManager = (function () {
    var _instance = null;

    /**
    * A keyboard input manager.
    * @constructor
    * @class KeyboardManager
    */
    var keyboardManager = function (maxKeys) {
        this.keys = [];
        this.maxKeys = maxKeys || 110;

        for (var i = 0; i < maxKeys; i++) {
            this.keys[i] = false;
        }

        this.preventDefault = true;
        _instance = this;
    };

    /**
    * Initialize keyboard event handlers.
    * @method initialize
    */
    keyboardManager.prototype.initialize = function () {
        document.addEventListener("keydown", this.onKeyStateChange, false);
        document.addEventListener("keyup", this.onKeyStateChange, false);
    };

    /**
     * Gets the current state of the keyboard.
     * @method getState
     * @return {Atlantis.KeyboardState} Return the state of the keyboard.
     */
    keyboardManager.prototype.getState = function () {
        return new Atlantis.KeyboardState(this.keys);
    };

    /**
    * Event handler - Function called on keyboard event.
    * @method onKeyStateChange
    * @param {Object} event The event object.
    * @param {Object} instance The current instance.
    */
    keyboardManager.prototype.onKeyStateChange = function (event) {
        if (_instance.preventDefault) {
            event.preventDefault();
        }

        _instance.keys[event.keyCode] = (event.type == "keydown") ? true : false;
    };

    return keyboardManager;
})();