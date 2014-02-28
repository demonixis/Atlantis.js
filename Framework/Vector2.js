/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* Create a new Vector2
* @constructor
* @class Vector2
*/
Atlantis.Vector2 = function (x, y) {
    if (x instanceof Atlantis.Vector2) {
        this.x = x.x;
        this.y = x.y;
    }
    else {
        this.x = x || 0;
        this.y = y || 0;
    }
};

/**
 * Gets a Vector3 with all coordinates sets to zero.
 * @method Zero
 */
Atlantis.Vector2.Zero = function () {
	return new Vector2();
};

/**
 * Gets a Vector3 with all coordinates sets to one.
 * @method One
 */
Atlantis.Vector2.One = function () {
	return new Vector2(1.0, 1.0);
};

/**
 * Gets a Vector3 with X coordinate set to one.
 * @method UnitX
 */
Atlantis.Vector2.UnitX = function () {
	return new Vector2(1.0, 0.0);
};

/**
 * Gets a Vector3 with Y coordinate set to one.
 * @method UnitY
 */
Atlantis.Vector2.UnitY = function () {
	return new Vector2(0.0, 1.0);
};

/**
* Add this vector by another vector or value.
* @method add
* @param {Atlantis.Vector2} value A vector or a value to add to this vector.
*/
Atlantis.Vector2.prototype.add = function (value) {
    if (value instanceof Atlantis.Vector2) {
        this.x += value.x;
        this.y += value.y;
    }
    else {
        this.x += value;
        this.y += value;
    }
};

/**
* Add two vectors.
* @method add
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.add = function (vec1, vec2) {
    var vector = new Atlantis.Vector2(vec1);
    vector.add(vec2);
    return vector;
};

/**
* Substract this vector by another vector or value.
* @method subtract
* @param {Atlantis.Vector2} value A vector or a value to subtract to this vector.
*/
Atlantis.Vector2.prototype.subtract = function (value) {
    if (value instanceof Atlantis.Vector2) {
        this.x -= value.x;
        this.y -= value.y;
    }
    else {
        this.x -= value;
        this.y -= value;
    }
};

/**
* Subtract two vectors.
* @method subtract
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.subtract = function (vec1, vec2) {
    var vector = new Atlantis.Vector2(vec1);
    vector.subtract(vec2);
    return vector;
};

/**
* Divide this vector by another vector
* @method divide
* @param {Atlantis.Vector2} value A vector or a value to divide to this vector.
*/
Atlantis.Vector2.prototype.divide = function (value) {
    if (value instanceof Atlantis.Vector2) {
        this.x /= value.x;
        this.y /= value.y;
    }
    else {
        this.x /= value;
        this.y /= value;
    }
};

/**
* Divide two vectors.
* @method divide
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.divide = function (vec1, vec2) {
    var vector = new Atlantis.Vector2(vec1);
    vector.divide(vec2);
    return vector;
};

/**
* Multiply this vector by another vector or a value.
* @method multiply
* @param {Atlantis.Vector2} value A vector or a value to multiply to this vector.
*/
Atlantis.Vector2.prototype.multiply = function (value) {
    if (value instanceof Atlantis.Vector2) {
        this.x *= value.x;
        this.y *= value.y;
    }
    else {
        this.x *= value;
        this.y *= value;
    }
};

/**
* Multiply two vectors.
* @method multiply
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.multiply = function (vec1, vec2) {
    var vector = new Atlantis.Vector2(vec1);
    vector.multiply(vec2);
    return vector;
};

/**
* Gets distance between this vector and the vector passed in parameter.
* @method getDistance
* @param {Atlantis.Vector2} vector2 The vector2 to use to determine the distance.
* @return {Number} The distance between this vector and the vector passed in parameter.
*/
Atlantis.Vector2.prototype.distance = function (vector2) {
    var v1 = this.x - vector2.x;
    var v2 = this.y - vector2.y;
    return Math.sqrt((v1 * v1) + (v2 * v2));
};

/**
* Gets the distance between two vectors.
* @method distance
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.distance = function (vec1, vec2) {
    var vec = new vector2(vec1);
    return vec.distance(vec2);
};

/**
* Gets distance between this vector and the vector passed in parameter.
* @method getDistance
* @param {Atlantis.Vector2} vector2 The vector2 to use to determine the distance.
* @return {Number} The distance between this vector and the vector passed in parameter.
*/
Atlantis.Vector2.prototype.distance = function (vector2) {
    var v1 = this.x - vector2.x;
    var v2 = this.y - vector2.y;
    return Math.sqrt((v1 * v1) + (v2 * v2));
};

/**
* Calculate the dot product of two vectors.
* @method dot
* @static
* @param {Atlantis.Vector2} First vector to use.
* @param {Atlantis.Vector2} Second vector to use.
* @return {Number} Return the dot product of the two vectors.
*/
Atlantis.Vector2.dot = function (vec1, vec2) {
    return (vec1.x * vec2.x) + (vec1.y * vec2.y);
};

