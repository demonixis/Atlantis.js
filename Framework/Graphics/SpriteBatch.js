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
    this._graphicsDevice = graphicsDevice;
    
    // Canvas used to render all item of the batch.
    this._renderTarget = new Atlantis.RenderTarget(graphicsDevice.preferredBackBufferWidth, graphicsDevice.preferredBackBufferHeight, false);
    this._canvas = this._renderTarget.getCanvas();
    this._context = this._renderTarget.getContext();
    
    // Canvas used to recolorize an image.
    this._colorTarget = new Atlantis.RenderTarget(1, 1, false);
    this._colorCanvas = this._colorTarget.getCanvas();
    this._colorContext = this._colorTarget.getContext();
    
    this._batchItems = [];
    this._batchStarted = false;
    this._spriteSortMode = Atlantis.SpriteSortMode.Immediate;
};

Atlantis.SpriteBatch.prototype.begin = function (spriteSortMode) {
    if (!this._batchStarted) {
        this._batchStarted = true;
        this._spriteSortMode = typeof(spriteSortMode) === "number" ? spriteSortMode : Atlantis.SpriteSortMode.FrontToBack;
        this._renderTarget.clear();
    }
};

Atlantis.SpriteBatch.prototype.end = function () {
    if (this._batchStarted) {
        var item = {};
        var that = this;

        if (this._spriteSortMode !== Atlantis.SpriteSortMode.Immediate) {
            this._batchItems.sort(function (itemA, itemB) {
                if (that._spriteSortMode === Atlantis.SpriteSortMode.BackToFront) {
                    return itemA.layerDepth > itemB.layerDepth;
                }
                else {
                    return itemA.layerDepth < itemB.layerDepth;
                }
            });
        }

        // TODO : Implement matrix rotation/translation/scaling
        var fX, fY, fWidth, fHeight;
        var oX, oY;

        for (var i = 0, l = this._batchItems.length; i < l; i++) {
            item = this._batchItems[i];
            fX = item.destinationRectangle.x;
            fY = item.destinationRectangle.y;
            fWidth = item.destinationRectangle.width;
            fHeight = item.destinationRectangle.height;
            
            oX = item.origin ? item.origin.x : 0;
            oY = item.origin ? item.origin.y : 0;
            
            this._context.save();

            this._context.translate(item.destinationRectangle.x, item.destinationRectangle.y);
            this._context.translate(oX, oY);
            fX = -oX;
            fY = -oY;
            
            if (item.rotation) {
                this._context.rotate(item.rotation);    
            }

            if (item.scale) {
                this._context.scale(item.scale.x, item.scale.y);   
            }

            if (item.effect != Atlantis.SpriteEffect.None) {
                if (item.effect == Atlantis.SpriteEffect.FlipHorizontaly) {
                    this._context.scale(-1, 1);
                    fX -= item.destinationRectangle.width;
                }
                else {
                    this._context.scale(1, -1);   
                    fY -= item.destinationRectangle.height; 
                }
            }

            if (item.type === Atlantis.BatchItemType.Texture) {
                if (window.debug && item.color && item.texture2D.width && item.texture2D.height) {
                    this._colorTarget.setSize(item.texture2D.width, item.texture2D.height);
                    this._colorTarget.clear();
                    this._colorContext.drawImage(item.texture2D, 0, 0, item.texture2D.width, item.texture2D.height);
        
                    var imageData = this._colorContext.getImageData(0, 0, item.texture2D.width, item.texture2D.height);
                    
                    for (var i = 0, l = imageData.data.length; i < l; i += 4) {
                        imageData.data[i] = item.color.red | imageData.data[i];
                        imageData.data[i + 1] = item.color.green | imageData.data[i + 1];
                        imageData.data[i + 2] = item.color.blue | imageData.data[i + 2]; 
                        imageData.data[i + 3] = item.color.alpha | imageData.data[i + 3]; 
                    }
                    
                    this._colorContext.putImageData(imageData, 0, 0);
                    
                    Atlantis.SpriteBatch.drawTexture(this._context, this._colorCanvas, fX, fY, fWidth, fHeight, item.sourceRectangle);  
                }
                else {
                     Atlantis.SpriteBatch.drawTexture(this._context, item.texture2D, fX, fY, fWidth, fHeight, item.sourceRectangle);  
                }
            }
            else if (item.type === Atlantis.BatchItemType.Font) {
                this._context.fillStyle = item.color;
                this._context.font = item.spriteFont.getFont();
                this._context.fillText(item.text, fX, fY);
            }

            this._context.restore();
        }
  
        // Flush renderTarget into backbuffer
        this._graphicsDevice.getBackBuffer().getContext().drawImage(this._canvas, this._renderTarget.viewport.x, this._renderTarget.viewport.y, this._renderTarget.viewport.width, this._renderTarget.viewport.height);
        this._graphicsDevice.present();
        this._batchItems.length = 0;
        this._batchStarted = false;
    }
};

Atlantis.SpriteBatch.drawTexture  = function (context, texture, x, y, width, height, sourceRectangle) {
    if (sourceRectangle) { 
        context.drawImage(texture, x, y, width, height, sourceRectangle.x, sourceRectangle.y, sourceRectangle.width, sourceRectangle.height); 
    }
    else {
        context.drawImage(texture, x, y, width, height);
    }
};

Atlantis.SpriteBatch.prototype.draw = function (texture2D, destinationRectangle, sourceRectangle, color, rotation, origin, scale, effect, layerDepth) {
    if (this._batchStarted) {
        if (!destinationRectangle.width) {
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

Atlantis.SpriteBatch.prototype.drawString = function (spriteFont, text, position, color, rotation, origin, scale, effect, layerDepth) {
    if (this._batchStarted) {
        this._batchItems.push({ 
            type: Atlantis.BatchItemType.Font, 
            spriteFont: spriteFont, 
            text: text, 
            destinationRectangle: position, 
            color: color, 
            rotation: rotation,
            origin: origin, 
            scale: scale,
            effect: effect ? effect : Atlantis.SpriteEffect.None, 
            layerDepth: (typeof(layerDepth) === "number") ? layerDepth : 0 
        });   
    }
};