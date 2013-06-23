/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Matrix = (function () {
    /**
    * Create a matrix. Parameter can be a matrix, an array of 16 floats or nothing (all fields case are sets to 0).
    * @class
    * @constructor
    * @param {Atlantis.Matrix|Array} 
    */
    var matrix = function (values) {
        if (values instanceof Atlantis.Matrix) {
            var values = values.toArray();
            this.set(values);
        }
        else if (values instanceof Array && values.length == 16) {
            this.set(values);
        }
        else {
            this.M11 = 0; this.M12 = 0; this.M13 = 0; this.M14 = 0;
            this.M21 = 0; this.M22 = 0; this.M23 = 0; this.M24 = 0;
            this.M31 = 0; this.M32 = 0; this.M33 = 0; this.M34 = 0;
            this.M41 = 0; this.M42 = 0; this.M43 = 0; this.M44 = 0;
        }
    };

    /**
    * Set all values of the matrix.
    * @method set
    * @param {Array} values An array of 16 values who start at M11 and stop at M44
    */
    matrix.prototype.set = function (values) {
        if (values.length == 16) {
            this.M11 = values[0]; this.M12 = values[1]; this.M13 = values[2]; this.M14 = values[3];
            this.M21 = values[4]; this.M22 = values[5]; this.M23 = values[6]; this.M24 = values[7];
            this.M31 = values[8]; this.M32 = values[9]; this.M33 = values[10]; this.M34 = values[11];
            this.M41 = values[12]; this.M42 = values[13]; this.M43 = values[14]; this.M44 = values[15];
        }
    };

    /**
    * Gets identity value for push it into matrix.
    * @method getIdentityValues
    * @static
    * @return {Array} Return an array that correspond of identity matrix.
    */
    matrix.getIdentityValues = function () {
        var values = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
        return values;
    };

    /**
    * Sets the matrix to identity.
    * @method setIdentity
    */
    matrix.prototype.setIdentity = function () {
        this.set(Atlantis.Matrix.getIdentityValues());
    };

    /**
    * Gets an identity matrix.
    * @method getMatrixIdentity
    * @static
    * @return {Atlantis.Matrix} Return an identity matrix.
    */
    matrix.getMatrixIdentity = function () {
        var matrix = new Atlantis.Matrix();
        matrix.setIdentity();
        return matrix;
    };

    /**
    * Gets values of matrix in array. Start at M11 to M44.
    * @method toArray
    * @return {Array} An array of values.
    */
    matrix.prototype.toArray = function () {
        var values = [
			this.M11, this.M12, this.M13, this.M14,
			this.M21, this.M22, this.M23, this.M24,
			this.M31, this.M32, this.M33, this.M34,
			this.M41, this.M42, this.M43, this.M44,
		];
        return values;
    };

    /**
    * Sets translation.
    * @method setTranslation
    * @param {Atlantis.Vetor3} position The position to set.
    */
    matrix.prototype.setTranslation = function (position) {
        this.M41 = position.x;
        this.M42 = position.y;
        this.M43 = position.z;
    };

    /**
    * Create a rotation matrix on X axis.
    * @method createRotationX
    * @static
    * @param {Atlantis.Vector3} rotation An angle in radians
    * @return {Atlantis.Matrix} Return a rotation matrix on X axis.
    */
    matrix.createRotationX = function (rotation) {
        var matrix = getMatrixIdentity();
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);

        matrix.M22 = cos;
        matrix.M23 = sin;
        matrix.M32 = -sin;
        matrix.M33 = cos;
        return matrix;
    };

    /**
    * Create a rotation matrix on Y axis.
    * @method createRotationY
    * @static
    * @param {Atlantis.Vector3} rotation An angle in radians
    * @return {Atlantis.Matrix} Return a rotation matrix on Y axis.
    */
    matrix.createRotationY = function (rotation) {
        var matrix = getMatrixIdentity();
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);

        matrix.M11 = cos;
        matrix.M13 = -sin;
        matrix.M31 = sin;
        matrix.M33 = cos;
        return matrix;
    };

    /**
    * Create a rotation matrix on Z axis.
    * @method createRotationX
    * @static
    * @param {Atlantis.Vector3} rotation An angle in radians
    * @return {Atlantis.Matrix} Return a rotation matrix on Z axis.
    */
    matrix.createRotationZ = function (rotation) {
        var matrix = this.getMatrixIdentity();

        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);

        matrix.M11 = cos;
        matrix.M13 = sin;
        matrix.M31 = -sin;
        matrix.M33 = cos;

        return matrix;
    };

    return matrix;
})();