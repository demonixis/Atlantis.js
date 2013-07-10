/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Vector4 = (function () {
    /**
     * A vector4 class.
     * @constructor
     * @class Vector4
     * @param {Number|Atlantis.Vector4} Value for x coordinate or a Vector4 object.
     * @param {Number} Value for y coordinate
     * @param {Number} Value for z coordinate.
     * @param {Number} Value for w coordinate.
     */
    var vector = function (x, y, z, w) {
        if (x instanceof Atlantis.Vector4) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    };
	
	/**
	 * Linear interpolation.
	 * @method lerp
	 * @param {Atlantis.Vector4} vector A vector to use for interpolation
	 * @param {Number} amount Value between 0 and 1 indicating the weight of vector.
	 */
	vector.lerp = function (vector, amount) {
		this.x = Atlantis.MathHelper.lerp(this.x, vector.x, amount);
		this.y = Atlantis.MathHelper.lerp(this.y, vector.y, amount);
		this.z = Atlantis.MathHelper.lerp(this.z, vector.z, amount);
		this.w = Atlantis.MathHelper.lerp(this.w, vector.w, amount);
	};

	/**
	 * Linearly interpolates between two vectors.
	 * @method lerp
	 * @static
	 * @param {Atlantis.Vector4} vec1 First vector
	 * @param {Atlantis.Vector4} vec2 Second vector
	 * @param {Number} amount Value between 0 and 1 indicating the weight of vec2.
	 * @return {Atlantis.Vector4} Return a interpolated Vector3.
	 */
	vector.lerp = function (vec1, vec2, amount) {
		var vector = new Vector4(vec1);
		vector.lerp(vec2, amount);
		return vector;
	};
})();