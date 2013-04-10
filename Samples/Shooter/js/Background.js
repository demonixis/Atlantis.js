// 
// -- DEFINE THE SCROLLING BACKGROUND AND GUI
//
var Background = function (game) {
    Atlantis.DrawableGameComponent.call(this);

    // Define a star entity
    var StarEntity = function (x, y, size, color) {

        var position = { x: x, y: y };
        this.speed = 0.55;

        this.update = function (gameTime) {
            if (position.y > game.height) {
                position.y = 0;
            }

            position.y += gameTime.getElapsedTime() * this.speed;
        };

        this.draw = function (gameTime, context) {
            Atlantis.Graphics.drawCircle(context, position.x, position.y, size, color);
        };
    };

    var stars = [];
    var nbStars = 50;
    var score = 0;

    for (var i = 0; i < nbStars; i++) {
        stars.push(new StarEntity(Math.random() * game.width, Math.random() * game.height, Math.random() * 2, (Math.random() * 3) > 1 ? "#F8FF75" : "#9A7EB5"));
    }

    document.addEventListener("scoreChanged", function (event) {
        score += event.score;
    }, false);

    this.changeSpeed = function (value) {
        for (var i = 0; i < nbStars; i++) {
            stars[i].speed = value;
        }
    }

    // Update all stars
    this.update = function (gameTime) {
        for (var i = 0; i < nbStars; i++) {
            stars[i].update(gameTime);
        }

        if (game.keyboard.keys[Atlantis.Keys.up]) {
            this.changeSpeed(450);
        }
        else if (game.keyboard.keys[Atlantis.Keys.down]) {
            this.changeSpeed(75);
        }
        else {
            this.changeSpeed(100);
        }
    };

    // Draw all stars
    this.draw = function (gameTime, context) {
        for (var i = 0; i < nbStars; i++) {
            stars[i].draw(gameTime, context);
        }

        Atlantis.Graphics.drawText(context, "Player 1 - " + score + " points", 140, 30, { color: "#ccc", size: 20 });
    };
};

Background.prototype = new Atlantis.DrawableGameComponent();