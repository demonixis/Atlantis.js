var Atlantis = window.Atlantis || {};

(function() {
	Atlantis.Sprite = function(params) {
		this.position = new Atlantis.Vector2();
        this.direction = new Atlantis.Vector2();

        this.acceleration = new Atlantis.Vector2(1, 1);
		this.velocity = new Atlantis.Vector2(1, 1);
		this.maxVelocity = 1;

		this.lastPosition = new Atlantis.Vector2(0, 0);
        this.rectangle = new Atlantis.Rectangle();
        this.sourceRectangle = new Atlantis.Rectangle();

		this.insideScreen = false;
		this.acrossScreen = false;

		this.hasAnimation = false;
		this.texture = null;
		this.textureName = "";
		this.assetLoaded = false;
		this.width = 0;
		this.height = 0;
        this.enabled = true;
        this.visible = true;

        var params = params || {};
        for (var i in params) {
            this[i] = params[i];
        }
	};

    Atlantis.Sprite.prototype.prepareAnimation = function (width, height) {
        this.hasAnimation = true;
    };

    Atlantis.Sprite.prototype.addAnimation(name, framesIndex, frameRate, reversed) {
        
    };

    Atlantis.Sprite.prototype.play(animationName) {
        if (this.hasAnimation) {
           
        };
    };

	Atlantis.Sprite.prototype.initialize = function () {

	};

	Atlantis.Sprite.prototype.loadContent = function (contentManager) {
	    if (this.textureName != "" && this.assetLoaded == false) {
		    this.texture = contentManager.load(this.textureName);
            this.assetLoaded = true;
	    }
	};

	Atlantis.Sprite.prototype.update = function (gameTime) {
        if (this.enabled) {
            this.lastPosition.x = this.position.x;
            this.lastPosition.y = this.postion.y;

            // Update physics
            this.position.x += this.velocity.x * this.acceleration.x;
            this.position.y += this.velocity.y * this.acceleration.y;
        
            this.velocity.x *= this.maxVelocity;
            this.velocity.y *= this.maxVelocity;

            // Update animation
            if (this.hasAnimation) {
                this.animator.update(gameTime, this.lastDistance);
            }
        }
	};

    Atlantis.Sprite.prototype.postUpdate = function (gameTime) {
         this.direction.x = this.position.x - this.lastPosition.x;
         this.direction.y = this.position.y - this.lastPosition.y;

         // Force the sprite to stay inside screen
         if (this.insideScreen) {
             if (this.position.x < this.viewport.x) {
                 this.position.x = this.viewport.x;
                 this.velocity.x *= 0;
                 this.velocity.y *= 0;
             }
             else if (this.position.x + this.width > this.viewport.width) {
                 this.position.x = this.viewport.width - this.width;
                 this.velocity.x *= 0;
                 this.velocity.y *= 0;
             }

             if (this.y < this.viewport.y) {
                 this.position.y = this.viewport.y;
                 this.velocity.x *= 0;
                 this.velocity.y *= 0;
             }
             else if (this.y + this.width > this.viewport.height) {
                 this.position.y = this.viewport.height - this.height;
                 this.velocity.x *= 0;
                 this.velocity.y *= 0;
             }
         }

         // The sprite move throw the screen
         else if (this.acrossScreen) {
             if (this.x + this.width < this.viewport.x) {
                 this.position.x = this.viewport.width
             }
             else if (this.x > this.viewport.width) {
                 this.position.x = this.viewport.x;
             }

             if (this.y + this.height < this.viewport.y) {
                 this.position.y = this.viewport.height;
             }
             else if (this.y > this.viewport.height) {
                 this.position.y = this.viewport.y;
             }
         }
    };

	Atlantis.Sprite.prototype.draw = function (gameTime, context) {
        if (this.enabled) {
            this.postUpdate(gameTime);
        }
        
        if (this.visible) {
            context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
	};
})();