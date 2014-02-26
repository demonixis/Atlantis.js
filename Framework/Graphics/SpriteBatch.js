/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.SpriteBatch = (function () {
    /**
     * Define a SpriteBatch that is responsible to draw multiple elements on screen on one pass.
     * @class SpriteBatch
     * @constructor
     * @param {Atlantis.Graphics.GraphicsDevice} The graphics device.
     */
    var spriteBatch = function (graphicsDevice) {
        this._context = graphicsDevice.getContext();
        this._batchItems = [];
        this._batchStarted = false;
        this._previousSettings = {};
    };
    
    spriteBatch.prototype.begin = function () {
        this._batchStarted = true;
    };
    
    spriteBatch.prototype.end = function () {
        if (this._batchStarted) {
            var item = {};

            for (var i = 0, l = this._batchItems.length; i < l; i++) {
                item = this._batchItems[i];

                if (item.type === 0) {
                    if (item.sourceRectangle) {
                        this._context.drawImage(item.texture2D.getTexture(), item.sourceRectangle.x, item.sourceRectangle.y, item.sourceRectangle.width, item.sourceRectangle.height, item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                    }
                    else {
                        this._context.drawImage(item.texture2D.getTexture(), item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                    } 
                }
                else if (item.type === 1) {
                    saveCanvasSettings(this._context, this._previousSettings);
                    this._context.fillStyle = item.color;
                    this._context.font = item.spriteFont.getFont();
                    this._context.fillText(item.text, item.position.x, item.position.y);
                    restoreCanvasSettings(this._context, this._previousSettings);
                }
            }

            this._batchItems.length = 0;
            this._batchStart = false;
        }
    };
    
    spriteBatch.prototype.draw = function (texture2D, sourceRectangle, destinationRectangle, color) {
        if (this._batchStarted) {
            this._batchItems.push({ type: 0, texture2D: texture2D, sourceRectangle: sourceRectangle, destinationRectangle: destinationRectangle, color: color });
        }
    };
    
    spriteBatch.prototype.drawString = function (spriteFont, text, position, color) {
        if (this._batchStarted) {
            this._batchItems.push({ type: 1, spriteFont: spriteFont, text: text, position: position, color: color });   
        }
    };
    
    function saveCanvasSettings(context, settings) {
        settings.fillStyle = context.fillStyle;
        settings.font = context.font;
    }

    function restoreCanvasSettings(context, settings) {
        context.fillStyle = settings.fillStyle;
        context.font = settings.font;
    }

    return spriteBatch;
})();