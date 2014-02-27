var SpriteGame = function () {
    Atlantis.GameApplication.call(this, 640, 480);

    //var menuScreen = new MenuScreen("menu")
    var gameScreen = new GameScreen("game");

    //this.stateManager.add(menuScreen, true);
    this.stateManager.add(gameScreen, true);
};

SpriteGame.prototype = new Atlantis.GameApplication();