/**
* Gets the length of the vector.
* @return {Number} Return the length of the vector.
*/
Atlantis.Vector2.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

/**
* Performs a linear interpolation between to vectors.
* @method lerp
* @static
* @param {Atlantis.Vector2} First vector to use.
* @param {Atlantis.Vector2} Second vector to use.
* @param amount
* @return
*/
Atlantis.Vector2.lerp = function (vec1, vec2, amont) {
    return new Atlantis.Vector2(Atlantis.MathHelper.lerp(vec1.x, vec2.x, amount), Atlantis.MathHelper.lerp(vec2.y, vec2.y, amount));
};

/**
* Gets a vector of the minimum of the two vectors.
* @method min
* @static
* @param vec1
* @param vec2
* @return Return a vector that correspond of the minimum of the two vectors.
*/
Atlantis.Vector2.min = function (vec1, vec2) {
    var vector2 = new Atlantis.Vector2();
    vector2.x = (vec1.x < vec2.x) ? vec1.x : vec2.x;
    vector2.y = (vec1.y < vec2.y) ? vec1.y : vec2.y;
    return vector2;
};

/**
* Gets a vector of the maximum of the two vectors.
* @method max
* @static
* @param vec1
* @param vec2
* @return Return a vector that correspond of the maximum of the two vectors.
*/
Atlantis.Vector2.max = function (vec1, vec2) {
    var vector2 = new Vector2();
    vector2.x = (vec1.x > vec2.x) ? vec1.x : vec2.x;
    vector2.y = (vec1.y > vec2.y) ? vec1.y : vec2.y;
    return vector2;
};

/**
* Negate this vector
* @method negate
*/
Atlantis.Vector2.prototype.negate = function (value) {
    if (value instanceof Atlantis.Vector2) {
        this.x = -value.x;
        this.y = -value.y;
    }
    else {
        this.x = -value;
        this.y = -value;
    }
};

/**
* Negate a vector.
* @method negate
* @static
* @param {Atlantis.Vector2} A vector to use.
* @return {Atlantis.Vector2} Return the negated vector.
*/
Atlantis.Vector2.negate = function (vector) {
    var vec = new Atlantis.Vector2(vector);
    vec.x *= -1;
    vec.y *= -1;
    return vec;
};

/**
* Normalize this vector.
* @method normalize
*/
Atlantis.Vector2.prototype.normalize = function () {
    var factor = Atlantis.Vector3.distance(this, new Vector3());

    if (factor != 0) {
        factor = 1.0 / factor;
        this.set(this.x * factor, this.y * factor, this.z * factor);
    }
};

/** Gets a normalized vector.
* 
* @method normalize
* @static
* @param {Atlantis.Vector2} A vector to normalize.
*/
Atlantis.Vector2.normalize = function (vector) {
    var vec = new vector2(vector);
    vec.normalize();
    return vec;
};

/**
* Gets a transformed Vector3 from a position and a matrix.
* @method transform
* @param {Atlantis.Vector3} position
* @param {Atlantis.Matrix} matrix
* @return {Atlantis.Matrix} A tranformed vector.
*/
Atlantis.Vector2.transform = function (position, matrix) {
    var vector = new Atlantis.Vector3(
		(position.x * matrix.M11) + (position.y * matrix.M21) + (position.z * matrix.M31) + matrix.M41,
        (position.x * matrix.M12) + (position.y * matrix.M22) + (position.z * matrix.M32) + matrix.M42,
        (position.x * matrix.M13) + (position.y * matrix.M23) + (position.z * matrix.M33) + matrix.M43
	);

    return vector;
};

/**
* Gets a transformed Vector3 from a position and a matrix.
* @method transformCoordinate
* @param {Atlantis.Vector3} position
* @param {Atlantis.Matrix} matrix
* @return {Atlantis.Vector4} A tranformed vector.
*/
Atlantis.Vector2.transformCoordinate = function (position, transform) {
    var vector = new Atlantis.Vector4();
    vector.x = (position.x * transform.M11) + (position.y * transform.M21) + (position.z * transform.M31) + transform.M41;
    vector.y = (position.x * transform.M12) + (position.y * transform.M22) + (position.z * transform.M32) + transform.M42;
    vector.z = (position.x * transform.M13) + (position.y * transform.M23) + (position.z * transform.M33) + transform.M43;
    vector.w = 1.0 / ((position.x * transform.M14) + (position.y * transform.M24) + (position.z * transform.M34) + transform.M44);
    return new Vector3(vector.x * vector.w, vector.y * vector.w, vector.z * vector.w);
};

/**
* Sets the coordinates.
* @method set
* @param {Number} X value.
* @param {Number} Y value.
*/
Atlantis.Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Vector2.prototype.toString = function () {
    return ["x: ", this.x, " y: ", this.y].join("");
};
