/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis.Input
 */

var Atlantis = window.Atlantis || {};

Atlantis.PointerManager = function (domElement) {
    this.x = 0;
    this.y = 0;
    this.previousState = { x: 0, y: 0 };
    this.delta = { x: 0, y: 0 };
    this.click = false;
    this.release = true;
    this.drag = false;
    this.hasTouch = !!("ontouchstart" in window) || !!("onmsgesturechange" in window);
    this.touch = false;

    var domElement = domElement || document.body;
    var initialized = false;
    var that = this;

    /**
    * Start event listening on specified DOM element.
    * @method startEventListeners
    */
    this.initialize = function () {
        if (!initialized) {
            // Mouse
            domElement.addEventListener("mousedown", this.updateHandler, false);
            domElement.addEventListener("mousemove", this.updateHandler, false);
            domElement.addEventListener("mouseup", this.updateHandler, false);
            domElement.addEventListener("click", this.updateHandler, false);

            // Touch
            domElement.addEventListener("touchstart", this.updateHandler, false);
            domElement.addEventListener("touchmove", this.updateHandler, false);
            domElement.addEventListener("touchend", this.updateHandler, false);
            domElement.addEventListener("touchcancel", this.updateHandler, false);
            initialized = true;
        }
    };

    /**
    * Stop event listening on specified DOM element.
    *
    * @method startEventListeners
    */
    this.dispose = function () {
        if (initialized) {
            // Mouse
            domElement.removeEventListener("mousedown", this.updateHandler);
            domElement.removeEventListener("mousemove", this.updateHandler);
            domElement.removeEventListener("mouseup", this.updateHandler);
            domElement.removeEventListener("click", this.updateHandler);

            // Touch
            domElement.removeEventListener("touchstart", this.updateHandler);
            domElement.removeEventListener("touchmove", this.updateHandler);
            domElement.removeEventListener("touchend", this.updateHandler);
            domElement.removeEventListener("touchcancel", this.updateHandler);
            initialized = false;
        }
    };

    var getEvent = function (event) {
        var evt = event;

        if (typeof (event.touches) !== "undefined" && event.touches.length > 0) {
            evt = event.touches[0];
        }
        return evt;
    };

    var updatePosition = function (event) {
        var evt = getEvent(event);
        that.previousState.x = that.x;
        that.previousState.y = that.y;
        that.x = evt.pageX;
        that.y = evt.pageY;
    };

    var updateClickStates = function (event) {
        var event = event || {};
        if (event.type == "mousedown" || event.type == "touchstart") {
            that.click = true;
            that.release = false;
            that.touch = (that.hasTouch && event.type == "touchstart") ? true : false;
        }
        else if (event.type == "mousemove" || event.type == "touchmove") {
            if (that.click) {
                that.drag = true;
            }
            else {
                that.drag = false;
            }
        }
        else if (event.type == "mouseup" || event.type == "touchend" || event.type == "touchcancel") {
            that.click = false;
            that.release = true;
            that.drag = false;
            that.touch = false;
        }
        else {
            that.click = false;
            that.release = true;
            that.drag = false;
            that.touch = false;
        }
    };

    var updateHandler = function (event) {
        event.preventDefault();
        that.updatePosition(event);
        that.updateClickStates(event);
        that.updateDelta();
    };

    var updateDelta = function () {
        if (that.x == that.previousState.x) {
            that.delta.x = 0;
        }
        else {
            that.delta.x = (that.x - that.previousState.x);
        }

        if (that.y == that.previousState.y) {
            that.delta.y = 0;
        }
        else {
            that.delta.y = (that.y - that.previousState.y);
        }

        if (that.delta.x > 100) {
            that.delta.x = 0;
        }

        that.delta.x = (that.delta.x > 50) ? 0 : that.delta.x;
        that.delta.y = (that.delta.y > 50) ? 0 : that.delta.y;
    };

    this.initialize();
};