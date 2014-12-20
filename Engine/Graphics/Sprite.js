 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.SpriteCollisionType = {
    None: 0, Stop: 1
};

Atlantis.Sprite = function (_textureName, params) {
    this.name = "GameObject";
    this.enabled = true;
    this.visible = true;
    this.rectangle = new Atlantis.Rectangle();
    this.collisionType = Atlantis.SpriteCollisionType.None;

    this._texture = null;
    this._dead = false;
    this._initialized = false;
    this.sourceRectangle = null;
    this._textureName = (typeof(_textureName) === "string") ? _textureName : "";

    this.color = null;
    this.rotation = 0;
    this.scale = new Atlantis.Vector2(1, 1);
    this.origin = new Atlantis.Vector2();
    this.layerDepth = Atlantis.Sprite.Counter++;
    this.parent = null;

    this.direction = new Atlantis.Vector2();
    this.lastPosition = new Atlantis.Vector2();
    this.lastDistance = new Atlantis.Vector2();

    // Some physics
    this.acceleration = new Atlantis.Vector2();
    this.velocity = new Atlantis.Vector2();
    this.maxVelocity = 1;

    // Rectangle and viewport
    this.viewport = new Atlantis.Rectangle(0, 0, Atlantis.screen.width, Atlantis.screen.height);

    // Force the sprite to stay in screen or to enable across screen
    this.insideScreen = false;
    this.acrossScreen = false;

    // Animation
    this.spriteAnimator = new Atlantis.SpriteAnimator();
	this.hasAnimations = false;
    this.deleteIf = null;

    var that = this;

    /**
    * Active or not the sprite.
    * @property active
    * @type {Boolean}
    * @default true
    */
    Atlantis._createProperty(this, "active", 
        function () { return that.visible && that.enabled; },
        function (value) { 
            that.enabled = value;
            that.visible = value;
        });

    /**
    * Indicate if the sprite is alive or dead.
    * @property alive
    * @type {Boolean}
    * @default true
    */
    Atlantis._createProperty(this, "alive", 
        function () { return !that._dead; },
        function (value) {
            if (value && that._dead) {
                that.revive();
            }
            else if (!value && !that._dead) {
                that.kill();
            }
        })

    /**
    * Position on X axis.
    * @property x
    * @type {Number}
    * @default 0
    */
    Atlantis._createProperty(this, "x", 
        function () { return that.rectangle.x; },
        function (value) {
            that.lastPosition.x = that.rectangle.x;
            that.rectangle.x = value; 
            that.direction.x = that.rectangle.x - that.lastPosition.x;
        });

    /**
    * Position on Y axis.
    * @property y
    * @type {Boolean}
    * @default 0
    */
    Atlantis._createProperty(this, "y", 
        function () { return that.rectangle.y; },
        function (value) {
            that.lastPosition.y = that.rectangle.y;
            that.rectangle.y = value; 
            that.direction.y = that.rectangle.x - that.lastPosition.y;
        });

    /**
    * Sprite's width.
    * @property width
    * @type {Number}
    * @default 0
    */
    Atlantis._createProperty(this, "width", 
        function () { return that.rectangle.width; },
        function (value) { that.rectangle.width = value; });

    /**
    * Sprite's height.
    * @property height
    * @type {Number}
    * @default 0
    */
    Atlantis._createProperty(this, "height", 
        function () { return that.rectangle.height; },
        function (value) { that.rectangle.height = value; });

    /**
    * The name of the texture used by the sprite.
    * @property _textureName
    * @type {String}
    * @default ""
    */
    Atlantis._createProperty(this, "textureName",
        function () { return that._textureName; },
        function (value) {
            that._textureName = value;
            that._initialized = false;
        });

    /**
    * Sprite's texture.
    * @property texture
    * @type {Object}
    * @default null
    */
    Atlantis._createProperty(this, "texture",
        function () { return that._texture; },
        function (value) {
            that._texture = value;
            if (that._texture) {
                that.rectangle.setSize(that._texture.width, that._texture.height);
                that._initialized = true;
            }
            else {
                that.rectangle.setSize(0, 0);
                that._initialized = false;
            }
        });

    var params = params || {};
    for (var i in params) {
        this[i] = params[i];
    }
};

Atlantis.Sprite.Counter = 0;

/**
 *
 * @method initialize
 * @param {Function} callback A callback called when the sprite is fully loaded.
 */
Atlantis.Sprite.prototype.initialize = function (callback) {
    this.viewport = new Atlantis.Rectangle(0, 0, Atlantis.screen.width, Atlantis.screen.height);
    
    if (this._textureName != "" && this._initialized === false) {
        var callback = (typeof(callback) === "function") ? callback : function () { };
        var that = this;

        this._texture = Atlantis.app.content.load(this._textureName, function (image) {
            that.rectangle.width = image.width;
            that.rectangle.height = image.height;

            that._initialized = true;

            callback(that);
        });
    }
    else if (callback) {
        callback(this);
    }
};

Atlantis.Sprite.prototype.copy = function (sprite) {
    this._dead = sprite._dead;
    this._textureName = sprite._textureName;
    this.visible = sprite.visible;
    this.enabled = sprite.enabled;
    this._initialized = sprite._initialized;
    this._texture = sprite._texture;
    this.rectangle = sprite.rectangle;
    this.sourceRectangle = sprite.sourceRectangle;
    this.hasAnimations = sprite.hasAnimations;
    this.spriteAnimator = sprite.spriteAnimator;
};

