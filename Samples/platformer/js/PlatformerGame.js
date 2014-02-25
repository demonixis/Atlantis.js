var PlatformerGame = function () {
    Atlantis.GameApplication.call(this, 800, 520);

    var gameState = new GameState("game", 3);
    this.stateManager.add(gameState, true);
};

SpriteGame.prototype = new Atlantis.GameApplication();