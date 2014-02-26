/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics.GraphicsDevice = (function () {
    /**
    * The graphics device is response to create the main render target and must manage all draw call.
    * @class GraphicsDevice
    * @constructor
    * @param {Canvas} The canvas used to render the game.
    */
    var device = function (frontBuffer, backBufferWidth, backBufferHeight) {
        this._frontBuffer = frontBuffer;
        this._backBuffer = new Atlantis.RenderTarget(backBufferWidth || frontBuffer.getWidth(), backBufferHeight || frontBuffer.getHeight(), frontBuffer.isWebGLEnabled());
        this._context = this._backBuffer.getContext();
        this._width = backBufferWidth;
        this._height = backBufferHeight;
    };

    device.prototype.getBackBufferWidth = function () {
        return this._width;
    };

    device.prototype.getBackBufferHeight = function () {
        return this._height;
    };

    device.prototype.setPreferredBackbufferSize = function (width, height) {
        this._backBuffer.setSize(width, height);
        this._width = width;
        this._height = height;
    };

    device.prototype.getContext = function () {
        return this._context;
    };

    device.prototype.toggleFullscreen = function (element) {
        var element = element instanceof HTMLElement ? element : document.body;
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

    device.prototype.isFullscreen = function () {
        return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || false;
    };

    return device;
})();