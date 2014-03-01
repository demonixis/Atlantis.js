/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.RenderTarget = function (width, height, is3D) {
    this._canvas = document.createElement("canvas");
    this.setSize(width, height);
    this._context = null;
    this._is3DCanvas = is3D;
    this.viewport = new Atlantis.Rectangle(0, 0, width, height); 

    if (is3D) {
        this._context = this._canvas.getContext("webgl") || this._canvas.getContext("experimental-webgl");
    }
    else {
        this._context = this._canvas.getContext("2D");
    }
};

Atlantis.RenderTarget.prototype.getContext = function () {
    return this._context;
};

Atlantis.RenderTarget.prototype.getCanvas = function () {
    return this._canvas;
};

Atlantis.RenderTarget.prototype.getWidth = function () {
    return this.viewport.width;
};

Atlantis.RenderTarget.prototype.getHeight = function () {
    return this.viewport.height;
};

Atlantis.RenderTarget.prototype.setSize = function (width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
    this._viewport.setSize(width, height);
};

Atlantis.RenderTarget.prototype.getViewport = function () {
    return this.viewport;
};

Atlantis.RenderTarget.prototype.is3DCanvas = function () {
    return this._is3DCanvas;
};

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

