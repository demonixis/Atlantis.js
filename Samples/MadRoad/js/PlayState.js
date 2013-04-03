var PlayState = (function () {
	var playState = function (name) {
	    Atlantis.State.call(this, name);
	    
	    var backgroundMenu = new Atlantis.Entity({ textureName: "Content/background/backgroundRoad.jpg" });
	    this.scene.add(backgroundMenu);

	    this.player = new Player();
	    this.scene.add(this.player);
	};

	playState.prototype = new Atlantis.State();

	playState.prototype.update = function (gameTime) {
	    Atlantis.State.prototype.update.call(this, gameTime);

	    if (Atlantis.Engine.keyboard.keys[Atlantis.Keys.escape]) {
	    	this.stateManager.setStateActive("menu", true);
	    }
	};

	return playState;
})();