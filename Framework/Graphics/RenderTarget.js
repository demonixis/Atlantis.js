/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.RenderTarget = function (width, height, is3D) {
	this._renderCanvas = document.createElement("canvas");
	this.setSize(width, height);
	this._context = null;
	this._is3DCanvas = is3D;

	if (is3D) {
		this._context = this._renderCanvas.getContext("webgl") || this._renderCanvas.getContext("experimental-webgl");
	}
	else {
		this._context = this._renderCanvas.getContext("2D");
	}
};

Atlantis.RenderTarget.prototype.getContext = function () {
	return this._context;
};

Atlantis.RenderTarget.prototype.getCanvas = function () {
	return this._renderCanvas;
};

Atlantis.RenderTarget.prototype.getWidth = function () {
	return this._renderCanvas.width;
};

Atlantis.RenderTarget.prototype.getHeight = function () {
	return this._renderCanvas.height;
};

Atlantis.RenderTarget.prototype.setSize = function (width, height) {
	this._renderCanvas.width = width;
	this._renderCanvas.height = height;
};

Atlantis.RenderTarget.prototype.getBounds = function () {
	return new Atlantis.Rectangle(0, 0, this._renderCanvas.width, this._renderCanvas.height);
};

Atlantis.RenderTarget.prototype.is3DCanvas = function () {
	return this._is3DCanvas;
};

Atlantis.RenderTarget.prototype.clear = function (color) {
	if (this._is3DCanvas) {

	}
	else {
		this._context.clearRect(0, 0, this._renderCanvas.width, this._renderCanvas.height);
	}
};

