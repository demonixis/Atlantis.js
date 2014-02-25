var Level = function () {
	Atlantis.Sprite.call(this, name);

};

Level.prototype = new Atlantis.Sprite();

Level.prototype.initialize = function () {
	Atlantis.Sprite.prototype.initialize.call(this);
};

Level.prototype.loadContent = function (content) {
    Atlantis.Sprite.prototype.loadContent.call(this, content);
    
};

Level.prototype.update = function (gameTime) {
    Atlantis.Sprite.prototype.update.call(this, gameTime);
    
};

Level.prototype.draw = function (gameTime) {
	Atlantis.Sprite.prototype.draw.call(this, gameTime);
};