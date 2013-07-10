/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.GameTime = (function () {
    /**
     * Create a game time object who's responsible to get time informations.
     * @constructor
     * @class GameTime
     */
    var gameTime = function () {
        var currentTime = new Date().getTime();
        var elapsedTime = 0;
        var totalGameTime = 0;    
    };

    /**
     * Gets the elapsed time since last frame.
     * @method getElapsedTime
     * @return {Number} The elapsed time since last frame.
     */
    gameTime.prototype.getElapsedTime = function () {
        return this.elapsedTime * 0.001;
    };

    /**
     * Gets the total elapsed time since the begining.
     * @method getTotalGameTime
     * @return {Number} The total elapsed time.
     */
    gameTime.prototype.getTotalGameTime = function () {
        return this.totalGameTime * 0.001;
    };

    gameTime.prototype.update = function () {
        var now = new Date().getTime();
        this.elapsedTime = now - this.currentTime;
        this.totalGameTime += this.elapsedTime;
        this.currentTime = now;
    };

    return gameTime;
})();

Atlantis.Game = (function () {
    /**
    * Create a game instance who is the starting point of the Framework.
    * @constructor
    * @class Game
    * @param {Number} width Desired screen width.
    * @param {height} height Desired screen height.
    * @param {domElement} (optional) domElement Sepecify a DOM element to attach the canvas.
    * @param {params} (optional) params
    */
    var game = function (width, height, domElement, params) {
        var params = params || {};

        this.width = width;
        this.height = height;
        this.domElement = domElement || document.body;
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.content = new Atlantis.ContentManager();
        this.keyboard = new Atlantis.Input.KeyboardManager();
        this.pointer = new Atlantis.Input.PointerManager(this.domElement);

        // Fix for Windows 8/RT
        if (this.domElement != null) {
            this.canvas = params.canvas || createCanvas2D(this.width, this.height, document.body);
            this.canvas.style.msTouchAction = "none";
            this.canvasContext = this.canvas.getContext("2d");
        }
    };

    /**
    * Initialize the game logic and components.
    * @method initialize
    */
    game.prototype.initialize = function () {
        var that = this;
        this.components.initialize();
        this.components.loadContent(this.content);
        this.keyboard.initialize();
        this.domElement.addEventListener("resize", function (event) { onResize(event, that); }, false);
    };

    /*
    * Update
    * @method
    */
    game.prototype.update = function (gameTime) {
        this.components.update(gameTime);
    };

    /*
    * Draw on screen
    * @method
    */
    game.prototype.draw = function (gameTime, context) {
        context.clearRect(0, 0, this.width, this.height);
        this.components.draw(gameTime, context)
    };

    /* 
    * Methods called by the main loop on each frame who call update and draw methods.
    * @method run
    */
    game.prototype.run = function () {
        this.gameTime.update();
        this.update(this.gameTime);
        this.draw(this.gameTime, this.canvasContext);
    };

    /*
    * Callback for window resize
    * @method
    */
    function onResize(event, instance) {
        instance.width = event.target.innerWidth;
        instance.height = event.target.innerHeight;
        instance.canvas.width = that.width;
        instance.canvas.height = that.height;
    }

    /*
    * Create a canvas 2D with a size and a black background
    * The canvas is added before any child of the specified domElement.
    * @method
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

    return game;
})();