//
// DEFINE AN ENEMY
//
var Enemy = function (game, x, y, type) {

    var texture = null;

    if (type > 2) {
        texture = game.content.load("Content/Enemy_1.png");
    }
    else {
        texture = game.content.load("Content/Enemy_2.png");
    }

    var speed = 65;
    this.enabled = true;
    this.position = { x: x, y: y };
    this.rectangle = new Atlantis.Rectangle(this.position.x, this.position.y, 64, 64);

    this.update = function (gameTime) {
        this.position.y += gameTime.getElapsedTime() * speed;
        this.rectangle.y = this.position.y;
    };

    this.draw = function (gameTime, context) {
        context.drawImage(texture, this.position.x, this.position.y);
    }
};