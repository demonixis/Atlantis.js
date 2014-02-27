var Monster = function (levelId) {
	Atlantis.Sprite.call(this);

	this.timeBeforeCheckNextAction = 3500;
	
	this.textureName = "img/Monsters/monster";

	switch (levelId) {
		case 7: this.textureName += "A.png"; break;
		case 8: this.textureName += "B.png"; break;
		case 9: this.textureName += "C.png"; break;
		case 10: this.textureName += "D.png"; break;
	}

	this.gravity = 9;
	this.elapsedTime = 0;
};

Monster.prototype = new Atlantis.Sprite();

Monster.prototype.initialize = function () {
	Atlantis.Sprite.prototype.initialize.call(this);
};

Monster.prototype.loadContent = function (content) {
    Atlantis.Sprite.prototype.loadContent.call(this, content);

    this.prepareAnimation(64, 64);
	this.addAnimation("left", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20);
	this.addAnimation("right", [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 20);
	this.addAnimation("idle", [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 20);
	this.play("idle");
	this.getNextAction();
};

Monster.prototype.update = function (gameTime) {
    Atlantis.Sprite.prototype.update.call(this, gameTime);
    
    this.elapsedTime += gameTime.getElapsedTime();

	if (this.elapsedTime >= this.timeBeforeCheckNextAction) {
		this.elapsedTime = 0;
		this.getNextAction();
	}
	
	if (this.getX() <= this.viewport.x || this.getX() + this.getWidth() >= this.viewport.width) {
		this.direction.x *= -1;
	}
	
	if (this.direction.x < 0) {
		this.play("left");
		this.translate(-1, 0);
	}
	else if (this.direction.x > 0) {
		this.play("right");
		this.translate(1, 0);
	}
	else {
		this.play("idle");
		this.translate(0, 0);
	}
	this.updatePhysics();
};

Monster.prototype.updatePhysics = function () {

};

Monster.prototype.draw = function (gameTime) {
	Atlantis.Sprite.prototype.draw.call(this, gameTime);
};

Monster.prototype.getNextAction = function () {
	var randomAction = Math.random();

	if (randomAction % 2 === 0) {
		this.direction.x = -1;
	}
	else if (randomAction % 3 == 0) {
		this.direction.x = 1;
	}
	else {
		this.direction.x = 0;
	}
};

Monster.prototype.setStartPosition = function (x, y) {
	this.move(x * 24, y * 32 - this.height / 2);
};