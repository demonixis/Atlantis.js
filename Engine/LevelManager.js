/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* A level manager.
* @constructor
* @class LevelManager
*/
Atlantis.LevelManager = function (game) {
    Atlantis.DrawableGameComponent.call(this, game);
    this.graphicsDevice = game.graphicsDevice;
    this.levels = [];
    this.autoClear = true;
    this.activeLevel = null;
    this.spriteBatch = null;
    this.initialized = false;
    this._autoLoadLevel;
};

Atlantis.LevelManager.prototype = new Atlantis.DrawableGameComponent();

Atlantis.LevelManager.prototype.initialize = function () {
    this.spriteBatch = new Atlantis.SpriteBatch(this.game.graphicsDevice);
    this.initialized = true;

    if (typeof(this._autoLoadLevel) !== "undefined") {
        this.loadLevel(this._autoLoadLevel);
        this._autoLoadLevel = "";
    }
};

/**
* Update active level.
* @method update
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.LevelManager.prototype.update = function (gameTime) {
    if (this.activeLevel) {
        this.activeLevel.update(gameTime);
    }
};

/**
* Draw active levels.
* @method draw
* @param {Atlantis.GameTime} gameTime An instance of GameTime.
*/
Atlantis.LevelManager.prototype.draw = function (gameTime) {
    if (this.activeLevel) {
        if (this.autoClear) {
            this.graphicsDevice.clear();
        }

        this.activeLevel.draw(gameTime);
    }
};

/**
* Add a level to the level manager.
* @method loadLevel
* @param {Altantis.level} levelParam Instance of the level to add.
*/
Atlantis.LevelManager.prototype.loadLevel = function (nameOrIndex) {
    if (!this.initialized) {
        this._autoLoadLevel = nameOrIndex;
        return;
    }

    this.activeLevel = null;

    if (typeof (nameOrIndex) === "string") {
        this.activeLevel = this.getLevelByName(nameOrIndex);
    }
    else if (this._checkIndex(nameOrIndex)) {
        this.activeLevel = this.levels[nameOrIndex];
    }

    if (this.activeLevel) {
        this.activeLevel.initialize();
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
        level = this.getLevelByName(nameOrIndex);
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
* @return {Atlantis.Level} Return the level if it exists, otherwise return null.
*/
Atlantis.LevelManager.prototype.get = function (nameOrIndex) {
    if (typeof(nameOrIndex) === "string") {
        return this.getLevelByName(nameOrIndex);
    }
    else if (this._checkIndex(nameOrIndex)) {
        return this.levels[nameOrIndex];
    }
	
	return null;
};

/**
 * Get a level by its name
 * @method getLevelByName
 * @param {String} name The name of the level to load.
 * @return {Atlantis.Level} Return the level if it exists, otherwise return null.
 */
Atlantis.LevelManager.prototype.getLevelByName = function (name) {
    var i = 0,
        size = this.levels.length,
        level = null;

    while (i < size && level === null) {
        level = (this.levels[i].name === name) ? this.levels[i] : level;
        i++;
    }

    return level;
};

Atlantis.LevelManager.prototype._checkIndex = function (index) {
    return index > -1 && index < this.levels.length;
};