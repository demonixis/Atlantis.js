var Player = (function () {
	var player = function () {
		Atlantis.Sprite.call(this);

		this.textureName = "Content/cars/cars-red.png";
		this.speed = 100;

		// Screen reference for scaling the car correctly
		this.screenReference = { width: 480, height: 800 };
	};

	player.prototype = new Atlantis.Sprite();

	player.prototype.loadContent = function (contentManager) {
		Atlantis.Sprite.prototype.loadContent.call(this, contentManager);

		var carSize = {
			width: 22,
			height: 40
		};

		this.setSize(carSize.width, carSize.height);
		this.setPosition((Atlantis.Engine.width / 2) - (carSize.width / 2), Atlantis.Engine.height - (2 * carSize.height)); 
	};

	player.prototype.update = function (gameTime) {
		Atlantis.Sprite.prototype.update.call(this, gameTime);

		if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.up] && this.rectangle.getTop() > 0) {
			this.y -= this.speed * gameTime.getElapsedTime();
		}

		else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.down] && this.rectangle.getBottom() < Atlantis.Engine.height) {
			this.y += this.speed * gameTime.getElapsedTime();
		}

		if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.left] && this.rectangle.getLeft() > 0) {
			this.x -= this.speed * gameTime.getElapsedTime();
		}

		else if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.right] && this.rectangle.getRight() < Atlantis.Engine.width) {
			this.x += this.speed * gameTime.getElapsedTime();
		}
	};

	return player;
})();