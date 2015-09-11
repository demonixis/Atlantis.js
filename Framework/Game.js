/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Game = (function() {
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
    var game = function(width, height, domElement, params) {
        this.settings = params || {};
        
        width = width || window.innerWidth;
        height = height || window.innerHeight;
        this.domElement = document.body;

        // FIXME : This part is totaly awefull
        if (typeof(domElement) instanceof HTMLElement) {
            this.domElement = domElement;
        } else if (typeof(domElement) === "string") {
            if (domElement[0] === ".") {
                domElement = domElement.replace(".", "");
                this.domElement = document.getElementsByClassName(domElement)[0];
            } else {
                domElement = (domElement[0] === "#") ? domElement.replace("#", "") : domElement;
                this.domElement = document.getElementById(domElement);
            }
        }

        if (this.domElement instanceof HTMLCanvasElement) {
            this.settings.canvas = this.domElement;
        }

        this.version = "0.0.0.1";
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.content = new Atlantis.ContentManager();
        this.keyboard = null;
        this.mouse = null;
        this.touchPanel = null;
        this.gamepad = null;
        this.preloader = null;

        this.graphicsDevice = new Atlantis.GraphicsDevice(width, height, this.settings);
        this.canvas = this.settings.canvas;
        this.frontBuffer = null;
        this.context = null;
        this.initialized = false;
        this._paused = false;

        _instance = this;
    };

    /**
     * Gets the scale factor relative to the backbuffer.
     * @property {Atlantis.Vector2} scaleFactor
     */
    game.scaleFactor = new Atlantis.Vector2(1, 1);

    game.prototype._internalIntialize = function() {
        this.frontBuffer = this.graphicsDevice.getFrontBuffer();
        this.context = this.frontBuffer.getContext();

        if (!this.canvas) {
            this.canvas = this.frontBuffer.getCanvas();
        }

        this.keyboard = new Atlantis.Keyboard();
        this.mouse = new Atlantis.Mouse(this.frontBuffer.getCanvas());
        this.touchPanel = new Atlantis.TouchPanel(this.frontBuffer.getCanvas());
        this.gamepad = new Atlantis.Gamepad();

        this.components.add(this.gamepad);

        if (this.settings.resizeEnabled) {
            window.addEventListener("resize", onResize, false);
        }

        if (this.domElement && !this.settings.canvas) {
            this.domElement.appendChild(this.frontBuffer.getCanvas());
        }
    };

    /**
     * Initialize the game logic and components.
     * @method initialize
     */
    game.prototype.initialize = function() {
        this.components.initialize();
    };

    /**
     * Load the content.
     * @method loadContent
     */
    game.prototype.loadContent = function() {
        this.components.loadContent(this.content);
    };

    /**
     * Unload the content.
     * @method unloadContent
     */
    game.prototype.unloadContent = function() {
        this.components.unloadContent();
    };

    /**
     * Update the logic of the game.
     * @method update
     * @param {GameTime} gameTime The game time.
     */
    game.prototype.update = function(gameTime) {
        this.components.update(gameTime);
    };

    /**
     * Draw the content on the screen.
     * @method draw
     * @param {GameTime} gameTime The game time.
     * @param {CanvasRenderingContext2D} context The 2D context.
     */
    game.prototype.draw = function(gameTime, context) {
        if (this.settings.autoClear) {
            this.graphicsDevice.clear();
        }

        this.components.draw(gameTime, context);
    };

    /**
     * Called when the `draw` method has done its work.
     * @method afterDraw
     * @param {GameTime} gameTime The game time.
     */
    game.prototype.afterDraw = function(gameTime) {
        this.graphicsDevice.present();
    };

    /** 
     * Start the game by initializing the engine. The preloader is activated 
     * afterwards the components are initialized and the main loop is started.
     * @method run
     */
    game.prototype.run = function() {
        var that = this;
        var startProcess = function() {
            that.initialize();
            that.initialized = true;
            that.loadContent();
            that.frontBuffer.getCanvas().focus();
            mainLoop();
        };

        if (!this.initialized) {
            this.initialized = true;
            this._internalIntialize();

            if (this.content.preloader.length) {

                // If user don't use a custom preloader
                if (this.preloader === null) {
                    this.preloader = new Atlantis.Preloader(this);
                }

                this.content.preload(function(progress) {
                    this.preloader.onProgress(this.context, progress);
                }.bind(this), function() {
                    this.context.clearRect(0, 0, this.frontBuffer.getWidth(), this.frontBuffer.getHeight());
                    startProcess();
                }.bind(this));
            } else {
                startProcess();
            }
        }
    };

    /**
     * Sets the game in pause mode.
     * @method pause
     */
    game.prototype.pause = function() {
        cancelAnimationFrame(mainLoop);
        this._paused = true;
    };

    /**
     * Resume a paused game.
     * @method resume
     */
    game.prototype.resume = function() {
        if (this._paused) {
            this._paused = false;
            mainLoop();
        }
    };

    // The mainLoop
    function mainLoop() {
        _instance.gameTime.update();
        _instance.update(_instance.gameTime);
        _instance.draw(_instance.gameTime);
        _instance.afterDraw(_instance.gamepad);

        if (!_instance._paused) {
            requestAnimationFrame(mainLoop);
        }
    }

    // Callback for window resize
    function onResize(event) {
        _instance.width = event.target.innerWidth;
        _instance.height = event.target.innerHeight;
        _instance.canvas.width = _instance.width;
        _instance.canvas.height = _instance.height;
    }

    return game;
})();