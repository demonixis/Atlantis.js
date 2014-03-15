 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/** 
 * A collection that initialize, load, update and draw entities.
 * @class SpriteGroup
 * @constructor
 * @extends Atlantis.Sprite
 */
Atlantis.SpriteGroup = function () {
    Atlantis.Sprite.call(this);
	this.entities = [];	
};

Atlantis.SpriteGroup.prototype = Object.create(Atlantis.Sprite.prototype);

/**
 * Initialize of all members.
 * @method initialize
 */
Atlantis.SpriteGroup.prototype.initialize = function () {
	for (var i = 0, l = this.entities.length; i < l; i++) {
		this.entities[i].initialize();
	}
};

/**
 * Load assets of all members.
 * @method loadContent
 * @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
 */
Atlantis.SpriteGroup.prototype.loadContent = function (contentManager) {
	for (var i = 0, l = this.entities.length; i < l; i++) {
		this.entities[i].loadContent(contentManager);
	}
};

/**
 * Update logic of all members.
 * @method update
 * @param {Atlantis.GameTime} gameTime An instance of GameTime.
 */
Atlantis.SpriteGroup.prototype.update = function (gameTime) {
	if (this.enabled) {
		for (var i = 0, l = this.entities.length; i < l; i++) {
            if (this.entities[i].enabled) {
    		     this.entities[i].update(gameTime);
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
		for (var i = 0, l = this.entities.length; i < l; i++) {
            if (this.entities[i].visible) {
    		     this.entities[i].draw(spriteBatch);
            }
    	}
	}
};

/**
 * Add an entity to the group.
 * @method add
 * @param {Atlantis.Entity} entity The entity to add.
 */
Atlantis.SpriteGroup.prototype.add = function (entity) {
	if (entity instanceof Array) {
		for (var i = 0, l = entity.length; i < l; i++) {
			this.entities.push(entity[i]);
		}
	}
	else {
		this.entities.push(entity);
	}
};

/**
 * remove an entity from the group.
 * @method remove
 * @param {Atlantis.Entity} entity The entity to remove.
 */
Atlantis.SpriteGroup.prototype.remove = function (entityOrIndex) {
	var entity = null;

	if (entityOrIndex instanceof Atlantis.Entity) {
		var index = this.entities.indexOf(entityOrIndex);
		if (index > -1) {
			entity = this.entities[index];
			this.entities.splice(index, 1);
		}
	}
	else {
		if (entityOrIndex > -1) {
			entity = this.entities[index];
			this.entities.splice(index, 1);
		}
	}

	return entity;
};

/**
 * Gets an entity from the group.
 * @method get
 * @param {Number} index The index of the entity on the group.
 */
Atlantis.SpriteGroup.prototype.get = function (index) {
	var entity = null;

	if (index > -1) {
		entity = this.entities[index];
	}

	return entity;
};

Atlantis.SpriteGroup.prototype.clear = function () {
    this.entities.length = 0;  
};