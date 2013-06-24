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
    * Add a matrix to this matrix.
    * @param matrix A matrix to add.
    */
    matrix.prototype.add = function (matrix) {
        var mValues = this.toArray();
        var eValues = matrix.toArray();

        for (var i = 0; i < 16; i++) {
            mValues[i] += eValues[i];
        }
        this.set(mValues);
    }

    /**
    * Add two matrix.
    * @method add
    * @static
    * @param {Atlantis.Matrix} matA A matrix
    * @param {Atlantis.Matrix} matB Another matrix to add with the first
    * @return {Atlantis.Matrix} Return a new matrix.
    */
    matrix.add = function (matA, matB) {
        var matrix = new Atlantis.Matrix(matA);
        matrix.add(matB);
        return matrix;
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

    /**
    * Create a scale matrix.
    * @method createScale
    * @static
    * @param {Number} sx Desired scale on X axis.
    * @param {Number} sy Desired scale on Y axis.
    * @param {Number} sz Desired scale on Z axis.
    * @return {Atlantis.Matrix} Return a scale matrix.
    */
    matrix.createScale = function (sx, sy, sz) {
        var matrix = Atlantis.Matrix.getMatrixIdentity();
        matrix.M11 = sx;
        matrix.M22 = sy || sx;
        matrix.M33 = sz || sx;
        return matrix;
    };

    /**
    * Create a translation matrix.
    * @method createTranslation
    * @static
    * @param x Position on X axis.
    * @param y Position on Y axis.
    * @param z Position on Z axis.
    * @return Return a matrix translation.
    */
    matrix.createTranslation = function (x, y, z) {
        var matrix = Atantis.Matrix.getMatrixIdentity();
        matrix.M41 = x;
        matrix.M42 = y || x;
        matrix.M43 = z || x;
        return matrix;
    };

    /**
    * Create a view matrix.
    * @metod createLookAt
    * @static
    * @param {Atlantis.Vector3} position The position of the camera.
    * @param Atlantis.Vector3} target The target of the camera.
    * @param Atlantis.Vector3} upVector Vector up
    * @return {Atlantis.Matrix} Return a view camera.
    */
    matrix.createLookAt = function (position, target, upVector) {
        var zAxis = Atlantis.Vector3.subtract(target, position);
        zAxis.normalize();
        var xAxis = Atlantis.Vector3.cross(upVector, zAxis);
        xAxis.normalize();
        var yAxis = Atlantis.Vector3.cross(zAxis, xAxis);
        yAxis.normalize();

        var matrix = Atlantis.Matrix.getMatrixIdentity();

        matrix.M11 = xAxis.x;
        matrix.M21 = xAxis.y;
        matrix.M31 = xAxis.z;

        matrix.M12 = yAxis.x;
        matrix.M22 = yAxis.y;
        matrix.M32 = yAxis.z;

        matrix.M13 = zAxis.x;
        matrix.M23 = zAxis.y;
        matrix.M33 = zAxis.z;

        matrix.M41 = -Atlantis.Vector3.dot(xAxis, position);
        matrix.M42 = -Atlantis.Vector3.dot(yAxis, position);
        matrix.M43 = -Atlantis.Vector3.dot(zAxis, position);

        return matrix;
    };

   /**
	 * Create a perspective field of view matrix with Left hand notation.
     * @method createPerspectiveFieldOfView
     * @static
	 * @param {Number} fov Desired field of view (Math.PI / 4 is a good value)
	 * @param {Number} aspect Desired aspect ratio (Screen width / height)
	 * @param {Number} near Near clip
	 * @param {Number} far Far clip
	 * @return {Atlantis.Matrix} Return a matrix of this type of perspective.
	 */
	matrix.createPerspectiveFieldOfView = function (fov, aspect, zNear, zFar) {
		var yScale = (float)(1.0 / Math.tan(fov * 0.5f));
		var xScale = yScale / aspect;
		var halfWidth = zNear / xScale;
		var halfHeight = zNear / yScale;
		
		return Atlantis.Matrix.createPerspectiveOffCenter(-halfWidth, halfWidth, -halfHeight, halfHeight, zNear, zFar);
	};
	
	/**
	 * Create a perspective field of view matrix with Right hand notation.
     * @method createPerspectiveFieldOfViewRH
     * @static
	 * @param {Number} fov Desired field of view (Math.PI / 4 is a good value)
	 * @param {Number} aspect Desired aspect ratio (Screen width / height)
	 * @param {Number} near Near clip
	 * @param {Number} far Far clip
	 * @return {Atlantis.Matrix} Return a matrix of this type of perspective.
	 */
	matrix.createPerspetiveFieldOfViewRH = function (fov, aspect, zNear, zFar) {
		var matrix = Atlantis.Matrix.createPerspectiveFieldOfView(fov, aspect, zNear, zFar);
		matrix.M31 *= -1.0;
		matrix.M32 *= -1.0;
		matrix.M33 *= -1.0;
		matrix.M34 *= -1.0;
		return matrix;
	};

    /**
    * Create a custom perspective matrix.
    * @method createPerspectiveOffCenter
    * @static
    * @param {Number} left Minimum X value of the viewing volume.
    * @param {Number} right Maximum X value of the viewing volume.
    * @param {Number} bottom Minimum Y value of the viewing volume.
    * @param {Number} top Maximum Y value of the viewing volume.
    * @param {Number} zNear Minimum Z value of the viewing volume.
    * @param {Number} zFar Maximum Z value of the viewing volume.
    * @return {Atlantis.Matrix} Return a new custom perspective matrix.
    */
    matrix.createPerspectiveOffCenter = function (left, right, bottom, top, zNear, zFar) {
        var zRange = zFar / (zFar - zNear);
        var matrix = new Atlantis.Matrix();
        matrix.M11 = 2.0 * zNear / (right - left);
        matrix.M22 = 2.0 * zNear / (top - bottom);
        matrix.M31 = (left + right) / (left - right);
        matrix.M32 = (top + bottom) / (bottom - top);
        matrix.M33 = zRange;
        matrix.M34 = 1.0;
        matrix.M43 = -zNear * zRange;
        return matrix;
    };

    /**
	 * Create a world matrix.
     * @method createWorld
     * @static
	 * @param {Atlantis.Vector3} position
	 * @param {Atlantis.Vector3} forward
	 * @param {Atlantis.Vector3} upVector
	 * @return {Atlantis.Matrix} Return a world matrix.
	 */
	matrix.createWorld = function (position, forward, upVector) {
		var matrix = new Atlantis.Matrix();
		
		var x = Atlantis.Vector3.cross(forward, upVector);
		var y = Atlantis.Vector3.cross(x, forward);
		var z = Atlantis.Vector3.normalize(forward);
		x.normalize();
		y.normalize();
		
		//matrix.setRight(x);
		//matrix.setUp(y);
		//matrix.setForward(z);
		matrix.setTranslation(position);
		matrix.M44 = 1.0;
		
		return matrix;
	}

    /**
    * Multiply this matrix by another matrix.
    * @method multiply
    * @param {Atlantis.Matrix} matrix A matrix to multiply.
    */
    matrix.prototype.multiply = function (matrix) {
        var m11 = (((this.M11 * matrix.M11) + (this.M12 * matrix.M21)) + (this.M13 * matrix.M31)) + (this.M14 * matrix.M41);
        var m12 = (((this.M11 * matrix.M12) + (this.M12 * matrix.M22)) + (this.M13 * matrix.M32)) + (this.M14 * matrix.M42);
        var m13 = (((this.M11 * matrix.M13) + (this.M12 * matrix.M23)) + (this.M13 * matrix.M33)) + (this.M14 * matrix.M43);
        var m14 = (((this.M11 * matrix.M14) + (this.M12 * matrix.M24)) + (this.M13 * matrix.M34)) + (this.M14 * matrix.M44);
        var m21 = (((this.M21 * matrix.M11) + (this.M22 * matrix.M21)) + (this.M23 * matrix.M31)) + (this.M24 * matrix.M41);
        var m22 = (((this.M21 * matrix.M12) + (this.M22 * matrix.M22)) + (this.M23 * matrix.M32)) + (this.M24 * matrix.M42);
        var m23 = (((this.M21 * matrix.M13) + (this.M22 * matrix.M23)) + (this.M23 * matrix.M33)) + (this.M24 * matrix.M43);
        var m24 = (((this.M21 * matrix.M14) + (this.M22 * matrix.M24)) + (this.M23 * matrix.M34)) + (this.M24 * matrix.M44);
        var m31 = (((this.M31 * matrix.M11) + (this.M32 * matrix.M21)) + (this.M33 * matrix.M31)) + (this.M34 * matrix.M41);
        var m32 = (((this.M31 * matrix.M12) + (this.M32 * matrix.M22)) + (this.M33 * matrix.M32)) + (this.M34 * matrix.M42);
        var m33 = (((this.M31 * matrix.M13) + (this.M32 * matrix.M23)) + (this.M33 * matrix.M33)) + (this.M34 * matrix.M43);
        var m34 = (((this.M31 * matrix.M14) + (this.M32 * matrix.M24)) + (this.M33 * matrix.M34)) + (this.M34 * matrix.M44);
        var m41 = (((this.M41 * matrix.M11) + (this.M42 * matrix.M21)) + (this.M43 * matrix.M31)) + (this.M44 * matrix.M41);
        var m42 = (((this.M41 * matrix.M12) + (this.M42 * matrix.M22)) + (this.M43 * matrix.M32)) + (this.M44 * matrix.M42);
        var m43 = (((this.M41 * matrix.M13) + (this.M42 * matrix.M23)) + (this.M43 * matrix.M33)) + (this.M44 * matrix.M43);
        var m44 = (((this.M41 * matrix.M14) + (this.M42 * matrix.M24)) + (this.M43 * matrix.M34)) + (this.M44 * matrix.M44);

        this.M11 = m11;
        this.M12 = m12;
        this.M13 = m13;
        this.M14 = m14;
        this.M21 = m21;
        this.M22 = m22;
        this.M23 = m23;
        this.M24 = m24;
        this.M31 = m31;
        this.M32 = m32;
        this.M33 = m33;
        this.M34 = m34;
        this.M41 = m41;
        this.M42 = m42;
        this.M43 = m43;
        this.M44 = m44;
    };

    /**
    * Multiply a two matrix.
    * @method multiply
    * @static
    * @param {Atlantis.Matrix} matrixA A matrix.
    * @param {Atlantis.Matrix} matrixB Another matrix.
    * @param {Atlantis.Matrix} matrixC Another matrix (optional).
    * @return {Atlantis.Matrix} Return a new matrix.
    */
    matrix.multiply = function (matrixA, matrixB, matrixC) {
        var matrix = new Atlantis.Matrix(matrixA);
        matrix.multiply(matrixB);

        if (matrixC instanceof Atlantis.Matrix) {
            matrix.multiply(matrixC);
        }

        return matrix;
    };

    /**
    * Subtract a matrix to this matrix.
    * @method subtract
    * @param {Atlantis.Matrix} matrix A matrix to add.
    */
    matrix.prototype.subtract = function (matrix) {
        var mValues = this.toArray();
        var eValues = matrix.toArray();

        for (var i = 0; i < 16; i++) {
            mValues[i] -= eValues[i];
        }
        this.set(mValues);
    }

    /**
    * Subtract two matrix.
    * @method subtract
    * @static
    * @param {Atlantis.Matrix} matA A matrix.
    * @param {Atlantis.Matrix} matB Another matrix to use to subtract with the first matrix.
    * @return {Atlantis.Matrix} Return a new matrix.
    */
    matrix.subtract = function (matA, matB) {
        var mat = new Atlantis.Matrix(matA);
        mat.subtract(matB);
        return mat;
    }

    matrix.prototype.toString = function () {
        var values = this.toArray();
        var builder = [];

        for (var i = 0; i < 16; i += 4) {
            builder.push("[");
            builder.push(values[i] + " ");
            builder.push(values[i + 1] + " ");
            builder.push(values[i + 2] + " ");
            builder.push(values[i + 3]);
            builder.push("] ");
        }
        return builder.join("");
    };

    return matrix;
})();