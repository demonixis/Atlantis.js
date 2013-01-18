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
		this.textureName = "";
		this.assetLoaded = false;
		this.width = 0;
		this.height = 0;
		
		Object.defineProperty(this, "x", { 
		    get: function() { return that.position.x; },
		    set: function(value) { that.position.x = value; },
		    enumerable: true,
		    configurable: true
		});
		
		Object.defineProperty(this, "y", { 
		    get: function() { return that.position.y; },
		    set: function(value) { that.position.y = value; },
		    enumerable: true,
		    configurable: true
		});
	};

	Atlantis.Sprite.prototype.initialize = function () {

	};

	Atlantis.Sprite.prototype.loadContent = function (contentManager) {
	    if (this.textureName != "" && this.assetLoaded == false) {
		this.texture = contentManager.load(this.textureName);
		this.width = this.texture.getWidth();
		this.height = this.texture.getHeight();
	    }
	};

	Atlantis.Sprite.prototype.update = function (gameTime) {

	};

	Atlantis.Sprite.prototype.draw = function (gameTime, context) {
	    context.drawImage(this.texture, this.position.x, this.position.y, this.width, this.height);
	};
})();