 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.MusicState = {};

Atlantis.AudioManager = (function () {
    Atlantis.MusicState.PLAYING = 1;
    Atlantis.MusicState.STOPPED = 2;
    Atlantis.MusicState.PAUSED = 3;

    /**
      * An audio manager to play sound and musics.
      * @constructor 
      * @class AudioManager
      */
    var audioManager = function () {
        this.repeatMusic = false;
        this.currentMusic = null;
        this.volume = 1;
        this.currentState = Atlantis.MusicState.STOPPED;
    };

    /**
     * Play a music.
     * @method playMusic
     * @param {AudioElement} music An HTML Audio Element that contains the music.
     * @param {Boolean} repeat Sets to true for enable repeat.
     */
    audioManager.prototype.playMusic = function (music, repeat) {
        this.stopMusic();
        this.currentMusic = music;
        this.repeat = repeat;
        this.currentMusic.play();
        this.currentState = Atlantis.MusicState.PLAYING;
    };

    /**
     * Stop the current played music.
     * @method stopMusic
     */
    audioManager.prototype.stopMusic = function () {
        this.currentState = Atlantis.MusicState.STOPPED;
    };

    /**
     * Pause the current played music.
     * @method pauseMusic
     */
    audioManager.prototype.pauseMusic = function () {
        if (this.currentMusic != null && this.currentState == Atlantis.MusicState.PLAYING) {
            this.currentMusic.pause();
            this.currentState = Atlantis.MusicState.PAUSED;
        }
    };

    return audioManager;
})();