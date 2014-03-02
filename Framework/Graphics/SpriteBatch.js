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

    this._batchItems = [];
    this._batchStarted = false;
    this._spriteSortMode = Atlantis.SpriteSortMode.Immediate;
    this._transformMatrix = null;
    this._cacheColoredTextures = [];
};

Atlantis.SpriteBatch.prototype.begin = function (spriteSortMode, transformMatrix) {
    if (!this._batchStarted) {
        this._batchStarted = true;
        this._transformMatrix = transformMatrix ? (transformMatrix.length === 6 ? transformMatrix : null) : null;
        this._spriteSortMode = typeof(spriteSortMode) === "number" ? spriteSortMode : Atlantis.SpriteSortMode.Immediate;
        this._renderTarget.clear();
    }
};

Atlantis.SpriteBatch.prototype.end = function () {
    if (this._batchStarted) {
        var item = {};
        var that = this;

        if (this._spriteSortMode !== Atlantis.SpriteSortMode.Immediate) {
            this._batchItems = this._batchItems.sort(function (itemA, itemB) {
                if (that._spriteSortMode === Atlantis.SpriteSortMode.BackToFront) {
                    return itemA.layerDepth > itemB.layerDepth;
                }
                else {
                    return itemA.layerDepth < itemB.layerDepth;
                }
            });
        }

        var fX, fY, fWidth, fHeight;
        var oX, oY;

        if (this._transformMatrix) {
            this._context.save();
            
            this._context.transform(
                this._transformMatrix[0], this._transformMatrix[1], this._transformMatrix[2],
                this._transformMatrix[3], this._transformMatrix[4], this._transformMatrix[5]);
        }
        
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
                if (item.color && item.texture2D.width && item.texture2D.height) {
                    Atlantis.SpriteBatch.drawTexture(this._context, this._colorizeTexture(item.texture2D, item.color), fX, fY, fWidth, fHeight, item.sourceRectangle);  
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
        
         if (this._transformMatrix) {
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

Atlantis.SpriteBatch.prototype._colorizeTexture = function (texture, color) {
    var canvas = this._searchColoredTexture(texture, color);
    
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = texture.width;
        canvas.height = texture.height;

        var context = canvas.getContext("2d");
        context.drawImage(texture, 0, 0);

        var imageData = context.getImageData(0, 0, texture.width, texture.height);
        var cColor = this._hexaToBytes(color);
        
        for (var i = 0, l = imageData.data.length; i < l; i += 4) {
            imageData.data[i] = cColor.r | imageData.data[i];
            imageData.data[i + 1] = cColor.g | imageData.data[i + 1];
            imageData.data[i + 2] = cColor.b | imageData.data[i + 2]; 
            imageData.data[i + 3] = cColor.a | imageData.data[i + 3]; 
        }

        context.putImageData(imageData, 0, 0);

        this._cacheColoredTextures.push({ texture: texture, color: color, canvas: canvas });
    } 
    
    return canvas;
};

Atlantis.SpriteBatch.prototype._hexaToBytes = function (color) {
    var hexa = color.split("#")[1];
    var bColor = { r: 0, g: 0, b: 0, a: 0 };
    var size = hexa.length;

    if (size === 3) {
        bColor.r = parseInt((hexa[0] + hexa[0]), 16);
        bColor.g = parseInt((hexa[1] + hexa[1]), 16);
        bColor.b = parseInt((hexa[2] + hexa[2]), 16);
    }
    else if (size === 6) {
        bColor.r = parseInt(hexa.slice(0, 2), 16);
        bColor.g = parseInt(hexa.slice(2, 4), 16);
        bColor.b = parseInt(hexa.slice(4, 6), 16);
    }
    else if (size === 8) {
        bColor.r = parseInt(hexa.slice(0, 2), 16);
        bColor.g = parseInt(hexa.slice(2, 4), 16);
        bColor.b = parseInt(hexa.slice(4, 6), 16);
        bColor.a = parseInt(hexa.slice(6, 8), 16);
    }

    return bColor;
};

Atlantis.SpriteBatch.prototype._searchColoredTexture = function(texture, color) {
    var i = 0;
    var size = this._cacheColoredTextures.length;
    var canvas = null;

    while (i < size && canvas === null) {
        canvas = (this._cacheColoredTextures[i].texture === texture && this._cacheColoredTextures[i].color === color) ? this._cacheColoredTextures[i].canvas : null;
        i++;
    }

    return canvas;
};