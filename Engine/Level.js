/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * An interface for a 2D level.
 * @class Level

 */
Atlantis.Level = function (name) { 
	this.active = false;
	this.name = name || "Level_0";
	this.scene = new Atlantis.SpriteGroup();
	this.camera = new Atlantis.Camera2D(0, 0, Atlantis.screen.width, Atlantis.screen.height);
	this.spriteBatch = new Atlantis.SpriteBatch(Atlantis.app.game.graphicsDevice);
};

Atlantis.Level.prototype.initialize = function () {
	this.scene.initialize();
	this.camera.reset();
};

Atlantis.Level.prototype.update = function (gameTime) {
	this.scene.update(gameTime);
	this.camera.update(gameTime);
};

Atlantis.Level.prototype.draw = function (gameTime) {
	this.spriteBatch.begin();
	this.scene.draw(this.spriteBatch);
	this.spriteBatch.end();
};

Atlantis.Level.prototype.onEnabled = function () {

};

Atlantis.Level.prototype.onDisabled = function () {

};
