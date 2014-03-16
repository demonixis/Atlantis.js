/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

Atlantis.Random = {
	value: function () {
		return Math.random();
	},
	randomFloat: function (min, max) {
		return Math.random() * (max - min) + min;
	},
	randomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	vector2: function (min, max) {
		return new Atlantis.Vector2(this.randomFloat(min, max), this.randomFloat(min, max));
	},
	vector3: function (min, max) {
		return new Atlantis.Vector3(this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max));
	},
	vector4: function (min, max) {
		return new Atlantis.Vector4(this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max));
	},
	color: function () {
		return ("#" + (Math.floor(Math.random() * 16777215).toString(16)));
	}
};