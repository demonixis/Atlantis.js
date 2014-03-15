/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* Define a button state which is released or pressed.
* @class ButtonState
* @static
*/
Atlantis.ButtonState = { Released: 0, Pressed: 1 };

// ---
// --- MouseState implementation
// ---

/**
 * Define a mouse state.
 * @class MouseState
 * @constructor
 * @param {Number} x The position of the cursor on X axis.
 * @param {Number} y The position of the cursor on Y axis.
 * @param {Number} scroolWheelValue The value of the scroll
 * @param {Array} buttons An array with the states of each buttons
 */
Atlantis.MouseState = function (x, y, scrollWheelValue, buttons) {
	this.x = x;
	this.y = y;
	this.scrollWheelValue = scrollWheelValue;
	this.leftButton = buttons[0];
	this.rightButton = buttons[2];
	this.middleButton = buttons[1];
};

/**
 * Clone the current state.
 * @method clone
 * @return {Atlantis.MouseState} Return a clone of this instance.
 */
Atlantis.MouseState.prototype.clone = function () {
    return new Atlantis.MouseState(this.x, this.y, this.scrollWheelValue, [this.leftButton, this.middleButton, this.rightButton]);
};

// ---
// --- Mouse implementation
// ---

/**
 * The Mouse class is responsible to manage mouse events.
 * @class Mouse
 * @constructor
 * @param {HTMLElement} domElement The DOM element to use (default is document.body).
 */
Atlantis.Mouse = function (domElement) {
	var domElement = (domElement instanceof HTMLElement) ? domElement : document.body;
	this._x = 0;
	this._y = 0;
	this._scroll = 0;
	this._buttons = [];
	this._buttons[0] = false; // Left
	this._buttons[1] = false; // Middle
	this._buttons[2] = false; // Right
    this.preventDefault = true;

	var that = this;

	var resetButtonState = function () {
		that._buttons[0] = false;
		that._buttons[1] = false;
		that._buttons[2] = false;
	};

	var onMouseEvent = function (event) {
        if (that.preventDefault)
            event.preventDefault();
        
		that._x = event.offsetX || event.layerX;
		that._y = event.offsetY || event.layerY;

		resetButtonState();
        
        that._buttons[event.button] = (event.type === "mousedown") ? true : false;
        
        if (event.button > 0 && event.type === "mousemove") {
            that._buttons[event.button] = true;
        }
	};

	var onMouseScroll = function (event) {
		that._scroll = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	};

	domElement.addEventListener("mousedown", onMouseEvent, false);
	domElement.addEventListener("mousemove", onMouseEvent, false);
	domElement.addEventListener("mouseup", onMouseEvent, false);
	domElement.addEventListener("click", onMouseEvent, false);
	domElement.addEventListener("mousewheel", onMouseScroll, false);
	domElement.addEventListener("DOMMouseScroll", onMouseScroll, false);
};

/**
 * Gets the state of the mouse.
 * @method getState
 * @return {Atlantis.MouseState} Return the state of the mouse at this time.
 */
Atlantis.Mouse.prototype.getState = function () {
	return new Atlantis.MouseState(this._x, this._y, this._scroll, this._buttons);
};