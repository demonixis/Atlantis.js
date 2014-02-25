 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
 
var Atlantis = window.Atlantis || {};

Atlantis.Entity = (function () {
    /** 
	 * A basic entity
	 * @constructor
	 * @class Entity
	 */
    var entity = function (params) {
        this.name = "GameObject";
        this.enabled = true;
        this.visible = true;
        this.texture = null;
        this.textureName = "";
        this.assetLoaded = false;
        this.rectangle = new Atlantis.Rectangle();
        this.sourceRectangle = new Atlantis.Rectangle();

        var params = params || {};
        for (var i in params) {
            this[i] = params[i];
        }
    };

    /**
     *
     * @method initialize
     */
    entity.prototype.initialize = function () { };

    /**
     *
     * @method loadContent
     * @param
     */
    entity.prototype.loadContent = function (contentManager) {
        if (this.textureName != "" && this.assetLoaded == false) {
            var that = this;

            this.texture = contentManager.load(this.textureName);

            if (this.texture.width == 0 && this.texture.height == 0) {
                this.texture.addEventListener("load", function (event) {
                    that.updateSizes();
                    that.assetLoaded = true;
                    Atlantis.notify("Atlantis.Entity.AssetLoaded", { entity: that.texture });
                }, false);
            }
            else {
                this.updateSizes();
                this.assetLoaded = true;
                Atlantis.notify("Atlantis.Entity.AssetLoaded", { entity: that.texture });
            }
        }
    };

    /**
     *
     * @method update
     * @param
     */
    entity.prototype.update = function (gameTime) { };

    /**
     *
     * @method draw
     * @param
     * @param
     */
    entity.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
    };

    /**
     *
     * @method updateSizes
     */
    entity.prototype.updateSizes = function () {
        Atlantis.getImageSize(this.texture);
        this.rectangle.width = this.texture.width;
        this.rectangle.height = this.texture.height;
    };

    /**
     *
     * @method setSize
     * @param
     * @param
     */
    entity.prototype.setSize = function (width, height) {
        if (!this.assetLoaded) {
            var that = this;
            // If not loaded we wait for sets the new values
            var timer = setInterval(function (time) {
                if (that.assetLoaded) {
                    that.rectangle.width = width;
                    that.rectangle.height = height || width;
                    clearInterval(timer);
                }
            }, 150);
        }
        else {
            this.rectangle.width = width;
            this.rectangle.height = height || width;
        }
    };

    entity.prototype.isActive = function () {
        return this.enabled && this.visible;
    };

    entity.prototype.setActive = function (active) {
        this.enabled = active;
        this.visible = active;
    };

    entity.prototype.move = function (x, y) {
        this.rectangle.x = x;
        this.rectangle.y = y;
    };
    
    entity.prototype.translate = function (x, y) {
        this.rectangle.x += x;
        this.rectangle.y += y;
    };
    
    entity.prototype.setPosition = function (value1, value2) {
        this.rectangle.x = value1;
        this.rectangle.y = value2 || value1;
    }

    entity.prototype.getX = function () { 
        return this.rectangle.x;
    };

    entity.prototype.getY = function () {
        return this.rectangle.y;
    };
    
    entity.prototype.setX = function (x) {
        this.rectangle.x = x;  
    };
    
    entity.prototype.setY = function (y) {
        this.rectangle.y = y;  
    };

    entity.prototype.getWidth = function () {
        return this.rectangle.width;
    };

    entity.prototype.getHeight = function () {
        return this.rectangle.height;
    };

    entity.prototype.getName = function () {
        return this.name;
    };

    entity.prototype.setName = function (name) { this.name = name; };

    entity.prototype.getBounds = function () {
        return this.rectangle;
    };
    
    // @deprecated
    entity.prototype.getBoundingRectangle = function () {
        return this.rectangle;    
    };

    return entity;
})();