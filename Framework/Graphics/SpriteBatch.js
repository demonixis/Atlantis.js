/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics.SpriteBatch = (function () {
    /**
     * Define a SpriteBatch that is responsible to draw multiple elements on screen on one pass.
     * @class SpriteBatch
     * @constructor
     * @param {Atlantis.Graphics.GraphicsDevice} The graphics device.
     */
    var spriteBatch = function (graphicsDevice) {

    };
    
    spriteBatch.prototype.begin = function () {
        this.batchStart = true;
    };
    
    spriteBatch.prototype.end = function () {
        if (this.batchStart) {
            
            this.batchStart = false;
        }
    };
    
    spriteBatch.prototype.draw = function (texture2D, sourceRectangle, destinationRectangle, color) {
        if (sourceRectangle) {
            this.context.drawImage(texture2D.getTexture(), sourceRectangle.x, sourceRectangle.y, sourceRectangle.width, sourceRectangle.height, destinationRectangle.x, destinationRectangle.y, destinationRectangle.width, destinationRectangle.height);
        }
        else {
            this.context.drawImage(texture2D.getTexture(), destinationRectangle.x, destinationRectangle.y, destinationRectangle.width, destinationRectangle.height);
        } 
    };
    
    spriteBatch.prototype.drawString = function (spriteFont, text, position, color) {
        this.context.fillStyle = color;
        this.context.font = spriteFont.getFont();
        this.context.fillText(text, position.x, position.y);
    };
    
    function saveCanvasSettings(canvas, settings) {
        settings.fillStyle = canvas.fillStyle;
        settings.font = canvas.font;
    }

    return spriteBatch;
})();