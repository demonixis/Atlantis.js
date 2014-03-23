/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Level = function (name) {
    this._initialized = false;
    this.scene = new Atlantis.Scene2D();
    this.enabled = false;
    this.visible = false;

    var that = this;

    Atlantis._createProperty(this, "active", 
        function () { return that.visible && that.enabled; },
        function (value) { 
            that.enabled = value;
            that.visible = value;
        });
};

Atlantis.Level.Counter = 0;

Atlantis.Level.prototype.awake = function () {
    if (!this._initialized) {
        this.scene.initialize();
        this.scene.loadContent(Atlantis.app.content);
    }
    this.scene.clear();
};

Atlantis.level.prototype.create = function () {};

Atlantis.level.prototype.update = function (gameTime) {
    this.scene.preUpdate(gameTime);
    this.scene.update(gameTime);
    this.scene.postUpdate(gameTime);
};

Atlantis.level.prototype.draw = function (gameTime, spriteBatch) {
    spriteBatch.begin();
    this.scene.draw(spriteBatch);
    spriteBatch.end();
};

/**
* A level manager.
* @constructor
* @class LevelManager
*/
Atlantis.LevelManager = function (game) {
    Atlantis.DrawableGameComponent.call(this, game);
    this.graphicsDevice = game.graphicsDevice;
    this.levels = [];
    this.activeLevel = null;
    this.spriteBatch = null;
};

Atlantis.LevelManager.prototype = new Atlantis.DrawableGameComponent();

Atlantis.LevelManager.prototype.initialize = function () {
    this.spriteBatch = new Atlantis.SpriteBatch(this.game.graphicsDevice);
}

/**
* Update active level.
* @method update
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.LevelManager.prototype.update = function (gameTime) {
    if (this.activeLevel !== null && this.activeLevel.enabled) {
        this.activeLevel.update(gameTime);
    }
};

/**
* Draw active levels.
* @method draw
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.LevelManager.prototype.draw = function (gameTime) {
    if (this.activeLevel !== null && this.activeLevel.visible) {
        if (this.activeLevel.autoClear) {
            this.graphicsDevice.clear();
        }

        this.activeLevel.draw(gameTime, this.spriteBatch);
    }
};

/**
* Add a level to the level manager.
* @method loadLevel
* @param {Altantis.level} levelParam Instance of the level to add.
*/
Atlantis.LevelManager.prototype.loadLevel = function (nameOrIndex) {
    this.activeLevel = null;

    if (typeof (nameOrIndex) === "string") {
        this.activeLevel = this.getByName(nameOrIndex);
    }
    else if (typeof(nameOrIndex) === "object") {
        if (this.levels.indexOf(nameOrIndex) === -1) {
            this.add(nameOrIndex);
        }
        this.activeLevel = nameOrIndex;
    }
    else if (this._checkIndex(nameOrIndex)) {
        this.activeLevel = this.levels[nameOrIndex];
    }

    if (this.activeLevel) {
        this.activeLevel.awake();
        this.activeLevel.create();
        this.activeLevel.active = true;
    }
};

// -------------------------- //
// --- Collection methods --- //
// -------------------------- //

/**
* Add a level to the level manager.
* @method add
* @param {Altantis.level} name Instance of the level to add.
*/
Atlantis.LevelManager.prototype.add = function (level) {
    this.levels.push(level);
};

/**
* Remove a level by its index, name or instance.
* @method remove
* @param {Number|String} nameOrIndex level's index or name.
*/
Atlantis.LevelManager.prototype.remove = function (nameOrIndex) {
    var level = null,
        index = -1;

    if (typeof(nameOrIndex) === "string") {
        level = this.getByName(nameOrIndex);
        index = this.levels.indexOf(level);
    }
    else if (this._checkIndex(nameOrIndex)) {
        level = this.levels[nameOrIndex];
        index = nameOrIndex;
    }

    if (level === this.activeLevel) {
        this.activeLevel = null;
    } 

    if (this._checkIndex(index)) {
        this.levels.splice(index, 1);
    }
};

/**
* Gets a level by its index or its name.
* @method get
* @param {Number|String} nameOrIndex level's index or name.
*/
Atlantis.LevelManager.prototype.get = function (nameOrIndex) {
    if (typeof(nameOrIndex) === "string") {
        return this.getByName(nameOrIndex);
    }
    else if (this._checkIndex(nameOrIndex)) {
        return this.levels[nameOrIndex];
    }
};

Atlantis.LevelManager.prototype._checkIndex = function (index) {
    return index > -1 && index < this.levels.length;
};

Atlantis.LevelManager.prototype.getByName = function (name) {
    var i = 0,
        size = this.levels.length,
        index = -1;

    while (i < size && level === null) {
        level = (this.levels[i].name === nameOrIndex) ? i : level;
        i++;
    }

    return level;
};