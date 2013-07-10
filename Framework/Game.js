/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Game = (function () {
    var _instance = null;
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
        this.isRunning = false;
        this.initialized = false;

        // Fix for Windows 8/RT
        if (this.domElement != null) {
            this.canvas = params.canvas || createCanvas2D(this.width, this.height, document.body);
            this.canvas.style.msTouchAction = "none";
            this.canvasContext = this.canvas.getContext("2d");
        }

        this.domElement.addEventListener("resize", onResize, false);
        _instance = this;
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

    /**
    * Initialize the game logic and components.
    * @method initialize
    */
    game.prototype.initialize = function () {
        var that = this;
        this.components.initialize();
        this.keyboard.initialize();
    };

    /*
    * Update
    * @method update
    */
    game.prototype.update = function (gameTime) {
        this.components.update(gameTime);
    };

    /*
    * Draw on screen
    * @method draw
    */
    game.prototype.draw = function (gameTime, context) {
        context.clearRect(0, 0, this.width, this.height);
        this.components.draw(gameTime, context)
    };

    /*
    * Callback for window resize
    * @method onResize
    */
    function onResize(event) {
        _instance.width = event.target.innerWidth;
        _instance.height = event.target.innerHeight;
        _instance.canvas.width = _instance.width;
        _instance.canvas.height = _instance.height;
    }

    /*
    * Create a canvas 2D with a size and a black background
    * The canvas is added before any child of the specified domElement.
    * @method createCanvas2D
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