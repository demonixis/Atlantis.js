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
    this.enabled = true;
    this.visible = true;
    this._initialized = false;
    this._loaded = false;
	this._sprites = [];	
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

/**
 * Add an sprite to the group.
 * @method add
 * @param {Atlantis.Sprite} sprite The sprite to add.
 */
Atlantis.SpriteGroup.prototype.add = function (sprite) {
	if (sprite instanceof Atlantis.Sprite && this._sprites.indexof(sprite) === -1) {
		this._sprites.push(sprite);
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
		if (index > -1) {
			sprite = this._sprites[index];
			this._sprites.splice(index, 1);
		}
	}
	else {
		if (spriteOrIndex > -1) {
			sprite = this._sprites[index];
			this._sprites.splice(index, 1);
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
};