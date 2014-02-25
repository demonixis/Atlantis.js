 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

(function() {
    /*
     * A sprite animation class that define an animation frame.
     * An animation is a serie of rectangle on a spritesheet
	 * @constructor
	 * @class SpriteAnimation
     */
    Atlantis.SpriteAnimation = function (length, framerate) {
        this.rectangles = new Array(length);
        this.framerate = framerate;
        this.index = 0;
        this.max = length;
        this.elapsedTime = 0;
        this.length = length;
    }

    /**
     *
     * @method next
     * @param
     */
    Atlantis.SpriteAnimation.prototype.next = function () {
        if (this.index >= this.rectangles.length) {
            this.index = 0;
        }
        return this.rectangles[this.index];
    };

    Atlantis.SpriteAnimation.prototype.update = function (gameTime) {
        this.elapsedTime += gameTime.getElapsedTime(); 
      
        if (this.elapsedTime > this.framerate) {
            this.index++;
            if (this.index == 0) {
                Atlantis.notify("atlantis.sprite.animationCompleted");
            }
            this.elapsedTime = 0;
        }
    };

    /*
     * A SpriteAnimator is a class that is used to play sprite animations.
     * A sprite has many animation that are stored in a dictionary[name] => spriteAnimation
	 * @constructor
	 * @class SpriteAnimator
     */
    Atlantis.SpriteAnimator = function () {
        // Dictionary <string, SpriteAnimation>
        this.animations = {};
        this.spriteWidth = 0;
        this.spriteHeight = 0;
        this.textureWidth = 0;
        this.textureHeight = 0;
        this.nbSpriteX = 0;
        this.nbSpriteY = 0;
        this.spritesheetLength = 0;
        this.currentAnimationName = "";
    };

    /**
     *
     * @method initialize
     * @param
     * @param
     * @param
     * @param
     */
    Atlantis.SpriteAnimator.prototype.initialize = function(animationWidth, animationHeight, textureWidth, textureHeight) {
        this.animations = {};
        this.spriteWidth = animationWidth;
        this.spriteHeight = animationHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
        this.nbSpriteX = this.textureWidth / this.spriteWidth;
        this.nbSpriteY = this.textureHeight / this.spriteHeight;
        this.spritesheetLength = this.nbSpriteX * this.nbSpriteY; 
        this.currentAnimationName = "";
    };

    /**
     *
     * @method add
     * @param
     * @param
     * @param
     */
    Atlantis.SpriteAnimator.prototype.add = function (name, framesIndex, frameRate) {
        var animationLength = framesIndex.length;

        var animation = new Atlantis.SpriteAnimation(animationLength, frameRate);

        if (framesIndex instanceof Atlantis.Rectangle) {
            animation.rectangles = framesIndex;
        }
        else {
            for (var i = 0; i < animationLength; i++) {
                var x = framesIndex[i] % this.nbSpriteX;
                var y = Math.floor(framesIndex[i] / this.nbSpriteX);

                if (y > 0) {
                    x = x % (this.nbSpriteX * y);
                }
                else {
                    x = x % this.nbSpriteX; 
                }

                animation.rectangles[i] = new Atlantis.Rectangle(x * this.spriteWidth, y * this.spriteHeight, this.spriteWidth, this.spriteHeight);
            }
        }
        
        this.animations[name] = animation;
    };

    Atlantis.SpriteAnimator.prototype.play = function (animationName) {
        this.currentAnimationName = animationName;

        return this.animations[animationName].next();  
    };

    Atlantis.SpriteAnimator.prototype.getCurrentAnimation = function () {
        if (this.currentAnimationName !== "") {
            return this.animations[this.currentAnimationName];
        }
        return null;
    };

    /**
     *
     * @method update
     * @param
     * @param
     */
    Atlantis.SpriteAnimator.prototype.update = function (gameTime, lastDistance) {
        if (this.currentAnimationName !== "") {
            this.animations[this.currentAnimationName].update(gameTime);
        }
    };

    Atlantis.SpriteAnimator.prototype.checkForIDLEAnimation = function (lastDirection) {
        if (this.currentAnimationName !== "" && lastDirection.x == 0 && lastDirection.y == 0) {
            return this.animations[this.currentAnimationName].rectangles[0];
        }  
        return null;
    };
})();