var LevelCount = 4;
var GameMode = { Playing: 0, Died: 1, Lose: 2, Win: 3 }; 

var GameState = function (name, levelStart) {
	Atlantis.State.call(this, name);
	this.levelId = levelStart;
	this.overlays = [];
	this.level = new Level(this.levelId);
	this.player = new Player();
	this.scoreCounter = new Atlantis.SpriteFont();
	this.timeCounter = new Atlantis.SpriteFont();
};

GameState.prototype = new Atlantis.State();

GameState.prototype.initialize = function () {
	Atlantis.State.prototype.initialize.call(this);

	this.playerScore = 0;
	this.elapsedTime = 0;
	this.timeRemaining = 250;

	for (var overlay in this.overlays) {
		overlay.enabled = false;
	}

	this.player.reset();
	this.gameMode = GameMode.Playing; 
};

GameState.prototype.loadContent = function (content) {
    Atlantis.State.prototype.loadContent.call(this, content);
    
    this.level.loadContent(content, this.scene);
    this.player.setStartPosition(this.level.getStartPosition());
    this.scene.add(this.player);

    for (var overlay in this.overlays) {
    	overlay.loadContent(content);
    	overlay.setPosition(Atlantis.Engine.Width / 2 - overlay.width / 2, Atlantis.Engine.Height / 2 - overlay.height / 2);
    	overlay.enabled = false;
    	this.scene.add(overlay);
    }
};


GameState.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);
    
};

GameState.prototype.draw = function (gameTime) {
	Atlantis.State.prototype.draw.call(this, gameTime);
};

GameState.prototype.restartGameState = function () {
	if (this.gameMode == GameMode.Win) {
		this.levelId++;
		this.levelId = (this.levelId >= LevelCount) ? 0 : this.levelId;
	}

	this.level.reload(Atlantis.Engine.Content, this.scene, this.levelId);
	this.player.setStartPosition(this.level.getStartPosition());
	this.scene.add(this.player);
	this.initialize();
};