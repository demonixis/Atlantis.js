var SpriteGame = function () {
	Atlantis.Game.call(this, 1024, 600, "Atlantis Game Engine for Java - Sprite Sample");
	this.background = new Atlantis.Sprite("background.png");
	this.tree = new Atlantis.Sprite("Tree.png");
	this.tree2 = new Atlantis.Sprite("Tree2.png");
	this.femaleSprite = new Atlantis.Sprite("BRivera-femaleelfwalk.png");
	this.femaleSprite.setViewport(0, 0, this.width, this.height);
	this.femaleSprite.forceInsideScreen(true);
	this.spriteBatch = new Atlantis.SpriteBatch(graphicsDevice());
};

SpriteGame.prototype.loadContent = function () {
	SpriteGame.prototype.prototype.loadContent.call(this);
	
	this.background.loadContent(this.content);
	this.background.setSize(this.width, this.height);
	
	this.tree.loadContent(content);
	this.tree.setPosition(150, 150);
	this.tree2.loadContent(content);
	this.tree2.setSize(128, 128);
	this.tree2.setPosition(this.width - 250, this.height - 250);
	
	this.femaleSprite.loadContent(this.content);
	this.femaleSprite.prepareAnimation(64, 64);
	this.femaleSprite.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8], 15);
	this.femaleSprite.addAnimation("left", [9, 10, 11, 12, 13, 14, 15, 16, 17], 15);
	this.femaleSprite.addAnimation("down", [18, 19, 20, 21, 22, 23, 24, 25, 26], 15);
	this.femaleSprite.addAnimation("right", [27, 28, 29, 30, 31, 32, 33, 34, 35], 15);
	
	this.femaleSprite.setSize(72, 72);
	this.femaleSprite.setPosition(
			this.width / 2 - this.femaleSprite.getWidth() / 2,
			this.height / 2 - this.femaleSprite.getHeight() / 2);
}

SpriteGame.prototype.update = function (gameTime) {
	SpriteGame.prototype.prototype.update.call(this, gameTime);
	
	this.femaleSprite.update(gameTime);
	
	var state = this.keyboardManager.getState();
	
	if (state.isKeyDown(KeyEvent.VK_UP)) {
		this.femaleSprite.play("up");
		this.femaleSprite.setY(this.femaleSprite.getY() - 1);
	}
	else if (state.isKeyDown(KeyEvent.VK_DOWN)) {
		this.femaleSprite.play("down");
		this.femaleSprite.setY(this.femaleSprite.getY() + 1);
	}
	
	if (state.isKeyDown(KeyEvent.VK_RIGHT)) {
		this.femaleSprite.play("right");
		this.femaleSprite.setX(this.femaleSprite.getX() + 1);
	}
	else if (state.isKeyDown(KeyEvent.VK_LEFT)) {
		this.femaleSprite.play("left");
		this.femaleSprite.setX(this.femaleSprite.getX() - 1);
	}
	
	if (state.isKeyDown(KeyEvent.VK_ESCAPE)) {
		this.exit();
	}
}

SpriteGame.prototype.draw = function (gameTime) {
	SpriteGame.prototype.draw.call(this, gameTime);
	this.spriteBatch.begin();
	this.background.draw(gameTime, this.spriteBatch);
	this.tree.draw(gameTime, this.spriteBatch);
	this.tree2.draw(gameTime, this.spriteBatch);
	this.femaleSprite.draw(gameTime, this.spriteBatch);
	this.spriteBatch.end();
}
