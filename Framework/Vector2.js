/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A Vector2 class.
 */
Atlantis.Vector2 = (function () {
    /**
     * Create a new Vector2
     * @constructor
     * @class Vector2
     */
    var vector2 = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Add this vector by another vector or value.
     * @method add
     * @param {Atlantis.Vector2} value A vector or a value to add to this vector.
     */
    vector2.prototype.add = function (value) {
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
     * Substract this vector by another vector or value.
     * @method subtract
     * @param {Atlantis.Vector2} value A vector or a value to subtract to this vector.
     */
    vector2.prototype.subtract = function (value) {
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
     * Divide this vector by another vector
     * @method divide
     * @param {Atlantis.Vector2} value A vector or a value to divide to this vector.
     */
    vector2.prototype.divide = function (value) {
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
     * Multiply this vector by another vector or a value.
     * @method multiply
     * @param {Atlantis.Vector2} value A vector or a value to multiply to this vector.
     */
    vector2.prototype.multiply = function (value) {
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
     * Negate this vector
     * @method negate
     */
    vector2.prototype.negate = function (value) {
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
     * Normalize this vector.
     * @method normalize
     */
    vector2.prototype.normalize = function () {
        var value = 1 / (Math.sqrt(this.x * this.x) + (this.y * this.y));
        this.x *= value;
        this.y *= value;
    };

    /**
     * Gets distance between this vector and the vector passed in parameter.
     * @method getDistance
     * @param {Atlantis.Vector2} vector2 The vector2 to use to determine the distance.
     * @return {Number} The distance between this vector and the vector passed in parameter.
     */
    vector2.prototype.distance = function (vector2) {
        var v1 = this.x - vector2.x;
        var v2 = this.y - vector2.y;
        return Math.sqrt((v1 * v1) + (v2 * v2));
    };

    return vector2;
})();