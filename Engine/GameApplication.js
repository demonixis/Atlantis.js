 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Engine = {};
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
        var keyboardComponent = new Atlantis.KeyboardComponent(this);
        this.components.add(keyboardComponent);

        Atlantis.Engine = {
            Game: this,
            ContentManager: this.contentManager,
            Components: this.components,
            Keyboard: keyboardComponent,
            PointerManager: this.pointerManager,
            Width: width,
            Height: width,
            StateManager: this.stateManager
        };
    };

    engine.prototype = new Atlantis.Game();

    return engine;
})();

