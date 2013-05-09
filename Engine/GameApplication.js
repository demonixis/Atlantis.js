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
        var game = new Atlantis.Game(width, height, domElement);

        Atlantis.Engine.game = game;
        Atlantis.Engine.content = game.content;
        Atlantis.Engine.component = game.components;
        Atlantis.Engine.keyboard = game.keyboard;
        Atlantis.Engine.pointer = game.pointer;
        Atlantis.Engine.width = game.width;
        Atlantis.Engine.height = game.height;

        this.initialized = false;

        this.stateManager = new Atlantis.StateManager(game);
        game.components.add(this.stateManager);
    };

    /**
     * Launch the game engine.
     * @method run
     */
    engine.prototype.run = function () {
        if (!this.initialized) {
          Atlantis.Engine.game.initialize();
          this.initialized = true;
        }
        loop();
    };

    function loop() {
        requestAnimationFrame(loop);
        Atlantis.Engine.game.run();
    }

    return engine;
})();

