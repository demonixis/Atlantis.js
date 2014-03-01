/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.SpriteSortMode = {
    BackToFront: 0,
    FrontToBack: 1,
    Immediate: 2
};

Atlantis.SpriteEffect = {
    None: 0,
    FlipHorizontaly: 1,
    FlipVerticaly: 2
};

Atlantis.BatchItemType = {
    Texture: 0,
    Font: 1
};   

/**
 * Define a SpriteBatch that is responsible to draw multiple elements on screen on one pass.
 * @class SpriteBatch
 * @constructor
 * @param {Atlantis.Graphics.GraphicsDevice} The graphics device.
 */
Atlantis.SpriteBatch = function (graphicsDevice) {
    this._renderTarget = new Atantis.RenderTarget(graphicsDevice.preferredBackBufferWidth, graphicsDevice.preferredBackBufferHeight, false)
    this._canvas = this._renderTarget.getCanvas();
    this._context = this._renderTarget.getContext();
    this._bbContext = graphicsDevice.getBackBuffer().getContext();
    this._batchItems = [];
    this._batchStarted = false;
    this._previousSettings = {};
    this._spriteSortMode = Atlantis.SpriteSortMode.Immediate;
};

Atlantis.SpriteBatch.prototype.begin = function (spriteSortMode) {
    if (!this._batchStarted) {
        this._batchStarted = true;
        this._spriteSortMode = spriteSortMode || Atlantis.SpriteSortMode.FrontToBack;
    }
};

Atlantis.SpriteBatch.prototype.end = function () {
    if (this._batchStarted) {
        var item = {};
        var that = this;

        if (this._spriteSortMode != Atlantis.SpriteSortMode.Immediate) {
            this._batchItems.sort(function (itemA, itemB) {
                if (that._spriteSortMode == Atlantis.SpriteSortMode.BackToFront) {
                    return itemA.layerDepth > itemB.layerDepth;
                }
                else {
                    return itemA.layerDepth < itemB.layerDepth;
                }
            });
        }

        // TODO : Implement matrix rotation/translation/scaling
        for (var i = 0, l = this._batchItems.length; i < l; i++) {
            item = this._batchItems[i];

            this._context.save();
            if (item.origin) {
                this._context.translate(item.origin.x, item.origin.y);   
            }

            if (item.rotation) {
                this._context.rotate(item.rotation);   
            }

            if (item.scale) {
                this._context.scale(item.scale.x, item.scale.y);   
            }

            if (item.origin) {
                this._context.translate(-item.origin.x, -item.origin.y);
            }

            if (item.effect != Atlantis.SpriteEffect.None) {
                if (item.effect == Atlantis.SpriteEffect.FlipHorizontaly) {
                    this._context.scale(-1, 1);   
                }
                else {
                    this._context.scale(1, -1);   
                }
            }

            if (item.type === Atlantis.BatchItemType.Texture) {
                // TODO : Implement color
                if (item.sourceRectangle) {
                    this._context.drawImage(item.texture2D.getTexture(), item.sourceRectangle.x, item.sourceRectangle.y, item.sourceRectangle.width, item.sourceRectangle.height, item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                }
                else {
                    this._context.drawImage(item.texture2D.getTexture(), item.destinationRectangle.x, item.destinationRectangle.y, item.destinationRectangle.width, item.destinationRectangle.height);
                } 
            }
            else if (item.type === Atlantis.BatchItemType.Font) {
                this._context.fillStyle = item.color;
                this._context.font = item.spriteFont.getFont();
                this._context.fillText(item.text, item.position.x, item.position.y);
            }

            this._context.restore();
        }

        // Flush renderTarget into backbuffer
        this._bbContext.drawImage(this._canvas, this._renderTarget.viewport.x, this._renderTarget.viewport.y, this._renderTarget.viewport.width, this._renderTarget.viewport.height);
        this._batchItems.length = 0;
        this._batchStart = false;
    }
};

Atlantis.SpriteBatch.prototype.draw = function (texture2D, destinationRectangle, sourceRectangle, color, rotation, origin, scale, effect, layerDepth) {
    if (this._batchStarted) {
        if (typeof(destinationRectangle.width) === "undefined") {
            destinationRectangle.width = texture2D.width;
            destinationRectangle.height = texture2D.height;
        }

        this._batchItems.push({ 
            type: Atlantis.BatchItemType.Texture, 
            texture2D: texture2D, 
            sourceRectangle: sourceRectangle, 
            destinationRectangle: destinationRectangle, 
            color: color, 
            rotation: rotation,
            origin: origin, 
            scale: scale,
            effect: effect ? effect : Atlantis.SpriteEffect.None, 
            layerDepth: (typeof(layerDepth) === "number") ? layerDepth : 0 
        });
    }
};

Atlantis.SpriteBatch.prototype.drawString = function (spriteFont, text, position, color, rotation, original, scale, effect, layerDepth) {
    if (this._batchStarted) {
        this._batchItems.push({ 
            type: Atlantis.BatchItemType.Font, 
            spriteFont: spriteFont, 
            text: text, 
            position: position, 
            color: color, 
            rotation: rotation,
            origin: origin, 
            scale: scale,
            effect: effect ? effect : Atlantis.SpriteEffect.None, 
            layerDepth: (typeof(layerDepth) === "number") ? layerDepth : 0 
        });   
    }
};