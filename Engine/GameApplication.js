 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Engine = Atlantis.Engine || {};

Atlantis.Engine = (function () {
    return {
        game: null,
        content: null,
        stateManager: null,
        keyboard: null,
        pointer: null,
        width: 0,
        height: 0
    };
})()

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

        Atlantis.Engine = {
            game: this,
            contentManager: this.content,
            components: this.components,
            keyboardManager: this.keyboardManager,
            pointerManager: this.pointerManager,
            width: this.width,
            height: this.height,
            stateManager: this.stateManager
        };
    };

    engine.prototype = new Atlantis.Game();

    return engine;
})();

