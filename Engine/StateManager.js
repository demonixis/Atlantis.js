/**
 * Atlantis storage manager.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

Atlantis.State = (function() {
    /**
     * Define a base state class that contains a basic scene.
	 * @constructor
	 * @class State
     */
    var state = function(name) {
        this.name = name;
    	this.active = true;
        this.stateManager = null;
        this.initialized = false;
        this.scene = new Atlantis.SpriteGroup(); 
    };
    
    /**
     * Load assets of entities that compose the scene.
     * @method loadContent
     * @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
     */
    state.prototype.loadContent = function (contentManager) {
        this.scene.loadContent(contentManager);
        this.scene.initialize();
        this.initialized = true;
    };

    /**
     * Update logic of scene children.
     * @method update
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     */
    state.prototype.update = function (gameTime) {
        this.scene.update(gameTime);
    };

    /**
     * Draw scene children on screen.
     * @method draw
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     * @param {Object} context The canvas context.
     */
    state.prototype.draw = function (gameTime, context) { 
        this.scene.draw(gameTime, context);
    };

    /**
     * Add an entity to the scene.
     * @method add
     * @param {Atlantis.Entity} entity The entity to add.
     */
    state.prototype.add = function (entity) {
        this.scene.add(entity);
    };

    /**
     * remove an entity from the scene.
     * @method remove
     * @param {Atlantis.Entity} entity The entity to remove.
     */
    state.prototype.remove = function (entity) {
        this.scene.remove(entity);
    };

    /**
     * Gets an entity from the scene.
     * @method get
     * @param {Number} index The index of the entity on the scene.
     */
    state.prototype.get = function (index) {
        return this.scene.get(index);
    };

    return state;
})();

Atlantis.StateManager = (function () {
    /*
     * A state manager.
	 * @constructor
	 * @class StateManager
     */
    var stateManager = function (game) {
        Atlantis.DrawableGameComponent.call(this, game);
        this.states = [];
        this.initialized = false;
    };

    stateManager.prototype = new Atlantis.DrawableGameComponent();

    /**
     * Load assets of entities that compose the scene.
     * @method loadContent
     * @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
     */
    stateManager.prototype.loadContent = function (contentManager) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            this.states[i].loadContent(contentManager);
            this.initialized = true;
        }
    };

    /**
     * Update all active state.
     * @method update
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     */
    stateManager.prototype.update = function (gameTime) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            if (this.states[i].active) {
                this.states[i].update(gameTime);
            }
        }
    };

    /**
     * Draw all active states.
     * @method draw
     * @param {Atlantis.GameTime} gameTime An instance of GameTime.
     * @param {Object} context The canvas context.
     */
    stateManager.prototype.draw = function (gameTime, context) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            if (this.states[i].active) {
                this.states[i].draw(gameTime, context);
            }
        }
    };

    /**
     *
     * @param {Number} stateParam Index of the state.
     * @param {String} stateParam Name of the state.
     * @param {Altantis.State} stateParam Instance of thee state.
     * @param {Boolean} disableOtherStates Sets to true for desactive all other states.
     */
    stateManager.prototype.setStateActive = function (stateParam, disableOtherStates) {

        if (typeof (disableOtherStates) != "undefined" && disableOtherStates == true) {
            this.disableStates();
        }

        if (stateParam instanceof Atlantis.State) {
            var index = this.states.indexOf(stateParam);
            if (index > -1) {
                this.states[index].active = true;
            }
        }
        else if (typeof (stateParam) == "string") {
            var i = 0;
            var index = -1;
            var size = this.states.length;

            while (i < size && index == -1) {
                if (this.states[i].name == stateParam) {
                    this.states[i].active = true;
                    index = i;
                }
                i++;
            }
        }
        else {
            if (stateParam > -1) {
                this.states[stateParam].active = true;
            }
        }
    };

    stateManager.prototype.disableStates = function () {
        for (var i = 0, l = this.states.length; i < l; i++) {
            this.states[i].active = false;
        }
    };

    stateManager.prototype.switchState = function (newState) {
        this.states = [];
        this.states.push(newState);
    };

    // -------------------------- //
    // --- Collection methods --- //
    // -------------------------- //

    /**
     * Add a state to the state manager.
     * @method add
     * @param {Altantis.State} stateParam Instance of the state to add.
     * @param {Boolean} isActive Sets to true for active the state, default is true.
     * @param {Boolean} disableOtherStates Sets to true for desactive all other states.
     */
    stateManager.prototype.add = function (stateParam, isActive, disableOtherStates) {

        if (typeof (disableOtherStates) != "undefined" && disableOtherStates == true) {
            this.disableStates();
        }

        isActive = (typeof(isActive) != "undefined") ? isActive : true;

        if (stateParam instanceof Array) {
            for (var i = 0, l = stateParam.length; i < l; i++) {
                stateParam[i].stateManager = this;
                stateParam[i].active = isActive;

                // If the state manager is already initialized we must load an initialize the state
                if (this.initialized) {
                    stateParam[i].loadContent(this.game.content);
                    stateParam[i].initialize();
                }

                this.states.push(stateParam[i]);
            }
        }
        else {
            stateParam.stateManager = this;
            stateParam.active = isActive;

            // If the state manager is already initialized we must load an initialize the state
            if (this.initialized) {
                stateParam[i].loadContent(this.game.content);
                stateParam[i].initialize();
            }

            this.states.push(stateParam);
        }
    };

    /**
     * Remove a state by its index, name or instance.
     * @method remove
     * @param {Number} stateParam Index of the state to remove.
     * @param {String} stateParam Name of the state to remove.
     * @param {Altantis.State} stateParam Instance of the state to remove.
     */
    stateManager.prototype.remove = function (stateParam) {
        var state = null;

        if (stateParam instanceof Atlantis.state) {
            var index = this.states.indexOf(stateParam);
            if (index > -1) {
                state = this.states[index];
                this.states.splice(index, 1);
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

    /**
     * Gets a state by its index or its name.
     * @method get
     * @param {Number} stateParam Index of the state.
     * @param {String} stateParam Name of the state.
     */
    stateManager.prototype.get = function (stateParam) {
        var state = null;

        if (typeof (stateParam) == "string") {
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

    return stateManager;
})();