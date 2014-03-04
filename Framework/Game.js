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
        this.settings = params || {};
        this.settings.webGL = false; // FIXME
        
        var width = width || window.innerWidth || 640;
        var height = height || window.innerHeight || 480;
        this.domElement = domElement || document.body;
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.content = new Atlantis.ContentManager();
        this.keyboard = null;
        this.mouse = null;
        this.pointer = null;
        
        this.graphicsDevice = new Atlantis.GraphicsDevice(width, height, this.settings);
        this.frontBuffer = null;
        this.context = null;
        
        this.isRunning = false;
        this.initialized = false;

        _instance = this;
    };

    /**
    * Initialize the game logic and components.
    * @method initialize
    */
    game.prototype.initialize = function () {
        this.frontBuffer = this.graphicsDevice.getFrontBuffer();
        this.context = this.frontBuffer.getContext();
        
        this.keyboard = new Atlantis.Keyboard();
        this.mouse = new Atlantis.Mouse(this.frontBuffer.getCanvas());
        this.touchPanel = new Atlantis.TouchPanel(this.frontBuffer.getCanvas());
        this.pointer = new Atlantis.PointerManager(this.frontBuffer.getCanvas());
        
        this.domElement.addEventListener("resize", onResize, false);
        
        if (window.DeviceOrientationEvent) {
            window.addEventListener("orientationchange", onResize, false);
        }

        if (this.domElement && !this.settings.canvas) {
            this.domElement.appendChild(this.frontBuffer.getCanvas());
        }
        
        this.components.initialize();
    };

    /**
    * Load content.
    * @method loadContent
    */
    game.prototype.loadContent = function () {
        this.components.loadContent(this.content);
    };

    /**
    * Unload content.
    * @method unloadContent
    */
    game.prototype.unloadContent = function () {
        this.components.unloadContent();
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
        if (this.settings.autoClear) {
            this.graphicsDevice.clear();   
        }
        
        this.components.draw(gameTime, context);
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
        _instance.draw(_instance.gameTime, _instance.context);
        requestAnimationFrame(mainLoop);
    }

    /*
    * Callback for window resize
    * @method onResize
    */
    function onResize(event) {
        if (event.type == "orientationchange") {
            // Todo : Re setup the graphics device with correct size.
        }

        _instance.width = event.target.innerWidth;
        _instance.height = event.target.innerHeight;
        _instance.canvas.width = _instance.width;
        _instance.canvas.height = _instance.height;
    }

    return game;
})();