var Atlantis = window.Atlantis || {};

(function () {
    Atlantis.Tile = function (id, width, height) {
        this.id = id;
        this.width = width;
        this.height = height;  
    };

    Atlantis.Layer = function (textureName, tileConfiguration) {
        this.textureName = textureName;
        this.tiles = [];
    };

    Atlantis.Layer.prototype.draw = function (gameTime, context, camera) {
        var sx = map[y][x] % tile.numOnX;
        var sy = Math.floor(map[y][x] / tile.numOnX);

        if (sy > 0) {
            sx = sx % (tile.numOnX * sy);
        }
        else {
            sx = sx % tile.numOnX; 
        }
        sx *= tile.width;
        sy *= tile.height;
        context.drawImage(tilemap, sx, sy, tile.width, tile.height, x * tile.width, y * tile.height, tile.width, tile.height);
    };
})();