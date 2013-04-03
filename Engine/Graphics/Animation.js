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
    Atlantis.SpriteAnimation = function (length, frameRate) {
        this.rectangles = new Array(length);
        this.frameRate = frameRate;
        this.index = 0;
        this.max = length;
        this.elapsedTime = 0;
        this.length = length;
    }

    Atlantis.SpriteAnimation.prototype.next = function (elapsedTime) {
        this.elapsedTime += elapsedTime;
   
        if (this.elapsedTime > this.frameRate) {
            this.index++;
            if (this.index >= this.max) {
                this.index = 0;
            }
            
            if (this.index == 0) {
                Atlantis.notify("sprite.AnimationComplete");
            }

            this.elapsedTime = 0;
        }
 
        return this.rectangles[this.index];
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
    };

    Atlantis.SpriteAnimator.prototype.initialize = function(animationWidth, animationHeight, textureWidth, textureHeight) {
        this.animations = {};
        this.spriteWidth = animationWidth;
        this.spriteHeight = animationHeight;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
        this.nbSpriteX = this.textureWidth / this.spriteWidth;
        this.nbSpriteY = this.textureHeight / this.spriteHeight;
        this.spritesheetLength = this.nbSpriteX * this.nbSpriteY; 
    };

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

    Atlantis.SpriteAnimator.prototype.update = function (gameTime, lastDistance) {
        
    };
})();