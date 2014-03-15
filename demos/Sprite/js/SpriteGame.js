var SpriteGame = function () {
    Atlantis.GameApplication.call(this, 640, 480);

    this.content.rootDirectory = "Content/";

    var menuScreen = new MenuScreen("menu")
    var gameScreen = new GameScreen("game");

    this.stateManager.add(menuScreen, true);
    this.stateManager.add(gameScreen, false);
};

SpriteGame.prototype = Object.create(Atlantis.GameApplication.prototype);