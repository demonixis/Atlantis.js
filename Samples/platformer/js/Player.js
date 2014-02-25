var Player = function () {
	Atlantis.Sprite.call(this, name);

};

Player.prototype = new Atlantis.Sprite();

Player.prototype.initialize = function () {
	Atlantis.Sprite.prototype.initialize.call(this);
};

Player.prototype.loadContent = function (content) {
    Atlantis.Sprite.prototype.loadContent.call(this, content);
    
};

Player.prototype.update = function (gameTime) {
    Atlantis.Sprite.prototype.update.call(this, gameTime);
    
};

Player.prototype.draw = function (gameTime) {
	Atlantis.Sprite.prototype.draw.call(this, gameTime);
};