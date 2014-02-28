var MenuScreen = function (name) {
    Atlantis.State.call(this, name);
    var backgroundMenu = new Atlantis.Sprite("backgroundMenu.png");
    this.scene.add(backgroundMenu);

    this.spriteFont = new Atlantis.SpriteFont("Arial", 32);
};

MenuScreen.prototype = new Atlantis.State();

MenuScreen.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);

    if (Atlantis.Application.Keyboard.justPressed(Atlantis.Keys.Enter)) {
        this.stateManager.setActive("game", true);
    }
};

MenuScreen.prototype.draw = function (gameTime, context) {
    Atlantis.State.prototype.draw.call(this, gameTime, context);
    
    var text = "Press Enter to start";
    context.save();
    context.fillStyle = "#fff";
    context.font = this.spriteFont.getFont();
    var size = context.measureText(text);
    context.fillText("Press Enter to start", Atlantis.Application.Width / 2 - size.width / 2, Atlantis.Application.Height / 2);
    context.restore();
};