/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Define the type of touch event
 * - Invalid
 * - Moved
 * - Pressed
 * - Released
 * @class TouchLocationState
 * @static
 */
Atlantis.TouchLocationState = {
	Invalid: 1, 
    Moved: 2, 
    Pressed: 3, 
    Released: 4
};

/**
 * Define a touch state with a position and a touch state.
 * @class TouchPanelState
 * @constructor
 * @param {Object} panelState An object that contains states and position of the touch event.
 */
Atlantis.TouchPanelState = function (panelState) {
	this.state = panelState.touchState || Atlantis.TouchLocationState.Invalid;
	this.position = new Atlantis.Vector2(+panelState.x|0, +panelState.y|0);
};

/**
 * Gets a clone of this state.
 * @method clone
 * @return {Atlantis.TouchPanelState} Return a clone of this instance.
 */
Atlantis.TouchPanelState.prototype.clone = function () {
	return new Atlantis.TouchPanelState({ touchState: this.state, x: this.position.x, y: this.position.y });
};

/**
 * This class is responsible to manage touch events.
 * @class TouchPanel
 * @constructor
 * @param {HTMLElement} The DOM element to use for events (default is document.body).
 */
Atlantis.TouchPanel = function (domElement) {
	this._states = [];

	var that = this;

	var wrapEvent = function (id, event) {		
		if (!that._states[id]) {
			that._states[id] = { x: 0, y: 0, touchState: -1 };
		}
		
		if (event.touches) {
			that._states[id].x = event.touches[id].pageX - domElement.offsetLeft;
			that._states[id].y = event.touches[id].pageY - domElement.offsetTop;
		}
		else {
			that._states[id].x = event.clientX - domElement.offsetLeft;
			that._states[id].y = event.clientY - domElement.offsetTop;
		}

		if (event.type == "pointerdown" || event.type == "touchstart") {
			that._states[id].touchState = Atlantis.TouchLocationState.Pressed;
		}
		else if (event.type == "pointermove" || event.type == "touchmove") {
			event.preventDefault();
			that._states[id].touchState = Atlantis.TouchLocationState.Moved;
		}
		else if (event.type == "pointerup" || event.type == "touchend") {
			that._states[id].touchState = Atlantis.TouchLocationState.Released;
		}
		else { 
			that._states[id].touchState = Atlantis.TouchLocationState.Invalid;
		}
	};
	
	var onTouchHandler = function (event) {
		var size = event.touches.length;

		if (!size && (event.type === "touchend" || event.type === "touchcancel")) {
			for (var i = 0, l = that._states.length; i < l; i++) {
				that._states[i].touchState = Atlantis.TouchLocationState.Released;
			}
		}
		else {
			that._states.length = size;

			for (var i = 0; i < size; i++) {
				wrapEvent(i, event);
			}
		}
	};
	
	var onPointerHandler = function (event) {
		event.preventDefault();
		wrapEvent(0, event);
	};
	
	// IE11+
	if (window.PointerEvent) {
		domElement.addEventListener("pointerdown", onPointerHandler, false);
		domElement.addEventListener("pointermove", onPointerHandler, false);
		domElement.addEventListener("pointerend", onPointerHandler, false);
		domElement.addEventListener("pointercancel", onPointerHandler, false);
	}
	else {
		domElement.addEventListener("touchstart", onTouchHandler, false);
		domElement.addEventListener("touchmove", onTouchHandler, false);
		domElement.addEventListener("touchend", onTouchHandler, false);
		domElement.addEventListener("touchcancel", onTouchHandler, false);
	}
};

/**
 * Gets the capabilities of the touch panel.
 * @method getCapabilities
 * @return {Object} Return an object which contains touch panel capabilities.
 */
Atlantis.TouchPanel.prototype.getCapabilities = function () {
    return { hasTouch: !!("ontouchstart" in window) || !!("ongesturechange" in window)  }
};

/** 
 * Get the state of the touch panel at this time.
 * @method getState
 * @param {Number} id (optional) A finger id.
 * @return {Array|Atlantis.TouchPanelState} if no finger is passed, it return an array of Atlantis.TouchPanelState,
           otherwise it return an Atlantis.TouchPanelState of the finger id passed in parameter.
 */
Atlantis.TouchPanel.prototype.getState = function (id) {
	if (typeof(id) === "number") {
		return new Atlantis.TouchPanelState(this._states[id] ? this._states[id] : {}) ;
	}
	else {
		var states = [];

		for (var i = 0, l = this._states.length; i < l; i++) {
			states.push(new Atlantis.TouchPanelState(this._states[i]));
		}

		return states;
	}
};