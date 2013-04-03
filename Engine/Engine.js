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
    Atlantis.Engine.game = null;
    Atlantis.Engine.content = null;
    Atlantis.Engine.components = null;
    Atlantis.Engine.stateManager = null;
    Atlantis.Engine.keyboard = null;
    Atlantis.Engine.mouse = null;
    Atlantis.Engine.touch = null;
    Atlantis.Engine.width = 0;
    Atlantis.Engine.height = 0;

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
        Atlantis.Engine.mouse = game.mouse;
        Atlantis.Engine.touch = game.touch;
        Atlantis.Engine.width = game.width;
        Atlantis.Engine.height = game.height;

        this.stateManager = new Atlantis.StateManager(game);
        game.components.add(this.stateManager);
    };

    /**
     * Launch the game engine.
     * @method run
     */
    engine.prototype.run = function () {
        Atlantis.Engine.game.initialize();
        loop();
    };

    function loop() {
        requestAnimationFrame(loop);
        Atlantis.Engine.game.run();
    }

    return engine;
})();

