/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

 var Atlantis = window.Atlantis || {};
 
 Atlantis.MathHelper = Atlantis.MathHelper || {};

/**
 * @class MathHelpers
 */
(function() {
	/**
	 * Gets PI value.
	 * @attribute Pi
	 * @readOnly
	 * @type {Number}
	 */
    Atlantis.MathHelper.Pi = function () {
        Math.PI;   
    };
	
	/**
	 * Gets PI over 2 value.
	 * @attribute PiOver2
	 * @readOnly
	 * @type {Number}
	 */
	Atlantis.MathHelper.PiOver2 = function () {
	    Math.PI / 2;
    };
	
	/**
	 * Gets PI over 4 value.
	 * @attribute PiOver4
	 * @readOnly
	 * @type {Number}
	 */
	Atlantis.MathHelper.PiOver4 = function () {
        Math.PI / 4;
    };
	
	/**
	 * Gets PI * 2 value.
	 * @attribute TwoPi
	 * @readOnly
	 * @type {Number}
	 */
	Atlantis.MathHelper.TwoPi = function () {
	    return Math.PI * 2;
	}; 
	
	/**
	 *
	 * @method clamp
	 */
	Atlantis.MathHelper.clamp = function (value, min, max) {
		value = (value > max) ? max : value;
		value = (value < min) ? min : value;
		return value;
	};
	
	/**
	 *
	 * @method distance
	 */
	Atlantis.MathHelper.distance = function (value1, value2) {
		return Math.abs(value1 - value2);
	}
	
	/**
	 *
	 * @method lerp
	 */
	Atlantis.MathHelper.lerp = function (value1, value2, amount) {
		amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
	}
	
	/**
	 *
	 * @method toDegrees
	 */
	Atlantis.MathHelper.toDegrees = function (radians)	{ 
		return (radians * (180 / Math.PI));
	}
	
	/**
	 *
	 * @method toRadians
	 */
	Atlantis.MathHelper.toRadians = function (degrees) { 
		return (degrees * (Math.PI / 180));
	};
		
	/**
	 *
	 * @method isPowerOfTwo
	 */
	Atlantis.MathHelper.isPowerOfTwo = function (value) {
	     return (value > 0) && ((value & (value - 1)) == 0);
	};
})();