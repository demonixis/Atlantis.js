var MenuState = (function () {
	var menu = function (name) {
	    Atlantis.State.call(this, name);
	    
	    this.backgroundMenu = new Atlantis.Entity({ textureName: "Content/background/backgroundMenu.jpg" });
	    this.scene.add(this.backgroundMenu);
	};

	menu.prototype = new Atlantis.State();

	menu.prototype.loadContent = function (contentManager) {
		Atlantis.State.prototype.loadContent.call(this, contentManager);

		this.backgroundMenu.setSize(Atlantis.Engine.width, Atlantis.Engine.height);
	};

	menu.prototype.update = function (gameTime) {
	    Atlantis.State.prototype.update.call(this, gameTime);

	    if (Atlantis.Engine.mouse.click) {
	        this.stateManager.setStateActive("game", true);
	    }
	};

	return menu;
})();