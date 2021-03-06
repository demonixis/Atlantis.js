var PlayState = function (name) {
    Atlantis.Level.call(this, name);

    this.background = new Atlantis.Sprite("forest.png");
    this.scene.add(this.background);

    this.sprite = new Atlantis.Sprite("player.png");
    this.scene.add(this.sprite);
    this.speed = 0.01; 
};

PlayState.prototype = Object.create(Atlantis.Level.prototype);

PlayState.prototype.initialize = function () {
    Atlantis.Level.prototype.initialize.call(this);

    this.sprite.prepareAnimation(64, 64);
    this.sprite.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8], 50);
    this.sprite.addAnimation("left", [9, 10, 11, 12, 13, 14, 15, 16, 17], 50);
    this.sprite.addAnimation("down", [18, 19, 20, 21, 22, 23, 24, 25, 26], 50);
    this.sprite.addAnimation("right", [27, 28, 29, 30, 31, 32, 33, 34, 35], 50);

    this.sprite.move(260, 320);
    //this.sprite.setSize(128);
    this.sprite.insideScreen = true;
    this.sprite.maxVelocity = 0.95;

    this.background.setSize(Atlantis.screen.width, Atlantis.screen.height);
};

PlayState.prototype.update = function (gameTime) {
    Atlantis.Level.prototype.update.call(this, gameTime);

    if (Atlantis.input.keys.pressed(Atlantis.Keys.Up)) {
        this.sprite.velocity.y -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("up");
    }
    else if (Atlantis.input.keys.pressed(Atlantis.Keys.Down)) {
        this.sprite.velocity.y += this.speed * gameTime.getElapsedTime();
        this.sprite.play("down");
    }

    if (Atlantis.input.keys.pressed(Atlantis.Keys.Left)) {
        this.sprite.velocity.x -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("left");
    }
    else if (Atlantis.input.keys.pressed(Atlantis.Keys.Right)) {
        this.sprite.velocity.x += this.speed * gameTime.getElapsedTime();
        this.sprite.play("right");
    }
};