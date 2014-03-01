/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* The graphics device is response to create the main render target and must manage all draw call.
* @class GraphicsDevice
* @constructor
* @param {Canvas} The canvas used to render the game.
*/
Atlantis.GraphicsDevice = function (width, height, settings) {
    var settings = settings || {};
    settings.webGL ? true : false;
    settings.width = width;
    settings.height = height;
    
    this.preferredBackBufferWidth = settings.backBufferWidth || width;
    this.preferredBackBufferHeight = settings.backBufferWidth || height;
    
    if (width && height) {
        this._frontBuffer = new Atlantis.RenderTarget(width, height, settings.webGL, settings.canvas);
        this._fbContext = this._frontBuffer.getContext();
        this._backBuffer = new Atlantis.RenderTarget(this.preferredBackBufferWidth, this.preferredBackBufferHeight, settings.webGL);

        var canvas = this._frontBuffer.getCanvas();
        canvas.style.msTouchAction = "none";
        canvas.style.backgroundColor = "#000";
        canvas.id = canvas.id ? canvas.id : "AtlantisCanvas";
    }
};

Atlantis.GraphicsDevice.prototype.applyChanges = function () {
    this._backBuffer.setSize(this.preferredBackBufferWidth, this.preferredBackBufferHeight);
};

Atlantis.GraphicsDevice.prototype.getBackBuffer = function () {
    return this._backBuffer;
};

Atlantis.GraphicsDevice.prototype.getFrontBuffer = function () {
    return this._frontBuffer;
};

Atlantis.GraphicsDevice.prototype.clear = function (color) {
    this._backBuffer.clear(color);
    this._frontBuffer.clear(color);
};

Atlantis.GraphicsDevice.prototype.present = function () {
    this._fbContext.drawImage(this._backBuffer.getCanvas(), this._frontBuffer.viewport.x, this._frontBuffer.viewport.y, this._frontBuffer.viewport.width, this._frontBuffer.viewport.height);
};

Atlantis.GraphicsDevice.prototype.toggleFullscreen = function (element) {
    var element = element instanceof HTMLElement ? element : this._frontBuffer.getCanvas();
    var fs = this.isFullscreen();

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.msRequestFullscreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || function () { return false; };

    if (fs) {
        document.cancelFullScreen();
    }
    else { 
        element.requestFullScreen();
    }
};

Atlantis.GraphicsDevice.prototype.isFullscreen = function () {
    return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || false;
};