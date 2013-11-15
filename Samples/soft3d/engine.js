var SoftEngineGame = function () {
    Atlantis.Game.call(this, null, null, document.getElementById("container"));
};

SoftEngineGame.prototype = new Atlantis.Game();


SoftEngineGame.prototype.initialize = function () {
    Atlantis.Game.prototype.initialize.call(this);
    
};


SoftEngineGame.prototype.draw = function (gameTime) {
    Atlantis.Game.prototype.update.call(this, gameTime);
    
};

SoftEngineGame.prototype.draw = function (gameTime, context) {
    Atlantis.Game.prototype.draw.call(this, gameTime, context);
    
};