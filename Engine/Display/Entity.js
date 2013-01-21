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
    };

    Atlantis.Entity.prototype.initialize = function () { };

    Atlantis.Entity.prototype.loadContent = function (contentManager) { 
        if (this.textureName != "" && this.assetLoaded == false) {
		    this.texture = contentManager.load(this.textureName);
            this.rectangle.width = this.texture.width;
            this.rectangle.height = this.texture.height;
            this.assetLoaded = true;
        }
    };

    Atlantis.Entity.prototype.update = function (gameTime) { };

    Atlantis.Entity.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            context.drawImage(this.texture, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
    };
})();