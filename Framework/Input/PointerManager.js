/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

Atlantis.PointerManager = (function () {
    var that;

    /**
    * PointerManager is an abstraction of click event and touch event.
    *
    * @class PointerManager
    * @constructor
    * @param {DOMElement} The DOM element to use for event detection.
    */
    var pointerManager = function (domElement) {
        this.x = 0;
        this.y = 0;
        this.lastState = { x: 0, y: 0 };
        this.delta = { x: 0, y: 0 };
        this.click = false;
        this.release = true;
        this.drag = false;
        this.hasTouch = !!("ontouchstart" in window) || !!("onmsgesturechange" in window);
        this.touch = false;
        this.domElement = domElement;
        this.initialized = false;
        this.startEventListeners();
        that = this;
    };

    /**
    * Start event listening on specified DOM element.
    *
    * @method startEventListeners
    */
    pointerManager.prototype.startEventListeners = function () {
        if (!this.initialized) {
            // Mouse
            this.domElement.addEventListener("mousedown", this.updateHandler, false);
            this.domElement.addEventListener("mousemove", this.updateHandler, false);
            this.domElement.addEventListener("mouseup", this.updateHandler, false);
            this.domElement.addEventListener("click", this.updateHandler, false);

            // Touch
            this.domElement.addEventListener("touchstart", this.updateHandler, false);
            this.domElement.addEventListener("touchmove", this.updateHandler, false);
            this.domElement.addEventListener("touchend", this.updateHandler, false);
            this.domElement.addEventListener("touchcancel", this.updateHandler, false);
            this.initialized = true;
        }
    };

    /**
    * Stop event listening on specified DOM element.
    *
    * @method startEventListeners
    */
    pointerManager.prototype.stopEventListeners = function () {
        if (this.initialized) {
            // Mouse
            this.domElement.removeEventListener("mousedown", this.updateHandler);
            this.domElement.removeEventListener("mousemove", this.updateHandler);
            this.domElement.removeEventListener("mouseup", this.updateHandler);
            this.domElement.removeEventListener("click", this.updateHandler);

            // Touch
            this.domElement.removeEventListener("touchstart", this.updateHandler);
            this.domElement.removeEventListener("touchmove", this.updateHandler);
            this.domElement.removeEventListener("touchend", this.updateHandler);
            this.domElement.removeEventListener("touchcancel", this.updateHandler);
            this.initialized = false;
        }
    };

    /**
    * Event handler responsible to update position and previous position of the pointer.
    *
    * @method updatePosition
    * @param {Object} a touch or mouse event.
    */
    pointerManager.prototype.updatePosition = function (event) {
        var evt = getEvent(event);
        that.lastState.x = that.x;
        that.lastState.y = that.y;
        that.x = evt.pageX;
        that.y = evt.pageY;
    };

    /**
    * Event handler responsible to update clicks and touch states.
    *
    * @method updateClickStates
    * @param {Object} a touch or mouse event.
    */
    pointerManager.prototype.updateClickStates = function (event) {
        var event = event || {};
        if (event.type == "mousedown" || event.type == "touchstart") {
            that.click = true;
            that.release = false;
            that.touch = that.hasTouch ? true : false;
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

    /**
    * Event handler responsive to update clicks/touch and position.
    *
    * @method updateHandler
    * @param {Object} a touch or mouse event.
    */
    pointerManager.prototype.updateHandler = function (event) {
        event.preventDefault();
        that.updatePosition(event);
        that.updateClickStates(event);
        that.updateDelta();
    };

    /**
    * Update the delta.
    *
    * @method updateDelta
    */
    pointerManager.prototype.updateDelta = function () {
        if (that.x == that.lastState.x) {
            that.delta.x = 0;
        }
        else {
            that.delta.x = (that.x - that.lastState.x);
        }

        if (that.y == that.lastState.y) {
            that.delta.y = 0;
        }
        else {
            that.delta.y = (that.y - that.lastState.y);
        }

        if (that.delta.x > 100) {
            that.delta.x = 0;
        }

        that.delta.x = (that.delta.x > 50) ? 0 : that.delta.x;
        that.delta.y = (that.delta.y > 50) ? 0 : that.delta.y;
    };

    /**
    * Gets a string of position and states.
    *
    * @method toString
    * @return {String} A string that contains informations about position and states.
    */
    pointerManager.prototype.toString = function () {
        var positions = ["X: ", Math.round(this.x), " <br />Y: ", Math.round(this.y), "<br />LastState.x: ", Math.round(this.lastState.x) + " <br /> LastState.y: ", Math.round(this.lastState.y), "<br />Delta.x: ", Math.round(this.delta.x), " <br /> Delta.y: ", Math.round(this.delta.y)].join("");
        var buttons = ["<br />Click: ", this.click, "<br />Release: ", this.release, "<br />Drag: ", this.drag, "<br />Touch: ", this.touch].join("");

        return ([positions + "<br />" + buttons + "<br />"].join(""));
    };

    /**
    * Gets the event that correspond of pointer type.
    *
    * @function getEvent
    * @return {Object} Return a touch event or a click event
    */
    function getEvent(event) {
        var evt = event;

        if (typeof (event.touches) !== "undefined" && event.touches.length > 0) {
            evt = event.touches[0];
        }
        return evt;
    }

    return pointerManager;
})();