var Atlantis = window.Atlantis || {};
Atlantis.Engine = Atlantis.Engine || {};

(function() {
    Atlantis.Engine.game = null;
    Atlantis.Engine.content = null;
    Atlantis.Engine.components = null;
    Atlantis.Engine.stateManager = null;
    Atlantis.Engine.keyboard = null;
    Atlantis.Engine.mouse = null;
    Atlantis.Engine.touch = null;
    Atlantis.Engine.width = 0;
    Atlantis.Engine.height = 0;

    Atlantis.Engine.width = 0;
    Atlantis.Engine.height = 0;

    Atlantis.Engine = function (width, height, domElement) {
        Atlantis.Game.call(this, width, height, domElement);

        Atlantis.Engine.game = this;
        Atlantis.Engine.content = this.content;
        Atlantis.Engine.component = this.components;
        Atlantis.Engine.keyboard = this.keyboard;
        Atlantis.Engine.mouse = this.mouse;
        Atlantis.Engine.touch = this.touch;

        this.stateManager = new Atlantis.StateManager(this);
        this.components.add(this.stateManager);
    };

    Atlantis.Engine.prototype = new Atlantis.Game();

    function loop() {
        requestAnimationFrame(loop);
        Atlantis.game.run();
    }
})();

