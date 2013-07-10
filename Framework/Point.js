/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

 var Atlantis = Atlantis || {};

/**
 * A class that represent a point structure
 */
 Atlantis.Point = (function () {
     /**
     * Create a point structure.
     * @constructor
     * @class Point
     * @param {Number} x A value for X coordinate.
     * @param {Number} y A value for Y coordinate.
     */
     var point = function (x, y) {
         if (x instanceof Atlantis.Point) {
             this.x = x.x;
             this.y = x.y;
         }
         else {
             this.x = x || 0;
             this.y = y || 0;
         }
     };

     /**
      * Gets a string from this object.
      * @method toString
      * @return {String}
      */
     point.prototype.toString = function () {
         return ["x: ", this.x, " y: ", this.y].join("");
     };

     return point;
 })();