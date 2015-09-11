/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Create a point structure.
 * @constructor
 * @class Point
 * @param {Number} x A value for X coordinate.
 * @param {Number} y A value for Y coordinate.
 */
Atlantis.Point = function (x, y) {
    this.x = x ? +x : 0;
    this.y = y ? +y : 0;
};

Atlantis.Point.clone = function (x, y) {
    return new Atlantis.Point(this.x, this.y);
};

/**
* Gets a string from this object.
* @method toString
* @return {String}
*/
Atlantis.Point.prototype.toString = function () {
    return ["x: ", this.x, " y: ", this.y].join("");
};

/**
* Create a new Vector2
* @constructor
* @class Vector2
*/
Atlantis.Vector2 = function (x, y) {
    this.x = x ? +x : 0;
    this.y = y ? +y : 0;
};

Atlantis.Vector2.prototype.fromVector = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
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
    if (typeof(value) === "number") {
        this.x += value;
        this.y += value;
    }
    else {
        this.x += value.x;
        this.y += value.y;
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
    var vector = vec1.clone();
    vector.add(vec2);
    return vector;
};

Atlantis.Vector2.addToRef = function (vec1, vec2, result) {
    result.x = vec1.x + vec2.x;
    result.y = vec1.y + vec2.y;
};

/**
* Substract this vector by another vector or value.
* @method subtract
* @param {Atlantis.Vector2} value A vector or a value to subtract to this vector.
*/
Atlantis.Vector2.prototype.subtract = function (value) {
    if (typeof(value) === "number") {
        this.x -= value;
        this.y -= value;
    }
    else {
        this.x -= value.x;
        this.y -= value.y;
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
    var vector = vec1.clone();
    vector.subtract(vec2);
    return vector;
};

Atlantis.Vector2.subtractToRef = function (vec1, vec2, result) {
    result.x = vec1.x - vec2.x;
    result.y = vec1.y - vec2.y;
};

/**
* Divide this vector by another vector
* @method divide
* @param {Atlantis.Vector2} value A vector or a value to divide to this vector.
*/
Atlantis.Vector2.prototype.divide = function (value) {
    if (typeof(value) === "number") {
        this.x /= value;
        this.y /= value;
    }
    else {
        this.x /= value.x;
        this.y /= value.y;
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
    var vector = vec1.clone();
    vector.divide(vec2);
    return vector;
};

Atlantis.Vector2.divideToRef = function (vec1, vec2, result) {
    result.x = vec1.x / vec2.x;
    result.y = vec1.y / vec2.y;
};

/**
* Multiply this vector by another vector or a value.
* @method multiply
* @param {Atlantis.Vector2} value A vector or a value to multiply to this vector.
*/
Atlantis.Vector2.prototype.multiply = function (value) {
    if (typeof(value) === "number") {
        this.x *= value;
        this.y *= value;
    }
    else {
        this.x *= value.x;
        this.y *= value.y;
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
    var vector = vec1.clone();
    vector.multiply(vec2);
    return vector;
};

Atlantis.Vector2.multiplyToRef = function (vec1, vec2, result) {
    result.x = vec1.x * vec2.x;
    result.y = vec1.y * vec2.y;
};

/**
* Gets distance between this vector and the vector passed in parameter.
* @method getDistance
* @param {Atlantis.Vector2} vector2 The vector2 to use to determine the distance.
* @return {Number} The distance between this vector and the vector passed in parameter.
*/
Atlantis.Vector2.prototype.distance = function (vector2) {
    return Atlantis.Vector2.distance(this, vector2);
};

/**
* Gets the distance between two vectors.
* @method distance
* @static
* @param {Atlantis.Vector2} A vector.
* @param {Atlantis.Vector2} Another vector.
*/
Atlantis.Vector2.distance = function (vec1, vec2) {
    var v1 = vec1.x - vec2.x;
    var v2 = vec1.y - vec2.y;
    return Math.sqrt((v1 * v1) + (v2 * v2));
};

Atlantis.Vector2.prototype.dot = function (vec2) {
    return Atlantis.Vector2.dot(this, vec2);
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
    return Atlantis.Vector2.length(this);
};

Atlantis.Vector2.length = function (vec2) {
    return Math.sqrt((vec2.x * vec2.x) + (vec2.y * vec2.y));
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
Atlantis.Vector2.lerp = function (vec1, vec2, amount) {
    Atlantis.Vector2.lerpToRef(vec1, vec2, amount, new Atlantis.Vector2());
    return vector;
};

Atlantis.Vector2.lerpToRef = function (vec1, vec2, amount, result) {
    result.x = Atlantis.MathHelper.lerp(vec1.x, vec2.x, amount);
    result.y = Atlantis.MathHelper.lerp(vec1.y, vec2.y, amount);
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
    var result = new Atlantis.Vector2();
    Atlantis.Vector2.minToRef(vec1, vec2, result);
    return result;
};

Atlantis.Vector2.minToRef = function (vec1, vec2, result) {
    result.x = (vec1.x < vec2.x) ? vec1.x : vec2.x;
    result.y = (vec1.y < vec2.y) ? vec1.y : vec2.y;
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
    var result = new Vector2();
    Atlantis.Vector2.maxToRef(vec1, vec2, result);
    return result;
};

Atlantis.Vector2.maxToRef = function (vec1, vec2, result) {
    result.x = (vec1.x > vec2.x) ? vec1.x : vec2.x;
    result.y = (vec1.y > vec2.y) ? vec1.y : vec2.y;
};

/**
* Negate this vector
* @method negate
*/
Atlantis.Vector2.prototype.negate = function (value) {
    if (typeof(value) === "number") {
        this.x = -value;
        this.y = -value;
    }
    else {
        this.x = -value.x;
        this.y = -value.y;
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
    var vec = vector.clone();
    vec.x *= -1;
    vec.y *= -1;
    return vec;
};

/**
* Normalize this vector.
* @method normalize
*/
Atlantis.Vector2.prototype.normalize = function () {
    Atlantis.Vector2.normalizeToRef(this);
};

/** Gets a normalized vector.
* 
* @method normalize
* @static
* @param {Atlantis.Vector2} A vector to normalize.
*/
Atlantis.Vector2.normalize = function (vector) {
    var vec = vector.clone();
    vec.normalize();
    return vec;
};

Atlantis.Vector2.normalizeToRef = function (vector) {
    var distance = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));

    if (!distance) {
        vector.x = 0;
        vector.y = 0;
    }

    var value = 1.0 / distance;
    
    vector.x *= value;
    vector.y *= value;
};

Atlantis.Vector2.reflect = function (vector, normal) {
    var result = new Atlantis.Vector2();
    Atlantis.ReflectToRef(vector, normal, result);
    return result;
};

Atlantis.Vector2.reflectToRef = function (vector, normal, result) {
    var val = 2 * ((vector.x * normal.x) + (vector.y * normal.y));
    result.x = vector.x - (normal.x * val);
    result.y = vector.y - (normal.y * val);
};

Atlantis.Vector2.smoothStep = function (value1, value2, amount) {
    var result = new Atlantis.Vector2();
    Atlantis.Vector2.smoothStepToRef(value1, value2, amount, result);
    return result;
}

Atlantis.Vector2.smoothStepToRef = function (value1, value2, amount, result) {
    result.x = Atlantis.MathHelper.smoothStep(value1.x, value2.x, amount);
    result.y = Atlantis.MathHelper.smoothStep(value1.y, value2.y, amount);
}

/**
* Gets a transformed vector from a position and a matrix.
* @method transform
* @param {Atlantis.Vector2} position
* @param {Atlantis.Matrix} matrix
* @return {Atlantis.Vector2} A tranformed vector.
*/
Atlantis.Vector2.transform = function (position, matrix) {
    var vector = new Atlantis.Vector3();
    Atlantis.Vector2.transformToRef(position, matrix, vector);
    return vector;
};

Atlantis.Vector2.transformToRef = function (position, matrix, result) {
    var x = (position.x * matrix.M11) + (position.y * matrix.M21) + matrix.M41;
    var y = (position.x * matrix.M12) + (position.y * matrix.M22) + matrix.M42;
    result.x = x;
    result.x = y;
};

Atlantis.Vector2.transformNormal = function (normal, matrix) {
    var vector = new Atlantis.Vector3();
    Atlantis.Vector2.transformNormalToRef(normal, matrix, vector);
    return vector;
};

Atlantis.Vector2.transformNormalToRef = function (normal, matrix, result) {
    var x = (normal.x * matrix.M11) + (normal.y * matrix.M21);
    var y = (normal.x * matrix.M12) + (normal.y * matrix.M22);
    result.x = x;
    result.y = y;
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

Atlantis.Vector2.prototype.clone = function () {
    return new Atlantis.Vector2(this.x, this.y);
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Vector2.prototype.toString = function () {
    return ["x: ", this.x, " y: ", this.y].join("");
};
