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
Atlantis.ContentManager = function (rootDirectory) {
    this.rootDirectory = rootDirectory || "";
    this._assets = {};
    this.preloader = [];
};

Atlantis.ContentManager.PreloadTimerInterval = 250;

Atlantis.ContentManager.prototype.preload = function (progressCallback, doneCallback) {
    var countAssets = this.preloader.length,
        nbLoaded = 0;

    var progressCallback = (typeof(progressCallback) === "function") ? progressCallback : function () {};
    var doneCallback = (typeof(doneCallback) === "function") ? doneCallback : function () {};
    var onLoaded = function (asset) { nbLoaded++; };

    for (var i = 0; i < countAssets; i++) {
        this.load(this.preloader[i], onLoaded);
    }

    var that = this;
    var progress = { status: "Loading", progress: 0 };

    var timer = setInterval(function () {
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
Atlantis.ContentManager.prototype.load = function (assetName, callback) {
    var callback = (typeof(callback) === "function") ? callback : function() {};

    var temp = assetName.split(".");
    var ext = temp[(temp.length - 1)];
    assetName = this.rootDirectory + assetName;

    if (this._assets[assetName]) { 
        callback(this._assets[assetName]);
        return this._assets[assetName];
    }
    else {
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
            case "xml":
            case "json":
            case "js":
                this.loadResource(assetName, ext, callback);
                break;
        }

        return this._assets[assetName];
    }
};

// Load an image from an url
Atlantis.ContentManager.prototype.loadImage = function (imageName, callback) {
    var image = new Image();
    image.onload = function () {
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

// Load a music from an url
Atlantis.ContentManager.prototype.loadAudio = function (audioName, callback) {
    var audio = document.createElement("audio");
    audio.onload = callback;
    audio.src = audioName;
    audio.controls = false;
    this._assets[audioName] = audio;
    return audio;
};


// Load a video from an url
Atlantis.ContentManager.prototype.loadVideo = function (videoName, callback) {
    var video = document.createElement("video");
    video.onload = callback;
    video.src = videoName;
    this._assets[videoName] = video;
    return video;
};

// Load a resource from an url
Atlantis.ContentManager.prototype.loadResource = function (resourceUrl, ext, callback) {
    var that = this;
    Atlantis.ajax({
        method: "GET",
        url: resourceUrl,
        success: function (response) {
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
 * Dispose all _assets
 * @method dispose
 */
Atlantis.ContentManager.prototype.dispose = function () {
    this._assets.length = 0;
};