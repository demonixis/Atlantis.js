var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.SpriteAnimator = function (length, frameRate) {
        this.rectangles = new Array(length);
        this.framerate = frameRate;

        this.index = 0;
        this.max = length;
        this.elapsedTime = 0;
        this.length = length;
    }

    Atlantis.SpriteAnimator.next = function (elapsedTime) {
        this.elapsedTime += elapsedTime;

        if (this.elapsedTime > this.frameRate) {
            this.index++;
            if (this.index >= this.max) {
                this.index = 0;
            }
            
            if (this.index == 0) {
                Atlantis.notify("sprite.AnimationComplete");
            }

            this.elapsedTime = 0;
        }

        return this.rectangles[this.index];
    }
})();