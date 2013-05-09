/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

Atlantis.KeyboardManager = (function () {
    /** 
     * Keys alias
     * @property Keys
     */
    Atlantis.Keys = {
        up: 38, down: 40, left: 37, right: 39, 
        space: 32, escape: 27  
    };

    /**
     * A keyboard input manager.
     * @constructor
     * @class KeyboardManager
     */
    var keyboardManager = function () {
        this.keys = [];

        for (var i = 0; i < 110; i++) {
            this.keys[i] = false;
        }

        this.preventDefault = true;
    };

    /**
     * Initialize keyboard event handlers.
     * @method initialize
     */
    keyboardManager.prototype.initialize = function () {
        resetKeyState(this.keys);

        var that = this;
        document.addEventListener("keydown", function (event) { that.onKeyStateChange(event, that); }, false);
        document.addEventListener("keyup", function (event) { that.onKeyStateChange(event, that); }, false);
    };

    /**
     * Event handler - Function called on keyboard event.
     * @method onKeyStateChange
     * @param {Object} event The event object.
     * @param {Object} instance The current instance.
     */
    keyboardManager.prototype.onKeyStateChange = function (event, instance) {
        if (instance.preventDefault) {
            event.preventDefault();
        }
        
        var pressed = event.type == "keydown" ? true : false;

        instance.keys[event.keyCode] = pressed;
    };

    function resetKeyState(keys) {
        for (var i = 0; i < 110; i++) {
            keys[i] = false;
        }
    }

    return keyboardManager;
})();