/**
 *
 * @method collides
 * @return {Boolean} Return true if collides otherwise return false.
 */
Atlantis.Sprite.prototype.collides = function (sprite) {
    var collides = this.rectangle.intersects(sprite.rectangle);
    
    if (sprite.collisionType === Atlantis.SpriteCollisionType.Stop) {
        sprite.move(sprite.lastPosition.x, sprite.lastPosition.y);
    }

    return collides;
};

/**
 * Kill the sprite and put it in a cache so that it can be recycled if needed.
 * @method kill
 */
Atlantis.Sprite.prototype.kill = function () {
    this.enabled = false;
    this.visible = false;
    this._dead = true;
};

/** 
 * Revive the Sprite and remove it from the recycle cache.
 * @method revive
 */
Atlantis.Sprite.prototype.revive = function () {
    this.enabled = true;
    this.visible = true;
    this._dead = false;
};

/**
*
* @method prepareAnimation
* @param
* @param
*/
Atlantis.Sprite.prototype.prepareAnimation = function (width, height) {
    if (this._initialized) { 
        this.hasAnimations = true;
        var animationWidth = width;
        var animationHeight = height || animationWidth;
        this.spriteAnimator.initialize(animationWidth, animationHeight, this._texture.width || this.rectangle.width, this._texture.height || this.rectangle.height);
        this.rectangle.width = animationWidth;
        this.rectangle.height = animationHeight;
    }
};

/**
*
* @method addAnimation
* @param
* @param
* @param
*/
Atlantis.Sprite.prototype.addAnimation = function (name, indices, frameRate, twoIndices) {
    if (this._initialized) {
        if (twoIndices) {
            var ids = [];
            for (var i = indices[0]; i <= indices[1]; i++) {
                ids.push(i);
            }

            indices = ids;
        }
        
        this.spriteAnimator.add(name, indices, frameRate);
        this.sourceRectangle = this.spriteAnimator.animations[name].rectangles[0];
    }
};

/**
*
* @method play
* @param
*/
Atlantis.Sprite.prototype.play = function (animationName) {
    if (this._initialized) {
        this.sourceRectangle = this.spriteAnimator.play(animationName);
    }
};

/**
 * Function called before update process.
 * @method preUpdate
 * @param {Atlantis.GameTime} gameTime
 */
Atlantis.Sprite.prototype.preUpdate = function (gameTime) { }

/**
 * Update process.
 * @method update
 * @param {Atlantis.GameTime} gameTime
 */
Atlantis.Sprite.prototype.update = function (gameTime) {
    // Determine the last distance and direction
    this.lastDistance.x = this.rectangle.x - this.lastPosition.x;
    this.lastDistance.y = this.rectangle.y - this.lastPosition.y;

    // Determine the last position
    this.lastPosition.x = this.rectangle.x;
    this.lastPosition.y = this.rectangle.y;

    // Update physics
    this.rectangle.x += this.velocity.x;
    this.rectangle.y += this.velocity.y;
    this.velocity.multiply(this.maxVelocity);
    this.velocity.add(this.acceleration);

    // Update animation
    if (this.hasAnimations && this._initialized) {
        this.spriteAnimator.update(gameTime);
        if (this.lastDistance.x == 0 && this.lastDistance.y == 0 && this.spriteAnimator.currentAnimationName !== "") {
            this.sourceRectangle = this.spriteAnimator.getCurrentAnimation().rectangles[0];   
        }
    }
};

/**
* Method called after the update process.
* @method postUpdate
* @param {Atlantis.GameTime} gameTime
*/
Atlantis.Sprite.prototype.postUpdate = function () {
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

    // The sprite move accross the screen
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
        else if (this.rectangle.y > this.viewport.height) {
            this.rectangle.y = this.viewport.y;
        }
    }

    if (this.deleteIf) {
        if (this.deleteIf(this)) {
            this.kill();
        }
    }
};

/**
* Draw the sprite on screen.
* @method draw
* @param {Atlantis.SpriteBatch} spriteBatch
*/
Atlantis.Sprite.prototype.draw = function (spriteBatch) { 
    if (this._initialized) {
        spriteBatch.draw(this._texture, this.rectangle, this.sourceRectangle, this.color, this.rotation, this.origin, this.scale, this.effect, this.layerDepth);
    }
};

/**
 *
 * @method setSize
 * @param
 * @param
 */
Atlantis.Sprite.prototype.setSize = function (width, height) {
    this.rectangle.width = width || this.rectangle.width;
    this.rectangle.height = height || this.rectangle.height;
};

Atlantis.Sprite.prototype.move = function (x, y) {
    this.rectangle.x = x;
    this.rectangle.y = y;
    this.lastPosition.x = x;
    this.lastPosition.y = y;
};

Atlantis.Sprite.prototype.translate = function (x, y) {
    this.rectangle.x += x;
    this.rectangle.y += y;
};

Atlantis.Sprite.prototype.getBoundingRect = function () {
    return this.rectangle;
};