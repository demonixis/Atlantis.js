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
    var device = function (canvas) {
        this.mainRenderTarget = new Atlantis.Graphics.RenderTarget2D(canvas.width, canvas.height);
        this.width = canvas.width;
        this.height = canvas.height;
    };

    /**
	 * Gets the graphics context used to draw back buffer to front buffer.
     * @method getGraphics
	 * @return {Object} The graphics context.
	 */
    device.prototype.getGraphics = function (context) {
        var context = context || "2d";
        return this.canvas.getContent(context);
    };

    /**
	 * Gets the main render target
     * @method getRenderTarget
	 * @return {Atlantis.Graphics.RenderTarget2D} Return the render target used as front buffer.
	 */
    device.prototype.getRenderTarget = function () {
        return this.mainRenderTarget;
    };

    /**
	 * Gets the back buffer width.
     * @method getWidth
	 * @return Return the width of the back buffer.
	 */
	device.prototype.getWidth = function () {
		return this.width;
	}
	
	/**
	 * Gets the back buffer height.
     * @method getHeight
	 * @return Return the height of the back buffer.
	 */
	device.prototype.getHeight = function () {
		return this.height;
	}
    
    function toggleFullscreen(element) {
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
    }

    device.prototype.isFullscreen = function () {
        return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || false;
    };

    return device;
})();