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
        this.enableSyncLoading = false;
        this.syncInterval = 100;

        var params = params || {};
        for (var i in params) {
            this[i] = params[i];
        }
    };

    Atlantis.Entity.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y || this.position.y;
        
        this.rectangle.x = x;
        this.rectangle.y = y || this.rectangle.x;
    };

    Atlantis.Entity.prototype.setSize = function (width, height) {
        this.rectangle.width = width;
        this.rectangle.height = height || this.rectangle.width;
    };

    Atlantis.Entity.prototype.initialize = function () { };

    Atlantis.Entity.prototype.loadContent = function (contentManager) { 
        if (this.textureName != "" && this.assetLoaded == false) {
		    this.texture = contentManager.load(this.textureName);

            if (this.enableSyncLoading) {
                this.texture.addEventListener("load", function (event) {
                    Atlantis.getImageSize(this.texture);
                    this.rectangle.width = this.texture.width;
                    this.rectangle.height = this.texture.height;
                    this.sourceRectangle.width = this.texture.width;
                    this.sourceRectangle.height = this.texture.height;
                    this.assetLoaded = true;
                }, false);

                var that = this;
                var interval = setInterval(function (t) {
                    if (that.assetLoaded) {
                        clearInterval(interval);    
                    }
                }, this.syncInterval);
            }
            else {
                this.assetLoaded = true;
            }
        }
    };

    Atlantis.Entity.prototype.update = function (gameTime) { };

    Atlantis.Entity.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
    };
})();