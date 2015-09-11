/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * @class MathHelpers
 */
Atlantis.MathHelper = {
    /**
     * Gets PI value.
     * @attribute Pi
     * @readOnly
     * @type {Number}
     */
    Pi: Math.PI,

    /**
     * Gets PI over 2 value.
     * @attribute PiOver2
     * @readOnly
     * @type {Number}
     */
    PiOver2: Math.PI / 2,

    /**
     * Gets PI over 4 value.
     * @attribute PiOver4
     * @readOnly
     * @type {Number}
     */
    PiOver4: Math.PI / 4,

    /**
     * Gets PI * 2 value.
     * @attribute TwoPi
     * @readOnly
     * @type {Number}
     */
    TwoPi: Math.PI * 2,

    /**
     *
     * @method clamp
     */
    clamp: function(value, min, max) {
        value = (value > max) ? max : value;
        value = (value < min) ? min : value;
        return value;
    },

    /**
     *
     * @method distance
     */
    distance: function(value1, value2) {
        return Math.abs(value1 - value2);
    },

    hermite: function(value1, tangent1, value2, tangent2, amount) {
        var sCubed = amount * amount * amount;
        var sSquared = amount * amount;

        if (amount === 0) {
            return value1;
        } else if (amount === 1) {
            return value2;
        }

        return (2 * value1 - 2 * value2 + tangent2 + tangent1) * sCubed + (3 * value2 - 3 * value1 - 2 * tangent1 - tangent2) * sSquared + tangent1 * amount + value1;
    },

    /**
     *
     * @method lerp
     */
    lerp: function(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    },

    smoothStep: function(value1, value2, amount) {
        var result = this.clamp(amount, 0, 1);
        result = this.hermite(value1, 0, value2, 0, result);
        return result;
    },

    /**
     *
     * @method toDegrees
     */
    toDegrees: function(radians) {
        return (radians * (180 / Math.PI));
    },

    /**
     *
     * @method toRadians
     */
    toRadians: function(degrees) {
        return (degrees * (Math.PI / 180));
    },

    /**
     *
     * @method isPowerOfTwo
     */
    isPowerOfTwo: function(value) {
        return (value > 0) && ((value & (value - 1)) === 0);
    }
};