/**
 * The graphics device. It's responsible to draw 3D object on screen. 
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.ScanLineData = function () {
    this.y = 0;
    this.nDotLa = 0;
    this.nDotLb = 0;
    this.nDotLc = 0;
    this.nDotLd = 0;
    this.UA = 0;
    this.UB = 0;
    this.UC = 0;
    this.UD = 0;
    this.VA = 0;
    this.VB = 0;
    this.VC = 0;
    this.VD = 0;
};

Atlantis.Graphics3D.Renderer = (function () {
    var renderer = function (backBufferWidth, backBufferHeight, ) {

    };

    return renderer;
})();