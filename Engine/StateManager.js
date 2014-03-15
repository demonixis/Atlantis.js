/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* Define a base state class that contains a basic scene.
* @constructor
* @class State
*/
Atlantis.State = function (name) {
    this.name = name;
    this.active = true;
    this.stateManager = null;
    this.initialized = false;
    this.assetLoaded = false;
    this.enabled = true;
    this.visible = true;
    this.scene = new Atlantis.SpriteGroup();
};

/**
* Determine the activity of the state.
* @method isActive
* @return {Boolean} Return true if the state is visible and enabled.
*/
Atlantis.State.prototype.isActive = function () {
    return this.visible && this.enabled;
};

/**
* Determine the activity of the state.
* @method isEnabled
* @return {Boolean} Return true if the state is enabled.
*/
Atlantis.State.prototype.isEnabled = function () {
    return this.enabled;
};

/**
* Determine the activity of the state.
* @method isVisible
* @return {Boolean} Return true if the state is visible.
*/
Atlantis.State.prototype.isVisible = function () {
    return this.visible;
};

/**
* Sets the activity of the state.
* @method setActive
* @param {Boolean} Sets to true to active the state.
*/
Atlantis.State.prototype.setActive = function (isActive) {
    this.enabled = isActive;
    this.visible = isActive;
};

/**
* Initialize logic.
* @method initialize
*/
Atlantis.State.prototype.initialize = function () {
    this.scene.initialize();
    this.initialized = true;
};

/**
* Load assets of entities that compose the scene.
* @method loadContent
* @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
*/
Atlantis.State.prototype.loadContent = function (contentManager) {
    this.scene.loadContent(contentManager);
    this.assetLoaded = true;
};

/**
* Update logic of scene children.
* @method update
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.State.prototype.update = function (gameTime) {
    this.scene.update(gameTime);
};

/**
* Draw scene children on screen.
* @method draw
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
* @param {Object} context The canvas context.
*/
Atlantis.State.prototype.draw = function (spriteBatch) {
    this.scene.draw(spriteBatch);
};

/**
* Add an entity to the scene.
* @method add
* @param {Atlantis.Entity} entity The entity to add.
*/
Atlantis.State.prototype.add = function (entity) {
    this.scene.add(entity);
};

/**
* remove an entity from the scene.
* @method remove
* @param {Atlantis.Entity} entity The entity to remove.
*/
Atlantis.State.prototype.remove = function (entity) {
    this.scene.remove(entity);
};

/**
* Gets an entity from the scene.
* @method get
* @param {Number} index The index of the entity on the scene.
*/
Atlantis.State.prototype.get = function (index) {
    return this.scene.get(index);
};


/**
* A state manager.
* @constructor
* @class StateManager
*/
Atlantis.StateManager = function (game) {
    Atlantis.DrawableGameComponent.call(this, game);
    this.states = [];
    this.initialized = false;
    this.assetLoaded = false;
    this.spriteBatch = null;
};

Atlantis.StateManager.prototype = new Atlantis.DrawableGameComponent();

/**
* Initialize all levels 
* @method initialize.
*
*/
Atlantis.StateManager.prototype.initialize = function () {
    this.spriteBatch = new Atlantis.SpriteBatch(this.game.graphicsDevice);

    for (var i = 0, l = this.states.length; i < l; i++) {
        this.states[i].initialize();
    }
    this.initialized = true;
};

/**
* Load assets of entities that compose the scene.
* @method loadContent
* @param {Atlantis.ContentManager} contentManager An instance of ContentManager.
*/
Atlantis.StateManager.prototype.loadContent = function () {
    for (var i = 0, l = this.states.length; i < l; i++) {
        this.states[i].loadContent(this.game.content);
    }
    this.assetLoaded = true;
};

/**
* Update all active state.
* @method update
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.StateManager.prototype.update = function (gameTime) {
    for (var i = 0, l = this.states.length; i < l; i++) {
        if (this.states[i].isEnabled()) {
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
Atlantis.StateManager.prototype.draw = function (gameTime, context) {
    this.spriteBatch.begin();

    for (var i = 0, l = this.states.length; i < l; i++) {
        if (this.states[i].isVisible()) {
            this.states[i].draw(this.spriteBatch);
        }
    }

    this.spriteBatch.end();
};

/**
* Active a state by its name or index.
* @method setActive
* @param {Number} stateParam Index of the state.
* @param {String} stateParam Name of the state.
* @param {Altantis.State} stateParam Instance of thee state.
* @param {Boolean} disableOtherStates Sets to true for desactive all other states.
*/
Atlantis.StateManager.prototype.setActive = function (stateParam, disableOtherStates) {
    if (disableOtherStates) {
        this.disableStates();
    }

    if (stateParam instanceof Atlantis.State) {
        var index = this.states.indexOf(stateParam);
        if (index > -1) {
            this.states[index].setActive(true);
        }
    }
    else if (typeof (stateParam) == "string") {
        var i = 0;
        var index = -1;
        var size = this.states.length;

        while (i < size && index == -1) {
            if (this.states[i].name == stateParam) {
                this.states[i].setActive(true);
                index = i;
            }
            i++;
        }
    }
    else if (stateParam > -1 && stateParam < this.states.length) {
        this.states[stateParam].active = true;
    }
};

Atlantis.StateManager.prototype.loadLevel = function (nameOrIndex) {
    var size = this.states.length;
    var index = size - 1;

    this.disableStates();

    if (typeof (nameOrIndex) == "string") {
        for (var i = 0; i < size; i++) {
            if (this.states[i].name == nameOrIndex) {
                index = i;
                break;
            }
        }
    }
    else if (typeof(nameOrIndex) === "number") {
        index = nameOrIndex < size ? nameOrIndex : index;
    }

    if (index > -1) {
        this.states[index].active = true;
    }
};

/**
* Disable all states
* @method disableStates
*/
Atlantis.StateManager.prototype.disableStates = function () {
    for (var i = 0, l = this.states.length; i < l; i++) {
        this.states[i].setActive(false);
    }
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
Atlantis.StateManager.prototype.add = function (state, isActive, disableOtherStates) {
    if (disableOtherStates) {
        this.disableStates();
    }

    var isActive = (typeof (isActive) != "undefined") ? isActive : true;
    state.stateManager = this;
    state.setActive(isActive);

    // If the state manager is already initialized we must load an initialize the state
    if (this.initialized) {
        state[i].initialize();
        state[i].loadContent(this.game.content);
    }

    this.states.push(state);
};

/**
* Remove a state by its index, name or instance.
* @method remove
* @param {Number} stateParam Index of the state to remove.
* @param {String} stateParam Name of the state to remove.
* @param {Altantis.State} stateParam Instance of the state to remove.
*/
Atlantis.StateManager.prototype.remove = function (stateParam) {
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
            this.states.splice(index, 1);
        }
    }
    else if (stateParam > -1) {
        state = this.states[stateParam];
        this.states.splice(index, 1);
    }

    return state;
};

/**
* Gets a state by its index or its name.
* @method get
* @param {Number} stateParam Index of the state.
* @param {String} stateParam Name of the state.
*/
Atlantis.StateManager.prototype.get = function (stateParam) {
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