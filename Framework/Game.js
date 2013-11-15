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
        this.width = width || document.body.innerWidth || 640;
        this.height = height || document.body.innerHeight || 480;
        this.domElement = domElement || document.body;
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.contentManager = new Atlantis.ContentManager();
        this.keyboardManager = new Atlantis.Input.KeyboardManager();
        this.canvas = params.canvas;
        this.isRunning = false;
        this.initialized = false;

        // Fix for Windows 8/RT
        if (this.domElement != null) {
            this.canvas = this.canvas || createCanvas2D(this.width, this.height, domElement);
            this.canvas.style.msTouchAction = "none";
            this.canvasContext = this.canvas.getContext("2d");
            this.pointerManager = new Atlantis.Input.PointerManager(this.domElement);
        }

        this.graphicsDevice = new Atlantis.Graphics.GraphicsDevice(this.canvas);
        this.domElement.addEventListener("resize", onResize, false);
        _instance = this;
    };

    /**
    * Initialize the game logic and components.
    * @method initialize
    */
    game.prototype.initialize = function () {
        if (this.domElement.children.length > 0) {
            this.domElement.insertBefore(this.canvas, this.domElement.children[0]);
        }
        else {
            this.domElement.appendChild(this.canvas);
        }

        this.components.initialize();
    };

    /**
    * Load content.
    * @method loadContent
    */
    game.prototype.loadContent = function () {
        this.components.loadContent();
    };

    /**
    * Unload content.
    * @method unloadContent
    */
    game.prototype.unloadContent = function () {

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
    * Methods called by the main loop on each frame who call update and draw methods.
    * @method run
    */
    game.prototype.run = function () {
        if (!this.initialized) {
            this.initialized = true;
            this.initialize();
            this.loadContent();
            mainLoop();
        }
    };

    /**
    * Main loop of the game.
    * @method mainLoop
    */
    function mainLoop() {
        _instance.gameTime.update();
        _instance.update(_instance.gameTime);
        _instance.draw(_instance.gameTime, _instance.canvasContext);
        requestAnimationFrame(mainLoop);
    }

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
        return canvas;
    }

    return game;
})();