var PlayState = (function () {
	var playState = function (name) {
	    Atlantis.State.call(this, name);
	    
	    this.backgroundRoad = new Atlantis.Entity({ textureName: "Content/background/backgroundRoad.jpg" });
	    this.scene.add(this.backgroundRoad);

	    this.player = new Player();
	    this.scene.add(this.player);
	};

	playState.prototype = new Atlantis.State();

	playState.prototype.loadContent = function (contentManager) {
		Atlantis.State.prototype.loadContent.call(this, contentManager);

		this.backgroundRoad.setSize(Atlantis.Engine.width, Atlantis.Engine.height);
	};

	playState.prototype.update = function (gameTime) {
	    Atlantis.State.prototype.update.call(this, gameTime);

	    if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.escape]) {
	    	this.stateManager.setStateActive("menu", true);
	    }
	};

	return playState;
})();