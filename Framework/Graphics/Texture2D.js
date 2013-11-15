/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics.Texture2D = (function () {
    /**
    * Define a drawable texture.
    * @class Texture2D
    * @constructor
    */
    var texture = function (width, height, format) {
        this.textureData = [];
    };


    return texture;
})();