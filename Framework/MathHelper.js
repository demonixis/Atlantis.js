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
    Pi: function () {
        return Math.PI;   
    },
	
	/**
	 * Gets PI over 2 value.
	 * @attribute PiOver2
	 * @readOnly
	 * @type {Number}
	 */
	PiOver2: function () {
	   return  Math.PI / 2;
    },
	
	/**
	 * Gets PI over 4 value.
	 * @attribute PiOver4
	 * @readOnly
	 * @type {Number}
	 */
	PiOver4: function () {
        return Math.PI / 4;
    },
	
	/**
	 * Gets PI * 2 value.
	 * @attribute TwoPi
	 * @readOnly
	 * @type {Number}
	 */
	TwoPi: function () {
	    return Math.PI * 2;
	}, 
	
	/**
	 *
	 * @method clamp
	 */
	clamp: function (value, min, max) {
		value = (value > max) ? max : value;
		value = (value < min) ? min : value;
		return value;
	},
	
	/**
	 *
	 * @method distance
	 */
	distance: function (value1, value2) {
		return Math.abs(value1 - value2);
	},
	
	/**
	 *
	 * @method lerp
	 */
	lerp: function (value1, value2, amount) {
		amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
	},
	
	/**
	 *
	 * @method toDegrees
	 */
	toDegrees: function (radians)	{ 
		return (radians * (180 / Math.PI));
	},
	
	/**
	 *
	 * @method toRadians
	 */
	toRadians: function (degrees) { 
		return (degrees * (Math.PI / 180));
	},
		
	/**
	 *
	 * @method isPowerOfTwo
	 */
	isPowerOfTwo:function (value) {
	     return (value > 0) && ((value & (value - 1)) == 0);
	}
};
