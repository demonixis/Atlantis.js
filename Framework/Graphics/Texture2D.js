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
*/
Atlantis.SpriteFont = function (fontName, size, style) {
    this.fontName = fontName || "Arial";
    this.size = size || 14;
    this.style = style || "normal";
};

Atlantis.SpriteFont.prototype.getFont = function () {
    return [this.style, " ", this.size, "px ", this.fontName].join("");
};

/**
* Define a drawable texture.
* @class Texture2D
* @constructor
*/
Atlantis.Texture2D = function (width, height) {
    // TODO : RenderTarget will inherit from that
    this.textureData = [];
}