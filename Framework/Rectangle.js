/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = Atlantis || {};

/**
 * Describes a rectangle structure.
 * @constructor
 * @class Rectangle
 * @param {Number} x A value for X coordinate.
 * @param {Number} y A value for Y coordinate.
 * @param {Number} width A value for the width of the rectangle.
 * @param {Number} height A value for the height of the rectangle
 */
Atlantis.Rectangle = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
};

/**
 * Add a rectangle to this rectangle.
 * @method add
 * @param {Atlantis.Rectangle} rectangle The rectangle to add.
 */
Atlantis.Rectangle.prototype.add = function(rectangle) {
    this.x += rectangle.x;
    this.y += rectangle.y;
    this.width += rectangle.width;
    this.height += rectangle.height;
};

/**
 * Divide a rectangle to this rectangle.
 * @method divide
 * @param {Atlantis.Rectangle} rectangle The rectangle to divide.
 */
Atlantis.Rectangle.prototype.divide = function(rectangle) {
    this.x /= rectangle.x;
    this.y /= rectangle.y;
    this.width /= rectangle.width;
    this.height /= rectangle.height;
};

Atlantis.Rectangle.prototype.fromRectangle = function(rectangle) {
    this.x = rectangle.x ? +rectangle.x : 0;
    this.y = rectangle.y ? +rectangle.y : 0;
    this.width = rectangle.width ? +rectangle.width : 0;
    this.height = rectangle.height ? +rectangle.height : 0;
};

/**
 * Multiply a rectangle to this rectangle.
 * @method multiply
 * @param {Atlantis.Rectangle} rectangle The rectangle to multiply.
 */
Atlantis.Rectangle.prototype.multiply = function(rectangle) {
    this.x *= rectangle.x;
    this.y *= rectangle.y;
    this.width *= rectangle.width;
    this.height *= rectangle.height;
};

/**
 * Subtract a rectangle to this rectangle.
 * @method subtract
 * @param {Atlantis.Rectangle} rectangle The rectangle to subtract.
 */
Atlantis.Rectangle.prototype.subtract = function(rectangle) {
    this.x -= rectangle.x;
    this.y -= rectangle.y;
    this.width -= rectangle.width;
    this.height -= rectangle.height;
};

/**
 * Determine if a Rectangle, Point or coordinates are contains in rectangle
 * @method contains
 * @param {Number|Point|Rectangle} X coordinate or an instance of Point or an instance of Rectangle.
 * @param {Number} Y coordinate.
 */
Atlantis.Rectangle.prototype.contains = function(value1, value2) {
    if (value1 instanceof Atlantis.Rectangle) {
        return (this.x <= value1.x) && (value1.getRight() <= this.getRight()) && (this.y <= value1.y) && (value1.getBottom() <= this.getBottom());
    } else {
        return (this.x <= value1) && (value1 < this.getRight()) && (this.y <= value2) && (value2 < this.getBottom());
    }
};

/**
 *
 * @method contains
 */
Atlantis.Rectangle.prototype.intersects = function(rectangle) {
    return (rectangle.getLeft() < this.getRight()) && (this.getLeft() < rectangle.getRight()) && (rectangle.getTop() < this.getBottom()) && (this.getTop() < rectangle.getBottom());
};

Atlantis.Rectangle.prototype.toString = function() {
    return ["x: ", this.x, " y: ", this.y, " width: ", this.width, " height: ", this.height].toString();
};

/**
 * gets the position.
 * @return The position.
 */
Atlantis.Rectangle.prototype.toVector2 = function() {
    return new Atlantis.Vector2(this.x, this.y);
};

/**
 * Gets the position.
 * @return The position.
 */
Atlantis.Rectangle.prototype.toPoint = function() {
    return new Atlantis.Point(this.x, this.y);
};

// ---
// --- Getters and setters
// ---

/**
 * Gets the top value.
 * @method getTop
 * @return {Number} Top coordinate (y)
 */
Atlantis.Rectangle.prototype.getTop = function() {
    return this.y;
};

/**
 * Gets the bottom value.
 * @method getBottom
 * @return {Number} Bottom coordinate (y + height)
 */
Atlantis.Rectangle.prototype.getBottom = function() {
    return this.y + this.height;
};

/**
 * Gets the left value.
 * @method getLeft
 * @return {Number} Left coordinate (x)
 */
Atlantis.Rectangle.prototype.getLeft = function() {
    return this.x;
};

/**
 * Gets the right value.
 * @method getRight
 * @return {Number} Right value (x + width)
 */
Atlantis.Rectangle.prototype.getRight = function() {
    return this.x + this.width;
};

/**
 * Gets the center of the rectangle.
 * @method getCenter
 * @return {Number} Center of the rectangle.
 * @return {Atlantis.Point} A point of the center of the rectangle.
 */
Atlantis.Rectangle.prototype.getCenter = function() {
    return new Atlantis.Point(this.x + (this.width / 2), this.y + (this.height / 2));
};

/**
 * Gets width
 * @return {Number} Return the with.
 */
Atlantis.Rectangle.prototype.getWidth = function() {
    return this.width;
};

/**
 * Gets height
 * @return {Number} Return the height
 */
Atlantis.Rectangle.prototype.getHeight = function() {
    return this.height;
};

/**
 * Gets the top center.
 * @return {Atlantis.Vector2} The top center of the rectangle
 */
Atlantis.Rectangle.prototype.getTopCenter = function() {
    return new Atlantis.Vector2(this.x + this.width / 2, this.y);
};

/**
 * Gets the bottom center.
 * @return {Atlantis.Vector2} The bottom center.
 */
Atlantis.Rectangle.prototype.getBottomCenter = function() {
    return new Atlantis.Vector2(this.x + this.width / 2, this.y + this.height);
};

/**
 * Gets the left center.
 * @return {Atlantis.Vector2} The left center.
 */
Atlantis.Rectangle.prototype.getLeftCenter = function() {
    return new Atlantis.Vector2(this.x, this.y + this.height / 2);
};

/**
 * Gets the right center.
 * @return {Atlantis.Vector2} The right center.
 */
Atlantis.Rectangle.prototype.getRightCenter = function() {
    return new Atlantis.Vector2(this.x + this.width, this.y + this.height / 2);
};

/**
 * Sets values to rectangle.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
Atlantis.Rectangle.prototype.set = function(x, y, width, height) {
    if (x instanceof Atlantis.Rectangle) {
        this.x = x.x;
        this.y = x.y;
        this.width = x.width;
        this.height = x.height;
    } else {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
};

/**
 * Sets the position of the rectangle
 * @param {Number|Altantis.Vector2|Atlantis.Point} x
 * @param {Number} y
 */
Atlantis.Rectangle.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Sets the size of the rectangle.
 * @param {Number} width
 * @param {Number} height
 */
Atlantis.Rectangle.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
};

Atlantis.Rectangle.prototype.clone = function() {
    return new Atlantis.Rectangle(this.x, this.y, this.width, this.height);
};

/**
 * Gets a string from this object.
 * @method toString
 * @return {String}
 */
Atlantis.Rectangle.prototype.toString = function() {
    return ["x: ", this.x, " y: ", this.y, " width: ", this.width, " height: ", this.height].join("");
};