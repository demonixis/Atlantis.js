var GameScreen = function (name) {
    Atlantis.State.call(this, name);
    
    this.background = new Atlantis.Entity({ textureName: "Content/forest.png", enableSyncLoading: true });
    this.scene.add(this.background);

    this.sprite = new Atlantis.Sprite({ textureName: "Content/chocobo.png" });
    this.scene.add(this.sprite);

    this.speed = 10; 
};

GameScreen.prototype = new Atlantis.State();

GameScreen.prototype.loadContent = function (content) {
    Atlantis.State.prototype.loadContent.call(this, content);

    this.sprite.texture.width = 192;
    this.sprite.texture.height = 192;
    this.sprite.viewport = new Atlantis.Rectangle(0, 0, 640, 480);

    this.sprite.prepareAnimation(48);
    this.sprite.addAnimation("down", [0, 1, 2, 3], 150);
    this.sprite.addAnimation("left", [4, 5, 6, 7], 150);
    this.sprite.addAnimation("right", [8, 9, 10, 11], 150);
    this.sprite.addAnimation("up", [12, 13, 14, 15], 150);

    this.sprite.setPosition(260, 320);
    this.sprite.setSize(128);
    this.sprite.insideScreen = true;
    this.sprite.maxVelocity = 0.95;

    this.background.setSize(Atlantis.Engine.width, Atlantis.Engine.height);
};


GameScreen.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);

    if (Atlantis.Engine.keyboard.keys[Keys.up]) {
        this.sprite.velocity.y -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("up");
    }
    else if (Atlantis.Engine.keyboard.keys[Keys.down]) {
        this.sprite.velocity.y += this.speed * gameTime.getElapsedTime();
        this.sprite.play("down");
    }

    if (Atlantis.Engine.keyboard.keys[Keys.left]) {
        this.sprite.velocity.x -= this.speed * gameTime.getElapsedTime();
        this.sprite.play("left");
    }
    else if (Atlantis.Engine.keyboard.keys[Keys.right]) {
        this.sprite.velocity.x += this.speed * gameTime.getElapsedTime();
        this.sprite.play("right");
    }
};

GameScreen.prototype.draw = function (gameTime, context) {
    Atlantis.State.prototype.draw.call(this, gameTime, context);
};