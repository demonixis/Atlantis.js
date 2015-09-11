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

Atlantis.TouchCollection = function(touchStates) {
	Array.call(this);

	touchStates = touchStates || [];
	for (var i = 0, l = touchStates.length; i < l; i++) {
		this.push(new Atlantis.TouchPanelState(touchStates[i]));
	}
};

Atlantis.TouchCollection.prototype = Object.create(Array.prototype);

Atlantis.TouchCollection.prototype.clone = function() {
	var states = [];

	for (var i = 0, l = this.length; i < l; i++) {
		states.push(this[i].clone());
	}

	return new Atlantis.TouchCollection(states);
};

/**
 * Define a touch state with a position and a touch state.
 * @class TouchPanelState
 * @constructor
 * @param {Object} panelState An object that contains states and position of the touch event.
 */
Atlantis.TouchPanelState = function(panelState) {
	this.state = panelState.state || Atlantis.TouchLocationState.Invalid;
	this.position = panelState.position ? panelState.position : new Atlantis.Vector2(0, 0);
};

/**
 * Gets a clone of this state.
 * @method clone
 * @return {Atlantis.TouchPanelState} Return a clone of this instance.
 */
Atlantis.TouchPanelState.prototype.clone = function() {
	return new Atlantis.TouchPanelState({
		state: this.state,
		position: {
			x: this.position.x,
			y: this.position.y
		}
	});
};

/**
 * This class is responsible to manage touch events.
 * @class TouchPanel
 * @constructor
 * @param {HTMLElement} The DOM element to use for events (default is document.body).
 */
Atlantis.TouchPanel = function(domElement) {
	this._states = [
		new Atlantis.TouchPanelState({}),
		new Atlantis.TouchPanelState({}),
		new Atlantis.TouchPanelState({})
	];

	var eventNames = {
		up: "touchend",
		down: "touchstart",
		cancel: "touchcancel",
		move: "touchmove",
		callback: null
	};

	var that = this;
	var lastEventType = null;
	var isPointerEvent = false;

	var wrapEvent = function(id, event) {
		if (!that._states[id]) {
			that._states[id] = new Atlantis.TouchPanelState();
		}

		if (event.touches) {
			that._states[id].position.x = event.touches[id].pageX - domElement.offsetLeft;
			that._states[id].position.y = event.touches[id].pageY - domElement.offsetTop;
		} else {
			that._states[id].position.x = event.clientX - domElement.offsetLeft;
			that._states[id].position.y = event.clientY - domElement.offsetTop;
		}

		that._states[id].position.x *= Atlantis.Game.scaleFactor.x;
		that._states[id].position.y *= Atlantis.Game.scaleFactor.y;

		// Special hack for pointer event because in lot of cases, a pointermove event
		// is triggered.
		if (isPointerEvent) {
			var result = (lastEventType === eventNames.down && event.type === eventNames.move);
			lastEventType = event.type;

			if (result) {
				lastEventType = null;
				return;
			}
		}

		if (event.type == eventNames.down) {
			that._states[id].state = Atlantis.TouchLocationState.Pressed;
		} else if (event.type == eventNames.move) {
			event.preventDefault();
			that._states[id].state = Atlantis.TouchLocationState.Moved;
		} else if (event.type == eventNames.up) {
			that._states[id].state = Atlantis.TouchLocationState.Released;
		} else {
			that._states[id].state = Atlantis.TouchLocationState.Invalid;
		}
	};

	var onTouchHandler = function(event) {
		var i = 0,
			l = 0;

		if (event.type === "touchend" || event.type === "touchcancel") {
			for (i = 0, l = that._states.length; i < l; i++) {
				that._states[i].state = event.type === "touchend" ? Atlantis.TouchLocationState.Released : Atlantis.TouchLocationState.Invalid;
			}
		} else {
			for (i = 0, l = event.touches.length; i < l; i++) {
				wrapEvent(i, event);
			}
		}
	};

	var onPointerHandler = function(event) {
		event.preventDefault();
		if (event.type === "MSPointerUp" || event.type === "MSPointerCancel" || event.type === "pointerup" || event.type === "pointercancel") {
			that._states[0].state = (event.type === "MSPointerUp" || event.type === "pointerup") ? Atlantis.TouchLocationState.Released : Atlantis.TouchLocationState.Invalid;
		} else {
			wrapEvent(0, event);
		}
	};

	var maxTouchPoints = +navigator.maxTouchPoints || +navigator.msMaxTouchPoints;
	if (maxTouchPoints === 0) {
		return;
	}

	// IE11+
	if (window.PointerEvent) { // IE11+
		eventNames.up = "pointerup";
		eventNames.down = "pointerdown";
		eventNames.move = "pointermove";
		eventNames.cancel = "pointercancel";
		eventNames.callback = onPointerHandler;
	} else if (window.MSPointerEvent) { // IE10
		eventNames.up = "MSPointerUp";
		eventNames.down = "MSPointerDown";
		eventNames.move = "MSPointerMove";
		eventNames.cancel = "MSPointerCancel";
		eventNames.callback = onPointerHandler;
	} else { // Touch events
		eventNames.callback = onTouchHandler;
	}

	isPointerEvent = (eventNames.down !== "touchstart");

	domElement.addEventListener(eventNames.down, eventNames.callback, false);
	domElement.addEventListener(eventNames.move, eventNames.callback, false);
	domElement.addEventListener(eventNames.up, eventNames.callback, false);
	domElement.addEventListener(eventNames.cancel, eventNames.callback, false);
};

/**
 * Gets the capabilities of the touch panel.
 * @method getCapabilities
 * @return {Object} Return an object which contains touch panel capabilities.
 */
Atlantis.TouchPanel.prototype.getCapabilities = function() {
	return {
		hasTouch: !!("ontouchstart" in window) || !!("ongesturechange" in window)
	};
};

/** 
 * Get the state of the touch panel at this time.
 * @method getState
 * @param {Number} id (optional) A finger id.
 * @return {Atlantis.TouchCollection|Atlantis.TouchPanelState} if no finger is passed, it return an array of Atlantis.TouchPanelState,
 *         otherwise it returns an Atlantis.TouchPanelState of the finger id passed in parameter.
 */
Atlantis.TouchPanel.prototype.getState = function(id) {
	if (typeof(id) === "number") {
		return new Atlantis.TouchPanelState(this._states[id] ? this._states[id] : {});
	} else {
		return new Atlantis.TouchCollection(this._states);
	}
};