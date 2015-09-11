/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Describes a 4D-vector.
 * @constructor
 * @class Vector4
 * @param {Number|Atlantis.Vector4} Value for x coordinate or a Vector4 object.
 * @param {Number} Value for y coordinate
 * @param {Number} Value for z coordinate.
 * @param {Number} Value for w coordinate.
 */
Atlantis.Vector4 = function(x, y, z, w) {
    this.x = x ? +x : 0;
    this.y = y ? +y : 0;
    this.z = z ? +z : 0;
    this.z = w ? +w : 0;
};

/**
 * Copy a vector to this vector.
 * @method fromVector
 * @param {Vector4} vector The vector to use.
 */
Atlantis.Vector4.prototype.fromVector = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    this.w = vector.w;
};

/**
 * Linear interpolation.
 * @method lerp
 * @param {Atlantis.Vector4} vector A vector to use for interpolation
 * @param {Number} amount Value between 0 and 1 indicating the weight of vector.
 */
Atlantis.Vector4.prototype.lerp = function(vector, amount) {
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
Atlantis.Vector4.lerp = function(vec1, vec2, amount) {
    var vector = new Atlantis.Vector4(vec1);
    vector.lerp(vec2, amount);
    return vector;
};

Atlantis.Vector4.prototype.clone = function() {
    return new Atlantis.Vector4(this.x, this.y, this.z, this.w);
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Vector4.prototype.toString = function() {
    return ["x: ", this.x, " y: ", this.y, " z: ", this.z, " w: ", this.w].join("");
};