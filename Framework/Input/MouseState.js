var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.MouseState = function (domElement) {	
    	this.x = 0;
	    this.y = 0; 
	    this.last =  { x: 0, y: 0 };
	    this.delta = { x: 0, y: 0 };
	    this.click = false;
	    this.release = true;
	    this.drag = false;
	    this.domElement = document;
	    this.initialized = false;
    };

    Atlantis.MouseState.prototype.initialize = function(domElement) {
	    if (!this.initialized) {
	        // Mouse events
	        this.domElement.addEventListener("mousedown", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("mousemove", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("mouseup", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("click", function (e) { that.update(e, that); }, false);

	        // Touch events
	        this.domElement.addEventListener("touchstart", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("touchmove", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("touchend", function (e) { that.update(e, that); }, false);
	        this.domElement.addEventListener("touchcancer", function (e) { that.update(e, that); }, false);

	        this.initialized = true;
	    }
    };

    Atlantis.MouseState.prototype.update = function (event, instance) {
	    event.preventDefault();
	    updatePositions(event, instance);
	    updateClickStates(event, instance);
	    updateDelta(instance);
    };

    function updatePositions (event, instance) {
	    var evt;
	    
	    if (typeof(event.touches) != "undefined" && event.touches.length > 0) {
		    evt = event.touches[0];
	    }
	    else {
		    evt = event;
	    }
	    
	    instance.last.x = this.x;
	    instance.last.y = this.y;
	    instance.x = evt.pageX;
	    instance.y = evt.pageY;
    }

    function updateClickStates (event, instance) {	
	    if (event.type == "mousedown" || event.type == "touchstart") {
		    instance.click = true;
		    instance.release = false;
	    }
	    else if (event.type == "mousemove" || event.type == "touchmove") {
		    if (instance.click) {
			    instance.drag = true;
		    }
		    else {
			    instance.drag = false;
		    }
	    }
	    else if (event.type == "mouseup" || event.type == "touchend") {
		    instance.click = false;
		    instance.release = true;
		    instance.drag = false;
	    }
	    else if (event.type == "click") {
		    instance.click = false;
		    instance.release = true;
		    instance.drag = false;
	    }
    }

    function updateDelta (instance) {
	    instance.delta.x = (instance.x - instance.last.x);
	    instance.delta.y = (instance.y - instance.last.y);
    }
})();