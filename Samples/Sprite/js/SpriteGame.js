var SpriteGame = function () {
    Atlantis.GameApplication.call(this, 640, 480);

    this.contentManager.setRootDirectory("Content/");

    var menuScreen = new MenuScreen("menu")
    var gameScreen = new GameScreen("game");

    this.stateManager.add(menuScreen, true);
    this.stateManager.add(gameScreen, false);
};

SpriteGame.prototype = new Atlantis.GameApplication();