var Atlantis = window.Atlantis || {};

(function () {
    Atlantis.Tile = function (id, width, height) {
        this.id = id;
        this.width = width;
        this.height = height;  
    };

    Atlantis.Layer = function (textureName, tiles, params) {
        this.textureName = textureName;
		this.width = tiles[0].length;
		this.height = tiles.length;
		this.tiles = tiles;
		this.tileWidth = params.tileWidth || 32;
		this.tileHeight = params.tileHeight || 32;
		this.offsetX = params.offsetX || 0;
		this.offsetY = params.offsetY || 0;
		this.mapWidth = params.mapWidth || 192;
		this.mapHeigh = params.mapHeight || 192;
		this.numOnX = params.mapWidth / this.tileWidth;
		this.rectangle = new Atlantis.Rectangle(this.offsetX, this.offsetY, this.width * this.tileWidth, this.height * this.tileHeight);
    };

    Atlantis.Layer.prototype.draw = function (gameTime, context, camera) {
        var sx = 0, sy = 0;
		for (var y = 0; y < this.tiles.length; y++) {
			for (var x = 0; x < this.tiles[0].length; x++) {
				
				var sx  this.tiles[y][x] % this.numOnX;
                var sy = Math.floor(this.tiles[y][x] / this.numOnX);

                if (sy > 0) {
                    sx = sx % (this.numOnX * sy);
                }
                else {
                    sx = sx % this.numOnX; 
                }
				sx *= tile.width;
				sy *= tile.height;
				
				context.drawImage(this.texture, sx, sy, this.tileWidth, this.tileHeight, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
			}
		}
    };
})();