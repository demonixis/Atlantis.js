/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */
var Atlantis = window.Atlantis || {};

Atlantis.KeyboardComponent = (function() {
    var Keys = Atlantis.Keys;

    /**
     * A keyboard component that be used with KeyboardHelper to provide some
     * interesting keyboars states as pressed, justPressed, etc.
     * @class KeyboardComponent
     * @constructor
     * @extends Atlantis.GameComponent
     * @param {Atlantis.Game} game A game instance.
     */
    var keyComponent = function(game) {
        Atlantis.GameComponent.call(this, game);
        this.keysState = game.keyboard.getState();
        this.previousKeysState = null;
    };
    keyComponent.prototype = Object.create(Atlantis.GameComponent.prototype);

    /**
     * Update key states.
     * @method update
     * @param {Atlantis.GameTime} gameTime
     */
    keyComponent.prototype.update = function(gameTime) {
        this.previousKeysState = this.keysState;
        this.keysState = this.game.keyboard.getState();
    };

    /**
     *
     * @method pressed
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.pressed = function(key) {
        return this.keysState.isKeyDown(key);
    };

    /**
     *
     * @method released
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.released = function(key) {
        return this.keysState.isKeyUp(key);
    };

    /**
     *
     * @method justPressed
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.justPressed = function(key) {
        return this.keysState.isKeyUp(key) && this.previousKeysState.isKeyDown(key);
    };

    /**
     *
     * @method justReleased
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.justReleased = function(key) {
        return this.keysState.isKeyDown(key) && this.previousKeysState.isKeyUp(key);
    };

    /**
     *
     * @method up
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.up = function() {
        return this.pressed(Keys.Up);
    };

    /**
     *
     * @method down
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.down = function() {
        return this.pressed(Keys.Down);
    };

    /**
     *
     * @method left
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.left = function() {
        return this.pressed(Keys.Left);
    };

    /**
     *
     * @method right
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.right = function() {
        return this.pressed(Keys.Right);
    };

    /**
     *
     * @method enter
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.enter = function() {
        return this.pressed(Keys.Enter);
    };

    /**
     *
     * @method space
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.space = function() {
        return this.pressed(Keys.Space);
    };

    /**
     *
     * @method escape
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.escape = function() {
        return this.pressed(Keys.Escape);
    };

    /**
     *
     * @method control
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.control = function() {
        return this.pressed(Keys.Control);
    };

    /**
     *
     * @method shift
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.shift = function() {
        return this.pressed(Keys.Shift);
    };

    /**
     *
     * @method tab
     * @param {Atlantis.Keys|Number} key
     * @return {Boolean} Return true if pressed, otherwise return false.
     */
    keyComponent.prototype.tab = function() {
        return this.pressed(Keys.Tab);
    };

    return keyComponent;
})();