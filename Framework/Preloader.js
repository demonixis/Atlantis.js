/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * The Preloader is used during asset loading in game class.
 * @class Preloader
 * @constructor
 * @param {Atlantis.Game} game
 */
Atlantis.Preloader = function (game) {
	this.screenWidth = game.graphicsDevice.preferredBackBufferWidth;
	this.screenHeight = game.graphicsDevice.preferredBackBufferHeight; 
	this.screenWidthPerTwo = this.screenWidth / 2;
	this.screenHeightPerTwo = this.screenHeight / 2;
	this.logoRect = {
		x: this.screenWidth - 96 - 15,
		y: this.screenHeight - 96 - 15, 
		width: 96,
		height: 96
	};
	this.spriteFont = new Atlantis.SpriteFont("Arial", 32);
};

/**
 * Called when an asset is loaded.
 * @method onProgress
 * @param {Object} context The canvas context.
 * @param {Number} progress The loading progression in percent.
 */
Atlantis.Preloader.prototype.onProgress = function (context, progress) {
	var progressMessage = ["Game loading ", progress.progress, "%"].join("");
    var size = context.measureText(progressMessage),
        x = (this.screenWidthPerTwo) - (size.width / 2),
        y = (this.screenHeightPerTwo) - (this.spriteFont.size / 2);

    context.clearRect(0, 0, this.screenWidth, this.screenHeight);
    context.fillStyle = "#fafafa";
    context.font = this.spriteFont.getFont();
    context.fillText(progressMessage, x, y);
};
