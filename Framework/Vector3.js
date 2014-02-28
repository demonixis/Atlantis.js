/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* Create a vector with three coordinates. If you pass a Vector3 in first parameter,
* its filed are copied to the new vector (work like a copy constructor).
* @constructor
* @class Vector3
* @param {Number|Atlantis.Vector3} The X value or a Vector3 object     * @param {Number} The Y value.
* @param {Number} The Z value.
*/
Atlantis.Vector3 = function (x, y, z) {
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
 * Gets a Vector3 with all coordinates sets to zero.
 * @method Zero
 */
Atlantis.Vector3.Zero = function () {
    return new Atlantis.Vector3(0, 0, 0);
};

/**
 * Gets a Vector3 with all coordinates sets to one.
 * @method One
 */
Atlantis.Vector3.One = function () {
    return new Atlantis.Vector3(1.0, 1.0, 1.0);
};

/**
 * Gets a Vector3 with X coordinate set to one.
 * @method UnitX
 */
Atlantis.Vector3.UnitX = function () {
    return new Atlantis.Vector3(1.0, 0.0, 0.0);
};

/**
 * Gets a Vector3 with Y coordinate set to one.
 * @method UnitY
 */
Atlantis.Vector3.UnitY = function () {
    return new Atlantis.Vector3(0.0, 1.0, 0.0);
};

/**
 * Gets a Vector3 with Z coordinate set to one.
 * @method UnitZ
 */
Atlantis.Vector3.UnitZ = function () {
    return new Atlantis.Vector3(0.0, 0.0, 1.0);
};

/**
 * Gets a Vector3 with Y coordinate set to one.
 * @method Up
 */
Atlantis.Vector3.Up = function () {
    return new Atlantis.Vector3(0.0, 1.0, 0.0);
};

/**
 * Gets a Vector3 with Y coordinate set to -1.
 * @method Down
 */
Atlantis.Vector3.Down = function () {
    return new Atlantis.Vector3(0.0, -1.0, 0.0);
};

/**
 * Gets a Vector3 with X coordinate set to one.
 * @method Right
 */
Atlantis.Vector3.Right = function () {
    return new Atlantis.Vector3(1.0, 0.0, 0.0);
};

/**
 * Gets a Vector3 with X coordinate set to -1.
 * @method Left
 */
Atlantis.Vector3.Left = function () {
    return new Atlantis.Vector3(-1.0, 0.0, 0.0);
};

/**
 * Gets a Vector3 with Z coordinate set to -1.
 * @method Forward
 */
Atlantis.Vector3.Forward = function () {
    return new Atlantis.Vector3(0.0, 0.0, -1.0);
};

/**
 * Gets a Vector3 with Z coordinate set to one.
 * @method Backward
 */
Atlantis.Vector3.Backward = function () {
    return new Atlantis.Vector3(0.0, 0.0, 1.0);
};

/**
* Add a Vector3 to the current vector.
* @method add
* @param {Number|Atlantis.Vector3} vector The Vector3 to add.
*/
Atlantis.Vector3.prototype.add = function (vector) {
    if (vector instanceof Atlantis.Vector3) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    else {
        this.x += vector;
        this.y += vector;
        this.z += vector;
    }
};

/**
* Add two vectors.
* @method add
* @static
* @param {Atlantis.Vector3} vec1
* @param {Atlantis.Vector3} vec2
* @return {Atlantis.Vector3} Return a new Vector3
*/
Atlantis.Vector3.add = function (vec1, vec2) {
    var result = new Vector3(vec1);
    result.add(vec2);
    return result;
};

/**
* Subtract a Vector3 to the current vector.
* @method subtract
* @param {Number|Atlantis.Vector3} vector The Vector3 to Subtract.
*/
Atlantis.Vector3.prototype.subtract = function (vector) {
    if (vector instanceof Atlantis.Vector3) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }
    else {
        this.x -= vector;
        this.y -= vector;
        this.z -= vector;
    }
};

/**
* Subtract two vectors.
* @method subtract
* @static
* @param {Atlantis.Vector3} vec1
* @param {Atlantis.Vector3} vec2
* @return {Atlantis.Vector3} Return a news Vector3.
*/
Atlantis.Vector3.subtract = function (vec1, vec2) {
    var result = new Atlantis.Vector3(vec1);
    result.subtract(vec2);
    return result;
}

/**
* divide a Vector3 to the current vector.
* @method divide
* @param {Atlantis.Vector3} vector The Vector3 to divide.
*/
Atlantis.Vector3.prototype.divide = function (vector) {
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
Atlantis.Vector3.divide = function (vec1, vec2) {
    var vector = new Atlantis.Vector3(vec1);
    vector.divide(vec2);
    return vector;
}

/**
* multiply a Vector3 to the current vector.
* @method multiply
* @param {Number|Atlantis.Vector3} vector The Vector3 to multiply.
*/
Atlantis.Vector3.prototype.multiply = function (vector) {
    if (vector instanceof Atlantis.Vector3) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
    }
    else {
        this.x *= vector;
        this.y *= vector;
        this.z *= vector;
    }
};

