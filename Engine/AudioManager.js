var Atlantis = window.Atlantis || {};
Atlantis.MusicState = Atlantis.MusicState || {};

Atlantis.AudioManager = (function () {
    Atlantis.MusicState.PLAYING = 1;
    Atlantis.MusicState.STOPPED = 2;
    Atlantis.MusicState.PAUSED = 3;

    var audioManager = function () {
        this.repeatMusic = false;
        this.currentMusic = null;
        this.volume = 1;
        this.currentState = Atlantis.MusicState.STOPPED;
    };

    audioManager.prototype.playMusic = function (music, repeat) {
        this.stopMusic();
        this.currentMusic = music;
        this.repeat = repeat;
        this.currentMusic.play();
        this.currentState = Atlantis.MusicState.PLAYING;
    };

    audioManager.prototype.stopMusic = function () {
        this.currentState = Atlantis.MusicState.STOPPED;
    };

    audioManager.prototype.pauseMusic = function () {
        if (this.currentMusic != null && this.currentState == Atlantis.MusicState.PLAYING) {
            this.currentMusic.pause();
            this.currentState = Atlantis.MusicState.PAUSED;
        }
    };

    audioManager.prototype.playSound = function (sound) {

    };

    return audioManager;
})();