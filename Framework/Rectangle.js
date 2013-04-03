/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

 var Atlantis = Atlantis || {};

/**
 * A class that represent a point structure
 */
Atlantis.Point = (function () {
    /**
    * Create a point structure.
    * @constructor
    * @class Point
    * @param {Number} x A value for X coordinate.
    * @param {Number} y A value for Y coordinate.
    */
    var point = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    return point;
})();

/** 
 * A class that represent a rectangle structure
 *
 */
Atlantis.Rectangle = (function () {
    /**
     * Create a rectangle structure.
     * @constructor
     * @class Rectangle
     * @param {Number} x A value for X coordinate.
     * @param {Number} y A value for Y coordinate.
     * @param {Number} width A value for the width of the rectangle.
     * @param {Number} height A value for the height of the rectangle
     */
    var rectangle = function (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };

    /**
     * Gets the top value.
     * @method getTop
     * @return {Number} Top coordinate (y)
     */
    rectangle.prototype.getTop = function () {
        return this.y;
    };

    /**
     * Gets the bottom value.
     * @method getBottom
     * @return {Number} Bottom coordinate (y + height)
     */
    rectangle.prototype.getBottom = function () {
        return this.y + this.height;
    };

    /**
     * Gets the left value.
     * @method getLeft
     * @return {Number} Left coordinate (x)
     */
    rectangle.prototype.getLeft = function () {
        return this.x;
    };

    /**
     * Gets the right value.
     * @method getRight
     * @return {Number} Right value (x + width)
     */
    rectangle.prototype.getRight = function () {
        return this.x + this.width;
    };

    /**
     * Gets the center of the rectangle.
     * @method getCenter
     * @return {Number} Center of the rectangle.
     * @return {Atlantis.Point} A point of the center of the rectangle.
     */
    rectangle.prototype.getCenter = function () {
        return new Atlantis.Point(this.x + (this.width / 2), this.y + (this.height / 2));
    };

    /**
     *
     * @method contains
     */ 
    rectangle.prototype.contains = function (value) {
        if (value instanceof Atlantis.Point) {
            return (this.x <= value.x) && (value.x < this.getRight()) && (this.y <= value.y) && (value.y < this.getBottom());
        }
        else if (value instanceof Atlantis.Rectangle) {
            return (this.x <= value.x) && (value.getRight() <= this.getRight()) && (this.y <= value.y) && (value.getBottom() <= this.getBottom());
        }
        return false;
    };

    /**
     *
     * @method contains
     */ 
    rectangle.prototype.intersects = function (rectangle) {
        return (rectangle.getLeft() < this.getRight()) && (this.getLeft() < rectangle.getRight()) && (rectangle.getTop() < this.getBottom()) && (this.getTop() < rectangle.getBottom());
    };

    return rectangle;
})();