//
// DEFINE AN AMMO
//
var Ammo = function (game, x, y) {
    var texture = game.content.load("Content/Ammo.png");
    var position = { x: x, y: y };
    var speed = 350;

    this.enabled = true;
    this.rectangle = new Atlantis.Rectangle(position.x, position.y, 4, 8);

    this.update = function (gameTime) {
        position.y -= gameTime.getElapsedTime() * speed;
        this.rectangle.y = position.y;

        if (position.y + 8 == 0) {
            this.enabled = false;
        }
    };

    this.draw = function (gameTime, context) {
        context.drawImage(texture, position.x, position.y);
    }
};

//
// THE PLAYER CLASS
// 
var Player = function (game) {
    Atlantis.DrawableGameComponent.call(this);

    var speed = 180;
    var size = { x: 52, y: 52 };
    var position = { x: (game.width / 2) - (size.x / 2), y: game.height - (2 * size.y) };
    var texture = game.content.load("Content/ShipR.png");
    this.ammos = [];
    var ammoSound = game.content.load("Content/fire.wav");
    var shootInterval = null;
    var canShoot = true;
    var autoShoot = true;

    this.update = function (gameTime) {
        if (game.keyboard.keys[Atlantis.Keys.left] && position.x > 0) {
            position.x -= speed * gameTime.getElapsedTime();
        }
        else if (game.keyboard.keys[Atlantis.Keys.right] && position.x + size.x < game.width) {
            position.x += speed * gameTime.getElapsedTime();
        }

        if (game.keyboard.keys[Atlantis.Keys.up] && position.y > 0) {
            position.y -= speed * gameTime.getElapsedTime();
        }
        else if (game.keyboard.keys[Atlantis.Keys.down] && position.y + size.y < game.height) {
            position.y += speed * gameTime.getElapsedTime();
        }

        if (game.pointer.click) {
            position.x = game.pointer.x;
            autoShoot = true;
        }

        if ((autoShoot || game.keyboard.keys[Atlantis.Keys.space]) && canShoot) {
            var ammo = new Ammo(game, position.x + 4, position.y - 5);
            this.ammos.push(ammo);

            var ammo2 = new Ammo(game, position.x + 44, position.y - 5);
            this.ammos.push(ammo2);

            ammoSound.play();
            canShoot = false;

            shootInterval = setInterval(function (t) {
                canShoot = true;
                clearInterval(shootInterval);
            }, 200);
        }

        autoShoot = false;

        for (var i in this.ammos) {
            if (this.ammos[i].enabled) {
                this.ammos[i].update(gameTime);
            }
        }
    };

    this.draw = function (gameTime, context) {

        context.drawImage(texture, position.x, position.y);

        for (var i in this.ammos) {
            if (this.ammos[i].enabled) {
                this.ammos[i].draw(gameTime, context);
            }
        }
    };
};

Player.prototype = new Atlantis.DrawableGameComponent();