/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
* Define a drawable text.
* @class SpriteFont
* @constructor
* @param {String} The font name to use (default Arial). You can use a webfont loaded in CSS.
* @param {Number} The size of the font.
* @param {String} The style of the font (normal, italic, bold)
*/
Atlantis.SpriteFont = function (fontName, size, style) {
    this.fontName = fontName || "Arial";
    this.size = size || 14;
    this.style = style || "normal";
};

/**
 * Gets the string passed to drawing context.
 * @method getFont
 * @return {String} Return the string passed to the drawing context.
 */
Atlantis.SpriteFont.prototype.getFont = function () {
    return [this.style, " ", this.size, "px ", this.fontName].join("");
};