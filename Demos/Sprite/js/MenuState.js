var MenuState = function (name) {
    Atlantis.Level.call(this, name);
    var backgroundMenu = new Atlantis.Sprite("backgroundMenu.png");
    this.scene.add(backgroundMenu);

    this.spriteFont = new Atlantis.SpriteFont("Arial", 32);
    this.text = "Press Enter to start";
};

MenuState.prototype = Object.create(Atlantis.Level.prototype);

MenuState.prototype.update = function (gameTime) {
    Atlantis.Level.prototype.update.call(this, gameTime);

    if (Atlantis.input.keys.justPressed(Atlantis.Keys.Enter)) {
        Atlantis.app.levelManager.loadLevel("game");
    }
};

MenuState.prototype.draw = function (gameTime) {
    Atlantis.Level.prototype.draw.call(this, gameTime);

    this.spriteBatch.begin();
    this.spriteBatch.drawString(this.spriteFont, this.text, { x: Atlantis.screen.width / 2 - 150, y: Atlantis.screen.height / 2 }, "#fff");
    this.spriteBatch.end();
};