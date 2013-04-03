/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

 var Atlantis = window.Atlantis || {};

/**
 * @class Helpers
 */
(function() {
    // Registered events
    var events = [];

    /**
     * Ajax method for POST and GET calls.
     * @method ajax
     */
    Atlantis.ajax = function(parameters) {
        var params = parameters.params || {};
        var url = parameters.url;
        var method = parameters.method || "GET";
        var callback = parameters.success || null;
        var async = typeof(parameters.async) != "undefined" ? parameters.async : true; 
    
        var xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
        if (method == "POST") {
            xhr.open("POST", url, async);
    
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-length", params.length);
            xhr.setRequestHeader("Connection", "close");
      
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(params);
        }
        else {
            var finalUrl = params != "" ? url + "?" + params : url;
            xhr.open("GET", finalUrl, async);

            xhr.onreadystatechange = function() { 
                if(xhr.readyState == 4) {
                    if (callback != null) {
                        callback(xhr.responseText);
                    }
                }    
            };

            xhr.send(null);
        }
    };

    /**
     * An event notifier. If the event doesn't exists it created and stored.
     * @method notify
     * @param {String} name The name of the event to emit.
     * @param {Object} params An object to emit with the event.
     */
    Atlantis.notify = function (name, params) {
        if (typeof(events[name]) != "undefined") {
      
            var event = events[name];

            if (params instanceof Object) {
                for(var i in params) {
                    event[i] = params[i];
                }
            }

            document.dispatchEvent(event);
        }
        else {
            events[name] = document.createEvent("HTMLEvents");
            events[name].initEvent(name, true, false);

            return Atlantis.notify(name, params);
        }
    };

    /**
     * Gets the size of an image. This function add the image to the DOM an remove from it.
     * After that we can gets the size of the image.
     * @method getImageSize
     * @param {Image} image An instance of Image.
     */
    Atlantis.getImageSize = function (image) {
        image.style.position = "absolute";
        image.style.left = "-9999px";

        document.body.appendChild(image);
        document.body.removeChild(image);

        image.style.position = "";
        image.style.left = "";
    }
})();