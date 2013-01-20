var Atlantis = window.Atlantis || {};

(function() {
	Atlantis.Vector2 = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

    Atlantis.Vector2.prototype.add = function (value) {
        if (value instanceof Atlantis.Vector2) {
            this.x += value.x;
            this.y += value.y;
        }  
        else {
            this.x += value;
            this.y += value;
        }
    };

    Atlantis.Vector2.prototype.subtract = function (value) {
        if (value instanceof Atlantis.Vector2) {
            this.x -= value.x;
            this.y -= value.y;
        }  
        else {
            this.x -= value;
            this.y -= value;
        }
    };

    Atlantis.Vector2.prototype.divide = function (value) {
        if (value instanceof Atlantis.Vector2) {
            this.x /= value.x;
            this.y /= value.y;
        }  
        else {
            this.x /= value;
            this.y /= value;
        }
    };

    Atlantis.Vector2.prototype.multiply = function (value) {
        if (value instanceof Atlantis.Vector2) {
            this.x *= value.x;
            this.y *= value.y;
        }  
        else {
            this.x *= value;
            this.y *= value;
        }
    };

    Atlantis.Vector2.prototype.negate = function (value) {
        if (value instanceof Atlantis.Vector2) {
            this.x = -value.x;
            this.y = -value.y;
        }  
        else {
            this.x = -value;
            this.y = -value;
        }
    };

    Atlantis.Vector2.prototype.normalize = function () {
        var value = 1 / (Math.sqrt(this.x * this.x) + (this.y * this.y));
        this.x *= value;
        this.y *= value;
    };

    Atlantis.Vector2.prototype.getDistance = function (vector2) {
        var v1 = this.x - vector2.x;
        var v2 = this.y - vector2.y;
        return Math.sqrt((v1 * v1) + (v2 * v2));
    };
})();