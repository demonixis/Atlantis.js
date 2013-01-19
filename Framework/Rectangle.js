var Atlantis = Atlantis || {};

(function () {
    // Define a point
    Atlantis.Point = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

    // Define a rectangle
	Atlantis.Rectangle = function (x, y, width, height) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
	};

    Atlantis.Rectangle.prototype.getTop = function() {
        return this.y;
    };

    Atlantis.Rectangle.prototype.getBottom = function() {
        return this.y + this.height;
    };

    Atlantis.Rectangle.prototype.getLeft = function() {
       return this.x; 
    };

    Atlantis.Rectangle.prototype.getRight = function() {
        return this.x + this.width;
    };

    Atlantis.Rectangle.prototype.getCenter = function () {
        return new Atlantis.Point(this.x + (this.width / 2), this.y + (this.height / 2));
    };

    Atlantis.Rectangle.prototype.contains = function(value) {
        if (object instanceof Atlantis.Point) {
            return (this.x <= value.x) && (value.x < this.getRight()) && (this.y <= value.y) && (value.y < this.getBottom());
        }
        else if (object instanceof Atlantis.Rectangle) {
            return (this.x <= value.x) && (value.getRight() <= this.getRight()) && (this.y <= value.y) && (value.getBottom() <= this.getBottom());
        }
        return false;
    };

    Atlantis.Rectangle.prototype.intersects = function (rectangle) {
        return (rectangle.getLeft() < this.getRight()) && (this.getLeft() < rectangle.getRight()) && (rectangle.getTop() < this.getBottom()) && (this.getTop() < rectangle.getBottom());  
    };
})();