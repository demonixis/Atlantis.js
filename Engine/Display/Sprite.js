var Atlantis = window.Atlantis || {};

(function() {
	Atlantis.Sprite = function() {
		this.position = new Atlantis.Vector2();
		this.velocity = new Atlantis.Vector2();
		this.maxVelocity = 1;

		this.direction = new Atlantis.Vector2();
		this.lastPosition = new Atlantis.Vector2();
		this.viewport = new Atlantis.Rectangle();

		this.insideScreen = false;
		this.acrossScreen = false;

		this.hasAnimation = false;
		this.texture = null;
	};

	Atlantis.Sprite.prototype.initialize = function () {

	};

	Atlantis.Sprite.prototype.loadContent = function (contentManager) {

	};

	Atlantis.Sprite.prototype.update = function (gameTime) {

	};

	Atlantis.Sprite.prototype.draw = function (gameTime, spriteBatch) {

	};
})();