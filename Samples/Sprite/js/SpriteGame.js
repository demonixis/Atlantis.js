var SpriteGame = function () {
    Atlantis.Engine.call(this, 640, 480);

    var menuScreen = new MenuScreen("menu")
    var gameScreen = new GameScreen("game");

    this.stateManager.add(menuScreen, true);
    this.stateManager.add(gameScreen, false);
};

SpriteGame.prototype = new Atlantis.Engine();