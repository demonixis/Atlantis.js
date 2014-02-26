/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.SpriteSortMode = {
    BackToFront: 0,
    FrontToBack: 1
};

Atlantis.SpriteEffect = {
    None: 0,
    FlipHorizontaly: 1,
    FlipVerticaly: 2
};

Atlantis.SpriteBatch = (function () {
    var BatchItemType = {
        Texture: 0,
        Font: 1
    };

    /**
     * Define a SpriteBatch that is responsible to draw multiple elements on screen on one pass.
     * @class SpriteBatch
     * @constructor
     * @param {Atlantis.Graphics.GraphicsDevice} The graphics device.
     */
    var spriteBatch = function (graphicsDevice) {
        this._context = graphicsDevice.getBackbuffer().getContext();
        this._batchItems = [];
        this._batchStarted = false;
        this._previousSettings = {};
        this._spriteSortMode = Atlantis.SpriteSortMode.BackToFront;
    };
    
    spriteBatch.prototype.begin = function (spriteSortMode) {
        if (!this._batchStarted) {
            this._batchStarted = true;
            this._spriteSortMode = spriteSortMode || Atlantis.SpriteSortMode.FrontToBack;
        }
    };
    
    spriteBatch.prototype.end = function () {
        if (this._batchStarted) {
            var item = {};
            var that = this;

            this._batchItems.sort(function (itemA, itemB) {
                if (that._spriteSortMode == Atlantis.SpriteSortMode.BackToFront) {
                    return itemA.layerDepth > itemB.layerDepth;
                }
                else {
                    return itemA.layerDepth < itemB.layerDepth;
                }
            });

            // TODO : Implement matrix rotation/translation/scaling
            for (var i = 0, l = this._batchItems.length; i < l; i++) {
                item = this._batchItems[i];

                if (item.type === BatchItemType.Texture) {
                    // TODO : Implement color, rotation, origin and scale
                    if (item.sourceRectangle) {
                        this._context.drawImage(item.texture2D.getTexture(), item.sourceRectangle.x, item.sourceRectangle.y, item.sourceRectangle.width, item.sourceRectangle.height, item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                    }
                    else {
                        this._context.drawImage(item.texture2D.getTexture(), item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                    } 
                }
                else if (item.type === BatchItemType.Font) {
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
    
    spriteBatch.prototype.draw = function (texture2D, sourceRectangle, destinationRectangle, color, effect, layerDepth) {
        var layerDepth = (typeof(layerDepth) === "number") ? layerDepth : 0;
        if (this._batchStarted) {
            this._batchItems.push({ 
                type: BatchItemType.Texture, 
                texture2D: texture2D, 
                sourceRectangle: sourceRectangle, 
                destinationRectangle: destinationRectangle, 
                color: color, 
                effect: effect ? effect : Atlantis.SpriteEffect.None, 
                layerDepth: (typeof(layerDepth) === "number") ? layerDepth : 0 
            });
        }
    };
    
    spriteBatch.prototype.drawString = function (spriteFont, text, position, color, effect, layerDepth) {
        if (this._batchStarted) {
            this._batchItems.push({ 
                type: BatchItemType.Font, 
                spriteFont: spriteFont, 
                text: text, 
                position: position, 
                color: color, 
                effect: effect ? effect : Atlantis.SpriteEffect.None, 
                layerDepth: (typeof(layerDepth) === "number") ? layerDepth : 0 
            });   
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