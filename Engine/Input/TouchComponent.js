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
    	this.delta = new Atlantis.Vector2(0, 0);
    	this._touchCollection = null;
    	this._lastTouchCollection = null;
    	this._position = [];
    	this._lastPosition = [];
    	this._needUpdate = false;
    };

    touchComponent.prototype = Object.create(Atlantis.GameComponent.prototype);

    touchComponent.prototype.initialize = function () {
    	Atlantis.GameComponent.prototype.initialize(this);
    	this._touchCollection = this.game.touchPanel.getState();
    	this._lastTouchCollection = this.game.touchPanel.getState();

    	this._position.length = 0;
    	this._lastPosition.length = 0;

    	for (var i = 0; i < this.maxFingerPoints; i++) {
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
	    				this._resetTrouchState(i);
	    			}
	    		}

			    this.delta.x = (this._position[0].x - this._lastPosition[0].x) * this.sensibility.x;
	    		this.delta.y = (this._position[0].y - this._lastPosition[0].y) * this.sensibility.y;
	    	}
	    	else {
	    		this.delta.x = 0;
	    		this.delta.y = 0;
	    	}
    	}
    };

    touchComponent.prototype._updateTouchState = function (index) {
    	this._lastPosition[index].x = this._position[index].x;
    	this._lastPosition[index].y = this._position[index].y;
    	this._position[index].x = this._touchCollection[index].position.x;
    	this._position[index].y = this._touchCollection[index].position.y;
    };

     touchComponent.prototype._resetTrouchState = function (index) {
    	this._lastPosition[index].x = 0;
    	this._lastPosition[index].y = 0;
    	this._position[index].x = 0;
    	this._position[index].y = 0;
    };

    touchComponent.prototype.pressed = function (index) {
    	if (!this._touchCollection[index]) {
	        return false;
    	}

	    return this._touchCollection[index].state === Atlantis.TouchLocationState.Pressed;
	};

	touchComponent.prototype.released = function (index) {
	    if (!this._touchCollection[index]) {
	        return false;
	    }

	    return this._touchCollection[index].state === (Atlantis.TouchLocationState.Released || Atlantis.TouchLocationState.Invalid);
	};

	touchComponent.prototype.moved = function (index) {
	    if (!this._touchCollection[index]) {
	        return false;
	    }

	    return this._touchCollection[index].state === Atlantis.TouchLocationState.Moved;
	};

	return touchComponent;
})();