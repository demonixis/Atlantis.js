var MenuState = (function () {
	var menu = function (name) {
	    Atlantis.State.call(this, name);
	    
	    var backgroundMenu = new Atlantis.Entity({ textureName: "Content/background/backgroundMenu.jpg" });
	    this.scene.add(backgroundMenu);
	};

	menu.prototype = new Atlantis.State();

	menu.prototype.update = function (gameTime) {
	    Atlantis.State.prototype.update.call(this, gameTime);

	    if (Atlantis.Engine.mouse.click) {
	        this.stateManager.setStateActive("game", true);
	    }
	};

	return menu;
})();