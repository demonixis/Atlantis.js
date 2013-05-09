var CarGame = (function () {
	var carGame = function () {
	    Atlantis.GameApplication.call(this, 240, 400);
	    this.stateManager.add(new MenuState("menu"), true);
	    this.stateManager.add(new PlayState("game"), false);
	};

	carGame.prototype = new Atlantis.GameApplication();

	return carGame;
})();