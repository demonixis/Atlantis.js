var Atlantis = window.Atlantis || {};

(function() {
	Atlantis.Sprite = function(params) {
        Atlantis.Entity.call(this);

	    this.position = new Atlantis.Vector2();
        this.direction = new Atlantis.Vector2();
        this.lastPosition = new Atlantis.Vector2();
        this.lastDistance = new Atlantis.Vector2();

        // Some physics
        this.acceleration = new Atlantis.Vector2(1, 1);
    	this.velocity = new Atlantis.Vector2();
    	this.maxVelocity = 1;

	    // Rectangle and viewport
        this.viewport = new Atlantis.Rectangle();

        // Force the sprite to stay in screen or to enable across screen
    	this.insideScreen = false;
    	this.acrossScreen = false;

        // Animation
        this.isFullyLoaded = false;
        this.spriteAnimator = new Atlantis.SpriteAnimator();
	    this.hasAnimation = false;
        this.elapsedTime = 0;
        
        var params = params || {};
        for (var i in params) {
            this[i] = params[i];
        }
    };

    Atlantis.Sprite.prototype = new Atlantis.Entity();

    Atlantis.Sprite.prototype.prepareAnimation = function (width, height) {
        this.hasAnimation = true;
        var animationWidth = width;
        var animationHeight = height || animationWidth;
        this.spriteAnimator.initialize(animationWidth, animationHeight, this.texture.width, this.texture.height);
        this.rectangle.width = animationWidth;
        this.rectangle.height = animationHeight;
    };

    Atlantis.Sprite.prototype.addAnimation = function (name, framesIndex, frameRate) {
        this.spriteAnimator.add(name, framesIndex, frameRate); 
        this.sourceRectangle = this.spriteAnimator.animations[name].rectangles[0];
    };

    Atlantis.Sprite.prototype.play = function (animationName) {
        this.sourceRectangle = this.spriteAnimator.animations[animationName].next(this.elapsedTime);
    };

    Atlantis.Sprite.prototype.update = function (gameTime) {
        if (this.enabled) {
            this.elapsedTime += gameTime.getElapsedTime();

            // Determine the last distance and direction
            this.lastDistance.x = this.position.x - this.lastPosition.x;
            this.lastDistance.y = this.position.y - this.lastPosition.y;   

            // Determine the last position
            this.lastPosition.x = this.position.x;
            this.lastPosition.y = this.position.y;

            // Update physics
            this.position.x += this.velocity.x * this.acceleration.x;
            this.position.y += this.velocity.y * this.acceleration.y;
            this.velocity.multiply(this.maxVelocity);

            // Update the rectangle position
            this.rectangle.x = this.position.x;
            this.rectangle.y = this.position.y;

            // Update animation
            if (this.hasAnimation) {
                this.spriteAnimator.update(gameTime, this.lastDistance);
            }
        }
	};

    Atlantis.Sprite.prototype.postUpdate = function (gameTime) {
        if (this.enabled) {
            this.direction.x = this.position.x - this.lastPosition.x;
            this.direction.y = this.position.y - this.lastPosition.y;

            // Force the sprite to stay inside screen
            if (this.insideScreen) {
                if (this.position.x < this.viewport.x) {
                    this.position.x = this.viewport.x;
                    this.velocity.multiply(0);
                }
                else if (this.rectangle.getRight() > this.viewport.width) {
                    this.position.x = this.viewport.width - this.rectangle.width;
                    this.velocity.multiply(0);
                }

                if (this.position.y < this.viewport.y) {
                    this.position.y = this.viewport.y;
                    this.velocity.multiply(0);
                }
                else if (this.rectangle.getBottom() > this.viewport.height) {
                    this.position.y = this.viewport.height - this.rectangle.height;
                    this.velocity.multiply(0);
                }
            }

            // The sprite move throw the screen
            else if (this.acrossScreen) {
                if (this.rectangle.getRight() < this.viewport.x) {
                    this.position.x = this.viewport.width
                }
                else if (this.position.x > this.viewport.width) {
                    this.position.x = this.viewport.x;
                }

                if (this.rectangle.getBottom() < this.viewport.y) { 
                    this.position.y = this.viewport.height;
                }
                else if (this.position.y > this.viewport.height) {
                    this.position.y = this.viewport.y;
                }
            }
        }      
    };

	Atlantis.Sprite.prototype.draw = function (gameTime, context) {
        this.postUpdate(gameTime);

        if (this.visible && this.assetLoaded) {
            if (this.hasAnimation) {
                context.drawImage(this.texture, this.sourceRectangle.x, this.sourceRectangle.y, this.sourceRectangle.width, this.sourceRectangle.height, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            }
            else {
                context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            }
        }
	};
})();