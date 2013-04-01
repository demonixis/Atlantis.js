var Atlantis = window.Atlantis || {};

Atlantis.SpriteGroup = (function () {
    var spriteGroup = function (size) {
    	Atlantis.Entity.call(this);
    	this.entities = [];	
    };

    spriteGroup.prototype = new Atlantis.Entity();

    spriteGroup.prototype.initialize = function () {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].initialize();
    	}
    };

    spriteGroup.prototype.loadContent = function (content) {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].loadContent(content);
    	}
    };

    spriteGroup.prototype.update = function (gameTime) {
    	if (this.enabled) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].update(gameTime);
	    	}
    	}
    };

    spriteGroup.prototype.draw = function (gameTime, context) {
    	if (this.visible) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].draw(gameTime, context);
	    	}
    	}
    };

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

    spriteGroup.prototype.get = function (entityOrIndex) {
    	var entity = null;

    	if (entityOrIndex instanceof Atlantis.Entity) {
    		var index = this.entities.indexOf(entityOrIndex);
    		if (index > -1) {
    			entity = this.entities[index];
    		}
    	}
    	else {
    		if (entityOrIndex > -1) {
    			entity = this.entities[index];
    		}
    	}

    	return entity;
    };

    return spriteGroup;
})();