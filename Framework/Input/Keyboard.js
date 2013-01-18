var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.Keyboard = function () {

    };

    Atlantis.keyboard.prototype.initialize = function () {
    	var that = this;
    	this.addEventListener("keydown", function (event) { that.onKeyStateChange(event, that); }, false);
    	this.addEventListener("keyup", function (event) { that.onKeyStateChange(event, that); }, false);
    };

    Atlantis.Keyboard.prototype.onKeyStateChange = function (event, instance) {
    	if (event.type == "keydown") {

    	}
    	else if (event.type == "keyup") {

    	}
    };
})()