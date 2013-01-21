var Atlantis = window.Atlantis || {};
Atlantis.Engine = Atlantis.Engine || {};

(function() {
    // Define a base state
    Atlantis.State = function(name) {
    	this.active = true;
        this.initialize = function () { };
        this.loadContent = function (contentManager) { };
        this.update = function (gameTime) { };
        this.draw = function (gameTime, context) { };
    };

    // The state manager
    Atlantis.StateManager = function (game) {
        Atlantis.DrawableGameComponent.call(this);
        this.states = [];
    };

    Atlantis.StateManager.prototype = new Atlantis.DrawableGameComponent();

    //
    // Game state pattern
    //

    Atlantis.StateManager.prototype.initialize = function () {
    	for (var i = 0, l = this.states.length; i < l; i++) {
    		this.states[i].loadContent(this.game.content);		
    		this.states[i].initialize();
    	}
    };

    Atlantis.StateManager.prototype.update = function (gameTime) {
    	for (var i = 0, l = this.states.length; i < l; i++) {
    		if (this.states[i].active) {
    			this.states[i].update(gameTime);
    		}
    	}
    };

    Atlantis.StateManager.prototype.draw = function (gameTime, context) {
    	for (var i = 0, l = this.states.length; i < l; i++) {
    		if (this.states[i].active) {
    			this.states[i].draw(gameTime, context);
    		}
    	}
    };

    // 
    // StateManager methods
    //

    Atlantis.StateManager.prototype.setStateActive = function (stateParam, disableOtherStates) {

    	if (typeof(disableOtherStates) != "undefined" && disableOtherStates == true) {
    		this.disableStates();
    	}

		if (stateParam instanceof Atlantis.state) {
    		var index = this.states.indexOf(stateParam);
    		if (index > -1) {
    			this.states[index].active = true;
    		}
    	}
    	else {
    		if (stateParam > -1) {
    			this.states[stateParam].active = true;
    		}
    	}
    };

    Atlantis.StateManager.prototype.disableStates = function () {
		for (var i = 0, l = this.states.length; i < l; i++) {
			this.states[i].active = false;
		}
    };

    Atlantis.StateManager.prototype.switchState = function (newState) {
    	this.states = [];
    	this.states.push(newState);
    };

    // 
    // Collection methods
    //

    Atlantis.StateManager.prototype.add = function (stateParam, disableOtherStates) {
    	
    	if (typeof(disableOtherStates) != "undefined" && disableOtherStates == true) {
    		this.disableStates();
    	}

    	if (stateParam instanceof Array) {
    		for (var i = 0, l = stateParam.length; i < l; i++) {
    			this.states.push(stateParam[i]);
    		}
    	}
    	else {
    		this.states.push(stateParam);
    	}
    };

    Atlantis.StateManager.prototype.remove = function (stateParam) {
    	var state = null;

    	if (stateParam instanceof Atlantis.state) {
    		var index = this.states.indexOf(stateParam);
    		if (index > -1) {
    			state = this.states[index];
    			this.states.splice(index, 1);
    		}
    	}
    	else {
    		if (stateParam > -1) {
    			state = this.states[stateParam];
    			this.states.splice(index, 1);
    		}
    	}

    	return state;
    };

    Atlantis.StateManager.prototype.get = function (stateParam) {
    	var state = null;

    	if (stateParam instanceof Atlantis.State) {
    		var index = this.states.indexOf(stateParam);
    		if (index > -1) {
    			state = this.states[index];
    		}
    	}
    	else if (typeof (stateParam) == "string") {
    		var i = 0;
    		var index = -1;

    		while (i < size && index == -1) {
    			if (this.states[i].name == stateParam) {
    				index = i;
    			}
    			i++;
    		}

    		if (index > -1) {
    			state = this.states[index];
    		}
    	}
    	else {
    		if (state > -1) {
    			state = this.states[stateParam];
    		}
    	}

    	return state;
    };
})();