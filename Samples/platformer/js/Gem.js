var GemNormal = 5;
var GemGold = 6;
var GemCounter = 0;

var Gem = function (assetId) {
	Atlantis.Sprite.call(this);

	this.textureName = "img/Tiles/";

	if (this.assetId == GemNormal) {
		this.textureName += "Gem.png";
		this.points = 20;
		this.name = "Gem";
	}
	else {
		this.textureName += "yellowGem.png";
		this.points = 50;
		this.name = "GemG";
	}

	this.initialY = 0;
	this.maxY = 0;
	this.minY = 0;
	this.sign = (GemCounter % 2 == 0) ? -1 : 1;
	this.speed = 0.01;
	GemCounter++;
};

Gem.prototype = new Atlantis.Sprite();

Gem.prototype.move = function (x, y) {
	Atlantis.Sprite.prototype.move.call(this, x, y);
	this.initialY = y;
	this.maxY = this.initialY + 5;
	this.minY = this.initialY - 10;
};

Gem.prototype.update = function (gameTime) {
    Atlantis.Sprite.prototype.update.call(this, gameTime);
    
    this.move(this.getX(), this.getY() + this.speed * this.sign * gameTime.getElapsedTime()); 
			
	if (this.getY() <= this.minY) {
		this.sign = 1;
		this.move(this.getX(), this.minY);
	}
	else if (this.getY() >= this.maxY) {
		this.sign = -1;
		this.move(this.getX(), this.maxY);
	}
};

Gem.prototype.getPoints = function () {
	return this.points;
};