var Atlantis = window.Atlantis || {};
Atlantis.Engine = Atlantis.Engine || {};

(function() {
    Atlantis.Engine.game = null;
    Atlantis.Engine.content = null;
    Atlantis.Engine.components = null;
    Atlantis.Engine.keyboard = null;
    Atlantis.Engine.mouse = null;
    Atlantis.Engine.touch = null;

    Atlantis.Engine.width = 0;
    Atlantis.Engine.height = 0;

    Atlantis.Engine = function (width, height, domElement) {

    };

    function loop() {
        requestAnimationFrame(loop);
        Atlantis.game.run();
    }
})();

