 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.SpriteGroup = (function () {
	/** 
	 * A collection that initialize, load, update and draw entities.
	 * @constructor
	 * @class SpriteGroup
	 */
    var spriteGroup = function () {
    	Atlantis.Entity.call(this);
    	this.entities = [];	
    };

    spriteGroup.prototype = new Atlantis.Entity();

    /**
     * Initialize of all members.
     * @method initialize
     */
    spriteGroup.prototype.initialize = function () {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].initialize();
    	}
    };

    /**
     * Load assets of all members.
     * @method loadContent
     * @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
     */
    spriteGroup.prototype.loadContent = function (contentManager) {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].loadContent(contentManager);
    	}
    };

    /**
     * Update logic of all members.
     * @method update
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     */
    spriteGroup.prototype.update = function (gameTime) {
    	if (this.enabled) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].update(gameTime);
	    	}
    	}
    };

    /**
     * Draw all members on screen.
     * @method draw
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     * @param {Object} context The canvas context.
     */
    spriteGroup.prototype.draw = function (gameTime, context) {
    	if (this.visible) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].draw(gameTime, context);
	    	}
    	}
    };

    /**
     * Add an entity to the group.
     * @method add
     * @param {Atlantis.Entity} entity The entity to add.
     */
    spriteGroup.prototype.add = function (entity) {
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
    spriteGroup.prototype.remove = function (entityOrIndex) {
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
    spriteGroup.prototype.get = function (index) {
    	var entity = null;

		if (index > -1) {
			entity = this.entities[index];
		}

    	return entity;
    };

    return spriteGroup;
})();