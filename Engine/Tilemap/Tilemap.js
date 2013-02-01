var Atlantis = window.Atlantis || {};

(function () {
    Atlantis.Tilemap = function (layers) {
        this.layers = [];
        this.camera = new Atlantis.Rectangle();

        if (layers instanceof Array) {
            for (var i = 0, l = layers.length; i < l; i++) {
                this.layers.push(layers[i]);
            }
        } 
        else {
            this.layers.push(layers);
        }
    };

    Atlantis.Tilemap.prototype.loadContent = function (content) {
        for (var i = 0, l = this.layers.length; i < l; i++) {
            this.layers[i].loadContent(content);  
        }
    };

    Atlantis.Tilemap.prototype.draw = function (gameTime, context) {
        if (this.visible) {
            for (var i = 0, l = this.layers.length; i < l; i++) {
                this.layers[i].draw(gameTime, context, this.camera);  
            }
        }
    };
})();