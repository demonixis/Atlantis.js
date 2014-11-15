/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Define the sort mode of a sprite batch.
 * - BackToFront: All items of the batch are drawn to the smallest to the biggest layer depth
 * - FrontToBack: All items of the batch are drawn to the biggest to the smallest layer depth
 * - Immediate: No sorting, all is drawn without layer depth sorting.
 * @class SpriteSortMode
 * @static
 */
Atlantis.SpriteSortMode = {
    BackToFront: 0,
    FrontToBack: 1,
    Immediate: 2
};

/**
 * Define an effect to apply on a sprite.
 * @class SpriteEffect
 * @static
 */
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
    this._viewport = new Atlantis.Rectangle(0, 0, graphicsDevice.preferredBackBufferWidth, graphicsDevice.preferredBackBufferHeight);
    this._canvas = this._graphicsDevice.getBackBuffer().getCanvas();
    this._context = this._graphicsDevice.getBackBuffer().getContext();

    this._batchItems = [];
    this._batchStarted = false;
    this._spriteSortMode = Atlantis.SpriteSortMode.Immediate;
    this._transformMatrix = null;
    this._cacheColoredTextures = [];
    this._batchRect = new Atlantis.Rectangle();
    
    document.addEventListener(Atlantis.events.ResolutionChanged, this._onResize.bind(this), false);
};

Atlantis.SpriteBatch.prototype._onResize = function (event) {
    this._viewport.width = event.width;
    this._viewport.height = event.height;
};

/**
 * Begin the batch operation.
 * @method begin
 * @param {Atlantis.SpriteSortMode} The type of sorting to use (option, default is Immediate).
 * @param {Array} A transform matrix to apply for all items (optional). The matrix is a 3x3 matrix in a single array.
 *        - [ScaleX, SkewX, SkewY, ScaleY, TranslationX, TranslationY]
 */
Atlantis.SpriteBatch.prototype.begin = function (spriteSortMode, transformMatrix) {
    if (!this._batchStarted) {
        this._batchStarted = true;
        this._spriteSortMode = typeof(spriteSortMode) === "number" ? spriteSortMode : Atlantis.SpriteSortMode.Immediate;

        if (this._transformMatrix) {
            this._context.save();
            
            this._context.transform(
                this._transformMatrix[0], this._transformMatrix[1], this._transformMatrix[2],
                this._transformMatrix[3], this._transformMatrix[4], this._transformMatrix[5]);
        }
    }
};

/**
 * Draw a texture on the screen
 * @method draw
 * @param {Image} The image or canvas to draw.
 * @param {Atlantis.Rectangle|Atlantis.Vector2} The position or the rectangle of the image.
 * @param {Atlantis.Rectangle} A source rectangle.
 * @param {String} A color to apply on the image in hex format.
 * @param {Number} Rotation of the image.
 * @param {Atlantis.Vector2} Origin of the image (defaut is 0, 0 on top/left).
 * @param {Atlantis.Vector2} Scale of the image (default is 1/1);
 * @param {Atlantis.SpriteEffect} An effect to apply (default is none).
 * @param {Number} The layer depth (Important when SpriteSortMode is set to BackToFront or FrontToBack).
 */
Atlantis.SpriteBatch.prototype.draw = function (texture2D, destinationRectangle, sourceRectangle, color, rotation, origin, scale, effect, layerDepth) {
    if (this._batchStarted) {
        if (!destinationRectangle.width) {
            destinationRectangle.width = texture2D.width;
            destinationRectangle.height = texture2D.height;
        }

        if (this._spriteSortMode == Atlantis.SpriteSortMode.Immediate) {
            this._drawBatchItem(texture2D, destinationRectangle, sourceRectangle, color, rotation, origin, scale, effect, layerDepth, Atlantis.BatchItemType.Texture);
        }
        else {
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
                layerDepth: +layerDepth|0 
            });
        }
    }
};

/**
 * Draw a string on the screen
 * @method drawString
 * @param {Atlantis.SpriteFont} The SpriteFont to use.
 * @param {String} The string to draw.
 * @param {Atlantis.Vector2} The position of the string.
 * @param {String} The color of the string in hex format.
 * @param {Number} Rotation of the image.
 * @param {Atlantis.Vector2} Origin of the image (defaut is 0, 0 on top/left).
 * @param {Atlantis.Vector2} Scale of the image (default is 1/1);
 * @param {Atlantis.SpriteEffect} An effect to apply (default is none).
 * @param {Number} The layer depth (Important when SpriteSortMode is set to BackToFront or FrontToBack).
 */
Atlantis.SpriteBatch.prototype.drawString = function (spriteFont, text, position, color, rotation, origin, scale, effect, layerDepth) {
    if (this._batchStarted) {
        if (this._spriteSortMode === Atlantis.SpriteSortMode.Immediate) {
            this._drawBatchItem(spriteFont, position, text, color, rotation, origin, scale, effect, layerDepth, Atlantis.BatchItemType.Font);
        }
        else {
            this._batchItems.push({ 
                type: Atlantis.BatchItemType.Font, 
                texture2D: spriteFont, 
                sourceRectangle: text, 
                destinationRectangle: { x: position.x, y: position.y, width: 1, height: 1 }, 
                color: color, 
                rotation: rotation,
                origin: origin, 
                scale: scale,
                effect: effect ? effect : Atlantis.SpriteEffect.None, 
                layerDepth: +layerDepth|0 
            });   
        }
    }
};

