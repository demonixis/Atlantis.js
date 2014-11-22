 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.SpriteText = function (spriteFont, text, params) {
	Atlantis.Sprite.call(this, undefined, params);
	this.spriteFont = spriteFont;
	this.text = text;
};

Atlantis.SpriteText.prototype = Object.create(Atlantis.Sprite.prototype);

Atlantis.SpriteText.prototype.initialize = function () {
	var size = this.measureText();
	this.rectangle.width = size.width;
	this.rectangle.height = this.spriteFont.size;
};

Atlantis.SpriteText.prototype.preUpdate = function () {};

Atlantis.SpriteText.prototype.update = function () {};

Atlantis.SpriteText.prototype.postUpdate = function () {};

Atlantis.SpriteText.prototype.draw = function (spriteBatch) { 
    spriteBatch.drawString(this.spriteFont, this.text, this.rectangle, this.color, this.rotation, this.origin, this.scale, this.effect, this.layerDepth);
};

Atlantis.SpriteText.prototype.measureText = function (text) {
	return  Atlantis.app.game.graphicsDevice.getBackBuffer().getContext().measureText(text || this.text);
};