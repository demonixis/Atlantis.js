var MenuScreen = function (name) {
    Atlantis.State.call(this, name);
    
    var backgroundMenu = new Atlantis.Entity({ textureName: "Content/backgroundMenu.png" });
    this.scene.add(backgroundMenu);
};

MenuScreen.prototype = new Atlantis.State();

MenuScreen.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);

    if (Atlantis.Engine.pointer.click) {
        this.stateManager.setStateActive("game", true);
    }
}