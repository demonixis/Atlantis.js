var Atlantis = Atlantis || {};

(function () {
    // Define a point
    Atlantis.Point = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

    /**
     * Create a new Rectangle
     */
	Atlantis.Rectangle = function (x, y, width, height) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
	};

    /**
     * Gets the top value.
     * @return Top coordinate (y)
     */
    Atlantis.Rectangle.prototype.getTop = function() {
        return this.y;
    };

    /**
     * Gets the bottom value.
     * @return Bottom coordinate (y + height)
     */
    Atlantis.Rectangle.prototype.getBottom = function() {
        return this.y + this.height;
    };

    /**
     * Gets the left value.
     * @return Left coordinate (x)
     */
    Atlantis.Rectangle.prototype.getLeft = function() {
       return this.x; 
    };

    /**
     * Gets the right value.
     * @return Right value (x + width)
     */
    Atlantis.Rectangle.prototype.getRight = function() {
        return this.x + this.width;
    };

    /**
     * Gets the center value.
     * @return Center of the rectangle
     */
    Atlantis.Rectangle.prototype.getCenter = function () {
        return new Atlantis.Point(this.x + (this.width / 2), this.y + (this.height / 2));
    };

    Atlantis.Rectangle.prototype.contains = function(value) {
        if (value instanceof Atlantis.Point) {
            return (this.x <= value.x) && (value.x < this.getRight()) && (this.y <= value.y) && (value.y < this.getBottom());
        }
        else if (value instanceof Atlantis.Rectangle) {
            return (this.x <= value.x) && (value.getRight() <= this.getRight()) && (this.y <= value.y) && (value.getBottom() <= this.getBottom());
        }
        return false;
    };

    Atlantis.Rectangle.prototype.intersects = function (rectangle) { 
        return (rectangle.getLeft() < this.getRight()) && (this.getLeft() < rectangle.getRight()) && (rectangle.getTop() < this.getBottom()) && (this.getTop() < rectangle.getBottom());  
    };
})();