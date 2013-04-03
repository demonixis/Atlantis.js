/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Graphics = Atlantis.Graphics || {};

/**
 * @class Graphics
 */
(function () {
    Atlantis.Graphics.drawCircle = function (context, x, y, rayon, color) {
        context.beginPath();
        context.arc(x, y, rayon, 0, Math.PI * 2, true);
        context.fillStyle = color || "#ffffff";
        context.fill();
    };

    Atlantis.Graphics.drawRectPoint = function (context, x, y, width, height, color) {
        context.fillStyle = color || "#ffffff";
        context.fillRect(x, y, width, height);
    };

    Atlantis.Graphics.drawText = function (context, text, x, y, params) {
        var params = params || {};
        var style = params.style || "normal";
        var size = params.size || 12;
        var font = params.font || "sans-serif";
        var color = params.color || "#ffffff";

        context.fillStyle = color || '#ffffff';
        context.font = style + " " + size + "px " + font;
        context.fillText(text, x, y);
    };
})();