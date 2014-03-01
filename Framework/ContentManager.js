/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.ContentManager = (function () {
    /**
      * Create a content manager that manage assets.
      * @constructor
      * @class ContentManager
      * @param {String} rootDirectory The root folder to load assets (default is the current folder).
      */
    var contentManager = function (rootDirectory) {
        this.rootDirectory = rootDirectory || "";
        this.assets = [];
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
    contentManager.prototype.load = function (assetName, callback) {
        var callback = (typeof(callback) === "function") ? callback : function() {};

        if (this.assets[assetName]) {
            callback(this.assets[assetName]);
            return this.assets[assetName];
        }
        else {
            var temp = assetName.split(".");
            var ext = temp[(temp.length - 1)];

            assetName = this.rootDirectory + assetName;
            switch (ext) {
                case "png":
                case "jpg":
                case "bmp":
                    loadImage(this.assets, assetName, callback);
                    break;
                case "mp3":
                case "ogg":
                case "wav":
                    loadAudio(this.assets, assetName, callback);
                    break;
                case "mp4":
                case "ogv":
                    loadVideo(this.assets, assetName, callback);
                case "xml":
                case "json":
                case "js":
                    loadResource(this.assets, assetName, ext, callback);
                    break;
            }

            return this.assets[assetName];
        }
    };

    contentManager.prototype.setRootDirectory = function (rootDirectory) {
        this.rootDirectory = rootDirectory;  
    };

    contentManager.prototype.getRootDirectory = function () {
        return this.rootDirectory;  
    };

    /*
     * Load an image from an url
     */
    function loadImage(assetCollection, imageName, callback) {
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
        assetCollection[imageName] = image;
        return image;
    }

    /*
     * Load a music from an url
     */
    function loadAudio(assetCollection, audioName, callback) {
        var audio = document.createElement("audio");
        audio.onload = callback;
        audio.src = audioName;
        audio.controls = false;
        assetCollection[audioName] = audio;
        return audio;
    }

    /*
     * Load a video from an url
     */
    function loadVideo(assetCollection, videoName, callback) {
        var video = document.createElement("video");
        video.onload = callback;
        video.src = videoName;
        assetCollection[videoName] = video;
        return video;
    }

    /*
     * Load a resource from an url
     */
    function loadResource(assetCollection, resourceUrl, ext, callback) {
        Atlantis.ajax({
            method: "GET",
            url: resourceUrl,
            success: function (response) {
                var result = response;
                if (ext == "json") {
                    result = JSON.parse(response);
                }
                assetCollection[resourceUrl] = result;
                callback(assetCollection[resourceUrl]);   
            }
        });

        return undefined;
    }

    /*
     * Dispose all assets
     * @method dispose
     */
    contentManager.prototype.dispose = function () {
        this.assets.length = 0;
    };

    return contentManager;
})();