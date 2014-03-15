var LevelCount = 4;
var GameMode = { 
    Playing: 0, 
    Died: 1, 
    Lose: 2, 
    Win: 3,
    getName: function (mode) {
        if (mode == 0) { return "Playing"; }
        else if (mode == 1) { return "Died"; }
        else if (mode == 2) { return "Lose"; }
        return "Win";
    } 
}; 

var GameState = function (name, levelStart) {
    Atlantis.State.call(this, name);
    this.levelId = levelStart;
    this.overlays = [
        new Atlantis.Sprite("overlays/you_died.png"),
        new Atlantis.Sprite("overlays/you_lose.png"),
        new Atlantis.Sprite("overlays/you_win.png")
    ];
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

    for (var i in this.overlays) {
        this.overlays[i].setActive(false);
    }

    this.player.reset();
    this.gameMode = GameMode.Playing; 
};

GameState.prototype.loadContent = function (content) {
    Atlantis.State.prototype.loadContent.call(this, content);

    var that = this;
    this.level.loadLevel(content, this.scene, function () {
        that.player.setStartPosition(that.level.startPosition);
        that.player.loadContent(content);
        that.scene.add(that.player);

        for (var i in that.overlays) {
            that.overlays[i].loadContent(content);
            that.overlays[i].move(Atlantis.screen.width / 2 - that.overlays[i].getWidth() / 2, Atlantis.screen.height / 2 - that.overlays[i].getHeight() / 2);
            that.overlays[i].enabled = false;
            that.scene.add(that.overlays[i]);
        }
    });
};


GameState.prototype.update = function (gameTime) {
    Atlantis.State.prototype.update.call(this, gameTime);
    var tempSearchSprite = null;

    if (this.gameMode == GameMode.Playing) { return;
        this.elapsedTime += gameTime.getElapsedTime();
        if (this.elapsedTime >= 1000) {
            this.timeRemaining--;
            this.elapsedTime = 0;
        }

        for (var i = 0; i < this.level.items.length; i++) {
            tempSearchSprite = this.level.items[i];

            if (tempSearchSprite.isActive() && this.player.getBoundingRect().contains(tempSearchSprite.getBoundingRect())) {
                if (tempSearchSprite.getName() == "exit") {
                    if (!this.overlays[2].isActive()) {
                        this.overlays[2].setActive(true);
                        this.gameMode = GameMode.Win;
                    }
                }
                else {
                    tempSearchSprite.setActive(false);
                    this.playerScore += tempSearchSprite.getPoints();
                }
            }
        }

        this.player.updatePhysics(this.level.blocksSize, this.level.blocks);

        if (this.player.getY() > Atlantis.screen.height) {
            if (!this.overlays[1].isActive()) {
                this.overlays[1].setActive(true);	
            }
            this.gameMode = GameMode.Lose;
            this.player.die(GameMode.getName(this.gameMode));
        }
    } 
    else {
        if (this.gameMode == GameMode.Win) {
            this.player.win();
        }

        if (Atlantis.input.keys.pressed(Keys.Space)) {
            this.restartGameState();
        }
    }
};

GameState.prototype.draw = function (gameTime) {
    Atlantis.State.prototype.draw.call(this, gameTime);

    // Draw score
};

GameState.prototype.restartGameState = function () {
    if (this.gameMode == GameMode.Win) {
        this.levelId++;
        this.levelId = (this.levelId >= LevelCount) ? 0 : this.levelId;
    }

    this.level.reload(Atlantis.Application.Content, this.scene, this.levelId);
    this.player.setStartPosition(this.level.getStartPosition());
    this.scene.add(this.player);
    this.initialize();
};