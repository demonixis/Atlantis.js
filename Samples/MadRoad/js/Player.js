var Player = (function () {
	var player = function () {
		Atlantis.Sprite.call(this);

		this.textureName = "Content/cars/cars-red.png";
		this.speed = 100;
	};

	player.prototype = new Atlantis.Sprite();

	player.prototype.loadContent = function (contentManager) {
		Atlantis.Sprite.prototype.loadContent.call(this, contentManager);
		this.setSize(44, 80);
		this.setPosition((Atlantis.Engine.width / 2) - (44 / 2), Atlantis.Engine.height - (2 * 80)); 
	};

	player.prototype.update = function (gameTime) {
		Atlantis.Sprite.prototype.update.call(this, gameTime);

		if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.up] && this.rectangle.getTop() > 0) {
			this.position.y -= this.speed * gameTime.getElapsedTime();
		}

		else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.down] && this.rectangle.getBottom() < Atlantis.Engine.height) {
			this.position.y += this.speed * gameTime.getElapsedTime();
		}

		else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.left] && this.rectangle.getLeft() > 0) {
			this.position.x -= this.speed * gameTime.getElapsedTime();
		}

		else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.right] && this.rectangle.getRight() < Atlantis.Engine.width) {
			this.position.x += this.speed * gameTime.getElapsedTime();
		}
	};

	return player;
})();