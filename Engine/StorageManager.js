/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A storage manager that work with localStorage
 * @constructor
 * @class StorageManager
 */
Atlantis.StorageManager = function() {
	this.container = "atlantis.game";
};

/**
 * Save data in the localStorage.
 * @method save
 * @param {String} container The localStorage key.
 * @param {String} name Desired name for the data who'll save.
 * @param {Object} or {String} data An object to serialize or a serialized object.
 */
Atlantis.StorageManager.prototype.save = function(name, data) {
	if (typeof(data) === "object") {
		data = JSON.stringify(data);
	}

	localStorage.setItem(this.getLocalStorageKey(name), data);
};

/**
 * Load data from the localStorage.
 * @method load
 * @param {String} name The data key.
 * @param {Object} defaultValue The default value if the data not exists.
 * @return {Object} The object if exists otherwise return defaultValue
 */
Atlantis.StorageManager.prototype.load = function(name, defaultValue) {
	var data = localStorage.getItem(this.getLocalStorageKey(name));
	return data !== null ? data : defaultValue;
};

/**
 * Gets the localStorage key with a container name and a data name.
 * @method getLoadStorageKey
 * @param {String} name Desired name for the data who'll save.
 * @return {string} The localStorage final key.
 */
Atlantis.StorageManager.prototype.getLocalStorageKey = function(name) {
	return [this.container, ".", name].join("");
};