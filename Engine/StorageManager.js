var Atlantis = window.Atlantis || {};

Atlantis.StorageManager = (function () {
    var storageManager = function () {
        
    };

    storageManager.prototype.save = function (name, data, container) {
        localStorage.setItem(getLocalStorageKey(name, container), data)
    };

    storageManager.prototype.load = function (name, container, deserializeObject) {
        var data = localStorage.getItem(getLocalStorageKey(name, container));

        if (data != null && deserializeObject) {
            return JSON.parse(data);
        }
        else {
            return data;
        }
    };

    function getLocalStorageKey (name, container) {
        var container = container || "Atlantis.Engine";
        var localStorageKey = container + "." + name;
        return localStorageKey;
    };

    return storageManager;
})();