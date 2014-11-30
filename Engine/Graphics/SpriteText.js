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

Atlantis.SpriteText.prototype.measureTextHeight = function (text, maxWidth, lineHeight) {
	var text = text || this.text;
    var maxWidth = maxWidth || this.width;
    var words = text.split(" ");
    var line = "";
    var testLine = "";
    var y = lineHeight || this.spriteFont.size;
    var metrics = null;
    var testWidth = 0;
    var context = Atlantis.app.game.graphicsDevice.getBackBuffer().getContext();

    for (var n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        metrics = context.measureText(testLine);
        testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }

    return y;
};