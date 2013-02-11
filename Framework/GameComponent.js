var Atlantis = window.Atlantis || {};

(function() {
    /**
     * Interface for a GameComponent
     */
    Atlantis.GameComponent = function (game) { 
        this.game = game;
    };

    // Initialization of component
    Atlantis.GameComponent.prototype.initialize = function () { };
    
    // Update logic
    Atlantis.GameComponent.prototype.update = function (gameTime) { };

    /**
     * Interface for a DrawableGameComponent
     */
    Atlantis.DrawableGameComponent = function (game) {
        Atlantis.GameComponent.call(this, game);
    };

    Atlantis.DrawableGameComponent.prototype = new Atlantis.GameComponent();
    
    // Draw graphics on screen
    Atlantis.GameComponent.prototype.draw = function (gameTime, context) { };

    /**
     * GameComponent collection
     */
    Atlantis.GameComponentCollection = function () {
        this.components = [];
    };

    /**
     * Add a component to the collection
     */
    Atlantis.GameComponentCollection.prototype.add = function (gameComponent) {
        if (this.components.indexOf(gameComponent) == -1) {
            this.components.push(gameComponent);
        }
    };

    /**
     * Get a component from the collection
     */
    Atlantis.GameComponentCollection.prototype.get = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            return this.components[index];
        }

        return null;
    };

    /**
     * Remove a component from the collection
     */
    Atlantis.GameComponentCollection.prototype.remove = function (gameComponent) {
        var index = this.components.indexOf(gameComponent);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    };

    /**
     * Load assets
     */
    Atlantis.GameComponentCollection.prototype.loadContent = function (content) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].loadContent(content);
        }
    };

    /**
     * Update all components 
     */
    Atlantis.GameComponentCollection.prototype.update = function (gameTime) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            this.components[i].update(gameTime);
        }  
    };

    /**
     * Draw all components
     */
    Atlantis.GameComponentCollection.prototype.draw = function (gameTime, context) {
        for (var i = 0, l = this.components.length; i < l; i++) {
            if (this.components[i] instanceof Atlantis.DrawableGameComponent) {
                this.components[i].draw(gameTime, context);
            }
        }   
    };
})();