/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics.SpriteFont = (function () {
    /**
    * Define a drawable text.
    * @class SpriteFont
    * @constructor
    */
    var font = function (fontName, size, style) {
        this.fontName = fontName || "Arial";
        this.size = size || 14;
        this.style = style || "normal";
    };
    
    font.prototype.getFont = function () {
        return [this.style, " ", this.size, " ", this.fontName].join("");
    };
    
    font.prototype.getFontName = function () {
        return this.fontName;  
    };
    
    font.prototype.getSize = function () {
        return this.size;  
    };
    
    font.prototype.getStyle = function () {
        return this.style;  
    };

    return font;
})();