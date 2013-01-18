var Atlantis = window.Atlantis || {};
Atlantis.MusicState = Atlantis.MusicState || {};

(function () {
    Atlantis.MusicState.PLAYING = 1;
    Atlantis.MusicState.STOPPED = 2;
    Atlantis.MusicState.PAUSED = 3;

    Atlantis.AudioManager = function () {
        this.repeatMusic = false;
        this.currentMusic = null;
        this.volume = 1;
        this.currentState = Atlantis.MusicState.STOPPED;
    };

    Atlantis.AudioManager.prototype.playMusic = function (music, repeat) {
        this.stopMusic();
        this.currentMusic = music;
        this.repeat = repeat;
        this.currentMusic.play();
    };

    Atlantis.AudioManager.prototype.stopMusic = function () {

    };

    Atlantis.AudioManager.prototype.pauseMusic = function () {
        if (this.currentMusic != null && this.currentState == Atlantis.MusicState.PLAYING) {
            this.currentMusic.pause();
        }
    };

    Atlantis.AudioManager.prototype.playSound = function (sound) {

    };
})();