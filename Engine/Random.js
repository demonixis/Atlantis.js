/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Engine
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};

/**
 * An helper to generate random value for some types.
 * @class Random
 * @static
 */
Atlantis.Random = {
	/**
	 * Gets a random value.
	 * @method value
	 * @return {Number} Return a random value.
	 */
	value: function () {
		return Math.random();
	},

	/**
	 * Gets a random float between min and max.
	 * @method randomFloat
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {Number} Return a random value between min and max.
	 */
	randomFloat: function (min, max) {
		return Math.random() * (max - min) + min;
	},

	/**
	 * Gets a random integer between min and max.
	 * @method randomFloat
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {Number} Return a random value between min and max.
	 */
	randomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * Gets a random Vector2 between min and max.
	 * @method vector2
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {Atlantis.Vector2} Return a random Vector2 between min and max.
	 */
	vector2: function (min, max) {
		return new Atlantis.Vector2(this.randomFloat(min, max), this.randomFloat(min, max));
	},

	/**
	 * Gets a random Vector3 between min and max.
	 * @method vector3
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {Atlantis.Vector3} Return a random vector3 between min and max.
	 */
	vector3: function (min, max) {
		return new Atlantis.Vector3(this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max));
	},

	/**
	 * Gets a random vector4 between min and max.
	 * @method vector4
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {Atlantis.Vector4} Return a random vector4 between min and max.
	 */
	vector4: function (min, max) {
		return new Atlantis.Vector4(this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max), this.randomFloat(min, max));
	},

	/**
	 * Gets a random float between min and max.
	 * @method color
	 * @param {Number} min The minimum value.
	 * @param {Number} max The maximum value.
	 * @return {String} Return a random color in hexadecimal format.
	 */
	color: function () {
		return ("#" + (Math.floor(Math.random() * 16777215).toString(16)));
	}
};