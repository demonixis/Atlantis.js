var Atlantis = window.Atlantis || {};

(function () {
	// Define a basic entity
    Atlantis.Entity = function (params) {
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

    Atlantis.Entity.prototype.initialize = function () { };

    Atlantis.Entity.prototype.loadContent = function (contentManager) { 
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

    Atlantis.Entity.prototype.update = function (gameTime) { };

    Atlantis.Entity.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
    };

    Atlantis.Entity.prototype.updateSizes = function () {
        Atlantis.getImageSize(this.texture);
        this.rectangle.width = this.texture.width;
        this.rectangle.height = this.texture.height;
    };

    Atlantis.Entity.prototype.setSize = function (width, height) {
        if (!this.assetLoaded) {
            var that = this;
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

    Atlantis.Entity.prototype.setPosition = function (value1, value2) {
        if (value1 instanceof Atlantis.Point || value1 instanceof Atlantis.Rectangle) {
            this.position.x = value1.x;
            this.position.y = value1.y;
            this.rectangle.x = value1.x;
            this.rectangle.y = value1.y;
        }
        else {
            this.position.x = value1;
            this.position.y = value2 || value1;
            this.rectangle.x = value1;
            this.rectangle.y = value2 || value1;
        }
    }
})();