/**
 * Execute the batch process and draw the result in the screen.
 * @method end
 */
Atlantis.SpriteBatch.prototype.end = function () {
    if (this._batchStarted) {
        if (this._spriteSortMode !== Atlantis.SpriteSortMode.Immediate) {
            this._batchItems = this._batchItems.sort(this._sortBatchItem.bind(this));
            
            for (var i = 0, l = this._batchItems.length; i < l; i++) {
                this._drawBatchItem(this._batchItems[i].texture2D, this._batchItems[i].destinationRectangle, this._batchItems[i].sourceRectangle, this._batchItems[i].color, this._batchItems[i].rotation, this._batchItems[i].origin, this._batchItems[i].scale, this._batchItems[i].effect, this._batchItems[i].layerDepth, this._batchItems[i].type);
            }

            this._batchItems.length = 0;
        }
        
        if (this._transformMatrix) {
            this._context.restore();
        }

        this._batchStarted = false;
    }
};

/**
 * Draw a texture on the screen
 * @method drawTexture
 * @static
 * @param {CanvasContext} The canvas context.
 * @param {Image} The image or canvas to draw.
 * @param {Number} x coordinate.
 * @param {Number} y coordinate.
 * @param {Number} width of the image.
 * @param {Number} height of the image.
 * @param {Atlantis.Rectangle} A source rectangle.
 */
Atlantis.SpriteBatch.drawTexture  = function (context, texture, x, y, width, height, sourceRectangle) {
    if (sourceRectangle) { 
        context.drawImage(texture, sourceRectangle.x, sourceRectangle.y, sourceRectangle.width, sourceRectangle.height, x, y, width, height); 
    }
    else {
        context.drawImage(texture, x, y, width, height);
    }
};

Atlantis.SpriteBatch.drawString = function (context, spriteFont, text, position, color) {
    context.fillStyle = color;
    context.font = spriteFont.getFont();
    context.fillText(text, position.x, position.y);
};

Atlantis.SpriteBatch.prototype._drawBatchItem = function (texture2D, destinationRectangle, sourceRectangle, color, rotation, origin, scale, effect, layerDepth, type) {                
    // If the entity is visible on the screen.   
    this._batchRect.fromRectangle(destinationRectangle);

    if (this._viewport.intersects(this._batchRect)) {
        var oX = origin ? origin.x : 0;
        var oY = origin ? origin.y : 0;

        this._context.save();

        this._context.translate(destinationRectangle.x, destinationRectangle.y);
        this._context.translate(oX, oY);
        this._batchRect.x = -oX;
        this._batchRect.y = -oY;

        if (rotation) {
            this._context.rotate(rotation);    
        }

        if (scale) {
            this._context.scale(scale.x, scale.y);   
        }

        if (effect && effect !== Atlantis.SpriteEffect.None) {
            if (effect == Atlantis.SpriteEffect.FlipHorizontaly) {
                this._context.scale(-1, 1);
                this._batchRect.x -= this._batchRect.width;
            }
            else {
                this._context.scale(1, -1);   
                this._batchRect.y -= this._batchRect.height; 
            }
        }

        if (type === Atlantis.BatchItemType.Texture) { 
            if (color && texture2D.width && texture2D.height) {
                Atlantis.SpriteBatch.drawTexture(this._context, this._colorizeTexture(texture2D, color), this._batchRect.x, this._batchRect.y, this._batchRect.width, this._batchRect.height, sourceRectangle);  
            }
            else {
                Atlantis.SpriteBatch.drawTexture(this._context, texture2D, this._batchRect.x, this._batchRect.y, this._batchRect.width, this._batchRect.height, sourceRectangle); 
            }
        }
        else if (type === Atlantis.BatchItemType.Font) {
            // Because JavaScript is so Magic..
            // The prototype become (spriteFont, position, text, color)
            Atlantis.SpriteBatch.drawString(this._context, texture2D, sourceRectangle, this._batchRect, color); 
        }

        this._context.restore();
    }
};

// Colorize a texture and put it in a cache.
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

// Convert an hexa color to byte color.
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

// Search if a colored texture is already in the cache.
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

Atlantis.SpriteBatch.prototype._sortBatchItem = function (itemA, itemB) {
    if (this._spriteSortMode === Atlantis.SpriteSortMode.BackToFront) {
        if (+itemA.layerDepth > +itemB.layerDepth) {
            return 1;   
        }
        
        if (+itemA.layerDepth < +itemB.layerDepth) {
            return -1;   
        }
        
        return 0;
    }
    else {
        if (+itemA.layerDepth < +itemB.layerDepth) {
            return 1;   
        }
        
        if (+itemA.layerDepth > +itemB.layerDepth) {
            return -1;   
        }
        
        return 0;
    }
};