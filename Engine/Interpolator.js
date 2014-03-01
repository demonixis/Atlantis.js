/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Interpolator = (function () {
    /**
     * An interpolator class that can be used for animations.
	 * @constructor
	 * @class Interpolator
     */
    var interpolator = function () {
        this.active = false;
        this.elapsedTime = 0;
        this.desiredDuration = 0;
        this.startValue = 0;
        this.endValue = 0;
        this.interpolatedValue = 0;
    };

    /**
     * Start the interpolation process.
     * @method startInterpolation
     * @param {Number} start The start value.
     * @param {Number} end The end value.
     * @param {Number} duration Desired duration for interpolation.
     */
    interpolator.prototype.startInterpolation = function (start, end, duration) {
        this.startValue = start;
        this.endValue = end;
        this.desiredDuration = duration;
        this.elapsedTime = 0;
        this.interpolatedValue = start;
        this.active = true;
    };

    /**
     * Gets the interpolated value.
     * @method getInterpolatedValue
     * @param {Number} elapsedMilliseconds The elapsed time since the last call.
     * @return {Number} An interpolated value.
     */
    interpolator.prototype.getInterpolatedValue = function (elapsedMilliseconds) {
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

    /**
     * Interplate a value.
     * @method interpolateValue
     * @param {Number} step The step.
     * @return {Number} An interpolated value.
     */
    interpolator.prototype.interpolateValue = function (step) {
        this.interpolatedValue = Atlantis.MathHelper.lerp(this.startValue, this.endValue, step);
    };

    return interpolator;
})();