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
Atlantis.GraphicsDevice = function (frontBufferWidth, frontBufferHeight, backBufferWidth, backBufferHeight, is3D) {
    var fbWidth = frontBufferWidth || 800,
        fbHeight = frontBufferHeight || 480,
        bbWidth = backBufferWidth || frontBufferWidth,
        bbHeight = backBufferHeight || frontBufferHeight,
        useWebGL = is3D ? is3D : false;

    this._frontBuffer = new Atlantis.RenderTarget(fbWidth, fbHeight, useWebGL);
    this._fbContext = frontBuffer.getContext();
    this._backBuffer = new Atlantis.RenderTarget(bbWidth, bbHeight, useWebGL);
    this.preferredBackBufferWidth = bbWidth;
    this.preferredBackBufferHeight = bbHeight;
};

Atlantis.GraphicsDevice.prototype.setPreferredBackBufferSize = function (width, height) {
    this._backBuffer.setSize(width, height);
    this.preferredBackBufferWidth = width;
    this.preferredBackBufferHeight = height;
};

Atlantis.GraphicsDevice.prototype.getBackBuffer = function () {
    return this._backBuffer;
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