/**
* Multiply a two vectors.
* @method multiply
* @param {Atlantis.Vector3} A vector.
* @param {Atlantis.Vector3} Another vector.
* @return {Atlantis.Vector3} Return a new vector.
*/
Atlantis.Vector3.multiply = function (vec1, vec2) {
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
Atlantis.Vector3.cross = function (vec1, vec2) {
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
Atlantis.Vector3.distance = function (vec1, vec2) {
    return Math.sqrt(Atlantis.Vector3.distanceSquared(vec1, vec2));
};

/**
* Gets the distance squared between to vectors.
* @method distanceSquared
* @param {Atlantis.Vector3} vec1
* @param {Atlantis.Vector3} vec2
* @return {Number}
*/
Atlantis.Vector3.distanceSquared = function (vec1, vec2) {
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
Atlantis.Vector3.dot = function (vec1, vec2) {
    return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z);
};

/**
* Gets the length of the vector.
* @method length
* @return {Number} Return the length of the vector.
*/
Atlantis.Vector3.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
};

/**
* Linear interpolation between this vector and the vector passed in parameter.
* @method lerp
* @param {Atlantis.Vector3} vector A vector to use for interpolation
* @param {Number} amount Value between 0 and 1 indicating the weight of vector.
*/
Atlantis.Vector3.prototype.lerp = function (vector, amount) {
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
Atlantis.Vector3.lerp = function (vec1, vec2) {
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
Atlantis.Vector3.min = function (vec1, vec2) {
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
Atlantis.Vector3.max = function (vec1, vec2) {
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
Atlantis.Vector3.prototype.negate = function () {
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
Atlantis.Vector3.negate = function (vector) {
    var vec = new Atlantis.Vector3(vector);
    vec.negate();
    return vec;
};

/**
 * Normalize vector.
 * @static
 * @method normalize
 */
Atlantis.Vector3.prototype.normalize = function () {
	var factor = distance(this, new Atlantis.Vector3());
	
	if (factor != 0) {
		factor = 1.0 / factor;
		this.set(this.x * factor, this.y * factor, this.z * factor);
	}
};

/**
 * Normalize a vector.
 * @method normalize
 * @param {Atlantis.Vector3} vector A vector to normalize.
 * @return {Atlantis.Vector3} result A normalized vector.
 */
Atlantis.Vector3.normalize = function (vector) {
	var result = new Vector3(vector);
	result.normalize();
	return result;
};

/**
 * Gets a transformed Vector3 from a position and a matrix.
 * @method tranform
 * @static
 * @param {Atlantis.Vector3} position
 * @param {Atlantis.Matrix} matrix
 * @return {Atlantis.Vector3} A tranformed vector.
 */
Atlantis.Vector3.transform = function (position, matrix) {
	var vector = new Vector3(
		(position.x * matrix.M11) + (position.y * matrix.M21) + (position.z * matrix.M31) + matrix.M41,
        (position.x * matrix.M12) + (position.y * matrix.M22) + (position.z * matrix.M32) + matrix.M42,
        (position.x * matrix.M13) + (position.y * matrix.M23) + (position.z * matrix.M33) + matrix.M43 
	);
	
	return vector;
};

/**
 * Gets an homogeneous transformed vector from a position and a matrix.
 * @method transformCoordinate
 * @static
 * @param {Atlantis.Vector3} position
 * @param {Atlantis.Matrix} matrix
 * @return {Atlantis.Vector4} A tranformed vector.
 */
Atlantis.Vector3.transformCoordinate = function (position, transform) {
	 var vector = new Atlantis.Vector4();
     vector.x = (position.x * transform.M11) + (position.y * transform.M21) + (position.z * transform.M31) + transform.M41;
     vector.y = (position.x * transform.M12) + (position.y * transform.M22) + (position.z * transform.M32) + transform.M42;
     vector.z = (position.x * transform.M13) + (position.y * transform.M23) + (position.z * transform.M33) + transform.M43;
     vector.w = 1.0 / ((position.x * transform.M14) + (position.y * transform.M24) + (position.z * transform.M34) + transform.M44);
     return new Atlantis.Vector3(vector.x * vector.w, vector.y * vector.w, vector.z * vector.w);
};

/**
 * Changes the 3 coordinates.
 * @method set
 * @param x The new X coordinate.
 * @param y The new Y coordinate.
 * @param z The new Z coordinate.
 */
Atlantis.Vector3.prototype.set = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Vector3.prototype.toString = function () {
	return ["x: ", this.x, " y: ", this.y, " z: ", this.z].join("");
};