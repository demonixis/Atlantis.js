/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Vector4 = (function () {
    /**
     * A vector4 class.
     * @constructor
     * @class Vector4
     * @param {Number|Atlantis.Vector4} Value for x coordinate or a Vector4 object.
     * @param {Number} Value for y coordinate
     * @param {Number} Value for z coordinate.
     * @param {Number} Value for w coordinate.
     */
    var vector = function (x, y, z, w) {
        if (x instanceof Atlantis.Vector4) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    };
})();