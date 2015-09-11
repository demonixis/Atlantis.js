/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = Atlantis || {};

/**
 * Describes a quaternion.
 * @class Quaternion
 * @constructor
 * @param {Number|Quaternion} x Value for X coordinate.
 * @param {Quaternion} y Value for Y coordinate.
 * @param {Quaternion} z Value for Z coordinate.
 * @param {Quaternion} w Value for W coordinate.
 */
Atlantis.Quaternion = function(x, y, z, w) {
    this.x = x ? +x : 0;
    this.y = y ? +y : 0;
    this.z = z ? +z : 0;
    this.z = w ? +w : 0;
};

Atlantis.Quaternion.prototype.fromQuaternion = function(quaternion) {
    this.x = quaternion.x;
    this.y = quaternion.y;
    this.z = quaternion.z;
    this.w = quaternion.w;
};

/**
 * Gets an Quaternion sets to identity.
 * @method Identity
 * @return {Atlantis.Quaternion} Return a new Quaternion sets to identity.
 */
Atlantis.Quaternion.Identity = function() {
    return new Atlantis.Quaternion(0, 0, 0, 1);
};

/**
 * Add a Quaternion to this quaternion.
 * @method add
 */
Atlantis.Quaternion.prototype.add = function(quaternion) {
    this.x += quaternion.x;
    this.y += quaternion.y;
    this.z += quaternion.z;
    this.w += quaternion.w;
};

/**
 * Add two quaternions.
 * @method add
 * @static
 * @method {Atlantis.Quaternion} quaternion1
 * @method {Atlantis.Quaternion} quaternion1
 * @return {Atlantis.Quaternion} Return a new quaternion.
 */
Atlantis.Quaternion.add = function(quaternion1, quaternion2) {
    var result = new Atlantis.Quaternion(quaternion1);
    result.add(quaternion2);
    return result;
};

/**
 * Conjugate the Quaternion.
 * @method conjugate
 */
Atlantis.Quaternion.prototype.conjugate = function() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
};

/**
 * Gets a quaternion who's the conjugate of the quaternion passed to parameter.
 * @method conjugate
 * @static
 * @param {Atlantis.Quaternion} A quaterion to conjugate.
 * @return {Atlantis.Quaternion} Return a new conjugate Quaternion.
 */
Atlantis.Quaternion.conjugate = function(quaternion) {
    var result = new Atlantis.Quaternion(quaternion);
    result.conjugate();
    return result;
};

/**
 * Create a quaternion with three rotations
 * @param yaw Value of yaw rotation (Y)
 * @param pitch Value of pitch rotation (X)
 * @param roll Value of roll rotation (Z)
 * @return Return a quaternion with three rotations.
 */
Atlantis.Quaternion.createFromYawPitchRoll = function(yaw, pitch, roll) {
    var result = new Atlantis.Quaternion();

    var halfYaw = yaw * 0.5;
    var halfPitch = pitch * 0.5;
    var halfRoll = roll * 0.5;

    var sinYaw = Math.sin(halfYaw);
    var cosYaw = Math.cos(halfYaw);
    var sinPitch = Math.sin(halfPitch);
    var cosPitch = Math.cos(halfPitch);
    var sinRoll = Math.sin(halfRoll);
    var cosRoll = Math.cos(halfRoll);

    result.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
    result.y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
    result.z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
    result.w = (cosYaw * cosPitch * cosRoll) - (sinYaw * sinPitch * sinRoll);

    return result;
};

Atlantis.Quaternion.prototype.clone = function() {
    return new Atlantis.Quaternion(this.x, this.y, this.z, this.w);
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Quaternion.prototype.toString = function() {
    return ["x: ", this.x, " y: ", this.y, " z: ", this.z, " w: ", this.w].join("");
};