var Atlantis = window.Atlantis || {};

(function () {
    Atlantis.SpriteGroup = function (size) {
    	Atlantis.Entity.call(this);
    	this.entities = [];	
    };

    Atlantis.SpriteGroup.prototype = new Atlantis.Entity();

    Atlantis.SpriteGroup.prototype.initialize = function () {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].initialize();
    	}
    };

    Atlantis.SpriteGroup.prototype.loadContent = function (content) {
    	for (var i = 0, l = this.entities.length; i < l; i++) {
    		this.entities[i].loadContent(content);
    	}
    };

    Atlantis.SpriteGroup.prototype.update = function (gameTime) {
    	if (this.enabled) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].update(gameTime);
	    	}
    	}
    };

    Atlantis.SpriteGroup.prototype.draw = function (gameTime, context) {
    	if (this.visible) {
    		for (var i = 0, l = this.entities.length; i < l; i++) {
	    		this.entities[i].draw(gameTime, context);
	    	}
    	}
    };

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

    Atlantis.SpriteGroup.prototype.get = function (entityOrIndex) {
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
})();