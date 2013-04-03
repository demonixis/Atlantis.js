var CarGame = (function () {
	var carGame = function () {
	    Atlantis.Engine.call(this, 480, 800);
	    this.stateManager.add(new MenuState("menu"), true);
	    this.stateManager.add(new PlayState("game"), false);
	};

	carGame.prototype = new Atlantis.Engine();

	return carGame;
})();