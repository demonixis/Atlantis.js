/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

// --------------------------------------- //
// ---  Keyboard State implementation  --- //
// --------------------------------------- //

/**
 * Define a keyboard state.
 * @class KeyboardState
 * @constructor
 */
Atlantis.KeyboardState = function(keys) {
    this.keys = [];
    // Cloning the array
    for (var i = 0, l = keys.length; i < l; i++) {
        this.keys.push(keys[i]);
    }
};

Atlantis.KeyboardState.prototype.clone = function() {
    return new Atlantis.Input.KeyboardState(this.keys);
};

/**
 * Determine if the key is pressed.
 * @method isKeyDown
 * @param {Number} button The button to test.
 * @return {Boolean} Return true if the key is pressed.
 */
Atlantis.KeyboardState.prototype.isKeyDown = function(key) {
    return this.keys[key] === true;
};

/**
 * Determine if the key is pressed.
 * @method isKeyUp
 * @param {Number} button The button to test.
 * @return {Boolean} Return true if the key is released.
 */
Atlantis.KeyboardState.prototype.isKeyUp = function(key) {
    return this.keys[key] === false;
};

// --------------------------------------- //
// --- Keyboard Manager implementation --- //
// --------------------------------------- //

/**
 * A keyboard input manager.
 * @constructor
 * @class KeyboardManager
 */
Atlantis.Keyboard = function(maxKeys) {
    this.keys = [];
    this.maxKeys = maxKeys || 130;

    for (var i = 0; i < maxKeys; i++) {
        this.keys[i] = false;
    }

    var that = this;

    var onKeyStateChange = function(event) {
        if (Atlantis.Keyboard.preventDefault) {
            event.preventDefault();
        }

        that.keys[event.keyCode] = (event.type === "keydown") ? true : false;
    };

    document.addEventListener("keydown", onKeyStateChange, false);
    document.addEventListener("keyup", onKeyStateChange, false);
};

Atlantis.Keyboard.preventDefault = false;

/**
 * Gets the current state of the keyboard.
 * @method getState
 * @return {Atlantis.KeyboardState} Return the state of the keyboard.
 */
Atlantis.Keyboard.prototype.getState = function() {
    return new Atlantis.KeyboardState(this.keys);
};