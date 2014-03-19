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
        this.domElement = document.body;
        
        if (typeof(domElement) instanceof HTMLElement) {
            this.domElement = domElement;    
        }
        else if (typeof(domElement) === "string") {
            if (domElement[0] === ".") {
                domElement = domElement.replace(".", "");
                this.domElement = document.getElementsByClassName(domElement)[0];
            }
            else {
                domElement = (domElement[0] === "#") ? domElement.replace("#", "") : domElement;
                this.domElement = document.getElementById(domElement);
            }
        }

        if (this.domElement instanceof HTMLCanvasElement) {
            this.settings.canvas = this.domElement;
        }
        
        this.gameTime = new Atlantis.GameTime();
        this.components = new Atlantis.GameComponentCollection();
        this.content = new Atlantis.ContentManager();
        this.keyboard = null;
        this.mouse = null;
        this.touchPanel = null;
        this.gamepad = null;
        
        this.graphicsDevice = new Atlantis.GraphicsDevice(width, height, this.settings);
        this.canvas = this.settings.canvas;
        this.frontBuffer = null;
        this.context = null;
        this.initialized = false;
        this._paused = false;

        _instance = this;
    };
    
    game.version = "0.2a";

    /**
    * Initialize the game logic and components.
    * @method initialize
    */
    game.prototype.initialize = function () {
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

    /**
    * Update
    * @method update
    */
    game.prototype.update = function (gameTime) {
        this.components.update(gameTime);
    };

    /**
    * In this method the screen must be cleared and components are drawn. All draw code come here.
    * @method draw
    */
    game.prototype.draw = function (gameTime, context) {
        if (this.settings.autoClear) {
            this.graphicsDevice.clear();   
        }
        
        this.components.draw(gameTime, context);
    };
    
    /**
     *
     *
     */
    game.prototype.beforeDraw = function (gameTime) {
        this.graphicsDevice.present();  
    };

    /** 
    * Methods called by the main loop on each frame who call update and draw methods.
    * @method run
    */
    game.prototype.run = function () {
        if (!this.initialized) {
            this.initialized = true;
            this.initialize();

            if (this.content.preloader.length) {
                this.content.preload(function (progress) {
                    var progressMessage = ["Game loading ", progress.progress, "%"].join("");
                    var size = this.context.measureText(progressMessage),
                        x = (this.frontBuffer.getWidth() >> 1) - (size.width >> 1),
                        y = (this.frontBuffer.getHeight() >> 1);

                    this.context.clearRect(0, 0, this.frontBuffer.getWidth(), this.frontBuffer.getHeight());
                    this.context.fillStyle = "#fafafa";
                    this.context.font = "normal 18px Arial";
                    this.context.fillText(progressMessage, x, y);
                }.bind(this), function () {
                    this.context.clearRect(0, 0, this.frontBuffer.getWidth(), this.frontBuffer.getHeight());
                    this.loadContent();
                    mainLoop();
                }.bind(this));
            }
            else {
                this.loadContent();
                mainLoop();
            }
        }
    };
    
    /**
     * Set the game in pause mode. The canvas is no more updated and drawn.
     * @method pause
     */
    game.prototype.pause = function () {
        cancelAnimationFrame(mainLoop);
        this._paused = true;
    };
    
    /**
     * Resume a paused game.
     * @method resume
     */
    game.prototype.resume = function () {
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
        _instance.beforeDraw(_instance.gamepad);
        
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