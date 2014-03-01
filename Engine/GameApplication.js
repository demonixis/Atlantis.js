/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Application = {};

Atlantis.GameApplication = (function () {
    /**
    * The engine class that initialize an Atlantis.Game object and setup managers and scene.
    * @constructor 
    * @class Engine
    * @param {Number} width Desired screen width.
    * @param {Number} height Desired screen height
    * @param {Number} domElement The DOM element to use for canvas (optional).
    */
    var engine = function (width, height, domElement) {
        Atlantis.Game.call(this, width, height, domElement);

        this.stateManager = new Atlantis.StateManager(this);
        this.components.add(this.stateManager);

        var that = this;

        Atlantis.Application = {
            loadLevel: function (nameOrIndex) {
                return that.stateManager.loadLevel(levelName);
            },
            Game: this,
            ContentManager: this.content,
            Components: this.components,
            Keyboard: null,
            Width: width,
            Height: height,
            StateManager: this.stateManager
        };
    };
    
    engine.prototype = new Atlantis.Game();
    
    engine.prototype.initialize = function () {
        Atlantis.Game.prototype.initialize.call(this);
        
        var keyboardComponent = new Atlantis.KeyboardComponent(this);
        this.components.add(keyboardComponent);
    
        Atlantis.Application.Keyboard = keyboardComponent;
        Atlantis.Application.Pointer = this.pointer;
    };

    return engine;
})();

