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
	this.position = new Atlantis.Vector2(panelState.x || 0, panelState.y || 0);
};

/**
 * Gets a clone of this state.
 * @method clone
 * @return {Atlantis.TouchPanelState} Return a clone of this instance.
 */
Atlantis.TouchPanelState.prototype.clone = function () {
	return new Atlantis.TouchPanelState({ state: this.state, position: { x: this.position.x, y: this.position.y } });
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
		event.preventDefault();
		
		if (!that._states[id]) {
			that._states[id] = { x: 0, y: 0, touchState: -1 };
		}
		
		that._states[id].x = event.touches[id].clientX;
		that._states[id].y = event.touches[id].clientY;
			
		if (event.type == "pointerdown" || event.type == "touchstart") {
			that._states[id].touchState = Atlantis.TouchLocationState.Pressed;
		}
		else if (event.type == "pointermove" || event.type == "touchmove") {
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
		event.preventDefault();
		
		var size = event.touches.length;
		that._states.length = size;

		for (var i = 0; i < size; i++) {
			wrapEvent(i, event.touches[i]);
		}
	};
	
	var onPointerHandler = function (event) {
		event.preventDefault();
		
		// Start at 2 for touch, but internaly we need 0
		var pointerId = event.pointerId - 2;
		wrapEvent(pointerId, event);
	};
	
	// All world except IE.
	domElement.addEventListener("touchstart", onTouchHandler, false);
	domElement.addEventListener("touchmove", onTouchHandler, false);
	domElement.addEventListener("touchend", onTouchHandler, false);
	domElement.addEventListener("touchcancel", onTouchHandler, false);
	
	// IE11+
	domElement.addEventListener("pointerdown", onPointerHandler, false);
	domElement.addEventListener("pointermove", onPointerHandler, false);
	domElement.addEventListener("pointerend", onPointerHandler, false);
	domElement.addEventListener("pointercancel", onPointerHandler, false);
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