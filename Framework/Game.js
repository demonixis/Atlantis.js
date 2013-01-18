var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.Game = function (width, height, domElement, params) {
    	var params = params || {};

        this.width = width;
        this.height = height;
        this.domElement = domElement || document.body;
    	this.canvas = params.canvas || createCanvas2D(this.width, this.height, document.body);
    };

    Atlantis.Game.prototype.initialize = function () {
    	var that = this;

    	this.domElement.addEventListener("resize", function (event) { onResize(event, that); }, false);
    };

    function onResize(event, instance) {
    	instance.width = event.target.innerWidth;
    	instance.height = event.target.innerHeight;
    	instance.canvas.width = that.width;
    	instance.canvas.height = that.height;
    }

    function createCanvas2D(width, height, parentNode) {
    	var canvas = document.createElement("canvas");
    	canvas.setAttribute("id", "Atlantis.Canvas2D");
    	canvas.width = width;
    	canvas.height = height;

    	if (parentNode.children.length > 0) {
    		canvas.insertBefore(parentNode.children[0]);
    	}
    	else {
    		parentNode.appendChild(canvas);
    	}

    	return canvas;
    }
})();