/**
* AtlantisEngine.js a lightweight JavaScript game engine.
*
* @module Atlantis
* @submodule Engine
* @namespace Atlantis
*/
var Atlantis = window.Atlantis || {};

Atlantis.TouchComponent = (function () {
    var touchComponent = function (game) {
    	Atlantis.GameComponent.call(this, game);
    	this.sensibility = new Atlantis.Vector2(1, 1);
    	this.deadZone = new Atlantis.Vector2(0, 0);
    	this.maxDelta = 100;
    	this.maxFingerPoints = 3; 
    	this._touchCollection = null;
    	this._lastTouchCollection = null;
    	this._moved = [];
    	this._pressed = [];
    	this._released = [];
    	this._position = [];
    	this._lastPosition = [];
    	this._needUpdate = false;
    	this._cacheVec2 = new Atlantis.Vector2(0, 0);
    };

    touchComponent.prototype = Object.create(Atlantis.GameComponent.prototype);

    touchComponent.prototype.initialize = function () {
    	Atlantis.GameComponent.prototype.initialize(this);
    	this._touchCollection = this.game.touchPanel.getState();
    	this._lastTouchCollection = this.game.touchPanel.getState();

    	this._moved.length = 0;
    	this._pressed.length = 0;
    	this._released.length = 0;
    	this._position.length = 0;
    	this._lastPosition.length = 0;

    	for (var i = 0; i < this.maxFingerPoints; i++) {
    		this._moved.push(false);
    		this._pressed.push(false);
    		this._released.push(false);
    		this._position.push(new Atlantis.Vector2(0, 0));
    		this._lastPosition.push(new Atlantis.Vector2(0, 0));
    	}
    };

    touchComponent.prototype.update = function (gameTime) {
    	if (this.maxFingerPoints) {

	    	if (this._needUpdate) {
	    		this.initialize();
	    		this._needUpdate = false;
	    	}

	    	this._lastTouchCollection = this._touchCollection.clone();
	    	this._touchCollection = this.game.touchPanel.getState();

	    	var count = this._touchCollection.length;

	    	if (count) {
	    		for (var i = 0; i < this.maxFingerPoints; i++) {
	    			if (i < count) {
	    				this._updateTouchState(i);
	    			}
	    			else {
	    				this._restoreTouchState(i);
	    			}
	    		}

	    		//console.log(this.delta(0))
	    	}
    	}
    };

    touchComponent.prototype._updateTouchState = function (index) {
    	this._lastPosition[index].x = this._position[index].x;
    	this._lastPosition[index].y = this._position[index].y;

    	this._position[index].x = this._touchCollection[index].position.x;
    	this._position[index].y = this._touchCollection[index].position.y;

    	this._pressed[index] = this._touchCollection[index].state === Atlantis.TouchLocationState.Pressed;
    	this._moved[index] = this._touchCollection[index].state === Atlantis.TouchLocationState.Moved;
    	this._released[index] = this._touchCollection[index].state === (Atlantis.TouchLocationState.Released || Atlantis.TouchLocationState.Invalid);
    };

    touchComponent.prototype._restoreTouchState = function (index) {
    	this._lastPosition[index].x = 0;
        this._lastPosition[index].y = 0;

        this._position[index].x = 0;
        this._position[index].y = 0;

        this._pressed[index] = false;
        this._moved[index] = false;
        this._released[index] = false;
    };

    touchComponent.prototype.pressed = function (id) {
    	if (id >= this.maxFingerPoints) {
	        return false;
    	}

	    return _pressed[id];
	};

	touchComponent.prototype.released = function (id) {
	    if (id >= this.maxFingerPoints) {
	        return false;
	    }

	    return _released[id];
	};

	touchComponent.prototype.moved = function (id) {
	    if (id >= this.maxFingerPoints) {
	        return false;
	    }

	    return _moved[id];
	};

	touchComponent.prototype.delta = function (id) {
	    if (id >= this.maxFingerPoints) {
	        return Atlantis.Vector2(0, 0);
	    }

	    this._cacheVec2.x = Math.abs(this._position[id].x, this._lastPosition[id].x);
	    this._cacheVec2.y = Math.abs(this._position[id].y, this._lastPosition[id].y);

	    if (this._cacheVec2.x > this.deadZone.x && this._cacheVec2.x < this.maxDelta.x) {
	        this._cacheVec2.x = (this._position[id].x - this._lastPosition[id].x) * this.sensibility.x;
	    }

	    if (this._cacheVec2.y > this.deadZone.y && this._cacheVec2.y < this.maxDelta.y) {
	        this._cacheVec2.y = (this._position[id].y - this._lastPosition[id].y) * this.sensibility.y;
	    }

	    return this._cacheVec2;
	};

	touchComponent.prototype.getPosition = function (id) {
	    if (id >= this.maxFingerPoints) {
	        return Atlantis.Vector2(0, 0);
	    }

	    return this._position[id];
	};

	touchComponent.prototype.getLastPosition = function (id) {
	    if (id >= this.maxFingerPoints) {
	        return Atlantis.Vector2(0, 0);
	    }

	    return this._lastPosition[id];
	};

	touchComponent.prototype.justPressed = function (id) {
	    if (id >= this._lastthis._touchCollection.Count) {
	        return false;
	    }

	    return (this._lastthis._touchCollection[id].State == Atlantis.TouchLocationState.Pressed || this._lastthis._touchCollection[id].State == Atlantis.TouchLocationState.Moved) && this._touchCollection[id].State == Atlantis.TouchLocationState.Released;
	};

	touchComponent.prototype.justReleased = function (id) {
	    if (id >= this._lastthis._touchCollection.Count) {
	        return false;
	    }

	    return this._touchCollection[id].State == Atlantis.TouchLocationState.Released && (this._lastthis._touchCollection[id].State == Atlantis.TouchLocationState.Pressed || this._lastthis._touchCollection[id].State == Atlantis.TouchLocationState.Moved);
	};

	return touchComponent;
})();