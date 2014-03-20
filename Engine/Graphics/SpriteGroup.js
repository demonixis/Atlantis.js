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
	this._killed = [];

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
 * Gets the first killed sprite if available.
 * @method getFirstKilled
 * @return {Atlantis.Sprite} Return the first killed sprite otherwise return null.
 */
Atlantis.SpriteGroup.prototype.getFirstKilled = function () {
	if (this._killed.length) {
		return this._killed[this._killed.length - 1];
	}
	return null;
};

Atlantis.SpriteGroup.prototype._kill = function (sprite) {
	var index = this._sprites.indexOf(sprite);

	if (index > -1) {
		this._needRemove.push(index);
	}
};

Atlantis.SpriteGroup.prototype._revive = function (sprite) { 
	var index = this._killed.indexOf(sprite);

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
				this._killed.push(this._sprites[this._needRemove[index]]);
				this._sprites.splice(this._needRemove[index], 1);
				this._needRemove.splice(index, 1);
			}
		}

		// Sprites that must be readded.
		if (this._needReAdd.length) {
			var index = 0;
			while (this._needReAdd.length) {
				index = this._needReAdd.length - 1;
				this._sprites.push(this._killed[this._needReAdd[index]]);
				this._killed.splice(this._needReAdd[index], 1);
				this._needReAdd.splice(index, 1);
			}
		}

		// Update
		for (var i = 0, l = this._sprites.length; i < l; i++) {
            if (this._sprites[i].enabled) {
    		     this._sprites[i].update(gameTime);
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

/**
 * remove an sprite from the group.
 * @method remove
 * @param {Atlantis.Sprite} sprite The sprite to remove.
 */
Atlantis.SpriteGroup.prototype.remove = function (spriteOrIndex) {
	var sprite = null;

	if (spriteOrIndex instanceof Atlantis.Sprite) {
		var index = this._sprites.indexOf(spriteOrIndex);
		var indexK = this._killed.indexOf(spriteOrIndex);

		if (index > -1) {
			sprite = this._sprites[index];
			sprite.parent = null;
			this._sprites.splice(index, 1);
		}
		else if (indexK > -1) {
			sprite = this._killed[index];
			sprite.parent = null;
			this._killed.splice(index, 1);
		}
	}
	else {
		if (spriteOrIndex > -1) {
			if (this._sprites[index]) {
				sprite = this._sprites[index];
				sprite.parent = null;
				this._sprites.splice(index, 1);
			}
			else if (this._killed[index]) {
				sprite = this._killed[index];
				sprite.parent = null;
				this._killed.splice(index, 1);
			}
		}
	}

	return sprite;
};

/**
 * Gets an sprite from the group.
 * @method get
 * @param {Number} index The index of the sprite on the group.
 */
Atlantis.SpriteGroup.prototype.get = function (index) {
	var sprite = null;

	if (index > -1) {
		sprite = this._sprites[index];
	}

	return sprite;
};

Atlantis.SpriteGroup.prototype.clear = function () {
    this._sprites.length = 0;  
    this._killed.length = 0;
    this._needReAdd.length = 0;
    this._needRemove.length = 0;
};