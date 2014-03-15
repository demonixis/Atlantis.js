/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * A camera used in a 2D scene to manage scrolling
 * @class Camera2D
 * @constructor
 * @param {Number} x The position on X of the camera.
 * @param {Number} y The position on Y of the camera.
 * @param {Number} width The size of the camera.
 * @param {Number} height The size of the camera.
 */
Atlantis.Camera2D = function (x, y, width, height) {
    this.x = 0;
    this.y = 0;
    this.viewport = new Atlantis.Rectangle(0, 0, width, height);
    this._center = new Atlantis.Vector2(Atlantis.screen.width >> 1, Atlantis.screen.height >> 1);
    this._follow = null;
    
    var that = this;
    document.addEventListener(Atlantis.events.ResolutionChanged, function (event) {
        that._center = new Atlantis.Vector2(Atlantis.screen.width >> 1, Atlantis.screen.height >> 1);
    }, false);
};
 
/**
 * Follow a sprite
 * @method follow
 * @param {Atlantis.Sprite} sprite A sprite to follow.
 */
Atlantis.Camera2D.prototype.follow = function (sprite) {
    this._follow = sprite;
};

/**
 * Gets the position of the sprite on screen relative to the camera position.
 * @method getSpritePosition
 * @return {Object} Return a structure with x and y coordinates.
 */
Atlantis.Camera2D.prototype.getSpritePosition = function () {
    if (this._follow) {
        return { x: this._follow.rectangle.x + this.x, y: this._follow.rectangle.y + this.y };
    }
    return { x: this.x, y: this.y };
};

/**
 * Update the camera position. If a sprite is attached to it, its position is managed by the camera.
 * @method update
 */
Atlantis.Camera2D.prototype.update = function () {   
    if (this._follow) {
        var diffX = (this._follow.rectangle.x - this._follow.lastPosition.x),
            diffY = (this._follow.rectangle.y - this._follow.lastPosition.y),
            targX = this._follow.rectangle.x,
            targY = this._follow.rectangle.y;
        
        if ((this._follow.rectangle.x >= this._center.x) && (this.x < this.viewport.getRight() - Atlantis.screen.width) ||
            (this._follow.rectangle.x <= this._center.x) && (this.x > this.viewport.x)) {
            this.x += diffX;
            targX = this._center.x;
        }
            
        if ((this._follow.rectangle.y >= this._center.y) && (this.y < this.viewport.getBottom() - Atlantis.screen.height) ||
            (this._follow.rectangle.y <= this._center.y) && (this.y > this.viewport.y)) {
            this.y += diffY;
            targY = this._center.y;
        }
        
        this._follow.move(targX, targY); 
    }
    
    if (this.x < this.viewport.x) {
        this.x = this.viewport.x;
    }
    
    else if (this.x + Atlantis.screen.width > this.viewport.getRight()) {
        this.x = this.viewport.getRight() - Atlantis.screen.width;
    }
    
    else if (this.y < this.viewport.y) {
        this.y = this.viewport.y;
    }
    
    if (this.y + Atlantis.screen.height > this.viewport.getBottom()) {
        this.y = this.viewport.getBottom() - Atlantis.screen.height;
    }
};