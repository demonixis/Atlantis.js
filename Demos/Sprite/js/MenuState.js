var MenuState = function (name) {
    Atlantis.State.call(this, name);
    var backgroundMenu = new Atlantis.Sprite("backgroundMenu.png");
    this.scene.add(backgroundMenu);

    this.spriteFont = new Atlantis.SpriteFont("Arial", 32);
    this.text = "Press Enter to start";
};

MenuState.prototype = new Atlantis.State();

MenuState.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);

    if (Atlantis.input.keys.justPressed(Atlantis.Keys.Enter)) {
        Atlantis.app.stateManager.setActive("game", true);
    }
};

MenuState.prototype.draw = function (spriteBatch) {
    Atlantis.State.prototype.draw.call(this, spriteBatch);
    spriteBatch.drawString(this.spriteFont, this.text, { x: Atlantis.screen.width / 2 - 150, y: Atlantis.screen.height / 2 }, "#fff");
};