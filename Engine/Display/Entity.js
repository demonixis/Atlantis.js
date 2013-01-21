var Atlantis = window.Atlantis || {};

(function () {
	// Define a basic entity
    Atlantis.Entity = function (params) {
    	this.enabled = true;
        this.visible = true;
    };

    Atlantis.Entity.prototype.initialize = function () { };

    Atlantis.Entity.prototype.loadContent = function (contentManager) { };

    Atlantis.Entity.prototype.update = function (gameTime) { };

    Atlantis.Entity.prototype.draw = function (gameTime, context) { };
})();