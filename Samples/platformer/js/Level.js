var Level = function (id) {
	Atlantis.Sprite.call(this);

	this.levelId = id;
	this.layers = [];
	this.startPosition = new Atlantis.Vector2();
	this.blocks = [];
	this.blockSize = 0;
	this.items = [];
	this.itemsSize = 0;
	this.monsters = [];
	this.monstersSize = 0;
	this.loaded = false;
	this.width = 0;
	this.height = 0;
};

Level.prototype = new Atlantis.Sprite();

Level.prototype.loadLevel = function (content, scene, callback) {
	if (!this.loaded) {
		var that = this;
		Atlantis.ajax({
			method: "GET",
			url: "Content/levels/level_" + this.levelId + ".json",
			success: function (response) {
				var json = JSON.parse(response);
        
				// 1 - Create and add background and layers
				var layerId = json.layerId;
				that.layers[0] = new Atlantis.Sprite(["img/Backgrounds/Layer0_", layerId, ".png"].join(""));
				that.layers[1] = new Atlantis.Sprite(["img/Backgrounds/Layer1_", layerId, ".png"].join(""));
				that.layers[2] = new Atlantis.Sprite(["img/Backgrounds/Layer2_", layerId, ".png"].join(""));
			
				for (var i in that.layers) {
					that.layers[i].loadContent(content);
					scene.add(that.layers[i]);
				}

				var jsonLevel = json.level;
				var assetName = "";
				var row = [];
				var sprite = null;

				for (var y = 0, ly = jsonLevel.length; y < ly; y++) {
					row = jsonLevel[y];
					
					for (var x = 0, lx = row.length; x < lx; x++) {
						var id = row[x];
						assetName = "";
						
						// Start position of the player
						if (id == 1) {
							that.startPosition.x = x;
                            that.startPosition.y = y;
						}
						// Blocks and items case
						else if (id >= 2 && id <= 4) {
							assetName = getAssetName(id);
							sprite = new Atlantis.Sprite(["img/Tiles/", assetName, ".png"].join(""));
							sprite.loadContent(content);
							sprite.move(x * 40, y * 32);
							scene.add(sprite);
						
							if (id == 2) {
								sprite.setName("exit");
								that.items.push(sprite);
							}
							else {
								sprite.setName("block");
								that.blocks.push(sprite);
							}
						}
						else if (id == 5 || id == 6) { 
							sprite = new Gem(id);
							sprite.loadContent(content);
							sprite.move(x * 40, y * 32);
							scene.add(sprite);
							that.items.push(sprite);
						}
						// Monsters case
						else if (id > 7 && id < 11) { continue;
							assetName = getAssetName(id);
							sprite = new Monster(id);
							sprite.loadContent(content);
							sprite.setStartPosition(x, y);
							that.monsters.push(sprite);
							scene.add(sprite);
						}
					}
				}

				that.blocksSize = that.blocks.length;
				that.itemsSize = that.items.length;
				that.monstersSize = that.monsters.length;
			
				//Monster.setBlocks(that.blocks);
				that.loaded = true;
				callback();
			}
		});
	}
};

Level.prototype.reload = function (content, scene, levelId, callback) {
	this.scene.clear();
	this.levelId = levelId;
	this.loaded = false;
	this.loadLevel(content, scene, callback);
};

function getAssetName (id) {
	var assetName = "";
	switch (id) {
		case 2: assetName = "Exit"; break;
		case 3: assetName = getRandomBlockName(); break;
		case 4: assetName = "Platform"; break;
		case 5: assetName = "Gem"; break;
		case 6: assetName = "YellowGem"; break;
		case 7: assetName = "MonsterA"; break;
		case 8: assetName = "MonsterB"; break;
		case 9: assetName = "MonsterC" ;break;
		case 10: assetName = "MonsterD"; break;
	}
	return assetName;
};

Level.prototype.getStartPosition = function () {
    return this.startPosition;
};

function getRandomBlockName () {
	return "BlockA" + getRandomInt(0, 6);
};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




