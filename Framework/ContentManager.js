/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * Create a content manager that manage _assets.
 * @constructor
 * @class ContentManager
 * @param {String} rootDirectory The root folder to load _assets (default is the current folder).
 */
Atlantis.ContentManager = function(rootDirectory) {
    this.rootDirectory = rootDirectory || "";
    this._assets = {};
    this.preloader = [];
};

Atlantis.ContentManager.PreloadTimerInterval = 250;

/**
 * Start the preloading process by using the `preloader` Array.
 * @method preload
 * @param {Function} progressCallback The callback to call when an asset has been loaded.
 * @param {Function} doneCallback The callback to call when all the assets are loaded.
 */
Atlantis.ContentManager.prototype.preload = function(progressCallback, doneCallback) {
    var countAssets = this.preloader.length,
        nbLoaded = 0;

    progressCallback = (typeof(progressCallback) === "function") ? progressCallback : function() {};
    doneCallback = (typeof(doneCallback) === "function") ? doneCallback : function() {};

    var onLoaded = function(asset) {
        nbLoaded++;
    };

    for (var i = 0; i < countAssets; i++) {
        this.load(this.preloader[i], onLoaded);
    }

    var that = this;
    var progress = {
        status: "Loading",
        progress: 0
    };

    var timer = setInterval(function() {
        progress.progress = (nbLoaded * 100.0) / countAssets;

        if (nbLoaded === countAssets) {
            clearInterval(timer);
            progress.status = "Complete";
            that.preloader.length = 0;
            doneCallback();
        }

        Atlantis.notify(Atlantis.events.ContentPreloading, progress);
        progressCallback(progress);
    }, Atlantis.ContentManager.PreloadTimerInterval);
};

/**
 * Load an asset from the root directory.
 * Supported formats are :
 *      - Images : png, jpg, bmp
 *      - Audio : mp3, ogg, wav
 *      - Video : mp4, ogv
 *      - Data : xml, json, js
 *
 *  The type is define with the file extension.
 *
 * @method load
 * @param {String} assetName The asset name
 * @param {Function} callback A callback function called when the asset is loaded.
 */
Atlantis.ContentManager.prototype.load = function(assetName, callback) {
    callback = (typeof(callback) === "function") ? callback : function() {};

    var temp = assetName.split(".");
    var ext = temp[(temp.length - 1)];
    assetName = this.rootDirectory + assetName;

    if (this._assets[assetName]) {
        callback(this._assets[assetName]);
        return this._assets[assetName];
    } else {
        switch (ext) {
            case "png":
            case "jpg":
            case "bmp":
                this.loadImage(assetName, callback);
                break;
            case "mp3":
            case "ogg":
            case "wav":
                this.loadAudio(assetName, callback);
                break;
            case "mp4":
            case "ogv":
                this.loadVideo(assetName, callback);
                break;
            case "xml":
            case "json":
            case "js":
                this.loadResource(assetName, ext, callback);
                break;
        }

        return this._assets[assetName];
    }
};

/**
 * Load and store an image.
 * @method loadImage
 * @param {String} imageName The path of the image.
 * @param {Function} callback (optional) The callback to call when the image is loaded.
 * @return {Image} Returns the image.
 */
Atlantis.ContentManager.prototype.loadImage = function(imageName, callback) {
    var image = new Image();
    image.onload = function() {
        this.style.position = "absolute";
        this.style.left = "-9999px";

        document.body.appendChild(image);
        document.body.removeChild(image);

        this.style.position = "";
        this.style.left = "";
        callback(this);
    };
    image.src = imageName;
    this._assets[imageName] = image;
    return image;
};

/**
 * Load and store a sound or a music.
 * @method loadAudio
 * @param {String} audioName The path of the media.
 * @param {Function} callback (optional) The callback to call when the media is loaded.
 * @return {HTMLAudioElement} Returns the image.
 */
Atlantis.ContentManager.prototype.loadAudio = function(audioName, callback) {
    var audio = document.createElement("audio");
    audio.src = audioName;
    audio.load();
    audio.controls = false;
    this._assets[audioName] = audio;
    callback(audio);
    return audio;
};


/**
 * Load and store a video.
 * @method loadVideo
 * @param {String} videoName The path of the video.
 * @param {Function} callback (optional) The callback to call when the video is loaded.
 * @return {HTMLVideoElement} Returns the video.
 */
Atlantis.ContentManager.prototype.loadVideo = function(videoName, callback) {
    var video = document.createElement("video");
    video.onload = callback;
    video.src = videoName;
    this._assets[videoName] = video;
    return video;
};

/**
 * Load and store a resources file. If the file's extension is `.json` then it's parsed using `JSON.parse` function.
 * @method loadResource
 * @param {String} resourceUrl The path of the resource file.
 * @param {String} ext The extension of the resource file.
 * @param {Function} callback (optional) The callback to call when the resource file is loaded.
 * @return {HTMLVideoElement} Returns the resource.
 */
Atlantis.ContentManager.prototype.loadResource = function(resourceUrl, ext, callback) {
    var that = this;
    Atlantis.ajax({
        method: "GET",
        url: resourceUrl,
        success: function(response) {
            var result = response;
            if (ext == "json") {
                result = JSON.parse(response);
            }
            that._assets[resourceUrl] = result;
            callback(result);
        }
    });
};

/**
 * Dispose all assets
 * @method dispose
 */
Atlantis.ContentManager.prototype.dispose = function() {
    this._assets.length = 0;
};