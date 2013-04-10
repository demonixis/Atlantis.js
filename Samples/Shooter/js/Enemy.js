//
// DEFINE AN ENEMY
//
var Enemy = function (game, x, y, type) {
    Atlantis.Sprite.call(this);

    var speed = 0.8;

    this.texture = game.content.load("Content/alien.png");

    this.texture.width = 128;
    this.texture.height = 32;
    this.viewport = new Atlantis.Rectangle(0, 0, game.width, game.height);

    this.prepareAnimation(32);
    this.addAnimation("move", [0, 1, 2, 3], 100);
    this.setPosition(x, y);

    this.update = function (gameTime) {
        Atlantis.Sprite.prototype.update.call(this, gameTime);
        this.y += gameTime.getElapsedTime() * speed;
        this.play("move");
    };

    this.draw = function (gameTime, context) {
        Atlantis.Sprite.prototype.draw.call(this, gameTime, context);
    }
};

Enemy.prototype = new Atlantis.Sprite();