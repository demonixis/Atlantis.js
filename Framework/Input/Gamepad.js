/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Define buttons for the gamepad
 * @class GamepadButton
 * @static
 */
Atlantis.GamepadButton = {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LeftShoulder: 4,
    RightShoulder: 5,
    LeftTrigger: 6,
    RightTrigger: 7,
    Select: 8,
    Start: 9,
    L3: 10,
    R3: 11,
    DPadUp: 12,
    DPadDown: 13,
    DPadLeft: 14,
    DPadRight: 15
};

/**
 * Define axis for the gamepad
 * @class GamepadAxis
 * @static
 */
Atlantis.GamepadAxis = {
    Horizontal: 0,
    Vertical: 1,
    HorizontalRight: 2,
    VerticalRight: 3
};

// ---
// --- GamepadState implementation
// ---

/**
 * Define the state of the gamepad at a specified time
 * @class GamepadState
 * @constructor
 * @param {Array} axis An array of axis values
 * @param {Array} buttons An array of buttons values (true/false)
 */
Atlantis.GamepadState = function(axis, buttons) {
    this.axis = [];
    this.buttons = [];
    var i = 0,
        l = 0;

    if (axis) {
        for (i = 0, l = axis.length; i < l; i++) {
            this.axis.push(axis[i]);
        }
    } else {
        for (i = 0; i < 6; i++) {
            this.axis.push(0);
        }
    }

    if (buttons) {
        for (i = 0, l = buttons.length; i < l; i++) {
            this.buttons.push(buttons[i]);
        }
    } else {
        for (i = 0; i < 15; i++) {
            this.buttons.push(false);
        }
    }
};

/**
 * Indicate if the button is down.
 * @method isButtonDown
 * @param (Number|Atlantis.GamepadButton) The identifier of the button
 * @param {Boolean|Number} Return the value of the button.
 */
Atlantis.GamepadState.prototype.isButtonDown = function(button) {
    return this.buttons[button];
};

/**
 * Indicate if the button is up.
 * @method isButtonUp
 * @param (Number|Atlantis.GamepadButton) The identifier of the button
 * @param {Boolean|Number} Return the value of the button.
 */
Atlantis.GamepadState.prototype.isButtonUp = function(button) {
    return !this.buttons[button];
};

/**
 * Gets the value of an axis.
 * @method getAxis
 * @param (Number|Atlantis.GamepadAxis) The identifier of the axis
 * @param {Number} Return the value of the axis between -1 and 1.
 */
Atlantis.GamepadState.prototype.getAxis = function(axis) {
    return this.axis[axis];
};

// ---
// --- Gamepad implementation
// ---

/**
 * The gamepad class is responsible to manage gamepads connected to the device.
 * @class Gamepad
 * @constructor
 * @extends Atlantis.GameComponent
 */
Atlantis.Gamepad = function() {
    Atlantis.GameComponent.call(this);
    this._gamepads = [];
    this._states = {};
};

Atlantis.Gamepad.prototype = Object.create(Atlantis.GameComponent.prototype);

/**
 * Initialize the component and start event listeners
 * @method initialize
 */
Atlantis.Gamepad.prototype.initialize = function() {
    var that = this;

    navigator.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads || navigator.msGetGamepads || navigator.webkitGamepads;

    this._gamepadsSupported = navigator.getGamepads ? true : false;

    window.addEventListener("gamepadconnected", function(event) {
        that._addGamepad(event.gamepad);
    }, false);

    window.addEventListener("gamepaddisconnected", function(event) {
        that._removeGamepad(event.gamepad);
    }, false);
};

// Add a gamepad
Atlantis.Gamepad.prototype._addGamepad = function(gamepad) {
    this._gamepads.push(gamepad);
    this._states[gamepad.index] = new Atlantis.GamepadState();
};

// Remove a gamepad
Atlantis.Gamepad.prototype._removeGamepad = function(gamepad) {
    delete this._gamepads[gamepad.index];
    delete this._states[gamepad.index];
};

Atlantis.Gamepad.prototype._updateGamepads = function() {
    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (this._gamepads.indexOf(gamepads[i]) === -1) {
                this._addGamepad(gamepads[i]);
            }
        }
    }
};

/**
 * Update states of connected gamepads
 * @method update
 * @param {Atlantis.GameTime} gameTime
 */
Atlantis.Gamepad.prototype.update = function(gameTime) {
    if (this._gamepadsSupported) {
        var j = 0,
            m = 0;

        this._updateGamepads();

        for (var i = 0, l = this._gamepads.length; i < l; i++) {
            var gamepad = this._gamepads[i];

            for (j = 0, m = gamepad.buttons.length; j < m; j++) {
                var btnVal = gamepad.buttons[j];
                var pressed = (btnVal === 1.0) ? true : false;

                if (typeof(btnVal) == "object") {
                    pressed = btnVal.pressed;
                    btnVal = btnVal.value;
                }

                this._states[gamepad.index].buttons[j] = pressed;
            }

            for (j = 0, m = gamepad.axes.length; j < m; j++) {
                this._states[gamepad.index].axis[j] = +gamepad.axes[j] | 0;
            }
        }
    }
};

/**
 * Gets the state of the gamepad
 * @method getState
 * @return {Atlantis.GamepadState} Return the state at this time.
 */
Atlantis.Gamepad.prototype.getState = function(index) {
    index = (typeof(index) !== "undefined") ? index : 0;
    if (this._gamepads[index]) {
        return new Atlantis.GamepadState(this._states[index].axis, this._states[index].buttons);
    } else {
        return new Atlantis.GamepadState();
    }
};