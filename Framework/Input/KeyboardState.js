var Atlantis = window.Atlantis || {};
var Keys = window.Keys || {};

(function() {
    Keys = {
      up: 38, down: 40, left: 37, right: 39, space: 32, escape: 27  
    };   

    Atlantis.KeyboardState = function () {
        this.keys = [];
       
        for (var i = 0; i < 110; i++) {
            this.keys[i] = false;
        }
    };

    Atlantis.KeyboardState.prototype.initialize = function () {
        resetKeyState(this.keys);

    	var that = this; 
    	document.addEventListener("keydown", function (event) { that.onKeyStateChange(event, that); }, false);
    	document.addEventListener("keyup", function (event) { that.onKeyStateChange(event, that); }, false);
    };

    Atlantis.KeyboardState.prototype.onKeyStateChange = function (event, instance) {
    	var pressed = event.type == "keydown" ? true : false;

        instance.keys[event.keyCode] = pressed;
    };

    function resetKeyState(keys) {
        for (var i = 0; i < 110; i++) {
            keys[i] = false;
        }
    }
})()