 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

Atlantis.Sprite = (function () {
    /** 
    * A sprite entity
    * @constructor
    * @class Sprite
    */
    var sprite = function (params) {
        this.name = "GameObject";
        this.enabled = true;
        this.visible = true;
        this.texture = null;
        this.textureName = "";
        this.assetLoaded = false;
        this.rectangle = new Atlantis.Rectangle();
        this.sourceRectangle = new Atlantis.Rectangle();

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

        this._reqSize = null;
        this._reqPrepareAnims = null;
        this._reqAddAnims = [];
    };

    /**
     *
     * @method initialize
     */
    sprite.prototype.initialize = function () {
        this.viewport = new Atlantis.Rectangle(0, 0, Atlantis.Engine.Width, Atlantis.Engine.Height);
    };

    /**
     *
     * @method loadContent
     * @param
     */
    sprite.prototype.loadContent = function (contentManager) {
        if (this.textureName != "" && this.assetLoaded == false) {
            var that = this;

            this.texture = contentManager.load(this.textureName, function () {
                this.style.position = "absolute";
                this.style.top = "-9999px";
                this.style.left = "-9999px";
                
                document.body.appendChild(this);
                document.body.removeChild(this);

                this.style.position = "";
                this.style.top = "";
                this.style.left = "";

                that.rectangle.width = this.width;
                that.rectangle.height = this.height;

                that.assetLoaded = true;
 
                if (that._reqPrepareAnims) {
                    that.prepareAnimation(that._reqPrepareAnims.width, that._reqPrepareAnims.height);
                }

                if (that._reqAddAnims.length) {
                    for (var i = 0, l = that._reqAddAnims.length; i < l; i++) {
                        that.addAnimation(that._reqAddAnims[i].name, that._reqAddAnims[i].framesIndex, that._reqAddAnims[i].frameRate);
                    }
                }

                if (that._reqSize) {
                    that.setSize(that._reqSize.width, that._reqSize.height);
                }
            });
        }
    };

    /**
    *
    * @method prepareAnimation
    * @param
    * @param
    */
    sprite.prototype.prepareAnimation = function (width, height) {
        if (this.assetLoaded) { 
            this.hasAnimation = true;
            var animationWidth = width;
            var animationHeight = height || animationWidth;
            this.spriteAnimator.initialize(animationWidth, animationHeight, this.texture.width || this.rectangle.width, this.texture.height || this.rectangle.height);
            this.rectangle.width = animationWidth;
            this.rectangle.height = animationHeight;
        }
        else {
            this._reqPrepareAnims = { width: width, height: height };
        }
    };

    /**
    *
    * @method addAnimation
    * @param
    * @param
    * @param
    */
    sprite.prototype.addAnimation = function (name, framesIndex, frameRate) {
        if (this.assetLoaded) {
            this.spriteAnimator.add(name, framesIndex, frameRate);
            this.sourceRectangle = this.spriteAnimator.animations[name].rectangles[0]; console.log("ok")
        }
        else {
            this._reqAddAnims.push({ name: name, framesIndex: framesIndex, frameRate: frameRate });
        }
    };

    /**
    *
    * @method play
    * @param
    */
    sprite.prototype.play = function (animationName) {
        if (this.assetLoaded) {
            this.sourceRectangle = this.spriteAnimator.play(animationName);
        }
    };

    /**
    *
    * @method update
    * @param
    */
    sprite.prototype.update = function (gameTime) {
        if (this.enabled) {
            this.elapsedTime += gameTime.getElapsedTime();

            // Determine the last distance and direction
            this.lastDistance.x = this.rectangle.x - this.lastPosition.x;
            this.lastDistance.y = this.rectangle.y - this.lastPosition.y;

            // Determine the last position
            this.lastPosition.x = this.rectangle.x;
            this.lastPosition.y = this.rectangle.y;

            // Update physics
            this.rectangle.x += this.velocity.x * this.acceleration.x;
            this.rectangle.y += this.velocity.y * this.acceleration.y;
            this.velocity.multiply(this.maxVelocity);

            // Update animation
            if (this.hasAnimation && this.assetLoaded) { 
                this.spriteAnimator.update(gameTime);
                if (this.lastDistance.x == 0 && this.lastDistance.y == 0 && this.spriteAnimator.currentAnimationName !== "") {
                    this.sourceRectangle = this.spriteAnimator.getCurrentAnimation().rectangles[0];   
                }
            }
        }
    };

    /**
    *
    * @method postUpdate
    * @param
    */
    sprite.prototype.postUpdate = function (gameTime) {
        if (this.enabled) {
            this.direction.x = this.rectangle.x - this.lastPosition.x;
            this.direction.y = this.rectangle.y - this.lastPosition.y;

            // Force the sprite to stay inside screen
            if (this.insideScreen) {
                if (this.rectangle.x < this.viewport.x) {
                    this.rectangle.x = this.viewport.x;
                    this.velocity.multiply(0);
                }
                else if (this.rectangle.getRight() > this.viewport.width) {
                    this.rectangle.x = this.viewport.width - this.rectangle.width;
                    this.velocity.multiply(0);
                }

                if (this.rectangle.y < this.viewport.y) {
                    this.rectangle.y = this.viewport.y;
                    this.velocity.multiply(0);
                }
                else if (this.rectangle.getBottom() > this.viewport.height) {
                    this.rectangle.y = this.viewport.height - this.rectangle.height;
                    this.velocity.multiply(0);
                }
            }

            // The sprite move throw the screen
            else if (this.acrossScreen) {
                if (this.rectangle.getRight() < this.viewport.x) {
                    this.rectangle.x = this.viewport.width
                }
                else if (this.rectangle.x > this.viewport.width) {
                    this.rectangle.x = this.viewport.x;
                }

                if (this.rectangle.getBottom() < this.viewport.y) {
                    this.rectangle.y = this.viewport.height;
                }
                else if (this.position.y > this.viewport.height) {
                    this.rectangle.y = this.viewport.y;
                }
            }
        }
    };

    /**
    *
    * @method draw
    * @param
    * @param
    */
    sprite.prototype.draw = function (gameTime, context) { 
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

    /**
     *
     * @method setSize
     * @param
     * @param
     */
    sprite.prototype.setSize = function (width, height) {
        if (!this.assetLoaded) {
            this._reqSize = { width: width, height: height };
        }
        else {
            this.rectangle.width = width || this.rectangle.width;
            this.rectangle.height = height || this.rectangle.height;
        }
    };

    sprite.prototype.isActive = function () {
        return this.enabled && this.visible;
    };

    sprite.prototype.setActive = function (active) {
        this.enabled = active;
        this.visible = active;
    };

    sprite.prototype.move = function (x, y) {
        this.rectangle.x = x;
        this.rectangle.y = y;
    };
    
    sprite.prototype.translate = function (x, y) {
        this.rectangle.x += x;
        this.rectangle.y += y;
    };

    sprite.prototype.getX = function () { 
        return this.rectangle.x;
    };

    sprite.prototype.getY = function () {
        return this.rectangle.y;
    };
    
    sprite.prototype.setX = function (x) {
        this.rectangle.x = x;  
    };
    
    sprite.prototype.setY = function (y) {
        this.rectangle.y = y;  
    };

    sprite.prototype.getWidth = function () {
        return this.rectangle.width;
    };

    sprite.prototype.getHeight = function () {
        return this.rectangle.height;
    };

    sprite.prototype.setDirection = function (direction) {
        this.direction.x = x;
        this.direction.y = y;
    };
    
    sprite.prototype.getDirection = function () {
        return this.direction;    
    };

    sprite.prototype.getName = function () {
        return this.name;
    };

    sprite.prototype.setName = function (name) { 
        this.name = name; 
    };

    sprite.prototype.getBoundingRect = function () {
        return this.rectangle;
    };

    return sprite;
})();