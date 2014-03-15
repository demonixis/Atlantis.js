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
Atlantis.StorageManager = function () {};

/**
 * Save data in the localStorage.
 * @method save
 * @param {String} container The localStorage key.
 * @param {String} name Desired name for the data who'll save.
 * @param {Object} or {String} data An object to serialize or a serialized object.
 */
Atlantis.StorageManager.prototype.save = function (container, name, data) {
    if (typeof(data) == "object") {
        data = JSON.stringify(data);
    }

    localStorage.setItem(this.getLocalStorageKey(name, container), data)
};

/**
 * Load data from the localStorage.
 * @method load
 * @param {String} container The localStorage key.
 * @param {String} name Desired name for the data who'll save.
 * @param {Object} or {String} data An object to serialize or a serialized object.
 * @param {Boolean} deserializedObject Sets to true (default) for deserialize, false to gets the strings stored in localStorage.
 * @return {Object} The object
 */
Atlantis.StorageManager.prototype.load = function (container, name, deserializeObject) {
    var data = localStorage.getItem(this.getLocalStorageKey(name, container));
    return (data && deserializeObject) ? JSON.parse(data) : data;
};

/**
 * Gets the localStorage key with a container name and a data name.
 * @method getLoadStorageKey
 * @param {String} container The localStorage key.
 * @param {String} name Desired name for the data who'll save.
 * @return {string} The localStorage final key.
 */
Atlantis.StorageManager.prototype.getLocalStorageKey = function (name, container) {
    return [container, ".", name].join("");
};