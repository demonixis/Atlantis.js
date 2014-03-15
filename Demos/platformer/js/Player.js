var MovementState = {
    JumpingUp: 0, JumpingDown: 1, Walking: 2
};

var Collider2 = {
    rectangleCollide: function (a, b) {
        return a.rectangle.intersects(b.rectangle);
    }
};

var Keys = Keys || Atlantis.Keys;

var Player = function () {
    Atlantis.Sprite.call(this);
    this.textureName = "img/Player.png";
    this.gravity = 9;
    this.speed = 2;
    this.canMove = true;
    this.movementState = MovementState.Walking;
    this.jumpHeight = 125;
    this.jumpSpeed = 2.5;
    this.initialJumpPosition = new Atlantis.Vector2();
    //this.acrossScreen = true;
};

Player.prototype = new Atlantis.Sprite();

Player.prototype.initialize = function () {
    Atlantis.Sprite.prototype.initialize.call(this);
};

Player.prototype.loadContent = function (content) {
    Atlantis.Sprite.prototype.loadContent.call(this, content);

    this.prepareAnimation(64, 64);
    this.addAnimation("idle", [0], 0);
    this.addAnimation("left", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 30);
    this.addAnimation("right", [12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 30);
    this.addAnimation("jumpLeft", [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 30);
    this.addAnimation("jumpRight", [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 30);
    this.addAnimation("dieLeft", [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54], 10);
    this.addAnimation("dieRight", [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], 10);
    this.addAnimation("winLeft", [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76], 10);
    this.addAnimation("winRight", [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87], 10);
};

Player.prototype.update = function (gameTime) {
    Atlantis.Sprite.prototype.update.call(this, gameTime);

    if (this.canMove) {
        if (Atlantis.input.keys.pressed(Keys.Left)) {
            this.play("left");
            this.move(this.getX() - this.speed, this.getY());
        }
        else if (Atlantis.input.keys.pressed(Keys.Right)) {
            this.play("right");
            this.move(this.getX() + this.speed, this.getY());
        }
        else {
            this.play("idle");
        }

        if (Atlantis.input.keys.pressed(Keys.Space)) {
            if (this.getDirection().x < 0) {
                this.play("jumpLeft");
            }
            else {
                this.play("jumpRight");
            }

            this.jump();
        }
    }
    // Manage the jump
    if (this.movementState != MovementState.Walking) {
        if (this.movementState == MovementState.JumpingUp) {
            this.move(this.getX(), this.getY() - this.jumpSpeed);
            if (this.getY() < (this.initialJumpPosition.y - this.jumpHeight)) {
                this.movementState = MovementState.JumpingDown;
            }
        }

        if (this.movementState == MovementState.JumpingDown) {
            this.move(this.getX(), this.getY() + this.jumpSpeed);
        }

        if (this.getY() >= this.initialJumpPosition.y) {
            this.movementState = MovementState.Walking;
        }
    }
};

Player.prototype.updatePhysics = function (blocksSize, blocks) {
    if (this.movementState != MovementState.JumpingUp) {
        this.move(this.getX(), this.getY() + this.gravity);
    }

    var i = 0;
    var collide = false;

    while(i < blocksSize && collide == false) {
        if (Collider2.rectangleCollide(this, blocks[i])) {
            if (this.getY() < blocks[i].getY() && this.movementState == MovementState.JumpingUp) {
                this.movementState = MovementState.JumpingDown;
                this.move(this.getX(), blocks[i].getBoundingRect().getBottom());
                collide = true;
            } 
            else {
                collide = true;
                this.move(this.getX(), blocks[i].getY() - this.getHeight());
                this.movementState = MovementState.Walking;
            }
        }
        i++;
    }
};

Player.prototype.jump = function () {
    if (this.movementState == MovementState.Walking) {
        this.movementState = MovementState.JumpingUp;
        this.initialJumpPosition = new Atlantis.Vector2(this.getX(), this.getY());
    }
};

Player.prototype.win = function () {
    if (this.direction.x < 0) {
        this.play("winLeft");
    }
    else {
        this.play("winRight");
    }
    this.canMove = false;
};

Player.prototype.reset = function () {
    if (this.assetLoaded) {
        this.play("idle");
        this.canMove = true;
    }
};

Player.prototype.die = function (type) {
    if (this.direction.x < 0) {
        this.play("dieLeft");
    }
    else {
        this.play("dieRight");
    }

    this.canMove = false;
};

Player.prototype.setStartPosition = function(start) {
    this.move(start.x * 24, start.y * 32 - this.getHeight());
};