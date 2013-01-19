var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.KeyboardState = function () {
        this.keys = {
            up: false, down: false, left: false, right: false, space: false, escape: false  
        };
    };

    Atlantis.KeyboardState.prototype.initialize = function () {
    	var that = this;
    	this.addEventListener("keydown", function (event) { that.onKeyStateChange(event, that); }, false);
    	this.addEventListener("keyup", function (event) { that.onKeyStateChange(event, that); }, false);
    };

    Atlantis.KeyboardState.prototype.onKeyStateChange = function (event, instance) {
    	if (event.type == "keydown") {
            console.log(event.keyCode)
    	}
    	else if (event.type == "keyup") {

    	}
    };
})()