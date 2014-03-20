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
 * @constructor
 */
Atlantis.SpriteGroup = function () {
	Atlantis.Sprite.call(this);
    this._initialized = false;
    this._loaded = false;
	this._sprites = [];	

	// Indice of Sprite that must be added or removed
	this._needReAdd = [];
	this._needRemove = [];

	// Sprite that are not actives and removed from the main collection.
	this._deads = [];

	var that = this;
	Atlantis._createProperty(this, "x", 
        function () { return that.rectangle.x; },
        function (value) { 
        	var diff = value - that.rectangle.x;
        	that.rectangle.x = value; 
        	for (var i = 0, l = that._sprites.length; i < l; i++) {
        		that._sprites[i].translate(diff, 0);
        	}
        });

    Atlantis._createProperty(this, "y", 
        function () { return that.rectangle.y; },
        function (value) {
        	var diff = value - that.rectangle.y;
        	that.rectangle.x = value; 
        	for (var i = 0, l = that._sprites.length; i < l; i++) {
        		that._sprites[i].translate(0, diff);
        	}
        });
};
Atlantis.SpriteGroup.prototype = Object.create(Atlantis.Sprite.prototype);

/**
 * Gets the first dead sprite if available.
 * @method getFirstDead
 * @return {Atlantis.Sprite} Return the first killed sprite otherwise return null.
 */
Atlantis.SpriteGroup.prototype.getFirstDead = function () {
	if (this._deads.length) {
		return this._deads[0];
	}
	return null;
};

/**
 * Gets the first alive sprite if available.
 * @method getFirstAlive
 * @return {Atlantis.Sprite} Return the first alive sprite, otherwise return null.
 */
Atlantis.SpriteGroup.prototype.getFirstAlive = function () {
	if (this._sprites.length) {
		return this._sprites[0];
	}
	return null;
};

/**
 * Gets the first null sprite if available.
 * @method getFirstNull
 * @return {Number} Return the index of the first null element in the group.
 */
Atlantis.SpriteGroup.prototype.getFirstNull = function () {
	var sprite = null,
		i = 0,
		size = this._sprites.length;

	while (i < size && sprite === null) {
		sprite = (this._sprites[i] === null) ? this._sprites[i] : sprite;
		i++;
	}

	return sprite;
};

/**
 * Count the number of living sprite in the group.
 * @method countLiving
 * @return {Number} Return the number of living sprites.
 */
Atlantis.SpriteGroup.prototype.countLiving = function () {
	return this._sprites.length;
};

/**
 * Count the number of dead sprite in the group.
 * @method countDead
 * @return {Number} Return the number of dead sprites.
 */
Atlantis.SpriteGroup.prototype.countDead = function () {
	return this._deads.length;
};

Atlantis.SpriteGroup.prototype._kill = function (sprite) {
	var index = this._sprites.indexOf(sprite);

	if (index > -1) {
		this._needRemove.push(index);
	}
};

Atlantis.SpriteGroup.prototype._revive = function (sprite) { 
	var index = this._deads.indexOf(sprite);

	if (index > -1) {
		this._needReAdd.push(index);
	}
};

/**
 * Initialize of all members.
 * @method initialize
 */
Atlantis.SpriteGroup.prototype.initialize = function () {
	if (!this._initialized) {
		for (var i = 0, l = this._sprites.length; i < l; i++) {
			this._sprites[i].initialize();
		}
		this._initialized = true;
	}
};

/**
 * Load assets of all members.
 * @method loadContent
 * @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
 */
Atlantis.SpriteGroup.prototype.loadContent = function (contentManager) {
	if (!this._loaded) {
		for (var i = 0, l = this._sprites.length; i < l; i++) {
			this._sprites[i].loadContent(contentManager);
		}
		this._loaded = true;
	}
};

/**
 * Update logic of all members.
 * @method update
 * @param {Atlantis.GameTime} gameTime An instance of GameTime.
 */
Atlantis.SpriteGroup.prototype.update = function (gameTime) {
	if (this.enabled) {
		// Sprites that must be removed.
		if (this._needRemove.length) {
			var index = 0;
			while (this._needRemove.length) {
				index = this._needRemove.length - 1;
				this._deads.push(this._sprites[this._needRemove[index]]);
				this._sprites.splice(this._needRemove[index], 1);
				this._needRemove.splice(index, 1);
			}
		}

		// Sprites that must be readded.
		if (this._needReAdd.length) {
			var index = 0;
			while (this._needReAdd.length) {
				index = this._needReAdd.length - 1;
				this._sprites.push(this._deads[this._needReAdd[index]]);
				this._deads.splice(this._needReAdd[index], 1);
				this._needReAdd.splice(index, 1);
			}
		}

		// Update
		for (var i = 0, l = this._sprites.length; i < l; i++) {
            if (this._sprites[i].enabled) {
		    	this._sprites[i].update(gameTime);
    		    this._sprites[i].postUpdate(gameTime);
            }
    	}
	}
};

/**
 * Draw all members on screen.
 * @method draw
 * @param {Atlantis.SpriteBatch}
 */
Atlantis.SpriteGroup.prototype.draw = function (spriteBatch) {
	if (this.visible) {
		for (var i = 0, l = this._sprites.length; i < l; i++) {
            if (this._sprites[i].visible) {
    		     this._sprites[i].draw(spriteBatch);
            }
    	}
	}
};


Atlantis.SpriteGroup.prototype.forEach = function (callback) {
	for (var i = 0, l = this._sprites.length; i < l; i++) {
		callback(this._sprites[i]);
	}
};

/**
 * Add an sprite to the group.
 * @method add
 * @param {Atlantis.Sprite} sprite The sprite to add.
 */
Atlantis.SpriteGroup.prototype.add = function (sprite) {
	if (sprite instanceof Atlantis.Sprite && this._sprites.indexOf(sprite) === -1) {
		this._sprites.push(sprite);

		sprite.parent = this;

		if (this._initialized) {
			sprite.initialize();
		}

		if (this._loaded) {
			sprite.loadContent(Atlantis.app.content);
		}
	}
};

Atlantis.SpriteGroup.prototype.removeAt = function (index) {
	var result = null;

	if (index > -1) {
		if (this._sprites[index]) {
			result = this._sprites[index];
			this._sprites.splice(index, 1);
		}
		else if (this._deads[index]) {
			result = this._deads[index];
			this._deads.splice(index, 1);
		}
	
		if (result) {
			result.parent = null;
		}
	}

	return result;
};

/**
 * remove an sprite from the group.
 * @method remove
 * @param {Atlantis.Sprite} sprite The sprite to remove.
 */
Atlantis.SpriteGroup.prototype.remove = function (sprite) {
	var result = null;

	var index = this._sprites.indexOf(sprite);
	var indexK = this._deads.indexOf(sprite);

	if (index > -1) {
		result = this._sprites[index];
		result.parent = null;
		this._sprites.splice(index, 1);
	}
	else if (indexK > -1) {
		result = this._deads[index];
		result.parent = null;
		this._deads.splice(index, 1);
	}

	return result;
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
 * Clear the collection.
 * @method clear
 */
Atlantis.SpriteGroup.prototype.clear = function () {
    this._sprites.length = 0;  
    this._deads.length = 0;
    this._needReAdd.length = 0;
    this._needRemove.length = 0;
};