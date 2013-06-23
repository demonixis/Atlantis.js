/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Vector3 = (function () {
    /**
     * Create a vector with three coordinates. If you pass a Vector3 in first parameter,
     * its filed are copied to the new vector (work like a copy constructor).
     * @constructor
     * @class
     * @param {Number|Atlantis.Vector3} The X value or a Vector3 object     * @param {Number} The Y value.
     * @param {Number} The Z value.
     */
    var vector = function (x, y, z) {
        if (x instanceof Atlantis.Vector3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    };

    /**
	 * Add a Vector3 to the current vector.
     * @method add
	 * @param {Atlantis.Vector3} vector The Vector3 to add.
	 */
    vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    };

    /**
	 * Add two vectors.
     * @method add
     * @static
	 * @param {Atlantis.Vector3} vec1
	 * @param {Atlantis.Vector3} vec2
	 * @return {Atlantis.Vector3} Return a new Vector3
	 */
    vector.add = function (vec1, vec2) {
        var result = new Vector3(vec1);
		result.add(vec2);
		return result;
    };

    /**
    * Subtract a Vector3 to the current vector.
    * @method subtract
    * @param {Atlantis.Vector3} vector The Vector3 to Subtract.
    */
    vector.prototype.subtract = function (vector) {
        this.x -= value;
        this.y -= value;
        this.z -= value;
    };

    /**
    * Subtract two vectors.
    * @method subtract
    * @static
    * @param {Atlantis.Vector3} vec1
    * @param {Atlantis.Vector3} vec2
    * @return {Atlantis.Vector3} Return a news Vector3.
    */
    vector.subtract = function (vec1, vec2) {
        var result = new Atlantis.Vector3(vec1);
        result.subtract(vec2);
        return result;
    }

    /**
    * divide a Vector3 to the current vector.
    * @method divide
    * @param {Atlantis.Vector3} vector The Vector3 to divide.
    */
    vector.prototype.divide = function (vector) {
        if (vector.x != 0) {
            this.x /= vector.x;
        }
        if (vector.y != 0) {
            this.y /= vector.y;
        }
        if (vector.z != 0) {
            this.z /= vector.z;
        }
    };

    /**
    * Divide two vectors.
    * @method divide
    * @static
    * @param {Atlantis.Vector3} vec1
    * @param {Atlantis.Vector3} vec2
    * @return {Atlantis.Vector3} Return a new Vector3.
    */
    vector.divide = function (vec1, vec2) {
        var vector = new Atlantis.Vector3(vec1);
        vector.divide(vec2);
        return vector;
    }

    /**
    * multiply a Vector3 to the current vector.
    * @method multiply
    * @param {Atlantis.Vector3} vector The Vector3 to multiply.
    */
    vector.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
    };

    /**
    * Multiply a two vectors.
    * @method multiply
    * @param {Atlantis.Vector3} A vector.
    * @param {Atlantis.Vector3} Another vector.
    * @return {Atlantis.Vector3} Return a new vector.
    */
    vector.multiply = function (vec1, vec2) {
        var vector = new Atlantis.Vector3(vec1);
        vector.multiply(vec2);
        return vector;
    };

    /**
    * Calculates the cross products of two vectors.
    * @method cross
    * @static
    * @param {Atlantis.Vector3} vec1 Fist vector to use.
    * @param {Atlantis.Vector3} vec2 Second vector to use.
    * @return {Atlantis.Vector3} the cross products of the two vectors.
    */
    vector.cross = function (vec1, vec2) {
        var vector = new Atlantis.Vector3();
        vector.x = (vec1.y * vec2.z) - (vec2.y * vec1.z);
        vector.y = -((vec1.x * vec2.z) - (vec2.x * vec1.z));
        vector.z = (vec1.x * vec2.y) - (vec2.x * vec1.y);
        return vector;
    };

    /**
    * Gets the distance between two vectors.
    * @method distance
    * @static
    * @param {Atlantis.Vector3} vector
    * @return {Number} Return the distance between two vectors.
    */
    vector.distance = function (vec1, vec2) {
        return Math.sqrt(Atlantis.Vector3.distanceSquared(vec1, vec2));
    };

    /**
    * Gets the distance squared between to vectors.
    * @method distanceSquared
    * @param {Atlantis.Vector3} vec1
    * @param {Atlantis.Vector3} vec2
    * @return {Number}
    */
    vector.distanceSquared = function (vec1, vec2) {
        var dx = vec1.x - vec2.x;
        var dy = vec1.y - vec2.y;
        var dz = vec1.z - vec2.z;
        return (dx * dx) + (dy * dy) + (dz * dz);
    };

    /**
    * Calculates the dot product of two vectors.
    * @method dot
    * @static
    * @param {Atlantis.Vector3} vec1 First vector to use.
    * @param {Atlantis.Vector3} vec2 Second vector to use.
    * @return {Number} Return the dot product of two vectors.
    */
    vector.dot = function (vec1, vec2) {
        return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z);
    };

    /**
    * Gets the length of the vector.
    * @method length
    * @return {Number} Return the length of the vector.
    */
    vector.prototype.length = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    };

    /**
    * Linear interpolation between this vector and the vector passed in parameter.
    * @method lerp
    * @param {Atlantis.Vector3} vector A vector to use for interpolation
    * @param {Number} amount Value between 0 and 1 indicating the weight of vector.
    */
    vector.prototype.lerp = function (vector, amount) {
        this.x = Atlantis.MathHelper.lerp(this.x, vector.x, amount);
        this.y = Atlantis.MathHelper.lerp(this.y, vector.y, amount);
        this.z = Atlantis.MathHelper.lerp(this.z, vector.z, amount);
    };

    /**
    * Linearly interpolates between two vectors.
    * @method lerp
    * @static
    * @param {Atlantis.Vector3} vec1 First vector
    * @param {Atlantis.Vector3} vec2 Second vector
    * @param amount Value between 0 and 1 indicating the weight of vec2.
    * @return {Atlantis.Vector3} Return a interpolated Vector3.
    */
    vector.lerp = function (vec1, vec2) {
        var x = Atlantis.MathHelper.lerp(vec1.x, vec2.x, amount);
        var y = Atlantis.MathHelper.lerp(vec1.y, vec2.y, amount);
        var z = Atlantis.MathHelper.lerp(vec1.z, vec2.z, amount);
        return new Atlantis.Vector3(x, y, z); ;
    };

    /**
    * Gets a vector of the minimum of the two vectors.
    * @method min
    * @static
    * @param {Atlantis.Vector3} vec1
    * @param {Atlantis.Vector3} vec2
    * @return {Atlantis.Vector3} Return a vector that correspond of the minimum of the two vectors.
    */
    vector.min = function (vec1, vec2) {
        var vector = new Atlantis.Vector3();
        vector.x = (vec1.x < vec2.x) ? vec1.x : vec2.x;
        vector.y = (vec1.y < vec2.y) ? vec1.y : vec2.y;
        vector.z = (vec1.z < vec2.z) ? vec1.z : vec2.z;
        return vector;
    };

    /**
    * Gets a vector of the maximum of the two vectors.
    * @method max
    * @static
    * @param {Atlantis.Vector3} vec1
    * @param {Atlantis.Vector3} vec2
    * @return {Atlantis.Vector3} Return a vector that correspond of the maximum of the two vectors.
    */
    vector.max = function (vec1, vec2) {
        var vector = new Atlantis.Vector3();
        vector.x = (vec1.x > vec2.x) ? vec1.x : vec2.x;
        vector.y = (vec1.y > vec2.y) ? vec1.y : vec2.y;
        vector.z = (vec1.z > vec2.z) ? vec1.z : vec2.z;
        return vector;
    }

    /**
    * Negate the vector.
    * @method negate
    */
    vector.prototype.negate = function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
    };

    /**
    * Negate a vector.
    * @method negate
    * @static
    * @param {Atlantis.Vector3} vector The vector to negate.
    * @return {Atlantis.Vector3} Return a negated vector.
    */
    vector.negate = function (vector) {
        var vec = new Atlantis.Vector3(vector);
        vec.negate();
        return vec;
    };

    return vector;
});