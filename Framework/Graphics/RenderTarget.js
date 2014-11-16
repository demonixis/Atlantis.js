/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A render target is a graphics surface where we can draw
 * @constructor
 * @class RenderTarget
 * @param {Number} width Desired width.
 * @param {Number} height Desired height.
 * @param {Boolean} (optional) is3D Define if the surface is a 3D surface (WebGL)
 * @param {HTMLCanvas} (optional) A canvas to use with this renderTarget
 */
Atlantis.RenderTarget = function (width, height, is3D, canvas) {
    this._canvas = canvas 
    
    if (!this._canvas) {
        this._canvas = document.createElement("canvas");
        this.setSize(width, height);
    }
    
    this._context = null;
    this._data = null;
    this._needUpdate = false;
    
    if (is3D) {
        this._context = this._canvas.getContext("webgl") || this._canvas.getContext("experimental-webgl");
    }
    else {
        this._context = this._canvas.getContext("2d");
    }

    this.isWebGLCanvas = function () {
        return is3D;
    };
   
    this.setSize(width, height);
};

Atlantis.RenderTarget.fromImage = function (image) {
    var rt = new Atlantis.RenderTarget(image.width, image.height, false);
    rt._context.drawImage(image, 0, 0, image.width, image.height);
    return rt;
};

/**
* Set the image data of the canvas.
* @method setData
* @param {Object} imageData Data to put in the canvas.
*/
Atlantis.RenderTarget.prototype.setData = function (imageData) {
    this._context.putImageData(imageData, 0, 0);
};

/**
* Gets the image data of the canvas.
* @method getData
* @return {Object} Return the ImageData of the context.
*/
Atlantis.RenderTarget.prototype.getData = function () {
    if (!this._data || this._needUpdate) {
        this._data = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
    }
    return this._data;
};

Atlantis.RenderTarget.prototype.getPixelData = function (x, y) {
    var color = this._context.getImageData(x, y, 1, 1).data;
    return { r: color[0], g: color[1], b: color[2], a: color[3] };
};

/**
* Get the context of the canvas used to draw.
* @method
* @return {CanvasContext} Return the canvas context.
*/
Atlantis.RenderTarget.prototype.getContext = function () {
    return this._context;
};

/**
* Gets the canvas used to draw.
* @method getCanvas
* @return {HTMLCanvas} Return the canvas used to draw.
*/
Atlantis.RenderTarget.prototype.getCanvas = function () {
    return this._canvas;
};

/**
* Gets the width of the drawing surface.
* @method getWidth
* @return {Number} Return the width of the drawing surface.
*/
Atlantis.RenderTarget.prototype.getWidth = function () {
    return this._canvas.width;
};

/**
* Gets the height of the drawing surface.
* @method getHeight
* @return {Number} Return the height of the drawing surface.
*/
Atlantis.RenderTarget.prototype.getHeight = function () {
    return this._canvas.height;
};

/**
* Change the size of the drawing surface.
* @method setSize
* @param {Number} width The new width.
* @param {Number} height The new height.
*/
Atlantis.RenderTarget.prototype.setSize = function (width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
};

/**
* Clear the entire surface
* @method clear
*/
Atlantis.RenderTarget.prototype.clear = function (color) {
    if (this._is3DCanvas) {
        this._context.clearColor(color.r, color.g, color.b, color.a);
        this._context.enable(this._context.DEPTH_TEST);
        this._context.depthFunc(this._context.LEQUAL);
        this._context.clear(this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT);
    }
    else {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
};

/**
* Save the content of the renderTarget to an image
* @method saveAsPng
* @return {String} Return a base64 of the image with mime type "image/png"
*/
Atlantis.RenderTarget.prototype.saveAsPng = function () {
    return this._canvas.toDataURL("image/png");
};

/**
* Save the content of the renderTarget to an image
* @method saveAsJpg
* @return {String} Return a base64 of the image with mime type "image/jpg"
*/
Atlantis.RenderTarget.prototype.saveAsJpg = function () {
    return this._canvas.toDataURL("image/jpg");
};