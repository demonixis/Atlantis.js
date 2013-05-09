var GameScreen = function (name) {
    Atlantis.State.call(this, name);
    
    this.background = new Atlantis.Entity({ textureName: "Content/forest.png", enableSyncLoading: true });
    this.scene.add(this.background);

    this.sprite = new Atlantis.Sprite({ textureName: "Content/player.png" });
    this.scene.add(this.sprite);

    this.speed = 5; 
};

GameScreen.prototype = new Atlantis.State();

GameScreen.prototype.loadContent = function (content) {
    Atlantis.State.prototype.loadContent.call(this, content);

    this.sprite.texture.width = 576;
    this.sprite.texture.height = 256;
    this.sprite.viewport = new Atlantis.Rectangle(0, 0, 640, 480);

    this.sprite.prepareAnimation(64, 64);
    this.sprite.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8], 50);
    this.sprite.addAnimation("left", [9, 10, 11, 12, 13, 14, 15, 16, 17], 50);
    this.sprite.addAnimation("down", [18, 19, 20, 21, 22, 23, 24, 25, 26], 50);
    this.sprite.addAnimation("right", [27, 28, 29, 30, 31, 32, 33, 34, 35], 50);


    this.sprite.setPosition(260, 320);
    this.sprite.setSize(128);
    this.sprite.insideScreen = true;
    this.sprite.maxVelocity = 0.95;

    this.background.setSize(Atlantis.Engine.width, Atlantis.Engine.height);
};


GameScreen.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);

    if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.up]) {
        this.sprite.velocity.y -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("up");
    }
    else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.down]) {
        this.sprite.velocity.y += this.speed * gameTime.getElapsedTime();
        this.sprite.play("down");
    }

    if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.left]) {
        this.sprite.velocity.x -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("left");
    }
    else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.right]) {
        this.sprite.velocity.x += this.speed * gameTime.getElapsedTime();
        this.sprite.play("right");
    }
};

GameScreen.prototype.draw = function (gameTime, context) {
    Atlantis.State.prototype.draw.call(this, gameTime, context);
};