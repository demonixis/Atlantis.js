 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/** 
 * A collection that initialize, load, update and draw _sprites.
 * @class SpriteGroup
 * @extends Sprite
 * @constructor
 */
Atlantis.SpriteGroup = function () {
	Atlantis.Sprite.call(this);
    this._initialized = false;
    this._assetLoaded = false;
	this._sprites = [];	
	this._length = 0;
	this._needBoundingCompute = true;

	var that = this;
	Atlantis._createProperty(this, "x", 
        function () { return that.rectangle.x; },
        function (value) { 
        	var diff = value - that.rectangle.x;
        	that.rectangle.x = value; 
        	for (var i = 0, l = that._sprites.length; i < l; i++) {
        		that._sprites[i].translate(diff, 0);
        	}
        	that._needBoundingCompute = true;
        });

    Atlantis._createProperty(this, "y", 
        function () { return that.rectangle.y; },
        function (value) {
        	var diff = value - that.rectangle.y;
        	that.rectangle.x = value; 
        	for (var i = 0, l = that._sprites.length; i < l; i++) {
        		that._sprites[i].translate(0, diff);
        	}
        	that._needBoundingCompute = true;
        });
};
Atlantis.SpriteGroup.prototype = Object.create(Atlantis.Sprite.prototype);

/**
 * Load assets of all members.
 * @method initialize
 * @param {Function} callback
 */
Atlantis.SpriteGroup.prototype.initialize = function (callback) {
	var callback = (typeof(callback) === "function") ? callback : function () {};
	
	if (!this._assetLoaded) {
		for (var i = 0; i < this._length; i++) {
			this._sprites[i].initialize();
		}
		this._assetLoaded = true;
		callback(this);
	}
	else {
		callback(this);
	}
};

/**
 * Update logic of all members.
 * @method update
 * @param {Atlantis.GameTime} gameTime An instance of GameTime.
 */
Atlantis.SpriteGroup.prototype.update = function (gameTime) {
	Atlantis.Sprite.prototype.update.call(this, gameTime);

	if (!this._dead && this.enabled) {
		// Update
		for (var i = 0; i < this._length; i++) {
            if (this._sprites[i] !== null && this._sprites[i].alive && this._sprites[i].enabled) {
            	this._sprites[i].preUpdate(gameTime);
		    	this._sprites[i].update(gameTime);
    		    this._sprites[i].postUpdate(gameTime);
            }
    	}
	}
};

/**
 * Function called before update process.
 * @method preUpdate
 * @param {Atlantis.GameTime} gameTime
 */
Atlantis.SpriteGroup.prototype.postUpdate = function (gameTime) { }

/**
 * Draw all members on screen.
 * @method draw
 * @param {Atlantis.SpriteBatch}
 */
Atlantis.SpriteGroup.prototype.draw = function (spriteBatch) {
	if (this.visible) {
		for (var i = 0; i < this._length; i++) {
            if (this._sprites[i] !== null && this._sprites[i].alive && this._sprites[i].visible) {
    		     this._sprites[i].draw(spriteBatch);
            }
    	}
	}
};

/**
 * Clear the collection.
 * @method clear
 */
Atlantis.SpriteGroup.prototype.clear = function () {
    this._sprites.length = 0;
    this._length = 0;
};

Atlantis.SpriteGroup.prototype.collides = function (sprite) {
	if (this.collidesWithGroup(sprite)) {
		var i = 0,
			collides = false;

		while (i < this._length && collides === false) {
			collides = (sprite.collides(this._sprites[i])) ? true : collides;
			i++;
		}

		if (collides && sprite.collisionType === Atlantis.SpriteCollisionType.Stop) {
			sprite.move(sprite.lastPosition.x, sprite.lastPosition.y);
		}

		return collides;
	}

	return false;
};

/**
 *
 * @method collidesWithGroup
 * @param {Atlantis.Sprite} sprite
 * @param {Boolean} computeBoundingRect
 * @return {Boolean}
 */
Atlantis.SpriteGroup.prototype.collidesWithGroup = function (sprite, computeBoundingRect) {
	if (computeBoundingRect || this._needBoundingCompute) {
		this.computeBoundingRect();
	}
	return this.rectangle.intersects(sprite.rectangle);
};

/**
 * Compute the bounding size of the group.
 * @method computeBoundingSize
 */
Atlantis.SpriteGroup.prototype.computeBoundingRect = function () {
	this.rectangle.setSize(0, 0);

	for (var i = 0; i < this._length; i++) {
		this.rectangle.width = Math.max(this.rectangle.getRight(), this._sprites[i].rectangle.getRight()) - this.rectangle.x;
		this.rectangle.height = Math.max(this.rectangle.getBottom(), this._sprites[i].rectangle.getBottom()) - this.rectangle.y;
	}

	this._needBoundingCompute = false;
};

/**
 * Count the number of living sprite in the group.
 * @method countLiving
 * @return {Number} Return the number of living sprites.
 */
Atlantis.SpriteGroup.prototype.countLiving = function () {
	var livings = 0;

	for (var i = 0; i < this._length; i++) {
		livings += (this._sprites[i] !== null && this._sprites[i].alive) ? 1 : 0;
	}

	return livings;
};

