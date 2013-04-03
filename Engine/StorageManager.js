 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.StorageManager = (function () {
	/**
	 * A storage manager that work with localStorage
	 * @constructor
	 * @class StorageManager
	 */
    var storageManager = function () {
        
    };

    /**
     * Save data in the localStorage.
     * @method save
     * @param {String} container The localStorage key.
     * @param {String} name Desired name for the data who'll save.
     * @param {Object} or {String} data An object to serialize or a serialized object.
     */
    storageManager.prototype.save = function (container, name, data) {
        if (typeof(data) == "object") {
            data = JSON.stringify(data);
        }

        localStorage.setItem(getLocalStorageKey(name, container), data)
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
    storageManager.prototype.load = function (container, name, deserializeObject) {
        var data = localStorage.getItem(getLocalStorageKey(name, container));

        if (data != null && deserializeObject) {
            return JSON.parse(data);
        }
        else {
            return data;
        }
    };

    /**
     * Gets the localStorage key with a container name and a data name.
     * @method getLoadStorageKey
     * @param {String} container The localStorage key.
     * @param {String} name Desired name for the data who'll save.
     * @return {string} The localStorage final key.
     */
    function getLocalStorageKey (name, container) {
        var container = container || "Atlantis.Engine";
        var localStorageKey = container + "." + name;
        return localStorageKey;
    };

    return storageManager;
})();