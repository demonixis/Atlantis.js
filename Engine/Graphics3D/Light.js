/**
 * A class that represent a Light.
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Light = (function () {
    var light = function (x, y, z) {
        Atlantis.Graphics3D.Object3D.call(this);
        this.position = new Atlantis.Vector3(x, y, z);
        this.enableFlatShading = true;
        this.enable = true;
    };

    light.prototype = new Atlantis.Graphics3D.Object3D();

    light.prototype.normalize() {
        return Atlantis.Vector3.normalize(this.position);   
    };

    return light;
})();