/**
 * Count the number of dead sprite in the group.
 * @method countDead
 * @return {Number} Return the number of dead sprites.
 */
Atlantis.SpriteGroup.prototype.countDead = function () {
	var deads = 0;

	for (var i = 0; i < this._length; i++) {
		deads += (this._sprites[i] !== null && !this._sprites[i].alive) ? 1 : 0;
	}

	return deads;
};

/** 
 * @method forEach
 * @param {Function} callback
 */
Atlantis.SpriteGroup.prototype.forEach = function (callback) {
	for (var i = 0; i < this._length; i++) {
		if (this._sprites[i] !== null && this._sprites[i].alive) {
			callback(this._sprites[i]);
		}
	}
};

/**
 * Gets an sprite from the group.
 * @method get
 * @param {Number} index The index of the sprite on the group.
 */
Atlantis.SpriteGroup.prototype.get = function (index) {
	var sprite = null;

	if (index > -1 && index < this._sprites.length) {
		sprite = this._sprites[index];
	}

	return sprite;
};

/**
 * Gets the first dead sprite if available.
 * @method getFirstDead
 * @return {Atlantis.Sprite} Return the first killed sprite otherwise return null.
 */
Atlantis.SpriteGroup.prototype.getFirstDead = function () {
	var i = 0,
		sprite = null;

	while (i < this._length && sprite === null) {
		sprite = (!this._sprites[i].alive) ? this._sprites[i] : sprite;
		i++;
	}

	return sprite;
};

/**
 * Gets the first alive sprite if available.
 * @method getFirstAlive
 * @return {Atlantis.Sprite} Return the first alive sprite, otherwise return null.
 */
Atlantis.SpriteGroup.prototype.getFirstAlive = function () {
	var i = 0,
		sprite = null;

	while (i < this._length && sprite === null) {
		sprite = (this._sprites[i].alive) ? this._sprites[i] : sprite;
		i++;
	}

	return sprite;
};

/**
 * Gets the first null index.
 * @method getFirstNull
 * @return {Number} Return the index of the first null element in the group otherwise return -1.
 */
Atlantis.SpriteGroup.prototype.getFirstNull = function () {
	var index = -1,
		i = 0;

	while (i < this._length && index === -1) {
		index = (this._sprites[i] === null) ? i : index;
		i++;
	}

	return index;
};

Atlantis.SpriteGroup.prototype.kill = function () {
	Atlantis.Sprite.prototype.kill.call(this);

	for (var i = 0; i < this._length; i++) {
		if (this._sprites[i] !== null) {
			this._sprites[i].kill();
		}
	}
};

Atlantis.SpriteGroup.prototype.revive = function () {
	Atlantis.Sprite.prototype.revive.call(this);

	for (var i = 0; i < this._length; i++) {
		if (this._sprites[i] !== null) {
			this._sprites[i].revive();
		}
	}
};

/**
 * Add an sprite to the group.
 * @method add
 * @param {Atlantis.Sprite} sprite The sprite to add.
 */
Atlantis.SpriteGroup.prototype.add = function (sprite) {
	if (sprite instanceof Atlantis.Sprite && this._sprites.indexOf(sprite) === -1) {
		var nullIndex = this.getFirstNull();

		if (nullIndex === -1) { 
			this._sprites.push(sprite);
			this._length++;
		}
		else {
			this._sprites[nullIndex] = sprite;
		}

		sprite.parent = this;

		if (this._initialized) {
			sprite.initialize();
		}

		this._needBoundingCompute = true;
	}
};

/**
 * Remove a sprite from the group at the position.
 * @method removeAt
 * @param {Number} index The index of the sprite to remove.
 * @param {Boolean} splice Whether the object should be cut from the array entirely or not.
 */
Atlantis.SpriteGroup.prototype.removeAt = function (index, splice) {
	var result = null;

	if (this._sprites[index]) {
		result = this._sprites[index];
		result.parent = null;

		if (splice) {
			this._sprites.splice(index, 1);
		}
		else {
			this._sprites[index] = null;
		}

		this._length--;
		this._needBoundingCompute = true;
	}

	return result;
};

/**
 * remove a sprite from the group.
 * @method remove
 * @param {Atlantis.Sprite} sprite The sprite to remove.
 * @param {Boolean} splice Whether the object should be cut from the array entirely or not.
 */
Atlantis.SpriteGroup.prototype.remove = function (sprite, splice) {
	var index = this._sprites.indexOf(sprite);
	return this.removeAt(index, splice);
};

/** 
 * Replace a sprite by another.
 * @methode replace
 * @param {Atlantis.Sprite} oldSprite The current sprite of this group that must be replaced.
 * @param {Atlantis.Sprite} newSprite The new sprite to replace the old sprite.
 * @return {Atlantis.Sprite} Return the new sprite if the replace operation success, otherwise return null.
 */
Atlantis.SpriteGroup.prototype.replace = function (oldSprite, newSprite) {
	var index = this._sprites.indexOf(oldSprite);

	if (index > -1) {
		oldSprite.parent = null;
		newSprite.parent = this;
		this._sprites[index] = newSprite;
		this._needBoundingCompute = true;

		return newSprite;
	}

	return null;
};