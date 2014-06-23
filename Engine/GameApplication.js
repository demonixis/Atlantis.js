/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * This is a static class that contains some managers such as
 * Storage, Audio, Level, etc.
 * @class app
 * @static
 */
Atlantis.app = {};

/**
 * This is a static class that contains input managers
 * @class input
 * @static
 */
Atlantis.input = {};

/**
 * This is a static class that contains screen management
 * @class screen
 * @static
 */
Atlantis.screen = {};

/**
* The engine class that initialize an Atlantis.Game object and setup managers and scene.
* @constructor 
* @class Engine
* @extends Atlantis.Game
* @param {Number} width Desired screen width.
* @param {Number} height Desired screen height
* @param {Number} domElement The DOM element to use for canvas (optional).
*/
Atlantis.GameApplication = function (width, height, domElement, params) {
    Atlantis.Game.call(this, width, height, domElement, params);

    this.audioManager = new Atlantis.AudioManager();
    this.storageManager = new Atlantis.StorageManager();
    this.levelManager = new Atlantis.LevelManager(this);
    this.components.add(this.levelManager);

    var that = this;

    Atlantis.app = {
        game: that,
        content: that.content,
        components: that.components,
        storage: that.storageManager,
        levelManager: that.levelManager,
    };
    
    Atlantis.input = {
        keys: null,
        mouse: null,
        touch: null,
        gamepad: null  
    };

    Atlantis.screen = {
        width: width,  
        widthPerTwo: width / 2,
        height: height,
        heightPerTwo: height / 2,
        getCanvasWidth: function () {
            return that.graphicsDevice.getFrontBuffer().getWidth();   
        },
        getCanvasHeight: function () {
            return that.graphicsDevice.getFrontBuffer().getHeight(); 
        }
    };
    
     document.addEventListener(Atlantis.events.ResolutionChanged, function (event) {
        Atlantis.screen.width = event.width;
        Atlantis.screen.widthPerTwo = event.width / 2;
        Atlantis.screen.height = event.height;
        Atlantis.screen.heightPerTwo = event.height / 2;
    }, false);
};

Atlantis.GameApplication.prototype = new Atlantis.Game();

Atlantis.GameApplication.prototype.initialize = function () {
    Atlantis.Game.prototype.initialize.call(this);

    Atlantis.screen.width = this.graphicsDevice.preferredBackBufferWidth;
    Atlantis.screen.height = this.graphicsDevice.preferredBackBufferHeight;
    
    var keyboardComponent = new Atlantis.KeyboardComponent(this);
    this.components.add(keyboardComponent);

    Atlantis.input.keys = keyboardComponent;
};

