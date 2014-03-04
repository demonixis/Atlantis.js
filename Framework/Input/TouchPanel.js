var Atlantis = window.Atlantis || {};

Atlantis.TouchLocationState = {
	Invalid: 1, Moved: 2, Pressed: 3, Released: 4
};

Atlantis.TouchPanelState = function (panelState) {
	this.state = panelState.touchState || Atlantis.TouchLocationState.Invalid;
	this.position = new Atlantis.Vector2(panelState.x || 0, panelState.y || 0);
};

Atlantis.TouchPanelState.prototype.clone = function () {
	return new Atlantis.TouchPanelState({ state: this.state, position: { x: this.position.x, y: this.position.y } });
};

Atlantis.TouchPanel = function (domElement) {
	this._states = [];

	var that = this;

	var onTouchHandler = function (event) { 
		var size = event.touches.length;
		that._states.length = size;

		for (var i = 0; i < size; i++) {
			that._states[i] = {
				x: event.touches[i].clientX,
				y: event.touches[i].clientY
			};
			
			if (event.type == "touchstart") {
				that._states[i].touchState = Atlantis.TouchLocationState.Pressed;
			}
			else if (event.type == "touchmove") {
				that._states[i].touchState = Atlantis.TouchLocationState.Moved;
			}
			else if (event.type == "touchend") {
				that._states[i].touchState = Atlantis.TouchLocationState.Released;
			}
			else {
				that._states[i].touchState = Atlantis.TouchLocationState.Invalid;
			}
		}
	};

	domElement.addEventListener("touchstart", onTouchHandler, false);
	domElement.addEventListener("touchmove", onTouchHandler, false);
	domElement.addEventListener("touchend", onTouchHandler, false);
	domElement.addEventListener("touchcancel", onTouchHandler, false);
};

Atlantis.TouchPanel.prototype.getCapabilities = function () {

};

Atlantis.TouchPanel.prototype.getState = function (firstOnly) {
	if (firstOnly) { 
		return new Atlantis.TouchPanelState(this._states[0] ? this._states[0] : {}) ;
	}
	else {
		var states = [];

		for (var i = 0, l = this._states.length; i < l; i++) {
			states.push(new Atlantis.TouchPanelState(this._states[i]));
		}

		return states;
	}
};