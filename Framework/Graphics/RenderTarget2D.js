/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis
 */

var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics.RenderTarget2D = (function () {
    var renderTarget = function (width, height) {
        Atlantis.Graphics.Texture2D.call(this, width, height);
    };

    renderTarget.prototype = new Atlantis.Graphics.Texture2D();

    return renderTarget;
})();