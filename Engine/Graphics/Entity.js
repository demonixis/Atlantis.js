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
        this.enabled = true;
        this.visible = true;
        this.texture = null;
        this.textureName = "";
        this.assetLoaded = false;
        this.rectangle = new Atlantis.Rectangle();
        this.sourceRectangle = new Atlantis.Rectangle();

        Object.defineProperty(this, 'x', {
            get: function () {
                return this.rectangle.x;
            },
            set: function (value) {
                this.rectangle.x = value;
            }
        });

        Object.defineProperty(this, 'y', {
            get: function () {
                return this.rectangle.y;
            },
            set: function (value) {
                this.rectangle.y = value;
            }
        });

        Object.defineProperty(this, 'width', {
            get: function () {
                return this.rectangle.width;
            },
            set: function (value) {
                this.rectangle.width = value;
            }
        });

        Object.defineProperty(this, 'height', {
            get: function () {
                return this.rectangle.height;
            },
            set: function (value) {
                this.rectangle.height = value;
            }
        });

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

    /**
     *
     * @method setPosition
     * @param
     * @param
     */
    entity.prototype.setPosition = function (value1, value2) {
        if (value1 instanceof Atlantis.Point || value1 instanceof Atlantis.Rectangle) {
            this.rectangle.x = value1.x;
            this.rectangle.y = value1.y;
        }
        else {
            this.rectangle.x = value1;
            this.rectangle.y = value2 || value1;
        }
    }

    return entity;
})();