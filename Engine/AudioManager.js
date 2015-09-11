/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Define a music status
 * @class MusicState
 * @static
 */
Atlantis.MusicState = {
    Playing: 1,
    Stopped: 2,
    Paused: 3
};

/**
 * An audio manager to play sound and musics.
 * @constructor 
 * @class AudioManager
 */
Atlantis.AudioManager = function() {
    this.repeatMusic = false;
    this.currentMusic = null;
    this.volume = 1;
    this.currentState = Atlantis.MusicState.STOPPED;
};

/**
 * Play a sound or a music one time
 * @method playOneShot
 */
Atlantis.AudioManager.prototype.playOneShot = function(audioClip) {
    audioClip.play();
};

/**
 * Play a music.
 * @method playMusic
 * @param {AudioElement} music An HTML Audio Element that contains the music.
 * @param {Boolean} repeat Sets to true for enable repeat.
 */
Atlantis.AudioManager.prototype.play = function(music, repeat) {
    this.stopMusic();
    this.currentMusic = music;
    this.repeat = repeat;
    this.currentMusic.play();
    this.currentState = Atlantis.MusicState.Playing;
};

/**
 * Stop the current played music.
 * @method stopMusic
 */
Atlantis.AudioManager.prototype.stop = function() {
    this.currentMusic.stop();
    this.currentState = Atlantis.MusicState.Stopped;
};

/**
 * Pause the current played music.
 * @method pauseMusic
 */
Atlantis.AudioManager.prototype.pause = function() {
    if (this.currentState == Atlantis.MusicState.Playing) {
        this.currentMusic.pause();
        this.currentState = Atlantis.MusicState.Paused;
    }
};

/**
 * Resume a paused music.
 * @method resume
 */
Atlantis.AudioManager.prototype.resume = function() {
    if (this.currentState == Atlantis.MusicState.Paused) {
        this.currentMusic.play();
        this.currentState = Atlantis.MusicState.Playing;
    }
};