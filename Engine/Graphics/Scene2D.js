 /**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/** 
 * The main 2D scene that contains sprites, camera, tilemap
 * @class Scene2D
 * @constructor
 * @extends Atlantis.SpriteGroup
 */
Atlantis.Scene2D = function () {
	Atlantis.SpriteGroup.call(this);
	this.camera = new Atlantis.Camera2D(0, 0, Atlantis.screen.width, Atlantis.screen.height);
	this._tilemap = null;
};

Atlantis.Scene2D.prototype = Object.create(Atlantis.SpriteGroup.prototype);

Atlantis.Scene2D.prototype.add = function (element) {
	if (element instanceof Atlantis.Sprite) {
		Atlantis.SpriteGroup.prototype.add.call(this, element);
	}
	else if (element instanceof Atlantis.Camera2D) {
		this.camera = element;
	}
	else if (element instanceof Atlantis.Tilemap) {
		this._tilemap = element;

		if (this._tilemap.loaded) {
			this.camera.viewport.set(0, 0, this._tilemap.mapWidth, this._tilemap.mapHeight);
		}
	}
};

Atlantis.Scene2D.prototype.remove = function (element) {
	if (element instanceof Atlantis.Sprite || typeof(element) === "number") {
		Atlantis.SpriteGroup.prototype.remove.call(this, element);
	}
	else if (element instanceof Atlantis._tilemap) {
		this._tilemap = null;
	}
};

Atlantis.Scene2D.prototype.postUpdate = function () {
	if (this.enabled) {
		this.camera.update();
		
		if (this.tilemap) {
			this.tilemap.update(this.camera);
		}
	}
};

Atlantis.Scene2D.prototype.draw = function (spriteBatch) {
	if (this.visible) {
		Atlantis.SpriteGroup.prototype.draw.call(this, spriteBatch);

		if (this._tilemap) {
			this._tilemap.draw(spriteBatch, this.camera);
		}
	}
};
