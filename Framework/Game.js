var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.GameTime = function () {
        var currentTime = new Date().getTime();
        var elapsedTime = 0;
        var totalGameTime = 0;
        
        this.getElapsedTime = function () {
            return elapsedTime * 0.001;
        };

        this.getTotalGameTime = function () {
            return totalGameTime * 0.001;
        };

        this.update = function () {
            var now = new Date().getTime();
            elapsedTime = now - currentTime;
            totalGameTime += elapsedTime;
            currentTime = now;
        };
    };

    Atlantis.Game = function (width, height, domElement, params) {
    	var params = params || {};

        this.width = width;
        this.height = height;
        this.domElement = domElement || document.body;
    	this.canvas = params.canvas || createCanvas2D(this.width, this.height, document.body);
        this.canvasContext = this.canvas.getContext("2d");
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.content = new Atlantis.ContentManager();
        this.keyboard = new Atlantis.KeyboardState();
        this.mouse = new Atlantis.MouseState();
    };

    Atlantis.Game.prototype.initialize = function () {
    	var that = this;

        this.components.initialize();
        this.keyboard.initialize();
        this.mouse.initialize();
        
    	this.domElement.addEventListener("resize", function (event) { onResize(event, that); }, false);
    };

    /*
     * Update
     */
    Atlantis.Game.prototype.update = function (gameTime) {
        this.components.update(gameTime);
    };

    /*
     * Draw on screen
     */
    Atlantis.Game.prototype.draw = function (gameTime, context) {
        context.clearRect(0, 0, this.width, this.height);
        this.components.draw(gameTime, context)
    };

    /* 
     * Methods called by the main loop
     */
    Atlantis.Game.prototype.run = function () {
        this.gameTime.update();
        this.update(this.gameTime.getElapsedTime());
        this.draw(this.gameTime.getElapsedTime(), this.canvasContext);  
    };

    /*
     * Callback for window resize
     */
    function onResize(event, instance) {
    	instance.width = event.target.innerWidth;
    	instance.height = event.target.innerHeight;
    	instance.canvas.width = that.width;
    	instance.canvas.height = that.height;
    }

    /*
     * Create a canvas 2D with a size and a black background
     * The canvas is added before any child of the specified domElement
     */
    function createCanvas2D(width, height, parentNode) {
    	var canvas = document.createElement("canvas");
    	canvas.setAttribute("id", "Atlantis.Canvas2D");
    	canvas.width = width;
    	canvas.height = height;
        canvas.style.backgroundColor = "#000";

    	if (parentNode.children.length > 0) {
    		parentNode.insertBefore(canvas, parentNode.children[0]);
    	}
    	else {
    		parentNode.appendChild(canvas);
    	}

    	return canvas;
    }
})();