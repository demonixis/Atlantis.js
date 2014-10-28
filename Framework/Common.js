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
    var callback = parameters.success || function () {};
    var xhr;
    
    if (typeof(WinJS) !== "undefined") {
        WinJS.xhr({ url: url }).then(callback);
    }
    else {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (params.method === "POST") {
            xhr.open("POST", url, params.async);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(params.data);
        }
        else {
            var gUrl = params.data ? ([url, "?", params.data].join("")) : url;
            
            xhr.open("GET", gUrl, params.async);
            xhr.onreadystatechange = function() { 
                if(xhr.readyState == 4) {
                    callback(xhr.responseText);
                }    
            };
            xhr.send(null);
        }
    }
};

/**
 * An event notifier. If the event doesn't exists it created and stored.
 * @method notify
 * @param {String} name The name of the event to emit.
 * @param {Object} params An object to emit with the event.
 */
Atlantis.notify = function (name, params) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(name, true, false);
    
    if (params instanceof Object) {
        for(var i in params) {
            event[i] = params[i];
        }
    }

    document.dispatchEvent(event);
};

Atlantis.isMobileDevice = function () {
	return navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
};

Atlantis._createProperty = function (object, property, fn0, fn1) {
    Object.defineProperty(object, property, {
        get: fn0,
        set: fn1,
        enumerable: true,
        configurable: true
    });
}