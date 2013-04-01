var Atlantis = window.Atlantis || {};

(function() {
    /**
     * An interpolator class 
     */
    Atlantis.Interpolator = function() {
	this.active = false;
	this.elapsedTime = 0;
	this.desiredDuration = 0;
	this.startValue = 0;
	this.endValue = 0;
	this.interpolatedValue = 0;
    };

    Atlantis.Interpolator.prototype.startInterpolation = function(start, end, duration) {
	this.startValue = start;
	this.endValue = end;
	this.desiredDuration = duration;
	this.elapsedTime = 0;
	this.interpolatedValue = start;
	this.active = true;
    };

    Atlantis.Interpolator.prototype.getInterpolatedValue = function (elapsedMilliseconds) {
	if (this.active) {
	    this.elapsedTime += elapsedMilliseconds;

	    if (this.elapsedTime >= this.desiredDuration) {
		this.active = false;
		this.elapsedTime = this.desiredDuration;
		this.interpolatedValue = this.endValue; 
	    }
	    else {
		var step = this.elapsedTime / this.desiredDuration; 
		this.interpolateValue(step);
	    }
	}

	return this.interpolatedValue;
    };

    Atlantis.Interpolator.prototype.interpolateValue = function (step) {
	this.interpolatedValue = lerp(this.startValue, this.endValue, step);
    };
    
    function lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
    };
})();