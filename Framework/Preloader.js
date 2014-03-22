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
	this.atlantisLogo = document.createElement("img");
	this.atlantisLogo.src= "data:image/jpg;base64,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";
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
    context.drawImage(this.atlantisLogo, this.logoRect.x, this.logoRect.y, this.logoRect.width, this.logoRect.height);
};
