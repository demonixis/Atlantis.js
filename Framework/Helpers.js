var Atlantis = window.Atlantis || {};

(function() {
    // Registered events
    var events = [];

    Atlantis.ajax = function(params) {
        var url = parameters.url;
        var method = parameters.method || "GET";
        var params = parameters.params || "";
        var callback = parameters.success || null;
    
        var xhr = new XMLHttpRequest();
    
        if (method == "POST") {
            xhr.open("POST", url, true);
    
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
            xhr.open("GET", finalUrl, true);

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

            return ujs.notify(name, params);
        }
    };
})();