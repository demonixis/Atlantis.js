 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

/**
 * A sprite animation define an animation which is a group of frames
 * An animation is a serie of rectangle on a spritesheet
 * @constructor
 * @class SpriteAnimation
 * @param length The number of frames
 * @param framerate The desired frame rate.
 */
Atlantis.SpriteAnimation = function (length, framerate) {
    this.rectangles = new Array(length);
    this.framerate = framerate;
    this.index = 0;
    this.max = length;
    this.elapsedTime = 0;
    this.length = length;
};

/**
 * Gets the next available frame of the animation.
 * @method next
 * @return {Atlantis.Rectangle} Return the next frame of the animation.
 */
Atlantis.SpriteAnimation.prototype.next = function () {
    if (this.index >= this.rectangles.length) {
        this.index = 0;
    }
    return this.rectangles[this.index];
};

/**
 * Update animation index relative to time.
 * @method update
 */
Atlantis.SpriteAnimation.prototype.update = function (gameTime) {
    this.elapsedTime += gameTime.getElapsedTime(); 
  
    if (this.elapsedTime > this.framerate) {
        this.index++;
        this.elapsedTime = 0;
    }
};

/**
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
 * Initialize the animator
 * @method initialize
 * @param {Number} animationWidth The width of a frame.
 * @param {Number} animationHeight The height of a frame.
 * @param {Number} textureWidth The width of the texture (spritesheet).
 * @param {Number} textureHeight The height of the texture (spritesheet).
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
 * Add an animation to the animator.
 * @method add
 * @param {String} name The name of the animation.
 * @param {Array} framesIndex An array of indices that compose the animation on the spritesheet.
 * @param {Number} framerate The desired framerate for this animation.
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

/**
 * Play an animation.
 * @method play
 * @param {String} animationName The name of the animation to play.
 */
Atlantis.SpriteAnimator.prototype.play = function (animationName) {
    this.currentAnimationName = animationName;

    return this.animations[animationName].next();  
};

/**
 *
 * @method getCurrentAnimation
 */
Atlantis.SpriteAnimator.prototype.getCurrentAnimation = function () {
    if (this.currentAnimationName !== "") {
        return this.animations[this.currentAnimationName];
    }
    return null;
};

/**
 *
 * @method update
 * @param gameTime
 * @param lastDistance
 */
Atlantis.SpriteAnimator.prototype.update = function (gameTime, lastDistance) {
    if (this.currentAnimationName !== "") {
        this.animations[this.currentAnimationName].update(gameTime);
    }
};

/**
 *
 * @method checkForIDLEAnimation
 */
Atlantis.SpriteAnimator.prototype.checkForIDLEAnimation = function (lastDirection) {
    if (this.currentAnimationName !== "" && lastDirection.x == 0 && lastDirection.y == 0) {
        return this.animations[this.currentAnimationName].rectangles[0];
    }  
    return null;
};
