// 
// THE MAIN GAME CLASS
//
var Game = function () {
    Atlantis.Game.call(this, 320, 540);

    this.initialize();

    var music = this.content.load("Content/DST-DasElectron.mp3");
    music.play();

    var background = new Background(this);
    this.components.add(background);

    var player = new Player(this);
    this.components.add(player);

    var enemies = [];
    var enemiesToRemove = [];
    var canSpawn = true;
    var spawnInterval = null;

    this.spawnNewEnemy = function (x, y) {
        enemies.push(new Enemy(this, x, y, Math.random() * 3));
        canSpawn = false;
        spawnInterval = setInterval(function (t) {
            canSpawn = true;
            clearInterval(spawnInterval);
        }, 3000);
    };

    // Override the base method
    this.update = function (gameTime) {
        Atlantis.Game.prototype.update.call(this, gameTime);

        if (canSpawn) {
            this.spawnNewEnemy(Math.random() * this.width, 0);
        }

        for (var i = 0, l = enemies.length; i < l; i++) {
            if (enemies[i].enabled) {
                enemies[i].update(gameTime);

                // Test if a laser collide with an enemy
                for (var j = 0, k = player.ammos.length; j < k; j++) {
                    if (enemies[i].rectangle.intersects(player.ammos[j].rectangle)) {
                        enemies[i].enabled = false;
                        player.ammos[j].enabled = false;
                        Atlantis.notify("scoreChanged", { score: 15 });
                    }
                }
            }
        }
    };

    this.draw = function (gameTime, context) {
        Atlantis.Game.prototype.draw.call(this, gameTime, context);

        for (var i = 0, l = enemies.length; i < l; i++) {
            if (enemies[i].enabled) {
                enemies[i].draw(gameTime, context);
            }
        }
    };
};

Game.prototype = new Atlantis.Game();