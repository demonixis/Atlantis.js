var Atlantis = window.Atlantis || {};

(function() {
    // Interface for a GameComponent
    Atlantis.GameComponent = function (game) { 
        this.game = game;
    };

    Atlantis.GameComponent.prototype.initialize = function () { };
    Atlantis.GameComponent.prototype.update = function (gameTime) { };

    // Interface for a DrawableGameComponent
    Atlantis.DrawableGameComponent = function (game) {
        Atlantis.GameComponent.call(this, game);
    };
    Atlantis.DrawableGameComponent.prototype = new Atlantis.GameComponent();
    Atlantis.GameComponent.prototype.draw = function (gameTime, context) { };

    // GameComponent collection
        Atlantis.GameComponentCollection = function () {
        this.components = [];
    };

    Atlantis.GameComponentCollection.prototype.add = function (gameComponent) {
        if (this.components.indexOf(gameComponent) == -1) {
            this.components.push(gameComponent);
        }
    };

    Atlantis.GameComponentCollection.prototype.get = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            return this.components[index];
        }

        return null;
    };

    Atlantis.GameComponentCollection.prototype.remove = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    };

    Atlantis.GameComponentCollection.prototype.update = function (gameTime) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].update(gameTime);
        }  
    };

    Atlantis.GameComponentCollection.prototype.draw = function (gameTime, canvasContext) {
        var drawableGameComponents = getDrawableGameComponents(this.components);

        for (var i = 0, l = drawableGameComponents.length; i < l; i++) {
            drawableGameComponents[i].draw(gameTime, canvasContext);
        }  
    };

    function getDrawableGameComponents(collection) {
       var drawableGameComponents = [];

       for (var i = 0, l = collection.length; i < l; i++) {
           if (collection[i] instanceof Atlantis.DrawableGameComponent) {
               drawableGameComponents.push(collection[i]);
           }
       }

       return drawableGameComponents;
    }
})();