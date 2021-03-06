/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.events = {
    ContentPreloading: "atlantis.preloading",
    ResolutionChanged: "atlantis.graphics.resize"
};

/**
 * Ajax method for POST and GET calls.
 * @method ajax
 * @exemple Atlantis.ajax({ url: http://foo.php, data: "level_id=2&layer=3", method: "GET", async: false, success: myCallback });
 */
Atlantis.ajax = function(parameters) {
    var params = parameters || {};
    var url = parameters.url;
    var callback = parameters.success || function() {};
    var xhr = new XMLHttpRequest();

    if (params.method === "POST") {
        xhr.open("POST", url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send(params.data);
    } else {
        var gUrl = params.data ? ([url, "?", params.data].join("")) : url;

        xhr.open("GET", gUrl);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        };
        xhr.send(null);
    }
};

/**
 * An event notifier.
 * @method notify
 * @param {String} name The name of the event to send.
 * @param {Object} params An object to send for registered handlers.
 */
Atlantis.notify = function(name, params) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(name, true, false);

    if (params instanceof Object) {
        for (var i in params) {
            event[i] = params[i];
        }
    }

    document.dispatchEvent(event);
};

/**
 * Determine whether the current device is a mobile or not by using the userAgent string (They said that's bad)
 * @method isMobileDevice
 * @return {Boolean} Returns `true` for a mobile device otherwise it returns `false`.  
 */
Atlantis.isMobileDevice = function() {
    return navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
};

/**
 * Create a property
 * @method _createProperty
 * @private
 */
Atlantis._createProperty = function(object, property, fn0, fn1) {
    Object.defineProperty(object, property, {
        get: fn0,
        set: fn1,
        enumerable: true,
        configurable: true
    });
};