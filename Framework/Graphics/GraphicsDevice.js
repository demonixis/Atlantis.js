/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};


Atlantis.ScaleMode = {
    ScaleToFit: 0, ConserveAspectRatio: 1, NoScaleCenter: 2
};

/**
* The graphics device is response to manage screen (canvas) and draws (render target).
* @class GraphicsDevice
* @constructor
* @param {Number} width The desired screen width
* @param {Number} height The desired screen height
* @param {Object} settings A list of options (webGL, backBufferWidth/Height, canvas).
*/
Atlantis.GraphicsDevice = function (width, height, settings) {
    var settings = settings || {};
    settings.webGL = settings.webGL ? true : false;
    settings.width = width;
    settings.height = height;
    
    this.preferredBackBufferWidth = settings.backBufferWidth || width;
    this.preferredBackBufferHeight = settings.backBufferHeight || height;
  
    this.viewport = new Atlantis.Rectangle();
    this.scaleMode = Atlantis.ScaleMode.ScaleToFit;
    
    if (width && height) {
        // The front buffer (what you see).
        this._frontBuffer = new Atlantis.RenderTarget(width, height, settings.webGL, settings.canvas);
        this._fbContext = this._frontBuffer.getContext();
        
        // The back buffer (what you don't see).
        this._backBuffer = new Atlantis.RenderTarget(this.preferredBackBufferWidth, this.preferredBackBufferHeight, settings.webGL);
        this._bbCanvas = this._backBuffer.getCanvas();

        var canvas = this._frontBuffer.getCanvas();
        canvas.style.msTouchAction = "none";
        canvas.style.backgroundColor = "#000";
        canvas.id = canvas.id ? canvas.id : "AtlantisCanvas";
        
        this.viewport.setSize(this.preferredBackBufferWidth, this.preferredBackBufferHeight);
    }
};

/**
 * Apply the values of preferredBackBufferWidth/Height to the screen.
 * The back buffer is moved according to the scale mode.
 * Note that an event of type Atlantis.event.ResolutionChanged is fired at the end of the process.
 * @method applyChanges
 */
Atlantis.GraphicsDevice.prototype.applyChanges = function () {
    this._backBuffer.setSize(this.preferredBackBufferWidth, this.preferredBackBufferHeight);
    
    var fbWidth = this._frontBuffer.getWidth(),
        fbHeight = this._frontBuffer.getHeight();
        
    // If the screen size AND the backbuffer size are the same OR the scale mode is scale to fit.
    if (this.scaleMode == Atlantis.ScaleMode.ScaleToFit || ((fbWidth === this.preferredBackBufferWidth) && (fbHeight === this.preferredBackBufferHeight))) {
        this.viewport.set(0, 0, fbWidth, fbHeight);
    }
    else if (this.scaleMode == Atlantis.ScaleMode.ConserveAspectRatio) {   
        var diffPercent = 0;
        
        if (this.preferredBackBufferWidth > this.preferredBackBufferHeight) {
            diffPercent = (this.preferredBackBufferWidth / fbWidth);
            this.viewport.width = fbWidth;
            this.viewport.height = this.preferredBackBufferHeight * (1 + diffPercent);
        }
        else {
            diffPercent = (this.preferredBackBufferHeight / fbHeight);
            this.viewport.width = this.preferredBackBufferWidth * (1 + diffPercent);
            this.viewport.height = fbHeight;
        }
        
        this.viewport.x = fbWidth / 2 - this.viewport.width /  2;
        this.viewport.y = fbHeight / 2 - this.viewport.height / 2;
    }
    else if (this.scaleMode == Atlantis.ScaleMode.NoScaleCenter) {
        this.viewport.x = (fbWidth / 2) - (this.preferredBackBufferWidth / 2);
        this.viewport.y =(fbHeight / 2) - (this.preferredBackBufferHeight / 2);
        this.viewport.width = this.preferredBackBufferWidth;
        this.viewport.height = this.preferredBackBufferHeight;
    }
    
    Atlantis.notify(Atlantis.events.ResolutionChanged, { width: this.preferredBackBufferWidth, height: this.preferredBackBufferHeight });
};

/**
 * Gets the back buffer renderTarget.
 * @method getBackBuffer
 * @return {Atlantis.RenderTarget} Return the renderTarget of the back buffer.
 */
Atlantis.GraphicsDevice.prototype.getBackBuffer = function () {
    return this._backBuffer;
};

/**
 * Gets the front buffer renderTarget.
 * @method getFrontBuffer
 * @return {Atlantis.RenderTarget} Return the renderTarget of the front buffer.
 */
Atlantis.GraphicsDevice.prototype.getFrontBuffer = function () {
    return this._frontBuffer;
};

/**
 * Clear all buffers
 * @method clear
 * @param {String} color The clear color (default black).
 */
Atlantis.GraphicsDevice.prototype.clear = function (color) {
    this._backBuffer.clear(color);
    this._frontBuffer.clear(color);
};

/**
 * Draw the back buffer into the front buffer.
 * @method present
 */
Atlantis.GraphicsDevice.prototype.present = function () {
    this._fbContext.drawImage(this._bbCanvas, this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
};

/**
 * Toggle the passed element in fullscreen mode if the browser support this feature.
 * @method toggleFullscreen
 * @param {HTMLElement} The node to use (default is the canvas element).
 */
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

/**
 * Indicate if the fullscreen mode is active
 * @method isFullscreen
 * @return {Boolean} Return true if the fullscreen mode is active, o
 */
Atlantis.GraphicsDevice.prototype.isFullscreen = function () {
    return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || false;
};