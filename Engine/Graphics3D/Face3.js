/**
 * A class that represent a face on a mesh. It's a collection of 3 points
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Face3 = (function () {
    var face = function (a, b, c, color) {
        if (a instanceof Atlantis.Graphics3D.Face3) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
        }
        else {
            this.a = a || 0;
            this.b = b || 0;
            this.c = c || 0;
        }
        this.color = color || 0xfafafa;
    };

    return face;
})();